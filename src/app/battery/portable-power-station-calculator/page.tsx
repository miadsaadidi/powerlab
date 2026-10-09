import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { PortablePowerStationCalculator } from "@/components/calculator/portable-power-station-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { Disclaimer } from "@/components/shared/Disclaimer";

const isPublished = isCalculatorPublished("portable-power-station");

export const metadata: Metadata = buildPageMetadata({
  title: "Portable Power Station Calculator — Runtime & Wh Sizing",
  description: "Calculate portable power station runtime in hours from rated Wh and appliance watts, or size required Wh battery capacity with inverter loss and DoD modeling.",
  canonicalPath: "/battery/portable-power-station-calculator",
  category: "battery",
});

const FAQS = [
  {
    question: "How long will a 1,000Wh portable power station run a refrigerator?",
    answer:
      "Runtime depends on the refrigerator's average power draw, compressor duty cycle, ambient temperature, battery reserve cutoff, and inverter conversion efficiency. For example, a refrigerator drawing 150W with a 33.3% duty cycle averages 50W. On a 1,000Wh power station with 90% usable capacity (10% reserve) and 88% AC inverter efficiency, delivered AC energy is 792 Wh (1,000 × 0.90 × 0.88), providing approximately 15.8 hours of runtime (792 ÷ 50W). In addition to runtime, ensure the power station's continuous output exceeds 150W and peak surge capacity handles compressor startup (~400W–600W).",
  },
  {
    question: "Why does my 500Wh power station not deliver a full 500 watt-hours?",
    answer:
      "Portable power stations cannot deliver 100% of nominal battery capacity at the AC outlets due to two loss factors: internal battery reserve cutoff (typically 5%–10% retained by the BMS to protect lithium cells from over-discharge) and DC-to-AC pure sine wave inverter conversion losses (typically 10%–15% loss, or 85%–90% efficiency). On a 500Wh station with 90% usable capacity and 88% inverter efficiency, expected AC outlet energy is approximately 396 Wh (500 × 0.90 × 0.88).",
  },
  {
    question: "What size power station do I need for camping?",
    answer:
      "Required power station capacity depends on your total daily device watt-hours, operating hours, appliance duty cycles, desired reserve, and conversion losses. For example, running a 12V camping fridge (20W average × 24h = 480 Wh) and charging two phones (24 Wh) requires ~504 Wh delivered. Factoring in 90% usable capacity and 88% efficiency, a power station of at least 636 Wh nominal capacity is needed (504 ÷ (0.90 × 0.88)).",
  },
  {
    question: "Can a portable power station run a coffee maker or microwave?",
    answer:
      "Running high-wattage heating appliances depends on the power station's inverter continuous output (W) and surge capability, not its energy capacity (Wh). A 1,000W coffee maker or 1,200W microwave requires a power station with an inverter rated for at least 1,200W–1,500W continuous pure sine wave output, regardless of whether the battery capacity is 500Wh, 1,000Wh, or 2,000Wh.",
  },
];

