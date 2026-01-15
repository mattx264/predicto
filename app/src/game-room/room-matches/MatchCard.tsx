import React from "react";
import { BarChart, Clock, Lock, MessageSquare, Trophy } from "lucide-react";
import VictoryParticles from "./victory-effect/VictoryEffect";
import UserPredictionDisplay from "./UserPredictionDisplay";
import type { Match } from "../../types/types";

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
        return <span className="match-status live">LIVE</span>;
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
          <Trophy size={16} />
          <span>Perfekcyjny typ!</span>
          <Trophy size={16} />
        </div>
      )}

      <div className="match-header">
        <div className="match-date">
          <Clock size={14} />
          <span>
            {new Date(match.date).toLocaleString("pl-PL", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
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
          {match.homeTeamLogo && (
            <img
              srcSet={match.homeTeamLogo}
              alt={match.homeTeam}
              className="match-team-logo"
            />
          )}
        </div>

        <div className="match-center">
          {match.actualScore ? (
            <>
              <span className="actual-score">{match.actualScore.home}</span>
              <span className="vs">-</span>
              <span className="actual-score">{match.actualScore.away}</span>
            </>
          ) : (
            <span className="vs">VS</span>
          )}
        </div>

        <div className="team away">
          {match.awayTeamLogo && (
            <img
              srcSet={match.awayTeamLogo}
              alt={match.awayTeam}
              className="match-team-logo"
            />
          )}
          <span className="team-name">{match.awayTeam}</span>
        </div>
      </div>

      {match.userPrediction && (
        <UserPredictionDisplay
          match={match}
          prediction={match.userPrediction}
          points={match.points}
        />
      )}

      <div className="live-actions-container">
        <button className="btn-watch-live" onClick={() => onWatchLive(match)}>
          <MessageSquare size={16} />
          Komentuj
        </button>
        <button
          className="btn-view-predictions"
          onClick={() => onViewPredictions(match)}
        >
          <BarChart size={16} />
          Zobacz typy
        </button>
      </div>

      {match.status === "upcoming" && isParticipant && (
        <button
          className="btn-predict"
          onClick={() => onPredictClick(match.id)}
        >
          {match.userPrediction ? "Zmień typ" : "Typuj wynik"}
        </button>
      )}

      {match.status === "upcoming" && !isParticipant && (
        <div className="locked-prediction">
          <Lock size={16} />
          <span>Dołącz do pokoju, aby typować</span>
        </div>
      )}
    </div>
  );
};

export default MatchCard;
