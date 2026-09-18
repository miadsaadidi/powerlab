import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { SolarChargeControllerCalculator } from "@/components/calculator/solar-charge-controller-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Charge Controller Calculator — MPPT Sizing & Cold Voc",
  description: "Size MPPT and PWM solar charge controllers for your battery bank. Calculate charging amperage, sub-zero open-circuit voltage (Voc) under NEC 690.7, and series string limits.",
  canonicalPath: "/solar/solar-charge-controller-calculator",
  category: "solar",
});

const FAQS = [
  {
    question: "What is the difference between MPPT and PWM solar charge controllers?",
    answer: "PWM (Pulse Width Modulation) controllers act as a direct electrical switch between the solar array and the battery, pulling module operating voltage down to battery voltage and discarding surplus voltage as heat. MPPT (Maximum Power Point Tracking) controllers use high-frequency DC-to-DC buck conversion to transform high PV voltage into extra charging current, capturing 20% to 35% more energy in winter and overcast conditions.",
  },
  {
    question: "Why does cold weather increase solar panel open-circuit voltage (Voc)?",
    answer: "Photovoltaic semiconductor bandgap energy increases at lower temperatures, elevating the open-circuit voltage (Voc). For standard crystalline silicon modules, Voc rises by approximately 0.28% to 0.35% for every degree Celsius below standard test conditions (25°C / 77°F). On a sub-zero winter morning (-20°C / -4°F), string voltage rises by 12% to 16% above nameplate ratings.",
  },
  {
    question: "What happens if array Voc exceeds the charge controller maximum voltage rating?",
    answer: "Charge controllers cannot 'clip' or regulate excessive input voltage. If the open-circuit voltage of the solar string exceeds the controller's maximum input voltage (such as 100V, 150V, or 250V), the internal MOSFET switching transistors suffer instantaneous dielectric avalanche breakdown, causing permanent catastrophic hardware failure.",
  },
  {
    question: "How do you calculate required charge controller output amperage?",
    answer: "Divide total array nameplate wattage by nominal battery bank voltage (12V, 24V, or 48V), then multiply by 1.25 to incorporate the mandatory NEC continuous duty safety margin: Controller Amps = (Total Array Watts ÷ Battery Voltage) × 1.25.",
  },
  {
    question: "When should I use NEC Method A vs Method B for cold-weather Voc calculations?",
    answer: "Under NEC 690.7(A), Method A (manufacturer-listed temperature coefficient β_Voc) is preferred for all module technologies. Method B (NEC Table 690.7(A) correction factors) is a code-approved fallback permitted only for crystalline and multicrystalline silicon modules when specific manufacturer temperature coefficients are unavailable.",
  },
];

