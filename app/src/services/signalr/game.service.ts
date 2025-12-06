import type {
  GameApiDTO,
  GameDetailsDTO,
  Match,
  RoomGameBetDto,
} from "../../types/types";
import { mapGameApiDtoToMatch } from "../../types/types";
import apiService from "./api.service";

class GameService {
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

  async betGame(betData: RoomGameBetDto, token: string): Promise<void> {
    try {
      const response = await fetch(
        `${apiService.getBackendUrl()}/api/RoomGame`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(betData),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized - musisz być zalogowany");
        }
        throw new Error(`Failed to bet on game: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error placing bet:", error);
      throw error;
    }
  }
}

export default new GameService();
