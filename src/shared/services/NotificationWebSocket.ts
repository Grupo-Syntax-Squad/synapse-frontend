import { WebSocketConfig } from "@/config/WebSocket"
import {
  NotificationTypeCode,
  NotificationTypeMap,
  type IWebSocketNotification,
} from "@/interfaces/services/WebSocket"

export enum NotificationWebSocketEventType {
  NOTIFICATION = "notification",
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  ERROR = "error",
}

type NotificationWebSocketEventHandler = (data: unknown) => void

export class NotificationWebSocketService {
  private ws: WebSocket | null = null
  private eventHandlers: Map<
    NotificationWebSocketEventType,
    NotificationWebSocketEventHandler[]
  > = new Map()
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectInterval = 3000
  private isConnecting = false
  private isManualClose = false

  constructor() {
    this.initializeEventHandlers()
  }

  private initializeEventHandlers(): void {
    Object.values(NotificationWebSocketEventType).forEach((eventType) => {
      this.eventHandlers.set(eventType, [])
    })
  }

  private formatNotificationTitle(type: string): string {
    const titles: Record<string, string> = {
      generic: "Notification",
      failed_email: "Email Delivery Failed",
      new_user: "New User",
    }
    return titles[type] ?? "Notification"
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (
        this.isConnecting ||
        (this.ws && this.ws.readyState === WebSocket.CONNECTING)
      ) {
        return
      }

      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        resolve()
        return
      }

      this.isConnecting = true
      this.isManualClose = false

      try {
        const wsBase = WebSocketConfig.WebSocket.address
        const path = "/ws/notification"
        const wsUrl = wsBase ? `${wsBase.replace(/\/$/, "")}${path}` : undefined

        if (!wsUrl) {
          throw new Error("WebSocket URL not configured")
        }

        console.log("🔔 Connecting to notification WebSocket:", wsUrl)
        this.ws = new WebSocket(wsUrl)

        this.ws.onopen = () => {
          console.log("🎉 Notification WebSocket connected successfully")
          this.isConnecting = false
          this.reconnectAttempts = 0
          this.emit(NotificationWebSocketEventType.CONNECT, null)
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            let parsedData: any = JSON.parse(event.data)
            /* eslint-enable @typescript-eslint/no-explicit-any */
            if (typeof parsedData === "string") {
              parsedData = JSON.parse(parsedData)
            }
            console.log("🔔 Parsed notification message:", parsedData)
            const typeNameRaw: string = parsedData.type_name || "GENERIC"
            const typeName = typeNameRaw.toLowerCase()
            const typeCode =
              NotificationTypeMap[typeName] ?? NotificationTypeCode.GENERIC
            const notification: IWebSocketNotification = {
              notification_type: typeCode,
              notification_title: this.formatNotificationTitle(typeName),
              notification_description:
                parsedData.message ?? "You have a new notification",
              notification_url: parsedData.details?.url,
              notification_sound: false,
            }

            console.log(
              typeName,
              typeCode,
              notification.notification_description
            )
            this.emit(NotificationWebSocketEventType.NOTIFICATION, notification)
          } catch (error) {
            console.error("❌ Failed to handle notification message:", error)
          }
        }

        this.ws.onclose = (event) => {
          console.log(
            "🔌 Notification WebSocket closed:",
            event.code,
            event.reason
          )
          this.isConnecting = false
          this.emit(NotificationWebSocketEventType.DISCONNECT, {
            code: event.code,
            reason: event.reason,
          })

          if (!this.isManualClose && event.code !== 1000) {
            this.attemptReconnect()
          }
        }

        this.ws.onerror = (error) => {
          console.error("❌ Notification WebSocket error:", error)
          this.isConnecting = false
          this.emit(NotificationWebSocketEventType.ERROR, error)
          reject(error)
        }

        setTimeout(() => {
          if (this.isConnecting) {
            this.isConnecting = false
            this.ws?.close()
            reject(new Error("Notification WebSocket connection timeout"))
          }
        }, 10000)
      } catch (error) {
        this.isConnecting = false
        reject(error)
      }
    })
  }

  public disconnect(): void {
    this.isManualClose = true
    if (this.ws) {
      console.log("🔌 Manually disconnecting notification WebSocket")
      this.ws.close(1000, "Manual disconnect")
      this.ws = null
    }
  }

  public isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN
  }

  public on(
    eventType: NotificationWebSocketEventType,
    handler: NotificationWebSocketEventHandler
  ): void {
    const handlers = this.eventHandlers.get(eventType) || []
    handlers.push(handler)
    this.eventHandlers.set(eventType, handlers)
  }

  public off(
    eventType: NotificationWebSocketEventType,
    handler: NotificationWebSocketEventHandler
  ): void {
    const handlers = this.eventHandlers.get(eventType) || []
    const index = handlers.indexOf(handler)
    if (index > -1) {
      handlers.splice(index, 1)
    }
  }

  private emit(eventType: NotificationWebSocketEventType, data: unknown): void {
    const handlers = this.eventHandlers.get(eventType) || []
    handlers.forEach((handler) => {
      try {
        handler(data)
      } catch (error) {
        console.error(
          `❌ Error in notification event handler for ${eventType}:`,
          error
        )
      }
    })
  }

  private attemptReconnect(): void {
    if (
      this.reconnectAttempts >= this.maxReconnectAttempts ||
      this.isManualClose
    ) {
      console.error("❌ Max notification reconnection attempts reached")
      return
    }

    this.reconnectAttempts++
    console.log(
      `Attempting to reconnect notification... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
    )

    setTimeout(() => {
      this.connect()
        .then(() => {
          console.log("✅ Notification reconnected successfully")
        })
        .catch((error) => {
          console.error("❌ Notification reconnection failed:", error)
        })
    }, this.reconnectInterval * this.reconnectAttempts)
  }
}
