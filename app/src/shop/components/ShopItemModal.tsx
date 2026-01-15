// components/ShopItemModal.tsx
import React, { useEffect } from "react";
import { X, Sparkles, Gem, Check, ShoppingCart } from "lucide-react";
import "./ShopItemModal.css";
import type { ShopItem } from "../../types/shopTypes";

interface ShopItemModalProps {
    item: ShopItem | null;
    isOpen: boolean;
    onClose: () => void;
    userCoins: number;
    userPremium: number;
    onPurchase?: (item: ShopItem) => void;
}

const ShopItemModal: React.FC<ShopItemModalProps> = ({
    item,
    isOpen,
    onClose,
    userCoins,
    userPremium,
    onPurchase,
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!item) return null;

    const canAfford =
        item.currency === "coins"
            ? userCoins >= item.price
            : userPremium >= item.price;

    const handlePurchase = () => {
        if (canAfford && !item.isOwned && onPurchase) {
            onPurchase(item);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
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
        <div className={`modal-backdrop ${isOpen ? "open" : ""}`} onClick={handleBackdropClick}>
            <div className="modal-container">
                <button className="modal-close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className={`modal-content ${item.rarity}`}>
                    <div className="modal-image-section">
                        <div className={`modal-item-card ${item.rarity}`}>
                            <div className="modal-rarity-glow" />
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="modal-item-image"
                                onError={(e) => {
                                    e.currentTarget.src = `https://via.placeholder.com/400x400/0f172a/22c55e?text=${getTypeIcon(item.type)}`;
                                }}
                            />
                            {item.type === "frame" && (
                                <div className="modal-frame-preview">
                                    <div className="frame-inner" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={`modal-details-section ${item.rarity}`}>
                        <div className="modal-header">
                            <div className="modal-type-badge">
                                <span className="type-icon-modal">{getTypeIcon(item.type)}</span>
                                <h2 className="modal-title">{item.name}</h2>
                            </div>
                            <span className={`modal-rarity-badge ${item.rarity}`}>
                                {item.rarity.toUpperCase()}
                            </span>
                        </div>

                        <p className="modal-description">{item.description}</p>

                        {item.collection && (
                            <div className="modal-collection-info">
                                <span className="collection-label-modal">Kolekcja:</span>
                                <span className="collection-value-modal">{item.collection}</span>
                            </div>
                        )}

                        {item.features && item.features.length > 0 && (
                            <div className="modal-features">
                                <h3 className="modal-section-title">Zawiera:</h3>
                                <ul className="modal-features-list">
                                    {item.features.map((feature, index) => (
                                        <li key={index} className="modal-feature-item">
                                            <span className="feature-check">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {item.discount && (
                            <div className="modal-discount">
                                <span className="discount-text">
                                    Oszczędzasz {item.discount}%!
                                </span>
                            </div>
                        )}

                        <div className="modal-price-section">
                            <div className="modal-price">
                                <span className="price-label">Cena:</span>
                                <div className="price-value">
                                    {item.currency === "coins" ? (
                                        <>
                                            <Sparkles size={24} color="#ffd700" />
                                            <span>{item.price.toLocaleString()}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Gem size={24} color="#a855f7" />
                                            <span>{item.price}</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {item.discount && (
                                <div className="original-price-info">
                                    Cena regularna:{" "}
                                    {Math.round(
                                        (item.price * 100) / (100 - item.discount)
                                    ).toLocaleString()}
                                </div>
                            )}

                            {!canAfford && !item.isOwned && (
                                <div className="insufficient-funds">
                                    Niewystarczające środki!
                                </div>
                            )}
                        </div>

                        <button
                            className={`modal-purchase-btn ${!canAfford || item.isOwned ? "disabled" : ""
                                }`}
                            onClick={handlePurchase}
                            disabled={!canAfford || item.isOwned}
                        >
                            {item.isOwned ? (
                                <>
                                    <Check size={20} />
                                    POSIADANE
                                </>
                            ) : (
                                <>
                                    <ShoppingCart size={20} />
                                    KUP TERAZ
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopItemModal;