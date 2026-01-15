import React from "react";
import { Search, Filter, Trophy, ChevronDown } from "lucide-react";
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
      <div className="filter-item search-item">
        <div className="filter-input-group">
          <Search className="filter-input-icon" size={20} />
          <input
            type="text"
            placeholder="Szukaj pokoju lub gracza..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="glass-input"
          />
        </div>
      </div>

      <div className="filter-item">
        <div className="filter-input-group">
          <Filter className="filter-input-icon" size={20} />
          <select
            value={filterStatus}
            onChange={(e) =>
              onStatusChange(e.target.value as "all" | "open" | "active" | "ended")
            }
            className="glass-select"
          >
            <option value="all">Wszystkie statusy</option>
            <option value="open">Otwarte</option>
            <option value="active">Aktywne</option>
            <option value="ended">Zakończone</option>
          </select>
          <ChevronDown className="select-arrow" size={16} />
        </div>
      </div>

      <div className="filter-item">
        <div className="filter-input-group">
          <Trophy className="filter-input-icon" size={20} />
          <select
            value={filterLeague}
            onChange={(e) => onLeagueChange(e.target.value)}
            className="glass-select"
          >
            {leagues.map((league) => (
              <option key={league} value={league}>
                {league === "all" ? "Wszystkie ligi" : league}
              </option>
            ))}
          </select>
          <ChevronDown className="select-arrow" size={16} />
        </div>
      </div>
    </div>
  );
};

export default RoomsFilters;