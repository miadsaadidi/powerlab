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
import { Disclaimer } from "@/components/shared/Disclaimer";

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
    answer: "Vehicle-to-Load (V2L) is a bidirectional charging feature in modern EVs (like Hyundai Ioniq 5/6, Kia EV6/EV9, Ford F-150 Lightning, Rivian R1T) that allows the vehicle's high-voltage battery pack to power standard 120V (or 240V) household appliances via an external adapter plug or onboard AC outlets.",
  },
  {
    question: "How many days can an EV power a house during a blackout?",
    answer: "A 77 kWh EV battery starting at 90% SOC with a 20% reserve and 88% conversion efficiency provides about 47.4 kWh of delivered AC energy. At a constant 350W critical load (refrigerator, Wi-Fi, LED lights, phone charging), that powers essential household appliances for approximately 5.65 days (135.5 hours) continuously. Actual runtime varies with load profile, vehicle limits, conversion losses, ambient temperature, and vehicle-specific V2L behavior.",
  },
  {
    question: "Why should you keep an emergency driving reserve in V2L mode?",
    answer: "In an extended storm outage or regional disaster, you may need your vehicle to travel, purchase emergency supplies, or reach an operational DC fast charger. Setting a 20% to 30% reserve (e.g. 15.5 kWh on a 77.4 kWh battery, representing an illustrative protected range of ~50 miles at 3.3 mi/kWh) prevents draining the traction battery to 0%. Actual preserved driving range depends on vehicle efficiency, speed, temperature, terrain, HVAC use, and vehicle-specific SOC limits.",
  },
  {
    question: "Can V2L run an air conditioner or heat pump?",
    answer: "V2L output limits are vehicle- and configuration-specific. Verify the manufacturer's rated continuous and peak output, voltage, current, and connector/adapter requirements. Standard 120V V2L ports (often 1.8 kW to 3.6 kW continuous) can run a portable AC or window unit, but cannot start a large 240V central AC compressor. Vehicles configured with 240V split-phase bidirectional output (such as 7.2 kW or 9.6 kW systems) can power larger branch circuits or a transfer switch subpanel within their rated continuous kW limits.",
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
      "Vehicle-specific continuous V2L power output limits",
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

      <div id="calculator-tool">
        <V2lRuntimeCalculator />
      </div>

      <Disclaimer variant="calculator" />

      <DirectAnswerCard
        keyword="Vehicle-to-Load (V2L) backup runtime calculation"
        answer="A standard 77 kWh EV battery starting at 90% SOC with a 20% reserve and 88% conversion efficiency provides about 47.4 kWh of delivered AC energy, powering essential blackout home loads (~350W average) for approximately 5.65 continuous days (135.5 hours), while preserving a 15.4 kWh emergency driving buffer."
        formula="V2L Runtime (Hours) = {[Battery Pack Capacity (kWh) × (Current SoC − Reserve SoC)] × Inverter Efficiency} ÷ Average Load (kW)"
        standardExample="77 kWh EV at 90% SoC with 20% reserve (53.9 kWh usable) @ 88% efficiency & 350W load: (53.9 × 0.88) ÷ 0.35 = 135.5 hours (5.65 days)"
        sourceAuthority="ISO 15118-20 / UL 9741 / SAE J3072 Reference Guidelines"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate EV Backup Power (V2L / V2H) Runtime</h2>
        <ol>
          <li><strong>Select EV Battery Pack:</strong> Enter your vehicle&apos;s usable battery capacity in kWh (e.g. 58 kWh, 77.4 kWh, 99.8 kWh, 131 kWh).</li>
          <li><strong>Set Initial Charge &amp; Emergency Driving Reserve:</strong> Choose what percentage of the battery to preserve for evacuation or post-storm driving (e.g., 20% reserve).</li>
          <li><strong>Select Essential Emergency Loads:</strong> Calculate average running watts for critical devices (refrigerator, Wi-Fi, lighting, medical equipment).</li>
          <li><strong>Review Multi-Day Runtime Duration:</strong> View exact hours and full 24-hour days of emergency backup power available.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Common EV Battery Capacities &amp; Emergency Runtimes</h2>
        <p>Representative blackout backup durations for popular EV battery packs under typical 350W critical loads (modeled at 90% starting SOC, 20% reserve, and 88% conversion efficiency):</p>
        <div className="scenario-table" role="region" aria-label="Common EV battery capacities and emergency runtimes">
          <table>
            <caption>Vehicle battery capacity, rated continuous V2L output, and 350W essential backup duration</caption>
            <thead>
              <tr>
                <th scope="col">EV Model / Battery Pack</th>
                <th scope="col">Battery Capacity</th>
                <th scope="col">Continuous V2L Output</th>
                <th scope="col">350W Essential Runtime</th>
                <th scope="col">Illustrative Reserve (20% SOC)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Hyundai Ioniq 5 / Kia EV6 (Standard)</strong></td>
                <td>58.0 kWh</td>
                <td>1.9 kW (120V 16A)</td>
                <td><strong>4.25 Days</strong> (102.1 hrs)</td>
                <td>11.6 kWh (~38 Mi)</td>
              </tr>
              <tr>
                <td><strong>Hyundai Ioniq 5 / Kia EV6 (Long Range)</strong></td>
                <td>77.4 kWh</td>
                <td>1.9 kW (120V 16A)</td>
                <td><strong>5.68 Days</strong> (136.2 hrs)</td>
                <td>15.5 kWh (~51 Mi)</td>
              </tr>
              <tr>
                <td><strong>Kia EV9 (99.8 kWh Battery)</strong></td>
                <td>99.8 kWh</td>
                <td>3.6 kW (120V/240V)</td>
                <td><strong>7.32 Days</strong> (175.7 hrs)</td>
                <td>20.0 kWh (~66 Mi)</td>
              </tr>
              <tr>
                <td><strong>Ford F-150 Lightning (Extended)</strong></td>
                <td>131.0 kWh</td>
                <td>9.6 kW (120V/240V)</td>
                <td><strong>9.61 Days</strong> (230.6 hrs)</td>
                <td>26.2 kWh (~86 Mi)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.75rem" }}>
          V2L output limits are vehicle- and configuration-specific. Verify the manufacturer&apos;s rated continuous and peak output, voltage, current and connector/adapter requirements. Preserved driving range is illustrative (modeled at 3.3 mi/kWh); actual range depends on temperature, speed, terrain, and vehicle efficiency.
        </p>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Vehicle-to-Load Emergency Runtime Calculation Formulas"
          formula="Delivered_AC_kWh = Capacity × (SOC_start - SOC_reserve) × Inverter_Efficiency"
          formulaDescription="Calculates delivered bidirectional AC backup energy and operating duration under continuous appliance loads."
          variables={[
            { symbol: "Capacity", label: "Gross Usable Battery Pack", description: "Nominal usable traction battery energy of the electric vehicle", unit: "kWh" },
            { symbol: "SOC_start", label: "Initial State of Charge", description: "Starting battery charge percentage when grid power is lost", unit: "%" },
            { symbol: "SOC_reserve", label: "Protected Driving Reserve", description: "Minimum state of charge cutoff reserved for emergency vehicle transportation", unit: "%" },
            { symbol: "Inverter_Efficiency", label: "Bidirectional Power Conversion", description: "Onboard high-voltage DC to 120V/240V AC inverter efficiency (canonical: 88%)", unit: "%" },
            { symbol: "Runtime_Hours", label: "Total Backup Duration", description: "Delivered_AC_kWh ÷ (Continuous_Watts / 1000)", unit: "Hours" },
          ]}
          notes={[
            "Preserving a 20% reserve retains battery energy for emergency travel (e.g. 15.4 kWh on a 77 kWh pack). Driving range varies by vehicle efficiency, temperature, and driving conditions.",
            "Total Load (Watts) represents total continuous power drawn. V2L output limits and inverter efficiency (modeled at 88%) depend on vehicle architecture and load level.",
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

      <section id="companion-guide" style={{ margin: "2.5rem 0", padding: "1.5rem", borderRadius: "0.85rem", background: "linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.08) 100%)", border: "1px solid rgba(139, 92, 246, 0.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <span style={{ fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", color: "#8b5cf6", letterSpacing: "0.05em" }}>Companion Engineering Guide</span>
            <h3 style={{ margin: "0.35rem 0 0.5rem", fontSize: "1.2rem", color: "var(--brand-strong)" }}>EV V2L &amp; V2H Home Backup Power Guide</h3>
            <p style={{ margin: 0, fontSize: "0.925rem", color: "var(--muted)", maxWidth: "700px", lineHeight: 1.5 }}>
              Learn how to wire manual transfer switches, resolve neutral-ground bonding under NEC 250 (3-pole vs 2-pole), compare V2L vs V2H vs V2G systems, and calculate blackout runtimes.
            </p>
          </div>
          <Link href="/guides/ev-v2l-v2h-home-backup-power-guide" className="button primary-button" style={{ whiteSpace: "nowrap", alignSelf: "center" }}>
            Read Electrical Guide →
          </Link>
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
          <Link href="/guides/ev-v2l-v2h-home-backup-power-guide" className="button secondary-button" style={{ fontSize: "0.85rem", borderColor: "#8b5cf6", color: "#8b5cf6" }}>EV V2L &amp; V2H Backup Guide</Link>
          <Link href="/home-energy/home-battery-size-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Home Battery Size Calculator</Link>
          <Link href="/battery/battery-runtime-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Battery Runtime Calculator</Link>
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
