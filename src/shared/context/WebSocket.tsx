import React, { createContext, useEffect, useState } from "react";
import { useWebSocket } from "@/shared/hooks/useWebSocket";
import { WebSocketEventType } from "@/shared/services/WebSocket";
import type { IWebSocketNotification } from "@/interfaces/services/WebSocket";
import { useNotification } from "./Notification";

export interface WebSocketContextType {
  isConnected: boolean;
  connectionState: number;
  connect: () => Promise<void>;
  disconnect: () => void;
  sendMessage: (type: WebSocketEventType, data: unknown) => boolean;
  subscribe: (
    eventType: WebSocketEventType,
    handler: (data: unknown) => void
  ) => () => void;
  unsubscribe: (eventType: WebSocketEventType) => void;
  lastNotification: IWebSocketNotification | null;
}

export const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

interface WebSocketProviderProps {
  children: React.ReactNode;
  autoConnect?: boolean;
  showNotifications?: boolean;
  path?: string;
  query?: Record<string, string | number | boolean>;
}

export function WebSocketProvider({
  children,
  autoConnect = true,
  showNotifications = true,
  path = "/ws/chat",
  query,
}: WebSocketProviderProps) {
  const { Toast } = useNotification();
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState<number>(
    WebSocket.CLOSED
  );
  const [lastNotification, setLastNotification] =
    useState<IWebSocketNotification | null>(null);

  const {
    connect,
    disconnect,
    sendMessage,
    subscribe,
    unsubscribe,
    getConnectionState,
    isConnected: wsIsConnected,
  } = useWebSocket({
    autoConnect,
    path,
    query,
    onConnect: () => {
      console.log("🎉 WebSocket connected via context");
      setIsConnected(true);
      setConnectionState(WebSocket.OPEN);

      if (showNotifications) {
        Toast.show("success", "Connection", "Connected to real-time updates");
      }
    },
    onDisconnect: (event) => {
      console.log("🔌 WebSocket disconnected via context:", event);
      setIsConnected(false);
      setConnectionState(WebSocket.CLOSED);

      if (showNotifications && event.code !== 1000) {
        Toast.show(
          "warn",
          "Connection",
          "Lost connection to real-time updates"
        );
      }
    },
    onError: (error) => {
      console.error("❌ WebSocket error via context:", error);
      setConnectionState(WebSocket.CLOSED);

      if (showNotifications) {
        Toast.show(
          "error",
          "Connection Error",
          "Failed to connect to real-time updates"
        );
      }
    },
    onNotification: (notification) => {
      console.log("🔔 Notification received via context:", notification);
      setLastNotification(notification);

      if (showNotifications) {
        Toast.show(
          "info",
          notification.notification_title,
          notification.notification_description
        );

        // Play sound if enabled
        if (notification.notification_sound) {
          // You can add sound playing logic here
          console.log("🔊 Notification sound should play");
        }
      }
    },
  });

  // Update connection state periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const currentState = getConnectionState();
      const currentConnected = wsIsConnected();

      if (connectionState !== currentState) {
        setConnectionState(currentState);
      }

      if (isConnected !== currentConnected) {
        setIsConnected(currentConnected);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [connectionState, isConnected, getConnectionState, wsIsConnected]);

  const contextValue: WebSocketContextType = {
    isConnected,
    connectionState,
    connect,
    disconnect,
    sendMessage,
    subscribe,
    unsubscribe,
    lastNotification,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
}

export { useWebSocketContext } from "@/shared/hooks/useWebSocketContext";
