import { useContext } from "react";
import { WebSocketContext } from "@/shared/context/WebSocket";
import type { WebSocketContextType } from "@/shared/context/WebSocket";

export const useWebSocketContext = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useWebSocketContext must be used within a WebSocketProvider"
    );
  }
  return context;
};