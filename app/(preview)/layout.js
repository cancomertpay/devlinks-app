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
        <div className="hidden md:block absolute top-0 right-0 w-full h-[40vh] rounded-bl-3xl rounded-br-3xl bg-gradient-to-br from-primary-index via-[#5B32FF] to-[#8B6BFF] -z-10" />
        {/* Soft light spots so the banner is not one flat block of purple */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-white/20 blur-3xl -z-10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-primary-hover/40 blur-3xl -z-10"
        />
        <div className="md:w-full md:flex md:items-center md:justify-center md:mt-20 lg:mt-10 md:pb-20">
          <main className="box-border w-full md:w-[50%] lg:w-[25%] md:rounded-3xl md:p-1 md:shadow-[0_24px_60px_-20px_rgba(99,60,255,0.45)] bg-white">
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
