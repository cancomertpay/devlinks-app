"use client";

import { useEffect } from "react";
import { useUserProfileContext } from "@/context/user-profile-context";
import { buildDocumentTitle } from "@/lib/utils/helpers";

// The signed-in user's name is only known on the client, so the dashboard
// title is set here instead of through the route's static metadata
export default function DocumentTitle() {
  const { userObject } = useUserProfileContext();
  const title = buildDocumentTitle(userObject);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}
