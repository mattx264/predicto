import React, { useState, useRef, useEffect } from "react";
import { Send, Trash2, Flag, MoreVertical } from "lucide-react";
import "./RoomChat.css";

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
}

interface RoomChatProps {
  currentUserId: string;
  isCreator: boolean;
  roomId: string;
}

const RoomChat: React.FC<RoomChatProps> = ({ currentUserId, isCreator }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      userId: "user2",
      username: "AnnaWiśniewska",
      avatar: "A",
      content: "Hej! Ktoś obstawia dzisiejszy mecz?",
      timestamp: "2024-10-27T15:30:00",
    },
    {
      id: "2",
      userId: "user3",
      username: "PiotrNowak",
      avatar: "P",
      content: "Ja stawiłem na City 2:1",
      timestamp: "2024-10-27T15:31:00",
    },
    {
      id: "3",
      userId: "user1",
      username: "JanKowalski",
      avatar: "J",
      content: "Dokładnie taki sam typ!",
      timestamp: "2024-10-27T15:32:00",
    },
    {
      id: "4",
      userId: "user4",
      username: "MariaKowalczyk",
      avatar: "M",
      content: "Liverpool wygra moim zdaniem",
      timestamp: "2024-10-27T15:33:00",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUserId,
      username: "Gracz",
      avatar: "G",
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleDelete = (messageId: string) => {
    if (window.confirm("Czy na pewno chcesz usunąć tę wiadomość?")) {
      setMessages(messages.filter((msg) => msg.id !== messageId));
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
      <div className="chat-messages-container">
        {messages.map((message) => (
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
                    <button
                      className="chat-menu-item"
                      onClick={() => handleReport()}
                    >
                      <Flag size={14} />
                      Zgłoś
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
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
            if (e.key === "Enter") {
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
