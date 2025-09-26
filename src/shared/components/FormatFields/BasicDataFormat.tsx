import { Badge } from "react-bootstrap";
import { ButtonSeverity } from "@/interfaces/components/Button";
import { Button } from "../Button";
import { ActivityStatusFormat, YesOrNoFormat } from "@/interfaces/utils/Format";

export function ActivityStatusBasicDataFormat(enabled: ActivityStatusFormat) {
  const bg =
    enabled === ActivityStatusFormat.INACTIVE
      ? "warning"
      : enabled === ActivityStatusFormat.ACTIVE
      ? "primary"
      : "secondary";
  return (
    <Badge className="rounded fw-bold" bg={bg}>
      {enabled}
    </Badge>
  );
}

export function LinkBasicDataFormat(label: string, onClick: () => void) {
  return (
    <Button
      severity={ButtonSeverity.NONE}
      className="border-0 p-0 fw-bold nav-link text-primary text-decoration-underline"
      onClick={onClick}
    >
      {label}
      <i className="bi bi-box-arrow-up-right pb-1 ms-2" />
    </Button>
  );
}

export function SeverityBadgeBasicDataFormat(
  severity: ActivityStatusFormat | YesOrNoFormat | boolean,
  positiveSeverity: string = "primary",
  negativeSeverity: string = "secondary"
) {
  return (
    <Badge
      className="rounded fw-bold"
      bg={
        severity === ActivityStatusFormat.ACTIVE ||
        severity === YesOrNoFormat.YES ||
        severity === true
          ? positiveSeverity
          : negativeSeverity
      }
    >
      {severity}
    </Badge>
  );
}
