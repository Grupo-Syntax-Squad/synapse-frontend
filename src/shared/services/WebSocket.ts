import { WebSocketConfig } from "@/config/WebSocket";
import type { IWebSocketNotification } from "@/interfaces/services/WebSocket";

export enum WebSocketEventType {
  NOTIFICATION = "notification",
  CHAT_MESSAGE = "chat_message",
  REPORT_UPDATE = "report_update",
  USER_UPDATE = "user_update",
  SYSTEM_STATUS = "system_status",
  ERROR = "error",
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  RECONNECT = "reconnect",
}

interface WebSocketMessage {
  type: WebSocketEventType;
  data: unknown;
  timestamp: string;
}

type WebSocketEventHandler = (data: unknown) => void;

export class WebSocketService {
  private static instance: WebSocketService;
  private ws: WebSocket | null = null;
  private eventHandlers: Map<WebSocketEventType, WebSocketEventHandler[]> =
    new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000; // 3 seconds
  private isConnecting = false;
  private isManualClose = false;

  private constructor() {
    this.initializeEventHandlers();
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  private initializeEventHandlers(): void {
    // Initialize event handler arrays
    Object.values(WebSocketEventType).forEach((eventType) => {
      this.eventHandlers.set(eventType, []);
    });
  }

  public connect(options?: {
    path?: string;
    query?: Record<string, string | number | boolean>;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      if (
        this.isConnecting ||
        (this.ws && this.ws.readyState === WebSocket.CONNECTING)
      ) {
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
        const path =
          options?.path ?? WebSocketConfig.WebSocket.defaultPath ?? "/";
        const qsObj = options?.query ?? {};
        const qs = Object.keys(qsObj).length
          ? `?${new URLSearchParams(
              Object.entries(qsObj).reduce((acc, [k, v]) => {
                acc[k] = String(v);
                return acc;
              }, {} as Record<string, string>)
            ).toString()}`
          : "";
        const wsUrl = wsBase
          ? `${wsBase.replace(/\/$/, "")}${path}${qs}`
          : undefined;
        if (!wsUrl) {
          throw new Error("WebSocket URL not configured");
        }

        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          console.log("WebSocket connected successfully");
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          this.emit(WebSocketEventType.CONNECT, null);
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data = event.data;
            try {
              const message: WebSocketMessage = JSON.parse(data);
              this.handleMessage(message);
            } catch {
              this.emit(WebSocketEventType.CHAT_MESSAGE, {
                message: data,
                user_message: false,
                created_at: new Date().toISOString(),
              });
            }
          } catch (error) {
            console.error("❌ Failed to handle WebSocket message:", error);
          }
        };

        this.ws.onclose = (event) => {
          console.log(
            "🔌 WebSocket connection closed:",
            event.code,
            event.reason
          );
          this.isConnecting = false;
          this.emit(WebSocketEventType.DISCONNECT, {
            code: event.code,
            reason: event.reason,
          });

          if (!this.isManualClose && event.code !== 1000) {
            this.attemptReconnect();
          }
        };

        this.ws.onerror = (error) => {
          console.error("❌ WebSocket error:", error);
          this.isConnecting = false;
          this.emit(WebSocketEventType.ERROR, error);
          reject(error);
        };

        // Timeout for connection
        setTimeout(() => {
          if (this.isConnecting) {
            this.isConnecting = false;
            this.ws?.close();
            reject(new Error("WebSocket connection timeout"));
          }
        }, 10000); // 10 seconds timeout
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

  public send(type: WebSocketEventType, data: unknown): boolean {
    if (!this.isConnected()) {
      console.warn("WebSocket not connected. Message not sent.");
      return false;
    }

    try {
      const message: WebSocketMessage = {
        type,
        data,
        timestamp: new Date().toISOString(),
      };

      this.ws!.send(JSON.stringify(message));
      return true;
    } catch (error) {
      console.error("❌ Failed to send WebSocket message:", error);
      return false;
    }
  }

  public isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  public getConnectionState(): number {
    return this.ws?.readyState ?? WebSocket.CLOSED;
  }

  public on(
    eventType: WebSocketEventType,
    handler: WebSocketEventHandler
  ): void {
    const handlers = this.eventHandlers.get(eventType) || [];
    handlers.push(handler);
    this.eventHandlers.set(eventType, handlers);
  }

  public off(
    eventType: WebSocketEventType,
    handler: WebSocketEventHandler
  ): void {
    const handlers = this.eventHandlers.get(eventType) || [];
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }

  private emit(eventType: WebSocketEventType, data: unknown): void {
    const handlers = this.eventHandlers.get(eventType) || [];
    handlers.forEach((handler) => {
      try {
        handler(data);
      } catch (error) {
        console.error(
          `❌ Error in WebSocket event handler for ${eventType}:`,
          error
        );
      }
    });
  }

  private handleMessage(message: WebSocketMessage): void {
    console.log("WebSocket message received:", message);

    // Emit the specific event type
    this.emit(message.type, message.data);

    // Handle specific message types
    switch (message.type) {
      case WebSocketEventType.NOTIFICATION:
        this.handleNotification(message.data as IWebSocketNotification);
        break;
      case WebSocketEventType.REPORT_UPDATE:
        this.handleReportUpdate(message.data);
        break;
      case WebSocketEventType.USER_UPDATE:
        this.handleUserUpdate(message.data);
        break;
      default:
        console.log(`Unhandled message type: ${message.type}`);
    }
  }

  private handleNotification(notification: IWebSocketNotification): void {
    this.emit(WebSocketEventType.NOTIFICATION, notification);
  }

  private handleReportUpdate(data: unknown): void {
    console.log("Report update received:", data);
  }

  private handleUserUpdate(data: unknown): void {
    console.log("User update received:", data);
  }

  private attemptReconnect(): void {
    if (
      this.reconnectAttempts >= this.maxReconnectAttempts ||
      this.isManualClose
    ) {
      console.error("❌ Max reconnection attempts reached");
      return;
    }

    this.reconnectAttempts++;
    console.log(
      `Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
    );

    setTimeout(() => {
      this.connect()
        .then(() => {
          console.log("Reconnected successfully");
          this.emit(WebSocketEventType.RECONNECT, null);
        })
        .catch((error) => {
          console.error("❌ Reconnection failed:", error);
        });
    }, this.reconnectInterval * this.reconnectAttempts); // Exponential backoff
  }
}

export const webSocketService = WebSocketService.getInstance();
