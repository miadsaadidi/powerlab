import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { V2lRuntimeCalculator } from "@/components/calculator/v2l-runtime-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("v2l-runtime");

export const metadata: Metadata = buildPageMetadata({
  title: "V2L Runtime Calculator: EV Home Backup Days",
  description: "Calculate how many days your EV battery can power essential household appliances during a power outage with Vehicle-to-Load (V2L) bidirectional power.",
  canonicalPath: "/ev/v2l-runtime-calculator",
  category: "ev",
});

const FAQS = [
  {
    question: "What is Vehicle-to-Load (V2L) and how does it work?",
    answer: "Vehicle-to-Load (V2L) is a bidirectional charging feature in modern EVs (like Hyundai Ioniq 5/6, Kia EV6/EV9, Ford F-150 Lightning, Rivian R1T) that allows the vehicle's massive high-voltage battery pack to power standard 120V (or 240V) household appliances via an external adapter plug or onboard AC outlets.",
  },
  {
    question: "How many days can an EV power a house during a blackout?",
    answer: "A typical EV battery (60 to 100 kWh) contains as much energy as 5 to 8 Tesla Powerwalls. When powering essential household blackout loads (refrigerator, internet, phone charging, LED lights, gas furnace blower totaling ~350W average), an EV can power your home for 5 to 12 days continuously while still leaving a 20% reserve for emergency driving.",
  },
  {
    question: "Why should you keep an emergency driving reserve in V2L mode?",
    answer: "In a severe natural disaster or extended storm outage, you may need your vehicle to evacuate, purchase emergency supplies, or drive to a working public DC fast charger. Setting a 20% to 30% reserve prevents draining your battery to 0% and preserves 40 to 80 miles of driving range.",
  },
  {
    question: "Can V2L run an air conditioner or heat pump?",
    answer: "Most 120V V2L systems provide up to 1.8 kW to 3.6 kW (15A to 30A), which can run a portable AC or window unit, but not a large 240V central AC. Vehicles with 240V / 7.2 kW to 9.6 kW bidirectional outputs (like the Ford F-150 Lightning or Chevy Silverado EV) can run whole-house subpanels including central air when paired with a soft-start kit.",
  },
];

