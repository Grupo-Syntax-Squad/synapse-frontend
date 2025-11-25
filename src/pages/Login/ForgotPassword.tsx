import logo from "@/assets/logo.png";
import { Row } from "react-bootstrap";
import { Col } from "@/shared/components/Col";
import { ForgotPasswordPage } from "./ForgotPassword/ForgotPasswordPage";

export default function ForgotPassword() {
  return (
    <Row className="g-0 min-vh-100 vw-100 m-0">
      <Col
        xs={12}
        lg={6}
        className="d-flex flex-column justify-content-center align-items-center bg-white p-3 p-sm-4 p-md-5 order-2 order-lg-1"
      >
        <ForgotPasswordPage />
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

        <h2
          style={{ fontSize: '80px', zIndex: 2, position: 'relative' }}
          className="font-bold text-white text-center mb-3"
        >
          Welcome
        </h2>

        <div
          className="position-absolute bottom-0 end-0 d-none d-lg-block"
          style={{
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            backgroundColor: "#6a0df5",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            margin: "2rem",
          }}
        ></div>

        <div
          className="position-absolute top-50 start-0 d-none d-lg-block"
          style={{
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            backgroundColor: "#7c1cff",
            boxShadow: "0 30px 90px rgba(0, 0, 0, 0.25)",
            transform: "translateY(-50%)",
            margin: "2rem",
          }}
        ></div>
      </Col>
    </Row>
  );
}
