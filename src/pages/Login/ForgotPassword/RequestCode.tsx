import { useNotification } from "@/shared/context";
import { ColType } from "@/interfaces/components/Col";
import { AuthServices } from "@/shared/services/Auth";
import { EmailInputField } from "@/shared/components/FormFields/EmailInputField";
import PrimaryLoginButton from "@/pages/Login/Form/PrimaryLoginButton";
import SecondaryLoginButton from "@/pages/Login/Form/SecondaryLoginButton";
import { LoginPage } from "@/interfaces/pages/Login";
import { useLoginPage } from "@/pages/Login/LoginPageContext";

interface Props {
  email: string;
  onEmailChange: (email: string) => void;
  onSuccess: () => void;
}

export function RequestCode({ email, onEmailChange, onSuccess }: Props) {
  const { setCurrentPage } = useLoginPage();
  const { Toast, Loading } = useNotification();

  const verifyEmail = () => {
    if (!email || !email.includes("@")) {
      Toast.show("error", "E-mail inválido", "Por favor, digite um e-mail válido");
      return false;
    }
    return true;
  };

  async function handleRequestCode() {
    if (!verifyEmail()) {
      return;
    }
    try {
      Loading.show("Enviando código...");
      await AuthServices.requestPasswordReset(email);
      Toast.show(
        "success",
        "Código de verificação enviado!",
        "Verifique o código enviado em seu e-mail."
      );
      onSuccess();
    } catch (error: unknown) {
      const detail = (error as { response?: { data?: { detail?: unknown } } })
        .response?.data?.detail;
      const message =
        typeof detail === "string"
          ? detail
          : "Verifique o e-mail informado e tente novamente";
      Toast.show("error", "Falha no envio!", message);
    } finally {
      Loading.hide();
    }
  }

  return (
    <div>
      <p className="text-muted mb-4">
      </p>
      <EmailInputField
        colType={ColType.FULL_WIDTH}
        id="email"
        name="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        error=""
      />
      <div className="d-grid gap-3 mt-4">
        <PrimaryLoginButton
          label="Enviar Código"
          submitCallback={handleRequestCode}
        />
        <SecondaryLoginButton
          label="Voltar para Login"
          onClick={() => setCurrentPage(LoginPage.LOGIN)}
        />
      </div>
    </div>
  );
}