import type { Metadata } from "next";
import Link from "next/link";
import { EnergyBillCalculator } from "@/components/calculator/energy-bill-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Energy Bill Calculator — Estimate Electricity Cost",
  description: "Estimate an electricity bill from kWh usage and your own electricity price. Add optional fixed charges and tax without relying on an outdated tariff database.",
  alternates: { canonical: "/home-energy/energy-bill-calculator" },
  robots: { index: isCalculatorPublished("energy-bill"), follow: true },
  openGraph: { title: "Energy Bill Calculator — Estimate Electricity Cost", description: "Estimate an electricity bill from kWh usage and your own electricity price." },
};

export default function EnergyBillCalculatorPage() {
  const structuredData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() }, { "@type": "ListItem", position: 2, name: "Home Energy", item: new URL("/home-energy", siteConfig.url).toString() }, { "@type": "ListItem", position: 3, name: "Energy Bill Calculator", item: new URL("/home-energy/energy-bill-calculator", siteConfig.url).toString() }] };
  return <article className="page calculator-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/home-energy">Home Energy</Link><span aria-hidden="true">/</span><span>Energy Bill Calculator</span></nav>
    <p className="eyebrow">Home energy planning</p><h1>Energy Bill Calculator</h1>
    <p className="intro">Estimate an electricity bill from the usage for this bill or two meter readings, your price per kWh and optional fixed, standing and tax charges. The calculation is local and uses the assumptions you enter.</p>
    <EnergyBillCalculator />
    <section><h2>How to calculate an electricity bill</h2><p>Multiply energy used in kWh by your price per kWh, then add the fixed charge for this bill and any daily standing charge. Tax is applied to the subtotal using the effective percentage you enter.</p><p><strong>Energy charge = kWh × price per kWh</strong></p></section>
    <section><h2>Usage for this bill and meter readings</h2><p>Use Usage for this bill when you already know the energy used during the selected billing period. In meter-reading mode, the calculator subtracts the previous reading from the current reading. Equal readings are valid and mean zero energy usage.</p></section>
    <section><h2>Annualized run-rate estimate</h2><p>The annual figure divides this bill&apos;s energy and total cost by its billing days, then multiplies by 365. It assumes the same daily usage, prices and charges continue. It is a run-rate estimate, not an expected annual bill; seasonal usage and tariff changes are not modeled.</p></section>
    <section><h2>Fixed charges and taxes</h2><p>Fixed charge for this bill and daily standing charge are entered for the selected period. Tax is a simplified user-entered assumption: actual utility taxes and fees may apply to different bill components.</p></section>
    <section><h2>Why your utility bill may differ</h2><p>This calculator does not look up tariffs or model time-of-use, tiered, demand or net-metering rules. Use your actual bill and supplier information when available. The what-if comparison changes energy usage only; fixed and standing assumptions remain unchanged.</p></section>
    <section><h2>Related home energy calculators</h2><p>Use the <Link href="/home-energy/electricity-usage-calculator">Electricity Usage Calculator</Link> to estimate appliance-driven consumption. The handoff passes only the entered electricity rate and display currency; it does not invent appliance rows or schedules.</p></section>
  </article>;
}
