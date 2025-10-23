import Link from "next/link";
import { ArrowLeft, Cake, Ruler, BarChart2, Shield } from "lucide-react";
import "./page.css";
import { TOURNAMENTS } from "@/app/lib/tournaments";
import { getPlayerBySlug, getTeamBySlug, getTeams } from "@/app/lib/teams";
import Image from "next/image";

export async function generateStaticParams() {
  const params = [];

  for (const tournament of TOURNAMENTS) {
    const teams = await getTeams(tournament.slug);

    for (const team of teams) {
      const fullTeam = await getTeamBySlug(tournament.slug, team.slug);

      if (fullTeam && fullTeam.squad.length > 0) {
        for (const player of fullTeam.squad) {
          params.push({
            tournamentSlug: tournament.slug,
            slug: team.slug,
            playerSlug: player.slug,
          });
        }
      }
    }
  }

  return params;
}

interface PlayerProfilePageProps {
  params: Promise<{
    tournamentSlug: string;
    slug: string;
    playerSlug: string;
  }>;
}

export default async function PlayerProfilePage({
  params,
}: PlayerProfilePageProps) {
  const { tournamentSlug, slug, playerSlug } = await params;

  const player = await getPlayerBySlug(tournamentSlug, slug, playerSlug);

  if (!player) {
    return (
      <div className="profile-not-found">
        <h1>Nie znaleziono zawodnika</h1>
        <Link href={`/${tournamentSlug}/reprezentacje/${slug}`}>
          <ArrowLeft size={16} /> Wróć do składu
        </Link>
      </div>
    );
  }

  return (
    <div className="player-profile-page">
      <div className="profile-container">
        <Link
          href={`/${tournamentSlug}/reprezentacje/${slug}`}
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
                height={44}
                width={44}
              />
              <div className="profile-header-info">
                <span className="player-number-large">#{player.number}</span>
                <h1 className="player-name-large">{player.name}</h1>
                <div className="player-club-expandable">
                  <Image
                    src={player.clubLogo}
                    alt={player.club}
                    className="club-logo-large"
                    height={64}
                    width={64}
                  />
                  <span className="club-name-hidden">{player.club}</span>
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
