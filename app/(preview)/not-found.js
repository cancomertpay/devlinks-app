import NotFoundContent from "@/components/UI/not-found/not-found-content";

function NotFound() {
  return (
    <NotFoundContent
      title="User not found"
      description="This page does not belong to anyone yet. Double-check the link, or make it yours."
      primaryAction={{ href: "/register", label: "Create an account" }}
      secondaryAction={{ href: "/login", label: "I already have one" }}
    />
  );
}

export default NotFound;
