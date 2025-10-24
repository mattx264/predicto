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
import SplashScreen from "./splash-screen/SplashScreen";
import { AuthProvider } from "./context/AuthContext";
import PackOpening from "./pack-opening/PackOpening";
import DemoPage from "./how-to-play/demo-page/DemoPage";
import CardShop from "./card-shop/CardShop";
import Inventory from "./inventory/Inventory";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/create-room" element={<CreateRoomPage />} />
          <Route path="/room/:id" element={<RoomPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/jak-grac" element={<HowToPlay />} />
          <Route path="/pack-opening" element={<PackOpening />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/shop" element={<CardShop />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
