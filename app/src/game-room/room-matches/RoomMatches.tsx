import React, { useState, useMemo, useEffect } from "react";
import "./RoomMatches.css";
import MatchesList from "./MatchesList";
import PredictionModal from "./PredictionModal";
import MatchLiveModal from "../match-live/MatchLiveModal";
import LivePredictionsModal from "../match-live/predictions/LivePredictionsModal";
import type { Match } from "../../types/types";
import gameService from "../../services/signalr/game.service";
import MatchesTabs from "./matches-tabs/MatchesTabs";

interface RoomMatchesProps {
  tournamentId?: number;
  roomId?: string | number;
  isParticipant: boolean;
  currentUserId: string;
}

interface PredictionPayload {
  joker: boolean;
  winner?: "home" | "draw" | "away" | null;
  home?: number;
  away?: number;
}

const RoomMatches: React.FC<RoomMatchesProps> = ({
  tournamentId,
  roomId,
  isParticipant,
  currentUserId,
}) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"upcoming" | "live" | "finished">(
    "upcoming"
  );
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [selectedLiveMatch, setSelectedLiveMatch] = useState<Match | null>(
    null
  );
  const [livePredictionsMatch, setLivePredictionsMatch] =
    useState<Match | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      console.log("🔍 Fetching matches for tournamentId:", tournamentId);

      if (!tournamentId) {
        console.error("❌ Tournament ID is missing");
        setError("Brak ID turnieju. Nie można pobrać meczów.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log("🚀 Calling gameService.getGamesByTournamentId...");
        const fetchedMatches =
          await gameService.getGamesByTournamentId(tournamentId);

        console.log("✅ Fetched matches:", fetchedMatches);
        console.log("📊 Number of matches:", fetchedMatches.length);

        setMatches(fetchedMatches);
      } catch (err) {
        console.error("❌ Error fetching matches:", err);
        setError("Nie udało się pobrać meczów. Spróbuj ponownie.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [tournamentId, roomId, isParticipant]);

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => match.status === activeTab);
  }, [matches, activeTab]);

  const matchCounts = useMemo(() => {
    return {
      upcoming: matches.filter((m) => m.status === "upcoming").length,
      live: matches.filter((m) => m.status === "live").length,
      finished: matches.filter((m) => m.status === "finished").length,
    };
  }, [matches]);

  const handlePredictionSubmit = async (
    matchId: string,
    payload: PredictionPayload
  ) => {
    if (!tournamentId || !roomId) {
      console.error("Tournament ID or Room ID is missing");
      return;
    }

    console.log("Submitting prediction for match", matchId, payload);

    try {
      setSelectedMatchId(null);
      alert("Predykcja zapisana! (TODO: Implementacja API)");
    } catch (error) {
      console.error("Error submitting prediction:", error);
      alert("Nie udało się zapisać predykcji. Spróbuj ponownie.");
    }
  };

  const selectedMatch = matches.find((m) => m.id === selectedMatchId);

  if (loading) {
    return <div className="matches-section"></div>;
  }

  if (error) {
    return (
      <div className="matches-section">
        <div className="matches-header">
          <h2 className="section-title">Mecze do typowania</h2>
          <p className="section-description" style={{ color: "#ef4444" }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="matches-section">
        <div className="matches-header"></div>

        <MatchesTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={matchCounts}
        />

        <MatchesList
          matches={filteredMatches}
          isParticipant={isParticipant}
          onPredictClick={setSelectedMatchId}
          onWatchLive={setSelectedLiveMatch}
          onViewPredictions={setLivePredictionsMatch}
        />
      </div>

      {selectedMatch && (
        <PredictionModal
          match={selectedMatch}
          onClose={() => setSelectedMatchId(null)}
          onSubmit={handlePredictionSubmit}
        />
      )}

      {selectedLiveMatch && (
        <MatchLiveModal
          match={selectedLiveMatch}
          currentUserId={currentUserId}
          onClose={() => setSelectedLiveMatch(null)}
        />
      )}

      {livePredictionsMatch && (
        <LivePredictionsModal
          match={livePredictionsMatch}
          onClose={() => setLivePredictionsMatch(null)}
        />
      )}
    </>
  );
};

export default RoomMatches;
