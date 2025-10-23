import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserDto,
} from "../../types/types";
import apiService from "./api.service";

const AUTH_TOKEN_KEY = "authToken";
const USER_DATA_KEY = "userData";

class AuthService {
  private getAuthHeaders(): HeadersInit {
    const token = this.getToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

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
    this.saveToken(data.token);

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
        throw new Error("Nieprawidłowe dane rejestracji");
      }
      throw new Error("Błąd rejestracji. Spróbuj ponownie.");
    }

    await this.login(email, password);
  }

  async getCurrentUser(): Promise<UserDto | null> {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const response = await fetch(`${apiService.getBackendUrl()}/api/user`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.logout();
          return null;
        }
        throw new Error("Błąd pobierania danych użytkownika");
      }

      const user: UserDto = await response.json();
      this.saveUserData(user);
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }

  saveToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  saveUserData(user: UserDto): void {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  }

  getUserData(): UserDto | null {
    const data = localStorage.getItem(USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
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
