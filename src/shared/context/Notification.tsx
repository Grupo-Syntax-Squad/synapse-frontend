import { createContext, useContext, useRef } from "react";
import { Toast as ToastComponent, type ToastMessage } from "primereact/toast";
import type { ILoadingForwardHandles } from "@/interfaces/components/Loading";
import { Loading as LoadingComponent } from "@/shared/components/Loading";
import type { IChildrenProps } from "@/interfaces/Common";
import type { INotificationContext } from "@/interfaces/contexts/Notification";

// eslint-disable-next-line react-refresh/only-export-components
export const NotificationContext = createContext<
  INotificationContext | undefined
>(undefined);

export const NotificationProvider = ({ children }: IChildrenProps) => {
  const toastRef = useRef<ToastComponent>(null);
  const loadingRef = useRef<ILoadingForwardHandles>(null);

  const showLoading = (description?: React.ReactNode) => {
    loadingRef.current?.show(description?.toString());
  };
  const hideLoading = () => {
    loadingRef.current?.hide();
  };
  const showToast = (
    type: ToastMessage["severity"],
    title: React.ReactNode,
    description: React.ReactNode
  ) => {
    toastRef.current?.show({
      severity: type,
      summary: title,
      detail: description,
      life: 5000,
    });
  };
  const values: INotificationContext = {
    Loading: {
      show: showLoading,
      hide: hideLoading,
    },
    Toast: {
      show: showToast,
    },
  };
  return (
    <NotificationContext.Provider value={values}>
      <LoadingComponent ref={loadingRef} />
      <ToastComponent ref={toastRef} />
      {children}
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification hook can only be used inside of NotificationProvider"
    );
  }
  return context;
};
