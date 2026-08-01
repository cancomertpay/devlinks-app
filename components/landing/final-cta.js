"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function FinalCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="px-6 pb-24 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-primary-index px-8 py-16 text-center md:px-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-white/10"
        />

        <h2 className="relative text-3xl font-bold text-white md:text-4xl">
          Your links deserve a better home
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/80">
          Set your page up in a couple of minutes and share it everywhere you
          already are.
        </p>
        <div className="relative mt-10">
          <Link
            href="/register"
            className="inline-block rounded-md bg-white px-8 py-3 text-sm font-bold text-primary-index transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-neutral-light-purple"
          >
            Create your page
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
