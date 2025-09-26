/**
 * Type of alerts
 */
export type TStylesAlertConstant = "success" | "warning" | "danger" | "info"

/**
 * Used on variant colors of background, text, alerts.
 */
export type TStylesVariantConstant =
    | "primary"
    | "secondary"
    | "dark"
    | "light"
    | TStylesAlertConstant
