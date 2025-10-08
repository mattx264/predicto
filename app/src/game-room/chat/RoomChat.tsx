import React, { useState, useRef, useEffect } from "react";
import { Send, Trash2, Flag, MoreVertical, Users } from "lucide-react";
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
      <div className="chat-header-info">
        <div className="online-indicator">
          <Users size={16} />
          <span>{onlineUsers} online</span>
        </div>
      </div>

      <div className="chat-messages-container">
        {messages.length === 0 ? (
          <div className="chat-empty-state">
            <p>Brak wiadomości. Rozpocznij rozmowę! 💬</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${
                message.userId === currentUserId ? "own" : ""
              }`}
            >
              <div className="chat-message-avatar">{message.avatar}</div>

              <div className="chat-message-content">
                <div className="chat-message-header">
                  <span className="chat-message-username">
                    {message.username}
                  </span>
                  <span className="chat-message-time">
                    {formatTime(message.timestamp)}
                  </span>
                </div>

                <div className="chat-message-text">{message.content}</div>
              </div>

              <div className="chat-message-menu">
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
                    {(message.userId === currentUserId || isCreator) && (
                      <button
                        className="chat-menu-item danger"
                        onClick={() => handleDelete(message.id)}
                      >
                        <Trash2 size={14} />
                        Usuń
                      </button>
                    )}
                    {message.userId !== currentUserId && (
                      <button className="chat-menu-item" onClick={handleReport}>
                        <Flag size={14} />
                        Zgłoś
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
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
          disabled={newMessage.trim() === ""}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default RoomChat;
