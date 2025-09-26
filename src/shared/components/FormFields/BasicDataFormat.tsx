import dayjs from "dayjs";

export function formatISODate(
  dateString: string,
  format: string = "DD/MM/YYYY HH:mm:ss"
) {
  return dayjs(dateString).format(format);
}