export default function SolarChargeControllerPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Solar Charge Controller / MPPT Sizing Calculator",
    description: "Size MPPT and PWM charge controllers by required charging current (Amps) and cold-weather array open-circuit voltage (Voc) under NEC 690.7 and IEC 62548.",
    route: "/solar/solar-charge-controller-calculator",
    categoryName: "Solar",
    categoryRoute: "/solar",
    features: [
      "MPPT vs PWM technology selector with DC-to-DC current amplification modeling",
      "Sub-zero open-circuit voltage (Voc) thermal safety correction under NEC 690.7(A)",
      "NEC Article 690.8 125% continuous output current ampacity calculations",
      "Hardware matching across commercial MPPT brackets (75V, 100V, 150V, 250V / 15A to 100A)",
      "Instantaneous voltage safety headroom and over-voltage hazard warnings",
    ],
    standards: [
      "NFPA 70 / NEC Article 690.7(A) (Maximum Photovoltaic System Voltage)",
      "NFPA 70 / NEC Article 690.8 (Circuit Sizing and Current)",
      "IEC 62548-1:2023 + AMD1:2025 (Photovoltaic Arrays — Design Requirements)",
      "IEC 61215-1:2021 (Terrestrial Photovoltaic Modules — Design Qualification)",
      "IEEE 1547 (Interconnection and Interoperability of Distributed Energy Resources)",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/solar">Solar</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Solar Charge Controller Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Off-grid solar &amp; MPPT voltage engineering</p>
        <h1>Solar Charge Controller / MPPT Sizing Calculator</h1>
        <p className="intro">
          Size MPPT and PWM solar charge controllers for off-grid battery systems. Calculate continuous charging amperage under NEC 690.8 and determine maximum cold-weather string voltage (Voc,max) under NEC 690.7(A) to prevent controller over-voltage destruction.
        </p>
      </div>

      <div id="calculator-tool">
        <SolarChargeControllerCalculator />
      </div>

      <DirectAnswerCard
        keyword="MPPT charge controller sizing & cold Voc calculation"
        answer="To size an MPPT charge controller, calculate continuous charging current: divide total array wattage by nominal battery voltage and multiply by 1.25 (NEC 690.8). In addition, calculate maximum series string open-circuit voltage at the site's lowest historical ambient temperature: Voc,max = N_series × Voc,STC × [1 + (β_Voc / 100) × (T_min − 25°C)]. Ensure string Voc,max remains strictly below the controller's maximum DC input voltage rating."
        formula="Charging Amps = (Array Watts ÷ Battery Volts) × 1.25  |  Max String Voc = N_series × Voc_STC × [1 + (|β_Voc| ÷ 100) × (25°C − T_min)]"
        standardExample="800W array (4S 200W, Voc = 24.3V, β_Voc = -0.33%/°C) on 24V bank at -10°C: Charging Amps = (800W ÷ 24V) × 1.25 = 41.7A (use 45A/50A MPPT); String Voc,cold = 4 × 24.3V × [1 + 0.0033 × 35] = 108.4V → requires a 150V MPPT controller"
        sourceAuthority="NFPA 70 / NEC Article 690.7(A), NEC 690.8 & IEC 62548-1:2023"
      />

      <PageJumpNav />

      <section id="nec-standards-matrix" style={{ marginTop: "3rem" }}>
        <h2>NEC Article 690.7(A) Temperature Correction Methods</h2>
        <p>
          The National Electrical Code (NFPA 70 / NEC 2023 Section 690.7(A)) mandates that maximum PV system DC voltage be calculated based on the lowest expected ambient temperature at the installation site. Two compliance methods are recognized:
        </p>
        <ul>
          <li>
            <strong>Method A (NEC 690.7(A)(1) — Manufacturer Temperature Coefficient):</strong> Preferred for all module technologies (monocrystalline, polycrystalline, TOPCon, HJT, thin-film). Uses the module&apos;s verified open-circuit voltage temperature coefficient (β_Voc in %/°C or mV/°C) from the manufacturer data sheet.
          </li>
          <li>
            <strong>Method B (NEC 690.7(A)(2) — Table Correction Factors):</strong> Approved fallback permitted <em>only for crystalline and multicrystalline silicon modules</em> when specific manufacturer coefficients are unavailable.
          </li>
        </ul>

        <div className="scenario-table" role="region" aria-label="NEC Table 690.7(A) voltage correction factors">
          <table>
            <caption>Table 1: NEC Table 690.7(A) Voltage Correction Factors for Crystalline Silicon Modules</caption>
            <thead>
              <tr>
                <th scope="col">Ambient Temperature (°C)</th>
                <th scope="col">Ambient Temperature (°F)</th>
                <th scope="col">NEC Table 690.7(A) Multiplier (C_T)</th>
                <th scope="col">Applicable Technology Scope</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>20 to 24°C</td>
                <td>68 to 76°F</td>
                <td><strong>1.02</strong></td>
                <td>Crystalline / Multicrystalline Silicon Only</td>
              </tr>
              <tr>
                <td>15 to 19°C</td>
                <td>59 to 67°F</td>
                <td><strong>1.04</strong></td>
                <td>Crystalline / Multicrystalline Silicon Only</td>
              </tr>
              <tr>
                <td>10 to 14°C</td>
                <td>50 to 58°F</td>
                <td><strong>1.06</strong></td>
                <td>Crystalline / Multicrystalline Silicon Only</td>
              </tr>
              <tr>
                <td>5 to 9°C</td>
                <td>41 to 49°F</td>
                <td><strong>1.08</strong></td>
                <td>Crystalline / Multicrystalline Silicon Only</td>
              </tr>
              <tr>
                <td>0 to 4°C</td>
                <td>32 to 40°F</td>
                <td><strong>1.10</strong></td>
                <td>Crystalline / Multicrystalline Silicon Only</td>
              </tr>
              <tr>
                <td>-1 to -5°C</td>
                <td>23 to 31°F</td>
                <td><strong>1.12</strong></td>
                <td>Crystalline / Multicrystalline Silicon Only</td>
              </tr>
              <tr>
                <td>-6 to -10°C</td>
                <td>14 to 22°F</td>
                <td><strong>1.14</strong></td>
                <td>Crystalline / Multicrystalline Silicon Only</td>
              </tr>
              <tr>
                <td>-11 to -15°C</td>
                <td>5 to 13°F</td>
                <td><strong>1.16</strong></td>
                <td>Crystalline / Multicrystalline Silicon Only</td>
              </tr>
              <tr>
                <td>-16 to -20°C</td>
                <td>-4 to 4°F</td>
                <td><strong>1.18</strong></td>
                <td>Crystalline / Multicrystalline Silicon Only</td>
              </tr>
              <tr>
                <td>-21 to -25°C</td>
                <td>-13 to -5°F</td>
                <td><strong>1.20</strong></td>
                <td>Crystalline / Multicrystalline Silicon Only</td>
              </tr>
              <tr>
                <td>-26 to -30°C</td>
                <td>-22 to -14°F</td>
                <td><strong>1.21</strong></td>
                <td>Crystalline / Multicrystalline Silicon Only</td>
              </tr>
              <tr>
                <td>-31 to -35°C</td>
                <td>-31 to -23°F</td>
                <td><strong>1.23</strong></td>
                <td>Crystalline / Multicrystalline Silicon Only</td>
              </tr>
              <tr>
                <td>-36 to -40°C</td>
                <td>-40 to -32°F</td>
                <td><strong>1.25</strong></td>
                <td>Crystalline / Multicrystalline Silicon Only</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sizing-matrix">
        <h2>Commercial MPPT Controller Sizing &amp; Voltage Window Matrix</h2>
        <p>
          Reference MPPT controller classes, continuous charging current ratings, and maximum cold-weather series string limits across common battery configurations:
        </p>
        <div className="scenario-table" role="region" aria-label="Solar array size and MPPT controller sizing matrix">
          <table>
            <caption>Table 2: Representative MPPT controller sizing benchmarks across common array and battery configurations</caption>
            <thead>
              <tr>
                <th scope="col">Solar Array Configuration</th>
                <th scope="col">Battery Voltage</th>
                <th scope="col">Continuous Current (NEC 1.25×)</th>
                <th scope="col">Max String Voc (-20°C / -4°F)</th>
                <th scope="col">Recommended MPPT Hardware Class</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>200W Portable</strong> (2S 100W, Voc = 22.5V)</td>
                <td>12V Bank</td>
                <td>20.8 A</td>
                <td>52.7 V</td>
                <td><strong>75V / 20A MPPT</strong></td>
              </tr>
              <tr>
                <td><strong>400W RV / Van</strong> (2S2P 100W, Voc = 22.5V)</td>
                <td>12V Bank</td>
                <td>41.7 A</td>
                <td>52.7 V</td>
                <td><strong>100V / 50A MPPT</strong></td>
              </tr>
              <tr>
                <td><strong>800W Off-Grid Cabin</strong> (2S2P 200W, Voc = 24.3V)</td>
                <td>24V Bank</td>
                <td>41.7 A</td>
                <td>56.9 V</td>
                <td><strong>100V / 50A MPPT</strong></td>
              </tr>
              <tr>
                <td><strong>1,600W Residential</strong> (4S2P 200W, Voc = 24.3V)</td>
                <td>48V Bank</td>
                <td>41.7 A</td>
                <td>113.8 V</td>
                <td><strong>150V / 45A MPPT</strong></td>
              </tr>
              <tr>
                <td><strong>3,200W High-Voltage Array</strong> (4S2P 400W, Voc = 37.2V)</td>
                <td>48V Bank</td>
                <td>83.3 A</td>
                <td>174.5 V</td>
                <td><strong>250V / 100A MPPT</strong></td>
              </tr>
              <tr>
                <td><strong>4,800W Workshop Array</strong> (6S2P 400W, Voc = 37.2V)</td>
                <td>48V Bank</td>
                <td>125.0 A</td>
                <td>261.8 V (Exceeds 250V!)</td>
                <td><strong>Split into two 3S2P strings on 150V / 70A MPPTs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="worked-example">
        <h2>Worked Engineering Example: Sizing Series Strings for Sub-Zero Climates</h2>
        <p>
          Consider a residential off-grid system in Minneapolis, MN with a design minimum ambient temperature of <strong>-20°C (-4°F)</strong>. The system uses four 400W monocrystalline modules connected in series (4S) to a 48V battery bank:
        </p>
        <ol>
          <li>
            <strong>Extract Module STC Specifications:</strong>
            <ul>
              <li>Nameplate Power: P_module = 400 W (Total P_array = 1,600 W)</li>
              <li>Open-Circuit Voltage at 25°C: Voc,STC = 37.2 V</li>
              <li>Temperature Coefficient of Voc: β_Voc = -0.28% / °C</li>
            </ul>
          </li>
          <li>
            <strong>Calculate Cold-Weather Voltage Rise per Module:</strong>
            <div style={{ padding: "0.75rem", backgroundColor: "#f8fafc", borderRadius: "0.375rem", margin: "0.5rem 0", fontFamily: "monospace", fontSize: "0.88rem" }}>
              ΔT = 25°C − (-20°C) = 45°C<br />
              Multiplier = 1 + (0.28 ÷ 100) × 45 = 1 + 0.126 = 1.126<br />
              Voc,cold = 37.2V × 1.126 = 41.89V per module
            </div>
          </li>
          <li>
            <strong>Calculate Peak String Voltage:</strong>
            <div style={{ padding: "0.75rem", backgroundColor: "#f8fafc", borderRadius: "0.375rem", margin: "0.5rem 0", fontFamily: "monospace", fontSize: "0.88rem" }}>
              String Voc,max = 4 × 41.89V = 167.56V
            </div>
          </li>
          <li>
            <strong>Select Controller Voltage Class:</strong>
            A standard 150V MPPT controller has a maximum limit of 150V. Because 167.56V &gt; 150V, using a 150V controller will cause over-voltage destruction on cold mornings. A <strong>250V MPPT controller</strong> is mandatory.
          </li>
          <li>
            <strong>Calculate Required Output Current:</strong>
            <div style={{ padding: "0.75rem", backgroundColor: "#f8fafc", borderRadius: "0.375rem", margin: "0.5rem 0", fontFamily: "monospace", fontSize: "0.88rem" }}>
              I_charge = (1,600W ÷ 48V) × 1.25 = 33.33A × 1.25 = 41.67A
            </div>
            <strong>Final Hardware Selection:</strong> <strong>250V / 50A or 250V / 60A MPPT Charge Controller</strong>.
          </li>
        </ol>
      </section>

      <section id="overvoltage-hazard">
        <h2>Hardware Reliability: Why Charge Controllers Cannot Clip Excess Voltage</h2>
        <p>
          A common misconception among solar designers is that an MPPT charge controller will &quot;clip&quot; or throttle excess voltage in the same manner that grid-tie inverters throttle excess DC power. <strong>This is electrically false.</strong>
        </p>
        <p>
          MPPT controllers use high-side switching transistors (MOSFETs or IGBTs) rated for a specific maximum reverse standoff voltage (such as 100V, 150V, or 250V). When morning sunlight strikes cold solar panels before the controller begins switching (open-circuit state), the full string open-circuit voltage (Voc,max) appears directly across the input terminals. If this voltage exceeds the semiconductor breakdown threshold, avalanche dielectric breakdown occurs in microseconds, destroying the controller.
        </p>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Charge Controller Sizing &amp; NEC 690.7(A) Voltage Equations"
          formula="I_charge = (P_array / V_battery) × 1.25  |  V_oc,max = N_series × V_oc,STC × [1 + (|β_Voc| / 100) × (25°C - T_ambient,min)]"
          formulaDescription="Determines continuous battery charging current ampacity under NEC 690.8 and peak sub-zero string voltage under NEC 690.7(A) and IEC 62548-1:2023."
          variables={[
            { symbol: "P_array", label: "Total Solar Array Power", description: "Combined peak nameplate STC wattage of all modules in the array", unit: "Watts" },
            { symbol: "V_battery", label: "Nominal Battery System Voltage", description: "Nominal voltage of energy storage bank (12V, 24V, or 48V)", unit: "Volts" },
            { symbol: "1.25", label: "NEC Continuous Duty Multiplier", description: "Mandatory 25% safety margin under NEC 690.8 for continuous solar generation circuits", unit: "dimensionless" },
            { symbol: "N_series", label: "Series Module Count", description: "Number of solar panels wired in series per string", unit: "count" },
            { symbol: "V_oc,STC", label: "Nameplate Open-Circuit Voltage", description: "Module open-circuit voltage under Standard Test Conditions (25°C / 1000 W/m²)", unit: "Volts" },
            { symbol: "β_Voc", label: "Temperature Coefficient of Voc", description: "Module voltage temperature derating coefficient (typically -0.28% to -0.35%/°C)", unit: "%/°C" },
            { symbol: "T_ambient,min", label: "Lowest Expected Ambient Temperature", description: "Site extreme minimum design dry-bulb temperature (e.g. ASHRAE 99.6% design value)", unit: "°C" },
          ]}
          notes={[
            "Never allow V_oc,max to exceed the charge controller maximum input voltage rating under any operating condition.",
            "MPPT controllers perform DC-to-DC conversion with 97%–99% efficiency, delivering higher charging current than array short-circuit current.",
            "Always maintain at least a 10% to 15% voltage safety buffer above calculated V_oc,max to accommodate cloud-edge irradiance amplification.",
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

      <section id="related-tools">
        <h2>Related Off-Grid Solar &amp; Battery Planning</h2>
        <p>
          Size your off-grid battery bank capacity with our <Link href="/solar/solar-battery-bank-size-calculator">Solar Battery Bank Size Calculator</Link>, check DC cable gauge and line voltage drop with the <Link href="/battery/voltage-drop-calculator">Voltage Drop Calculator</Link>, simulate monthly PV energy harvest with the <Link href="/solar/solar-panel-output-calculator">Solar Panel Output Calculator</Link>, or read our comprehensive <Link href="/guides/mppt-solar-charge-controller-sizing-guide">MPPT vs PWM Solar Charge Controller Sizing Guide</Link>.
        </p>
      </section>
    </article>
  );
}

