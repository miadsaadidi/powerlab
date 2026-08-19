import { siteConfig } from "@/lib/site-config";

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
  faqs?: CalculatorFaq[];
}

export function buildCalculatorStructuredData({
  name,
  description,
  route,
  categoryName,
  categoryRoute,
  features,
  faqs,
}: CalculatorStructuredDataProps) {
  const pageUrl = new URL(route, siteConfig.url).toString();
  const categoryUrl = new URL(categoryRoute, siteConfig.url).toString();

  const organization = {
    "@type": "Organization",
    name: "PowerLab Engineering & Energy Modeling Team",
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: new URL("/icon.svg", siteConfig.url).toString(),
    },
  };

  const data: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() },
        { "@type": "ListItem", position: 2, name: categoryName, item: categoryUrl },
        { "@type": "ListItem", position: 3, name, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": ["WebApplication", "SoftwareApplication"],
      name,
      description,
      url: pageUrl,
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "Energy & Electrical Planning",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      isAccessibleForFree: true,
      softwareVersion: "2.1.0",
      author: organization,
      publisher: organization,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      ...(features && features.length > 0 ? { featureList: features } : {}),
    },
  ];

  if (faqs && faqs.length > 0) {
    data.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
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
  tools: Array<{ name: string; route: string; description?: string }>;
}

export function buildCategoryHubStructuredData({
  categoryName,
  categoryRoute,
  description,
  tools,
}: CategoryHubStructuredDataProps) {
  const categoryUrl = new URL(categoryRoute, siteConfig.url).toString();

  const organization = {
    "@type": "Organization",
    name: "PowerLab Engineering Team",
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: new URL("/icon.svg", siteConfig.url).toString(),
    },
  };

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() },
        { "@type": "ListItem", position: 2, name: categoryName, item: categoryUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${categoryName} Planning Calculators`,
      description,
      url: categoryUrl,
      publisher: organization,
      mainEntity: {
        "@type": "ItemList",
        name: `${categoryName} Planning Calculators`,
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



