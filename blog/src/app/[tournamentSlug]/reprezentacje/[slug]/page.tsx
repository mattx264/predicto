import Link from "next/link";
import {
  ArrowLeft,
  User,
  Shield,
  Target,
  TrendingUp,
  Swords,
} from "lucide-react";
import "./page.css";

import * as flags from "country-flag-icons/react/3x2";
import { TOURNAMENTS } from "@/app/lib/tournaments";
import { getTeamBySlug, getTeams, Player } from "@/app/lib/teams";
import Image from "next/image";

interface TeamProfilePageProps {
  params: Promise<{
    slug: string;
    tournamentSlug: string;
  }>;
}

export async function generateStaticParams() {
  const params = [];

  for (const tournament of TOURNAMENTS) {
    const teams = await getTeams(tournament.slug);

    for (const team of teams) {
      params.push({
        tournamentSlug: tournament.slug,
        slug: team.slug,
      });
    }
  }

  return params;
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
  const { slug, tournamentSlug } = await params;

  const team = await getTeamBySlug(tournamentSlug, slug);

  if (!team) {
    return (
      <div className="team-not-found">
        <h1>Reprezentacja nie została znaleziona</h1>
        <Link
          href={`/${tournamentSlug}/reprezentacje`}
          className="back-to-list-link"
        >
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
          href={`/${tournamentSlug}/reprezentacje`}
          className="back-to-list-link header-back-link"
        >
          <ArrowLeft size={18} /> Wróć do listy
        </Link>
      </header>

      <main className="team-profile-main">
        <div className="main-grid">
          <div className="main-content">
            {/* <section className="team-description-section">
              <h2>Opis Reprezentacji</h2>
              <p className="description-content">
                {team.description || "Brak opisu reprezentacji."}
              </p>
            </section> */}

            <section className="team-squad-section">
              <h2>Aktualny Skład</h2>
              {team.squad.length > 0 ? (
                <div className="squad-grid">
                  {team.squad.map((player) => (
                    <Link
                      key={player.id}
                      href={`/${tournamentSlug}/reprezentacje/${team.slug}/${player.slug}`}
                      className="player-card-link"
                    >
                      <div className="player-card">
                        <div className="player-avatar">
                          <Image
                            src={player.image}
                            alt={player.name}
                            className="player-image"
                            height={64}
                            width={64}
                          />
                          {player.number > 0 && (
                            <div className="player-number-badge">
                              {player.number}
                            </div>
                          )}
                        </div>
                        <div className="player-info">
                          <p className="player-name">{player.name}</p>
                          <p className="player-club">
                            {player.club || "Brak informacji"}
                          </p>
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
              <p>{team.coach || "Brak informacji"}</p>
            </div>
            {/* <div className="sidebar-widget">
              <h3>
                <Target size={18} /> Kluczowy zawodnik
              </h3>
              <p>{team.keyPlayer || "Brak informacji"}</p>
            </div> */}
            {team.recentForm.length > 0 && (
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
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
