export const WebSocketConfig = {
  WebSocket: {
    address: import.meta.env.VITE_WEB_SOCKET_URL as string | undefined,
    defaultPath: "/ws/chat",
  },
};
