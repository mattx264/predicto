// components/ShopItemCard.tsx
import React from "react";
import { Star, Zap, Check } from "lucide-react";
import "./ShopItemCard.css";
import type { ShopItem } from "../../types/shopTypes";

interface ShopItemCardProps {
    item: ShopItem;
    onClick: (item: ShopItem) => void;
}

const ShopItemCard: React.FC<ShopItemCardProps> = ({ item, onClick }) => {
    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case "common":
                return "#94a3b8";
            case "rare":
                return "#3b82f6";
            case "epic":
                return "#a855f7";
            case "legendary":
                return "#f59e0b";
            default:
                return "#94a3b8";
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "avatar":
                return "🎭";
            case "frame":
                return "🖼️";
            case "badge":
                return "🏅";
            case "title":
                return "📜";
            case "bundle":
                return "📦";
            default:
                return "🎁";
        }
    };

    return (
        <div
            className={`shop-item-card ${item.rarity}`}
            onClick={() => onClick(item)}
        >
            {item.limitedTime && (
                <div className="item-badge limited">
                    <Zap size={14} />
                    LIMITOWANE
                </div>
            )}
            {item.bestValue && (
                <div className="item-badge best-value">
                    <Star size={14} />
                    NAJLEPSZA OFERTA
                </div>
            )}
            {item.discount && (
                <div className="item-badge discount">-{item.discount}%</div>
            )}
            {item.isOwned && (
                <div className="item-badge owned">
                    <Check size={14} />
                    POSIADANE
                </div>
            )}

            <div className="item-image-container">
                <div
                    className="item-rarity-glow"
                    style={{ backgroundColor: getRarityColor(item.rarity) }}
                />
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="item-image"
                    onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/300x300/0f172a/22c55e?text=${getTypeIcon(item.type)}`;
                    }}
                />
                {item.type === "frame" && (
                    <div className="frame-preview">
                        <div className="frame-inner" />
                    </div>
                )}
            </div>

            <div className="item-content">
                <div className="item-type-indicator">
                    <span className="type-icon">{getTypeIcon(item.type)}</span>
                    <span className="type-label">{item.type.toUpperCase()}</span>
                </div>

                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>

                {item.collection && (
                    <div className="item-collection">
                        <span className="collection-badge">{item.collection}</span>
                    </div>
                )}

                <div className="item-footer">
                    <div className="item-price">
                        <span className={`price-value ${item.currency}`}>
                            {item.price.toLocaleString()}
                        </span>
                        <span className="price-currency">
                            {item.currency === "coins" ? "Coins" : "Premium"}
                        </span>
                    </div>
                    <div className={`item-rarity-badge ${item.rarity}`}>
                        {item.rarity.toUpperCase()}
                    </div>
                </div>
            </div>

            <div className="item-hover-overlay">
                <span className="hover-text">Kliknij aby zobaczyć szczegóły</span>
            </div>
        </div>
    );
};

export default ShopItemCard;