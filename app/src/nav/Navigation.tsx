import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
} from "lucide-react";
import "./Navigation.css";
import UserProfileModal from "../user-profile-modal/UserProfileModal";
import NotificationBell from "../notifications/NotificationsBell";

interface NavigationProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
  username?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  isAuthenticated = false,
  onLogout,
  username = "Gracz",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [animatingNav, setAnimatingNav] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    {
      id: "home",
      label: isAuthenticated ? "Dashboard" : "Strona główna",
      icon: <ChartNoAxesCombined className="nav-icon" />,
      path: isAuthenticated ? "/dashboard" : "/",
    },
    {
      id: "rooms",
      label: "Pokoje",
      icon: <Users className="nav-icon" />,
      path: "/rooms",
    },
    {
      id: "ranking",
      label: "Ranking",
      icon: <Trophy className="nav-icon" />,
      path: "/ranking",
    },
    {
      id: "jak-grac",
      label: "Jak grać",
      icon: <BookOpen className="nav-icon" />,
      path: "/jak-grac",
    },
  ];

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
    if (onLogout) {
      onLogout();
    }
  };

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

                <button
                  className="user-profile-btn"
                  onClick={() => setIsProfileOpen(true)}
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
                  <span>Wyloguj</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn-secondary">Zaloguj się</button>
                </Link>
                <Link to="/register">
                  <button className="btn-primary">Zarejestruj się</button>
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
            {isAuthenticated && (
              <div className="mobile-notifications-wrapper">
                <NotificationBell />
              </div>
            )}

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.path)}
                className={`mobile-link ${
                  activeNav === item.id ? "active" : ""
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
                    onClick={() => {
                      setIsProfileOpen(true);
                      setIsMenuOpen(false);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="user-avatar">
                      <User className="user-icon" />
                      <div className="online-indicator"></div>
                    </div>
                    <div className="user-details">
                      <span className="username">{username}</span>
                      <span className="user-status">Zobacz profil</span>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="btn-logout mobile">
                    <LogOut className="logout-icon" />
                    <span>Wyloguj się</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <button className="btn-secondary mobile">
                      Zaloguj się
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <button className="btn-primary mobile">
                      Zarejestruj się
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        username={username}
      />
    </nav>
  );
};

export default Navigation;
