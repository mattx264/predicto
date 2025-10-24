import { Player } from "../types";
import apiService from "./api.service";

const playerService = {
  getPlayerById: async (playerId: number): Promise<Player> => {
    const response = await fetch(
      `${apiService.getBackendUrl()}/api/PlayerBlog/by-id/${playerId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Player with id ${playerId} not found`);
      }
      throw new Error(
        `Error fetching player ${playerId}: ${response.statusText}`
      );
    }
    return response.json();
  },
};

export default playerService;
