import Link from "next/link";
import { Trophy } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  league: string;
  image: string;
}

async function getPosts(): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    {
      slug: "analiza-el-clasico",
      title: "Giganci w Kryzysie: Czy El Clásico ma jeszcze magię?",
      excerpt:
        "Dogłębna analiza formy Realu i Barcelony przed kolejnym starciem tytanów, z naciskiem na taktykę Xaviego i Ancelottiego.",
      date: "2025-10-14",
      league: "LaLiga",
      image: "/images/clasico.jpg",
    },
    {
      slug: "lech-vs-legia",
      title: "Decydująca Runda Ekstraklasy: Kto zdominuje Poznań?",
      excerpt:
        "Przegląd taktyczny przed najważniejszym meczem sezonu w Polsce – kluczowi zawodnicy i przewidywane składy.",
      date: "2025-10-12",
      league: "Ekstraklasa",
      image: "/images/lech-legia.jpg",
    },
    {
      slug: "liga-mistrzow-faza-grupowa",
      title: "Sensacje Ligi Mistrzów: Kto Zawiódł, Kto Zaskoczył?",
      excerpt:
        "Podsumowanie pierwszej połowy fazy grupowej Ligi Mistrzów. Analiza zaskakujących porażek i niespodziewanych liderów.",
      date: "2025-10-10",
      league: "Liga Mistrzów",
      image: "/images/ucl.jpg",
    },
  ];
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
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
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

export default async function Home() {
  const posts = await getPosts();

  const featuredPost = posts[0];
  const latestPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-16 bg-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl border-l-4 border-red-600 transform hover:scale-[1.005] transition duration-500">
          <p className="text-sm font-semibold text-red-400 mb-2 uppercase tracking-widest">
            Najnowsza Analiza
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            {featuredPost.title}
          </h1>
          <p className="text-xl text-gray-300 mb-6">{featuredPost.excerpt}</p>
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
          >
            Pełny Artykuł →
          </Link>
          <p className="text-sm text-gray-400 mt-6">
            Data: {featuredPost.date} | Liga: {featuredPost.league}
          </p>
        </section>

        <section className="mb-16 p-6 bg-gray-800 rounded-xl flex flex-col lg:flex-row items-center justify-between shadow-xl border-l-8 border-yellow-500">
          <div className="flex items-center gap-4 mb-4 lg:mb-0">
            <Trophy className="w-10 h-10 text-yellow-500 fill-yellow-500 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-extrabold text-white">
                Stwórz Swój Prywatny Turniej!
              </h2>
              <p className="text-gray-400 text-sm">
                Zaproś znajomych, ustal wpisowe i rywalizujcie o puchar. Spróbuj
                teraz!
              </p>
            </div>
          </div>
          <Link
            href="http://predicto.gg/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 hover:bg-yellow-400"
          >
            Zagraj i Zwyciężaj →
          </Link>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 border-b-2 border-red-600 pb-2">
            Ostatnie Wiadomości i Analizy 🗞️
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-block px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition shadow-md"
            >
              Zobacz Wszystkie Posty
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 border-b-2 border-red-600 pb-2">
            Przeglądaj Według Ligi lub Turnieju 🏟️
          </h2>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              href="/liga/ekstraklasa"
              className="px-6 py-3 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-700 transition shadow-lg transform hover:-translate-y-1"
            >
              Ekstraklasa 🇵🇱
            </Link>
            <Link
              href="/tournament/liga-mistrzow"
              className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg transform hover:-translate-y-1"
            >
              Liga Mistrzów ⭐
            </Link>
            <Link
              href="/liga/premier-league"
              className="px-6 py-3 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-lg transform hover:-translate-y-1"
            >
              Premier League 🏴󠁧󠁢󠁥󠁥󠁮󠁧󠁿
            </Link>
            <Link
              href="/liga/laliga"
              className="px-6 py-3 bg-yellow-800 text-white font-semibold rounded-lg hover:bg-yellow-700 transition shadow-lg transform hover:-translate-y-1"
            >
              LaLiga 🇪🇸
            </Link>
            <Link
              href="/tournament/mistrzostwa-europy"
              className="px-6 py-3 bg-indigo-800 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-lg transform hover:-translate-y-1"
            >
              EURO 🏆
            </Link>
          </div>
        </section>

        <section className="bg-red-600 text-white p-8 rounded-2xl text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Bądź Pierwszy z Analizami</h2>
          <p className="text-lg mb-6">
            Subskrybuj newsletter, aby otrzymywać najświeższe analizy i porady
            prosto na skrzynkę, które pomogą Ci wygrywać w turniejach!
          </p>
          <button className="bg-white text-red-600 font-bold py-3 px-10 rounded-full hover:bg-gray-200 transition transform hover:scale-105 shadow-xl">
            Zapisz się Teraz
          </button>
        </section>
      </main>
    </div>
  );
}
