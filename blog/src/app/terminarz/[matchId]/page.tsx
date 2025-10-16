"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Users,
  TrendingUp,
  History,
  Calendar,
  MapPin,
  Trophy,
} from "lucide-react";
import "./page.css";

interface Player {
  id: string;
  slug: string;
  name: string;
  position: "Bramkarz" | "Obrońca" | "Pomocnik" | "Napastnik";
  number: number;
  club: string;
  image: string;
  clubLogo: string;
  dateOfBirth: string;
  height: string;
  marketValue: string;
  bio: string;
}

interface Team {
  id: string;
  slug: string;
  name: string;
  flag: string;
  description: string;
  coach: string;
  keyPlayer: string;
  recentForm: ("W" | "D" | "L")[];
  squad: Player[];
}

interface Match {
  id: string;
  date: string;
  time: string;
  teamA: string;
  teamALogo: string;
  teamASlug: string;
  teamB: string;
  teamBLogo: string;
  teamBSlug: string;
  league: string;
  status: "Nadchodzący" | "Zakończony" | "LIVE";
  score?: string;
  venue?: string;
  city?: string;
}

interface HeadToHeadMatch {
  date: string;
  teamA: string;
  teamB: string;
  score: string;
  competition: string;
}

const mockMatch: Match = {
  id: "match1",
  date: "2025-10-17",
  time: "20:45",
  teamA: "Polska",
  teamALogo: "https://flagcdn.com/w320/pl.png",
  teamASlug: "polska",
  teamB: "Holandia",
  teamBLogo: "https://flagcdn.com/w320/nl.png",
  teamBSlug: "holandia",
  league: "El. MŚ 2026",
  status: "Nadchodzący",
  venue: "Stadion Narodowy",
  city: "Warszawa",
};

const polskaTeam: Team = {
  id: "pol",
  slug: "polska",
  name: "Polska",
  flag: "PL",
  description: "Reprezentacja Polski w piłce nożnej",
  coach: "Michał Probierz",
  keyPlayer: "Robert Lewandowski",
  recentForm: ["W", "D", "L", "W", "W"],
  squad: [
    {
      id: "pl1",
      slug: "wojciech-szczesny",
      name: "Wojciech Szczęsny",
      position: "Bramkarz",
      number: 1,
      club: "FC Barcelona",
      clubLogo:
        "https://b.fssta.com/uploads/application/soccer/team-logos/barcelona.vresize.350.350.medium.0.png",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/132.vresize.350.350.medium.1.png",
      dateOfBirth: "18 kwietnia 1990",
      height: "196 cm",
      marketValue: "15 mln €",
      bio: "Jeden z najlepszych polskich bramkarzy w historii.",
    },
    {
      id: "pl2",
      slug: "robert-lewandowski",
      name: "Robert Lewandowski",
      position: "Napastnik",
      number: 9,
      clubLogo:
        "https://b.fssta.com/uploads/application/soccer/team-logos/barcelona.vresize.350.350.medium.0.png",
      club: "FC Barcelona",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/2100.vresize.350.350.medium.1.png",
      dateOfBirth: "21 sierpnia 1988",
      height: "185 cm",
      marketValue: "40 mln €",
      bio: "Kapitan i absolutna legenda reprezentacji Polski.",
    },
    {
      id: "pl3",
      slug: "piotr-zielinski",
      name: "Piotr Zieliński",
      position: "Pomocnik",
      number: 20,
      clubLogo:
        "https://b.fssta.com/uploads/application/soccer/team-logos/inter-milan.vresize.350.350.medium.1.png",
      club: "Inter Mediolan",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/1610.vresize.350.350.medium.1.png",
      dateOfBirth: "20 maja 1994",
      height: "180 cm",
      marketValue: "35 mln €",
      bio: "Kreatywny i technicznie uzdolniony pomocnik.",
    },
    {
      id: "pl4",
      slug: "jakub-kiwior",
      name: "Jakub Kiwior",
      position: "Obrońca",
      number: 14,
      clubLogo:
        "https://b.fssta.com/uploads/application/soccer/team-logos/fc-porto.vresize.350.350.medium.0.png",
      club: "FC Porto",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/80826.vresize.350.350.medium.1.png",
      dateOfBirth: "15 lutego 2000",
      height: "189 cm",
      marketValue: "25 mln €",
      bio: "Wszechstronny, lewonożny obrońca.",
    },
    {
      id: "pl5",
      slug: "jan-bednarek",
      name: "Jan Bednarek",
      position: "Obrońca",
      number: 5,
      clubLogo:
        "https://b.fssta.com/uploads/application/soccer/team-logos/fc-porto.vresize.350.350.medium.0.png",
      club: "FC Porto",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/34909.vresize.350.350.medium.1.png",
      dateOfBirth: "12 kwietnia 1996",
      height: "189 cm",
      marketValue: "12 mln €",
      bio: "Doświadczony środkowy obrońca.",
    },
    {
      id: "pl6",
      slug: "sebastian-szymanski",
      name: "Sebastian Szymański",
      position: "Pomocnik",
      number: 19,
      clubLogo:
        "https://b.fssta.com/uploads/application/soccer/team-logos/fenerbahce.vresize.350.350.medium.0.png",
      club: "Fenerbahçe S.K.",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/44616.vresize.350.350.medium.1.png",
      dateOfBirth: "10 maja 1999",
      height: "174 cm",
      marketValue: "20 mln €",
      bio: "Dynamiczny i kreatywny ofensywny pomocnik.",
    },
  ],
};

