import { Card, Row } from "react-bootstrap"
import { CardDetails } from "../../Card/CardDetails"
import { DetailsField } from "../../DetailsField"
import { ModalFooter } from "../Modalfooter"
import { CopyContent } from "../../CopyContent"
import { ColType } from "@/interfaces/components/Col"
import { CopyContentType } from "@/interfaces/components/CopyContent"
import {
  type IGetReportDetailsResponse,
  GetReportDetailsKeys,
} from "@/interfaces/services/Report"
import { DateTime } from "@/utils/Format"
import { DateTimeFormat } from "@/interfaces/utils/Format"

interface Props {
  report: IGetReportDetailsResponse
  onHideModal: () => void
}

export const ModalViewReportDetails = ({ report, onHideModal }: Props) => {
  return (
    <>
      <CardDetails
        title="Report Informations"
        // eslint-disable-next-line react/no-children-prop
        children={
          <Card.Body className="p-3">
            <Row className="flex-row-col col-border p-3 gap-md-0">
              <DetailsField
                colType={ColType.FULL_WIDTH}
                title="Report Name"
                description={
                  <CopyContent
                    type={CopyContentType.TEXT}
                    toastHeader="Report name copied"
                    label={report[GetReportDetailsKeys.REPORT_NAME]}
                  />
                }
              />
              <DetailsField
                colType={ColType.FULL_WIDTH}
                title="Submission Date"
                description={new DateTime(report.created_at).format(
                  DateTimeFormat.COMPLETE
                )}
              />
            </Row>
          </Card.Body>
        }
      />

      <Card className="mt-3">
        <Card.Header as="h5">Content</Card.Header>
        <Card.Body className="p-3">
          <div
            dangerouslySetInnerHTML={{
              __html: report[GetReportDetailsKeys.REPORT_CONTENT],
            }}
          />
        </Card.Body>
      </Card>

      <ModalFooter onCancel={onHideModal} />
    </>
  )
}
