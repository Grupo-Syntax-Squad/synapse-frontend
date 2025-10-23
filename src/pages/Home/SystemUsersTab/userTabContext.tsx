import { Modal } from "@/shared/components";
import { useNotification } from "@/shared/context";
import type {
  TModal,
  TModalForwardHandles,
} from "@/interfaces/components/Modal";
import {
  GetUserResponseKeys,
  type IGetUserResponse,
  type IFilterGetUsers,
} from "@/interfaces/services/Users";
import { UserServices } from "@/shared/services/User";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { HomeTabKeys, useHome } from "..";
import { UsersDataTable } from "./UsersDataTable";
import { UserSearchFilters } from "./SearchFilters/UserSearchFilters";

interface IUserContext {
  users: IGetUserResponse[];
  getUsers: (params?: Partial<IFilterGetUsers>) => Promise<void>;
  onUseQueryParamsToSearch: (params?: Partial<IFilterGetUsers>) => Promise<void>;
  onClearQueryParams: () => void;
  onShowModalViewUserDetails: (user: IGetUserResponse) => void;
}

const UsersTabContext = createContext<IUserContext | undefined>(undefined);

export function UsersTabProvider() {
  const { Loading, Toast } = useNotification();
  const { isActivatedTab } = useHome();
  const [users, setUsers] = useState<IGetUserResponse[]>([]);
  const modalRef = useRef<TModalForwardHandles>(null);

  const onShowModal = (params: TModal) => modalRef.current?.show(params);
  const onHideModal = () => modalRef.current?.hide();

  const getUsers = async (params?: Partial<IFilterGetUsers>) => {
    try {
      Loading.show("Buscando usuários...");
      const response = await UserServices.getUsers(params);
      setUsers(response);
    } catch {
      Toast.show("error", "Erro", "Falha ao buscar usuários. Tente novamente.");
    } finally {
      Loading.hide();
    }
  };

  const onUseQueryParamsToSearch = async (
    params?: Partial<IFilterGetUsers>
  ) => {
    await getUsers(params);
  };

  const onClearQueryParams = () => {
    getUsers();
  };

  const onShowModalViewUserDetails = (user: IGetUserResponse) => {
    onShowModal({
      type: "message",
      header: `Detalhes do Usuário: ${user[GetUserResponseKeys.USERNAME]}`,
      className: "w-50",
      body: (
        <div className="p-3">
          <p><strong>E-mail:</strong> {user[GetUserResponseKeys.EMAIL]}</p>
          <p><strong>Administrador:</strong> {user[GetUserResponseKeys.IS_ADMIN] ? "Sim" : "Não"}</p>
          <p><strong>Recebe Relatórios:</strong> {user[GetUserResponseKeys.RECEIVE_REPORTS] ? "Sim" : "Não"}</p>
        </div>
      ),
    });
  };

  useEffect(() => {
    if (isActivatedTab[HomeTabKeys.USERS]) {
      getUsers();
    }
  }, [isActivatedTab[HomeTabKeys.USERS]]);

  const value: IUserContext = {
    users,
    getUsers,
    onUseQueryParamsToSearch,
    onClearQueryParams,
    onShowModalViewUserDetails,
  };

  return (
    <UsersTabContext.Provider value={value}>
      <UserSearchFilters
        onUseQueryParamsToSearch={onUseQueryParamsToSearch}
        onClearQueryParams={onClearQueryParams}
      />
      <UsersDataTable />
      <Modal ref={modalRef} />
    </UsersTabContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUsersTab = () => {
  const context = useContext(UsersTabContext);
  if (!context) {
    throw new Error(
      "useUsersTab hook só pode ser usado dentro de UsersTabProvider."
    );
  }
  return context;
};
