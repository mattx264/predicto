import React, { useState, useEffect, useRef } from "react";
import { X, Send, Clock, Users, MessageSquare } from "lucide-react";
import "./MatchLiveModal.css";
import { useChat } from "../../hooks/useChat";

export interface Match {
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
    home?: number;
    away?: number;
    winner?: "home" | "draw" | "away";
    joker?: boolean;
  };
  points?: number;
}

interface MatchLiveModalProps {
  match: Match;
  currentUserId: string;
  onClose: () => void;
}

const MatchLiveModal: React.FC<MatchLiveModalProps> = ({
  match,
  currentUserId,
  onClose,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const { messages, onlineUsers, sendMessage } = useChat({
    id: match.id,
    type: "match",
    name: `${match.homeTeam} vs ${match.awayTeam}`,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    sendMessage(newMessage, currentUserId, "Ty");
    setNewMessage("");

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="match-live-overlay" onClick={onClose}>
      <div className="match-live-modal" onClick={(e) => e.stopPropagation()}>
        <div className="match-live-header">
          <div className="header-left">
            <h2 className="match-live-title">Mecz na żywo</h2>
            {match.status === "live" && (
              <span className="live-pulse">
                <span className="pulse-dot"></span>
                LIVE
              </span>
            )}
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div
          className={`match-live-content ${
            isChatExpanded ? "chat-expanded" : ""
          }`}
        >
          <div className="match-info-section">
            <div className="match-score-board">
              <div className="team-score-column">
                <div className="team-name-large">{match.homeTeam}</div>
                {match.actualScore && (
                  <div className="score-large">{match.actualScore.home}</div>
                )}
              </div>

              <div className="score-divider">
                {match.status === "live" && (
                  <>
                    <Clock size={20} />
                    <span className="match-time">67'</span>
                  </>
                )}
                {match.status !== "live" && (
                  <span className="match-time">VS</span>
                )}
              </div>

              <div className="team-score-column">
                <div className="team-name-large">{match.awayTeam}</div>
                {match.actualScore && (
                  <div className="score-large">{match.actualScore.away}</div>
                )}
              </div>
            </div>

            <div className="match-details">
              <div className="detail-item">
                <Clock size={16} />
                <span>
                  {new Date(match.date).toLocaleString("pl-PL", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {match.userPrediction && (
                <div className="detail-item prediction-info">
                  <span className="prediction-label">Twój typ:</span>
                  <span className="prediction-value">
                    {match.userPrediction.home} - {match.userPrediction.away}
                  </span>
                </div>
              )}
            </div>

            <div className="match-stats">
              <h3>Statystyki</h3>
              <div className="stat-row">
                <span className="stat-value">58%</span>
                <span className="stat-label">Posiadanie piłki</span>
                <span className="stat-value">42%</span>
              </div>
              <div className="stat-row">
                <span className="stat-value">12</span>
                <span className="stat-label">Strzały</span>
                <span className="stat-value">8</span>
              </div>
              <div className="stat-row">
                <span className="stat-value">5</span>
                <span className="stat-label">Strzały celne</span>
                <span className="stat-value">3</span>
              </div>
            </div>
          </div>

          <button
            className="chat-toggle-btn"
            onClick={() => setIsChatExpanded(!isChatExpanded)}
          >
            <MessageSquare size={20} />
            <span>{isChatExpanded ? "Ukryj czat" : "Pokaż czat na żywo"}</span>
            <div className="online-users-badge">
              <Users size={14} />
              <span>{onlineUsers}</span>
            </div>
          </button>

          <div className="match-chat-section">
            <div className="chat-header">
              <MessageSquare size={20} />
              <span>Chat na żywo</span>
              <div className="online-users">
                <Users size={16} />
                <span>{onlineUsers}</span>
              </div>
            </div>

            <div className="chat-input-wrapper chat-input-top">
              <input
                type="text"
                className="chat-input"
                placeholder="Napisz komentarz..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="send-button"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send size={20} />
              </button>
            </div>

            <div className="chat-messages">
              {messages.length === 0 ? (
                <div className="chat-empty-state">
                  <p>Brak komentarzy. Bądź pierwszy! ⚽</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`chat-message ${
                      msg.userId === currentUserId ? "own-message" : ""
                    }`}
                  >
                    <div className="message-avatar">{msg.avatar}</div>
                    <div className="message-content">
                      <div className="message-header">
                        <span className="message-username">{msg.username}</span>
                        <span className="message-time">
                          {new Date(msg.timestamp).toLocaleTimeString("pl-PL", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="message-text">{msg.content}</div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-wrapper chat-input-bottom">
              <input
                type="text"
                className="chat-input"
                placeholder="Napisz komentarz do meczu..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="send-button"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchLiveModal;
