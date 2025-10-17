import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowLeft } from "lucide-react";

import "./LoginPage.css";
import authService from "../services/signalr/auth.service";
import { getErrorMessageWithFallback } from "../utils/erroUtils";

interface LoginPageProps {
  onLogin?: (token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authService.login(
        formData.email,
        formData.password
      );

      console.log("Zalogowano pomyślnie!");

      if (onLogin) {
        onLogin(response.token);
      }

      await authService.getCurrentUser();

      navigate("/dashboard");
    } catch (err) {
      console.error("Błąd logowania:", err);
      setError(
        getErrorMessageWithFallback(err, "Wystąpił błąd podczas logowania")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-gradient" />
      <div className="auth-stars">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <Link to="/" className="back-button">
        <ArrowLeft className="back-icon" />
        <span>Powrót</span>
      </Link>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-header-content">
              <h1 className="auth-title">Witaj ponownie!</h1>
              <p className="auth-subtitle">Zaloguj się i graj dalej</p>
            </div>

            <div className="header-stars">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="header-star"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="auth-form">
              {error && (
                <div
                  className="error-message"
                  style={{
                    padding: "12px",
                    marginBottom: "16px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#ef4444",
                    fontSize: "14px",
                    textAlign: "center",
                  }}
                >
                  {error}
                </div>
              )}

              <div className="input-group">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="auth-input"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="input-group">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Hasło"
                  className="auth-input"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="forgot-password">
                <Link to="/forgot-password" className="forgot-link">
                  Zapomniałeś hasła?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="auth-submit-btn"
              >
                <span className="btn-content">
                  {isLoading ? (
                    <>
                      <div className="spinner" />
                      <span>Logowanie...</span>
                    </>
                  ) : (
                    <>
                      <span>Zaloguj się</span>
                      <Sparkles size={18} className="sparkle-icon" />
                    </>
                  )}
                </span>
                <div className="btn-gradient-overlay" />
              </button>
            </form>

            <div className="auth-toggle">
              <p className="toggle-text">Nie masz jeszcze konta?</p>
              <Link to="/register" className="toggle-link">
                Zarejestruj się teraz
                <span className="toggle-underline" />
              </Link>
            </div>
          </div>
        </div>

        <div className="decorative-blur blur-1" />
        <div className="decorative-blur blur-2" />
      </div>
    </div>
  );
};

export default LoginPage;
