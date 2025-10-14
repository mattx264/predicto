import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Settings,
  Shield,
  CreditCard,
  Bell,
  Eye,
  EyeOff,
  Save,
  Camera,
  Wallet,
  History,
} from "lucide-react";
import "./UserProfileModal.css";
import Achievements from "./achievements/Achievements";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  username,
}) => {
  const [activeTab, setActiveTab] = useState<
    "profile" | "settings" | "wallet" | "security"
  >("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
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

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    matchReminders: true,
    resultNotifications: true,
    privateProfile: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    console.log("Saving user data:", userData);
    setIsEditing(false);
  };

  const handleSettingsChange = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="my-profile-overlay" onClick={onClose}>
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
                <Camera size={16} />
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
            className={`my-profile-tab ${
              activeTab === "profile" ? "active" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={18} />
            <span className="my-profile-tab-text">Profil</span>
          </button>
          <button
            className={`my-profile-tab ${
              activeTab === "wallet" ? "active" : ""
            }`}
            onClick={() => setActiveTab("wallet")}
          >
            <Wallet size={18} />
            <span className="my-profile-tab-text">Portfel</span>
          </button>
          <button
            className={`my-profile-tab ${
              activeTab === "settings" ? "active" : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={18} />
            <span className="my-profile-tab-text">Ustawienia</span>
          </button>
          <button
            className={`my-profile-tab ${
              activeTab === "security" ? "active" : ""
            }`}
            onClick={() => setActiveTab("security")}
          >
            <Shield size={18} />
            <span className="my-profile-tab-text">Bezpieczeństwo</span>
          </button>
        </div>

        <div className="my-profile-content">
          {activeTab === "profile" && (
            <div className="my-profile-tab-content">
              <div className="my-profile-section">
                <div className="my-profile-section-header">
                  <h3>Informacje osobiste</h3>
                  {!isEditing ? (
                    <button
                      className="my-profile-btn-edit"
                      onClick={() => setIsEditing(true)}
                    >
                      Edytuj
                    </button>
                  ) : (
                    <div className="my-profile-edit-actions">
                      <button
                        className="my-profile-btn-cancel"
                        onClick={() => setIsEditing(false)}
                      >
                        Anuluj
                      </button>
                      <button
                        className="my-profile-btn-save"
                        onClick={handleSave}
                      >
                        <Save size={16} />
                        Zapisz
                      </button>
                    </div>
                  )}
                </div>

                <div className="my-profile-fields">
                  <div className="my-profile-field">
                    <label>
                      <Mail size={16} />
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                      />
                    ) : (
                      <span>{userData.email}</span>
                    )}
                  </div>

                  <div className="my-profile-field">
                    <label>
                      <Phone size={16} />
                      Telefon
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) =>
                          setUserData({ ...userData, phone: e.target.value })
                        }
                      />
                    ) : (
                      <span>{userData.phone}</span>
                    )}
                  </div>

                  <div className="my-profile-field">
                    <label>
                      <MapPin size={16} />
                      Lokalizacja
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.location}
                        onChange={(e) =>
                          setUserData({ ...userData, location: e.target.value })
                        }
                      />
                    ) : (
                      <span>{userData.location}</span>
                    )}
                  </div>

                  <div className="my-profile-field full-width">
                    <label>
                      <User size={16} />
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        value={userData.bio}
                        onChange={(e) =>
                          setUserData({ ...userData, bio: e.target.value })
                        }
                        rows={3}
                      />
                    ) : (
                      <span>{userData.bio}</span>
                    )}
                  </div>
                </div>
              </div>
              <Achievements />
            </div>
          )}

          {activeTab === "wallet" && (
            <div className="my-profile-tab-content">
              <div className="my-profile-wallet-balance">
                <div className="my-profile-balance-card">
                  <Wallet className="my-profile-balance-icon" />
                  <div className="my-profile-balance-info">
                    <span className="my-profile-balance-label">
                      Dostępne saldo
                    </span>
                    <span className="my-profile-balance-amount">
                      {userData.balance.toFixed(2)} PLN
                    </span>
                  </div>
                </div>
              </div>

              <div className="my-profile-wallet-actions">
                <button className="my-profile-wallet-btn deposit">
                  <CreditCard size={18} />
                  Wpłać środki
                </button>
                <button className="my-profile-wallet-btn withdraw">
                  <CreditCard size={18} />
                  Wypłać środki
                </button>
              </div>

              <div className="my-profile-section">
                <h3>
                  <History size={20} />
                  Podsumowanie
                </h3>
                <div className="my-profile-wallet-summary">
                  <div className="my-profile-summary-item">
                    <span className="my-profile-summary-label">
                      Łączne wpłaty
                    </span>
                    <span className="my-profile-summary-value positive">
                      +{userData.totalDeposits.toFixed(2)} PLN
                    </span>
                  </div>
                  <div className="my-profile-summary-item">
                    <span className="my-profile-summary-label">
                      Łączne wypłaty
                    </span>
                    <span className="my-profile-summary-value negative">
                      -{userData.totalWithdrawals.toFixed(2)} PLN
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="my-profile-tab-content">
              <div className="my-profile-section">
                <h3>
                  <Bell size={20} />
                  Powiadomienia
                </h3>
                <div className="my-profile-settings-list">
                  <div className="my-profile-setting-item">
                    <div className="my-profile-setting-info">
                      <span className="my-profile-setting-label">
                        Powiadomienia email
                      </span>
                      <span className="my-profile-setting-description">
                        Otrzymuj ważne informacje na email
                      </span>
                    </div>
                    <label className="my-profile-toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) =>
                          handleSettingsChange(
                            "emailNotifications",
                            e.target.checked
                          )
                        }
                      />
                      <span className="my-profile-toggle-slider"></span>
                    </label>
                  </div>

                  <div className="my-profile-setting-item">
                    <div className="my-profile-setting-info">
                      <span className="my-profile-setting-label">
                        Powiadomienia push
                      </span>
                      <span className="my-profile-setting-description">
                        Powiadomienia w przeglądarce
                      </span>
                    </div>
                    <label className="my-profile-toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.pushNotifications}
                        onChange={(e) =>
                          handleSettingsChange(
                            "pushNotifications",
                            e.target.checked
                          )
                        }
                      />
                      <span className="my-profile-toggle-slider"></span>
                    </label>
                  </div>

                  <div className="my-profile-setting-item">
                    <div className="my-profile-setting-info">
                      <span className="my-profile-setting-label">
                        Przypomnienia o meczach
                      </span>
                      <span className="my-profile-setting-description">
                        Powiadom przed rozpoczęciem meczu
                      </span>
                    </div>
                    <label className="my-profile-toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.matchReminders}
                        onChange={(e) =>
                          handleSettingsChange(
                            "matchReminders",
                            e.target.checked
                          )
                        }
                      />
                      <span className="my-profile-toggle-slider"></span>
                    </label>
                  </div>

                  <div className="my-profile-setting-item">
                    <div className="my-profile-setting-info">
                      <span className="my-profile-setting-label">
                        Wyniki meczów
                      </span>
                      <span className="my-profile-setting-description">
                        Powiadom o wynikach wytypowanych meczów
                      </span>
                    </div>
                    <label className="my-profile-toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.resultNotifications}
                        onChange={(e) =>
                          handleSettingsChange(
                            "resultNotifications",
                            e.target.checked
                          )
                        }
                      />
                      <span className="my-profile-toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="my-profile-section">
                <h3>Prywatność</h3>
                <div className="my-profile-settings-list">
                  <div className="my-profile-setting-item">
                    <div className="my-profile-setting-info">
                      <span className="my-profile-setting-label">
                        Prywatny profil
                      </span>
                      <span className="my-profile-setting-description">
                        Ukryj swoje statystyki przed innymi
                      </span>
                    </div>
                    <label className="my-profile-toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.privateProfile}
                        onChange={(e) =>
                          handleSettingsChange(
                            "privateProfile",
                            e.target.checked
                          )
                        }
                      />
                      <span className="my-profile-toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="my-profile-tab-content">
              <div className="my-profile-section">
                <h3>Zmiana hasła</h3>
                <div className="my-profile-fields">
                  <div className="my-profile-field full-width">
                    <label>Aktualne hasło</label>
                    <div className="my-profile-password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                      />
                      <button
                        className="my-profile-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="my-profile-field full-width">
                    <label>Nowe hasło</label>
                    <input type="password" placeholder="••••••••" />
                  </div>

                  <div className="my-profile-field full-width">
                    <label>Potwierdź nowe hasło</label>
                    <input type="password" placeholder="••••••••" />
                  </div>

                  <button className="my-profile-btn-change-password">
                    <Shield size={16} />
                    Zmień hasło
                  </button>
                </div>
              </div>

              <div className="my-profile-section my-profile-danger-zone">
                <h3>Strefa niebezpieczna</h3>
                <p className="my-profile-danger-description">
                  Usunięcie konta jest nieodwracalne. Wszystkie Twoje dane
                  zostaną trwale usunięte.
                </p>
                <button className="my-profile-btn-delete-account">
                  Usuń konto
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
