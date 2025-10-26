import { Button, Modal } from "@/shared/components"
import { useAuth, useNotification } from "@/shared/context"
import type {
  TModal,
  TModalForwardHandles,
} from "@/interfaces/components/Modal"
import {
  GetUserResponseKeys,
  type IGetUserResponse,
  type IFilterGetUsers,
  UserUpdateFields,
} from "@/interfaces/services/Users"
import { UserServices } from "@/shared/services/User"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { HomeTabKeys, useHome } from ".."
import { UsersDataTable } from "./UsersDataTable"
import { UserSearchFilters } from "./SearchFilters/UserSearchFilters"
import { UpdateUserForm } from "./UpdateUserForm"
import { Card, CardBody } from "react-bootstrap"
import { CardDetails } from "@/shared/components/Card/CardDetails"

interface IUserContext {
  users: IGetUserResponse[]
  getUsers: (params?: Partial<IFilterGetUsers>) => Promise<void>
  onUseQueryParamsToSearch: (params?: Partial<IFilterGetUsers>) => Promise<void>
  onClearQueryParams: () => void
  onShowModalUpdateUser: (user: IGetUserResponse) => void
  onDeleteUser: (user: IGetUserResponse) => void
}

const UsersTabContext = createContext<IUserContext | undefined>(undefined)

export function UsersTabProvider() {
  const { Loading, Toast } = useNotification()
  const { isActivatedTab } = useHome()
  const { user: authUser } = useAuth()
  const [users, setUsers] = useState<IGetUserResponse[]>([])
  const modalRef = useRef<TModalForwardHandles>(null)

  const onShowModal = (params: TModal) => modalRef.current?.show(params)
  const onHideModal = () => modalRef.current?.hide()

  const getUsers = async (params?: Partial<IFilterGetUsers>) => {
    try {
      if (authUser?.is_admin) {
        Loading.show("Searching for users...")
        const response = await UserServices.getUsers(params)
        setUsers(response)
      } else if (authUser) {
        setUsers([authUser as IGetUserResponse])
      }
    } catch (error) {
      Toast.show("error", "Erro", "Falha ao buscar usuários. Tente novamente.")
    } finally {
      Loading.hide()
    }
  }

  const onUseQueryParamsToSearch = async (
    params?: Partial<IFilterGetUsers>
  ) => {
    await getUsers(params)
  }

  const onClearQueryParams = () => {
    getUsers()
  }

  const onDeleteUser = (user: IGetUserResponse) => {
    const handleConfirmDelete = async () => {
      try {
        Loading.show("Deactivating user...")
        await UserServices.partialUpdateUser({
          id: user.id,
          field: UserUpdateFields.IS_ACTIVE,
          value: false,
        })
        await getUsers()
        Toast.show("success", "Success", "User successfully deactivated!")
      } catch (error: unknown) {
        Toast.show(
          "error",
          "Erro ao desativar usuário",
          (error as { message?: string })?.message ||
            "Ocorreu um erro inesperado."
        )
      } finally {
        Loading.hide()
        onHideModal()
      }
    }

    onShowModal({
      type: "delete",
      header: "Confirm Deactivation",
      body: (
        <span>
          Are you sure you want to deactivate the user{" "}
          <strong>{user.username}</strong>? This action cannot be undone.
        </span>
      ),
      onConfirm: handleConfirmDelete,
      confirmButtonText: "Disable",
      footer: (
        <Button variant="danger" onClick={handleConfirmDelete}>
          Disable
        </Button>
      ),
    })
  }

  const onShowModalUpdateUser = (user: IGetUserResponse) => {
    onShowModal({
      header: `Edit user: ${user.username}`,
      body: <UpdateUserForm userToUpdate={user} onSuccess={onHideModal} />,
    })
  }

  useEffect(() => {
    if (isActivatedTab[HomeTabKeys.USERS]) {
      getUsers()
    }
  }, [isActivatedTab[HomeTabKeys.USERS], authUser])

  const value: IUserContext = {
    users,
    getUsers,
    onUseQueryParamsToSearch,
    onClearQueryParams,
    onShowModalUpdateUser,
    onDeleteUser,
  }

  return (
    <UsersTabContext.Provider value={value}>
      {authUser?.is_admin ? (
        <>
          <UserSearchFilters
            onUseQueryParamsToSearch={onUseQueryParamsToSearch}
            onClearQueryParams={onClearQueryParams}
          />
          <UsersDataTable />
        </>
      ) : (
        <Card className="shadow-sm">
          <CardDetails title="My Profile">
            <CardBody>
              {authUser && (
                <UpdateUserForm userToUpdate={authUser as IGetUserResponse} />
              )}
            </CardBody>
          </CardDetails>
        </Card>
      )}
      <Modal ref={modalRef} />
    </UsersTabContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUsersTab = () => {
  const context = useContext(UsersTabContext)
  if (!context) {
    throw new Error(
      "useUsersTab hook can only be used inside UsersTabProvider."
    )
  }
  return context
}
