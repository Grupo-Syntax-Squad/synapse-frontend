import { WebSocketConfig } from "@/config/WebSocket";

export enum ChatWebSocketEventType {
  CHAT_MESSAGE = "chat_message",
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  ERROR = "error",
}

interface ChatWebSocketMessage {
  type: string;
  data: unknown;
  timestamp: string;
}

type ChatWebSocketEventHandler = (data: unknown) => void;

export class ChatWebSocketService {
  private ws: WebSocket | null = null;
  private eventHandlers: Map<ChatWebSocketEventType, ChatWebSocketEventHandler[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000;
  private isConnecting = false;
  private isManualClose = false;

  constructor() {
    this.initializeEventHandlers();
  }

  private initializeEventHandlers(): void {
    Object.values(ChatWebSocketEventType).forEach((eventType) => {
      this.eventHandlers.set(eventType, []);
    });
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.CONNECTING)) {
        return;
      }

      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        resolve();
        return;
      }

      this.isConnecting = true;
      this.isManualClose = false;

      try {
        const wsBase = WebSocketConfig.WebSocket.address;
        const path = "/ws/chat";
        const wsUrl = wsBase ? `${wsBase.replace(/\/$/, "")}${path}` : undefined;
        
        if (!wsUrl) {
          throw new Error("WebSocket URL not configured");
        }

        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          console.log("🎉 Chat WebSocket connected successfully");
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          this.emit(ChatWebSocketEventType.CONNECT, null);
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data = event.data;
            try {
              const message: ChatWebSocketMessage = JSON.parse(data);
              // Only emit chat messages
              if (message.type === "chat_message") {
                this.emit(ChatWebSocketEventType.CHAT_MESSAGE, message.data);
              }
            } catch {
              // If not JSON, treat as plain text chat message
              this.emit(ChatWebSocketEventType.CHAT_MESSAGE, {
                message: data,
                user_message: false,
                created_at: new Date().toISOString(),
              });
            }
          } catch (error) {
            console.error("❌ Failed to handle chat message:", error);
          }
        };

        this.ws.onclose = (event) => {
          console.log("🔌 Chat WebSocket closed:", event.code, event.reason);
          this.isConnecting = false;
          this.emit(ChatWebSocketEventType.DISCONNECT, {
            code: event.code,
            reason: event.reason,
          });

          if (!this.isManualClose && event.code !== 1000) {
            this.attemptReconnect();
          }
        };

        this.ws.onerror = (error) => {
          console.error("❌ Chat WebSocket error:", error);
          this.isConnecting = false;
          this.emit(ChatWebSocketEventType.ERROR, error);
          reject(error);
        };

        setTimeout(() => {
          if (this.isConnecting) {
            this.isConnecting = false;
            this.ws?.close();
            reject(new Error("Chat WebSocket connection timeout"));
          }
        }, 10000);
      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  public disconnect(): void {
    this.isManualClose = true;
    if (this.ws) {
      this.ws.close(1000, "Manual disconnect");
      this.ws = null;
    }
  }

  public send(data: unknown): boolean {
    if (!this.isConnected()) {
      console.warn("Chat WebSocket not connected. Message not sent.");
      return false;
    }

    try {
      const message: ChatWebSocketMessage = {
        type: "chat_message",
        data,
        timestamp: new Date().toISOString(),
      };

      this.ws!.send(JSON.stringify(message));
      return true;
    } catch (error) {
      console.error("❌ Failed to send chat message:", error);
      return false;
    }
  }

  public isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  public on(eventType: ChatWebSocketEventType, handler: ChatWebSocketEventHandler): void {
    const handlers = this.eventHandlers.get(eventType) || [];
    handlers.push(handler);
    this.eventHandlers.set(eventType, handlers);
  }

  public off(eventType: ChatWebSocketEventType, handler: ChatWebSocketEventHandler): void {
    const handlers = this.eventHandlers.get(eventType) || [];
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }

  private emit(eventType: ChatWebSocketEventType, data: unknown): void {
    const handlers = this.eventHandlers.get(eventType) || [];
    handlers.forEach((handler) => {
      try {
        handler(data);
      } catch (error) {
        console.error(`❌ Error in chat event handler for ${eventType}:`, error);
      }
    });
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts || this.isManualClose) {
      console.error("❌ Max chat reconnection attempts reached");
      return;
    }

    this.reconnectAttempts++;
    console.log(`Attempting to reconnect chat... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    setTimeout(() => {
      this.connect()
        .then(() => {
          console.log("✅ Chat reconnected successfully");
        })
        .catch((error) => {
          console.error("❌ Chat reconnection failed:", error);
        });
    }, this.reconnectInterval * this.reconnectAttempts);
  }
}
