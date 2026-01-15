import { Client, RoomDTO, TournamentDto, NewRoomDto } from "../nsawg/client";
import type { CreateRoomRequest } from "../../types/types";
import apiService from "./api.service";

const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

class AuthenticatedHttpClient {
  async fetch(url: RequestInfo, init?: RequestInit): Promise<Response> {
    const token = getAuthToken();
    const headers = new Headers(init?.headers);

    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(url, {
      ...init,
      headers,
    });
  }
}

class RoomService {
  private client: Client;

  constructor() {
    this.client = new Client(
      apiService.getBackendUrl(),
      new AuthenticatedHttpClient()
    );
  }

  async getRooms(): Promise<RoomDTO[]> {
    try {
      return await this.client.roomAll();
    } catch (error) {
      console.error("❌ Error fetching rooms:", error);

      if (error instanceof Error && error.message.includes("401")) {
        throw new Error("Musisz być zalogowany, aby zobaczyć pokoje");
      }

      throw error;
    }
  }

  async createRoom(data: CreateRoomRequest): Promise<RoomDTO> {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Musisz być zalogowany, aby utworzyć pokój");
    }

    const newRoomDto = new NewRoomDto({
      name: data.name,
      description: data.description,
      tournamentId: data.tournamentId,
      maxParticipants: data.maxParticipants,
      entryFee: data.entryFee,
      isPrivate: data.isPrivate,
    });

    try {
      await this.client.createRoom(newRoomDto);

      const rooms = await this.client.roomAll();
      const createdRoom = rooms.find((r) => r.name === data.name);

      if (!createdRoom) {
        throw new Error("Nie można znaleźć utworzonego pokoju");
      }

      return createdRoom;
    } catch (error) {
      console.error("❌ Error creating room:", error);

      if (error instanceof Error) {
        if (error.message.includes("401")) {
          throw new Error("Sesja wygasła. Zaloguj się ponownie");
        }
        if (error.message.includes("400")) {
          throw new Error("Nieprawidłowe dane pokoju");
        }
      }

      throw error;
    }
  }

  async getTournaments(): Promise<TournamentDto[]> {
    try {
      return await this.client.tournament();
    } catch (error) {
      console.error("❌ Error fetching tournaments:", error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!getAuthToken();
  }

  async getMyRooms(): Promise<RoomDTO[]> {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Musisz być zalogowany, aby zobaczyć swoje pokoje");
    }

    try {
      return await this.client.my();
    } catch (error) {
      console.error("❌ Error fetching my rooms:", error);

      if (error instanceof Error && error.message.includes("401")) {
        throw new Error("Sesja wygasła. Zaloguj się ponownie");
      }

      throw error;
    }
  }

  async joinRoom(roomId: number): Promise<{ message: string }> {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Musisz być zalogowany, aby dołączyć do pokoju");
    }

    try {
      await this.client.join(roomId);
      return { message: "Pomyślnie dołączono do pokoju" };
    } catch (error) {
      console.error("❌ Error joining room:", error);

      if (error instanceof Error) {
        if (error.message.includes("401")) {
          throw new Error("Sesja wygasła. Zaloguj się ponownie");
        }
        if (error.message.includes("404")) {
          throw new Error("Pokój nie istnieje");
        }
        if (error.message.includes("400")) {
          throw new Error("Nie można dołączyć do pokoju");
        }
      }

      throw error;
    }
  }

  async leaveRoom(roomId: number): Promise<{ message: string }> {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Musisz być zalogowany, aby opuścić pokój");
    }

    try {
      await this.client.leave(roomId);
      return { message: "Pomyślnie opuszczono pokój" };
    } catch (error) {
      console.error("❌ Error leaving room:", error);

      if (error instanceof Error) {
        if (error.message.includes("401")) {
          throw new Error("Sesja wygasła. Zaloguj się ponownie");
        }
        if (error.message.includes("404")) {
          throw new Error("Pokój nie istnieje");
        }
        if (error.message.includes("400")) {
          throw new Error("Nie można opuścić pokoju");
        }
      }

      throw error;
    }
  }
}

export const roomService = new RoomService();
