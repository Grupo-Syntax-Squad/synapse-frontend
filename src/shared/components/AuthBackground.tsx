import type { IChildrenProps } from "@/interfaces/Common";
import { classNames } from "primereact/utils";
import { useAuth } from "../context/Auth";

interface Props extends IChildrenProps {
  className?: string;
}
export const AuthBackground = ({ className, children }: Props) => {
  const { isAuthenticated } = useAuth();
  const bg = isAuthenticated ? "bg-white" : "bg-tertiary";
  const customClassName = classNames(bg, className);
  return <div className={customClassName}>{children}</div>;
};
