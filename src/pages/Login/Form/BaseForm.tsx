import { Form } from "react-bootstrap";

interface Prop {
  children: Array<React.ReactNode>;
  onKeyDown?: (event: React.KeyboardEvent) => false | Promise<void>;
  className?: string;
}

export default function BaseForm({ children, onKeyDown, className }: Prop) {
  return (
    <Form
      className={`d-flex flex-column gap-3 ${className}`}
      noValidate
      onKeyDown={onKeyDown || (() => {})}
    >
      {children}
    </Form>
  );
}
