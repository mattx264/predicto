import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Plus,
  TrendingUp,
  Trophy,
  Target,
  Calendar,
  Clock,
  Users,
  ArrowRight,
  Bell,
  Medal,
  Crown,
  Zap,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import "./DashboardPage.css";

interface UserRoom {
  id: string;
  name: string;
  league: string;
  participants: number;
  maxParticipants: number;
  status: "active" | "pending" | "ended";
  yourRank: number;
  yourPoints: number;
  nextMatch?: {
    homeTeam: string;
    awayTeam: string;
    date: string;
  };
  prize: number;
}

interface UpcomingMatch {
  id: string;
  roomId: string;
  roomName: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  isPredicted: boolean;
}

interface RecentResult {
  id: string;
  roomName: string;
  homeTeam: string;
  awayTeam: string;
  actualScore: { home: number; away: number };
  yourPrediction: { home: number; away: number };
  points: number;
  date: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<
    "active" | "pending" | "ended"
  >("active");

  const userStats = {
    globalRank: 42,
    totalPoints: 2456,
    roomsWon: 12,
    winRate: 26,
    activeRooms: 5,
    currentStreak: 8,
  };

  const notifications = [
    {
      id: "1",
      type: "invite",
      message: 'AnnaWiśniewska zaprosiła Cię do pokoju "Liga Mistrzów 2025"',
      time: `5 ${t("dashboard.timeAgo.minutesAgo")}`,
      isNew: true,
    },
    {
      id: "2",
      type: "match",
      message:
        "Za 2 godziny mecz Manchester City vs Liverpool - nie zapomnij wytypować!",
      time: `1 ${t("dashboard.timeAgo.hoursAgo")}`,
      isNew: true,
    },
    {
      id: "3",
      type: "result",
      message: "Zdobyłeś 5 punktów za mecz Arsenal vs Chelsea",
      time: `3 ${t("dashboard.timeAgo.hoursAgo")}`,
      isNew: false,
    },
  ];

  const userRooms: UserRoom[] = [
    {
      id: "1",
      name: "Premier League Masters",
      league: "Premier League",
      participants: 8,
      maxParticipants: 10,
      status: "active",
      yourRank: 2,
      yourPoints: 145,
      nextMatch: {
        homeTeam: "Manchester City",
        awayTeam: "Liverpool",
        date: "2024-11-02T15:00:00",
      },
      prize: 500,
    },
    {
      id: "2",
      name: "Liga Mistrzów 2025",
      league: "Champions League",
      participants: 10,
      maxParticipants: 15,
      status: "active",
      yourRank: 5,
      yourPoints: 98,
      nextMatch: {
        homeTeam: "Real Madrid",
        awayTeam: "Barcelona",
        date: "2024-11-03T21:00:00",
      },
      prize: 1500,
    },
    {
      id: "3",
      name: "Ekstraklasa Challenge",
      league: "Ekstraklasa",
      participants: 12,
      maxParticipants: 12,
      status: "pending",
      yourRank: 0,
      yourPoints: 0,
      prize: 600,
    },
    {
      id: "4",
      name: "Bundesliga Pro",
      league: "Bundesliga",
      participants: 10,
      maxParticipants: 10,
      status: "ended",
      yourRank: 3,
      yourPoints: 234,
      prize: 750,
    },
  ];

  const upcomingMatches: UpcomingMatch[] = [
    {
      id: "1",
      roomId: "1",
      roomName: "Premier League Masters",
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      date: "2024-11-02T15:00:00",
      isPredicted: false,
    },
    {
      id: "2",
      roomId: "2",
      roomName: "Liga Mistrzów 2025",
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      date: "2024-11-03T21:00:00",
      isPredicted: true,
    },
    {
      id: "3",
      roomId: "1",
      roomName: "Premier League Masters",
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      date: "2024-11-04T17:30:00",
      isPredicted: false,
    },
  ];

