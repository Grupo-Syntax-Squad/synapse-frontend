import type {
  ColumnFilterApplyTemplateOptions,
  ColumnFilterClearTemplateOptions,
} from "primereact/column";
import { Button } from ".";
import { ButtonSeverity } from "@/interfaces/components/Button";

const filterApply = (options: ColumnFilterApplyTemplateOptions) => (
  <Button onClick={options.filterApplyCallback}>Aplicar</Button>
);
const filterClear = (options: ColumnFilterClearTemplateOptions) => (
  <Button
    onClick={options.filterClearCallback}
    severity={ButtonSeverity.DANGER}
  >
    Limpar
  </Button>
);

export const DataTableFilterActionButtons = {
  filter: true,
  showFilterMatchModes: false,
  showFilterOperator: false,
  filterApply,
  filterClear,
};
