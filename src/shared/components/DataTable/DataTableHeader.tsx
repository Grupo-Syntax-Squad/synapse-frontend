import { ButtonIconType } from "@/interfaces/components/Button";
import { classNames } from "primereact/utils";
import { Form, InputGroup } from "react-bootstrap";
import { Button } from "../Button";
import { Switch } from "../Switch";
import { useCallback, useMemo } from "react";
import {
  TableHeaderType,
  type TDataTableHeader,
} from "@/interfaces/components/TableHeader";

export const DataTableHeader = ({
  inputPlaceholder = "Pesquisar...",
  inputId,
  leftContent,
  rightContent,
  className,
  inputGroupClassName = "align-self-center w-md-75",
  ignoreDefaultClasses = false,
  dataTableFilter,
  setDataTableFilter,
  typeSizeInput,
  ...props
}: TDataTableHeader) => {
  const onFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const _filters = { ...dataTableFilter };
      _filters.global.value = value;
      setDataTableFilter(_filters);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataTableFilter]
  );

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
      props.type === TableHeaderType.WITH_SWITCH ||
      props.type === TableHeaderType.WITH_SWITCH_AND_ADD_BUTTON
    ) {
      const {
        switchLabel = "Show inactives",
        switchChecked,
        onSwitchChange,
        switchId,
      } = props;
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
  }, [props.type]);

  const renderButton = useMemo(() => {
    if (
      props.type === TableHeaderType.WITH_ADD_BUTTON ||
      props.type === TableHeaderType.WITH_SWITCH_AND_ADD_BUTTON
    ) {
      const {
        buttonLabel,
        onButtonClick,
        buttonPermissionsItem,
        buttonPermissionsType,
      } = props;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type]);

  const renderInput = useMemo(() => {
    const inputGroupCustom = `${inputGroupClassName} ${
      typeSizeInput ? typeSizeInput : "w-md-50"
    }`;
    return (
      <InputGroup className={inputGroupCustom}>
        <Form.Control
          placeholder={inputPlaceholder}
          id={inputId}
          className="rounded"
          value={dataTableFilter.global.value}
          onChange={onFilterChange}
        />
        <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 zindex-5 fs-lg" />
      </InputGroup>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.type,
    inputPlaceholder,
    inputGroupClassName,
    inputId,
    dataTableFilter.global.value,
  ]);

  return (
    <div className={resolvedClassNameLeft}>
      <div className="d-flex flex-grow-1 align-items-center gap-2">
        {leftContent}
        {props.type !== TableHeaderType.EMPTY && renderButton}
      </div>
      <div className={resolvedClassNameRight}>
        {rightContent}
        {props.type !== TableHeaderType.EMPTY && (
          <>
            {renderSwitch}
            {renderInput}
          </>
        )}
      </div>
    </div>
  );
};
