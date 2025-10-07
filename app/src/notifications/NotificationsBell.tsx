import React, { useState, useRef, useEffect } from "react";
import { Bell, X, MessageSquare, Trophy, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./NotificationsBell.css";

interface Notification {
  id: string;
  type: "match" | "room" | "achievement" | "invite" | "message";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  link?: string;
  icon?: React.ReactNode;
}

const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "match",
      title: "Mecz rozpoczęty!",
      message: "Manchester United vs Liverpool - Dołącz do czatu na żywo",
      timestamp: new Date(Date.now() - 300000),
      isRead: false,
      link: "/room/1",
      icon: <MessageSquare size={20} />,
    },
    {
      id: "2",
      type: "achievement",
      title: "Nowe osiągnięcie!",
      message:
        "Zdobyłeś odznakę 'Mistrz Typowania' za 5 idealnych typów z rzędu",
      timestamp: new Date(Date.now() - 3600000),
      isRead: false,
      icon: <Trophy size={20} />,
    },
    {
      id: "3",
      type: "room",
      title: "Nowy uczestnik",
      message: "Anna Wiśniewska dołączyła do pokoju 'Premier League Masters'",
      timestamp: new Date(Date.now() - 7200000),
      isRead: true,
      link: "/room/1",
      icon: <Users size={20} />,
    },
    {
      id: "4",
      type: "match",
      title: "Czas na typowanie!",
      message: "Zostały 2 godziny do meczu Arsenal vs Chelsea",
      timestamp: new Date(Date.now() - 14400000),
      isRead: true,
      icon: <Calendar size={20} />,
    },
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      if (window.innerWidth <= 768) {
        document.body.classList.add("notification-open");
      }
    } else {
      document.body.classList.remove("notification-open");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("notification-open");
    };
  }, [isOpen]);

  const handleNotificationClick = (notification: Notification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
    );

    if (notification.link) {
      navigate(notification.link);
      setIsOpen(false);
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const clearNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "match":
        return "notification-match";
      case "achievement":
        return "notification-achievement";
      case "room":
        return "notification-room";
      case "invite":
        return "notification-invite";
      case "message":
        return "notification-message";
      default:
        return "";
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Teraz";
    if (minutes < 60) return `${minutes} min temu`;
    if (hours < 24) return `${hours} godz. temu`;
    return `${days} dni temu`;
  };

  return (
    <div className="notification-bell-container" ref={dropdownRef}>
      <button
        className="notification-bell-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Powiadomienia</h3>
            {unreadCount > 0 && (
              <button className="mark-all-read" onClick={markAllAsRead}>
                Oznacz wszystkie jako przeczytane
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <Bell size={48} />
                <p>Brak powiadomień</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    !notification.isRead ? "unread" : ""
                  } ${getNotificationColor(notification.type)}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="notification-icon">{notification.icon}</div>
                  <div className="notification-content">
                    <div className="notification-title">
                      {notification.title}
                    </div>
                    <div className="notification-message">
                      {notification.message}
                    </div>
                    <div className="notification-timestamp">
                      {formatTimestamp(notification.timestamp)}
                    </div>
                  </div>
                  <button
                    className="notification-close"
                    onClick={(e) => clearNotification(notification.id, e)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="notification-footer">
              <button className="view-all-button">Zobacz wszystkie</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
