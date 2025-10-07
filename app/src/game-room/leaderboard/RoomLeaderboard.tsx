import React, { useState } from "react";
import { Crown, Medal, AlertCircle, Users as UsersIcon } from "lucide-react";
import "./RoomLeaderboard.css";
import UserStatsModal from "./user-stats-in-signe-room/UserStatsModal";

interface Participant {
  id: string;
  username: string;
  totalPoints: number;
  correctPredictions: number;
  rank: number;
  avatar: string;
  isPaid: boolean;
  joinedAt?: string;
}

interface RoomLeaderboardProps {
  participants: Participant[];
  currentUserId: string;
  creatorId: string;
}

const RoomLeaderboard: React.FC<RoomLeaderboardProps> = ({
  participants,
  currentUserId,
}) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"ranking" | "all">("ranking");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="rank-icon gold" size={20} />;
      case 2:
        return <Medal className="rank-icon silver" size={20} />;
      case 3:
        return <Medal className="rank-icon bronze" size={20} />;
      default:
        return <span className="rank-number">#{rank}</span>;
    }
  };

  const getUserStats = (userId: string) => {
    const user = participants.find((p) => p.id === userId);
    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      rank: user.rank,
      totalPoints: user.totalPoints,
      correctPredictions: user.correctPredictions,
      totalPredictions: 15,
      perfectScores: 8,
      partialScores: 5,
      missedScores: 2,
      averagePoints: user.totalPoints / 15,
      bestStreak: 5,
      currentStreak: 3,
      recentMatches: [
        { matchId: "1", points: 5 },
        { matchId: "2", points: 3 },
        { matchId: "3", points: 5 },
        { matchId: "4", points: 0 },
        { matchId: "5", points: 5 },
      ],
    };
  };

  const handleUserClick = (userId: string) => {
    setSelectedUser(userId);
  };

  const selectedUserStats = selectedUser ? getUserStats(selectedUser) : null;

  const sortedParticipants =
    viewMode === "all"
      ? [...participants].sort((a, b) => a.username.localeCompare(b.username))
      : participants;

  return (
    <>
      <div className="leaderboard-section">
        <div className="leaderboard-header">
          <div className="leaderboard-header-text">
            <h2 className="section-title">
              {viewMode === "ranking"
                ? "Ranking uczestników"
                : "Wszyscy uczestnicy"}
            </h2>
            <p className="section-description">
              {viewMode === "ranking"
                ? "Najlepsi typerzy w pokoju"
                : `Lista wszystkich uczestników (${participants.length})`}
            </p>
          </div>

          <div className="leaderboard-toggle">
            <button
              className={`toggle-btn-leaderboard ${
                viewMode === "ranking" ? "active" : ""
              }`}
              onClick={() => setViewMode("ranking")}
            >
              Ranking
            </button>
            <button
              className={`toggle-btn-leaderboard ${
                viewMode === "all" ? "active" : ""
              }`}
              onClick={() => setViewMode("all")}
            >
              Wszyscy
            </button>
          </div>
        </div>

        <div className="leaderboard-list">
          {sortedParticipants.map((participant) => (
            <div
              key={participant.id}
              className={`leaderboard-item ${
                participant.id === currentUserId ? "current-user" : ""
              }`}
              onClick={() => handleUserClick(participant.id)}
            >
              {viewMode === "ranking" ? (
                <div className="leaderboard-rank">
                  {getRankIcon(participant.rank)}
                </div>
              ) : (
                <div className="leaderboard-rank">
                  <UsersIcon className="participant-icon" size={20} />
                </div>
              )}

              <div className="leaderboard-avatar">{participant.avatar}</div>

              <div className="leaderboard-info">
                <div className="leaderboard-name">
                  {participant.username}

                  {participant.id === currentUserId && (
                    <span className="you-badge">Ty</span>
                  )}
                </div>
                <div className="leaderboard-stats">
                  {viewMode === "ranking" ? (
                    <>
                      <span>{participant.correctPredictions} trafień</span>
                      {!participant.isPaid && (
                        <span className="unpaid-badge">
                          <AlertCircle size={12} />
                          Nieopłacone
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <span>
                        {participant.isPaid ? (
                          <span className="paid-badge">Opłacone</span>
                        ) : (
                          <span className="unpaid-badge">
                            <AlertCircle size={12} />
                            Nieopłacone
                          </span>
                        )}
                      </span>
                      {participant.joinedAt && (
                        <span className="joined-date">
                          Dołączył:{" "}
                          {new Date(participant.joinedAt).toLocaleDateString(
                            "pl-PL"
                          )}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {viewMode === "ranking" && (
                <div className="leaderboard-points">
                  {participant.totalPoints}
                  <span className="points-label">pkt</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedUserStats && (
        <UserStatsModal
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          userStats={selectedUserStats}
          isCurrentUser={selectedUser === currentUserId}
        />
      )}
    </>
  );
};

export default RoomLeaderboard;
