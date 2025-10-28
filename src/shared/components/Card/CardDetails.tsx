import { classNames } from "primereact/utils";
import { Card } from "react-bootstrap";

interface Props {
  title: React.ReactNode;
  rightTitleContent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  defaultClassName?: boolean;
  fillHeight?: boolean;
}

export const CardDetails = ({
  title,
  rightTitleContent,
  children,
  className,
  defaultClassName = true,
  fillHeight = false,
}: Props) => {
  const customClassName = classNames(
    defaultClassName && "row row-col col-border p-3 gap-2 gap-md-0",
    className
  );
  return (
    <Card
      className={classNames("p-0 overflow-hidden", { "h-100": fillHeight })}
    >
      <Card.Header
        as="h5"
        className="m-0 px-3 py-2 w-100 d-flex justify-content-between align-items-center"
      >
        <span>{title}</span>
        {rightTitleContent && (
          <div className="h6 flex-center m-0">{rightTitleContent}</div>
        )}
      </Card.Header>
      {children && (
        <Card.Body className="p-0">
          <div className={customClassName}>{children}</div>
        </Card.Body>
      )}
    </Card>
  );
};
