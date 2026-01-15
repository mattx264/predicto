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
import LoginPage from "./auth/login/LoginPage";
import HomePage from "./home/HomePage";
import RegisterPage from "./auth/register/RegisterPage";
import RoomsPage from "./all-rooms/RoomsPage";
import CreateRoomPage from "./create-room/CreateRoomPage";
import RoomPage from "./game-room/RoomPage";
import RankingPage from "./ranking/RankingPage";
import DashboardPage from "./dashboard/DashboardPage";
import HowToPlay from "./how-to-play/HowToPlay";
import SplashScreen from "./splash-screen/SplashScreen";
import { AuthProvider } from "./auth/AuthContext";
import DemoPage from "./how-to-play/demo-page/DemoPage";
import CardShop from "./card-shop/CardShop";
import UserProfileModal from "./user-profile-modal/UserProfileModal";
import { useAuth } from "./auth/AuthContext";
import { ToastContainer } from "react-toastify";
import WalletTopUpModal from "./payment/wallet-topup/WalletTopUpModal";

function AppContent() {
  const { user } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);

  const userBalance = 350.5;

  return (
    <>
      <Navigation
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenTopUp={() => setIsTopUpOpen(true)}
      />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/shop" element={<CardShop />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        username={user?.name || "Gracz"}
        onOpenTopUp={() => {
          setIsProfileOpen(false);
          setIsTopUpOpen(true);
        }}
      />

      <WalletTopUpModal
        isOpen={isTopUpOpen}
        onClose={() => setIsTopUpOpen(false)}
        currentBalance={userBalance}
      />
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
