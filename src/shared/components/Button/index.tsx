import { Button as ButtonRB } from "react-bootstrap";
import {
  ButtonSeverity,
  ButtonIconType,
  type TButtonProps,
  ButtonTooltip,
} from "@/interfaces/components/Button";
import { classNames } from "primereact/utils";
import type { IShowByPermission } from "@/interfaces/components/ShowByPermission";
import { ShowByPermission } from "../ShowByPermission";
import { Tooltip } from "primereact/tooltip";

const getTooltipButton = (iconType?: ButtonIconType) => {
  const tooltips: Record<ButtonIconType, string> = {
    [ButtonIconType.ADD]: ButtonTooltip.ADD,
    [ButtonIconType.CANCEL]: ButtonTooltip.CANCEL,
    [ButtonIconType.CONFIRM]: ButtonTooltip.CONFIRM,
    [ButtonIconType.SEARCH]: ButtonTooltip.SEARCH,
    [ButtonIconType.DELETE]: ButtonTooltip.DELETE,
    [ButtonIconType.EDIT]: ButtonTooltip.EDIT,
    [ButtonIconType.SEE]: ButtonTooltip.SEE,
    [ButtonIconType.CLEAR]: ButtonTooltip.CLEAR,
    [ButtonIconType.ZOOM_IN]: ButtonTooltip.ZOOM_IN,
    [ButtonIconType.ZOOM_OUT]: ButtonTooltip.ZOOM_OUT,
    [ButtonIconType.LINK]: ButtonTooltip.LINK,
    [ButtonIconType.SETTING]: ButtonTooltip.SETTING,
  };
  return iconType ? tooltips[iconType] : undefined;
};
const getSeverityButton = (iconType?: ButtonIconType) => {
  const severities = {
    [ButtonIconType.CONFIRM]: ButtonSeverity.SUCCESS,
    [ButtonIconType.CANCEL]: ButtonSeverity.DANGER,
    [ButtonIconType.DELETE]: ButtonSeverity.DANGER,
    [ButtonIconType.CLEAR]: ButtonSeverity.DANGER,
  };
  return iconType && iconType in severities
    ? severities[iconType as keyof typeof severities]
    : "primary";
};

export const Button = ({
  iconType,
  severity,
  className,
  children,
  btnIcon,
  outline,
  tooltip,
  ...buttonProps
}: TButtonProps) => {
  const customSeverity = severity || getSeverityButton(iconType);
  const buttonTooltip = tooltip || getTooltipButton(iconType);
  const customVariant = outline ? `outline-${customSeverity}` : customSeverity;
  const customClassName = classNames(
    "flex-center gap-2",
    btnIcon ? "btn-icon" : "btn-min-width",
    className
  );

  const HandleButton = () => {
    const { permissionItem, permissionType, ...rest } =
      buttonProps as IShowByPermission;

    const buttonId = `btn-${Math.random().toString(36).substring(7)}`;

    const Content = () => (
      <>
        {iconType && (
          <Tooltip
            target={`#${buttonId}`}
            content={buttonTooltip}
            position="top"
          />
        )}
        <ButtonRB
          id={buttonId}
          data-pr-tooltip={buttonTooltip}
          variant={customVariant}
          className={customClassName}
          {...rest}
        >
          {iconType && <i className={classNames("bi", iconType)} />}
          {children}
        </ButtonRB>
      </>
    );

    return permissionItem && permissionType ? (
      <ShowByPermission
        permissionItem={permissionItem}
        permissionType={permissionType}
      >
        <Content />
      </ShowByPermission>
    ) : (
      <Content />
    );
  };

  return <HandleButton />;
};
