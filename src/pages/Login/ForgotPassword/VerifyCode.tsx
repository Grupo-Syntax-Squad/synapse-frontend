import { useState } from "react";
import { useNotification } from "@/shared/context";
import { AuthServices } from "@/shared/services/Auth";
import CodeField from "@/pages/Login/Form/CodeField";
import PrimaryLoginButton from "@/pages/Login/Form/PrimaryLoginButton";
import SecondaryLoginButton from "@/pages/Login/Form/SecondaryLoginButton";

interface Props {
  email?: string;
  onSuccess: (code: string) => void;
  onBack: () => void;
}

export function VerifyCode({ email, onSuccess, onBack }: Props) {
  const [code, setCode] = useState("");
  const { Toast, Loading } = useNotification();

  const handleVerifyCode = async () => {
    try {
      Loading.show("Verificando código...");
      if (code.length < 6) {
        Toast.show("error", "Código inválido!", "O código deve ter 6 dígitos.");
        return;
      }
      onSuccess(code);
    } catch (error) {
      Toast.show("error", "Falha na verificação!", "Código inválido.");
    } finally {
      Loading.hide();
    }
  };

  return (
    <div>
      <p className="text-muted mb-4">
        Digite o código de verificação enviado para {email}.
      </p>
      <CodeField
        label="Código de verificação"
        code={code}
        setCode={setCode}
      />
      <div className="d-grid gap-3 mt-4">
        <PrimaryLoginButton
          label="Verificar Código"
          disabled={code.length < 6}
          submitCallback={handleVerifyCode}
        />
        <SecondaryLoginButton
          label="Voltar"
          onClick={onBack}
        />
      </div>
    </div>
  );
}