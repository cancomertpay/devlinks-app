"use client";

import Button from "../UI/button/button";
import UploadImage from "./upload-image";
import ProfileInputGroup from "./profile-input-group";
import { useUserProfileContext } from "@/context/user-profile-context";
import UserProfileDetailSkeleton from "../UI/loading/user-profile-detail-skeleton";

function UserProfileForm() {
  const { handleSubmit, buttonDisabled, loading } = useUserProfileContext();

  return (
    <>
      {/* Same shape as the links page: the fields take the leftover height and
          scroll, so Save stays at the bottom of the panel */}
      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto">
          {loading ? (
            <UserProfileDetailSkeleton />
          ) : (
            <>
              <div className="px-6 md:h-[273px]">
                <UploadImage />
              </div>
              <div className="px-6 md:h-[255px]">
                <ProfileInputGroup />
              </div>
            </>
          )}
        </div>
        <div className="pt-5">
          <hr className="mb-5 border-neutral-borders" />
          <div className="px-6 md:text-end">
            <div className="md:inline-flex">
              <Button style="primary" type="submit" disabled={buttonDisabled}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default UserProfileForm;
