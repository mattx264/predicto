import React from "react";
import { Users, TrendingUp, Trophy } from "lucide-react";
import "./RoomsStats.css";

interface Room {
  id: string;
  status: "open" | "active" | "ended";
  prize: number;
  participants: number;
}

interface RoomsStatsProps {
  rooms: Room[];
}

const RoomsStats: React.FC<RoomsStatsProps> = ({ rooms }) => {
  const activeRooms = rooms.filter((r) => r.status === "active").length;
  const openRooms = rooms.filter((r) => r.status === "open").length;
  const totalPrize = rooms.reduce((sum, r) => sum + r.prize, 0);
  const totalPlayers = rooms.reduce((sum, r) => sum + r.participants, 0);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon-wrapper green">
          <Users className="stat-icon" />
        </div>
        <div className="stat-info">
          <p className="stat-label">Aktywne Pokoje</p>
          <p className="stat-value">{activeRooms}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper blue">
          <TrendingUp className="stat-icon" />
        </div>
        <div className="stat-info">
          <p className="stat-label">Otwarte do dołączenia</p>
          <p className="stat-value">{openRooms}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper purple">
          <Trophy className="stat-icon" />
        </div>
        <div className="stat-info">
          <p className="stat-label">Łączna pula nagród</p>
          <p className="stat-value">{totalPrize} PLN</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper orange">
          <Users className="stat-icon" />
        </div>
        <div className="stat-info">
          <p className="stat-label">Całkowita liczba graczy</p>
          <p className="stat-value">{totalPlayers}</p>
        </div>
      </div>
    </div>
  );
};

export default RoomsStats;
