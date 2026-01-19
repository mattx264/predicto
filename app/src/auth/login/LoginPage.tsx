import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import "./LoginPage.css";
import { getErrorMessageWithFallback } from "../../utils/erroUtils";
import { useAuth } from "../AuthContext";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [stars] = useState(() =>
    Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
    }))
  );

  const [headerStars] = useState(() =>
    Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
    }))
  );

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "email":
        if (!value) return "Email jest wymagany";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Nieprawidłowy format email";
        return "";
      case "password":
        if (!value) return "Hasło jest wymagane";
        if (value.length < 6) return "Hasło musi mieć minimum 6 znaków";
        return "";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        general: "",
      });
      setTouched({
        email: true,
        password: true,
      });
      return;
    }

    setErrors({ email: "", password: "", general: "" });

    try {
      await login(formData.email, formData.password);
      console.log("Zalogowano pomyślnie!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Błąd logowania:", err);
      setErrors({
        email: "",
        password: "",
        general: getErrorMessageWithFallback(
          err,
          "Wystąpił błąd podczas logowania"
        ),
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (touched[name as keyof typeof touched]) {
      setErrors({
        ...errors,
        [name]: validateField(name, value),
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-gradient" />
      <div className="auth-stars">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* <Link to="/" className="back-button">
        <ArrowLeft className="back-icon" />
        <span>Powrót</span>
      </Link> */}

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-header-content">
              <h1 className="auth-title">Witaj ponownie!</h1>
              <p className="auth-subtitle">Zaloguj się i graj dalej</p>
            </div>

            <div className="header-stars">
              {headerStars.map((star, i) => (
                <div
                  key={i}
                  className="header-star"
                  style={{
                    left: `${star.left}%`,
                    top: `${star.top}%`,
                    animationDelay: `${star.delay}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              {errors.general && (
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
                  {errors.general}
                </div>
              )}

              <div className="input-group">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                  className={`auth-input ${errors.email && touched.email ? "error" : ""}`}
                  disabled={isLoading}
                />
                {errors.email && touched.email && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "4px",
                      marginLeft: "4px",
                    }}
                  >
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="input-group">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Hasło"
                  className={`auth-input ${errors.password && touched.password ? "error" : ""}`}
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
                {errors.password && touched.password && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "4px",
                      marginLeft: "4px",
                    }}
                  >
                    {errors.password}
                  </div>
                )}
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
