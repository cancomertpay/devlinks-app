"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

// A running demo of the real discover page rather than a screenshot, so it
// keeps up with the design tokens and stays sharp at every size.
//
// Every scene returns two results on purpose: a varying count would resize the
// panel mid-loop and shove the section below it up and down.
const SCENES = [
  {
    query: "frontend",
    results: [
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
    ],
  },
  {
    query: "github",
    results: [
      {
        initials: "SO",
        name: "Sam Okafor",
        username: "samokafor",
        title: "Backend Developer",
        platforms: ["GitHub", "Hashnode"],
      },
      {
        initials: "BW",
        name: "Ben Wright",
        username: "benwright",
        title: "Frontend Developer",
        platforms: ["GitHub", "LinkedIn"],
      },
    ],
  },
  {
    query: "designer",
    results: [
      {
        initials: "MC",
        name: "Mia Chen",
        username: "miachen",
        title: "Product Designer",
        platforms: ["Frontend Mentor", "YouTube"],
      },
      {
        initials: "LB",
        name: "Leo Brandt",
        username: "leobrandt",
        title: "UI Designer",
        platforms: ["Codewars", "LinkedIn"],
      },
    ],
  },
];

// Deleting runs faster than typing, the way a real backspace does
const TYPE_MS = 85;
const DELETE_MS = 40;
const RESULTS_DELAY_MS = 350;
const HOLD_MS = 2400;
const NEXT_SCENE_MS = 400;

export default function DiscoverHighlight() {
  const reduceMotion = useReducedMotion();

  const [sceneIndex, setSceneIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState("typing");

  const scene = SCENES[sceneIndex];
  // Results belong to the pause after typing, which is also when a real search
  // would have come back
  const showResults = reduceMotion || phase === "holding";

  useEffect(() => {
    // One scene, fully typed, no timers at all
    if (reduceMotion) {
      setTyped(SCENES[0].query);
      return;
    }

    const { query } = SCENES[sceneIndex];
    let timer;

    if (phase === "typing") {
      timer =
        typed.length < query.length
          ? setTimeout(
              () => setTyped(query.slice(0, typed.length + 1)),
              TYPE_MS
            )
          : setTimeout(() => setPhase("holding"), RESULTS_DELAY_MS);
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), HOLD_MS);
    } else {
      timer =
        typed.length > 0
          ? setTimeout(
              () => setTyped(query.slice(0, typed.length - 1)),
              DELETE_MS
            )
          : setTimeout(() => {
              setSceneIndex((index) => (index + 1) % SCENES.length);
              setPhase("typing");
            }, NEXT_SCENE_MS);
    }

    return () => clearTimeout(timer);
  }, [phase, typed, sceneIndex, reduceMotion]);

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

        {/* Decorative: everything it demonstrates is already in the copy beside
            it, so a screen reader loses nothing by skipping it */}
        <div aria-hidden className="rounded-2xl bg-neutral-light-grey p-5 md:p-6">
          {/* Fixed height rather than padding: between scenes the query empties
              out, and an empty line box would collapse the row and bounce
              everything under it */}
          <div className="flex h-11 items-center gap-3 rounded-lg bg-white px-4 ring-1 ring-neutral-borders">
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
            {/* The caret is grouped with the text instead of being another
                gap-3 sibling, so it sits against the last letter */}
            <span className="flex min-w-0 items-center">
              <span className="truncate text-sm text-neutral-dark-grey">
                {typed}
              </span>
              <span className="ml-px h-4 w-px shrink-0 animate-pulse bg-primary-index" />
            </span>
          </div>

          <div className="mt-4 flex h-5 items-center">
            <motion.span
              animate={{ opacity: showResults ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-neutral-grey"
            >
              {scene.results.length} people
            </motion.span>
          </div>

          {/* Two rows always exist and only fade — mounting and unmounting them
              per scene meant an exiting row could still be on screen while the
              next query was already being typed */}
          <ul className="mt-2 flex min-h-[196px] flex-col gap-3">
            {scene.results.map((result, index) => (
              <motion.li
                key={index}
                initial={false}
                animate={{
                  opacity: showResults ? 1 : 0,
                  y: showResults || reduceMotion ? 0 : 10,
                }}
                transition={{
                  duration: showResults ? 0.3 : 0.15,
                  delay: showResults && !reduceMotion ? index * 0.1 : 0,
                }}
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
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
