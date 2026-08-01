// firebase
import { database, auth } from "../../firebase-config";
import { get, ref, update, orderByChild, equalTo } from "firebase/database";

// react-hot-toast
import toast from "react-hot-toast";
import SavedIcon from "@/components/UI/icons/saved-icon";

// entire profile
export const getUserProfile = async (displayName) => {
  const usersRef = ref(database, `/users/${displayName}`);

  const userSnapshot = await get(usersRef);

  // The caller decides what a missing profile means, which keeps its
  // notFound() from being swallowed by a catch in here
  return userSnapshot.exists() ? userSnapshot.val() : null;
};

// devlinks
export const getUserDevlinks = async () => {
  const currentUser = auth?.currentUser;
  if (!currentUser) {
    throw new Error("User not found");
  }

  const userRef = ref(database, `users/${currentUser?.displayName}/devlinks`);
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
  const currentUser = auth?.currentUser;
  if (!currentUser) {
    throw new Error("User not found");
  }

  const userRef = ref(database, `users/${currentUser?.displayName}`);

  try {
    await update(userRef, {
      devlinks: devlinksList,
    });
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
  const currentUser = auth?.currentUser;
  if (!currentUser) {
    throw new Error("User not found");
  }

  const userRef = ref(database, `users/${currentUser?.displayName}/profile`);

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
  const currentUser = auth?.currentUser;
  if (!currentUser) {
    throw new Error("User not found");
  }

  const userRef = ref(database, `users/${currentUser?.displayName}`);

  try {
    await update(userRef, {
      profile: profileDatas,
    });
    toast("Your changes saved!", {
      icon: <SavedIcon />,
    });
  } catch (error) {
    throw new Error("User profile cannot be updated", error);
  }
};
