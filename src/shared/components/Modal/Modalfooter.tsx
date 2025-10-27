import { ButtonIconType } from "@/interfaces/components/Button"
import { Button } from "../Button"
import type { IModalFooter } from "@/interfaces/components/Modal"

export const ModalFooter = ({
  onCancel,
  onConfirm,
  cancelLabel = "Cancel",
  closeLabel = "Close",
  confirmLabel = "Confirm",
}: IModalFooter) => {
  const dismissLabel = onConfirm ? cancelLabel : closeLabel

  return (
    <div
      className="d-flex gap-3 justify-content-end p-dialog-footer px-0 pb-0 mt-3"
      data-pc-section="footer"
    >
      <Button
        className="w-100 w-md-auto"
        iconType={ButtonIconType.CANCEL}
        onClick={onCancel}
        tooltip={dismissLabel}
      >
        {dismissLabel}
      </Button>
      {onConfirm && confirmLabel && (
        <Button
          className="w-100 w-md-auto"
          iconType={ButtonIconType.CONFIRM}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      )}
    </div>
  )
}
