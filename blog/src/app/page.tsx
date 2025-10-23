import Link from "next/link";
import { Trophy } from "lucide-react";
import "./page.css";

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
      slug: "eliminacje-mundial-2026",
      title: "Droga na Mundial: Kto Jedzie do USA, Kanady i Meksyku?",
      excerpt:
        "Podsumowanie najważniejszych momentów eliminacji do Mistrzostw Świata 2026 – europejskie zmagania, południowoamerykańskie sensacje i walka o marzenia mniejszych reprezentacji.",
      date: "2025-10-14",
      league: "Eliminacje MŚ 2026",
      image: "/images/worldcup-qualifiers.jpg",
    },
    {
      slug: "polska-droga-na-mundial",
      title: "Polska Walka o Mundial: Czy Biało-Czerwoni Awansują?",
      excerpt:
        "Analiza sytuacji reprezentacji Polski w eliminacjach do Mistrzostw Świata 2026 – kluczowe mecze, szanse na awans i forma liderów drużyny.",
      date: "2025-10-12",
      league: "Eliminacje MŚ 2026",
      image: "/images/poland-worldcup.jpg",
    },
    {
      slug: "faworyci-mundialu-2026",
      title: "Faworyci Mundialu 2026: Kto Sięgnie po Złoto?",
      excerpt:
        "Przegląd reprezentacji, które uchodzą za głównych faworytów Mistrzostw Świata 2026 – od Francji i Argentyny po rosnące potęgi jak Anglia czy Brazylia.",
      date: "2025-10-10",
      league: "Mundial 2026",
      image: "/images/worldcup-favorites.jpg",
    },
  ];
}

const PostCard = ({ post }: { post: Post }) => (
  <article className="post-card">
    <div className="post-card-content">
      <p className="post-league">{post.league}</p>
      <Link href={`/blog/${post.slug}`} className="post-title-link">
        <h3 className="post-title">{post.title}</h3>
      </Link>
      <p className="post-excerpt">{post.excerpt}</p>
      <div className="post-footer">
        <span className="post-date">{post.date}</span>
        <Link href={`/blog/${post.slug}`} className="post-read-more">
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
    <div className="home-container">
      <main className="home-main">
        <section className="featured-section">
          <p className="featured-label">Najnowsza Analiza</p>
          <h1 className="featured-title">{featuredPost.title}</h1>
          <p className="featured-excerpt">{featuredPost.excerpt}</p>
          <Link href={`/blog/${featuredPost.slug}`} className="featured-button">
            Pełny Artykuł →
          </Link>
          <p className="featured-meta">
            Data: {featuredPost.date} | Liga: {featuredPost.league}
          </p>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <Trophy className="cta-icon" />
            <div className="cta-text">
              <h2 className="cta-title">Stwórz Swój Prywatny Turniej!</h2>
              <p className="cta-description">
                Zaproś znajomych, ustal wpisowe i rywalizujcie o puchar. Spróbuj
                teraz!
              </p>
            </div>
          </div>
          <Link
            href="http://predicto.gg/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            Zagraj i Zwyciężaj →
          </Link>
        </section>

        <section className="posts-section">
          <h2 className="section-title">Ostatnie Wiadomości i Analizy 🗞️</h2>
          <div className="posts-grid">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="posts-view-all">
            <Link href="/blog" className="view-all-button">
              Zobacz Wszystkie Posty
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
