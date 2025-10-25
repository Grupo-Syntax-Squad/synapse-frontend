import { Button, Modal } from "@/shared/components"
import { useNotification } from "@/shared/context"
import type {
  TModal,
  TModalForwardHandles,
} from "@/interfaces/components/Modal"
import {
  GetUserResponseKeys,
  type IGetUserResponse,
  type IFilterGetUsers,
  UserUpdateFields,
  type IUpdateUserRequest,
} from "@/interfaces/services/Users"
import { UserServices } from "@/shared/services/User"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { HomeTabKeys, useHome } from ".."
import { UsersDataTable } from "./UsersDataTable"
import { UserSearchFilters } from "./SearchFilters/UserSearchFilters"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Form } from "react-bootstrap"

const updateUserSchema = yup.object().shape({
  username: yup.string().required("Nome de usuário é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  is_admin: yup.boolean().required(),
  receive_email: yup.boolean().required(),
})

interface IUserContext {
  users: IGetUserResponse[]
  getUsers: (params?: Partial<IFilterGetUsers>) => Promise<void>
  onUseQueryParamsToSearch: (params?: Partial<IFilterGetUsers>) => Promise<void>
  onClearQueryParams: () => void
  onShowModalViewUserDetails: (user: IGetUserResponse) => void
  onShowModalUpdateUser: (user: IGetUserResponse) => void
  onDeleteUser: (user: IGetUserResponse) => void
}

const UsersTabContext = createContext<IUserContext | undefined>(undefined)

export function UsersTabProvider() {
  const { Loading, Toast } = useNotification()
  const { isActivatedTab } = useHome()
  const [users, setUsers] = useState<IGetUserResponse[]>([])
  const modalRef = useRef<TModalForwardHandles>(null)

  const onShowModal = (params: TModal) => modalRef.current?.show(params)
  const onHideModal = () => modalRef.current?.hide()

  const getUsers = async (params?: Partial<IFilterGetUsers>) => {
    try {
      Loading.show("Buscando usuários...")
      const response = await UserServices.getUsers(params)
      setUsers(response)
    } catch {
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

  const onShowModalViewUserDetails = (user: IGetUserResponse) => {
    onShowModal({
      type: "message",
      header: `Detalhes do Usuário: ${user[GetUserResponseKeys.USERNAME]}`,
      className: "w-50",
      body: (
        <div className="p-3">
          <p>
            <strong>E-mail:</strong> {user[GetUserResponseKeys.EMAIL]}
          </p>
          <p>
            <strong>Administrador:</strong>{" "}
            {user[GetUserResponseKeys.IS_ADMIN] ? "Sim" : "Não"}
          </p>
          <p>
            <strong>Recebe Relatórios:</strong>{" "}
            {user[GetUserResponseKeys.RECEIVE_REPORTS] ? "Sim" : "Não"}
          </p>
        </div>
      ),
    })
  }

  const onDeleteUser = (user: IGetUserResponse) => {
    const handleConfirmDelete = async () => {
      try {
        Loading.show("Desativando usuário...")
        await UserServices.partialUpdateUser({
          id: user.id,
          field: UserUpdateFields.IS_ACTIVE,
          value: false,
        })
        await getUsers()
        Toast.show("success", "Sucesso", "Usuário desativado com sucesso!")
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
      header: "Confirmar Desativação",
      body: (
        <span>
          Você tem certeza que deseja desativar o usuário{" "}
          <strong>{user.username}</strong>? Esta ação não poderá ser desfeita.
        </span>
      ),
      onConfirm: handleConfirmDelete,
      confirmButtonText: "Desativar",
      footer: (
        <Button variant="danger" onClick={handleConfirmDelete}>
          Desativar
        </Button>
      ),
    })
  }

  const onShowModalUpdateUser = (user: IGetUserResponse) => {
    const UpdateUserForm = () => {
      const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<IUpdateUserRequest>({
        resolver: yupResolver(updateUserSchema),
        defaultValues: {
          username: user.username,
          email: user.email,
          is_admin: user.is_admin,
          receive_email: user.receive_email,
        },
      })

      const handleUpdateUser = async (data: IUpdateUserRequest) => {
        try {
          Loading.show("Atualizando usuário...")

          const updatePromises = Object.keys(data)
            .filter(
              (key) =>
                data[key as keyof IUpdateUserRequest] !==
                user[key as keyof IGetUserResponse]
            )
            .map((key) => {
              const field = key as UserUpdateFields
              return UserServices.partialUpdateUser({
                id: user.id,
                field,
                value: data[field],
              })
            })

          await Promise.all(updatePromises)

          await getUsers()
          Toast.show("success", "Sucesso", "Usuário atualizado com sucesso!")
          onHideModal()
        } catch (error: unknown) {
          Toast.show(
            "error",
            "Erro ao atualizar usuário",
            (error as { message?: string })?.message ||
              "Ocorreu um erro inesperado."
          )
        } finally {
          Loading.hide()
        }
      }

      return (
        <Form onSubmit={handleSubmit(handleUpdateUser)}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Nome de Usuário</Form.Label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Form.Control {...field} isInvalid={!!errors.username} />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="email"
                  {...field}
                  isInvalid={!!errors.email}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Controller
            name="is_admin"
            control={control}
            render={({ field }) => (
              <Form.Check
                {...field}
                type="switch"
                id="is_admin-switch"
                label="Administrador"
                checked={field.value}
              />
            )}
          />
          <Controller
            name="receive_email"
            control={control}
            render={({ field }) => (
              <Form.Check
                {...field}
                type="switch"
                id="receive_email-switch"
                label="Recebe Relatórios por E-mail"
                checked={field.value}
              />
            )}
          />
          <div className="d-flex justify-content-end">
            <Button type="submit" loading={isSubmitting}>
              Salvar
            </Button>
          </div>
        </Form>
      )
    }

    onShowModal({
      header: `Editar Usuário: ${user.username}`,
      body: <UpdateUserForm />,
    })
  }

  useEffect(() => {
    if (isActivatedTab[HomeTabKeys.USERS]) {
      getUsers()
    }
  }, [isActivatedTab[HomeTabKeys.USERS]])

  const value: IUserContext = {
    users,
    getUsers,
    onUseQueryParamsToSearch,
    onClearQueryParams,
    onShowModalViewUserDetails,
    onShowModalUpdateUser,
    onDeleteUser,
  }

  return (
    <UsersTabContext.Provider value={value}>
      <UserSearchFilters
        onUseQueryParamsToSearch={onUseQueryParamsToSearch}
        onClearQueryParams={onClearQueryParams}
      />
      <UsersDataTable />
      <Modal ref={modalRef} />
    </UsersTabContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUsersTab = () => {
  const context = useContext(UsersTabContext)
  if (!context) {
    throw new Error(
      "useUsersTab hook só pode ser usado dentro de UsersTabProvider."
    )
  }
  return context
}
