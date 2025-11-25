import type { THandleSetFieldProps } from "@/interfaces/Common";
import { LoginPage } from "@/interfaces/pages/Login";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ParamsConstantsKeys } from "@/interfaces/constants/routes";
import { useAuth } from "@/shared/context";
import { AuthServices } from "@/shared/services/Auth";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";
import ForcePasswordChange from "./ForcePasswordChange";

interface Props {
  currentPage: LoginPage;
  setCurrentPage: Dispatch<SetStateAction<LoginPage>>;
  email: string;
  emailError: string;
  handleEmailChange: (event: THandleSetFieldProps) => void;
  setEmailError: Dispatch<SetStateAction<string>>;
  verifyEmail: () => boolean;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  handleLogin: () => Promise<void>;
  onChangeToResetPassword: () => void;
  isLoading: boolean;
  loginError: string | null;
  currentUserAttemptingLogin?: boolean;
}

const LoginPageContext = createContext<Props | undefined>(undefined);

export const LoginPageProvider = () => {
  const [currentPage, setCurrentPage] = useState(LoginPage.LOGIN);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    const defaultEmail = searchParams.get(ParamsConstantsKeys.CHANGE_PASSWORD);
    if (defaultEmail !== null) {
      setCurrentPage(LoginPage.RESET_PASSWORD);
    }
  }, [searchParams]);

  // Redirect to home after successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleEmailChange = (event: THandleSetFieldProps) => {
    setEmail(event.target.value);
    if (emailError) setEmailError("");
  };

  const verifyEmail = () => {
    if (!email || !email.includes("@")) {
      setEmailError("E-mail inválido");
      return false;
    }
    return true;
  };

  const onChangeToResetPassword = async () => {
    if (!verifyEmail()) return;
    setIsLoading(true);
    try {
      await AuthServices.requestPasswordReset(email);
      setCurrentPage(LoginPage.RESET_PASSWORD);
    } catch (error) {
      const detail = (error as { response?: { data?: { detail?: unknown } } })
        .response?.data?.detail;
      const message =
        typeof detail === "string"
          ? detail
          : "Failed to send reset code. Please try again.";
      setLoginError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setLoginError(null);
    try {
      if (!verifyEmail()) return;
      await login(email, password);
    } catch {
      setLoginError("Falha ao autenticar. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  const values: Props = {
    currentPage,
    setCurrentPage,
    email,
    handleEmailChange,
    emailError,
    setEmailError,
    verifyEmail,
    password,
    setPassword,
    handleLogin,
    onChangeToResetPassword,
    isLoading,
    loginError,
  };

  const renderCurrentPage = () => {
    // Debug: log page transitions to help diagnose flicker/unmount issues
    // (Open browser console to see these messages)
    // eslint-disable-next-line no-console
    console.log("LoginPageProvider - currentPage:", currentPage);
    
    if (currentPage === LoginPage.FORGOT_PASSWORD) {
      return <ForgotPassword />;
    }
    if (currentPage === LoginPage.REGISTER) {
      return <Register />;
    }
    if (currentPage === LoginPage.FORCE_PASSWORD_CHANGE) {
      return <ForcePasswordChange />;
    }
    return <SignIn />;
  };

  return (
    <LoginPageContext.Provider value={values}>
      {renderCurrentPage()}
    </LoginPageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginPage = () => {
  const context = useContext(LoginPageContext);
  if (!context) {
    throw new Error(
      "useLoginPage hook can only be used inside of LoginPageProvider."
    );
  }
  return context;
};
