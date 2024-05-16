import { getUserProfile } from "@/lib/actions/dashboard";
import DisplayUserProfile from "./display-user-profile-detail";
import DisplayDevlinkList from "./display-devlink-list";
import { notFound } from "next/navigation";

export default async function UserPageContainer({ displayName }) {
  const userData = await getUserProfile(displayName);

  if (!userData) {
    notFound();
  }

  return (
    <div className="mt-12 gap-14 pb-20 md:pb-10">
      <DisplayUserProfile profile={userData?.profile} />
      {userData?.devlinks ? (
        <DisplayDevlinkList devlinks={userData?.devlinks} />
      ) : (
        <div className="text-center">
          <p className="text-neutral-grey">
            There is no links yet.
          </p>
        </div>
      )}
    </div>
  );
}