export default function PortablePowerStationPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Portable Power Station Calculator",
    description: "Estimate portable power station runtime and required capacity in Wh for camping, vans, and blackout backup.",
    route: "/battery/portable-power-station-calculator",
    categoryName: "Battery",
    categoryRoute: "/battery",
    features: [
      "Calculates portable power station runtime in hours from rated Wh and connected load",
      "Calculates required station battery capacity in Wh for desired runtime",
      "Validates continuous AC inverter power limits and motor startup surge wattage",
      "Itemizes usable battery energy after depth-of-discharge and inverter conversion losses",
    ],
    standards: [
      "UL 2743 (Standard for Portable Power Packs Technical Reference)",
      "IEC 62133 (Secondary Lithium Cells and Batteries Reference)",
      "UN 38.3 (Transport of Lithium Metal and Lithium Ion Batteries Reference)",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/battery">Battery</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Portable Power Station Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Portable battery planning</p>
        <h1>Portable Power Station Calculator</h1>
        <p className="intro">
          Estimate how long a portable power station (Jackery, EcoFlow, Bluetti, Anker) will run your devices, or calculate the watt-hour capacity you need for camping, mobile vans, and emergency backup.
        </p>
      </div>

      <div id="calculator-tool">
        <PortablePowerStationCalculator />
      </div>

      <Disclaimer variant="calculator" />

      <DirectAnswerCard
        keyword="portable power station runtime calculation"
        answer="A 1,000Wh portable power station will power a 60W portable fridge for approximately 13.2 hours (13h 12m), a 35W CPAP machine for ~22.6 hours, or deliver ~792 Wh of usable AC outlet energy. Runtime is calculated by multiplying rated battery capacity by usable capacity factor (90%), battery health (100%), and inverter conversion efficiency (88%), then dividing by connected load wattage."
        formula="Runtime_h = (Station_Wh × Usable_Factor × Battery_Health × Inverter_Efficiency) / Load_W"
        standardExample="1,000Wh station running a 60W load (90% usable, 88% inverter efficiency): (1,000 × 0.90 × 1.00 × 0.88) ÷ 60W = 13.2 hours (13h 12m)"
        sourceAuthority="Technical Reference Basis: UL 2743 & IEC 62133"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Power Station Runtime &amp; Sizing</h2>
        <ol>
          <li><strong>Select Power Station Capacity:</strong> Choose standard sizes (256Wh, 512Wh, 1000Wh, 2048Wh) or enter custom watt-hours.</li>
          <li><strong>Add Connected Devices:</strong> Add laptops, camping fridges, CPAP machines, or lights with realistic running watts and duty cycles.</li>
          <li><strong>Verify Inverter Limits:</strong> Ensure device running watts and startup surges do not exceed the station&apos;s continuous AC inverter rating.</li>
          <li><strong>Review Operating Duration:</strong> View calculated operating hours and delivered AC energy available on a full charge.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Portable Power Station Capability Chart (What Can It Run?)</h2>
        <p>Estimated runtime across common portable power station capacities assuming canonical planning assumptions of 90% usable capacity (10% reserve) and 88% AC inverter efficiency (delivered AC Wh = Station Wh × 0.792):</p>
        <div className="scenario-table" role="region" aria-label="Power station capability matrix">
          <table>
            <caption>Estimated runtime across portable power station capacities (90% usable factor, 88% AC inverter efficiency)</caption>
            <thead>
              <tr>
                <th scope="col">Device / Appliance</th>
                <th scope="col">Average Power</th>
                <th scope="col">300 Wh Station (~238 Delivered AC Wh)</th>
                <th scope="col">500 Wh Station (~396 Delivered AC Wh)</th>
                <th scope="col">1,000 Wh Station (~792 Delivered AC Wh)</th>
                <th scope="col">2,000 Wh Station (~1,584 Delivered AC Wh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Smartphones</strong> (~12 Wh battery, ~90% DC charging)</td>
                <td>15 W max</td>
                <td>~20 recharges</td>
                <td>~33 recharges</td>
                <td>~67 recharges</td>
                <td>~135 recharges</td>
              </tr>
              <tr>
                <td><strong>Laptop (USB-PD)</strong></td>
                <td>45 W avg</td>
                <td>~5.3 hours</td>
                <td>~8.8 hours</td>
                <td>~17.6 hours</td>
                <td>~35.2 hours</td>
              </tr>
              <tr>
                <td><strong>12V 45L Portable Camping Fridge</strong></td>
                <td>20 W avg (cycling)</td>
                <td>~11.9 hours</td>
                <td>~19.8 hours</td>
                <td>~39.6 hours</td>
                <td>~79.2 hours</td>
              </tr>
              <tr>
                <td><strong>CPAP Machine</strong> (no heated humidifier)</td>
                <td>35 W</td>
                <td>~6.8 hours</td>
                <td>~11.3 hours</td>
                <td>~22.6 hours</td>
                <td>~45.3 hours</td>
              </tr>
              <tr>
                <td><strong>Starlink Satellite Terminal</strong></td>
                <td>60 W</td>
                <td>~4.0 hours</td>
                <td>~6.6 hours</td>
                <td>~13.2 hours</td>
                <td>~26.4 hours</td>
              </tr>
              <tr>
                <td><strong>Full-Size Home Refrigerator</strong></td>
                <td>150 W avg (450W surge)</td>
                <td>Inverter check (~1.6h)</td>
                <td>~2.6 hours</td>
                <td>~5.3 hours</td>
                <td>~10.6 hours</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.75rem" }}>
          *Note: Delivered AC energy equals Station Wh × 90% usable × 88% inverter conversion efficiency. Smartphone recharges assume a 12 Wh phone battery with 90% DC charging efficiency. Refrigerator runtime assumes station continuous output ≥ 150W and peak surge capacity ≥ 450W.*
        </p>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Portable Power Station Runtime &amp; Capacity Formulas"
          formula="Runtime_h = (Station_Wh × Usable_Factor × Battery_Health × Inverter_Efficiency) / Load_W"
          formulaDescription="Calculates operating hours from battery storage and verifies whether continuous and surge wattage demand satisfy the station's built-in inverter limits."
          variables={[
            { symbol: "Station_Wh", label: "Rated Battery Energy", description: "Nominal lithium battery capacity of the power station (e.g. 512 Wh, 1,000 Wh, 2,048 Wh).", unit: "Wh" },
            { symbol: "Usable_Factor", label: "Usable Capacity Factor", description: "Available capacity fraction above internal BMS reserve cutoff (typically 90%–95%).", unit: "fraction" },
            { symbol: "Battery_Health", label: "State of Health", description: "Available battery capacity relative to original factory nominal rating (typically 80%–100%).", unit: "fraction" },
            { symbol: "Inverter_Efficiency", label: "Pure Sine Wave Inverter Efficiency", description: "Internal DC-to-AC conversion efficiency (typically 85%–90%).", unit: "fraction" },
            { symbol: "Load_W", label: "Average Connected Load", description: "Running watts × duty cycle.", unit: "W" },
          ]}
          notes={[
            "Required Capacity Mode: Required_Station_Wh = (Load_W × Desired_Runtime_h × (1 + Margin)) / (Usable_Factor × Battery_Health × Inverter_Efficiency).",
            "Power Check: Running Watts ≤ Continuous Inverter Rating, and Startup Surge Watts ≤ Peak Surge Limit.",
          ]}
        />
      </div>

      <section id="faq-section" className="faq-section">
        <h2>Frequently Asked Questions (FAQ)</h2>
        <div className="faq-grid">
          {FAQS.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <div className="faq-answer">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>

      <section id="technical-references" style={{ marginTop: "3rem" }}>
        <h2>Technical References &amp; Standards Basis</h2>
        <ul>
          <li><strong>UL 2743:</strong> Standard for Portable Power Packs (safety requirements, battery containment, and inverter overcurrent protection).</li>
          <li><strong>IEC 62133:</strong> Secondary cells and batteries containing alkaline or other non-acid electrolytes — safety requirements for portable sealed lithium secondary cells.</li>
          <li><strong>UN 38.3:</strong> Recommendations on the Transport of Dangerous Goods — Manual of Tests and Criteria for Lithium Metal and Lithium Ion Batteries.</li>
        </ul>
      </section>

      <section id="related-tools" style={{ marginTop: "3rem", padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.35rem", color: "var(--brand-strong)" }}>Related Portable, Backup &amp; Battery Storage Tools</h2>
        <p style={{ marginBottom: "1.25rem", color: "var(--muted)", lineHeight: 1.55 }}>
          Plan backup runtimes, battery chemistries, vehicle-to-load systems, and solar charging:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🖥️ UPS Battery Size Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Size nominal UPS battery energy (Wh and Ah) needed to sustain workstations, servers, and networking gear during outages.
            </p>
            <Link href="/battery/ups-battery-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              UPS Battery Size Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🚗 EV V2L Runtime Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Model how many hours or days an EV battery pack (50 kWh–100 kWh) can run home appliances via vehicle-to-load (V2L).
            </p>
            <Link href="/ev/v2l-runtime-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              V2L Runtime Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>☀️ Solar Battery Bank Sizing</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Calculate total storage capacity required for off-grid cabins, solar generators, and autonomy days.
            </p>
            <Link href="/solar/solar-battery-bank-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Solar Battery Sizing →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>⚡ Battery Runtime Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Compare runtime curves across LiFePO4, AGM, and lead-acid battery chemistries under heavy discharge.
            </p>
            <Link href="/battery/battery-runtime-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Battery Runtime Calculator →
            </Link>
          </div>
        </div>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Link href="/battery/battery-capacity-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Battery Capacity &amp; Ah/kWh</Link>
          <Link href="/home-energy/home-battery-size-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Home Battery Size Calculator</Link>
          <Link href="/guides/battery-backup-runtime-calculation-guide" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Battery Runtime Calculation Guide</Link>
          <Link href="/guides/ev-v2l-v2h-home-backup-power-guide" className="button secondary-button" style={{ fontSize: "0.85rem" }}>EV V2L/V2H Backup Guide</Link>
        </div>
      </section>
    </article>
  );
}
