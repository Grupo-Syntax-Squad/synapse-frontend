import { useState } from "react";
import { useNotification } from "@/shared/context";
import PrimaryLoginButton from "../Form/PrimaryLoginButton";
import PasswordField from "../Form/PasswordField";
import CodeField from "../Form/CodeField";
import { LoginPage } from "@/interfaces/pages/Login";
import { useLoginPage } from "../LoginPageContext";
import { FieldMask } from "@/utils/Format";
import { AuthServices } from "@/shared/services/Auth";

export default function ConfirmNewPassword() {
  const { Toast, Loading } = useNotification();
  const { email, setCurrentPage } = useLoginPage();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [emailCode, setEmailCode] = useState("");

  async function handleSubmit() {
    try {
      Loading.show("Redefinindo senha...");
      await AuthServices.confirmPasswordReset({
        email: FieldMask.removeMask(email),
        newPassword: password1,
        confirmationCode: emailCode,
      });
      Toast.show(
        "success",
        "Password changed successfully!",
        "Please log in again."
      );
      setCurrentPage(LoginPage.LOGIN);
    } catch (error: unknown) {
      const detail = (error as { response?: { data?: { detail?: unknown } } })
        .response?.data?.detail;
      const message =
        typeof detail === "string"
          ? detail
          : "Failed to reset password. Please check the code and the new password.";
      Toast.show("error", "Password reset failed!", message);
    } finally {
      Loading.hide();
    }
  }

  const isFormInvalid = () =>
    !(
      emailCode.length > 0 &&
      password1.length > 0 &&
      password1 === password2 &&
      password1.length >= 8
    );

  return (
    <>
      <CodeField
        label="Código de confirmação"
        code={emailCode}
        setCode={setEmailCode}
      />
      <p className="fs-sm pt-1 m-0">
        Please check your linked email{" "}
        <a className="fs-sm pt-1 text-primary">{email}</a> to validate the
        confirmation code received.
      </p>
      <hr />
      <PasswordField
        label="New Password"
        isInvalid={password1.length === 0}
        password={password1}
        setPassword={setPassword1}
        isInvalidVerification
        isValidVerification
      />

      <PasswordField
        label="Confirm Password"
        isInvalid={password1 !== password2 || password1.length == 0}
        isValidLabel="Passwords must match."
        password={password2}
        setPassword={setPassword2}
        isInvalidVerification
        isValidVerification
      />
      <PrimaryLoginButton
        label="Confirm"
        disabled={isFormInvalid()}
        submitCallback={handleSubmit}
      />
    </>
  );
}
