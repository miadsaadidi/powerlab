import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { EvChargingTimeCalculator } from "@/components/calculator/ev-charging-time-calculator";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { SystemFlowDiagram } from "@/components/seo/system-flow-diagram";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { calculateEvChargingTime } from "@/lib/calculators/ev-charging-time/engine";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = buildPageMetadata({
  title: "EV Charging Time Calculator — AC & DC Speed",
  description: "Estimate EV charging time from battery capacity, start and target charge, charger power and vehicle limits with clear AC and DC assumptions.",
  canonicalPath: "/ev/ev-charging-time-calculator",
  category: "ev",
});

const FAQS = [
  {
    question: "How long does it take to charge an electric car on a 240V Level 2 charger?",
    answer: "A standard Level 2 home charger (7.68 kW to 11.52 kW / 32A to 48A @ 240V) recharges an average 60 kWh to 75 kWh usable capacity EV battery from 20% to 80% (a 60-percentage-point increase) in approximately 4.3 to 6.5 hours under standard 90% AC wall-to-battery efficiency assumptions, easily completing overnight.",
  },
  {
    question: "How long does Level 1 (120V wall outlet) EV charging take?",
    answer: "A standard 120V household outlet delivers ~1.44 kW (12A continuous). Recharging a 60 kWh usable battery from 20% to 80% (36 kWh added) takes roughly 27 to 29 hours at 90% AC wall-to-battery charging efficiency.",
  },
  {
    question: "Why does DC Fast Charging slow down above 80%?",
    answer: "Lithium-ion battery cells experience higher internal resistance, polarization, and thermal stress as state of charge increases. To protect cells against lithium plating and thermal degradation, vehicle battery management systems (BMS) reduce (taper) charging current. DC charging power typically decreases as SOC rises; the exact charging curve varies by vehicle, battery temperature, SOC and charger conditions.",
  },
  {
    question: "What is the difference between EVSE maximum power and vehicle onboard acceptance limit?",
    answer: "EVSE maximum power is the electrical power the charging station can supply. During AC charging, the vehicle onboard charger rectifies AC to DC and limits maximum intake (e.g., 7.68 kW vs 11.52 kW). Actual charging power is determined by min(EVSE maximum power, vehicle maximum acceptance limit).",
  },
];

const PACK_SIZES = [50, 60, 75, 100];
const COMPARISON_CHARGERS = [
  { label: "Level 1 AC (1.44 kW / 120V 12A)", powerKw: 1.44, type: "AC" as const, vehicleMaxAcKw: 11.52 },
  { label: "Level 2 AC (3.84 kW / 240V 16A)", powerKw: 3.84, type: "AC" as const, vehicleMaxAcKw: 11.52 },
  { label: "Level 2 AC (7.68 kW / 240V 32A)", powerKw: 7.68, type: "AC" as const, vehicleMaxAcKw: 11.52 },
  { label: "Level 2 AC (9.60 kW / 240V 40A)", powerKw: 9.60, type: "AC" as const, vehicleMaxAcKw: 11.52 },
  { label: "Level 2 AC (11.52 kW / 240V 48A)", powerKw: 11.52, type: "AC" as const, vehicleMaxAcKw: 11.52 },
  { label: "DC Fast Charging (50 kW)", powerKw: 50, type: "DC" as const, vehicleMaxDcKw: 150 },
  { label: "DC Ultra-Fast (150 kW)", powerKw: 150, type: "DC" as const, vehicleMaxDcKw: 150 },
  { label: "DC Ultra-Fast (350 kW)", powerKw: 350, type: "DC" as const, vehicleMaxDcKw: 250 },
];

function formatEstimatedDuration(hours: number): string {
  if (hours <= 0) return "0 min";
  const totalMin = Math.round(hours * 60);
  if (totalMin < 60) return `~${totalMin} min`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (m === 0) return `~${h} hrs`;
  return `~${h}h ${m}m`;
}

