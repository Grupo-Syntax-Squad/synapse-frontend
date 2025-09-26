import { useEffect } from "react";
import logo from "@/assets/logo.png";
import BaseForm from "./Form/BaseForm";
import PrimaryLoginButton from "./Form/PrimaryLoginButton";
// import SecondaryLoginButton from "./Form/SecondaryLoginButton";
import PasswordField from "./Form/PasswordField";
import { LoginPage } from "@/interfaces/pages/Login";
import { useLoginPage } from "./LoginPageContext";
import { EmailInputField } from "@/shared/components/FormFields/EmailInputField";
import { ColType } from "@/interfaces/components/Col";
import { Row } from "react-bootstrap";
import { Col } from "@/shared/components/Col";

export default function SignIn() {
  const {
    email,
    handleEmailChange,
    password,
    setPassword,
    emailError,
    handleLogin,
    setCurrentPage,
    loginError,
    isLoading,
  } = useLoginPage();

  useEffect(() => {
    if (loginError) {
      console.warn(loginError);
    }
  }, [loginError]);

  async function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      await handleLogin();
    }
  }

  // const onChangeToResetPassword = () => {
  //   handleEmailChange({ target: { value: "", name: "email" } });
  //   setCurrentPage(LoginPage.RESET_PASSWORD);
  // };

  return (
    <Row className="g-0 min-vh-100 vw-100 m-0">
      <Col
        xs={12}
        lg={6}
        className="d-flex flex-column justify-content-center align-items-center bg-white p-3 p-sm-4 p-md-5 order-2 order-lg-1"
      >
        <div className="w-100 px-2" style={{ maxWidth: "450px" }}>
          <h1 className="h2 fw-bold mb-4">Login</h1>
          <BaseForm onKeyDown={onKeyDown}>
            <EmailInputField
              colType={ColType.FULL_WIDTH}
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
            />
            <PasswordField password={password} setPassword={setPassword} />

            {loginError && (
              <p className="text-danger text-sm text-center mt-3">
                {loginError}
              </p>
            )}

            <div className="d-grid gap-3 mt-4">
              <PrimaryLoginButton
                submitCallback={handleLogin}
                disabled={isLoading}
              />
              {/* <SecondaryLoginButton onClick={onChangeToResetPassword} /> */}
            </div>
          </BaseForm>
          <p className="text-center mt-4 small">
            Don&apos;t have an account?{" "}
            <a
              href=""
              className="text-primary text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                handleEmailChange({ target: { value: "", name: "email" } });
                setCurrentPage(LoginPage.REGISTER);
              }}
            >
              Register Now
            </a>
          </p>
        </div>
      </Col>
      <Col
        xs={12}
        lg={6}
        className="d-flex flex-column justify-content-center bg-primary align-items-center text-white p-3 p-sm-4 p-md-5 order-1 order-lg-2 position-relative min-vh-50 min-vh-lg-100"
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
