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

const scheduleData: Match[] = [
  {
    id: "match1",
    date: "2025-10-17",
    time: "20:45",
    teamA: "Polska",
    teamALogo: "https://placehold.co/40x40/FFFFFF/000000/png?text=POL",
    teamB: "Holandia",
    teamBLogo: "https://placehold.co/40x40/FFFFFF/000000/png?text=HOL",
    league: "El. MŚ 2026",
    status: "Nadchodzący",
  },
  {
    id: "match2",
    date: "2025-10-18",
    time: "18:00",
    teamA: "Real Madryt",
    teamALogo: "https://placehold.co/40x40/FFFFFF/000000/png?text=RMA",
    teamB: "FC Barcelona",
    teamBLogo: "https://placehold.co/40x40/FFFFFF/000000/png?text=FCB",
    league: "LaLiga",
    status: "Nadchodzący",
  },
  {
    id: "match3",
    date: "2025-10-18",
    time: "21:00",
    teamA: "Manchester City",
    teamALogo: "https://placehold.co/40x40/FFFFFF/000000/png?text=MCI",
    teamB: "Liverpool FC",
    teamBLogo: "https://placehold.co/40x40/FFFFFF/000000/png?text=LIV",
    league: "Premier League",
    status: "Nadchodzący",
  },
  {
    id: "match4",
    date: "2025-10-19",
    time: "15:00",
    teamA: "Bayern Monachium",
    teamALogo: "https://placehold.co/40x40/FFFFFF/000000/png?text=BAY",
    teamB: "Borussia Dortmund",
    teamBLogo: "https://placehold.co/40x40/FFFFFF/000000/png?text=BVB",
    league: "Bundesliga",
    status: "Nadchodzący",
  },
];

export async function getMatches(): Promise<Match[]> {
  return scheduleData.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });
}
