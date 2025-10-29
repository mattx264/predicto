import React from "react";
import "./PackCard.css";

interface PackCardProps {
  rarity: "bronze" | "silver" | "gold" | "diamond" | "legendary";
  rating?: number;
  position?: string;
}

const PackCard: React.FC<PackCardProps> = ({
  rarity,
  rating = 65,
  position = "SEM",
}) => {
  const getPackName = () => {
    return `${rarity.toUpperCase()} PACK`;
  };

  return (
    <div className="card-container">
      <div className={`card ${rarity}`}>
        {/* Corner decorations */}
        <div className="corner-decoration top-left"></div>
        <div className="corner-decoration top-right"></div>
        <div className="corner-decoration bottom-left"></div>
        <div className="corner-decoration bottom-right"></div>

        {/* Top section with rating and lion */}
        <div className="card-header">
          <div className="rating">
            <div className="rating-number">{rating}</div>
            <div className="rating-position">{position}</div>
          </div>

          <div className="lion-logo">
            <svg viewBox="0 0 100 100" className="lion-svg">
              <defs>
                <style>
                  {`.mane-${rarity} { fill: var(--primary-color); }
                  .face-${rarity} { fill: var(--secondary-color); }
                  .nose { fill: var(--accent-color); }
                  .ears-inner { fill: var(--light-color); }
                  .line { stroke: var(--accent-color); stroke-width: 1.5; fill: none; }`}
                </style>
              </defs>
              <g>
                <circle cx="50" cy="50" r="45" className={`mane-${rarity}`} />
                <circle cx="28" cy="28" r="12" className={`face-${rarity}`} />
                <circle cx="72" cy="28" r="12" className={`face-${rarity}`} />
                <circle cx="31" cy="30" r="7" className="ears-inner" />
                <circle cx="69" cy="30" r="7" className="ears-inner" />
                <circle cx="50" cy="50" r="35" className={`face-${rarity}`} />
                <circle cx="38" cy="45" r="5" className="nose" />
                <circle cx="62" cy="45" r="5" className="nose" />

                <polygon points="50,55 42,63 58,63" className="nose" />

                <line
                  x1="50"
                  y1="63"
                  x2="50"
                  y2="70"
                  className="line"
                  style={{ strokeWidth: 2 }}
                />

                <path d="M 40 70 Q 50 78 60 70" className="line" />
                <line x1="25" y1="58" x2="10" y2="55" className="line" />
                <line x1="25" y1="63" x2="10" y2="63" className="line" />
                <line x1="25" y1="68" x2="10" y2="71" className="line" />

                <line x1="75" y1="58" x2="90" y2="55" className="line" />
                <line x1="75" y1="63" x2="90" y2="63" className="line" />
                <line x1="75" y1="68" x2="90" y2="71" className="line" />
              </g>
            </svg>
          </div>
        </div>

        {/* Diagonal stripe */}
        <div className="diagonal-stripe"></div>

        {/* Diagonal lines decoration */}
        <div className="diagonal-lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        {/* Main title */}
        <div className="predicto-title">
          <span>PREDICTO</span>
        </div>

        {/* Bottom text */}
        <div className="pack-type">{getPackName()}</div>
      </div>
    </div>
  );
};

export default PackCard;
