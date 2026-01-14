import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface UpcomingMatch {
    id: string;
    roomId: string;
    roomName: string;
    homeTeam: string;
    awayTeam: string;
    date: string;
    isPredicted: boolean;
}

interface UpcomingMatchesProps {
    matches: UpcomingMatch[];
}

const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({ matches }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="section-card">
            <div className="section-header">
                <h2 className="section-title">
                    <Calendar size={24} />
                    {t("dashboard.upcomingMatches")}
                </h2>
            </div>

            <div className="matches-list-dash">
                {matches.map((match) => (
                    <div
                        key={match.id}
                        className="match-item-dash"
                        onClick={() => navigate(`/room/${match.roomId}`)}
                    >
                        <div className="match-item-room">{match.roomName}</div>
                        <div className="match-item-teams">
                            <span>{match.homeTeam}</span>
                            <span className="vs-text">{t("common.vs")}</span>
                            <span>{match.awayTeam}</span>
                        </div>
                        <div className="match-item-date">
                            <Clock size={14} />
                            <span>
                                {new Date(match.date).toLocaleString("pl-PL", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                        {match.isPredicted ? (
                            <span className="predicted-badge">
                                <CheckCircle size={14} />
                                {t("dashboard.predicted")}
                            </span>
                        ) : (
                            <span className="not-predicted-badge">
                                <AlertCircle size={14} />
                                {t("dashboard.notPredicted")}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingMatches;