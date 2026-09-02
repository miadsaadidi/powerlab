import { siteConfig } from "../site-config";

export interface CalculatorFaq {
  question: string;
  answer: string;
}

export interface CalculatorHowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

export interface CalculatorStructuredDataProps {
  name: string;
  description: string;
  route: string;
  categoryName: string;
  categoryRoute: string;
  features?: string[];
  standards?: string[];
  faqs?: CalculatorFaq[];
  speakableSelectors?: string[];
  aboutEntities?: Array<{ name: string; sameAs: string }>;
  howToSteps?: CalculatorHowToStep[];
}

export const SHARED_AUTHORITY_SAME_AS = [
  "https://doi.org/10.6084/m9.figshare.33321774",
  "https://independent.academia.edu/PowerLabEngineering",
  "https://www.google.com/preferences/source?q=powelab.org",
  "https://www.trustpilot.com/review/powelab.org",
];

/**
 * Returns verified Wikidata Knowledge Graph entity triples for specific domains & tools
 */
export function getDomainWikidataEntities(categoryName: string, route: string): Array<{ "@type": string; name: string; sameAs: string }> {
  const normalizedCategory = categoryName.toLowerCase();
  const normalizedRoute = route.toLowerCase();

  const entities: Array<{ "@type": string; name: string; sameAs: string }> = [];

  // Universal Engineering & Standards entities
  entities.push(
    { "@type": "Thing", name: "National Electrical Code", sameAs: "https://www.wikidata.org/wiki/Q387431" },
    { "@type": "Thing", name: "IEEE", sameAs: "https://www.wikidata.org/wiki/Q131566" }
  );

  if (normalizedCategory.includes("solar") || normalizedRoute.includes("solar")) {
    entities.push(
      { "@type": "Thing", name: "Photovoltaics", sameAs: "https://www.wikidata.org/wiki/Q102927" },
      { "@type": "Thing", name: "Solar power", sameAs: "https://www.wikidata.org/wiki/Q40015" },
      { "@type": "Thing", name: "National Renewable Energy Laboratory", sameAs: "https://www.wikidata.org/wiki/Q1474245" },
      { "@type": "Thing", name: "Maximum power point tracking", sameAs: "https://www.wikidata.org/wiki/Q1892557" }
    );
  }

  if (normalizedCategory.includes("battery") || normalizedRoute.includes("battery") || normalizedRoute.includes("ups") || normalizedRoute.includes("inverter")) {
    entities.push(
      { "@type": "Thing", name: "Lithium-ion battery", sameAs: "https://www.wikidata.org/wiki/Q207604" },
      { "@type": "Thing", name: "Peukert's law", sameAs: "https://www.wikidata.org/wiki/Q7179471" },
      { "@type": "Thing", name: "Energy storage", sameAs: "https://www.wikidata.org/wiki/Q834129" },
      { "@type": "Thing", name: "Power inverter", sameAs: "https://www.wikidata.org/wiki/Q189871" }
    );
  }

  if (normalizedCategory.includes("ev") || normalizedRoute.includes("ev") || normalizedRoute.includes("v2l")) {
    entities.push(
      { "@type": "Thing", name: "Electric vehicle", sameAs: "https://www.wikidata.org/wiki/Q50949" },
      { "@type": "Thing", name: "Charging station", sameAs: "https://www.wikidata.org/wiki/Q1413813" },
      { "@type": "Thing", name: "SAE J1772", sameAs: "https://www.wikidata.org/wiki/Q1185440" },
      { "@type": "Thing", name: "Vehicle-to-grid", sameAs: "https://www.wikidata.org/wiki/Q1115867" }
    );
  }

  if (normalizedCategory.includes("home") || normalizedCategory.includes("energy") || normalizedRoute.includes("heat-pump") || normalizedRoute.includes("air-conditioner") || normalizedRoute.includes("generator")) {
    entities.push(
      { "@type": "Thing", name: "ASHRAE", sameAs: "https://www.wikidata.org/wiki/Q300649" },
      { "@type": "Thing", name: "ASHRAE 90.1", sameAs: "https://www.wikidata.org/wiki/Q4653775" },
      { "@type": "Thing", name: "Thermodynamics", sameAs: "https://www.wikidata.org/wiki/Q134147" },
      { "@type": "Thing", name: "Heat pump", sameAs: "https://www.wikidata.org/wiki/Q131313" },
      { "@type": "Thing", name: "Inrush current", sameAs: "https://www.wikidata.org/wiki/Q1341014" },
      { "@type": "Thing", name: "Air conditioning", sameAs: "https://www.wikidata.org/wiki/Q179172" }
    );
  }

  return entities;
}

