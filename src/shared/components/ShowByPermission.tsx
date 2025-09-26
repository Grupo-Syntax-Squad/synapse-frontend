import type { IShowByPermission } from "@/interfaces/components/ShowByPermission";
import { useAuth } from "../context/Auth";

export const ShowByPermission = ({
  permissionItem,
  permissionType,
  children,
}: IShowByPermission) => {
  const { verifyUserProfilePermission } = useAuth();
  const hasPermission = verifyUserProfilePermission(
    permissionItem,
    permissionType
  );
  return hasPermission ? children : null;
};
