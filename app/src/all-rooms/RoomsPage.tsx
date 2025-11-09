import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trophy, AlertCircle } from "lucide-react";
import "./RoomsPage.css";
import PaymentGateway from "../payment/PaymentGateway";
import MyRooms from "../my-rooms/MyRooms";
import AllRoomsCards from "./rooms-cards/AllRoomsCards";
import RoomsFilters from "./rooms-filter/RoomsFilters";
import RoomsStats from "./rooms-stats/RoomsStats";
import type { Room } from "../types/types";
import { useRooms } from "../hooks/useRooms";

const RoomsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "open" | "active" | "ended"
  >("all");
  const [filterLeague, setFilterLeague] = useState<string>("all");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [viewMode, setViewMode] = useState<"all" | "my">("all");

  const currentUserId = "user1";

  const { rooms, isLoading, error } = useRooms();

  const mockRooms: Room[] = [
    {
      id: "mock-1",
      name: "[MOCK] Premier League Masters",
      creator: "JanKowalski",
      participants: 8,
      maxParticipants: 10,
      entryFee: 50,
      prize: 500,
      league: "Premier League",
      startDate: "2025-10-05",
      endDate: "2025-11-30",
      isPrivate: false,
      status: "open",
    },
  ];

  const displayRooms = error ? mockRooms : rooms;

  const myRooms = useMemo(() => {
    return displayRooms.filter((room) => room.isUserInRoom === true);
  }, [displayRooms]);

  const leagues = [
    "all",
    ...Array.from(new Set(displayRooms.map((r) => r.league))),
  ];

  const filteredRooms = displayRooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || room.status === filterStatus;
    const matchesLeague =
      filterLeague === "all" || room.league === filterLeague;
    return matchesSearch && matchesStatus && matchesLeague;
  });

  const handleRoomClick = (roomId: string) => {
    const room = displayRooms.find((r) => r.id === roomId);
    if (room && room.status === "open" && !room.isUserInRoom) {
      // ✅ DODAJ: nie otwieraj płatności jeśli już w pokoju
      setSelectedRoom(room);
      setIsPaymentOpen(true);
    } else {
      navigate(`/room/${roomId}`);
    }
  };

  const handlePaymentSuccess = () => {
    if (selectedRoom) {
      console.log(`Płatność zakończona dla pokoju: ${selectedRoom.name}`);
      navigate(`/room/${selectedRoom.id}`);
    }
  };

  return (
    <div className="rooms-page">
      <div className="rooms-container">
        <div className="rooms-header">
          <div className="header-content">
            <h1 className="page-title">
              <Trophy className="title-icon" />
              Dostępne Pokoje
            </h1>
            <p className="page-subtitle">
              Dołącz do istniejących rozgrywek lub stwórz własny pokój
            </p>
          </div>
          <div className="header-actions">
            <button
              className="create-room-btn"
              onClick={() => navigate("/create-room")}
            >
              <Plus className="btn-icon" />
              Stwórz Pokój
            </button>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            <AlertCircle size={20} />
            <span>
              Błąd połączenia z serwerem: {error}. Używam danych testowych.
            </span>
          </div>
        )}

        {isLoading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Ładowanie pokoi...</p>
          </div>
        )}

        {!isLoading && (
          <RoomsFilters
            searchQuery={searchQuery}
            filterStatus={filterStatus}
            filterLeague={filterLeague}
            leagues={leagues}
            onSearchChange={setSearchQuery}
            onStatusChange={setFilterStatus}
            onLeagueChange={setFilterLeague}
          />
        )}

        {!isLoading && (
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === "all" ? "active" : ""}`}
              onClick={() => setViewMode("all")}
            >
              Wszystkie pokoje ({filteredRooms.length})
            </button>
            <button
              className={`toggle-btn ${viewMode === "my" ? "active" : ""}`}
              onClick={() => setViewMode("my")}
            >
              Moje pokoje ({myRooms.length})
            </button>
          </div>
        )}

        {!isLoading && <RoomsStats rooms={displayRooms} />}

        {!isLoading && viewMode === "all" ? (
          <AllRoomsCards rooms={filteredRooms} onRoomClick={handleRoomClick} />
        ) : !isLoading && viewMode === "my" ? (
          <MyRooms
            currentUserId={currentUserId}
            rooms={myRooms}
            isLoading={false}
            error={null}
          />
        ) : null}
      </div>

      {selectedRoom && (
        <PaymentGateway
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          roomName={selectedRoom.name}
          entryFee={selectedRoom.entryFee}
          onPaymentSuccess={handlePaymentSuccess}
          roomId={selectedRoom.id}
        />
      )}
    </div>
  );
};

export default RoomsPage;