  const recentResults: RecentResult[] = [
    {
      id: "1",
      roomName: "Premier League Masters",
      homeTeam: "Manchester United",
      awayTeam: "Tottenham",
      actualScore: { home: 2, away: 1 },
      yourPrediction: { home: 2, away: 1 },
      points: 5,
      date: "2024-10-28T15:00:00",
    },
    {
      id: "2",
      roomName: "Liga Mistrzów 2025",
      homeTeam: "Bayern",
      awayTeam: "PSG",
      actualScore: { home: 3, away: 1 },
      yourPrediction: { home: 2, away: 1 },
      points: 3,
      date: "2024-10-27T21:00:00",
    },
    {
      id: "3",
      roomName: "Premier League Masters",
      homeTeam: "Liverpool",
      awayTeam: "Arsenal",
      actualScore: { home: 1, away: 2 },
      yourPrediction: { home: 2, away: 1 },
      points: 0,
      date: "2024-10-26T17:30:00",
    },
  ];

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Crown className="rank-badge gold" size={16} />;
    if (rank === 2) return <Medal className="rank-badge silver" size={16} />;
    if (rank === 3) return <Medal className="rank-badge bronze" size={16} />;
    return <span className="rank-badge-text">#{rank}</span>;
  };

  const getPointsBadge = (points: number) => {
    if (points === 5) {
      return <span className="result-badge perfect">+{points}</span>;
    } else if (points === 3) {
      return <span className="result-badge good">+{points}</span>;
    } else {
      return <span className="result-badge bad">{points}</span>;
    }
  };

  const filteredRooms = userRooms.filter((room) => room.status === selectedTab);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-text">
            <h1 className="dashboard-title">
              {t("dashboard.welcomeBack")},{" "}
              <span className="username-highlight">Gracz</span>!
            </h1>
            <p className="dashboard-subtitle">{t("dashboard.subtitle")}</p>
          </div>
          <button
            className="btn-create-room"
            onClick={() => navigate("/create-room")}
          >
            <Plus size={20} />
            <span>{t("dashboard.createRoom")}</span>
          </button>
        </div>

        <div className="stats-overview">
          <div className="stat-card-dash">
            <div className="stat-icon-wrapper purple">
              <Trophy className="stat-icon-dash" />
            </div>
            <div className="stat-info-dash">
              <span className="stat-label-dash">
                {t("dashboard.stats.globalRank")}
              </span>
              <span className="stat-value-dash">#{userStats.globalRank}</span>
            </div>
          </div>

          <div className="stat-card-dash">
            <div className="stat-icon-wrapper green">
              <Target className="stat-icon-dash" />
            </div>
            <div className="stat-info-dash">
              <span className="stat-label-dash">
                {t("dashboard.stats.totalPoints")}
              </span>
              <span className="stat-value-dash">{userStats.totalPoints}</span>
            </div>
          </div>

          <div className="stat-card-dash">
            <div className="stat-icon-wrapper blue">
              <Medal className="stat-icon-dash" />
            </div>
            <div className="stat-info-dash">
              <span className="stat-label-dash">
                {t("dashboard.stats.roomsWon")}
              </span>
              <span className="stat-value-dash">{userStats.roomsWon}</span>
            </div>
          </div>

          <div className="stat-card-dash">
            <div className="stat-icon-wrapper orange">
              <TrendingUp className="stat-icon-dash" />
            </div>
            <div className="stat-info-dash">
              <span className="stat-label-dash">
                {t("dashboard.stats.winRate")}
              </span>
              <span className="stat-value-dash">{userStats.winRate}%</span>
            </div>
          </div>

          <div className="stat-card-dash">
            <div className="stat-icon-wrapper yellow">
              <Zap className="stat-icon-dash" />
            </div>
            <div className="stat-info-dash">
              <span className="stat-label-dash">
                {t("dashboard.stats.currentStreak")}
              </span>
              <span className="stat-value-dash">{userStats.currentStreak}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-main">
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">
                  <Users size={24} />
                  {t("dashboard.yourRooms")}
                </h2>
                <div className="room-tabs">
                  <button
                    className={`room-tab ${selectedTab === "active" ? "active" : ""
                      }`}
                    onClick={() => setSelectedTab("active")}
                  >
                    {t("dashboard.tabs.active")} (
                    {userRooms.filter((r) => r.status === "active").length})
                  </button>
                  <button
                    className={`room-tab ${selectedTab === "pending" ? "active" : ""
                      }`}
                    onClick={() => setSelectedTab("pending")}
                  >
                    {t("dashboard.tabs.pending")} (
                    {userRooms.filter((r) => r.status === "pending").length})
                  </button>
                  <button
                    className={`room-tab ${selectedTab === "ended" ? "active" : ""
                      }`}
                    onClick={() => setSelectedTab("ended")}
                  >
                    {t("dashboard.tabs.ended")} (
                    {userRooms.filter((r) => r.status === "ended").length})
                  </button>
                </div>
              </div>

              <div className="rooms-list">
                {filteredRooms.length === 0 ? (
                  <div className="empty-state">
                    <Trophy className="empty-icon" size={48} />
                    <p>{t("dashboard.emptyRooms")}</p>
                  </div>
                ) : (
                  filteredRooms.map((room) => (
                    <div
                      key={room.id}
                      className="room-item"
                      onClick={() => navigate(`/room/${room.id}`)}
                    >
                      <div className="room-item-header">
                        <div className="room-item-info">
                          <h3 className="room-item-name">{room.name}</h3>
                          <span className="room-item-league">
                            {room.league}
                          </span>
                        </div>
                        <div className="room-item-prize">
                          <Trophy size={16} />
                          <span>{room.prize} Monet</span>
                        </div>
                      </div>

                      {room.status === "active" && (
                        <>
                          <div className="room-item-stats">
                            <div className="room-stat">
                              <span className="room-stat-label">
                                {t("dashboard.yourPosition")}
                              </span>
                              <div className="room-stat-value">
                                {getRankBadge(room.yourRank)}
                                <span>
                                  {room.yourPoints} {t("common.points")}
                                </span>
                              </div>
                            </div>
                            <div className="room-stat">
                              <span className="room-stat-label">
                                {t("dashboard.participants")}
                              </span>
                              <span className="room-stat-value">
                                {room.participants}/{room.maxParticipants}
                              </span>
                            </div>
                          </div>

                          {room.nextMatch && (
                            <div className="next-match">
                              <Clock size={14} />
                              <span className="next-match-text">
                                {room.nextMatch.homeTeam} {t("common.vs")}{" "}
                                {room.nextMatch.awayTeam}
                              </span>
                              <span className="next-match-date">
                                {new Date(
                                  room.nextMatch.date
                                ).toLocaleDateString("pl-PL")}
                              </span>
                            </div>
                          )}
                        </>
                      )}

                      {room.status === "pending" && (
                        <div className="room-pending-info">
                          <AlertCircle size={16} />
                          <span>{t("dashboard.waitingToStart")}</span>
                        </div>
                      )}

                      {room.status === "ended" && (
                        <div className="room-ended-info">
                          <div className="final-position">
                            {getRankBadge(room.yourRank)}
                            <span>
                              {t("dashboard.finalPosition")} - {room.yourPoints}{" "}
                              {t("common.points")}
                            </span>
                          </div>
                        </div>
                      )}

                      <ArrowRight className="room-arrow" size={20} />
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">
                  <Calendar size={24} />
                  {t("dashboard.upcomingMatches")}
                </h2>
              </div>

              <div className="matches-list-dash">
                {upcomingMatches.map((match) => (
                  <div
                    key={match.id}
                    className="match-item-dash"
                    onClick={() => navigate(`/room/${match.roomId}`)}
                  >
                    <div className="match-item-room">{match.roomName}</div>
                    <div className="match-item-teams">
                      <span>{match.homeTeam}</span>
                      <span className="vs-text">{t("common.vs")}</span>
                      <span>{match.awayTeam}</span>
                    </div>
                    <div className="match-item-date">
                      <Clock size={14} />
                      <span>
                        {new Date(match.date).toLocaleString("pl-PL", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {match.isPredicted ? (
                      <span className="predicted-badge">
                        <CheckCircle size={14} />
                        {t("dashboard.predicted")}
                      </span>
                    ) : (
                      <span className="not-predicted-badge">
                        <AlertCircle size={14} />
                        {t("dashboard.notPredicted")}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="dashboard-sidebar">
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">
                  <Bell size={24} />
                  {t("dashboard.notifications")}
                </h2>
              </div>

              <div className="notifications-list">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`notification-item ${notif.isNew ? "new" : ""}`}
                  >
                    {notif.isNew && <div className="notification-dot" />}
                    <p className="notification-message">{notif.message}</p>
                    <span className="notification-time">{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">
                  <Target size={24} />
                  {t("dashboard.recentResults")}
                </h2>
              </div>

              <div className="results-list">
                {recentResults.map((result) => (
                  <div key={result.id} className="result-item">
                    <div className="result-header">
                      <span className="result-room">{result.roomName}</span>
                      {getPointsBadge(result.points)}
                    </div>
                    <div className="result-match">
                      <span>
                        {result.homeTeam} {t("common.vs")} {result.awayTeam}
                      </span>
                    </div>
                    <div className="result-scores">
                      <div className="result-score">
                        <span className="score-label">
                          {t("dashboard.actualScore")}
                        </span>
                        <span className="score-value">
                          {result.actualScore.home} - {result.actualScore.away}
                        </span>
                      </div>
                      <div className="result-score">
                        <span className="score-label">
                          {t("dashboard.yourPrediction")}
                        </span>
                        <span className="score-value">
                          {result.yourPrediction.home} -{" "}
                          {result.yourPrediction.away}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
