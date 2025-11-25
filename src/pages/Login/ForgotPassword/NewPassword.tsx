import { useState } from "react";
import { useNotification } from "@/shared/context";
import { AuthServices } from "@/shared/services/Auth";
import { useLoginPage } from "@/pages/Login/LoginPageContext";
import { LoginPage } from "@/interfaces/pages/Login";
import PasswordField from "@/pages/Login/Form/PasswordField";
import PrimaryLoginButton from "@/pages/Login/Form/PrimaryLoginButton";
import SecondaryLoginButton from "@/pages/Login/Form/SecondaryLoginButton";

interface Props {
  email: string;
  verificationCode: string;
  onBack: () => void;
}

export function NewPassword({ email, verificationCode, onBack }: Props) {
  const { setCurrentPage } = useLoginPage();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { Toast, Loading } = useNotification();

  const handleSubmit = async () => {
    try {
      Loading.show("Alterando senha...");
      await AuthServices.confirmPasswordReset({
        email: email,
        newPassword: password1,
        confirmationCode: verificationCode,
      });
      Toast.show(
        "success",
        "Senha alterada com sucesso!",
        "Você já pode fazer login com sua nova senha."
      );
      setCurrentPage(LoginPage.LOGIN);
    } catch (error: unknown) {
      const detail = (error as { response?: { data?: { detail?: unknown } } })
        .response?.data?.detail;
      const message =
        typeof detail === "string"
          ? detail
          : "Falha ao alterar senha. Verifique os dados e tente novamente.";
      Toast.show("error", "Erro!", message);
    } finally {
      Loading.hide();
    }
  };

  const isFormInvalid = () =>
    password1.length < 8 || password1 !== password2;

  return (
    <div>
      <p className="text-muted mb-4">
        Digite sua nova senha.
      </p>
      <PasswordField
        label="Nova Senha"
        isInvalid={password1.length > 0 && password1.length < 8}
        password={password1}
        setPassword={setPassword1}
        isInvalidVerification
        isValidVerification
      />
      <PasswordField
        label="Confirmar Senha"
        isInvalid={password2.length > 0 && password1 !== password2}
        isValidLabel="As senhas devem ser iguais"
        password={password2}
        setPassword={setPassword2}
        isInvalidVerification
        isValidVerification
      />
      <div className="d-grid gap-3 mt-4">
        <PrimaryLoginButton
          label="Alterar Senha"
          disabled={isFormInvalid()}
          submitCallback={handleSubmit}
        />
        <SecondaryLoginButton
          label="Voltar"
          onClick={onBack}
        />
      </div>
    </div>
  );
}