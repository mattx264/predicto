import React from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Users,
  Target,
  DollarSign,
  Calendar,
  CheckCircle,
  Star,
  TrendingUp,
  Lock,
  Medal,
  Lightbulb,
} from "lucide-react";
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
            <Link to="/register">
              <button className="btn-hero">Stwórz swój pokój</button>
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

      <section id="jak-grac" className="how-to-play-section">
        <div className="how-to-play-container">
          <div className="hero-section-play">
            <Trophy className="hero-icon" size={64} />
            <h2 className="page-title">Jak grać?</h2>
            <p className="page-subtitle">
              Poznaj zasady typowania i zdobywaj nagrody w naszej aplikacji
            </p>
          </div>

          <div className="content-grid">
            <div className="instruction-card">
              <div className="card-number">1</div>
              <div className="card-icon-wrapper">
                <Users className="card-icon" />
              </div>
              <h3 className="card-title">Dołącz do pokoju</h3>
              <p className="card-description">
                Wybierz interesujący Cię pokój z listy dostępnych turniejów lub
                stwórz własny. Każdy pokój ma określone wpisowe, pulę nagród i
                liczbę uczestników.
              </p>
              <div className="card-features">
                <div className="feature-item">
                  <CheckCircle size={18} />
                  <span>Pokoje publiczne - dostępne dla wszystkich</span>
                </div>
                <div className="feature-item">
                  <Lock size={18} />
                  <span>Pokoje prywatne - tylko z kodem zaproszenia</span>
                </div>
                <div className="feature-item">
                  <DollarSign size={18} />
                  <span>Wpisowe od 10 do 500 PLN</span>
                </div>
              </div>
            </div>

            <div className="instruction-card">
              <div className="card-number">2</div>
              <div className="card-icon-wrapper">
                <Target className="card-icon" />
              </div>
              <h3 className="card-title">Typuj wyniki meczów</h3>
              <p className="card-description">
                Po dołączeniu do pokoju możesz typować wyniki wszystkich
                nadchodzących meczów. Wpisz przewidywany rezultat dla gospodarzy
                i gości przed rozpoczęciem meczu.
              </p>
              <div className="card-features">
                <div className="feature-item">
                  <Calendar size={18} />
                  <span>Typuj przed rozpoczęciem meczu</span>
                </div>
                <div className="feature-item">
                  <Target size={18} />
                  <span>Możesz zmieniać typy do startu</span>
                </div>
                <div className="feature-item">
                  <CheckCircle size={18} />
                  <span>Każdy mecz to szansa na punkty</span>
                </div>
              </div>
            </div>

            <div className="instruction-card">
              <div className="card-number">3</div>
              <div className="card-icon-wrapper">
                <Star className="card-icon" />
              </div>
              <h3 className="card-title">Zdobywaj punkty</h3>
              <p className="card-description">
                Po zakończeniu meczu otrzymujesz punkty w zależności od
                trafności Twojego typu. Im dokładniejsza prognoza, tym więcej
                punktów!
              </p>
              <div className="points-table">
                <div className="points-row perfect">
                  <div className="points-badge">+5 pkt</div>
                  <div className="points-desc">
                    <strong>Dokładny wynik</strong>
                    <span>Np. typowałeś 2-1 i mecz zakończył się 2-1</span>
                  </div>
                </div>
                <div className="points-row good">
                  <div className="points-badge">+3 pkt</div>
                  <div className="points-desc">
                    <strong>Tylko wynik</strong>
                    <span>
                      Np. typowałeś 2-1, mecz 3-1 (trafiony zwycięzca, różnica
                      bramek)
                    </span>
                  </div>
                </div>
                <div className="points-row bad">
                  <div className="points-badge">0 pkt</div>
                  <div className="points-desc">
                    <strong>Nietrafiony typ</strong>
                    <span>
                      Np. typowałeś wygraną gospodarzy, a wygrali goście
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="instruction-card">
              <div className="card-number">4</div>
              <div className="card-icon-wrapper">
                <Trophy className="card-icon" />
              </div>
              <h3 className="card-title">Wygraj pulę nagród</h3>
              <p className="card-description">
                Po zakończeniu wszystkich meczów w turnieju, typer z największą
                liczbą punktów wygrywa całą pulę nagród zebraną z wpisowego
                uczestników.
              </p>
              <div className="card-features">
                <div className="feature-item medal-gold">
                  <Medal size={18} />
                  <span>
                    <strong>1. miejsce</strong> - 100% puli nagród
                  </span>
                </div>
                <div className="feature-item">
                  <TrendingUp size={18} />
                  <span>Śledź ranking na bieżąco</span>
                </div>
                <div className="feature-item">
                  <Trophy size={18} />
                  <span>Konkuruj z przyjaciółmi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="tips-section">
            <div className="tips-header">
              <Lightbulb className="tips-icon" />
              <h3>Przydatne wskazówki</h3>
            </div>
            <div className="tips-grid">
              <div className="tip-card">
                <h4>Typuj regularnie</h4>
                <p>
                  Im więcej meczów obstawiasz, tym większe szanse na zdobycie
                  punktów i wygranie turnieju.
                </p>
              </div>
              <div className="tip-card">
                <h4>Śledź statystyki</h4>
                <p>
                  Analizuj wyniki poprzednich meczów, formę drużyn i statystyki
                  przed typowaniem.
                </p>
              </div>
              <div className="tip-card">
                <h4>Zaproś znajomych</h4>
                <p>
                  Stwórz prywatny pokój i zaproś znajomych używając kodu
                  zaproszenia. Im więcej graczy, tym wyższa pula!
                </p>
              </div>
              <div className="tip-card">
                <h4>Korzystaj z czatu</h4>
                <p>
                  Dziel się swoimi przemyśleniami i analizami z innymi
                  uczestnikami w czacie pokoju.
                </p>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h3 className="faq-title">Najczęściej zadawane pytania</h3>
            <div className="faq-list">
              <div className="faq-item">
                <h4>Czy mogę zmienić typ po jego zatwierdzeniu?</h4>
                <p>
                  Tak, możesz zmieniać swoje typy wielokrotnie aż do momentu
                  rozpoczęcia meczu. Po pierwszym gwizdku sędziego typ jest już
                  nieodwracalny.
                </p>
              </div>
              <div className="faq-item">
                <h4>Co się stanie jeśli nie obstawię wszystkich meczów?</h4>
                <p>
                  Nie musisz typować wszystkich meczów, ale pamiętaj - im więcej
                  typów, tym większe szanse na zdobycie punktów i wygraną.
                </p>
              </div>
              <div className="faq-item">
                <h4>Jak działa podział nagród przy remisie punktowym?</h4>
                <p>
                  W przypadku remisu punktowego na pierwszym miejscu, pula
                  nagród jest dzielona równo między wszystkich liderów.
                </p>
              </div>
              <div className="faq-item">
                <h4>Czy mogę opuścić pokój po wpłaceniu wpisowego?</h4>
                <p>
                  Tak, możesz opuścić pokój w dowolnym momencie, ale wpisowe nie
                  jest zwracane. Twoje typy pozostają w systemie.
                </p>
              </div>
              <div className="faq-item">
                <h4>Jak stworzyć własny pokój?</h4>
                <p>
                  Kliknij przycisk "Stwórz pokój" na stronie głównej, wybierz
                  ligę, turniej, ustaw wpisowe i limit uczestników. Możesz
                  stworzyć pokój publiczny lub prywatny.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
