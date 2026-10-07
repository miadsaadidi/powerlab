import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { InverterSizeCalculator } from "@/components/calculator/inverter-size-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = buildPageMetadata({
  title: "Inverter Size Calculator — Watts & Surge Sizing",
  description:
    "Calculate inverter size in continuous and surge watts to run appliances from battery storage. Estimate DC current draw and illustrative fuse and cable sizes across 12V, 24V, and 48V systems.",
  canonicalPath: "/battery/inverter-size-calculator",
  category: "battery",
});

const FAQS = [
  {
    question: "What size inverter do I need for my appliances?",
    answer: "Add the continuous wattage of all appliances you want to run simultaneously, then add an illustrative 20% planning headroom. If any appliance has an electric motor (refrigerator, blender, microwave, power tool), ensure the inverter's surge (peak) rating exceeds the startup inrush wattage of your largest device. Startup current varies by equipment; use manufacturer data when available.",
  },
  {
    question: "Why does a 12V inverter require thicker cables than a 48V inverter?",
    answer: "Power equals Voltage multiplied by Current (Watts = Volts × Amps). At 92% efficiency, delivering 2,000 Watts on a 12V system requires approximately 181.2 Amps of DC current (requiring heavy conductor gauges like 2/0 AWG). On a 48V system, delivering the same 2,000 Watts requires only 45.3 Amps of current (requiring much thinner conductors like 4 AWG). Actual conductor sizing depends on cable length, allowable voltage drop, and installation conditions.",
  },
  {
    question: "What is the difference between Pure Sine Wave and Modified Sine Wave inverters?",
    answer: "Pure Sine Wave inverters produce smooth alternating current identical to grid utility power. Modified Sine Wave inverters produce stepped square-wave power that may cause audible buzzing, excess heat, or performance issues in certain motorized equipment or sensitive power supplies. Pure sine wave output is generally preferred for sensitive electronics, motors and variable-speed equipment. Verify the equipment manufacturer's power-quality requirements.",
  },
  {
    question: "What size DC fuse do I need for an inverter?",
    answer: "Illustrative fuse sizing = calculated continuous DC current × selected planning factor (e.g., 1.25×). For example, a 1,000W continuous inverter load on a 12V battery draws approximately 90.6A DC at 92% efficiency; multiplying by 1.25 gives 113.3A, for which a 125A fuse is an illustrative selection. Final fuse selection must also satisfy the inverter/battery manufacturer's requirements, conductor ampacity, fuse class/interrupt rating, installation conditions, and applicable electrical code.",
  },
];

