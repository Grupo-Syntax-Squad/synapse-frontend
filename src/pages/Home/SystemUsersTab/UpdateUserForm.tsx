import { Button, RequirePermission } from "@/shared/components"
import { useNotification } from "@/shared/context"
import {
  type IUpdateUserRequest,
  type IGetUserResponse,
  UserUpdateFields,
} from "@/interfaces/services/Users"
import { UserServices } from "@/shared/services/User"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Form } from "react-bootstrap"
import { useUsersTab } from "./userTabContext"

const updateUserSchema = yup.object().shape({
  username: yup.string().required("Nome de usuário é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  is_admin: yup.boolean().required(),
  receive_email: yup.boolean().required(),
})

interface Props {
  userToUpdate: IGetUserResponse
  onSuccess?: () => void
}

export const UpdateUserForm = ({ userToUpdate, onSuccess }: Props) => {
  const { Loading, Toast } = useNotification()
  const { getUsers } = useUsersTab()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUpdateUserRequest>({
    resolver: yupResolver(updateUserSchema),
    defaultValues: {
      username: userToUpdate.username,
      email: userToUpdate.email,
      is_admin: userToUpdate.is_admin,
      receive_email: userToUpdate.receive_email,
    },
  })

  const handleUpdateUser = async (data: IUpdateUserRequest) => {
    try {
      Loading.show("Atualizando usuário...")

      const keys = Object.keys(data) as Array<keyof IUpdateUserRequest>
      const updatePromises = keys
        .filter(
          (key) => data[key] !== userToUpdate[key as keyof IGetUserResponse]
        )
        .map((key) => {
          // key is a keyof IUpdateUserRequest, use it to index `data`
          // cast to UserUpdateFields only when calling the service
          const field = key as unknown as UserUpdateFields
          return UserServices.partialUpdateUser({
            id: userToUpdate.id,
            field,
            value: data[key as keyof IUpdateUserRequest],
          })
        })

      if (updatePromises.length > 0) {
        await Promise.all(updatePromises)
        await getUsers()
        Toast.show("success", "Sucesso", "Usuário atualizado com sucesso!")
        onSuccess?.()
      } else {
        Toast.show("info", "Sem alterações", "Nenhuma alteração detectada.")
      }
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
        <Form.Label>Username</Form.Label>
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
            <Form.Control type="email" {...field} isInvalid={!!errors.email} />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="d-flex flex-column">
        <RequirePermission>
          <Controller
            name="is_admin"
            control={control}
            render={({ field: { value, ...field } }) => (
              <Form.Check
                {...field}
                value={value.toString()}
                type="switch"
                id="is_admin-switch"
                label="Administrator"
                checked={value}
              />
            )}
          />
        </RequirePermission>
        <Controller
          name="receive_email"
          control={control}
          render={({ field: { value, ...field } }) => (
            <Form.Check
              {...field}
              value={value.toString()}
              type="switch"
              id="receive_email-switch"
              label="Receive Reports by Email"
              checked={value}
            />
          )}
        />
      </div>
      <div className="d-flex justify-content-end mt-3">
        <Button type="submit" disabled={isSubmitting}>
          Save Changes
        </Button>
      </div>
    </Form>
  )
}
