import React, { useState, useRef, useEffect } from "react";
import { Bell, X, MessageSquare, Trophy, Users, Calendar, CheckCheck } from "lucide-react";
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
      message: "Man Utd vs Liverpool - Dołącz do czatu",
      timestamp: new Date(Date.now() - 300000),
      isRead: false,
      link: "/room/1",
      icon: <MessageSquare size={18} />,
    },
    {
      id: "2",
      type: "achievement",
      title: "Nowe osiągnięcie!",
      message: "Zdobyłeś odznakę 'Mistrz Typowania'",
      timestamp: new Date(Date.now() - 3600000),
      isRead: false,
      icon: <Trophy size={18} />,
    },
    {
      id: "3",
      type: "room",
      title: "Nowy uczestnik",
      message: "Anna dołączyła do 'PL Masters'",
      timestamp: new Date(Date.now() - 7200000),
      isRead: true,
      link: "/room/1",
      icon: <Users size={18} />,
    },
    {
      id: "4",
      type: "match",
      title: "Czas na typowanie!",
      message: "2h do meczu Arsenal vs Chelsea",
      timestamp: new Date(Date.now() - 14400000),
      isRead: true,
      icon: <Calendar size={18} />,
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
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'unset';
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

  const getNotificationColorClass = (type: string) => {
    switch (type) {
      case "match": return "icon-red";
      case "achievement": return "icon-gold";
      case "room": return "icon-blue";
      case "invite": return "icon-purple";
      case "message": return "icon-green";
      default: return "icon-default";
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
        className={`notification-bell-button ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Powiadomienia"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Powiadomienia</h3>
            {unreadCount > 0 && (
              <button
                className="mark-all-read"
                onClick={markAllAsRead}
                title="Oznacz wszystkie jako przeczytane"
              >
                <CheckCheck size={16} />
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <div className="empty-icon">
                  <Bell size={32} />
                </div>
                <p>Brak nowych powiadomień</p>
                <span>Jesteś na bieżąco!</span>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${!notification.isRead ? "unread" : ""}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className={`notification-icon ${getNotificationColorClass(notification.type)}`}>
                    {notification.icon}
                  </div>

                  <div className="notification-content">
                    <div className="notification-top">
                      <span className="notification-title">{notification.title}</span>
                      <span className="notification-time">{formatTimestamp(notification.timestamp)}</span>
                    </div>
                    <p className="notification-message">{notification.message}</p>
                  </div>

                  <button
                    className="notification-close"
                    onClick={(e) => clearNotification(notification.id, e)}
                    title="Usuń"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {notifications.length > 4 && (
            <div className="notification-footer">
              <button className="view-all-btn">Zobacz wszystkie</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;