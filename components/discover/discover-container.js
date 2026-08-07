"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getDirectory, matchProfiles } from "@/lib/actions/discover";
import SearchInput from "./search-input";
import ProfileCard from "./profile-card";
import ProfileCardSkeleton from "./profile-card-skeleton";

// Long enough that typing a name does not rewrite the address bar once per
// letter, short enough that the results still feel immediate. The filtering
// itself is instant — the whole directory is already in hand.
const QUERY_DEBOUNCE_MS = 200;

const GRID_CLASS =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export default function DiscoverContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [appliedQuery, setAppliedQuery] = useState(initialQuery);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getDirectory()
      .then(setEntries)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppliedQuery(query);

      // Keeps the address shareable: /discover?q=ben reopens these results
      const trimmed = query.trim();
      router.replace(
        trimmed ? `/discover?q=${encodeURIComponent(trimmed)}` : "/discover",
        { scroll: false }
      );
    }, QUERY_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query, router]);

  const results = useMemo(
    () => matchProfiles(entries, appliedQuery),
    [entries, appliedQuery]
  );

  return (
    <main className="mx-auto box-border w-full max-w-6xl px-4 pb-20 md:px-8">
      <div className="mx-auto max-w-2xl py-8 text-center md:py-12">
        <h1 className="text-3xl font-bold text-neutral-dark-grey md:text-4xl">
          Discover
        </h1>
        <p className="mt-2 text-neutral-grey">
          Find people on Devlinks and see every link they share.
        </p>
        <div className="mt-6">
          <SearchInput value={query} onChange={setQuery} />
        </div>
      </div>

      {loading ? (
        <ul className={GRID_CLASS}>
          {Array.from({ length: 8 }, (_, index) => (
            <ProfileCardSkeleton key={index} />
          ))}
        </ul>
      ) : failed ? (
        <p className="py-16 text-center text-neutral-grey">
          The directory could not be loaded. Please try again.
        </p>
      ) : results.length > 0 ? (
        <>
          <p className="pb-4 text-sm text-neutral-grey">
            {results.length === 1 ? "1 person" : `${results.length} people`}
          </p>
          <ul className={GRID_CLASS}>
            {results.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </ul>
        </>
      ) : (
        <div className="py-16 text-center">
          <p className="text-neutral-grey">
            {appliedQuery.trim()
              ? `No one matches “${appliedQuery.trim()}”.`
              : "There is nobody here yet."}
          </p>
          {appliedQuery.trim() ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-3 text-sm font-bold text-primary-index transition-colors duration-300 ease-in-out hover:text-primary-hover"
            >
              Clear search
            </button>
          ) : null}
        </div>
      )}
    </main>
  );
}
