import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { EvChargingTimeCalculator } from "@/components/calculator/ev-charging-time-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";

export const metadata: Metadata = {
  title: "Level 2 EV Charging Speed, Amperage & Breaker Sizing Guide — PowerLab",
  description: "Calculate Level 2 EV charging speed, charge times, and electrical breaker sizing. Master the NEC 80% continuous load rule for 16A, 24A, 32A, 40A, and 48A chargers.",
  alternates: { canonical: "/guides/level-2-ev-charging-speed-and-breaker-sizing-guide" },
  openGraph: {
    title: "Level 2 EV Charging Speed & Breaker Sizing Guide — PowerLab",
    description: "Complete electrical engineering guide to Level 2 EV charging speeds, breaker sizing, wire gauges, and NEC continuous load calculations.",
    url: `${siteConfig.url}/guides/level-2-ev-charging-speed-and-breaker-sizing-guide`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "article",
  },
};

const FAQS = [
  {
    question: "What size circuit breaker do I need for a 48-amp EV charger?",
    answer: "A 48-amp EV charger requires a dedicated 60-amp circuit breaker and minimum 6 AWG copper (or 4 AWG NM-B Romex) conductors. Under NEC Article 625.41, EV charging is classified as a continuous load, requiring the circuit breaker and wiring to be rated for at least 125% of the charger's continuous draw (48A × 1.25 = 60A).",
  },
  {
    question: "What is the difference in charging speed between 32A, 40A, and 48A Level 2 chargers?",
    answer: "On a 240V supply: A 32A charger provides 7.68 kW (~25–30 miles of range per hour). A 40A charger provides 9.60 kW (~30–38 miles of range per hour). A 48A charger provides 11.52 kW (~36–46 miles of range per hour). The exact speed is capped by the vehicle's onboard AC-to-DC converter limit.",
  },
  {
    question: "Why can't I use a 50A plug-in outlet for a 48A EV charger?",
    answer: "Standard NEMA 14-50 or 6-50 receptacles are rated for a maximum of 50 amps. Because EV charging is a continuous load, NEC rules restrict plug-in continuous draw on a 50A breaker to 80% (40 amps maximum). To charge at 48 amps (requiring a 60A circuit), the EVSE must be permanently hardwired directly into the electrical panel without a plug.",
  },
  {
    question: "How much efficiency is lost during Level 2 AC charging?",
    answer: "Level 2 AC charging generally operates at 88% to 92% overall efficiency. Losses occur across the supply wiring (resistance/voltage drop), the vehicle's internal AC-to-DC onboard inverter, battery thermal management pumps, and electrochemical charging resistance.",
  },
  {
    question: "What happens if my EV's onboard charger rating is lower than the wall charger?",
    answer: "Charging speed is always throttled to the lower of the two limits. For example, if you connect a 48A (11.5 kW) charger to a plug-in hybrid (PHEV) or older EV with a 3.6 kW or 7.2 kW onboard charger, the vehicle will safely pull only 3.6 kW or 7.2 kW, causing no damage to either equipment.",
  },
];

