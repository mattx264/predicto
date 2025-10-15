import Link from "next/link";
import { Search, ChevronLeft, ChevronRight, Trophy } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  league: string;
  image: string;
}

async function getPosts(): Promise<Post[]> {
  const mockPosts = [
    {
      slug: "analiza-el-clasico",
      title: "Giganci w Kryzysie: Czy El Clásico ma jeszcze magię?",
      excerpt:
        "Dogłębna analiza formy Realu i Barcelony przed starciem tytanów.",
      date: "2025-10-14",
      league: "LaLiga",
      image: "/images/clasico.jpg",
    },
    {
      slug: "lech-vs-legia",
      title: "Decydująca Runda Ekstraklasy: Kto zdominuje Poznań?",
      excerpt:
        "Przegląd taktyczny przed najważniejszym meczem sezonu w Polsce.",
      date: "2025-10-12",
      league: "Ekstraklasa",
      image: "/images/lech-legia.jpg",
    },
    {
      slug: "liga-mistrzow-faza-grupowa",
      title: "Sensacje Ligi Mistrzów: Kto Zawiódł, Kto Zaskoczył?",
      excerpt: "Podsumowanie pierwszej połowy fazy grupowej Ligi Mistrzów.",
      date: "2025-10-10",
      league: "Liga Mistrzów",
      image: "/images/ucl.jpg",
    },
    {
      slug: "transfer-haaland",
      title: "Czy Haaland opuści Manchester City? Najnowsze plotki.",
      excerpt:
        "Analiza spekulacji transferowych wokół norweskiej maszyny do strzelania goli.",
      date: "2025-10-09",
      league: "Transfery",
      image: "/images/haaland.jpg",
    },
    {
      slug: "bundesliga-dominacja",
      title: "Koniec Dominacji Bayernu? Nowy Lider Bundesligi.",
      excerpt:
        "Czy to koniec hegemonii Bawarczyków? Przyglądamy się nowemu liderowi.",
      date: "2025-10-07",
      league: "Bundesliga",
      image: "/images/bayern.jpg",
    },
    {
      slug: "polska-eliminacje",
      title: "Polska w Elitarnym Granie: Szanse w Eliminacjach EURO 2028.",
      excerpt:
        "Ocena występów reprezentacji Polski po kluczowych meczach eliminacyjnych.",
      date: "2025-10-05",
      league: "Reprezentacja",
      image: "/images/polska.jpg",
    },
    {
      slug: "fenomen-messi",
      title: "Fenomen Messiego w MLS: Czy Liga Zmieniła Oblicze?",
      excerpt:
        "Wpływ Leo Messiego na popularność i poziom rozgrywek Major League Soccer.",
      date: "2025-10-03",
      league: "MLS",
      image: "/images/messi.jpg",
    },
  ];
  return mockPosts;
}

const PostCard = ({ post }: { post: Post }) => (
  <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg transition duration-500 hover:shadow-2xl hover:border-red-600/50">
    <div className="p-6">
      <p className="text-xs font-bold text-red-600 uppercase mb-2">
        {post.league}
      </p>
      <Link href={`/blog/${post.slug}`} className="block">
        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3 hover:text-red-600 transition duration-300">
          {post.title}
        </h3>
      </Link>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
        {post.excerpt}
      </p>
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 border-t pt-3 mt-3">
        <span>{post.date}</span>
        <Link
          href={`/blog/${post.slug}`}
          className="text-red-600 font-semibold hover:text-red-700 transition"
        >
          Czytaj więcej →
        </Link>
      </div>
    </div>
  </article>
);

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            Wszystkie Posty 📚
          </h1>
          <p className="text-xl text-gray-400">
            Pełne archiwum analiz, newsów i statystyk.
          </p>
        </section>

        <section className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Szukaj postów..."
              className="w-full py-2 pl-10 pr-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>

          <div className="flex gap-4">
            <select className="py-2 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition">
              <option>Sortuj: Najnowsze</option>
              <option>Sortuj: Najpopularniejsze</option>
            </select>
            <select className="py-2 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition">
              <option>Kategoria: Wszystkie</option>
              <option>Ekstraklasa</option>
              <option>Liga Mistrzów</option>
            </select>
          </div>
        </section>

        <section className="mb-12 p-6 bg-gray-800 rounded-xl flex flex-col lg:flex-row items-center justify-between shadow-xl border-l-8 border-yellow-500 transition transform hover:scale-[1.01] hover:shadow-2xl">
          <div className="flex items-center gap-4 mb-4 lg:mb-0">
            <Trophy className="w-10 h-10 text-yellow-500 fill-yellow-500 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-extrabold text-white">
                Stwórz Własną Ligę
              </h2>
              <p className="text-gray-400 text-sm">
                Przekształć analizy w realną rywalizację ze znajomymi!
              </p>
            </div>
          </div>
          <Link
            href="http://predicto.gg/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 hover:bg-yellow-400"
          >
            <Trophy className="w-5 h-5 fill-current" />
            Zagraj Teraz →
          </Link>
        </section>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <section className="flex justify-center mt-10">
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-800 transition">
              <ChevronLeft size={20} />
              <span className="ml-2 hidden sm:inline">Poprzednia</span>
            </button>

            <span className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg">
              1
            </span>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
              2
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
              3
            </button>

            <button className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-red-600 transition">
              <span className="mr-2 hidden sm:inline">Następna</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
