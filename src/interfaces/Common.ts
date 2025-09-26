import type { DropdownChangeEvent } from "primereact/dropdown";
import type { JSX } from "react";

export interface IChildrenProps {
  children: React.ReactNode | JSX.Element;
}

export type TFormError<T> = {
  [key in keyof T]?: string;
};

export type TValidateForm<Forms> = {
  [K in keyof Forms]?: (value: Forms[K]) => string;
};

export type THandleSetFieldProps =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | DropdownChangeEvent
  | {
      target: {
        name: string;
        value: unknown;
      };
    };

export type THandleSetField<T> = T & {
  handleSetField: (event: THandleSetFieldProps) => void;
};
