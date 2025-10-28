import { DataTable } from "@/shared/components/DataTable";
import { TableHeaderType } from "@/interfaces/components/TableHeader";
import {
  GetReportKeys,
  type IGetReportResponse,
} from "@/interfaces/services/Report";
import { ColumnsConfig } from "./ColumnsConfig";
import { Card, Badge } from "react-bootstrap";
import { useReportsTab } from "../reportTabContext";
import { useRef, useState } from "react";
import { DateTime } from "@/utils/Format";
import { DateTimeFormat } from "@/interfaces/utils/Format";
import { DataTableHeader } from "@/shared/components/DataTable/DataTableHeader";
import { FilterMatchMode } from "primereact/api";
import { CardDetails } from "@/shared/components/Card/CardDetails";
import { DataTable as DataTablePR } from "primereact/datatable";

export const ReportsDataTable = () => {
  const { reports } = useReportsTab();
  const dataTableRef = useRef<DataTablePR<IGetReportResponse[]>>(null!);
  const [dataTableFilter, setDataTableFilter] = useState({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },
  });

  const formattedReportsData: IGetReportResponse[] = reports.map((report) => ({
    ...report,
    [GetReportKeys.REPORT_CREATION_DATE]: new DateTime(
      report[GetReportKeys.REPORT_CREATION_DATE]
    ).format(DateTimeFormat.COMPLETE),
  }));

  return (
    <Card className="shadow-sm">
      <CardDetails
        title="Reports"
        rightTitleContent={<Badge>{reports.length}</Badge>}
        defaultClassName={false}
      >
        <DataTableHeader
          dataTableFilter={dataTableFilter}
          setDataTableFilter={setDataTableFilter}
          type={TableHeaderType.ONLY_SEARCH}
          inputId="search-report"
          inputPlaceholder="Search report..."
        />
        <DataTable
          ref={dataTableRef}
          value={formattedReportsData}
          filters={dataTableFilter}
          dataKey={GetReportKeys.REPORT_ID}
          emptyMessage="No reports found."
          columns={ColumnsConfig()}
          sortField={GetReportKeys.REPORT_CREATION_DATE}
          sortOrder={-1}
          className="p-0"
        />
      </CardDetails>
    </Card>
  );
};
