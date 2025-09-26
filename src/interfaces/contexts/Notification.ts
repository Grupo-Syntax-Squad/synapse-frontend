import type { ToastMessage } from "primereact/toast";
import type { ILoadingForwardHandles } from "../components/Loading";

export interface INotificationContext {
  Toast: {
    show: (
      type: ToastMessage["severity"],
      title: React.ReactNode,
      description: React.ReactNode
    ) => void;
  };
  Loading: ILoadingForwardHandles;
}

export interface INotificationToastProps {
  type: ToastMessage["severity"];
  title: React.ReactNode;
  description: React.ReactNode;
}
