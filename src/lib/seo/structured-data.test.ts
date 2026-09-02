import { describe, expect, it } from "vitest";
import {
  buildCalculatorStructuredData,
  buildCategoryHubStructuredData,
  buildGuideStructuredData,
  buildWebSiteStructuredData,
  buildDefinedTermSetStructuredData,
  getDomainWikidataEntities,
  SHARED_AUTHORITY_SAME_AS,
} from "./structured-data";

describe("structured-data", () => {
  it("builds valid calculator structured data with MathSolver, Wikidata entity triples, and speakable specification", () => {
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

    expect(data.length).toBe(4); // BreadcrumbList, WebPage, WebApplication/MathSolver, FAQPage

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
    expect(webApp["@type"]).toContain("MathSolver");
    expect(webApp["@type"]).toContain("LearningResource");
    expect(webApp.citation).toEqual(["IEEE 485", "UL 1973"]);
    expect(webApp.operatingSystem).toBe("All (Modern Web Browsers, iOS, Android, macOS, Windows)");
    expect(webApp.browserRequirements).toBe("Requires JavaScript. Requires HTML5 Canvas/SVG.");
    expect(webApp.offers.availability).toBe("https://schema.org/InStock");
    expect(webApp.isAccessibleForFree).toBe(true);

    // Wikidata Triples
    expect(webApp.about).toBeDefined();
    expect(Array.isArray(webApp.about)).toBe(true);
    const aboutNames = webApp.about.map((e: any) => e.name);
    expect(aboutNames).toContain("Peukert's law");
    expect(aboutNames).toContain("Lithium-ion battery");

    // Authority sameAs links
    expect(webApp.author.sameAs).toEqual(SHARED_AUTHORITY_SAME_AS);
    expect(webApp.author.sameAs).toContain("https://doi.org/10.6084/m9.figshare.33321774");

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
    expect(article.about).toBeDefined();
  });

  it("retrieves ASHRAE and thermodynamic Wikidata entities for HVAC and Home Energy tools", () => {
    const entities = getDomainWikidataEntities("Home Energy", "/home-energy/heat-pump-cost-calculator");
    const names = entities.map((e) => e.name);
    expect(names).toContain("ASHRAE");
    expect(names).toContain("ASHRAE 90.1");
    expect(names).toContain("Heat pump");
    expect(names).toContain("Thermodynamics");
  });

  it("builds valid calculator structured data with HowTo schema when howToSteps are provided", () => {
    const data = buildCalculatorStructuredData({
      name: "EV Charger Breaker Size Calculator",
      description: "Calculate circuit breaker size for Level 2 EV charging.",
      route: "/ev/ev-charger-breaker-size-calculator",
      categoryName: "EV",
      categoryRoute: "/ev",
      howToSteps: [
        { name: "Determine Continuous Load", text: "Identify charging amperage." },
        { name: "Apply NEC 125% Rule", text: "Multiply continuous load by 1.25." },
        { name: "Select Breaker", text: "Choose standard OCPD breaker rating." },
      ],
    });

    const howTo = data.find((item) => item["@type"] === "HowTo") as any;
    expect(howTo).toBeDefined();
    expect(howTo.name).toBe("How to Calculate EV Charger Breaker Size Calculator");
    expect(howTo.step.length).toBe(3);
    expect(howTo.step[0]["@type"]).toBe("HowToStep");
    expect(howTo.step[0].name).toBe("Determine Continuous Load");
  });

  it("builds valid DefinedTermSet structured data for engineering glossary", () => {
    const data = buildDefinedTermSetStructuredData({
      name: "PowerLab Engineering Glossary",
      description: "Glossary of clean energy and electrical engineering terms.",
      route: "/glossary",
      terms: [
        {
          term: "Peukert's Exponent",
          definition: "Empirical coefficient characterizing battery capacity reduction at higher currents.",
          category: "battery",
          symbol: "k",
          unit: "dimensionless",
          sameAsWikidata: "https://www.wikidata.org/wiki/Q7179471",
        },
      ],
    });

    expect(data.length).toBe(3); // BreadcrumbList, WebPage, DefinedTermSet
    const termSet = data.find((item) => item["@type"] === "DefinedTermSet") as any;
    expect(termSet).toBeDefined();
    expect(termSet.name).toBe("PowerLab Engineering Glossary");
    expect(termSet.hasDefinedTerm.length).toBe(1);
    expect(termSet.hasDefinedTerm[0]["@type"]).toBe("DefinedTerm");
    expect(termSet.hasDefinedTerm[0].name).toBe("Peukert's Exponent");
    expect(termSet.hasDefinedTerm[0].sameAs).toBe("https://www.wikidata.org/wiki/Q7179471");
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
