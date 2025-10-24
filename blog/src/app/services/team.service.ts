import blogApiService from "./api.service";

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
    const baseUrl = blogApiService.getBackendUrl();
    const response = await fetch(
      `${baseUrl}/api/TeamBlog/tournament/${tournamentId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch teams: ${response.statusText}`);
    }

    return response.json();
  },
};

export default teamService;
