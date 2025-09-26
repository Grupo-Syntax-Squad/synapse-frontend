import { Button } from "@/shared/components";
import type { IColumn } from "@/interfaces/components/Column";
import {
  GetReportKeys,
  type IGetReportResponse,
} from "@/interfaces/services/Report";
import { ButtonIconType } from "@/interfaces/components/Button";
import { useReportsTab } from "../reportTabContext";

export const ColumnsConfig = (): IColumn[] => {
  const { onShowModalViewReportDetails } = useReportsTab();

  const previewReportBody = (row: IGetReportResponse) => (
    <Button
      outline
      btnIcon
      iconType={ButtonIconType.SEE}
      onClick={() => onShowModalViewReportDetails(row)}
    />
  );

  return [
    {
      header: "Report Name",
      field: GetReportKeys.REPORT_NAME,
      align: "left",
      sortable: true,
    },
    {
      header: "Submission Date",
      field: GetReportKeys.REPORT_CREATION_DATE,
      sortable: true,
    },
    {
      header: "View Details",
      body: previewReportBody,
      exportable: false,
    },
  ];
};
