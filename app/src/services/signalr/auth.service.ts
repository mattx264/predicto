import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserDto,
} from "../../types/types";
import apiService from "./api.service";

class AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    const loginData: LoginRequest = { email, password };

    const response = await fetch(
      `${apiService.getBackendUrl()}/api/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Nieprawidłowy email lub hasło");
      }
      throw new Error("Błąd logowania. Spróbuj ponownie.");
    }

    const data: AuthResponse = await response.json();
    return data;
  }

  async register(
    username: string,
    email: string,
    password: string,
    lang: string = "pl"
  ): Promise<void> {
    const registerData: RegisterRequest = {
      username,
      email,
      password,
      lang,
    };

    const response = await fetch(
      `${apiService.getBackendUrl()}/api/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      }
    );

    if (!response.ok) {
      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Nieprawidłowe dane rejestracji");
      }
      throw new Error("Błąd rejestracji. Spróbuj ponownie.");
    }
  }

  async getCurrentUser(token: string): Promise<UserDto | null> {
    if (!token || this.isTokenExpired(token)) {
      return null;
    }

    const decoded = this.decodeToken(token);
    if (!decoded) {
      return null;
    }

    return {
      id: parseInt(decoded.sub || "0"),
      name: decoded.email?.split("@")[0] || "User",
      email: decoded.email || "",
    };
  }

  decodeToken(
    token: string
  ): { exp?: number; sub?: string; email?: string } | null {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    const expirationDate = new Date(decoded.exp * 1000);
    return expirationDate < new Date();
  }
}

export default new AuthService();
