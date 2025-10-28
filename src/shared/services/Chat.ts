import { BaseService } from "./BaseService";
import { ServiceSynapse } from "./Api";
import type { IChatResponse } from "@/interfaces/services/Chat";

export class ChatService extends BaseService {
  static {
    this.setPrefix("/chat_history");
  }

  public static async fetchHistory(userId: number) {
    const response: IChatResponse = (
      await ServiceSynapse.get(this.endpoint("/"), {
        headers: await this.getHeaders(),
        params: { user_id: userId },
      })
    ).data;
    return response.data;
  }
}

export default ChatService;
