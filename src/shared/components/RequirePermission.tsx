import { useAuth } from "@/shared/context"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const RequirePermission = ({ children }: Props) => {
  const { user } = useAuth()

  if (!user?.is_admin) {
    return null
  }

  return <>{children}</>
}
