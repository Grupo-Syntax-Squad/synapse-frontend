import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

import authService from "@/shared/services/authService";
import type { LoginCredentials } from "@/shared/components/interfaces/Auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: LoginCredentials = { email, password };

    try {
      setLoading(true);
      const userData = await authService.login(credentials);

      console.log("Usuário logado:", userData);

      navigate("/reports");
    } catch (error: any) {
      console.error("Erro no login:", error);
      alert(error.response?.data?.message || "Email ou senha inválidos!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-6 md:p-12 order-2 md:order-1">
        <div className="w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
            <InputText 
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-inputtext-lg w-full"
              required
            />
            <Password 
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-inputtext-lg w-full"
              toggleMask
              required
            />
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline self-end"
            >
              Esqueci minha senha
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition mt-2"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          <p className="text-center mt-4 text-sm">
            Ainda não possui conta? 
            <Link to="/register"  className="text-sm text-blue-600 hover:underline self-end">
            Cadastre-se agora
            </Link>
          </p>
        </div>
      </div>

      <div className="flex-1 relative bg-gradient-to-br from-violet-700 to-violet-900 flex items-center justify-center text-white py-16 md:py-0 order-1 md:order-2">
        <h2 className="text-6xl md:text-7xl font-bold">Bem-vindo</h2>
         <div className="absolute top-5 right-5 md:top-10 md:right-10 w-10 h-10 md:w-12 md:h-12rounded-full">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto"
          />
        </div>
          <div className="absolute bottom-5 left-5 md:bottom-50 md:left-10 w-16 h-16 md:w-64 md:h-64 bg-violet-600 rounded-full opacity-30 shadow-xl/30"></div>
        <div className="absolute bottom-5 left-5 md:bottom-10 md:left-140 w-16 h-16 md:w-96 md:h-96 bg-violet-600 rounded-full opacity-30 shadow-xl/30"></div>
      </div>
    </div>
  );
};

export default LoginPage;