export default function V2lRuntimePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Vehicle-to-Load (V2L) Runtime Calculator",
    description: "Calculate how many days your EV can power essential home appliances during an electrical blackout.",
    route: "/ev/v2l-runtime-calculator",
    categoryName: "EV",
    categoryRoute: "/ev",
    features: [
      "EV battery pack capacity modeling (50 kWh to 150 kWh)",
      "Protected emergency driving range reserve threshold",
      "Essential appliance load presets (refrigeration, medical, communications)",
      "Maximum continuous V2L power output limits (1.8 kW to 9.6 kW)",
    ],
    standards: [
      "ISO 15118-20 (Road vehicles - Vehicle to grid communication interface)",
      "NFPA 70 / NEC Article 705 & 706 (Interconnected Power Production & Energy Storage)",
      "UL 9741 (Standard for Bidirectional Electric Vehicle Charging System Equipment)",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/ev">EV</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">V2L Runtime Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Bi-Directional Power &amp; Storm Outages</p>
        <h1>Vehicle-to-Load (V2L) Runtime Calculator</h1>
        <p className="intro">
          Calculate how many hours and days your electric vehicle can power your home appliances during an electrical blackout, while protecting emergency driving range.
        </p>
      </div>

      <DirectAnswerCard
        keyword="Vehicle-to-Load (V2L) backup runtime calculation"
        answer="A standard 77 kWh EV battery can power essential blackout home loads (refrigerator, lights, Wi-Fi router, phone chargers, medical devices: ~350W average) for approximately 6 to 7 continuous days, while still retaining a 20% battery reserve (~40 miles) for emergency evacuation driving."
        formula="V2L Runtime (Hours) = {[Battery Pack Capacity (kWh) × (Current SoC − Reserve SoC)] × Inverter Efficiency} ÷ Average Load (kW)"
        standardExample="77 kWh EV at 90% SoC with 20% reserve (53.9 kWh available) @ 350W load: (53.9 × 0.88) ÷ 0.35 = 135.5 hours (5.6 days)"
        sourceAuthority="SAE J3072 / J3068 (Interoperability of Electric Vehicle Power Export)"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <V2lRuntimeCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate EV Backup Power (V2L / V2H) Runtime</h2>
        <ol>
          <li><strong>Select EV Battery Pack:</strong> Enter your vehicle&apos;s usable battery capacity in kWh (e.g. 58 kWh, 77.4 kWh, 99.8 kWh, 131 kWh).</li>
          <li><strong>Set Initial Charge &amp; Emergency Driving Reserve:</strong> Choose what percentage of the battery to preserve for evacuation or post-storm driving (e.g., 20% / ~50 miles).</li>
          <li><strong>Select Essential Emergency Loads:</strong> Calculate average running watts for critical devices (refrigerator, Wi-Fi, lighting, medical equipment).</li>
          <li><strong>Review Multi-Day Runtime Duration:</strong> View exact hours and full 24-hour days of emergency backup power available.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Common EV Battery Capacities &amp; Emergency Runtimes</h2>
        <p>Representative blackout backup durations for popular EV battery packs under typical 350W critical loads:</p>
        <div className="scenario-table" role="region" aria-label="Common EV battery capacities and emergency runtimes">
          <table>
            <caption>Vehicle battery capacity, maximum continuous V2L output, and 350W essential backup duration</caption>
            <thead>
              <tr>
                <th scope="col">EV Model / Battery Pack</th>
                <th scope="col">Battery Capacity</th>
                <th scope="col">Max V2L Output</th>
                <th scope="col">350W Essential Runtime</th>
                <th scope="col">Protected Range (20%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Hyundai Ioniq 5 / Kia EV6 (Standard)</strong></td>
                <td>58.0 kWh</td>
                <td>1.9 kW (120V 16A)</td>
                <td><strong>4.4 Days</strong></td>
                <td>~45 Miles</td>
              </tr>
              <tr>
                <td><strong>Hyundai Ioniq 5 / Kia EV6 (Long Range)</strong></td>
                <td>77.4 kWh</td>
                <td>1.9 kW (120V 16A)</td>
                <td><strong>5.9 Days</strong></td>
                <td>~60 Miles</td>
              </tr>
              <tr>
                <td><strong>Kia EV9 (99.8 kWh Battery)</strong></td>
                <td>99.8 kWh</td>
                <td>3.6 kW (120V/240V)</td>
                <td><strong>7.6 Days</strong></td>
                <td>~60 Miles</td>
              </tr>
              <tr>
                <td><strong>Ford F-150 Lightning (Extended)</strong></td>
                <td>131.0 kWh</td>
                <td>9.6 kW</td>
                <td><strong>10.0 Days</strong></td>
                <td>~68 Miles</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Vehicle-to-Load Emergency Runtime Formulas"
          formula="Delivered_AC_kWh = Capacity × (SOC_start - SOC_reserve) × Inverter_Efficiency"
          formulaDescription="Calculates delivered bidirectional AC backup energy and operating duration under continuous appliance loads."
          variables={[
            { symbol: "Capacity", label: "Gross Usable Battery Pack", description: "Nominal usable traction battery energy of the electric vehicle", unit: "kWh" },
            { symbol: "SOC_start", label: "Initial State of Charge", description: "Starting battery charge percentage when grid power is lost", unit: "%" },
            { symbol: "SOC_reserve", label: "Protected Driving Reserve", description: "Minimum state of charge cutoff reserved for emergency vehicle transportation", unit: "%" },
            { symbol: "Inverter_Efficiency", label: "Bidirectional Power Conversion", description: "Onboard high-voltage DC to 120V/240V AC inverter efficiency (typically 90%–93%)", unit: "%" },
            { symbol: "Runtime_Hours", label: "Total Backup Duration", description: "Delivered_AC_kWh ÷ (Continuous_Watts / 1000)", unit: "Hours" },
          ]}
          notes={[
            "Preserving a 20% reserve maintains approximately 40 to 60 miles of driving range for emergency travel.",
            "Standby vehicle computer consumption (typically 50W–100W) is factored into continuous discharge calculations.",
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

      <section id="related-tools" style={{ marginTop: "3rem", padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.35rem", color: "var(--brand-strong)" }}>Related Electric Vehicle &amp; Energy Planning Tools</h2>
        <p style={{ marginBottom: "1.25rem", color: "var(--muted)", lineHeight: 1.55 }}>
          Plan driving range, charging infrastructure, and stationary backup integration:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🚗 EV Driving Range Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Calculate real-world highway range based on speed drag, winter temperatures, and battery state of charge.
            </p>
            <Link href="/ev/ev-range-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              EV Range Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>⚡ EV Charger Breaker Sizing</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Size circuit breakers and wire gauge (AWG) under NEC 625 125% continuous-duty rules for Level 2 EVSE.
            </p>
            <Link href="/ev/ev-charger-breaker-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              EV Breaker Size Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>⏱️ EV Charging Time Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Model charge durations across Level 1 (120V), Level 2 (240V), and DC Fast Charging with taper curves.
            </p>
            <Link href="/ev/ev-charging-time-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              EV Charging Time Calc →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🔋 Portable Power Station Sizing</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Compare high-voltage vehicle V2L battery output against standalone LFP portable power station capacities.
            </p>
            <Link href="/battery/portable-power-station-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Portable Power Station Calc →
            </Link>
          </div>
        </div>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Link href="/home-energy/home-battery-size-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Home Battery Size Calculator</Link>
          <Link href="/ev/ev-savings-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>EV vs Gas Savings Calculator</Link>
          <Link href="/guides/level-2-ev-charging-speed-and-breaker-sizing-guide" className="button secondary-button" style={{ fontSize: "0.85rem" }}>EV Charging Speed Guide</Link>
        </div>
      </section>

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          V2L discharge modeling uses bidirectional inverter conversion efficiencies and user-defined emergency driving reserves. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="ev" />
    </article>
  );
}
