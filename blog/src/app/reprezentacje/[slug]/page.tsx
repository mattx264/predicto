import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  User,
  Shield,
  Target,
  TrendingUp,
  Swords,
} from "lucide-react";
import "./page.css";
import { getTeamBySlug, getTeams, Player } from "@/app/lib/teams";
import * as flags from "country-flag-icons/react/3x2";

interface TeamProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const teams = await getTeams();

  return teams.map((team) => ({
    slug: team.slug,
  }));
}

const getPositionIcon = (position: Player["position"]) => {
  switch (position) {
    case "Bramkarz":
      return <Shield size={20} className="position-icon goalkeeper" />;
    case "Obrońca":
      return <Shield size={20} className="position-icon defender" />;
    case "Pomocnik":
      return <Swords size={20} className="position-icon midfielder" />;
    case "Napastnik":
      return <Target size={20} className="position-icon forward" />;
  }
};

const ResultBadge = ({ result }: { result: "W" | "D" | "L" }) => {
  const resultClass = `result-${result.toLowerCase()}`;
  return <span className={`result-badge ${resultClass}`}>{result}</span>;
};

export default async function TeamProfilePage({
  params,
}: TeamProfilePageProps) {
  const { slug } = await params;
  const team = await getTeamBySlug(slug);

  if (!team) {
    return (
      <div className="team-not-found">
        <h1>Reprezentacja nie została znaleziona</h1>
        <Link href="/reprezentacje" className="back-to-list-link">
          <ArrowLeft size={18} /> Wróć do listy
        </Link>
      </div>
    );
  }

  const FlagComponent = flags[team.flag as keyof typeof flags];

  return (
    <div className="team-profile-page">
      <header className="team-profile-header">
        <div className="header-content">
          {FlagComponent ? (
            <FlagComponent title={team.name} className="header-flag-svg" />
          ) : (
            <span className="header-flag">{team.flag}</span>
          )}
          <h1 className="header-team-name">{team.name}</h1>
        </div>
        <Link
          href="/reprezentacje"
          className="back-to-list-link header-back-link"
        >
          <ArrowLeft size={18} /> Wróć do listy
        </Link>
      </header>

      <main className="team-profile-main">
        <div className="main-grid">
          <div className="main-content">
            <section className="team-description-section">
              <h2>Opis Reprezentacji</h2>
              <p className="description-content">{team.description}</p>
            </section>

            <section className="team-squad-section">
              <h2>Aktualny Skład</h2>
              {team.squad.length > 0 ? (
                <div className="squad-grid">
                  {team.squad.map((player) => (
                    <Link
                      key={player.id}
                      href={`/reprezentacje/${team.slug}/${player.slug}`}
                      className="player-card-link"
                    >
                      <div className="player-card">
                        <div className="player-avatar">
                          <img
                            src={player.image}
                            alt={player.name}
                            className="player-image"
                          />
                          <div className="player-number-badge">
                            {player.number}
                          </div>
                        </div>
                        <div className="player-info">
                          <p className="player-name">{player.name}</p>
                          <p className="player-club">{player.club}</p>
                        </div>
                        <div className="player-position">
                          {getPositionIcon(player.position)}
                          <span>{player.position}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="no-squad-info">Brak informacji o składzie.</p>
              )}
            </section>
          </div>
          <aside className="sidebar">
            <div className="sidebar-widget">
              <h3>
                <User size={18} /> Trener
              </h3>
              <p>{team.coach}</p>
            </div>
            <div className="sidebar-widget">
              <h3>
                <Target size={18} /> Kluczowy zawodnik
              </h3>
              <p>{team.keyPlayer}</p>
            </div>
            <div className="sidebar-widget">
              <h3>
                <TrendingUp size={18} /> Ostatnia forma
              </h3>
              <div className="form-container">
                {team.recentForm.map((result, index) => (
                  <ResultBadge key={index} result={result} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
