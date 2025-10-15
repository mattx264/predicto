import Link from "next/link";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Filter,
} from "lucide-react";
import "./page.css";
import { getPosts, Post } from "../lib/posts";

const PostCard = ({ post }: { post: Post }) => (
  <article className="post-card">
    <div className="post-card-content">
      <div className="post-card-badge">
        <div className="badge-dot"></div>
        <p className="badge-text">{post.league}</p>
      </div>
      <Link href={`/blog/${post.slug}`} className="post-card-link">
        <h3 className="post-card-title">{post.title}</h3>
      </Link>
      <p className="post-card-excerpt">{post.excerpt}</p>
      <div className="post-card-footer">
        <span className="post-card-date">{post.date}</span>
        <Link href={`/blog/${post.slug}`} className="post-card-read-more">
          Czytaj więcej <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  </article>
);

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="blog-page">
      <div className="blog-page-background"></div>

      <main className="blog-page-container">
        <section className="blog-header">
          <div className="blog-header-badge">
            <div className="header-badge-dot"></div>
            <span className="header-badge-text">Pełne Archiwum</span>
          </div>
          <h1 className="blog-header-title">Wszystkie Posty</h1>
          <p className="blog-header-subtitle">
            Pełne archiwum analiz, newsów i statystyk sportowych.
          </p>
        </section>

        <section className="search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Szukaj postów..."
                className="search-input"
              />
              <Search className="search-icon" />
            </div>

            <div className="filter-wrapper">
              <Filter className="filter-icon" />
              <select className="filter-select">
                <option>Sortuj: Najnowsze</option>
                <option>Sortuj: Najpopularniejsze</option>
              </select>
              <select className="filter-select">
                <option>Kategoria: Wszystkie</option>
                <option>Eliminacje MŚ 2026</option>
                <option>Mistrzostwa świata 2026</option>
              </select>
            </div>
          </div>
        </section>

        <section className="cta-banner">
          <div className="cta-content">
            <div className="cta-icon-wrapper">
              <Trophy className="cta-icon" />
            </div>
            <div className="cta-text">
              <h2 className="cta-title">Stwórz Własną Ligę</h2>
              <p className="cta-description">
                Przekształć analizy w realną rywalizację ze znajomymi!
              </p>
            </div>
          </div>
          <Link
            href="http://predicto.gg/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            <Trophy className="cta-button-icon" />
            Zagraj Teraz →
          </Link>
        </section>

        <section className="posts-section">
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <section className="pagination-section">
          <div className="pagination-container">
            <button className="pagination-button pagination-prev">
              <ChevronLeft size={20} />
              <span className="pagination-text">Poprzednia</span>
            </button>

            <button className="pagination-button pagination-active">1</button>
            <button className="pagination-button">2</button>
            <button className="pagination-button">3</button>

            <button className="pagination-button pagination-next">
              <span className="pagination-text">Następna</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