export function buildCalculatorStructuredData({
  name,
  description,
  route,
  categoryName,
  categoryRoute,
  features,
  standards,
  faqs,
  speakableSelectors,
  aboutEntities,
  howToSteps,
}: CalculatorStructuredDataProps) {
  const pageUrl = new URL(route, siteConfig.url).toString();
  const categoryUrl = new URL(categoryRoute, siteConfig.url).toString();

  const organization = {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: "PowerLab Engineering & Energy Modeling Team",
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: new URL("/icon.svg", siteConfig.url).toString(),
    },
    sameAs: SHARED_AUTHORITY_SAME_AS,
  };

  const entities = aboutEntities && aboutEntities.length > 0
    ? aboutEntities.map((e) => ({ "@type": "Thing", name: e.name, sameAs: e.sameAs }))
    : getDomainWikidataEntities(categoryName, route);

  const data: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() },
        { "@type": "ListItem", position: 2, name: categoryName, item: categoryUrl },
        { "@type": "ListItem", position: 3, name, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name,
      description,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
      },
      breadcrumb: {
        "@id": `${pageUrl}#breadcrumb`,
      },
      mainEntity: {
        "@id": `${pageUrl}#webapp`,
      },
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: speakableSelectors && speakableSelectors.length > 0
          ? speakableSelectors
          : [".direct-answer-card", ".direct-answer-card p", "h1"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": ["WebApplication", "SoftwareApplication", "MathSolver", "LearningResource"],
      "@id": `${pageUrl}#webapp`,
      name,
      description,
      url: pageUrl,
      inLanguage: "en-US",
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "Energy & Electrical Planning",
      operatingSystem: "All (Modern Web Browsers, iOS, Android, macOS, Windows)",
      browserRequirements: "Requires JavaScript. Requires HTML5 Canvas/SVG.",
      isAccessibleForFree: true,
      softwareVersion: "2.1.0",
      author: organization,
      publisher: organization,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      about: entities,
      ...(features && features.length > 0 ? { featureList: features } : {}),
      ...(standards && standards.length > 0 ? { isBasedOn: standards, citation: standards } : {}),
    },
  ];

  if (faqs && faqs.length > 0) {
    data.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question.trim(),
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer.trim(),
        },
      })),
    });
  }

  if (howToSteps && howToSteps.length > 0) {
    data.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "@id": `${pageUrl}#howto`,
      name: `How to Calculate ${name}`,
      description: `Step-by-step engineering calculation process for ${name}.`,
      totalTime: "PT2M",
      step: howToSteps.map((step, idx) => ({
        "@type": "HowToStep",
        position: idx + 1,
        name: step.name,
        text: step.text,
        url: step.url || `${pageUrl}#step-${idx + 1}`,
      })),
    });
  }

  return data;
}

export interface CategoryHubStructuredDataProps {
  categoryName: string;
  categoryRoute: string;
  description: string;
  title?: string;
  tools: Array<{ name: string; route: string; description?: string }>;
}

export function buildCategoryHubStructuredData({
  categoryName,
  categoryRoute,
  description,
  title,
  tools,
}: CategoryHubStructuredDataProps) {
  const categoryUrl = new URL(categoryRoute, siteConfig.url).toString();

  const organization = {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: "PowerLab Engineering & Energy Modeling Team",
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: new URL("/icon.svg", siteConfig.url).toString(),
    },
    sameAs: SHARED_AUTHORITY_SAME_AS,
  };

  const collectionTitle = title || `${categoryName} Planning Calculators`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${categoryUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() },
        { "@type": "ListItem", position: 2, name: categoryName, item: categoryUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${categoryUrl}#collection`,
      name: collectionTitle,
      description,
      url: categoryUrl,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
      },
      publisher: organization,
      about: getDomainWikidataEntities(categoryName, categoryRoute),
      mainEntity: {
        "@type": "ItemList",
        name: collectionTitle,
        numberOfItems: tools.length,
        itemListElement: tools.map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: tool.name,
          url: new URL(tool.route, siteConfig.url).toString(),
          ...(tool.description ? { description: tool.description } : {}),
        })),
      },
    },
  ];
}

