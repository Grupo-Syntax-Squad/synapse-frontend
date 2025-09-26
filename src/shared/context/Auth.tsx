import {
  permissions,
  RoleKeys,
  type PermissionsItems,
  type PermissionsTypes,
} from "@/constants/permissions";
import type { IUserAuth } from "@/interfaces/contexts/Auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const API_URL = import.meta.env.VITE_SERVICE_URL;

interface AuthContextProps {
  user: IUserAuth | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  renderWithPermission: <T extends ReactNode>(
    checkAdmin: boolean,
    ...components: T[]
  ) => T[];
  verifyUserProfilePermission: (
    item: PermissionsItems,
    types: PermissionsTypes[]
  ) => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserAuth | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/users/me`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("not authenticated");
      const data = await res.json();
      setUser(data.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");
    await fetchUser();
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setUser(null);
    }
  };

  const renderWithPermission = <T extends ReactNode>(
    checkAdmin: boolean,
    ...components: T[]
  ): T[] => {
    if (!user) return [];
    if (checkAdmin && !user.is_admin) return [];
    return components;
  };

  const verifyUserProfilePermission = (
    item: PermissionsItems,
    types: PermissionsTypes[]
  ): boolean => {
    if (!user) return false;
    const userRole = user.is_admin ? RoleKeys.ADMIN : RoleKeys.USER;
    const itemPermissions = permissions[item];
    if (!itemPermissions) return false;
    return types.some((type) => {
      const allowedRoles = itemPermissions[type as string];
      return allowedRoles?.includes(userRole);
    });
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
        renderWithPermission,
        verifyUserProfilePermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
