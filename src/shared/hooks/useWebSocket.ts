import { useEffect, useCallback, useRef } from "react";
import {
  webSocketService,
  WebSocketEventType,
} from "@/shared/services/WebSocket";
import type { IWebSocketNotification } from "@/interfaces/services/WebSocket";

interface UseWebSocketOptions {
  autoConnect?: boolean;
  onConnect?: () => void;
  onDisconnect?: (event: { code: number; reason: string }) => void;
  onError?: (error: unknown) => void;
  onNotification?: (notification: IWebSocketNotification) => void;
  path?: string;
  query?: Record<string, string | number | boolean>;
}

type WebSocketEventHandler = (data: unknown) => void;

export const useWebSocket = (options: UseWebSocketOptions = {}) => {
  const {
    autoConnect = true,
    onConnect,
    onDisconnect,
    onError,
    onNotification,
    path,
    query,
  } = options;

  const handlersRef = useRef<Map<WebSocketEventType, WebSocketEventHandler>>(
    new Map()
  );

  // Connection functions
  const connect = useCallback(async () => {
    try {
      await webSocketService.connect({ path, query });
    } catch (error) {
      console.error("Failed to connect WebSocket:", error);
      throw error;
    }
  }, [path, query]);

  const disconnect = useCallback(() => {
    webSocketService.disconnect();
  }, []);

  const sendMessage = useCallback((type: WebSocketEventType, data: unknown) => {
    return webSocketService.send(type, data);
  }, []);

  const isConnected = useCallback(() => {
    return webSocketService.isConnected();
  }, []);

  const getConnectionState = useCallback(() => {
    return webSocketService.getConnectionState();
  }, []);

  // Event subscription functions
  const subscribe = useCallback(
    (eventType: WebSocketEventType, handler: WebSocketEventHandler) => {
      webSocketService.on(eventType, handler);
      handlersRef.current.set(eventType, handler);

      return () => {
        webSocketService.off(eventType, handler);
        handlersRef.current.delete(eventType);
      };
    },
    []
  );

  const unsubscribe = useCallback((eventType: WebSocketEventType) => {
    const handler = handlersRef.current.get(eventType);
    if (handler) {
      webSocketService.off(eventType, handler);
      handlersRef.current.delete(eventType);
    }
  }, []);

  // Setup event listeners
  useEffect(() => {
    const handlers: Array<() => void> = [];

    // Connect handler
    if (onConnect) {
      const unsubscribeConnect = subscribe(
        WebSocketEventType.CONNECT,
        onConnect as WebSocketEventHandler
      );
      handlers.push(unsubscribeConnect);
    }

    // Disconnect handler
    if (onDisconnect) {
      const unsubscribeDisconnect = subscribe(
        WebSocketEventType.DISCONNECT,
        onDisconnect as WebSocketEventHandler
      );
      handlers.push(unsubscribeDisconnect);
    }

    // Error handler
    if (onError) {
      const unsubscribeError = subscribe(
        WebSocketEventType.ERROR,
        onError as WebSocketEventHandler
      );
      handlers.push(unsubscribeError);
    }

    // Notification handler
    if (onNotification) {
      const unsubscribeNotification = subscribe(
        WebSocketEventType.NOTIFICATION,
        onNotification as WebSocketEventHandler
      );
      handlers.push(unsubscribeNotification);
    }

    return () => {
      handlers.forEach((unsubscribe) => unsubscribe());
    };
  }, [onConnect, onDisconnect, onError, onNotification, subscribe]);

  // Auto connect
  useEffect(() => {
    if (autoConnect && !webSocketService.isConnected()) {
      connect().catch((error) => {
        console.error("Auto-connect failed:", error);
      });
    }

    return () => {
      const handlers = new Map(handlersRef.current);
      handlers.forEach((handler, eventType) => {
        webSocketService.off(eventType, handler);
      });
      handlersRef.current.clear();
    };
  }, [autoConnect, connect]);

  return {
    connect,
    disconnect,
    sendMessage,
    isConnected,
    getConnectionState,
    subscribe,
    unsubscribe,
  };
};
