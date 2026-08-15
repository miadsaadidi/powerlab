import type { Metadata } from "next";
import Link from "next/link";
import { SolarPanelTiltCalculator } from "@/components/calculator/solar-panel-tilt-calculator";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";

const isPublished = isCalculatorPublished("solar-panel-tilt");

export const metadata: Metadata = {
  title: "Solar Panel Tilt Calculator — Find the Best Angle",
  description: "Calculate a solar panel tilt starting point from your location, then compare roof angles with modeled annual and monthly solar production.",
  alternates: { canonical: "/solar/solar-panel-tilt-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: {
    title: "Solar Panel Tilt Calculator — Find the Best Angle",
    description: "Calculate a solar panel tilt starting point from your location, then compare roof angles with modeled annual and monthly solar production.",
  },
};

export default function SolarPanelTiltCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() },
      { "@type": "ListItem", position: 2, name: "Solar", item: new URL("/solar", siteConfig.url).toString() },
      { "@type": "ListItem", position: 3, name: "Solar Panel Tilt Calculator", item: new URL("/solar/solar-panel-tilt-calculator", siteConfig.url).toString() },
    ],
  };

  return <article className="page calculator-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/solar">Solar</Link><span aria-hidden="true">/</span><span>Solar Panel Tilt Calculator</span></nav>
    <p className="eyebrow">Solar planning</p>
    <h1>Solar Panel Tilt Calculator</h1>
    <p className="intro">Find a practical starting tilt for your solar panels from your latitude, then optionally compare your existing roof angle with a location-based production model.</p>
    <SolarPanelTiltCalculator />
    <section>
      <h2>What angle should solar panels be tilted?</h2>
      <p>A simple year-round starting estimate is the absolute value of your latitude. For example, a location at 34° north starts with a 34° panel tilt and a south-facing orientation. This is a planning starting point, not a universal optimum.</p>
    </section>
    <section>
      <h2>Solar panel angle by latitude</h2>
      <p>The calculator shows seasonal heuristics around the latitude starting point: 15° lower for summer and 15° higher for winter, clamped to a practical 0°–90° range. A location south of the equator uses the same tilt values but generally faces north toward the equator.</p>
      <div className="scenario-table" role="region" aria-label="Solar panel tilt examples"><table><caption>Illustrative solar panel tilt by latitude</caption><thead><tr><th scope="col">Latitude</th><th scope="col">Summer</th><th scope="col">Year-round</th><th scope="col">Winter</th><th scope="col">Equator-facing direction</th></tr></thead><tbody><tr><td>34° N</td><td>19°</td><td>34°</td><td>49°</td><td>South</td></tr><tr><td>33° S</td><td>18°</td><td>33°</td><td>48°</td><td>North</td></tr></tbody></table></div>
    </section>
    <section>
      <h2>Tilt versus azimuth</h2>
      <p>Tilt is the panel angle above horizontal. Azimuth is the compass direction the panels face. The quick estimate suggests an equator-facing direction, while the roof comparison lets you enter your actual roof tilt and orientation.</p>
    </section>
    <section>
      <h2>How to compare an existing roof angle</h2>
      <p>Turn on Compare my roof, enter the roof tilt and choose its orientation. The local result remains available immediately. When modeled comparison is used, both geometries keep the same system assumptions so the difference isolates the roof geometry as much as the model allows.</p>
    </section>
    <section>
      <h2>How the production comparison works</h2>
      <p>The optional comparison uses PVWatts V8 location-aware modeling with a normalized 1 kW system by default. It can show modeled annual and monthly AC production, but it is an estimate based on historical weather and system assumptions—not a guarantee of actual output.</p>
    </section>
    <section>
      <h2>How to improve the estimate</h2>
      <p>Use your actual latitude, roof tilt and azimuth, system size, known losses and inverter details. Shading, roof constraints, temperature, equipment and local weather can change the best practical setup.</p>
      <p>Read the <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link> for the calculation and model references.</p>
    </section>
  </article>;
}
