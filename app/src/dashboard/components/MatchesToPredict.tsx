import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, CheckCircle, AlertCircle, Trophy, ArrowRight } from "lucide-react";

interface Match {
    id: string;
    roomId: string;
    roomName: string;
    homeTeam: string;
    awayTeam: string;
    date: string;
    isPredicted: boolean;
    timeUntilMatch?: string;
}

interface MatchesToPredictProps {
    matches: Match[];
}

const MatchesToPredict: React.FC<MatchesToPredictProps> = ({ matches }) => {
    const navigate = useNavigate();

    const getTimeUntilMatch = (dateString: string) => {
        const matchDate = new Date(dateString);
        const now = new Date();
        const diff = matchDate.getTime() - now.getTime();

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours < 1) return `Za ${minutes} min`;
        if (hours < 24) return `Za ${hours}h ${minutes}m`;
        return `Za ${Math.floor(hours / 24)} dni`;
    };

    const isToday = (dateString: string) => {
        const matchDate = new Date(dateString);
        const today = new Date();
        return matchDate.toDateString() === today.toDateString();
    };

    const isTomorrow = (dateString: string) => {
        const matchDate = new Date(dateString);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return matchDate.toDateString() === tomorrow.toDateString();
    };

    const todayMatches = matches.filter(m => isToday(m.date));
    const tomorrowMatches = matches.filter(m => isTomorrow(m.date));

    const renderMatchList = (matchList: Match[], title: string, emptyMessage: string) => {
        if (matchList.length === 0) {
            return (
                <div className="matches-day-section">
                    <h3 className="matches-day-title">{title}</h3>
                    <div className="matches-empty">
                        <Calendar size={32} />
                        <p>{emptyMessage}</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="matches-day-section">
                <h3 className="matches-day-title">
                    {title}
                    <span className="matches-count">{matchList.length} {matchList.length === 1 ? 'mecz' : 'meczów'}</span>
                </h3>
                <div className="matches-list-horizontal">
                    {matchList.map((match) => (
                        <div
                            key={match.id}
                            className={`match-predict-item ${match.isPredicted ? 'predicted' : 'not-predicted'}`}
                            onClick={() => navigate(`/room/${match.roomId}`)}
                        >
                            <div className="match-predict-left">
                                <div className="match-predict-room">
                                    <Trophy size={14} />
                                    <span>{match.roomName}</span>
                                </div>
                                <div className="match-predict-matchup">
                                    <span className="team-name-predict">{match.homeTeam}</span>
                                    <span className="vs-divider">VS</span>
                                    <span className="team-name-predict">{match.awayTeam}</span>
                                </div>
                            </div>

                            <div className="match-predict-right">
                                <div className="match-predict-time">
                                    <Clock size={14} />
                                    <div className="time-info">
                                        <span className="time-countdown">{getTimeUntilMatch(match.date)}</span>
                                        <span className="time-exact">
                                            {new Date(match.date).toLocaleString("pl-PL", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                </div>
                                {match.isPredicted ? (
                                    <div className="predict-badge predicted">
                                        <CheckCircle size={16} />
                                        <span>Wytypowane</span>
                                    </div>
                                ) : (
                                    <div className="predict-badge not-predicted">
                                        <AlertCircle size={16} />
                                        <span>Do wytypowania</span>
                                    </div>
                                )}
                            </div>

                            <ArrowRight className="match-predict-arrow" size={20} />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="section-card matches-to-predict">
            <div className="section-header">
                <h2 className="section-title">
                    <Calendar size={24} />
                    Mecze do obstawienia
                </h2>
            </div>

            {renderMatchList(todayMatches, "📅 Dzisiaj", "Brak meczów na dziś")}
            {renderMatchList(tomorrowMatches, "📅 Jutro", "Brak meczów na jutro")}
        </div>
    );
};

export default MatchesToPredict;