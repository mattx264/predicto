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
  LayoutDashboard
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
  const navigate = useNavigate();
  const location = useLocation();

  const userBalance = 250.50;

  const allNavItems = [
    {
      id: "home",
      label: isAuthenticated ? t("nav.dashboard") : t("nav.home"),
      icon: isAuthenticated ? <LayoutDashboard size={20} /> : <ChartNoAxesCombined size={20} />,
      path: isAuthenticated ? "/dashboard" : "/",
      authRequired: false,
    },
    {
      id: "rooms",
      label: t("nav.rooms"),
      icon: <Users size={20} />,
      path: "/rooms",
      authRequired: true,
    },
    {
      id: "shop",
      label: t("nav.shop"),
      icon: <Store size={20} />,
      path: "/shop",
      authRequired: true,
      className: "nav-item-shop"
    },
    {
      id: "inventory",
      label: t("nav.inventory"),
      icon: <Package size={20} />,
      path: "/inventory",
      authRequired: true,
      className: "nav-item-inventory"
    },
    {
      id: "ranking",
      label: t("nav.ranking"),
      icon: <Trophy size={20} />,
      path: "/ranking",
      authRequired: true,
    },
    {
      id: "jak-grac",
      label: t("nav.howToPlay"),
      icon: <BookOpen size={20} />,
      path: "/jak-grac",
      authRequired: false,
      hideWhenAuthenticated: true,
    },
  ];

  const navItems = React.useMemo(() => {
    return allNavItems.filter(
      (item) =>
        (!item.authRequired || isAuthenticated) &&
        (!item.hideWhenAuthenticated || !isAuthenticated)
    );
  }, [isAuthenticated, t]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    let newActiveNav = "home";

    if (currentPath !== "/" && currentPath !== "/dashboard") {
      const activeItem = navItems.find(
        (item) =>
          item.path !== "/" &&
          item.path !== "/dashboard" &&
          currentPath.startsWith(item.path)
      );
      if (activeItem) {
        newActiveNav = activeItem.id;
      }
    }
    setActiveNav(newActiveNav);
    setIsMenuOpen(false);
  }, [location.pathname, navItems]);

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
    navigate("/");
  };

  return (
    <nav className={`navigation ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-border-gradient" />

      <div className="nav-container">
        <div className="nav-content">

          <Link to={isAuthenticated ? "/dashboard" : "/"} className="nav-logo">
            <div className="logo-icon-box">
              <Sparkles className="logo-icon" size={22} />
              <div className="logo-glow" />
            </div>
            <span className="logo-text">PREDICTO</span>
          </Link>

          <div className="nav-center-capsule desktop-only">
            {navItems.map((item) => (
              <div key={item.id} className="nav-item-wrapper">
                <button
                  onClick={() => handleNavClick(item.path)}
                  className={`nav-item-btn ${activeNav === item.id ? "active" : ""} ${item.className || ""}`}
                  aria-label={item.label}
                >
                  <div className="nav-icon-wrapper">
                    {item.icon}
                  </div>
                  {activeNav === item.id && <span className="active-dot" />}
                </button>
                <div className="nav-tooltip">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="nav-actions desktop-only">
            {isAuthenticated ? (
              <>
                <NotificationBell />

                <div className="divider-vertical" />

                <div className="nav-lang-wrapper">
                  <LanguageSwitcher />
                </div>

                <button
                  className="balance-pill-glass"
                  onClick={onOpenTopUp}
                  title="Twój portfel"
                >
                  <div className="balance-icon-box">
                    <Wallet size={16} />
                  </div>
                  <span className="balance-value">{userBalance.toFixed(2)}</span>
                  <span className="balance-plus">+</span>
                </button>

                <div className="profile-wrapper">
                  <button className="user-profile-glass" onClick={onOpenProfile}>
                    <div className="avatar-ring">
                      <div className="user-avatar-img">
                        <User size={20} />
                      </div>
                    </div>
                    <span className="profile-name">{user?.name || "Gracz"}</span>
                  </button>
                </div>

                <button onClick={handleLogout} className="logout-mini-btn" title="Wyloguj">
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <div className="auth-buttons">
                <LanguageSwitcher />
                <Link to="/login">
                  <button className="nav-btn-ghost">{t("nav.login")}</button>
                </Link>
                <Link to="/register">
                  <button className="nav-btn-primary">{t("nav.register")}</button>
                </Link>
              </div>
            )}
          </div>

          <button
            className="mobile-menu-toggle mobile-only"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-container">

          {isAuthenticated && (
            <div className="mobile-user-card">
              <div className="mobile-user-info" onClick={() => { onOpenProfile(); setIsMenuOpen(false); }}>
                <div className="mobile-avatar">
                  <User size={24} />
                </div>
                <div className="mobile-user-details">
                  <span className="mobile-username">{user?.name}</span>
                  <span className="mobile-status">Zarządzaj profilem</span>
                </div>
              </div>
            </div>
          )}

          {isAuthenticated && (
            <div className="mobile-balance-card" onClick={() => { onOpenTopUp(); setIsMenuOpen(false); }}>
              <div className="mobile-balance-left">
                <Wallet size={20} className="text-green" />
                <span>Portfel</span>
              </div>
              <div className="mobile-balance-right">
                <span className="value">{userBalance.toFixed(2)}</span>
                <div className="plus-badge">+</div>
              </div>
            </div>
          )}

          <div className="mobile-nav-list">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`mobile-nav-item ${activeNav === item.id ? "active" : ""} ${item.className || ""}`}
              >
                <div className="mobile-icon-box">{item.icon}</div>
                <span className="mobile-label">{item.label}</span>
                {activeNav === item.id && <div className="active-indicator" />}
              </button>
            ))}

            {isAuthenticated && (
              <button className="mobile-nav-item logout" onClick={handleLogout}>
                <div className="mobile-icon-box red"><LogOut size={20} /></div>
                <span className="mobile-label">Wyloguj</span>
              </button>
            )}
          </div>

          <div className="mobile-footer-actions">
            <div className="mobile-lang-row">
              <LanguageSwitcher />
            </div>

            {!isAuthenticated && (
              <div className="mobile-auth-buttons">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <button className="nav-btn-ghost w-full">Zaloguj się</button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <button className="nav-btn-primary w-full">Dołącz teraz</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;