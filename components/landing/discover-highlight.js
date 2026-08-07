"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

// A still life of the real discover page rather than a screenshot, so it keeps
// up with the design tokens and stays sharp at every size
const sampleResults = [
  {
    initials: "BW",
    name: "Ben Wright",
    username: "benwright",
    title: "Frontend Developer",
    platforms: ["GitHub", "LinkedIn"],
  },
  {
    initials: "AR",
    name: "Ada Reyes",
    username: "adareyes",
    title: "Frontend Engineer",
    platforms: ["Dev.to", "GitLab"],
  },
];

export default function DiscoverHighlight() {
  const reduceMotion = useReducedMotion();

  const appear = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="px-6 pb-20 md:px-12 md:pb-28">
      <motion.div
        variants={appear}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto grid max-w-6xl items-center gap-12 rounded-3xl border border-neutral-borders bg-white p-8 md:grid-cols-2 md:p-14"
      >
        <div>
          <span className="inline-block rounded-full bg-neutral-light-purple px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-index">
            New
          </span>
          <h2 className="mt-5 text-3xl font-bold text-neutral-dark-grey md:text-4xl">
            Find the people behind the links
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-grey">
            Devlinks is no longer a page you only hand out. Search by name,
            username, title or the platforms someone links to, and land straight
            on their page.
          </p>
          <p className="mt-3 leading-relaxed text-neutral-grey">
            Pick a username in your profile and yours turns up too — at{" "}
            <span className="font-bold text-neutral-dark-grey">
              devlinks/yourname
            </span>
            , with your old link still working.
          </p>
          <div className="mt-8">
            <Link
              href="/discover"
              className="inline-block rounded-md bg-primary-index px-8 py-3 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-primary-index/90"
            >
              Browse Devlinks
            </Link>
          </div>
        </div>

        {/* Decorative: everything it says is already in the copy beside it */}
        <div aria-hidden className="rounded-2xl bg-neutral-light-grey p-5 md:p-6">
          <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 ring-1 ring-neutral-borders">
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              className="shrink-0 text-neutral-grey"
            >
              <circle
                cx="8.5"
                cy="8.5"
                r="6"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="m13.5 13.5 4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm text-neutral-dark-grey">frontend</span>
            <span className="ml-auto h-4 w-px animate-pulse bg-primary-index" />
          </div>

          <ul className="mt-4 flex flex-col gap-3">
            {sampleResults.map((result) => (
              <li
                key={result.username}
                className="flex items-center gap-4 rounded-lg bg-white p-4 ring-1 ring-neutral-borders"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-light-purple text-sm font-bold text-primary-index">
                  {result.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-neutral-dark-grey">
                    {result.name}
                  </span>
                  <span className="block truncate text-sm text-primary-index">
                    @{result.username}
                  </span>
                  <span className="block truncate text-sm text-neutral-grey">
                    {result.title}
                  </span>
                </span>
                <span className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
                  {result.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="rounded-full bg-neutral-light-grey px-2.5 py-1 text-xs text-neutral-grey"
                    >
                      {platform}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
