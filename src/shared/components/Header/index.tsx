import type { IChildrenProps } from "@/interfaces/Common";
import { Actions } from "./Actions";
import { useTitle } from "@/shared/context";
// import { Badge } from "react-bootstrap";
import { CopyContent } from "../CopyContent";
import { CopyContentType } from "@/interfaces/components/CopyContent";
import { classNames } from "primereact/utils";

// eslint-disable-next-line react-refresh/only-export-components
export enum HeaderType {
  ONLY_GO_BACK = "go-back",
  LOGOUT = "logout",
  WITH_EDIT_BUTTON = "edit",
  WITH_DELETE_BUTTON = "delete",
  WITH_EDIT_AND_DELETE_BUTTON = "edit-and-delete",
  WITH_BADGE_ENABLED = "badge-enabled",
  WITH_COPY_CONTENT = "copy-content",
}

type GoBackOption = {
  type: HeaderType.ONLY_GO_BACK;
};

type LogoutOption = {
  type: HeaderType.LOGOUT;
};

type EditOption = {
  type: HeaderType.WITH_EDIT_BUTTON;
  onEditClick: () => void;
};

type DeleteOption = {
  type: HeaderType.WITH_DELETE_BUTTON;
  onDeleteClick: (() => void) | undefined;
};

type EditAndDeleteOption = Omit<EditOption, "type"> &
  Omit<DeleteOption, "type"> & {
    type: HeaderType.WITH_EDIT_AND_DELETE_BUTTON;
  };

type BadgeEnabledOption = {
  type: HeaderType.WITH_BADGE_ENABLED;
  badgeStatus: boolean;
};

type CopyContentOption = {
  type: HeaderType.WITH_COPY_CONTENT;
  toastHeader: string;
  label: string | number;
  copyContentType: CopyContentType;
};

interface BaseProps {
  hastitle?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  titleClassName?: string;
}

type Props = BaseProps &
  (
    | GoBackOption
    | LogoutOption
    | EditOption
    | DeleteOption
    | EditAndDeleteOption
    | BadgeEnabledOption
    | CopyContentOption
  );

export const Header = ({
  hastitle,
  title,
  description,
  titleClassName,
  type,
  ...rest
}: Props) => {
  const { pageTitle } = useTitle();
  const customTitleClassName = classNames("m-0 text-tertiary", titleClassName);

  // const statusBadge = () => {
  //   const status = statusFormat((rest as BadgeEnabledOption).badgeStatus);
  //   let bgColor = "secondary";

  //   switch (status) {
  //     case "Ativo":
  //       bgColor = "primary";
  //       break;
  //     case "Inativo":
  //       bgColor = "secondary";
  //       break;
  //   }
  //   return (
  //     <Badge className="rounded fw-bold" bg={bgColor}>
  //       {status}
  //     </Badge>
  //   );
  // };

  const copyContent = () => {
    const toastHeader = (rest as CopyContentOption).toastHeader;
    const label = (rest as CopyContentOption).label;
    const copyContentType = (rest as CopyContentOption).copyContentType;
    return (
      <CopyContent
        toastHeader={toastHeader}
        label={label}
        type={copyContentType}
      />
    );
  };

  const Container = ({ children }: IChildrenProps) =>
    type ? (
      <div className="d-md-flex justify-content-between align-items-start mb-4 mb-md-0">
        {children}
      </div>
    ) : (
      children
    );

  return (
    <Container>
      <div className="mb-3 align-items-center align-items-md-start d-flex flex-column gap-1">
        <div className="d-md-flex justify-content-between align-items-start">
          <div className="text-center text-lg-start">
            {hastitle && (
              <h2 className={customTitleClassName}>{title || pageTitle}</h2>
            )}
          </div>
        </div>
        {description && (
          <h4 className="flex-center justify-content-lg-start m-0 text-muted">
            {description}
          </h4>
        )}
        {/* {type === HeaderType.WITH_BADGE_ENABLED && statusBadge()} */}
        {type === HeaderType.WITH_COPY_CONTENT && copyContent()}
      </div>
      {type && (
        <Actions
          type={type}
          onDeleteClick={(rest as DeleteOption).onDeleteClick}
          onEditClick={(rest as EditOption).onEditClick}
        />
      )}
    </Container>
  );
};
