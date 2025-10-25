import { Button } from "@/shared/components"
import type { IColumn } from "@/interfaces/components/Column"
import {
  GetUserResponseKeys,
  type IGetUserResponse,
} from "@/interfaces/services/Users"
import { ButtonIconType } from "@/interfaces/components/Button"
import { useUsersTab } from "../userTabContext"
import { Fragment } from "react"
import { Badge } from "react-bootstrap"

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

  const statusBody = (row: IGetUserResponse) => {
    const isActive = row[GetUserResponseKeys.IS_ACTIVE]
    const text = isActive ? "Ativo" : "Desativado"

    return (
      <Badge
        pill
        style={{ color: "white", minWidth: "70px" }}
        className={`p-2 ${isActive ? "bg-success" : "bg-danger"}`}
      >
        {text}
      </Badge>
    )
  }

  const receiveEmailBody = (row: IGetUserResponse) => {
    const receivesEmail = row[GetUserResponseKeys.RECEIVE_REPORTS]
    const text = receivesEmail ? "Sim" : "Não"

    return (
      <Badge
        pill
        style={{ color: "white", minWidth: "70px" }}
        className={`p-2 ${receivesEmail ? "bg-success" : "bg-danger"}`}
      >
        {text}
      </Badge>
    )
  }

  const isAdminBody = (row: IGetUserResponse) => {
    const isAdmin = row[GetUserResponseKeys.IS_ADMIN]
    const text = isAdmin ? "Sim" : "Não"

    return (
      <Badge
        pill
        style={{ color: "white", minWidth: "70px" }}
        className={`p-2 ${isAdmin ? "bg-success" : "bg-danger"}`}
      >
        {text}
      </Badge>
    )
  }

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
      header: "Status",
      field: GetUserResponseKeys.IS_ACTIVE,
      body: statusBody,
      sortable: true,
    },
    {
      header: "Administrador",
      field: GetUserResponseKeys.IS_ADMIN,
      body: isAdminBody,
      sortable: true,
    },
    {
      header: "Recebe Relatórios",
      field: "receive_email",
      body: receiveEmailBody,
      sortable: true,
    },
    {
      header: "Ações",
      body: actionsBody,
      exportable: false,
    },
  ]
}
