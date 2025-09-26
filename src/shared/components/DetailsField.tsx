import { Col } from "./Col";
import { ColType } from "@/interfaces/components/Col";
import type { IDetailsField } from "@/interfaces/components/DetailsField";
import { SanitizeRichHTML } from "@/utils/Format";
import { ShowByPermission } from "./ShowByPermission";

export const DetailsField = ({
  title,
  titleClassName = "",
  description,
  defaultTextColor,
  icon,
  permissionActionItem,
  permissionActionType,
  iconAction,
  richHTML = false,
  colType = ColType.BASIC_FORM,
  ...rest
}: IDetailsField) => {
  const safeHTML =
    richHTML && typeof description === "string"
      ? SanitizeRichHTML.sanitize(description)
      : "";

  const formattedMuted = () => {
    return defaultTextColor ? "" : "text-muted";
  };
  return (
    <Col colType={colType} {...rest}>
      <h6 className={`mb-1 ${titleClassName}`}>{title}</h6>
      {richHTML && typeof description === "string" ? (
        <span
          className={formattedMuted()}
          dangerouslySetInnerHTML={{ __html: safeHTML }}
        />
      ) : (
        <span className={formattedMuted()}>{description}</span>
      )}
      {icon && permissionActionItem && permissionActionType && (
        <ShowByPermission
          permissionItem={permissionActionItem}
          permissionType={permissionActionType}
        >
          <i onClick={iconAction} className={icon} />
        </ShowByPermission>
      )}
    </Col>
  );
};
