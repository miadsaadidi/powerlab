import type { Metadata } from "next";
import Link from "next/link";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { EvChargingTimeCalculator } from "@/components/calculator/ev-charging-time-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "Level 2 EV Charging Speed & Breaker Sizing Guide (NEC 2026)",
  description: "Engineering calculation guide for Level 2 EV charging speeds, continuous-load breaker sizing (125% rule), conductor ampacity factors, and hardwired vs. plug-in requirements under the 2026 NEC.",
  canonicalPath: "/guides/level-2-ev-charging-speed-and-breaker-sizing-guide",
  category: "ev",
  isArticle: true,
});

const FAQS = [
  {
    question: "What size circuit breaker and wire do I need for a 48-amp EV charger?",
    answer: "Under NFPA 70 (NEC) Article 625.41 and Section 210.20(A), EV charging is a continuous load requiring the overcurrent protective device (OCPD) to be rated at least 125% of the continuous draw. For a 48 A charger, 48 A × 1.25 = 60 A, requiring a 60 A circuit breaker. Conductor sizing depends on wiring method and terminal temperature ratings (NEC 110.14(C) and 310.16): 6 AWG copper with 75°C terminals (such as THHN in conduit) provides 65 A allowable ampacity, whereas Type NM-B (Romex) is limited to the 60°C column (NEC 334.80), where 6 AWG is rated for only 55 A, typically necessitating 4 AWG NM-B or conduit wiring.",
  },
  {
    question: "What is the difference in charging speed between 32A, 40A, and 48A Level 2 chargers?",
    answer: "On a nominal 240 V single-phase supply: A 32 A charger delivers 7.68 kW (approx. 17–28 miles of range per hour across 2.5–4.0 mi/kWh vehicles at 90% wall-to-battery efficiency). A 40 A charger delivers 9.60 kW (approx. 22–35 miles/hr). A 48 A charger delivers 11.52 kW (approx. 26–41 miles/hr). Actual charging rate is governed by the minimum of the EVSE supply power and the vehicle's onboard AC charger rating.",
  },
  {
    question: "Why can't a 48A EV charger use a standard 50A NEMA 14-50 plug?",
    answer: "A standard NEMA 14-50 receptacle is rated for a maximum of 50 A. Because EV charging is a continuous load, NEC Section 210.19(A) and 210.20 limit continuous utilization on a 50 A branch circuit to 80% (40 A maximum continuous current). A 48 A continuous charger requires a 60 A branch circuit (48 A × 1.25 = 60 A). Because NEC Table 210.21(B)(2) does not permit standard 50 A receptacles on a 60 A branch circuit, a 48 A EVSE must be permanently hardwired in compliance with NEC 625.44 and manufacturer listing instructions.",
  },
  {
    question: "What is the typical end-to-end efficiency of residential Level 2 AC charging?",
    answer: "Residential Level 2 AC charging typically exhibits an end-to-end wall-to-battery efficiency of 88% to 92% (nominal planning average of ~90%). Losses occur through branch circuit I²R resistive dissipation, onboard AC-to-DC converter rectification losses, active thermal management coolant pumps, and electrochemical cell charging resistance.",
  },
  {
    question: "What are the 2026 NEC GFCI requirements for Level 2 EVSE installations?",
    answer: "NEC Section 625.54 and Section 210.8 mandate ground-fault circuit-interrupter (GFCI) protection for personnel on all receptacles installed for EV charging (e.g., garage or outdoor NEMA 14-50 outlets). Because listed EVSE units already include integral UL 2594 / NEC 625.22 Personnel Protection Systems (CCID), connecting a plug-in EVSE to an upstream GFCI circuit breaker can cause nuisance tripping due to dual ground-fault sensing thresholds. Hardwired EVSE installations under NEC 625.44 bypass receptacle GFCI requirements, avoiding this interaction while maintaining full code compliance.",
  },
  {
    question: "What happens if the EV's onboard charger rating is lower than the EVSE rating?",
    answer: "Charging power is always governed by the lowest rating in the power path: P_effective = min(P_branch, P_evse, P_onboard). For example, if an EV with a 7.2 kW (30 A @ 240 V) onboard charger is connected to an 11.52 kW (48 A @ 240 V) EVSE, the vehicle's onboard charger will safely draw only 7.2 kW. The EVSE communicates its maximum current capacity via the SAE J1772 / SAE J3400 pilot signal, and the vehicle regulates the actual current drawn.",
  },
];

