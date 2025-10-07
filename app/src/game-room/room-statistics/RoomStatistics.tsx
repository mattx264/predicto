import React from "react";
import {
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  Target,
  Trophy,
  CheckCircle,
  Award,
  Users,
} from "lucide-react";
import "./RoomStatistics.css";

interface Participant {
  id: string;
  username: string;
  avatar: string;
  totalPoints: number;
  correctPredictions: number;
  rank: number;
}

interface RoomStatisticsProps {
  currentUserId: string;
  participants: Participant[];
}

const RoomStatistics: React.FC<RoomStatisticsProps> = ({
  currentUserId,
  participants,
}) => {
  const currentUser = participants.find((p) => p.id === currentUserId);

  const pointsHistoryData = [
    { round: "Kolejka 1", points: 15, user: 20, average: 12 },
    { round: "Kolejka 2", points: 28, user: 35, average: 22 },
    { round: "Kolejka 3", points: 42, user: 48, average: 35 },
    { round: "Kolejka 4", points: 58, user: 65, average: 48 },
    { round: "Kolejka 5", points: 73, user: 82, average: 60 },
    { round: "Kolejka 6", points: 91, user: 98, average: 75 },
    { round: "Kolejka 7", points: 108, user: 115, average: 88 },
    { round: "Kolejka 8", points: 125, user: 132, average: 102 },
  ];

  const predictionAccuracyData = [
    { name: "Dokładny wynik", value: 12, color: "#22c55e" },
    { name: "Tylko wynik", value: 16, color: "#3b82f6" },
    { name: "Błędne", value: 8, color: "#ef4444" },
  ];

  const matchTypePerformanceData = [
    { type: "Remisy", predicted: 8, correct: 5, accuracy: 62.5 },
    { type: "Wygrane gospodarzy", predicted: 15, correct: 9, accuracy: 60 },
    { type: "Wygrane gości", predicted: 13, correct: 7, accuracy: 53.8 },
  ];

  const topPerformersComparison = participants.slice(0, 5).map((p) => ({
    name: p.username,
    points: p.totalPoints,
    accuracy: ((p.correctPredictions / 36) * 100).toFixed(1),
  }));

  const renderPieLabel = (entry: {
    name?: string;
    value?: number;
    percent?: number;
  }) => {
    const { name, value, percent } = entry;
    return `${name}: ${value} (${((percent ?? 0) * 100).toFixed(0)}%)`;
  };

  return (
    <div className="room-statistics">
      <div className="stats-header">
        <h2 className="section-title">Statystyki i Analizy</h2>
        <p className="section-description">
          Szczegółowa analiza Twoich wyników i porównanie z innymi
        </p>
      </div>

      <div className="personal-stats-grid">
        <div className="personal-stat-card">
          <div className="stat-card-header">
            <Target className="stat-card-icon" />
            <span className="stat-card-title">Celność</span>
          </div>
          <div className="stat-card-value">
            {currentUser
              ? ((currentUser.correctPredictions / 36) * 100).toFixed(1)
              : 0}
            %
          </div>
          <div className="stat-card-label">
            {currentUser?.correctPredictions || 0} z 36 meczów
          </div>
        </div>

        <div className="personal-stat-card">
          <div className="stat-card-header">
            <TrendingUp className="stat-card-icon" />
            <span className="stat-card-title">Pozycja</span>
          </div>
          <div className="stat-card-value">#{currentUser?.rank || "-"}</div>
          <div className="stat-card-label">na {participants.length} graczy</div>
        </div>

        <div className="personal-stat-card">
          <div className="stat-card-header">
            <Trophy className="stat-card-icon" />
            <span className="stat-card-title">Punkty</span>
          </div>
          <div className="stat-card-value">{currentUser?.totalPoints || 0}</div>
          <div className="stat-card-label">
            średnio {currentUser ? (currentUser.totalPoints / 8).toFixed(1) : 0}{" "}
            pkt/kolejka
          </div>
        </div>

        <div className="personal-stat-card">
          <div className="stat-card-header">
            <CheckCircle className="stat-card-icon" />
            <span className="stat-card-title">Seria</span>
          </div>
          <div className="stat-card-value">5</div>
          <div className="stat-card-label">kolejnych trafień</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card full-width">
          <h3 className="chart-title">
            <TrendingUp size={20} />
            Progres punktów w czasie
          </h3>
          <p className="chart-description">
            Porównanie Twoich wyników z liderem i średnią pokoju
          </p>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={pointsHistoryData}>
                <defs>
                  <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLeader" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="round"
                  stroke="#94a3b8"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#f8fafc",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="user"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorLeader)"
                  name="Lider"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="points"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#colorUser)"
                  name="Ty"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#94a3b8"
                  strokeDasharray="5 5"
                  name="Średnia"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">
            <Target size={20} />
            Dokładność typowań
          </h3>
          <p className="chart-description">Rozkład Twoich prognoz</p>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={predictionAccuracyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderPieLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {predictionAccuracyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#f8fafc",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            {predictionAccuracyData.map((item, index) => (
              <div key={index} className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: item.color }}
                />
                <span className="legend-label">{item.name}</span>
                <span className="legend-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">
            <Award size={20} />
            Wydajność według typu meczu
          </h3>
          <p className="chart-description">
            Jak radzisz sobie z różnymi wynikami
          </p>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={matchTypePerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="type"
                  stroke="#94a3b8"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#f8fafc",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="predicted"
                  fill="#3b82f6"
                  name="Typowane"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="correct"
                  fill="#22c55e"
                  name="Trafione"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card full-width">
          <h3 className="chart-title">
            <Trophy size={20} />
            Porównanie z TOP 5
          </h3>
          <p className="chart-description">
            Twoja pozycja względem najlepszych graczy
          </p>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topPerformersComparison} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  type="number"
                  stroke="#94a3b8"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#94a3b8"
                  style={{ fontSize: "12px" }}
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#f8fafc",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="points"
                  fill="#22c55e"
                  name="Punkty"
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="detailed-stats-section">
        <h3 className="section-subtitle">
          <Users size={20} />
          Szczegółowe statystyki wszystkich graczy
        </h3>
        <div className="stats-table">
          <div className="stats-table-header">
            <div className="table-cell">Gracz</div>
            <div className="table-cell">Punkty</div>
            <div className="table-cell">Trafienia</div>
            <div className="table-cell">Dokładne</div>
            <div className="table-cell">Celność</div>
          </div>
          {participants.map((participant) => (
            <div
              key={participant.id}
              className={`stats-table-row ${
                participant.id === currentUserId ? "highlight-row" : ""
              }`}
            >
              <div className="table-cell player-cell">
                <div className="table-avatar">{participant.avatar}</div>
                <span>{participant.username}</span>
                {participant.id === currentUserId && (
                  <span className="you-badge-table">Ty</span>
                )}
              </div>
              <div className="table-cell points-cell">
                {participant.totalPoints}
              </div>
              <div className="table-cell">{participant.correctPredictions}</div>
              <div className="table-cell">
                {Math.floor(participant.correctPredictions * 0.4)}
              </div>
              <div className="table-cell accuracy-cell">
                {((participant.correctPredictions / 36) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomStatistics;
