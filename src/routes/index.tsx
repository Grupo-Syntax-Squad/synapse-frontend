import { Router } from "./Router";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

export const Routes = () => (
  <RouterProvider router={createBrowserRouter(Router)} />
);
