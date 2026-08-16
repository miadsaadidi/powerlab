import type { Metadata } from "next";
import Link from "next/link";
import { BatteryChargingTimeCalculator } from "@/components/calculator/battery-charging-time-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";

const route = "/battery/battery-charging-time-calculator";
const published = isCalculatorPublished("battery-charging-time");

export const metadata: Metadata = {
  title: "Battery Charging Time Calculator — Estimate Charge Time",
  description: "Estimate battery charging time from capacity, state of charge and charger output, with optional battery limits, efficiency and planning assumptions.",
  alternates: { canonical: route },
  robots: { index: published, follow: true },
  openGraph: {
    title: "Battery Charging Time Calculator — Estimate Charge Time",
    description: "Estimate how long a battery charge will take from capacity, SOC and charger output with transparent planning assumptions.",
  },
};

export default function BatteryChargingTimeCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() },
      { "@type": "ListItem", position: 2, name: "Battery", item: new URL("/battery", siteConfig.url).toString() },
      { "@type": "ListItem", position: 3, name: "Battery Charging Time Calculator", item: new URL(route, siteConfig.url).toString() },
    ],
  };

  return <article className="page calculator-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/battery">Battery</Link><span aria-hidden="true">/</span><span>Battery Charging Time Calculator</span></nav>
    <p className="eyebrow">Battery planning</p>
    <h1>Battery Charging Time Calculator</h1>
    <p className="intro">Estimate how long a battery charge may take from its capacity, starting and target charge, and the charger output available to the battery. Add an optional battery acceptance limit and transparent planning assumptions when you know them.</p>
    <BatteryChargingTimeCalculator />
    <section><h2>How to calculate battery charging time</h2><p>In amp-hour mode, the charge to add is battery capacity multiplied by the change in state of charge. Divide that charge in Ah by the effective charging current in A. In energy mode, divide the energy to add in Wh by the effective charger output in W.</p></section>
    <section><h2>Selected charger output versus effective rate</h2><p>The entered charger value represents the output delivered toward the battery. If the battery or BMS has a known maximum acceptance rate, the calculator applies that limit and shows the selected output separately from the effective charging rate.</p></section>
    <section><h2>Efficiency and planning overhead</h2><p>Battery charge efficiency is a planning assumption for the fraction of charging input that contributes to stored battery charge or energy. Planning overhead is a separate time allowance for behavior such as taper or absorption. Neither setting is a universal chemistry specification, and the calculator does not simulate a detailed CC/CV curve.</p></section>
    <section><h2>Why charging can slow near full</h2><p>The calculator uses a simplified constant-rate model plus an editable planning overhead. Real batteries and chargers may reduce current or power as the battery approaches a high state of charge, especially during absorption. This tool does not model a real CC/CV charging curve.</p></section>
    <section><h2>Lithium versus lead-acid planning estimates</h2><p>Chemistry changes planning defaults, not the underlying Ah, Wh or time formulas. The starter planning overhead is 1.05 for lithium and 1.15 for lead-acid. These are editable planning estimates, not universal specifications. Battery charge efficiency remains a separate assumption.</p></section>
    <section><h2>Worked planning example</h2><p>For a 100 Ah battery charging from 20% to 100% with a 20 A charger:</p><p><code>100 × (1.00 − 0.20) = 80 Ah</code><br /><code>80 Ah ÷ 20 A = 4 h ideal</code></p><p>With 99% battery charge efficiency and a 1.05 planning overhead: <code>4 ÷ 0.99 × 1.05 ≈ 4.24 h</code>, or approximately <strong>4 h 15 min</strong>. This is a planning example.</p></section>
    <section><h2>Limitations</h2><p>The actual charge rate may be limited by the battery or BMS, and charging may taper. Temperature can also affect charging behavior. Use manufacturer specifications when known. This is not a charger-selection, wiring, BMS-sizing or CC/CV simulation tool.</p></section>
    <section><h2>Voltage and charging time</h2><p>Ah divided by A and Wh divided by W already produce hours, so optional battery voltage does not change the primary charging-time estimate. Voltage is retained for compatible capacity conversions and explicit handoffs when it is known.</p></section>
    <section><h2>Related battery calculators</h2><p>Use the <Link href="/battery/battery-capacity-calculator">Battery Capacity Calculator</Link> to convert Ah, Wh and kWh, or use the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link> to estimate runtime after charging.</p></section>
  </article>;
}
