import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Users,
  Target,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import "./DemoPage.css";

interface VideoSectionData {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  videoSrc: string;
  features: string[];
}

interface ParallaxBackgroundProps {
  scrollProgress: number;
  activeSection: number;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  scrollProgress,
  activeSection,
}) => {
  return (
    <div className="parallax-background">
      <div
        className="gradient-mesh"
        style={{
          transform: `translateY(${scrollProgress * 100}px) rotate(${scrollProgress * 45
            }deg)`,
        }}
      />

      <div className="particles-container">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${(i * 17) % 100}%`,
              animationDelay: `${i * 0.2}s`,
              transform: `translateY(${scrollProgress * (50 + i * 10)}px)`,
            }}
          />
        ))}
      </div>

      <div className="geometric-shapes">
        <div
          className="shape shape-circle"
          style={{
            transform: `translate(${scrollProgress * -200}px, ${scrollProgress * 150
              }px) scale(${1 + scrollProgress * 0.5})`,
            opacity: 0.1 - scrollProgress * 0.05,
          }}
        />
        <div
          className="shape shape-square"
          style={{
            transform: `translate(${scrollProgress * 250}px, ${scrollProgress * -100
              }px) rotate(${scrollProgress * 180}deg)`,
            opacity: 0.08 - scrollProgress * 0.04,
          }}
        />
        <div
          className="shape shape-triangle"
          style={{
            transform: `translate(${scrollProgress * -150}px, ${scrollProgress * 200
              }px) rotate(${-scrollProgress * 90}deg)`,
            opacity: 0.06 - scrollProgress * 0.03,
          }}
        />
      </div>

      <div
        className="section-overlay"
        style={{
          background: `linear-gradient(135deg, 
            ${activeSection === 0
              ? "rgba(34, 197, 94, 0.05)"
              : activeSection === 1
                ? "rgba(59, 130, 246, 0.05)"
                : activeSection === 2
                  ? "rgba(168, 85, 247, 0.05)"
                  : "rgba(251, 191, 36, 0.05)"
            } 0%, 
            rgba(15, 23, 42, 0) 100%)`,
        }}
      />
    </div>
  );
};

const DemoPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [visitedSections, setVisitedSections] = useState<Set<number>>(
    new Set([0])
  );
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const videoSections: VideoSectionData[] = [
    {
      id: "create-room",
      icon: <Users size={48} />,
      title: "Tworzenie pokoju",
      description:
        "Zobacz, jak szybko i łatwo możesz stworzyć własny pokój do typowania i zaprosić znajomych.",
      videoSrc: "/videos/create-room-demo.mp4",
      features: [
        "Wybierz ligę i turniej",
        "Ustaw wpisowe i limit uczestników",
        "Udostępnij kod zaproszenia",
      ],
    },
    {
      id: "betting",
      icon: <Target size={48} />,
      title: "Typowanie meczów",
      description:
        "Dowiedz się, jak wygląda proces typowania wyników i jak działa system punktacji.",
      videoSrc: "/videos/betting-demo.mp4",
      features: [
        "Intuicyjny interfejs typowania",
        "Możliwość zmiany do startu meczu",
        "Podgląd statystyk drużyn",
      ],
    },
    {
      id: "ranking",
      icon: <TrendingUp size={48} />,
      title: "Śledzenie rankingu",
      description:
        "Zobacz na żywo, jak aktualizuje się ranking i jak możesz śledzić swoją pozycję.",
      videoSrc: "/videos/ranking-demo.mp4",
      features: [
        "Ranking na żywo",
        "Historia twoich typów",
        "Porównanie z rywalami",
      ],
    },
    {
      id: "chat",
      icon: <MessageSquare size={48} />,
      title: "Chat i interakcje",
      description:
        "Poznaj funkcje społecznościowe - czat z innymi graczami i rywalizację w czasie rzeczywistym.",
      videoSrc: "/videos/chat-demo.mp4",
      features: ["Czat w pokoju", "Emotikony i reakcje", "Dziel się analizami"],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / maxScroll;
      setScrollProgress(progress);

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(index);
            setVisitedSections((prev) => new Set(prev).add(index));
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="demo-page">
      <ParallaxBackground
        scrollProgress={scrollProgress}
        activeSection={activeSection}
      />
      <div className="demo-container">
        <div className="demo-header">
          <h1 className="demo-title">Zobacz PREDICTO w akcji</h1>
          <p className="demo-subtitle">
            Przewiń w dół, aby odkryć wszystkie funkcje naszej platformy
          </p>
          <div className="scroll-indicator">
            <div className="scroll-arrow"></div>
          </div>
        </div>

        {videoSections.map((section, index) => (
          <VideoSection
            key={section.id}
            section={section}
            index={index}
            isActive={activeSection === index}
            hasBeenVisited={visitedSections.has(index)}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
          />
        ))}

        <div className="demo-cta">
          <h2>Gotowy, aby spróbować?</h2>
          <p>
            Dołącz do tysięcy graczy i zacznij typować już dziś. Rejestracja
            zajmuje tylko chwilę!
          </p>
          <div className="cta-buttons">
            <Link to="/register">
              <button className="btn-primary-large">Zarejestruj się</button>
            </Link>
            <Link to="/jak-grac">
              <button className="btn-secondary-large">
                Dowiedz się więcej
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

interface VideoSectionProps {
  section: VideoSectionData;
  index: number;
  isActive: boolean;
  hasBeenVisited: boolean;
}

const VideoSection = React.forwardRef<HTMLDivElement, VideoSectionProps>(
  ({ section, index, isActive, hasBeenVisited }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlayPause = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    const handleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };

    const handleFullscreen = () => {
      if (videoRef.current) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        }
      }
    };

    useEffect(() => {
      if (videoRef.current) {
        if (isActive) {
          videoRef.current.play().catch(() => { });
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    }, [isActive]);

    const isEven = index % 2 === 0;

    return (
      <div
        ref={ref}
        className={`video-section-wrapper ${isActive ? "active" : ""} ${hasBeenVisited ? "visited" : ""
          } ${isEven ? "layout-left" : "layout-right"}`}
      >
        <div className="video-content">
          <div className={`video-info ${hasBeenVisited ? "visible" : ""}`}>
            <div className="icon-number-wrapper">
              <div className="section-icon">{section.icon}</div>
              <div className="section-number">0{index + 1}</div>
            </div>
            <h2 className="section-title">{section.title}</h2>
            <p className="section-description">{section.description}</p>
            <ul className="section-features">
              {section.features.map((feature, idx) => (
                <li key={idx} className="feature-item-demo">
                  <div className="feature-dot"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`video-player ${hasBeenVisited ? "visible" : ""}`}>
            <div className="video-wrapper-demo">
              <video
                ref={videoRef}
                className="demo-video"
                loop
                muted={isMuted}
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={section.videoSrc} type="video/mp4" />
                Twoja przeglądarka nie obsługuje odtwarzania wideo.
              </video>

              <div className="video-controls">
                <button
                  className="control-btn play-btn"
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>

                <button
                  className="control-btn"
                  onClick={handleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <button
                  className="control-btn"
                  onClick={handleFullscreen}
                  aria-label="Fullscreen"
                >
                  <Maximize size={18} />
                </button>
              </div>

              {!isPlaying && (
                <div className="video-overlay" onClick={handlePlayPause}>
                  <div className="play-button-large">
                    <Play size={32} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

VideoSection.displayName = "VideoSection";

export default DemoPage;
