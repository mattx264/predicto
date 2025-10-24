import React, { useState, useEffect } from "react";
import "./PackOpening.css";

interface Player {
  name: string;
  rating: number;
  position: string;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  country: string;
  club: string;
  imageUrl: string;
}

const players: Player[] = [
  {
    name: "MESSI",
    rating: 91,
    position: "RW",
    pace: 85,
    shooting: 92,
    passing: 91,
    dribbling: 95,
    defending: 35,
    physical: 65,
    country: "🇦🇷",
    club: "⚽",
    imageUrl: "https://cdn.sofifa.net/players/158/023/25_120.png",
  },
  {
    name: "RONALDO",
    rating: 90,
    position: "ST",
    pace: 87,
    shooting: 93,
    passing: 82,
    dribbling: 88,
    defending: 35,
    physical: 77,
    country: "🇵🇹",
    club: "⚽",
    imageUrl: "https://cdn.sofifa.net/players/020/801/25_120.png",
  },
  {
    name: "LEWANDOWSKI",
    rating: 88,
    position: "ST",
    pace: 75,
    shooting: 91,
    passing: 79,
    dribbling: 86,
    defending: 44,
    physical: 82,
    country: "🇵🇱",
    club: "⚽",
    imageUrl: "https://cdn.sofifa.net/players/188/545/25_120.png",
  },
  {
    name: "MBAPPÉ",
    rating: 91,
    position: "ST",
    pace: 97,
    shooting: 89,
    passing: 80,
    dribbling: 92,
    defending: 36,
    physical: 76,
    country: "🇫🇷",
    club: "⚽",
    imageUrl: "https://cdn.sofifa.net/players/231/747/25_120.png",
  },
  {
    name: "HAALAND",
    rating: 91,
    position: "ST",
    pace: 89,
    shooting: 94,
    passing: 65,
    dribbling: 80,
    defending: 45,
    physical: 88,
    country: "🇳🇴",
    club: "⚽",
    imageUrl: "https://cdn.sofifa.net/players/239/085/25_120.png",
  },
  {
    name: "DE BRUYNE",
    rating: 89,
    position: "CM",
    pace: 68,
    shooting: 85,
    passing: 93,
    dribbling: 87,
    defending: 61,
    physical: 76,
    country: "🇧🇪",
    club: "⚽",
    imageUrl: "https://cdn.sofifa.net/players/192/985/25_120.png",
  },
  {
    name: "NEYMAR",
    rating: 89,
    position: "LW",
    pace: 91,
    shooting: 83,
    passing: 86,
    dribbling: 94,
    defending: 37,
    physical: 61,
    country: "🇧🇷",
    club: "⚽",
    imageUrl: "https://cdn.sofifa.net/players/190/871/25_120.png",
  },
  {
    name: "SALAH",
    rating: 89,
    position: "RW",
    pace: 93,
    shooting: 87,
    passing: 81,
    dribbling: 90,
    defending: 45,
    physical: 75,
    country: "🇪🇬",
    club: "⚽",
    imageUrl: "https://cdn.sofifa.net/players/209/331/25_120.png",
  },
  {
    name: "BENZEMA",
    rating: 89,
    position: "CF",
    pace: 76,
    shooting: 88,
    passing: 81,
    dribbling: 87,
    defending: 39,
    physical: 78,
    country: "🇫🇷",
    club: "⚽",
    imageUrl: "https://cdn.sofifa.net/players/165/153/25_120.png",
  },
  {
    name: "MODRIĆ",
    rating: 87,
    position: "CM",
    pace: 72,
    shooting: 76,
    passing: 89,
    dribbling: 90,
    defending: 72,
    physical: 65,
    country: "🇭🇷",
    club: "⚽",
    imageUrl: "https://cdn.sofifa.net/players/177/003/25_120.png",
  },
  {
    name: "VAN DIJK",
    rating: 89,
    position: "CB",
    pace: 75,
    shooting: 60,
    passing: 71,
    dribbling: 72,
    defending: 91,
    physical: 86,
    country: "🇳🇱",
    club: "⚽",
    imageUrl: "https://cdn.sofifa.net/players/203/376/25_120.png",
  },
  {
    name: "SZCZĘSNY",
    rating: 84,
    position: "GK",
    pace: 50,
    shooting: 35,
    passing: 55,
    dribbling: 60,
    defending: 45,
    physical: 75,
    country: "🇵🇱",
    club: "⚽",
    imageUrl: "https://cdn.sofifa.net/players/186/153/25_120.png",
  },
  {
    name: "ZIELIŃSKI",
    rating: 79,
    position: "CAM",
    pace: 73,
    shooting: 72,
    passing: 78,
    dribbling: 81,
    defending: 55,
    physical: 66,
    country: "🇵🇱",
    club: "⚽",
    imageUrl: "https://cdn.sofifa.net/players/205/600/25_120.png",
  },
  {
    name: "MILIK",
    rating: 77,
    position: "ST",
    pace: 72,
    shooting: 80,
    passing: 65,
    dribbling: 73,
    defending: 42,
    physical: 75,
    country: "🇵🇱",
    club: "⚽",
    imageUrl: "https://cdn.sofifa.net/players/220/621/25_120.png",
  },
];

