// next.js
import { Instrument_Sans } from "next/font/google";

// global styles
import "../globals.css";

// components
import LandingHeader from "@/components/header/landing-header";

// react-hot-toast
import { Toaster } from "react-hot-toast";

// font
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
});

// metadata
// The page itself sets the specific title, see ./discover/page.js
export const metadata = {
  title: "Devlinks",
  description: "Find people on Devlinks.",
};

// Discover gets its own group rather than joining the two that exist: the
// preview layout is a single narrow card sized for one profile, and the
// landing layout wraps everything in the marketing <Main>. Neither fits a
// grid of results.
export default function DiscoverLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen box-border bg-gradient-to-b from-white via-neutral-light-purple/20 to-neutral-light-purple/40 ${instrumentSans.className}`}
      >
        <LandingHeader />
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 5000,
            style: { background: "#333333", color: "#FAFAFA" },
          }}
        />
      </body>
    </html>
  );
}
