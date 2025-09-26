import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { ContainerRoute } from "@/shared/components";
import { routeMap, RouteMapKeys } from "@/constants/routes";

const HomeProvider = lazy(() => import("@/pages/Home"));

export const HomeRoute: RouteObject = {
  index: true,
  element: (
    <ContainerRoute
      browserTabTitle={routeMap[RouteMapKeys.HOME].title}
      profilesCanAccess={routeMap[RouteMapKeys.HOME].profilesCanAccess}
    >
      <HomeProvider />
    </ContainerRoute>
  ),
};

export const ManagementRoutes: RouteObject = {
  path: routeMap[RouteMapKeys.HOME].path,
  children: [HomeRoute],
};
