import { Calendar } from "lucide-react";
import "./page.css";
import { getMatches, Match } from "../lib/schedule";
import Image from "next/image";

const MatchCard = ({ match }: { match: Match }) => {
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

  return (
    <div className="match-card">
      <div className="team-info team-a">
        <span className="team-name">{match.teamA}</span>
        <Image
          src={match.teamALogo}
          alt={`${match.teamA} logo`}
          className="team-logo"
        />
      </div>
      <div className="match-details">
        {match.status === "Zakończony" ? (
          <span className="match-score">{match.score}</span>
        ) : (
          <span className="match-time">{match.time}</span>
        )}
        <div className={`match-status ${getStatusClass(match.status)}`}>
          {match.status}
        </div>
      </div>
      <div className="team-info team-b">
        <Image
          src={match.teamBLogo}
          alt={`${match.teamB} logo`}
          className="team-logo"
        />
        <span className="team-name">{match.teamB}</span>
      </div>
      <div className="league-badge">{match.league}</div>
    </div>
  );
};

export default async function SchedulePage() {
  const matches = await getMatches();

  const groupedMatches = matches.reduce((acc, match) => {
    const date = new Date(match.date).toLocaleDateString("pl-PL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  return (
    <div className="schedule-page-container">
      <header className="schedule-page-header">
        <h1>Terminarz Meczów</h1>
        <p>Nadchodzące i zakończone spotkania z najważniejszych lig.</p>
      </header>
      <main className="schedule-main">
        {Object.entries(groupedMatches).map(([date, matchesOnDate]) => (
          <section key={date} className="date-group">
            <h2 className="date-header">
              <Calendar size={20} />
              <span>{date}</span>
            </h2>
            <div className="matches-list">
              {matchesOnDate.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
