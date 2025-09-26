import { ColType, type TCol } from "@/interfaces/components/Col";
import { Col as ColRB } from "react-bootstrap";

export const Col = ({ colType, ...rest }: TCol) => {
  const breakpointCol = () => {
    const customBreakpoints = {
      [ColType.MODAL_FORM]: {
        xs: 12,
        md: 6,
      },
      [ColType.LARGE_MODAL_FORM]: {
        xs: 12,
        lg: 4,
      },
      [ColType.FULL_WIDTH]: {
        xs: 12,
      },
      [ColType.BASIC_FORM]: {
        xs: 12,
        md: 6,
        lg: 4,
        xl: 3,
      },
    };
    return customBreakpoints[colType as keyof typeof customBreakpoints] || {};
  };
  return <ColRB {...breakpointCol()} {...rest} />;
};
