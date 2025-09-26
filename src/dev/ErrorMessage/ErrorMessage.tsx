import { Card } from "react-bootstrap";
import { useRouteError } from "react-router";

interface Props {
  status?: string;
  message?: string;
}

export const ErrorMessage = () => {
  const error = useRouteError() as Props;
  const titleDevError = error.status
    ? `Error ${error.status}`
    : "An unexpected error has occurred.";
  return (
    <Card border="danger" bg="danger" className="bg-opacity-10 p-3">
      <h6 className="text-danger d-flex align-items-center">
        <i className="bi bi-exclamation-triangle-fill me-2" />
        {titleDevError}
      </h6>
      <p className="mb-0 text-danger small">
        {error.message || "Please try again later."}
      </p>
    </Card>
  );
};
