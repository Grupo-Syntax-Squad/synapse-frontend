import { useEffect, useState, useRef } from "react";
import { NotificationWebSocketService, NotificationWebSocketEventType } from "@/shared/services/NotificationWebSocket";
import type { IWebSocketNotification } from "@/interfaces/services/WebSocket";

export const useNotificationWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastNotification, setLastNotification] = useState<IWebSocketNotification | null>(null);
  const wsRef = useRef<NotificationWebSocketService | null>(null);

  useEffect(() => {
    // Create notification WebSocket instance
    const notificationWS = new NotificationWebSocketService();
    wsRef.current = notificationWS;

    // Set up event handlers
    const onConnect = () => {
      console.log("✅ Notification WebSocket connected via hook");
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log("❌ Notification WebSocket disconnected via hook");
      setIsConnected(false);
    };

    const onNotification = (data: unknown) => {
      console.log("🔔 Notification received via hook:", data);
      setLastNotification(data as IWebSocketNotification);
    };

    const onError = (error: unknown) => {
      console.error("❌ Notification WebSocket error via hook:", error);
    };

    notificationWS.on(NotificationWebSocketEventType.CONNECT, onConnect);
    notificationWS.on(NotificationWebSocketEventType.DISCONNECT, onDisconnect);
    notificationWS.on(NotificationWebSocketEventType.NOTIFICATION, onNotification);
    notificationWS.on(NotificationWebSocketEventType.ERROR, onError);

    // Connect to WebSocket
    notificationWS.connect()
      .then(() => {
        console.log("🎉 Notification WebSocket connection initiated");
      })
      .catch((error) => {
        console.error("❌ Failed to connect notification WebSocket:", error);
      });

    // Cleanup on unmount
    return () => {
      notificationWS.off(NotificationWebSocketEventType.CONNECT, onConnect);
      notificationWS.off(NotificationWebSocketEventType.DISCONNECT, onDisconnect);
      notificationWS.off(NotificationWebSocketEventType.NOTIFICATION, onNotification);
      notificationWS.off(NotificationWebSocketEventType.ERROR, onError);
      notificationWS.disconnect();
    };
  }, []);

  return {
    isConnected,
    lastNotification,
  };
};
