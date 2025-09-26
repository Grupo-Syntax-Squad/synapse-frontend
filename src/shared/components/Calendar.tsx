import {
  Calendar as CalendarPR,
  type CalendarProps,
} from "primereact/calendar";
import { addLocale, type LocaleOptions } from "primereact/api";

type Props<T> = Omit<T, "locale">;

export const Calendar = <T extends CalendarProps>(rest: Props<T>) => {
  const locale: LocaleOptions = {
    firstDayOfWeek: 0,
    dayNames: [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ],
    dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ],
    today: "Hoje",
    now: "Agora",
    clear: "Limpar",
  };

  addLocale("pt-br", locale);

  return <CalendarPR dateFormat="dd/mm/yy" locale="pt-br" {...rest} />;
};
