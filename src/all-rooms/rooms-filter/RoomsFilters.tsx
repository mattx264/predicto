import React from "react";
import { Search, Filter, Trophy } from "lucide-react";
import "./RoomsFilters.css";

interface RoomsFiltersProps {
  searchQuery: string;
  filterStatus: "all" | "open" | "active" | "ended";
  filterLeague: string;
  leagues: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: "all" | "open" | "active" | "ended") => void;
  onLeagueChange: (value: string) => void;
}

const RoomsFilters: React.FC<RoomsFiltersProps> = ({
  searchQuery,
  filterStatus,
  filterLeague,
  leagues,
  onSearchChange,
  onStatusChange,
  onLeagueChange,
}) => {
  return (
    <div className="filters-section">
      <div className="search-box">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Szukaj pokoju lub użytkownika..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <Filter className="filter-icon" />
        <select
          value={filterStatus}
          onChange={(e) =>
            onStatusChange(
              e.target.value as "all" | "open" | "active" | "ended"
            )
          }
          className="filter-select"
        >
          <option value="all">Wszystkie statusy</option>
          <option value="open">Otwarte</option>
          <option value="active">Aktywne</option>
          <option value="ended">Zakończone</option>
        </select>
      </div>

      <div className="filter-group">
        <Trophy className="filter-icon" />
        <select
          value={filterLeague}
          onChange={(e) => onLeagueChange(e.target.value)}
          className="filter-select"
        >
          {leagues.map((league) => (
            <option key={league} value={league}>
              {league === "all" ? "Wszystkie ligi" : league}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RoomsFilters;
