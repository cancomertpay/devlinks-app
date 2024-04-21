"use client";

// next.js
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

// firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase-config";

// ui components
import Tabs from "../UI/tabs/tabs";
import PreviewIcon from "../UI/icons/preview";
import Button from "../UI/button/button";

// devlinks logos
import devlinks_logo_small from "../../public/images/logo-devlinks-small.svg";
import devlinks_logo_large from "../../public/images/logo-devlinks-large.svg";
import { signout } from "@/lib/actions/auth";
import { pathSplitter } from "@/lib/utils/helper-functions";
import toast from "react-hot-toast";

function Header() {
  const [user] = useAuthState(auth);
  const pathname = usePathname();
  const singlePath = pathSplitter(pathname, "back");
  const router = useRouter();

  const shareLink = () => {
    const domain = document.domain;
    const link = `https://${domain}/${user.uid}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard");
  };

  return (
    <header className="box-border w-full flex items-center justify-between">
      {user && pathname === singlePath ? (
        <div className="w-full flex items-center justify-between gap-3">
          <Button
            style={"secondary"}
            onClick={() => router.push(`/${user.uid}/dashboard`)}
          >
            Back to Editor
          </Button>
          <Button style={"primary"} onClick={shareLink}>
            Share Link
          </Button>
        </div>
      ) : (
        <>
          {user ? (
            <div>
              <Image src={devlinks_logo_small} alt="devlinks logo" priority />
            </div>
          ) : (
            <div>
              <Image src={devlinks_logo_large} alt="devlinks logo" priority />
            </div>
          )}
          {user && (
            <Tabs>
              <Tabs.Item id={"dashboard"} href={`/${user.uid}/dashboard`}>
                <Tabs.Title></Tabs.Title>
              </Tabs.Item>
              <Tabs.Item id={"profile"} href={`/${user.uid}/profile`}>
                <Tabs.Title></Tabs.Title>
              </Tabs.Item>
            </Tabs>
          )}
          {user && (
            <div>
              <Button
                style={"secondary"}
                onClick={() => router.push(`/${user.uid}`)}
              >
                <PreviewIcon />
              </Button>
            </div>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
