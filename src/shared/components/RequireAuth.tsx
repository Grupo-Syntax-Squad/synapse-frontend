import { RoleKeys } from "@/constants/permissions";
import { useEffect, useState, type JSX } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/Auth";
import { routeMap, RouteMapKeys } from "@/constants/routes";
import NotFound from "@/pages/NotFound";

interface Props {
  children: JSX.Element;
  profilesCanAccess?: RoleKeys[];
}

export function RequireAuth({ children, profilesCanAccess }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, logout } = useAuth();

  const [render, setRender] = useState<JSX.Element>();
  const notRequiredAuth = [routeMap[RouteMapKeys.LOGIN].path];

  const checkAuthentication = async () => {
    try {
      if (loading) return;

      const requiresAuth = !notRequiredAuth.includes(location.pathname);

      // Não autenticado → manda pro login
      if (!isAuthenticated && requiresAuth) {
        navigate(routeMap[RouteMapKeys.LOGIN].path, { replace: true });
        return;
      }

      setRender(handleAccessRoute());
    } catch (error) {
      console.error("Erro na verificação de autenticação:", error);
      await logout();
      navigate(routeMap[RouteMapKeys.LOGIN].path, { replace: true });
    }
  };

  const handleAccessRoute = () => {
    if (profilesCanAccess && user) {
      const userRole = user.is_admin ? RoleKeys.ADMIN : RoleKeys.USER;

      if (!profilesCanAccess.includes(userRole)) {
        return (
          <NotFound
            title="Access Denied"
            description="You do not have permission to access this page."
          />
        );
      }
    }
    return children;
  };

  useEffect(() => {
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAuthenticated, loading, location.pathname]);

  return render || <></>;
}
