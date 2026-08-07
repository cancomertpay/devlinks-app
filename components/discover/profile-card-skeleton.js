export default function ProfileCardSkeleton() {
  return (
    <li className="flex flex-col items-center gap-3 rounded-xl bg-white p-6 ring-1 ring-neutral-borders">
      <div className="h-16 w-16 animate-pulse rounded-full bg-neutral-light-purple" />
      <div className="h-4 w-28 animate-pulse rounded-full bg-neutral-light-purple" />
      <div className="h-3 w-20 animate-pulse rounded-full bg-neutral-light-grey" />
      <div className="flex gap-1.5">
        <div className="h-5 w-14 animate-pulse rounded-full bg-neutral-light-grey" />
        <div className="h-5 w-16 animate-pulse rounded-full bg-neutral-light-grey" />
      </div>
    </li>
  );
}
