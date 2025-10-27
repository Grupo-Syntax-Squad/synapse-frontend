import { useEffect } from "react";
import { useWebSocketContext } from "@/shared/context/WebSocket";
import { WebSocketEventType } from "@/shared/services/WebSocket";

export const useReportWebSocket = () => {
  const { subscribe, sendMessage, isConnected } = useWebSocketContext();

  useEffect(() => {
    if (!isConnected) return;

    // Subscribe to report updates
    const unsubscribeReportUpdate = subscribe(
      WebSocketEventType.REPORT_UPDATE,
      (data) => {
        console.log("📊 Report updated:", data);
        // You can trigger a re-fetch of reports here
        // or update the local state directly
      }
    );

    // Subscribe to system status
    const unsubscribeSystemStatus = subscribe(
      WebSocketEventType.SYSTEM_STATUS,
      (data) => {
        console.log("🖥️ System status:", data);
      }
    );

    return () => {
      unsubscribeReportUpdate();
      unsubscribeSystemStatus();
    };
  }, [isConnected, subscribe]);

  const requestReportGeneration = (reportType: string) => {
    if (!isConnected) {
      console.warn("WebSocket not connected, cannot request report generation");
      return false;
    }

    return sendMessage(WebSocketEventType.REPORT_UPDATE, {
      action: "generate",
      type: reportType,
      timestamp: new Date().toISOString(),
    });
  };

  const subscribeToReportProgress = (reportId: string) => {
    if (!isConnected) {
      console.warn(
        "WebSocket not connected, cannot subscribe to report progress"
      );
      return false;
    }

    return sendMessage(WebSocketEventType.REPORT_UPDATE, {
      action: "subscribe",
      reportId,
    });
  };

  return {
    requestReportGeneration,
    subscribeToReportProgress,
    isConnected,
  };
};
