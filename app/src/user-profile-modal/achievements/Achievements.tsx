import React from "react";
import { Award, ShieldCheck, Trophy, Crown, Zap, Lock, Star } from "lucide-react";
import "./Achievements.css";

type Rarity = "common" | "rare" | "epic" | "legendary";

interface Achievement {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  rarity: Rarity;
  icon: React.ElementType;
  date?: string;
}

const allAchievements: Achievement[] = [
  {
    id: 1,
    title: "Mistrz Ligi",
    description: "Zajmij 1. miejsce w dowolnym turnieju.",
    unlocked: true,
    rarity: "legendary",
    icon: Crown,
    date: "05.09.2025",
  },
  {
    id: 2,
    title: "Snajper",
    description: "Poprawnie wytypuj dokładny wynik meczu.",
    unlocked: true,
    rarity: "rare",
    icon: Zap,
    date: "22.03.2024",
  },
  {
    id: 3,
    title: "Weteran",
    description: "Weź udział w 5 różnych turniejach.",
    unlocked: true,
    rarity: "epic",
    icon: ShieldCheck,
    date: "18.08.2024",
  },
  {
    id: 4,
    title: "Pierwsze Kroki",
    description: "Zarejestruj się i dołącz do pierwszego pokoju.",
    unlocked: true,
    rarity: "common",
    icon: Award,
    date: "15.01.2024",
  },
  {
    id: 5,
    title: "Król Kolejki",
    description: "Poprawnie wytypuj wszystkie mecze w jednej kolejce.",
    unlocked: false,
    rarity: "legendary",
    icon: Trophy,
  },
  {
    id: 6,
    title: "Na Fali",
    description: "Wygraj 5 zakładów z rzędu.",
    unlocked: true,
    rarity: "rare",
    icon: Star,
    date: "12.05.2024",
  },
  {
    id: 7,
    title: "Aktywny Gracz",
    description: "Obstawiaj mecze przez 7 dni z rzędu.",
    unlocked: false,
    rarity: "epic",
    icon: ShieldCheck,
  },
  {
    id: 8,
    title: "Pierwsza Wpłata",
    description: "Zasil swoje konto po raz pierwszy.",
    unlocked: true,
    rarity: "common",
    icon: Award,
    date: "16.01.2024",
  },
];

const Achievements: React.FC = () => {
  const unlockedCount = allAchievements.filter((a) => a.unlocked).length;
  const totalCount = allAchievements.length;
  const progress = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0;

  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <div className="header-info">
          <div className="header-icon-box">
            <Trophy size={24} />
          </div>
          <div>
            <h3 className="header-title">Gablota Trofeów</h3>
            <p className="header-subtitle">
              Zdobyto <span className="highlight-text">{unlockedCount}</span> z {totalCount} osiągnięć
            </p>
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="progress-glow"></div>
            </div>
          </div>
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>
      </div>


      <div className="achievements-grid">
        {allAchievements.map((ach, index) => {
          const Icon = ach.icon;

          return (
            <div
              key={ach.id}
              className={`achievement-card ${ach.unlocked ? `unlocked ${ach.rarity}` : "locked"
                }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {ach.rarity === 'legendary' && ach.unlocked && <div className="legendary-border" />}

              <div className="card-content">
                <div className="achievement-icon-wrapper">
                  {ach.unlocked ? (
                    <Icon className="achievement-icon" size={32} strokeWidth={1.5} />
                  ) : (
                    <Lock className="achievement-icon locked-icon" size={32} />
                  )}
                </div>

                <div className="achievement-info">
                  <span className="achievement-rarity-label">
                    {ach.unlocked ? ach.rarity : "Zablokowane"}
                  </span>
                  <h4 className="achievement-title">{ach.title}</h4>
                </div>
              </div>

              <div className="achievement-overlay">
                <p className="overlay-desc">{ach.description}</p>
                {ach.unlocked && ach.date && (
                  <span className="overlay-date">Zdobyto: {ach.date}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;