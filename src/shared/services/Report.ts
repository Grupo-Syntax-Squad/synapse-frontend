import type { IBasicResponse } from "@/interfaces/services/BasicResponse";
import { BaseService } from "./BaseService";
import { ServiceSynapse } from "./Api";
import type {
  IGetReportParams,
  IGetReportResponse,
  IGetReportDetailsParams,
  IGetReportDetailsResponse,
} from "@/interfaces/services/Report";

export class ReportServices extends BaseService {
  static {
    this.setPrefix("/reports");
  }

  public static async getReports(params?: IGetReportParams) {
    // eslint-disable-next-line no-useless-catch
    try {
      const response: IBasicResponse<IGetReportResponse[]> = (
        await ServiceSynapse.get(this.endpoint("/"), {
          headers: await this.getHeaders(),
          params,
          paramsSerializer: {
            indexes: null,
          },
        })
      ).data;
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public static async getReportDetails(params: IGetReportDetailsParams) {
    // eslint-disable-next-line no-useless-catch
    try {
      const response: IBasicResponse<IGetReportDetailsResponse> = (
        await ServiceSynapse.get(this.endpoint(`/${params.id}`), {
          headers: await this.getHeaders(),
        })
      ).data;
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public static async generateReport() {
    // eslint-disable-next-line no-useless-catch
    try {
      const response: IBasicResponse<void> = (
        await ServiceSynapse.post(
          this.endpoint("/generate"),
          {},
          {
            headers: await this.getHeaders(),
          }
        )
      ).data;
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
