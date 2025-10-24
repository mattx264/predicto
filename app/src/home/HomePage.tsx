import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Obstawiaj mecze.
            <br />
            Rywalizuj z przyjaciółmi.
            <br />
            <span className="highlight">Wygraj nagrodę.</span>
          </h1>
          <p className="hero-description">
            Twórz prywatne pokoje, zapraszaj znajomych i rywalizuj o prawdziwą
            pulę nagród w najpopularniejszych rozgrywkach sportowych.
          </p>
          <div className="hero-actions">
            {/* <Link to="/register">
              <button className="btn-hero">Stwórz swój pokój</button>
            </Link> */}
            <Link to="/jak-grac">
              <button className="btn-hero-secondary">
                <BookOpen size={20} />
                Zobacz jak grać
              </button>
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">1,250+</span>
              <span className="stat-label">Aktywnych pokoi</span>
            </div>
            <div className="stat">
              <span className="stat-number">15,000+</span>
              <span className="stat-label">Graczy</span>
            </div>
            <div className="stat">
              <span className="stat-number">500k+</span>
              <span className="stat-label">PLN w pulach</span>
            </div>
          </div>
        </div>
      </header>

      <section className="cta">
        <div className="cta-content">
          <h2>Gotowy na rywalizację?</h2>
          <p>Dołącz do tysięcy graczy i zacznij wygrywać już dziś.</p>
          <Link to="/register">
            <button className="btn-cta">Rozpocznij za darmo</button>
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>PREDICTO</h4>
            <p>Platforma do obstawiania wydarzeń sportowych z przyjaciółmi.</p>
          </div>
          <div className="footer-section">
            <h4>Produkt</h4>
            <Link to="/features">Funkcje</Link>
            <Link to="/pricing">Cennik</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div className="footer-section">
            <h4>Firma</h4>
            <Link to="/about">O nas</Link>
            <Link to="/contact">Kontakt</Link>
            <Link to="/careers">Kariera</Link>
          </div>
          <div className="footer-section">
            <h4>Wsparcie</h4>
            <Link to="/terms">Regulamin</Link>
            <Link to="/privacy">Polityka prywatności</Link>
            <Link to="/help">Pomoc</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Predicto. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
