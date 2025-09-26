import { PermissionsItems, RoleKeys } from "@/constants/permissions";

export type TPermissionActions = {
  [key: string]: RoleKeys[];
};

export type TPermissions = {
  [key in PermissionsItems]: TPermissionActions;
};
