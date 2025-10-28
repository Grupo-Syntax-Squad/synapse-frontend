import type { THandleSetField } from "@/interfaces/Common";
import { GetReportParamsKeys } from "@/interfaces/services/Report";
import { memo } from "react";
import { Calendar } from "@/shared/components/Calendar";
import { Col, Row, Form } from "react-bootstrap";

interface Props {
  startDateValue?: Date | undefined;
  endDateValue?: Date | undefined;
  startDateDisabled: boolean;
  endDateDisabled: boolean;
}

export const DateField = memo(
  function DateFieldComponent({
    handleSetField,
    startDateValue,
    endDateValue,
    startDateDisabled,
    endDateDisabled,
  }: THandleSetField<Props>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleStartDateChange = (e: any) => {
      handleSetField({
        target: {
          name: GetReportParamsKeys.START_DATE,
          value: e.value ?? e.target?.value ?? e,
        },
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEndDateChange = (e: any) => {
      handleSetField({
        target: {
          name: GetReportParamsKeys.END_DATE,
          value: e.value ?? e.target?.value ?? e,
        },
      });
    };

    return (
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor={GetReportParamsKeys.START_DATE}>
              Initial date
            </Form.Label>
            <Calendar
              id={GetReportParamsKeys.START_DATE}
              placeholder="Select initial date"
              value={startDateValue}
              onChange={handleStartDateChange}
              disabled={startDateDisabled}
              showIcon
              maxDate={endDateValue || new Date()}
              className="w-100"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor={GetReportParamsKeys.END_DATE}>
              End Date
            </Form.Label>
            <Calendar
              id={GetReportParamsKeys.END_DATE}
              placeholder="Select end date"
              value={endDateValue}
              onChange={handleEndDateChange}
              disabled={endDateDisabled}
              showIcon
              minDate={startDateValue}
              maxDate={new Date()}
              className="w-100"
            />
          </Form.Group>
        </Col>
      </Row>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.startDateValue === nextProps.startDateValue &&
      prevProps.endDateValue === nextProps.endDateValue &&
      prevProps.startDateDisabled === nextProps.startDateDisabled &&
      prevProps.endDateDisabled === nextProps.endDateDisabled
    );
  }
);
