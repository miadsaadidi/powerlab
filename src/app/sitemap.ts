import type { MetadataRoute } from "next";
import { publishedCalculators } from "../lib/calculator-registry";
import { siteConfig } from "../lib/site-config";

const staticPaths = ["/", "/developers", "/methodology", "/sources", "/about", "/privacy", "/terms"];

export function getSitemapPaths() {
  const published = publishedCalculators();
  const categories = [...new Set(published.map((calculator) => `/${calculator.category}`))];
  return [...staticPaths, ...categories, ...published.map((calculator) => calculator.route)];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const published = publishedCalculators();
  const publishedRoutes = new Set(published.map((c) => c.route));
  const categoryRoutes = new Set([...new Set(published.map((c) => `/${c.category}`))]);
  const now = new Date();

  return getSitemapPaths().map((path) => {
    let priority = 0.5;
    let changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly";

    if (path === "/") {
      priority = 1.0;
      changeFrequency = "weekly";
    } else if (publishedRoutes.has(path)) {
      priority = 0.9;
      changeFrequency = "weekly";
    } else if (categoryRoutes.has(path)) {
      priority = 0.8;
      changeFrequency = "weekly";
    } else {
      priority = 0.5;
      changeFrequency = "monthly";
    }

    return {
      url: new URL(path, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency,
      priority,
    };
  });
}

