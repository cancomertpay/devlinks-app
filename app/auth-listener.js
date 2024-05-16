"use client";

import { auth } from "@/firebase-config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "@/components/UI/loading/loading";
import { createContext, useContext, useEffect } from "react";
import { logout } from "@/lib/actions/auth";

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
  if (loading) {
    return <Loading />;
  }
  if (user) {
    return <>{children}</>;
  } else {
    router.push("/register");
    return null;
  }
}

export function AuthRouteProtection({ children }) {
  useEffect(() => {
    logout();
  }, []);
  return <>{children}</>;
}
