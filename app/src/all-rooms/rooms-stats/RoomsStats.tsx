import React from "react";
import { Users, TrendingUp, Trophy, Sparkles } from "lucide-react";

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

  const stats = [
    {
      label: "Aktywne Pokoje",
      value: activeRooms,
      icon: Users,
      color: "green",
    },
    {
      label: "Otwarte do dołączenia",
      value: openRooms,
      icon: TrendingUp,
      color: "blue",
    },
    {
      label: "Łączna pula nagród",
      value: `${totalPrize.toLocaleString("pl-PL")} Monet`,
      icon: Trophy,
      color: "purple",
    },
    {
      label: "Całkowita liczba graczy",
      value: totalPlayers,
      icon: Sparkles,
      color: "orange",
    },
  ];

  return (
    <div className="stats-overview">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card-dash">
          <div className={`stat-icon-wrapper ${stat.color}`}>
            <stat.icon className="stat-icon-dash" />
          </div>
          <div className="stat-info-dash">
            <span className="stat-label-dash">{stat.label}</span>
            <span className="stat-value-dash">{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomsStats;