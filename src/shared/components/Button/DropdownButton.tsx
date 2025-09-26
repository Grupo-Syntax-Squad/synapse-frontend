import { forwardRef } from "react";
import { Button } from "react-bootstrap";

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export const DropdownButton = forwardRef<HTMLButtonElement, Props>(
  ({ onClick }, ref) => {
    return (
      <Button
        className="btn-icon border"
        variant="outline-primary"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        <i className="bi bi-three-dots-vertical fs-4" />
      </Button>
    );
  }
);

DropdownButton.displayName = "DropdownButton";
