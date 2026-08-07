import Image from "next/image";
import Link from "next/link";
import { formatFullName } from "@/lib/utils/helpers";

// How many badges fit on one line before the rest turn into a count
const VISIBLE_PLATFORMS = 3;

const initialsOf = (profile) =>
  `${profile.first_name?.[0] ?? ""}${profile.last_name?.[0] ?? ""}`.toUpperCase();

export default function ProfileCard({ profile }) {
  const fullName = formatFullName(profile);
  const platforms = profile.platforms ?? [];
  const extraPlatforms = platforms.length - VISIBLE_PLATFORMS;

  return (
    <li>
      <Link
        // A username is optional, so the id stays the address for everyone who
        // never picked one
        href={`/${profile.username || profile.id}`}
        className="flex h-full flex-col items-center gap-3 rounded-xl bg-white p-6 text-center shadow-3xl ring-1 ring-neutral-borders transition-all duration-300 ease-in-out hover:-translate-y-1 hover:ring-primary-index"
      >
        <div className="rounded-full bg-gradient-to-br from-primary-index to-[#8B6BFF] p-[3px]">
          <div className="rounded-full border-2 border-white">
            {profile.photo ? (
              <Image
                className="!h-16 !w-16 rounded-full object-cover"
                src={profile.photo}
                alt=""
                height={64}
                width={64}
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-light-purple text-lg font-bold text-primary-index">
                {initialsOf(profile) || "?"}
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col gap-0.5">
          <p className="truncate font-semibold text-neutral-dark-grey">
            {fullName}
          </p>
          {/* Both of these are optional. Rendering nothing rather than an empty
              line keeps a bare profile's card from looking broken. */}
          {profile.username ? (
            <p className="truncate text-sm text-primary-index">
              @{profile.username}
            </p>
          ) : null}
          {profile.title ? (
            <p className="truncate text-sm text-neutral-grey">{profile.title}</p>
          ) : null}
        </div>

        {platforms.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {platforms.slice(0, VISIBLE_PLATFORMS).map((platform) => (
              <span
                key={platform}
                className="rounded-full bg-neutral-light-grey px-2.5 py-1 text-xs text-neutral-grey"
              >
                {platform}
              </span>
            ))}
            {extraPlatforms > 0 ? (
              <span className="text-xs text-neutral-grey">
                +{extraPlatforms}
              </span>
            ) : null}
          </div>
        ) : null}

        <p className="mt-auto pt-1 text-xs text-neutral-grey">
          {profile.links_count === 1 ? "1 link" : `${profile.links_count ?? 0} links`}
        </p>
      </Link>
    </li>
  );
}
