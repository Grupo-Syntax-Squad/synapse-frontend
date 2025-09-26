import type { RoleKeys } from "@/constants/permissions";

export interface RouteInfoConstants {
  title: string;
  path: string;
  profilesCanAccess?: RoleKeys[];
  hidden?: boolean;
  disabled?: boolean;
}

export enum ParamsConstantsKeys {
  ACCESS_ROUTE_BY_ID = "paramId",
  DEFAULT_TAB = "default_tab",
  CHANGE_PASSWORD = "alterar_senha",
}
