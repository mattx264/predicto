import type { MetadataRoute } from "next";
import { TOURNAMENTS } from "@/app/lib/tournaments";
import { getTeams } from "@/app/lib/teams";
import { getPosts } from "@/app/lib/posts";

const BASE_URL = "http://blog.predicto.gg";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  const staticLinks: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/o-nas`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const contextualNavLinks = [
    { path: "/terminarz", changeFrequency: "daily", priority: 0.7 },
    { path: "/reprezentacje", changeFrequency: "weekly", priority: 0.6 },
  ];

  const tournamentLinks: MetadataRoute.Sitemap = [];

  for (const tournament of TOURNAMENTS) {
    const tournamentSlug = tournament.slug;

    contextualNavLinks.forEach((link) => {
      tournamentLinks.push({
        url: `${BASE_URL}/${tournamentSlug}${link.path}`,
        lastModified: currentDate,
        changeFrequency: link.changeFrequency as "daily" | "weekly",
        priority: link.priority,
      });
    });

    const teams = await getTeams(tournamentSlug);

    teams.forEach((team) => {
      tournamentLinks.push({
        url: `${BASE_URL}/${tournamentSlug}/reprezentacje/${team.slug}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });
  }

  const blogPosts = await getPosts();

  const postLinks: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticLinks, ...tournamentLinks, ...postLinks];
}
