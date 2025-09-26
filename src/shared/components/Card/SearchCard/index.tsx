import { Card } from "react-bootstrap";
import { ColType } from "@/interfaces/components/Col";
import { ButtonIconType } from "@/interfaces/components/Button";
import { Col } from "../../Col";
import { Button } from "../../Button";

interface Props {
  onClear: () => void;
  onSubmit: () => Promise<void> | void;
  children: React.ReactNode;
}

export const SearchCard = ({ onClear, onSubmit, children }: Props) => (
  <Card className="p-0 overflow-hidden p-3 d-flex flex-column gap-3">
    {children}
    <Col
      colType={ColType.FULL_WIDTH}
      className="d-flex justify-content-end gap-2"
    >
      <Button
        iconType={ButtonIconType.DELETE}
        className="w-100 w-md-auto"
        onClick={onClear}
      >
        Clear filters
      </Button>
      <Button
        iconType={ButtonIconType.SEARCH}
        className="w-100 w-md-auto"
        onClick={onSubmit}
      >
        Search
      </Button>
    </Col>
  </Card>
);
