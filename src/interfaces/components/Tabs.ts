import type { TabProps, TabsProps } from "react-bootstrap";

export interface ITabs extends Omit<TabsProps, "children"> {
  id?: string;
  tabItems: ITabItem[];
  defaultClassName?: boolean;
  defaultTabItemClassName?: boolean;
  defaultTabItemBodyClassName?: boolean;
  tabItemClassName?: string;
  tabItemBodyClassName?: string;
  alignTabTitle?: "center" | "start" | "end";
}

export interface ITabItem extends Omit<TabProps, "children"> {
  id?: string;
  counter?: number;
  body: React.ReactNode;
}