export default function EvChargingTimePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "EV Charging Time Calculator",
    description: "Estimate how long an electric vehicle takes to charge from one state of charge to another across Level 1, Level 2 and DC Fast Charging.",
    route: "/ev/ev-charging-time-calculator",
    categoryName: "EV",
    categoryRoute: "/ev",
    features: [
      "Estimates charging time in hours and minutes across AC and DC speeds",
      "Accounts for vehicle maximum AC/DC acceptance limits (kW)",
      "Integrates illustrative generic DC fast charge taper curve model",
      "Separates battery energy added from grid source energy",
    ],
    standards: [
      "SAE J1772 (North American Conductive AC Charging Interface)",
      "SAE J3400 (North American Charging System Conductive Power-Transfer Interface)",
      "NFPA 70 / NEC Article 625 (NEC 2026 — verify local AHJ edition)",
      "IEC 61851 (Electric Vehicle Conductive Charging System)",
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
        <span aria-current="page">EV Charging Time Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">EV planning</p>
        <h1>EV Charging Time Calculator</h1>
        <p className="intro">
          Estimate how long an electric vehicle takes to charge across Level 1 (120V), Level 2 (240V), and DC Fast Charging speeds, factoring in vehicle onboard acceptance limits and illustrative DC taper curves.
        </p>
      </div>

      <div id="calculator-tool">
        <EvChargingTimeCalculator />
      </div>

      <Disclaimer variant="calculator" />

      <DirectAnswerCard
        keyword="ev charging time calculator"
        answer="To estimate EV charging time, divide the usable battery energy needed (kWh) by the effective battery-side charging power (kW). For AC charging, an illustrative 90% wall-to-battery efficiency assumption accounts for onboard rectification and thermal management. For DC charging, charging duration depends on the vehicle-specific charging curve, battery temperature, and SOC taper behavior."
        formula="AC Time (Hours) = (Usable Capacity kWh × (Target SOC% - Start SOC%) / 100) ÷ (min(EVSE Power, Vehicle AC Limit) × η_wall_to_battery)"
        standardExample="A 60 kWh usable battery recharging from 20% to 80% (36 kWh added, 60-percentage-point increase) on a 7.68 kW Level 2 charger (240V/32A) at 90% AC efficiency takes approximately 5.2 hours."
        sourceAuthority="SAE J1772 / SAE J3400 interface standards & NFPA 70 / NEC 2026 installation rules (verify local AHJ edition)"
      />

      {/* Connected EV Planning Journey Pathways */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1rem", margin: "1.5rem 0" }}>
        <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface)", border: "1px solid var(--line)", borderLeft: "4px solid var(--accent)" }}>
          <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🚗 Daily Commute to Energy Needed?</h3>
          <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
            Calculate your vehicle&apos;s real-world highway efficiency (Wh/mi or mi/kWh) and trip energy consumption with our driving range tools.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Link href="/ev/ev-range-calculator" className="button secondary-button" style={{ flex: 1, textAlign: "center", fontSize: "0.82rem" }}>
              EV Range Calculator →
            </Link>
            <Link href="/guides/how-to-calculate-ev-driving-range-and-efficiency-guide" className="button secondary-button" style={{ flex: 1, textAlign: "center", fontSize: "0.82rem" }}>
              Range &amp; Wh/mi Guide →
            </Link>
          </div>
        </div>

        <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface)", border: "1px solid var(--line)", borderLeft: "4px solid #10b981" }}>
          <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>⚡ Sizing Your Home Electrical Circuit?</h3>
          <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
            Size double-pole circuit breakers (40A vs 50A vs 60A) and copper wire gauge under the NEC Article 625 125% continuous duty rule (NEC 2026 — verify local AHJ edition).
          </p>
          <Link href="/ev/ev-charger-breaker-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.85rem" }}>
            Size EV Charger Breaker &amp; Wire →
          </Link>
        </div>
      </div>

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate EV Charging Time and Energy Replenishment</h2>
        <ol>
          <li>
            <strong>Determine Usable Battery Energy to Replenish (kWh):</strong> Multiply usable pack capacity (which may differ from manufacturer gross capacity) by the normalized charge window: <code>Energy = Usable Capacity &times; ((Target SOC% - Start SOC%) / 100)</code>. For commuting replenishment, convert daily miles: <code>Energy (kWh) = (Miles &times; Wh/mi) &divide; 1,000</code>.
          </li>
          <li>
            <strong>Set Starting and Target State of Charge (%):</strong> Standard daily replenishment runs from 20% to 80% (a 60-percentage-point increase) to preserve lithium-ion battery health and prevent high internal resistance degradation.
          </li>
          <li>
            <strong>Select EVSE Maximum Power:</strong> Choose Level 1 (1.44 kW @ 120V 12A), Level 2 Wallbox (3.84 kW to 11.52 kW @ 240V), or DC Fast Charging (50 kW to 350 kW).
          </li>
          <li>
            <strong>Factor in AC Wall-to-Battery Efficiency:</strong> Level 1 and Level 2 AC charging incurs conversion losses in the vehicle&apos;s onboard rectifier, wiring, and thermal management systems, modeled using an illustrative 90% wall-to-battery efficiency assumption.
          </li>
          <li>
            <strong>Account for Vehicle Limits and DC Taper:</strong> The charging system cannot exceed the vehicle&apos;s maximum AC onboard charger acceptance or DC acceptance power. During DC fast charging, battery charging power typically decreases as SOC rises to protect battery chemistry.
          </li>
        </ol>

        <SystemFlowDiagram category="ev" title="Electric Vehicle Charging Power Path & Onboard Rectification" />
      </section>

      <section id="governing-standards" style={{ marginTop: "2rem" }}>
        <h2>Governing Standards &amp; Model Basis</h2>
        <p>
          To maintain engineering transparency, PowerLab clearly separates electrical interface standards, national installation codes, and mathematical modeling assumptions:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1rem", marginTop: "1rem" }}>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>SAE J1772</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
              Defines the North American conductive AC physical coupler geometry, control pilot signaling, and electrical ratings. Does not specify charging formulas or internal vehicle rectification efficiency.
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>SAE J3400 (NACS)</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
              Defines the North American Charging System conductive power-transfer interface for both AC and DC charging. Establishes connector pinout and signaling requirements.
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>IEC 61851</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
              International standard for conductive electric vehicle supply equipment, defining operational modes, safety interlocks, and communication protocols.
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>NFPA 70 / NEC Article 625</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
              Governs electrical wiring, overcurrent protection (125% continuous duty), disconnects, and ventilation for EVSE installations. Referenced code basis: <strong>NEC 2026 — verify the edition adopted by the local AHJ</strong>.
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>DOE / NREL / Empirical Data</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
              Empirical laboratory benchmarks from national research bodies provide observed AC wall-to-battery efficiency ranges (86%–92%) and vehicle battery pack temperature dynamics.
            </p>
          </div>
          <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>PowerLab Calculation Model</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
              The mathematical implementation used on this site. Evaluates exact SOC replenishment energy, applies user-configurable efficiency assumptions, and numerically integrates generic DC taper curves. Estimates do not certify code compliance.
            </p>
          </div>
        </div>
      </section>

      <section id="sizing-matrix" style={{ marginTop: "2rem" }}>
        <h2>Table 1: EV Charging Time Comparison Matrix (20% to 80% Daily Recharge)</h2>
        <p>
          Estimated charge durations across popular electric vehicle usable battery capacities for a standard 20% to 80% daily replenishment window (a 60-percentage-point usable state-of-charge increase).
          <br />
          <em>Illustrative DC charging estimates — actual time depends on vehicle charging curve, battery temperature, and charger conditions.</em>
        </p>
        <div className="scenario-table" role="region" aria-label="EV charging time comparison matrix">
          <table>
            <caption>Estimated charging duration by usable battery capacity &amp; charger power (20% → 80% recharge, standard AC 90% efficiency &amp; generic DC taper)</caption>
            <thead>
              <tr>
                <th scope="col">Charger Type &amp; EVSE Max Power</th>
                <th scope="col">50 kWh Usable (e.g., Leaf, Kona)</th>
                <th scope="col">60 kWh Usable (e.g., Model 3 RWD, Bolt)</th>
                <th scope="col">75 kWh Usable (e.g., Model Y, Ioniq 5)</th>
                <th scope="col">100 kWh Usable (e.g., F-150 Lightning, EV9)</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_CHARGERS.map((charger) => (
                <tr key={charger.label}>
                  <td><strong>{charger.label}</strong></td>
                  {PACK_SIZES.map((capacity) => {
                    const result = calculateEvChargingTime({
                      batteryCapacityKwh: capacity,
                      startSocPercent: 20,
                      targetSocPercent: 80,
                      chargerPowerKw: charger.powerKw,
                      chargingType: charger.type,
                      vehicleMaxAcPowerKw: charger.type === "AC" ? charger.vehicleMaxAcKw : undefined,
                      vehicleMaxDcPowerKw: charger.type === "DC" ? charger.vehicleMaxDcKw : undefined,
                      acEfficiency: 0.90,
                      dcEfficiency: 0.95,
                      dcTaperMode: "generic",
                    });
                    return (
                      <td key={capacity}>
                        {formatEstimatedDuration(result.timeHours)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="infrastructure-matrix" style={{ marginTop: "2rem" }}>
        <h2>Table 2: Illustrative Level 2 Circuit Reference — Standard Conditions</h2>
        <p>
          Illustrative electrical circuit reference for common residential Level 2 EVSE installations. Under National Electrical Code (NEC Article 625), electric vehicle charging is classified as a continuous load requiring branch circuits to be rated for at least 125% of the EVSE maximum continuous output.
        </p>
        <div style={{ margin: "1rem 0", padding: "0.85rem 1.15rem", borderRadius: "0.5rem", background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.25)", fontSize: "0.85rem", lineHeight: 1.5 }}>
          <strong>Engineering &amp; Code Note:</strong> Conductor sizing depends on conductor material (copper vs. aluminum), insulation and wiring method (e.g., THHN/THWN-2 in conduit vs. NM-B cable), terminal temperature rating (60&deg;C vs. 75&deg;C per NEC 110.14(C)), ambient temperature correction, raceway conductor bundling derating, voltage drop across long runs, equipment manufacturer listing requirements, and the adopted NEC edition (NEC 2026 — verify the edition and amendments adopted by the local AHJ). Values below represent examples under stated standard assumptions and do not constitute universal certification.
        </div>
        <div className="scenario-table" role="region" aria-label="Level 2 charging infrastructure and breaker reference table">
          <table>
            <caption>Illustrative Level 2 continuous current, minimum overcurrent protective device (OCPD), example conductor size, and 60 kWh pack recharge time (20% → 80%)</caption>
            <thead>
              <tr>
                <th scope="col">Continuous Current</th>
                <th scope="col">Double-Pole Breaker (125% Continuous)</th>
                <th scope="col">Example Copper Conductor (THHN in Raceway / NM-B Cable)</th>
                <th scope="col">EVSE Max Power @ 240V</th>
                <th scope="col">60 kWh Pack (20% → 80% Recharge)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>16 Amps</strong></td>
                <td>20A Breaker</td>
                <td>12 AWG Copper / 12 AWG NM-B</td>
                <td>3.84 kW</td>
                <td>10.4 hours</td>
              </tr>
              <tr>
                <td><strong>24 Amps</strong></td>
                <td>30A Breaker</td>
                <td>10 AWG Copper / 10 AWG NM-B</td>
                <td>5.76 kW</td>
                <td>6.9 hours</td>
              </tr>
              <tr>
                <td><strong>32 Amps</strong></td>
                <td>40A Breaker</td>
                <td>8 AWG Copper / 8 AWG NM-B</td>
                <td>7.68 kW</td>
                <td>5.2 hours</td>
              </tr>
              <tr>
                <td><strong>40 Amps</strong></td>
                <td>50A Breaker</td>
                <td>8 AWG Copper (75&deg;C) / 6 AWG NM-B (60&deg;C)</td>
                <td>9.60 kW</td>
                <td>4.2 hours</td>
              </tr>
              <tr>
                <td><strong>48 Amps</strong></td>
                <td>60A Breaker</td>
                <td>6 AWG Copper (75&deg;C) / 4 AWG NM-B (60&deg;C)</td>
                <td>11.52 kW</td>
                <td>3.5 hours</td>
              </tr>
              <tr>
                <td><strong>80 Amps</strong></td>
                <td>100A Breaker</td>
                <td>3 AWG Copper (75&deg;C) / 2 AWG NM-B (60&deg;C)</td>
                <td>19.20 kW</td>
                <td>2.1 hours</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.75rem" }}>
          ⚠️ <strong>80A EVSE Note:</strong> 80A EVSE installations typically require permanently wired (fixed/hardwired) installation depending on equipment listing and applicable NEC connection provisions. Verify EVSE listing, connection method, breaker rating, conductor ampacity, termination temperature ratings, and adopted NEC edition with a licensed electrical contractor.
        </p>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="EV Charging Duration &amp; Energy Formulas"
          formula="AC: Time = (Capacity_usable × (Target_SOC% - Start_SOC%) / 100) / (P_effective × η_wall_to_battery)  |  DC: Time = ∫ dE / P_actual(SOC)"
          formulaDescription="Estimates charging duration using the selected charging model and assumptions. For AC charging, effective battery power is limited by min(EVSE maximum power, vehicle AC acceptance limit) multiplied by wall-to-battery efficiency. For DC fast charging, duration is numerically integrated across the active state-of-charge interval accounting for vehicle DC limits and illustrative taper curves."
          variables={[
            { symbol: "Capacity_usable", label: "Usable Battery Capacity", description: "Usable high-voltage pack energy storage (kWh). Note that usable capacity may differ from the manufacturer's gross/nominal pack capacity.", unit: "kWh" },
            { symbol: "Start_SOC%", label: "Starting State of Charge", description: "Battery percentage at the start of the charging session (0% to 100%).", unit: "%" },
            { symbol: "Target_SOC%", label: "Target State of Charge", description: "Desired final battery percentage (0% to 100%). Must be greater than or equal to start SOC.", unit: "%" },
            { symbol: "P_effective", label: "Effective Charging Power", description: "min(EVSE Maximum Power, Vehicle Maximum Acceptance Limit) in kilowatts.", unit: "kW" },
            { symbol: "η_wall_to_battery", label: "Wall-to-Battery Efficiency", description: "Overall wall-to-battery charging efficiency — illustrative modeling assumption (default 90% for AC, accounting for onboard rectifier and thermal management).", unit: "dimensionless" },
          ]}
          notes={[
            "Level 1 and Level 2 AC charging assumes ~10% round-trip conversion and thermal conditioning loss under the illustrative 90% wall-to-battery assumption.",
            "DC fast charging bypasses the onboard AC rectifier, feeding high-voltage DC directly into the battery pack. DC charging power typically decreases as SOC rises; the exact charging curve varies by vehicle, battery temperature, SOC, and charger conditions.",
            "Estimates only. Actual charging time varies with vehicle charging curve, battery temperature, SOC, charger capability, battery pre-conditioning, and grid power quality.",
          ]}
        />
      </div>

      <section id="worked-example" style={{ marginTop: "2rem" }}>
        <h2>Step-by-Step Worked Calculation: 75 kWh EV Recharge (20% to 80%)</h2>
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1.5rem", lineHeight: 1.65 }}>
          <p>
            <strong>Scenario:</strong> A driver recharges a 75 kWh usable capacity battery pack from 20% to 80% (a 60-percentage-point state-of-charge increase) using a 48-Amp Level 2 home wall connector (11.52 kW @ 240V) with an illustrative 90% overall wall-to-battery charging efficiency assumption.
          </p>
          <ol style={{ paddingLeft: "1.25rem", margin: "0.75rem 0" }}>
            <li>
              <strong>Step 1: Calculate Net Energy Required by the Battery:</strong>
              <br />
              <code>ΔSOC = (80% - 20%) / 100 = 0.60 (60 percentage points)</code>
              <br />
              <code>E_battery = 75.0 kWh × 0.60 = 45.0 kWh</code>
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 2: Calculate Total Grid Source Energy Consumed:</strong>
              <br />
              <code>E_source = E_battery / η_wall_to_battery = 45.0 kWh / 0.90 = 50.0 kWh</code>
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 3: Determine Effective Battery-Side Charging Power:</strong>
              <br />
              <code>P_battery = min(P_EVSE, P_vehicle_AC) × η_wall_to_battery = 11.52 kW × 0.90 = 10.368 kW</code>
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Step 4: Compute Estimated Charge Duration:</strong>
              <br />
              <code>Time = 45.0 kWh / 10.368 kW = 4.34 hours = 4 hours and 20 minutes</code>
              <br />
              <em>Comparison:</em> On a 32A (7.68 kW) charger, this same 45.0 kWh recharge takes <code>45.0 / (7.68 × 0.90) = 6.51 hours (6 hrs 31 min)</code>.
            </li>
          </ol>
        </div>
      </section>

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
        <h2>Related EV Planning Tools &amp; In-Depth Guides</h2>
        <p>
          Size circuit breakers and wire gauges with the <Link href="/ev/ev-charger-breaker-size-calculator">EV Charger Breaker Size Calculator</Link>, calculate driving range with the <Link href="/ev/ev-range-calculator">EV Range Calculator</Link>, compute home charging electricity costs with the <Link href="/ev/ev-charging-cost-calculator">EV Charging Cost Calculator</Link>, or check feeder cable voltage drop with the <Link href="/battery/voltage-drop-calculator">Voltage Drop Calculator</Link>.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          📖 <strong>In-Depth Technical Guide:</strong> Read our comprehensive <Link href="/guides/level-2-ev-charging-speed-and-breaker-sizing-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Level 2 EV Charging Speed, Amperage &amp; Breaker Sizing Guide</Link> for detailed continuous load calculations, NEC 80% rule charts, and hardwired vs. plug-in comparisons.
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          📊 <strong>Empirical Benchmark Dataset:</strong> Review our open research benchmark <Link href="/datasets/continuous-duty-evse-terminal-temperature-benchmark" style={{ fontWeight: 600, color: "var(--brand-strong)" }}>Continuous Duty EVSE Terminal Temperature Benchmark (PL-DS-EVSE-04)</Link> for thermal performance metrics.
        </p>
      </section>
    </article>
  );
}
