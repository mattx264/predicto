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

  async createRoom(data: CreateRoomRequest): Promise<RoomDTO> {
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

          if (errorData.errors) {
            const messages = Object.values(errorData.errors).flat();
            throw new Error(messages.join(", "));
          }

          throw new Error(errorData.title || "Nieprawidłowe dane pokoju");
        }

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdRoom: RoomDTO = await response.json();
      return createdRoom;
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
  async getMyRooms(): Promise<RoomDTO[]> {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Musisz być zalogowany, aby zobaczyć swoje pokoje");
    }

    try {
      const response = await fetch(
        `${apiService.getBackendUrl()}/api/room/my`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Sesja wygasła. Zaloguj się ponownie");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("❌ Error fetching my rooms:", error);
      throw error;
    }
  },

  async joinRoom(roomId: number): Promise<{ message: string }> {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Musisz być zalogowany, aby dołączyć do pokoju");
    }

    try {
      const response = await fetch(
        `${apiService.getBackendUrl()}/api/room/${roomId}/join`,
        {
          method: "POST",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 401) {
          throw new Error("Sesja wygasła. Zaloguj się ponownie");
        }

        if (response.status === 404) {
          throw new Error(errorData.message || "Pokój nie istnieje");
        }

        if (response.status === 400) {
          throw new Error(errorData.message || "Nie można dołączyć do pokoju");
        }

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("❌ Error joining room:", error);
      throw error;
    }
  },

  async leaveRoom(roomId: number): Promise<{ message: string }> {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Musisz być zalogowany, aby opuścić pokój");
    }

    try {
      const response = await fetch(
        `${apiService.getBackendUrl()}/api/room/${roomId}/leave`,
        {
          method: "POST",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 401) {
          throw new Error("Sesja wygasła. Zaloguj się ponownie");
        }

        if (response.status === 404) {
          throw new Error(errorData.message || "Pokój nie istnieje");
        }

        if (response.status === 400) {
          throw new Error(errorData.message || "Nie można opuścić pokoju");
        }

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("❌ Error leaving room:", error);
      throw error;
    }
  },
};
