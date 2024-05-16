import { AuthRouteProtection } from "../auth-listener";

export default function Provider({ children }) {
  return <AuthRouteProtection>{children}</AuthRouteProtection>;
}
