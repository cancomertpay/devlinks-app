"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import toast from "react-hot-toast";

import CopiedIcon from "../icons/link-copied-clipboard";
import { buildShareTargets } from "./share-targets";

const TRIGGER_STYLES = {
  primary:
    "flex w-full items-center justify-center gap-2 rounded-md bg-primary-index px-4 py-3 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-primary-index/90 hover:shadow-md md:px-8",
  ghost:
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-grey transition-colors duration-300 ease-in-out hover:text-primary-index",
};

// The same filled primary treatment as the trigger. Icons inherit currentColor,
// so they turn white with the label rather than needing their own class.
const ITEM_STYLES =
  "flex w-full items-center gap-3 rounded-md bg-primary-index px-3 py-2.5 text-sm font-bold text-white transition-colors duration-300 ease-in-out hover:bg-primary-index/90";

export default function ShareMenu({
  url,
  // What the post or message says. The caller knows whose page this is, so it
  // reads "Ben Wright on Devlinks" for a visitor and something of their own
  // for the person who owns it.
  text = "Devlinks",
  label = "Share Link",
  variant = "primary",
}) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  // Resolved on the client: the component is rendered on the server too, where
  // there is no address to read
  const [resolvedUrl, setResolvedUrl] = useState(url ?? "");
  const [canShareNatively, setCanShareNatively] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setResolvedUrl(url ?? window.location.href);
    // Read in an effect rather than during render, so the server and the first
    // client render agree
    setCanShareNatively(typeof navigator !== "undefined" && !!navigator.share);
  }, [url]);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(resolvedUrl);
    } catch (error) {
      // The clipboard API needs a secure context and permission; the old
      // selection trick still works where it does not
      const field = document.createElement("input");
      field.value = resolvedUrl;
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }

    setOpen(false);
    toast("Link copied to your clipboard!", { icon: <CopiedIcon /> });
  };

  const shareNatively = async () => {
    try {
      await navigator.share({ title: text, url: resolvedUrl });
    } catch (error) {
      // Dismissing the sheet rejects the promise, which is a cancel and not
      // something to apologise for
    }

    setOpen(false);
  };

  // The menu stays mounted and animates between two states rather than being
  // added and removed. AnimatePresence would only unmount it once the exit
  // animation completed, and a menu left in the tree at opacity 0 is still
  // 286px of clickable surface sitting over the links underneath.
  //
  // Fading out stops neither clicks nor Tab either, so being closed is spelled
  // out on the element itself rather than left to the animation.
  const menuAnimation = {
    opacity: open ? 1 : 0,
    y: open || reduceMotion ? 0 : -8,
    scale: open || reduceMotion ? 1 : 0.96,
  };

  // Each row trails the one above it on the way in, the same stagger the rest
  // of the app uses, and reduced motion flattens it to nothing
  const itemTransition = (index) => ({
    duration: open ? 0.2 : 0.1,
    ease: "easeOut",
    delay: open && !reduceMotion ? 0.05 + index * 0.04 : 0,
  });

  const targets = buildShareTargets(resolvedUrl, text);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={TRIGGER_STYLES[variant]}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M18 8a3 3 0 1 0-2.83-4H15L8.6 9.2a3 3 0 1 0 0 5.6l6.57 4.24A3 3 0 1 0 18 16a3 3 0 0 0-2.4 1.2L9 12.96a3 3 0 0 0 0-1.92L15.6 6.8A3 3 0 0 0 18 8Z"
            fill="currentColor"
          />
        </svg>
        {label}
      </button>

      <motion.div
        role="menu"
        aria-hidden={!open}
        initial={false}
        animate={menuAnimation}
        // Leaves quicker than it arrives, so dismissing feels immediate
        transition={{ duration: open ? 0.2 : 0.12, ease: "easeOut" }}
        // origin-top-right as a class, not a style prop: framer-motion turns
        // style into motion values of its own and manages transforms there
        className={`absolute right-0 z-30 mt-2 flex w-56 origin-top-right flex-col gap-2 rounded-xl border border-neutral-borders bg-white p-2 shadow-4xl ${
          open ? "" : "pointer-events-none"
        }`}
      >
        <motion.button
          type="button"
          role="menuitem"
          tabIndex={open ? 0 : -1}
          onClick={copyLink}
          initial={false}
          animate={{ opacity: open ? 1 : 0, x: open || reduceMotion ? 0 : -6 }}
          transition={itemTransition(0)}
          className={ITEM_STYLES}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M10 13a5 5 0 0 0 7.07 0l3-3A5 5 0 0 0 13 3l-1.5 1.5M14 11a5 5 0 0 0-7.07 0l-3 3A5 5 0 0 0 11 21l1.5-1.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          Copy link
        </motion.button>

        {targets.map((target, index) => (
          <motion.a
            key={target.id}
            role="menuitem"
            tabIndex={open ? 0 : -1}
            href={target.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            initial={false}
            animate={{ opacity: open ? 1 : 0, x: open || reduceMotion ? 0 : -6 }}
            transition={itemTransition(index + 1)}
            className={ITEM_STYLES}
          >
            <span className="shrink-0">{target.icon}</span>
            {target.label}
          </motion.a>
        ))}

        {/* Only where the device has a share sheet of its own, which is where
            it beats every option above it */}
        {canShareNatively && (
          <motion.button
            type="button"
            role="menuitem"
            tabIndex={open ? 0 : -1}
            onClick={shareNatively}
            initial={false}
            animate={{ opacity: open ? 1 : 0, x: open || reduceMotion ? 0 : -6 }}
            transition={itemTransition(targets.length + 1)}
            className={ITEM_STYLES}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                d="M12 16V4m0 0L8 8m4-4 4 4M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            More options
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
