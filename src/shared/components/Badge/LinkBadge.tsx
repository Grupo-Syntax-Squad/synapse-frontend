import { ButtonSeverity } from "@/interfaces/components/Button";
import { Button } from "../Button";
import type { To } from "react-router-dom";
import { CopyContent } from "../CopyContent";
import type { ICopyContent } from "@/interfaces/components/CopyContent";
import { classNames } from "primereact/utils";
import {
  PermissionsItems,
  type PermissionsTypes,
} from "@/constants/permissions";
import { useAuth } from "@/shared/context";
import { Tooltip } from "primereact/tooltip";

interface Props extends Omit<ICopyContent, "label"> {
  navigateTo?: To;
  onLinkClick?: () => void;
  badgeLabel?: string | number | null;
  label?: string | null;
  permissionItem?: PermissionsItems;
  permissionType?: PermissionsTypes[];
  className?: string;
}

export const LinkBadge = ({
  navigateTo,
  onLinkClick,
  badgeLabel,
  label,
  permissionItem,
  permissionType,
  className,
  ...rest
}: Props) => {
  const { verifyUserProfilePermission } = useAuth();
  const hasActionOrNavigate = !!navigateTo || !!onLinkClick;
  const customButtonClassName = classNames(
    "border-0 p-0",
    hasActionOrNavigate
      ? "text-primary fw-bold text-decoration-underline"
      : "text-dark cursor-text",
    className
  );

  const handleAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (navigateTo) {
      window.open(navigateTo.toString(), "_blank");
    } else if (onLinkClick) {
      onLinkClick();
    }
  };

  const userHasPermission = () => {
    if (permissionItem && permissionType)
      return verifyUserProfilePermission(permissionItem, permissionType);
    return true;
  };

  return (
    <div className="d-flex flex-column gap-1 text-nowrap">
      <span>
        <Button
          severity={ButtonSeverity.NONE}
          className={customButtonClassName}
          disabled={!userHasPermission()}
        >
          {badgeLabel && <CopyContent label={badgeLabel} {...rest} />}
          {hasActionOrNavigate && (
            <>
              <Tooltip target=".Link" content="Ver detalhes" position="top" />
              <i
                onMouseDown={handleAction}
                className="bi bi-box-arrow-up-right ms-1 Link"
              />
            </>
          )}
        </Button>
      </span>
      <span>
        {label && <span className="text-sm text-center">{label}</span>}
      </span>
    </div>
  );
};
