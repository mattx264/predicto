import type {
  RoomDTO,
  CreateRoomRequest,
  TournamentDto,
} from "../../types/types";
import apiService from "./api.service";

const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const roomService = {
  async getRooms(): Promise<RoomDTO[]> {
    try {
      const response = await fetch(`${apiService.getBackendUrl()}/api/room`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Musisz być zalogowany, aby zobaczyć pokoje");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("❌ Error fetching rooms:", error);
      throw error;
    }
  },

  async createRoom(data: CreateRoomRequest): Promise<void> {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Musisz być zalogowany, aby utworzyć pokój");
    }

    try {
      const response = await fetch(`${apiService.getBackendUrl()}/api/room`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Sesja wygasła. Zaloguj się ponownie");
        }

        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Nieprawidłowe dane pokoju");
        }

        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      console.log("✅ Room created successfully");
    } catch (error) {
      console.error("❌ Error creating room:", error);
      throw error;
    }
  },

  async getTournaments(): Promise<TournamentDto[]> {
    try {
      const response = await fetch(
        `${apiService.getBackendUrl()}/api/tournament`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("❌ Error fetching tournaments:", error);
      throw error;
    }
  },

  isAuthenticated(): boolean {
    return !!getAuthToken();
  },
};
