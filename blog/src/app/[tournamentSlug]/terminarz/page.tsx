"use client";

import { Calendar, Trophy, Clock } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import "./page.css";
import { useEffect, useState } from "react";
import { TOURNAMENTS } from "@/app/lib/tournaments";
import Image from "next/image";
import { getMatches, Match } from "@/app/lib/schedule";

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

// Grupowanie meczy po datach
function groupMatchesByDate(matches: Match[]): Map<string, Match[]> {
  const grouped = new Map<string, Match[]>();

  matches.forEach((match) => {
    const dateKey = match.date;
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }
    grouped.get(dateKey)!.push(match);
  });

  return grouped;
}

// Formatowanie daty po polsku
function formatPolishDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Sprawdź czy to dzisiaj lub jutro
  if (date.toDateString() === today.toDateString()) {
    return "Dzisiaj";
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return "Jutro";
  }

  // Formatuj datę po polsku
  return date.toLocaleDateString("pl-PL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function SchedulePage() {
  const params = useParams();
  const tournamentSlug = params.tournamentSlug as string;

  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tournament = TOURNAMENTS.find((t) => t.slug === tournamentSlug);
  const tournamentName = tournament ? tournament.name : "Turniej";

  useEffect(() => {
    if (tournamentSlug) {
      setLoading(true);
      setError(null);

      getMatches(tournamentSlug)
        .then((data) => {
          setMatches(data);
        })
        .catch((err) => {
          console.error("Error loading matches:", err);
          setError("Nie udało się załadować meczów");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [tournamentSlug]);

  const groupedMatches = groupMatchesByDate(matches);
  const sortedDates = Array.from(groupedMatches.keys()).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    const now = new Date();

    const aIsFuture = dateA >= now;
    const bIsFuture = dateB >= now;

    if (aIsFuture && !bIsFuture) return -1;
    if (!aIsFuture && bIsFuture) return 1;

    if (aIsFuture && bIsFuture) {
      return dateA.getTime() - dateB.getTime();
    }

    return dateB.getTime() - dateA.getTime();
  });
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
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Ładowanie meczy...</p>
          </div>
        ) : error ? (
          <p style={{ textAlign: "center", color: "#ef4444", padding: "2rem" }}>
            {error}
          </p>
        ) : matches.length > 0 ? (
          sortedDates.map((date) => {
            const matchesForDate = groupedMatches.get(date) || [];
            return (
              <section key={date} className="date-group">
                <div className="date-header">
                  <Calendar size={20} />
                  <span>{formatPolishDate(date)}</span>
                  <div className="date-line"></div>
                </div>
                <div className="matches-list">
                  {matchesForDate.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      tournamentSlug={tournamentSlug}
                    />
                  ))}
                </div>
              </section>
            );
          })
        ) : (
          <p style={{ textAlign: "center", color: "white", padding: "2rem" }}>
            Brak zaplanowanych meczy dla tego turnieju.
          </p>
        )}
      </main>
    </div>
  );
}
