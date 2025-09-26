import {
  CopyContentType,
  type ICopyContent,
} from "@/interfaces/components/CopyContent";
import { Tooltip } from "primereact/tooltip";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { Badge } from "react-bootstrap";
import { useNotification } from "../context/Notification";

export const CopyContent = ({
  toCopy,
  label,
  toastHeader,
  defaultTextColor = true,
  type = CopyContentType.BADGE,
  badgeBackground,
}: ICopyContent) => {
  const { Toast } = useNotification();
  const [isCopied, setIsCopied] = useState(false);
  const contentToCopy = toCopy || label;
  const icon = isCopied ? "bi-union" : "bi-front";
  const animationIcon = `d-inline-flex ${isCopied ? "a-tada" : ""}`;

  async function handleCopyToClipBoard() {
    try {
      setIsCopied(true);
      await navigator.clipboard.writeText((contentToCopy as number).toString());
      Toast.show("success", `${toastHeader}!`, "Content copied to clipboard");
    } catch {
      Toast.show(
        "error",
        `Oops! Something went wrong. ${toastHeader}`,
        "Failed to copy content to clipboard"
      );
    } finally {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }
  const IconContent = () => {
    return (
      <span className={animationIcon}>
        <i className={`bi ${icon} ms-1`} />
      </span>
    );
  };
  const TypeLabel = () => {
    const defaultColor = classNames(
      "text-nowrap",
      defaultTextColor && "text-muted"
    );
    const content =
      type === CopyContentType.BADGE ? (
        <Badge
          className="rounded flex-center flex-nowrap gap-1 cursor-pointer fw-bold"
          bg={badgeBackground}
        >
          {label} <IconContent />
        </Badge>
      ) : (
        <span className={defaultColor}>
          {label} <IconContent />
        </span>
      );
    return (
      label && (
        <div className="cursor-pointer" onClick={handleCopyToClipBoard}>
          {content}
        </div>
      )
    );
  };
  return (
    <>
      <Tooltip
        target=".cursor-pointer"
        content="Copy to clipboard"
        position="top"
      />
      <span
        data-pr-tooltip="Copy to clipboard"
        className="d-flex gap-2 align-items-center copyContent"
      >
        <TypeLabel />
      </span>
    </>
  );
};
