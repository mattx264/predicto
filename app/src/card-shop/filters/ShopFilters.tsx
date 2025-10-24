import React, { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import "./ShopFilters.css";

interface ShopFiltersProps {
  selectedRarity: string;
  selectedType: string;
  onRarityChange: (rarity: string) => void;
  onTypeChange: (type: string) => void;
  className?: string;
}

const ShopFilters: React.FC<ShopFiltersProps> = ({
  selectedRarity,
  selectedType,
  onRarityChange,
  onTypeChange,
  className = "",
}) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const rarityFilters = [
    { value: "all", label: "Wszystkie" },
    { value: "bronze", label: "Bronze" },
    { value: "silver", label: "Silver" },
    { value: "gold", label: "Gold" },
    { value: "legendary", label: "Legendary" },
  ];

  const typeFilters = [
    { value: "all", label: "Wszystkie" },
    { value: "pack", label: "Paczki" },
    { value: "card", label: "Karty" },
    { value: "bundle", label: "Bundle" },
  ];

  return (
    <div className={`shop-filters-container ${className}`}>
      <div className="shop-filters desktop-filters">
        <div className="filter-group">
          <h3 className="filter-title">Rzadkość</h3>
          <div className="filter-buttons">
            {rarityFilters.map((filter) => (
              <button
                key={filter.value}
                className={`filter-btn ${
                  selectedRarity === filter.value ? "active" : ""
                }`}
                onClick={() => onRarityChange(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h3 className="filter-title">Typ przedmiotu</h3>
          <div className="filter-buttons">
            {typeFilters.map((filter) => (
              <button
                key={filter.value}
                className={`filter-btn ${
                  selectedType === filter.value ? "active" : ""
                }`}
                onClick={() => onTypeChange(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mobile-filters-wrapper">
        <button
          className="mobile-filters-toggle"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <Filter size={20} />
          <span>Filtry</span>
          <ChevronDown
            size={20}
            className={`chevron ${isMobileFiltersOpen ? "open" : ""}`}
          />
        </button>

        <div className={`mobile-filters ${isMobileFiltersOpen ? "open" : ""}`}>
          <div className="mobile-filter-section">
            <label className="mobile-filter-label">Rzadkość</label>
            <select
              className="mobile-filter-select"
              value={selectedRarity}
              onChange={(e) => onRarityChange(e.target.value)}
            >
              {rarityFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mobile-filter-section">
            <label className="mobile-filter-label">Typ przedmiotu</label>
            <select
              className="mobile-filter-select"
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
            >
              {typeFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopFilters;
