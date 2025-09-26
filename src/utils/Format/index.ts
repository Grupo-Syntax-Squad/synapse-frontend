import {
  DateTimeFormat,
  ActivityStatusFormat,
  YesOrNoFormat,
} from "@/interfaces/utils/Format";
import dayjs, { Dayjs } from "dayjs";

// ======================= FORMATTERS =======================
export class DateTime {
  public date: Dayjs | string;
  constructor(input?: string | number | null, utc_zero: boolean = false) {
    this.date = !input
      ? ""
      : typeof input === "number"
      ? dayjs.unix(input)
      : dayjs(utc_zero ? `${input}Z` : input);
  }

  format(formatTo: DateTimeFormat | string) {
    return this.date === "" ? "" : (this.date as Dayjs).format(formatTo);
  }
}

// ======================= FUNCTIONS =======================

export function activityStatusFormat(
  enabled?: boolean | null
): ActivityStatusFormat {
  let status = ActivityStatusFormat.ACTIVE;
  if (enabled === false) {
    status = ActivityStatusFormat.INACTIVE;
    return status;
  }
  return status;
}

export function completedateTimeFormat(date?: string | null): string {
  return new DateTime(date).format(DateTimeFormat.COMPLETE);
}

export function numberToMonth(reference: number): string {
  if (!reference) return "";
  const isoDate = new Date(reference * 1000).toISOString();
  return isoDate;
}

export function yesOrNoFormat(value?: boolean | null) {
  return value ? YesOrNoFormat.YES : YesOrNoFormat.NO;
}

export function getCurrentTimeStamp(): number {
  const today = new Date();
  return today.getTime();
}

export function getCurrentYearMonth(showYear?: boolean) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  if (showYear) return Number(`${year - 1}${month}`);
  return Number(`${year}${month}`);
}

export class FieldMask {
  static emailMask(value?: string | null): string {
    if (!value) return "";
    value = value.trim();
    // eslint-disable-next-line no-useless-escape
    value = value.replace(/[^\w@.\-]/g, "").toLowerCase();
    return value;
  }

  static isValidEmail(value?: string | null): boolean {
    if (!value) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  static removeMask(value?: string | null): string {
    if (!value) return "";
    return value.replace(/\D/g, "");
  }

  static formatReading = (value: string) => {
    const decimals = 3;
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    let toFillMeter = onlyNumbers.padStart(1 + decimals, "0");
    if (toFillMeter.length > decimals && onlyNumbers !== "0") {
      const integerPart =
        toFillMeter.slice(0, -decimals).replace(/^0+/, "") || "0";
      const decimalPart = toFillMeter.slice(-decimals);
      toFillMeter = `${integerPart}.${decimalPart}`;
    } else {
      toFillMeter = `0.${toFillMeter.padStart(decimals, "0")}`;
    }
    return toFillMeter;
  };
}

export class SanitizeRichHTML {
  static sanitize(value?: string | null): string {
    if (!value) return "";
    return value.replace(/<script.*?>.*?<\/script>/gi, "");
  }
}
