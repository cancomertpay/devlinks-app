"use client";

import { auth } from "@/firebase-config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "@/components/UI/loading/loading";
import { createContext, useContext, useEffect } from "react";

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

  // Redirecting from the render body warns about updating another component
  // mid-render, so the navigation happens after the render commits
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
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
