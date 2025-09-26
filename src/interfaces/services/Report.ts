export enum GetReportParamsKeys {
  START_DATE = "start_date",
  END_DATE = "end_date",
}

export interface IGetReportParams {
  [GetReportParamsKeys.START_DATE]: Date;
  [GetReportParamsKeys.END_DATE]: Date;
}

export enum GetReportKeys {
  REPORT_ID = "id",
  REPORT_NAME = "report_name",
  REPORT_CREATION_DATE = "created_at",
  REPORT_CONTENT = "REPORT_CONTENT",
}

export interface IGetReportResponse {
  [GetReportKeys.REPORT_ID]: number;
  [GetReportKeys.REPORT_NAME]: string;
  [GetReportKeys.REPORT_CREATION_DATE]: string;
}

export enum GetReportDetailsKeys {
  REPORT_ID = "id",
  REPORT_NAME = "report_name",
  REPORT_CREATION_DATE = "created_at",
  REPORT_CONTENT = "content",
}

export interface IGetReportDetailsResponse {
  [GetReportDetailsKeys.REPORT_ID]: number;
  [GetReportDetailsKeys.REPORT_NAME]: string;
  [GetReportDetailsKeys.REPORT_CREATION_DATE]: string;
  [GetReportDetailsKeys.REPORT_CONTENT]: string;
}

const enum GetReportDetailsParamsKeys {
  REPORT_ID = "id",
}

export interface IGetReportDetailsParams {
  [GetReportDetailsParamsKeys.REPORT_ID]: number;
}
