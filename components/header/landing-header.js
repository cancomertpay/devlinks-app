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
      className="box-border flex w-full items-center justify-between px-6 py-6 md:px-12"
    >
      <Link href="/">
        <Image src={devlinks_logo_large} alt="devlinks logo" priority />
      </Link>

      <nav className="flex items-center gap-2 md:gap-3">
        {user ? (
          <Link
            href="/customize-links"
            className="rounded-md bg-primary-index px-4 py-3 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-primary-index/90 md:px-6"
          >
            Go to my links
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-md px-4 py-3 text-sm font-bold text-neutral-grey transition-colors duration-300 ease-in-out hover:text-primary-index"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-primary-index px-4 py-3 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-primary-index/90 md:px-6"
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
