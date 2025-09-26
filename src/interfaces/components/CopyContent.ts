import type { Variant } from "react-bootstrap/esm/types";

export enum CopyContentType {
  BADGE = "badge",
  TEXT = "text",
}

export interface ICopyContent {
  type?: CopyContentType;
  toCopy?: string | number | null;
  label: string | number | null;
  toastHeader: string;
  defaultTextColor?: boolean;
  badgeBackground?: Variant;
}
