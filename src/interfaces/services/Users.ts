import { RoleKeys } from "@/constants/permissions";

export type TGetProfileUserResponse = {
  [key in RoleKeys]: string;
};

export enum GetUserResponseKeys {
  ID = "id",
  USERNAME = "username",
  EMAIL = "email",
  IS_ADMIN = "is_admin",
  RECEIVE_REPORTS = "receive_email",
}

export interface IGetUserResponse {
  [GetUserResponseKeys.ID]: number;
  [GetUserResponseKeys.USERNAME]: string;
  [GetUserResponseKeys.EMAIL]: string;
  [GetUserResponseKeys.IS_ADMIN]: boolean;
  [GetUserResponseKeys.RECEIVE_REPORTS]: boolean;
}

export interface IPutUser {
  [PutUserKeys.ID]?: number;
  [PutUserKeys.USERNAME]?: string;
  [PutUserKeys.PASSWORD]?: string;
  [PutUserKeys.CONFIRM_CODE]?: string;
  [PutUserKeys.RECEIVE_REPORTS]?: boolean;
}

export enum PutUserKeys {
  ID = "id",
  USERNAME = "username",
  PASSWORD = "password",
  CONFIRM_CODE = "confirm_password",
  RECEIVE_REPORTS = "receive_reports",
}

export interface IFilterGetUsers {
  [FilterGetUsersKeys.USERNAME]?: string | null;
  [FilterGetUsersKeys.EMAIL]?: string | null;
  [FilterGetUsersKeys.ENABLED]?: boolean | null;
  [FilterGetUsersKeys.IS_ADMIN]?: boolean | null;
}

export enum FilterGetUsersKeys {
  USERNAME = "name",
  EMAIL = "email",
  ENABLED = "enabled",
  IS_ADMIN = "is_admin",
}

export interface IDeleteUser {
  user_id: number;
}
