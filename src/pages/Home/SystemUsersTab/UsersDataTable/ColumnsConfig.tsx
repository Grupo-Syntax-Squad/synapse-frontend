import { Button } from "@/shared/components"
import type { IColumn } from "@/interfaces/components/Column"
import {
  GetUserResponseKeys,
  type IGetUserResponse,
} from "@/interfaces/services/Users"
import { ButtonIconType } from "@/interfaces/components/Button"
import { useUsersTab } from "../userTabContext"
import { Fragment } from "react"

export const ColumnsConfig = (): IColumn[] => {
  const { onShowModalViewUserDetails, onShowModalUpdateUser, onDeleteUser } =
    useUsersTab()

  const actionsBody = (row: IGetUserResponse) => (
    <Fragment>
      <Button
        outline
        btnIcon
        iconType={ButtonIconType.SEE}
        onClick={() => onShowModalViewUserDetails(row)}
        className="me-2"
      />
      <Button
        outline
        btnIcon
        iconType={ButtonIconType.EDIT}
        onClick={() => onShowModalUpdateUser(row)}
        className="me-2"
      />
      <Button
        outline
        btnIcon
        iconType={ButtonIconType.DELETE}
        onClick={() => onDeleteUser(row)}
      />
    </Fragment>
  )

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
      body: (row) => (row.is_admin ? "Sim" : "Não"),
      sortable: true,
    },
    {
      header: "Recebe Relatórios",
      field: "receive_email",
      body: (row) => (row.receive_email ? "Sim" : "Não"),
      sortable: true,
    },
    {
      header: "Ações",
      body: actionsBody,
      exportable: false,
    },
  ]
}
