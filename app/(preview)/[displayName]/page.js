import UserPageContainer from "@/components/preview/user-page-container";
import { getUserProfile } from "@/lib/actions/dashboard";
import { buildDocumentTitle, formatFullName } from "@/lib/utils/helpers";

export async function generateMetadata({ params }) {
  const userData = await getUserProfile(params.displayName);
  const profile = userData?.profile;
  const fullName = formatFullName(profile);

  return {
    title: buildDocumentTitle(profile),
    description: fullName
      ? `${fullName} on Devlinks — every link in one place.`
      : "A Devlinks page.",
  };
}

function ViewUserPage({ params }) {
  return <UserPageContainer displayName={params.displayName} />;
}

export default ViewUserPage;
