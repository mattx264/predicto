import Link from "next/link";
import { Mail, Facebook, Twitter, Instagram, Trophy } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { label: "Główna", href: "/" },
    { label: "Wszystkie Posty", href: "/blog" },
    { label: "O Nas", href: "/o-nas" },
    { label: "Kontakt", href: "/kontakt" },
  ];

  const legalItems = [
    { label: "Polityka Prywatności", href: "/polityka-prywatnosci" },
    { label: "Warunki Użytkowania", href: "/warunki" },
    {
      label: "Regulamin Turniejów",
      href: "http://predicto.gg/index.html",
    },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h4 className="footer-brand-title">StrefaFutbolu</h4>
            <p className="footer-brand-description">
              Twój codzienny dostawca najświeższych analiz. Jesteśmy bramą do
              rywalizacji i emocji w świecie piłki nożnej.
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Blog</h4>
            <ul className="footer-nav-list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Informacje Prawne</h4>
            <ul className="footer-nav-list">
              {legalItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="footer-nav-link"
                    target={
                      item.label.includes("Regulamin") ? "_blank" : "_self"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column tournament-column">
            <h4 className="footer-column-title">
              <Trophy className="footer-trophy-icon" />
              Turnieje Społeczności
            </h4>
            <p className="tournament-description">
              Zaproś znajomych, ustal wpisowe, stwórz własną Ligę Mistrzów i
              walcz o nagrody w rankingu!
            </p>
            <Link
              href="http://predicto.gg/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="tournament-cta-button"
            >
              Dołącz do Gry
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {currentYear} StrefaFutbolu. Wszystkie prawa zastrzeżone.
          </div>

          <div className="footer-social-links">
            <a href="#" aria-label="Facebook" className="social-link">
              <Facebook />
            </a>
            <a href="#" aria-label="Twitter" className="social-link">
              <Twitter />
            </a>
            <a href="#" aria-label="Instagram" className="social-link">
              <Instagram />
            </a>
            <a
              href="mailto:kontakt@blog.pl"
              aria-label="Email"
              className="social-link"
            >
              <Mail />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