export default function EvChargingGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Level 2 EV Charging Speed, Amperage & Breaker Sizing Guide",
    description: "Engineering guide to Level 2 EV charging speeds, breaker sizing, wire gauges, and NEC 80% continuous load calculations.",
    route: "/guides/level-2-ev-charging-speed-and-breaker-sizing-guide",
    datePublished: "2026-08-22",
    dateModified: "2026-08-22",
    categoryName: "Electric Vehicles",
    categoryRoute: "/ev",
    standards: [
      "NFPA 70 / NEC Article 625 (Electric Vehicle Power Transfer Systems)",
      "SAE J1772 / SAE J3400 (North American Charging Standard)",
      "UL 2594 (Standard for Electric Vehicle Supply Equipment)",
      "IEEE 2030.1.1 (Standard for EV Infrastructure Interfaces)",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/guides">Guides</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Level 2 EV Charging Guide</span>
      </nav>

      <header className="calculator-header">
        <p className="eyebrow">EV Infrastructure &amp; Electrical Engineering Guide</p>
        <h1>Level 2 EV Charging Speed, Amperage &amp; Breaker Sizing Guide</h1>
        <p className="intro">
          A definitive engineering guide to Level 2 residential EV charging. Learn how to calculate charging speed, select the correct circuit breaker and wire gauge under the NEC 80% continuous load rule, and compare hardwired vs. plug-in installations.
        </p>
      </header>

      <DirectAnswerCard
        keyword="level 2 ev charging time and breaker sizing formula"
        answer="Level 2 charging power equals: Power (kW) = (Voltage × Continuous Amps) ÷ 1,000. Under NEC Article 625, EV charging is defined as a continuous load (≥3 hours duration), requiring circuit breakers and conductor ampacity to be sized at 125% of the continuous charging current. A 48A charger requires a 60A breaker and delivers 11.52 kW, replenishing 35 to 45 miles of range per hour."
        formula="P_kW = (V × I_continuous) ÷ 1000   |   Breaker_Amps ≥ I_continuous × 1.25   |   Time (h) = ΔkWh ÷ (P_kW × η_onboard)"
        standardExample="240V 48A Charger on 60A Breaker (11.52 kW): Charging a 77 kWh battery from 20% to 80% (46.2 kWh net @ 90% onboard efficiency) takes 4.46 Hours (~4h 27m)."
        sourceAuthority="NFPA 70 / NEC Article 625.41 & 625.42 / SAE J1772 Standards"
      />

      <PageJumpNav />

      {/* Interactive Live Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Live Interactive EV Charging Time &amp; Speed Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Enter your vehicle battery capacity, starting/target State of Charge (SOC), and charger power level to calculate exact charging duration and mileage replenishment rates.
          </p>
        </div>
        <EvChargingTimeCalculator />
      </section>

      {/* Section 1: NEC 80% Continuous Load Rule */}
      <section id="nec-continuous-rule" style={{ marginTop: "2.5rem" }}>
        <h2>The NEC 80% Continuous Load Rule Explained (125% Factor)</h2>
        <p>
          According to <strong>National Electrical Code (NEC Article 100 &amp; 625.41)</strong>, an electric vehicle charger is classified as a <strong>continuous load</strong> because maximum current flows uninterrupted for 3 hours or longer.
        </p>
        <p>
          To prevent thermal overheating inside circuit breaker panels and branch conduits, breakers must never be loaded beyond <strong>80% of their nameplate rating</strong>:
        </p>
        <div style={{ padding: "1rem 1.25rem", borderRadius: "0.75rem", background: "var(--surface)", border: "1px solid var(--line)", margin: "1rem 0", fontFamily: "var(--font-mono, monospace)", fontSize: "1.05rem", color: "var(--brand-strong)" }}>
          Breaker Size (Amps) = Charger Continuous Output (Amps) × 1.25
        </div>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 1: Level 2 EV Charging Amperage, Breaker Sizing, Conductor Gauge &amp; Replenishment Speed</caption>
            <thead>
              <tr>
                <th scope="col">Continuous Current</th>
                <th scope="col">Required Breaker</th>
                <th scope="col">Power @ 240V</th>
                <th scope="col">Min Copper Wire Gauge</th>
                <th scope="col">Miles of Range Added / Hr</th>
                <th scope="col">Standard Installation Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>16 Amps</strong></td>
                <td><strong>20 Amps</strong></td>
                <td>3.84 kW</td>
                <td>12 AWG Copper</td>
                <td>12 – 15 miles/hr</td>
                <td>NEMA 6-20 Plug or Hardwired</td>
              </tr>
              <tr>
                <td><strong>24 Amps</strong></td>
                <td><strong>30 Amps</strong></td>
                <td>5.76 kW</td>
                <td>10 AWG Copper</td>
                <td>18 – 23 miles/hr</td>
                <td>NEMA 14-30 / Dryer Outlet</td>
              </tr>
              <tr>
                <td><strong>32 Amps</strong></td>
                <td><strong>40 Amps</strong></td>
                <td>7.68 kW</td>
                <td>8 AWG Copper (6 AWG NM-B)</td>
                <td>25 – 32 miles/hr</td>
                <td>NEMA 14-50 Plug or Hardwired</td>
              </tr>
              <tr>
                <td><strong>40 Amps</strong></td>
                <td><strong>50 Amps</strong></td>
                <td>9.60 kW</td>
                <td>6 AWG Copper</td>
                <td>30 – 38 miles/hr</td>
                <td>NEMA 14-50 Max Limit / Hardwired</td>
              </tr>
              <tr>
                <td><strong>48 Amps</strong></td>
                <td><strong>60 Amps</strong></td>
                <td><strong>11.52 kW</strong></td>
                <td>6 AWG THHN (4 AWG NM-B)</td>
                <td><strong>36 – 46 miles/hr</strong></td>
                <td><strong>Hardwired Only</strong> (No Plug Allowed)</td>
              </tr>
              <tr>
                <td><strong>80 Amps</strong></td>
                <td><strong>100 Amps</strong></td>
                <td><strong>19.20 kW</strong></td>
                <td>3 AWG to 2 AWG THHN</td>
                <td><strong>60 – 75 miles/hr</strong></td>
                <td><strong>Commercial / Dual-Inverter Truck</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Hardwired vs Plug-in */}
      <section id="hardwired-vs-plugin" style={{ marginTop: "2.5rem" }}>
        <h2>Hardwired vs. Plug-In (NEMA 14-50) EV Chargers: Which is Best?</h2>
        <p>
          Homeowners frequently debate whether to install a 240V NEMA 14-50 outlet or permanently hardwire their Electric Vehicle Supply Equipment (EVSE):
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>🔌 NEMA 14-50 Plug-In (Max 40A / 9.6kW)</h3>
            <ul style={{ paddingLeft: "1.25rem", margin: "0.5rem 0 0", fontSize: "0.92rem", lineHeight: 1.6, color: "var(--muted)" }}>
              <li><strong>Portability:</strong> Easy to unplug and take if you move.</li>
              <li><strong>Capped Speed:</strong> Restricted to 40A continuous (or 32A on standard mobile connectors).</li>
              <li><strong>GFCI Requirement:</strong> NEC 2020/2023 requires expensive GFCI circuit breakers on receptacles, which can cause nuisance tripping with EVSEs.</li>
              <li><strong>Thermal Stress:</strong> Cheap residential-grade 14-50 outlets can melt under prolonged continuous loads.</li>
            </ul>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>⚡ Direct Hardwire (Max 48A / 11.5kW+)</h3>
            <ul style={{ paddingLeft: "1.25rem", margin: "0.5rem 0 0", fontSize: "0.92rem", lineHeight: 1.6, color: "var(--muted)" }}>
              <li><strong>Maximum Speed:</strong> Unlocks full 48A (11.52 kW) continuous charging on a 60A breaker.</li>
              <li><strong>Maximum Safety:</strong> Eliminates plug contact resistance and receptacle melting hazards.</li>
              <li><strong>No Nuisance Tripping:</strong> Direct connection bypasses the receptacle GFCI breaker requirement in many jurisdictions.</li>
              <li><strong>Weatherproof:</strong> Superior durability for outdoor driveway installations.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Formulas and Onboard Bottlenecks */}
      <section id="formula-breakdown" style={{ marginTop: "2.5rem" }}>
        <h2>Deterministic Charging Speed Formulas &amp; Onboard Limitations</h2>

        <FormulaCard
          title="Level 2 EV Charging Duration & Energy Formula"
          formula="T_charge = [ (SOC_target - SOC_start) × Capacity_usable_kWh ] ÷ [ min(P_evse, P_onboard) × η_system ]"
          formulaDescription="Calculates exact charging hours based on battery capacity delta, minimum bottleneck between wall charger and vehicle onboard inverter, and cumulative AC-to-chemical conversion efficiency."
          variables={[
            { symbol: "T_charge", label: "Charging Duration", description: "Time required to charge from start to target State of Charge", unit: "Hours (h)" },
            { symbol: "Capacity_usable_kWh", label: "Usable Battery Pack", description: "Net usable battery capacity rating of the EV", unit: "Kilowatt-hours (kWh)" },
            { symbol: "SOC_target", label: "Target State of Charge", description: "Target battery percentage (e.g., 0.80 for daily 80% charging)", unit: "Decimal (0.0 – 1.0)" },
            { symbol: "SOC_start", label: "Starting State of Charge", description: "Initial battery percentage when plugging in (e.g., 0.20 for 20%)", unit: "Decimal (0.0 – 1.0)" },
            { symbol: "P_evse", label: "Wall Charger Output", description: "Maximum power delivered by EVSE: (Volts × Amps) ÷ 1,000", unit: "Kilowatts (kW)" },
            { symbol: "P_onboard", label: "Vehicle Inverter Limit", description: "Maximum AC acceptance rate of vehicle's onboard charger (typically 7.7kW to 11.5kW)", unit: "Kilowatts (kW)" },
            { symbol: "η_system", label: "Conversion Efficiency", description: "System efficiency accounting for wiring resistance, inverter loss, and battery cooling (typically 0.89 to 0.92)", unit: "Decimal (0.0 – 1.0)" },
          ]}
          notes={[
            "Most modern passenger EVs (Tesla, Hyundai, Kia, Ford, BMW) feature an 11.5 kW (48A) onboard charger.",
            "Plug-in hybrids (PHEVs) typically feature smaller 3.6 kW or 7.2 kW onboard chargers.",
          ]}
        />
      </section>

      {/* Section 4: Real-World Vehicle Calculations */}
      <section id="worked-examples" style={{ marginTop: "2.5rem" }}>
        <h2>Worked Sizing Examples Across Popular Electric Vehicles</h2>
        <p>
          Step-by-step charge calculations for common vehicles charging from 20% to 80% (the recommended daily battery health window):
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          {/* Example 1 */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Tesla Model Y Long Range (75 kWh)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Target Delta:</strong> 20% to 80% = 45.0 kWh required.<br />
              <strong>On 48A Hardwired (11.52 kW @ 91% eff = 10.48 kW net):</strong><br />
              45.0 kWh ÷ 10.48 kW = <strong>4.29 Hours (4h 17m)</strong>.<br />
              <strong>On 32A Mobile Plug (7.68 kW @ 89% eff = 6.84 kW net):</strong><br />
              45.0 kWh ÷ 6.84 kW = <strong>6.58 Hours (6h 35m)</strong>.
            </p>
            <Link href="/ev/ev-charger-breaker-size-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Size Breaker for Tesla Wall Connector →
            </Link>
          </div>

          {/* Example 2 */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Hyundai Ioniq 5 / EV6 (77.4 kWh)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Target Delta:</strong> 15% to 85% = 54.18 kWh required.<br />
              <strong>On 40A NEMA 14-50 (9.60 kW @ 90% eff = 8.64 kW net):</strong><br />
              54.18 kWh ÷ 8.64 kW = <strong>6.27 Hours (6h 16m)</strong>.<br />
              <strong>Daily Cost (@ $0.16/kWh):</strong> $9.63 for ~215 miles added.
            </p>
            <Link href="/ev/ev-charging-cost-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Calculate EV Electricity Cost →
            </Link>
          </div>

          {/* Example 3 */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Ford F-150 Lightning (131 kWh Extended)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Target Delta:</strong> 20% to 80% = 78.6 kWh required.<br />
              <strong>On 48A Standard L2 (11.52 kW):</strong> 7.50 Hours.<br />
              <strong>On 80A Dual-Inverter Pro Station (19.2 kW @ 100A Breaker):</strong><br />
              78.6 kWh ÷ (19.2 kW × 0.92) = <strong>4.45 Hours</strong>.
            </p>
            <Link href="/ev/v2l-runtime-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Calculate Ford Pro Power / V2L Runtime →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Connected Tools Navigation */}
      <section style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.3rem" }}>Connected EV Planning Calculators</h2>
        <p style={{ color: "var(--muted)", fontSize: "0.92rem", marginBottom: "1rem" }}>
          Explore our suite of deterministic EV charging, electrical infrastructure, and savings tools:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
          <Link href="/ev/ev-charging-time-calculator" className="button secondary-button">EV Charging Time Calculator</Link>
          <Link href="/ev/ev-charger-breaker-size-calculator" className="button secondary-button">EV Charger Breaker Size Calculator</Link>
          <Link href="/ev/ev-charging-cost-calculator" className="button secondary-button">EV Charging Cost Calculator</Link>
          <Link href="/ev/ev-range-calculator" className="button secondary-button">EV Real-World Range Calculator</Link>
          <Link href="/ev/ev-savings-calculator" className="button secondary-button">EV vs Gas Savings Calculator</Link>
          <Link href="/ev/v2l-runtime-calculator" className="button secondary-button">Vehicle-to-Load (V2L) Runtime Calculator</Link>
        </div>
      </section>

      {/* Section 6: FAQs */}
      <section id="faqs" style={{ marginTop: "2.5rem" }}>
        <h2>Frequently Asked Questions</h2>
        <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              style={{
                padding: "1rem 1.25rem",
                borderRadius: "0.75rem",
                border: "1px solid var(--line)",
                background: "var(--surface)",
              }}
            >
              <summary style={{ fontWeight: 600, cursor: "pointer", color: "var(--brand-strong)" }}>
                {faq.question}
              </summary>
              <p style={{ margin: "0.75rem 0 0", lineHeight: 1.6, color: "var(--muted)" }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Section 7: Standards & Citations */}
      <section id="sources-methodology" style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0 }}>Methodology &amp; Standards Citations</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)" }}>
          Calculations adhere to <strong>NFPA 70 / NEC Article 625</strong> (Electric Vehicle Power Transfer Systems), <strong>SAE J1772</strong> / <strong>SAE J3400 (NACS)</strong> protocol standards, <strong>UL 2594</strong>, and <strong>IEEE 2030.1.1</strong> EV electrical infrastructure requirements.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
          <Link href="/methodology" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Full PowerLab Calculation Methodology →
          </Link>
          <Link href="/sources" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            Technical Standards &amp; Data Sources →
          </Link>
        </div>
      </section>
    </article>
  );
}
