import { Client, RoomGameBetDto } from "../nsawg/client";
import type { GameApiDTO, GameDetailsDTO, Match } from "../../types/types";
import { mapGameApiDtoToMatch } from "../../types/types";
import apiService from "./api.service";

class AuthenticatedHttpClient {
  async fetch(url: RequestInfo, init?: RequestInit): Promise<Response> {
    const token = localStorage.getItem("authToken");
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

class GameService {
  private client: Client;

  constructor() {
    this.client = new Client(apiService.getBackendUrl(), new AuthenticatedHttpClient());
  }

  async getGamesByTournamentId(tournamentId: number): Promise<Match[]> {
    try {
      const response = await fetch(
        `${apiService.getBackendUrl()}/api/GameBlog/tournament/${tournamentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch games: ${response.statusText}`);
      }

      const games: GameApiDTO[] = await response.json();
      return games
        .map(mapGameApiDtoToMatch)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    } catch (error) {
      console.error("Error fetching games:", error);
      throw error;
    }
  }

  async getGameDetails(gameId: number): Promise<GameDetailsDTO> {
    try {
      const response = await fetch(
        `${apiService.getBackendUrl()}/api/GameBlog/details/${gameId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch game details: ${response.statusText}`);
      }

      const gameDetails: GameDetailsDTO = await response.json();
      return gameDetails;
    } catch (error) {
      console.error("Error fetching game details:", error);
      throw error;
    }
  }


  async betGame(betData: RoomGameBetDto): Promise<void> {
    try {
      await this.client.roomGame(betData);
    } catch (error) {
      console.error("Error placing bet:", error);

      if (error instanceof Error && error.message.includes("401")) {
        throw new Error("Unauthorized - musisz być zalogowany");
      }

      throw new Error("Failed to bet on game");
    }
  }
}

export default new GameService();