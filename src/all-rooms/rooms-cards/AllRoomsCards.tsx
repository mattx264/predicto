import React from "react";
import { Users, Trophy, Calendar, Lock, Globe, Clock } from "lucide-react";
import "./AllRoomsCards.css";

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

interface AllRoomsCardsProps {
  rooms: Room[];
  onRoomClick: (roomId: string) => void;
}

const AllRoomsCards: React.FC<AllRoomsCardsProps> = ({
  rooms,
  onRoomClick,
}) => {
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
       }
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

export default AllRoomsCards;
