"use client";

import { Calendar, Trophy, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import "./page.css";

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

const MatchCard = ({ match }: { match: Match }) => {
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
    router.push(`/terminarz/${match.id}`);
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
              <img
                src={match.teamALogo}
                alt={`${match.teamA} logo`}
                className="team-logo"
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
              <img
                src={match.teamBLogo}
                alt={`${match.teamB} logo`}
                className="team-logo"
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

const demoMatches: Match[] = [
  {
    id: "1",
    teamA: "Polska",
    teamB: "Niemcy",
    teamALogo: "https://flagcdn.com/w320/pl.png",
    teamBLogo: "https://flagcdn.com/w320/de.png",
    score: "2 - 1",
    status: "Zakończony",
    league: "Eliminacje ME",
    date: "2025-10-16",
  },
  {
    id: "2",
    teamA: "Hiszpania",
    teamB: "Francja",
    teamALogo: "https://flagcdn.com/w320/es.png",
    teamBLogo: "https://flagcdn.com/w320/fr.png",
    status: "LIVE",
    league: "Liga Narodów",
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
    league: "Towarzyski",
    date: "2025-10-16",
  },
];

export default function SchedulePage() {
  return (
    <div className="schedule-page-container">
      <header className="schedule-page-header">
        <div className="header-icon">
          <Calendar size={48} />
        </div>
        <h1>Terminarz Meczów</h1>
        <p>Nadchodzące i zakończone spotkania z najważniejszych lig</p>
      </header>

      <main className="schedule-main">
        <section className="date-group">
          <div className="date-header">
            <Calendar size={20} />
            <span>czwartek, 16 października 2025</span>
            <div className="date-line"></div>
          </div>
          <div className="matches-list">
            {demoMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
