import type {
  IUserFormatField,
  TFormatFieldBadge,
} from "@/interfaces/components/FormatField";
import { LinkBadge } from "../Badge/LinkBadge";
import { getRoutePath } from "@/utils/Format/Route";
import { RouteMapKeys } from "@/constants/routes";

export const UserFormatField = ({
  toCopy,
  name,
  permissionItem,
  permissionType,
  userId,
}: TFormatFieldBadge<IUserFormatField>) => {
  const navigateToDetails = getRoutePath(RouteMapKeys.HOME) + userId.toString();
  return (
    <LinkBadge
      toastHeader="Código SAP do usuário"
      badgeLabel={toCopy}
      label={name}
      navigateTo={navigateToDetails}
      permissionItem={permissionItem}
      permissionType={permissionType}
    />
  );
};
