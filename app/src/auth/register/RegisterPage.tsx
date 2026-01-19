import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Sparkles,

} from "lucide-react";
import { getErrorMessage } from "../../utils/erroUtils";
import { useAuth } from "../AuthContext";

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

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
      case "username":
        if (!value) return "Nazwa użytkownika jest wymagana";
        if (value.length < 3)
          return "Nazwa użytkownika musi mieć minimum 3 znaki";
        if (value.length > 20)
          return "Nazwa użytkownika może mieć maksymalnie 20 znaków";
        if (!/^[a-zA-Z0-9_]+$/.test(value))
          return "Nazwa użytkownika może zawierać tylko litery, cyfry i podkreślenia";
        return "";
      case "email":
        if (!value) return "Email jest wymagany";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Nieprawidłowy format email";
        return "";
      case "password":
        if (!value) return "Hasło jest wymagane";
        if (value.length < 6) return "Hasło musi mieć minimum 6 znaków";
        return "";
      case "confirmPassword":
        if (!value) return "Potwierdzenie hasła jest wymagane";
        if (value !== formData.password) return "Hasła nie są identyczne";
        return "";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const usernameError = validateField("username", formData.username);
    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);
    const confirmPasswordError = validateField(
      "confirmPassword",
      formData.confirmPassword
    );

    if (usernameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        username: usernameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        general: "",
      });
      setTouched({
        username: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
      return;
    }

    setErrors({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    });

    try {
      await register(
        formData.username,
        formData.email,
        formData.password,
        "pl"
      );

      navigate("/dashboard");
    } catch (err) {
      console.error("Błąd rejestracji:", err);
      setErrors({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        general: getErrorMessage(err),
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

    if (name === "password" && touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          formData.confirmPassword !== value && formData.confirmPassword
            ? "Hasła nie są identyczne"
            : "",
      }));
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
              <h1 className="auth-title">Dołącz do gry!</h1>
              <p className="auth-subtitle">Stwórz konto i zacznij typować</p>
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
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Nazwa użytkownika"
                  className={`auth-input ${errors.username && touched.username ? "error" : ""}`}
                  disabled={isLoading}
                />
                {errors.username && touched.username && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "4px",
                      marginLeft: "4px",
                    }}
                  >
                    {errors.username}
                  </div>
                )}
              </div>

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

              <div className="input-group">
                <Lock className="input-icon" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Potwierdź hasło"
                  className={`auth-input ${errors.confirmPassword && touched.confirmPassword ? "error" : ""}`}
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
                {errors.confirmPassword && touched.confirmPassword && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "4px",
                      marginLeft: "4px",
                    }}
                  >
                    {errors.confirmPassword}
                  </div>
                )}
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
