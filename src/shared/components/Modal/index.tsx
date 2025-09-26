import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { forwardRef, useImperativeHandle, useState } from "react";
import type {
  TModalProps,
  TModalForwardHandles,
  TModal,
} from "@/interfaces/components/Modal";
import { ModalFooter } from "./Modalfooter";

export const Modal = forwardRef<TModalForwardHandles>((_, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalProps, setModalProps] = useState<TModalProps | undefined>(
    undefined
  );

  const onShowModal = ({ body, ...props }: TModal) => {
    const { footer, type, ...rest } = props;
    if (type === "action") {
      const { onConfirm, onCancel, cancelLabel, confirmLabel, ...actionRest } =
        props;
      const customFooter = (
        <ModalFooter
          onCancel={onCancel}
          onConfirm={onConfirm}
          cancelLabel={cancelLabel}
          confirmLabel={confirmLabel}
        />
      );
      onChange({ ...actionRest, footer: customFooter, children: body });
    } else {
      onChange({ ...rest, footer, children: body });
    }
  };

  const onChange = (props: TModalProps) => {
    setModalProps(props);
    setIsVisible(true);
  };

  const onHideModal = () => {
    setIsVisible(false);
    setModalProps(undefined);
  };

  useImperativeHandle(ref, () => ({
    show: onShowModal,
    hide: onHideModal,
  }));

  return (
    <Dialog
      onHide={onHideModal}
      visible={isVisible}
      className={classNames("col-12 col-md-8 col-xxl-6", modalProps?.className)}
      {...modalProps}
    />
  );
});

Modal.displayName = "Modal";
