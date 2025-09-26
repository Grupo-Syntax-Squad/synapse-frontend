import type { IBasicResponse } from "@/interfaces/services/BasicResponse";
import { BaseService } from "./BaseService";
import { ServiceSynapse } from "./Api";
import type {
  ILoginParams,
  IRefreshTokenParams,
} from "@/interfaces/services/Login";

export class AuthServices extends BaseService {
  static {
    this.setPrefix("/auth");
  }

  public static async loginUser(params?: ILoginParams) {
    const response: IBasicResponse<null> = (
      await ServiceSynapse.post(this.endpoint("/login"), params, {
        headers: await this.getHeaders(),
      })
    ).data;
    return response.data;
  }

  public static async logoutUserSection() {
    const response: IBasicResponse<null> = (
      await ServiceSynapse.post(this.endpoint("/logout"), null, {
        headers: await this.getHeaders(),
      })
    ).data;
    return response.data;
  }

  public static async refreshToken(params?: IRefreshTokenParams) {
    const response: IBasicResponse<{ token: string }> = (
      await ServiceSynapse.post(this.endpoint("/refresh"), null, {
        headers: await this.getHeaders(),
        params,
        paramsSerializer: {
          indexes: null,
        },
      })
    ).data;
    return response.data;
  }

  public static async confirmPasswordReset(params: {
    email: string;
    newPassword: string;
    confirmationCode: string;
  }) {
    const response: IBasicResponse<null> = (
      await ServiceSynapse.post(
        this.endpoint("/confirm-password-reset"),
        params
      )
    ).data;
    return response.data;
  }

  public static async requestPasswordReset(email: string) {
    const response: IBasicResponse<null> = (
      await ServiceSynapse.post(this.endpoint("/send-password-reset-code"), {
        email,
      })
    ).data;
    return response.data;
  }

  public static async registerUser(params: {
    username: string;
    email: string;
    password: string;
  }) {
    const response: IBasicResponse<null> = (
      await ServiceSynapse.post(this.endpoint("/register"), params)
    ).data;
    return response.data;
  }
}
