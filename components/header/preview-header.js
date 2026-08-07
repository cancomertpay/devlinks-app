"use client";

import Link from "next/link";
import { auth } from "@/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import ShareMenu from "../UI/share/share-menu";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { resolveProfileId } from "@/lib/actions/username";

function PreviewHeader() {
  const [user] = useAuthState(auth);
  const { displayName } = useParams();
  // The same page answers to both a profile id and a username, so who owns it
  // is not something the address can be compared against directly
  const [ownerId, setOwnerId] = useState(null);

  useEffect(() => {
    let current = true;

    resolveProfileId(displayName)
      .then((profileId) => {
        if (current) setOwnerId(profileId);
      })
      .catch(() => {
        // Without an owner the bar simply stays hidden, which is the safe way
        // for this to fail
      });

    return () => {
      current = false;
    };
  }, [displayName]);

  // The editor bar belongs to the owner of the page, not to every visitor
  // who happens to be logged in while viewing someone else's profile
  const isOwnPreview = !!user && !!ownerId && user.displayName === ownerId;

  return (
    <header className="w-full h-[78px] md:p-4">
      {isOwnPreview && (
        <div className="p-4 flex items-center justify-between gap-3 md:bg-white md:rounded-xl">
          <div className="flex-1 md:flex-none">
            <Link
              href="/customize-links"
              className="block w-full bg-white border border-solid border-primary-index hover:bg-neutral-light-purple text-primary-index text-sm font-bold rounded-md px-4 py-3 transition-colors duration-300 ease-in-out text-center"
            >
              Back to Editor
            </Link>
          </div>
          <div className="flex-1 md:flex-none">
            <ShareMenu text="My Devlinks page" />
          </div>
        </div>
      )}
    </header>
  );
}

export default PreviewHeader;
