"use client";

import { ArrowLeft, User, Calendar, Tag, Trophy } from "lucide-react";

interface DetailedPost {
  slug: string;
  title: string;
  content: string;
  author: string;
  date: string;
  league: string;
}

async function getPostBySlug(slug: string): Promise<DetailedPost | null> {
  if (slug === "analiza-el-clasico") {
    return {
      slug,
      title: "Giganci w Kryzysie: Czy El Clásico ma jeszcze magię?",
      author: "Anna Kowalska",
      date: "2025-10-14",
      league: "LaLiga",
      content: `
        <p>El Clásico, czyli starcie Realu Madryt i FC Barcelony, od lat było uznawane za największe widowisko piłkarskie na świecie. Jednak w ostatnich sezonach, w związku ze zmianami pokoleniowymi i problemami finansowymi obu klubów, pojawia się pytanie: czy to starcie ma jeszcze ten sam magnetyzm i sportową jakość, co kiedyś?</p>
        
        <h2>Transformacja Realu i Barcelony</h2>
        <p>Real Madryt, pod wodzą Carlo Ancelottiego, stawia na powolną, ale skuteczną transformację. Odejście legendarnych graczy zastępowane jest talentami takimi jak Vini Jr. i Bellingham. Ich gra, choć skuteczna, często jest bardziej pragmatyczna niż spektakularna. Z kolei FC Barcelona przechodzi przez rewolucję taktyczną. Xavi stara się wdrożyć ofensywny styl, ale młodzi gracze i niestabilna sytuacja finansowa przekładają się na wahania formy. Obie drużyny szukają swojej tożsamości po erze Messiego i Ronaldo.</p>

        <h2>Kluczowe Mecze i Statystyki</h2>
        <p>Ostatnie pięć spotkań ligowych pomiędzy obiema drużynami charakteryzowało się przede wszystkim intensywnością, a nie płynnością. Średnia bramek spadła, a liczba żółtych kartek wzrosła. To sugeruje, że rywalizacja przeniosła się bardziej na poziom fizyczny i mentalny, niż techniczny. Czy to trend stały? Czas pokaże, ale na pewno kibice tęsknią za wymianą ciosów na miarę 5:0 czy 6:2.</p>
        
        <p><strong>Wnioski:</strong> Mimo wszystko, El Clásico wciąż przyciąga miliony widzów. Może magia jest inna – mniej błyskotliwa, a bardziej surowa i zacięta. I to też ma swój urok.</p>
      `,
    };
  }
  return null;
}

export default function SinglePostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = {
    slug: "analiza-el-clasico",
    title: "Giganci w Kryzysie: Czy El Clásico ma jeszcze magię?",
    author: "Anna Kowalska",
    date: "2025-10-14",
    league: "LaLiga",
    content: `
      <p>El Clásico, czyli starcie Realu Madryt i FC Barcelony, od lat było uznawane za największe widowisko piłkarskie na świecie. Jednak w ostatnich sezonach, w związku ze zmianami pokoleniowymi i problemami finansowymi obu klubów, pojawia się pytanie: czy to starcie ma jeszcze ten sam magnetyzm i sportową jakość, co kiedyś?</p>
      
      <h2>Transformacja Realu i Barcelony</h2>
      <p>Real Madryt, pod wodzą Carlo Ancelottiego, stawia na powolną, ale skuteczną transformację. Odejście legendarnych graczy zastępowane jest talentami takimi jak Vini Jr. i Bellingham. Ich gra, choć skuteczna, często jest bardziej pragmatyczna niż spektakularna. Z kolei FC Barcelona przechodzi przez rewolucję taktyczną. Xavi stara się wdrożyć ofensywny styl, ale młodzi gracze i niestabilna sytuacja finansowa przekładają się na wahania formy. Obie drużyny szukają swojej tożsamości po erze Messiego i Ronaldo.</p>

      <h2>Kluczowe Mecze i Statystyki</h2>
      <p>Ostatnie pięć spotkań ligowych pomiędzy obiema drużynami charakteryzowało się przede wszystkim intensywnością, a nie płynnością. Średnia bramek spadła, a liczba żółtych kartek wzrosła. To sugeruje, że rywalizacja przeniosła się bardziej na poziom fizyczny i mentalny, niż techniczny. Czy to trend stały? Czas pokaże, ale na pewno kibice tęsknią za wymianą ciosów na miarę 5:0 czy 6:2.</p>
      
      <p><strong>Wnioski:</strong> Mimo wszystko, El Clásico wciąż przyciąga miliony widzów. Może magia jest inna – mniej błyskotliwa, a bardziej surowa i zacięta. I to też ma swój urok.</p>
    `,
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-rose-500/10 border-2 border-rose-500/30 rounded-2xl mb-6">
            <span className="text-5xl font-extrabold text-rose-400">404</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-50 mb-4">
            Post nie znaleziony
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            Nie znaleziono postu o slug: "{params.slug}".
          </p>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" /> Wróć do wszystkich postów
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.08)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.08)_0%,transparent_50%)] pointer-events-none"></div>

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold mb-12 transition-colors duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
          Wróć do wszystkich postów
        </a>

        <header className="border-b-2 border-slate-800/50 pb-8 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
              {post.league}
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full backdrop-blur-sm">
              <User className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300 font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300 font-medium">{post.date}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full backdrop-blur-sm">
              <Tag className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300 font-medium">{post.league}</span>
            </div>
          </div>
        </header>

        <article className="prose prose-lg prose-invert max-w-none mb-16">
          <style jsx>{`
            article :global(h2) {
              font-size: 2rem;
              font-weight: 800;
              color: #f1f5f9;
              margin-top: 3rem;
              margin-bottom: 1.5rem;
              padding-bottom: 0.75rem;
              border-bottom: 2px solid rgba(6, 182, 212, 0.2);
            }
            article :global(p) {
              color: #cbd5e1;
              line-height: 1.8;
              margin-bottom: 1.5rem;
              font-size: 1.125rem;
            }
            article :global(strong) {
              color: #f1f5f9;
              font-weight: 700;
            }
          `}</style>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <div className="mb-16 p-10 bg-gradient-to-r from-amber-900/30 via-yellow-900/30 to-amber-900/30 rounded-2xl shadow-2xl border-2 border-yellow-500/30 backdrop-blur-sm text-center transition-all duration-500 hover:border-yellow-500/50 hover:shadow-yellow-500/20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 border-2 border-yellow-500/50 rounded-xl mb-6">
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <h3 className="text-3xl font-extrabold text-slate-50 mb-4">
            Pora na Rywalizację!
          </h3>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Przetestuj swoje umiejętności analityczne! Stwórz prywatny turniej
            ze znajomymi, obstawiaj mecze z tego artykułu i walczcie o miejsce w
            rankingu.
          </p>
          <a
            href="http://predicto.gg/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 hover:shadow-yellow-500/50 hover:scale-105"
          >
            Stwórz Ligę i Zgarnij Puchar →
          </a>
        </div>

        <section className="pt-12 border-t-2 border-slate-800/50">
          <h2 className="text-3xl font-extrabold text-slate-50 mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
            Zostaw Komentarz
          </h2>
          <div className="bg-slate-800/50 border-2 border-slate-700/50 backdrop-blur-sm p-8 rounded-2xl">
            <p className="text-slate-400 text-center text-lg">
              Miejsce na formularz komentarzy (wymaga komponentu klienta i
              logiki Firebase/innej bazy danych).
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
