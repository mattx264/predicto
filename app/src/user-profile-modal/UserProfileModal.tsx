// UserProfileModal.tsx
import React, { useState, useEffect } from "react";
import { X, User, Wallet, Settings, Shield, Calendar } from "lucide-react";
import "./UserProfileModal.css";
import ProfileTab from "./tabs/ProfileTab";
import SecurityTab from "./tabs/SecurityTab";
import SettingsTab from "./tabs/SettingsTab";
import WalletTab from "./tabs/WalletTab";
import { useAuth } from "../auth/AuthContext";
import authService from "../services/signalr/auth.service";


interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTopUp: () => void;
}

export interface UserData {
  userId: number;
  username: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  bio: string;
  avatar: string;
  balance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  achievements: number;
}

export interface SettingsData {
  emailNotifications: boolean;
  pushNotifications: boolean;
  matchReminders: boolean;
  resultNotifications: boolean;
  privateProfile: boolean;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenTopUp,
}) => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "profile" | "settings" | "wallet" | "security"
  >("profile");
  const [shouldRender, setShouldRender] = useState(false);

  const [userData, setUserData] = useState<UserData>({
    userId: user?.id || 0,
    username: user?.name || "",
    email: user?.email || "",
    phone: "",
    location: "",
    joinDate: token ? authService.getJoinDate(token) : new Date().toISOString(),
    bio: "",
    avatar: "",
    balance: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    achievements: 0,
  });

  const [settings, setSettings] = useState<SettingsData>({
    emailNotifications: true,
    pushNotifications: false,
    matchReminders: true,
    resultNotifications: true,
    privateProfile: false,
  });

  useEffect(() => {
    if (user && token) {
      setUserData((prev) => ({
        ...prev,
        userId: user.id || 0,
        username: user.name || "",
        email: user.email || "",
        joinDate: authService.getJoinDate(token),
      }));
    }
  }, [user, token]);
  useEffect(() => {
    if (isOpen) {
      setShouldRender(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShouldRender(true);
        });
      });
    } else {
      setShouldRender(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSettingsChange = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleTopUpClick = () => {
    onClose();
    onOpenTopUp();
  };

  return (
    <div
      className={`my-profile-overlay ${shouldRender ? "show" : ""}`}
      onClick={onClose}
    >
      <div className="my-profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="my-profile-header">
          <div className="my-profile-header-bg"></div>
          <button className="my-profile-close" onClick={onClose}>
            <X size={24} />
          </button>

          <div className="my-profile-avatar-section">
            <div className="my-profile-avatar-wrapper">
              <div className="my-profile-avatar-large">
                {userData.avatar ? (
                  <img src={userData.avatar} alt={userData.username} />
                ) : (
                  <User size={48} />
                )}
              </div>
              <button className="my-profile-avatar-upload-btn">
                <User size={16} />
              </button>
            </div>
            <div className="my-profile-header-info">
              <h2 className="my-profile-username">{userData.username}</h2>
              <p className="my-profile-join-date">
                <Calendar size={14} />
                Dołączył{" "}
                {new Date(userData.joinDate).toLocaleDateString("pl-PL")}
              </p>
            </div>
          </div>
        </div>

        <div className="my-profile-tabs">
          <button
            className={`my-profile-tab ${activeTab === "profile" ? "active" : ""
              }`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={18} />
            <span className="my-profile-tab-text">Profil</span>
          </button>
          <button
            className={`my-profile-tab ${activeTab === "wallet" ? "active" : ""
              }`}
            onClick={() => setActiveTab("wallet")}
          >
            <Wallet size={18} />
            <span className="my-profile-tab-text">Portfel</span>
          </button>
          <button
            className={`my-profile-tab ${activeTab === "settings" ? "active" : ""
              }`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={18} />
            <span className="my-profile-tab-text">Ustawienia</span>
          </button>
          <button
            className={`my-profile-tab ${activeTab === "security" ? "active" : ""
              }`}
            onClick={() => setActiveTab("security")}
          >
            <Shield size={18} />
            <span className="my-profile-tab-text">Bezpieczeństwo</span>
          </button>
        </div>

        <div className="my-profile-content">
          {activeTab === "profile" && (
            <ProfileTab userData={userData} setUserData={setUserData} />
          )}

          {activeTab === "wallet" && (
            <WalletTab userData={userData} onOpenTopUp={handleTopUpClick} />
          )}

          {activeTab === "settings" && (
            <SettingsTab
              settings={settings}
              handleSettingsChange={handleSettingsChange}
            />
          )}

          {activeTab === "security" && <SecurityTab />}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;