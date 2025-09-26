import { Badge } from "react-bootstrap";
import { Button } from "../Button";
import type { TButtonProps } from "@/interfaces/components/Button";
import type { IShowByPermission } from "@/interfaces/components/ShowByPermission";
import { ShowByPermission } from "../ShowByPermission";

type Props = TButtonProps & {
  hideAction?: boolean;
  enabled?: boolean;
};
export const ChipBadge = ({
  children,
  hideAction = false,
  enabled = true,
  ...rest
}: Props) => {
  const HandleShowAction = () => {
    const { permissionItem, permissionType, ...props } =
      rest as IShowByPermission;
    const Content = () =>
      !hideAction && (
        <Button btnIcon className="w-auto h-auto rounded-5 me-1" {...props}>
          <i className="bi bi-x-circle" />
        </Button>
      );
    return permissionItem && permissionType ? (
      <ShowByPermission
        permissionItem={permissionItem}
        permissionType={permissionType}
      >
        <Content />
      </ShowByPermission>
    ) : (
      <Content />
    );
  };
  return (
    <Badge
      className="d-flex flex-row align-items-center rounded p-0 px-2 gap-1"
      bg={enabled ? "primary" : "secondary"}
    >
      <HandleShowAction />
      <div className="py-2">{children}</div>
    </Badge>
  );
};