const PackOpening: React.FC = () => {
  const [stage, setStage] = useState<"initial" | "pack" | "opening" | "card">(
    "initial"
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [canClick, setCanClick] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState<React.ReactElement[]>([]);
  const [confettiElements, setConfettiElements] = useState<
    React.ReactElement[]
  >([]);
  const [cardRotation, setCardRotation] = useState({ rotateX: 0, rotateY: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 20;
    const rotateX = ((centerY - y) / centerY) * 20;

    setCardRotation({ rotateX, rotateY });
  };

  const handleCardMouseLeave = () => {
    setCardRotation({ rotateX: 0, rotateY: 0 });
  };

  const startPackOpening = () => {
    setStage("pack");
    setTimeout(() => {
      setCanClick(true);
    }, 800);
  };

  const openPack = () => {
    if (!canClick) return;

    setCanClick(false);
    setStage("opening");

    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    setCurrentPlayer(randomPlayer);

    setTimeout(() => {
      createParticles();
      setShowParticles(true);
    }, 750);

    setTimeout(() => {
      setStage("card");
      setShowParticles(false);

      if (randomPlayer.rating >= 90) {
        createConfetti();
        setShowConfetti(true);
      }
    }, 1500);
  };

  const createParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      const x = (Math.random() - 0.5) * 1000;
      const y = (Math.random() - 0.5) * 1000;
      const delay = Math.random() * 0.5;
      const hue1 = Math.random() * 60 + 30;
      const hue2 = Math.random() * 60 + 30;

      newParticles.push(
        <div
          key={`particle-${i}`}
          className="particle"
          style={
            {
              "--x": x,
              "--y": y,
              animationDelay: `${delay}s`,
              background: `linear-gradient(45deg, hsl(${hue1}, 100%, 50%), hsl(${hue2}, 100%, 70%))`,
            } as React.CSSProperties
          }
        />
      );
    }
    setParticles(newParticles);
  };

  const createConfetti = () => {
    const newConfetti = [];
    for (let i = 0; i < 100; i++) {
      const left = Math.random() * 100;
      const hue = Math.random() * 360;
      const duration = Math.random() * 2 + 2;
      const size = Math.random() * 10 + 5;
      const delay = Math.random();

      newConfetti.push(
        <div
          key={`confetti-${i}`}
          className="confetti"
          style={{
            left: `${left}%`,
            background: `hsl(${hue}, 100%, 50%)`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      );
    }
    setConfettiElements(newConfetti);
  };

  const restart = () => {
    const card = document.getElementById("card");
    const button = document.querySelector(".restart-button");

    if (card) {
      card.classList.add("closing");
    }
    if (button) {
      button.classList.add("closing");
    }

    setShowConfetti(false);

    setTimeout(() => {
      setCurrentPlayer(null);
      setCanClick(false);
      setShowParticles(false);
      setParticles([]);
      setConfettiElements([]);
      setCardRotation({ rotateX: 0, rotateY: 0 });

      startPackOpening();
    }, 600);
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
        setConfettiElements([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="pack-opening-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 267.3 427.3"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <clipPath id="svgPath">
          <path
            fill="#000"
            d="M265.3 53.9a33.3 33.3 0 0 1-17.8-5.5 32 32 0 0 1-13.7-22.9c-.2-1.1-.4-2.3-.4-3.4 0-1.3-1-1.5-1.8-1.9a163 163 0 0 0-31-11.6A257.3 257.3 0 0 0 133.7 0a254.9 254.9 0 0 0-67.1 8.7 170 170 0 0 0-31 11.6c-.8.4-1.8.6-1.8 1.9 0 1.1-.2 2.3-.4 3.4a32.4 32.4 0 0 1-13.7 22.9A33.8 33.8 0 0 1 2 53.9c-1.5.1-2.1.4-2 2v293.9c0 3.3 0 6.6.4 9.9a22 22 0 0 0 7.9 14.4c3.8 3.2 8.3 5.3 13 6.8 12.4 3.9 24.8 7.5 37.2 11.5a388.7 388.7 0 0 1 50 19.4 88.7 88.7 0 0 1 25 15.5v.1-.1c7.2-7 16.1-11.3 25-15.5a427 427 0 0 1 50-19.4l37.2-11.5c4.7-1.5 9.1-3.5 13-6.8 4.5-3.8 7.2-8.5 7.9-14.4.4-3.3.4-6.6.4-9.9V231.6 60.5v-4.6c.4-1.6-.3-1.9-1.7-2z"
          />
        </clipPath>
      </svg>

      {stage === "initial" && (
        <button className="start-button" onClick={startPackOpening}>
          CLICK TO OPEN PLAYER CARD!
        </button>
      )}

      {(stage === "pack" || stage === "opening") && (
        <div className={`pack-container ${stage === "pack" ? "show" : ""}`}>
          <div
            className={`pack ${stage === "opening" ? "opening" : ""}`}
            onClick={openPack}
          >
            <div className="pack-text">
              GOLD
              <br />
              PREMIUM
              <br />
              PACK
            </div>
            <div className="pack-logo">⚽</div>
          </div>
        </div>
      )}

      {showParticles && <div className="particles show">{particles}</div>}

      {stage === "card" && currentPlayer && (
        <div
          id="card"
          className={`active ${currentPlayer.rating >= 90 ? "legendary" : ""}`}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${cardRotation.rotateX}deg) rotateY(${cardRotation.rotateY}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div id="card-inner">
            <div id="card-top">
              <div className="info">
                <div className="value">{currentPlayer.rating}</div>
                <div className="position">{currentPlayer.position}</div>
                <div className="country">
                  <div className="flag-emoji">{currentPlayer.country}</div>
                </div>
                <div className="club">
                  <div className="club-emoji">{currentPlayer.club}</div>
                </div>
              </div>
              <div className="image">
                <img
                  src={currentPlayer.imageUrl}
                  alt={currentPlayer.name}
                  className="player-image"
                />
              </div>
              <div className="backfont">FUT25</div>
            </div>
            <div id="card-bottom">
              <div className="name">{currentPlayer.name}</div>
              <div className="stats">
                <div>
                  <ul>
                    <li>
                      <span>{currentPlayer.pace}</span>
                      <span>pac</span>
                    </li>
                    <li>
                      <span>{currentPlayer.shooting}</span>
                      <span>sho</span>
                    </li>
                    <li>
                      <span>{currentPlayer.passing}</span>
                      <span>pas</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>
                      <span>{currentPlayer.dribbling}</span>
                      <span>dri</span>
                    </li>
                    <li>
                      <span>{currentPlayer.defending}</span>
                      <span>def</span>
                    </li>
                    <li>
                      <span>{currentPlayer.physical}</span>
                      <span>phy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {stage === "card" && (
        <button className="restart-button show" onClick={restart}>
          OPEN ANOTHER PACK
        </button>
      )}

      {showConfetti && confettiElements}
    </div>
  );
};

export default PackOpening;
