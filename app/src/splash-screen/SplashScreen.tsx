import React, { useEffect, useState } from "react";
import "./SplashScreen.css";

interface SplashScreenProps {
  onComplete?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 2800;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
      }
    }, 50);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 3400);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
      -{" "}
      <div className="splash-bg">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
      </div>
      <div className="particles">
        {[...Array(60)].map((_, i) => {
          const colors = ["#22c55e", "#3b82f6", "#a855f7"];
          const colorIndex = i % 3;

          const gridX = i % 10;
          const gridY = Math.floor(i / 10);
          const randomOffsetX = ((i * 17) % 8) - 4;
          const randomOffsetY = ((i * 23) % 8) - 4;

          const left = 2 + gridX * 10 + randomOffsetX;
          const top = 2 + gridY * 16 + randomOffsetY;

          return (
            <div
              key={i}
              className="particle"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${(i % 10) * 0.05}s`,
                animationDuration: `${3.5 + (i % 4) * 0.4}s`,
                background: colors[colorIndex],
                boxShadow: `0 0 8px ${colors[colorIndex]}aa`,
              }}
            />
          );
        })}
      </div>
      <div className="splash-content">
        -{" "}
        <div className="splash-logo-container">
          <div className="logo-glow"></div>
          <div className="splash-logo">
            {"PREDICTO".split("").map((letter, index) => (
              <span
                key={index}
                className="logo-letter"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </div>
          <div className="logo-underline"></div>
        </div>
        -{" "}
        <div className="splash-tagline">
          <span className="tagline-word">Obstawiaj</span>
          <span className="tagline-dot">•</span>
          <span className="tagline-word">Rywalizuj</span>
          <span className="tagline-dot">•</span>
          <span className="tagline-word">Wygrywaj</span>
        </div>
        -{" "}
        <div className="loading-section">
          <div className="loading-bar-container">
            <div className="loading-bar" style={{ width: `${progress}%` }}>
              <div className="loading-bar-glow"></div>
            </div>
          </div>
          <div className="loading-info">
            <span className="loading-text">Ładowanie</span>
            <span className="loading-percent">{Math.floor(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
