import Link from "next/link";
import { Mail, Facebook, Twitter, Instagram, Trophy } from "lucide-react";

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
    <footer className="bg-gray-900 border-t border-red-600/50 text-gray-300 mt-12 pt-10 pb-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-10 mb-6">
          <div className="col-span-2">
            <h4 className="text-2xl font-extrabold text-white mb-4 flex items-center gap-2">
              Piłkarski Magazyn ⚽
            </h4>
            <p className="text-sm">
              Twój codzienny dostawca najświeższych analiz. Jesteśmy bramą do
              rywalizacji i emocji w świecie piłki nożnej.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Blog</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-red-600 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Informacje Prawne
            </h4>
            <ul className="space-y-2">
              {legalItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-red-600 transition"
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

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-1">
              <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              Turnieje Społeczności
            </h4>
            <p className="text-sm mb-4">
              Zaproś znajomych, ustal wpisowe, stwórz własną Ligę Mistrzów i
              walcz o nagrody w rankingu!
            </p>
            <Link
              href="http://predicto.gg/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg text-sm shadow-md transition duration-300 hover:bg-yellow-400"
            >
              Dołącz do Gry
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <div className="text-center md:text-left text-sm text-gray-500 order-2 md:order-1 mt-4 md:mt-0">
            &copy; {currentYear} Piłkarski Magazyn. Wszystkie prawa zastrzeżone.
          </div>

          <div className="flex space-x-4 order-1 md:order-2">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-red-600 transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-red-600 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-red-600 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="mailto:kontakt@blog.pl"
              aria-label="Email"
              className="hover:text-red-600 transition"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
