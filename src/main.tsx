import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import type { IChildrenProps } from "./interfaces/Common";
import "./shared/themes/styles/theme.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

// eslint-disable-next-line react-refresh/only-export-components
const RenderMode = ({ children }: IChildrenProps) => {
  return import.meta.env.REACT_STRICT_MODE === "false" ? (
    children
  ) : (
    <StrictMode>{children}</StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(
  <RenderMode>
    <App />
  </RenderMode>
);
