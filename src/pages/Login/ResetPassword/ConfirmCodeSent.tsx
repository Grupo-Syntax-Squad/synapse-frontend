import { useNotification } from "@/shared/context";
import PrimaryLoginButton from "../Form/PrimaryLoginButton";
import { useLoginPage } from "../LoginPageContext";
import { ColType } from "@/interfaces/components/Col";
import { FieldMask } from "@/utils/Format";
import { AuthServices } from "@/shared/services/Auth";
import { EmailInputField } from "@/shared/components/FormFields/EmailInputField";

interface Props {
  setCodeSent: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ConfirmCodeSent({ setCodeSent }: Props) {
  const { email, handleEmailChange, emailError, verifyEmail } = useLoginPage();
  const { Toast, Loading } = useNotification();

  async function handleSendCodeClick() {
    if (!verifyEmail()) {
      return;
    }
    try {
      Loading.show("Enviando código...");
      await AuthServices.requestPasswordReset(FieldMask.removeMask(email));
      Toast.show(
        "success",
        "Código de verificação enviado!",
        "Verifique o código enviado em seu e-mail."
      );
      setCodeSent(true);
    } catch (error: unknown) {
      const detail = (error as { response?: { data?: { detail?: unknown } } })
        .response?.data?.detail;
      const message =
        typeof detail === "string"
          ? detail
          : "Verifique as credenciais e tente novamente";
      Toast.show("error", "Falha no envio!", message);
    } finally {
      Loading.hide();
    }
  }

  return (
    <>
      <EmailInputField
        colType={ColType.FULL_WIDTH}
        id="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        error={emailError}
      />
      <PrimaryLoginButton
        label="Enviar confirmação"
        submitCallback={handleSendCodeClick}
      />
    </>
  );
}
