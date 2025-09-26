import type {
  IButtonTypeProps,
  ISearchTypeProps,
  ISwitchAndAddButtonTypeProps,
  ISwitchTypeProps,
  ITableHeaderBaseProps,
  ITableHeaderChildrenProps,
  IEmptyTypeProps,
} from "@/interfaces/components/TableHeader";
import { TableHeader } from "./TableHeader";
import type { JSX } from "react";

type Props = Omit<ITableHeaderBaseProps, "children"> &
  (
    | ISwitchTypeProps
    | IButtonTypeProps
    | ISearchTypeProps
    | ISwitchAndAddButtonTypeProps
    | IEmptyTypeProps
  ) & {
    Table: (props: ITableHeaderChildrenProps) => JSX.Element;
  };
export const DataTableWithHeader = ({ Table, ...rest }: Props) => {
  return <TableHeader {...rest}>{(props) => <Table {...props} />}</TableHeader>;
};
