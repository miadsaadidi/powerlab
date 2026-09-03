import { describe, expect, it } from "vitest";
import sitemap, { getSitemapPaths } from "./sitemap";
import { publishedCalculators, calculatorRegistry } from "../lib/calculator-registry";
import { siteConfig } from "../lib/site-config";

describe("sitemap", () => {
  it("does not emit a generated lastmod timestamp for every URL", () => {
    const entries = sitemap();

    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((entry) => entry.lastModified === undefined)).toBe(true);
  });

  it("contains strictly absolute URLs rooted in siteConfig.url", () => {
    const entries = sitemap();
    expect(entries.every((entry) => entry.url.startsWith(siteConfig.url))).toBe(true);
  });

  it("contains zero duplicate URLs", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    const uniqueUrls = new Set(urls);
    expect(uniqueUrls.size).toBe(urls.length);
  });

  it("does not contain query parameters or fragments", () => {
    const entries = sitemap();
    expect(entries.some((e) => e.url.includes("?") || e.url.includes("#"))).toBe(false);
  });

  it("includes all published calculators and excludes unpublished routes", () => {
    const entries = sitemap();
    const published = publishedCalculators();
    const publishedUrls = new Set(published.map((c) => new URL(c.route, siteConfig.url).toString()));

    // All published calculators are present
    for (const url of publishedUrls) {
      expect(entries.some((e) => e.url === url)).toBe(true);
    }

    // No unpublished calculators appear
    const planned = calculatorRegistry.filter((c) => c.status !== "published");
    for (const item of planned) {
      const plannedUrl = new URL(item.route, siteConfig.url).toString();
      expect(entries.some((e) => e.url === plannedUrl)).toBe(false);
    }
  });

  it("includes all main category hubs", () => {
    const paths = getSitemapPaths();
    expect(paths).toContain("/solar");
    expect(paths).toContain("/battery");
    expect(paths).toContain("/home-energy");
    expect(paths).toContain("/ev");
    expect(paths).toContain("/guides");
    expect(paths).toContain("/guides/central-ac-and-heat-pump-electricity-cost-guide");
    expect(paths).toContain("/guides/solar-payback-and-roi-calculation-guide");
    expect(paths).toContain("/guides/space-heater-electricity-cost-and-wattage-guide");
  });
});

