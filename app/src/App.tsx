import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import "./i18n/i18n";
import Navigation from "./nav/Navigation";
import LoginPage from "./login/LoginPage";
import HomePage from "./home/HomePage";
import RegisterPage from "./register/RegisterPage";
import RoomsPage from "./all-rooms/RoomsPage";
import CreateRoomPage from "./create-room/CreateRoomPage";
import RoomPage from "./game-room/RoomPage";
import RankingPage from "./ranking/RankingPage";
import DashboardPage from "./dashboard/DashboardPage";
import HowToPlay from "./how-to-play/HowToPlay";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogin = (token: string) => {
    setIsAuthenticated(true);
    localStorage.setItem("authToken", token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };

  return (
    <Router>
      <Navigation
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        username="Gracz"
      />

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <HomePage />
          }
        />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
          }
        />

        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<RegisterPage onRegister={handleLogin} />}
        />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/create-room" element={<CreateRoomPage />} />
        <Route path="/room/:id" element={<RoomPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/jak-grac" element={<HowToPlay />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
