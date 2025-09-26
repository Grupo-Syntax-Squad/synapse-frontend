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
import { useSearchParams } from "react-router-dom";
import { ParamsConstantsKeys } from "@/interfaces/constants/routes";
import { useAuth } from "@/shared/context";
import { Login } from ".";

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
  const { login } = useAuth();

  useEffect(() => {
    const defaultEmail = searchParams.get(ParamsConstantsKeys.CHANGE_PASSWORD);
    if (defaultEmail !== null) {
      setCurrentPage(LoginPage.RESET_PASSWORD);
    }
  }, [searchParams]);

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

  const onChangeToResetPassword = () => {
    setEmail("");
    setEmailError("");
    setCurrentPage(LoginPage.RESET_PASSWORD);
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

  return (
    <LoginPageContext.Provider value={values}>
      <Login />
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
