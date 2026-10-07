import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { SolarChargeControllerCalculator } from "@/components/calculator/solar-charge-controller-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Charge Controller Calculator — MPPT Sizing & Cold Voc",
  description: "Size MPPT and PWM solar charge controllers for battery storage. Calculate operating charging current, continuous design current, and temperature-corrected open-circuit voltage (Voc_cold).",
  canonicalPath: "/solar/solar-charge-controller-calculator",
  category: "solar",
});

const FAQS = [
  {
    question: "What is the difference between MPPT and PWM solar charge controllers?",
    answer: "PWM (Pulse Width Modulation) controllers connect the solar array directly to the battery, pulling module voltage down to battery voltage. MPPT (Maximum Power Point Tracking) controllers use DC-to-DC conversion to match array voltage to battery charging requirements. MPPT can improve energy harvest when the array's maximum-power voltage differs materially from the battery charging voltage. The benefit varies with array configuration, battery voltage, temperature, irradiance and controller characteristics.",
  },
  {
    question: "Why does cold weather increase solar panel open-circuit voltage (Voc)?",
    answer: "Photovoltaic semiconductor bandgap energy increases at lower temperatures, elevating open-circuit voltage (Voc). For standard crystalline silicon modules, Voc rises by approximately 0.28% to 0.35% for every degree Celsius below standard test conditions (25°C). The temperature-corrected string voltage is calculated using: Voc_cold = N_series × Voc_STC × [1 + (|βVoc| / 100) × (25 − T_min)].",
  },
  {
    question: "What happens if array Voc exceeds the charge controller maximum voltage rating?",
    answer: "Check that the calculated maximum cold-weather array Voc does not exceed the charge controller's maximum PV input voltage rating. Exceeding the equipment rating can damage the controller. Charge controllers do not regulate or clip open-circuit voltage above their hardware rating.",
  },
  {
    question: "How do you calculate required charge controller output amperage?",
    answer: "First calculate the electrical operating charging current by dividing total array wattage by nominal battery voltage: I_charge = P_array / V_battery. For installations subject to electrical codes like NEC 690.8, continuous circuit sizing applies an additional factor (such as 1.25×). Code sizing may require additional continuous-current factors depending on the applicable electrical code, equipment rating and installation.",
  },
  {
    question: "When should I use manufacturer temperature coefficients vs code table factors?",
    answer: "For code-based design, use the temperature-correction method required or permitted by the applicable NEC edition and the module manufacturer's published data. Where the manufacturer provides a Voc temperature coefficient, use that documented coefficient when applicable. Code tables (such as NEC Table 690.7(A)) provide fallback correction factors for crystalline silicon modules when specific coefficients are unavailable.",
  },
];

