"use client";
import DevLink from "../customize-links/dev-link";

export default function DisplayDevlinkList({ devlinks }) {
  return (
    <ul className="flex flex-col gap-5 items-center justify-center mt-14">
      {devlinks?.map((devlink) => (
        <DevLink key={devlink.id} link={devlink} />
      ))}
    </ul>
  );
}
