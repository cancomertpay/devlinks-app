"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithProvider } from "@/lib/actions/auth";
import { Github, Google } from "../icons";

const providers = [
  { name: "google", label: "Google", icon: <Google size={18} /> },
  { name: "github", label: "GitHub", icon: <Github color="#1A1A1A" size={18} /> },
];

export default function SocialAuthButtons() {
  const router = useRouter();
  const [pendingProvider, setPendingProvider] = useState(null);

  const handleSignIn = async (providerName) => {
    setPendingProvider(providerName);

    const signedIn = await signInWithProvider(providerName);

    if (signedIn) {
      router.push("/customize-links");
      return;
    }

    setPendingProvider(null);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-neutral-borders" />
        <span className="text-xs uppercase tracking-widest text-neutral-grey">
          or
        </span>
        <span className="h-px flex-1 bg-neutral-borders" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {providers.map((provider) => (
          <button
            key={provider.name}
            type="button"
            onClick={() => handleSignIn(provider.name)}
            disabled={pendingProvider !== null}
            className="flex flex-1 items-center justify-center gap-3 rounded-md border border-neutral-borders bg-white px-4 py-3 text-sm font-bold text-neutral-dark-grey transition-all duration-300 ease-in-out hover:border-primary-index hover:text-primary-index disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="flex items-center">{provider.icon}</span>
            {pendingProvider === provider.name
              ? "Connecting"
              : `Continue with ${provider.label}`}
          </button>
        ))}
      </div>
    </div>
  );
}
