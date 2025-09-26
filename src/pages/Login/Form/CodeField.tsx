import type { Dispatch, SetStateAction } from "react";
import { Form } from "react-bootstrap";

interface Props {
  label?: string;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}

export default function CodeField({ label, code, setCode }: Props) {
  function onChange(field: React.ChangeEvent<HTMLInputElement>) {
    setCode(field.target.value);
  }
  return (
    <Form.Group id="validationCustom01">
      <Form.Label>{label || "Código"}</Form.Label>
      <Form.Control
        required
        value={code}
        type="tel"
        name="code"
        onChange={onChange}
      />
    </Form.Group>
  );
}
