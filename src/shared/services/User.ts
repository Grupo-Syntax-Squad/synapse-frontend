import type { IBasicResponse } from "@/interfaces/services/BasicResponse";
import { BaseService } from "./BaseService";
import { ServiceSynapse } from "./Api";

export class UserServices extends BaseService {
  static {
    this.setPrefix("/users");
  }

  public static async registerUser(params: {
    username: string;
    email: string;
    password: string;
  }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const response: IBasicResponse<null> = (
        await ServiceSynapse.post(this.endpoint("/register"), params, {
          headers: await this.getHeaders(),
        })
      ).data;
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
