// components/shop-featured/ShopFeatured.tsx
import React from "react";
import { Sparkles, Clock, TrendingUp, Zap, Star } from "lucide-react";
import "./ShopFeatured.css";

interface FeaturedItem {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    currency: "coins" | "premium";
    rarity: "common" | "rare" | "epic" | "legendary";
    type: "avatar" | "frame" | "badge" | "title" | "bundle";
    imageUrl: string;
    badge?: "daily" | "flash" | "trending" | "new" | "best";
    timeLeft?: string;
    discount?: number;
}

const featuredItems: FeaturedItem[] = [
    {
        id: "bundle-premium",
        name: "PREMIUM BUNDLE",
        description: "Najlepszy pakiet w sklepie - wszystko czego potrzebujesz!",
        price: 450,
        originalPrice: 750,
        currency: "coins",
        rarity: "legendary",
        type: "bundle",
        imageUrl: "https://via.placeholder.com/300x300/f59e0b/FFFFFF?text=PREMIUM",
        badge: "best",
        discount: 40,
    },
    {
        id: "avatar-legend-10",
        name: "Argentyński Geniusz #10",
        description: "Limitowana edycja - tylko dziś!",
        price: 150,
        originalPrice: 200,
        currency: "coins",
        rarity: "legendary",
        type: "avatar",
        imageUrl: "https://via.placeholder.com/300x300/75AADB/FFFFFF?text=L10",
        badge: "flash",
        timeLeft: "03:45:12",
        discount: 25,
    },
    {
        id: "frame-animated",
        name: "Animated Glory",
        description: "Najnowsza animowana ramka z efektami",
        price: 120,
        currency: "premium",
        rarity: "legendary",
        type: "frame",
        imageUrl: "https://via.placeholder.com/300x300/FF6B35/000000?text=Frame",
        badge: "new",
    },
    {
        id: "bundle-seasonal",
        name: "Christmas Bundle",
        description: "Najpopularniejszy pakiet tego tygodnia!",
        price: 200,
        currency: "premium",
        rarity: "epic",
        type: "bundle",
        imageUrl: "https://via.placeholder.com/300x300/DC143C/FFFFFF?text=XMAS",
        badge: "trending",
    },
];

interface ShopFeaturedProps {
    onItemClick: (itemId: string) => void;
}

const ShopFeatured: React.FC<ShopFeaturedProps> = ({ onItemClick }) => {
    const getBadgeIcon = (badge: string | undefined) => {
        switch (badge) {
            case "daily":
                return <Clock size={14} />;
            case "flash":
                return <Zap size={14} />;
            case "trending":
                return <TrendingUp size={14} />;
            case "new":
                return <Sparkles size={14} />;
            case "best":
                return <Star size={14} />;
            default:
                return null;
        }
    };

    const getBadgeText = (badge: string | undefined) => {
        switch (badge) {
            case "daily":
                return "OFERTA DNIA";
            case "flash":
                return "FLASH SALE";
            case "trending":
                return "TRENDING";
            case "new":
                return "NOWOŚĆ";
            case "best":
                return "NAJLEPSZA OFERTA";
            default:
                return "";
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
        <div className="shop-featured">
            <div className="featured-header">
                <h2 className="featured-title">
                    <Sparkles size={32} />
                    WYRÓŻNIONE OFERTY
                </h2>
                <p className="featured-subtitle">
                    Limitowane oferty i najlepsze deale - nie przegap!
                </p>
            </div>

            <div className="featured-grid">
                {featuredItems.map((item) => (
                    <div
                        key={item.id}
                        className={`featured-item ${item.rarity}`}
                        onClick={() => onItemClick(item.id)}
                    >
                        {item.badge && (
                            <div className={`featured-badge ${item.badge}`}>
                                {getBadgeIcon(item.badge)}
                                {getBadgeText(item.badge)}
                            </div>
                        )}

                        {item.discount && (
                            <div className="featured-discount">-{item.discount}%</div>
                        )}

                        <div className="featured-image-wrapper">
                            <div className={`featured-rarity-glow ${item.rarity}`} />
                            <div className="featured-type-icon">{getTypeIcon(item.type)}</div>
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="featured-image"
                                onError={(e) => {
                                    e.currentTarget.src = `https://via.placeholder.com/300x300/0f172a/22c55e?text=${getTypeIcon(item.type)}`;
                                }}
                            />
                        </div>

                        <div className="featured-info">
                            <h3 className="featured-item-name">{item.name}</h3>
                            <p className="featured-item-description">{item.description}</p>

                            {item.timeLeft && (
                                <div className="featured-timer">
                                    <Clock size={16} />
                                    <span>Kończy się za: {item.timeLeft}</span>
                                </div>
                            )}

                            <div className="featured-price-section">
                                {item.originalPrice && (
                                    <span className="featured-original-price">
                                        {item.originalPrice.toLocaleString()}
                                    </span>
                                )}
                                <div className="featured-price">
                                    {item.currency === "coins" ? (
                                        <>
                                            <Sparkles size={20} color="#ffd700" />
                                            <span>{item.price.toLocaleString()}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="premium-gem">💎</span>
                                            <span>{item.price}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button className={`featured-buy-btn ${item.rarity}`}>
                            ZOBACZ OFERTĘ
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopFeatured;