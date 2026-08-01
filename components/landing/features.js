"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const features = [
  {
    icon: "/images/icon-drag-and-drop.svg",
    title: "Drag them into place",
    description:
      "Reorder your links by dragging them. Whatever matters most goes on top, and the order sticks the moment you save it.",
  },
  {
    icon: "/images/icon-profile-details-header.svg",
    title: "Make it look like you",
    description:
      "Add a picture, your name and an email so visitors land on a page that feels personal instead of a bare list of URLs.",
  },
  {
    icon: "/images/icon-preview-header.svg",
    title: "Share a single URL",
    description:
      "Every account gets its own page. Preview it, copy the link, and drop it in your CV, your bio, or a job application.",
  },
];

export default function Features() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.15 } },
  };

  const card = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-dark-grey md:text-4xl">
            Everything the page needs, nothing it doesn&apos;t
          </h2>
          <p className="mt-4 text-lg text-neutral-grey">
            Three things to set up, then you are done and back to work.
          </p>
        </motion.div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.li
              key={feature.title}
              variants={card}
              className="rounded-xl border border-neutral-borders bg-white p-8 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-primary-index/40 hover:shadow-4xl"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-light-purple">
                <Image
                  src={feature.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </span>
              <h3 className="mt-6 text-xl font-bold text-neutral-dark-grey">
                {feature.title}
              </h3>
              <p className="mt-3 leading-relaxed text-neutral-grey">
                {feature.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
