import Link from "next/link";
import "./page.css";
import * as flags from "country-flag-icons/react/3x2";
import { getTeams } from "@/app/lib/teams";
import { TOURNAMENTS } from "@/app/lib/tournaments";

interface TeamCardProps {
  tournamentSlug: string;
}

const TeamCard = async ({ tournamentSlug }: TeamCardProps) => {
  const teams = await getTeams(tournamentSlug);

  if (teams.length === 0) {
    return (
      <p style={{ color: "white", textAlign: "center", padding: "2rem" }}>
        Brak reprezentacji przypisanych do tego turnieju.
      </p>
    );
  }

  return (
    <div className="teams-grid">
      {teams.map((team) => {
        const FlagComponent = flags[team.flag as keyof typeof flags];

        return (
          <Link
            href={`/${tournamentSlug}/reprezentacje/${team.slug}`}
            key={team.slug}
            className="team-card"
          >
            <div className="flag-container">
              {FlagComponent ? (
                <FlagComponent title={team.name} className="flag-svg" />
              ) : (
                <span className="flag-emoji">{team.flag}</span>
              )}
            </div>
            <h3 className="team-name">{team.name}</h3>
          </Link>
        );
      })}
    </div>
  );
};

interface TeamsPageProps {
  params: Promise<{
    tournamentSlug: string;
  }>;
}

export default async function TeamsPage({ params }: TeamsPageProps) {
  const { tournamentSlug } = await params;

  const tournament = TOURNAMENTS.find((t) => t.slug === tournamentSlug);
  const tournamentName = tournament ? tournament.name : "Turniej";

  return (
    <div className="teams-page-container">
      <header className="teams-page-header">
        <h1>Reprezentacje: {tournamentName}</h1>
        <p>
          Przeglądaj profile drużyn narodowych biorących udział w{" "}
          {tournamentName}.
        </p>
      </header>
      <main>
        <TeamCard tournamentSlug={tournamentSlug} />
      </main>
    </div>
  );
}
