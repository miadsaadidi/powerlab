import { describe, expect, it } from "vitest";
import {
  buildCalculatorStructuredData,
  buildCategoryHubStructuredData,
  buildGuideStructuredData,
  buildWebSiteStructuredData,
} from "./structured-data";

describe("structured-data", () => {
  it("builds valid calculator structured data with speakable specification", () => {
    const data = buildCalculatorStructuredData({
      name: "Battery Runtime Calculator",
      description: "Calculate runtime of battery banks under varying continuous loads.",
      route: "/battery/battery-runtime-calculator",
      categoryName: "Battery",
      categoryRoute: "/battery",
      standards: ["IEEE 485", "UL 1973"],
      faqs: [
        {
          question: "How long does a 100Ah battery last?",
          answer: "A 100Ah 12V battery provides 1200Wh. At 100W load, it lasts approx 10 hours at 85% DoD.",
        },
      ],
    });

    expect(data.length).toBe(4); // BreadcrumbList, WebPage, WebApplication, FAQPage

    const breadcrumb = data.find((item) => item["@type"] === "BreadcrumbList") as any;
    expect(breadcrumb).toBeDefined();
    expect(breadcrumb.itemListElement.length).toBe(3);

    const webPage = data.find((item) => item["@type"] === "WebPage") as any;
    expect(webPage).toBeDefined();
    expect(webPage.speakable).toBeDefined();
    expect(webPage.speakable["@type"]).toBe("SpeakableSpecification");
    expect(webPage.speakable.cssSelector).toContain(".direct-answer-card");

    const webApp = data.find(
      (item) => Array.isArray(item["@type"]) && item["@type"].includes("WebApplication"),
    ) as any;
    expect(webApp.citation).toEqual(["IEEE 485", "UL 1973"]);
    expect(webApp.operatingSystem).toBe("All (Modern Web Browsers, iOS, Android, macOS, Windows)");
    expect(webApp.browserRequirements).toBe("Requires JavaScript. Requires HTML5 Canvas/SVG.");
    expect(webApp.offers.availability).toBe("https://schema.org/InStock");
    expect(webApp.isAccessibleForFree).toBe(true);

    const faqPage = data.find((item) => item["@type"] === "FAQPage") as any;
    expect(faqPage).toBeDefined();
    expect(faqPage.mainEntity.length).toBe(1);
    expect(faqPage.mainEntity[0].name).toBe("How long does a 100Ah battery last?");
  });

  it("builds valid guide structured data with speakable and audience schema", () => {
    const data = buildGuideStructuredData({
      title: "Voltage Drop & Wire Size Calculation Guide",
      description: "Complete guide to NEC voltage drop calculations and wire sizing.",
      route: "/guides/voltage-drop-and-wire-size-calculation-guide",
      datePublished: "2026-08-25",
      dateModified: "2026-08-25",
      standards: ["NEC 210.19(A)", "NEC Chapter 9 Table 8"],
      speakableSelectors: [".direct-answer-card", "h1"],
    });

    expect(data.length).toBe(2); // BreadcrumbList, TechArticle

    const article = data.find(
      (item) => Array.isArray(item["@type"]) && item["@type"].includes("TechArticle"),
    ) as any;
    expect(article).toBeDefined();
    expect(article.proficiencyLevel).toBe("Professional");
    expect(article.audience["@type"]).toBe("Audience");
    expect(article.speakable.cssSelector).toEqual([".direct-answer-card", "h1"]);
    expect(article.citation).toEqual(["NEC 210.19(A)", "NEC Chapter 9 Table 8"]);
  });

  it("builds valid category hub and website structured data", () => {
    const hub = buildCategoryHubStructuredData({
      categoryName: "Solar Planning",
      categoryRoute: "/solar",
      description: "Calculators and tools for solar design.",
      tools: [
        { name: "Solar Tilt Calculator", route: "/solar/solar-panel-tilt-calculator" },
        { name: "Solar Output Calculator", route: "/solar/solar-panel-output-calculator" },
      ],
    });

    expect(hub.length).toBe(2); // BreadcrumbList, CollectionPage
    const collection = hub.find((item) => item["@type"] === "CollectionPage") as any;
    expect(collection.mainEntity.numberOfItems).toBe(2);

    const site = buildWebSiteStructuredData();
    expect(site["@type"]).toBe("WebSite");
  });
});