const holandiaTeam: Team = {
  id: "ned",
  slug: "holandia",
  name: "Holandia",
  flag: "NL",
  description: "Reprezentacja Holandii",
  coach: "Ronald Koeman",
  keyPlayer: "Virgil van Dijk",
  recentForm: ["W", "W", "D", "W", "L"],
  squad: [
    {
      id: "nl1",
      slug: "bart-verbruggen",
      name: "Bart Verbruggen",
      position: "Bramkarz",
      number: 1,
      club: "Brighton",
      clubLogo:
        "https://b.fssta.com/uploads/application/soccer/team-logos/brighton-hove-albion.vresize.350.350.medium.0.png",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/81470.vresize.350.350.medium.1.png",
      dateOfBirth: "18 sierpnia 2002",
      height: "193 cm",
      marketValue: "20 mln €",
      bio: "Młody, obiecujący bramkarz.",
    },
    {
      id: "nl2",
      slug: "virgil-van-dijk",
      name: "Virgil van Dijk",
      position: "Obrońca",
      number: 4,
      club: "Liverpool",
      clubLogo:
        "https://b.fssta.com/uploads/application/soccer/team-logos/liverpool.vresize.350.350.medium.0.png",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/3575.vresize.350.350.medium.1.png",
      dateOfBirth: "8 lipca 1991",
      height: "195 cm",
      marketValue: "45 mln €",
      bio: "Kapitan i lider defensywy.",
    },
    {
      id: "nl3",
      slug: "frenkie-de-jong",
      name: "Frenkie de Jong",
      position: "Pomocnik",
      number: 21,
      club: "FC Barcelona",
      clubLogo:
        "https://b.fssta.com/uploads/application/soccer/team-logos/barcelona.vresize.350.350.medium.0.png",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/33121.vresize.350.350.medium.1.png",
      dateOfBirth: "12 maja 1997",
      height: "180 cm",
      marketValue: "70 mln €",
      bio: "Geniusz w środku pola.",
    },
    {
      id: "nl4",
      slug: "cody-gakpo",
      name: "Cody Gakpo",
      position: "Napastnik",
      number: 11,
      club: "Liverpool",
      clubLogo:
        "https://b.fssta.com/uploads/application/soccer/team-logos/liverpool.vresize.350.350.medium.0.png",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/61509.vresize.350.350.medium.1.png",
      dateOfBirth: "7 maja 1999",
      height: "189 cm",
      marketValue: "55 mln €",
      bio: "Wszechstronny napastnik.",
    },
    {
      id: "nl5",
      slug: "memphis-depay",
      name: "Memphis Depay",
      position: "Napastnik",
      number: 10,
      club: "Atletico Madrid",
      clubLogo:
        "https://b.fssta.com/uploads/application/soccer/team-logos/atletico-madrid.vresize.350.350.medium.0.png",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/4116.vresize.350.350.medium.1.png",
      dateOfBirth: "13 lutego 1994",
      height: "176 cm",
      marketValue: "30 mln €",
      bio: "Doświadczony napastnik.",
    },
    {
      id: "nl6",
      slug: "denzel-dumfries",
      name: "Denzel Dumfries",
      position: "Obrońca",
      number: 22,
      club: "Inter Mediolan",
      clubLogo:
        "https://b.fssta.com/uploads/application/soccer/team-logos/inter-milan.vresize.350.350.medium.0.png",
      image:
        "https://b.fssta.com/uploads/application/soccer/headshots/44896.vresize.350.350.medium.1.png",
      dateOfBirth: "18 kwietnia 1996",
      height: "188 cm",
      marketValue: "28 mln €",
      bio: "Dynamiczny prawy obrońca znany z ofensywnego stylu gry.",
    },
  ],
};

