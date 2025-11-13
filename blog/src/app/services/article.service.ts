import apiService from "./api.service";

export interface ArticleFromApi {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  author: string;
  createOn: string;
  tag: string;
  content: string;
  tournamentId: number | null;
  tournament: {
    id: number;
    name: string;
    slug: string;
  } | null;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tournamentSlug: string;
  league: string;
  author: string;
  content: string;
}

const articleService = {
  getAllArticles: async (): Promise<ArticleFromApi[]> => {
    const response = await fetch(
      `${apiService.getBackendUrl()}/api/ArticleBlog/all`
    );
    if (!response.ok) {
      throw new Error(`Error fetching articles: ${response.statusText}`);
    }
    return response.json();
  },

  getArticleById: async (id: number): Promise<ArticleFromApi> => {
    const response = await fetch(
      `${apiService.getBackendUrl()}/api/ArticleBlog/${id}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Article with id ${id} not found`);
      }
      throw new Error(`Error fetching article ${id}: ${response.statusText}`);
    }
    return response.json();
  },

  mapToArticle: (apiArticle: ArticleFromApi): Article => {
    return {
      slug: apiArticle.slug,
      title: apiArticle.title,
      excerpt: apiArticle.shortDescription,
      date: new Date(apiArticle.createOn).toISOString().split("T")[0],
      tournamentSlug: apiArticle.tournament?.slug || "other",
      league: apiArticle.tag,
      author: apiArticle.author,
      content: apiArticle.content,
    };
  },
};

export default articleService;
