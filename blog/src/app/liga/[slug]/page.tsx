import React from "react";
import { TrendingUp, Minus } from "lucide-react";
import "./page.css";

interface Team {
  name: string;
  position: number;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  lastFive: ("W" | "D" | "L")[];
  status?: "Q" | "P";
}

interface Group {
  name: string;
  teams: Team[];
}

interface LeaguePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [{ liga: "liga", slug: "liga" }];
}

async function getQualifierGroups(slug: string): Promise<Group[]> {
  const groups: Group[] = [
    {
      name: "Grupa A",
      teams: [
        {
          position: 1,
          name: "Hiszpania",
          matches: 6,
          wins: 6,
          draws: 0,
          losses: 0,
          goalsFor: 20,
          goalsAgainst: 2,
          goalDifference: 18,
          points: 18,
          lastFive: ["W", "W", "W", "W", "W"],
          status: "Q",
        },
        {
          position: 2,
          name: "Szkocja",
          matches: 7,
          wins: 4,
          draws: 1,
          losses: 2,
          goalsFor: 12,
          goalsAgainst: 7,
          goalDifference: 5,
          points: 13,
          lastFive: ["L", "W", "L", "W", "D"],
          status: "P",
        },
        {
          position: 3,
          name: "Norwegia",
          matches: 6,
          wins: 3,
          draws: 1,
          losses: 2,
          goalsFor: 11,
          goalsAgainst: 9,
          goalDifference: 2,
          points: 10,
          lastFive: ["W", "D", "L", "W", "W"],
        },
        {
          position: 4,
          name: "Gruzja",
          matches: 6,
          wins: 1,
          draws: 1,
          losses: 4,
          goalsFor: 6,
          goalsAgainst: 15,
          goalDifference: -9,
          points: 4,
          lastFive: ["L", "L", "W", "D", "L"],
        },
        {
          position: 5,
          name: "Cypr",
          matches: 7,
          wins: 0,
          draws: 0,
          losses: 7,
          goalsFor: 2,
          goalsAgainst: 18,
          goalDifference: -16,
          points: 0,
          lastFive: ["L", "L", "L", "L", "L"],
        },
      ],
    },
    {
      name: "Grupa G",
      teams: [
        {
          position: 1,
          name: "Holandia",
          matches: 6,
          wins: 5,
          draws: 1,
          losses: 0,
          goalsFor: 22,
          goalsAgainst: 3,
          goalDifference: 19,
          points: 16,
          lastFive: ["W", "W", "D", "W", "W"],
          status: "Q",
        },
        {
          position: 2,
          name: "Polska",
          matches: 6,
          wins: 4,
          draws: 1,
          losses: 1,
          goalsFor: 10,
          goalsAgainst: 4,
          goalDifference: 6,
          points: 13,
          lastFive: ["W", "W", "D", "L", "W"],
          status: "P",
        },
        {
          position: 3,
          name: "Finlandia",
          matches: 7,
          wins: 3,
          draws: 1,
          losses: 3,
          goalsFor: 8,
          goalsAgainst: 13,
          goalDifference: -5,
          points: 10,
          lastFive: ["L", "W", "L", "D", "W"],
        },
        {
          position: 4,
          name: "Litwa",
          matches: 7,
          wins: 0,
          draws: 3,
          losses: 4,
          goalsFor: 6,
          goalsAgainst: 11,
          goalDifference: -5,
          points: 3,
          lastFive: ["D", "L", "D", "L", "D"],
        },
        {
          position: 5,
          name: "Malta",
          matches: 6,
          wins: 0,
          draws: 2,
          losses: 4,
          goalsFor: 1,
          goalsAgainst: 16,
          goalDifference: -15,
          points: 2,
          lastFive: ["D", "L", "L", "D", "L"],
        },
      ],
    },
  ];
  return groups;
}

const GroupTable = ({ group }: { group: Group }) => {
  const getMatchResultBadge = (result: "W" | "D" | "L") => {
    switch (result) {
      case "W":
        return (
          <span className="result-badge win" title="Wygrana">
            W
          </span>
        );
      case "D":
        return (
          <span className="result-badge draw" title="Remis">
            D
          </span>
        );
      case "L":
        return (
          <span className="result-badge loss" title="Porażka">
            L
          </span>
        );
    }
  };

  const getRowClassName = (team: Team) => {
    const classNames = ["table-row"];
    if (team.status === "Q") {
      classNames.push("promotion-zone");
    } else if (team.status === "P") {
      classNames.push("playoff-zone");
    }
    return classNames.join(" ");
  };

  return (
    <article className="league-table-section">
      <h2 className="section-title">{group.name}</h2>
      <div className="league-table-container">
        <table className="league-table">
          <thead>
            <tr>
              <th className="col-position">#</th>
              <th className="col-team">Drużyna</th>
              <th className="col-stat">M</th>
              <th className="col-stat">W</th>
              <th className="col-stat">R</th>
              <th className="col-stat">P</th>
              <th className="col-stat">Bramki</th>
              <th className="col-stat">+/-</th>
              <th className="col-points">Pkt</th>
              <th className="col-form">Forma</th>
            </tr>
          </thead>
          <tbody>
            {group.teams.map((team) => (
              <tr key={team.name} className={getRowClassName(team)}>
                <td className="col-position">
                  <div className="position-cell">
                    {team.status === "Q" ? (
                      <TrendingUp size={16} className="trend-up" />
                    ) : (
                      <Minus size={16} className="trend-neutral" />
                    )}
                    <span className="position-number">{team.position}</span>
                  </div>
                </td>
                <td className="col-team">
                  <div className="team-cell">
                    <div className="team-logo-placeholder">
                      {team.name.charAt(0)}
                    </div>
                    <span className="team-name">{team.name}</span>
                  </div>
                </td>
                <td className="col-stat">{team.matches}</td>
                <td className="col-stat">{team.wins}</td>
                <td className="col-stat">{team.draws}</td>
                <td className="col-stat">{team.losses}</td>
                <td className="col-stat">
                  {team.goalsFor}:{team.goalsAgainst}
                </td>
                <td className="col-stat">
                  <span
                    className={`goal-diff ${
                      team.goalDifference > 0
                        ? "positive"
                        : team.goalDifference < 0
                        ? "negative"
                        : ""
                    }`}
                  >
                    {team.goalDifference > 0 ? "+" : ""}
                    {team.goalDifference}
                  </span>
                </td>
                <td className="col-points">
                  <span className="points-value">{team.points}</span>
                </td>
                <td className="col-form">
                  <div className="form-badges">
                    {team.lastFive.map((result, index) => (
                      <React.Fragment key={index}>
                        {getMatchResultBadge(result)}
                      </React.Fragment>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-legend">
        <div className="legend-item">
          <span className="legend-indicator promotion-indicator"></span>
          <span>Bezpośredni awans</span>
        </div>
        <div className="legend-item">
          <span className="legend-indicator playoff-indicator"></span>
          <span>Baraże</span>
        </div>
      </div>
    </article>
  );
};

export default async function LeaguePage({ params }: LeaguePageProps) {
  const { slug } = await params;
  const groups = await getQualifierGroups(slug);

  return (
    <div className="qualifiers-page">
      <header className="page-header">
        <h1>Eliminacje MŚ 2026 - Strefa UEFA</h1>
        <p>Aktualna sytuacja w grupach eliminacyjnych.</p>
      </header>

      <main className="groups-grid">
        {groups.map((group) => (
          <GroupTable key={group.name} group={group} />
        ))}
      </main>
    </div>
  );
}
