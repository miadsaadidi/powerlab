import type { Metadata } from "next";
import Link from "next/link";
import { BatterySizeCalculator } from "@/components/calculator/battery-size-calculator";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";

export const metadata: Metadata = {
  title: "Battery Size Calculator — kWh & Ah for Backup Power",
  description: "Calculate the battery size needed for a load and backup time. Estimate minimum and recommended kWh and Ah with reserve, efficiency and battery-health assumptions.",
  alternates: { canonical: "/battery/battery-size-calculator" },
  robots: { index: isCalculatorPublished("battery-size"), follow: true },
  openGraph: { title: "Battery Size Calculator — kWh & Ah for Backup Power", description: "Calculate the battery size needed for a load and backup time with transparent reserve, efficiency and health assumptions." },
};

export default function BatterySizeCalculatorPage() {
  const structuredData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() }, { "@type": "ListItem", position: 2, name: "Battery", item: new URL("/battery", siteConfig.url).toString() }, { "@type": "ListItem", position: 3, name: "Battery Size Calculator", item: new URL("/battery/battery-size-calculator", siteConfig.url).toString() }] };
  return <article className="page calculator-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/battery">Battery</Link><span aria-hidden="true">/</span><span>Battery Size Calculator</span></nav>
    <p className="eyebrow">Battery planning</p><h1>Battery Size Calculator</h1>
    <p className="intro">Estimate the battery capacity needed to power a known load for a target backup time. Enter your load and runtime, then adjust reserve, efficiency, battery health and planning margin when you know more.</p>
    <BatterySizeCalculator />
    <section><h2>How to size a battery for backup power</h2><p>Battery sizing starts with the energy your load needs over time. The calculator accounts for conversion losses, the usable state-of-charge window, battery health and a planning margin before showing a recommended nominal battery size.</p></section>
    <section><h2>Battery kWh vs Ah</h2><p>Watt-hours describe stored energy, while amp-hours describe charge at a specified voltage. The recommended kWh does not change when voltage changes; the Ah equivalent does. That is why the calculator shows your selected system voltage separately.</p></section>
    <section><h2>Battery size formula</h2><p>Load energy equals average watts multiplied by runtime hours. Conversion-adjusted energy is divided by the usable SOC window and battery health, then the planning margin is applied. AC and DC appliance rows use their own conversion efficiencies.</p></section>
    <section><h2>Reserve, usable SOC and battery health</h2><p>The usable SOC window is starting charge minus minimum remaining charge. These values are used once as one SOC-window calculation; reserve and depth of discharge are not double-counted.</p></section>
    <section><h2>How inverter efficiency affects battery size</h2><p>AC loads require battery-side energy equal to device energy divided by inverter efficiency. Direct DC loads use the entered DC conversion efficiency instead. This calculator accounts for losses but does not size an inverter.</p></section>
    <section><h2>LiFePO4 and lead-acid assumptions</h2><p>LiFePO4 and lithium-ion start with a 20% minimum charge preset. AGM, gel and flooded lead-acid start with 50%. These are editable planning defaults, not product specifications; a value you customize remains under your control when chemistry changes.</p></section>
    <section><h2>Worked example</h2><p>With a 500 W AC load for 4 hours, 90% inverter efficiency, a 20% reserve and a 10% planning margin, the result is approximately 3.06 kWh recommended nominal capacity. At 24 V, that is about 127 Ah.</p></section>
    <section><h2>Limitations and methodology</h2><p>Capacity is only one part of battery selection. Confirm that the battery, BMS and inverter can support your required continuous and peak power using manufacturer specifications. Read the <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link> for broader calculation and reference guidance.</p></section>
    <section><h2>Related battery calculators</h2><p>After sizing a battery, use the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link> to verify how long a proposed capacity may run your load.</p></section>
  </article>;
}
