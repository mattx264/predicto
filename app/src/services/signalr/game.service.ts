import type { GameApiDTO, GameDetailsDTO, Match } from "../../types/types";
import { mapGameApiDtoToMatch } from "../../types/types";
import apiService from "./api.service";

class GameService {
  /**
   * Pobiera wszystkie mecze dla danego turnieju
   */
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

      console.log("🎮 Games from API:", games);
      console.log("📊 Number of games:", games.length);

      // Mapowanie GameApiDTO na Match
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

  /**
   * Pobiera szczegóły pojedynczego meczu
   */
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

  /**
   * Pobiera mecze z predykcjami użytkownika dla danego pokoju
   * TODO: Ten endpoint wymaga implementacji na backendzie
   */
  // async getGamesWithPredictions(
  //   tournamentId: number,
  //   roomId: number,
  //   token: string
  // ): Promise<Match[]> {
  //   try {
  //     // Najpierw pobierz mecze
  //     const matches = await this.getGamesByTournamentId(tournamentId);

  //     // TODO: Pobierz predykcje użytkownika dla danego pokoju
  //     // const predictions = await this.getUserPredictions(roomId, token);

  //     // TODO: Połącz mecze z predykcjami
  //     // return this.mergeMatchesWithPredictions(matches, predictions);

  //     // Na razie zwracamy same mecze
  //     return matches;
  //   } catch (error) {
  //     console.error("Error fetching games with predictions:", error);
  //     throw error;
  //   }
  // }

  /**
   * Pomocnicza funkcja do łączenia meczów z predykcjami
   * TODO: Implementacja po dodaniu endpointa dla predykcji
   */
  // private mergeMatchesWithPredictions(
  //   matches: Match[],
  //   predictions: any[]
  // ): Match[] {
  //   return matches.map((match) => {
  //     const prediction = predictions.find((p) => p.gameId === match.id);

  //     if (prediction) {
  //       return {
  //         ...match,
  //         userPrediction: {
  //           home: prediction.homeScore,
  //           away: prediction.awayScore,
  //           winner: prediction.winner,
  //           joker: prediction.isJoker,
  //         },
  //         points: prediction.points,
  //       };
  //     }

  //     return match;
  //   });
  // }
}

export default new GameService();
