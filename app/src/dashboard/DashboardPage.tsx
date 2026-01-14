import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import StatsOverview from "./components/StatsOverview";
import MatchesToPredict from "./components/MatchesToPredict";
import LiveAndRecentMatches from "./components/LiveAndRecentMatches";
import BlogPosts from "./components/BlogPosts";
import ActivityTimeline from "./components/ActivityTimeline";
import "./DashboardPage.css";

interface Match {
  id: string;
  roomId: string;
  roomName: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  isPredicted: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: Date;
  readTime: number;
  category: string;
  slug: string;
}

interface TimelineEvent {
  id: string;
  type: "prediction" | "result" | "rank_up" | "rank_down" | "achievement" | "streak";
  title: string;
  description: string;
  timestamp: Date;
  points?: number;
}

interface LiveMatch {
  id: string;
  roomId: string;
  roomName: string;
  homeTeam: string;
  awayTeam: string;
  currentScore: { home: number; away: number };
  yourPrediction: { home: number; away: number };
  minute: string;
  possiblePoints: number;
}

interface RecentMatch {
  id: string;
  roomId: string;
  roomName: string;
  homeTeam: string;
  awayTeam: string;
  finalScore: { home: number; away: number };
  yourPrediction: { home: number; away: number };
  points: number;
  timeAgo: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const userStats = {
    globalRank: 42,
    totalPoints: 2456,
    roomsWon: 12,
    winRate: 26,
    activeRooms: 5,
    currentStreak: 8,
  };

  const matches: Match[] = [
    {
      id: "1",
      roomId: "1",
      roomName: "Premier League Masters",
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      date: new Date().toISOString(),
      isPredicted: false,
    },
    {
      id: "2",
      roomId: "2",
      roomName: "Liga Mistrzów 2025",
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      date: new Date(Date.now() + 3600000 * 5).toISOString(),
      isPredicted: true,
    },
    {
      id: "3",
      roomId: "1",
      roomName: "Premier League Masters",
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      date: new Date(Date.now() + 86400000).toISOString(),
      isPredicted: false,
    },
    {
      id: "4",
      roomId: "3",
      roomName: "Bundesliga Pro",
      homeTeam: "Bayern Munich",
      awayTeam: "Borussia Dortmund",
      date: new Date(Date.now() + 86400000).toISOString(),
      isPredicted: false,
    },
  ];

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Jak typować mecze Ligi Mistrzów",
      excerpt: "Poznaj 5 sprawdzonych strategii, które pomogą Ci przewidzieć wyniki najważniejszych meczów europejskich.",
      imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=250&fit=crop",
      date: new Date(Date.now() - 86400000 * 2),
      readTime: 5,
      category: "Porady",
      slug: "jak-typowac-mecze-ligi-mistrzow"
    },
    {
      id: "2",
      title: "Analiza: Premier League 2024/25",
      excerpt: "Kto wygra ligę w tym sezonie? Szczegółowa analiza wszystkich drużyn.",
      imageUrl: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=250&fit=crop",
      date: new Date(Date.now() - 86400000 * 5),
      readTime: 8,
      category: "Analizy",
      slug: "analiza-premier-league-2024-25"
    },
    {
      id: "3",
      title: "Statystyki xG - kompletny przewodnik",
      excerpt: "Dowiedz się jak wykorzystać expected goals w swoich typowaniach.",
      imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
      date: new Date(Date.now() - 86400000 * 7),
      readTime: 6,
      category: "Statystyki",
      slug: "statystyki-xg-przewodnik"
    }
  ];

  const activityEvents: TimelineEvent[] = [
    {
      id: "1",
      type: "prediction",
      title: "Nowy typ",
      description: "Wytypowałeś Manchester City 2-1 Liverpool",
      timestamp: new Date(Date.now() - 900000),
      points: undefined
    },
    {
      id: "2",
      type: "result",
      title: "Świetny typ!",
      description: "Arsenal 3-1 Chelsea - dokładnie jak typowałeś",
      timestamp: new Date(Date.now() - 7200000),
      points: 5
    },
    {
      id: "3",
      type: "rank_up",
      title: "Awans w rankingu",
      description: "Awansowałeś na 2. miejsce w Premier League Masters",
      timestamp: new Date(Date.now() - 14400000),
      points: undefined
    },
    {
      id: "4",
      type: "streak",
      title: "Passa trwa!",
      description: "8 meczów z rzędu z punktami",
      timestamp: new Date(Date.now() - 21600000),
      points: undefined
    },
    {
      id: "5",
      type: "result",
      title: "Blisko!",
      description: "Bayern 3-1 PSG - Twój typ: 2-1",
      timestamp: new Date(Date.now() - 86400000),
      points: 3
    }
  ];

  const liveMatches: LiveMatch[] = [
    {
      id: "1",
      roomId: "1",
      roomName: "Premier League Masters",
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      currentScore: { home: 2, away: 1 },
      yourPrediction: { home: 2, away: 0 },
      minute: "67",
      possiblePoints: 3
    },
    {
      id: "2",
      roomId: "2",
      roomName: "Liga Mistrzów 2025",
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      currentScore: { home: 1, away: 0 },
      yourPrediction: { home: 1, away: 1 },
      minute: "45+2",
      possiblePoints: 3
    }
  ];

  const recentMatches: RecentMatch[] = [
    {
      id: "1",
      roomId: "1",
      roomName: "Premier League Masters",
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      finalScore: { home: 3, away: 1 },
      yourPrediction: { home: 2, away: 1 },
      points: 3,
      timeAgo: "3 godz. temu"
    },
    {
      id: "2",
      roomId: "2",
      roomName: "Liga Mistrzów 2025",
      homeTeam: "Bayern",
      awayTeam: "PSG",
      finalScore: { home: 3, away: 1 },
      yourPrediction: { home: 3, away: 1 },
      points: 5,
      timeAgo: "Wczoraj"
    },
    {
      id: "3",
      roomId: "3",
      roomName: "Bundesliga Pro",
      homeTeam: "Dortmund",
      awayTeam: "Leipzig",
      finalScore: { home: 2, away: 2 },
      yourPrediction: { home: 2, away: 1 },
      points: 1,
      timeAgo: "2 dni temu"
    }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-text">
            <h1 className="dashboard-title">
              {t("dashboard.welcomeBack")},{" "}
              <span className="username-highlight">Gracz</span>!
            </h1>
            <p className="dashboard-subtitle">{t("dashboard.subtitle")}</p>
          </div>
          <button
            className="btn-create-room"
            onClick={() => navigate("/create-room")}
          >
            <Plus size={20} />
            <span>{t("dashboard.createRoom")}</span>
          </button>
        </div>

        <StatsOverview stats={userStats} />

        <div className="dashboard-grid">
          <div className="dashboard-main">
            <MatchesToPredict matches={matches} />
            <LiveAndRecentMatches
              liveMatches={liveMatches}
              recentMatches={recentMatches}
            />
          </div>

          <div className="dashboard-sidebar">
            <BlogPosts posts={blogPosts} />
            <ActivityTimeline events={activityEvents} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;