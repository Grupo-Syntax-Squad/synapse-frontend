import type {
  PermissionsItems,
  PermissionsTypes,
} from "@/constants/permissions";
import { FilterMatchMode } from "primereact/api";
import type { DataTableFilterMeta } from "primereact/datatable";

export enum TableHeaderSearchSizeType {
  SMALL = "w-50",
  MEDIUM = "w-75",
  LARGE = "w-100",
}

export enum TableHeaderType {
  EMPTY,
  ONLY_SEARCH,
  WITH_SWITCH,
  WITH_ADD_BUTTON,
  WITH_SWITCH_AND_ADD_BUTTON,
}

export interface ISearchTypeProps {
  type: TableHeaderType.ONLY_SEARCH;
}

export interface ISwitchTypeProps {
  type: TableHeaderType.WITH_SWITCH;
  switchId: string;
  switchLabel?: string;
  switchChecked: boolean;
  onSwitchChange: (checked: boolean) => void;
}

export interface ISwitchAndAddButtonTypeProps
  extends Omit<ISwitchTypeProps, "type">,
    Omit<IButtonTypeProps, "type"> {
  type: TableHeaderType.WITH_SWITCH_AND_ADD_BUTTON;
}

export interface IButtonTypeProps {
  type: TableHeaderType.WITH_ADD_BUTTON;
  buttonLabel: string;
  onButtonClick: () => void;
  buttonPermissionsItem: PermissionsItems;
  buttonPermissionsType: PermissionsTypes[];
}

export interface ITableHeaderChildrenProps {
  dataTableFilter: DataTableFilterMeta;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ITableHeaderBaseProps {
  type: TableHeaderType;
  inputPlaceholder?: string;
  inputId?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
  inputGroupClassName?: string;
  ignoreDefaultClasses?: boolean;
  children: (data: ITableHeaderChildrenProps) => React.ReactNode;
  typeSizeInput?: TableHeaderSearchSizeType;
}

export interface IEmptyTypeProps {
  type: TableHeaderType.EMPTY;
}

export type TTableHeader = ITableHeaderBaseProps &
  (
    | ISwitchTypeProps
    | IButtonTypeProps
    | ISearchTypeProps
    | ISwitchAndAddButtonTypeProps
    | IEmptyTypeProps
  );

export interface IDataTableFilter {
  global: {
    value: string;
    matchMode: FilterMatchMode;
  };
}

export type TDataTableHeader = (
  | ISwitchTypeProps
  | IButtonTypeProps
  | ISearchTypeProps
  | ISwitchAndAddButtonTypeProps
  | IEmptyTypeProps
) & {
  type: TableHeaderType;
  inputPlaceholder?: string;
  inputId?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
  inputGroupClassName?: string;
  ignoreDefaultClasses?: boolean;
  dataTableFilter: IDataTableFilter;
  setDataTableFilter:
    | React.Dispatch<React.SetStateAction<IDataTableFilter>>
    | ((filter: IDataTableFilter) => void);
  typeSizeInput?: TableHeaderSearchSizeType;
};
