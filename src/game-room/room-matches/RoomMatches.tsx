import React, { useState } from "react";
import {
  Clock,
  Lock,
  CheckCircle,
  XCircle,
  Minus,
  MessageSquare,
} from "lucide-react";
import "./RoomMatches.css";
import MatchLiveModal from "../match-live/MatchLiveModal";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  status: "upcoming" | "live" | "finished";
  actualScore?: {
    home: number;
    away: number;
  };
  userPrediction?: {
    home: number;
    away: number;
  };
  points?: number;
}

interface RoomMatchesProps {
  matches: Match[];
  isParticipant: boolean;
  currentUserId: string;
}

const RoomMatches: React.FC<RoomMatchesProps> = ({
  matches,
  isParticipant,
  currentUserId,
}) => {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [selectedLiveMatch, setSelectedLiveMatch] = useState<Match | null>(
    null
  );
  const [prediction, setPrediction] = useState({ home: 0, away: 0 });

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

  const getPointsBadge = (points?: number) => {
    if (points === undefined) return null;

    if (points === 5) {
      return (
        <span className="points-badge perfect">
          <CheckCircle size={14} /> +{points}
        </span>
      );
    } else if (points === 3) {
      return (
        <span className="points-badge good">
          <Minus size={14} /> +{points}
        </span>
      );
    } else {
      return (
        <span className="points-badge bad">
          <XCircle size={14} /> {points}
        </span>
      );
    }
  };

  const handlePredictionSubmit = (matchId: string) => {
    console.log("Submitting prediction for match", matchId, prediction);
    setSelectedMatch(null);
    setPrediction({ home: 0, away: 0 });
  };

  return (
    <>
      <div className="matches-section">
        <div className="matches-header">
          <h2 className="section-title">Mecze do typowania</h2>
          <p className="section-description">
            Typuj wyniki meczów i zdobywaj punkty
          </p>
        </div>

        <div className="matches-list">
          {matches.map((match) => (
            <div key={match.id} className={`match-card ${match.status}`}>
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
                  {match.actualScore && (
                    <span className="actual-score">
                      {match.actualScore.home}
                    </span>
                  )}
                </div>

                <div className="match-center">
                  <span className="vs">VS</span>
                </div>

                <div className="team away">
                  {match.actualScore && (
                    <span className="actual-score">
                      {match.actualScore.away}
                    </span>
                  )}
                  <span className="team-name">{match.awayTeam}</span>
                </div>
              </div>

              {match.userPrediction && (
                <div className="user-prediction">
                  <span className="prediction-label">Twój typ:</span>
                  <span className="prediction-score">
                    {match.userPrediction.home} - {match.userPrediction.away}
                  </span>
                  {getPointsBadge(match.points)}
                </div>
              )}

              {match.status === "live" && (
                <button
                  className="btn-watch-live"
                  onClick={() => setSelectedLiveMatch(match)}
                >
                  <MessageSquare size={16} />
                  Oglądaj i komentuj na żywo
                </button>
              )}

              {match.status === "upcoming" && isParticipant && (
                <button
                  className="btn-predict"
                  onClick={() => setSelectedMatch(match.id)}
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
          ))}
        </div>
      </div>

      {selectedMatch && (
        <div
          className="prediction-modal-overlay"
          onClick={() => setSelectedMatch(null)}
        >
          <div
            className="prediction-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const match = matches.find((m) => m.id === selectedMatch);
              if (!match) return null;

              return (
                <>
                  <div className="modal-header">
                    <h3>Typuj wynik</h3>
                    <button
                      className="modal-close"
                      onClick={() => setSelectedMatch(null)}
                    >
                      <XCircle size={24} />
                    </button>
                  </div>

                  <div className="modal-match-info">
                    <span className="modal-team">{match.homeTeam}</span>
                    <span className="modal-vs">vs</span>
                    <span className="modal-team">{match.awayTeam}</span>
                  </div>

                  <div className="prediction-inputs">
                    <div className="prediction-input-group">
                      <label>{match.homeTeam}</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={prediction.home}
                        onChange={(e) =>
                          setPrediction({
                            ...prediction,
                            home: parseInt(e.target.value) || 0,
                          })
                        }
                        className="prediction-input"
                      />
                    </div>

                    <span className="prediction-separator">-</span>

                    <div className="prediction-input-group">
                      <label>{match.awayTeam}</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={prediction.away}
                        onChange={(e) =>
                          setPrediction({
                            ...prediction,
                            away: parseInt(e.target.value) || 0,
                          })
                        }
                        className="prediction-input"
                      />
                    </div>
                  </div>

                  <button
                    className="btn-submit-prediction"
                    onClick={() => handlePredictionSubmit(match.id)}
                  >
                    Zatwierdź typ
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {selectedLiveMatch && (
        <MatchLiveModal
          match={selectedLiveMatch}
          currentUserId={currentUserId}
          onClose={() => setSelectedLiveMatch(null)}
        />
      )}
    </>
  );
};

export default RoomMatches;
