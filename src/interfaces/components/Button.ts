import type { ButtonProps as ButtonPropsRB } from "react-bootstrap";
import type { IShowByPermission } from "./ShowByPermission";

export interface BaseProps extends Omit<ButtonPropsRB, "severity"> {
  iconType?: ButtonIconType;
  severity?: ButtonSeverity;
  outline?: boolean;
  btnIcon?: boolean;
  tooltip?: string;
}

export enum ButtonSeverity {
  SECONDARY = "secondary",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  DANGER = "danger",
  HELP = "help",
  NONE = "none",
  LINK = "link",
}

export enum ButtonIconType {
  ADD = "bi-plus-lg",
  CANCEL = "bi-x-lg",
  CONFIRM = "bi-check-lg",
  SEARCH = "bi-search",
  DELETE = "bi-trash-fill",
  EDIT = "bi-pencil-square",
  CLEAR = "bi-eraser-fill",
  SEE = "bi-eye-fill",
  ZOOM_IN = "bi-plus",
  ZOOM_OUT = "bi-dash",
  LINK = "bi-box-arrow-up-right",
  SETTING = "bi-gear-fill",
}

export enum ButtonTooltip {
  ADD = "Add new",
  CANCEL = "Cancel",
  CLOSE = "Close",
  CONFIRM = "Confirm",
  SEARCH = "Search",
  DELETE = "Delete",
  EDIT = "Edit",
  CLEAR = "Clear filters",
  SEE = "See more details",
  ZOOM_IN = "Expand",
  ZOOM_OUT = " Retract",
  LINK = "Go to Link",
  SETTING = "Settings",
}

type WithPermission = BaseProps & IShowByPermission;
export type TButtonProps = BaseProps | WithPermission;
