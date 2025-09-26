import { routeMap, RouteMapKeys } from "@/constants/routes";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Actions = () => {
  const nav = useNavigate();
  const reload = () => window.location.reload();
  const handleReload = () => {
    nav(routeMap[RouteMapKeys.ROOT].path);
    reload();
  };
  return (
    <div className="d-flex flex-column flex-md-row gap-3">
      <Button size="lg" className="shadow-primary" onClick={handleReload}>
        <i className="bi bi-house-door fs-5 me-2" />
        Back to Home
      </Button>
      <Button size="lg" className="shadow-primary" onClick={reload}>
        <i className="bi bi-arrow-clockwise fs-5 me-2" />
        Reload Page
      </Button>
    </div>
  );
};
