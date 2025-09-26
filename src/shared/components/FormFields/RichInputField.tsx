import { useRef, type JSX } from "react";
import { Col } from "../Col";
import { Form, type FormControlProps } from "react-bootstrap";
import { ColType, type IColType } from "@/interfaces/components/Col";
import { Editor } from "primereact/editor";
import { classNames } from "primereact/utils";
import { Feedback } from "./Feedback";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { type TModalForwardHandles } from "@/interfaces/components/Modal";
import { ButtonIconType } from "@/interfaces/components/Button";

export interface Props extends FormControlProps, IColType {
  id: string;
  name: string;
  label: string;
  value?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
  labelClassName?: string;
  inputClassName?: string;
  helpContent?: React.ReactNode;
  height?: number;
}

export const RichInputField = ({
  name,
  value,
  label,
  id,
  className,
  labelClassName,
  colType = ColType.BASIC_FORM,
  disabled = false,
  onChange,
  error,
  success,
  inputClassName,
  helpContent,
  height,
}: Props) => {
  const uniqueId = `field-${id}`;
  const feedbackMessage = success || error;
  const modalRef = useRef<TModalForwardHandles>(null);

  const headerTemplate = (
    <span className={classNames("ql-formats", { "d-none": disabled })}>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
      <button className="ql-header" value="1" />
      <button className="ql-header" value="2" />
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-script" value="sub" />
      <button className="ql-script" value="super" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
      <button className="ql-direction" value="rtl" />
    </span>
  );

  return (
    <Col colType={colType} className="d-flex flex-column mr-2">
      <Form.Group className={className}>
        <div className="d-flex justify-content-between align-items-center">
          <Form.Label htmlFor={uniqueId} className={labelClassName}>
            {label}
          </Form.Label>
          {helpContent && (
            <>
              <Button
                iconType={ButtonIconType.SEE}
                size="sm"
                variant="primary"
                className="mb-3"
                onClick={() =>
                  modalRef.current?.show({
                    header: "Tags Disponíveis",
                    body: helpContent as JSX.Element,
                    type: "message",
                  })
                }
              >
                Ver Tags
              </Button>
              <Modal ref={modalRef} />
            </>
          )}
        </div>

        <Editor
          id={uniqueId}
          value={value}
          className={classNames(
            "rich-input-field rounded-bottom",
            inputClassName,
            {
              "is-invalid": !!error,
              "is-valid": !!success,
              disabled: disabled,
            }
          )}
          style={{ height }}
          disabled={disabled}
          spellCheck={false}
          onTextChange={(e) => {
            const syntheticEvent = {
              target: Object.assign(document.createElement("textarea"), {
                name,
                value: e.htmlValue,
              }),
            } as React.ChangeEvent<HTMLTextAreaElement>;
            onChange?.(syntheticEvent);
          }}
          headerTemplate={headerTemplate}
        />

        <Feedback
          type={success ? "valid" : error ? "invalid" : "info"}
          message={feedbackMessage}
        />
      </Form.Group>
    </Col>
  );
};
