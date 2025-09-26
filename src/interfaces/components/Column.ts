import type { ColumnProps } from "primereact/column";

export enum ColumnSize {
  DEFAULT = "auto",
  SMALL = "100px",
  MEDIUM = "200px",
  LARGE = "400px",
}

export interface IColumn extends Omit<ColumnProps, "exportField"> {
  exportField?: ((row: unknown) => string | undefined) | string;
  columnSize?: ColumnSize;
  hasActionOnDisabled?: boolean;
}
