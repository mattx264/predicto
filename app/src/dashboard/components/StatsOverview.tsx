import React from "react";
import { useTranslation } from "react-i18next";
import { Trophy, Target, Medal, TrendingUp, Zap } from "lucide-react";

interface StatsOverviewProps {
    stats: {
        globalRank: number;
        totalPoints: number;
        roomsWon: number;
        winRate: number;
        activeRooms: number;
        currentStreak: number;
    };
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
    const { t } = useTranslation();

    return (
        <div className="stats-overview">
            <div className="stat-card-dash">
                <div className="stat-icon-wrapper purple">
                    <Trophy className="stat-icon-dash" />
                </div>
                <div className="stat-info-dash">
                    <span className="stat-label-dash">
                        {t("dashboard.stats.globalRank")}
                    </span>
                    <span className="stat-value-dash">#{stats.globalRank}</span>
                </div>
            </div>

            <div className="stat-card-dash">
                <div className="stat-icon-wrapper green">
                    <Target className="stat-icon-dash" />
                </div>
                <div className="stat-info-dash">
                    <span className="stat-label-dash">
                        {t("dashboard.stats.totalPoints")}
                    </span>
                    <span className="stat-value-dash">{stats.totalPoints}</span>
                </div>
            </div>

            <div className="stat-card-dash">
                <div className="stat-icon-wrapper blue">
                    <Medal className="stat-icon-dash" />
                </div>
                <div className="stat-info-dash">
                    <span className="stat-label-dash">
                        {t("dashboard.stats.roomsWon")}
                    </span>
                    <span className="stat-value-dash">{stats.roomsWon}</span>
                </div>
            </div>

            <div className="stat-card-dash">
                <div className="stat-icon-wrapper orange">
                    <TrendingUp className="stat-icon-dash" />
                </div>
                <div className="stat-info-dash">
                    <span className="stat-label-dash">
                        {t("dashboard.stats.winRate")}
                    </span>
                    <span className="stat-value-dash">{stats.winRate}%</span>
                </div>
            </div>

            <div className="stat-card-dash">
                <div className="stat-icon-wrapper yellow">
                    <Zap className="stat-icon-dash" />
                </div>
                <div className="stat-info-dash">
                    <span className="stat-label-dash">
                        {t("dashboard.stats.currentStreak")}
                    </span>
                    <span className="stat-value-dash">{stats.currentStreak}</span>
                </div>
            </div>
        </div>
    );
};

export default StatsOverview;