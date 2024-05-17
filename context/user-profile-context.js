"use client";

import { auth, storage } from "@/firebase-config";
import {
  getUserProfileData,
  submitUserProfileDatas,
} from "@/lib/actions/dashboard";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";

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
  const [userProfilePicFile, setUserProfilePicFile] = useState(null);
  const [userProfilePicURL, setUserProfilePicURL] = useState(null);
  const [userProfilePicMockup, setUserProfilePicMockup] = useState(null);
  const [hasAnyChanges, setHasAnyChanges] = useState(false);
  const [errorObject, setErrorObject] = useState({});
  const [hasError, setHasError] = useState(false);
  const [imageProcessLoading, setImageProcessLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);


  const handleUserProfilePicMockup = (imageURL) => {
    setUserProfilePicMockup(imageURL);
  };

  const handleUserProfilePic = (imageFile) => {
    setHasAnyChanges(true);
    setUserProfilePicFile(imageFile);
  };

  const postUserProfilePicFileIntoStorage = async (picFile) => {
    const currentUser = auth?.currentUser;
    if (!currentUser) {
      throw new Error("User not found");
    }

    setImageProcessLoading(true);
    const storageRef = ref(
      storage,
      `users/${currentUser?.displayName}/profile_picture`
    );

    try {
      const uploadTask = uploadBytesResumable(storageRef, picFile);

      const snapshot = await uploadTask;

      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Image cannot be uploaded!", error);
    } finally {
      setImageProcessLoading(false);
    }
  };

  const handleFieldEdit = (value) => {
    setHasAnyChanges(value);
  };

  const handleError = (error) => {
    setErrorObject(error);
  };
  console.log(errorObject);

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

    if (userProfilePicFile) {
      const picURL = await postUserProfilePicFileIntoStorage(
        userProfilePicFile
      );
      setUserProfilePicURL(picURL);
      setUserObject((prev) => ({ ...prev, profile_picture: picURL }));

      await submitUserProfileDatas({
        ...userObject,
        profile_picture: picURL,
      });
    } else {
      await submitUserProfileDatas(userObject);
    }

    setHasAnyChanges(false);
    setLoading(false);
  };

  useEffect(() => {
    const hasError = Object.values(errorObject).some((error) => error.status);
    setHasError(hasError);
  }, [errorObject]);

  useEffect(() => {
    setLoading(true);
    getUserProfileData()
      .then((userData) => {
        setUserObject(userData);
        setUserProfilePicURL(userData.profile_picture);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        throw new Error(error);
      });
  }, []);

  useEffect(() => {
    if (hasAnyChanges && !hasError && !loading && !imageProcessLoading) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [hasAnyChanges, hasError, errorObject, loading, imageProcessLoading]);

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
