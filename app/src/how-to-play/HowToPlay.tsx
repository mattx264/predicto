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
  Play,
} from "lucide-react";
import "./HowToPlay.css";

const HowToPlay: React.FC = () => {
  return (
    <div className="how-to-play-page">
      <div className="how-to-play-container">
        <div className="hero-section">
          <Trophy className="hero-icon" size={64} />
          <h1 className="page-title">Jak grać?</h1>
          <p className="page-subtitle">
            Poznaj zasady typowania i zdobywaj nagrody w naszej aplikacji
          </p>
        </div>

        <div className="content-grid">
          <div className="instruction-card">
            <div className="card-icon-wrapper">
              <Users className="card-icon" />
            </div>
            <h2 className="card-title">Dołącz do pokoju</h2>
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
                <span>Wpisowe od 10 do 500 Monet</span>
              </div>
            </div>
          </div>

          <div className="instruction-card">
            <div className="card-icon-wrapper">
              <Target className="card-icon" />
            </div>
            <h2 className="card-title">Typuj wyniki meczów</h2>
            <p className="card-description">
              Po dołączeniu do pokoju możesz typować wyniki wszystkich
              nadchodzących meczów. Wpisz przewidywany rezultat dla gospodarzy i
              gości przed rozpoczęciem meczu.
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
            <div className="card-icon-wrapper">
              <Star className="card-icon" />
            </div>
            <h2 className="card-title">Zdobywaj punkty</h2>
            <p className="card-description">
              Po zakończeniu meczu otrzymujesz punkty w zależności od trafności
              Twojego typu. Im dokładniejsza prognoza, tym więcej punktów!
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
            <div className="card-icon-wrapper">
              <Trophy className="card-icon" />
            </div>
            <h2 className="card-title">Wygraj pulę nagród</h2>
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
            <h2>Przydatne wskazówki</h2>
          </div>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>Typuj regularnie</h3>
              <p>
                Im więcej meczów obstawiasz, tym większe szanse na zdobycie
                punktów i wygranie turnieju.
              </p>
            </div>
            <div className="tip-card">
              <h3>Śledź statystyki</h3>
              <p>
                Analizuj wyniki poprzednich meczów, formę drużyn i statystyki
                przed typowaniem.
              </p>
            </div>
            <div className="tip-card">
              <h3>Zaproś znajomych</h3>
              <p>
                Stwórz prywatny pokój i zaproś znajomych używając kodu
                zaproszenia. Im więcej graczy, tym wyższa pula!
              </p>
            </div>
            <div className="tip-card">
              <h3>Korzystaj z czatu</h3>
              <p>
                Dziel się swoimi przemyśleniami i analizami z innymi
                uczestnikami w czacie pokoju.
              </p>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h2 className="faq-title">Najczęściej zadawane pytania</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>Czy mogę zmienić typ po jego zatwierdzeniu?</h3>
              <p>
                Tak, możesz zmieniać swoje typy wielokrotnie aż do momentu
                rozpoczęcia meczu. Po pierwszym gwizdku sędziego typ jest już
                nieodwracalny.
              </p>
            </div>
            <div className="faq-item">
              <h3>Co się stanie jeśli nie obstawię wszystkich meczów?</h3>
              <p>
                Nie musisz typować wszystkich meczów, ale pamiętaj - im więcej
                typów, tym większe szanse na zdobycie punktów i wygraną.
              </p>
            </div>
            <div className="faq-item">
              <h3>Jak działa podział nagród przy remisie punktowym?</h3>
              <p>
                W przypadku remisu punktowego na pierwszym miejscu, pula nagród
                jest dzielona równo między wszystkich liderów.
              </p>
            </div>
            <div className="faq-item">
              <h3>Czy mogę opuścić pokój po wpłaceniu wpisowego?</h3>
              <p>
                Tak, możesz opuścić pokój w dowolnym momencie, ale wpisowe nie
                jest zwracane. Twoje typy pozostają w systemie.
              </p>
            </div>
            <div className="faq-item">
              <h3>Jak stworzyć własny pokój?</h3>
              <p>
                Kliknij przycisk "Stwórz pokój" na stronie głównej, wybierz
                ligę, turniej, ustaw wpisowe i limit uczestników. Możesz
                stworzyć pokój publiczny lub prywatny.
              </p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <Play className="cta-icon" />
          <h2>Zobacz aplikację w akcji</h2>
          <p>Obejrzyj demo i przekonaj się jak działa platforma!</p>
          <Link to="/demo">
            <button className="cta-button">Zobacz demo</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;