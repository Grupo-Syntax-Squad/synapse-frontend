import ReportsPage from "@/pages/Reports";
import UsersPage from "@/pages/Users";
import SettingsPage from "@/pages/Settings";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  const isLoggedIn = true;

  return (
    <Routes>
      {!isLoggedIn && (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}

      {isLoggedIn && (
        <>
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/" element={<Navigate to="/reports" replace />} />
          <Route path="*" element={<Navigate to="/reports" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
