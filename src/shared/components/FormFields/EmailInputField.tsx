import { BasicInputField } from "./BasicInputField";
import type { IBasicInputField } from "@/interfaces/components/FormFields";

export function EmailInputField({
  value,
  label = "Email",
  ...rest
}: IBasicInputField) {
  return (
    <BasicInputField
      label={label}
      placeholder="youremail@example.com"
      type="email"
      value={typeof value === "string" ? value : ""}
      maxLength={100}
      {...rest}
    />
  );
}
