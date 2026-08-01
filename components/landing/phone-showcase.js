"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  Devto,
  Github,
  Linkedin,
  RightArrow,
  StackOverflow,
  Youtube,
} from "../UI/icons";

const showcaseLinks = [
  { platform: "GitHub", icon: <Github color="#FFFFFF" />, bgColor: "bg-icons-github" },
  { platform: "LinkedIn", icon: <Linkedin color="#FFFFFF" />, bgColor: "bg-icons-linkedin" },
  { platform: "YouTube", icon: <Youtube color="#FFFFFF" />, bgColor: "bg-icons-youtube" },
  { platform: "Dev.to", icon: <Devto color="#FFFFFF" />, bgColor: "bg-icons-devto" },
  { platform: "Stack Overflow", icon: <StackOverflow color="#FFFFFF" />, bgColor: "bg-icons-stack-overflow" },
];

export default function PhoneShowcase() {
  const reduceMotion = useReducedMotion();

  const phone = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: reduceMotion ? 0 : 0.1, delayChildren: 0.2 },
    },
  };

  const row = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={phone}
      initial="hidden"
      animate="visible"
      className="relative mx-auto w-[280px] shrink-0"
    >
      {/* Phone frame */}
      <div className="rounded-[38px] border-[10px] border-neutral-dark-grey bg-white p-5 pt-8 shadow-2xl">
        {/* Notch */}
        <div className="mx-auto mb-8 h-1.5 w-16 rounded-full bg-neutral-borders" />

        <motion.div variants={row} className="flex flex-col items-center gap-3">
          <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full border-4 border-primary-index bg-neutral-light-purple">
            <Image
              src="/images/logo-devlinks-small.svg"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 opacity-40"
            />
          </div>
          <div className="h-4 w-32 rounded-full bg-neutral-dark-grey" />
          <div className="h-2.5 w-24 rounded-full bg-neutral-borders" />
        </motion.div>

        <ul className="mt-8 flex flex-col gap-4 pb-4">
          {showcaseLinks.map((link) => (
            <motion.li key={link.platform} variants={row}>
              <span
                className={`flex h-[44px] items-center justify-between rounded-lg px-4 text-sm text-white ${link.bgColor}`}
              >
                <span className="flex items-center gap-2">
                  <span>{link.icon}</span>
                  <span>{link.platform}</span>
                </span>
                <RightArrow color="#fff" />
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
