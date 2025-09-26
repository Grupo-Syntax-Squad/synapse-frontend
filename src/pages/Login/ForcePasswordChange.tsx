import { useEffect } from "react";
import { useNotification } from "@/shared/context";
import PasswordField from "./Form/PasswordField";
import ProjectLogo from "./ProjectLogo";
import BaseForm from "./Form/BaseForm";
import PrimaryLoginButton from "./Form/PrimaryLoginButton";
import { useLoginPage } from "./LoginPageContext";

export default function ForcePasswordChange() {
  // const { confirmNewPassword } = useAuth()
  const { Toast, Loading } = useNotification();
  const { currentUserAttemptingLogin, password, setPassword } = useLoginPage();

  useEffect(() => {
    setPassword("");
  }, [setPassword]);

  const handleSubmit = async () => {
    try {
      Loading.show("Alterando senha...");
      if (currentUserAttemptingLogin) {
        // await confirmNewPassword(password)
        Toast.show("success", "Senha alterada com sucesso!", "");
      }
    } catch {
      Toast.show(
        "error",
        "Ocorreu um erro ao trocar sua senha!",
        "Verifique sua senha e tente novamente."
      );
    } finally {
      Loading.hide();
    }
  };

  const isPasswordValid = password.length >= 8 && password !== null;

  return (
    <div className="register-form">
      <ProjectLogo />
      <h3 className="text-center">Troque sua senha</h3>
      <BaseForm>
        <PasswordField
          password={password}
          setPassword={setPassword}
          isInvalid={!isPasswordValid}
          isInvalidVerification
          isValidVerification
        />
        <PrimaryLoginButton
          label="Trocar senha"
          submitCallback={handleSubmit}
          disabled={!isPasswordValid}
        />
      </BaseForm>
    </div>
  );
}
