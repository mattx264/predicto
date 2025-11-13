import React from "react";
import { CheckCircle, XCircle, Minus, Star } from "lucide-react";
import type { Match } from "../../types/types";

interface UserPredictionDisplayProps {
  match: Match;
  prediction: {
    winner?: "home" | "draw" | "away" | null;
    home?: number;
    away?: number;
    joker?: boolean;
  };
  points?: number;
}

const UserPredictionDisplay: React.FC<UserPredictionDisplayProps> = ({
  match,
  prediction,
  points,
}) => {
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

  const getPredictionText = () => {
    if (prediction.winner) {
      return {
        home: `Wygrana ${match.homeTeam}`,
        draw: "Remis",
        away: `Wygrana ${match.awayTeam}`,
      }[prediction.winner];
    }
    return `${prediction.home} - ${prediction.away}`;
  };

  return (
    <div className="user-prediction">
      <div className="prediction-info">
        <span className="prediction-label">Twój typ:</span>
        <span className="prediction-score">{getPredictionText()}</span>
        {prediction.joker && (
          <span className="joker-indicator" title="Użyto Jokera">
            <Star size={14} />
          </span>
        )}
      </div>
      {getPointsBadge(points)}
    </div>
  );
};

export default UserPredictionDisplay;
