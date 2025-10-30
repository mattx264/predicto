"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Menu, X, Trophy, ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "./Navbar.css";
import { DEFAULT_TOURNAMENT, TOURNAMENTS } from "@/app/lib/tournaments";

const globalNavLinks = [
  { href: "/", label: "Główna" },
  { href: "/blog", label: "Wszystkie Posty" },
  { href: "/o-nas", label: "O Blogu" },
];

const contextualNavLinks = [
  { href: "/terminarz", label: "Terminarz" },
  { href: "/reprezentacje", label: "Reprezentacje" },
];

function NavbarContent() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogName = "StrefaFutbolu";

  const [activeTournamentSlug, setActiveTournamentSlug] = useState(
    DEFAULT_TOURNAMENT.slug
  );

  useEffect(() => {
    let newSlug = DEFAULT_TOURNAMENT.slug;

    const pathSegments = pathname.split("/").filter(Boolean);
    const slugFromPath = pathSegments[0];
    const tournamentFromPath = TOURNAMENTS.find((t) => t.slug === slugFromPath);

    if (tournamentFromPath) {
      newSlug = tournamentFromPath.slug;
    } else if (pathname.startsWith("/blog")) {
      const slugFromQuery = searchParams.get("tournament");
      const tournamentFromQuery = TOURNAMENTS.find(
        (t) => t.slug === slugFromQuery
      );
      if (tournamentFromQuery) {
        newSlug = tournamentFromQuery.slug;
      }
    }

    setActiveTournamentSlug(newSlug);
  }, [pathname, searchParams]);

  const currentTournament =
    TOURNAMENTS.find((t) => t.slug === activeTournamentSlug) ||
    DEFAULT_TOURNAMENT;

  const handleTournamentChange = (newTournamentSlug: string) => {
    if (newTournamentSlug === currentTournament.slug) return;

    if (pathname.startsWith("/blog")) {
      router.push(`/blog?tournament=${newTournamentSlug}`);
      setIsOpen(false);
      return;
    }

    const pathSegments = pathname.split("/").filter(Boolean);
    const isContextualPage = contextualNavLinks.some((link) =>
      pathname.includes(link.href)
    );

    let newPath = "";
    if (isContextualPage && pathSegments.length > 1) {
      const newSegments = [newTournamentSlug, ...pathSegments.slice(1)];
      newPath = `/${newSegments.join("/")}`;
    } else {
      newPath = `/${newTournamentSlug}`;
    }

    router.push(newPath);
    setIsOpen(false);
  };

  const dynamicNavLinks = contextualNavLinks.map((link) => ({
    ...link,
    href: `/${activeTournamentSlug}${link.href}`,
  }));

  const allNavLinks = [...globalNavLinks, ...dynamicNavLinks];

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    if (href === "/blog") return pathname.startsWith("/blog");
    return pathname.startsWith(href);
  };

  const showTournamentSelector =
    pathname !== "/" && !pathname.startsWith("/blog");

  const TournamentSelector = ({ inMobileMenu = false }) => (
    <div
      className={
        inMobileMenu ? "mobile-tournament-selector" : "tournament-selector"
      }
    >
      <select
        value={currentTournament.slug}
        onChange={(e) => handleTournamentChange(e.target.value)}
        className="tournament-select-dropdown"
      >
        {TOURNAMENTS.map((tournament) => (
          <option key={tournament.slug} value={tournament.slug}>
            {tournament.name}
          </option>
        ))}
      </select>
      <ChevronDown className="tournament-select-icon" />
    </div>
  );

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
            {showTournamentSelector && <TournamentSelector />}

            {allNavLinks.map((link) => (
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
          {showTournamentSelector && <TournamentSelector inMobileMenu={true} />}

          {allNavLinks.map((link) => (
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

function NavbarFallback() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <Link href="/" className="logo-link">
              StrefaFutbolu
            </Link>
          </div>
          <div className="navbar-desktop">
            <div>Ładowanie...</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <NavbarContent />
    </Suspense>
  );
}
