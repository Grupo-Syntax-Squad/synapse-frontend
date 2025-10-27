import { PrimeReactProvider } from "primereact/api";
import { NotificationProvider } from "./shared/context/Notification";
import { TitleProvider } from "./shared/context/Title";
import { AuthProvider } from "./shared/context/Auth";
import { WebSocketProvider } from "./shared/context/WebSocket";
import { Routes } from "./routes";

export default function App() {
  return (
    <PrimeReactProvider>
      <NotificationProvider>
        <WebSocketProvider autoConnect={true} showNotifications={true}>
          <TitleProvider>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </TitleProvider>
        </WebSocketProvider>
      </NotificationProvider>
    </PrimeReactProvider>
  );
}
