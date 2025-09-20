import api from "./api";
import type { LoginCredentials, LoginResponse, RegisterData } from "@/shared/components/interfaces/Auth";
import type User from "@/shared/components/interfaces/User";

const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);

    localStorage.setItem("token", data.token);
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    return data;
  },
  
  register:async(userData: RegisterData): Promise<User> => {
    const { data } = await api.post<User>("/auth/register", userData);
    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  },

  getCurrentUser: () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return token;
  },
};

export default authService;
