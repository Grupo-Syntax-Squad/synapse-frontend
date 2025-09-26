import { useState } from "react";
import BaseForm from "./Form/BaseForm";
import ProjectLogo from "./ProjectLogo";
import { ConfirmCodeSent } from "./ResetPassword/ConfirmCodeSent";
import SecondaryLoginButton from "./Form/SecondaryLoginButton";
import ConfirmNewPassword from "./ResetPassword/ConfirmNewPassword";
import { LoginPage } from "@/interfaces/pages/Login";
import { useLoginPage } from "./LoginPageContext";

export default function ResetPassword() {
  const { setCurrentPage } = useLoginPage();
  const [codeSent, setCodeSent] = useState(false);

  function onNextPage() {
    setCurrentPage(LoginPage.LOGIN);
  }

  return (
    <BaseForm>
      <ProjectLogo />
      <h3 className="text-center mb-0 my-2">Esqueci minha senha</h3>
      {!codeSent ? (
        <ConfirmCodeSent setCodeSent={setCodeSent} />
      ) : (
        <ConfirmNewPassword />
      )}
      <SecondaryLoginButton label="Cancelar" onClick={onNextPage} />
    </BaseForm>
  );
}
