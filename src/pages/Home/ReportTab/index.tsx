import type { ITabItem } from "@/interfaces/components/Tabs";
import { HomeTabKeys } from "..";
import { ReportsTabProvider } from "./reportTabContext";

export const ReportTab = (): ITabItem => {
  return {
    title: HomeTabKeys.REPORTS,
    eventKey: HomeTabKeys.REPORTS,
    body: <ReportsTabProvider />,
  };
};
