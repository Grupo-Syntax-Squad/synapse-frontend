import { useState } from "react";
import Nav from "@/shared/components/layout/Nav";
import Header from "@/shared/components/layout/Header";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import type { User } from "@/shared/components/interfaces/User";
import { useNavigate } from "react-router-dom";


const users = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', status: 'Ativo', receiveReports: true },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com', status: 'Ativo', receiveReports: false },
  { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', status: 'Inativo', receiveReports: true },
  { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', status: 'Ativo', receiveReports: true },
  { id: 5, name: 'Carlos Mendes', email: 'carlos@email.com', status: 'Pendente', receiveReports: false },
  { id: 6, name: 'Juliana Alves', email: 'juliana@email.com', status: 'Ativo', receiveReports: true },
  { id: 7, name: 'Ricardo Pereira', email: 'ricardo@email.com', status: 'Inativo', receiveReports: false },
  { id: 8, name: 'Fernanda Lima', email: 'fernanda@email.com', status: 'Ativo', receiveReports: true },
];

const UsersPage = () => {
   const navigate = useNavigate();
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: 'contains' },
    name: { value: null, matchMode: 'contains' },
    email: { value: null, matchMode: 'contains' },
    role: { value: null, matchMode: 'equals' },
    status: { value: null, matchMode: 'equals' },
  });

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => (
    <div className="flex justify-end mb-3">
      <IconField iconPosition="right">
        <InputIcon className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Pesquisar Usuário..."
          className="w-64"
        />
      </IconField>
    </div>
  );

  const statusBodyTemplate = (rowData: any) => {
    const bgColor =
      rowData.status === "Ativo"
        ? "bg-green-500 text-white"
        : rowData.status === "Inativo"
        ? "bg-red-500 text-white"
        : "bg-yellow-400 text-black";
    return <span className={`px-3 py-1 rounded-md text-lg ${bgColor}`}>{rowData.status}</span>;
  };

  const receiveReportsBodyTemplate = (rowData: any) => {
    const bgColor = rowData.receiveReports ? "bg-green-500" : "bg-red-500";
    const text = rowData.receiveReports ? "Yes" : "No";
    return <span className={`px-3 py-1 rounded-md text-white text-lg ${bgColor}`}>{text}</span>;
  };

const actionBodyTemplate = (rowData: any) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text p-button-info"
        onClick={() => navigate(`/users/${rowData.id}/edit`)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-text p-button-danger"
        onClick={() => alert(`Deletando usuário: ${rowData.name}`)}
      />
    </div>
  );

  return (
    <div>
      <Header />
      <Nav />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6">Gerenciamento de Usuários</h1>
        
        <div className="card">
          <DataTable 
            value={users} 
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]} 
            tableStyle={{ minWidth: '50rem' }} 
            header={renderHeader()}
            filters={filters}
            globalFilterFields={['name', 'email', 'role', 'status']}
            emptyMessage="Nenhum usuário encontrado."
          >
            <Column field="name" header="Nome" sortable filter filterPlaceholder="Buscar por nome" style={{ minWidth: '12rem' }} />
            <Column field="email" header="E-mail" sortable filter filterPlaceholder="Buscar por e-mail" style={{ minWidth: '16rem' }} />
            <Column field="receiveReports" header="Receive Reports" body={receiveReportsBodyTemplate} style={{ minWidth: '8rem' }} />
            <Column field="status" header="Status" sortable filter filterPlaceholder="Buscar por status" body={statusBodyTemplate} style={{ minWidth: '8rem' }} />
            <Column header="Ações" body={actionBodyTemplate} style={{ minWidth: '10rem' }} />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