export default function InverterSizePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Inverter Sizing Calculator",
    description: "Calculate continuous and surge inverter wattage, DC battery amperage, illustrative fuse rating, and cable gauge guidance.",
    route: "/battery/inverter-size-calculator",
    categoryName: "Battery",
    categoryRoute: "/battery",
    features: [
      "Estimates continuous load and motor starting surge requirements",
      "Estimates DC battery current across 12V, 24V, and 48V battery banks",
      "Provides illustrative DC fuse-sizing estimates based on calculated continuous current",
      "Pure sine wave waveform matching guidance for sensitive equipment",
    ],
    standards: [
      "UL 1741 (Inverters, Converters, Controllers and Interconnection System Equipment Reference)",
      "NFPA 70 / NEC Article 706 (Energy Storage Systems Overview)",
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
          Calculate the continuous and surge wattage needed to power your AC appliances from a 12V, 24V, or 48V battery bank, including continuous DC current draw, illustrative fuse sizing, and cable gauge guidance.
        </p>
      </div>

      <div id="calculator-tool">
        <InverterSizeCalculator />
      </div>

      <Disclaimer variant="safety" />

      <DirectAnswerCard
        keyword="inverter sizing calculation"
        answer="To size an inverter, sum the continuous running wattage of all simultaneous appliances and add an illustrative 20% planning headroom. In addition, ensure the inverter's surge rating accommodates startup inrush requirements (startup current varies by equipment; a 3×–5× multiplier is a rough planning example for compressor-driven loads). For example, a 1,200W continuous load typically pairs with a 1,500W to 2,000W Pure Sine Wave inverter."
        formula="Inverter Rating (W) = Total Running Load (Watts) × 1.20 Illustrative Margin  |  Surge Rating ≥ Max Startup Inrush"
        standardExample="800W running load + 1200W fridge surge: (800 × 1.20) = 960W continuous → select a 1,000W / 2,000W Surge Inverter"
        sourceAuthority="UL 1741 & NEC Article 706 Engineering References"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Size an Off-Grid Inverter</h2>
        <ol>
          <li><strong>Sum Continuous Running Watts:</strong> Total the operating wattage of all AC appliances you intend to power simultaneously.</li>
          <li><strong>Add Single Largest Motor Surge Delta:</strong> Startup current varies by equipment. If available, use the manufacturer&apos;s specified starting/inrush requirement or measured startup load. A 3×–5× multiplier is only a rough planning example.</li>
          <li><strong>Add 20% Illustrative Planning Headroom:</strong> Sizing with headroom prevents inverter overload alarms and heat throttling during sustained usage. Actual inverter selection should consider manufacturer ratings, continuous-load requirements, environmental conditions, and expected load variability.</li>
          <li><strong>Calculate DC Battery Conductor &amp; Fuse Sizing:</strong> Low-voltage DC cables carry substantial amperage; always verify DC conductor sizing and fuse ratings against manufacturer specifications and applicable electrical codes.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Inverter Wattage, DC Current &amp; Cable Sizing Matrix</h2>
        <p>DC amperage drawn from battery banks and illustrative copper cable gauges (based on 92% inverter efficiency):</p>
        <div className="scenario-table" role="region" aria-label="Inverter wattage DC current and cable sizing matrix">
          <table>
            <caption>Inverter continuous load, DC current draw across voltages, and illustrative cable gauges (92% efficiency)</caption>
            <thead>
              <tr>
                <th scope="col">Inverter Rating</th>
                <th scope="col">12V DC Current</th>
                <th scope="col">24V DC Current</th>
                <th scope="col">48V DC Current</th>
                <th scope="col">Illustrative Fuse Size</th>
                <th scope="col">Illustrative Cable Size</th>
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
                <td>300 Amp (24V) / 175 Amp (48V)</td>
                <td>4/0 AWG (24V) / 2/0 AWG (48V)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted, #64748b)", marginTop: "0.5rem" }}>
          Illustrative only. Actual conductor sizing depends on ampacity, cable length, allowable voltage drop, temperature, installation conditions, and applicable code/manufacturer requirements.
        </p>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Inverter &amp; DC Battery Current Sizing Formulas"
          formula="Continuous_Watts = Total_Load * 1.20  |  DC_Amps = Continuous_Watts / (Battery_Volts * Inverter_Efficiency)"
          formulaDescription="Standard electrical conversion from AC output demand to continuous DC battery current with an illustrative 20% planning margin at default 92% inverter efficiency."
          variables={[
            { symbol: "Continuous_Watts", label: "Target Continuous Inverter Rating", description: "Continuous AC output rating with 20% illustrative planning headroom", unit: "Watts" },
            { symbol: "Surge_Watts", label: "Peak Inrush Surge Rating", description: "Continuous watts plus the single largest motor inductive startup delta", unit: "Watts" },
            { symbol: "DC_Amps", label: "DC Battery Current Draw", description: "Maximum direct current drawn from battery bank cables under full continuous load (at 92% efficiency)", unit: "Amperes" },
            { symbol: "Inverter_Efficiency", label: "DC-to-AC Inversion Efficiency", description: "Internal conversion efficiency of the inverter (default assumption: 92%)", unit: "%" },
          ]}
          notes={[
            "Pure sine wave output is generally preferred for sensitive electronics, motors and variable-speed equipment. Verify the equipment manufacturer's power-quality requirements.",
            "Illustrative fuse sizing = calculated continuous DC current × selected planning factor (default: 1.25). Final fuse selection must also satisfy the inverter/battery manufacturer's requirements, conductor ampacity, fuse class/interrupt rating, installation conditions, and applicable electrical code.",
            "Startup current varies by equipment. If available, use the manufacturer's specified starting/inrush requirement or measured startup load. A 3×–5× multiplier is only a rough planning example.",
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
          Estimate your battery bank operating duration with our <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>, size your battery bank Ah/Wh capacity with the <Link href="/battery/battery-size-calculator">Battery Size Calculator</Link>, or dynamically calculate conductor gauge and line voltage drop with the <Link href="/battery/voltage-drop-calculator">Voltage Drop Calculator</Link>.
        </p>
      </section>

      <section>
        <h2>Methodology and Model Basis</h2>
        <p>
          Inverter calculations use inductive motor starting characteristics and general 75°C copper ampacity references. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="battery" />
    </article>
  );
}
