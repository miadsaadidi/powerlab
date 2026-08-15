import type { Metadata } from "next";
import Link from "next/link";
import { BatteryCapacityCalculator } from "@/components/calculator/battery-capacity-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";

const route = "/battery/battery-capacity-calculator";
const published = isCalculatorPublished("battery-capacity");

export const metadata: Metadata = {
  title: "Battery Capacity Calculator — Convert Ah, Wh & kWh",
  description: "Convert battery capacity between amp-hours, watt-hours and kWh using voltage, and estimate usable energy from state of charge, reserve and battery health.",
  alternates: { canonical: route },
  robots: { index: published, follow: true },
  openGraph: { title: "Battery Capacity Calculator — Convert Ah, Wh & kWh", description: "Convert Ah, Wh and kWh using battery voltage, then estimate usable energy with transparent SOC and health assumptions." },
};

export default function BatteryCapacityCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() },
      { "@type": "ListItem", position: 2, name: "Battery", item: new URL("/battery", siteConfig.url).toString() },
      { "@type": "ListItem", position: 3, name: "Battery Capacity Calculator", item: new URL(route, siteConfig.url).toString() },
    ],
  };

  return <article className="page calculator-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/battery">Battery</Link><span aria-hidden="true">/</span><span>Battery Capacity Calculator</span></nav>
    <p className="eyebrow">Battery planning</p>
    <h1>Battery Capacity Calculator</h1>
    <p className="intro">Convert Ah, mAh, Wh and kWh using battery voltage, then estimate usable energy from the SOC window and battery health. Start with a prefilled example and adjust the values you know.</p>
    <BatteryCapacityCalculator />
    <section><h2>Battery capacity calculator</h2><p>This calculator answers how much energy a battery stores from its charge capacity and voltage, or how many amp-hours correspond to known watt-hours. It also separates nominal capacity from the usable energy available within your chosen SOC window.</p></section>
    <section><h2>Ah to Wh calculation</h2><p>To convert amp-hours to watt-hours, multiply capacity in Ah by voltage: <code>Wh = Ah × V</code>. For example, 100 Ah at 12 V is 1,200 Wh, or 1.20 kWh.</p></section>
    <section><h2>Wh to Ah calculation</h2><p>To convert watt-hours to amp-hours, divide energy by voltage: <code>Ah = Wh ÷ V</code>. The same 1,200 Wh is 100 Ah at 12 V, 50 Ah at 24 V and 25 Ah at 48 V. These are equivalent charge values, not three battery recommendations.</p></section>
    <section><h2>mAh to Ah and battery kWh</h2><p>There are 1,000 milliamp-hours in one amp-hour, so 100,000 mAh equals 100 Ah. Divide watt-hours by 1,000 to express the same nominal energy in kWh.</p></section>
    <section><h2>Nominal versus usable battery capacity</h2><p>Nominal energy is the battery capacity before planning assumptions. Usable energy uses one SOC-window model: <code>usable energy = nominal energy × usable SOC window × battery health</code>. Starting charge and minimum charge define the SOC window; battery health separately represents remaining capacity relative to nominal/new capacity.</p></section>
    <section><h2>Battery capacity examples</h2><p>A 100 Ah, 12 V battery has 1,200 Wh nominal capacity. With a 100% starting charge, 20% minimum charge and 100% health, the usable estimate is 960 Wh. Ah cannot be converted to energy without voltage, and capacity conversion is separate from sizing a battery for a load and runtime.</p></section>
    <section><h2>Related battery calculators</h2><p>Use the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link> to estimate how long a known capacity may run a load, or use the <Link href="/battery/battery-size-calculator">Battery Size Calculator</Link> to calculate the capacity required for a load and desired runtime.</p></section>
  </article>;
}
