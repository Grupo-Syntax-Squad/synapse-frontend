import { ButtonIconType } from "@/interfaces/components/Button";
import { Button } from "../Button";
import { GoBackButton } from "../Button/GoBackButton";
import { LogoutButton } from "../Button/LogoutButton";
import { HeaderType } from "./index";

interface Props {
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  type?: HeaderType;
}

export const Actions = ({ onEditClick, onDeleteClick, type }: Props) => {
  return (
    <div className="d-flex gap-3">
      {type !== HeaderType.LOGOUT && <GoBackButton />}
      {type === HeaderType.LOGOUT && <LogoutButton />}

      {onEditClick && (
        <Button
          iconType={ButtonIconType.EDIT}
          className="d-flex flex-grow-1 flex-md-grow-0"
          onClick={onEditClick}
        >
          Editar
        </Button>
      )}
      {onDeleteClick && (
        <Button
          outline={false}
          btnIcon
          iconType={ButtonIconType.DELETE}
          onClick={onDeleteClick}
        />
      )}
    </div>
  );
};
