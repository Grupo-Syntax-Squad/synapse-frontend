import { Badge } from "react-bootstrap";

interface Props {
  status: boolean;
  description: string;
}

export const StatusActiveColor = ({ description, status }: Props) => {
  const color = status ? "bg-success" : "bg-danger";
  return <Badge className={color}>{description}</Badge>;
};
