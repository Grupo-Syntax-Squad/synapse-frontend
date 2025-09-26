export enum LoginParamsKeys {
  EMAIL = "email",
  PASSWORD = "password",
}

export interface ILoginParams {
  [LoginParamsKeys.EMAIL]: string;
  [LoginParamsKeys.PASSWORD]: string;
}

export enum RefreshTokenKeys {
  REFRESH_TOKEN = "refresh_token",
}

export interface IRefreshTokenParams {
  [RefreshTokenKeys.REFRESH_TOKEN]: string | null;
}

export enum SignUpParamsKeys {
  EMAIL = "email",
  USERNAME = "username",
  PASSWORD = "password",
}

export interface ISignUpParams {
  [SignUpParamsKeys.EMAIL]: string;
  [SignUpParamsKeys.USERNAME]: string;
  [SignUpParamsKeys.PASSWORD]: string;
}
