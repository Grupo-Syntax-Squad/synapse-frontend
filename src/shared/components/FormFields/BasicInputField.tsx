import { Feedback } from "./Feedback";
import { ColType, type IColType } from "@/interfaces/components/Col";
import { Form, type FormControlProps } from "react-bootstrap";
import { Col } from "../Col";
import type { JSX } from "react";

export interface Props extends FormControlProps, IColType {
  id: string;
  name: string;
  label: string | JSX.Element;
  value?: string;
  placeholder?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
  labelClassName?: string;
  inputClassName?: string;
  feedbackClassName?: string;
}

export const BasicInputField = ({
  name,
  value,
  label,
  id,
  error,
  success,
  placeholder,
  className,
  labelClassName,
  inputClassName,
  feedbackClassName,
  colType = ColType.BASIC_FORM,
  disabled = false,
  ...rest
}: Props) => {
  const uniqueId = `field-${id}`;
  const feedbackMessage = success ? success : error ? error : undefined;
  return (
    <Col colType={colType}>
      <Form.Group className={className}>
        <Form.Label htmlFor={uniqueId} className={labelClassName}>
          {label}
        </Form.Label>
        <Form.Control
          id={uniqueId}
          name={name}
          value={value}
          placeholder={placeholder}
          isValid={!!success}
          isInvalid={!!error}
          disabled={disabled}
          className={inputClassName}
          {...rest}
        />
        <Feedback
          type={success ? "valid" : error ? "invalid" : "info"}
          className={feedbackClassName}
          message={feedbackMessage}
        />
      </Form.Group>
    </Col>
  );
};
