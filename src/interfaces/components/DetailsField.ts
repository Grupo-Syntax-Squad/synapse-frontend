import type {
  PermissionsItems,
  PermissionsTypes,
} from "@/constants/permissions";
import type { IColType, TCol } from "./Col";

export interface IDetailsField extends Omit<TCol, "title">, IColType {
  title: React.ReactNode;
  titleClassName?: string;
  description?: React.ReactNode;
  richHTML?: boolean;
  defaultTextColor?: boolean;
  className?: string;
  icon?: string;
  iconAction?: () => void;
  permissionActionItem?: PermissionsItems;
  permissionActionType?: PermissionsTypes[];
}
