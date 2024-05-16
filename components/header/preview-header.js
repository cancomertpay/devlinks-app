"use client";

import Link from "next/link";
import Button from "../UI/button/button";
import toast from "react-hot-toast";
import { auth } from "@/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import CopiedIcon from "../UI/icons/link-copied-clipboard";

function PreviewHeader() {
  const [user] = useAuthState(auth);
  const isUserLoggedIn = !!user;
  const shareLink = () => {
    const url = window.location.href;

    const tempInput = document.createElement("input");
    tempInput.value = url;
    document.body.appendChild(tempInput);

    tempInput.select();
    document.execCommand("copy");

    document.body.removeChild(tempInput);

    toast("The link has been copied to your clipboard!", {
      icon: <CopiedIcon />,
    });
  };

  return (
    <header className="w-full h-[78px] md:p-4">
      {isUserLoggedIn && (
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
            <Button style={"primary"} onClick={shareLink}>
              Share Link
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default PreviewHeader;
