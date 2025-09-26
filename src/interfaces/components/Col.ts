import type { ColProps } from "react-bootstrap";

export enum ColType {
  BASIC_FORM,
  MODAL_FORM,
  LARGE_MODAL_FORM,
  FULL_WIDTH,
}

export interface IColBreakpoints extends IColType {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

export interface IColType {
  colType?: ColType;
}

export type TCol = IColBreakpoints & ColProps;
