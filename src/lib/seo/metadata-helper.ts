import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export type MetadataCategory = "solar" | "battery" | "home-energy" | "ev";

export interface PageMetadataOptions {
  title: string;
  description: string;
  canonicalPath: string;
  category?: MetadataCategory;
  isArticle?: boolean;
  ogImageAlt?: string;
  ogImageUrlOverride?: string;
  robotsIndex?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  canonicalPath,
  category,
  isArticle = false,
  ogImageAlt,
  ogImageUrlOverride,
  robotsIndex = true,
}: PageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${canonicalPath}`;
  const ogImageUrl =
    ogImageUrlOverride ||
    (category ? `${siteConfig.url}/${category}/opengraph-image` : `${siteConfig.url}/opengraph-image`);

  const displayTitle = title.includes(siteConfig.name) ? title : `${title} — ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    robots: {
      index: robotsIndex,
      follow: true,
    },
    openGraph: {
      title: displayTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: isArticle ? "article" : "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt || displayTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: [ogImageUrl],
    },
  };
}
