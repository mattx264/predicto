import Link from "next/link";
import { Search } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  league: string;
  image: string;
}

const LEAGUE_NAMES: { [key: string]: string } = {
  ekstraklasa: "Ekstraklasa 🇵🇱",
  "liga-mistrzow": "Liga Mistrzów ⭐",
  "premier-league": "Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  transfery: "Transfery 🔄",
};

async function getPostsByLeague(leagueSlug: string): Promise<Post[]> {
  const posts: Post[] = [
    {
      slug: "lech-vs-legia",
      title: "Decydująca Runda: Kto zdominuje Poznań?",
      excerpt:
        "Przegląd taktyczny przed najważniejszym meczem sezonu w Polsce.",
      date: "2025-10-12",
      league: "Ekstraklasa",
      image: "/images/lech-legia.jpg",
    },
    {
      slug: "wyniki-weekend",
      title: "Wyniki 9. kolejki: Lider bezbłędny",
      excerpt:
        "Szybkie podsumowanie wszystkich spotkań weekendu w Ekstraklasie.",
      date: "2025-10-09",
      league: "Ekstraklasa",
      image: "/images/wyniki.jpg",
    },
    {
      slug: "sensacja-pucharu",
      title: "Zaskakujące odpadnięcie faworyta Pucharu Polski",
      excerpt:
        "Analiza przyczyn wczesnej eliminacji potentata z niżej notowanym rywalem.",
      date: "2025-10-05",
      league: "Ekstraklasa",
      image: "/images/puchar.jpg",
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
      slug: "analiza-el-clasico",
      title: "Giganci w Kryzysie: Czy El Clásico ma jeszcze magię?",
      excerpt:
        "Dogłębna analiza formy Realu i Barcelony przed kolejnym starciem tytanów.",
      date: "2025-10-14",
      league: "LaLiga",
      image: "/images/clasico.jpg",
    },
  ];

  const targetLeague = LEAGUE_NAMES[leagueSlug]
    ? LEAGUE_NAMES[leagueSlug].split(" ")[0]
    : leagueSlug;

  return posts.filter((post) => post.league === targetLeague);
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

export default async function LeaguePage({
  params,
}: {
  params: { slug: string };
}) {
  const posts = await getPostsByLeague(params.slug);
  const leagueName = LEAGUE_NAMES[params.slug] || params.slug.toUpperCase();

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-10 text-center bg-gray-800 p-8 rounded-xl shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            Sekcja: {leagueName}
          </h1>
          <p className="text-xl text-gray-400">
            Wszystko, co musisz wiedzieć o najnowszych wydarzeniach.
          </p>
        </section>

        <section className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder={`Szukaj w ${leagueName}...`}
              className="w-full py-2 pl-10 pr-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>

          <div className="flex gap-4">
            <select className="py-2 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition">
              <option>Sortuj: Najnowsze</option>
              <option>Sortuj: Popularność</option>
            </select>
          </div>
        </section>

        {posts.length > 0 ? (
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-20 bg-gray-800 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-300 mb-4">
              Brak postów
            </h2>
            <p className="text-lg text-gray-500">
              Nie ma jeszcze artykułów w tej kategorii. Sprawdź ponownie
              później!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
