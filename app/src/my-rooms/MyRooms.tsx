import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Users,
  Calendar,
  Clock,
  Lock,
  Globe,
  Crown,
  Loader2,
  AlertCircle,
  UserMinus,
} from "lucide-react";

import "../all-rooms/RoomsPage.css";
import type { Room } from "../types/types";
import { roomService } from "../services/signalr/room.service";

interface MyRoomsProps {
  currentUserId: string;
  rooms: Room[];
  isLoading: boolean;
  error: string | null;
}

const MyRooms: React.FC<MyRoomsProps> = ({
  currentUserId,
  rooms,
  isLoading,
  error,
}) => {
  const navigate = useNavigate();
  const [leavingRoomId, setLeavingRoomId] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <span className="status-badge open">Otwarte</span>;
      case "active":
        return <span className="status-badge active">Aktywne</span>;
      case "ended":
        return <span className="status-badge ended">Zakończone</span>;
      default:
        return null;
    }
  };

  const handleRoomClick = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  const isCreator = (room: Room) => {
    return room.creator === currentUserId;
  };

  const handleLeaveRoom = async (e: React.MouseEvent, roomId: string) => {
    e.stopPropagation();

    const confirmed = window.confirm("Czy na pewno chcesz opuścić ten pokój?");
    if (!confirmed) return;

    setLeavingRoomId(roomId);

    try {
      const result = await roomService.leaveRoom(Number(roomId));
      alert(result.message);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Nie udało się opuścić pokoju";
      alert(errorMessage);
      console.error("❌ Błąd podczas opuszczania pokoju:", err);
    } finally {
      setLeavingRoomId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-state">
        <Loader2 className="spinner" size={48} />
        <p>Ładowanie twoich pokoi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <AlertCircle size={48} />
        <h3>Błąd podczas ładowania pokoi</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="no-results">
        <Trophy className="no-results-icon" />
        <h3>Nie uczestniczysz w żadnych pokojach</h3>
        <p>Dołącz do pokoju lub stwórz własny, aby zacząć typować!</p>
      </div>
    );
  }

  return (
    <div className="rooms-grid">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`room-card ${room.status}`}
          onClick={() => handleRoomClick(room.id)}
        >
          <div className="room-card-header">
            <div className="room-title-row">
              <h3 className="room-name">{room.name}</h3>
              {room.isPrivate ? (
                <Lock className="privacy-icon" size={18} />
              ) : (
                <Globe className="privacy-icon" size={18} />
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {isCreator(room) && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "0.25rem 0.5rem",
                    background: "rgba(251, 191, 36, 0.2)",
                    border: "1px solid rgba(251, 191, 36, 0.3)",
                    borderRadius: "6px",
                    color: "#fbbf24",
                    fontSize: "0.7rem",
                    fontWeight: "700",
                    textTransform: "uppercase",
                  }}
                >
                  <Crown size={12} />
                  Twój pokój
                </span>
              )}
              {getStatusBadge(room.status)}
            </div>
          </div>

          <div className="league-badge">
            <Trophy size={14} />
            <span>{room.league}</span>
          </div>

          <div className="room-info-grid">
            <div className="info-item">
              <Users className="info-icon" size={16} />
              <span className="info-text">
                {room.participants}/{room.maxParticipants} graczy
              </span>
            </div>

            <div className="info-item">
              <Calendar className="info-icon" size={16} />
              <span className="info-text">
                {new Date(room.startDate).toLocaleDateString("pl-PL")}
              </span>
            </div>

            <div className="info-item">
              <Clock className="info-icon" size={16} />
              <span className="info-text">
                Do {new Date(room.endDate).toLocaleDateString("pl-PL")}
              </span>
            </div>
          </div>

          <div className="room-creator">
            <div className="creator-avatar">
              {room.creator?.charAt(0).toUpperCase() || "?"}
            </div>
            <span className="creator-name">
              Organizator: {room.creator || "Unknown"}
            </span>
          </div>

          <div className="room-card-footer">
            <div className="fee-info">
              <span className="fee-label">Wpisowe:</span>
              <span className="fee-value">{room.entryFee} PLN</span>
            </div>
            <div className="prize-info">
              <Trophy className="prize-icon" size={16} />
              <span className="prize-value">{room.prize} PLN</span>
            </div>
          </div>

          <div className="participants-progress">
            <div
              className="progress-fill"
              style={{
                width: `${(room.participants / room.maxParticipants) * 100}%`,
              }}
            />
          </div>

          {!isCreator(room) && room.status === "open" && (
            <button
              className="leave-room-button"
              onClick={(e) => handleLeaveRoom(e, room.id)}
              disabled={leavingRoomId === room.id}
            >
              {leavingRoomId === room.id ? (
                <>
                  <Loader2 className="spinner-small" size={16} />
                  Opuszczanie...
                </>
              ) : (
                <>
                  <UserMinus size={16} />
                  Opuść pokój
                </>
              )}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyRooms;
