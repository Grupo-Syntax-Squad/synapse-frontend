import { forwardRef, type JSX } from "react";
import {
  type DataTableDataSelectableEvent,
  DataTable as DataTablePR,
  type DataTableProps,
  type DataTableValue,
} from "primereact/datatable";
import type { IColumn } from "@/interfaces/components/Column";
import { ColumnList } from "../Column/ColumnList";
import { Feedback } from "../FormFields/Feedback";
import { classNames } from "primereact/utils";
import { ActivityStatusFormat, YesOrNoFormat } from "@/interfaces/utils/Format";
interface Props<T extends DataTableValue>
  extends Omit<DataTableProps<T[]>, "children" | "exportFilename" | "dataKey"> {
  columns: IColumn[];
  dataKey?: string | ((data: unknown) => string) | undefined;
  error?: string;
  disabledRowByKey?: keyof T;
  isLastRequestPage?: boolean;
  hidePaginator?: boolean;
  useValueAsTotalRecords?: boolean;
}

const DataTableInner = forwardRef(
  <T extends DataTableValue>(
    {
      columns,
      error,
      className,
      disabledRowByKey,
      value = [],
      isLastRequestPage,
      virtualScrollerOptions,
      totalRecords,
      hidePaginator,
      useValueAsTotalRecords,
      rows = 10,
      ...rest
    }: Props<T>,
    ref: React.Ref<DataTablePR<T[]> | null>
  ) => {
    const currentPageReportTemplate = `Showing {first} of ${
      useValueAsTotalRecords ? Math.min(value.length, rows) : "{last}"
    } items, Total ${
      typeof isLastRequestPage === "boolean" &&
      !isLastRequestPage &&
      totalRecords != 0
        ? "+"
        : ""
    }${useValueAsTotalRecords ? value.length : "{totalRecords}"}`;

    const customClassName = classNames(
      "border-top",
      className,
      error && "border-danger is-invalid"
    );
    const rowClassName = (row: T) =>
      typeof row[disabledRowByKey as keyof T] === "string"
        ? row[disabledRowByKey as keyof T] === ActivityStatusFormat.ACTIVE ||
          row[disabledRowByKey as keyof T] === YesOrNoFormat.YES
          ? ""
          : "p-disabled-row"
        : (row[disabledRowByKey as keyof T] as boolean)
        ? ""
        : "p-disabled-row";
    const isRowSelectable = (event: DataTableDataSelectableEvent) =>
      typeof (event.data as T)[disabledRowByKey as keyof T] === "string"
        ? (event.data as T)[disabledRowByKey as keyof T] ===
            ActivityStatusFormat.ACTIVE ||
          (event.data as T)[disabledRowByKey as keyof T] === YesOrNoFormat.YES
        : ((event.data as T)[disabledRowByKey as keyof T] as boolean);

    return (
      <>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <DataTablePR<T[]>
          csvSeparator=";"
          ref={ref}
          value={value}
          virtualScrollerOptions={
            virtualScrollerOptions && value && value.length > 0
              ? virtualScrollerOptions
              : undefined
          }
          rows={rows}
          rowsPerPageOptions={[10, 25, 50, 100]}
          emptyMessage="No any records found."
          scrollHeight="70vh"
          paginator
          paginatorTemplate={
            hidePaginator
              ? ""
              : "CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink RowsPerPageDropdown"
          }
          currentPageReportTemplate={currentPageReportTemplate}
          scrollable
          className={customClassName}
          removableSort
          paginatorClassName={hidePaginator ? "d-none" : undefined}
          stripedRows
          sortOrder={1}
          rowClassName={
            disabledRowByKey !== undefined ? rowClassName : undefined
          }
          isDataSelectable={
            disabledRowByKey !== undefined ? isRowSelectable : undefined
          }
          totalRecords={totalRecords}
          {...rest}
        >
          {ColumnList(columns)}
        </DataTablePR>
        <Feedback message={error} />
      </>
    );
  }
);

DataTableInner.displayName = "DataTable";

export const DataTable = DataTableInner as <T extends DataTableValue>(
  props: Props<T> & { ref?: React.RefObject<DataTablePR<T[]>> }
) => JSX.Element;
