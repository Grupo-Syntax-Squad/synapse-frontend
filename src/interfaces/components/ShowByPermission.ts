import type { ReactNode } from "react";
import type {
  PermissionsItems,
  PermissionsTypes,
} from "@/constants/permissions";

export interface IShowByPermission {
  permissionItem: PermissionsItems;
  permissionType: PermissionsTypes[];
  children: ReactNode;
}
