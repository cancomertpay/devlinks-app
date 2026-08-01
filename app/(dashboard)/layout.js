// next.js
import { Instrument_Sans } from "next/font/google";
import Image from "next/image";

// global styles
import "../globals.css";

// provider
import Provider from "./provider";

// components
import DashboardHeader from "@/components/header/dashboard-header";

// react-hot-toast
import { Toaster } from "react-hot-toast";
import PhoneMockup from "@/components/phone-mockup/phone-mockup";


// font
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
});

// metadata
// The title is replaced on the client with the signed-in user's name,
// see ./document-title.js
export const metadata = {
  title: "Devlinks",
  description: "Manage the links on your Devlinks page.",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col box-border bg-neutral-light-grey ${instrumentSans.className}`}
      >
        <Provider>
          <DashboardHeader />
          {/* flex-1 so the grey surface reaches the bottom instead of ending
              with the content and leaving a white band on tall screens */}
          <main className="box-border flex-1 bg-neutral-light-grey p-4 pb-20 lg:flex lg:gap-5">
            <div className="hidden lg:flex w-5/12 items-center justify-center bg-white rounded-xl">
              <PhoneMockup />
            </div>
            {/* min-h rather than a fixed h, so the panel stretches with the
                row instead of stopping short and leaving a gap below it */}
            <div className="flex lg:w-7/12 lg:min-h-[810px] flex-col gap-10 bg-white rounded-xl pt-6 pb-4 md:pt-10">
              {children}
            </div>
          </main>
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 5000,
              style: { background: "#333333", color: "#FAFAFA" },
            }}
          />
        </Provider>
      </body>
    </html>
  );
}
