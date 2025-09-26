import { routeMap, RouteMapKeys } from "@/constants/routes";
import { ParamsConstantsKeys } from "@/interfaces/constants/routes";
import type { RouteObject } from "react-router";

export function clearPath(path: string) {
  return path.startsWith("/") ? path.slice(1) : path;
}

export function route(item: RouteObject) {
  const props = item;
  if (item.path) {
    props.path = clearPath(item.path);
  }
  if (item.children) {
    props.children = item.children.map(route);
  }
  return props;
}

export function getRoutePath(key: RouteMapKeys) {
  const parts = key.split(".");
  let relativePath = "";
  parts.forEach((_, index) => {
    const currentKey = parts.slice(0, index + 1).join(".") as RouteMapKeys;
    if (routeMap[currentKey]) {
      relativePath += routeMap[currentKey].path;
    }
  });
  return relativePath.includes(`/:${ParamsConstantsKeys.DEFAULT_TAB}`)
    ? relativePath.replace(`/:${ParamsConstantsKeys.DEFAULT_TAB}`, "")
    : relativePath;
}
