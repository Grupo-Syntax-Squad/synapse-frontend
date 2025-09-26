import type { IToggleOptions } from "@/interfaces/components/ToggleOptions";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

export const ToggleOptions = <ToggleKeys extends string>({
  data,
  selectedToggle,
  onToggleChange,
}: IToggleOptions<ToggleKeys>) => (
  <ButtonGroup>
    {data.map((item) => {
      const isSelected = selectedToggle === item.toggleId;
      return (
        <ToggleButton
          id={`toggleOption-${item.toggleId}`}
          key={item.toggleId}
          type="radio"
          variant={isSelected ? "primary" : "outline-primary"}
          name={item.toggleId}
          value={item.toggleId}
          title={item.title}
          checked={isSelected}
          className="btn-icon py-2 px-3"
          onChange={() => onToggleChange(item.toggleId)}
        >
          <i className={`bi ${item.iconName}`} />
        </ToggleButton>
      );
    })}
  </ButtonGroup>
);
