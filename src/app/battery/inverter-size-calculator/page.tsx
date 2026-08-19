import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { InverterSizeCalculator } from "@/components/calculator/inverter-size-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("inverter-size");

export const metadata: Metadata = {
  title: "Inverter Size Calculator — Continuous & Surge Watts Sizing",
  description: "Calculate the exact inverter size in continuous and surge watts needed to run your appliances from a battery. Find the right 12V, 24V, or 48V inverter capacity.",
  alternates: { canonical: "/battery/inverter-size-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: {
    title: "Inverter Size Calculator — PowerLab",
    description: "Calculate continuous and surge inverter wattage, DC battery current, and fuse sizing.",
    url: `${siteConfig.url}/battery/inverter-size-calculator`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

const FAQS = [
  {
    question: "What size inverter do I need for my appliances?",
    answer: "Add the continuous wattage of all appliances you want to run simultaneously, then add 20% safety margin. If any appliance has an electric motor (refrigerator, blender, microwave, power tool), ensure the inverter's surge (peak) rating exceeds the startup inrush wattage of your largest device.",
  },
  {
    question: "Why does a 12V inverter require thicker cables than a 48V inverter?",
    answer: "Power equals Voltage multiplied by Current (Watts = Volts × Amps). To deliver 2,000 Watts on a 12V system, the battery cables must carry approximately 185 Amps of DC current (requiring massive 2/0 or 4/0 AWG copper cable). On a 48V system, delivering the same 2,000 Watts requires only 46 Amps of current (requiring much thinner 6 AWG wire).",
  },
  {
    question: "What is the difference between Pure Sine Wave and Modified Sine Wave inverters?",
    answer: "Pure Sine Wave inverters produce clean, smooth alternating current identical to (or cleaner than) grid utility power. Modified Sine Wave inverters produce choppy, stepped square-wave power that causes buzzing in motors, overheating in electronics, and failure in medical equipment (CPAP) or laser printers. Pure Sine Wave is strongly recommended for all modern setups.",
  },
  {
    question: "What size DC fuse do I need for an inverter?",
    answer: "Size your DC fuse (Class-T or Mega/ANL) for 125% of the inverter's maximum continuous DC current. For example, a 1,000W inverter on a 12V battery draws about 93A DC at full load; multiplying by 1.25 gives 116A, so a 125A or 150A fuse is recommended.",
  },
];

export default function InverterSizePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Inverter Sizing Calculator",
    description: "Calculate continuous and surge inverter wattage, DC battery amperage, fuse rating, and cable gauge.",
    route: "/battery/inverter-size-calculator",
    categoryName: "Battery",
    categoryRoute: "/battery",
    features: [
      "Continuous load and motor starting surge calculation",
      "DC battery current ampacity across 12V, 24V, and 48V battery banks",
      "Class-T / ANL fuse recommendation with 125% continuous duty safety",
      "Pure Sine Wave recommendation matching for sensitive electronics",
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
        <span aria-current="page">Inverter Size Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">DC-to-AC Power Conversion &amp; Sizing</p>
        <h1>Inverter Size Calculator</h1>
        <p className="intro">
          Calculate the continuous and surge wattage needed to power your AC appliances from a 12V, 24V, or 48V battery bank, including DC current draw, fuse sizing, and cable gauge.
        </p>
      </div>

      <DirectAnswerCard
        keyword="inverter sizing calculation"
        answer="To size an inverter, sum the continuous running wattage of all simultaneous appliances and add a 20% safety headroom. In addition, ensure the inverter's surge rating accommodates the highest motor inrush wattage (typically 3× to 5× running watts for refrigerators and air conditioners). For example, a 1,200W continuous load requires at least a 1,500W to 2,000W Pure Sine Wave inverter."
        formula="Inverter Rating (W) = Total Running Load (Watts) × 1.20 Design Margin · Surge Rating ≥ Max Startup Inrush"
        standardExample="800W running load + 1200W fridge surge: (800 × 1.20) = 960W continuous → choose a 1,000W / 2,000W Surge Inverter"
        sourceAuthority="NEC Article 690.8 & UL 1741 (Inverters and Interconnection)"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <InverterSizeCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Size an Off-Grid Inverter</h2>
        <ol>
          <li><strong>Sum Continuous Running Watts:</strong> Total the operating wattage of all AC appliances you intend to power simultaneously.</li>
          <li><strong>Add Single Largest Motor Surge Delta:</strong> Motorized loads (compressors, pumps, power tools) require an extra startup burst of power.</li>
          <li><strong>Add 20% Safety Headroom:</strong> Sizing with headroom prevents inverter overload alarms and heat throttling during sustained usage.</li>
          <li><strong>Calculate DC Battery Cable &amp; Fuse Amperage:</strong> Low-voltage DC cables carry massive amperage; always verify DC cable gauge (AWG) and Class-T fuse ratings.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Inverter Wattage, DC Current &amp; Cable Sizing Matrix</h2>
        <p>DC amperage drawn from battery banks and recommended copper cable gauges (92% inverter efficiency):</p>
        <div className="scenario-table" role="region" aria-label="Inverter wattage DC current and cable sizing matrix">
          <table>
            <caption>Inverter continuous load, DC current draw across voltages, and recommended cable gauges</caption>
            <thead>
              <tr>
                <th scope="col">Inverter Rating</th>
                <th scope="col">12V DC Current</th>
                <th scope="col">24V DC Current</th>
                <th scope="col">48V DC Current</th>
                <th scope="col">Recommended DC Fuse</th>
                <th scope="col">Min Copper Cable</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>500 Watts</strong></td>
                <td>45.3 Amps</td>
                <td>22.6 Amps</td>
                <td>11.3 Amps</td>
                <td>60 Amp</td>
                <td>6 AWG (12V) / 10 AWG (48V)</td>
              </tr>
              <tr>
                <td><strong>1,000 Watts</strong></td>
                <td>90.6 Amps</td>
                <td>45.3 Amps</td>
                <td>22.6 Amps</td>
                <td>125 Amp</td>
                <td>2 AWG (12V) / 6 AWG (48V)</td>
              </tr>
              <tr>
                <td><strong>2,000 Watts</strong></td>
                <td>181.2 Amps</td>
                <td>90.6 Amps</td>
                <td>45.3 Amps</td>
                <td>250 Amp</td>
                <td>2/0 AWG (12V) / 4 AWG (48V)</td>
              </tr>
              <tr>
                <td><strong>3,000 Watts</strong></td>
                <td>271.7 Amps</td>
                <td>135.9 Amps</td>
                <td>67.9 Amps</td>
                <td>350 Amp</td>
                <td>4/0 AWG (12V) / 2 AWG (48V)</td>
              </tr>
              <tr>
                <td><strong>5,000 Watts</strong></td>
                <td>— (Not practical)</td>
                <td>226.4 Amps</td>
                <td>113.2 Amps</td>
                <td>175 Amp (48V)</td>
                <td>2/0 AWG (48V)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Inverter &amp; DC Battery Current Sizing Formulas"
          formula="Continuous_Watts = Total_Load × 1.20  |  DC_Amps = Continuous_Watts / (Battery_Volts × Inverter_Efficiency)"
          formulaDescription="Standard electrical engineering conversion from AC output demand to continuous DC battery current and peak motor surge ratings."
          variables={[
            { symbol: "Continuous_Watts", label: "Recommended Inverter Rating", description: "Continuous AC output rating with 20% safety headroom buffer", unit: "Watts" },
            { symbol: "Surge_Watts", label: "Peak Inrush Surge Rating", description: "Continuous watts plus the single largest motor inductive startup delta", unit: "Watts" },
            { symbol: "DC_Amps", label: "DC Battery Current Draw", description: "Maximum direct current drawn from battery bank cables under full load", unit: "Amperes" },
            { symbol: "Inverter_Efficiency", label: "DC-to-AC Inversion Efficiency", description: "Internal conversion efficiency of the inverter (typically 90%–94%)", unit: "%" },
          ]}
          notes={[
            "Pure Sine Wave inverters are required for motorized equipment, digital electronics, and variable speed motors.",
            "DC fuses (Class-T or Mega/ANL) must be sized for 125% of maximum continuous DC current to prevent nuisance tripping.",
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
        <h2>Related Battery &amp; Off-Grid Power Planning</h2>
        <p>
          Estimate your battery bank operating duration with our <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>, size your battery bank Ah/Wh capacity with the <Link href="/battery/battery-size-calculator">Battery Size Calculator</Link>, or check battery-to-inverter cable sizing with the <Link href="/battery/voltage-drop-calculator">Voltage Drop Calculator</Link>.
        </p>
      </section>

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          Inverter calculations use inductive motor starting characteristics and NEC 75°C copper ampacity standards. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="battery" />
    </article>
  );
}
