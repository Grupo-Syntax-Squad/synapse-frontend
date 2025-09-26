import { useLocation } from "react-router-dom";

export function activateOnRoutePath(route: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  return location.pathname === route ? "active" : "";
}
