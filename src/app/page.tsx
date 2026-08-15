import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { publishedCalculators } from "@/lib/calculator-registry";

const calculatorCardContent: Record<string, { description: string; action: string }> = {
  "battery-runtime": { description: "Estimate how long a battery can power a device or group of appliances.", action: "Calculate Battery Runtime" },
  "solar-panel-tilt": { description: "Find a practical starting panel angle from your latitude, with optional roof-orientation comparison.", action: "Calculate Solar Panel Tilt" },
  "solar-panel-output": { description: "Estimate monthly and annual solar production for your location using system size and PVWatts assumptions.", action: "Calculate Solar Panel Output" },
  "electricity-usage": { description: "Estimate daily, monthly and annual electricity use from appliance power, schedules or energy-label values.", action: "Calculate Electricity Usage" },
  "battery-size": { description: "Estimate the battery capacity needed for a load and backup time, with reserve, efficiency and planning assumptions.", action: "Calculate Battery Size" },
  "ups-runtime": { description: "Estimate how long a UPS can support your equipment from battery energy and load watts.", action: "Calculate UPS Runtime" },
  "ev-charging-time": { description: "Estimate EV charging time from battery capacity, charge level and charger power.", action: "Calculate EV Charging Time" },
};

export const metadata: Metadata = {
  title: "Energy Calculators for Solar, Batteries, Home Energy & EVs",
  description: "Free practical energy calculators with transparent assumptions. Estimate battery runtime and solar panel tilt with no account required.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Energy Calculators for Solar, Batteries, Home Energy & EVs",
    description: "Free practical energy calculators for battery runtime and solar panel tilt, with transparent assumptions and no account required.",
  },
};

export default function HomePage() {
  const availableCalculators = publishedCalculators().filter((calculator) => calculatorCardContent[calculator.id]);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: "Free practical energy calculators with transparent assumptions.",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <section className="hero">
      <p className="eyebrow">Energy planning, made practical</p>
      <h1>Energy Calculators for Solar, Batteries, Home Energy &amp; EVs</h1>
      <p>Free practical calculators with transparent assumptions and no account required.</p>
    </section>
    <section className="section available-tool" aria-label="Available calculators">
      <p className="eyebrow">Available calculators</p>
      <div className="available-tool-cards">
        {availableCalculators.map((calculator) => {
          const content = calculatorCardContent[calculator.id];
          return <article className="card" key={calculator.id}>
            <h3>{calculator.name}</h3>
            <p>{content.description}</p>
            <Link className="button" href={calculator.route}>{content.action}</Link>
          </article>;
        })}
      </div>
    </section>
    <section className="section trust" aria-labelledby="why-use-heading">
      <h2 id="why-use-heading">Useful estimates you can inspect</h2>
      <div className="trust-grid">
        <article><h3>Transparent calculations</h3><p>See the battery energy, load and conversion assumptions that shape the estimate.</p></article>
        <article><h3>Editable defaults</h3><p>Common starting values make the calculator usable immediately, and every important value can be changed.</p></article>
        <article><h3>Private by default</h3><p>No account is required. Your saved calculator preferences stay in this browser.</p></article>
      </div>
      <p className="supporting-links"><Link href="/methodology">How estimates work</Link><span aria-hidden="true">·</span><Link href="/sources">Sources and review notes</Link></p>
    </section>
  </>;
}
