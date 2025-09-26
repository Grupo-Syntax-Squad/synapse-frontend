import { type LinkProps, Link as LinkRouter } from "react-router-dom";
import { classNames } from "primereact/utils";
import { activateOnRoutePath } from "@/utils/Style/ActivateOnRoute";

interface Props extends LinkProps, React.RefAttributes<HTMLAnchorElement> {
  activateOnRoute?: boolean;
  navLink?: boolean;
  dropdownItem?: boolean;
  hiddenIcon?: boolean;
  disabled?: boolean;
  hasDivider?: boolean;
  customOnClick?: (() => void) | undefined;
}

export const Link = ({
  activateOnRoute,
  navLink,
  dropdownItem,
  children,
  to,
  disabled,
  hiddenIcon,
  hasDivider,
  customOnClick,
  className = "",
  ...rest
}: Props) => {
  const activateText = activateOnRoute && activateOnRoutePath(to as string);
  const isNavLink = navLink && "nav-link";
  const isDropdownItem = dropdownItem && "dropdown-item";
  const hasLinkIcon = hiddenIcon && "d-flex align-items-center gap-2";
  const isDisabled = disabled && "disabled";

  const classNameProps = classNames(
    hasLinkIcon,
    isNavLink,
    isDropdownItem,
    activateText,
    isDisabled,
    "d-flex align-items-center",
    className
  );

  return (
    <>
      {to !== "" ? (
        <LinkRouter {...rest} className={classNameProps} to={to}>
          {children}
          {!hiddenIcon && <i className="bi bi-box-arrow-up-right pb-1 ms-1" />}
        </LinkRouter>
      ) : (
        <div
          className={`${classNameProps} cursor-pointer`}
          onClick={customOnClick}
        >
          {children}
        </div>
      )}

      {hasDivider && (
        <hr
          style={{
            borderColor: "var(--bs-secondary-subtle)",
            margin: "0.25rem 1rem",
          }}
        />
      )}
    </>
  );
};
