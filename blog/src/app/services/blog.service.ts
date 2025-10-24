import { Article } from "../types";
import apiService from "./api.service";

const blogService = {
  getAllArticles: async (): Promise<Article[]> => {
    const response = await fetch(
      `${apiService.getBackendUrl()}/api/ArticleBlog/all`
    );
    if (!response.ok) {
      throw new Error(`Error fetching all articles: ${response.statusText}`);
    }
    return response.json();
  },

  getArticleById: async (id: number): Promise<Article> => {
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
};

export default blogService;
