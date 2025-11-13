import gamesService, { GameFromApi } from "../services/games.service";

export interface Match {
  id: string;
  date: string;
  time: string;
  teamA: string;
  teamALogo: string;
  teamB: string;
  teamBLogo: string;
  league: string;
  status: "Nadchodzący" | "Zakończony" | "LIVE";
  score?: string;
}

const TOURNAMENT_ID_MAP: Record<string, number> = {
  "el-ms-2026": 1,
  "euro-2024": 1,
  "mundial-2022": 1,
};

const TOURNAMENT_NAME_MAP: Record<string, string> = {
  "el-ms-2026": "El. MŚ 2026",
  "euro-2024": "EURO 2024",
  "mundial-2022": "Mundial 2022",
};

function mapGameToMatch(game: GameFromApi, tournamentSlug: string): Match {
  const startDate = new Date(game.startTime);
  const now = new Date();

  let status: Match["status"];
  if (game.finalScore !== null) {
    status = "Zakończony";
  } else if (startDate <= now) {
    const twoHoursAfterStart = new Date(
      startDate.getTime() + 2 * 60 * 60 * 1000
    );
    status = now <= twoHoursAfterStart ? "LIVE" : "Zakończony";
  } else {
    status = "Nadchodzący";
  }

  return {
    id: game.id.toString(),
    date: startDate.toISOString().split("T")[0],
    time: startDate.toTimeString().slice(0, 5),
    teamA: game.teams[0]?.name || "Unknown",
    teamALogo: game.teams[0]?.logoUrl || "/placeholder-team.png",
    teamB: game.teams[1]?.name || "Unknown",
    teamBLogo: game.teams[1]?.logoUrl || "/placeholder-team.png",
    league: TOURNAMENT_NAME_MAP[tournamentSlug] || "Nieznany turniej",
    status,
    score: game.finalScore || undefined,
  };
}

export async function getMatches(tournamentSlug: string): Promise<Match[]> {
  const tournamentId = TOURNAMENT_ID_MAP[tournamentSlug];

  if (!tournamentId) {
    console.error(`Unknown tournament: ${tournamentSlug}`);
    return [];
  }

  try {
    const games = await gamesService.getGamesByTournament(tournamentId);
    const matches = games.map((game) => mapGameToMatch(game, tournamentSlug));

    return matches.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);

      if (a.status === "Nadchodzący" && b.status === "Nadchodzący") {
        return dateA.getTime() - dateB.getTime();
      }

      if (a.status === "Zakończony" && b.status === "Zakończony") {
        return dateB.getTime() - dateA.getTime();
      }

      if (a.status === "Nadchodzący") return -1;
      if (b.status === "Nadchodzący") return 1;

      if (a.status === "LIVE") return -1;
      if (b.status === "LIVE") return 1;

      return 0;
    });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
}

export async function getMatchById(
  tournamentSlug: string,
  matchId: string
): Promise<Match | undefined> {
  const matches = await getMatches(tournamentSlug);
  return matches.find((match) => match.id === matchId);
}
