import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import authService from "../services/signalr/auth.service";
import type { UserDto } from "../services/nsawg/client";



interface AuthContextType {
  user: UserDto | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    lang?: string
  ) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH_TOKEN_KEY = "authToken";
const USER_DATA_KEY = "userData";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  });

  const [user, setUser] = useState<UserDto | null>(() => {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem(AUTH_TOKEN_KEY);

      if (savedToken) {
        if (authService.isTokenExpired(savedToken)) {
          localStorage.removeItem(AUTH_TOKEN_KEY);
          localStorage.removeItem(USER_DATA_KEY);
          setToken(null);
          setUser(null);
        } else {
          setToken(savedToken);
          try {
            const userData = await authService.getCurrentUser(savedToken);
            if (userData) {
              setUser(userData);
              localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
            } else {
              localStorage.removeItem(AUTH_TOKEN_KEY);
              localStorage.removeItem(USER_DATA_KEY);
              setToken(null);
              setUser(null);
            }
          } catch (error) {
            console.error("Błąd inicjalizacji auth:", error);
            localStorage.removeItem(AUTH_TOKEN_KEY);
            localStorage.removeItem(USER_DATA_KEY);
            setToken(null);
            setUser(null);
          }
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_DATA_KEY);
    }
  }, [user]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  }, []);

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      if (authService.isTokenExpired(token)) {
        console.log("Token wygasł, wylogowuję...");
        logout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [token, logout]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const authToken = await authService.login(email, password);
      setToken(authToken);

      const userData = await authService.getCurrentUser(authToken);
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    lang: string = "pl"
  ) => {
    setIsLoading(true);
    try {
      await authService.register(username, email, password, lang);

      const authToken = await authService.login(email, password);
      setToken(authToken);

      const userData = await authService.getCurrentUser(authToken);
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = useCallback(async () => {
    if (!token) return;

    try {
      const userData = await authService.getCurrentUser(token);
      setUser(userData);
    } catch (error) {
      console.error("Błąd odświeżania użytkownika:", error);
      logout();
    }
  }, [token, logout]);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}