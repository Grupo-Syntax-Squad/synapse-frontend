import type { ReactNode } from "react";
import { AuthBackground } from "../AuthBackground";
import LogoType from "@/assets/synapse_logo.png";

interface Props {
  title?: string;
  description?: string;
  image?: ReactNode;
  children?: ReactNode;
}

export const ErrorBase = ({
  title,
  description,
  children,
  image = (
    <img
      src={LogoType}
      className="object-fit-contain position-md-absolute translate-md-middle-y end-0 top-50 w-33"
      alt="Synapse logo"
    />
  ),
}: Props) => {
  return (
    <AuthBackground>
      <div className="text-md-start text-center">
        <div className="row d-flex gap-2 flex-column flex-md-row min-vh-100 align-items-center justify-content-md-between p-2 m-0">
          <div className="order-md-2">{image}</div>
          <div className="col-md-5 offset-xl-1 order-md-1 position-relative">
            <h1 className="display-2">{title}</h1>
            <p className="mx-md-0 mx-auto lead">{description}</p>
            {children}
          </div>
        </div>
      </div>
    </AuthBackground>
  );
};
