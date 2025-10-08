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
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import "./RoomPage.css";

import RoomChat from "./chat/RoomChat";
import RoomComments from "./comments/RoomComments";
import RoomStatistics from "./room-statistics/RoomStatistics";
import RoomLeaderboard from "./leaderboard/RoomLeaderboard";
import RoomMatches from "./room-matches/RoomMatches";
import RoomInfo from "./room-info/RoomInfo";
import InviteButton from "./invite-user/InviteButton";

import { useRoom } from "../hooks/useRoom";
import type { Match, Participant } from "../types/room.types";

const RoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("matches");

  const currentUserId = "user1";

  const { room, isLoading, error, connectionStatus, refetch } = useRoom(
    id || ""
  );

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
  ];

  const mockMatches: Match[] = [
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
                {/* ✅ Przycisk odświeżania */}
                <button
                  className="my-action-btn my-refresh"
                  onClick={refetch}
                  disabled={isLoading}
                  title="Odśwież dane pokoju"
                >
                  <RefreshCw
                    size={20}
                    className={isLoading ? "spinning" : ""}
                  />
                </button>

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

        <div className="my-room-tabs">
          <button
            className={`my-tab ${activeTab === "matches" ? "my-active" : ""}`}
            onClick={() => setActiveTab("matches")}
          >
            <Target size={20} />
            <span>Mecze ({mockMatches.length})</span>
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
