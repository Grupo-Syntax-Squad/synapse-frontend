import { Button } from ".";
import { ButtonSeverity } from "@/interfaces/components/Button";
import { useAuth, useNotification } from "@/shared/context";
import { useNavigate } from "react-router-dom";
import { routeMap, RouteMapKeys } from "@/constants/routes";

export const LogoutButton = () => {
  const { logout: logoutAuth } = useAuth();
  const navigate = useNavigate();
  const { Loading, Toast } = useNotification();

  const handleLogout = async () => {
    try {
      Loading.show("Logout...");
      await logoutAuth();
      navigate(routeMap[RouteMapKeys.LOGIN].path, { replace: true });
      Loading.hide();
    } catch (error) {
      console.error("Erro no logout:", error);
      Toast.show("error", "Logout", "Failed to logout. Please try again.");
      navigate(routeMap[RouteMapKeys.LOGIN].path, { replace: true });
    }
  };

  return (
    <Button
      severity={ButtonSeverity.SECONDARY}
      className="d-flex flex-grow-1 flex-md-grow-0"
      onClick={handleLogout}
    >
      <i className="bi bi-box-arrow-right me-2" />
      <span>Logout</span>
    </Button>
  );
};
