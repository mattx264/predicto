import React from "react";
import { useTranslation } from "react-i18next";
import { Target } from "lucide-react";

interface RecentResult {
    id: string;
    roomName: string;
    homeTeam: string;
    awayTeam: string;
    actualScore: { home: number; away: number };
    yourPrediction: { home: number; away: number };
    points: number;
    date: string;
}

interface RecentResultsProps {
    results: RecentResult[];
}

const RecentResults: React.FC<RecentResultsProps> = ({ results }) => {
    const { t } = useTranslation();

    const getPointsBadge = (points: number) => {
        if (points === 5) {
            return <span className="result-badge perfect">+{points}</span>;
        } else if (points === 3) {
            return <span className="result-badge good">+{points}</span>;
        } else {
            return <span className="result-badge bad">{points}</span>;
        }
    };

    return (
        <div className="section-card">
            <div className="section-header">
                <h2 className="section-title">
                    <Target size={24} />
                    {t("dashboard.recentResults")}
                </h2>
            </div>

            <div className="results-list">
                {results.map((result) => (
                    <div key={result.id} className="result-item">
                        <div className="result-header">
                            <span className="result-room">{result.roomName}</span>
                            {getPointsBadge(result.points)}
                        </div>
                        <div className="result-match">
                            <span>
                                {result.homeTeam} {t("common.vs")} {result.awayTeam}
                            </span>
                        </div>
                        <div className="result-scores">
                            <div className="result-score">
                                <span className="score-label">
                                    {t("dashboard.actualScore")}
                                </span>
                                <span className="score-value">
                                    {result.actualScore.home} - {result.actualScore.away}
                                </span>
                            </div>
                            <div className="result-score">
                                <span className="score-label">
                                    {t("dashboard.yourPrediction")}
                                </span>
                                <span className="score-value">
                                    {result.yourPrediction.home} - {result.yourPrediction.away}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentResults;