import { classNames } from "primereact/utils";
import type { JSX } from "react";
import type { ReactNode } from "react";
import { Button } from "./Button";

type Props = (ContentProps | ButtonProps) & {
  converScreen?: boolean;
  title: string;
  description: string;
  icon?: ReactNode;
  content?: JSX.Element;
};

type ContentProps = {
  labelButton?: ReactNode;
  onClickButton?: () => void;
};

type ButtonProps = {
  labelButton: ReactNode;
  onClickButton: () => void;
};

export const EmptyContent = (rest: Props) => {
  const customClassName = classNames(
    rest.converScreen && "min-vh-75 d-flex flex-coumn justify-content-center"
  );

  const IconContent = () => {
    return <>{rest.icon || <i className="bi bi-search fs" />}</>;
  };
  return (
    <div className={customClassName}>
      <div className="d-flex justify-content-center p-2">
        <div className="col-lg-4 col-md-5 col-sm-6 d-flex flex-column align-items-center justify-content-center text-center gap-3">
          <div className="position-relative bg-secondary rounded-circle p-5 m-2">
            <div className="position-absolute top-50 start-50 translate-middle">
              <IconContent />
            </div>
          </div>
          <h5 className="mb-0">{rest.title}</h5>
          <p className="fs-sm mb-0">{rest.description}</p>
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
            {rest.content}
            {rest.labelButton ||
              (rest.onClickButton && (
                <Button className="shadow-primary" onClick={rest.onClickButton}>
                  {rest.labelButton}
                </Button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
