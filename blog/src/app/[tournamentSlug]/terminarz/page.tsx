"use client";

import { Calendar, Trophy, Clock } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import "./page.css";
import { useEffect, useState } from "react";
import { TOURNAMENTS } from "@/app/lib/tournaments";
import Image from "next/image";

type Match = {
  id: string;
  teamA: string;
  teamB: string;
  teamALogo: string;
  teamBLogo: string;
  score?: string;
  time?: string;
  status: "LIVE" | "Zakończony" | "Zaplanowany";
  league: string;
  date: string;
};

const MatchCard = ({
  match,
  tournamentSlug,
}: {
  match: Match;
  tournamentSlug: string;
}) => {
  const router = useRouter();

  const getStatusClass = (status: Match["status"]) => {
    switch (status) {
      case "LIVE":
        return "status-live";
      case "Zakończony":
        return "status-finished";
      default:
        return "status-upcoming";
    }
  };

  const handleMatchClick = () => {
    router.push(`/${tournamentSlug}/terminarz/${match.id}`);
  };

  return (
    <div className="match-card" onClick={handleMatchClick}>
      <div className="match-card-inner">
        <div
          className="team-section team-home"
          style={
            { "--team-flag": `url(${match.teamALogo})` } as React.CSSProperties
          }
        >
          <div className="team-content">
            <span className="team-name">{match.teamA}</span>
            <div className="team-logo-wrapper">
              <Image
                src={match.teamALogo}
                alt={`${match.teamA} logo`}
                className="team-logo"
                width={64}
                height={64}
              />
            </div>
          </div>
        </div>

        <div className="match-center">
          <div className="match-time-wrapper">
            {match.status === "Zakończony" ? (
              <div className="match-score">
                <span className="score-display">{match.score}</span>
              </div>
            ) : match.status === "LIVE" ? (
              <div className="match-live">
                <span className="live-indicator"></span>
                <span className="live-text">NA ŻYWO</span>
              </div>
            ) : (
              <div className="match-time">
                <Clock size={16} />
                <span>{match.time}</span>
              </div>
            )}
          </div>
          <div className={`match-status ${getStatusClass(match.status)}`}>
            {match.status}
          </div>
        </div>

        <div
          className="team-section team-away"
          style={
            { "--team-flag": `url(${match.teamBLogo})` } as React.CSSProperties
          }
        >
          <div className="team-content">
            <div className="team-logo-wrapper">
              <Image
                src={match.teamBLogo}
                alt={`${match.teamB} logo`}
                className="team-logo"
                width={64}
                height={64}
              />
            </div>
            <span className="team-name">{match.teamB}</span>
          </div>
        </div>
      </div>

      <div className="league-badge">
        <Trophy size={12} />

        <span>{match.league}</span>
      </div>
    </div>
  );
};

const allDemoMatches: Match[] = [
  {
    id: "1",
    teamA: "Polska",
    teamB: "Niemcy",
    teamALogo: "https://flagcdn.com/w320/pl.png",
    teamBLogo: "https://flagcdn.com/w320/de.png",
    score: "2 - 1",
    status: "Zakończony",
    league: "el-ms-2026",
    date: "2025-10-16",
  },
  {
    id: "2",
    teamA: "Szkocja",
    teamB: "Węgry",
    teamALogo: "https://flagcdn.com/w320/gb-sct.png",
    teamBLogo: "https://flagcdn.com/w320/hu.png",
    status: "LIVE",
    league: "euro-2024",
    date: "2025-10-16",
  },
  {
    id: "3",
    teamA: "Włochy",
    teamB: "Anglia",
    teamALogo: "https://flagcdn.com/w320/it.png",
    teamBLogo: "https://flagcdn.com/w320/gb-eng.png",
    time: "20:45",
    status: "Zaplanowany",
    league: "el-ms-2026",
    date: "2025-10-16",
  },
  {
    id: "4",
    teamA: "Argentyna",
    teamB: "Francja",
    teamALogo: "https://flagcdn.com/w320/ar.png",
    teamBLogo: "https://flagcdn.com/w320/fr.png",
    score: "3 - 3 (4-2 p.)",
    status: "Zakończony",
    league: "mundial-2022",
    date: "2022-12-18",
  },
  {
    id: "5",
    teamA: "Hiszpania",
    teamB: "Chorwacja",
    teamALogo: "https://flagcdn.com/w320/es.png",
    teamBLogo: "https://flagcdn.com/w320/hr.png",
    time: "18:00",
    status: "Zaplanowany",
    league: "euro-2024",
    date: "2025-10-17",
  },
];

async function getMatchesForTournament(slug: string): Promise<Match[]> {
  console.log("Pobieranie meczy dla turnieju:", slug);

  const matches = allDemoMatches.filter((match) => match.league === slug);

  return new Promise((resolve) => setTimeout(() => resolve(matches), 300));
}

export default function SchedulePage() {
  const params = useParams();
  const tournamentSlug = params.tournamentSlug as string;

  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const tournament = TOURNAMENTS.find((t) => t.slug === tournamentSlug);
  const tournamentName = tournament ? tournament.name : "Turniej";

  useEffect(() => {
    if (tournamentSlug) {
      setLoading(true);
      getMatchesForTournament(tournamentSlug).then((data) => {
        setMatches(data);
        setLoading(false);
      });
    }
  }, [tournamentSlug]);

  return (
    <div className="schedule-page-container">
      <header className="schedule-page-header">
        <div className="header-icon">
          <Calendar size={48} />
        </div>
        <h1>Terminarz: {tournamentName}</h1>
        <p>Nadchodzące i zakończone spotkania dla wybranego turnieju.</p>
      </header>

      <main className="schedule-main">
        <section className="date-group">
          <div className="date-header">
            <Calendar size={20} />
            <span>Wszystkie mecze</span>
            <div className="date-line"></div>
          </div>
          <div className="matches-list">
            {loading ? (
              <p
                style={{ textAlign: "center", color: "white", padding: "2rem" }}
              >
                Ładowanie meczy...
              </p>
            ) : matches.length > 0 ? (
              matches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  tournamentSlug={tournamentSlug}
                />
              ))
            ) : (
              <p
                style={{ textAlign: "center", color: "white", padding: "2rem" }}
              >
                Brak zaplanowanych meczy dla tego turnieju.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
