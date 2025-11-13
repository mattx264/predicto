"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Users, TrendingUp, History, Calendar } from "lucide-react";
import "./page.css";
import Image from "next/image";
import {
  getMatchDetails,
  MatchDetail,
  MatchPlayer,
} from "@/app/lib/matchDetails";

const MatchDetailsPage = () => {
  const [activeTab, setActiveTab] = useState<"lineups" | "h2h" | "stats">(
    "lineups"
  );
  const [match, setMatch] = useState<MatchDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const tournamentSlug = params.tournamentSlug as string;
  const matchId = params.matchId as string;

  useEffect(() => {
    if (matchId) {
      setLoading(true);
      setError(null);

      getMatchDetails(matchId)
        .then((data) => {
          if (data) {
            setMatch(data);
          } else {
            setError("Nie znaleziono meczu");
          }
        })
        .catch((err) => {
          console.error("Error loading match:", err);
          setError("Nie udało się załadować szczegółów meczu");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [matchId]);

  const handleBack = () => {
    if (tournamentSlug) {
      router.push(`/${tournamentSlug}/terminarz`);
    } else {
      router.push("/terminarz");
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pl-PL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getFormIcon = (result: "W" | "D" | "L") => {
    if (result === "W") return <div className="form-badge win">W</div>;
    if (result === "D") return <div className="form-badge draw">D</div>;
    return <div className="form-badge loss">L</div>;
  };

  const groupPlayersByPosition = (players: MatchPlayer[]) => {
    const positions = {
      Goalkeeper: [] as MatchPlayer[],
      Defender: [] as MatchPlayer[],
      Midfielder: [] as MatchPlayer[],
      Forward: [] as MatchPlayer[],
      Attacker: [] as MatchPlayer[],
    };

    players.forEach((player) => {
      const pos = player.position as keyof typeof positions;
      if (positions[pos]) {
        positions[pos].push(player);
      } else {
        // Fallback dla nieznanych pozycji
        positions.Midfielder.push(player);
      }
    });

    return positions;
  };

  const renderLineups = () => {
    if (!match) return null;

    const teamAGrouped = groupPlayersByPosition(match.teamA.players);
    const teamBGrouped = groupPlayersByPosition(match.teamB.players);

    return (
      <div className="lineups-container">
        <div className="team-lineup">
          <div className="lineup-header">
            <Image
              src={match.teamA.logo}
              alt={match.teamA.name}
              className="lineup-team-flag"
              width={64}
              height={64}
            />
            <div>
              <h3>{match.teamA.name}</h3>
              <p className="coach-name">Trener: {match.teamA.coach}</p>
            </div>
          </div>

          <div className="formation-label">Formacja: {match.teamA.tactic}</div>

          <div className="match-players-list">
            {match.teamA.players.map((player) => (
              <div key={player.id} className="match-player-card">
                <div className="match-player-number">
                  {player.shirtNumber || "-"}
                </div>
                <Image
                  src={player.image}
                  alt={player.name}
                  className="match-player-avatar"
                  width={48}
                  height={48}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                  }}
                />
                <div className="match-player-info">
                  <div className="match-player-name">{player.name}</div>
                  <div className="match-player-position">{player.position}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lineup-divider"></div>

        <div className="team-lineup">
          <div className="lineup-header">
            <Image
              src={match.teamB.logo}
              alt={match.teamB.name}
              className="lineup-team-flag"
              width={64}
              height={64}
            />
            <div>
              <h3>{match.teamB.name}</h3>
              <p className="coach-name">Trener: {match.teamB.coach}</p>
            </div>
          </div>

          <div className="formation-label">Formacja: {match.teamB.tactic}</div>

          <div className="match-players-list">
            {match.teamB.players.map((player) => (
              <div key={player.id} className="match-player-card">
                <div className="match-player-number">
                  {player.shirtNumber || "-"}
                </div>
                <Image
                  src={player.image}
                  alt={player.name}
                  className="match-player-avatar"
                  width={48}
                  height={48}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                  }}
                />
                <div className="match-player-info">
                  <div className="match-player-name">{player.name}</div>
                  <div className="match-player-position">{player.position}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderHeadToHead = () => {
    if (!match) return null;

    const stats = match.headToHead.reduce(
      (acc, h2h) => {
        if (h2h.score) {
          const [scoreA, scoreB] = h2h.score.split("-").map(Number);
          if (h2h.teamA === match.teamA.name) {
            if (scoreA > scoreB) acc.teamAWins++;
            else if (scoreA < scoreB) acc.teamBWins++;
            else acc.draws++;
          } else {
            if (scoreB > scoreA) acc.teamAWins++;
            else if (scoreB < scoreA) acc.teamBWins++;
            else acc.draws++;
          }
        }
        return acc;
      },
      { teamAWins: 0, draws: 0, teamBWins: 0 }
    );

    return (
      <div className="h2h-container">
        <div className="h2h-summary">
          <div className="h2h-stat">
            <div className="h2h-stat-value">{stats.teamAWins}</div>
            <div className="h2h-stat-label">Zwycięstwa {match.teamA.name}</div>
          </div>
          <div className="h2h-stat">
            <div className="h2h-stat-value">{stats.draws}</div>
            <div className="h2h-stat-label">Remisy</div>
          </div>
          <div className="h2h-stat">
            <div className="h2h-stat-value">{stats.teamBWins}</div>
            <div className="h2h-stat-label">Zwycięstwa {match.teamB.name}</div>
          </div>
        </div>

        {match.headToHead.length > 0 && (
          <div className="h2h-matches">
            <h3 className="h2h-title">
              <History size={20} />
              Ostatnie {Math.min(5, match.headToHead.length)} spotkań
            </h3>
            {match.headToHead.slice(0, 5).map((h2hMatch) => (
              <div key={h2hMatch.id} className="h2h-match-card">
                <div className="h2h-date">{h2hMatch.date}</div>
                <div className="h2h-teams">
                  <span className="h2h-team">{h2hMatch.teamA}</span>
                  <span className="h2h-score">{h2hMatch.score || "vs"}</span>
                  <span className="h2h-team">{h2hMatch.teamB}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderStats = () => {
    if (!match) return null;

    return (
      <div className="stats-container">
        <div className="stats-section">
          <h3 className="stats-title">
            <TrendingUp size={20} />
            Ostatnia forma
          </h3>

          <div className="form-comparison">
            {match.teamA.form.length > 0 && (
              <div className="team-form">
                <div className="form-team-header">
                  <Image
                    src={match.teamA.logo}
                    alt={match.teamA.name}
                    className="form-flag"
                    width={36}
                    height={27}
                  />
                  <span>{match.teamA.name}</span>
                </div>
                <div className="form-badges">
                  {match.teamA.form.map((result, i) => (
                    <div key={i}>{getFormIcon(result)}</div>
                  ))}
                </div>
              </div>
            )}

            {match.teamB.form.length > 0 && (
              <div className="team-form">
                <div className="form-team-header">
                  <Image
                    src={match.teamB.logo}
                    alt={match.teamB.name}
                    className="form-flag"
                    width={36}
                    height={27}
                  />
                  <span>{match.teamB.name}</span>
                </div>
                <div className="form-badges">
                  {match.teamB.form.map((result, i) => (
                    <div key={i}>{getFormIcon(result)}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="stats-section">
          <h3 className="stats-title">Sędzia</h3>
          <div
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              color: "#9ca3af",
            }}
          >
            {match.referee}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="match-details-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Ładowanie szczegółów meczu...</p>
        </div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="match-details-page">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
          Powrót do terminarza
        </button>
        <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <h1 style={{ color: "#ef4444", marginBottom: "1rem" }}>
            Nie znaleziono meczu
          </h1>
          <p style={{ color: "#9ca3af" }}>
            {error || "Mecz nie został znaleziony w bazie danych."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="match-details-page">
      <button className="back-button" onClick={handleBack}>
        <ArrowLeft size={20} />
        Powrót do terminarza
      </button>

      <div className="match-header">
        <div className="match-header-content">
          <div className="match-info-top">
            <div className="match-date-info">
              <Calendar size={16} />
              <span>{formatDate(match.date)}</span>
            </div>
          </div>

          <div className="match-teams">
            <div className="team-side">
              <Image
                src={match.teamA.logo}
                alt={match.teamA.name}
                className="team-flag-large"
                width={100}
                height={75}
              />
              <h2>{match.teamA.name}</h2>
            </div>

            <div className="match-time-display">
              {match.status === "Zakończony" && match.score ? (
                <>
                  <div className="score">{match.score}</div>
                  <div className="status-badge status-finished">Zakończony</div>
                </>
              ) : match.status === "LIVE" ? (
                <>
                  <div className="live-indicator">
                    <span className="pulse-dot"></span>
                    <span className="live-text">NA ŻYWO</span>
                  </div>
                  {match.score && <div className="score">{match.score}</div>}
                </>
              ) : (
                <>
                  <div className="time">{match.time}</div>
                  <div className="status-badge status-upcoming">
                    {match.status}
                  </div>
                </>
              )}
            </div>

            <div className="team-side">
              <Image
                src={match.teamB.logo}
                alt={match.teamB.name}
                className="team-flag-large"
                width={100}
                height={75}
              />
              <h2>{match.teamB.name}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === "lineups" ? "active" : ""}`}
          onClick={() => setActiveTab("lineups")}
        >
          <Users size={18} />
          Składy
        </button>
        <button
          className={`tab-button ${activeTab === "h2h" ? "active" : ""}`}
          onClick={() => setActiveTab("h2h")}
        >
          <History size={18} />
          Head to Head
        </button>
        <button
          className={`tab-button ${activeTab === "stats" ? "active" : ""}`}
          onClick={() => setActiveTab("stats")}
        >
          <TrendingUp size={18} />
          Statystyki
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "lineups" && renderLineups()}
        {activeTab === "h2h" && renderHeadToHead()}
        {activeTab === "stats" && renderStats()}
      </div>
    </div>
  );
};

export default MatchDetailsPage;
