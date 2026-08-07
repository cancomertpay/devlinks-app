"use client";

// The shared Input component cannot be reused here: it requires id/title/name
// and derives its icon from the "/images/icon-{id}.svg" convention, neither of
// which a search box has. The ring, focus and shadow classes are the same ones
// so the two still look like they belong to the same form.
export default function SearchInput({ value, onChange }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-grey">
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
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
      </span>

      <input
        // type="search" and not "text": phones offer a Search key for it, and
        // Escape clears the field for free
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name, username, title or platform"
        aria-label="Search people on Devlinks"
        className="w-full cursor-pointer rounded-lg bg-white py-3 pl-11 pr-11 text-neutral-dark-grey outline-none ring-1 ring-neutral-borders transition-all duration-300 ease-in-out hover:shadow-3xl hover:ring-primary-index/50 focus:shadow-3xl focus:ring-primary-index [&::-webkit-search-cancel-button]:hidden"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-neutral-grey transition-colors duration-200 hover:bg-neutral-light-grey hover:text-neutral-dark-grey"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="m1 1 10 10M11 1 1 11"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
