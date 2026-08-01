import React from "react";
import allMenuList from "@/lib/all-menu-list";

export default function PlatformMarquee() {
  // Three copies, so that after the animation has moved a full copy off to
  // the left there are still two left to cover the viewport. Two copies only
  // just reach on a laptop and leave a gap on anything wider.
  const track = [...allMenuList, ...allMenuList, ...allMenuList];

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

        {/* The spacing lives on the items rather than as a gap on the track:
            a gap would add a step between copies that one third never covers */}
        <ul className="flex w-max animate-marquee motion-reduce:animate-none">
          {track.map((platform, index) => (
            <li
              key={`${platform.id}-${index}`}
              aria-hidden={index >= allMenuList.length}
              className="mr-4 flex items-center gap-3 rounded-xl border border-neutral-borders bg-white px-5 py-3 text-sm text-neutral-dark-grey"
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
        </ul>
      </div>
    </section>
  );
}
