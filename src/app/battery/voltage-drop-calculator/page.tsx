import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { VoltageDropCalculator } from "@/components/calculator/voltage-drop-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("voltage-drop");

export const metadata: Metadata = {
  title: "Voltage Drop Calculator — DC & AC Wire Size Sizing",
  description: "Calculate DC & AC voltage drop percentage, power loss in watts, and recommended wire gauge (AWG / mm²) for 12V, 24V, 48V, 120V, and 240V circuits to meet NEC 3% limits.",
  alternates: { canonical: "/battery/voltage-drop-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: {
    title: "Voltage Drop & Wire Size Calculator — PowerLab",
    description: "Calculate DC & AC voltage drop percentage, power loss in watts, and recommended wire gauge (AWG / mm²) for 12V, 24V, 48V, 120V, and 240V circuits.",
    url: `${siteConfig.url}/battery/voltage-drop-calculator`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

const FAQS = [
  {
    question: "What is the maximum acceptable voltage drop according to the NEC?",
    answer: "The National Electrical Code (NEC Article 210.19(A) Informational Note 4) recommends that the maximum voltage drop for branch circuits should not exceed 3% under full load. The total combined voltage drop on both the feeder and branch circuit should not exceed 5% to ensure reasonable operating efficiency for electrical appliances.",
  },
  {
    question: "Why is voltage drop more critical in 12V DC systems than 120V AC?",
    answer: "In a 12V DC system, a 1-volt drop represents a massive 8.3% loss of system voltage, which can trigger inverter low-voltage cutoffs or cause LED lights to dim significantly. In contrast, in a 120V AC circuit, a 1-volt drop represents less than 0.9% of total voltage.",
  },
  {
    question: "Why must round-trip distance be used for DC circuit calculations?",
    answer: "Direct current (DC) circuits require current to travel from the positive battery terminal to the load along the supply wire, and then all the way back to the negative terminal along the return conductor. Both legs produce resistance and voltage loss, which is why DC calculations use a 2.0 distance multiplier.",
  },
  {
    question: "What is the difference between copper and aluminum wire resistance?",
    answer: "Copper is approximately 64% more conductive than aluminum. Copper has a resistivity constant (K) of 12.9 ohms-cmil/ft at 75°C, while aluminum has a K constant of 21.2 ohms-cmil/ft. This means an aluminum conductor must generally be 1 to 2 gauge sizes thicker than copper to carry the same current with the same voltage drop.",
  },
];

export default function VoltageDropPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Voltage Drop & Wire Size Calculator",
    description: "Calculate DC & AC voltage drop percentage, power loss in watts, and recommended wire gauge (AWG / mm²) for 12V, 24V, 48V, 120V, and 240V circuits to meet NEC 3% limits.",
    route: "/battery/voltage-drop-calculator",
    categoryName: "Battery",
    categoryRoute: "/battery",
    features: [
      "Calculates exact DC and AC voltage drop percentage under load",
      "Recommends minimum AWG / mm² wire gauge to satisfy NEC 3% limit",
      "Models copper vs aluminum conductor resistivity at 75°C",
      "Calculates continuous resistance power loss in watts and kilowatt-hours",
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
        <span aria-current="page">Voltage Drop Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Electrical Sizing &amp; NEC Standards</p>
        <h1>Voltage Drop &amp; Wire Size Calculator</h1>
        <p className="intro">
          Calculate electrical voltage drop, power loss in watts, and recommended wire gauge (AWG / mm²) for DC (12V, 24V, 48V) and AC (120V, 240V) wiring circuits to ensure compliance with the NEC 3% rule.
        </p>
      </div>

      <DirectAnswerCard
        keyword="voltage drop and wire gauge sizing calculation"
        answer="The National Electrical Code (NEC Article 210.19) recommends limiting voltage drop to under 3% for branch circuits and 5% total system-wide. Voltage drop equals round-trip conductor resistance multiplied by current: VD = (2 × K × Length × Amps) ÷ Conductor Area (CMIL). A 12V 20A circuit over 15 feet requires at least 8 AWG copper wire to stay under 3% drop (0.36V)."
        formula="Voltage Drop (V) = (2 × K × Length_feet × Current_amps) ÷ Conductor_CMIL (where K_copper = 12.9)"
        standardExample="12V 20A circuit, 15 ft run: with 8 AWG (16,510 CMIL), VD = (2 × 12.9 × 15 × 20) ÷ 16,510 = 0.46V (3.8%) → use 6 AWG for < 2.5%"
        sourceAuthority="NEC 210.19(A) Informational Note 4 & IEEE Std 141"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <VoltageDropCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Use This Voltage Drop Calculator</h2>
        <ol>
          <li><strong>Select Circuit Voltage:</strong> Choose low-voltage DC (12V, 24V, 48V) for solar/battery systems or AC (120V, 240V) for home appliances and EV chargers.</li>
          <li><strong>Enter Load Current (Amps) or Power (Watts):</strong> Enter the continuous operating load expected on the branch circuit.</li>
          <li><strong>Set One-Way Run Length:</strong> Input the distance from the battery/breaker panel to the equipment (round-trip length is automatically factored in).</li>
          <li><strong>Review Recommended Wire Gauge:</strong> Compare voltage drop percentage against the NEC 3% branch circuit standard.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>NEC Max Run Distance Matrix (3% Max Drop for Copper Wire)</h2>
        <p>Maximum one-way cable run length in feet before voltage drop exceeds the NEC 3% threshold:</p>
        <div className="scenario-table" role="region" aria-label="NEC voltage drop maximum run length distance matrix">
          <table>
            <caption>Maximum one-way distance (feet) for 3% voltage drop with 75°C Copper (THHN)</caption>
            <thead>
              <tr>
                <th scope="col">Circuit Voltage &amp; Load</th>
                <th scope="col">14 AWG</th>
                <th scope="col">12 AWG</th>
                <th scope="col">10 AWG</th>
                <th scope="col">8 AWG</th>
                <th scope="col">6 AWG</th>
                <th scope="col">4 AWG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>12V DC — 10 Amps (120W)</strong></td>
                <td>11.7 ft</td>
                <td>18.6 ft</td>
                <td>29.5 ft</td>
                <td>46.9 ft</td>
                <td>74.6 ft</td>
                <td>118.5 ft</td>
              </tr>
              <tr>
                <td><strong>12V DC — 20 Amps (240W)</strong></td>
                <td>5.8 ft</td>
                <td>9.3 ft</td>
                <td>14.8 ft</td>
                <td>23.4 ft</td>
                <td>37.3 ft</td>
                <td>59.3 ft</td>
              </tr>
              <tr>
                <td><strong>12V DC — 30 Amps (360W)</strong></td>
                <td>—</td>
                <td>6.2 ft</td>
                <td>9.8 ft</td>
                <td>15.6 ft</td>
                <td>24.9 ft</td>
                <td>39.5 ft</td>
              </tr>
              <tr>
                <td><strong>12V DC — 50 Amps (600W)</strong></td>
                <td>2.3 ft</td>
                <td>3.7 ft</td>
                <td>5.9 ft</td>
                <td>9.4 ft</td>
                <td>14.9 ft</td>
                <td>23.7 ft</td>
              </tr>
              <tr>
                <td><strong>24V DC — 20 Amps (480W)</strong></td>
                <td>11.7 ft</td>
                <td>18.6 ft</td>
                <td>29.5 ft</td>
                <td>46.9 ft</td>
                <td>74.6 ft</td>
                <td>118.5 ft</td>
              </tr>
              <tr>
                <td><strong>48V DC — 30 Amps (1,440W)</strong></td>
                <td>15.6 ft</td>
                <td>24.8 ft</td>
                <td>39.4 ft</td>
                <td>62.5 ft</td>
                <td>99.5 ft</td>
                <td>158.0 ft</td>
              </tr>
              <tr>
                <td><strong>120V AC — 15 Amps (1,800W)</strong></td>
                <td>23.4 ft</td>
                <td>37.2 ft</td>
                <td>59.1 ft</td>
                <td>93.7 ft</td>
                <td>149.2 ft</td>
                <td>237.0 ft</td>
              </tr>
              <tr>
                <td><strong>240V AC — 40 Amps (9.6 kW EV)</strong></td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
                <td>78.2 ft</td>
                <td>124.3 ft</td>
                <td>197.6 ft</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Voltage Drop &amp; Wire Sizing Formula"
          formula="V_drop = (M × K × I × L) / Circular_Mils"
          formulaDescription="Standard National Electrical Code (NEC) Ohm's Law conductor sizing formula using circular mil cross-sectional area and material resistivity constants."
          variables={[
            { symbol: "V_drop", label: "Voltage Drop", description: "Lost voltage across the total circuit length", unit: "Volts" },
            { symbol: "M", label: "Circuit Phase Multiplier", description: "2.0 for DC & 1-Phase AC round-trip; 1.732 for 3-Phase AC circuits", unit: "dimensionless" },
            { symbol: "K", label: "Conductor Resistivity Constant", description: "12.9 Ω·cmil/ft for Copper; 21.2 Ω·cmil/ft for Aluminum at 75°C", unit: "Ω·cmil/ft" },
            { symbol: "I", label: "Circuit Current", description: "Continuous operating load current", unit: "Amperes" },
            { symbol: "L", label: "One-Way Conductor Length", description: "One-way distance between power source and load", unit: "Feet" },
            { symbol: "Circular_Mils", label: "Conductor Area", description: "Cross-sectional conductor area (NEC Chapter 9 Table 8)", unit: "cmil" },
          ]}
          notes={[
            "NEC Article 210.19(A) recommends maximum 3% voltage drop on branch circuits for optimal electrical efficiency.",
            "Copper wire provides 64% lower resistivity than aluminum for equivalent cross-sectional diameter.",
          ]}
        />
      </div>

      <section>
        <h2>Why Undersized Cables Are Dangerous</h2>
        <p>
          Using an undersized wire gauge causes two distinct hazards:
        </p>
        <ol>
          <li><strong>Overheating &amp; Fire Hazard (Ampacity Limit):</strong> If current exceeds the conductor&apos;s thermal rating, the insulation melts, creating short circuits.</li>
          <li><strong>Equipment Malfunction (Excessive Drop):</strong> Inverters may shut down prematurely due to perceived &ldquo;low battery voltage,&rdquo; compressors may fail to start, and battery charging times increase significantly.</li>
        </ol>
      </section>

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

      <section id="related-tools">
        <h2>Related Electrical &amp; Battery Planning</h2>
        <p>
          Need to size an inverter or battery bank? Use our <Link href="/battery/inverter-size-calculator">Inverter Size Calculator</Link> to check DC current draw, size your battery storage with the <Link href="/battery/battery-size-calculator">Battery Size Calculator</Link>, or size solar panel wiring with the <Link href="/solar/solar-charge-controller-calculator">Solar Charge Controller Calculator</Link>.
        </p>
      </section>

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          Voltage drop calculations use standard National Electrical Code (NEC) Chapter 9 Table 8 conductor resistances and Table 310.16 ampacities. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="battery" />
    </article>
  );
}
