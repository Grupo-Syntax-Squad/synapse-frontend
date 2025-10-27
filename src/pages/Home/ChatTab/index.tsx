import type { ITabItem } from "@/interfaces/components/Tabs";
import { HomeTabKeys } from "..";
import ChatProvider from "./ChatProvider";

export const ChatTab = (): ITabItem => {
  return {
    title: HomeTabKeys.CHAT,
    eventKey: HomeTabKeys.CHAT,
    body: <ChatProvider />,
  };
};
