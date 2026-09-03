import type { MetadataRoute } from "next";
import { publishedCalculators } from "../lib/calculator-registry";
import { siteConfig } from "../lib/site-config";

import { RESEARCH_PAPERS } from "../data/research-papers";

const staticPaths = [
  "/",
  "/guides",
  "/guides/battery-backup-runtime-calculation-guide",
  "/guides/central-ac-and-heat-pump-electricity-cost-guide",
  "/guides/emergency-generator-sizing-and-inrush-load-guide",
  "/guides/how-many-kwh-does-a-house-use-per-day",
  "/guides/level-2-ev-charging-speed-and-breaker-sizing-guide",
  "/guides/mppt-solar-charge-controller-sizing-guide",
  "/guides/solar-panel-tilt-angle-by-latitude-and-season-guide",
  "/guides/solar-payback-and-roi-calculation-guide",
  "/guides/space-heater-electricity-cost-and-wattage-guide",
  "/guides/voltage-drop-and-wire-size-calculation-guide",
  "/research",
  "/solar/regional-climate-data",
  "/glossary",
  "/developers",
  "/methodology",
  "/sources",
  "/about",
  "/privacy",
  "/terms",
];

export function getSitemapPaths() {
  const published = publishedCalculators();
  const categories = [...new Set(published.map((calculator) => `/${calculator.category}`))];
  const researchPaths = RESEARCH_PAPERS.map((paper) => `/research/${paper.slug}`);
  return [...staticPaths, ...researchPaths, ...categories, ...published.map((calculator) => calculator.route)];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const published = publishedCalculators();
  const publishedRoutes = new Set(published.map((c) => c.route));
  const categoryRoutes = new Set([...new Set(published.map((c) => `/${c.category}`))]);
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
      changeFrequency,
      priority,
    };
  });
}
