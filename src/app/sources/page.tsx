import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sources",
  description: "Reference sources used to maintain Energy Planning Tools calculator methods and editable planning defaults.",
  alternates: { canonical: "/sources" },
  openGraph: { title: "Sources", description: "Reference sources used to maintain Energy Planning Tools methods and defaults." },
};

const reviewDate = "14 August 2026";

export default function SourcesPage() {
  return <article className="page reading-page">
    <p className="eyebrow">Reference notes</p><h1>Sources</h1>
    <p className="intro">These sources inform calculator methodology and editable planning defaults. They do not turn a generic preset into a product-specific specification; your device documentation and measurements take priority.</p>
    <section><h2>Battery calculations</h2><div className="source-list"><article><h3>Victron Energy</h3><p>Reference guidance for Peukert behavior, charge efficiency and battery-monitor assumptions.</p><a href="https://www.victronenergy.com/media/pg/SmartShunt/en/configuration.html" rel="noreferrer">View SmartShunt configuration guidance</a></article><article><h3>Trojan Battery</h3><p>Reference context for lead-acid depth of discharge and battery-care considerations.</p><a href="https://www.trojanbattery.com/resources/battery-maintenance" rel="noreferrer">View Trojan Battery maintenance guidance</a></article></div></section>
    <section><h2>Solar modeling</h2><div className="source-list"><article><h3>National Laboratory of the Rockies — PVWatts V8</h3><p>Used for the PVWatts production-model contract, input parameters and output definitions when location-aware solar modeling is relevant.</p><a href="https://developer.nlr.gov/docs/solar/pvwatts/v8/" rel="noreferrer">View PVWatts V8 documentation</a></article></div></section>
    <section><h2>EV charging</h2><div className="source-list"><article><h3>U.S. Department of Energy — AFDC</h3><p>Used for broad charging-power context and public EV charging reference material.</p><a href="https://afdc.energy.gov/fuels/electricity-stations" rel="noreferrer">View Alternative Fuels Data Center</a></article><article><h3>ENERGY STAR</h3><p>Used for general charger-efficiency context. Actual efficiency varies by equipment and vehicle.</p><a href="https://www.energystar.gov/products/ev_chargers" rel="noreferrer">View ENERGY STAR EV charger information</a></article></div></section>
    <section><h2>Home energy and appliance methodology</h2><div className="source-list"><article><h3>U.S. Energy Information Administration</h3><p>Used for broad residential electricity-use context.</p><a href="https://www.eia.gov/energyexplained/use-of-energy/electricity-use-in-homes.php" rel="noreferrer">View EIA residential electricity overview</a></article><article><h3>ENERGY STAR Product Finder</h3><p>Supports the principle that measured, nameplate and energy-label values are more useful than a generic appliance estimate when available.</p><a href="https://www.energystar.gov/productfinder/" rel="noreferrer">View ENERGY STAR Product Finder</a></article></div></section>
    <section><h2>Review date</h2><p>Documentation and approved references last reviewed: <time dateTime="2026-08-14">{reviewDate}</time>. <Link href="/methodology">Read how these sources inform the calculator methodology</Link>.</p></section>
  </article>;
}
