import React, { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

interface VictoryParticlesProps {
  show: boolean;
  type?: "confetti" | "fireworks" | "trophy";
}

const VictoryParticles: React.FC<VictoryParticlesProps> = ({
  show,
  type = "confetti",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    }
  }, [show]);

  const confettiConfig = {
    fullScreen: false,
    particles: {
      number: {
        value: 0,
      },
      color: {
        value: ["#22c55e", "#fbbf24", "#3b82f6", "#ef4444", "#a855f7"],
      },
      shape: {
        type: ["circle", "square", "triangle", "polygon"],
        options: {
          polygon: {
            sides: 5,
          },
        },
      },
      opacity: {
        value: 1,
        animation: {
          enable: true,
          minimumValue: 0,
          speed: 2,
          startValue: "max",
          destroy: "min",
        },
      },
      size: {
        value: 8,
        random: {
          enable: true,
          minimumValue: 4,
        },
      },
      links: {
        enable: false,
      },
      life: {
        duration: {
          sync: true,
          value: 5,
        },
        count: 1,
      },
      move: {
        enable: true,
        gravity: {
          enable: true,
          acceleration: 20,
        },
        speed: { min: 10, max: 20 },
        decay: 0.1,
        direction: "none",
        straight: false,
        outModes: {
          default: "destroy",
          top: "none",
        },
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        direction: "random",
        move: true,
        animation: {
          enable: true,
          speed: 60,
        },
      },
      tilt: {
        direction: "random",
        enable: true,
        move: true,
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 60,
        },
      },
      roll: {
        darken: {
          enable: true,
          value: 25,
        },
        enable: true,
        speed: {
          min: 15,
          max: 25,
        },
      },
      wobble: {
        distance: 30,
        enable: true,
        move: true,
        speed: {
          min: -15,
          max: 15,
        },
      },
    },
    emitters: {
      position: {
        x: 50,
        y: 0,
      },
      rate: {
        quantity: 8,
        delay: 0.15,
      },
      size: {
        width: 100,
        height: 0,
      },
      life: {
        duration: 0.3,
        count: 1,
      },
    },
  };

  const trophyRainConfig = {
    fullScreen: false,
    particles: {
      number: {
        value: 0,
      },
      color: {
        value: "#fbbf24",
      },
      shape: {
        type: "character",
        options: {
          character: {
            value: "🏆",
            font: "Verdana",
            style: "",
            weight: "400",
            fill: true,
          },
        },
      },
      opacity: {
        value: 1,
        animation: {
          enable: true,
          minimumValue: 0,
          speed: 1,
          startValue: "max",
          destroy: "min",
        },
      },
      size: {
        value: 16,
        random: {
          enable: true,
          minimumValue: 12,
        },
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        direction: "random",
        animation: {
          enable: true,
          speed: 30,
        },
      },
      move: {
        enable: true,
        gravity: {
          enable: true,
          acceleration: 10,
        },
        speed: 15,
        direction: "bottom",
        straight: false,
        outModes: {
          default: "destroy",
          bottom: "destroy",
        },
        wobble: {
          enable: true,
          distance: 20,
          speed: 10,
        },
      },
    },
    emitters: {
      position: {
        x: 50,
        y: 0,
      },
      rate: {
        quantity: 2,
        delay: 0.2,
      },
      size: {
        width: 100,
        height: 0,
      },
      life: {
        duration: 1.5,
        count: 1,
      },
    },
  };

  const fireworksConfig = {
    fullScreen: false,
    particles: {
      number: {
        value: 0,
      },
      color: {
        value: ["#22c55e", "#fbbf24", "#3b82f6"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 1,
        animation: {
          enable: true,
          minimumValue: 0,
          speed: 0.8,
          startValue: "max",
          destroy: "min",
          sync: false,
        },
      },
      size: {
        value: 4,
        random: {
          enable: true,
          minimumValue: 2,
        },
        animation: {
          enable: true,
          minimumValue: 0.5,
          speed: 2,
          startValue: "max",
          destroy: "min",
          sync: false,
        },
      },
      links: {
        enable: false,
      },
      life: {
        duration: {
          sync: true,
          value: 3,
        },
        count: 1,
      },
      move: {
        enable: true,
        gravity: {
          enable: true,
          acceleration: 5,
        },
        speed: { min: 10, max: 30 },
        decay: 0.03,
        direction: "none",
        straight: false,
        outModes: {
          default: "destroy",
        },
      },
      shadow: {
        blur: 3,
        color: {
          value: ["#22c55e", "#fbbf24", "#3b82f6"],
        },
        enable: true,
        offset: {
          x: 0,
          y: 0,
        },
      },
    },
    emitters: [
      {
        position: {
          x: 30,
          y: 30,
        },
        rate: {
          quantity: 25,
          delay: 0.4,
        },
        size: {
          width: 0,
          height: 0,
        },
        life: {
          duration: 0.1,
          count: 3,
        },
      },
      {
        position: {
          x: 70,
          y: 30,
        },
        rate: {
          quantity: 25,
          delay: 0.4,
        },
        size: {
          width: 0,
          height: 0,
        },
        life: {
          duration: 0.1,
          count: 3,
        },
      },
    ],
  };

  const getConfig = () => {
    switch (type) {
      case "confetti":
        return confettiConfig;
      case "trophy":
        return trophyRainConfig;
      case "fireworks":
        return fireworksConfig;
      default:
        return confettiConfig;
    }
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: "-30px",
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      <Particles
        id={`particles-${Math.random()}`}
        init={particlesInit}
        options={getConfig()}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default VictoryParticles;
