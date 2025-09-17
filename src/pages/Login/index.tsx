import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import logo from "../../assets/logo.png";
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@example.com" && password === "123456") {
      navigate("/reports");
    } else {
      alert("Email ou senha inválidos!");
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
              placeholder="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-inputtext-lg w-full"
              required
            />
            <InputText 
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-inputtext-lg w-full"
              required
            />
            <a
              href="#"
              className="text-sm text-blue-600 hover:underline self-end"
            >
              I forgot my password
            </a>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition mt-2"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4 text-sm">
            Dont have an account? <a href="/register" className="text-blue-600 hover:underline">Register Now</a>
          </p>
        </div>
      </div>

      <div className="flex-1 relative bg-gradient-to-br from-violet-700 to-violet-500 flex items-center justify-center text-white py-16 md:py-0 order-1 md:order-2">
        <h2 className="text-3xl md:text-5xl font-bold">Welcome</h2>
         <div className="absolute top-5 right-5 md:top-10 md:right-10 w-10 h-10 md:w-12 md:h-12rounded-full">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto"
          />
        </div>
        <div className="absolute bottom-5 left-5 md:bottom-10 md:left-20 w-16 h-16 md:w-32 md:h-32 bg-violet-600 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default LoginPage;