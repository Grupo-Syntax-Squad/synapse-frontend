import { useTitle } from "../context/Title";
import { Header, HeaderType } from "./Header";

export const PageTitle = () => {
  const { pageTitle } = useTitle();
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start w-100">
      <div className="flex-grow-1">
        <h1 className="m-0 text-tertiary border-bottom border-primary border-5 pb-2 d-inline-block">
          {pageTitle}
        </h1>
      </div>
      <div className="mt-3 mt-md-0 ms-md-3">
        <Header type={HeaderType.LOGOUT} />
      </div>
    </div>
  );
};
