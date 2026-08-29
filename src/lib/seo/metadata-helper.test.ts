import { describe, expect, it } from "vitest";
import { buildPageMetadata } from "./metadata-helper";
import { siteConfig } from "../site-config";

describe("buildPageMetadata", () => {
  it("creates complete Open Graph and Twitter metadata with image", () => {
    const meta = buildPageMetadata({
      title: "Solar Panel Tilt Calculator — Optimal Angle",
      description: "Calculate optimal solar panel tilt angle and azimuth for your latitude. Features seasonal summer/winter angle adjustments and roof pitch comparison.",
      canonicalPath: "/solar/solar-panel-tilt-calculator",
      category: "solar",
    });

    expect(meta.title).toBe("Solar Panel Tilt Calculator — Optimal Angle");
    expect(meta.description).toBe("Calculate optimal solar panel tilt angle and azimuth for your latitude. Features seasonal summer/winter angle adjustments and roof pitch comparison.");
    expect(meta.alternates?.canonical).toBe("/solar/solar-panel-tilt-calculator");

    const og = meta.openGraph as any;
    expect(og).toBeDefined();
    expect(og.title).toBe(`Solar Panel Tilt Calculator — Optimal Angle — ${siteConfig.name}`);
    expect(og.description).toBe(meta.description);
    expect(og.url).toBe(`${siteConfig.url}/solar/solar-panel-tilt-calculator`);
    expect(og.siteName).toBe(siteConfig.name);
    expect(og.locale).toBe("en_US");
    expect(og.type).toBe("website");
    expect(og.images).toBeDefined();
    expect(og.images.length).toBe(1);
    expect(og.images[0].url).toBe(`${siteConfig.url}/solar/opengraph-image`);
    expect(og.images[0].width).toBe(1200);
    expect(og.images[0].height).toBe(630);

    const twitter = meta.twitter as any;
    expect(twitter).toBeDefined();
    expect(twitter.card).toBe("summary_large_image");
    expect(twitter.images[0]).toBe(`${siteConfig.url}/solar/opengraph-image`);
  });

  it("sets article type for guides and supports root fallback image", () => {
    const meta = buildPageMetadata({
      title: "How Many kWh Does a House Use Per Day?",
      description: "Learn average daily electricity consumption by house size with empirical EIA benchmarks and heavy appliance duty cycles.",
      canonicalPath: "/guides/how-many-kwh-does-a-house-use-per-day",
      isArticle: true,
    });

    const og = meta.openGraph as any;
    expect(og.type).toBe("article");
    expect(og.images[0].url).toBe(`${siteConfig.url}/opengraph-image`);
  });
});
