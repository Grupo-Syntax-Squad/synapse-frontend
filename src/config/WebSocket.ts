export const WebSocketConfig = {
  WebSocket: {
    // Vite exposes env vars only with the VITE_ prefix
    address: import.meta.env.VITE_WEB_SOCKET_URL as string | undefined,
    defaultPath: "/ws/chat",
  },
};
