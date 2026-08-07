// firebase
import { database } from "@/firebase-config";
import { get, ref, remove, set } from "firebase/database";

import { isProfileId, normalizeForSearch, resizeImageToDataURL } from "../utils/helpers";

// The directory is a second, small copy of what a search result needs.
//
// Searching over /users directly is not an option: every record carries its
// profile picture as a base64 data URL (256px JPEG, tens of kilobytes each)
// plus the whole devlinks array, so listing fifty people would download
// megabytes — and opening /users for reading would hand out everyone's data
// in a single request.

// Small enough that a hundred of them still cost less than one stored picture
const THUMBNAIL_SIZE = 64;
const THUMBNAIL_QUALITY = 0.6;

const directoryRef = (profileId) => ref(database, `directory/${profileId}`);

const collectPlatforms = (devlinks) =>
  Array.isArray(devlinks)
    ? [...new Set(devlinks.map((devlink) => devlink?.platform).filter(Boolean))]
    : [];

// Everything a query might reasonably match, flattened into one normalized
// line. Email is folded in here rather than kept as its own field: it stays
// searchable without the result card putting it back on display.
export const buildKeywords = (profile, devlinks, profileId) =>
  normalizeForSearch(
    [
      profile?.username,
      profile?.title,
      profile?.first_name,
      profile?.last_name,
      profile?.email,
      profileId,
      ...collectPlatforms(devlinks),
    ]
      .filter(Boolean)
      .join(" ")
  );

const buildThumbnail = async (picture) => {
  if (!picture) {
    return "";
  }

  // Pictures that came from an OAuth provider are ordinary URLs and already
  // weigh nothing; only the stored data URLs need shrinking
  if (!picture.startsWith("data:")) {
    return picture;
  }

  try {
    const { dataURL } = await resizeImageToDataURL(
      picture,
      THUMBNAIL_SIZE,
      THUMBNAIL_QUALITY
    );
    return dataURL;
  } catch (error) {
    // A card with no picture still works; a save that failed over one does not
    return "";
  }
};

// Rebuilds the directory row from whatever is stored now. Called after a write
// rather than with the written values, so profile edits and link edits can
// both use it without either having to know the other half.
export const syncDirectoryEntry = async (profileId) => {
  try {
    if (!isProfileId(profileId)) {
      return;
    }

    const snapshot = await get(ref(database, `users/${profileId}`));
    const { profile = {}, devlinks = [] } = snapshot.val() ?? {};

    const firstName = profile.first_name?.trim() ?? "";
    const lastName = profile.last_name?.trim() ?? "";

    // An account with no name at all is not someone anyone is looking for, so
    // it leaves the directory rather than filling it with blank cards
    if (!firstName && !lastName) {
      await remove(directoryRef(profileId));
      return;
    }

    await set(directoryRef(profileId), {
      username: profile.username ?? "",
      title: profile.title?.trim() ?? "",
      first_name: firstName,
      last_name: lastName,
      photo: await buildThumbnail(profile.profile_picture),
      links_count: Array.isArray(devlinks) ? devlinks.length : 0,
      platforms: collectPlatforms(devlinks),
      keywords: buildKeywords(profile, devlinks, profileId),
      updated_at: Date.now(),
    });
  } catch (error) {
    // Being listed is a convenience. Whatever goes wrong here, the save the
    // person actually asked for has already happened and must stand.
  }
};
