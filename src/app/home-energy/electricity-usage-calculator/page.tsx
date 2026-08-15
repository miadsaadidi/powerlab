import type { Metadata } from "next";
import Link from "next/link";
import { ElectricityUsageCalculator } from "@/components/calculator/electricity-usage-calculator";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";

export const metadata: Metadata = {
  title: "Electricity Usage Calculator — kWh by Appliance & Home",
  description: "Estimate daily, monthly and annual electricity use from appliance watts, schedules, cycles or energy-label values with editable assumptions.",
  alternates: { canonical: "/home-energy/electricity-usage-calculator" },
  robots: { index: isCalculatorPublished("electricity-usage"), follow: true },
  openGraph: { title: "Electricity Usage Calculator — kWh by Appliance & Home", description: "Estimate daily, monthly and annual electricity use from appliance watts, schedules, cycles or energy-label values." },
};

export default function ElectricityUsageCalculatorPage() {
  const structuredData = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() }, { "@type": "ListItem", position: 2, name: "Home Energy", item: new URL("/home-energy", siteConfig.url).toString() }, { "@type": "ListItem", position: 3, name: "Electricity Usage Calculator", item: new URL("/home-energy/electricity-usage-calculator", siteConfig.url).toString() }] };
  return <article className="page calculator-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/home-energy">Home Energy</Link><span aria-hidden="true">/</span><span>Electricity Usage Calculator</span></nav>
    <p className="eyebrow">Home energy planning</p><h1>Electricity Usage Calculator</h1>
    <p className="intro">Estimate how much electricity an appliance or group of appliances uses each day, month and year. Start with a practical preset, then adjust the schedule or enter an energy-label value.</p>
    <ElectricityUsageCalculator />
    <section><h2>How to calculate electricity usage</h2><p>For power-based estimates, watts × hours per day × days per week × duty cycle gives weekly energy. The calculator then normalizes that result to 365.25 days for daily, monthly and annual views.</p></section>
    <section><h2>Watts to kWh</h2><p>Divide watt-hours by 1,000 to convert to kilowatt-hours. A 100 W television used for four hours per day, seven days per week uses 2.8 kWh per week, or about 146.1 kWh per year.</p></section>
    <section><h2>Using cycles and energy labels</h2><p>Use energy per cycle when a device provides a measured cycle value. Energy-label values are authoritative: the calculator applies quantity, then derives the other time periods without applying a second wattage or schedule assumption.</p></section>
    <section><h2>How much electricity does your home use?</h2><p>Build a list of appliances to total daily, monthly and annual consumption. The ranked contributor list highlights where the estimate is concentrated without pretending that preset wattages are product specifications.</p></section>
    <section><h2>Improve estimate accuracy</h2><p>Replace presets with measured or nameplate values and your actual usage schedule. Cycling loads such as refrigerators can be represented with a duty cycle. Read the <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link> for the calculation approach and limitations.</p></section>
  </article>;
}
