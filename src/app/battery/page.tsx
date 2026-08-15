import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getPublishedCalculatorsForCategory, isCategoryPublished } from "@/lib/navigation";

const batteryToolContent: Record<string, string> = {
  "battery-runtime": "Estimate how long your battery can power a load, with editable reserve, battery health and efficiency assumptions.",
  "battery-size": "Estimate the battery capacity needed for a load and backup time, with clear planning assumptions.",
  "battery-capacity": "Convert Ah, mAh, Wh and kWh using voltage, then estimate usable battery energy.",
  "ups-runtime": "Estimate how long a UPS can support your equipment from usable battery energy and load watts.",
};

export const metadata: Metadata = {
  title: "Battery Calculators",
  description: "Estimate battery capacity, runtime and backup needs using transparent assumptions.",
  alternates: { canonical: "/battery" },
  openGraph: { title: "Battery Calculators", description: "Estimate battery capacity, runtime and backup needs using transparent assumptions." },
};

export default function BatteryHub() {
  if (!isCategoryPublished("battery")) notFound();
  const tools = getPublishedCalculatorsForCategory("battery").filter((calculator) => batteryToolContent[calculator.id]);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() },
      { "@type": "ListItem", position: 2, name: "Battery", item: new URL("/battery", siteConfig.url).toString() },
    ],
  };

  return <section className="page battery-hub">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Battery</span></nav>
    <p className="eyebrow">Battery</p>
    <h1>Battery Calculators</h1>
    <p className="intro">Estimate battery capacity, runtime and backup needs using transparent assumptions.</p>
    <section aria-labelledby="battery-tools-heading"><h2 id="battery-tools-heading">Available tools</h2><div className="available-tool-cards">{tools.map((tool) => <article className="card" key={tool.id}><h3>{tool.name}</h3><p>{batteryToolContent[tool.id]}</p><Link className="button" href={tool.route}>Open {tool.name}</Link></article>)}</div></section>
    <section className="hub-support" aria-labelledby="battery-method-heading"><h2 id="battery-method-heading">Plan with the details that matter</h2><p>Use the battery&apos;s actual Wh or Ah rating, appliance load and reserve settings for the most useful estimate. The calculator explains each assumption so you can refine it when you know more.</p><p><Link href="/methodology">Read the methodology</Link> or <Link href="/sources">review the sources</Link>.</p></section>
  </section>;
}
