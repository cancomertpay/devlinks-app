"use client";

import {
  getUserProfileData,
  submitUserProfileDatas,
} from "@/lib/actions/dashboard";
import {
  claimUsername,
  USERNAME_INVALID,
  USERNAME_TAKEN,
} from "@/lib/actions/username";
import { auth } from "@/firebase-config";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const UserProfileContext = createContext();

export const useUserProfileContext = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error(
      "useUserProfileContext must be used within a UserProfileProvider"
    );
  }
  return context;
};

export default function UserProfileProvider({ children }) {
  const [userObject, setUserObject] = useState({
    username: "",
    title: "",
    first_name: "",
    last_name: "",
    email: "",
    profile_picture: "",
  });
  // The name currently held in the usernames table, which is what has to be
  // released when a new one is claimed. Kept apart from userObject because
  // that one changes as the person types.
  const savedUsername = useRef("");
  // Resized JPEG data URL of a newly picked picture, waiting to be saved
  const [userProfilePicData, setUserProfilePicData] = useState(null);
  const [userProfilePicURL, setUserProfilePicURL] = useState(null);
  const [userProfilePicMockup, setUserProfilePicMockup] = useState(null);
  const [hasAnyChanges, setHasAnyChanges] = useState(false);
  const [errorObject, setErrorObject] = useState({});
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);


  const handleUserProfilePicMockup = (imageURL) => {
    setUserProfilePicMockup(imageURL);
  };

  const handleUserProfilePic = (imageDataURL) => {
    setHasAnyChanges(true);
    setUserProfilePicData(imageDataURL);
  };

  const handleFieldEdit = (value) => {
    setHasAnyChanges(value);
  };

  const handleError = (error) => {
    setErrorObject(error);
  };

  const handleUserInputs = (name, value) => {
    setUserObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (hasError) return;

    if (userObject["first_name"]?.trim() === "") {
      setErrorObject((prev) => ({
        ...prev,
        first_name: { status: true, message: "Can't be empty" },
      }));
      return;
    } else if (userObject["last_name"]?.trim() === "") {
      setErrorObject((prev) => ({
        ...prev,
        last_name: { status: true, message: "Can't be empty" },
      }));
      return;
    }

    setLoading(true);

    // The picture travels with the rest of the profile as a data URL, so there
    // is a single write and no way to end up with an undefined picture field
    const profileToSave = userProfilePicData
      ? { ...userObject, profile_picture: userProfilePicData }
      : userObject;

    try {
      // Claimed before the profile is written: if the name has just been taken
      // by someone else, the profile must not be saved still holding it
      const username = await claimUsername(
        auth.currentUser?.displayName,
        profileToSave.username,
        savedUsername.current
      );
      savedUsername.current = username;

      await submitUserProfileDatas({ ...profileToSave, username });

      if (userProfilePicData) {
        setUserObject(profileToSave);
        setUserProfilePicURL(userProfilePicData);
        setUserProfilePicData(null);
      }

      setHasAnyChanges(false);
    } catch (error) {
      if (error?.code === USERNAME_TAKEN || error?.code === USERNAME_INVALID) {
        setErrorObject((prev) => ({
          ...prev,
          username: { status: true, message: error.message },
        }));
        toast.error(error.message);
      } else {
        toast.error("Your changes could not be saved. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hasError = Object.values(errorObject).some((error) => error.status);
    setHasError(hasError);
  }, [errorObject]);

  useEffect(() => {
    setLoading(true);
    getUserProfileData()
      .then((userData) => {
        // A brand new account has no profile node yet, keep the empty defaults
        if (!userData) return;

        savedUsername.current = userData.username ?? "";

        // Merged onto the defaults rather than replacing them: a profile saved
        // before username and title existed has no key for either, and an
        // undefined value would turn those inputs uncontrolled
        setUserObject((prev) => ({ ...prev, ...userData }));
        setUserProfilePicURL(userData.profile_picture || null);
      })
      .catch(() => {
        toast.error("Your profile could not be loaded.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (hasAnyChanges && !hasError && !loading) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [hasAnyChanges, hasError, errorObject, loading]);

  const values = {
    userProfilePicMockup,
    userObject,
    errorObject,
    hasError,
    handleError,
    loading,
    handleUserProfilePicMockup,
    handleFieldEdit,
    buttonDisabled,
    userProfilePicURL,
    handleUserProfilePic,
    handleUserInputs,
    handleSubmit,
  };

  return (
    <UserProfileContext.Provider value={values}>
      {children}
    </UserProfileContext.Provider>
  );
}
