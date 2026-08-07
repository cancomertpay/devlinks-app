// next.js
import { Instrument_Sans } from "next/font/google";

// react
import { Suspense } from "react";

// global styles
import "../globals.css";

// components
import PreviewHeader from "@/components/header/preview-header";

// react-hot-toast
import { Toaster } from "react-hot-toast";

// font
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
});

// metadata
// Overridden per profile by generateMetadata in [displayName]/page.js
export const metadata = {
  // What the relative og:url and the generated preview image are resolved
  // against. Crawlers need an absolute address, so deployments have to set
  // NEXT_PUBLIC_SITE_URL — locally it falls back to the dev server, which no
  // crawler can reach anyway.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "Devlinks",
  description: "A Devlinks page.",
};

export default function PreviewLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`relative min-h-screen box-border overflow-x-hidden bg-gradient-to-b from-white via-neutral-light-purple/30 to-neutral-light-purple/60 ${instrumentSans.className}`}
      >
        <PreviewHeader />
        {/* Shown on phones too: the card no longer covers the full width, so
            the banner is what the page is read against at every size */}
        <div className="absolute top-0 right-0 w-full h-[300px] md:h-[40vh] rounded-bl-3xl rounded-br-3xl bg-gradient-to-br from-primary-index via-[#5B32FF] to-[#8B6BFF] -z-10" />
        {/* Soft light spots so the banner is not one flat block of purple.
            They hang past the edges on purpose, so they are clipped here —
            overflow-x on the body alone does not stop that on a phone. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden -z-10"
        >
          <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-primary-hover/40 blur-3xl" />
        </div>
        <div className="w-full flex items-center justify-center px-4 pb-16 md:mt-20 md:px-0 md:pb-20 lg:mt-10">
          <main className="box-border w-full max-w-md rounded-3xl p-1 shadow-[0_24px_60px_-20px_rgba(99,60,255,0.45)] bg-white md:w-[50%] lg:w-[25%]">
            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 5000,
                style: { background: "#333333", color: "#FAFAFA" },
              }}
            />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
