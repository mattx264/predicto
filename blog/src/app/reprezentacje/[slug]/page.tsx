import Link from "next/link";
import { ArrowLeft, Shirt, Shield, Swords, Target } from "lucide-react";
import "./page.css";
import { getTeamBySlug, Player } from "@/app/lib/teams";

interface TeamProfilePageProps {
  params: Promise<{ slug: string }>;
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

  return (
    <div className="team-profile-page">
      <header className="team-profile-header">
        <div className="header-content">
          <span className="header-flag">{team.flagEmoji}</span>
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
        <section className="team-description-section">
          <h2>Opis Reprezentacji</h2>
          <div
            className="description-content"
            dangerouslySetInnerHTML={{ __html: team.description }}
          />
        </section>

        <section className="team-squad-section">
          <h2>Aktualny Skład</h2>
          {team.squad.length > 0 ? (
            <div className="squad-grid">
              {team.squad.map((player) => (
                <div key={player.name} className="player-card">
                  <div className="player-number">
                    <Shirt size={16} />
                    <span>{player.number}</span>
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
              ))}
            </div>
          ) : (
            <p className="no-squad-info">Brak informacji o składzie.</p>
          )}
        </section>
      </main>
    </div>
  );
}
