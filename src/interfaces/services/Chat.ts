export interface IChatMessage {
  message: string;
  user_id: number;
  user_message: boolean;
  created_at: string;
}

export interface IChatResponse {
  data: IChatMessage[];
  message: string;
}
