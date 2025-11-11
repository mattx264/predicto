import apiService from "./api.service";

export interface PlayerFromApi {
  id: number;
  name: string;
  age: number;
  position: string;
  teamName: string;
  slug: string;
  firstName: string;
  lastName: string;
  birthday: string;
  birthPlace: string;
  birthCountry: string;
  nationality: string;
  height: number;
  weight: number;
  shirtNumber: number;
  photoUrl: string;
  marketValue: number;
  bio: string;
}

const playerService = {
  getPlayerById: async (playerId: number): Promise<PlayerFromApi> => {
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
