import type { DataTable, DataTableValue } from "primereact/datatable";

export type TDataTable<T extends DataTableValue> = DataTable<T[]>;


// Em src/interfaces/components/DataTable.ts
export interface IColumn {
  // ... propriedades da coluna
}