import React, { useState, useMemo, useEffect } from "react";
import "./RoomMatches.css";
import MatchesList from "./MatchesList";
import PredictionModal from "./PredictionModal";
import MatchLiveModal from "../match-live/MatchLiveModal";
import LivePredictionsModal from "../match-live/predictions/LivePredictionsModal";
import type { Match, RoomGameBetDto } from "../../types/types";
import gameService from "../../services/signalr/game.service";
import MatchesTabs from "./matches-tabs/MatchesTabs";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

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
  const { token } = useAuth();

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
      if (!tournamentId) {
        console.error("❌ Tournament ID is missing");
        setError("Brak ID turnieju. Nie można pobrać meczów.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const fetchedMatches =
          await gameService.getGamesByTournamentId(tournamentId);

        setMatches(fetchedMatches);
      } catch (err) {
        console.error("❌ Error fetching matches:", err);
        setError("Nie udało się pobrać meczów. Spróbuj ponownie.");
        toast.error("Nie udało się pobrać meczów. Spróbuj ponownie.");
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
      toast.error("Błąd: brak ID turnieju lub pokoju.");
      return;
    }

    if (!token) {
      console.error("No auth token found");
      toast.error("Musisz być zalogowany, aby obstawiać mecze.");
      return;
    }

    try {
      const match = matches.find((m) => m.id === matchId);
      if (!match || !match.homeTeamId || !match.awayTeamId) {
        throw new Error("Nie znaleziono danych meczu");
      }

      let homeScore: string;
      let awayScore: string;

      if (payload.home !== undefined && payload.away !== undefined) {
        homeScore = payload.home.toString();
        awayScore = payload.away.toString();
      } else if (payload.winner) {
        if (payload.winner === "home") {
          homeScore = "W";
          awayScore = "L";
        } else if (payload.winner === "away") {
          homeScore = "L";
          awayScore = "W";
        } else {
          homeScore = "D";
          awayScore = "D";
        }
      } else {
        throw new Error("Nieprawidłowe dane predykcji");
      }

      const betData: RoomGameBetDto = {
        gameId: parseInt(matchId),
        roomId: Number(roomId),
        roomGameBetTeam: [
          {
            teamId: match.homeTeamId,
            bet: homeScore,
          },
          {
            teamId: match.awayTeamId,
            bet: awayScore,
          },
        ],
      };

      await gameService.betGame(betData, token);

      setMatches((prevMatches) =>
        prevMatches.map((m) =>
          m.id === matchId
            ? {
                ...m,
                userPrediction: {
                  home: payload.home,
                  away: payload.away,
                  winner: payload.winner,
                  joker: payload.joker,
                },
              }
            : m
        )
      );

      setSelectedMatchId(null);
      toast.success("Predykcja zapisana pomyślnie!");
    } catch (error) {
      console.error("Error submitting prediction:", error);
      toast.error("Nie udało się zapisać predykcji. Spróbuj ponownie.");
    }
  };

  const selectedMatch = matches.find((m) => m.id === selectedMatchId);

  if (loading) {
    return <div className="matches-section">Ładowanie meczów...</div>;
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
