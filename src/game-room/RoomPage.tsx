import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Users,
  Calendar,
  DollarSign,
  Share2,
  Settings,
  LogOut,
  TrendingUp,
  Target,
  MessageSquare,
  MessageCircle,
} from "lucide-react";
import "./RoomPage.css";

import RoomChat from "./chat/RoomChat";
import RoomComments from "./comments/RoomComments";
import RoomStatistics from "./room-statistics/RoomStatistics";
import RoomLeaderboard from "./leaderboard/RoomLeaderboard";
import RoomMatches from "./room-matches/RoomMatches";
import RoomInfo from "./room-info/RoomInfo";
import InviteButton from "./invite-user/InviteButton";

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

interface RoomDetails {
  id: string;
  name: string;
  creator: string;
  creatorId: string;
  participants: Participant[];
  maxParticipants: number;
  entryFee: number;
  prize: number;
  league: string;
  tournamentName: string;
  startDate: string;
  endDate: string;
  isPrivate: boolean;
  status: "open" | "active" | "ended";
  description?: string;
  rules?: string;
  inviteCode?: string;
}

const RoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("matches");

  const currentUserId = "user1";

  const roomDetails: RoomDetails = {
    id: id || "1",
    name: "Premier League Masters",
    creator: "JanKowalski",
    creatorId: "user1",
    participants: [
      {
        id: "user1",
        username: "JanKowalski",
        totalPoints: 145,
        correctPredictions: 28,
        rank: 1,
        avatar: "J",
        isPaid: true,
        joinedAt: "2024-10-26",
      },
      {
        id: "user2",
        username: "AnnaWiśniewska",
        totalPoints: 138,
        correctPredictions: 26,
        rank: 2,
        avatar: "A",
        isPaid: true,
        joinedAt: "2024-10-26",
      },
      {
        id: "user3",
        username: "PiotrNowak",
        totalPoints: 132,
        correctPredictions: 25,
        rank: 3,
        avatar: "P",
        isPaid: true,
        joinedAt: "2024-10-26",
      },
      {
        id: "user4",
        username: "MariaKowalczyk",
        totalPoints: 128,
        correctPredictions: 24,
        rank: 4,
        avatar: "M",
        isPaid: true,
        joinedAt: "2024-10-26",
      },
      {
        id: "user5",
        username: "TomaszZieliński",
        totalPoints: 125,
        correctPredictions: 23,
        rank: 5,
        avatar: "T",
        isPaid: false,
        joinedAt: "2024-10-26",
      },
    ],
    maxParticipants: 10,
    entryFee: 50,
    prize: 500,
    league: "Premier League",
    tournamentName: "Premier League 2024/25 - Kolejki 10-20",
    startDate: "2024-10-26",
    endDate: "2025-01-04",
    isPrivate: false,
    status: "active",
    description:
      "Typujemy mecze Premier League! Najlepszy typujący wygrywa całą pulę.",
    rules:
      "Punkty: Dokładny wynik = 5 pkt, Tylko wynik = 3 pkt, Błędna prognoza = 0 pkt",
    inviteCode: "PL2024-MASTER",
  };

  const matches: Match[] = [
    {
      id: "1",
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      date: "2024-10-27T15:00:00",
      status: "finished",
      actualScore: { home: 2, away: 1 },
      userPrediction: { home: 2, away: 1 },
      points: 5,
    },
    {
      id: "2",
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      date: "2024-10-28T17:30:00",
      status: "finished",
      actualScore: { home: 1, away: 1 },
      userPrediction: { home: 2, away: 1 },
      points: 0,
    },
    {
      id: "3",
      homeTeam: "Manchester United",
      awayTeam: "Tottenham",
      date: "2024-11-02T14:00:00",
      status: "live",
      actualScore: { home: 1, away: 0 },
      userPrediction: { home: 2, away: 1 },
    },
    {
      id: "4",
      homeTeam: "Newcastle",
      awayTeam: "Aston Villa",
      date: "2024-11-03T16:00:00",
      status: "upcoming",
      userPrediction: { home: 1, away: 2 },
    },
    {
      id: "5",
      homeTeam: "West Ham",
      awayTeam: "Everton",
      date: "2024-11-03T14:00:00",
      status: "upcoming",
    },
    {
      id: "6",
      homeTeam: "Brighton",
      awayTeam: "Wolves",
      date: "2024-11-09T15:00:00",
      status: "upcoming",
    },
  ];

  const isCreator = currentUserId === roomDetails.creatorId;
  const currentUser = roomDetails.participants.find(
    (p) => p.id === currentUserId
  );
  const isParticipant = !!currentUser;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <span className="my-status-badge-detail my-open">Otwarte</span>;
      case "active":
        return (
          <span className="my-status-badge-detail my-active">Aktywne</span>
        );
      case "ended":
        return (
          <span className="my-status-badge-detail my-ended">Zakończone</span>
        );
      default:
        return null;
    }
  };

  const handleLeaveRoom = () => {
    if (window.confirm("Czy na pewno chcesz opuścić ten pokój?")) {
      console.log("Leaving room", id);
      navigate("/rooms");
    }
  };

  const handleShareRoom = () => {
    const shareUrl = `${window.location.origin}/room/${id}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Link do pokoju skopiowany do schowka!");
  };

  return (
    <div className="my-room-page">
      <div className="my-room-container">
        <div className="my-room-header">
          <button
            className="my-back-btn-room"
            onClick={() => navigate("/rooms")}
          >
            <ArrowLeft className="my-back-icon" />
            <span>Powrót do pokoi</span>
          </button>

          <div className="my-room-header-content">
            <div className="my-room-header-main">
              <div className="my-room-header-left">
                <h1 className="my-room-title">{roomDetails.name}</h1>
                <div className="my-room-meta">
                  <span className="my-room-creator">
                    <Users size={16} />
                    Organizator: {roomDetails.creator}
                  </span>
                  <span className="my-room-league">
                    <Trophy size={16} />
                    {roomDetails.league}
                  </span>
                  {getStatusBadge(roomDetails.status)}
                </div>
              </div>

              <div className="my-room-header-actions">
                <InviteButton
                  roomId={roomDetails.id}
                  inviteCode={roomDetails.inviteCode}
                  roomName={roomDetails.name}
                />
                <button
                  className="my-action-btn my-share"
                  onClick={handleShareRoom}
                >
                  <Share2 size={20} />
                  <span>Udostępnij</span>
                </button>
                {isCreator && (
                  <button
                    className="my-action-btn my-settings"
                    onClick={() => alert("Ustawienia pokoju")}
                  >
                    <Settings size={20} />
                    <span>Ustawienia</span>
                  </button>
                )}
                {isParticipant && !isCreator && (
                  <button
                    className="my-action-btn my-leave"
                    onClick={handleLeaveRoom}
                  >
                    <LogOut size={20} />
                    <span>Opuść</span>
                  </button>
                )}
              </div>
            </div>

            <div className="my-room-stats">
              <div className="my-stat-card-room">
                <Users className="my-stat-icon-room" />
                <div className="my-stat-content">
                  <span className="my-stat-label">Uczestnicy</span>
                  <span className="my-stat-value">
                    {roomDetails.participants.length}/
                    {roomDetails.maxParticipants}
                  </span>
                </div>
              </div>

              <div className="my-stat-card-room">
                <Trophy className="my-stat-icon-room" />
                <div className="my-stat-content">
                  <span className="my-stat-label">Pula nagród</span>
                  <span className="my-stat-value">{roomDetails.prize} PLN</span>
                </div>
              </div>

              <div className="my-stat-card-room">
                <Calendar className="my-stat-icon-room" />
                <div className="my-stat-content">
                  <span className="my-stat-label">Termin</span>
                  <span className="my-stat-value">
                    {new Date(roomDetails.startDate).toLocaleDateString(
                      "pl-PL"
                    )}
                  </span>
                </div>
              </div>

              <div className="my-stat-card-room">
                <DollarSign className="my-stat-icon-room" />
                <div className="my-stat-content">
                  <span className="my-stat-label">Wpisowe</span>
                  <span className="my-stat-value">
                    {roomDetails.entryFee} PLN
                  </span>
                </div>
              </div>

              {currentUser && (
                <div className="my-stat-card-room my-highlight">
                  <TrendingUp className="my-stat-icon-room" />
                  <div className="my-stat-content">
                    <span className="my-stat-label">Twoje punkty</span>
                    <span className="my-stat-value">
                      {currentUser.totalPoints}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="my-room-tabs">
          <button
            className={`my-tab ${activeTab === "matches" ? "my-active" : ""}`}
            onClick={() => setActiveTab("matches")}
          >
            <Target size={20} />
            <span>Mecze ({matches.length})</span>
          </button>
          <button
            className={`my-tab ${
              activeTab === "leaderboard" ? "my-active" : ""
            }`}
            onClick={() => setActiveTab("leaderboard")}
          >
            <Trophy size={20} />
            <span>Ranking</span>
          </button>
          <button
            className={`my-tab ${activeTab === "stats" ? "my-active" : ""}`}
            onClick={() => setActiveTab("stats")}
          >
            <TrendingUp size={20} />
            <span>Statystyki</span>
          </button>
          <button
            className={`my-tab ${activeTab === "chat" ? "my-active" : ""}`}
            onClick={() => setActiveTab("chat")}
          >
            <MessageSquare size={20} />
            <span>Czat</span>
          </button>
          <button
            className={`my-tab ${activeTab === "comments" ? "my-active" : ""}`}
            onClick={() => setActiveTab("comments")}
          >
            <MessageCircle size={20} />
            <span>Komentarze</span>
          </button>
          <button
            className={`my-tab ${activeTab === "info" ? "my-active" : ""}`}
            onClick={() => setActiveTab("info")}
          >
            <Users size={20} />
            <span>Informacje</span>
          </button>
        </div>

        <div className="my-tab-content">
          {activeTab === "matches" && (
            <RoomMatches
              matches={matches}
              isParticipant={isParticipant}
              currentUserId={currentUserId}
            />
          )}

          {activeTab === "leaderboard" && (
            <RoomLeaderboard
              participants={roomDetails.participants}
              currentUserId={currentUserId}
              creatorId={roomDetails.creatorId}
            />
          )}

          {activeTab === "stats" && (
            <RoomStatistics
              currentUserId={currentUserId}
              participants={roomDetails.participants}
            />
          )}

          {activeTab === "chat" && (
            <RoomChat
              currentUserId={currentUserId}
              isCreator={isCreator}
              roomId={roomDetails.id}
            />
          )}

          {activeTab === "comments" && (
            <RoomComments
              currentUserId={currentUserId}
              isCreator={isCreator}
              roomId={roomDetails.id}
            />
          )}

          {activeTab === "info" && (
            <RoomInfo
              tournamentName={roomDetails.tournamentName}
              league={roomDetails.league}
              startDate={roomDetails.startDate}
              endDate={roomDetails.endDate}
              isPrivate={roomDetails.isPrivate}
              inviteCode={roomDetails.inviteCode}
              description={roomDetails.description}
              rules={roomDetails.rules}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
