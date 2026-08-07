import UserPageContainer from "@/components/preview/user-page-container";
import { getUserProfile } from "@/lib/actions/dashboard";
import { buildDocumentTitle, formatFullName } from "@/lib/utils/helpers";

export async function generateMetadata({ params }) {
  const userData = await getUserProfile(params.displayName);
  const profile = userData?.profile;
  const fullName = formatFullName(profile);

  const title = buildDocumentTitle(profile);
  const description = fullName
    ? `${fullName} on Devlinks — every link in one place.`
    : "A Devlinks page.";

  // Pictures are usually stored as base64 data URLs, which no crawler can
  // fetch. The ones that came from Google or GitHub are ordinary URLs, and
  // only those are worth declaring — a preview image that 404s looks worse
  // than a card with no image at all.
  const picture = profile?.profile_picture;
  const images = picture?.startsWith("http") ? [picture] : undefined;

  return {
    title,
    description,
    // Sharing to LinkedIn passes a URL and nothing else: the post is filled
    // in from whatever the page itself declares, so without these it arrives
    // blank no matter what the share link says
    openGraph: {
      title,
      description,
      url: `/${params.displayName}`,
      siteName: "Devlinks",
      type: "profile",
      images,
    },
    twitter: {
      card: "summary",
      title,
      description,
      images,
    },
  };
}

function ViewUserPage({ params }) {
  return <UserPageContainer displayName={params.displayName} />;
}

export default ViewUserPage;
