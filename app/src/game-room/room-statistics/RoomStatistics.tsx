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
  PieChart as PieChartIcon,
  Activity,
  BarChart2,
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

  // Mock data - w przyszłości dynamiczne
  const pointsHistoryData = [
    { round: "K1", points: 15, user: 20, average: 12 },
    { round: "K2", points: 28, user: 35, average: 22 },
    { round: "K3", points: 42, user: 48, average: 35 },
    { round: "K4", points: 58, user: 65, average: 48 },
    { round: "K5", points: 73, user: 82, average: 60 },
    { round: "K6", points: 91, user: 98, average: 75 },
    { round: "K7", points: 108, user: 115, average: 88 },
    { round: "K8", points: 125, user: 132, average: 102 },
  ];

  const predictionAccuracyData = [
    { name: "Dokładny wynik", value: 12, color: "#22c55e" },
    { name: "Tylko wynik", value: 16, color: "#3b82f6" },
    { name: "Błędne", value: 8, color: "#ef4444" },
  ];

  const matchTypePerformanceData = [
    { type: "Remisy", predicted: 8, correct: 5, accuracy: 62.5 },
    { type: "Gospodarze", predicted: 15, correct: 9, accuracy: 60 },
    { type: "Goście", predicted: 13, correct: 7, accuracy: 53.8 },
  ];

  const topPerformersComparison = participants.slice(0, 5).map((p) => ({
    name:
      p.username.length > 10 ? p.username.substring(0, 8) + "..." : p.username,
    points: p.totalPoints,
    accuracy: ((p.correctPredictions / 36) * 100).toFixed(1),
  }));

  // Wspólny styl dla tooltipów wykresów
  const tooltipStyle = {
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    color: "#f8fafc",
    fontSize: "12px",
  };

  return (
    <div className="room-statistics">
      <div className="stats-header">
        <div className="title-icon-wrapper">
          <Activity size={24} />
        </div>
        <div className="header-text">
          <h2 className="section-title">Statystyki</h2>
          <p className="section-description">
            Analiza wyników i porównanie z innymi graczami
          </p>
        </div>
      </div>

      <div className="personal-stats-grid">
        <div className="personal-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper blue">
              <Target size={18} />
            </div>
            <span className="stat-card-title">Celność</span>
          </div>
          <div className="stat-card-value">
            {currentUser
              ? ((currentUser.correctPredictions / 36) * 100).toFixed(1)
              : 0}
            <span className="unit">%</span>
          </div>
          <div className="stat-card-label">
            {currentUser?.correctPredictions || 0} trafień / 36
          </div>
        </div>

        <div className="personal-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper yellow">
              <Trophy size={18} />
            </div>
            <span className="stat-card-title">Pozycja</span>
          </div>
          <div className="stat-card-value">#{currentUser?.rank || "-"}</div>
          <div className="stat-card-label">na {participants.length} graczy</div>
        </div>

        <div className="personal-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper green">
              <TrendingUp size={18} />
            </div>
            <span className="stat-card-title">Punkty</span>
          </div>
          <div className="stat-card-value">{currentUser?.totalPoints || 0}</div>
          <div className="stat-card-label">
            śr. {currentUser ? (currentUser.totalPoints / 8).toFixed(1) : 0}{" "}
            pkt/kol.
          </div>
        </div>

        <div className="personal-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper red">
              <CheckCircle size={18} />
            </div>
            <span className="stat-card-title">Seria</span>
          </div>
          <div className="stat-card-value">5</div>
          <div className="stat-card-label">rekord trafień z rzędu</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card full-width">
          <div className="chart-header">
            <div className="chart-icon-box">
              <TrendingUp size={18} />
            </div>
            <div>
              <h3 className="chart-title">Progres w czasie</h3>
              <p className="chart-subtitle">Ty vs Lider vs Średnia</p>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={pointsHistoryData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
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
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="round"
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 2 }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: "10px" }}
                />
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
                  activeDot={{ r: 6, strokeWidth: 0, fill: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#94a3b8"
                  strokeDasharray="5 5"
                  name="Średnia"
                  dot={false}
                  strokeWidth={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-icon-box">
              <PieChartIcon size={18} />
            </div>
            <div>
              <h3 className="chart-title">Dokładność</h3>
              <p className="chart-subtitle">Rozkład Twoich typów</p>
            </div>
          </div>

          <div className="chart-container donut-chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={predictionAccuracyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {predictionAccuracyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="chart-legend-custom">
              {predictionAccuracyData.map((item, index) => (
                <div key={index} className="legend-item-row">
                  <span
                    className="dot"
                    style={{ background: item.color }}
                  ></span>
                  <span className="label">{item.name}</span>
                  <span className="val">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-icon-box">
              <BarChart2 size={18} />
            </div>
            <div>
              <h3 className="chart-title">Wydajność</h3>
              <p className="chart-subtitle">Według typu meczu</p>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={matchTypePerformanceData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="type"
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: "10px" }}
                />
                <Bar
                  dataKey="predicted"
                  fill="#3b82f6"
                  name="Typy"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
                <Bar
                  dataKey="correct"
                  fill="#22c55e"
                  name="Trafione"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card full-width">
          <div className="chart-header">
            <div className="chart-icon-box">
              <Award size={18} />
            </div>
            <div>
              <h3 className="chart-title">TOP 5 Graczy</h3>
              <p className="chart-subtitle">Porównanie punktów</p>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={topPerformersComparison}
                layout="vertical"
                margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{ fontSize: 12, fill: "#cbd5e1", fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar
                  dataKey="points"
                  fill="#22c55e"
                  name="Punkty"
                  radius={[0, 6, 6, 0]}
                  barSize={24}
                  animationDuration={1500}
                >
                  {topPerformersComparison.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#fbbf24" : "#22c55e"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="detailed-stats-section">
        <h3 className="section-subtitle">
          <Users size={20} />
          Szczegółowa tabela
        </h3>
        <div className="stats-table">
          <div className="stats-table-header">
            <div className="table-cell">Gracz</div>
            <div className="table-cell center">Punkty</div>
            <div className="table-cell center">Trafienia</div>
            <div className="table-cell center mobile-hide">Dokładne</div>
            <div className="table-cell center">Celność</div>
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
                <div className="player-info-col">
                  <span className="player-name">{participant.username}</span>
                  {participant.id === currentUserId && (
                    <span className="you-badge-table">Ty</span>
                  )}
                </div>
              </div>
              <div className="table-cell center points-cell">
                {participant.totalPoints}
              </div>
              <div className="table-cell center">
                {participant.correctPredictions}
              </div>
              <div className="table-cell center mobile-hide">
                {Math.floor(participant.correctPredictions * 0.4)}
              </div>
              <div className="table-cell center accuracy-cell">
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
