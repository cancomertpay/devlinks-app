import NotFoundContent from "@/components/UI/not-found/not-found-content";

function NotFound() {
  return (
    <NotFoundContent
      title="Page not found"
      description="The page you are looking for does not exist. Your links are still where you left them."
      primaryAction={{ href: "/customize-links", label: "Back to my links" }}
      secondaryAction={{ href: "/profile-details", label: "Edit my profile" }}
    />
  );
}

export default NotFound;
