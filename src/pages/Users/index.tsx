import { useEffect, useState } from "react";
import $ from "jquery";
import Nav from "@/shared/components/layout/Nav";
import Header from "@/shared/components/layout/Header";
import "datatables.net-dt";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

const users = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'Administrador', status: 'Ativo', lastLogin: '2023-10-15' },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com', role: 'Editor', status: 'Ativo', lastLogin: '2023-10-14' },
  { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', role: 'Visualizador', status: 'Inativo', lastLogin: '2023-09-20' },
  { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', role: 'Administrador', status: 'Ativo', lastLogin: '2023-10-16' },
  { id: 5, name: 'Carlos Mendes', email: 'carlos@email.com', role: 'Editor', status: 'Pendente', lastLogin: '2023-10-10' },
  { id: 6, name: 'Juliana Alves', email: 'juliana@email.com', role: 'Visualizador', status: 'Ativo', lastLogin: '2023-10-15' },
  { id: 7, name: 'Ricardo Pereira', email: 'ricardo@email.com', role: 'Editor', status: 'Inativo', lastLogin: '2023-09-25' },
  { id: 8, name: 'Fernanda Lima', email: 'fernanda@email.com', role: 'Administrador', status: 'Ativo', lastLogin: '2023-10-16' },
];

const UsersPage = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: 'contains' },
    name: { value: null, matchMode: 'contains' },
    email: { value: null, matchMode: 'contains' },
    role: { value: null, matchMode: 'equals' },
    status: { value: null, matchMode: 'equals' },
  });

  useEffect(() => {
    const table = $("#usersTable").DataTable({
      paging: true,
      searching: true,
      ordering: true,
    });

    $("#usersTable_wrapper").addClass("mt-6 mx-4");

    return () => {
      table.destroy();
    };
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText 
            value={globalFilterValue} 
            onChange={onGlobalFilterChange} 
            placeholder="Buscar usuários..." 
          />
        </IconField>
      </div>
    );
  };

  const statusBodyTemplate = (rowData: { status: string; }) => {
    let severity = '';
    
    switch(rowData.status) {
      case 'Ativo':
        severity = 'success';
        break;
      case 'Inativo':
        severity = 'danger';
        break;
      case 'Pendente':
        severity = 'warning';
        break;
      default:
        severity = 'info';
    }
    
    return <span className={`badge bg-${severity}`}>{rowData.status}</span>;
  };

  const header = renderHeader();

  return (
    <div className="">
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
            header={header}
            filters={filters}
            globalFilterFields={['name', 'email', 'role', 'status']}
            emptyMessage="Nenhum usuário encontrado."
          >
            <Column field="name" header="Nome" sortable filter filterPlaceholder="Buscar por nome" style={{ minWidth: '12rem' }} />
            <Column field="email" header="E-mail" sortable filter filterPlaceholder="Buscar por e-mail" style={{ minWidth: '16rem' }} />
            <Column field="role" header="Função" sortable filter filterPlaceholder="Buscar por função" style={{ minWidth: '10rem' }} />
            <Column field="status" header="Status" sortable filter filterPlaceholder="Buscar por status" body={statusBodyTemplate} style={{ minWidth: '8rem' }} />
            <Column field="lastLogin" header="Último Login" sortable style={{ minWidth: '10rem' }} />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;