import React, { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import "./PrizePoolPreview.css";
import { prizePoolTargetSignal } from "../../signals/create-room-form.signals";

const PrizePoolPreview: React.FC = () => {
  const targetValue = prizePoolTargetSignal.value;
  const [displayValue, setDisplayValue] = useState(targetValue);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (targetValue !== displayValue) {
      setIsAnimating(true);
      const duration = 300;
      const steps = 25;
      const stepDuration = duration / steps;
      let currentStep = 0;
      const startValue = displayValue;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 2);

        if (currentStep >= steps) {
          setDisplayValue(targetValue);
          setIsAnimating(false);
          clearInterval(timer);
        } else {
          setDisplayValue(
            startValue + (targetValue - startValue) * easeProgress
          );
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [targetValue]);

  const getWowLevel = (value: number) => {
    if (value >= 10000) return "mega";
    if (value >= 5000) return "epic";
    if (value >= 2499) return "high";
    if (value >= 1000) return "medium";
    return "normal";
  };

  const wowLevel = getWowLevel(targetValue);

  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString("pl-PL");
  };

  return (
    <div className={`prize-pool-preview ${wowLevel}`}>
      <Trophy className="prize-pool-icon" />
      <div className="prize-pool-content">
        <span className="prize-pool-label">Przewidywana pula nagród</span>
        <span className={`prize-pool-value ${isAnimating ? "animating" : ""}`}>
          {formatNumber(displayValue)} PLN
        </span>
        {wowLevel === "mega" && (
          <span className="wow-badge mega-badge">MEGA PULA!</span>
        )}
        {wowLevel === "epic" && (
          <span className="wow-badge epic-badge">EPICKA PULA!</span>
        )}
        {wowLevel === "high" && (
          <span className="wow-badge high-badge">Duża pula!</span>
        )}
      </div>
    </div>
  );
};

export default PrizePoolPreview;
