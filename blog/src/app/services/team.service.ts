import apiService from "./api.service";

export interface TeamFromApi {
  id: number;
  slug: string;
  name: string;
  type: number;
  footballApiId: number;
  imageUrl: string;
  code: string | null;
  isActive: boolean;
}

export interface PlayerBasicFromApi {
  id: number;
  name: string;
  position: string;
  imageUrl: string | null;
  shirtNumber: number | null;
}

export interface TeamDetailFromApi {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  coach: string;
  players: PlayerBasicFromApi[];
  formLastGames: string;
}

const teamService = {
  getTeamsByTournament: async (
    tournamentId: number
  ): Promise<TeamFromApi[]> => {
    const baseUrl = apiService.getBackendUrl();
    const response = await fetch(
      `${baseUrl}/api/TeamBlog/tournament/${tournamentId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch teams: ${response.statusText}`);
    }

    return response.json();
  },

  getTeamById: async (teamId: number): Promise<TeamDetailFromApi> => {
    const baseUrl = apiService.getBackendUrl();
    const response = await fetch(`${baseUrl}/api/TeamBlog/get-by-id/${teamId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch team: ${response.statusText}`);
    }

    return response.json();
  },
};

export default teamService;
