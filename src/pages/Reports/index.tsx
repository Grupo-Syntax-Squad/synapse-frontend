import { useState } from "react";
import Nav from "@/shared/components/layout/Nav";
import Header from "@/shared/components/layout/Header";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

const reports = [
  { id: 1, name: 'Relatório Financeiro', date: '01/09/2025', preview: 10 },
  { id: 2, name: 'Relatório de Vendas', date: '05/09/2025', preview: 20 },
  { id: 3, name: 'Relatório de Estoque', date: '10/09/2025', preview: 15 },
];

const ReportsPage = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: 'contains' }
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-end">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Pesquisar relatório..."
          />
        </IconField>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <Nav />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">Relatórios</h1>

        <DataTable
          value={reports}
          paginator
          rows={10}
          filters={filters}
          globalFilterFields={['name', 'date']}
          tableStyle={{ minWidth: '50rem' }}
          header={renderHeader()}
        >
          <Column field="name" header="Nome" sortable filter />
          <Column field="date" header="Data" sortable />
          <Column field="preview" header="Preview" sortable />
        </DataTable>
      </div>
    </div>
  );
};

export default ReportsPage;
