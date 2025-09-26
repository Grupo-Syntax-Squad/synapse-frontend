import type { TPermissions } from "@/interfaces/constants/permissions";

export type PermissionsTypes =
  | CommonActions
  | ReportActions
  | SystemActions
  | UserActions
  | SystemUsersActions;

export enum PermissionsItems {
  USER = "usuário",
  SYSTEM_USERS = "usuários do sistema",
  SYSTEM = "sistema",
  REPORT = "relatório",
}

export enum CommonActions {
  ACCESS = "acessar",
  USER = "usuário",
  CHATBOT_TAB = "aba chatbot",
  USER_TAB = "aba usuário",
}

export enum ReportActions {
  ACCESS = CommonActions.ACCESS,
  REPORT_DETAILS = "detalhes do relatório",
}

export enum SystemActions {
  ACCESS = CommonActions.ACCESS,
  ACTIONS_EDIT_REPORT_TEMPLATE = "ações / editar modelo de relatório",
  ACTIONS_REMOVE_REPORT_TEMPLATE = "ações / remover modelo de relatório",
  ACTIONS_EDIT_REPORT_SCHEDULE = "ações / editar agendamento de relatório",
  ACTIONS_REMOVE_REPORT_SCHEDULE = "ações / remover agendamento de relatório",
  NEW_REPORT_TEMPLATE_BUTTON = "botão novo modelo de relatório",
  NEW_REPORT_SCHEDULE_BUTTON = "botão novo agendamento de relatório",
}

export enum UserActions {
  ACCESS = CommonActions.ACCESS,
  ACTIONS_EDIT = "ações / editar informações",
  ACTIONS_REMOVE = "ações / remover conta",
  ACTIONS_RESET_PASSWORD = "ações / resetar senha",
}

export enum SystemUsersActions {
  ACCESS = CommonActions.ACCESS,
  NEW_USER_BUTTON = "botão novo usuário",
  ACTIONS_REMOVE_USER = "ações / remover usuário",
  ACTIONS_EDIT_USER = "ações / editar usuário",
  ACTIONS_RESET_PASSWORD = "ações / resetar senha",
  ACTIONS_EDIT_PERMISSIONS = "ações / editar permissões",
}

export enum RoleKeys {
  ADMIN = "admin",
  USER = "user",
}

export const permissions: TPermissions = {
  [PermissionsItems.REPORT]: {
    [ReportActions.ACCESS]: [RoleKeys.ADMIN, RoleKeys.USER],
    [ReportActions.REPORT_DETAILS]: [RoleKeys.ADMIN, RoleKeys.USER],
  },
  [PermissionsItems.SYSTEM]: {
    [SystemActions.ACCESS]: [RoleKeys.ADMIN],
    [SystemActions.ACTIONS_EDIT_REPORT_TEMPLATE]: [RoleKeys.ADMIN],
    [SystemActions.ACTIONS_REMOVE_REPORT_TEMPLATE]: [RoleKeys.ADMIN],
    [SystemActions.ACTIONS_EDIT_REPORT_SCHEDULE]: [RoleKeys.ADMIN],
    [SystemActions.ACTIONS_REMOVE_REPORT_SCHEDULE]: [RoleKeys.ADMIN],
    [SystemActions.NEW_REPORT_TEMPLATE_BUTTON]: [RoleKeys.ADMIN],
    [SystemActions.NEW_REPORT_SCHEDULE_BUTTON]: [RoleKeys.ADMIN],
  },
  [PermissionsItems.USER]: {
    [UserActions.ACCESS]: [RoleKeys.ADMIN, RoleKeys.USER],
    [UserActions.ACTIONS_EDIT]: [RoleKeys.ADMIN, RoleKeys.USER],
    [UserActions.ACTIONS_REMOVE]: [RoleKeys.ADMIN, RoleKeys.USER],
    [UserActions.ACTIONS_RESET_PASSWORD]: [RoleKeys.ADMIN, RoleKeys.USER],
  },
  [PermissionsItems.SYSTEM_USERS]: {
    [SystemUsersActions.ACCESS]: [RoleKeys.ADMIN],
    [SystemUsersActions.NEW_USER_BUTTON]: [RoleKeys.ADMIN],
    [SystemUsersActions.ACTIONS_REMOVE_USER]: [RoleKeys.ADMIN],
    [SystemUsersActions.ACTIONS_EDIT_USER]: [RoleKeys.ADMIN],
    [SystemUsersActions.ACTIONS_RESET_PASSWORD]: [RoleKeys.ADMIN],
    [SystemUsersActions.ACTIONS_EDIT_PERMISSIONS]: [RoleKeys.ADMIN],
  },
};
