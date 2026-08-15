import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isCategoryPublished } from "@/lib/navigation";
import { getPublishedCalculatorsForCategory } from "@/lib/navigation";

const solarToolContent: Record<string, string> = {
  "solar-panel-tilt": "Find a latitude-based starting panel angle, then compare your roof geometry with modeled production when available.",
  "solar-panel-output": "Estimate monthly and annual solar production for your location using system size and editable PVWatts assumptions.",
};

export const metadata: Metadata = {
  title: "Solar Calculators",
  description: "Solar planning tools from Energy Planning Tools.",
  alternates: { canonical: "/solar" },
  openGraph: { title: "Solar Calculators", description: "Solar planning tools with transparent assumptions." },
};

export default function SolarHub() {
  if (!isCategoryPublished("solar")) notFound();
  const tools = getPublishedCalculatorsForCategory("solar").filter((calculator) => solarToolContent[calculator.id]);
  const structuredData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() },
    { "@type": "ListItem", position: 2, name: "Solar", item: new URL("/solar", siteConfig.url).toString() },
  ] };
  return <section className="page battery-hub">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Solar</span></nav>
    <p className="eyebrow">Solar planning</p>
    <h1>Solar Calculators</h1>
    <p className="intro">Estimate practical solar angles and production assumptions with transparent, editable inputs.</p>
    <section aria-labelledby="solar-tools-heading"><h2 id="solar-tools-heading">Available tools</h2><div className="available-tool-cards">{tools.map((tool) => <article className="card" key={tool.id}><h3>{tool.name}</h3><p>{solarToolContent[tool.id]}</p><Link className="button" href={tool.route}>Open {tool.name}</Link></article>)}</div></section>
    <section className="hub-support" aria-labelledby="solar-method-heading"><h2 id="solar-method-heading">Understand the estimate</h2><p>The local tilt guidance is instant and remains useful without a production model. Read the <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link> for calculation and modeling details.</p></section>
  </section>;
}
