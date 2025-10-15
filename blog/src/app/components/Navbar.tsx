"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Trophy } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Główna" },
  { href: "/blog", label: "Wszystkie Posty" },
  { href: "/liga/ekstraklasa", label: "Ekstraklasa 🇵🇱" },
  { href: "/tournament/mistrzostwa-swiata", label: "Mundial 🌍" },
  { href: "/o-nas", label: "O Blogu" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const blogName = "Piłkarski Magazyn ⚽";

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  const linkClasses = (href: string) => {
    const active = isActive(href);

    return `
      px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300
      ${
        active
          ? "bg-red-600 text-white shadow-lg shadow-red-500/50"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }
    `;
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 shadow-xl border-b border-red-600/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-3xl font-extrabold tracking-wider text-white hover:text-red-500 transition duration-300"
            >
              {blogName}
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:space-x-2 lg:space-x-4 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClasses(link.href)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="http://predicto.gg/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-6 flex items-center gap-2 bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 hover:bg-yellow-400 transform hover:scale-[1.03]"
            >
              <Trophy className="w-5 h-5 fill-current" />
              <span>Stwórz Własny Turniej!</span>
            </Link>
          </div>

          <div className="flex items-center sm:hidden">
            <Link
              href="http://predicto.gg/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-3 flex items-center bg-yellow-500 text-gray-900 font-bold py-1.5 px-3 rounded-full text-sm shadow-md hover:bg-yellow-400 transition"
            >
              <Trophy className="w-4 h-4 mr-1 fill-current" />
              Gra
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Otwórz główne menu</span>
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? "max-h-96 opacity-100 py-2 border-t border-gray-700"
            : "max-h-0 opacity-0"
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`
                block w-full text-center px-3 py-2 rounded-md text-base font-medium transition duration-300
                ${
                  isActive(link.href)
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }
              `}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="http://predicto.gg/index.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center mt-2 flex items-center justify-center gap-2 bg-yellow-500 text-gray-900 font-bold py-3 rounded-md shadow-lg transition duration-300 hover:bg-yellow-400"
          >
            <Trophy className="w-5 h-5 fill-current" />
            Stwórz Własny Turniej!
          </Link>
        </div>
      </div>
    </nav>
  );
}
