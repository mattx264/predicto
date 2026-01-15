// components/CosmeticShop.tsx
import React, { useState } from "react";
import { ShoppingCart, Sparkles, Gem } from "lucide-react";

import { shopItems } from "../data/shopData";
import ShopItemCard from "./ShopItemCard";
import ShopItemModal from "./ShopItemModal";

import "./CosmeticShop.css";
import type { ShopItem } from "../../types/shopTypes";
import ShopFilters from "../filters/ShopFilters";
import ShopFeatured from "../shop-featured/ShopFeatured";

const CosmeticShop: React.FC = () => {
    const [selectedRarity, setSelectedRarity] = useState<string>("all");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [selectedCollection, setSelectedCollection] = useState<string>("all");
    const [userCoins, setUserCoins] = useState(10000);
    const [userPremium, setUserPremium] = useState(150);
    const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ownedItems, setOwnedItems] = useState<string[]>([]);

    const filteredItems = shopItems.filter((item) => {
        const rarityMatch =
            selectedRarity === "all" || item.rarity === selectedRarity;
        const typeMatch = selectedType === "all" || item.type === selectedType;
        const collectionMatch =
            selectedCollection === "all" || item.collection === selectedCollection;
        return rarityMatch && typeMatch && collectionMatch;
    });

    const handleCardClick = (item: ShopItem) => {
        const itemWithOwnership = {
            ...item,
            isOwned: ownedItems.includes(item.id),
        };
        setSelectedItem(itemWithOwnership);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedItem(null), 300);
    };

    const handlePurchase = (item: ShopItem) => {
        if (ownedItems.includes(item.id)) {
            alert("Już posiadasz ten przedmiot!");
            return;
        }

        if (item.currency === "coins") {
            if (userCoins >= item.price) {
                setUserCoins((prev) => prev - item.price);
                setOwnedItems((prev) => [...prev, item.id]);
                alert(`Zakupiono: ${item.name}!`);
                handleCloseModal();
            } else {
                alert("Niewystarczająca ilość monet!");
            }
        } else {
            if (userPremium >= item.price) {
                setUserPremium((prev) => prev - item.price);
                setOwnedItems((prev) => [...prev, item.id]);
                alert(`Zakupiono: ${item.name}!`);
                handleCloseModal();
            } else {
                alert("Niewystarczająca ilość premium!");
            }
        }
    };

    const handleFeaturedItemClick = (itemId: string) => {
        const item = shopItems.find((i) => i.id === itemId);
        if (item) {
            handleCardClick(item);
        }
    };

    return (
        <div className="cosmetic-shop">
            <div className="shop-header">
                <div className="shop-title-section">
                    <h1 className="shop-title">
                        <ShoppingCart size={48} />
                        SKLEP KOSMETYCZNY
                    </h1>
                    <p className="shop-subtitle">
                        Personalizuj swój profil i wyróżnij się wśród innych graczy
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
                selectedCollection={selectedCollection}
                onRarityChange={setSelectedRarity}
                onTypeChange={setSelectedType}
                onCollectionChange={setSelectedCollection}
            />

            <div className="shop-grid">
                {filteredItems.map((item) => {
                    const itemWithOwnership = {
                        ...item,
                        isOwned: ownedItems.includes(item.id),
                    };
                    return (
                        <ShopItemCard
                            key={item.id}
                            item={itemWithOwnership}
                            onClick={handleCardClick}
                        />
                    );
                })}
            </div>

            {filteredItems.length === 0 && (
                <div className="no-items">
                    <p>Brak przedmiotów spełniających wybrane kryteria</p>
                </div>
            )}

            <ShopItemModal
                item={selectedItem}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                userCoins={userCoins}
                userPremium={userPremium}
                onPurchase={handlePurchase}
            />
        </div>
    );
};

export default CosmeticShop;