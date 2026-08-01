"use client";

import { motion, useReducedMotion } from "framer-motion";
import DevLink from "../customize-links/dev-link";

export default function DisplayDevlinkList({ devlinks }) {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: {
        // Starts after the profile above has settled
        delayChildren: reduceMotion ? 0 : 0.35,
        staggerChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-5 items-center justify-center mt-14"
    >
      {devlinks?.map((devlink) => (
        <DevLink key={devlink.id} link={devlink} variants={item} />
      ))}
    </motion.ul>
  );
}
