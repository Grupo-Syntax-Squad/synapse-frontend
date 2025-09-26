import { type Dispatch, type SetStateAction, useState } from "react";
import { Form } from "react-bootstrap";

interface Props {
  label?: string;
  isInvalid?: boolean;
  isValidLabel?: string;
  password: string;
  isInvalidVerification?: boolean;
  isValidVerification?: boolean;
  setPassword: Dispatch<SetStateAction<string>>;
}

export default function PasswordField({
  label,
  isInvalid = false,
  isValidLabel = "Your password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.",
  password,
  setPassword,
  isInvalidVerification,
  isValidVerification,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const isValidPassword = !isValidVerification
    ? undefined
    : !isInvalid && password.length >= 8 && password !== null;
  const isInvalidPassword = !isInvalidVerification
    ? undefined
    : isInvalid || password.length < 8 || password === null;

  function onPasswordChange(field: React.ChangeEvent<HTMLInputElement>) {
    setPassword(field.target.value);
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  const toggleVisibilityTitle = showPassword
    ? "Hide password"
    : "Show password";
  const showError = isInvalidPassword ? "d-block" : "d-none";
  const fieldRequiredValidation =
    isInvalidPassword || isValidPassword ? "was-validated" : "";
  return (
    <Form.Group id="validationCustom02">
      <Form.Label>{label || "Password"}</Form.Label>
      <div className={fieldRequiredValidation}>
        <div className="password-toggle">
          <Form.Control
            required
            isValid={isValidPassword}
            isInvalid={isInvalidPassword}
            value={password}
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={onPasswordChange}
          />
          <Form.Label
            className="password-toggle-btn"
            aria-label="Show/Hide password"
          >
            <input
              className="password-toggle-check"
              type="checkbox"
              checked={!showPassword}
              onChange={togglePasswordVisibility}
            />
            <span
              className="password-toggle-indicator"
              title={toggleVisibilityTitle}
            />
          </Form.Label>
        </div>
        <Form.Control.Feedback type="invalid" className={showError}>
          {isValidLabel || ""}
        </Form.Control.Feedback>
      </div>
    </Form.Group>
  );
}
