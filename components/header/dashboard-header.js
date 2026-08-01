"use client";

import Link from "next/link";
import Tabs from "../UI/tabs/tabs";
import Image from "next/image";
import PreviewIcon from "../UI/icons/preview";
import { Logout as LogoutIcon } from "../UI/icons";
import { useAuthContext } from "@/app/auth-listener";
import { logout } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <div className="md:bg-neutral-light-grey md:pt-4 md:px-4">
      <header className="flex items-center justify-between gap-2 px-4 py-4 md:px-5 md:bg-white md:rounded-xl">
        {/* sm logo */}
        <Link href="/" className="md:hidden">
          <Image
            src="/images/logo-devlinks-small.svg"
            alt="devlinks logo"
            width={32}
            height={32}
            priority
          />
        </Link>
        {/* md logo */}
        <Link href="/" className="hidden md:block">
          <Image
            src="/images/logo-devlinks-large.svg"
            alt="devlinks logo"
            width={146}
            height={32}
            priority
          />
        </Link>
        {/* sm tabs */}
        <Tabs className="md:hidden">
          <Tabs.Item id={"/customize-links"} href={`/customize-links`}>
            <Tabs.Title></Tabs.Title>
          </Tabs.Item>
          <Tabs.Item id={"/profile-details"} href={`/profile-details`}>
            <Tabs.Title></Tabs.Title>
          </Tabs.Item>
        </Tabs>
        {/* md tabs */}
        <Tabs className="hidden md:block">
          <Tabs.Item id={"/customize-links"} href={`/customize-links`}>
            <Tabs.Title>Links</Tabs.Title>
          </Tabs.Item>
          <Tabs.Item id={"/profile-details"} href={`/profile-details`}>
            <Tabs.Title>Profile Details</Tabs.Title>
          </Tabs.Item>
        </Tabs>
        <div className="flex items-center gap-2">
          {/* sm preview button */}
          <div className="md:hidden">
            <Link
              href={`/${user?.displayName}`}
              className="block w-full bg-white border border-solid border-primary-index hover:bg-neutral-light-purple text-primary-index text-sm font-bold rounded-md px-3 py-3 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:text-neutral-grey disabled:border-neutral-borders disabled:bg-neutral-light-grey"
            >
              <PreviewIcon />
            </Link>
          </div>
          {/* md preview button */}
          <div className="hidden md:block">
            <Link
              href={`/${user?.displayName}`}
              className="block w-full bg-white border border-solid border-primary-index hover:bg-neutral-light-purple text-primary-index text-sm font-bold rounded-md px-7 py-3 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:text-neutral-grey disabled:border-neutral-borders disabled:bg-neutral-light-grey"
            >
              Preview
            </Link>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Log out"
            className="flex shrink-0 items-center gap-2 rounded-md px-2 py-3 text-sm font-bold text-neutral-grey transition-colors duration-300 ease-in-out hover:bg-neutral-light-grey hover:text-primary-index md:px-4"
          >
            <LogoutIcon />
            <span className="hidden md:inline">Log out</span>
          </button>
        </div>
      </header>
    </div>
  );
}
