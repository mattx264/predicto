import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Users,
  Calendar,
  DollarSign,
  Share2,
  Settings,
  LogOut,
  Crown,
} from "lucide-react";
import InviteButton from "../invite-user/InviteButton";
import type { Room } from "../../types/types";

import "./animated-ticker/AnimatedTicker.css";
import "./roomheader.css";
import AnimatedTicker from "./animated-ticker/AnimatedTicker";
import AnimatedNumber from "./animated-number/AnimatedNumber";

interface RoomHeaderProps {
  room: Room;
  currentUserId: string;
  connectionStatus:
  | "connected"
  | "connecting"
  | "error"
  | "disconnected"
  | "reconnecting";
  onLeaveRoom: () => void;
  onShareRoom: () => void;
  onSettings: () => void;
}

const RoomHeader: React.FC<RoomHeaderProps> = ({
  room,
  currentUserId,
  onLeaveRoom,
  onShareRoom,
  onSettings,
}) => {
  const navigate = useNavigate();
  const isCreator = currentUserId === room.creator;
  const isParticipant = true;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <span className="my-status-badge-detail my-open">Otwarte</span>;
      case "active":
        return <span className="my-status-badge-detail my-active">Aktywne</span>;
      case "ended":
        return <span className="my-status-badge-detail my-ended">Zakończone</span>;
      default:
        return null;
    }
  };

  return (
    <div className="my-room-header">
      <button className="my-back-btn-room" onClick={() => navigate("/rooms")}>
        <ArrowLeft className="my-back-icon" size={20} />
        <span>Powrót do pokoi</span>
      </button>

      <div className="my-room-header-content">
        <div className="my-room-header-main">
          <div className="my-room-header-left">
            <h1 className="my-room-title">{room.name}</h1>
            <div className="my-room-meta">
              <span className="my-room-creator">
                <Crown size={18} />
                Organizator: <span className="highlight-text">{room.creator}</span>
              </span>
              <span className="my-room-league">
                <Trophy size={18} />
                {room.league}
              </span>
              {getStatusBadge(room.status)}
            </div>
          </div>

          <div className="my-room-header-actions">
            <InviteButton
              roomId={room.id}
              inviteCode="MOCK-CODE"
              roomName={room.name}
            />
            <button className="my-action-btn my-share" onClick={onShareRoom}>
              <Share2 size={20} />
              <span>Udostępnij</span>
            </button>
            {isCreator && (
              <button
                className="my-action-btn my-settings"
                onClick={onSettings}
              >
                <Settings size={20} />
                <span>Ustawienia</span>
              </button>
            )}
            {isParticipant && !isCreator && (
              <button className="my-action-btn my-leave" onClick={onLeaveRoom}>
                <LogOut size={20} />
                <span>Opuść</span>
              </button>
            )}
          </div>
        </div>

        <div className="my-room-stats">
          <div className="my-stat-card-room stat-blue">
            <div className="icon-wrapper">
              <Users className="my-stat-icon-room" size={24} />
            </div>
            <div className="my-stat-content">
              <span className="my-stat-label">Uczestnicy</span>
              <span className="my-stat-value">
                <span className="ticker-flex">
                  <AnimatedTicker
                    value={room.participants}
                    digits={2}
                    duration="0.8s"
                  />
                  <span className="separator">/</span>
                  {room.maxParticipants}
                </span>
              </span>
            </div>
          </div>

          <div className="my-stat-card-room stat-gold">
            <div className="icon-wrapper">
              <Trophy className="my-stat-icon-room" size={24} />
            </div>
            <div className="my-stat-content">
              <span className="my-stat-label">Pula nagród</span>
              <span className="my-stat-value gold-text">
                <AnimatedNumber value={room.prize} duration={500} />
                <span className="unit">Monet</span>
              </span>
            </div>
          </div>

          <div className="my-stat-card-room stat-green">
            <div className="icon-wrapper">
              <Calendar className="my-stat-icon-room" size={24} />
            </div>
            <div className="my-stat-content">
              <span className="my-stat-label">Start</span>
              <span className="my-stat-value">
                {new Date(room.startDate).toLocaleDateString("pl-PL")}
              </span>
            </div>
          </div>

          <div className="my-stat-card-room stat-purple">
            <div className="icon-wrapper">
              <DollarSign className="my-stat-icon-room" size={24} />
            </div>
            <div className="my-stat-content">
              <span className="my-stat-label">Wpisowe</span>
              <span className="my-stat-value">
                {room.entryFee} <span className="unit">Monet</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomHeader;