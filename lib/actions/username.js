// firebase
import { database } from "@/firebase-config";
import { get, ref, update } from "firebase/database";

import { isProfileId } from "../utils/helpers";
import { sanitizeUsername, validateUsername } from "../definitions";

// Usernames live in their own reverse table, usernames/{username} -> profileId.
//
// The Realtime Database has no unique constraint, so uniqueness is two things
// working together: this table, and the security rule that only accepts a
// write when the name is free or already yours. The availability check below
// exists to tell someone while they type — it cannot settle a race, because
// two people can read "free" in the same instant. The rule settles it, and the
// loser gets PERMISSION_DENIED.

const usernameRef = (username) => ref(database, `usernames/${username}`);

export const isUsernameAvailable = async (candidate, currentProfileId) => {
  const { valid, username } = validateUsername(candidate);

  if (!valid || !username) {
    return false;
  }

  const snapshot = await get(usernameRef(username));

  return !snapshot.exists() || snapshot.val() === currentProfileId;
};

// Claims a username and releases the previous one in a single write, so there
// is no moment where someone holds two names or none. Passing an empty next
// simply releases what they had.
// Carries a code so the form can put the message on the username field rather
// than guessing at it from the wording
const usernameError = (message, code) => {
  const error = new Error(message);
  error.code = code;
  return error;
};

export const USERNAME_TAKEN = "username-taken";
export const USERNAME_INVALID = "username-invalid";

export const claimUsername = async (profileId, next, previous) => {
  if (!isProfileId(profileId)) {
    throw new Error("This account has no profile id yet.");
  }

  const { valid, username, message } = validateUsername(next);

  if (!valid) {
    throw usernameError(message, USERNAME_INVALID);
  }

  const previousUsername = sanitizeUsername(previous);

  if (username === previousUsername) {
    return username;
  }

  const updates = {
    [`users/${profileId}/profile/username`]: username,
  };

  if (username) {
    updates[`usernames/${username}`] = profileId;
  }

  if (previousUsername) {
    updates[`usernames/${previousUsername}`] = null;
  }

  try {
    await update(ref(database), updates);
  } catch (error) {
    // The rule rejects a name that belongs to someone else, which is the one
    // failure worth explaining in the person's own terms
    const denied =
      error?.code === "PERMISSION_DENIED" ||
      String(error?.message).includes("PERMISSION_DENIED");

    throw denied
      ? usernameError("That username is already taken.", USERNAME_TAKEN)
      : error;
  }

  return username;
};

// Turns whatever /[displayName] was given into a profile id: ids pass through,
// usernames are looked up. Returns null when it names nobody.
export const resolveProfileId = async (handle) => {
  if (isProfileId(handle)) {
    return handle;
  }

  const username = sanitizeUsername(handle);

  if (!username) {
    return null;
  }

  const snapshot = await get(usernameRef(username));
  const profileId = snapshot.exists() ? snapshot.val() : null;

  // The value came out of the database, but it is about to be turned into a
  // path — so it faces the same check a hand-typed id would
  return isProfileId(profileId) ? profileId : null;
};
