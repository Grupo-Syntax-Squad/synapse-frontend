import { type IFilterGetUsers } from "@/interfaces/services/Users"

interface Props {
  onUseQueryParamsToSearch: (query?: Partial<IFilterGetUsers>) => Promise<void>
  onClearQueryParams: () => void
}

export const UserSearchFilters = ({ onClearQueryParams }: Props) => {
  return null
}
