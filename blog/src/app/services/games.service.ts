import apiService from "./api.service";

export interface TeamBasicInfo {
  id: number;
  name: string;
  logoUrl: string;
}

export interface GameFromApi {
  id: number;
  startTime: string;
  teams: TeamBasicInfo[];
  finalScore: string | null;
}

export interface PlayerInGame {
  id: number;
  name: string;
  position: string;
  imageUrl: string | null;
  shirtNumber: number | null;
}

export interface TeamDetailInGame {
  id: number;
  name: string;
  logoUrl: string;
  tactic: string | null;
  players: PlayerInGame[];
  coach: string | null;
  formLastGames: string | null;
}

export interface HeadToHeadMatch {
  gameId: number;
  gameDate: string;
  finalScore: string | null;
  teamId1: number;
  teamId2: number;
  teamName1: string;
  teamName2: string;
}

export interface GameDetailFromApi {
  id: number;
  startTime: string;
  teams: TeamDetailInGame[];
  finalScore: string | null;
  tournamentId: number;
  referee: string | null;
  headToHead: HeadToHeadMatch[];
}

const gamesService = {
  getGamesByTournament: async (
    tournamentId: number
  ): Promise<GameFromApi[]> => {
    const baseUrl = apiService.getBackendUrl();
    const response = await fetch(
      `${baseUrl}/api/GameBlog/tournament/${tournamentId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`);
    }

    return response.json();
  },

  getGameDetails: async (gameId: number): Promise<GameDetailFromApi> => {
    const baseUrl = apiService.getBackendUrl();
    const response = await fetch(`${baseUrl}/api/GameBlog/details/${gameId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch game details: ${response.statusText}`);
    }

    return response.json();
  },
};

export default gamesService;
