import { PrimeReactProvider } from "primereact/api";
import { NotificationProvider } from "./shared/context/Notification";
import { TitleProvider } from "./shared/context/Title";
import { AuthProvider } from "./shared/context/Auth";
import { Routes } from "./routes";

export default function App() {
  return (
    <PrimeReactProvider>
      <NotificationProvider>
        <TitleProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </TitleProvider>
      </NotificationProvider>
    </PrimeReactProvider>
  );
}
