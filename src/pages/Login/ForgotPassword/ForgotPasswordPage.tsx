import { useState } from "react";
import { RequestCode } from "./RequestCode";
import { VerifyCode } from "./VerifyCode";
import { NewPassword } from "./NewPassword";

export function ForgotPasswordPage() {
  const [step, setStep] = useState<'request' | 'verify' | 'password'>('request');
  const [verificationCode, setVerificationCode] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  // Note: avoid forcing a page reset on unmount. Unmount can happen
  // for many reasons (React strict mode double-mounts, hot reloads, etc.)
  // and resetting to LOGIN here causes a flicker where the forgot-password
  // view is mounted and immediately reverted. Manage navigation explicitly
  // from the parent or success flows instead.

  const renderStep = () => {
    switch (step) {
      case 'request':
        return (
          <RequestCode 
            email={forgotPasswordEmail}
            onEmailChange={setForgotPasswordEmail}
            onSuccess={() => setStep('verify')} 
          />
        );
      case 'verify':
        return (
          <VerifyCode 
            email={forgotPasswordEmail}
            onSuccess={(code: string) => {
              setVerificationCode(code);
              setStep('password');
            }} 
            onBack={() => setStep('request')} 
          />
        );
      case 'password':
        return (
          <NewPassword 
            email={forgotPasswordEmail}
            verificationCode={verificationCode} 
            onBack={() => setStep('verify')} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-100 px-2" style={{ maxWidth: "450px" }}>
      <h1 className="h2 fw-bold mb-4">Recuperar Senha</h1>
      <p className="text-muted mb-4">
        Digite seu e-mail para receber um código de recuperação de senha.
      </p>
      {renderStep()}
    </div>
  );
}