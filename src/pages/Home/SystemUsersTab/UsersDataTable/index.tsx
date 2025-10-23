import { DataTable } from "@/shared/components/DataTable";
import { TableHeaderType } from "@/interfaces/components/TableHeader";
import {
  GetUserResponseKeys,
  type IGetUserResponse,
} from "@/interfaces/services/Users";
import { ColumnsConfig } from "./ColumnsConfig";
import { Card, Badge } from "react-bootstrap";
import { useUsersTab } from "../userTabContext";
import { useRef, useState } from "react";
import { DataTableHeader } from "@/shared/components/DataTable/DataTableHeader";
import { FilterMatchMode } from "primereact/api";
import { CardDetails } from "@/shared/components/Card/CardDetails";
import { DataTable as DataTablePR } from "primereact/datatable";
import { Button } from "@/shared/components";
import { useNotification } from "@/shared/context/Notification";

export const UsersDataTable = () => {
  const { users, getUsers } = useUsersTab();
  const dataTableRef = useRef<DataTablePR<IGetUserResponse[]>>(null!);
  const [dataTableFilter, setDataTableFilter] = useState({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },
  });
  const { Loading, Toast } = useNotification();

  const onRefreshUsers = async () => {
    try {
      Loading.show("Atualizando lista de usuários...");
      await getUsers();
      Toast.show("success", "Sucesso", "Lista de usuários atualizada!");
    } catch (error: unknown) {
      Toast.show(
        "error",
        "Erro ao atualizar usuários",
        (error as { message?: string }).message ||
          "Ocorreu um erro inesperado. Tente novamente."
      );
    } finally {
      Loading.hide();
    }
  };

  return (
    <Card className="shadow-sm">
      <CardDetails
        title="Usuários"
        rightTitleContent={<Badge>{users.length}</Badge>}
        defaultClassName={false}
      >
        <DataTableHeader
          dataTableFilter={dataTableFilter}
          setDataTableFilter={setDataTableFilter}
          type={TableHeaderType.ONLY_SEARCH}
          inputId="search-user"
          leftContent={
            <Button className="" onClick={onRefreshUsers}>
              Atualizar lista
            </Button>
          }
          inputPlaceholder="Buscar usuário..."
        />
        <DataTable
          ref={dataTableRef}
          value={users}
          filters={dataTableFilter}
          dataKey={GetUserResponseKeys.ID}
          emptyMessage="Nenhum usuário encontrado."
          columns={ColumnsConfig()}
          className="p-0"
        />
      </CardDetails>
    </Card>
  );
};
