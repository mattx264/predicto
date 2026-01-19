import {
  Client,
  type LoginReq,
  type RegistrationReq,
  type UserDto,
} from "../nsawg/client";
import apiService from "./api.service";

interface LoginResponse {
  Token?: string;
  token?: string;
}

interface DecodedToken {
  exp?: number;
  sub?: string;
  email?: string;
  iat?: number;
  jti?: string;
}

class AuthService {
  private client: Client;

  constructor() {
    this.client = new Client(apiService.getBackendUrl());
  }

  async login(email: string, password: string): Promise<string> {
    const loginData: LoginReq = {
      email,
      password,
    };

    try {
      const response = await this.client.login(loginData);
      let token: string;

      if (typeof response === "string") {
        try {
          const parsed: LoginResponse = JSON.parse(response);
          token = parsed.Token || parsed.token || "";
        } catch {
          token = response;
        }
      } else {
        const loginResponse = response as LoginResponse;
        token = loginResponse.Token || loginResponse.token || "";
      }

      if (!token) {
        throw new Error("Token nie został zwrócony przez serwer");
      }

      return token;
    } catch (error) {
      if (error instanceof Error && error.message.includes("401")) {
        throw new Error("Nieprawidłowy email lub hasło");
      }
      throw new Error("Błąd logowania. Spróbuj ponownie.");
    }
  }

  async register(
    username: string,
    email: string,
    password: string,
    lang: string = "pl",
  ): Promise<void> {
    const registerData: RegistrationReq = {
      username,
      email,
      password,
      lang,
    };

    try {
      await this.client.register(registerData);
    } catch (error) {
      if (error instanceof Error && error.message.includes("400")) {
        throw new Error("Nieprawidłowe dane rejestracji");
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

    const userDto: UserDto = {
      id: parseInt(decoded.sub || "0"),
      name: decoded.email?.split("@")[0] || "User",
      email: decoded.email || "",
    };

    return userDto;
  }

  decodeToken(token: string): DecodedToken | null {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
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

  getJoinDate(token: string): string {
    const decoded = this.decodeToken(token);
    if (decoded?.iat) {
      return new Date(decoded.iat * 1000).toISOString();
    }
    return new Date().toISOString();
  }

  getUserIdFromToken(token: string): number {
    const decoded = this.decodeToken(token);
    return parseInt(decoded?.sub || "0");
  }

  getEmailFromToken(token: string): string {
    const decoded = this.decodeToken(token);
    return decoded?.email || "";
  }
}

export default new AuthService();
