import type { DataTable, DataTableValue } from "primereact/datatable";

export type TDataTable<T extends DataTableValue> = DataTable<T[]>;
