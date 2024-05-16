import DevlinksProvider from "@/context/devlink-context";
import { AuthContextProvider, RouteProtection } from "../auth-listener";
import UserProfileProvider from "@/context/user-profile-context";

export default function Provider({ children }) {
  return (
    <AuthContextProvider>
      <RouteProtection>
        <DevlinksProvider>
          <UserProfileProvider>{children}</UserProfileProvider>
        </DevlinksProvider>
      </RouteProtection>
    </AuthContextProvider>
  );
}
