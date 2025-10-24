import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Package, Star, Sparkles, Trophy, Crown, Zap } from "lucide-react";
import "./PackOpeningModal.css";

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

interface PackOpeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  packName: string;
  packRarity: "bronze" | "silver" | "gold" | "diamond" | "legendary";
  packImage: string;
  onPackOpened: (items: PackItem[]) => void;
}

// Mock data for pack contents
const generatePackContents = (packRarity: string): PackItem[] => {
  const baseItems: Omit<PackItem, "id" | "rarity">[] = [
    {
      name: "Cristiano Ronaldo",
      description: "Portugalski napastnik",
      type: "card",
      cardImage: "/card-image/gold-card.png",
      playerRating: 91,
      playerPosition: "ST",
      teamName: "Al Nassr",
      isNew: true,
    },
    {
      name: "Lionel Messi",
      description: "Argentyński napastnik",
      type: "card",
      cardImage: "/card-image/platinum-card.png",
      playerRating: 93,
      playerPosition: "RW",
      teamName: "Inter Miami CF",
      isNew: false,
    },
    {
      name: "Erling Haaland",
      description: "Norweski napastnik",
      type: "card",
      cardImage: "/card-image/gold-card.png",
      playerRating: 88,
      playerPosition: "ST",
      teamName: "Manchester City",
      isNew: true,
    },
    {
      name: "Kylian Mbappé",
      description: "Francuski napastnik",
      type: "card",
      cardImage: "/card-image/platinum-card.png",
      playerRating: 92,
      playerPosition: "ST",
      teamName: "Real Madrid",
      isNew: false,
    },
    {
      name: "Kevin De Bruyne",
      description: "Belgijski pomocnik",
      type: "card",
      cardImage: "/card-image/gold-card.png",
      playerRating: 91,
      playerPosition: "CAM",
      teamName: "Manchester City",
      isNew: true,
    },
  ];

  const rarityWeights = {
    bronze: { bronze: 0.7, silver: 0.25, gold: 0.05, diamond: 0, legendary: 0 },
    silver: {
      bronze: 0.4,
      silver: 0.4,
      gold: 0.18,
      diamond: 0.02,
      legendary: 0,
    },
    gold: {
      bronze: 0.2,
      silver: 0.3,
      gold: 0.35,
      diamond: 0.13,
      legendary: 0.02,
    },
    diamond: {
      bronze: 0.1,
      silver: 0.2,
      gold: 0.3,
      diamond: 0.35,
      legendary: 0.05,
    },
    legendary: {
      bronze: 0.05,
      silver: 0.1,
      gold: 0.25,
      diamond: 0.4,
      legendary: 0.2,
    },
  };

  const packCount =
    packRarity === "bronze" ? 3 : packRarity === "silver" ? 5 : 7;
  const weights = rarityWeights[packRarity as keyof typeof rarityWeights];

  return Array.from({ length: packCount }, (_, index) => {
    const random = Math.random();
    let rarity: PackItem["rarity"] = "bronze";
    let cumulative = 0;

    for (const [r, weight] of Object.entries(weights)) {
      cumulative += weight;
      if (random <= cumulative) {
        rarity = r as PackItem["rarity"];
        break;
      }
    }

    const baseItem = baseItems[index % baseItems.length];
    return {
      ...baseItem,
      id: `pack-item-${Date.now()}-${index}`,
      rarity,
    };
  });
};

