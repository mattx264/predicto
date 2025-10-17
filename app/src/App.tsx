import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
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
import SplashScreen from "./splash-screen/SplashScreen";
import authService from "./services/signalr/auth.service";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [username, setUsername] = useState("Gracz");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = authService.getToken();

      if (token && !authService.isTokenExpired(token)) {
        setIsAuthenticated(true);

        const user = await authService.getCurrentUser();
        if (user) {
          setUsername(user.name);
        }
      } else {
        authService.logout();
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="spinner" />
      </div>
    );
  }

  const handleLogin = async (token: string) => {
    setIsAuthenticated(true);

    const user = await authService.getCurrentUser();
    if (user) {
      setUsername(user.name);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUsername("Gracz");
  };

  return (
    <Router>
      <Navigation
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        username={username}
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
