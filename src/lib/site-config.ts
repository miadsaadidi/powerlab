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
  name: "PowerLab",
  description: "Transparent engineering calculators for batteries, solar PV, home energy and EVs.",
  url: "https://www.powelab.org",
} as const;


