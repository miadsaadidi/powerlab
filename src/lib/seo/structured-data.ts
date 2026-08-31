import { siteConfig } from "../site-config";

export interface CalculatorFaq {
  question: string;
  answer: string;
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
    sameAs: [
      "https://www.trustpilot.com/review/powelab.org",
      "https://doi.org/10.6084/m9.figshare.33321774",
    ],
  };

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
      "@type": ["WebApplication", "SoftwareApplication"],
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
    sameAs: [
      "https://www.trustpilot.com/review/powelab.org",
      "https://doi.org/10.6084/m9.figshare.33321774",
    ],
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
      sameAs: [
        "https://www.trustpilot.com/review/powelab.org",
        "https://doi.org/10.6084/m9.figshare.33321774",
      ],
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
    sameAs: [
      "https://www.trustpilot.com/review/powelab.org",
      "https://doi.org/10.6084/m9.figshare.33321774",
    ],
  };

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
      "@type": ["TechArticle", "Article"],
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

