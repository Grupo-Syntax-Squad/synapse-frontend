import { Modal } from "@/shared/components";
import { useNotification } from "@/shared/context";
import type {
  TModal,
  TModalForwardHandles,
} from "@/interfaces/components/Modal";
import {
  GetReportParamsKeys,
  GetReportKeys,
  GetReportDetailsKeys,
  type IGetReportResponse,
  type IGetReportParams,
} from "@/interfaces/services/Report";
import { ReportServices } from "@/shared/services/Report";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { HomeTabKeys, useHome } from "..";
import { ReportsDataTable } from "./ReportsDataTable";
import { ModalViewReportDetails } from "@/shared/components/Modal/ModalReportDetailsContent";
import { ReportSearchFilters } from "./SearchFilters/ReportSearchFilters";

interface IReportContext {
  reports: IGetReportResponse[];
  getReports: (params?: Partial<IGetReportParams>) => Promise<void>;
  onShowModalViewReportDetails: (report: IGetReportResponse) => void;
  onUseQueryParamsToSearch: (
    params?: Partial<IGetReportParams>
  ) => Promise<void>;
  onClearQueryParams: () => void;
}

const ReportsTabContext = createContext<IReportContext | undefined>(undefined);

export function ReportsTabProvider() {
  const { Loading, Toast } = useNotification();
  const { isActivatedTab } = useHome();
  const [reports, setReports] = useState<IGetReportResponse[]>([]);
  const modalRef = useRef<TModalForwardHandles>(null);

  const onShowModal = (params: TModal) => {
    modalRef.current?.show(params);
  };

  const onHideModal = () => {
    modalRef.current?.hide();
  };

  const onShowModalViewReportDetails = async (report: IGetReportResponse) => {
    try {
      Loading.show("Loading report details...");
      const reportDetails = await ReportServices.getReportDetails({
        id: report[GetReportKeys.REPORT_ID],
      });

      onShowModal({
        type: "message",
        header: `Report Details: ${
          reportDetails[GetReportDetailsKeys.REPORT_NAME] || "Loading..."
        }`,
        className: "w-75",
        maximizable: true,
        body: (
          <ModalViewReportDetails
            report={reportDetails}
            onHideModal={onHideModal}
          />
        ),
      });
    } catch {
      Toast.show(
        "error",
        "Error loading report",
        "Could not load report details. Please try again."
      );
    } finally {
      Loading.hide();
    }
  };

  const getReports = async (params?: Partial<IGetReportParams>) => {
    try {
      Loading.show("Searching reports...");

      const endDate = params?.[GetReportParamsKeys.END_DATE] || new Date();
      const startDate =
        params?.[GetReportParamsKeys.START_DATE] ||
        (() => {
          const date = new Date(endDate);
          date.setDate(date.getDate() - 30);
          return date;
        })();

      const response = await ReportServices.getReports({
        [GetReportParamsKeys.START_DATE]: startDate,
        [GetReportParamsKeys.END_DATE]: endDate,
      });
      setReports(response);
    } catch {
      Toast.show(
        "error",
        "Search reports",
        "Failed to search reports. Please try again."
      );
    } finally {
      Loading.hide();
    }
  };

  const onUseQueryParamsToSearch = async (
    params?: Partial<IGetReportParams>
  ) => {
    await getReports(params);
  };

  const onClearQueryParams = () => {
    getReports();
  };

  useEffect(() => {
    if (isActivatedTab[HomeTabKeys.REPORTS]) {
      getReports();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActivatedTab[HomeTabKeys.REPORTS]]);

  const value: IReportContext = {
    reports,
    getReports,
    onShowModalViewReportDetails,
    onUseQueryParamsToSearch,
    onClearQueryParams,
  };

  return (
    <ReportsTabContext.Provider value={value}>
      <ReportSearchFilters
        onUseQueryParamsToSearch={onUseQueryParamsToSearch}
        onClearQueryParams={onClearQueryParams}
      />
      <ReportsDataTable />
      <Modal ref={modalRef} />
    </ReportsTabContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useReportsTab = () => {
  const context = useContext(ReportsTabContext);
  if (!context) {
    throw new Error(
      "useReportsTab hook can only be used inside of ReportsTabProvider."
    );
  }
  return context;
};
