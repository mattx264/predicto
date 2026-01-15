import React, { useState, useRef, useEffect } from "react";
import { Send, Trash2, Flag, MoreVertical, Users, MessageSquare } from "lucide-react";
import "./RoomChat.css";
import { useChat } from "../../hooks/useChat";

interface RoomChatProps {
  currentUserId: string;
  isCreator: boolean;
  roomId: string;
}

const RoomChat: React.FC<RoomChatProps> = ({
  currentUserId,
  isCreator,
  roomId,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, onlineUsers, sendMessage, deleteMessage } = useChat({
    id: roomId,
    type: "room",
    name: "Czat pokoju",
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage, currentUserId, "Gracz");
    setNewMessage("");
  };

  const handleDelete = (messageId: string) => {
    if (window.confirm("Czy na pewno chcesz usunąć tę wiadomość?")) {
      deleteMessage(messageId);
      setActiveMenu(null);
    }
  };

  const handleReport = () => {
    alert("Wiadomość została zgłoszona do moderacji");
    setActiveMenu(null);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="room-chat">
      <div className="chat-header">
        <div className="chat-title">
          <MessageSquare size={18} className="title-icon" />
          <span>Czat na żywo</span>
        </div>
        <div className="online-badge">
          <span className="pulsing-dot" />
          <Users size={14} />
          <span>{onlineUsers} online</span>
        </div>
      </div>

      <div className="chat-messages-container">
        {messages.length === 0 ? (
          <div className="chat-empty-state">
            <div className="empty-icon-wrapper">
              <MessageSquare size={24} />
            </div>
            <p>Brak wiadomości. Bądź pierwszy!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.userId === currentUserId;
            return (
              <div
                key={message.id}
                className={`chat-message-row ${isOwn ? "own" : "received"}`}
              >
                <div className="chat-message-avatar">
                  {message.avatar}
                </div>

                <div className="chat-message-bubble">
                  <div className="chat-message-header">
                    <span className="chat-message-username">
                      {isOwn ? "Ty" : message.username}
                    </span>
                    <span className="chat-message-time">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>

                  <div className="chat-message-text">{message.content}</div>
                </div>

                <div className="chat-message-actions">
                  <button
                    className="chat-menu-trigger"
                    onClick={() =>
                      setActiveMenu(activeMenu === message.id ? null : message.id)
                    }
                  >
                    <MoreVertical size={16} />
                  </button>

                  {activeMenu === message.id && (
                    <div className="chat-menu-dropdown">
                      {(isOwn || isCreator) && (
                        <button
                          className="chat-menu-item danger"
                          onClick={() => handleDelete(message.id)}
                        >
                          <Trash2 size={14} />
                          Usuń
                        </button>
                      )}
                      {!isOwn && (
                        <button className="chat-menu-item" onClick={handleReport}>
                          <Flag size={14} />
                          Zgłoś
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-wrapper">
        <div className="input-group-chat">
          <input
            type="text"
            className="chat-input"
            placeholder="Napisz wiadomość..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button
            className="chat-send-button"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomChat;