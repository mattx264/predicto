import React, { useState, useEffect } from "react";
import { X, Package, Trash2, Calendar, Star, Award } from "lucide-react";
import "./InventoryItemModal.css";

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

interface InventoryItemModalProps {
  item: InventoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenPack: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
}

const InventoryItemModal: React.FC<InventoryItemModalProps> = ({
  item,
  isOpen,
  onClose,
  onOpenPack,
  onDeleteItem,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
      setShowDeleteConfirm(false);
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDeleteConfirm = () => {
    onDeleteItem(item.id);
    onClose();
  };

  const handleOpenPack = () => {
    onOpenPack(item.id);
    onClose();
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "bronze":
        return "#cd7f32";
      case "silver":
        return "#c0c0c0";
      case "gold":
        return "#ffd700";
      case "diamond":
        return "#00bfff";
      case "legendary":
        return "#ff6b35";
      default:
        return "#64748b";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pack":
        return <Package size={20} />;
      case "card":
        return <Award size={20} />;
      case "bundle":
        return <Star size={20} />;
      default:
        return <Package size={20} />;
    }
  };

  return (
    <div className="inventory-modal-backdrop" onClick={handleBackdropClick}>
      <div className="inventory-modal-container">
        <button className="inventory-modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className={`inventory-modal-content ${item.rarity}`}>
          <div className="inventory-modal-card-section">
            <div className={`inventory-modal-card ${item.rarity}`}>
              <img
                src={item.cardImage}
                alt={item.name}
                className="inventory-modal-card-image"
              />

              {item.quantity > 1 && (
                <div className="inventory-modal-quantity-badge">
                  x{item.quantity}
                </div>
              )}

              {item.type === "card" && item.playerRating && (
                <div className="inventory-modal-rating-badge">
                  {item.playerRating}
                </div>
              )}
            </div>
          </div>

          <div className={`inventory-modal-details-section ${item.rarity}`}>
            <div className="inventory-modal-header">
              <h2 className="inventory-modal-title">{item.name}</h2>
              <div className="inventory-modal-badges"></div>
            </div>

            <p className="inventory-modal-description">{item.description}</p>

            {item.type === "card" && (
              <div className="inventory-modal-player-stats">
                <h3 className="inventory-modal-section-title">
                  <Award size={18} />
                  Statystyki gracza
                </h3>
                <div className="player-stats-grid">
                  {item.playerRating && (
                    <div className="stat-item">
                      <span className="stat-label">Rating</span>
                      <span className="stat-value">{item.playerRating}</span>
                    </div>
                  )}
                  {item.playerPosition && (
                    <div className="stat-item">
                      <span className="stat-label">Pozycja</span>
                      <span className="stat-value">{item.playerPosition}</span>
                    </div>
                  )}
                  {item.teamName && (
                    <div className="stat-item">
                      <span className="stat-label">Klub</span>
                      <span className="stat-value">{item.teamName}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {item.features && item.features.length > 0 && (
              <div className="inventory-modal-features">
                <h3 className="inventory-modal-section-title">
                  <Package size={18} />
                  Zawartość
                </h3>
                <ul className="inventory-modal-features-list">
                  {item.features.map((feature, index) => (
                    <li key={index} className="inventory-modal-feature-item">
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="inventory-modal-metadata">
              <h3 className="inventory-modal-section-title">
                <Calendar size={18} />
                Informacje
              </h3>
              <div className="metadata-grid">
                <div className="metadata-item">
                  <span className="metadata-label">Data zdobycia</span>
                  <span className="metadata-value">
                    {new Date(item.dateAcquired).toLocaleDateString("pl-PL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Ilość</span>
                  <span className="metadata-value">{item.quantity}</span>
                </div>
                {item.type === "pack" && (
                  <div className="metadata-item">
                    <span className="metadata-label">Status</span>
                    <span
                      className={`metadata-value ${item.isOpened ? "opened" : "unopened"}`}
                    >
                      {item.isOpened ? "Otwarte" : "Nieotwarte"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="inventory-modal-actions">
              {item.type === "pack" && !item.isOpened && (
                <button
                  className="inventory-modal-action-btn open-btn"
                  onClick={handleOpenPack}
                >
                  <Package size={20} />
                  OTWÓRZ PACZKĘ
                </button>
              )}

              <button
                className={`inventory-modal-action-btn delete-btn ${showDeleteConfirm ? "confirm" : ""}`}
                onClick={() => {
                  if (showDeleteConfirm) {
                    handleDeleteConfirm();
                  } else {
                    setShowDeleteConfirm(true);
                  }
                }}
              >
                <Trash2 size={20} />
                {showDeleteConfirm ? "POTWIERDŹ USUNIĘCIE" : "USUŃ PRZEDMIOT"}
              </button>

              {showDeleteConfirm && (
                <button
                  className="inventory-modal-action-btn cancel-btn"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  ANULUJ
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItemModal;
