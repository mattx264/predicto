import React from "react";
import { Clock, Zap, CheckCircle } from "lucide-react";
import "./MatchesTabs.css";

interface MatchesTabsProps {
  activeTab: "upcoming" | "live" | "finished";
  onTabChange: (tab: "upcoming" | "live" | "finished") => void;
  counts: {
    upcoming: number;
    live: number;
    finished: number;
  };
}

const MatchesTabs: React.FC<MatchesTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  return (
    <div className="matches-tabs">
      <button
        className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
        onClick={() => onTabChange("upcoming")}
      >
        <Clock size={18} />
        <span>Nadchodzące</span>
        {counts.upcoming > 0 && (
          <span className="tab-badge">{counts.upcoming}</span>
        )}
      </button>

      <button
        className={`tab ${activeTab === "live" ? "active" : ""}`}
        onClick={() => onTabChange("live")}
      >
        <Zap size={18} />
        <span>Na żywo</span>
        {counts.live > 0 && (
          <span className="tab-badge live-badge">{counts.live}</span>
        )}
      </button>

      <button
        className={`tab ${activeTab === "finished" ? "active" : ""}`}
        onClick={() => onTabChange("finished")}
      >
        <CheckCircle size={18} />
        <span>Zakończone</span>
        {counts.finished > 0 && (
          <span className="tab-badge">{counts.finished}</span>
        )}
      </button>
    </div>
  );
};

export default MatchesTabs;
