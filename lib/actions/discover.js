// firebase
import { database } from "@/firebase-config";
import { get, ref } from "firebase/database";

import { normalizeForSearch } from "../utils/helpers";

// The Realtime Database can only order and match whole values, so there is no
// "contains" query to ask it for. The directory is small on purpose — one
// light row per person — so it is fetched once and matched here.
export const getDirectory = async () => {
  const snapshot = await get(ref(database, "directory"));

  if (!snapshot.exists()) {
    return [];
  }

  return Object.entries(snapshot.val() ?? {})
    .map(([id, entry]) => ({ id, ...entry }))
    // syncDirectoryEntry already keeps nameless accounts out; this is the same
    // rule applied again on the way in, so one stale row cannot show a blank
    // card to everybody
    .filter((entry) => entry.first_name || entry.last_name);
};

// A better match has to outrank a weaker one, or the person you typed the name
// of ends up below everyone who merely shares a word with them.
const SCORE = {
  USERNAME_EXACT: 100,
  ID_EXACT: 90,
  USERNAME_PREFIX: 60,
  NAME_PREFIX: 50,
  NAME_CONTAINS: 25,
  // Deliberately below the name scores: searching "ben" should find the person
  // called Ben before everyone whose title happens to contain it
  TITLE_CONTAINS: 15,
  PLATFORM: 10,
  // Whatever is only in keywords — an email address, most of the time
  KEYWORDS: 5,
};

// Normalizing once per entry rather than once per entry per token
const prepareEntry = (entry) => ({
  entry,
  username: normalizeForSearch(entry.username),
  id: normalizeForSearch(entry.id),
  firstName: normalizeForSearch(entry.first_name),
  lastName: normalizeForSearch(entry.last_name),
  title: normalizeForSearch(entry.title),
  platforms: normalizeForSearch((entry.platforms ?? []).join(" ")),
  // Written already normalized, but a row from before this field existed
  // should still match on the parts we do have
  keywords:
    entry.keywords ??
    normalizeForSearch(
      [entry.username, entry.title, entry.first_name, entry.last_name].join(" ")
    ),
});

const scoreToken = (fields, token) => {
  if (fields.username && fields.username === token) return SCORE.USERNAME_EXACT;
  if (fields.id === token) return SCORE.ID_EXACT;
  if (fields.username && fields.username.startsWith(token))
    return SCORE.USERNAME_PREFIX;
  if (fields.firstName.startsWith(token) || fields.lastName.startsWith(token))
    return SCORE.NAME_PREFIX;
  if (fields.firstName.includes(token) || fields.lastName.includes(token))
    return SCORE.NAME_CONTAINS;
  if (fields.title.includes(token)) return SCORE.TITLE_CONTAINS;
  if (fields.platforms.includes(token)) return SCORE.PLATFORM;
  if (fields.keywords.includes(token)) return SCORE.KEYWORDS;

  return 0;
};

const byRecency = (a, b) => (b.updated_at ?? 0) - (a.updated_at ?? 0);

// Pure: takes the rows already fetched and the raw query, touches no network.
export const matchProfiles = (entries, query) => {
  const tokens = normalizeForSearch(query).split(" ").filter(Boolean);

  // An empty search is a browse, not a match — show everyone, newest first
  if (tokens.length === 0) {
    return [...entries].sort(byRecency);
  }

  const matches = [];

  for (const fields of entries.map(prepareEntry)) {
    let total = 0;

    for (const token of tokens) {
      const score = scoreToken(fields, token);

      // Every word has to land somewhere, so "ben wright" does not match
      // everyone called Ben
      if (score === 0) {
        total = 0;
        break;
      }

      total += score;
    }

    if (total > 0) {
      matches.push({ entry: fields.entry, total });
    }
  }

  return matches
    .sort((a, b) => b.total - a.total || byRecency(a.entry, b.entry))
    .map((match) => match.entry);
};
