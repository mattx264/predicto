import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import "./LeagueTable.css";

interface TeamStats {
  id: string;
  position: number;
  teamName: string;
  logo?: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  lastFiveMatches: ("W" | "D" | "L")[];
}

interface LeagueTableProps {
  teams: TeamStats[];
  highlightedTeams?: string[];
}

const LeagueTable: React.FC<LeagueTableProps> = ({
  teams,
  highlightedTeams = [],
}) => {
  const getMatchResultBadge = (result: "W" | "D" | "L") => {
    switch (result) {
      case "W":
        return <span className="result-badge win">W</span>;
      case "D":
        return <span className="result-badge draw">D</span>;
      case "L":
        return <span className="result-badge loss">L</span>;
    }
  };

  const getPositionTrend = (position: number) => {
    if (position <= 4) {
      return <TrendingUp size={16} className="trend-up" />;
    } else if (position >= teams.length - 3) {
      return <TrendingDown size={16} className="trend-down" />;
    }
    return <Minus size={16} className="trend-neutral" />;
  };

  const getRowClassName = (team: TeamStats) => {
    const classNames = ["table-row"];
    if (highlightedTeams.includes(team.id)) {
      classNames.push("highlighted");
    }
    if (team.position <= 8) {
      classNames.push("promotion-zone");
    } else if (team.position >= 9 && team.position <= 24) {
      classNames.push("playoff-zone");
    }
    return classNames.join(" ");
  };

  return (
    <div className="league-table-section">
      <div className="league-table-header">
        <h2 className="section-title">Tabela ligowa</h2>
        <p className="section-description">
          Aktualna klasyfikacja drużyn w turnieju
        </p>
      </div>

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
            {teams.map((team) => (
              <tr key={team.id} className={getRowClassName(team)}>
                <td className="col-position">
                  <div className="position-cell">
                    {getPositionTrend(team.position)}
                    <span className="position-number">{team.position}</span>
                  </div>
                </td>
                <td className="col-team">
                  <div className="team-cell">
                    {team.logo ? (
                      <img
                        src={team.logo}
                        alt={team.teamName}
                        className="team-logo"
                      />
                    ) : (
                      <div className="team-logo-placeholder">
                        {team.teamName.charAt(0)}
                      </div>
                    )}
                    <span className="team-name">{team.teamName}</span>
                  </div>
                </td>
                <td className="col-stat">{team.matchesPlayed}</td>
                <td className="col-stat">{team.wins}</td>
                <td className="col-stat">{team.draws}</td>
                <td className="col-stat">{team.losses}</td>
                <td className="col-stat">
                  {team.goalsFor}:{team.goalsAgainst}
                </td>
                <td className="col-stat">
                  <span
                    className={`goal-diff ${team.goalDifference > 0
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
                    {team.lastFiveMatches.map((result, index) => (
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
          <span>Awans (Top 8)</span>
        </div>
        <div className="legend-item">
          <span className="legend-indicator playoff-indicator"></span>
          <span>Play-offy (9-24)</span>
        </div>
        <div className="legend-item">
          <span className="result-badge win">W</span>
          <span>Wygrana</span>
        </div>
        <div className="legend-item">
          <span className="result-badge draw">D</span>
          <span>Remis</span>
        </div>
        <div className="legend-item">
          <span className="result-badge loss">L</span>
          <span>Przegrana</span>
        </div>
      </div>
    </div>
  );
};

export default LeagueTable;
