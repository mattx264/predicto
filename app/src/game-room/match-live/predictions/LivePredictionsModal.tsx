import React from "react";
import { XCircle } from "lucide-react";
import "./LivePredictionsModal.css";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  status: "upcoming" | "live" | "finished";
  actualScore?: {
    home: number;
    away: number;
  };
}

const otherUserPredictions = [
  { userId: "user1", prediction: { home: 2, away: 1 } },
  { userId: "user2", prediction: { home: 1, away: 1 } },
  { userId: "user3", prediction: { home: 0, away: 2 } },
  { userId: "user4", prediction: { home: 3, away: 1 } },
  { userId: "user5", prediction: { home: 2, away: 2 } },
  { userId: "user6", prediction: { home: 1, away: 0 } },
  { userId: "user7", prediction: { home: 1, away: 3 } },
  { userId: "user8", prediction: { home: 2, away: 1 } },
  { userId: "user9", prediction: { home: 0, away: 0 } },
  { userId: "user10", prediction: { home: 1, away: 2 } },
  { userId: "user11", prediction: { home: 4, away: 2 } },
  { userId: "user12", prediction: { home: 0, away: 1 } },
];

interface LivePredictionsModalProps {
  match: Match;
  onClose: () => void;
}

const LivePredictionsModal: React.FC<LivePredictionsModalProps> = ({
  match,
  onClose,
}) => {
  const totalPredictions = otherUserPredictions.length;
  let homeWins = 0;
  let draws = 0;
  let awayWins = 0;

  otherUserPredictions.forEach(({ prediction }) => {
    if (prediction.home > prediction.away) {
      homeWins++;
    } else if (prediction.home < prediction.away) {
      awayWins++;
    } else {
      draws++;
    }
  });

  const homeWinPercentage =
    totalPredictions > 0 ? (homeWins / totalPredictions) * 100 : 0;
  const drawPercentage =
    totalPredictions > 0 ? (draws / totalPredictions) * 100 : 0;
  const awayWinPercentage =
    totalPredictions > 0 ? (awayWins / totalPredictions) * 100 : 0;

  return (
    <div className="live-predictions-overlay" onClick={onClose}>
      <div
        className="live-predictions-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="live-predictions-header">
          <h3>Typy społeczności</h3>
          <button className="live-predictions-close" onClick={onClose}>
            <XCircle size={24} />
          </button>
        </div>

        <div className="live-predictions-match-info">
          <span className="team-name">{match.homeTeam}</span>
          {match.actualScore && (
            <span className="live-score">
              {match.actualScore.home} - {match.actualScore.away}
            </span>
          )}
          <span className="team-name">{match.awayTeam}</span>
        </div>

        <div className="prediction-stats">
          <p className="stats-description">
            Zobacz, jak typowała reszta graczy w tym pokoju ({totalPredictions}{" "}
            {totalPredictions === 1
              ? "głos"
              : totalPredictions > 1 && totalPredictions < 5
              ? "głosy"
              : "głosów"}
            ).
          </p>
          <div className="stat-item">
            <div className="stat-labels">
              <span>Wygrana {match.homeTeam}</span>
              <span>{homeWinPercentage.toFixed(1)}%</span>
            </div>
            <div className="stat-bar-container">
              <div
                className="stat-bar home"
                style={{ width: `${homeWinPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-labels">
              <span>Remis</span>
              <span>{drawPercentage.toFixed(1)}%</span>
            </div>
            <div className="stat-bar-container">
              <div
                className="stat-bar draw"
                style={{ width: `${drawPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-labels">
              <span>Wygrana {match.awayTeam}</span>
              <span>{awayWinPercentage.toFixed(1)}%</span>
            </div>
            <div className="stat-bar-container">
              <div
                className="stat-bar away"
                style={{ width: `${awayWinPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePredictionsModal;
