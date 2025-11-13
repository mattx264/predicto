import React, { useState, useEffect } from "react";
import { XCircle, Star } from "lucide-react";
import type { Match } from "../../types/types";

interface PredictionModalProps {
  match: Match;
  onClose: () => void;
  onSubmit: (matchId: string, payload: PredictionPayload) => void;
}

interface PredictionPayload {
  joker: boolean;
  winner?: "home" | "draw" | "away" | null;
  home?: number;
  away?: number;
}

const PredictionModal: React.FC<PredictionModalProps> = ({
  match,
  onClose,
  onSubmit,
}) => {
  const [predictionType, setPredictionType] = useState<"winner" | "score">(
    "winner"
  );
  const [selectedWinner, setSelectedWinner] = useState<
    "home" | "draw" | "away" | null
  >(null);
  const [exactScore, setExactScore] = useState({ home: 0, away: 0 });
  const [useJoker, setUseJoker] = useState(false);

  useEffect(() => {
    const pred = match.userPrediction;

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
  }, [match]);

  const handleSubmit = () => {
    const predictionPayload: PredictionPayload = {
      joker: useJoker,
    };

    if (predictionType === "winner") {
      predictionPayload.winner = selectedWinner;
    } else {
      predictionPayload.home = exactScore.home;
      predictionPayload.away = exactScore.away;
    }

    onSubmit(match.id, predictionPayload);
  };

  return (
    <div className="prediction-modal-overlay" onClick={onClose}>
      <div className="prediction-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Typuj wynik</h3>
          <button className="modal-close" onClick={onClose}>
            <XCircle size={24} />
          </button>
        </div>

        <div className="modal-match-info">
          <div className="modal-team-container">
            {match.homeTeamLogo && (
              <img
                src={match.homeTeamLogo}
                alt={match.homeTeam}
                className="modal-team-logo"
              />
            )}
            <span className="modal-team">{match.homeTeam}</span>
          </div>
          <span className="modal-vs">vs</span>
          <div className="modal-team-container">
            <span className="modal-team">{match.awayTeam}</span>
            {match.awayTeamLogo && (
              <img
                src={match.awayTeamLogo}
                alt={match.awayTeam}
                className="modal-team-logo"
              />
            )}
          </div>
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
            className={`type-btn ${predictionType === "score" ? "active" : ""}`}
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
          onClick={handleSubmit}
          disabled={predictionType === "winner" && selectedWinner === null}
        >
          Zatwierdź typ
        </button>
      </div>
    </div>
  );
};

export default PredictionModal;
