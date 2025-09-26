import { lazy, Suspense } from "react";
import { type RouteObject } from "react-router-dom";
import { ContainerRoute } from "@/shared/components";
import { OutletRoute } from "@/shared/components/OutletRoute";
import { HomeRoute } from "./Home";
import { route } from "@/utils/Format/Route";
import { RouteMapKeys, routeMap } from "@/constants/routes";
const LoginProvider = lazy(() =>
  import("@/pages/Login/LoginPageContext").then((module) => ({
    default: module.LoginPageProvider as React.ComponentType<
      Record<string, unknown>
    >,
  }))
);

const NotFound = lazy(() => import("@/pages/NotFound"));
const ErrorBoundary = lazy(
  () => import("@/shared/components/Error/ErrorBoundary")
);

export const Router: RouteObject[] = [
  route({
    path: routeMap[RouteMapKeys.ROOT].path,
    element: <OutletRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: routeMap[RouteMapKeys.NOT_FOUND].path,
        element: (
          <ContainerRoute
            browserTabTitle={routeMap[RouteMapKeys.NOT_FOUND].title}
            hiddenTitle
          >
            <NotFound />
          </ContainerRoute>
        ),
      },
      {
        path: routeMap[RouteMapKeys.LOGIN].path,
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <LoginProvider />
          </Suspense>
        ),
      },
      HomeRoute,
    ],
  }),
];
