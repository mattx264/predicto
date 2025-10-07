import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Users,
  Calendar,
  Clock,
  Lock,
  Globe,
  Crown,
} from "lucide-react";
import "../all-rooms/RoomsPage.css";

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
}

interface MyRoomsProps {
  currentUserId: string;
}

const MyRooms: React.FC<MyRoomsProps> = () => {
  const navigate = useNavigate();

  const myRooms: Room[] = [
    {
      id: "1",
      name: "Premier League Masters",
      creator: "JanKowalski",
      participants: 8,
      maxParticipants: 10,
      entryFee: 50,
      prize: 500,
      league: "Premier League",
      startDate: "2025-10-05",
      endDate: "2025-11-30",
      isPrivate: false,
      status: "active",
    },
    {
      id: "3",
      name: "Prywatna Liga Znajomych",
      creator: "AnnaWiśniewska",
      participants: 6,
      maxParticipants: 8,
      entryFee: 25,
      prize: 200,
      league: "La Liga",
      startDate: "2025-10-01",
      endDate: "2025-10-31",
      isPrivate: true,
      status: "active",
    },
    {
      id: "4",
      name: "Bundesliga Pro",
      creator: "MarcinKowalczyk",
      participants: 10,
      maxParticipants: 10,
      entryFee: 75,
      prize: 750,
      league: "Bundesliga",
      startDate: "2025-09-01",
      endDate: "2025-09-30",
      isPrivate: false,
      status: "ended",
    },
  ];

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
    return room.creator === "JanKowalski";
  };

  if (myRooms.length === 0) {
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
      {myRooms.map((room) => (
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
              {room.creator.charAt(0).toUpperCase()}
            </div>
            <span className="creator-name">Organizator: {room.creator}</span>
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
        </div>
      ))}
    </div>
  );
};

export default MyRooms;
