import DevlinksProvider from "@/context/devlink-context";
import { AuthContextProvider, RouteProtection } from "../auth-listener";
import UserProfileProvider from "@/context/user-profile-context";
import DocumentTitle from "./document-title";

export default function Provider({ children }) {
  return (
    <AuthContextProvider>
      <RouteProtection>
        <DevlinksProvider>
          <UserProfileProvider>
            <DocumentTitle />
            {children}
          </UserProfileProvider>
        </DevlinksProvider>
      </RouteProtection>
    </AuthContextProvider>
  );
}
