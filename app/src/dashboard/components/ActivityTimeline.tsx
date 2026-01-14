import React from "react";
import { Activity, Target, TrendingUp, TrendingDown, Award, Zap } from "lucide-react";

interface TimelineEvent {
    id: string;
    type: "prediction" | "result" | "rank_up" | "rank_down" | "achievement" | "streak";
    title: string;
    description: string;
    timestamp: Date;
    points?: number;
    icon?: React.ReactNode;
    color?: string;
}

interface ActivityTimelineProps {
    events: TimelineEvent[];
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ events }) => {

    const getTimeAgo = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return "Teraz";
        if (minutes < 60) return `${minutes} min temu`;
        if (hours < 24) return `${hours} godz. temu`;
        if (days === 1) return "Wczoraj";
        return `${days} dni temu`;
    };

    const getEventIcon = (type: string) => {
        switch (type) {
            case "prediction":
                return <Target size={18} />;
            case "result":
                return <Award size={18} />;
            case "rank_up":
                return <TrendingUp size={18} />;
            case "rank_down":
                return <TrendingDown size={18} />;
            case "achievement":
                return <Award size={18} />;
            case "streak":
                return <Zap size={18} />;
            default:
                return <Activity size={18} />;
        }
    };

    const getEventColorClass = (type: string) => {
        switch (type) {
            case "prediction":
                return "event-prediction";
            case "result":
                return "event-result";
            case "rank_up":
                return "event-rank-up";
            case "rank_down":
                return "event-rank-down";
            case "achievement":
                return "event-achievement";
            case "streak":
                return "event-streak";
            default:
                return "event-default";
        }
    };

    return (
        <div className="section-card">
            <div className="section-header">
                <h2 className="section-title">
                    <Activity size={24} />
                    Twoja aktywność
                </h2>
            </div>

            <div className="activity-timeline">
                {events.length === 0 ? (
                    <div className="timeline-empty">
                        <Activity size={48} />
                        <p>Brak aktywności</p>
                    </div>
                ) : (
                    events.map((event, index) => (
                        <div key={event.id} className="timeline-item">
                            <div className={`timeline-icon ${getEventColorClass(event.type)}`}>
                                {getEventIcon(event.type)}
                            </div>
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <span className="timeline-title">{event.title}</span>
                                    {event.points !== undefined && (
                                        <span className={`timeline-points ${event.points > 0 ? 'positive' : 'zero'}`}>
                                            {event.points > 0 ? `+${event.points}` : event.points} pkt
                                        </span>
                                    )}
                                </div>
                                <p className="timeline-description">{event.description}</p>
                                <span className="timeline-time">{getTimeAgo(event.timestamp)}</span>
                            </div>
                            {index < events.length - 1 && <div className="timeline-line" />}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ActivityTimeline;