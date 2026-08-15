import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methodology",
  description: "Learn how Energy Planning Tools calculates estimates, uses editable presets, rounds results and protects local inputs.",
  alternates: { canonical: "/methodology" },
  openGraph: { title: "Methodology", description: "How Energy Planning Tools calculates transparent, editable planning estimates." },
};

export default function MethodologyPage() {
  return <article className="page reading-page">
    <p className="eyebrow">How estimates work</p><h1>Methodology</h1>
    <p className="intro">Our calculators use transparent formulas and show the inputs that materially affect each estimate. They are planning tools, not a substitute for a device manual, measurement or professional installation advice.</p>
    <section><h2>How our calculators work</h2><p>Each calculator applies a documented formula to the values you enter. The result is derived from those values and any clearly labeled preset, rather than generated as a guess.</p></section>
    <section><h2>User inputs and presets</h2><p>Your entered values take priority. Presets only make a calculator useful from the first visit; they remain editable because battery condition, appliances and equipment vary.</p></section>
    <section><h2>Units and conversions</h2><p><strong>Wh</strong> and <strong>kWh</strong> describe energy, while <strong>W</strong> describes power. <strong>Ah</strong> describes charge capacity, so voltage is needed to convert it to energy: <code>Wh = Ah × V</code>. Runtime is calculated in hours and rounded for clear display.</p></section>
    <section><h2>Battery assumptions</h2><p>Battery runtime uses the available charge window, battery health and the load drawn from the battery. AC appliances account for inverter efficiency; direct DC loads use the DC efficiency setting. Peukert behavior is kept optional because a precise correction needs battery-rating data that a quick estimate should not invent.</p></section>
    <section><h2>Solar estimates</h2><p>The Solar Panel Tilt Calculator gives an instant latitude-based starting estimate. Its optional production comparison uses location-aware PVWatts modeling. A model result is kept distinct from a local planning estimate, and no production value is invented when model data is unavailable.</p></section>
    <section><h2>Result rounding and real-world variation</h2><p>Calculations retain full precision internally and round only for readability. Actual performance can differ because of battery condition, temperature, device behavior, inverter losses, cycling loads and manufacturer variation.</p></section>
    <section><h2>Data and privacy</h2><p>No account is required. Inputs are processed locally where possible, and local preferences may be stored in your browser so a later visit can start with your own settings.</p></section>
    <section><h2>Review and sources</h2><p>We review approved reference material when calculator methodology changes. <Link href="/sources">Read the source notes and review dates</Link>.</p></section>
  </article>;
}
