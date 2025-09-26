import { classNames } from "primereact/utils";
import { Form } from "react-bootstrap";
import type { FormCheckInputProps } from "react-bootstrap/esm/FormCheckInput";

interface Props extends FormCheckInputProps {
  label?: React.ReactNode;
  formGroupClassName?: string;
}

export const Switch = ({
  label,
  id,
  name,
  formGroupClassName,
  ...rest
}: Props) => {
  const uniqueId = `field-${id || name}`;
  const customFormGroupClassName = classNames(
    "d-inline-flex align-items-center gap-1 m-0 text-nowrap me-2",
    formGroupClassName
  );
  return (
    <Form.Group className={customFormGroupClassName}>
      <Form.Check type="switch" id={uniqueId} name={name} {...rest} />
      {label && (
        <Form.Label htmlFor={uniqueId} name={name} className="mb-0">
          {label}
        </Form.Label>
      )}
    </Form.Group>
  );
};
