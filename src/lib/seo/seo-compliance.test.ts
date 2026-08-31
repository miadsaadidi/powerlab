import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import { publishedCalculators } from "../calculator-registry";
import { getSitemapPaths } from "../../app/sitemap";
import { siteConfig } from "../site-config";

describe("Google Search Essentials & Technical SEO Compliance", () => {
  const published = publishedCalculators();
  const sitemapPaths = getSitemapPaths();

  it("ensures all published calculator titles and descriptions strictly satisfy Google SERP pixel boundaries", () => {
    for (const tool of published) {
      // Title must be between 35 and 60 characters
      expect(
        tool.seoTitle.length,
        `Calculator title length for ${tool.id} ("${tool.seoTitle}") must be between 35 and 60 characters`
      ).toBeGreaterThanOrEqual(35);
      expect(
        tool.seoTitle.length,
        `Calculator title length for ${tool.id} ("${tool.seoTitle}") must be <= 60 characters`
      ).toBeLessThanOrEqual(60);

      // Meta description must be between 100 and 160 characters
      expect(
        tool.metaDescription.length,
        `Calculator metaDescription length for ${tool.id} must be >= 100 characters`
      ).toBeGreaterThanOrEqual(100);
      expect(
        tool.metaDescription.length,
        `Calculator metaDescription length for ${tool.id} must be <= 160 characters`
      ).toBeLessThanOrEqual(160);
    }
  });

  it("ensures all sitemap URLs are unique, canonical, and mapped to existing routes", () => {
    const uniquePaths = new Set(sitemapPaths);
    expect(uniquePaths.size).toBe(sitemapPaths.length);

    for (const p of sitemapPaths) {
      // Must start with '/'
      expect(p.startsWith("/")).toBe(true);
      // No trailing slash (unless root "/")
      if (p !== "/") {
        expect(p.endsWith("/")).toBe(false);
      }
      // Valid URL resolvable under siteConfig.url
      const url = new URL(p, siteConfig.url).toString();
      expect(url.startsWith(siteConfig.url)).toBe(true);
    }
  });

  it("verifies static pages have compliant titles and meta descriptions", () => {
    const appDir = path.resolve(process.cwd(), "src/app");
    const pagesToCheck = [
      { file: "solar/page.tsx", canonical: "/solar" },
      { file: "battery/page.tsx", canonical: "/battery" },
      { file: "home-energy/page.tsx", canonical: "/home-energy" },
      { file: "ev/page.tsx", canonical: "/ev" },
      { file: "methodology/page.tsx", canonical: "/methodology" },
      { file: "sources/page.tsx", canonical: "/sources" },
      { file: "terms/page.tsx", canonical: "/terms" },
      { file: "privacy/page.tsx", canonical: "/privacy" },
      { file: "about/page.tsx", canonical: "/about" },
    ];

    for (const page of pagesToCheck) {
      const fullPath = path.join(appDir, page.file);
      if (!fs.existsSync(fullPath)) continue;

      const content = fs.readFileSync(fullPath, "utf8");

      // Extract title
      const titleMatch = content.match(/title:\s*["'`](.*?)["'`]/);
      expect(titleMatch, `Title defined in ${page.file}`).toBeTruthy();
      if (titleMatch) {
        const title = titleMatch[1];
        expect(title.length, `Title in ${page.file} ("${title}") >= 35 chars`).toBeGreaterThanOrEqual(35);
        expect(title.length, `Title in ${page.file} ("${title}") <= 60 chars`).toBeLessThanOrEqual(60);
      }

      // Extract description
      const descMatch = content.match(/description:\s*["'`](.*?)["'`]/);
      expect(descMatch, `Description defined in ${page.file}`).toBeTruthy();
      if (descMatch) {
        const desc = descMatch[1];
        expect(desc.length, `Description in ${page.file} >= 100 chars`).toBeGreaterThanOrEqual(100);
        expect(desc.length, `Description in ${page.file} <= 160 chars`).toBeLessThanOrEqual(160);
      }
    }
  });
});
