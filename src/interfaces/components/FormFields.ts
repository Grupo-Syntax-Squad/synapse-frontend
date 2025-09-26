import type { DropdownProps } from "primereact/dropdown";
import type { FormControlProps } from "react-bootstrap";
import type { InputTextProps as PrimeInputTextProps } from "primereact/inputtext";
import type { MultiSelectProps } from "primereact/multiselect";
import type { IColType } from "./Col";
import type { IShowByPermission } from "@/interfaces/components/ShowByPermission";

export interface IBaseSelectField
  extends Omit<DropdownProps, "invalid" | "filterBy" | "children">,
    IColType,
    Partial<IShowByPermission> {
  error?: string;
  label?: React.ReactNode;
  filterBy?: string[];
  showConstantsDescriptions?: boolean;
}

export interface IFieldOption<T> {
  optionLabel?: T;
  optionValue?: T;
}

export type TFormFieldsSelect<Keys> = Omit<
  IBaseSelectField,
  "placeholder" | "emptyMessage" | "emptyFilterMessage"
> &
  IFieldOption<Keys>;

export interface IBaseInputSearchField
  extends Omit<FormControlProps, "isInvalid">,
    IColType {
  id: string;
  name: string;
  label: React.ReactNode;
  value?: string;
  placeholder?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  onSearch: () => void;
  searchSuccess: boolean;
}

export interface IInputTextProps extends PrimeInputTextProps {
  label: string;
}

export interface IDropdownProps extends DropdownProps {
  [DropdownKeys.LABEL]?: string;
  [DropdownKeys.ERROR]?: string;
  [DropdownKeys.HELPERTEXT]?: string;
  [DropdownKeys.CODE]?: number | null;
  [DropdownKeys.NAME]?: string;
}

export interface IMultiSelectProps {
  [MultiSelectKeys.LABEL]?: string;
  [MultiSelectKeys.ERROR]?: boolean;
  [MultiSelectKeys.HELPERTEXT]?: string;
  [MultiSelectKeys.CODE]?: number | null;
  [MultiSelectKeys.NAME]?: string;
}

export enum DropdownKeys {
  LABEL = "label",
  ERROR = "error",
  HELPERTEXT = "helperText",
  CODE = "code",
  NAME = "name",
}

export enum MultiSelectKeys {
  LABEL = "label",
  ERROR = "error",
  HELPERTEXT = "helperText",
  CODE = "code",
  NAME = "name",
}

export enum ProfilesSelectKeys {
  CODE = "code",
  NAME = "name",
}

export type TFormFieldsInputSearch = Omit<IBaseInputSearchField, "placeholder">;

export interface IBaseMultiSelectField
  extends Omit<MultiSelectProps, "invalid" | "filterBy">,
    IColType {
  error?: string;
  label?: string;
  filterBy?: string[];
  showConstantsDescriptions?: boolean;
}

export interface IFieldService<T> {
  serviceQueryParams?: never | T;
}

export type TFormFieldsMultiSelect<Keys> = Omit<
  IBaseMultiSelectField,
  "emptyMessage" | "emptyFilterMessage" | "selectAllLabel"
> &
  IFieldOption<Keys>;

interface SelectAndMultiSelectBaseProps<Params, Response, ResponseKeys>
  extends Partial<IShowByPermission> {
  error?: string;
  label?: React.ReactNode;
  formGroupClassName?: string;
  selectClassName?: string;
  toastErrorHeader: string;
  toastErrorDescription: string;
  service:
    | ((params: Params) => Promise<Response[]>)
    | (() => Promise<Response[]>)
    | ((params?: Params) => Promise<Response[]>);
  filterBy?: ResponseKeys[];
  loadOptionsBeforeOnShowEvent?: boolean;
}

export interface IBasicSelectWithService<Params, Response, ResponseKeys>
  extends Omit<
      SelectAndMultiSelectBaseProps<Params, Response, ResponseKeys>,
      "children"
    >,
    Omit<
      DropdownProps,
      | "invalid"
      | "optionLabel"
      | "optionValue"
      | "className"
      | "filterBy"
      | "children"
    >,
    IColType,
    IFieldService<Params>,
    IFieldOption<ResponseKeys> {}

export type TFormFieldSelectWithService<Params, Response, ResponseKeys> = Omit<
  IBasicSelectWithService<Params, Response, ResponseKeys>,
  | "placeholder"
  | "emptyMessage"
  | "emptyFilterMessage"
  | "toastErrorHeader"
  | "toastErrorDescription"
  | "service"
>;

export type TFormFieldMultiSelectWithService<Params, Response, ResponseKeys> =
  Omit<
    IBasicMultiSelectWithService<Params, Response, ResponseKeys>,
    | "placeholder"
    | "emptyMessage"
    | "emptyFilterMessage"
    | "toastErrorHeader"
    | "toastErrorDescription"
    | "service"
  >;

export interface IBasicMultiSelectWithService<Params, Response, ResponseKeys>
  extends Omit<
      SelectAndMultiSelectBaseProps<Params, Response, ResponseKeys>,
      "children"
    >,
    Omit<
      MultiSelectProps,
      | "invalid"
      | "optionLabel"
      | "optionValue"
      | "className"
      | "filterBy"
      | "children"
    >,
    IColType,
    IFieldService<Params>,
    IFieldOption<ResponseKeys>,
    Partial<IShowByPermission> {}

export interface IBasicInputField
  extends Omit<FormControlProps, "placeholder">,
    IColType {
  id: string;
  name: string;
  label?: string;
  error?: string;
  success?: string;
}

export interface IBasicFieldContainer extends IColType {
  children: React.ReactNode;
  id: string;
  name: string;
  label: string | React.ReactNode;
  error?: string;
  success?: string;
  labelClassName?: string;
  feedbackClassName?: string;
  formGroupClassName?: string;
}
