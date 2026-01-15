import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Users,
  Trophy,
  BookOpen,
  Menu,
  X,
  LogOut,
  User,
  Sparkles,
  ChartNoAxesCombined,
  Store,
  Package,
  Wallet,
} from "lucide-react";
import "./Navigation.css";
import NotificationBell from "../notifications/NotificationsBell";
import LanguageSwitcher from "../i18n/language-switcher/LanguageSwitcher";
import { useAuth } from "../auth/AuthContext";

interface NavigationProps {
  onOpenProfile: () => void;
  onOpenTopUp: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  onOpenProfile,
  onOpenTopUp,
}) => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [animatingNav, setAnimatingNav] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const userBalance = 250.50;

  const allNavItems = [
    {
      id: "home",
      label: isAuthenticated ? t("nav.dashboard") : t("nav.home"),
      icon: <ChartNoAxesCombined className="nav-icon" />,
      path: isAuthenticated ? "/dashboard" : "/",
      authRequired: false,
    },
    {
      id: "rooms",
      label: t("nav.rooms"),
      icon: <Users className="nav-icon" />,
      path: "/rooms",
      authRequired: true,
    },
    {
      id: "shop",
      label: t("nav.shop"),
      icon: <Store className="nav-icon" />,
      path: "/shop",
      authRequired: true,
    },
    {
      id: "inventory",
      label: t("nav.inventory"),
      icon: <Package className="nav-icon" />,
      path: "/inventory",
      authRequired: true,
    },
    {
      id: "ranking",
      label: t("nav.ranking"),
      icon: <Trophy className="nav-icon" />,
      path: "/ranking",
      authRequired: true,
    },
    {
      id: "jak-grac",
      label: t("nav.howToPlay"),
      icon: <BookOpen className="nav-icon" />,
      path: "/jak-grac",
      authRequired: false,
      hideWhenAuthenticated: true,
    },
  ];

  const navItems = allNavItems.filter(
    (item) =>
      (!item.authRequired || isAuthenticated) &&
      (!item.hideWhenAuthenticated || !isAuthenticated)
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    let newActiveNav = activeNav;

    if (currentPath === "/dashboard" || currentPath === "/") {
      newActiveNav = "home";
    } else {
      const activeItem = navItems.find(
        (item) =>
          currentPath === item.path ||
          (item.path !== "/" &&
            item.path !== "/dashboard" &&
            currentPath.startsWith(item.path))
      );
      if (activeItem) {
        newActiveNav = activeItem.id;
      }
    }

    if (newActiveNav !== activeNav) {
      setActiveNav(newActiveNav);
    }
  }, [location.pathname, isAuthenticated]);

  const handleNavClick = (id: string, path: string) => {
    if (id !== activeNav) {
      setAnimatingNav(id);
      setTimeout(() => {
        setAnimatingNav(null);
      }, 600);
    }

    setActiveNav(id);
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    setIsMenuOpen(false);
    onOpenProfile();
  };

  const handleBalanceClick = () => {
    setIsMenuOpen(false);
    onOpenTopUp();
  };

  const username = user?.name || "Gracz";

  return (
    <nav className={`navigation ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-content">
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="nav-logo">
            <div className="logo-icon-wrapper">
              <Sparkles className="logo-icon" />
            </div>
            <span className="logo-text">PREDICTO</span>
          </Link>

          <div className="nav-links desktop-only">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.path)}
                className="nav-icon-button"
              >
                <div
                  className={`
                  nav-icon-circle
                  ${activeNav === item.id ? "active" : ""}
                  ${item.id === "shop" ? "shop-icon" : ""}
                  ${item.id === "inventory" ? "inventory-icon" : ""}
                `}
                >
                  {item.icon}

                  {animatingNav === item.id && (
                    <div className="ping-animation"></div>
                  )}
                  {activeNav === item.id && (
                    <div className="active-border"></div>
                  )}
                </div>

                <div className="nav-tooltip">{item.label}</div>
              </button>
            ))}
          </div>

          <div className="nav-actions desktop-only">
            {isAuthenticated ? (
              <>
                <NotificationBell />

                <LanguageSwitcher />

                {/* ✅ NOWY BALANCE BADGE */}
                <button
                  className="balance-badge"
                  onClick={handleBalanceClick}
                  title="Doładuj konto"
                >
                  <Wallet size={16} className="balance-icon" />
                  <span className="balance-text">
                    {userBalance.toFixed(2)}
                  </span>
                </button>

                <button
                  className="user-profile-btn"
                  onClick={handleProfileClick}
                >
                  <div className="user-avatar">
                    <User className="user-icon" />
                    <div className="online-indicator"></div>
                  </div>
                </button>
                <div className="user-info">
                  <span className="username">{username}</span>
                </div>

                <button onClick={handleLogout} className="btn-logout">
                  <LogOut className="logout-icon" />
                  <span>{t("nav.logout")}</span>
                </button>
              </>
            ) : (
              <>
                <LanguageSwitcher />

                <Link to="/login">
                  <button className="btn-secondary">{t("nav.login")}</button>
                </Link>
                <Link to="/register">
                  <button className="btn-primary">{t("nav.register")}</button>
                </Link>
              </>
            )}
          </div>

          <button
            className="mobile-menu-btn mobile-only"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="menu-icon" />
            ) : (
              <Menu className="menu-icon" />
            )}
          </button>
        </div>

        <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-content">
            <div className="mobile-top-actions">
              {isAuthenticated && (
                <>
                  {/* ✅ MOBILE BALANCE */}
                  <button
                    className="mobile-balance-btn"
                    onClick={handleBalanceClick}
                  >
                    <Wallet size={20} />
                    <div className="mobile-balance-info">
                      <span className="mobile-balance-label">Saldo</span>
                      <span className="mobile-balance-value">
                        {userBalance.toFixed(2)} Monet
                      </span>
                    </div>
                    <span className="mobile-topup-text">Doładuj →</span>
                  </button>

                  <div className="mobile-notifications-wrapper">
                    <NotificationBell />
                  </div>
                </>
              )}

              <div className="mobile-language-wrapper">
                <LanguageSwitcher />
              </div>
            </div>

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.path)}
                className={`mobile-link ${activeNav === item.id ? "active" : ""
                  } ${item.id === "shop" ? "shop-mobile" : ""} ${item.id === "inventory" ? "inventory-mobile" : ""
                  }`}
              >
                <div className="mobile-link-icon">{item.icon}</div>
                <span>{item.label}</span>
              </button>
            ))}

            <div className="mobile-auth">
              {isAuthenticated ? (
                <>
                  <div
                    className="mobile-user-info"
                    onClick={handleProfileClick}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="user-avatar">
                      <User className="user-icon" />
                      <div className="online-indicator"></div>
                    </div>
                    <div className="user-details">
                      <span className="username">{username}</span>
                      <span className="user-status">{t("nav.profile")}</span>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="btn-logout mobile">
                    <LogOut className="logout-icon" />
                    <span>{t("nav.logout")}</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <button className="btn-secondary mobile">
                      {t("nav.login")}
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <button className="btn-primary mobile">
                      {t("nav.register")}
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;


.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.navigation.scrolled {
  background: rgba(15, 23, 42, 0.7);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2%;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  transition: height 0.3s ease;
  gap: 1rem;
}

.navigation.scrolled .nav-content {
  height: 70px;
}

.nav-logo {
  text-decoration: none;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  flex-shrink: 0;
}

.logo-icon-wrapper {
  position: relative;
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: #22c55e;
  animation: pulse 2s ease-in-out infinite;
  transition: all 0.3s ease;
}

.navigation.scrolled .logo-icon {
  width: 28px;
  height: 28px;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.7;
  }
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #22c55e 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  transition: font-size 0.3s ease;
}

.navigation.scrolled .logo-text {
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
  align-items: center;
  max-width: 600px;
}

.nav-icon-button {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

.nav-icon-circle {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.7);
}

.navigation.scrolled .nav-icon-circle {
  width: 48px;
  height: 48px;
}

.nav-icon-circle::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-icon-circle:hover::before {
  opacity: 1;
}

.nav-icon-circle:hover {
  color: white;
}

.nav-icon-circle.active {
  background: linear-gradient(135deg, #22c55e 0%, #3b82f6 100%);
  color: white;
  box-shadow: 0 4px 16px rgba(34, 197, 94, 0.3);
}

.nav-icon-circle.shop-icon:not(.active) {
  position: relative;
  overflow: visible;
}

.nav-icon-circle.shop-icon:not(.active)::after {
  content: "🎁";
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 1rem;
  animation: bounce-gift 2s ease-in-out infinite;
}

@keyframes bounce-gift {

  0%,
  100% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: translateY(-4px) scale(1.1);
  }
}

.nav-icon-circle.shop-icon:hover {
  color: #ffd700;
}

.nav-icon-circle.shop-icon.active {
  background: linear-gradient(135deg, #ffd700 0%, #f59e0b 100%);
  box-shadow: 0 4px 16px rgba(255, 215, 0, 0.4);
}

.nav-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
  position: relative;
  z-index: 1;
}

.navigation.scrolled .nav-icon {
  width: 18px;
  height: 18px;
}

.ping-animation {
  position: absolute;
  inset: -2px;
  border: 2px solid #22c55e;
  border-radius: 50%;
  animation: smoothPing 0.6s ease-out;
  opacity: 0.8;
}

@keyframes smoothPing {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }

  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.active-border {
  position: absolute;
  inset: -2px;
  border: 2px solid rgba(34, 197, 94, 0.5);
  border-radius: 50%;
}

.shop-icon.active .active-border {
  border-color: rgba(255, 215, 0, 0.5);
}

.shop-icon.active .ping-animation {
  border-color: #ffd700;
}

.nav-tooltip {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  font-size: 0.875rem;
  border-radius: 8px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.nav-icon-button:hover .nav-tooltip {
  opacity: 1;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.user-profile-btn {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

.user-avatar {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #22c55e 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.navigation.scrolled .user-avatar {
  width: 40px;
  height: 40px;
}

.user-avatar:hover {
  transform: scale(1.1);
  border-color: rgba(34, 197, 94, 0.5);
}

.user-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.navigation.scrolled .user-icon {
  width: 20px;
  height: 20px;
}

.online-indicator {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  background: #22c55e;
  border: 2px solid rgba(15, 23, 42, 0.8);
  border-radius: 50%;
}

.navigation.scrolled .online-indicator {
  width: 12px;
  height: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  flex-shrink: 0;
}

.username {
  color: #e2e8f0;
  font-weight: 600;
  font-size: 0.95rem;
}

.btn-secondary {
  padding: 0.7rem 1.5rem;
  border: 2px solid #334155;
  background: transparent;
  color: #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.btn-secondary:hover {
  border-color: #22c55e;
  color: #22c55e;
  transform: translateY(-2px);
}

.btn-primary {
  padding: 0.7rem 1.5rem;
  border: none;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
  flex-shrink: 0;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  border: 2px solid rgba(239, 68, 68, 0.5);
  background: rgba(239, 68, 68, 0.1);
  color: #fca5a5;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.btn-logout:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
  color: #fecaca;
  transform: translateY(-2px);
}

.logout-icon {
  width: 18px;
  height: 18px;
}

.navigation.scrolled .logout-icon {
  width: 16px;
  height: 16px;
}


.balance-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%);
  border: 2px solid rgba(34, 197, 94, 0.3);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.balance-badge::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.balance-badge:hover::before {
  left: 100%;
}

.balance-badge:hover {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(59, 130, 246, 0.25) 100%);
  border-color: #22c55e;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
}

.balance-icon {
  color: #22c55e;
  flex-shrink: 0;
}

.balance-text {
  font-size: 0.95rem;
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: -0.02em;
}

.navigation.scrolled .balance-badge {
  padding: 0.5rem 0.85rem;
}

.navigation.scrolled .balance-text {
  font-size: 0.9rem;
}

.mobile-balance-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%);
  border: 2px solid rgba(34, 197, 94, 0.3);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
}

.mobile-balance-btn:hover {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(59, 130, 246, 0.25) 100%);
  border-color: #22c55e;
  transform: translateX(4px);
}

.mobile-balance-btn svg {
  color: #22c55e;
  flex-shrink: 0;
}

.mobile-balance-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
}

.mobile-balance-label {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
}

.mobile-balance-value {
  font-size: 1.1rem;
  font-weight: 800;
  color: #22c55e;
}

.mobile-topup-text {
  font-size: 0.85rem;
  font-weight: 600;
  color: #22c55e;
  opacity: 0.8;
}

.mobile-menu-btn {
  display: none;
  background: transparent;
  border: none;
  color: #e2e8f0;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
}

.mobile-menu-btn:hover {
  color: #22c55e;
}

.menu-icon {
  width: 24px;
  height: 24px;
}

.mobile-menu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.mobile-menu.open {
  max-height: 800px;
}

.mobile-menu-content {
  padding: 1rem 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-top-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0.5rem;
}

.mobile-notifications-wrapper {
  padding: 0 1.5rem;
}

.mobile-notifications-wrapper .notification-bell-container {
  width: 100%;
}

.mobile-notifications-wrapper .notification-bell-button {
  width: 100%;
  height: 50px;
  justify-content: center;
  gap: 0.75rem;
}

.mobile-notifications-wrapper .notification-bell-button::before {
  content: "Powiadomienia";
  color: #cbd5e1;
  font-size: 1rem;
  font-weight: 600;
}

.mobile-notifications-wrapper .notification-dropdown {
  left: 0;
  right: auto;
  width: 100%;
}

.mobile-language-wrapper {
  padding: 0 1.5rem;
  position: relative;
}

.mobile-language-wrapper .language-button {
  width: 100%;
  justify-content: center;
  height: 50px;
  font-size: 1rem;
}

.mobile-language-wrapper .language-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 1.5rem;
  right: 1.5rem;
  width: auto;
  transform: none;
  z-index: 1001;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: none;
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: left;
}

.mobile-link-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.mobile-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #22c55e;
}

.mobile-link:hover .mobile-link-icon {
  background: rgba(34, 197, 94, 0.1);
}

.mobile-link.active {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-left: 3px solid #22c55e;
}

.mobile-link.active .mobile-link-icon {
  background: linear-gradient(135deg, #22c55e 0%, #3b82f6 100%);
  color: white;
}

.mobile-link.shop-mobile:not(.active) {
  position: relative;
}

.mobile-link.shop-mobile:not(.active)::before {
  content: "🎁";
  position: absolute;
  right: 1rem;
  font-size: 1.5rem;
  animation: bounce-gift 2s ease-in-out infinite;
}

.mobile-link.shop-mobile.active {
  background: rgba(255, 215, 0, 0.1);
  color: #ffd700;
  border-left: 3px solid #ffd700;
}

.mobile-link.shop-mobile.active .mobile-link-icon {
  background: linear-gradient(135deg, #ffd700 0%, #f59e0b 100%);
}

.mobile-auth {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mobile-user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 8px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-status {
  font-size: 0.75rem;
  color: #94a3b8;
}

.btn-secondary.mobile,
.btn-primary.mobile,
.btn-logout.mobile {
  width: 100%;
  padding: 1rem;
  justify-content: center;
}

.desktop-only {
  display: flex;
}

.mobile-only {
  display: none;
}

.nav-icon-circle.inventory-icon {
  position: relative;
}

.nav-icon-circle.inventory-icon:hover {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
}

.nav-icon-circle.inventory-icon.active {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.5);
}

.nav-icon-circle.inventory-icon .nav-icon {
  color: #f8fafc;
  transition: all 0.3s ease;
}

.nav-icon-circle.inventory-icon:hover .nav-icon,
.nav-icon-circle.inventory-icon.active .nav-icon {
  color: #ffffff;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
}

.nav-icon-circle.inventory-icon::after {
  content: "";
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.6);
}

.nav-icon-circle.inventory-icon.active::after {
  opacity: 1;
  animation: inventory-pulse 2s ease-in-out infinite;
}

@keyframes inventory-pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
}

.mobile-link.inventory-mobile {
  position: relative;
}

.mobile-link.inventory-mobile .mobile-link-icon {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  padding: 0.75rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.mobile-link.inventory-mobile:hover .mobile-link-icon,
.mobile-link.inventory-mobile.active .mobile-link-icon {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
}

.mobile-link.inventory-mobile::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
      rgba(139, 92, 246, 0.1) 0%,
      rgba(124, 58, 237, 0.1) 100%);
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.mobile-link.inventory-mobile:hover::before,
.mobile-link.inventory-mobile.active::before {
  opacity: 1;
}

.nav-icon-button:has(.inventory-icon) .nav-tooltip {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  border: 2px solid rgba(139, 92, 246, 0.3);
}

.nav-icon-button:has(.inventory-icon) .nav-tooltip::before {
  border-top-color: #8b5cf6;
}

.nav-icon-circle.inventory-icon .ping-animation {
  background: radial-gradient(circle,
      rgba(139, 92, 246, 0.6) 0%,
      rgba(139, 92, 246, 0.3) 50%,
      transparent 100%);
}



@media (max-width: 1200px) {
  .nav-container {
    padding: 0 3%;
  }

  .nav-actions {
    gap: 0.5rem;
  }

  .nav-links {
    gap: 0.35rem;
    max-width: 500px;
  }

  .nav-icon-circle {
    width: 50px;
    height: 50px;
  }

  .balance-badge {
    padding: 0.5rem 0.75rem;
  }

  .balance-text {
    font-size: 0.85rem;
  }

  .user-info {
    padding: 0.4rem 0.75rem;
  }

  .username {
    font-size: 0.85rem;
  }
}

@media (max-width: 1024px) {
  .user-info {
    display: none;
  }

  .btn-logout span {
    display: none;
  }

  .btn-logout {
    padding: 0.7rem;
  }
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }

  .mobile-menu-btn {
    display: block;
  }

  .nav-content {
    height: 70px;
  }

  .nav-container {
    padding: 0 5%;
  }

  .logo-text {
    font-size: 1.5rem;
  }

  .logo-icon {
    width: 28px;
    height: 28px;
  }

  .balance-badge {
    display: none;
  }

  .mobile-link.inventory-mobile {
    border-left: 4px solid #8b5cf6;
  }

  .mobile-link.inventory-mobile.active {
    background: linear-gradient(135deg,
        rgba(139, 92, 246, 0.2) 0%,
        rgba(124, 58, 237, 0.1) 100%);
    border-left-color: #7c3aed;
  }
}