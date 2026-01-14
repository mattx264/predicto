import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, ArrowRight, Calendar } from "lucide-react";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    date: Date;
    readTime: number;
    category: string;
    slug: string;
}

interface BlogPostsProps {
    posts: BlogPost[];
}

const BlogPosts: React.FC<BlogPostsProps> = ({ posts }) => {
    const navigate = useNavigate();

    const getTimeAgo = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / 86400000);

        if (days === 0) return "Dzisiaj";
        if (days === 1) return "Wczoraj";
        if (days < 7) return `${days} dni temu`;
        if (days < 30) return `${Math.floor(days / 7)} tyg. temu`;
        return `${Math.floor(days / 30)} mies. temu`;
    };

    return (
        <div className="section-card">
            <div className="section-header">
                <h2 className="section-title">
                    <BookOpen size={24} />
                    Z naszego bloga
                </h2>
            </div>

            <div className="blog-posts-list">
                {posts.length === 0 ? (
                    <div className="blog-empty">
                        <BookOpen size={48} />
                        <p>Brak artykułów</p>
                    </div>
                ) : (
                    posts.map((post, index) => (
                        <div
                            key={post.id}
                            className={`blog-post-item ${index === 0 ? 'featured' : ''}`}
                            onClick={() => navigate(`/blog/${post.slug}`)}
                        >
                            <div className="blog-post-image">
                                <img src={post.imageUrl} alt={post.title} />
                                <span className="blog-category">{post.category}</span>
                            </div>
                            <div className="blog-post-content">
                                <h3 className="blog-post-title">{post.title}</h3>
                                {index === 0 && (
                                    <p className="blog-post-excerpt">{post.excerpt}</p>
                                )}
                                <div className="blog-post-meta">
                                    <span className="blog-date">
                                        <Calendar size={12} />
                                        {getTimeAgo(post.date)}
                                    </span>
                                    <span className="blog-read-time">
                                        <Clock size={12} />
                                        {post.readTime} min
                                    </span>
                                </div>
                            </div>
                            <ArrowRight className="blog-arrow" size={18} />
                        </div>
                    ))
                )}
            </div>

            {posts.length > 0 && (
                <button
                    className="blog-view-all"
                    onClick={() => navigate('/blog')}
                >
                    Zobacz wszystkie artykuły
                    <ArrowRight size={16} />
                </button>
            )}
        </div>
    );
};

export default BlogPosts;