import { routeMap, RouteMapKeys } from "@/constants/routes";
import { ErrorBase } from "@/shared/components/Error/ErrorBase";
import { useTitle } from "@/shared/context/Title";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Props {
  title?: string;
  description?: string;
}

export default function NotFound({ title, description }: Props) {
  const nav = useNavigate();
  const redirectTo = () => nav(routeMap[RouteMapKeys.ROOT].path);
  const { setTitle } = useTitle();
  const customTitle = title || "404 - Page Not Found";
  const customDescription =
    description ||
    "The page you are looking for does not exist or has been moved.";

  useEffect(() => {
    setTitle(customTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customTitle]);

  return (
    <ErrorBase title={customTitle} description={customDescription}>
      <Button size="lg" className="shadow-primary" onClick={redirectTo}>
        <i className="bi bi-house-door-fill me-2 ms-n1 lead" />
        Go back Home
      </Button>
    </ErrorBase>
  );
}
