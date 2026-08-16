import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedCalculatorsForCategory, isCategoryPublished } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "EV Calculators",
  description: "EV planning tools from Energy Planning Tools.",
  robots: { index: isCategoryPublished("ev"), follow: true },
};

export default function EvHub() {
  if (!isCategoryPublished("ev")) notFound();
  const tools = getPublishedCalculatorsForCategory("ev");
  const structuredData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() },
    { "@type": "ListItem", position: 2, name: "EV", item: new URL("/ev", siteConfig.url).toString() },
  ] };
  return <section className="page battery-hub">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>EV</span></nav>
    <p className="eyebrow">EV planning</p><h1>EV Calculators</h1>
    <p className="intro">Estimate practical EV charging requirements with clear, editable assumptions.</p>
    <section aria-labelledby="ev-tools-heading"><h2 id="ev-tools-heading">Available tools</h2><div className="available-tool-cards">{tools.map((tool) => <article className="card" key={tool.id}><h3>{tool.name}</h3><p>{tool.id === "ev-charging-cost" ? "Estimate charging cost from battery energy, driving consumption and your electricity price." : "Estimate charging time from battery capacity, charge levels and charger power."}</p><Link className="button" href={tool.route}>Open {tool.name}</Link></article>)}</div></section>
  </section>;
}
