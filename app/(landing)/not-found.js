import NotFoundContent from "@/components/UI/not-found/not-found-content";

function NotFound() {
  return (
    <NotFoundContent
      title="Page not found"
      description="The page you are looking for does not exist. Check the URL, or start from the beginning."
      primaryAction={{ href: "/", label: "Back to home" }}
      secondaryAction={{ href: "/register", label: "Create an account" }}
    />
  );
}

export default NotFound;
