import type { IChildrenProps } from "@/interfaces/Common";
import { useAuth } from "@/shared/context/Auth";

export const GlobalContexts = ({ children }: IChildrenProps) => {
  const { loading } = useAuth();
  if (loading) return <></>;
  return <>{children}</>;
};