export default function EvChargingGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Level 2 EV Charging Speed, Amperage & Breaker Sizing Guide (NEC 2026)",
    description: "Engineering calculation guide for Level 2 EV charging speeds, continuous-load breaker sizing (125% rule), conductor ampacity factors, and hardwired vs. plug-in requirements under the 2026 NEC.",
    route: "/guides/level-2-ev-charging-speed-and-breaker-sizing-guide",
    datePublished: "2026-08-22",
    dateModified: "2026-09-30",
    categoryName: "Electric Vehicles",
    categoryRoute: "/ev",
    standards: [
      "NFPA 70: National Electrical Code (NEC), 2026 Edition — Articles 100, 110.14, 210, 310, 334, 625",
      "SAE J1772: Electric Vehicle and Plug-In Hybrid Electric Vehicle Conductive Charge Coupler",
      "SAE J3400: North American Charging Standard (NACS) Electric Vehicle Coupler",
      "UL 2594: Standard for Electric Vehicle Supply Equipment",
      "IEEE 2030.1.1: Standard for Technical Specifications of a DC Quick Charger and EV Infrastructure",
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
          An educational engineering guide to Level 2 residential electric vehicle charging. Learn how to calculate charging speed, apply the 125% continuous-load rule under the 2026 National Electrical Code (NFPA 70), evaluate conductor ampacity by wiring method and terminal rating, and understand hardwired vs. plug-in installation requirements.
        </p>
      </header>

      <DirectAnswerCard
        keyword="level 2 ev charging time and breaker sizing formula"
        answer="Level 2 continuous electrical power equals: Power (kW) = (Voltage × Continuous Amps) ÷ 1,000. Under NFPA 70 (NEC 2026) Article 100 and Section 625.41, EV charging is classified as a continuous load (current expected to continue for 3 hours or more), requiring overcurrent protective devices (OCPD) and branch-circuit conductor ampacity to be rated for at least 125% of the continuous charging current. A 48 A charger requires a 60 A breaker (48 A × 1.25 = 60 A) and delivers 11.52 kW. Minimum conductor sizing depends on wiring method and terminal ratings (e.g., 6 AWG Cu at 75°C terminals or 4 AWG Type NM-B at 60°C limits)."
        formula="P_kW = (V × I_continuous) ÷ 1000   |   Breaker_Amps ≥ I_continuous × 1.25   |   Time_est (h) = ΔkWh_net ÷ (P_kW × η_wall_to_battery)"
        standardExample="240V 48A Charger on 60A Circuit (11.52 kW): Replenishing 46.2 kWh net energy (20% to 80% on a 77 kWh pack) at 90% wall-to-battery efficiency (10.368 kW net charging rate) takes approximately 4.46 Hours (~4h 27m)."
        sourceAuthority="NFPA 70 (NEC 2026) Articles 100, 210.19, 210.20, 310.16, 334.80, 625.41 | SAE J1772 / SAE J3400"
      />

      <PageJumpNav />

      {/* Interactive Live Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Interactive Level 2 EV Charging Time &amp; Speed Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Estimate charging duration and replenishment speed across battery capacities, State of Charge (SOC) windows, and charger output levels. Results represent engineering screening estimates based on steady-state power and nominal conversion efficiency.
          </p>
        </div>
        <EvChargingTimeCalculator />
      </section>

      {/* Section 1: NEC Continuous Load Rule & Sizing Table */}
      <section id="nec-continuous-rule" style={{ marginTop: "2.5rem" }}>
        <div id="sizing-matrix">
          <h2>The NEC Continuous Load Rule &amp; Breaker Sizing (125% Factor)</h2>
          <p>
            Under the <strong>National Electrical Code (NFPA 70, 2026 Edition)</strong>, Article 100 defines a <strong>continuous load</strong> as <em>&ldquo;a load where the maximum current is expected to continue for 3 hours or more.&rdquo;</em> Section 625.41 specifically mandates that overcurrent protection for electric vehicle supply equipment shall be continuous, requiring the overcurrent protective device (OCPD) and branch-circuit conductors to be rated for not less than <strong>125% of the maximum load of the equipment</strong> (equivalent to operating at no more than 80% of the breaker rating):
          </p>
          <div style={{ padding: "1rem 1.25rem", borderRadius: "0.75rem", background: "var(--surface)", border: "1px solid var(--line)", margin: "1rem 0", fontFamily: "var(--font-mono, monospace)", fontSize: "1.05rem", color: "var(--brand-strong)" }}>
            Minimum OCPD Rating (Amps) = EVSE Continuous Output (Amps) × 1.25
          </div>
          <p style={{ fontSize: "0.92rem", color: "var(--muted)" }}>
            <strong>Conductor Sizing Note:</strong> Minimum conductor size must be selected from the applicable column of NEC Table 310.16 based on conductor material, terminal temperature rating (NEC 110.14(C)), wiring method limitations (e.g., NEC 334.80 for Type NM-B), ambient temperature correction, and conduit fill adjustments.
          </p>

          <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <caption>Table 1: Level 2 EV Charging Amperage, Sizing Requirements, Conductor Reference &amp; Range Addition</caption>
              <thead>
                <tr>
                  <th scope="col">Continuous Current</th>
                  <th scope="col">Minimum OCPD (125%)</th>
                  <th scope="col">Power @ 240V</th>
                  <th scope="col">Reference Copper Conductor*</th>
                  <th scope="col">Estimated Range Added / Hr**</th>
                  <th scope="col">Standard Connection Method</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>16 A</strong></td>
                  <td><strong>20 A</strong></td>
                  <td>3.84 kW</td>
                  <td>12 AWG Cu (THHN or NM-B)</td>
                  <td>~9 – 14 miles/hr</td>
                  <td>NEMA 6-20 Plug or Hardwired</td>
                </tr>
                <tr>
                  <td><strong>24 A</strong></td>
                  <td><strong>30 A</strong></td>
                  <td>5.76 kW</td>
                  <td>10 AWG Cu (THHN or NM-B)</td>
                  <td>~13 – 21 miles/hr</td>
                  <td>NEMA 14-30 / Hardwired</td>
                </tr>
                <tr>
                  <td><strong>32 A</strong></td>
                  <td><strong>40 A</strong></td>
                  <td>7.68 kW</td>
                  <td>8 AWG Cu (75°C THHN or 60°C NM-B)</td>
                  <td>~17 – 28 miles/hr</td>
                  <td>NEMA 14-50 Plug or Hardwired</td>
                </tr>
                <tr>
                  <td><strong>40 A</strong></td>
                  <td><strong>50 A</strong></td>
                  <td>9.60 kW</td>
                  <td>6 AWG Cu (75°C THHN or 60°C NM-B)</td>
                  <td>~22 – 35 miles/hr</td>
                  <td>NEMA 14-50 Max Plug Limit / Hardwired</td>
                </tr>
                <tr>
                  <td><strong>48 A</strong></td>
                  <td><strong>60 A</strong></td>
                  <td><strong>11.52 kW</strong></td>
                  <td>6 AWG Cu THHN (4 AWG NM-B Cu)</td>
                  <td><strong>~26 – 41 miles/hr</strong></td>
                  <td><strong>Hardwired Only</strong> (NEC 625.44)</td>
                </tr>
                <tr>
                  <td><strong>80 A</strong></td>
                  <td><strong>100 A</strong></td>
                  <td><strong>19.20 kW</strong></td>
                  <td>3 AWG to 2 AWG Cu THHN (75°C)</td>
                  <td><strong>~43 – 69 miles/hr</strong></td>
                  <td><strong>Hardwired Only</strong> (Commercial / High-Power)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: "0.5rem 0 0" }}>
            *Conductor references assume copper conductors, ≤3 current-carrying conductors in raceway, ambient temperature ≤30°C (86°F), and 75°C equipment terminal ratings per NEC 110.14(C). Per NEC 334.80, Type NM-B (Romex) must be sized using the 60°C ampacity column (where 6 AWG Cu is rated for 55 A, which is insufficient for a 60 A OCPD).<br />
            **Estimated range addition is based on an assumed vehicle efficiency range of 2.5 to 4.0 miles/kWh (250–400 Wh/mi) at 90% wall-to-battery charging efficiency. Actual replenishment depends on vehicle aerodynamics, temperature, battery heating/cooling loads, and driving conditions.
          </p>
        </div>
      </section>

      {/* Section 2: Hardwired vs Plug-in Installations */}
      <section id="hardwired-vs-plugin" style={{ marginTop: "2.5rem" }}>
        <h2>Hardwired vs. Plug-In (NEMA 14-50) EV Chargers: Engineering Comparison</h2>
        <p>
          Residential Level 2 installations utilize either a cord-and-plug connection (such as a 240 V NEMA 14-50 or 6-50 receptacle) or permanent direct hardwiring into a junction box or disconnect switch:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>🔌 Cord-and-Plug Connection (NEMA 14-50 / 6-50)</h3>
            <ul style={{ paddingLeft: "1.25rem", margin: "0.5rem 0 0", fontSize: "0.92rem", lineHeight: 1.6, color: "var(--muted)" }}>
              <li><strong>Continuous Current Limit:</strong> Restricted to 40 A continuous load on a 50 A branch circuit under NEC 210.19(A) and 210.20 (9.6 kW @ 240 V).</li>
              <li><strong>GFCI Requirement:</strong> NEC 625.54 and 210.8 mandate GFCI protection on all EV charging receptacles. Upstream Class A GFCI breakers (4–6 mA threshold) can experience nuisance tripping when paired with the EVSE's internal UL 2594 CCID monitor.</li>
              <li><strong>Receptacle Grade:</strong> Continuous duty EV charging subjects receptacles to prolonged thermal stress. Standard builder-grade residential receptacles can degrade over time; industrial-grade or EV-rated receptacles are strongly recommended.</li>
              <li><strong>Portability:</strong> Allows quick disconnection of mobile charging units when traveling or relocating.</li>
            </ul>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>⚡ Permanently Hardwired (48 A to 80 A Output)</h3>
            <ul style={{ paddingLeft: "1.25rem", margin: "0.5rem 0 0", fontSize: "0.92rem", lineHeight: 1.6, color: "var(--muted)" }}>
              <li><strong>Higher Output Capacity:</strong> Unlocks full 48 A continuous charging (11.52 kW) on a 60 A circuit, or up to 80 A (19.2 kW) on a 100 A circuit.</li>
              <li><strong>No Dual-GFCI Nuisance Tripping:</strong> Under NEC 625.44, hardwired EVSE does not require an upstream receptacle GFCI breaker. Personnel protection is provided by the EVSE's internal UL 2594 / NEC 625.22 listed CCID system.</li>
              <li><strong>Reduced Contact Resistance:</strong> Eliminates plug-to-blade mechanical contact points, reducing terminal thermal degradation and joint heating risks.</li>
              <li><strong>Outdoor Durability:</strong> Provides superior environmental sealing against moisture, dust, and temperature cycling in driveway installations.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Formulas and Onboard Bottlenecks */}
      <section id="formula-math" style={{ marginTop: "2.5rem" }}>
        <div id="how-to-guide">
          <h2>Level 2 Charging Speed Formulas &amp; Power Flow Bottlenecks</h2>
          <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
            The actual power delivered to an EV battery is governed by the minimum component in the electrical series path:
          </p>
          <div style={{ padding: "0.85rem 1.15rem", borderRadius: "0.6rem", background: "var(--surface)", border: "1px solid var(--line)", margin: "0.75rem 0 1.25rem", fontFamily: "var(--font-mono, monospace)", fontSize: "0.98rem", color: "var(--brand-strong)" }}>
            P_effective = min( P_branch_limit, P_evse_rating, P_onboard_charger )
          </div>

          <FormulaCard
            title="Level 2 EV Charging Duration & Energy Formula"
            formula="T_charge (h) = [ (SOC_target - SOC_start) × Capacity_usable_kWh ] ÷ [ P_effective_kW × η_wall_to_battery ]"
            formulaDescription="Estimates steady-state Level 2 charging hours based on required net battery energy, effective power transfer rate, and end-to-end AC-to-chemical conversion efficiency."
            variables={[
              { symbol: "T_charge", label: "Estimated Charging Time", description: "Calculated time required to charge between start and target State of Charge", unit: "Hours (h)" },
              { symbol: "Capacity_usable_kWh", label: "Usable Battery Capacity", description: "Net usable electrochemical capacity of the vehicle battery pack", unit: "Kilowatt-hours (kWh)" },
              { symbol: "SOC_target", label: "Target State of Charge", description: "Target battery percentage (e.g., 0.80 for 80% daily charge)", unit: "Decimal (0.0 – 1.0)" },
              { symbol: "SOC_start", label: "Starting State of Charge", description: "Initial battery percentage when initiating charge (e.g., 0.20 for 20%)", unit: "Decimal (0.0 – 1.0)" },
              { symbol: "P_effective_kW", label: "Effective Charging Power", description: "Governing minimum of supply power, EVSE rating, and onboard AC charger capacity: (V × I) ÷ 1,000", unit: "Kilowatts (kW)" },
              { symbol: "η_wall_to_battery", label: "End-to-End Efficiency", description: "Comprehensive efficiency factoring branch circuit resistance, onboard AC-to-DC rectification, and active thermal management (typically 0.88 to 0.92)", unit: "Decimal (0.0 – 1.0)" },
            ]}
            notes={[
              "This formula provides a steady-state engineering estimate. Real-world charging time may extend during cold weather pre-conditioning or constant-voltage (CV) cell balancing near 100% SOC.",
              "Most modern passenger EVs feature an 11.5 kW (48 A @ 240 V) onboard charger, while plug-in hybrids (PHEVs) frequently feature 3.6 kW or 7.2 kW onboard units.",
            ]}
          />
        </div>
      </section>

      {/* Section 4: Worked Vehicle Examples */}
      <section id="worked-example" style={{ marginTop: "2.5rem" }}>
        <h2>Worked Sizing Examples Across Popular Electric Vehicles</h2>
        <p>
          Calculations for representative vehicles charging across standard daily operating windows with explicit efficiency assumptions:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          {/* Example 1 */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Tesla Model Y Long Range (75 kWh Usable)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Net Energy Required:</strong> 20% to 80% = 45.0 kWh into battery.<br />
              <strong>On 48A Hardwired (11.52 kW @ 90% eff = 10.368 kW net):</strong><br />
              45.0 kWh ÷ 10.368 kW = <strong>4.34 Hours (~4h 20m)</strong>.<br />
              <strong>On 32A Plug-In (7.68 kW @ 90% eff = 6.912 kW net):</strong><br />
              45.0 kWh ÷ 6.912 kW = <strong>6.51 Hours (~6h 31m)</strong>.
            </p>
            <Link href="/ev/ev-charger-breaker-size-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Size Breaker for EV Wall Connector →
            </Link>
          </div>

          {/* Example 2 */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Hyundai Ioniq 5 / Kia EV6 (77.4 kWh Usable)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Net Energy Required:</strong> 15% to 85% = 54.18 kWh into battery.<br />
              <strong>On 40A Plug-In (9.60 kW @ 90% eff = 8.64 kW net):</strong><br />
              54.18 kWh ÷ 8.64 kW = <strong>6.27 Hours (~6h 16m)</strong>.<br />
              <strong>Grid Energy &amp; Cost (@ $0.16/kWh):</strong> 60.20 kWh drawn ($9.63) for ~215 miles added (@ ~3.97 mi/kWh).
            </p>
            <Link href="/ev/ev-charging-cost-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Calculate EV Electricity Cost →
            </Link>
          </div>

          {/* Example 3 */}
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>Ford F-150 Lightning (131 kWh Usable Extended)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--muted)", margin: "0 0 0.75rem" }}>
              <strong>Net Energy Required:</strong> 20% to 80% = 78.6 kWh into battery.<br />
              <strong>On 48A Standard L2 (11.52 kW @ 90% eff = 10.368 kW net):</strong><br />
              78.6 kWh ÷ 10.368 kW = <strong>7.58 Hours (~7h 35m)</strong>.<br />
              <strong>On 80A Station (19.20 kW on 100A Breaker @ 90% eff = 17.28 kW net):</strong><br />
              78.6 kWh ÷ 17.28 kW = <strong>4.55 Hours (~4h 33m)</strong>.
            </p>
            <Link href="/ev/v2l-runtime-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Calculate Ford Pro Power / V2L Runtime →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Connected Tools Navigation */}
      <section id="related-tools" style={{ marginTop: "2.5rem" }}>
        <h2>Connected EV Infrastructure &amp; Electrical Planning Tools</h2>
        <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
          Safe and efficient Level 2 charging requires harmonizing branch circuit overcurrent protection, conductor thermal limits over distance, and vehicle onboard converter capacities:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginTop: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>🔌 EV Charger Breaker Size Calculator</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Determine the required OCPD breaker rating and conductor sizing under the NEC 125% continuous-load rule across residential amperages.
            </p>
            <Link href="/ev/ev-charger-breaker-size-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              EV Charger Breaker Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>⏱️ EV Charging Time Simulator</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Model recharge duration from 20% to 80% daily windows across battery pack sizes (40 to 135 kWh) and realistic AC conversion efficiencies.
            </p>
            <Link href="/ev/ev-charging-time-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              EV Charging Time Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>📏 Feeder Run &amp; Voltage Drop</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Size long garage or detached feeder runs (50–150 ft) to verify that circuit voltage drop satisfies NEC 210.19(A) Informational Note guidance (&le;3%).
            </p>
            <Link href="/battery/voltage-drop-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Voltage Drop &amp; Wire Size Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>📊 EVSE Terminal Temperature Benchmark</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Review 120 continuous load empirical simulation records evaluating conductor heating, 60°C vs 75°C terminal ratings, and lug thermal dissipation.
            </p>
            <Link href="/datasets/continuous-duty-evse-terminal-temperature-benchmark" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              EVSE Terminal Benchmark Dataset (PL-DS-EVSE-01) →
            </Link>
          </div>
        </div>

        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Also evaluate main service panel busbar limits with our <Link href="/guides/nec-705-12-120-percent-rule-solar-busbar-sizing-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>NEC 705.12 120% Busbar Sizing Guide</Link>, calculate driving range in the <Link href="/ev/ev-range-calculator" style={{ fontWeight: 600, color: "var(--accent)" }}>EV Real-World Range Calculator</Link>, model utility bills with the <Link href="/ev/ev-charging-cost-calculator" style={{ fontWeight: 600, color: "var(--accent)" }}>EV Charging Cost Calculator</Link>, or examine vehicle-to-home backup in the <Link href="/ev/v2l-runtime-calculator" style={{ fontWeight: 600, color: "var(--accent)" }}>V2L Runtime Calculator</Link>.
        </p>
      </section>

      {/* Section 6: FAQs */}
      <section id="faq-section" style={{ marginTop: "2.5rem" }}>
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
        <h2 style={{ marginTop: 0 }}>Methodology &amp; Standards References</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)" }}>
          The calculations and installation criteria in this guide reference the following consensus standards and electrical codes:
        </p>
        <ul style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--muted)", paddingLeft: "1.25rem", margin: "0.75rem 0 1.25rem" }}>
          <li><strong>NFPA 70: National Electrical Code (NEC), 2026 Edition:</strong> Supports branch-circuit continuous load ratings (Article 100 &amp; Section 625.41), overcurrent protective device sizing (Section 210.20), receptacle limitations (Section 210.21(B)), conductor ampacity and terminal temperature coordination (Sections 110.14(C), 310.16, 334.80), and receptacle GFCI protection (Sections 210.8 &amp; 625.54).</li>
          <li><strong>SAE J1772 &amp; SAE J3400 (NACS):</strong> Supports conductive AC power transfer signaling protocols, control pilot duty cycle current limits, and mechanical coupler ratings.</li>
          <li><strong>UL 2594 (Standard for Electric Vehicle Supply Equipment):</strong> Supports product safety listings, equipment thermal testing, and integral personnel protection system (CCID) requirements.</li>
          <li><strong>IEEE 2030.1.1:</strong> Supports consensus guidelines for EV infrastructure interfaces and grid power system integration.</li>
        </ul>

        <div style={{ padding: "1rem", borderRadius: "0.6rem", background: "var(--soft, #f8fafc)", border: "1px solid var(--line)", fontSize: "0.85rem", color: "var(--muted)", margin: "1rem 0" }}>
          <strong>Technical Disclaimer:</strong> This guide provides educational engineering screening calculations based on the 2026 National Electrical Code (NFPA 70). Local jurisdictions adopt, amend, and enforce electrical codes independently; the applicable local electrical code, Authority Having Jurisdiction (AHJ), EVSE manufacturer installation instructions, and equipment listings govern all physical installations. This page does not provide formal engineering design, architectural drawings, or permit-ready electrical specifications.
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
          <Link href="/research/continuous-duty-thermal-sizing-evse-ampacity" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            📄 Read Research Report PL-TR-2026-EVSE01 →
          </Link>
          <Link href="/datasets/continuous-duty-evse-terminal-temperature-benchmark" style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
            📊 Download Benchmark Dataset PL-DS-EVSE-01 →
          </Link>
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

