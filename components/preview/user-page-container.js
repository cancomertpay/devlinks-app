import { getUserProfile } from "@/lib/actions/dashboard";
import DisplayUserProfile from "./display-user-profile-detail";
import DisplayDevlinkList from "./display-devlink-list";
import { notFound } from "next/navigation";
import Link from "next/link";
import ShareMenu from "../UI/share/share-menu";
import { formatFullName } from "@/lib/utils/helpers";

export default async function UserPageContainer({ displayName }) {
  const userData = await getUserProfile(displayName);

  if (!userData) {
    notFound();
  }

  const fullName = formatFullName(userData?.profile);

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

      {/* Passing the page on is a visitor's job as much as the owner's, and
          the owner's own share button lives in a bar only they can see */}
      <div className="mt-12 flex flex-col items-center gap-2">
        <ShareMenu
          variant="ghost"
          label="Share this page"
          text={fullName ? `${fullName} on Devlinks` : "A Devlinks page"}
        />
        <Link
          href="/discover"
          className="text-sm text-neutral-grey transition-colors duration-300 ease-in-out hover:text-primary-index"
        >
          Discover more people on Devlinks
        </Link>
      </div>
    </div>
  );
}
