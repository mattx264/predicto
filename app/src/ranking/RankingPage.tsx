import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Medal,
  Crown,
  TrendingUp,
  Target,
  Award,
  Filter,
  Sparkles,
} from "lucide-react";
import "./RankingPage.css";

interface Player {
  id: string;
  username: string;
  avatar: string;
  totalPoints: number;
  roomsWon: number;
  roomsPlayed: number;
  correctPredictions: number;
  totalPredictions: number;
  winRate: number;
  rank: number;
  trend: "up" | "down" | "stable";
}

const RankingPage: React.FC = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState<"all" | "month" | "week">("all");

  const players: Player[] = [
    {
      id: "1",
      username: "JanKowalski",
      avatar: "J",
      totalPoints: 2456,
      roomsWon: 12,
      roomsPlayed: 45,
      correctPredictions: 234,
      totalPredictions: 456,
      winRate: 26.7,
      rank: 1,
      trend: "up",
    },
    {
      id: "2",
      username: "AnnaWiśniewska",
      avatar: "A",
      totalPoints: 2389,
      roomsWon: 11,
      roomsPlayed: 42,
      correctPredictions: 221,
      totalPredictions: 438,
      winRate: 26.2,
      rank: 2,
      trend: "stable",
    },
    {
      id: "3",
      username: "PiotrNowak",
      avatar: "P",
      totalPoints: 2301,
      roomsWon: 10,
      roomsPlayed: 40,
      correctPredictions: 215,
      totalPredictions: 420,
      winRate: 25.0,
      rank: 3,
      trend: "up",
    },
    {
      id: "4",
      username: "MariaKowalczyk",
      avatar: "M",
      totalPoints: 2187,
      roomsWon: 9,
      roomsPlayed: 38,
      correctPredictions: 203,
      totalPredictions: 398,
      winRate: 23.7,
      rank: 4,
      trend: "down",
    },
    {
      id: "5",
      username: "TomaszZieliński",
      avatar: "T",
      totalPoints: 2145,
      roomsWon: 8,
      roomsPlayed: 36,
      correctPredictions: 198,
      totalPredictions: 378,
      winRate: 22.2,
      rank: 5,
      trend: "up",
    },
    {
      id: "6",
      username: "KarolinaNowacka",
      avatar: "K",
      totalPoints: 2089,
      roomsWon: 8,
      roomsPlayed: 35,
      correctPredictions: 192,
      totalPredictions: 368,
      winRate: 22.9,
      rank: 6,
      trend: "stable",
    },
    {
      id: "7",
      username: "MichaŁWójcik",
      avatar: "M",
      totalPoints: 2034,
      roomsWon: 7,
      roomsPlayed: 34,
      correctPredictions: 187,
      totalPredictions: 356,
      winRate: 20.6,
      rank: 7,
      trend: "down",
    },
    {
      id: "8",
      username: "AleksandraKamińska",
      avatar: "A",
      totalPoints: 1987,
      roomsWon: 7,
      roomsPlayed: 33,
      correctPredictions: 181,
      totalPredictions: 346,
      winRate: 21.2,
      rank: 8,
      trend: "up",
    },
    {
      id: "9",
      username: "DawidLewandowski",
      avatar: "D",
      totalPoints: 1923,
      roomsWon: 6,
      roomsPlayed: 32,
      correctPredictions: 175,
      totalPredictions: 336,
      winRate: 18.8,
      rank: 9,
      trend: "stable",
    },
    {
      id: "10",
      username: "NataliaWoźniak",
      avatar: "N",
      totalPoints: 1876,
      roomsWon: 6,
      roomsPlayed: 31,
      correctPredictions: 169,
      totalPredictions: 326,
      winRate: 19.4,
      rank: 10,
      trend: "down",
    },
  ];

  const currentUserId = "user1";
  const currentUser = players.find((p) => p.id === currentUserId);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="rank-icon gold" size={28} />;
      case 2:
        return <Medal className="rank-icon silver" size={28} />;
      case 3:
        return <Medal className="rank-icon bronze" size={28} />;
      default:
        return <span className="rank-number-large">#{rank}</span>;
    }
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "all" | "month" | "week";
    setTimeFilter(value);
  };
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="trend-icon up" size={16} />;
      case "down":
        return <TrendingUp className="trend-icon down" size={16} />;
      default:
        return <span className="trend-icon stable">—</span>;
    }
  };

  const getPodiumPlayer = (rank: number) => {
    return players.find((p) => p.rank === rank);
  };

  return (
    <div className="ranking-page">
      <div className="ranking-container">
        <div className="ranking-header">
          <div className="header-content-rank">
            <h1 className="page-title-rank">
              <Trophy className="title-icon-rank" />
              Globalny Ranking
            </h1>
            <p className="page-subtitle-rank">
              Najlepsi typerzy w całej społeczności Predicto
            </p>
          </div>

          <div className="time-filter">
            <Filter className="filter-icon-rank" size={20} />
            <select
              value={timeFilter}
              onChange={handleFilterChange}
              className="time-select"
            >
              <option value="all">Cały czas</option>
              <option value="month">Ten miesiąc</option>
              <option value="week">Ten tydzień</option>
            </select>
          </div>
        </div>

        <div className="podium-section">
          <div className="podium-container">
            <div className="podium-place second">
              <div className="podium-card">
                <Medal className="podium-medal silver-medal" size={32} />
                <div className="podium-avatar silver-avatar">
                  {getPodiumPlayer(2)?.avatar}
                </div>
                <h3 className="podium-name">{getPodiumPlayer(2)?.username}</h3>
                <p className="podium-points">
                  {getPodiumPlayer(2)?.totalPoints} pkt
                </p>
                <div className="podium-stats">
                  <div className="podium-stat">
                    <Trophy size={14} />
                    <span>{getPodiumPlayer(2)?.roomsWon} zwycięstw</span>
                  </div>
                  <div className="podium-stat">
                    <Target size={14} />
                    <span>{getPodiumPlayer(2)?.winRate}% win rate</span>
                  </div>
                </div>
              </div>
              <div className="podium-stand second-stand">
                <span className="stand-number">2</span>
              </div>
            </div>

            <div className="podium-place first">
              <div className="podium-card champion">
                <Sparkles className="champion-sparkle sparkle-1" size={20} />
                <Sparkles className="champion-sparkle sparkle-2" size={16} />
                <Crown className="podium-medal gold-medal" size={40} />
                <div className="podium-avatar gold-avatar">
                  {getPodiumPlayer(1)?.avatar}
                </div>
                <h3 className="podium-name">{getPodiumPlayer(1)?.username}</h3>
                <p className="podium-points champion-points">
                  {getPodiumPlayer(1)?.totalPoints} pkt
                </p>
                <div className="podium-stats">
                  <div className="podium-stat">
                    <Trophy size={14} />
                    <span>{getPodiumPlayer(1)?.roomsWon} zwycięstw</span>
                  </div>
                  <div className="podium-stat">
                    <Target size={14} />
                    <span>{getPodiumPlayer(1)?.winRate}% win rate</span>
                  </div>
                </div>
              </div>
              <div className="podium-stand first-stand">
                <span className="stand-number">1</span>
              </div>
            </div>

            <div className="podium-place third">
              <div className="podium-card">
                <Medal className="podium-medal bronze-medal" size={32} />
                <div className="podium-avatar bronze-avatar">
                  {getPodiumPlayer(3)?.avatar}
                </div>
                <h3 className="podium-name">{getPodiumPlayer(3)?.username}</h3>
                <p className="podium-points">
                  {getPodiumPlayer(3)?.totalPoints} pkt
                </p>
                <div className="podium-stats">
                  <div className="podium-stat">
                    <Trophy size={14} />
                    <span>{getPodiumPlayer(3)?.roomsWon} zwycięstw</span>
                  </div>
                  <div className="podium-stat">
                    <Target size={14} />
                    <span>{getPodiumPlayer(3)?.winRate}% win rate</span>
                  </div>
                </div>
              </div>
              <div className="podium-stand third-stand">
                <span className="stand-number">3</span>
              </div>
            </div>
          </div>
        </div>

        {currentUser && currentUser.rank > 3 && (
          <div className="current-user-card">
            <div className="current-user-label">
              <Award className="current-icon" size={20} />
              <span>Twoja pozycja</span>
            </div>
            <div className="ranking-item-detail highlight-user">
              <div className="rank-col">
                <span className="rank-number-large">#{currentUser.rank}</span>
                {getTrendIcon(currentUser.trend)}
              </div>

              <div className="player-col">
                <div className="player-avatar-rank">{currentUser.avatar}</div>
                <div className="player-info-rank">
                  <span className="player-name-rank">
                    {currentUser.username}
                  </span>
                  <span className="player-subtitle">
                    {currentUser.correctPredictions}/
                    {currentUser.totalPredictions} trafień
                  </span>
                </div>
              </div>

              <div className="stats-col">
                <div className="stat-item-rank">
                  <Trophy size={16} className="stat-icon-small" />
                  <span>{currentUser.roomsWon} zwycięstw</span>
                </div>
                <div className="stat-item-rank">
                  <Target size={16} className="stat-icon-small" />
                  <span>{currentUser.winRate}% win rate</span>
                </div>
              </div>

              <div className="points-col">
                <span className="points-large">{currentUser.totalPoints}</span>
                <span className="points-label-small">punktów</span>
              </div>
            </div>
          </div>
        )}

        <div className="ranking-list-section">
          <h2 className="section-title-rank">Pełny ranking</h2>

          <div className="ranking-list-full">
            {players.map((player) => (
              <div
                key={player.id}
                className={`ranking-item-detail ${player.id === currentUserId ? "is-current" : ""
                  } ${player.rank <= 3 ? "top-three" : ""}`}
                onClick={() => navigate(`/profile/${player.id}`)}
              >
                <div className="rank-col">
                  {getRankIcon(player.rank)}
                  {getTrendIcon(player.trend)}
                </div>

                <div className="player-col">
                  <div className="player-avatar-rank">{player.avatar}</div>
                  <div className="player-info-rank">
                    <span className="player-name-rank">
                      {player.username}
                      {player.id === currentUserId && (
                        <span className="you-badge-rank">Ty</span>
                      )}
                    </span>
                    <span className="player-subtitle">
                      {player.correctPredictions}/{player.totalPredictions}{" "}
                      trafień
                    </span>
                  </div>
                </div>

                <div className="stats-col">
                  <div className="stat-item-rank">
                    <Trophy size={16} className="stat-icon-small" />
                    <span>
                      {player.roomsWon}/{player.roomsPlayed} pokoi
                    </span>
                  </div>
                  <div className="stat-item-rank">
                    <Target size={16} className="stat-icon-small" />
                    <span>{player.winRate}% win rate</span>
                  </div>
                </div>

                <div className="points-col">
                  <span className="points-large">{player.totalPoints}</span>
                  <span className="points-label-small">punktów</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
