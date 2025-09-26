import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useNotification, useTitle } from "@/shared/context";
import DrawLoginSteps from "./DrawLoginSteps";
import { AuthBackground } from "@/shared/components/AuthBackground";
import { routeMap, RouteMapKeys } from "@/constants/routes";

export function Login() {
  const { setTitle } = useTitle();
  const { user, isAuthenticated } = useAuth();
  const { Loading } = useNotification();
  const nav = useNavigate();
  const location = useLocation();

  const redirectRoute = () => {
    Loading.show("Verificando sessão...");
    nav(location.state?.from?.pathname || routeMap[RouteMapKeys.ROOT].path, {
      replace: true,
    });
    Loading.hide();
  };

  useEffect(() => {
    setTitle(routeMap[RouteMapKeys.LOGIN].title);
  }, [setTitle]);

  useEffect(() => {
    if (user?.id && isAuthenticated) {
      redirectRoute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAuthenticated]);

  return (
    !user?.id &&
    !isAuthenticated && (
      <AuthBackground>
        <div className="w-100 bg-light rounded shadow-sm">
          <DrawLoginSteps />
        </div>
      </AuthBackground>
    )
  );
}
