import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    Users,
    Trophy,
    Clock,
    ArrowRight,
    AlertCircle,
    Crown,
    Medal,
} from "lucide-react";

interface UserRoom {
    id: string;
    name: string;
    league: string;
    participants: number;
    maxParticipants: number;
    status: "active" | "pending" | "ended";
    yourRank: number;
    yourPoints: number;
    nextMatch?: {
        homeTeam: string;
        awayTeam: string;
        date: string;
    };
    prize: number;
}

interface UserRoomsProps {
    rooms: UserRoom[];
}

const UserRooms: React.FC<UserRoomsProps> = ({ rooms }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = useState<"active" | "pending" | "ended">("active");

    const getRankBadge = (rank: number) => {
        if (rank === 1) return <Crown className="rank-badge gold" size={16} />;
        if (rank === 2) return <Medal className="rank-badge silver" size={16} />;
        if (rank === 3) return <Medal className="rank-badge bronze" size={16} />;
        return <span className="rank-badge-text">#{rank}</span>;
    };

    const filteredRooms = rooms.filter((room) => room.status === selectedTab);

    return (
        <div className="section-card">
            <div className="section-header">
                <h2 className="section-title">
                    <Users size={24} />
                    {t("dashboard.yourRooms")}
                </h2>
                <div className="room-tabs">
                    <button
                        className={`room-tab ${selectedTab === "active" ? "active" : ""}`}
                        onClick={() => setSelectedTab("active")}
                    >
                        {t("dashboard.tabs.active")} (
                        {rooms.filter((r) => r.status === "active").length})
                    </button>
                    <button
                        className={`room-tab ${selectedTab === "pending" ? "active" : ""}`}
                        onClick={() => setSelectedTab("pending")}
                    >
                        {t("dashboard.tabs.pending")} (
                        {rooms.filter((r) => r.status === "pending").length})
                    </button>
                    <button
                        className={`room-tab ${selectedTab === "ended" ? "active" : ""}`}
                        onClick={() => setSelectedTab("ended")}
                    >
                        {t("dashboard.tabs.ended")} (
                        {rooms.filter((r) => r.status === "ended").length})
                    </button>
                </div>
            </div>

            <div className="rooms-list">
                {filteredRooms.length === 0 ? (
                    <div className="empty-state">
                        <Trophy className="empty-icon" size={48} />
                        <p>{t("dashboard.emptyRooms")}</p>
                    </div>
                ) : (
                    filteredRooms.map((room) => (
                        <div
                            key={room.id}
                            className="room-item"
                            onClick={() => navigate(`/room/${room.id}`)}
                        >
                            <div className="room-item-header">
                                <div className="room-item-info">
                                    <h3 className="room-item-name">{room.name}</h3>
                                    <span className="room-item-league">{room.league}</span>
                                </div>
                                <div className="room-item-prize">
                                    <Trophy size={16} />
                                    <span>{room.prize} Monet</span>
                                </div>
                            </div>

                            {room.status === "active" && (
                                <>
                                    <div className="room-item-stats">
                                        <div className="room-stat">
                                            <span className="room-stat-label">
                                                {t("dashboard.yourPosition")}
                                            </span>
                                            <div className="room-stat-value">
                                                {getRankBadge(room.yourRank)}
                                                <span>
                                                    {room.yourPoints} {t("common.points")}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="room-stat">
                                            <span className="room-stat-label">
                                                {t("dashboard.participants")}
                                            </span>
                                            <span className="room-stat-value">
                                                {room.participants}/{room.maxParticipants}
                                            </span>
                                        </div>
                                    </div>

                                    {room.nextMatch && (
                                        <div className="next-match">
                                            <Clock size={14} />
                                            <span className="next-match-text">
                                                {room.nextMatch.homeTeam} {t("common.vs")}{" "}
                                                {room.nextMatch.awayTeam}
                                            </span>
                                            <span className="next-match-date">
                                                {new Date(room.nextMatch.date).toLocaleDateString("pl-PL")}
                                            </span>
                                        </div>
                                    )}
                                </>
                            )}

                            {room.status === "pending" && (
                                <div className="room-pending-info">
                                    <AlertCircle size={16} />
                                    <span>{t("dashboard.waitingToStart")}</span>
                                </div>
                            )}

                            {room.status === "ended" && (
                                <div className="room-ended-info">
                                    <div className="final-position">
                                        {getRankBadge(room.yourRank)}
                                        <span>
                                            {t("dashboard.finalPosition")} - {room.yourPoints}{" "}
                                            {t("common.points")}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <ArrowRight className="room-arrow" size={20} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserRooms;