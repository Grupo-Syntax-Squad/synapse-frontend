import React from "react";
import { Badge } from "react-bootstrap";
import { useWebSocketContext } from "@/shared/context/WebSocket";

interface WebSocketStatusProps {
  className?: string;
  showText?: boolean;
}

export const WebSocketStatus: React.FC<WebSocketStatusProps> = ({
  className = "",
  showText = true,
}) => {
  const { connectionState } = useWebSocketContext();

  const getStatusInfo = () => {
    switch (connectionState) {
      case WebSocket.CONNECTING:
        return {
          variant: "warning" as const,
          text: "Connecting...",
        };
      case WebSocket.OPEN:
        return {
          variant: "success" as const,
          text: "Connected",
        };
      case WebSocket.CLOSING:
        return {
          variant: "warning" as const,
          text: "Disconnecting...",
        };
      case WebSocket.CLOSED:
      default:
        return {
          variant: "danger" as const,
          text: "Disconnected",
        };
    }
  };

  const status = getStatusInfo();

  return (
    <Badge
      bg={status.variant}
      className={`d-flex align-items-center gap-1 ${className}`}
      title={`WebSocket Status: ${status.text}`}
    >
      <span>{status.icon}</span>
      {showText && <span>{status.text}</span>}
    </Badge>
  );
};