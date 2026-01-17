import React from "react";
import { BarChart, Clock, Lock, MessageSquare, Trophy } from "lucide-react";
import VictoryParticles from "./victory-effect/VictoryEffect";
import UserPredictionDisplay from "./UserPredictionDisplay";
import type { Match } from "../../types/types";
import "./MatchCard.css";

interface MatchCardProps {
  match: Match;
  isParticipant: boolean;
  onPredictClick: (matchId: string) => void;
  onWatchLive: (match: Match) => void;
  onViewPredictions: (match: Match) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({
  match,
  isParticipant,
  onPredictClick,
  onWatchLive,
  onViewPredictions,
}) => {
  const getMatchStatusBadge = (match: Match) => {
    switch (match.status) {
      case "live":
        return <span className="match-status live"><span className="live-dot"></span> LIVE</span>;
      case "finished":
        return <span className="match-status finished">Zakończony</span>;
      case "upcoming":
        return <span className="match-status upcoming">Nadchodzący</span>;
    }
  };

  const isVictoryMatch = (): boolean => {
    return match.status === "finished" && match.points === 5;
  };

  return (
    <div
      className={`match-card ${match.status} ${isVictoryMatch() ? "victory-card" : ""
        }`}
    >
      {isVictoryMatch() && <VictoryParticles show={true} type="fireworks" />}

      {isVictoryMatch() && (
        <div className="victory-banner">
          <Trophy size={14} className="trophy-icon" />
          <span>PERFECT SCORE!</span>
          <Trophy size={14} className="trophy-icon" />
        </div>
      )}

      <div className="match-header">
        <div className="match-date">
          <Clock size={14} />
          <span>
            {new Date(match.date).toLocaleString("pl-PL", {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        {getMatchStatusBadge(match)}
      </div>

      <div className="match-teams">
        <div className="team home">
          <span className="team-name">{match.homeTeam}</span>
          {match.homeTeamLogo ? (
            <img
              srcSet={match.homeTeamLogo}
              alt={match.homeTeam}
              className="match-team-logo"
            />
          ) : (
            <div className="team-logo-placeholder">{match.homeTeam[0]}</div>
          )}
        </div>

        <div className="match-center">
          {match.actualScore ? (
            <div className="score-display-match">
              <span className="actual-score">{match.actualScore.home}</span>
              <span className="score-divider">:</span>
              <span className="actual-score">{match.actualScore.away}</span>
            </div>
          ) : (
            <span className="vs">VS</span>
          )}
        </div>

        <div className="team away">
          {match.awayTeamLogo ? (
            <img
              srcSet={match.awayTeamLogo}
              alt={match.awayTeam}
              className="match-team-logo"
            />
          ) : (
            <div className="team-logo-placeholder">{match.awayTeam[0]}</div>
          )}
          <span className="team-name">{match.awayTeam}</span>
        </div>
      </div>

      {match.userPrediction && (
        <div className="prediction-wrapper">
          <UserPredictionDisplay
            match={match}
            prediction={match.userPrediction}
            points={match.points}
          />
        </div>
      )}

      <div className="live-actions-container">
        <button className="btn-action watch-live" onClick={() => onWatchLive(match)}>
          <MessageSquare size={16} />
          Czat
        </button>
        <button
          className="btn-action view-predictions"
          onClick={() => onViewPredictions(match)}
        >
          <BarChart size={16} />
          Statystyki
        </button>
      </div>

      {match.status === "upcoming" && isParticipant && (
        <button
          className={`btn-predict ${match.userPrediction ? "edit-mode" : ""}`}
          onClick={() => onPredictClick(match.id)}
        >
          {match.userPrediction ? "Edytuj typ" : "Typuj wynik"}
        </button>
      )}

      {match.status === "upcoming" && !isParticipant && (
        <div className="locked-prediction">
          <Lock size={14} />
          <span>Dołącz do pokoju, aby typować</span>
        </div>
      )}
    </div>
  );
};

export default MatchCard;