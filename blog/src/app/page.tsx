import Link from "next/link";
import { Trophy } from "lucide-react";
import "./page.css";
import { getPosts } from "./lib/posts";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  league: string;
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

  if (posts.length === 0) {
    return (
      <div className="home-container">
        <main className="home-main">
          <section className="featured-section">
            <p className="featured-label">Brak artykułów</p>
            <h1 className="featured-title">
              Wkrótce pojawią się nowe artykuły!
            </h1>
            <p className="featured-excerpt">
              Aktualnie trwają prace nad zawartością bloga. Wróć wkrótce!
            </p>
          </section>
        </main>
      </div>
    );
  }

  const featuredPost = posts[0];
  const latestPosts = posts.slice(1, 4);

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

        {latestPosts.length > 0 && (
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
        )}
      </main>
    </div>
  );
}
