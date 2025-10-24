"use client";

import Link from "next/link";
import "./page.css";
import * as flags from "country-flag-icons/react/3x2";
import { getTeams, Team } from "@/app/lib/teams";
import { TOURNAMENTS } from "@/app/lib/tournaments";
import { useEffect, useState } from "react";

interface TeamCardProps {
  tournamentSlug: string;
}

const TeamCard = ({ tournamentSlug }: TeamCardProps) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeams() {
      try {
        setLoading(true);
        const data = await getTeams(tournamentSlug);
        setTeams(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching teams:", err);
        setError("Nie udało się pobrać drużyn. Spróbuj ponownie później.");
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, [tournamentSlug]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Ładowanie reprezentacji...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p style={{ color: "#ef4444", textAlign: "center", padding: "2rem" }}>
          {error}
        </p>
      </div>
    );
  }

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

export default function TeamsPage({ params }: TeamsPageProps) {
  const [tournamentSlug, setTournamentSlug] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadParams() {
      const resolvedParams = await params;
      setTournamentSlug(resolvedParams.tournamentSlug);
      setLoading(false);
    }
    loadParams();
  }, [params]);

  if (loading) {
    return (
      <div className="teams-page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Ładowanie...</p>
        </div>
      </div>
    );
  }

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
