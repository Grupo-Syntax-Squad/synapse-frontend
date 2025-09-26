export enum AuthContextResponseKeys {
  USER_ID = "custom:id",
  EMAIL = "custom:email",
  USERNAME = "custom:username",
  IS_ACTIVE = "custom:is_active",
  IS_ADMIN = "custom:is_admin",
}

export interface IAuthContextResponse {
  [AuthContextResponseKeys.USER_ID]: number;
  [AuthContextResponseKeys.EMAIL]: string;
  [AuthContextResponseKeys.USERNAME]: string;
  [AuthContextResponseKeys.IS_ACTIVE]: boolean;
  [AuthContextResponseKeys.IS_ADMIN]: boolean;
}

export enum UserAuthKeys {
  ID = "id",
  EMAIL = "email",
  USERNAME = "username",
  IS_ACTIVE = "is_active",
  IS_ADMIN = "is_admin",
}

export interface IUserAuth {
  [UserAuthKeys.ID]: number;
  [UserAuthKeys.EMAIL]: string;
  [UserAuthKeys.USERNAME]: string;
  [UserAuthKeys.IS_ACTIVE]: boolean;
  [UserAuthKeys.IS_ADMIN]?: boolean;
}
