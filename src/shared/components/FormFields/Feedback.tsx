import { classNames } from "primereact/utils";
import type { ReactNode } from "react";
import { Form } from "react-bootstrap";

interface Props {
  message?: ReactNode;
  type?: "invalid" | "valid" | "info";
  className?: string;
}

export const Feedback = ({ message, type = "invalid", className }: Props) => {
  const ennableFallback = !!message;
  const showFallback = classNames(
    ennableFallback ? "d-block" : "d-none",
    className
  );
  return (
    ennableFallback && (
      <Form.Control.Feedback
        type={type === "info" ? undefined : type}
        className={showFallback}
      >
        {message}
      </Form.Control.Feedback>
    )
  );
};
