import type { IBasicResponse } from "@/interfaces/services/BasicResponse"
import { BaseService } from "./BaseService"
import { ServiceSynapse } from "./Api"
import type {
  IGetUserResponse,
  IFilterGetUsers,
  IPartialUpdateUserRequest,
} from "@/interfaces/services/Users"

export class UserServices extends BaseService {
  static {
    this.setPrefix("/users")
  }

  public static async registerUser(params: {
    username: string
    email: string
    password: string
  }) {
    const response: IBasicResponse<null> = (
      await ServiceSynapse.post(this.endpoint("/register"), params, {
        headers: await this.getHeaders(),
      })
    ).data
    return response.data
  }

  public static async getUsers(
    params?: Partial<IFilterGetUsers>
  ): Promise<IGetUserResponse[]> {
    const response: IBasicResponse<IGetUserResponse[]> = (
      await ServiceSynapse.get(this.endpoint("/"), {
        params,
        headers: await this.getHeaders(),
      })
    ).data
    return response.data
  }

  public static async partialUpdateUser(
    data: IPartialUpdateUserRequest
  ): Promise<null> {
    const response: IBasicResponse<null> = (
      await ServiceSynapse.patch(this.endpoint("/"), data, {
        headers: await this.getHeaders(),
      })
    ).data
    return response.data
  }
}
