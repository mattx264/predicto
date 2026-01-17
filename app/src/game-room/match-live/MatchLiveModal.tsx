import React, { useState, useEffect, useRef } from "react";
import { X, Send, Clock, Users, MessageSquare, BarChart2 } from "lucide-react";
import "./MatchLiveModal.css";
import { useChat } from "../../hooks/useChat";
import type { Match } from "../../types/types";

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
  const [activeTab, setActiveTab] = useState<'info' | 'chat'>('info');

  const { messages, onlineUsers, sendMessage } = useChat({
    id: match.id,
    type: "match",
    name: `${match.homeTeam} vs ${match.awayTeam}`,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, activeTab]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage, currentUserId, "Ty");
    setNewMessage("");
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
            <div className="live-indicator-badge">
              <span className="pulse-dot"></span>
              LIVE
            </div>
            <span className="match-time-badge">
              <Clock size={14} /> 67'
            </span>
          </div>

          <h2 className="header-title-mobile">Centrum Meczu</h2>

          <div className="header-right">
            <div className="online-badge" title="Użytkownicy online">
              <Users size={16} />
              <span>{onlineUsers}</span>
            </div>
            <button className="close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="match-live-content">
          <div className={`match-info-section ${activeTab === 'chat' ? 'mobile-hidden' : ''}`}>

            <div className="scoreboard-card">
              <div className="team-column home">
                {match.homeTeamLogo ? (
                  <img
                    src={match.homeTeamLogo}
                    alt={match.homeTeam}
                    className="team-logo-img"
                  />
                ) : (
                  <div className="team-logo-box">{match.homeTeam[0]}</div>
                )}
              </div>

              <div className="score-column">
                <div className="score-display">
                  <span className="score-val">{match.actualScore?.home ?? 0}</span>
                  <span className="score-sep">:</span>
                  <span className="score-val">{match.actualScore?.away ?? 0}</span>
                </div>
              </div>

              <div className="team-column away">
                {match.awayTeamLogo ? (
                  <img
                    src={match.awayTeamLogo}
                    alt={match.awayTeam}
                    className="team-logo-img"
                  />
                ) : (
                  <div className="team-logo-box">{match.awayTeam[0]}</div>
                )}
              </div>
            </div>

            <div className="stats-card">
              <div className="card-header">
                <BarChart2 size={18} />
                <span>Statystyki meczu</span>
              </div>

              <div className="stat-row">
                <span className="stat-name">Posiadanie piłki</span>
                <div className="stat-bar-group">
                  <span className="val-left">58%</span>
                  <div className="progress-bar">
                    <div className="fill home" style={{ width: '58%' }}></div>
                  </div>
                  <span className="val-right">42%</span>
                </div>
              </div>

              <div className="stat-row">
                <span className="stat-name">Strzały</span>
                <div className="stat-nums">
                  <span className="val-left">12</span>
                  <span className="val-divider">-</span>
                  <span className="val-right">8</span>
                </div>
              </div>

              <div className="stat-row">
                <span className="stat-name">Strzały celne</span>
                <div className="stat-nums">
                  <span className="val-left">7</span>
                  <span className="val-divider">-</span>
                  <span className="val-right">4</span>
                </div>
              </div>

              <div className="stat-row">
                <span className="stat-name">Rzuty rożne</span>
                <div className="stat-nums">
                  <span className="val-left">6</span>
                  <span className="val-divider">-</span>
                  <span className="val-right">3</span>
                </div>
              </div>

              <div className="stat-row">
                <span className="stat-name">Faule</span>
                <div className="stat-nums">
                  <span className="val-left">9</span>
                  <span className="val-divider">-</span>
                  <span className="val-right">11</span>
                </div>
              </div>

              <div className="stat-row">
                <span className="stat-name">Żółte kartki</span>
                <div className="stat-nums">
                  <span className="val-left yellow-card">2</span>
                  <span className="val-divider">-</span>
                  <span className="val-right yellow-card">3</span>
                </div>
              </div>

              <div className="stat-row">
                <span className="stat-name">Podania</span>
                <div className="stat-nums">
                  <span className="val-left">412</span>
                  <span className="val-divider">-</span>
                  <span className="val-right">368</span>
                </div>
              </div>

              <div className="stat-row">
                <span className="stat-name">Celność podań</span>
                <div className="stat-bar-group">
                  <span className="val-left">84%</span>
                  <div className="progress-bar">
                    <div className="fill home" style={{ width: '84%' }}></div>
                  </div>
                  <span className="val-right">78%</span>
                </div>
              </div>
            </div>

            {match.userPrediction && (
              <div className="user-pred-card">
                <span className="pred-label">Twój Typ:</span>
                <span className="pred-val">
                  {match.userPrediction.home} - {match.userPrediction.away}
                </span>
              </div>
            )}
          </div>

          <div className={`match-chat-section ${activeTab === 'info' ? 'mobile-hidden' : ''}`}>
            <div className="chat-messages-area">
              {messages.length === 0 ? (
                <div className="empty-chat">
                  <MessageSquare size={48} opacity={0.2} />
                  <p>Rozpocznij dyskusję!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`chat-message ${msg.userId === currentUserId ? 'own' : ''}`}>
                    <div className="message-avatar">
                      {msg.avatar || msg.username[0]}
                    </div>
                    <div className="message-bubble">
                      <div className="message-meta">
                        <span className="msg-user">{msg.username}</span>
                        <span className="msg-time">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="msg-text">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                placeholder="Napisz wiadomość..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="btn-send" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="mobile-tabs">
          <button
            className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <BarChart2 size={20} /> Info
          </button>
          <button
            className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare size={20} /> Czat
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchLiveModal;