import Hero from "@/components/landing/hero";
import PlatformMarquee from "@/components/landing/platform-marquee";
import Features from "@/components/landing/features";
import FinalCta from "@/components/landing/final-cta";
import LandingFooter from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <PlatformMarquee />
      <Features />
      <FinalCta />
      <LandingFooter />
    </>
  );
}
