"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function DisplayUserProfile({ profile }) {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4 items-center justify-center"
    >
      <motion.div
        variants={item}
        className="rounded-full p-1 bg-gradient-to-br from-primary-index to-[#8B6BFF] shadow-lg shadow-primary-index/20 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary-index/30"
      >
        <div className="rounded-full border-4 border-white">
          {profile?.profile_picture ? (
            <Image
              className="rounded-full !h-[104px] !w-[104px] object-cover"
              src={profile?.profile_picture}
              alt="profile picture"
              height={104}
              width={104}
              priority
            />
          ) : (
            <div className="w-[104px] h-[104px] flex items-center justify-center rounded-full bg-neutral-light-purple">
              <div className="opacity-40">
                <Image
                  className="rounded-full h-10 w-10"
                  src="/images/logo-devlinks-small.svg"
                  alt="devlinks logo"
                  height={40}
                  width={40}
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="w-[90%] overflow-hidden whitespace-normal text-center"
      >
        <h1 className="text-4xl font-bold text-center text-neutral-dark-grey">
          {profile?.first_name} {profile?.last_name}
        </h1>
      </motion.div>

      <motion.a
        variants={item}
        className="text-neutral-grey hover:text-primary-index transition-colors cursor-pointer duration-300 ease-in-out"
        href={`mailto:${profile?.email}`}
      >
        {profile?.email}
      </motion.a>
    </motion.div>
  );
}
