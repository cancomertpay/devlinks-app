import { AuthContextProvider, RouteProtection } from "../auth-listener";

export default function Provider({ children }) {
  return (
    <AuthContextProvider>
      <RouteProtection>{children}</RouteProtection>
    </AuthContextProvider>
  );
}
