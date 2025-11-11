import playerService, { PlayerFromApi } from "../services/playerService";
import teamService, { TeamFromApi } from "../services/team.service";

export interface Player {
  id: string;
  slug: string;
  name: string;
  firstName: string;
  lastName: string;
  position: "Bramkarz" | "Obrońca" | "Pomocnik" | "Napastnik";
  number: number;
  age: number;
  club: string;
  image: string;
  dateOfBirth: string;
  birthPlace: string | null;
  birthCountry: string | null;
  nationality: string;
  height: string;
  weight: number | null;
  marketValue: string;
  bio: string;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  flag: string;
  imageUrl: string;
  description: string;
  coach: string;
  keyPlayer: string;
  recentForm: ("W" | "D" | "L")[];
  squad: Player[];
}

const TOURNAMENT_ID_MAP: Record<string, number> = {
  "el-ms-2026": 1,
  "euro-2024": 1,
  "mundial-2022": 1,
};

const COUNTRY_FLAG_MAP: Record<string, string> = {
  Albania: "AL",
  Andorra: "AD",
  Armenia: "AM",
  Austria: "AT",
  Azerbaijan: "AZ",
  Belarus: "BY",
  Belgium: "BE",
  "Bosnia & Herzegovina": "BA",
  Bulgaria: "BG",
  Croatia: "HR",
  Cyprus: "CY",
  "Czech Republic": "CZ",
  Denmark: "DK",
  England: "GB-ENG",
  Estonia: "EE",
  "Faroe Islands": "FO",
  Finland: "FI",
  France: "FR",
  "FYR Macedonia": "MK",
  Georgia: "GE",
  Germany: "DE",
  Gibraltar: "GI",
  Greece: "GR",
  Hungary: "HU",
  Iceland: "IS",
  Israel: "IL",
  Italy: "IT",
  Kazakhstan: "KZ",
  Kosovo: "XK",
  Latvia: "LV",
  Liechtenstein: "LI",
  Lithuania: "LT",
  Luxembourg: "LU",
  Malta: "MT",
  Moldova: "MD",
  Montenegro: "ME",
  Netherlands: "NL",
  "Northern Ireland": "GB-NIR",
  Norway: "NO",
  Poland: "PL",
  Portugal: "PT",
  "Rep. Of Ireland": "IE",
  Romania: "RO",
  Russia: "RU",
  "San Marino": "SM",
  Scotland: "GB-SCT",
  Serbia: "RS",
  Slovakia: "SK",
  Slovenia: "SI",
  Spain: "ES",
  Sweden: "SE",
  Switzerland: "CH",
  Türkiye: "TR",
  Ukraine: "UA",
  Wales: "GB-WLS",
};

function mapTeamFromApi(apiTeam: TeamFromApi): Team {
  return {
    id: apiTeam.id.toString(),
    slug: apiTeam.slug,
    name: apiTeam.name,
    flag: COUNTRY_FLAG_MAP[apiTeam.name] || "UN",
    imageUrl: apiTeam.imageUrl,
    description: "",
    coach: "",
    keyPlayer: "",
    recentForm: [],
    squad: [],
  };
}

function mapPlayerFromApi(apiPlayer: PlayerFromApi): Player {
  return {
    id: apiPlayer.id.toString(),
    slug: apiPlayer.slug,
    name: apiPlayer.name,
    firstName: apiPlayer.firstName,
    lastName: apiPlayer.lastName,
    position: mapPosition(apiPlayer.position),
    number: apiPlayer.shirtNumber,
    age: apiPlayer.age,
    club: apiPlayer.teamName,
    image: apiPlayer.photoUrl || "/placeholder-player.png",
    dateOfBirth: formatDate(apiPlayer.birthday),
    birthPlace: apiPlayer.birthPlace,
    birthCountry: apiPlayer.birthCountry,
    nationality: apiPlayer.nationality,
    height: apiPlayer.height ? `${apiPlayer.height} cm` : "Brak danych",
    weight: apiPlayer.weight,
    marketValue: formatMarketValue(apiPlayer.marketValue),
    bio: apiPlayer.bio || "Brak informacji biograficznych.",
  };
}

function mapPosition(position: string): Player["position"] {
  const positionMap: Record<string, Player["position"]> = {
    Goalkeeper: "Bramkarz",
    Defender: "Obrońca",
    Midfielder: "Pomocnik",
    Forward: "Napastnik",
    GK: "Bramkarz",
    DEF: "Obrońca",
    MID: "Pomocnik",
    FWD: "Napastnik",
  };

  return positionMap[position] || "Pomocnik";
}

function formatDate(dateString: string): string {
  if (!dateString) return "Brak danych";

  const date = new Date(dateString);
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatMarketValue(value: number): string {
  if (!value || value === 0) return "Brak danych";

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M €`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K €`;
  }

  return `${value} €`;
}

function extractIdFromSlug(slug: string): number | null {
  const match = slug.match(/-(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}

export async function getTeams(tournamentSlug: string): Promise<Team[]> {
  const tournamentId = TOURNAMENT_ID_MAP[tournamentSlug];

  if (!tournamentId) {
    console.error(`Unknown tournament: ${tournamentSlug}`);
    return [];
  }

  try {
    const apiTeams = await teamService.getTeamsByTournament(tournamentId);
    return apiTeams.map(mapTeamFromApi);
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
}

export async function getTeamBySlug(
  tournamentSlug: string,
  slug: string
): Promise<Team | undefined> {
  const teams = await getTeams(tournamentSlug);
  return teams.find((team) => team.slug === slug);
}

export async function getPlayerBySlug(
  tournamentSlug: string,
  teamSlug: string,
  playerSlug: string
): Promise<Player | undefined> {
  try {
    const playerId = extractIdFromSlug(playerSlug);

    if (!playerId) {
      console.error(`Cannot extract player ID from slug: ${playerSlug}`);
      return undefined;
    }

    const apiPlayer = await playerService.getPlayerById(playerId);

    return mapPlayerFromApi(apiPlayer);
  } catch (error) {
    console.error("Error fetching player:", error);
    return undefined;
  }
}
