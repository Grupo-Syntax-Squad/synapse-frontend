import { ColType } from "@/interfaces/components/Col";
import type { IBaseInputSearchField } from "@/interfaces/components/FormFields";
import { Col } from "../Col";
import { Form, InputGroup } from "react-bootstrap";
import { Button } from "primereact/button";
import { Feedback } from "./Feedback";
export const BaseInputSearchField = ({
  onSearch,
  searchSuccess,
  onChange,
  name,
  value,
  label,
  id,
  error,
  placeholder,
  className,
  colType = ColType.BASIC_FORM,
  ...rest
}: IBaseInputSearchField) => {
  const buttonClassName = `px-3 shadow bi ${
    searchSuccess
      ? "bi-x-lg bg-sucess border-sucess"
      : "bg-primary bi-search bg-outline-secondary"
  }`;
  const inputClassName = searchSuccess ? "border-success" : " border-secondary";
  const uniqueId = `field-${id}`;

  return (
    <Col colType={colType}>
      <Form.Group className={className}>
        <Form.Label htmlFor={uniqueId}>{label}</Form.Label>
        <InputGroup>
          <Form.Control
            id={uniqueId}
            name={name}
            value={value}
            placeholder={placeholder}
            className={inputClassName}
            isInvalid={Boolean(error)}
            onChange={onChange}
            disabled={searchSuccess}
            {...rest}
          />
          <Button
            type="button"
            className={buttonClassName}
            onClick={onSearch}
          />
        </InputGroup>
        <Feedback message={error} />
      </Form.Group>
    </Col>
  );
};
