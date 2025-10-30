import React, { useState } from "react";
import { Package, Search, Filter, SortAsc, Trash2, Eye } from "lucide-react";
import "./Inventory.css";
import InventoryItemModal from "./modal/InventoryItemModal";
import PackOpeningModal from "./opening/PackOpening";
import PackOpening from "./opening/PackOpening";

interface InventoryItem {
  id: string;
  name: string;
  description: string;
  rarity: "bronze" | "silver" | "gold" | "diamond" | "legendary";
  type: "pack" | "card" | "bundle";
  quantity: number;
  dateAcquired: string;
  cardImage: string;
  features?: string[];
  isOpened?: boolean;
  playerRating?: number;
  playerPosition?: string;
  teamName?: string;
}

interface PackItem {
  id: string;
  name: string;
  description: string;
  rarity: "bronze" | "silver" | "gold" | "diamond" | "legendary";
  type: "card";
  cardImage: string;
  playerRating?: number;
  playerPosition?: string;
  teamName?: string;
  isNew?: boolean;
}

const mockInventoryItems: InventoryItem[] = [
  {
    id: "inv-1",
    name: "BRONZE PACK",
    description: "Nieotwarta paczka z 3 kartami graczy",
    rarity: "bronze",
    type: "pack",
    quantity: 3,
    dateAcquired: "2024-10-20",
    cardImage: "/card-image/bronze-card.png",
    features: ["3 karty graczy", "Rating 60-74", "Gwarancja 1 rzadkości"],
    isOpened: false,
  },
  {
    id: "inv-2",
    name: "Robert Lewandowski",
    description: "Kapitan reprezentacji Polski",
    rarity: "gold",
    type: "card",
    quantity: 1,
    dateAcquired: "2024-10-18",
    cardImage: "/card-image/gold-card.png",
    playerRating: 89,
    playerPosition: "ST",
    teamName: "FC Barcelona",
  },
  {
    id: "inv-3",
    name: "SILVER PACK",
    description: "Nieotwarta paczka z 5 kartami graczy",
    rarity: "silver",
    type: "pack",
    quantity: 2,
    dateAcquired: "2024-10-19",
    cardImage: "/card-image/silver-card.png",
    features: ["5 kart graczy", "Rating 65-79", "Gwarancja 2 rzadkości"],
    isOpened: false,
  },
  {
    id: "inv-4",
    name: "Kylian Mbappé",
    description: "Francuski napastnik PSG",
    rarity: "legendary",
    type: "card",
    quantity: 1,
    dateAcquired: "2024-10-17",
    cardImage: "/card-image/platinum-card.png",
    playerRating: 92,
    playerPosition: "ST",
    teamName: "Paris Saint-Germain",
  },
  {
    id: "inv-5",
    name: "STARTER BUNDLE",
    description: "Otwarty zestaw startowy",
    rarity: "diamond",
    type: "bundle",
    quantity: 1,
    dateAcquired: "2024-10-15",
    cardImage: "/card-image/diamond-card.png",
    features: ["2x Bronze Pack", "1x Silver Pack", "500 dodatkowych monet"],
    isOpened: true,
  },
  {
    id: "inv-6",
    name: "Virgil van Dijk",
    description: "Holenderski obrońca Liverpoolu",
    rarity: "gold",
    type: "card",
    quantity: 1,
    dateAcquired: "2024-10-16",
    cardImage: "/card-image/gold-card.png",
    playerRating: 87,
    playerPosition: "CB",
    teamName: "Liverpool FC",
  },
  {
    id: "inv-7",
    name: "GOLD PACK",
    description: "Nieotwarta paczka z 7 kartami graczy",
    rarity: "gold",
    type: "pack",
    quantity: 1,
    dateAcquired: "2024-10-21",
    cardImage: "/card-image/gold-card.png",
    features: ["7 kart graczy", "Rating 70-85", "Gwarancja 3 rzadkości"],
    isOpened: false,
  },
  {
    id: "inv-8",
    name: "DIAMOND PACK",
    description: "Nieotwarta paczka premium z 7 kartami graczy",
    rarity: "diamond",
    type: "pack",
    quantity: 1,
    dateAcquired: "2024-10-22",
    cardImage: "/card-image/diamond-card.png",
    features: ["7 kart graczy", "Rating 75-90", "Gwarancja 5 rzadkości"],
    isOpened: false,
  },
];

const Inventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(mockInventoryItems);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPackOpeningModalOpen, setIsPackOpeningModalOpen] = useState(false);
  const [packToOpen, setPackToOpen] = useState<InventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRarity, setFilterRarity] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("dateDesc");

  const filteredAndSortedItems = items
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity =
        filterRarity === "all" || item.rarity === filterRarity;
      const matchesType = filterType === "all" || item.type === filterType;
      return matchesSearch && matchesRarity && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "dateDesc":
          return (
            new Date(b.dateAcquired).getTime() -
            new Date(a.dateAcquired).getTime()
          );
        case "dateAsc":
          return (
            new Date(a.dateAcquired).getTime() -
            new Date(b.dateAcquired).getTime()
          );
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        case "rarity": {
          const rarityOrder = {
            bronze: 1,
            silver: 2,
            gold: 3,
            diamond: 4,
            legendary: 5,
          };
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        }
        case "quantity":
          return b.quantity - a.quantity;
        default:
          return 0;
      }
    });

  const handleItemClick = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const handleOpenPackClick = (item: InventoryItem) => {
    if (item.type === "pack" && !item.isOpened) {
      setPackToOpen(item);
      setIsPackOpeningModalOpen(true);
    }
  };

  const handlePackOpened = (newCards: PackItem[]) => {
    if (!packToOpen) return;

    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === packToOpen.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

    const newInventoryItems: InventoryItem[] = newCards.map((card) => ({
      id: card.id,
      name: card.name,
      description: card.description,
      rarity: card.rarity,
      type: "card" as const,
      quantity: 1,
      dateAcquired: new Date().toISOString().split("T")[0],
      cardImage: card.cardImage,
      playerRating: card.playerRating,
      playerPosition: card.playerPosition,
      teamName: card.teamName,
    }));

    setItems((prevItems) => [...prevItems, ...newInventoryItems]);
    setIsPackOpeningModalOpen(false);
    setPackToOpen(null);
  };

  const handleClosePackOpeningModal = () => {
    setIsPackOpeningModalOpen(false);
    setPackToOpen(null);
  };

  const handleOpenPack = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (item && item.type === "pack" && !item.isOpened) {
      handleOpenPackClick(item);
    }
  };

  const handleDeleteItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getRarityStats = () => {
    const stats = { bronze: 0, silver: 0, gold: 0, diamond: 0, legendary: 0 };
    items.forEach((item) => {
      stats[item.rarity] += item.quantity;
    });
    return stats;
  };

  const rarityStats = getRarityStats();

  return (
    <div className="inventory">
      <div className="inventory-header">
        <div className="inventory-title-section">
          <h1 className="inventory-title">
            <Package size={48} />
            EKWIPUNEK
          </h1>
          <p className="inventory-subtitle">
            Zarządzaj swoją kolekcją kart i przedmiotów
          </p>
        </div>

        <div className="inventory-stats">
          <div className="stat-item">
            <span className="stat-label">Łączne przedmioty</span>
            <span className="stat-value">{getTotalItems()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Unikalne</span>
            <span className="stat-value">{items.length}</span>
          </div>
        </div>
      </div>

      <div className="inventory-controls">
        <div className="search-container">
          <Search size={20} />
          <input
            type="text"
            placeholder="Szukaj przedmiotów..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <Filter size={16} />
            <select
              value={filterRarity}
              onChange={(e) => setFilterRarity(e.target.value)}
              className="filter-select"
            >
              <option value="all">Wszystkie rzadkości</option>
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="diamond">Diamond</option>
              <option value="legendary">Legendary</option>
            </select>
          </div>

          <div className="filter-group">
            <Filter size={16} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">Wszystkie typy</option>
              <option value="pack">Paczki</option>
              <option value="card">Karty</option>
              <option value="bundle">Zestawy</option>
            </select>
          </div>

          <div className="filter-group">
            <SortAsc size={16} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="dateDesc">Najnowsze</option>
              <option value="dateAsc">Najstarsze</option>
              <option value="nameAsc">Nazwa A-Z</option>
              <option value="nameDesc">Nazwa Z-A</option>
              <option value="rarity">Rzadkość</option>
              <option value="quantity">Ilość</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rarity-stats">
        {Object.entries(rarityStats).map(([rarity, count]) => (
          <div key={rarity} className={`rarity-stat ${rarity}`}>
            <div className={`rarity-color ${rarity}`}></div>
            <span className="rarity-name">{rarity.toUpperCase()}</span>
            <span className="rarity-count">{count}</span>
          </div>
        ))}
      </div>

      <div className="inventory-grid">
        {filteredAndSortedItems.map((item) => (
          <div
            key={item.id}
            className="inventory-wrapper-item"
            onClick={() => handleItemClick(item)}
            style={{ cursor: "pointer" }}
          >
            {item.quantity > 1 && (
              <div className="inventory-quantity-badge">{item.quantity}</div>
            )}

            {item.type === "card" && item.playerRating && (
              <div className="inventory-rating-badge">{item.playerRating}</div>
            )}

            {item.isOpened && (
              <div className="inventory-opened-badge">OTWARTE</div>
            )}

            <div className={`inventory-fut-player-card ${item.rarity}`}>
              <img
                src={item.cardImage}
                alt={item.name}
                className="inventory-card-image"
              />
            </div>

            <div className="inventory-quick-actions">
              <button
                className="quick-action-btn view-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(item);
                }}
                title="Zobacz szczegóły"
              >
                <Eye size={16} />
              </button>

              {item.type === "pack" && !item.isOpened && (
                <button
                  className="quick-action-btn open-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenPackClick(item);
                  }}
                  title="Otwórz paczkę"
                >
                  <Package size={16} />
                </button>
              )}

              <button
                className="quick-action-btn delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteItem(item.id);
                }}
                title="Usuń przedmiot"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedItems.length === 0 && (
        <div className="empty-inventory">
          <Package size={64} />
          <h3>Brak przedmiotów</h3>
          <p>Nie znaleziono przedmiotów pasujących do wybranych filtrów.</p>
        </div>
      )}

      <InventoryItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onOpenPack={handleOpenPack}
        onDeleteItem={handleDeleteItem}
      />

      {packToOpen && (
        <PackOpening
          rarity={packToOpen.rarity}
          onComplete={handlePackOpened}
          onClose={handleClosePackOpeningModal}
        />
      )}
    </div>
  );
};

export default Inventory;
