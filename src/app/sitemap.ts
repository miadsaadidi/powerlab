import type { MetadataRoute } from "next";
import { publishedCalculators } from "../lib/calculator-registry";
import { siteConfig } from "../lib/site-config";

const staticPaths = ["/", "/methodology", "/sources", "/about", "/privacy", "/terms"];

export function getSitemapPaths() {
  const published = publishedCalculators();
  const categories = [...new Set(published.map((calculator) => `/${calculator.category}`))];
  return [...staticPaths, ...categories, ...published.map((calculator) => calculator.route)];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapPaths().map((path) => ({ url: new URL(path, siteConfig.url).toString() }));
}
