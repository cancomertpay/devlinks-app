import Hero from "@/components/landing/hero";
import PlatformMarquee from "@/components/landing/platform-marquee";
import Features from "@/components/landing/features";
import DiscoverHighlight from "@/components/landing/discover-highlight";
import FinalCta from "@/components/landing/final-cta";
import LandingFooter from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <PlatformMarquee />
      <Features />
      {/* After the three setup steps, before the sign-up push: discover is
          what there is to do once your own page exists */}
      <DiscoverHighlight />
      <FinalCta />
      <LandingFooter />
    </>
  );
}
