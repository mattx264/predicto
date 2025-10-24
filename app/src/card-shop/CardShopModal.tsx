import React, { useState, useEffect } from "react";
import { X, Sparkles, Gem, ShoppingCart } from "lucide-react";
import "./CardShopModal.css";

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

interface CardShopModalProps {
  item: ShopItem | null;
  isOpen: boolean;
  onClose: () => void;
  userCoins: number;
  userPremium: number;
}

const CardShopModal: React.FC<CardShopModalProps> = ({
  item,
  isOpen,
  onClose,
  userCoins,
  userPremium,
}) => {
  const [quantity, setQuantity] = useState(1);

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

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const totalPrice = item.price * quantity;
  const userCurrency = item.currency === "coins" ? userCoins : userPremium;
  const canAfford = userCurrency >= totalPrice;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handlePurchase = () => {
    console.log(`Zakupiono ${quantity}x ${item.name} za ${totalPrice}`);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className={`modal-content ${item.rarity}`}>
          <div className="modal-card-section">
            <div className={`modal-card ${item.rarity}`}>
              <img
                src={item.cardImage}
                alt={item.name}
                className="modal-card-image"
              />
            </div>
          </div>

          <div className={`modal-details-section ${item.rarity}`}>
            <div className="modal-header">
              <h2 className="modal-title">{item.name}</h2>
              <span className={`modal-rarity-badge ${item.rarity}`}>
                {item.rarity.toUpperCase()}
              </span>
            </div>

            <p className="modal-description">{item.description}</p>

            <div className="modal-features">
              <h3 className="modal-section-title">Co zawiera?</h3>
              <ul className="modal-features-list">
                {item.features.map((feature, index) => (
                  <li key={index} className="modal-feature-item">
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {item.discount && (
              <div className="modal-discount">
                <span className="discount-text">
                  Oszczędzasz {item.discount}%!
                </span>
              </div>
            )}

            <div className="modal-quantity">
              <h3 className="modal-section-title">Ilość</h3>
              <div className="quantity-control">
                <button
                  className="quantity-btn"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  className="quantity-input"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
                <button className="quantity-btn" onClick={handleIncrement}>
                  +
                </button>
              </div>
            </div>

            <div className="modal-price-section">
              <div className="modal-price">
                <span className="price-label">Łączna cena:</span>
                <div className="price-value">
                  {item.currency === "coins" ? (
                    <>
                      <Sparkles size={24} color="#ffd700" />
                      <span>{totalPrice.toLocaleString()}</span>
                    </>
                  ) : (
                    <>
                      <Gem size={24} color="#a855f7" />
                      <span>{totalPrice}</span>
                    </>
                  )}
                </div>
              </div>

              {!canAfford && (
                <div className="insufficient-funds">
                  Niewystarczające środki!
                </div>
              )}
            </div>

            <button
              className={`modal-purchase-btn ${!canAfford ? "disabled" : ""}`}
              onClick={handlePurchase}
              disabled={!canAfford}
            >
              <ShoppingCart size={20} />
              KUP TERAZ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardShopModal;
