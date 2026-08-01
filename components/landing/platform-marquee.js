"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import allMenuList from "@/lib/all-menu-list";

export default function PlatformMarquee() {
  const reduceMotion = useReducedMotion();
  // Two identical halves so the loop can reset at -50% without a visible jump
  const track = [...allMenuList, ...allMenuList];

  return (
    <section className="border-y border-neutral-borders bg-neutral-light-grey py-10">
      <p className="px-6 text-center text-xs font-semibold uppercase tracking-widest text-neutral-grey">
        Eleven platforms supported out of the box
      </p>

      <div className="relative mt-8 overflow-hidden">
        {/* Fade the edges so items enter and leave softly */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-neutral-light-grey to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-neutral-light-grey to-transparent"
        />

        <motion.ul
          className="flex w-max gap-4"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        >
          {track.map((platform, index) => (
            <li
              key={`${platform.id}-${index}`}
              aria-hidden={index >= allMenuList.length}
              className="flex items-center gap-3 rounded-xl border border-neutral-borders bg-white px-5 py-3 text-sm text-neutral-dark-grey"
            >
              <span>
                {React.cloneElement(platform.icon, {
                  color: "#633CFF",
                  size: 18,
                })}
              </span>
              <span className="whitespace-nowrap">{platform.name}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
