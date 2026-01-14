import React, { useState, useEffect } from "react";
import { X, User, Wallet, Settings, Shield, Calendar } from "lucide-react";
import "./UserProfileModal.css";
import ProfileTab from "./tabs/ProfileTab";
import SecurityTab from "./tabs/SecurityTab";
import SettingsTab from "./tabs/SettingsTab";
import WalletTab from "./tabs/WalletTab";


interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  onOpenTopUp: () => void;
}

export interface UserData {
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
  username,
  onOpenTopUp, // ✅ NOWE
}) => {
  const [activeTab, setActiveTab] = useState<
    "profile" | "settings" | "wallet" | "security"
  >("profile");
  const [shouldRender, setShouldRender] = useState(false);

  const [userData, setUserData] = useState<UserData>({
    username: username,
    email: "http://localhost:5173/",
    phone: "+48 123 456 789",
    location: "Kraków, Polska",
    joinDate: "2024-01-15",
    bio: "Miłośnik piłki nożnej i typowania meczów",
    avatar: "",
    balance: 250.5,
    totalDeposits: 500,
    totalWithdrawals: 249.5,
    achievements: 12,
  });

  const [settings, setSettings] = useState<SettingsData>({
    emailNotifications: true,
    pushNotifications: false,
    matchReminders: true,
    resultNotifications: true,
    privateProfile: false,
  });

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
            <WalletTab
              userData={userData}
              onOpenTopUp={handleTopUpClick}
            />
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