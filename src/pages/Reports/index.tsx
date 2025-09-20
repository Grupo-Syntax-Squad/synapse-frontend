import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import type { Report } from "@/shared/components/interfaces/Report";
import Nav from "@/shared/components/layout/Nav";
import Header from "@/shared/components/layout/Header";

const reports = [
  { id: 1, name: "Relatório Financeiro", date: "2025-09-01", receiveReports: true },
  { id: 2, name: "Relatório de Vendas", date: "2025-09-05", receiveReports: false },
  { id: 3, name: "Relatório de Estoque", date: "2025-09-10", receiveReports: true },
];

const ReportsPage = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
    dateFrom: { value: null, matchMode: "custom" },
    dateTo: { value: null, matchMode: "custom" },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      global: { ...prev.global, value },
    }));
    setGlobalFilterValue(value);
  };

  const dateFilterFunction = (value: string, filter: { dateFrom: Date | null; dateTo: Date | null }) => {
    const rowDate = new Date(value);
    const { dateFrom, dateTo } = filter;

    if (dateFrom && rowDate < dateFrom) return false;
    if (dateTo && rowDate > dateTo) return false;
    return true;
  };

  const header = (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
      <div className="flex gap-2">
        
        <Calendar
          placeholder="Data inicial"
          value={filters.dateFrom.value}
          onChange={(e) => setFilters((prev) => ({ ...prev, dateFrom: { ...prev.dateFrom, value: e.value } }))}
        />
        <Calendar
          placeholder="Data final"
          value={filters.dateTo.value}
          onChange={(e) => setFilters((prev) => ({ ...prev, dateTo: { ...prev.dateTo, value: e.value } }))}
        />
      </div>
      <input
        type="text"
        placeholder="Pesquisar relatório..."
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        className="p-inputtext p-component w-64"
      />
    </div>
  );

  return (
    <div>
      <Header/>
      <Nav/>
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Relatórios</h1>

      <DataTable
        value={reports}
        paginator
        rows={10}
        filters={filters}
        globalFilterFields={["name", "date"]}
        tableStyle={{ minWidth: "50rem" }}
        header={header}
      >
        <Column field="name" header="Nome" sortable filter />
        <Column
          field="date"
          header="Data"
          sortable
          filter
          filterFunction={() => {
            return (rowData: any) =>
              dateFilterFunction(rowData.date, {
                dateFrom: filters.dateFrom.value,
                dateTo: filters.dateTo.value,
              });
          }}
        />
        <Column
          field="receiveReports"
          header="Receive Reports"
          body={(rowData) => (
            <span
              className={`px-3 py-1 rounded-md text-white text-lg ${
                rowData.receiveReports ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {rowData.receiveReports ? "Yes" : "No"}
            </span>
          )}
        />
        <Column
          header="Ações"
          body={(rowData) => (
            <div className="flex gap-2">
              <Button icon="pi pi-eye" className="p-button-rounded p-button-text p-button-info" />
            </div>
          )}
        />
      </DataTable>
    </div>
    </div>

  );
};

export default ReportsPage;
