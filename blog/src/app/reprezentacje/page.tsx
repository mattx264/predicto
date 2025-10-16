import Link from "next/link";
import "./page.css";
import { getTeams } from "../lib/teams";
import * as flags from "country-flag-icons/react/3x2";

const TeamCard = async () => {
  const teams = await getTeams();

  return (
    <div className="teams-grid">
      {teams.map((team) => {
        const FlagComponent = flags[team.flag as keyof typeof flags];

        return (
          <Link
            href={`/reprezentacje/${team.slug}`}
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

export default function TeamsPage() {
  return (
    <div className="teams-page-container">
      <header className="teams-page-header">
        <h1>Wybierz Reprezentację</h1>
        <p>
          Przeglądaj profile drużyn narodowych biorących udział w eliminacjach.
        </p>
      </header>
      <main>
        <TeamCard />
      </main>
    </div>
  );
}
