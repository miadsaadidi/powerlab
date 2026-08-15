type SiteUrlOptions = {
  configuredUrl?: string;
  projectProductionUrl?: string;
  deploymentUrl?: string;
};

const withProtocol = (value: string) => value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`;

export function resolveSiteUrl({ configuredUrl, projectProductionUrl, deploymentUrl }: SiteUrlOptions = {}) {
  return new URL(withProtocol(configuredUrl ?? projectProductionUrl ?? deploymentUrl ?? "http://localhost:3000")).toString();
}

export const siteConfig = {
  name: "Energy Planning Tools",
  description: "Transparent energy calculators for batteries, solar, home energy and EVs.",
  url: resolveSiteUrl({
    configuredUrl: process.env.NEXT_PUBLIC_SITE_URL,
    projectProductionUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    deploymentUrl: process.env.VERCEL_ENV === "production" ? process.env.VERCEL_URL : undefined,
  }),
} as const;
