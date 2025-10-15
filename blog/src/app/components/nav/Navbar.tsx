"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Trophy } from "lucide-react";
import { usePathname } from "next/navigation";
import "./Navbar.css";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Główna" },
  { href: "/blog", label: "Wszystkie Posty" },
  { href: "/terminarz", label: "Terminarz" },
  { href: "/liga/eliminacje", label: "El. MŚ 2026" },
  { href: "/reprezentacje", label: "Reprezentacje" },
  { href: "/o-nas", label: "O Blogu" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const blogName = "StrefaFutbolu";

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <Link href="/" className="logo-link">
              {blogName}
            </Link>
          </div>

          <div className="navbar-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive(link.href) ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="http://predicto.gg/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              <Trophy className="trophy-icon" />
              <span>Stwórz Własny Turniej!</span>
            </Link>
          </div>

          <div className="navbar-mobile-controls">
            <Link
              href="http://predicto.gg/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button-mobile"
            >
              <Trophy className="trophy-icon-small" />
              Gra
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="menu-button"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Otwórz główne menu</span>
              {isOpen ? (
                <X className="menu-icon" />
              ) : (
                <Menu className="menu-icon" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-menu ${isOpen ? "open" : ""}`} id="mobile-menu">
        <div className="mobile-menu-content">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`mobile-nav-link ${
                isActive(link.href) ? "active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="http://predicto.gg/index.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="mobile-cta-button"
          >
            <Trophy className="trophy-icon" />
            Stwórz Własny Turniej!
          </Link>
        </div>
      </div>
    </nav>
  );
}
