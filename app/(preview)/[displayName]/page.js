import UserPageContainer from "@/components/preview/user-page-container";

function ViewUserPage({ params }) {
  return <UserPageContainer displayName={params.displayName} />;
}

export default ViewUserPage;
