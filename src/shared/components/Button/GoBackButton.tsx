import { useNavigate } from "react-router-dom";
import { Button } from ".";
import { ButtonSeverity } from "@/interfaces/components/Button";

export const GoBackButton = () => {
  const nav = useNavigate();

  const goBack = () => {
    if (window.history.length <= 1) {
      nav("/");
    } else {
      nav(-1);
    }
  };

  return (
    <Button
      severity={ButtonSeverity.SECONDARY}
      className="d-flex flex-grow-1 flex-md-grow-0"
      onClick={goBack}
    >
      <i className="bi bi-arrow-left me-2" />
      <span>Back</span>
    </Button>
  );
};
