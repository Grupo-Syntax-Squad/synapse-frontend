import { Button } from "react-bootstrap";

interface Props {
  label?: string;
  disabled?: boolean;
  submitCallback: () => Promise<void>;
}
export default function PrimaryLoginButton({
  label,
  disabled = false,
  submitCallback,
}: Props) {
  return (
    <Button
      disabled={disabled}
      size="lg"
      className="w-100 shadow-primary"
      onClick={submitCallback}
    >
      {label || "Sign In"}
    </Button>
  );
}
