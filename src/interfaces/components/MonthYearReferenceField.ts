export enum MonthYearReferenceDatesKeys {
    TODAY = "today",
    ONE_MONTH_BEFORE = "one_month_before",
    ONE_MONTH_AFTER = "one_month_after",
    ONE_WEEK_BEFORE = "one_week_before",
    ONE_WEEK_AFTER = "one_week_after",
    THREE_MONTHS_BEFORE = "three_months_before",
    THREE_MONTHS_AFTER = "three_months_after",
    SIX_MONTHS_BEFORE = "six_months_before",
    SIX_MONTHS_AFTER = "six_months_after",
    ONE_YEAR_BEFORE = "one_year_before",
    ONE_YEAR_AFTER = "one_year_after",
}

export interface IMonthYearReferenceDates {
    [MonthYearReferenceDatesKeys.TODAY]?: Date
    [MonthYearReferenceDatesKeys.ONE_MONTH_BEFORE]?: Date
    [MonthYearReferenceDatesKeys.ONE_MONTH_AFTER]?: Date
    [MonthYearReferenceDatesKeys.ONE_WEEK_BEFORE]?: Date
    [MonthYearReferenceDatesKeys.ONE_WEEK_AFTER]?: Date
    [MonthYearReferenceDatesKeys.THREE_MONTHS_BEFORE]?: Date
    [MonthYearReferenceDatesKeys.THREE_MONTHS_AFTER]?: Date
    [MonthYearReferenceDatesKeys.SIX_MONTHS_BEFORE]?: Date
    [MonthYearReferenceDatesKeys.SIX_MONTHS_AFTER]?: Date
    [MonthYearReferenceDatesKeys.ONE_YEAR_BEFORE]?: Date
    [MonthYearReferenceDatesKeys.ONE_YEAR_AFTER]?: Date
}
