import ReportsPage from "@/pages/Reports";
import UsersPage from "@/pages/Users";
import { Routes, Route, Navigate } from "react-router-dom";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  
  return (
    <Routes>
        <>
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/" element={<Navigate to="/reports" replace />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users" element={<Navigate to="/users" replace />} />
        </>
    </Routes>
  );
}

export default App;