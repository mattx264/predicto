import React, { useState, useEffect } from "react";
import {
  Clock,
  Lock,
  CheckCircle,
  XCircle,
  Minus,
  MessageSquare,
  BarChart,
  Trophy,
  Star,
} from "lucide-react";
import "./RoomMatches.css";
import MatchLiveModal from "../match-live/MatchLiveModal";
import LivePredictionsModal from "../match-live/predictions/LivePredictionsModal";
import VictoryParticles from "./victory-effect/VictoryEffect";
import type { Match } from "../../types/types";

interface RoomMatchesProps {
  matches: Match[];
  isParticipant: boolean;
  currentUserId: string;
}
interface PredictionPayload {
  joker: boolean;
  winner?: "home" | "draw" | "away" | null;
  home?: number;
  away?: number;
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
  const [livePredictionsMatch, setLivePredictionsMatch] =
    useState<Match | null>(null);

  const [predictionType, setPredictionType] = useState<"winner" | "score">(
    "winner"
  );
  const [selectedWinner, setSelectedWinner] = useState<
    "home" | "draw" | "away" | null
  >(null);
  const [exactScore, setExactScore] = useState({ home: 0, away: 0 });
  const [useJoker, setUseJoker] = useState(false);

  useEffect(() => {
    if (selectedMatch) {
      const match = matches.find((m) => m.id === selectedMatch);
      const pred = match?.userPrediction;

      if (pred) {
        if (pred.winner) {
          setPredictionType("winner");
          setSelectedWinner(pred.winner);
          setExactScore({ home: 0, away: 0 });
        } else if (pred.home !== undefined && pred.away !== undefined) {
          setPredictionType("score");
          setExactScore({ home: pred.home, away: pred.away });
          setSelectedWinner(null);
        }
        setUseJoker(pred.joker || false);
      } else {
        setPredictionType("winner");
        setSelectedWinner(null);
        setExactScore({ home: 0, away: 0 });
        setUseJoker(false);
      }
    }
  }, [selectedMatch, matches]);

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
    const predictionPayload: PredictionPayload = {
      joker: useJoker,
    };

    if (predictionType === "winner") {
      predictionPayload.winner = selectedWinner;
    } else {
      predictionPayload.home = exactScore.home;
      predictionPayload.away = exactScore.away;
    }

    console.log("Submitting prediction for match", matchId, predictionPayload);

    setSelectedMatch(null);
  };

  const isVictoryMatch = (match: Match): boolean => {
    return match.status === "finished" && match.points === 5;
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
            <div
              key={match.id}
              className={`match-card ${match.status} ${
                isVictoryMatch(match) ? "victory-card" : ""
              }`}
            >
              {isVictoryMatch(match) && (
                <VictoryParticles show={true} type="fireworks" />
              )}

              {isVictoryMatch(match) && (
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
                </div>

                <div className="match-center">
                  {match.actualScore ? (
                    <>
                      <span className="actual-score">
                        {match.actualScore.home}
                      </span>
                      <span className="vs">-</span>
                      <span className="actual-score">
                        {match.actualScore.away}
                      </span>
                    </>
                  ) : (
                    <span className="vs">VS</span>
                  )}
                </div>

                <div className="team away">
                  <span className="team-name">{match.awayTeam}</span>
                </div>
              </div>

              {match.userPrediction && (
                <div className="user-prediction">
                  <div className="prediction-info">
                    <span className="prediction-label">Twój typ:</span>
                    <span className="prediction-score">
                      {match.userPrediction.winner
                        ? {
                            home: `Wygrana ${match.homeTeam}`,
                            draw: "Remis",
                            away: `Wygrana ${match.awayTeam}`,
                          }[match.userPrediction.winner]
                        : `${match.userPrediction.home} - ${match.userPrediction.away}`}
                    </span>
                    {match.userPrediction.joker && (
                      <span className="joker-indicator" title="Użyto Jokera">
                        <Star size={14} />
                      </span>
                    )}
                  </div>
                  {getPointsBadge(match.points)}
                </div>
              )}

              {match.status === "live" && (
                <div className="live-actions-container">
                  <button
                    className="btn-watch-live"
                    onClick={() => setSelectedLiveMatch(match)}
                  >
                    <MessageSquare size={16} />
                    Komentuj
                  </button>
                  <button
                    className="btn-view-predictions"
                    onClick={() => setLivePredictionsMatch(match)}
                  >
                    <BarChart size={16} />
                    Zobacz typy
                  </button>
                </div>
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

                  <div className="prediction-type-selector">
                    <button
                      className={`type-btn ${
                        predictionType === "winner" ? "active" : ""
                      }`}
                      onClick={() => setPredictionType("winner")}
                    >
                      Wybierz zwycięzcę
                    </button>
                    <button
                      className={`type-btn ${
                        predictionType === "score" ? "active" : ""
                      }`}
                      onClick={() => setPredictionType("score")}
                    >
                      Dokładny wynik
                    </button>
                  </div>

                  <div className="joker-toggle">
                    <input
                      type="checkbox"
                      id="joker-checkbox"
                      checked={useJoker}
                      onChange={(e) => setUseJoker(e.target.checked)}
                    />
                    <label htmlFor="joker-checkbox">
                      <Star size={18} />
                      <span>Użyj Jokera (podwójne punkty)</span>
                    </label>
                  </div>

                  <div className="prediction-panel">
                    {predictionType === "winner" ? (
                      <div className="winner-selection">
                        <button
                          className={`winner-btn ${
                            selectedWinner === "home" ? "active" : ""
                          }`}
                          onClick={() => setSelectedWinner("home")}
                        >
                          {match.homeTeam}
                        </button>
                        <button
                          className={`winner-btn ${
                            selectedWinner === "draw" ? "active" : ""
                          }`}
                          onClick={() => setSelectedWinner("draw")}
                        >
                          Remis
                        </button>
                        <button
                          className={`winner-btn ${
                            selectedWinner === "away" ? "active" : ""
                          }`}
                          onClick={() => setSelectedWinner("away")}
                        >
                          {match.awayTeam}
                        </button>
                      </div>
                    ) : (
                      <div className="prediction-inputs">
                        <div className="prediction-input-group">
                          <label>{match.homeTeam}</label>
                          <input
                            type="number"
                            min="0"
                            max="20"
                            value={exactScore.home}
                            onChange={(e) =>
                              setExactScore({
                                ...exactScore,
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
                            value={exactScore.away}
                            onChange={(e) =>
                              setExactScore({
                                ...exactScore,
                                away: parseInt(e.target.value) || 0,
                              })
                            }
                            className="prediction-input"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    className="btn-submit-prediction"
                    onClick={() => handlePredictionSubmit(match.id)}
                    disabled={
                      predictionType === "winner" && selectedWinner === null
                    }
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

      {livePredictionsMatch && (
        <LivePredictionsModal
          match={livePredictionsMatch}
          onClose={() => setLivePredictionsMatch(null)}
        />
      )}
    </>
  );
};

export default RoomMatches;