const headToHeadData: HeadToHeadMatch[] = [
  {
    date: "2024-10-15",
    teamA: "Polska",
    teamB: "Holandia",
    score: "2-1",
    competition: "El. Euro 2024",
  },
  {
    date: "2024-06-10",
    teamA: "Holandia",
    teamB: "Polska",
    score: "3-2",
    competition: "Liga Narodów",
  },
  {
    date: "2023-11-18",
    teamA: "Polska",
    teamB: "Holandia",
    score: "1-1",
    competition: "Towarzyski",
  },
  {
    date: "2023-06-16",
    teamA: "Holandia",
    teamB: "Polska",
    score: "2-0",
    competition: "El. Euro 2024",
  },
  {
    date: "2022-09-22",
    teamA: "Polska",
    teamB: "Holandia",
    score: "0-2",
    competition: "Liga Narodów",
  },
];

export default function MatchDetailsPage() {
  const [activeTab, setActiveTab] = useState<"lineups" | "h2h" | "stats">(
    "lineups"
  );
  const router = useRouter();

  const match = mockMatch;
  const teamA = polskaTeam;
  const teamB = holandiaTeam;

  const handleBack = () => {
    router.push("/terminarz");
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pl-PL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getFormIcon = (result: "W" | "D" | "L") => {
    if (result === "W") return <div className="form-badge win">W</div>;
    if (result === "D") return <div className="form-badge draw">D</div>;
    return <div className="form-badge loss">L</div>;
  };

  const renderLineups = () => (
    <div className="lineups-container">
      <div className="team-lineup">
        <div className="lineup-header">
          <img
            src={match.teamALogo}
            alt={match.teamA}
            className="lineup-team-flag"
          />
          <div>
            <h3>{match.teamA}</h3>
            <p className="coach-name">Trener: {teamA.coach}</p>
          </div>
        </div>

        <div className="formation-label">Formacja: 4-2-3-1</div>

        <div className="match-players-list">
          {teamA.squad.map((player) => (
            <div key={player.id} className="match-player-card">
              <div className="match-player-number">{player.number}</div>
              <img
                src={player.image}
                alt={player.name}
                className="match-player-avatar"
              />
              <div className="match-player-info">
                <div className="match-player-name">{player.name}</div>
                <div className="match-player-position">{player.position}</div>
                <div className="match-player-club">
                  <img
                    src={player.clubLogo}
                    alt={player.club}
                    className="match-club-mini-logo"
                  />
                  {player.club}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lineup-divider"></div>

      <div className="team-lineup">
        <div className="lineup-header">
          <img
            src={match.teamBLogo}
            alt={match.teamB}
            className="lineup-team-flag"
          />
          <div>
            <h3>{match.teamB}</h3>
            <p className="coach-name">Trener: {teamB.coach}</p>
          </div>
        </div>

        <div className="formation-label">Formacja: 4-3-3</div>

        <div className="match-players-list">
          {teamB.squad.map((player) => (
            <div key={player.id} className="match-player-card">
              <div className="match-player-number">{player.number}</div>
              <img
                src={player.image}
                alt={player.name}
                className="match-player-avatar"
              />
              <div className="match-player-info">
                <div className="match-player-name">{player.name}</div>
                <div className="match-player-position">{player.position}</div>
                <div className="match-player-club">
                  <img
                    src={player.clubLogo}
                    alt={player.club}
                    className="match-club-mini-logo"
                  />
                  {player.club}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHeadToHead = () => (
    <div className="h2h-container">
      <div className="h2h-summary">
        <div className="h2h-stat">
          <div className="h2h-stat-value">2</div>
          <div className="h2h-stat-label">Zwycięstwa {match.teamA}</div>
        </div>
        <div className="h2h-stat">
          <div className="h2h-stat-value">1</div>
          <div className="h2h-stat-label">Remisy</div>
        </div>
        <div className="h2h-stat">
          <div className="h2h-stat-value">2</div>
          <div className="h2h-stat-label">Zwycięstwa {match.teamB}</div>
        </div>
      </div>

      <div className="h2h-matches">
        <h3 className="h2h-title">
          <History size={20} />
          Ostatnie 5 spotkań
        </h3>
        {headToHeadData.map((h2hMatch, index) => (
          <div key={index} className="h2h-match-card">
            <div className="h2h-date">
              {new Date(h2hMatch.date).toLocaleDateString("pl-PL")}
            </div>
            <div className="h2h-teams">
              <span className="h2h-team">{h2hMatch.teamA}</span>
              <span className="h2h-score">{h2hMatch.score}</span>
              <span className="h2h-team">{h2hMatch.teamB}</span>
            </div>
            <div className="h2h-competition">{h2hMatch.competition}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="stats-container">
      <div className="stats-section">
        <h3 className="stats-title">
          <TrendingUp size={20} />
          Ostatnia forma
        </h3>

        <div className="form-comparison">
          <div className="team-form">
            <div className="form-team-header">
              <img
                src={match.teamALogo}
                alt={match.teamA}
                className="form-flag"
              />
              <span>{match.teamA}</span>
            </div>
            <div className="form-badges">
              {teamA.recentForm.map((result, i) => (
                <div key={i}>{getFormIcon(result)}</div>
              ))}
            </div>
          </div>

          <div className="team-form">
            <div className="form-team-header">
              <img
                src={match.teamBLogo}
                alt={match.teamB}
                className="form-flag"
              />
              <span>{match.teamB}</span>
            </div>
            <div className="form-badges">
              {teamB.recentForm.map((result, i) => (
                <div key={i}>{getFormIcon(result)}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h3 className="stats-title">Kluczowi zawodnicy</h3>

        <div className="key-players">
          <div className="key-player-card">
            <img
              src={match.teamALogo}
              alt={match.teamA}
              className="key-player-flag"
            />
            <div className="key-player-name">{teamA.keyPlayer}</div>
            <div className="key-player-team">{match.teamA}</div>
          </div>

          <div className="key-player-card">
            <img
              src={match.teamBLogo}
              alt={match.teamB}
              className="key-player-flag"
            />
            <div className="key-player-name">{teamB.keyPlayer}</div>
            <div className="key-player-team">{match.teamB}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="match-details-page">
      <button className="back-button" onClick={handleBack}>
        <ArrowLeft size={20} />
        Powrót do terminarz
      </button>

      <div className="match-header">
        <div className="match-header-content">
          <div className="match-info-top">
            <div className="league-info">
              <Trophy size={16} />
              <span>{match.league}</span>
            </div>
            <div className="match-date-info">
              <Calendar size={16} />
              <span>{formatDate(match.date)}</span>
            </div>
          </div>

          <div className="match-teams">
            <div className="team-side">
              <img
                src={match.teamALogo}
                alt={match.teamA}
                className="team-flag-large"
              />
              <h2>{match.teamA}</h2>
            </div>

            <div className="match-time-display">
              {match.status === "Zakończony" && match.score ? (
                <>
                  <div className="score">{match.score}</div>
                  <div className="status-badge status-finished">Zakończony</div>
                </>
              ) : match.status === "LIVE" ? (
                <>
                  <div className="live-indicator">
                    <span className="pulse-dot"></span>
                    <span className="live-text">NA ŻYWO</span>
                  </div>
                  {match.score && <div className="score">{match.score}</div>}
                </>
              ) : (
                <>
                  <div className="time">{match.time}</div>
                  <div className="status-badge status-upcoming">
                    {match.status}
                  </div>
                </>
              )}
            </div>

            <div className="team-side">
              <img
                src={match.teamBLogo}
                alt={match.teamB}
                className="team-flag-large"
              />
              <h2>{match.teamB}</h2>
            </div>
          </div>

          {match.venue && match.city && (
            <div className="venue-info">
              <MapPin size={16} />
              <span>
                {match.venue}, {match.city}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === "lineups" ? "active" : ""}`}
          onClick={() => setActiveTab("lineups")}
        >
          <Users size={18} />
          Składy
        </button>
        <button
          className={`tab-button ${activeTab === "h2h" ? "active" : ""}`}
          onClick={() => setActiveTab("h2h")}
        >
          <History size={18} />
          Head to Head
        </button>
        <button
          className={`tab-button ${activeTab === "stats" ? "active" : ""}`}
          onClick={() => setActiveTab("stats")}
        >
          <TrendingUp size={18} />
          Statystyki
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "lineups" && renderLineups()}
        {activeTab === "h2h" && renderHeadToHead()}
        {activeTab === "stats" && renderStats()}
      </div>
    </div>
  );
}
