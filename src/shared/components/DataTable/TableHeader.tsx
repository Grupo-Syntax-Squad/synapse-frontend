import { ButtonIconType } from "@/interfaces/components/Button";
import { classNames } from "primereact/utils";
import { Form, InputGroup } from "react-bootstrap";
import { Button } from "../Button";
import { Switch } from "../Switch";
import { useMemo, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import {
  type IButtonTypeProps,
  type ISwitchTypeProps,
  TableHeaderType,
  type TTableHeader,
} from "@/interfaces/components/TableHeader";

export const TableHeader = ({
  type = TableHeaderType.ONLY_SEARCH,
  inputPlaceholder,
  inputId,
  leftContent,
  rightContent,
  className,
  children,
  typeSizeInput,
  inputGroupClassName = "align-self-end",
  ignoreDefaultClasses = false,
  ...props
}: TTableHeader) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [dataTableFilter, setDataTableFilter] = useState({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },
  });

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...dataTableFilter };
    _filters.global.value = value;
    setDataTableFilter(_filters);
    setSearchFilter(value);
  };

  const resolvedClassNameLeft = useMemo(
    () =>
      ignoreDefaultClasses
        ? className || ""
        : classNames(
            "w-100 d-flex justify-content-between flex-column flex-md-row gap-3 p-3",
            className
          ),
    [ignoreDefaultClasses, className]
  );

  const resolvedClassNameRight = useMemo(
    () =>
      ignoreDefaultClasses
        ? className || ""
        : classNames(
            "d-flex align-items-center justify-content-end flex-column flex-sm-row w-md-50 gap-2",
            className
          ),
    [ignoreDefaultClasses, className]
  );

  const renderSwitch = useMemo(() => {
    if (
      type === TableHeaderType.WITH_SWITCH ||
      type === TableHeaderType.WITH_SWITCH_AND_ADD_BUTTON
    ) {
      const {
        switchLabel = "Show inactives",
        switchChecked,
        onSwitchChange,
        switchId,
      } = props as ISwitchTypeProps;
      return (
        <Switch
          id={switchId}
          label={switchLabel}
          checked={switchChecked}
          onChange={(e) => onSwitchChange(e.target.checked)}
        />
      );
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(props as ISwitchTypeProps)?.switchChecked]);

  const renderButton = () => {
    if (
      type === TableHeaderType.WITH_ADD_BUTTON ||
      type === TableHeaderType.WITH_SWITCH_AND_ADD_BUTTON
    ) {
      const {
        buttonLabel,
        onButtonClick,
        buttonPermissionsItem,
        buttonPermissionsType,
      } = props as IButtonTypeProps;
      return (
        <Button
          className="w-100 w-md-auto"
          iconType={ButtonIconType.ADD}
          onClick={onButtonClick}
          permissionItem={buttonPermissionsItem}
          permissionType={buttonPermissionsType}
        >
          {buttonLabel}
        </Button>
      );
    }
    return null;
  };

  const renderInput = useMemo(() => {
    if (type === TableHeaderType.EMPTY || !inputPlaceholder) return null;
    const inputGroupCustom = `${inputGroupClassName} ${
      typeSizeInput ? typeSizeInput : "w-md-50"
    }`;
    return (
      <InputGroup className={inputGroupCustom}>
        <Form.Control
          placeholder={inputPlaceholder}
          id={inputId}
          className="rounded"
          value={searchFilter}
          onChange={onFilterChange}
        />
        <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 zindex-5 fs-lg" />
      </InputGroup>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputId, inputPlaceholder, searchFilter]);

  return (
    <>
      <div className={resolvedClassNameLeft}>
        <div className="d-flex gap-2">
          {leftContent}
          {type !== TableHeaderType.EMPTY && renderButton()}
        </div>
        <div className={resolvedClassNameRight}>
          {rightContent}
          {type !== TableHeaderType.EMPTY && renderSwitch}
          {type !== TableHeaderType.EMPTY && renderInput}
        </div>
      </div>
      {children && children({ dataTableFilter, onFilterChange })}
    </>
  );
};
