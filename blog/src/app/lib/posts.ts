import articleService from "../services/article.service";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tournamentSlug: string;
  league: string;
  author: string;
  content: string;
}

export async function getPosts(): Promise<Post[]> {
  try {
    const articlesFromApi = await articleService.getAllArticles();

    const posts: Post[] = articlesFromApi.map((article) =>
      articleService.mapToArticle(article)
    );

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const posts = await getPosts();
    return posts.find((post) => post.slug === slug);
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return undefined;
  }
}
