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
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getPlayerBySlug, Player } from "@/app/lib/teams";

interface PlayerProfilePageProps {
  params: Promise<{
    tournamentSlug: string;
    slug: string;
    playerSlug: string;
  }>;
}

export default function PlayerProfilePage({ params }: PlayerProfilePageProps) {
  const [player, setPlayer] = useState<Player | null>(null);
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

    async function loadPlayer() {
      if (!resolvedParams) return;

      try {
        setLoading(true);
        setError(null);

        const playerData = await getPlayerBySlug(
          resolvedParams.tournamentSlug,
          resolvedParams.slug,
          resolvedParams.playerSlug
        );

        setPlayer(playerData || null);
      } catch (err) {
        console.error("Error loading player:", err);
        setError("Nie udało się załadować zawodnika");
      } finally {
        setLoading(false);
      }
    }

    loadPlayer();
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
                resolvedParams!.slug
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

  return (
    <div className="player-profile-page">
      <div className="profile-container">
        <Link
          href={`/${resolvedParams.tournamentSlug}/reprezentacje/${resolvedParams.slug}`}
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
              />
              <div className="profile-header-info">
                <span className="player-number-large">#{player.number}</span>
                <h1 className="player-name-large">{player.name}</h1>
                <div className="player-details">
                  <p className="player-full-name">
                    {player.firstName} {player.lastName}
                  </p>
                  <p className="player-age">{player.age} lat</p>
                  <p className="club-name-text">{player.club}</p>
                </div>
              </div>
            </div>

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

              {player.weight && (
                <div className="stat-item">
                  <User className="stat-icon" />
                  <span className="stat-label">Waga</span>
                  <span className="stat-value">{player.weight} kg</span>
                </div>
              )}

              <div className="stat-item">
                <Globe className="stat-icon" />
                <span className="stat-label">Narodowość</span>
                <span className="stat-value">{player.nationality}</span>
              </div>

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
