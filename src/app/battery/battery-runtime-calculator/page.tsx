import type { Metadata } from "next";
import Link from "next/link";
import { BatteryRuntimeCalculator } from "@/components/calculator/battery-runtime-calculator";
import { calculateBatteryRuntime } from "@/lib/calculators/battery-runtime/engine";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Battery Runtime Calculator — Estimate Backup Time",
  description: "Estimate battery runtime from Wh or Ah, voltage, load, state of charge, reserve and inverter efficiency. See usable energy, assumptions and runtime scenarios.",
  alternates: { canonical: "/battery/battery-runtime-calculator" },
  openGraph: {
    title: "Battery Runtime Calculator — Estimate Backup Time",
    description: "Estimate battery runtime from Wh or Ah, voltage, load, state of charge, reserve and inverter efficiency. See usable energy, assumptions and runtime scenarios.",
  },
};

const example = calculateBatteryRuntime({
  capacityAh: 100,
  voltage: 12,
  loadWatts: 100,
  startingSoc: 1,
  reserveSoc: 0.2,
  batteryHealth: 1,
  conversionEfficiency: 0.9,
  dutyCycle: 1,
});

const scenarioLoads = [50, 100, 300, 500].map((loadWatts) => ({
  loadWatts,
  runtimeHours: calculateBatteryRuntime({
    capacityAh: 100,
    voltage: 12,
    loadWatts,
    startingSoc: 1,
    reserveSoc: 0.2,
    batteryHealth: 1,
    conversionEfficiency: 0.9,
    dutyCycle: 1,
  }).result.runtimeHours,
}));

const formatRuntime = (hours: number) => {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return `${wholeHours} h ${minutes} min`;
};

export default function BatteryRuntimePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() },
      { "@type": "ListItem", position: 2, name: "Battery", item: new URL("/battery", siteConfig.url).toString() },
      { "@type": "ListItem", position: 3, name: "Battery Runtime Calculator", item: new URL("/battery/battery-runtime-calculator", siteConfig.url).toString() },
    ],
  };

  return <article className="page calculator-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/battery">Battery</Link><span aria-hidden="true">/</span><span>Battery Runtime Calculator</span></nav>
    <p className="eyebrow">Battery planning</p>
    <h1>Battery Runtime Calculator</h1>
    <p className="intro">Estimate how long your battery can power a device or group of appliances. Enter battery capacity and load, then adjust reserve, battery health and conversion losses if needed.</p>
    <BatteryRuntimeCalculator />
    <section>
      <h2>How to use this battery backup time calculator</h2>
      <ol><li>Enter the battery&apos;s Wh capacity, or choose Ah and enter its nominal voltage.</li><li>Enter the average load in watts—not the appliance&apos;s brief startup surge.</li><li>Keep the editable reserve, health and conversion settings accurate to your setup.</li><li>Use the result as a planning estimate, then compare it with measured device consumption where possible.</li></ol>
    </section>
    <section>
      <h2>Battery runtime formula</h2>
      <p>The calculator converts battery capacity to usable battery energy, then divides it by the battery-side average load. It calculates at full precision and rounds only for display.</p>
      <p><code>runtime hours = (battery Wh × usable state of charge × health) ÷ battery-side load W</code></p>
    </section>
    <section>
      <h2>Ah vs Wh: why voltage matters for a 12V battery</h2>
      <p>Ah alone does not describe battery energy: <code>Wh = volts × Ah</code>. A 12V 100Ah battery is approximately 1,200 Wh before reserve and conversion losses. That is why a 12V battery run time calculator needs both Ah and voltage.</p>
    </section>
    <section>
      <h2>How watts and inverter efficiency change runtime</h2>
      <p>Watts describe the appliance load. For AC appliances, the inverter draws more from the battery than the device receives, so the estimate uses battery-side watts. A 100W AC device with 90% inverter efficiency draws about 111W from the battery; a direct DC load uses the separate DC efficiency setting instead.</p>
    </section>
    <section>
      <h2>Battery reserve and usable capacity</h2>
      <p>The estimate uses one charge window: starting charge minus minimum remaining charge, then battery health. It does not apply a second usable-capacity percentage, which avoids counting the same reserve twice. Chemistry presets are editable planning starting points, not device-specific claims.</p>
    </section>
    <section>
      <h2>12V battery run time example</h2>
      <p>For a 12V 100Ah battery at 100% charge, a 20% reserve and 90% inverter efficiency, the engine calculates {Math.round(example.result.usableBatteryWh)} Wh of usable battery energy. A 100W AC appliance draws about {Math.round(example.result.batterySideLoadWatts)}W from the battery, giving an estimated runtime of <strong>{formatRuntime(example.result.runtimeHours)}</strong>.</p>
      <div className="scenario-table" role="region" aria-label="Battery runtime by watts example"><table><caption>Battery runtime by watts: 12V 100Ah illustrative scenario</caption><thead><tr><th scope="col">Average load</th><th scope="col">Estimated runtime</th></tr></thead><tbody>{scenarioLoads.map((scenario) => <tr key={scenario.loadWatts}><td>{scenario.loadWatts} W</td><td>{formatRuntime(scenario.runtimeHours)}</td></tr>)}</tbody></table></div>
    </section>
    <section>
      <h2>Assumptions that change battery runtime</h2>
      <table><caption>Inputs used in the illustrative 12V 100Ah example</caption><thead><tr><th scope="col">Assumption</th><th scope="col">Value</th><th scope="col">Source</th></tr></thead><tbody><tr><td>Battery capacity</td><td>100Ah at 12V</td><td>Illustrative device specification</td></tr><tr><td>Minimum reserve</td><td>20%</td><td>Editable planning assumption</td></tr><tr><td>Conversion efficiency</td><td>90%</td><td>Editable planning assumption</td></tr><tr><td>Average load</td><td>100W</td><td>Illustrative load</td></tr></tbody></table>
    </section>
    <section>
      <h2>Why real battery runtime can differ</h2>
      <p>Temperature, battery age, BMS limits, cable and inverter losses, and the actual appliance load can change real-world runtime. Generic defaults are useful starting points, but measured or device-label values are better when available.</p>
    </section>
    <section>
      <h2>Related battery planning</h2>
      <p>Use the <Link href="/battery">Battery Calculators</Link> page to return to the available battery planning tool and review the methodology behind this estimate.</p>
    </section>
    <section>
      <h2>Methodology and sources</h2>
      <p>Generic battery defaults are editable planning estimates. See the <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link> used to maintain them.</p>
    </section>
  </article>;
}
