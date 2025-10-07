import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trophy } from "lucide-react";
import "./RoomsPage.css";
import PaymentGateway from "../payment/PaymentGateway";
import MyRooms from "../my-rooms/MyRooms";
import AllRoomsCards from "./rooms-cards/AllRoomsCards";
import RoomsFilters from "./rooms-filter/RoomsFilters";
import RoomsStats from "./rooms-stats/RoomsStats";

interface Room {
  id: string;
  name: string;
  creator: string;
  participants: number;
  maxParticipants: number;
  entryFee: number;
  prize: number;
  league: string;
  startDate: string;
  endDate: string;
  isPrivate: boolean;
  status: "open" | "active" | "ended";
}

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

  const mockRooms: Room[] = [
    {
      id: "1",
      name: "Premier League Masters",
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
    {
      id: "2",
      name: "Liga Mistrzów 2025",
      creator: "PiotrNowak",
      participants: 12,
      maxParticipants: 15,
      entryFee: 100,
      prize: 1500,
      league: "Champions League",
      startDate: "2025-10-10",
      endDate: "2025-12-20",
      isPrivate: false,
      status: "open",
    },
    {
      id: "3",
      name: "Prywatna Liga Znajomych",
      creator: "AnnaWiśniewska",
      participants: 6,
      maxParticipants: 8,
      entryFee: 25,
      prize: 200,
      league: "La Liga",
      startDate: "2025-10-01",
      endDate: "2025-10-31",
      isPrivate: true,
      status: "active",
    },
    {
      id: "4",
      name: "Bundesliga Pro",
      creator: "MarcinKowalczyk",
      participants: 10,
      maxParticipants: 10,
      entryFee: 75,
      prize: 750,
      league: "Bundesliga",
      startDate: "2025-09-01",
      endDate: "2025-09-30",
      isPrivate: false,
      status: "ended",
    },
    {
      id: "5",
      name: "Ekstraklasa Challenge",
      creator: "TomaszZieliński",
      participants: 15,
      maxParticipants: 20,
      entryFee: 30,
      prize: 600,
      league: "Ekstraklasa",
      startDate: "2025-10-08",
      endDate: "2025-11-15",
      isPrivate: false,
      status: "open",
    },
    {
      id: "6",
      name: "Serie A Elite",
      creator: "KarolinaNowacka",
      participants: 7,
      maxParticipants: 12,
      entryFee: 60,
      prize: 720,
      league: "Serie A",
      startDate: "2025-10-12",
      endDate: "2025-12-01",
      isPrivate: false,
      status: "open",
    },
  ];

  const leagues = [
    "all",
    "Premier League",
    "Champions League",
    "La Liga",
    "Bundesliga",
    "Ekstraklasa",
    "Serie A",
  ];

  const filteredRooms = mockRooms.filter((room) => {
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
    const room = mockRooms.find((r) => r.id === roomId);
    if (room && room.status === "open") {
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
          <button
            className="create-room-btn"
            onClick={() => navigate("/create-room")}
          >
            <Plus className="btn-icon" />
            Stwórz Pokój
          </button>
        </div>

       
        <RoomsFilters
          searchQuery={searchQuery}
          filterStatus={filterStatus}
          filterLeague={filterLeague}
          leagues={leagues}
          onSearchChange={setSearchQuery}
          onStatusChange={setFilterStatus}
          onLeagueChange={setFilterLeague}
        />

     
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === "all" ? "active" : ""}`}
            onClick={() => setViewMode("all")}
          >
            Wszystkie pokoje
          </button>
          <button
            className={`toggle-btn ${viewMode === "my" ? "active" : ""}`}
            onClick={() => setViewMode("my")}
          >
            Moje pokoje
          </button>
        </div>

    
        <RoomsStats rooms={mockRooms} />

     
        {viewMode === "all" ? (
          <AllRoomsCards rooms={filteredRooms} onRoomClick={handleRoomClick} />
        ) : (
          <MyRooms currentUserId={currentUserId} />
        )}
      </div>

   
      {selectedRoom && (
        <PaymentGateway
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          roomName={selectedRoom.name}
          entryFee={selectedRoom.entryFee}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default RoomsPage;
