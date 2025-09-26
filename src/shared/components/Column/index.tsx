import { Column as ColumnPR } from "primereact/column";
import { ColumnSize, type IColumn } from "@/interfaces/components/Column";

export const Column = ({
  columnSize = ColumnSize.DEFAULT,
  style,
  ...rest
}: IColumn) => {
  const customStyle = { ...style, minWidth: columnSize };
  //@ts-expect-error @todo: exportField can receive anonymous function that contains the same "field" data
  return <ColumnPR sortable style={customStyle} {...rest} />;
};
