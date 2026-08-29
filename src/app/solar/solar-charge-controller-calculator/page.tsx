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

const isPublished = isCalculatorPublished("solar-charge-controller");

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Charge Controller Calculator — MPPT Sizing",
  description: "Size the right MPPT or PWM solar charge controller for your panels and battery bank. Calculate output current (Amps) and cold-weather array voltage (Voc).",
  canonicalPath: "/solar/solar-charge-controller-calculator",
  category: "solar",
});

const FAQS = [
  {
    question: "What is the difference between MPPT and PWM solar charge controllers?",
    answer: "PWM (Pulse Width Modulation) controllers act as a direct switch between the solar panel and the battery, pulling the solar panel voltage down to the battery voltage and discarding surplus voltage as heat. MPPT (Maximum Power Point Tracking) controllers use DC-to-DC conversion to transform high solar panel voltage into extra charging current, capturing 20% to 35% more energy in winter and overcast conditions.",
  },
  {
    question: "Why do you need to calculate cold-weather Voc (open circuit voltage)?",
    answer: "Solar panel silicon generates higher voltage as temperature drops. If the ambient temperature falls below standard test conditions (25°C / 77°F), panel Voc rises by approximately 0.33% per °C. If your solar array voltage exceeds the maximum input voltage limit of the charge controller on a freezing morning, the controller will be permanently destroyed.",
  },
  {
    question: "How do you calculate required charge controller amperage?",
    answer: "Divide your total solar array nameplate wattage by your nominal battery bank voltage (12V, 24V, or 48V), then add a 25% safety margin required by NEC continuous duty standards. For example: 800W array ÷ 24V battery = 33.3A × 1.25 = 41.6A, requiring a 40A to 50A charge controller.",
  },
  {
    question: "Can I connect a 48V solar panel to a 12V battery bank?",
    answer: "Yes, provided you use an MPPT charge controller. An MPPT controller can accept 48V (or up to 100V–250V depending on the model) and step it down to a 12V battery charging profile while doubling or tripling the charging amperage. A PWM controller cannot do this efficiently.",
  },
];

