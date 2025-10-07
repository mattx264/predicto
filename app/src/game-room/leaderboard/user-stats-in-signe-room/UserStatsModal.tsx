import React from "react";
import {
  X,
  Trophy,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  XCircle,
  Minus,
} from "lucide-react";
import "./UserStatsModal.css";

interface MatchResult {
  matchId: string;
  points: number;
}

interface UserStats {
  id: string;
  username: string;
  avatar: string;
  rank: number;
  totalPoints: number;
  correctPredictions: number;
  totalPredictions: number;
  perfectScores: number;
  partialScores: number;
  missedScores: number;
  averagePoints: number;
  bestStreak: number;
  currentStreak: number;
  recentMatches: MatchResult[];
}

interface UserStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: UserStats;
  isCurrentUser: boolean;
}

const UserStatsModal: React.FC<UserStatsModalProps> = ({
  isOpen,
  onClose,
  userStats,
  isCurrentUser,
}) => {
  if (!isOpen) return null;

  const accuracy =
    userStats.totalPredictions > 0
      ? (
          (userStats.correctPredictions / userStats.totalPredictions) *
          100
        ).toFixed(1)
      : 0;

  const getMatchIcon = (points: number) => {
    if (points === 5) {
      return <CheckCircle className="match-result-icon perfect" size={24} />;
    } else if (points === 3) {
      return <Minus className="match-result-icon partial" size={24} />;
    } else {
      return <XCircle className="match-result-icon missed" size={24} />;
    }
  };

  return (
    <div className="user-stats-modal-overlay" onClick={onClose}>
      <div className="user-stats-modal" onClick={(e) => e.stopPropagation()}>
        <div className="user-stats-header">
          <div className="user-stats-header-content">
            <div className="user-stats-avatar-large">{userStats.avatar}</div>
            <div className="user-stats-header-info">
              <h2 className="user-stats-username">
                {userStats.username}
                {isCurrentUser && <span className="you-badge-modal">Ty</span>}
              </h2>
              <div className="user-stats-rank-display">
                <Trophy size={18} />
                <span>Miejsce #{userStats.rank}</span>
              </div>
            </div>
          </div>
          <button className="user-stats-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="user-stats-grid">
          <div className="user-stat-card primary">
            <div className="stat-icon-wrapper primary-icon">
              <Trophy size={24} />
            </div>
            <div className="stat-content-modal">
              <span className="stat-value-large">{userStats.totalPoints}</span>
              <span className="stat-label-modal">Łączne punkty</span>
            </div>
          </div>

          <div className="user-stat-card">
            <div className="stat-icon-wrapper success-icon">
              <Target size={24} />
            </div>
            <div className="stat-content-modal">
              <span className="stat-value-large">{accuracy}%</span>
              <span className="stat-label-modal">Celność</span>
            </div>
          </div>

          <div className="user-stat-card">
            <div className="stat-icon-wrapper info-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content-modal">
              <span className="stat-value-large">
                {userStats.averagePoints.toFixed(1)}
              </span>
              <span className="stat-label-modal">Średnia pkt/mecz</span>
            </div>
          </div>

          <div className="user-stat-card">
            <div className="stat-icon-wrapper warning-icon">
              <Award size={24} />
            </div>
            <div className="stat-content-modal">
              <span className="stat-value-large">{userStats.bestStreak}</span>
              <span className="stat-label-modal">Najlepsza seria</span>
            </div>
          </div>
        </div>

        <div className="predictions-breakdown">
          <h3 className="breakdown-title">Rozkład typowań</h3>
          <div className="breakdown-grid">
            <div className="breakdown-item perfect">
              <CheckCircle size={20} />
              <div className="breakdown-info">
                <span className="breakdown-value">
                  {userStats.perfectScores}
                </span>
                <span className="breakdown-label">Dokładne wyniki</span>
              </div>
              <span className="breakdown-points">+5 pkt</span>
            </div>

            <div className="breakdown-item partial">
              <Minus size={20} />
              <div className="breakdown-info">
                <span className="breakdown-value">
                  {userStats.partialScores}
                </span>
                <span className="breakdown-label">Tylko wynik</span>
              </div>
              <span className="breakdown-points">+3 pkt</span>
            </div>

            <div className="breakdown-item missed">
              <XCircle size={20} />
              <div className="breakdown-info">
                <span className="breakdown-value">
                  {userStats.missedScores}
                </span>
                <span className="breakdown-label">Błędne</span>
              </div>
              <span className="breakdown-points">0 pkt</span>
            </div>
          </div>
        </div>

        <div className="recent-matches-section">
          <h3 className="recent-matches-title">Ostatnie 5 meczów</h3>
          <div className="recent-matches-row">
            {userStats.recentMatches.slice(0, 5).map((match) => (
              <div
                key={match.matchId}
                className={`recent-match-icon-wrapper ${
                  match.points === 5
                    ? "perfect"
                    : match.points === 3
                    ? "partial"
                    : "missed"
                }`}
                title={
                  match.points === 5
                    ? "Dokładny wynik (+5 pkt)"
                    : match.points === 3
                    ? "Tylko wynik (+3 pkt)"
                    : "Błędny typ (0 pkt)"
                }
              >
                {getMatchIcon(match.points)}
              </div>
            ))}
          </div>
        </div>

        <div className="user-stats-footer">
          <div className="footer-stat">
            <span className="footer-label">Aktualna seria wygranych:</span>
            <span className="footer-value">
              {userStats.currentStreak}{" "}
              {userStats.currentStreak === 1 ? "mecz" : "mecze"}
            </span>
          </div>
          <div className="footer-stat">
            <span className="footer-label">Łącznie typów:</span>
            <span className="footer-value">{userStats.totalPredictions}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatsModal;
