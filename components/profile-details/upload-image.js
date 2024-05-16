"use client";

import { useEffect, useState } from "react";
import { useUserProfileContext } from "@/context/user-profile-context";
import NextImage from "next/image";
import UploadImageIcon from "../UI/icons/upload-image-icon";

export default function UploadImage() {
  const {
    handleUserProfilePic,
    userProfilePicURL,
    errorObject,
    handleError,
    handleFieldEdit,
    handleUserProfilePicMockup,
  } = useUserProfileContext();

  const [imageUrl, setImageUrl] = useState(userProfilePicURL);
  const [error, setError] = useState(errorObject?.["profile_picture"]);
  const [isFieldDirty, setIsFieldDirty] = useState(false);

  useEffect(() => {
    handleFieldEdit(isFieldDirty);
  }, [isFieldDirty, imageUrl]);

  useEffect(() => {
    setImageUrl(userProfilePicURL);
  }, [userProfilePicURL]);

  useEffect(() => {
    setError(errorObject);
  }, [errorObject]);

  useEffect(() => {
    handleError(error);
  }, [error]);

  useEffect(() => {
    handleUserProfilePicMockup(imageUrl)
  }, [imageUrl])

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setIsFieldDirty(true);

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async function () {
      if (img.width > 1024 || img.height > 1024) {
        setError((prev) => ({
          ...prev,
          profile_picture: {
            status: true,
            message: "Image must be below 1024x1024px.",
          },
        }));
        setImageUrl(null);
      } else if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError((prev) => ({
          ...prev,
          profile_picture: { status: true, message: "Use PNG or JPG format." },
        }));
        setImageUrl(null);
      } else {
        setError((prev) => ({
          ...prev,
          profile_picture: { status: false, message: "" },
        }));
        try {
          handleUserProfilePic(file);
          setImageUrl(img.src);
        } catch (error) {
          setError({ status: true, message: "Image upload failed." });
        }
      }
    };
  };

  return (
    <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between bg-neutral-light-grey rounded-xl">
      <p className="text-neutral-grey md:text-nowrap">Profile picture</p>
      <div className="md:flex md:items-center md:justify-end md:gap-5">
        <div className="flex my-4">
          <label
            htmlFor="upload-image-input"
            className="relative w-[193px] h-[193px] flex flex-col items-center justify-center gap-2 cursor-pointer bg-neutral-light-purple rounded-lg hover:shadow-lg border border-transparent hover:border-primary-index transition-all duration-300"
          >
            {!imageUrl ? (
              <>
                <UploadImageIcon />
                <span className="text-lg font-semibold text-primary-index">
                  + Upload Image
                </span>
              </>
            ) : (
              <>
                <>
                  <NextImage
                    src={imageUrl}
                    alt="Uploaded image preview"
                    fill
                    priority
                    sizes="193px"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-neutral-dark-grey opacity-50 rounded-lg" />
                </>
                <div className="h-full w-full absolute top-0 right-0 flex flex-col items-center justify-center">
                  <UploadImageIcon color="#fff" />
                  <span className="text-lg font-semibold text-white">
                    Change Image
                  </span>
                </div>
              </>
            )}
            <input
              id="upload-image-input"
              name="upload-image"
              type="file"
              className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="md:w-[30%]">
          {!error?.status ? (
            <p className="text-neutral-grey text-xs ">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          ) : (
            <p className="text-error text-xs">{error.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
