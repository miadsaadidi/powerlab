import type { Metadata } from "next";
import Link from "next/link";
import { ApplianceWattageCalculator } from "@/components/calculator/appliance-wattage-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";


export const metadata: Metadata = {
  title: "Appliance Wattage Calculator — Estimate Watts & kWh",
  description: "Estimate appliance running watts from editable presets or your device label, then calculate energy use for a selected runtime. Use the result in battery or solar tools.",
  alternates: { canonical: "/home-energy/appliance-wattage-calculator" },
  robots: { index: isCalculatorPublished("appliance-wattage"), follow: true },
  openGraph: { title: "Appliance Wattage Calculator — Estimate Watts & kWh", description: "Estimate appliance running watts from editable presets or your device label, then calculate energy use for a selected runtime." },
};

const FAQS = [
  {
    question: "How do you calculate appliance wattage from volts and amps?",
    answer: "For direct current (DC) and purely resistive AC loads, multiply Volts by Amps: Watts = Volts × Amps. For inductive loads with electric motors (refrigerators, AC units, pumps), multiply by the power factor (cos φ): Watts = Volts × Amps × Power Factor.",
  },
  {
    question: "What is the difference between running watts and starting (surge) watts?",
    answer: "Running watts is the continuous power drawn during normal operation. Starting watts (or inrush surge) is the brief high-amperage spike (often 2× to 3× running wattage) required by motor compressors and pumps to break inertia for 1 to 3 seconds.",
  },
  {
    question: "What is power factor (cos φ)?",
    answer: "Power factor is the ratio of real power (Watts) to apparent power (Volt-Amps). Pure resistive loads (space heaters, incandescent bulbs, toasters) have a power factor of 1.0. Motorized appliances (fans, refrigerators, power tools) typically range between 0.70 and 0.85.",
  },
  {
    question: "How many watts does a standard 120V household wall outlet support?",
    answer: "A standard 15-Amp 120V residential circuit supports up to 1,800 Watts total maximum (120V × 15A). Under continuous load rules (NEC 80% rule for loads running 3+ hours), the maximum safe continuous draw is 1,440 Watts.",
  },
];

