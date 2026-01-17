import React from "react";
import MatchCard from "./MatchCard";
import type { Match } from "../../types/types";
import "./MatchesList.css";
interface MatchesListProps {
  matches: Match[];
  isParticipant: boolean;
  onPredictClick: (matchId: string) => void;
  onWatchLive: (match: Match) => void;
  onViewPredictions: (match: Match) => void;
}

const MatchesList: React.FC<MatchesListProps> = ({
  matches,
  isParticipant,
  onPredictClick,
  onWatchLive,
  onViewPredictions,
}) => {
  return (
    <div className="matches-section">
      <div className="matches-header">
        <h2 className="section-title">Mecze do typowania</h2>
        <p className="section-description">
          Typuj wyniki meczów i zdobywaj punkty
        </p>
      </div>

      <div className="matches-list">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            isParticipant={isParticipant}
            onPredictClick={onPredictClick}
            onWatchLive={onWatchLive}
            onViewPredictions={onViewPredictions}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchesList;