const PackOpeningModal: React.FC<PackOpeningModalProps> = ({
  isOpen,
  onClose,
  packName,
  packRarity,
  packImage,
  onPackOpened,
}) => {
  const [stage, setStage] = useState<
    "closed" | "opening" | "revealing" | "completed"
  >("closed");
  const [packItems, setPackItems] = useState<PackItem[]>([]);
  const [currentRevealIndex, setCurrentRevealIndex] = useState(0);
  const [showSkipButton, setShowSkipButton] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStage("closed");
      setCurrentRevealIndex(0);
      setShowSkipButton(false);
      const items = generatePackContents(packRarity);
      setPackItems(items);
    }
  }, [isOpen, packRarity]);

  const handlePackClick = () => {
    if (stage === "closed") {
      setStage("opening");
      setTimeout(() => {
        setStage("revealing");
        setTimeout(() => setShowSkipButton(true), 2000);
      }, 2000);
    }
  };

  const handleNextCard = () => {
    if (currentRevealIndex < packItems.length - 1) {
      setCurrentRevealIndex((prev) => prev + 1);
    } else {
      setStage("completed");
      onPackOpened(packItems);
    }
  };

  const handleSkipAll = () => {
    setStage("completed");
    onPackOpened(packItems);
  };

  const handleClose = () => {
    setStage("closed");
    onClose();
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return <Crown size={24} />;
      case "diamond":
        return <Star size={24} />;
      case "gold":
        return <Trophy size={24} />;
      case "silver":
        return <Sparkles size={24} />;
      default:
        return <Package size={24} />;
    }
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
        return "#cd7f32";
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="pack-opening-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={stage === "completed" ? handleClose : undefined}
      >
        {/* Background Particles */}
        <div className="pack-opening-particles">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{
                opacity: 0,
                scale: 0,
                x: "50vw",
                y: "50vh",
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Close Button */}
        {stage !== "opening" && (
          <motion.button
            className="pack-close-button"
            onClick={handleClose}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>
        )}

        {/* Stage: Closed Pack */}
        {stage === "closed" && (
          <motion.div
            className="pack-opening-content"
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div
              className={`pack-container ${packRarity}`}
              onClick={handlePackClick}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="pack-glow"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <img src={packImage} alt={packName} className="pack-image" />

              <div className="pack-info">
                <h2 className="pack-name">{packName}</h2>
                <p className="pack-instruction">Kliknij aby otworzyć</p>
              </div>

              <motion.div
                className="pack-sparkles"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="sparkle"
                    style={{
                      rotate: `${i * 45}deg`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.25,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="pack-hint"
              animate={{
                y: [0, -10, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Zap size={20} />
              <span>Kliknij paczkę aby ją otworzyć!</span>
            </motion.div>
          </motion.div>
        )}

        {/* Stage: Opening Animation */}
        {stage === "opening" && (
          <motion.div
            className="pack-opening-animation"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.5, 2, 0] }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <motion.div
              className={`pack-explosion ${packRarity}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 2, 3],
                opacity: [0, 1, 0.5, 0],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            />

            <motion.img
              src={packImage}
              alt={packName}
              className="pack-opening-image"
              animate={{
                rotateY: [0, 180, 360],
                scale: [1, 1.2, 0],
              }}
              transition={{ duration: 2 }}
            />

            <motion.div
              className="opening-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h2>Otwieranie...</h2>
              <motion.div
                className="loading-dots"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ...
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Stage: Revealing Cards */}
        {stage === "revealing" && (
          <motion.div
            className="card-reveal-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background Cards Preview */}
            <div className="cards-preview">
              {packItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`preview-card ${index <= currentRevealIndex ? "revealed" : ""}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: index <= currentRevealIndex ? 1 : 0.8,
                    opacity: index <= currentRevealIndex ? 1 : 0.3,
                  }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className="preview-dot"
                    style={{
                      backgroundColor:
                        index <= currentRevealIndex
                          ? getRarityColor(item.rarity)
                          : "#64748b",
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Current Card Reveal */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRevealIndex}
                className="current-card-reveal"
                initial={{
                  rotateY: -90,
                  scale: 0.5,
                  opacity: 0,
                  z: -200,
                }}
                animate={{
                  rotateY: 0,
                  scale: 1,
                  opacity: 1,
                  z: 0,
                }}
                exit={{
                  rotateY: 90,
                  scale: 0.5,
                  opacity: 0,
                  z: 200,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.8,
                }}
                onClick={handleNextCard}
              >
                <motion.div
                  className={`revealed-card ${packItems[currentRevealIndex]?.rarity}`}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${getRarityColor(packItems[currentRevealIndex]?.rarity)}`,
                      `0 0 40px ${getRarityColor(packItems[currentRevealIndex]?.rarity)}`,
                      `0 0 20px ${getRarityColor(packItems[currentRevealIndex]?.rarity)}`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Card Back Flip Animation */}
                  <motion.div
                    className="card-back"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 180 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />

                  {/* Card Front */}
                  <motion.div
                    className="card-front"
                    initial={{ rotateY: -180 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <img
                      src={packItems[currentRevealIndex]?.cardImage}
                      alt={packItems[currentRevealIndex]?.name}
                      className="card-image"
                    />

                    {/* Rarity Badge */}
                    <motion.div
                      className="card-rarity-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, type: "spring" }}
                    >
                      {getRarityIcon(packItems[currentRevealIndex]?.rarity)}
                      <span>
                        {packItems[currentRevealIndex]?.rarity.toUpperCase()}
                      </span>
                    </motion.div>

                    {/* New Badge */}
                    {packItems[currentRevealIndex]?.isNew && (
                      <motion.div
                        className="new-card-badge"
                        initial={{ scale: 0, rotate: -12 }}
                        animate={{ scale: 1, rotate: -12 }}
                        transition={{ delay: 1.4, type: "spring" }}
                      >
                        NEW!
                      </motion.div>
                    )}

                    {/* Player Rating */}
                    {packItems[currentRevealIndex]?.playerRating && (
                      <motion.div
                        className="player-rating"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.6, type: "spring" }}
                      >
                        {packItems[currentRevealIndex]?.playerRating}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Celebration Particles */}
                  <motion.div
                    className="celebration-particles"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                  >
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="celebration-particle"
                        style={{
                          backgroundColor: getRarityColor(
                            packItems[currentRevealIndex]?.rarity
                          ),
                        }}
                        animate={{
                          x: [0, (Math.random() - 0.5) * 400],
                          y: [0, (Math.random() - 0.5) * 400],
                          opacity: [1, 0],
                          scale: [1, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: Math.random() * 0.5,
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>

                {/* Card Info */}
                <motion.div
                  className="card-info"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  <h3 className="card-name">
                    {packItems[currentRevealIndex]?.name}
                  </h3>
                  <p className="card-description">
                    {packItems[currentRevealIndex]?.description}
                  </p>
                  {packItems[currentRevealIndex]?.playerPosition && (
                    <div className="player-details">
                      <span className="position">
                        {packItems[currentRevealIndex]?.playerPosition}
                      </span>
                      <span className="team">
                        {packItems[currentRevealIndex]?.teamName}
                      </span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <motion.div
              className="reveal-controls"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <motion.button
                className="next-card-btn"
                onClick={handleNextCard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentRevealIndex < packItems.length - 1
                  ? "Następna karta"
                  : "Zakończ"}
              </motion.button>

              {showSkipButton && currentRevealIndex < packItems.length - 1 && (
                <motion.button
                  className="skip-btn"
                  onClick={handleSkipAll}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Pomiń wszystkie
                </motion.button>
              )}
            </motion.div>

            {/* Progress */}
            <motion.div
              className="reveal-progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              <span>
                {currentRevealIndex + 1} / {packItems.length}
              </span>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentRevealIndex + 1) / packItems.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Stage: Completed */}
        {stage === "completed" && (
          <motion.div
            className="pack-completed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="completion-celebration"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🎉
            </motion.div>

            <h2 className="completion-title">Paczka otwarta!</h2>
            <p className="completion-subtitle">
              Otrzymałeś {packItems.length} nowych przedmiotów
            </p>

            <div className="final-cards-grid">
              {packItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`final-card ${item.rarity}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <img
                    src={item.cardImage}
                    alt={item.name}
                    className="final-card-image"
                  />
                  <div className="final-card-overlay">
                    <span className="final-card-name">{item.name}</span>
                    {item.playerRating && (
                      <span className="final-card-rating">
                        {item.playerRating}
                      </span>
                    )}
                  </div>
                  {item.isNew && <div className="final-new-badge">NEW</div>}
                </motion.div>
              ))}
            </div>

            <motion.button
              className="continue-btn"
              onClick={handleClose}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Kontynuuj
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default PackOpeningModal;
