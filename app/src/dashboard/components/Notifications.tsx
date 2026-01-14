import React from "react";
import { useTranslation } from "react-i18next";
import { Bell } from "lucide-react";

interface Notification {
    id: string;
    type: string;
    message: string;
    time: string;
    isNew: boolean;
}

interface NotificationsProps {
    notifications: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
    const { t } = useTranslation();

    return (
        <div className="section-card">
            <div className="section-header">
                <h2 className="section-title">
                    <Bell size={24} />
                    {t("dashboard.notifications")}
                </h2>
            </div>

            <div className="notifications-list">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`notification-item ${notif.isNew ? "new" : ""}`}
                    >
                        {notif.isNew && <div className="notification-dot" />}
                        <p className="notification-message">{notif.message}</p>
                        <span className="notification-time">{notif.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;