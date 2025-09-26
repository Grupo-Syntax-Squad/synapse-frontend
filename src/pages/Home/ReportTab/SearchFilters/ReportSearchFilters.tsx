import { SearchCard } from "@/shared/components/Card/SearchCard";
import { DateField } from "./DateField";
import {
  GetReportParamsKeys,
  type IGetReportParams,
} from "@/interfaces/services/Report";
import type { THandleSetFieldProps } from "@/interfaces/Common";
import { useCallback, useState } from "react";

type SearchParams = IGetReportParams;

interface Props {
  onUseQueryParamsToSearch: (query?: Partial<SearchParams>) => Promise<void>;
  onClearQueryParams: () => void;
}

const defaultForm: SearchParams = {
  [GetReportParamsKeys.START_DATE]: undefined,
  [GetReportParamsKeys.END_DATE]: undefined,
};

const defaultFieldDisabled: Record<keyof SearchParams, boolean> = {
  [GetReportParamsKeys.START_DATE]: false,
  [GetReportParamsKeys.END_DATE]: false,
};

export const ReportSearchFilters = ({
  onUseQueryParamsToSearch,
  onClearQueryParams,
}: Props) => {
  const [form, setForm] = useState<SearchParams>(defaultForm);
  const [fieldDisabled, setFieldDisabled] = useState(defaultFieldDisabled);

  const onClearFilters = useCallback(() => {
    setForm(defaultForm);
    setFieldDisabled(defaultFieldDisabled);
    onClearQueryParams();
  }, [onClearQueryParams]);

  const handleSetField = useCallback((event: THandleSetFieldProps) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleQueryParams = useCallback((): Partial<SearchParams> => {
    const params: Partial<SearchParams> = {};

    if (
      !fieldDisabled[GetReportParamsKeys.START_DATE] &&
      form[GetReportParamsKeys.START_DATE]
    ) {
      params[GetReportParamsKeys.START_DATE] =
        form[GetReportParamsKeys.START_DATE];
    }

    if (
      !fieldDisabled[GetReportParamsKeys.END_DATE] &&
      form[GetReportParamsKeys.END_DATE]
    ) {
      params[GetReportParamsKeys.END_DATE] = form[GetReportParamsKeys.END_DATE];
    }

    return params;
  }, [form, fieldDisabled]);

  const onSearch = async () => {
    await onUseQueryParamsToSearch(handleQueryParams());
  };

  return (
    <SearchCard onClear={onClearFilters} onSubmit={onSearch}>
      <DateField
        handleSetField={handleSetField}
        startDateValue={form[GetReportParamsKeys.START_DATE]}
        endDateValue={form[GetReportParamsKeys.END_DATE]}
        startDateDisabled={fieldDisabled[GetReportParamsKeys.START_DATE]}
        endDateDisabled={fieldDisabled[GetReportParamsKeys.END_DATE]}
      />
    </SearchCard>
  );
};