export default function SolarChargeControllerPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Solar Charge Controller Sizing Calculator",
    description: "Size MPPT and PWM charge controllers by amperage and cold-weather array voltage (Voc).",
    route: "/solar/solar-charge-controller-calculator",
    categoryName: "Solar",
    categoryRoute: "/solar",
    features: [
      "MPPT vs PWM technology selector with automatic power efficiency derating",
      "Cold-weather open-circuit voltage (Voc) thermal safety correction",
      "NEC 125% continuous output current ampacity calculations",
      "Model matching against standard commercial ratings (15A, 30A, 50A, 70A, 100A / 100V, 150V, 250V)",
    ],
    standards: [
      "NFPA 70 / NEC Article 690.8(A)(1) (Solar Photovoltaic Circuit Sizing)",
      "IEC 62548 (Design Requirements for Photovoltaic Arrays)",
      "IEEE 1547 Distributed Energy Standards",
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
        <p className="eyebrow">Off-Grid Solar &amp; Battery Charging</p>
        <h1>Solar Charge Controller / MPPT Sizing Calculator</h1>
        <p className="intro">
          Size the correct MPPT or PWM solar charge controller for your panels and battery bank. Calculate required output amperage, cold-weather array voltage (Voc), and safety headroom.
        </p>
      </div>

      <DirectAnswerCard
        keyword="solar charge controller / MPPT sizing calculation"
        answer="To size an MPPT charge controller, calculate required output current: divide total solar array wattage by nominal battery voltage and multiply by 1.25 (NEC safety margin). In addition, calculate string open-circuit voltage at your location's lowest record winter temperature (Voc rises ~0.33%/°C below 25°C) to ensure it stays below the controller's maximum voltage rating."
        formula="Controller Amps = (Solar Array Watts ÷ Battery Voltage) × 1.25 · Max String Voc_cold < Controller Max Input Volts"
        standardExample="800W array on a 24V battery: (800W ÷ 24V) × 1.25 = 41.6A → choose a 45A or 50A MPPT with 100V+ rating"
        sourceAuthority="NEC Article 690.7 (Maximum Voltage) & NEC 690.8 (Ampacity)"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <SolarChargeControllerCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Size a Solar Charge Controller</h2>
        <ol>
          <li><strong>Calculate Required Output Amperage:</strong> Divide total solar array wattage by nominal battery voltage (12V, 24V, or 48V), then multiply by 1.25 for NEC continuous duty.</li>
          <li><strong>Calculate Minimum Winter Array Voc:</strong> Cold ambient temperatures increase solar panel open-circuit voltage; determine worst-case sub-zero voltage rise.</li>
          <li><strong>Match Controller PV Voltage Window:</strong> Select an MPPT controller whose maximum input voltage (e.g., 75V, 100V, 150V, 250V) exceeds peak cold string Voc.</li>
          <li><strong>Select MPPT vs PWM:</strong> Choose MPPT for arrays over 200W or when panel voltage is higher than battery bank voltage.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Solar Array Size &amp; Recommended MPPT Controller Matrix</h2>
        <p>Representative MPPT controller sizing benchmarks across common battery voltages:</p>
        <div className="scenario-table" role="region" aria-label="Solar array size and MPPT controller sizing matrix">
          <table>
            <caption>Solar array wattage, battery bank voltage, and recommended MPPT controller models</caption>
            <thead>
              <tr>
                <th scope="col">Array Size</th>
                <th scope="col">Battery Voltage</th>
                <th scope="col">Calculated Amps (NEC 1.25x)</th>
                <th scope="col">Max String Voc (-10°C)</th>
                <th scope="col">Recommended MPPT Class</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>200W Portable (2 Panels)</strong></td>
                <td>12V Bank</td>
                <td>20.8 A</td>
                <td>~54.8 V</td>
                <td><strong>75V / 20A</strong></td>
              </tr>
              <tr>
                <td><strong>400W RV / Van (2s2p 100W)</strong></td>
                <td>12V Bank</td>
                <td>41.7 A</td>
                <td>~54.8 V</td>
                <td><strong>100V / 50A</strong></td>
              </tr>
              <tr>
                <td><strong>800W Cabin Array (2s2p 200W)</strong></td>
                <td>24V Bank</td>
                <td>41.7 A</td>
                <td>~109.5 V</td>
                <td><strong>150V / 45A</strong></td>
              </tr>
              <tr>
                <td><strong>1,600W Off-Grid (4s2p 200W)</strong></td>
                <td>48V Bank</td>
                <td>41.7 A</td>
                <td>~219.0 V</td>
                <td><strong>250V / 60A</strong></td>
              </tr>
              <tr>
                <td><strong>3,200W Large System (4s4p 200W)</strong></td>
                <td>48V Bank</td>
                <td>83.3 A</td>
                <td>~219.0 V</td>
                <td><strong>250V / 100A</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Charge Controller Sizing &amp; Cold Voc Formulas"
          formula="Charge_Amps = (Array_Watts / Battery_Volts) × 1.25  |  Worst_Case_Voc = Series_Voc × [1 + (25°C - T_min) × 0.0033]"
          formulaDescription="Standard National Electrical Code (NEC Article 690) charge current sizing and photothermal open-circuit voltage correction."
          variables={[
            { symbol: "Array_Watts", label: "Total Solar Panel Power", description: "Combined peak nameplate rating of all solar modules in the array", unit: "Watts" },
            { symbol: "Battery_Volts", label: "Nominal Battery System Voltage", description: "Nominal voltage of the energy storage bank (12V, 24V, or 48V)", unit: "Volts" },
            { symbol: "1.25", label: "NEC Continuous Duty Multiplier", description: "Mandatory 25% safety margin for continuous solar generation circuits", unit: "dimensionless" },
            { symbol: "Worst_Case_Voc", label: "Maximum Cold Open-Circuit Voltage", description: "Peak string voltage occurring at record minimum winter temperatures", unit: "Volts" },
            { symbol: "T_min", label: "Record Low Winter Temperature", description: "Lowest anticipated ambient temperature at the installation location", unit: "°C" },
          ]}
          notes={[
            "Never allow Worst_Case_Voc to exceed the controller's maximum PV input voltage rating (e.g. 100V, 150V, or 250V), as instantaneous overvoltage destroys internal circuitry.",
            "MPPT controllers can step down high array voltage into high battery charging current with 97%–99% efficiency.",
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

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          Charge controller sizing incorporates standard PV temperature coefficients, NEC 125% continuous output margins, and manufacturer MPPT voltage windows. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="solar" />
    </article>
  );
}
