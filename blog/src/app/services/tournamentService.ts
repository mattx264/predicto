import { Team } from "../types";
import apiService from "./api.service";

const tournamentService = {
  getTeamsByTournamentId: async (tournamentId: number): Promise<Team[]> => {
    const response = await fetch(
      `${apiService.getBackendUrl()}/api/TeamBlog/tournament/${tournamentId}`
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching teams for tournament ${tournamentId}: ${response.statusText}`
      );
    }
    return response.json();
  },
};

export default tournamentService;
