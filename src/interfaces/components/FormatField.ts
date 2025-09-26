import type {
  PermissionsItems,
  PermissionsTypes,
} from "@/constants/permissions";

export type TFormatFieldBadge<T> = T & {
  toCopy?: string | null;
  name?: string | null;
  permissionItem?: PermissionsItems;
  permissionType?: PermissionsTypes[];
};

export interface IReportFormatField {
  reportId: number;
}

export interface IUserFormatField {
  userId: number;
}

export type AllFormatFieldsProps = Partial<
  IReportFormatField & IUserFormatField
>;