export default function ApplianceWattagePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Appliance Wattage Calculator",
    description: "Estimate appliance running watts, surge watts, and daily kWh consumption from voltage, amperage, and power factor.",
    route: "/home-energy/appliance-wattage-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    features: [
      "Converts Volts and Amps to continuous running Watts",
      "Power factor (cos φ) adjustment for inductive electric motors",
      "Appliance library with realistic startup surge wattage estimates",
      "Daily and monthly kWh consumption modeling with duty cycles",
    ],
    standards: [
      "DOE 10 CFR Part 430 Energy Conservation Standards",
      "IEC 60034 (Rotating Electrical Machines - Rating and Performance)",
      "ANSI C84.1 (Electric Power Systems and Equipment - Voltage Ratings)",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/home-energy">Home Energy</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Appliance Wattage Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Home energy planning</p>
        <h1>Appliance Wattage Calculator</h1>
        <p className="intro">
          Calculate appliance running power in Watts from nameplate Volts and Amps (W = V × A), factor in motor power factors, and estimate daily energy consumption (kWh).
        </p>
      </div>

      <DirectAnswerCard
        keyword="appliance wattage calculation"
        answer="To calculate electrical wattage from a device label, multiply Voltage by Amperage: Watts = Volts × Amps. For motor-driven appliances (refrigerators, pumps, power tools), multiply by the power factor (typically 0.80). Daily kilowatt-hours equal running watts multiplied by daily run hours divided by 1,000."
        formula="Power (Watts) = Volts × Amps × Power Factor (cos φ) · Daily Energy (kWh) = (Watts × Hours/Day) ÷ 1,000"
        standardExample="120V appliance drawing 4.5A with 0.85 PF: 120V × 4.5A × 0.85 = 459 Watts"
        sourceAuthority="IEC 60034 (Rotating Electrical Machines) & IEEE Standards"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <ApplianceWattageCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Appliance Wattage</h2>
        <ol>
          <li><strong>Check Appliance Nameplate Label:</strong> Locate voltage (120V, 240V, 12V) and current amperage (A) printed on the manufacturer label.</li>
          <li><strong>Enter Volts and Amps:</strong> Input measured or nameplate values into the calculator.</li>
          <li><strong>Select Appliance Type:</strong> Resistive heaters and electronics use a power factor of 1.0; motors use ~0.80.</li>
          <li><strong>Review Running &amp; Surge Watts:</strong> View calculated power and daily energy use for battery and generator sizing.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Common Household Appliance Wattage &amp; Surge Reference Guide</h2>
        <p>A reference guide comparing continuous running watts, startup surge watts, typical duty cycles, and estimated daily energy consumption for common home appliances:</p>
        <div className="scenario-table" role="region" aria-label="Household appliance wattage reference table">
          <table>
            <caption>Typical appliance power ratings and daily energy consumption</caption>
            <thead>
              <tr>
                <th scope="col">Appliance Category</th>
                <th scope="col">Running Watts</th>
                <th scope="col">Startup / Surge Watts</th>
                <th scope="col">Typical Daily Use</th>
                <th scope="col">Daily Energy (kWh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Full-Size Refrigerator / Freezer</strong></td>
                <td>150 W</td>
                <td>450 W (3× surge)</td>
                <td>24 hrs (35% duty cycle)</td>
                <td>~1.26 kWh / day</td>
              </tr>
              <tr>
                <td><strong>Central Air Conditioner (3-Ton)</strong></td>
                <td>3,500 W</td>
                <td>10,500 W (LRA locked rotor)</td>
                <td>8 hrs (50% duty cycle)</td>
                <td>~14.0 kWh / day</td>
              </tr>
              <tr>
                <td><strong>Microwave Oven (1,000W output)</strong></td>
                <td>1,400 W (input draw)</td>
                <td>1,400 W</td>
                <td>20 minutes / day</td>
                <td>~0.47 kWh / day</td>
              </tr>
              <tr>
                <td><strong>Electric Space Heater</strong></td>
                <td>1,500 W</td>
                <td>1,500 W (resistive)</td>
                <td>4 hrs / day</td>
                <td>~6.00 kWh / day</td>
              </tr>
              <tr>
                <td><strong>Home Office (Laptop + 2 Screens + Wi-Fi)</strong></td>
                <td>180 W</td>
                <td>180 W</td>
                <td>8 hrs / day</td>
                <td>~1.44 kWh / day</td>
              </tr>
              <tr>
                <td><strong>55-Inch 4K Smart OLED TV</strong></td>
                <td>110 W</td>
                <td>110 W</td>
                <td>4 hrs / day</td>
                <td>~0.44 kWh / day</td>
              </tr>
              <tr>
                <td><strong>Electric Water Heater (50-Gal)</strong></td>
                <td>4,500 W</td>
                <td>4,500 W</td>
                <td>3 hrs (heating element)</td>
                <td>~13.5 kWh / day</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Appliance Power &amp; Energy Consumption Formulas"
          formula="Watts = Volts (V) × Amps (A) × Power_Factor (cos φ)  |  Daily_kWh = (Watts × Quantity × Hours_Day × Duty_Cycle) / 1,000"
          formulaDescription="Calculates real active electrical power consumption from device electrical ratings and converts power demand into cumulative daily kilowatt-hours."
          variables={[
            { symbol: "Volts (V)", label: "Operating Voltage", description: "Standard mains voltage (120V / 240V AC or 12V / 24V / 48V DC).", unit: "V" },
            { symbol: "Amps (A)", label: "Current Draw", description: "Nameplate rated current flow in amperes.", unit: "A" },
            { symbol: "Power_Factor", label: "Power Factor (cos φ)", description: "Ratio of real power to apparent power (1.0 for resistive heaters/lights, 0.75–0.85 for inductive AC motors).", unit: "fraction" },
            { symbol: "Duty_Cycle", label: "Cycling Factor", description: "Fraction of runtime active (e.g. 33% for refrigerators, 100% for continuous loads).", unit: "fraction" },
          ]}
          notes={[
            "Total Energy: Watt-Hours (Wh) = Watts × Operating Hours × Duty Cycle.",
            "Motor starting (surge) watts typically surge to 2× to 3× running wattage for 1 to 3 seconds.",
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
        <h2>Related Energy &amp; Backup Tools</h2>
        <p>
          Calculate whole-home loads with the <Link href="/home-energy/electricity-usage-calculator">Electricity Usage Calculator</Link>, size backup generators with the <Link href="/home-energy/generator-size-calculator">Generator Size Calculator</Link>, or check battery discharge with the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>.
        </p>
      </section>
    </article>
  );
}
