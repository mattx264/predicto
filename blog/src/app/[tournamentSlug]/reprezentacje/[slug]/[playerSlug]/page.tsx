"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Cake,
  Ruler,
  BarChart2,
  Shield,
  User,
  Globe,
  MapPin,
  TrendingUp,
  Activity,
  Target,
  Zap,
  Award,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getPlayerBySlug, getTeamBySlug, Player, Team } from "@/app/lib/teams";
import "./page.css";

interface PlayerProfilePageProps {
  params: Promise<{
    tournamentSlug: string;
    slug: string;
    playerSlug: string;
  }>;
}

export default function PlayerProfilePage({ params }: PlayerProfilePageProps) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{
    tournamentSlug: string;
    slug: string;
    playerSlug: string;
  } | null>(null);

  useEffect(() => {
    async function loadParams() {
      const resolved = await params;
      setResolvedParams(resolved);
    }
    loadParams();
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    async function loadPlayerAndTeam() {
      if (!resolvedParams) return;

      try {
        setLoading(true);
        setError(null);

        const playerData = await getPlayerBySlug(
          resolvedParams.tournamentSlug,
          resolvedParams.slug,
          resolvedParams.playerSlug
        );

        const teamData = await getTeamBySlug(
          resolvedParams.tournamentSlug,
          resolvedParams.slug
        );

        setPlayer(playerData || null);
        setTeam(teamData || null);
      } catch (err) {
        console.error("Error loading player:", err);
        setError("Nie udało się załadować zawodnika");
      } finally {
        setLoading(false);
      }
    }

    loadPlayerAndTeam();
  }, [resolvedParams]);

  if (!resolvedParams || loading) {
    return (
      <div className="player-profile-page">
        <div className="profile-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Ładowanie profilu zawodnika...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="player-profile-page">
        <div className="profile-container">
          <div className="profile-not-found">
            <h1>Nie znaleziono zawodnika</h1>
            <p>{error || "Zawodnik nie został znaleziony w bazie danych."}</p>
            <Link
              href={`/${resolvedParams!.tournamentSlug}/reprezentacje/${
                team?.slug || resolvedParams!.slug
              }`}
              className="back-link"
            >
              <ArrowLeft size={16} /> Wróć do składu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const avgMinutesPerMatch =
    player.matchesPlayed > 0
      ? (player.minutesPlayed / player.matchesPlayed).toFixed(0)
      : "0";

  const goalsPerMatch =
    player.matchesPlayed > 0
      ? (player.goals / player.matchesPlayed).toFixed(2)
      : "0.00";

  return (
    <div className="player-profile-page">
      <div className="profile-container">
        <Link
          href={`/${resolvedParams.tournamentSlug}/reprezentacje/${
            team?.slug || resolvedParams.slug
          }`}
          className="back-link"
        >
          <ArrowLeft size={18} /> Wróć do składu reprezentacji
        </Link>

        <main className="profile-main-content">
          <div className="profile-card">
            <div className="profile-card-header">
              <Image
                src={player.image}
                alt={`Zdjęcie ${player.name}`}
                className="profile-image"
                height={180}
                width={180}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                }}
              />
              <div className="profile-header-info">
                {player.number > 0 && (
                  <span className="player-number-large">#{player.number}</span>
                )}
                <h1 className="player-name-large">{player.name}</h1>
                <div className="player-details">
                  <p className="player-full-name">
                    {player.firstName} {player.lastName}
                  </p>
                  {player.age > 0 && (
                    <p className="player-age">{player.age} lat</p>
                  )}
                  {player.club && (
                    <p className="club-name-text">{player.club}</p>
                  )}
                </div>
              </div>
            </div>

            {player.matchesPlayed > 0 && (
              <div className="tournament-stats-section">
                <h2 className="section-title">
                  <TrendingUp size={20} />
                  Statystyki w turnieju
                </h2>
                <div className="profile-stats-grid">
                  <div className="stat-item highlight">
                    <Award className="stat-icon" />
                    <span className="stat-label">Mecze rozegrane</span>
                    <span className="stat-value">{player.matchesPlayed}</span>
                  </div>

                  <div className="stat-item highlight">
                    <Activity className="stat-icon" />
                    <span className="stat-label">Minuty na boisku</span>
                    <span className="stat-value">
                      {player.minutesPlayed} min
                    </span>
                  </div>

                  <div className="stat-item highlight">
                    <Target className="stat-icon" />
                    <span className="stat-label">Średnio minut/mecz</span>
                    <span className="stat-value">{avgMinutesPerMatch} min</span>
                  </div>

                  {player.position !== "Bramkarz" && (
                    <>
                      <div className="stat-item highlight">
                        <Target className="stat-icon" />
                        <span className="stat-label">Gole</span>
                        <span className="stat-value">{player.goals}</span>
                      </div>

                      {player.assists !== null && (
                        <div className="stat-item highlight">
                          <TrendingUp className="stat-icon" />
                          <span className="stat-label">Asysty</span>
                          <span className="stat-value">{player.assists}</span>
                        </div>
                      )}

                      <div className="stat-item">
                        <BarChart2 className="stat-icon" />
                        <span className="stat-label">Średnia goli/mecz</span>
                        <span className="stat-value">{goalsPerMatch}</span>
                      </div>
                    </>
                  )}

                  {player.position === "Bramkarz" && player.saves !== null && (
                    <>
                      <div className="stat-item highlight">
                        <Shield className="stat-icon" />
                        <span className="stat-label">Obrony</span>
                        <span className="stat-value">{player.saves}</span>
                      </div>

                      {player.cleansheets !== null && (
                        <div className="stat-item highlight">
                          <Award className="stat-icon" />
                          <span className="stat-label">Czyste konta</span>
                          <span className="stat-value">
                            {player.cleansheets}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="tournament-stats-section">
              <h2 className="section-title">
                <Activity size={20} />
                Statystyki techniczne i fizyczne
              </h2>
              <div className="profile-stats-grid">
                {player.passingAccuracy !== null &&
                  player.passingAccuracy > 0 && (
                    <div className="stat-item">
                      <Target className="stat-icon" />
                      <span className="stat-label">Celność podań</span>
                      <span className="stat-value">
                        {player.passingAccuracy.toFixed(1)}%
                      </span>
                    </div>
                  )}

                {player.topSpeed !== null && player.topSpeed > 0 && (
                  <div className="stat-item">
                    <Zap className="stat-icon" />
                    <span className="stat-label">Maksymalna prędkość</span>
                    <span className="stat-value">
                      {player.topSpeed.toFixed(2)} km/h
                    </span>
                  </div>
                )}

                {player.distanceCovered !== null &&
                  player.distanceCovered > 0 && (
                    <div className="stat-item">
                      <Activity className="stat-icon" />
                      <span className="stat-label">Średni dystans/mecz</span>
                      <span className="stat-value">
                        {player.distanceCovered.toFixed(2)} km
                      </span>
                    </div>
                  )}

                {player.tackles > 0 && (
                  <div className="stat-item">
                    <Shield className="stat-icon" />
                    <span className="stat-label">Odbory</span>
                    <span className="stat-value">{player.tackles}</span>
                  </div>
                )}

                {player.ballsRecovered > 0 && (
                  <div className="stat-item">
                    <Shield className="stat-icon" />
                    <span className="stat-label">Piłki odebrane</span>
                    <span className="stat-value">{player.ballsRecovered}</span>
                  </div>
                )}

                {player.totalAttempts !== null && player.totalAttempts > 0 && (
                  <div className="stat-item">
                    <Target className="stat-icon" />
                    <span className="stat-label">Strzały</span>
                    <span className="stat-value">{player.totalAttempts}</span>
                  </div>
                )}
              </div>
            </div>

            {(player.yellowCards > 0 || player.redCards > 0) && (
              <div className="tournament-stats-section">
                <h2 className="section-title">
                  <Award size={20} />
                  Dyscyplina
                </h2>
                <div className="profile-stats-grid">
                  {player.yellowCards > 0 && (
                    <div className="stat-item warning">
                      <span className="stat-label">Żółte kartki</span>
                      <span className="stat-value">{player.yellowCards}</span>
                    </div>
                  )}

                  {player.redCards > 0 && (
                    <div className="stat-item danger">
                      <span className="stat-label">Czerwone kartki</span>
                      <span className="stat-value">{player.redCards}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="profile-stats-grid">
              <div className="stat-item">
                <Cake className="stat-icon" />
                <span className="stat-label">Data urodzenia</span>
                <span className="stat-value">{player.dateOfBirth}</span>
              </div>

              <div className="stat-item">
                <Ruler className="stat-icon" />
                <span className="stat-label">Wzrost</span>
                <span className="stat-value">{player.height}</span>
              </div>

              <div className="stat-item">
                <Shield className="stat-icon" />
                <span className="stat-label">Pozycja</span>
                <span className="stat-value">{player.position}</span>
              </div>

              <div className="stat-item">
                <BarChart2 className="stat-icon" />
                <span className="stat-label">Wartość rynkowa</span>
                <span className="stat-value">{player.marketValue}</span>
              </div>

              {player.weight && player.weight > 0 && (
                <div className="stat-item">
                  <User className="stat-icon" />
                  <span className="stat-label">Waga</span>
                  <span className="stat-value">{player.weight} kg</span>
                </div>
              )}

              {player.nationality && (
                <div className="stat-item">
                  <Globe className="stat-icon" />
                  <span className="stat-label">Narodowość</span>
                  <span className="stat-value">{player.nationality}</span>
                </div>
              )}

              {player.birthPlace && (
                <div className="stat-item">
                  <MapPin className="stat-icon" />
                  <span className="stat-label">Miejsce urodzenia</span>
                  <span className="stat-value">
                    {player.birthPlace}
                    {player.birthCountry && `, ${player.birthCountry}`}
                  </span>
                </div>
              )}
            </div>

            <div className="player-bio">
              <h2 className="bio-title">Biografia</h2>
              <p>{player.bio}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
