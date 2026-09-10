import type { MetadataRoute } from "next";
import { publishedCalculators } from "../lib/calculator-registry";
import { siteConfig } from "../lib/site-config";
import { RESEARCH_PAPERS } from "../data/research-papers";

const staticPaths = [
  "/",
  "/calculators",
  "/guides",
  "/guides/battery-backup-runtime-calculation-guide",
  "/guides/central-ac-and-heat-pump-electricity-cost-guide",
  "/guides/emergency-generator-sizing-and-inrush-load-guide",
  "/guides/how-many-kwh-does-a-house-use-per-day",
  "/guides/how-to-calculate-ev-driving-range-and-efficiency-guide",
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
  "/standards",
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

const researchDateMap = new Map(
  RESEARCH_PAPERS.map((paper) => [
    `/research/${paper.slug}`,
    new Date(`${paper.dateModified || paper.datePublished}T00:00:00Z`),
  ])
);

export function getPathLastModified(
  path: string,
  calculatorPhaseMap: Map<string, number>
): Date {
  const paperDate = researchDateMap.get(path);
  if (paperDate) return paperDate;

  if (path.startsWith("/guides/")) {
    if (path.includes("solar-payback") || path.includes("space-heater")) {
      return new Date("2026-09-03T00:00:00Z");
    }
    if (path.includes("central-ac")) {
      return new Date("2026-08-29T00:00:00Z");
    }
    return new Date("2026-08-20T00:00:00Z");
  }

  const phase = calculatorPhaseMap.get(path);
  if (phase !== undefined) {
    if (phase >= 4) return new Date("2026-09-03T00:00:00Z");
    if (phase === 3) return new Date("2026-08-29T00:00:00Z");
    return new Date("2026-08-20T00:00:00Z");
  }

  if (
    path === "/" ||
    path === "/calculators" ||
    path === "/solar" ||
    path === "/battery" ||
    path === "/home-energy" ||
    path === "/ev"
  ) {
    return new Date("2026-09-10T00:00:00Z");
  }

  if (path === "/research" || path === "/guides") {
    return new Date("2026-09-03T00:00:00Z");
  }

  return new Date("2026-08-29T00:00:00Z");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const published = publishedCalculators();
  const publishedRoutes = new Set(published.map((c) => c.route));
  const categoryRoutes = new Set([...new Set(published.map((c) => `/${c.category}`))]);
  const calculatorPhaseMap = new Map(published.map((c) => [c.route, c.phase]));

  return getSitemapPaths().map((path) => {
    let priority = 0.5;
    let changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly";

    if (path === "/") {
      priority = 1.0;
      changeFrequency = "weekly";
    } else if (publishedRoutes.has(path) || path === "/calculators") {
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
      lastModified: getPathLastModified(path, calculatorPhaseMap),
      changeFrequency,
      priority,
    };
  });
}
