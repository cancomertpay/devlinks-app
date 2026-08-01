"use client";

import { useParams } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase-config";
import NotFoundContent from "@/components/UI/not-found/not-found-content";

function NotFound() {
  const [user] = useAuthState(auth);
  const { displayName } = useParams();

  // Reaching your own page before you have set anything up is not an error,
  // so the owner gets an invitation to start rather than a dead end
  if (user && user.displayName === displayName) {
    return (
      <NotFoundContent
        title="Your page is empty"
        description="There is nothing here yet. Add your first link and your page will appear at this address."
        primaryAction={{ href: "/customize-links", label: "Add your links" }}
        secondaryAction={{ href: "/profile-details", label: "Edit my profile" }}
      />
    );
  }

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
