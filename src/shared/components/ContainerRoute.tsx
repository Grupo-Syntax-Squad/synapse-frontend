import type { IChildrenProps } from "@/interfaces/Common";
import { Container, type ContainerProps } from "react-bootstrap";
import { useTitle } from "../context/Title";
import { useParams } from "react-router";
import { classNames } from "primereact/utils";
import { useEffect } from "react";
import { ParamsConstantsKeys } from "@/interfaces/constants/routes";
import { PageTitle } from "./PageTitle";
import NotFound from "@/pages/NotFound";
import { RequireAuth } from "./RequireAuth";
import { RoleKeys } from "@/constants/permissions";

interface ContainerRouteProps extends ContainerProps {
  defaultClassName?: boolean;
  browserTabTitle: string;
  containerTitle?: string;
  hiddenTitle?: boolean;
  notRequiredAuth?: boolean;
  profilesCanAccess?: RoleKeys[];
}

interface GlobalContextRouteProps extends IChildrenProps {
  notRequiredAuth?: boolean;
  profilesCanAccess?: RoleKeys[];
}

export const ContainerRoute = ({
  browserTabTitle,
  containerTitle,
  defaultClassName = true,
  as = "section",
  hiddenTitle = false,
  notRequiredAuth = false,
  children,
  className,
  profilesCanAccess,
  ...rest
}: ContainerRouteProps) => {
  const { setTitle, setBrowserTitle, setPageTitle } = useTitle();
  const params = useParams();
  const customClassName = classNames(
    defaultClassName &&
      "min-vh-100 d-flex flex-column gap-2 gap-md-3 py-3 py-md-4",
    className
  );

  const onUpdateTitle = () => {
    if (containerTitle) {
      setPageTitle(containerTitle);
      setBrowserTitle(browserTabTitle);
    } else {
      setTitle(browserTabTitle);
    }
  };

  useEffect(() => {
    onUpdateTitle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserTabTitle]);

  const StyledContainer = ({ children }: IChildrenProps) => {
    return defaultClassName ? (
      <Container as={as} className={customClassName} {...rest}>
        {children}
      </Container>
    ) : (
      <div className={customClassName}>{children}</div>
    );
  };
  const validateParams = () => {
    const paramId = params?.[ParamsConstantsKeys.DEFAULT_TAB];
    if (paramId) {
      return !isNaN(Number(paramId));
    }
    return true;
  };
  return (
    <AuthHandle
      notRequiredAuth={notRequiredAuth}
      profilesCanAccess={profilesCanAccess}
    >
      {validateParams() ? (
        <StyledContainer>
          {!hiddenTitle && <PageTitle />}
          {children}
        </StyledContainer>
      ) : (
        <NotFound
          title="Invalid Parameter"
          description="The parameter provided in the URL is invalid. Please check and try again."
        />
      )}
    </AuthHandle>
  );
};
const AuthHandle = ({
  children,
  notRequiredAuth,
  profilesCanAccess,
}: GlobalContextRouteProps) => {
  const Context = <>{children}</>;
  return notRequiredAuth ? (
    Context
  ) : (
    <RequireAuth profilesCanAccess={profilesCanAccess}>{Context}</RequireAuth>
  );
};
