// components/filters/ShopFilters.tsx
import React, { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import "./ShopFilters.css";

interface ShopFiltersProps {
    selectedRarity: string;
    selectedType: string;
    selectedCollection: string;
    onRarityChange: (rarity: string) => void;
    onTypeChange: (type: string) => void;
    onCollectionChange: (collection: string) => void;
    className?: string;
}

const ShopFilters: React.FC<ShopFiltersProps> = ({
    selectedRarity,
    selectedType,
    selectedCollection,
    onRarityChange,
    onTypeChange,
    onCollectionChange,
    className = "",
}) => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const rarityFilters = [
        { value: "all", label: "Wszystkie" },
        { value: "common", label: "Common" },
        { value: "rare", label: "Rare" },
        { value: "epic", label: "Epic" },
        { value: "legendary", label: "Legendary" },
    ];

    const typeFilters = [
        { value: "all", label: "Wszystkie" },
        { value: "avatar", label: "Awatary" },
        { value: "frame", label: "Ramki" },
        { value: "badge", label: "Odznaki" },
        { value: "title", label: "Tytuły" },
        { value: "bundle", label: "Bundle" },
    ];

    const collectionFilters = [
        { value: "all", label: "Wszystkie" },
        { value: "clubs", label: "Kluby" },
        { value: "national", label: "Narodowe" },
        { value: "legends", label: "Legendy" },
        { value: "seasonal", label: "Sezonowe" },
        { value: "positions", label: "Pozycje" },
    ];

    // Sprawdź czy jakieś filtry są aktywne
    const hasActiveFilters = selectedRarity !== "all" || selectedType !== "all" || selectedCollection !== "all";
    const activeFiltersCount = [
        selectedRarity !== "all",
        selectedType !== "all",
        selectedCollection !== "all"
    ].filter(Boolean).length;

    return (
        <div className={`shop-filters-container ${className}`}>
            <button
                className="filters-toggle-btn"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
                <div className="filters-toggle-content">
                    <Filter size={20} />
                    <span className="filters-toggle-text">Filtry</span>
                    {hasActiveFilters && (
                        <span className="active-filters-badge">{activeFiltersCount}</span>
                    )}
                </div>
                <ChevronDown
                    size={20}
                    className={`filters-chevron ${isFiltersOpen ? "open" : ""}`}
                />
            </button>

            <div className={`filters-content ${isFiltersOpen ? "open" : ""}`}>
                <div className="filter-group">
                    <h3 className="filter-title">Rzadkość</h3>
                    <div className="filter-buttons">
                        {rarityFilters.map((filter) => (
                            <button
                                key={filter.value}
                                className={`filter-btn ${selectedRarity === filter.value ? "active" : ""}`}
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
                                className={`filter-btn ${selectedType === filter.value ? "active" : ""}`}
                                onClick={() => onTypeChange(filter.value)}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <h3 className="filter-title">Kolekcja</h3>
                    <div className="filter-buttons">
                        {collectionFilters.map((filter) => (
                            <button
                                key={filter.value}
                                className={`filter-btn ${selectedCollection === filter.value ? "active" : ""}`}
                                onClick={() => onCollectionChange(filter.value)}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopFilters;