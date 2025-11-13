import gamesService, { GameDetailFromApi } from "../services/games.service";

export interface MatchDetail {
  id: string;
  date: string;
  time: string;
  teamA: {
    id: string;
    name: string;
    logo: string;
    tactic: string;
    coach: string;
    form: ("W" | "D" | "L")[];
    players: MatchPlayer[];
  };
  teamB: {
    id: string;
    name: string;
    logo: string;
    tactic: string;
    coach: string;
    form: ("W" | "D" | "L")[];
    players: MatchPlayer[];
  };
  score: string | null;
  status: "Nadchodzący" | "Zakończony" | "LIVE";
  referee: string;
  headToHead: HeadToHeadResult[];
}

export interface MatchPlayer {
  id: string;
  name: string;
  position: string;
  image: string;
  shirtNumber: number | null;
}

export interface HeadToHeadResult {
  id: string;
  date: string;
  teamA: string;
  teamB: string;
  score: string | null;
}

function parseFormString(formString: string | null): ("W" | "D" | "L")[] {
  if (!formString) return [];

  return formString.split("").map((char) => {
    if (char === "W" || char === "D" || char === "L") {
      return char;
    }
    return "D";
  });
}

function mapGameDetailToMatchDetail(apiGame: GameDetailFromApi): MatchDetail {
  const startDate = new Date(apiGame.startTime);
  const now = new Date();

  let status: MatchDetail["status"];
  if (apiGame.finalScore !== null) {
    status = "Zakończony";
  } else if (startDate <= now) {
    const twoHoursAfterStart = new Date(
      startDate.getTime() + 2 * 60 * 60 * 1000
    );
    status = now <= twoHoursAfterStart ? "LIVE" : "Zakończony";
  } else {
    status = "Nadchodzący";
  }

  const teamA = apiGame.teams[0];
  const teamB = apiGame.teams[1];

  return {
    id: apiGame.id.toString(),
    date: startDate.toISOString().split("T")[0],
    time: startDate.toTimeString().slice(0, 5),
    teamA: {
      id: teamA.id.toString(),
      name: teamA.name,
      logo: teamA.logoUrl,
      tactic: teamA.tactic || "Brak danych",
      coach: teamA.coach || "Brak danych",
      form: parseFormString(teamA.formLastGames),
      players: teamA.players.map((p) => ({
        id: p.id.toString(),
        name: p.name,
        position: p.position,
        image:
          p.imageUrl ||
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        shirtNumber: p.shirtNumber,
      })),
    },
    teamB: {
      id: teamB.id.toString(),
      name: teamB.name,
      logo: teamB.logoUrl,
      tactic: teamB.tactic || "Brak danych",
      coach: teamB.coach || "Brak danych",
      form: parseFormString(teamB.formLastGames),
      players: teamB.players.map((p) => ({
        id: p.id.toString(),
        name: p.name,
        position: p.position,
        image:
          p.imageUrl ||
          "https://via.placeholder.com/256/1e293b/60a5fa.png?text=No+Image",
        shirtNumber: p.shirtNumber,
      })),
    },
    score: apiGame.finalScore,
    status,
    referee: apiGame.referee || "Brak danych",
    headToHead: apiGame.headToHead.map((h) => ({
      id: h.gameId.toString(),
      date: new Date(h.gameDate).toLocaleDateString("pl-PL"),
      teamA: h.teamName1,
      teamB: h.teamName2,
      score: h.finalScore,
    })),
  };
}

export async function getMatchDetails(
  matchId: string
): Promise<MatchDetail | undefined> {
  try {
    const gameId = parseInt(matchId, 10);
    if (isNaN(gameId)) {
      console.error(`Invalid match ID: ${matchId}`);
      return undefined;
    }

    const apiGame = await gamesService.getGameDetails(gameId);
    return mapGameDetailToMatchDetail(apiGame);
  } catch (error) {
    console.error("Error fetching match details:", error);
    return undefined;
  }
}