export function buildWebSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: "PowerLab Engineering & Energy Modeling Team",
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: new URL("/icon.svg", siteConfig.url).toString(),
      },
      sameAs: SHARED_AUTHORITY_SAME_AS,
    },
  };
}

export interface GuideStructuredDataProps {
  title: string;
  description: string;
  route: string;
  datePublished: string;
  dateModified: string;
  categoryName?: string;
  categoryRoute?: string;
  standards?: string[];
  faqs?: CalculatorFaq[];
  speakableSelectors?: string[];
  aboutEntities?: Array<{ name: string; sameAs: string }>;
}

export function buildGuideStructuredData({
  title,
  description,
  route,
  datePublished,
  dateModified,
  categoryName = "Educational Guides",
  categoryRoute = "/guides",
  standards,
  faqs,
  speakableSelectors,
  aboutEntities,
}: GuideStructuredDataProps) {
  const pageUrl = new URL(route, siteConfig.url).toString();
  const categoryUrl = new URL(categoryRoute, siteConfig.url).toString();

  const organization = {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: "PowerLab Engineering & Energy Modeling Team",
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: new URL("/icon.svg", siteConfig.url).toString(),
    },
    sameAs: SHARED_AUTHORITY_SAME_AS,
  };

  const entities = aboutEntities && aboutEntities.length > 0
    ? aboutEntities.map((e) => ({ "@type": "Thing", name: e.name, sameAs: e.sameAs }))
    : getDomainWikidataEntities(categoryName, route);

  const data: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() },
        { "@type": "ListItem", position: 2, name: categoryName, item: categoryUrl },
        { "@type": "ListItem", position: 3, name: title, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": ["TechArticle", "Article", "LearningResource"],
      "@id": `${pageUrl}#article`,
      headline: title,
      description,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      inLanguage: "en-US",
      datePublished,
      dateModified,
      author: organization,
      publisher: organization,
      proficiencyLevel: "Professional",
      audience: {
        "@type": "Audience",
        audienceType: "Electrical Engineers, Energy Modelers, Contractors, Homeowners",
      },
      about: entities,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: speakableSelectors && speakableSelectors.length > 0
          ? speakableSelectors
          : [".direct-answer-card", ".direct-answer-card p", "h1"],
      },
      isPartOf: {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
      },
      ...(standards && standards.length > 0 ? { isBasedOn: standards, citation: standards } : {}),
    },
  ];

  if (faqs && faqs.length > 0) {
    data.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question.trim(),
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer.trim(),
        },
      })),
    });
  }

  return data;
}

export interface DefinedTermItem {
  term: string;
  definition: string;
  category: string;
  symbol?: string;
  unit?: string;
  sameAsWikidata?: string;
}

export interface DefinedTermSetStructuredDataProps {
  name: string;
  description: string;
  route: string;
  terms: DefinedTermItem[];
}

export function buildDefinedTermSetStructuredData({
  name,
  description,
  route,
  terms,
}: DefinedTermSetStructuredDataProps) {
  const pageUrl = new URL(route, siteConfig.url).toString();

  const organization = {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: "PowerLab Engineering & Energy Modeling Team",
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: new URL("/icon.svg", siteConfig.url).toString(),
    },
    sameAs: SHARED_AUTHORITY_SAME_AS,
  };

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() },
        { "@type": "ListItem", position: 2, name, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name,
      description,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      "@id": `${pageUrl}#termset`,
      name,
      description,
      url: pageUrl,
      publisher: organization,
      hasDefinedTerm: terms.map((t) => ({
        "@type": "DefinedTerm",
        name: t.term,
        description: t.definition,
        termCode: t.symbol || t.term,
        inDefinedTermSet: `${pageUrl}#termset`,
        ...(t.sameAsWikidata ? { sameAs: t.sameAsWikidata } : {}),
      })),
    },
  ];
}
