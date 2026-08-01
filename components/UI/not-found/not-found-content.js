"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function NotFoundContent({
  title,
  description,
  primaryAction,
  secondaryAction,
}) {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
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
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center px-6 py-12 text-center md:px-10"
    >
      <motion.span
        variants={item}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-light-purple"
      >
        <Image
          src="/images/logo-devlinks-small.svg"
          alt=""
          width={28}
          height={28}
          className="h-7 w-7"
        />
      </motion.span>

      <motion.span
        variants={item}
        className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-primary-index"
      >
        Error 404
      </motion.span>

      <motion.h1
        variants={item}
        className="mt-3 text-2xl font-bold text-neutral-dark-grey md:text-3xl"
      >
        {title}
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-3 max-w-sm leading-relaxed text-neutral-grey"
      >
        {description}
      </motion.p>

      <motion.div
        variants={item}
        className="mt-8 flex w-full max-w-xs flex-col items-center gap-4"
      >
        <Link
          href={primaryAction.href}
          className="w-full rounded-md bg-primary-index px-8 py-3 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-primary-index/90 hover:shadow-md"
        >
          {primaryAction.label}
        </Link>

        {secondaryAction && (
          <Link
            href={secondaryAction.href}
            className="text-sm font-semibold text-primary-index transition-colors duration-300 ease-in-out hover:text-neutral-dark-grey"
          >
            {secondaryAction.label}
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
}
