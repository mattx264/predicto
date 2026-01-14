import React from "react";
import { useNavigate } from "react-router-dom";
import { Radio, CheckCircle, Clock, Trophy } from "lucide-react";

interface LiveMatch {
    id: string;
    roomId: string;
    roomName: string;
    homeTeam: string;
    awayTeam: string;
    currentScore: { home: number; away: number };
    yourPrediction: { home: number; away: number };
    minute: string;
    possiblePoints: number;
}

interface RecentMatch {
    id: string;
    roomId: string;
    roomName: string;
    homeTeam: string;
    awayTeam: string;
    finalScore: { home: number; away: number };
    yourPrediction: { home: number; away: number };
    points: number;
    timeAgo: string;
}

interface LiveAndRecentMatchesProps {
    liveMatches: LiveMatch[];
    recentMatches: RecentMatch[];
}

const LiveAndRecentMatches: React.FC<LiveAndRecentMatchesProps> = ({
    liveMatches,
    recentMatches,
}) => {
    const navigate = useNavigate();

    const getPointsColor = (points: number) => {
        if (points === 5) return "perfect";
        if (points >= 3) return "good";
        return "bad";
    };

    return (
        <div className="section-card live-recent-matches">
            <div className="section-header">
                <h2 className="section-title">
                    <Radio size={24} />
                    Mecze live i wyniki
                </h2>
            </div>

            {liveMatches.length > 0 && (
                <div className="live-matches-section">
                    <h3 className="subsection-title">
                        <span className="live-indicator">🔴</span>
                        Na żywo
                    </h3>
                    <div className="live-matches-list">
                        {liveMatches.map((match) => (
                            <div
                                key={match.id}
                                className="live-match-card"
                                onClick={() => navigate(`/room/${match.roomId}`)}
                            >
                                <div className="live-match-header">
                                    <span className="live-room-name">
                                        <Trophy size={12} />
                                        {match.roomName}
                                    </span>
                                    <span className="live-minute">{match.minute}'</span>
                                </div>

                                <div className="live-match-score">
                                    <div className="live-team">
                                        <span className="team-name">{match.homeTeam}</span>
                                        <span className="current-score">{match.currentScore.home}</span>
                                    </div>
                                    <div className="score-divider">-</div>
                                    <div className="live-team">
                                        <span className="current-score">{match.currentScore.away}</span>
                                        <span className="team-name">{match.awayTeam}</span>
                                    </div>
                                </div>

                                <div className="live-match-prediction">
                                    <span className="prediction-label">Twój typ:</span>
                                    <span className="prediction-value">
                                        {match.yourPrediction.home} - {match.yourPrediction.away}
                                    </span>
                                    <span className="possible-points">
                                        🎯 Do zdobycia: {match.possiblePoints} pkt
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {recentMatches.length > 0 && (
                <div className="recent-matches-section">
                    <h3 className="subsection-title">
                        <CheckCircle size={20} />
                        Ostatnie wyniki
                    </h3>
                    <div className="recent-matches-list">
                        {recentMatches.map((match) => (
                            <div
                                key={match.id}
                                className="recent-match-card"
                                onClick={() => navigate(`/room/${match.roomId}`)}
                            >
                                <div className="recent-match-header">
                                    <span className="recent-room-name">
                                        <Trophy size={12} />
                                        {match.roomName}
                                    </span>
                                    <span className={`recent-points ${getPointsColor(match.points)}`}>
                                        {match.points > 0 ? `+${match.points}` : match.points} pkt
                                    </span>
                                </div>

                                <div className="recent-match-teams">
                                    <span className="team-name-recent">
                                        {match.homeTeam} {match.finalScore.home} - {match.finalScore.away} {match.awayTeam}
                                    </span>
                                </div>

                                <div className="recent-match-footer">
                                    <span className="recent-prediction">
                                        Twój typ: {match.yourPrediction.home} - {match.yourPrediction.away}
                                    </span>
                                    <span className="recent-time">
                                        <Clock size={12} />
                                        {match.timeAgo}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {liveMatches.length === 0 && recentMatches.length === 0 && (
                <div className="no-matches">
                    <Radio size={48} />
                    <p>Brak meczów live i ostatnich wyników</p>
                </div>
            )}
        </div>
    );
};

export default LiveAndRecentMatches;