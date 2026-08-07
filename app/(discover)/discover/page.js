import { Suspense } from "react";
import DiscoverContainer from "@/components/discover/discover-container";

export const metadata = {
  title: "Discover | Devlinks",
  description:
    "Find people on Devlinks by name, username, title or the platforms they link to.",
};

export default function DiscoverPage() {
  return (
    // useSearchParams needs a Suspense boundary above it, or the whole route
    // opts out of static rendering
    <Suspense fallback={null}>
      <DiscoverContainer />
    </Suspense>
  );
}
