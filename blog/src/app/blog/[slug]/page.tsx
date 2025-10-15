import { ArrowLeft, User, Calendar, Tag, Trophy } from "lucide-react";
import Link from "next/link";
import "./page.css";
import { getPostBySlug } from "@/app/lib/posts";

interface SinglePostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SinglePostPage({ params }: SinglePostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div className="post-not-found">
        <div className="not-found-container">
          <div className="not-found-icon">
            <span className="not-found-number">404</span>
          </div>
          <h1 className="not-found-title">Post nie znaleziony</h1>
          <Link href="/blog" className="not-found-button">
            <ArrowLeft className="button-icon" />
            Wróć do wszystkich postów
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="single-post-page">
      <div className="page-background"></div>

      <main className="post-main">
        <Link href="/blog" className="back-link">
          <ArrowLeft className="back-icon" />
          Wróć do wszystkich postów
        </Link>

        <header className="post-header">
          <div className="post-league-badge">
            <div className="league-indicator"></div>
            <p className="league-name">{post.league}</p>
          </div>

          <h1 className="post-main-title">{post.title}</h1>

          <div className="post-meta">
            <div className="meta-item">
              <User className="meta-icon" />
              <span className="meta-text">{post.author}</span>
            </div>
            <div className="meta-item">
              <Calendar className="meta-icon" />
              <span className="meta-text">{post.date}</span>
            </div>
            <div className="meta-item">
              <Tag className="meta-icon" />
              <span className="meta-text">{post.league}</span>
            </div>
          </div>
        </header>

        <article className="post-content">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <div className="tournament-cta">
          <div className="cta-trophy-icon">
            <Trophy className="trophy-svg" />
          </div>
          <h3 className="cta-heading">Pora na Rywalizację!</h3>
          <p className="cta-text">
            Przetestuj swoje umiejętności analityczne! Stwórz prywatny turniej
            ze znajomymi, obstawiaj mecze z tego artykułu i walczcie o miejsce w
            rankingu.
          </p>
          <a
            href="http://predicto.gg/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-action-button"
          >
            Stwórz Ligę i Zgarnij Puchar →
          </a>
        </div>

        <section className="comments-section">
          <h2 className="comments-title">
            <div className="title-accent"></div>
            Zostaw Komentarz
          </h2>
          <div className="comments-placeholder">
            <p className="placeholder-text">
              Miejsce na formularz komentarzy (wymaga komponentu klienta i
              logiki Firebase/innej bazy danych).
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
