import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getPublishedCalculatorsForCategory, isCategoryPublished } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Home Energy Calculators",
  description: "Estimate household electricity use with practical, transparent home energy calculators.",
  alternates: { canonical: "/home-energy" },
  openGraph: { title: "Home Energy Calculators", description: "Estimate household electricity use with practical, transparent home energy calculators." },
};

const toolDescriptions: Record<string, string> = {
  "electricity-usage": "Estimate daily, monthly and annual electricity use from appliance power, schedules, cycles or energy-label values.",
  "energy-bill": "Estimate an electricity bill from your usage, electricity price and optional fixed or standing charges.",
};

export default function HomeEnergyHub() {
  if (!isCategoryPublished("home-energy")) notFound();
  const tools = getPublishedCalculatorsForCategory("home-energy").filter((calculator) => toolDescriptions[calculator.id]);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() },
      { "@type": "ListItem", position: 2, name: "Home Energy", item: new URL("/home-energy", siteConfig.url).toString() },
    ],
  };

  return <section className="page battery-hub">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Home Energy</span></nav>
    <p className="eyebrow">Home energy planning</p>
    <h1>Home Energy Calculators</h1>
    <p className="intro">Estimate household electricity use with editable assumptions and clear results.</p>
    <section aria-labelledby="home-energy-tools-heading"><h2 id="home-energy-tools-heading">Available tools</h2><div className="available-tool-cards">{tools.map((tool) => <article className="card" key={tool.id}><h3>{tool.name}</h3><p>{toolDescriptions[tool.id]}</p><Link className="button" href={tool.route}>Open {tool.name}</Link></article>)}</div></section>
    <section className="hub-support" aria-labelledby="home-energy-method-heading"><h2 id="home-energy-method-heading">Understand your estimate</h2><p>Review the <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link> to see how assumptions are used.</p></section>
  </section>;
}
