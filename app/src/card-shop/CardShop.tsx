import React, { useState } from "react";
import { ShoppingCart, Star, Zap, Sparkles, Gem } from "lucide-react";
import "./CardShop.css";
import CardShopModal from "./CardShopModal";
import ShopFilters from "./filters/ShopFilters";
import ShopFeatured from "./shop-featured/ShopFeatured";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: "coins" | "premium";
  rarity: "bronze" | "silver" | "gold" | "diamond" | "legendary";
  type: "pack" | "card" | "bundle";
  features: string[];
  discount?: number;
  bestValue?: boolean;
  limitedTime?: boolean;
  cardImage: string;
}

const shopItems: ShopItem[] = [
  {
    id: "bronze-pack",
    name: "BRONZE PACK",
    description: "Podstawowa paczka z 3 kartami graczy",
    price: 500,
    currency: "coins",
    rarity: "bronze",
    type: "pack",
    features: ["3 karty graczy", "Rating 60-74", "Gwarancja 1 rzadkości"],
    cardImage: "/card-image/bronze-card.png",
  },
  {
    id: "silver-pack",
    name: "SILVER PACK",
    description: "Ulepszona paczka z 5 kartami graczy",
    price: 1500,
    currency: "coins",
    rarity: "silver",
    type: "pack",
    features: ["5 kart graczy", "Rating 65-79", "Gwarancja 2 rzadkości"],
    cardImage: "/card-image/silver-card.png",
  },
  {
    id: "gold-pack",
    name: "GOLD PREMIUM PACK",
    description: "Ekskluzywna paczka z najlepszymi graczami",
    price: 5000,
    currency: "coins",
    rarity: "gold",
    type: "pack",
    features: [
      "7 kart graczy",
      "Rating 75-85",
      "Gwarancja 1 karty 80+",
      "Szansa na ikonę",
    ],
    bestValue: true,
    cardImage: "/card-image/gold-card.png",
  },
  {
    id: "legendary-pack",
    name: "LEGENDARY ICON PACK",
    description: "Najrzadsza paczka z gwarancją ikony",
    price: 250,
    currency: "premium",
    rarity: "legendary",
    type: "pack",
    features: [
      "5 kart graczy",
      "Rating 85+",
      "Gwarantowana ikona 88+",
      "Ekskluzywna animacja",
    ],
    limitedTime: true,
    cardImage: "/card-image/platinum-card.png",
  },
  {
    id: "starter-bundle",
    name: "STARTER BUNDLE",
    description: "Idealny zestaw startowy dla nowych graczy",
    price: 2000,
    currency: "coins",
    rarity: "diamond",
    type: "bundle",
    features: [
      "2x Bronze Pack",
      "1x Silver Pack",
      "500 dodatkowych monet",
      "Bonus: Random player 75+",
    ],
    discount: 30,
    cardImage: "/card-image/diamond-card.png",
  },
  {
    id: "mega-bundle",
    name: "MEGA BUNDLE",
    description: "Najlepszy deal! Ogromna wartość",
    price: 15000,
    currency: "coins",
    rarity: "gold",
    type: "bundle",
    features: [
      "5x Gold Premium Pack",
      "1x Legendary Icon Pack",
      "3000 dodatkowych monet",
      "Gwarancja ikony 90+",
    ],
    discount: 40,
    bestValue: true,
    cardImage: "/card-image/obsidian-card.png",
  },
];

const CardShop: React.FC = () => {
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [userCoins] = useState(10000);
  const [userPremium] = useState(150);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems = shopItems.filter((item) => {
    const rarityMatch =
      selectedRarity === "all" || item.rarity === selectedRarity;
    const typeMatch = selectedType === "all" || item.type === selectedType;
    return rarityMatch && typeMatch;
  });

  const handleCardClick = (item: ShopItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const handleRarityChange = (rarity: string) => {
    setSelectedRarity(rarity);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };
  const handleFeaturedItemClick = (itemId: string) => {
    const item = shopItems.find(i => i.id === itemId);
    if (item) {
      setSelectedItem(item);
      setIsModalOpen(true);
    }
  };
  return (
    <div className="card-shop">
      <div className="shop-header">
        <div className="shop-title-section">
          <h1 className="shop-title">
            <ShoppingCart size={48} />
            SKLEP Z KARTAMI
          </h1>
          <p className="shop-subtitle">
            Zdobywaj najlepsze karty i paczki piłkarskie
          </p>
        </div>

        <div className="user-currency">
          <div className="currency-item coins">
            <div className="currency-icon">
              <Sparkles size={28} color="#ffd700" />
            </div>
            <div className="currency-info">
              <span className="currency-label">Monety</span>
              <span className="currency-value">
                {userCoins.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="currency-item premium">
            <div className="currency-icon">
              <Gem size={28} color="#a855f7" />
            </div>
            <div className="currency-info">
              <span className="currency-label">Premium</span>
              <span className="currency-value">{userPremium}</span>
            </div>
          </div>
        </div>
      </div>
      <ShopFeatured onItemClick={handleFeaturedItemClick} />
      <ShopFilters
        selectedRarity={selectedRarity}
        selectedType={selectedType}
        onRarityChange={handleRarityChange}
        onTypeChange={handleTypeChange}
      />

      <div className="shop-grid">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="wrapper-item"
            onClick={() => handleCardClick(item)}
            style={{ cursor: "pointer" }}
          >
            {item.limitedTime && (
              <div className="limited-badge">
                <Zap size={14} />
                LIMITOWANE
              </div>
            )}
            {item.bestValue && (
              <div className="best-value-badge">
                <Star size={14} />
                NAJLEPSZA OFERTA
              </div>
            )}
            {item.discount && (
              <div className="discount-badge">-{item.discount}%</div>
            )}

            <div className={`fut-player-card ${item.rarity}`}>
              <img
                src={item.cardImage}
                alt={item.name}
                className="card-image"
              />
            </div>
          </div>
        ))}
      </div>

      <CardShopModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userCoins={userCoins}
        userPremium={userPremium}
      />
    </div>
  );
};

export default CardShop;