export default function SolarChargeControllerPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Solar Charge Controller / MPPT Sizing Calculator",
    description: "Size MPPT and PWM charge controllers by operating charging current, continuous design current (Amps), and temperature-corrected array open-circuit voltage (Voc_cold).",
    route: "/solar/solar-charge-controller-calculator",
    categoryName: "Solar",
    categoryRoute: "/solar",
    features: [
      "Calculated operating charging current (P_array / V_battery) and code-sized continuous ampacity",
      "Temperature-corrected open-circuit voltage (Voc_cold) under NEC 690.7(A) and IEC 62548",
      "Hardware matching across commercial MPPT brackets (75V, 100V, 150V, 250V / 10A to 100A)",
      "Voltage rating verification and input headroom calculations",
    ],
    standards: [
      "NFPA 70 / NEC Article 690.7(A) (Maximum Photovoltaic System Voltage)",
      "NFPA 70 / NEC Article 690.8 (Circuit Sizing and Current)",
      "IEC 62548-1:2023 (Photovoltaic Arrays — Design Requirements)",
      "UL 1741 (Inverters, Converters, Controllers and Interconnection System Equipment)",
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
          Size MPPT and PWM solar charge controllers for battery systems. Calculate electrical operating charging current, evaluate continuous design current under applicable electrical codes, and determine maximum cold-weather string voltage (Voc_cold) to ensure the controller&apos;s voltage rating is not exceeded.
        </p>
      </div>

      <div id="calculator-tool">
        <SolarChargeControllerCalculator />
      </div>

      <Disclaimer variant="safety" />

      <DirectAnswerCard
        keyword="MPPT charge controller sizing & cold Voc calculation"
        answer="To size an MPPT charge controller, calculate the operating charging current: I_charge = P_array ÷ V_battery. For code-based design (such as NEC 690.8), continuous current is sized with an applicable factor: I_cont = (P_array ÷ V_battery) × 1.25. In addition, calculate maximum series string open-circuit voltage at lowest expected ambient temperature: Voc_cold = N_series × Voc_STC × [1 + (|β_Voc| ÷ 100) × (25°C − T_min)]. Verify that calculated maximum array Voc remains within the controller's specified maximum PV input voltage under design conditions."
        formula="I_charge = P_array ÷ V_battery  |  I_code = (P_array ÷ V_battery) × 1.25  |  Voc_cold = N_series × Voc_STC × [1 + (|β_Voc| ÷ 100) × (25°C − T_min)]"
        standardExample="800W array (4S 200W, Voc = 24.3V, β_Voc = -0.33%/°C) on 24V bank at -10°C: Calculated operating charging current = 800W ÷ 24V = 33.3A; Code-sized continuous rating (125% factor) = 33.3A × 1.25 = 41.7A (select 45A/50A controller class); Array Voc_cold = 4 × 24.3V × [1 + 0.0033 × (25 − (-10))] = 97.2V × 1.1155 = 108.4V → select a 150V max input controller"
        sourceAuthority="NFPA 70 / NEC Article 690.7(A), NEC 690.8 & IEC 62548-1:2023"
      />

      <PageJumpNav />

      <section id="nec-standards-matrix" style={{ marginTop: "3rem" }}>
        <h2>Temperature Correction Methods for Array Open-Circuit Voltage</h2>
        <p>
          For code-based design, use the temperature-correction method required or permitted by the applicable NEC edition and the module manufacturer&apos;s published data. Where the manufacturer provides a Voc temperature coefficient, use that documented coefficient when applicable.
        </p>
        <ul>
          <li>
            <strong>Manufacturer-Data Calculation (e.g., NEC 690.7(A)(1)):</strong> Uses the module&apos;s verified open-circuit voltage temperature coefficient (β_Voc in %/°C or mV/°C) from the manufacturer data sheet: <code>Voc_cold = N_series × Voc_STC × [1 + (|β_Voc| / 100) × (25 − T_min)]</code>.
          </li>
          <li>
            <strong>Code-Table Calculation (e.g., NEC Table 690.7(A)):</strong> Table multipliers for crystalline and multicrystalline silicon modules when manufacturer temperature coefficients are unavailable in the applicable code jurisdiction.
          </li>
          <li>
            <strong>Simplified Planning Calculation:</strong> Baseline screening using standard coefficient presets (such as -0.33%/°C) to estimate cold-weather voltage rise during initial equipment selection.
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
          Reference MPPT controller classes, electrical operating current, code-sized continuous current ratings, and maximum cold-weather series string limits across common battery configurations:
        </p>
        <div className="scenario-table" role="region" aria-label="Solar array size and MPPT controller sizing matrix">
          <table>
            <caption>Table 2: Representative MPPT controller sizing benchmarks across common array and battery configurations</caption>
            <thead>
              <tr>
                <th scope="col">Solar Array Configuration</th>
                <th scope="col">Battery Voltage</th>
                <th scope="col">Calculated Operating Current</th>
                <th scope="col">Code Continuous Rating (1.25×)</th>
                <th scope="col">Max String Voc_cold (-20°C / -4°F)</th>
                <th scope="col">Recommended MPPT Hardware Class</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>200W Portable</strong> (2S 100W, Voc = 22.5V, β_Voc = -0.33%/°C)</td>
                <td>12V Bank</td>
                <td>16.7 A</td>
                <td>20.8 A</td>
                <td>51.7 V</td>
                <td><strong>75V / 25A MPPT</strong></td>
              </tr>
              <tr>
                <td><strong>400W RV / Van</strong> (2S2P 100W, Voc = 22.5V, β_Voc = -0.33%/°C)</td>
                <td>12V Bank</td>
                <td>33.3 A</td>
                <td>41.7 A</td>
                <td>51.7 V</td>
                <td><strong>100V / 50A MPPT</strong></td>
              </tr>
              <tr>
                <td><strong>800W Off-Grid Cabin</strong> (2S2P 200W, Voc = 24.3V, β_Voc = -0.33%/°C)</td>
                <td>24V Bank</td>
                <td>33.3 A</td>
                <td>41.7 A</td>
                <td>55.8 V</td>
                <td><strong>100V / 50A MPPT</strong></td>
              </tr>
              <tr>
                <td><strong>1,600W Residential</strong> (4S2P 200W, Voc = 24.3V, β_Voc = -0.33%/°C)</td>
                <td>48V Bank</td>
                <td>33.3 A</td>
                <td>41.7 A</td>
                <td>111.6 V</td>
                <td><strong>150V / 45A or 50A MPPT</strong></td>
              </tr>
              <tr>
                <td><strong>3,200W High-Voltage Array</strong> (4S2P 400W, Voc = 37.2V, β_Voc = -0.28%/°C)</td>
                <td>48V Bank</td>
                <td>66.7 A</td>
                <td>83.3 A</td>
                <td>167.6 V</td>
                <td><strong>250V / 100A MPPT</strong></td>
              </tr>
              <tr>
                <td><strong>4,800W Workshop Array</strong> (6S2P 400W, Voc = 37.2V, β_Voc = -0.28%/°C)</td>
                <td>48V Bank</td>
                <td>100.0 A</td>
                <td>125.0 A</td>
                <td>251.3 V</td>
                <td><strong>Split into two 3S2P strings on 150V / 70A MPPTs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="worked-example">
        <h2>Worked Engineering Example: Sizing Series Strings for Sub-Zero Climates</h2>
        <p>
          Consider a residential off-grid system in a northern climate with a design minimum ambient temperature of <strong>-20°C (-4°F)</strong>. The system uses four 400W monocrystalline modules connected in series (4S) to a 48V battery bank:
        </p>
        <ol>
          <li>
            <strong>Extract Module STC Specifications:</strong>
            <ul>
              <li>Nameplate Power: P_module = 400 W (Total P_array = 1,600 W)</li>
              <li>Open-Circuit Voltage at 25°C: Voc,STC = 37.2 V</li>
              <li>Temperature Coefficient of Voc: β_Voc = -0.28% / °C</li>
              <li>Series Count: N_series = 4</li>
            </ul>
          </li>
          <li>
            <strong>Calculate Cold-Weather Voltage Rise per Module:</strong>
            <div style={{ padding: "0.75rem", backgroundColor: "#f8fafc", borderRadius: "0.375rem", margin: "0.5rem 0", fontFamily: "monospace", fontSize: "0.88rem" }}>
              ΔT = 25°C − (-20°C) = 45°C<br />
              Multiplier = 1 + (|−0.28| ÷ 100) × 45 = 1 + 0.126 = 1.126<br />
              Voc,cold = 37.2V × 1.126 = 41.89V per module
            </div>
          </li>
          <li>
            <strong>Calculate Peak String Voltage:</strong>
            <div style={{ padding: "0.75rem", backgroundColor: "#f8fafc", borderRadius: "0.375rem", margin: "0.5rem 0", fontFamily: "monospace", fontSize: "0.88rem" }}>
              String Voc,cold = 4 × 41.89V = 167.56V
            </div>
          </li>
          <li>
            <strong>Verify Controller Voltage Limits:</strong>
            Check that the calculated maximum cold-weather array Voc does not exceed the charge controller&apos;s maximum PV input voltage rating. A standard 150V MPPT controller has a maximum limit of 150V. Because 167.56V exceeds 150V, a <strong>250V MPPT controller</strong> is selected to ensure operation within equipment ratings.
          </li>
          <li>
            <strong>Calculate Operating and Code-Sized Charging Current:</strong>
            <div style={{ padding: "0.75rem", backgroundColor: "#f8fafc", borderRadius: "0.375rem", margin: "0.5rem 0", fontFamily: "monospace", fontSize: "0.88rem" }}>
              Calculated operating charging current: I_charge = 1,600W ÷ 48V = 33.33A<br />
              Code-sized continuous rating (125% factor): I_code = 33.33A × 1.25 = 41.67A
            </div>
            <strong>Final Hardware Selection:</strong> <strong>250V / 50A or 250V / 60A MPPT Charge Controller</strong>.
          </li>
        </ol>
      </section>

      <section id="overvoltage-hazard">
        <h2>Charge Controller Voltage Limits &amp; Input Voltage Verification</h2>
        <p>
          Check that the calculated maximum cold-weather array Voc does not exceed the charge controller&apos;s maximum PV input voltage rating. Exceeding the equipment rating can damage the controller.
        </p>
        <p>
          Unlike grid-tie inverters that can throttle power when operating within allowable voltage windows, a charge controller&apos;s open-circuit input voltage is established before current begins to flow. When sunlight strikes cold solar panels in an open-circuit condition, the full string open-circuit voltage appears across the input terminals. Always verify that <code>Voc_cold &lt; Controller_Max_PV_Voltage</code> under the site&apos;s lowest applicable design temperature.
        </p>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Charge Controller Sizing &amp; Temperature-Corrected Voc Formulas"
          formula="I_charge = P_array / V_battery  |  I_code = (P_array / V_battery) * 1.25  |  Voc_cold = N_series * Voc_STC * [1 + (|βVoc| / 100) * (25 - T_min)]"
          formulaDescription="Calculates electrical operating charging current, code-sized continuous design current, and temperature-corrected maximum open-circuit voltage (Voc_cold)."
          variables={[
            { symbol: "P_array", label: "Total Solar Array Power", description: "Combined peak nameplate STC wattage of all modules in the array", unit: "Watts" },
            { symbol: "V_battery", label: "Nominal Battery System Voltage", description: "Nominal voltage of energy storage bank (12V, 24V, or 48V)", unit: "Volts" },
            { symbol: "1.25", label: "Code Continuous Duty Factor", description: "Continuous circuit factor under applicable electrical codes (e.g., NEC 690.8) for continuous output", unit: "dimensionless" },
            { symbol: "N_series", label: "Series Module Count", description: "Number of solar panels wired in series per string", unit: "count" },
            { symbol: "Voc_STC", label: "Nameplate Open-Circuit Voltage", description: "Module open-circuit voltage under Standard Test Conditions (25°C / 1000 W/m²)", unit: "Volts" },
            { symbol: "βVoc", label: "Temperature Coefficient of Voc", description: "Module voltage temperature coefficient expressed in %/°C", unit: "%/°C" },
            { symbol: "T_min", label: "Lowest Design Temperature", description: "Lowest applicable ambient design temperature at installation site", unit: "°C" },
          ]}
          notes={[
            "Verify that calculated maximum array Voc remains within the controller's specified maximum PV input voltage under the applicable design conditions.",
            "Actual controller conversion efficiency varies by model, voltage ratio, load and operating conditions.",
            "Code sizing may require additional continuous-current factors depending on the applicable electrical code, equipment rating and installation.",
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
          Size your off-grid battery bank capacity with our <Link href="/solar/solar-battery-bank-size-calculator">Solar Battery Bank Size Calculator</Link>, check DC cable gauge and line voltage drop with the <Link href="/battery/voltage-drop-calculator">Voltage Drop Calculator</Link>, simulate monthly PV energy harvest with the <Link href="/solar/solar-panel-output-calculator">Solar Panel Output Calculator</Link>, evaluate service panel backfeed limits with our <Link href="/guides/nec-705-12-120-percent-rule-solar-busbar-sizing-guide">NEC 705.12 120% Busbar Sizing Guide</Link>, learn grid-tie array oversizing with our <Link href="/guides/solar-inverter-clipping-and-dc-ac-ratio-guide">Solar Inverter Clipping &amp; DC-to-AC Ratio Guide</Link>, or read our comprehensive <Link href="/guides/mppt-solar-charge-controller-sizing-guide">MPPT vs PWM Solar Charge Controller Sizing Guide</Link>.
        </p>
      </section>
    </article>
  );
}

