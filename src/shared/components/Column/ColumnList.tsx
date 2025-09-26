import { classNames } from "primereact/utils";
import { Column } from ".";
import { ColumnSize, type IColumn } from "@/interfaces/components/Column";

/**
 * *Note* - Need to be used like a function call to "load" the columns on the DataTable, avoid use like a JSX.Element call
 * @param columns : IColumn[]
 * @returns
 */
export function ColumnList(columns: IColumn[]) {
  return columns.map(
    ({
      style,
      columnSize = ColumnSize.DEFAULT,
      bodyClassName,
      hasActionOnDisabled,
      ...rest
    }) => {
      const customStyle = { ...style, minWidth: columnSize };
      const customBodyClassName = classNames(
        hasActionOnDisabled && "p-enabled",
        bodyClassName
      );
      return (
        Object.keys(rest).length && (
          <Column
            key={rest.field}
            sortable
            alignHeader="center"
            align="center"
            style={customStyle}
            bodyClassName={customBodyClassName}
            {...rest}
          />
        )
      );
    }
  );
}
