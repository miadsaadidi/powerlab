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
      { file: "glossary/page.tsx", canonical: "/glossary" },
      { file: "research/page.tsx", canonical: "/research" },
      { file: "solar/regional-climate-data/page.tsx", canonical: "/solar/regional-climate-data" },
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

  it("ensures all research paper metadata fields strictly comply with Google SERP limits", async () => {
    const { RESEARCH_PAPERS } = await import("../../data/research-papers");
    for (const paper of RESEARCH_PAPERS) {
      // Short title (used in page title tag) must be between 30 and 60 chars
      expect(
        paper.shortTitle.length,
        `Research paper shortTitle for ${paper.slug} ("${paper.shortTitle}") >= 30 chars`
      ).toBeGreaterThanOrEqual(30);
      expect(
        paper.shortTitle.length,
        `Research paper shortTitle for ${paper.slug} ("${paper.shortTitle}") <= 60 chars`
      ).toBeLessThanOrEqual(60);

      // Meta description must be between 100 and 160 chars
      expect(
        paper.metaDescription.length,
        `Research paper metaDescription for ${paper.slug} >= 100 chars`
      ).toBeGreaterThanOrEqual(100);
      expect(
        paper.metaDescription.length,
        `Research paper metaDescription for ${paper.slug} <= 160 chars`
      ).toBeLessThanOrEqual(160);
    }
  });

  it("ensures all benchmark dataset metadata fields strictly comply with Google SERP limits", async () => {
    const { BENCHMARK_DATASETS } = await import("../../data/research-papers");
    for (const dataset of BENCHMARK_DATASETS) {
      expect(
        dataset.metaDescription.length,
        `Benchmark dataset metaDescription for ${dataset.slug} >= 100 chars`
      ).toBeGreaterThanOrEqual(100);
      expect(
        dataset.metaDescription.length,
        `Benchmark dataset metaDescription for ${dataset.slug} <= 160 chars`
      ).toBeLessThanOrEqual(160);
    }
  });

  it("ensures all research companionPaperUrls point to valid, existing research papers", async () => {
    const { RESEARCH_PAPERS } = await import("../../data/research-papers");
    const validSlugs = new Set(RESEARCH_PAPERS.map((p) => p.slug));
    const appDir = path.resolve(process.cwd(), "src/app");

    function findPaperUrls(dir: string): Array<{ file: string; url: string }> {
      const results: Array<{ file: string; url: string }> = [];
      for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, item.name);
        if (item.isDirectory() && item.name !== "node_modules" && item.name !== "api") {
          results.push(...findPaperUrls(full));
        } else if (item.name.endsWith(".tsx") || item.name.endsWith(".ts")) {
          const content = fs.readFileSync(full, "utf8");
          const matches = content.matchAll(/companionPaperUrl:\s*["'`](https:\/\/[^"'`]+)["'`]/g);
          for (const m of matches) {
            results.push({ file: path.relative(appDir, full), url: m[1] });
          }
        }
      }
      return results;
    }

    const companions = findPaperUrls(appDir);
    expect(companions.length).toBeGreaterThan(0);
    for (const c of companions) {
      const slugMatch = c.url.match(/\/research\/([a-zA-Z0-9_-]+)/);
      expect(slugMatch, `companionPaperUrl in ${c.file} must target /research/[slug]`).toBeTruthy();
      if (slugMatch) {
        expect(validSlugs.has(slugMatch[1]), `Slug "${slugMatch[1]}" in ${c.file} must exist in RESEARCH_PAPERS`).toBe(true);
      }
    }
  });

  it("ensures static pages do not export titles with redundant siteConfig.name branding", () => {
    const appDir = path.resolve(process.cwd(), "src/app");
    const pages = ["about", "disclaimer", "privacy", "standards", "terms"];
    for (const p of pages) {
      const full = path.join(appDir, p, "page.tsx");
      const content = fs.readFileSync(full, "utf8");
      const titleMatch = content.match(/title:\s*["'`](.*?)["'`]/);
      expect(titleMatch).toBeTruthy();
      if (titleMatch) {
        expect(titleMatch[1].endsWith(`| ${siteConfig.name}`), `${p}/page.tsx title should not end with redundant | ${siteConfig.name}`).toBe(false);
        expect(titleMatch[1].endsWith(`— ${siteConfig.name}`), `${p}/page.tsx title should not end with redundant — ${siteConfig.name}`).toBe(false);
      }
    }
  });
});

