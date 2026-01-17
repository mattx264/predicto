import React from "react";
import { XCircle, Users, BarChart3, TrendingUp } from "lucide-react";
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
          <div className="header-title-wrapper">
            <div className="header-icon-box">
              <Users size={20} />
            </div>
            <h3>Głosy Społeczności</h3>
          </div>
          <button className="live-predictions-close" onClick={onClose}>
            <XCircle size={24} />
          </button>
        </div>

        <div className="live-predictions-match-info">
          <span className="team-name home">{match.homeTeam}</span>
          {match.actualScore ? (
            <div className="live-score-badge">
              <span className="score-val">{match.actualScore.home}</span>
              <span className="score-sep">:</span>
              <span className="score-val">{match.actualScore.away}</span>
            </div>
          ) : (
            <span className="vs-badge">VS</span>
          )}
          <span className="team-name away">{match.awayTeam}</span>
        </div>

        <div className="prediction-stats">
          <div className="stats-intro">
            <BarChart3 size={18} className="intro-icon" />
            <p className="stats-description">
              Analiza <strong>{totalPredictions}</strong> {totalPredictions === 1 ? "typu" : "typów"} graczy
            </p>
          </div>

          <div className="stat-bars-wrapper">
            <div className="stat-item">
              <div className="stat-labels">
                <span className="label-team">Wygrana {match.homeTeam}</span>
                <span className="label-percent">{homeWinPercentage.toFixed(0)}%</span>
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
                <span className="label-team">Remis</span>
                <span className="label-percent">{drawPercentage.toFixed(0)}%</span>
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
                <span className="label-team">Wygrana {match.awayTeam}</span>
                <span className="label-percent">{awayWinPercentage.toFixed(0)}%</span>
              </div>
              <div className="stat-bar-container">
                <div
                  className="stat-bar away"
                  style={{ width: `${awayWinPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="trend-footer">
            <TrendingUp size={16} />
            <span>Większość graczy stawia na <strong>
              {homeWinPercentage > awayWinPercentage && homeWinPercentage > drawPercentage ? match.homeTeam :
                awayWinPercentage > homeWinPercentage && awayWinPercentage > drawPercentage ? match.awayTeam : "Remis"}
            </strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePredictionsModal;
