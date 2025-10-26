import type { ITabItem } from "@/interfaces/components/Tabs"
import { HomeTabKeys } from ".."
import { UsersTabProvider } from "./userTabContext"
import { useAuth } from "@/shared/context"

export const SystemUsersTab = (): ITabItem => {
  const { user } = useAuth()

  return {
    title: user?.is_admin ? "Users" : "User",
    eventKey: HomeTabKeys.USERS,
    body: <UsersTabProvider />,
  }
}
