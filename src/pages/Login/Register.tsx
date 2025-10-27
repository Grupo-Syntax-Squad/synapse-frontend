import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import BaseForm from "./Form/BaseForm";
import PrimaryLoginButton from "./Form/PrimaryLoginButton";
import PasswordField from "./Form/PasswordField";
import { EmailInputField } from "@/shared/components/FormFields/EmailInputField";
import { ColType } from "@/interfaces/components/Col";
import { Row } from "react-bootstrap";
import { Col } from "@/shared/components/Col";
import { BasicInputField } from "@/shared/components/FormFields/BasicInputField";
import type { ISignUpParams } from "@/interfaces/services/Login";
import { SignUpParamsKeys } from "@/interfaces/services/Login";
import { useNotification } from "@/shared/context";
import { routeMap, RouteMapKeys } from "@/constants/routes";
import { UserServices } from "@/shared/services/User";
import { useLoginPage } from "./LoginPageContext";
import { LoginPage } from "@/interfaces/pages/Login";

const defaultForm: ISignUpParams = {
  [SignUpParamsKeys.USERNAME]: "",
  [SignUpParamsKeys.EMAIL]: "",
  [SignUpParamsKeys.PASSWORD]: "",
};

interface IRegisterErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Register() {
  const { setCurrentPage, isLoading } = useLoginPage();
  const navigate = useNavigate();
  const { Loading, Toast } = useNotification();

  const [form, setForm] = useState<ISignUpParams & { confirmPassword: string }>(
    {
      ...defaultForm,
      confirmPassword: "",
    }
  );
  const [errors, setErrors] = useState<IRegisterErrors>({});

  const handleSetField = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof IRegisterErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleRegister = async () => {
    const newErrors: IRegisterErrors = {};

    if (!form.username.trim()) newErrors.username = "Username is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.password) newErrors.password = "Password is required.";
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    Loading.show("Creating account...");

    try {
      await UserServices.registerUser({
        username: form.username,
        email: form.email,
        password: form.password,
      });

      Toast.show(
        "success",
        "Account created!",
        "Your account has been successfully created. Please log in to continue."
      );
      navigate(routeMap[RouteMapKeys.LOGIN].path);
    } catch (error: unknown) {
      let errorMessage = "Error creating account";
      const newErrors: IRegisterErrors = {};

      const errorObj = error as {
        response?: { data?: { detail?: unknown; message?: string } };
        message?: string;
      };

      if (errorObj?.response?.data?.detail) {
        const details = errorObj.response.data.detail;

        if (Array.isArray(details)) {
          details.forEach((detail: { msg?: string; loc?: string[] }) => {
            if (detail.msg) {
              const fieldPath = detail.loc?.[detail.loc.length - 1];

              switch (fieldPath) {
                case "email":
                  newErrors.email = detail.msg;
                  break;
                case "username":
                  newErrors.username = detail.msg;
                  break;
                case "password":
                  newErrors.password = detail.msg;
                  break;
                default:
                  errorMessage = detail.msg;
              }
            }
          });

          if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            errorMessage =
              "Please correct the errors in the highlighted fields.";
          }
        } else if (typeof details === "object" && details && "msg" in details) {
          errorMessage = (details as { msg: string }).msg;
        }
      } else if (errorObj?.response?.data?.message) {
        errorMessage = errorObj.response.data.message;
      } else if (errorObj?.message) {
        errorMessage = errorObj.message;
      }

      if (Object.keys(newErrors).length === 0) {
        setErrors({ email: errorMessage });
      }

      Toast.show("error", "Error registering", errorMessage);
    } finally {
      Loading.hide();
    }
  };

  const onKeyDown = async (event: React.KeyboardEvent<Element>) => {
    if (event.key === "Enter") {
      await handleRegister();
    }
  };

  const onChangeToSignIn = () => {
    setCurrentPage(LoginPage.LOGIN);
  };

  return (
    <Row
      className="g-0 min-vh-100 vw-100 m-0"
      style={{ overflowX: "hidden", maxWidth: "100%" }}
    >
      <Col
        xs={12}
        lg={6}
        className="d-flex flex-column justify-content-center align-items-center bg-white p-3 p-sm-4 p-md-5 order-2 order-lg-1"
      >
        <div className="w-100 px-2" style={{ maxWidth: "450px" }}>
          <h1 className="h2 fw-bold mb-4">Create your account</h1>
          <BaseForm onKeyDown={onKeyDown}>
            <BasicInputField
              colType={ColType.FULL_WIDTH}
              id="username"
              label="Username"
              name="username"
              value={form.username}
              onChange={handleSetField}
              className=""
              error={errors.username}
            />
            <EmailInputField
              colType={ColType.FULL_WIDTH}
              id="email"
              name="email"
              value={form.email}
              onChange={handleSetField}
              error={errors.email}
            />
            <PasswordField
              label="Password"
              password={form.password}
              setPassword={(value) =>
                handleSetField({
                  target: { name: "password", value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              isInvalid={!!errors.password}
              isInvalidVerification={true}
              isValidVerification={form.password.length >= 8}
              isValidLabel={
                errors.password ||
                "Your password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol."
              }
            />
            <PasswordField
              label="Confirm Password"
              password={form.confirmPassword}
              setPassword={(value) =>
                handleSetField({
                  target: { name: "confirmPassword", value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              isInvalid={!!errors.confirmPassword}
              isInvalidVerification={true}
              isValidVerification={
                form.confirmPassword.length > 0 &&
                form.password === form.confirmPassword
              }
              isValidLabel={errors.confirmPassword || "Passwords must match."}
            />

            {Object.keys(errors).length > 0 && (
              <div className="text-danger text-sm text-center mt-3">
                {Object.values(errors)
                  .filter(Boolean)
                  .map((error, index) => (
                    <p key={index} className="mb-1">
                      {error}
                    </p>
                  ))}
              </div>
            )}

            <div className="d-grid gap-3 mt-4">
              <PrimaryLoginButton
                label="Sigin Up"
                submitCallback={handleRegister}
                disabled={isLoading}
              />
            </div>
          </BaseForm>
          <p className="text-center mt-4 small">
            Already have an account?{" "}
            <button
              type="button"
              className="btn btn-link text-primary p-0 text-decoration-none"
              onClick={onChangeToSignIn}
            >
              Do login
            </button>
          </p>
        </div>
      </Col>
      <Col
        xs={12}
        lg={6}
        className="d-flex flex-column justify-content-center bg-primary align-items-center text-white p-3 p-sm-4 p-md-5 order-1 order-lg-2 position-relative"
      >
        <div className="position-absolute top-0 end-0 m-3 m-md-4">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
            style={{ height: "30px", maxHeight: "40px", width: "auto" }}
          />
        </div>

        <h2 className="display-5 display-lg-4 fw-bold text-white text-center mb-3">
          Welcome
        </h2>

        <div
          className="position-absolute bottom-0 bg-tertiary start-0 m-3 m-md-4 d-none d-lg-block"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
          }}
        ></div>
      </Col>
    </Row>
  );
}
