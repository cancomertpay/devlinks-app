"use client";

import {
  getUserProfileData,
  submitUserProfileDatas,
} from "@/lib/actions/dashboard";
import { createContext, useContext, useEffect, useState } from "react";
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
    first_name: "",
    last_name: "",
    email: "",
    profile_picture: "",
  });
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
      await submitUserProfileDatas(profileToSave);

      if (userProfilePicData) {
        setUserObject(profileToSave);
        setUserProfilePicURL(userProfilePicData);
        setUserProfilePicData(null);
      }

      setHasAnyChanges(false);
    } catch (error) {
      toast.error("Your changes could not be saved. Please try again.");
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

        setUserObject(userData);
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
