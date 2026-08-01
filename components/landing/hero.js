"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import PhoneShowcase from "./phone-showcase";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-8 md:px-12 md:pb-28 md:pt-14">
      {/* Soft brand glows, purely decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-primary-index/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-40 h-[360px] w-[360px] rounded-full bg-primary-hover/30 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-xl text-center lg:text-left"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-light-purple px-4 py-2 text-xs font-semibold text-primary-index"
          >
            Built for developers
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-bold leading-tight text-neutral-dark-grey md:text-6xl"
          >
            Every link you own,{" "}
            <span className="text-primary-index">on one page</span>.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-lg leading-relaxed text-neutral-grey"
          >
            Devlinks turns your scattered profiles into a single page worth
            sharing. Add your links, drag them into the order you want, and hand
            out one URL instead of ten.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link
              href="/register"
              className="rounded-md bg-primary-index px-8 py-3 text-center text-sm font-bold text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-4xl"
            >
              Create your page
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-solid border-primary-index bg-white px-8 py-3 text-center text-sm font-bold text-primary-index transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-neutral-light-purple"
            >
              I already have one
            </Link>
          </motion.div>

          <motion.p variants={item} className="mt-6 text-xs text-neutral-grey">
            Free, and no card required.
          </motion.p>
        </motion.div>

        <PhoneShowcase />
      </div>
    </section>
  );
}
