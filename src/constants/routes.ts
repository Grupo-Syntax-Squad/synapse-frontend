import type { RouteInfoConstants } from "@/interfaces/constants/routes";
import { permissions, CommonActions, PermissionsItems } from "./permissions";

export enum RouteMapKeys {
  ROOT = "root",
  LOGIN = "login",
  HOME = "home",
  NOT_FOUND = "NOT_FOUND",
}

export const routeMap: Record<RouteMapKeys, RouteInfoConstants> = {
  [RouteMapKeys.ROOT]: {
    title: "App",
    path: "/",
  },
  [RouteMapKeys.LOGIN]: {
    title: "Acessar conta",
    path: "/login",
  },
  [RouteMapKeys.HOME]: {
    title: "Home",
    path: "/home",
    profilesCanAccess:
      permissions[PermissionsItems.REPORT][CommonActions.ACCESS],
  },
  [RouteMapKeys.NOT_FOUND]: {
    title: "Not Found",
    path: "/404",
  },
};
