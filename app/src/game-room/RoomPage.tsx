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
  AlertCircle,
  BarChart3,
} from "lucide-react";
import "./RoomPage.css";

import RoomChat from "./chat/RoomChat";
import RoomComments from "./comments/RoomComments";
import RoomStatistics from "./room-statistics/RoomStatistics";
import RoomLeaderboard from "./leaderboard/RoomLeaderboard";
import RoomMatches from "./room-matches/RoomMatches";
import RoomInfo from "./room-info/RoomInfo";
import InviteButton from "./invite-user/InviteButton";
import LeagueTable from "./league-table/LeagueTable";

import { useRoom } from "../hooks/useRoom";
import type { Match, Participant } from "../types/room.types";

const RoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("matches");

  const currentUserId = "user1";

  const { room, isLoading, error, connectionStatus } = useRoom(id || "");

  const mockParticipants: Participant[] = [
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
      username: "JanKowalski",
      totalPoints: 144,
      correctPredictions: 28,
      rank: 2,
      avatar: "J",
      isPaid: true,
      joinedAt: "2024-10-26",
    },
    {
      id: "user3",
      username: "JanKowalski",
      totalPoints: 143,
      correctPredictions: 28,
      rank: 3,
      avatar: "J",
      isPaid: true,
      joinedAt: "2024-10-26",
    },
    {
      id: "user4",
      username: "JanKowalski",
      totalPoints: 142,
      correctPredictions: 28,
      rank: 4,
      avatar: "J",
      isPaid: true,
      joinedAt: "2024-10-26",
    },
    {
      id: "user5",
      username: "JanKowalski",
      totalPoints: 141,
      correctPredictions: 28,
      rank: 5,
      avatar: "J",
      isPaid: true,
      joinedAt: "2024-10-26",
    },
    {
      id: "user6",
      username: "JanKowalski",
      totalPoints: 135,
      correctPredictions: 28,
      rank: 6,
      avatar: "J",
      isPaid: true,
      joinedAt: "2024-10-26",
    },
    {
      id: "user7",
      username: "JanKowalski",
      totalPoints: 125,
      correctPredictions: 28,
      rank: 7,
      avatar: "J",
      isPaid: true,
      joinedAt: "2024-10-26",
    },
  ];

  const mockMatches: Match[] = [
    {
      id: "1",
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      date: "2024-10-27T15:00:00",
      status: "live",
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
      actualScore: { home: 3, away: 2 },
      userPrediction: { home: 3, away: 2 },
      points: 5,
    },
    {
      id: "3",
      homeTeam: "Tottenham",
      awayTeam: "Liverpool",
      date: "2024-10-29T20:00:00",
      status: "upcoming",
      userPrediction: { home: 1, away: 1 },
    },
    {
      id: "4",
      homeTeam: "Newcastle",
      awayTeam: "Aston Villa",
      date: "2024-10-30T18:00:00",
      status: "finished",
      actualScore: { home: 0, away: 0 },
      userPrediction: { home: 1, away: 0 },
      points: 2,
    },
  ];

  const mockTeams = [
    {
      id: "1",
      position: 1,
      teamName: "Manchester City",
      matchesPlayed: 10,
      wins: 8,
      draws: 1,
      losses: 1,
      goalsFor: 28,
      goalsAgainst: 10,
      goalDifference: 18,
      points: 25,
      lastFiveMatches: ["W", "W", "W", "D", "W"] as ("W" | "D" | "L")[],
    },
    {
      id: "2",
      position: 2,
      teamName: "Real Madrid",
      matchesPlayed: 10,
      wins: 7,
      draws: 2,
      losses: 1,
      goalsFor: 24,
      goalsAgainst: 12,
      goalDifference: 12,
      points: 23,
      lastFiveMatches: ["W", "D", "W", "W", "L"] as ("W" | "D" | "L")[],
    },
    {
      id: "3",
      position: 3,
      teamName: "Bayern Munich",
      matchesPlayed: 10,
      wins: 7,
      draws: 1,
      losses: 2,
      goalsFor: 26,
      goalsAgainst: 14,
      goalDifference: 12,
      points: 22,
      lastFiveMatches: ["W", "W", "L", "W", "W"] as ("W" | "D" | "L")[],
    },
    {
      id: "4",
      position: 4,
      teamName: "Liverpool",
      matchesPlayed: 10,
      wins: 6,
      draws: 3,
      losses: 1,
      goalsFor: 22,
      goalsAgainst: 11,
      goalDifference: 11,
      points: 21,
      lastFiveMatches: ["D", "W", "W", "D", "W"] as ("W" | "D" | "L")[],
    },
    {
      id: "5",
      position: 5,
      teamName: "PSG",
      matchesPlayed: 10,
      wins: 6,
      draws: 2,
      losses: 2,
      goalsFor: 20,
      goalsAgainst: 13,
      goalDifference: 7,
      points: 20,
      lastFiveMatches: ["W", "L", "W", "D", "W"] as ("W" | "D" | "L")[],
    },
    {
      id: "6",
      position: 6,
      teamName: "Barcelona",
      matchesPlayed: 10,
      wins: 5,
      draws: 3,
      losses: 2,
      goalsFor: 19,
      goalsAgainst: 14,
      goalDifference: 5,
      points: 18,
      lastFiveMatches: ["D", "W", "L", "W", "D"] as ("W" | "D" | "L")[],
    },
    {
      id: "7",
      position: 7,
      teamName: "Inter Milan",
      matchesPlayed: 10,
      wins: 5,
      draws: 2,
      losses: 3,
      goalsFor: 17,
      goalsAgainst: 15,
      goalDifference: 2,
      points: 17,
      lastFiveMatches: ["L", "W", "W", "D", "L"] as ("W" | "D" | "L")[],
    },
    {
      id: "8",
      position: 8,
      teamName: "Juventus",
      matchesPlayed: 10,
      wins: 4,
      draws: 4,
      losses: 2,
      goalsFor: 16,
      goalsAgainst: 14,
      goalDifference: 2,
      points: 16,
      lastFiveMatches: ["D", "D", "W", "L", "W"] as ("W" | "D" | "L")[],
    },
    {
      id: "9",
      position: 9,
      teamName: "Arsenal",
      matchesPlayed: 10,
      wins: 4,
      draws: 3,
      losses: 3,
      goalsFor: 15,
      goalsAgainst: 14,
      goalDifference: 1,
      points: 15,
      lastFiveMatches: ["L", "D", "W", "W", "D"] as ("W" | "D" | "L")[],
    },
    {
      id: "10",
      position: 10,
      teamName: "Atletico Madrid",
      matchesPlayed: 10,
      wins: 4,
      draws: 3,
      losses: 3,
      goalsFor: 14,
      goalsAgainst: 13,
      goalDifference: 1,
      points: 15,
      lastFiveMatches: ["W", "L", "D", "W", "L"] as ("W" | "D" | "L")[],
    },
    {
      id: "11",
      position: 11,
      teamName: "AC Milan",
      matchesPlayed: 10,
      wins: 4,
      draws: 2,
      losses: 4,
      goalsFor: 13,
      goalsAgainst: 15,
      goalDifference: -2,
      points: 14,
      lastFiveMatches: ["L", "W", "L", "D", "W"] as ("W" | "D" | "L")[],
    },
    {
      id: "12",
      position: 12,
      teamName: "Borussia Dortmund",
      matchesPlayed: 10,
      wins: 3,
      draws: 4,
      losses: 3,
      goalsFor: 14,
      goalsAgainst: 16,
      goalDifference: -2,
      points: 13,
      lastFiveMatches: ["D", "L", "D", "W", "L"] as ("W" | "D" | "L")[],
    },
    {
      id: "13",
      position: 13,
      teamName: "Chelsea",
      matchesPlayed: 10,
      wins: 3,
      draws: 3,
      losses: 4,
      goalsFor: 12,
      goalsAgainst: 16,
      goalDifference: -4,
      points: 12,
      lastFiveMatches: ["L", "D", "L", "W", "D"] as ("W" | "D" | "L")[],
    },
    {
      id: "14",
      position: 14,
      teamName: "Napoli",
      matchesPlayed: 10,
      wins: 3,
      draws: 2,
      losses: 5,
      goalsFor: 11,
      goalsAgainst: 17,
      goalDifference: -6,
      points: 11,
      lastFiveMatches: ["L", "L", "W", "D", "L"] as ("W" | "D" | "L")[],
    },
    {
      id: "15",
      position: 15,
      teamName: "RB Leipzig",
      matchesPlayed: 10,
      wins: 2,
      draws: 4,
      losses: 4,
      goalsFor: 10,
      goalsAgainst: 16,
      goalDifference: -6,
      points: 10,
      lastFiveMatches: ["D", "L", "D", "L", "W"] as ("W" | "D" | "L")[],
    },
    {
      id: "16",
      position: 16,
      teamName: "Benfica",
      matchesPlayed: 10,
      wins: 2,
      draws: 3,
      losses: 5,
      goalsFor: 9,
      goalsAgainst: 18,
      goalDifference: -9,
      points: 9,
      lastFiveMatches: ["L", "D", "L", "W", "L"] as ("W" | "D" | "L")[],
    },
  ];

  const displayRoom = error ? null : room;

  const isCreator = currentUserId === displayRoom?.creator;
  const isParticipant = true;

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

  const getConnectionStatusBadge = () => {
    switch (connectionStatus) {
      case "connected":
        return (
          <span className="connection-status connected">🟢 Połączono</span>
        );
      case "connecting":
        return (
          <span className="connection-status connecting">🟡 Łączenie...</span>
        );
      case "error":
        return (
          <span className="connection-status error">🔴 Błąd połączenia</span>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="my-room-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Ładowanie pokoju...</p>
        </div>
      </div>
    );
  }

  if (error || !displayRoom) {
    return (
      <div className="my-room-page">
        <div className="error-state">
          <AlertCircle size={48} />
          <h2>Nie można załadować pokoju</h2>
          <p>{error || "Pokój nie został znaleziony"}</p>
          <button onClick={() => navigate("/rooms")} className="btn-primary">
            Powrót do listy pokoi
          </button>
        </div>
      </div>
    );
  }

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
                <h1 className="my-room-title">{displayRoom.name}</h1>
                <div className="my-room-meta">
                  <span className="my-room-creator">
                    <Users size={16} />
                    Organizator: {displayRoom.creator}
                  </span>
                  <span className="my-room-league">
                    <Trophy size={16} />
                    {displayRoom.league}
                  </span>
                  {getStatusBadge(displayRoom.status)}
                  {getConnectionStatusBadge()}
                </div>
              </div>

              <div className="my-room-header-actions">
                <InviteButton
                  roomId={displayRoom.id}
                  inviteCode="MOCK-CODE"
                  roomName={displayRoom.name}
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
                    {displayRoom.participants}/{displayRoom.maxParticipants}
                  </span>
                </div>
              </div>

              <div className="my-stat-card-room">
                <Trophy className="my-stat-icon-room" />
                <div className="my-stat-content">
                  <span className="my-stat-label">Pula nagród</span>
                  <span className="my-stat-value">{displayRoom.prize} PLN</span>
                </div>
              </div>

              <div className="my-stat-card-room">
                <Calendar className="my-stat-icon-room" />
                <div className="my-stat-content">
                  <span className="my-stat-label">Termin</span>
                  <span className="my-stat-value">
                    {new Date(displayRoom.startDate).toLocaleDateString(
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
                    {displayRoom.entryFee} PLN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ ZAKTUALIZOWANE ZAKŁADKI - dodana "Tabela" */}
        <div className="my-room-tabs">
          <button
            className={`my-tab ${activeTab === "matches" ? "my-active" : ""}`}
            onClick={() => setActiveTab("matches")}
          >
            <Target size={20} />
            <span>Mecze ({mockMatches.length})</span>
          </button>

          {/* ✅ NOWA ZAKŁADKA */}
          <button
            className={`my-tab ${activeTab === "table" ? "my-active" : ""}`}
            onClick={() => setActiveTab("table")}
          >
            <BarChart3 size={20} />
            <span>Tabela</span>
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
              matches={mockMatches}
              isParticipant={isParticipant}
              currentUserId={currentUserId}
            />
          )}

          {activeTab === "table" && (
            <LeagueTable teams={mockTeams} highlightedTeams={[]} />
          )}

          {activeTab === "leaderboard" && (
            <RoomLeaderboard
              participants={mockParticipants}
              currentUserId={currentUserId}
              creatorId={displayRoom.creator}
            />
          )}

          {activeTab === "stats" && (
            <RoomStatistics
              currentUserId={currentUserId}
              participants={mockParticipants}
            />
          )}

          {activeTab === "chat" && (
            <RoomChat
              currentUserId={currentUserId}
              isCreator={isCreator}
              roomId={displayRoom.id}
            />
          )}

          {activeTab === "comments" && (
            <RoomComments
              currentUserId={currentUserId}
              isCreator={isCreator}
              roomId={displayRoom.id}
            />
          )}

          {activeTab === "info" && (
            <RoomInfo
              tournamentName={displayRoom.league}
              league={displayRoom.league}
              startDate={displayRoom.startDate}
              endDate={displayRoom.endDate}
              isPrivate={displayRoom.isPrivate}
              inviteCode="MOCK-CODE"
              description="Mock description"
              rules="Mock rules"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
