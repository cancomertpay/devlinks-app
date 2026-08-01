"use client";

// next.js
import Image from "next/image";
import Link from "next/link";

// framer-motion
import { motion } from "framer-motion";

// firebase
import { auth } from "@/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

// devlinks logos
import devlinks_logo_large from "../../public/images/logo-devlinks-large.svg";

function LandingHeader() {
  const [user] = useAuthState(auth);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="box-border flex w-full items-center justify-between gap-4 px-4 py-5 md:px-12 md:py-6"
    >
      <Link href="/">
        <Image
          src={devlinks_logo_large}
          alt="devlinks logo"
          className="h-7 w-auto md:h-9"
          priority
        />
      </Link>

      <nav className="flex items-center gap-1 md:gap-3">
        {user ? (
          <Link
            href="/customize-links"
            className="whitespace-nowrap rounded-md bg-primary-index px-4 py-2.5 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-primary-index/90 md:px-6 md:py-3"
          >
            Go to my links
          </Link>
        ) : (
          <>
            {/* Hidden on the narrowest screens, where the hero's own
                "I already have one" link covers the same route */}
            <Link
              href="/login"
              className="hidden rounded-md px-4 py-3 text-sm font-bold text-neutral-grey transition-colors duration-300 ease-in-out hover:text-primary-index sm:block"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="whitespace-nowrap rounded-md bg-primary-index px-4 py-2.5 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-primary-index/90 md:px-6 md:py-3"
            >
              Get started
            </Link>
          </>
        )}
      </nav>
    </motion.header>
  );
}

export default LandingHeader;
