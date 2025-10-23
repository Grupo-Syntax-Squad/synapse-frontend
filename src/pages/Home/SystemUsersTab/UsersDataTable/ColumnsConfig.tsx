import { Button } from "@/shared/components";
import type { IColumn } from "@/interfaces/components/Column";
import {
  GetUserResponseKeys,
  type IGetUserResponse,
} from "@/interfaces/services/Users";
import { ButtonIconType } from "@/interfaces/components/Button";
import { useUsersTab } from "../userTabContext";

export const ColumnsConfig = (): IColumn[] => {
  const { onShowModalViewUserDetails } = useUsersTab();

  const previewUserBody = (row: IGetUserResponse) => (
    <Button
      outline
      btnIcon
      iconType={ButtonIconType.SEE}
      onClick={() => onShowModalViewUserDetails(row)}
    />
  );

  return [
    {
      header: "Nome de Usuário",
      field: GetUserResponseKeys.USERNAME,
      align: "left",
      sortable: true,
    },
    {
      header: "E-mail",
      field: GetUserResponseKeys.EMAIL,
      align: "left",
      sortable: true,
    },
    {
      header: "Administrador",
      field: "is_admin",
      body: (row) => row.is_admin ? "Sim" : "Não",
      sortable: true,
    },
    {
      header: "Recebe Relatórios",
      field: "receive_email",
      body: (row) => row.receive_email ? "Sim" : "Não",
      sortable: true,
    },
    {
      header: "Detalhes",
      body: previewUserBody,
      exportable: false,
    },
  ];
};
