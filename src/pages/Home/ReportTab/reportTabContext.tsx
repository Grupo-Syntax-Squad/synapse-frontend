import { Modal } from "@/shared/components";
import { useNotification } from "@/shared/context";
import type {
  TModal,
  TModalForwardHandles,
} from "@/interfaces/components/Modal";
import {
  GetReportParamsKeys,
  type IGetReportDetailsResponse,
  type IGetReportResponse,
} from "@/interfaces/services/Report";
import { ReportServices } from "@/shared/services/Report";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { HomeTabKeys, useHome } from "..";
import { ReportsDataTable } from "./ReportsDataTable";
import { ModalViewReportDetails } from "@/shared/components/Modal/ModalReportDetailsContent";

interface IReportContext {
  reports: IGetReportResponse[];
  getReports: () => Promise<void>;
  onShowModalViewReportDetails: (report: IGetReportResponse) => void;
}

const mockReports: IGetReportResponse[] = [
  {
    id: 1,
    report_name: "Relatório de Vendas",
    created_at: "2025-09-25T10:00:00Z",
  },
  {
    id: 2,
    report_name: "Relatório de Estoque",
    created_at: "2025-09-24T15:30:00Z",
  },
  {
    id: 3,
    report_name: "Relatório Financeiro",
    created_at: "2025-09-23T12:45:00Z",
  },
];

const mockReportDetails = (
  report: IGetReportResponse
): IGetReportDetailsResponse => ({
  id: report.id,
  report_name: report.report_name,
  created_at: report.created_at,
  content: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
      <h1 style="color: #444;">Olá, este é um Teste de HTML!</h1>
      <p>Este é um parágrafo de exemplo para testar a renderização de texto. Ele contém texto em <strong>negrito para dar ênfase</strong> e também texto em <em>itálico para variar o estilo</em>.</p>
      <p>Abaixo, você verá uma imagem carregada diretamente da internet:</p>
      <img src="https://picsum.photos/600/300" alt="Imagem aleatória de teste" style="max-width: 100%; height: auto; border-radius: 4px; margin-bottom: 15px;">
      [Image of a random landscape from picsum.photos]
      <h2>Recursos Adicionais</h2>
      <p>Aqui está uma lista para verificar a renderização de elementos <code>ul</code> e <code>li</code>:</p>
      <ul>
        <li>Primeiro item da lista</li>
        <li>Segundo item da lista</li>
        <li>Terceiro item da lista</li>
      </ul>
      <p>Você também pode incluir links, como este <a href="https://www.google.com" target="_blank" style="color: #007bff; text-decoration: none;">link para o Google</a>, para garantir que as tags <code>a</code> funcionem corretamente.</p>
      <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">Este é o rodapé do e-mail de teste.</p>
    </div>
  `,
});

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
    const reportDetails = mockReportDetails(report);
    onShowModal({
      type: "message",
      header: `${reportDetails.report_name}`,
      className: "w-75",
      maximizable: true,
      body: (
        <ModalViewReportDetails
          report={reportDetails}
          onHideModal={onHideModal}
        />
      ),
    });
  };
  // const onShowModalViewReportDetails = async (report: IGetReportResponse) => {
  //   try {
  //     Loading.show("Carregando detalhes do relatório...");
  //     const reportDetails = await ReportServices.getReportDetails({
  //       id: report.id,
  //     });

  //     onShowModal({
  //       type: "message",
  //       header: `Detalhes do Relatório: ${reportDetails.report_name}`,
  //       className: "w-75",
  //       maximizable: true,
  //       body: (
  //         <ModalViewReportDetails
  //           report={reportDetails}
  //           onHideModal={onHideModal}
  //         />
  //       ),
  //     });
  //   } catch {
  //     Toast.show(
  //       "error",
  //       "Erro ao carregar",
  //       "Não foi possível carregar os detalhes do relatório."
  //     );
  //   } finally {
  //     Loading.hide();
  //   }
  // };

  const getReports = async () => {
    try {
      Loading.show("Searching reports...");
      // Aqui você pode decidir usar mock ou API real
      const useMock = true;
      if (useMock) {
        // Simula um delay como se fosse uma requisição real
        await new Promise((res) => setTimeout(res, 500));
        setReports(mockReports);
      } else {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);
        const response = await ReportServices.getReports({
          [GetReportParamsKeys.START_DATE]: startDate,
          [GetReportParamsKeys.END_DATE]: endDate,
        });
        setReports(response);
      }
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

  // const getReports = async () => {
  //   try {
  //     Loading.show("Consultando relatórios...");
  //     const endDate = new Date();
  //     const startDate = new Date();
  //     startDate.setDate(endDate.getDate() - 30);

  //     const response = await ReportServices.getReports({
  //       [GetReportParamsKeys.START_DATE]: startDate,
  //       [GetReportParamsKeys.END_DATE]: endDate,
  //     });
  //     setReports(response);
  //   } catch {
  //     Toast.show(
  //       "error",
  //       "Search reports",
  //       "Failed to search reports. Please try again."
  //     );
  //   } finally {
  //     Loading.hide();
  //   }
  // };

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
  };

  return (
    <ReportsTabContext.Provider value={value}>
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
