import { useEffect, useState } from "react";
import { ErrorBase } from "../ErrorBase";
import { Actions } from "./Actions";

export default function ErrorBoundary() {
  const [ErrorMessage, setErrorMessage] = useState<React.FC | null>(null);

  useEffect(() => {
    importErrorMessage();
  }, []);

  const importErrorMessage = async () => {
    const enabled = import.meta.env.DEV;
    if (enabled) {
      const module = await import("@/dev/ErrorMessage/ErrorMessage");
      setErrorMessage(() => module.ErrorMessage);
    }
  };
  return (
    <ErrorBase
      title="Something went wrong"
      description="An unexpected error occurred. Please try again later."
    >
      <div className="d-flex flex-column gap-3">
        <Actions />
        {ErrorMessage && <ErrorMessage />}
      </div>
    </ErrorBase>
  );
}
