import type { ITabItem } from "@/interfaces/components/Tabs";
import { HomeTabKeys } from "..";
import { UsersTabProvider } from "./userTabContext";

export const SystemUsersTab = (): ITabItem => {
  return {
    title: HomeTabKeys.USERS,
    eventKey: HomeTabKeys.USERS,
    body: <UsersTabProvider />,
  };
};
