import { Suspense } from "react";
import { GlobalContexts } from "./GlobalContexts";
import { Loading } from "../Loading";
import { Outlet } from "react-router";

export const OutletRoute = () => {
  return (
    <div className="outlet-route">
      <GlobalContexts>
        <main>
          <Suspense fallback={<Loading isLoading defaultDescription="" />}>
            <Outlet />
          </Suspense>
        </main>
      </GlobalContexts>
    </div>
  );
};
