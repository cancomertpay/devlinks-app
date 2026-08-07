// firebase
import { database, auth } from "../../firebase-config";
import { get, ref, update, orderByChild, equalTo } from "firebase/database";

// react-hot-toast
import toast from "react-hot-toast";
import SavedIcon from "@/components/UI/icons/saved-icon";
import { isProfileId } from "../utils/helpers";
import { resolveProfileId } from "./username";
import { syncDirectoryEntry } from "./directory";

// Every path below is built from a displayName, and the Realtime Database
// throws on characters like "." rather than simply not matching — so an id
// that could never name a profile is treated as "no such profile"
const requireProfileId = () => {
  const currentUser = auth?.currentUser;

  if (!currentUser) {
    throw new Error("User not found");
  }

  if (!isProfileId(currentUser.displayName)) {
    throw new Error(
      `This account has no profile id yet (displayName is "${currentUser.displayName}"). Sign in again to have one assigned.`
    );
  }

  return currentUser.displayName;
};

// entire profile
//
// The handle is whatever /[displayName] was given: a profile id, or a username
// that has to be looked up first. resolveProfileId settles which, and returns
// null for anything that names nobody — so a string that could never be a path
// never becomes one.
export const getUserProfile = async (handle) => {
  const profileId = await resolveProfileId(handle);

  if (!profileId) {
    return null;
  }

  const usersRef = ref(database, `/users/${profileId}`);

  const userSnapshot = await get(usersRef);

  // The caller decides what a missing profile means, which keeps its
  // notFound() from being swallowed by a catch in here
  return userSnapshot.exists() ? userSnapshot.val() : null;
};

// devlinks
export const getUserDevlinks = async () => {
  const profileId = requireProfileId();

  const userRef = ref(database, `users/${profileId}/devlinks`);
  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    throw new Error("User links cannot be fetched", error);
  }
};

export const submitUserDevLinks = async (devlinksList) => {
  const profileId = requireProfileId();

  const userRef = ref(database, `users/${profileId}`);

  try {
    await update(userRef, {
      devlinks: devlinksList,
    });

    // Keeps links_count and the platform badges on the discover card in step
    // with what was just saved
    await syncDirectoryEntry(profileId);

    if (devlinksList.length > 0) {
      toast("Your changes saved!", {
        icon: <SavedIcon />,
      });
    } else {
      toast("Dev links cleared!", {
        icon: <SavedIcon />,
      });
    }
  } catch (error) {
    throw new Error("User dev links cannot be updated", error);
  }
};

// profile-details
export const getUserProfileData = async () => {
  const profileId = requireProfileId();

  const userRef = ref(database, `users/${profileId}/profile`);

  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    throw new Error("User profile details cannot be fetched", error);
  }
};

export const submitUserProfileDatas = async (profileDatas) => {
  const profileId = requireProfileId();

  const userRef = ref(database, `users/${profileId}`);

  try {
    await update(userRef, {
      profile: profileDatas,
    });

    await syncDirectoryEntry(profileId);

    toast("Your changes saved!", {
      icon: <SavedIcon />,
    });
  } catch (error) {
    throw new Error("User profile cannot be updated", error);
  }
};
