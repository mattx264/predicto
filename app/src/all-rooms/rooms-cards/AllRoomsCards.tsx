import React, { useState } from "react";
import {
  Users,
  Trophy,
  Calendar,
  Lock,
  Globe,
  Clock,
  UserPlus,
  Loader2,
  CheckCircle,
} from "lucide-react";
import "./AllRoomsCards.css";
import { roomService } from "../../services/signalr/room.service";

interface Room {
  id: string;
  name: string;
  creator: string;
  participants: number;
  maxParticipants: number;
  entryFee: number;
  prize: number;
  league: string;
  startDate: string;
  endDate: string;
  isPrivate: boolean;
  status: "open" | "active" | "ended";
  isUserInRoom?: boolean;
}

interface AllRoomsCardsProps {
  rooms: Room[];
  onRoomClick: (roomId: string) => void;
}

const AllRoomsCards: React.FC<AllRoomsCardsProps> = ({
  rooms,
  onRoomClick,
}) => {
  const [joiningRoomId, setJoiningRoomId] = useState<string | null>(null);

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

  const handleJoinRoom = async (e: React.MouseEvent, room: Room) => {
    e.stopPropagation();

    if (!roomService.isAuthenticated()) {
      alert("Musisz być zalogowany, aby dołączyć do pokoju");
      return;
    }

    if (room.entryFee > 0) {
      onRoomClick(room.id);
      return;
    }

    setJoiningRoomId(room.id);

    try {
      const result = await roomService.joinRoom(Number(room.id));
      alert(result.message);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Nie udało się dołączyć do pokoju";
      alert(errorMessage);
      console.error("❌ Błąd podczas dołączania:", err);
    } finally {
      setJoiningRoomId(null);
    }
  };

  const getCreatorAvatar = (creator: string | null | undefined) => {
    if (!creator || creator.trim() === "") {
      return "?";
    }
    return creator.charAt(0).toUpperCase();
  };

  const getCreatorName = (creator: string | null | undefined) => {
    if (!creator || creator.trim() === "") {
      return "Nieznany";
    }
    return creator;
  };

  if (rooms.length === 0) {
    return (
      <div className="no-results">
        <Trophy className="no-results-icon" />
        <h3>Nie znaleziono pokoi</h3>
        <p>Spróbuj zmienić kryteria wyszukiwania lub stwórz nowy pokój</p>
      </div>
    );
  }

  return (
    <div className="rooms-grid">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`room-card ${room.status}`}
          onClick={() => onRoomClick(room.id)}
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
            {getStatusBadge(room.status)}
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
              {getCreatorAvatar(room.creator)}
            </div>
            <span className="creator-name">
              Organizator: {getCreatorName(room.creator)}
            </span>
          </div>

          <div className="room-card-footer">
            <div className="fee-info">
              <span className="fee-label">Wpisowe:</span>
              <span className="fee-value">{room.entryFee} Monet</span>
            </div>
            <div className="prize-info">
              <Trophy className="prize-icon" size={16} />
              <span className="prize-value">{room.prize} Monet</span>
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

          {room.status === "open" && !room.isUserInRoom && (
            <button
              className="join-room-button"
              onClick={(e) => handleJoinRoom(e, room)}
              disabled={
                joiningRoomId === room.id ||
                room.participants >= room.maxParticipants
              }
            >
              {joiningRoomId === room.id ? (
                <>
                  <Loader2 className="spinner-small" size={16} />
                  Dołączanie...
                </>
              ) : room.participants >= room.maxParticipants ? (
                "Pełny"
              ) : (
                <>
                  <UserPlus size={16} />
                  {room.entryFee > 0
                    ? `Dołącz (${room.entryFee} Monet)`
                    : "Dołącz za darmo"}
                </>
              )}
            </button>
          )}


          {room.isUserInRoom && (
            <div className="already-joined-badge">
              <CheckCircle size={16} />
              Już należysz do tego pokoju
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllRoomsCards;
