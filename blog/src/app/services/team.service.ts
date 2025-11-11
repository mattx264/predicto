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

const teamService = {
  getTeamsByTournament: async (
    tournamentId: number
  ): Promise<TeamFromApi[]> => {
    const baseUrl = apiService.getBackendUrl();
    console.log("🔗 Connecting to:", baseUrl);
    const response = await fetch(
      `${baseUrl}/api/TeamBlog/tournament/${tournamentId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch teams: ${response.statusText}`);
    }

    return response.json();
  },

  getAllTeams: async (): Promise<TeamFromApi[]> => {
    const baseUrl = apiService.getBackendUrl();
    const response = await fetch(`${baseUrl}/api/TeamBlog/all-teams`);

    if (!response.ok) {
      throw new Error(`Failed to fetch all teams: ${response.statusText}`);
    }

    return response.json();
  },

  getTeamById: async (teamId: number): Promise<TeamFromApi> => {
    const baseUrl = apiService.getBackendUrl();
    const response = await fetch(`${baseUrl}/api/TeamBlog/by-team/${teamId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch team: ${response.statusText}`);
    }

    return response.json();
  },
};

export default teamService;
