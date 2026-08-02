"use client";

import { auth } from "@/firebase-config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "@/components/UI/loading/loading";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ensureProfileRecord } from "@/lib/actions/auth";

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthContextProvider");
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function RouteProtection({ children }) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  // A provider sign-in flips the auth state the moment its popup resolves,
  // which is before the profile id has been assigned. Doing it here, and
  // holding the app back until it is done, means no page can read a display
  // name it cannot use — whichever way the person signed in.
  const [profileReady, setProfileReady] = useState(false);

  // Redirecting from the render body warns about updating another component
  // mid-render, so the navigation happens after the render commits
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    let cancelled = false;

    if (!user) {
      setProfileReady(false);
      return;
    }

    ensureProfileRecord(user)
      .then(() => {
        if (!cancelled) setProfileReady(true);
      })
      .catch(() => {
        if (cancelled) return;
        toast.error("Your account could not be prepared. Please sign in again.");
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading || (user && !profileReady)) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

// Guards the login and register pages. It used to sign the visitor out on
// mount, so merely opening /login ended an active session. Someone already
// signed in is sent to their links instead.
export function AuthRouteProtection({ children }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/customize-links");
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
}
