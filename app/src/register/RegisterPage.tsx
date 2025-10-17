import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import authService from "../services/signalr/auth.service";
import { getErrorMessage } from "../utils/erroUtils";

interface RegisterPageProps {
  onRegister?: (token: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Hasła nie są identyczne!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Hasło musi mieć minimum 6 znaków");
      return;
    }

    if (formData.username.length < 3) {
      setError("Nazwa użytkownika musi mieć minimum 3 znaki");
      return;
    }

    setIsLoading(true);
    try {
      await authService.register(
        formData.username,
        formData.email,
        formData.password,
        "pl"
      );

      const token = authService.getToken();

      console.log("Zarejestrowano i zalogowano pomyślnie!");

      if (onRegister && token) {
        onRegister(token);
      }

      await authService.getCurrentUser();

      navigate("/dashboard");
    } catch (err) {
      console.error("Błąd rejestracji:", err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Wyczyść błąd przy zmianie inputu
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
              <h1 className="auth-title">Dołącz do gry!</h1>
              <p className="auth-subtitle">Stwórz konto i zacznij typować</p>
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
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Nazwa użytkownika"
                  className="auth-input"
                  required
                  minLength={3}
                  disabled={isLoading}
                />
              </div>

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
                  minLength={6}
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

              <div className="input-group">
                <Lock className="input-icon" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Potwierdź hasło"
                  className="auth-input"
                  required
                  minLength={6}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
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
                      <span>Tworzenie konta...</span>
                    </>
                  ) : (
                    <>
                      <span>Zarejestruj się</span>
                      <Sparkles size={18} className="sparkle-icon" />
                    </>
                  )}
                </span>
                <div className="btn-gradient-overlay" />
              </button>
            </form>

            <div className="auth-toggle">
              <p className="toggle-text">Masz już konto?</p>
              <Link to="/login" className="toggle-link">
                Zaloguj się tutaj
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

export default RegisterPage;
