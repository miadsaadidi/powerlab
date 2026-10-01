import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { EvRangeCalculator } from "@/components/calculator/ev-range-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { AcademicCitationModal } from "@/components/seo/academic-citation-modal";
import { MathDisplay } from "@/components/common/math-display";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "How to Calculate EV Driving Range & Efficiency",
  description:
    "Estimate EV driving range from usable battery kWh, highway aerodynamic drag, seasonal temperature effects, and battery health.",
  canonicalPath: "/guides/how-to-calculate-ev-driving-range-and-efficiency-guide",
  category: "ev",
  isArticle: true,
});

const FAQS = [
  {
    question: "What is the mathematical energy-balance formula to calculate EV driving range?",
    answer: "The fundamental formula is: Driving Range (miles) = Usable Battery Capacity at 100% SoH (kWh) × (Starting SOC% − Arrival Reserve SOC%) × Battery State of Health (SoH%) × Driving Efficiency (mi/kWh). For metric units (kilometers), multiply usable energy by (km/kWh) or divide by (kWh/100km ÷ 100).",
  },
  {
    question: "Why does driving at 75 mph reduce EV range compared to 55 mph?",
    answer: "Aerodynamic drag force increases with the square of velocity (F_drag = ½ ρ C_d A v²), and at constant vehicle properties and air density, the mechanical power required to overcome drag scales with the cube of speed (P = F × v ∝ v³). Increasing cruise speed from 55 mph to 75 mph (+36% speed increase) requires approximately 86% more power solely to overcome aerodynamic drag, all else equal, which significantly lowers effective driving efficiency (e.g. from ~3.8 mi/kWh to ~2.9 mi/kWh in typical crossovers).",
  },
  {
    question: "How do cold temperatures affect electric vehicle driving range?",
    answer: "In cold and freezing temperatures, electric vehicles generally experience reduced driving range. This reduction is influenced by multiple physical factors: higher air density drag, increased internal battery electrolyte resistance, and cabin HVAC heating energy demand. Actual winter range varies with vehicle efficiency, cabin heating demand, battery temperature, speed, wind, precipitation, tires, road conditions, and preconditioning.",
  },
  {
    question: "What is the difference between gross battery capacity and usable battery capacity?",
    answer: "Gross capacity represents the total theoretical chemical energy contained in all battery cells. Usable (net) capacity at 100% State of Health is the software-accessible energy allocated by the Battery Management System (BMS) with top and bottom protective buffers to preserve cell longevity and prevent overcharge/overdischarge.",
  },
  {
    question: "How does battery State of Health (SoH) affect usable driving range?",
    answer: "Battery State of Health (SoH) represents the ratio of current maximum usable capacity to the original factory usable capacity. Degradation rates vary across cell chemistries (such as NMC vs LFP), operating temperatures, depth of discharge, charging behavior, and thermal management. Multiplying original usable capacity by SoH provides a realistic available energy baseline for range planning.",
  },
  {
    question: "How does cabin climate control affect EV efficiency?",
    answer: "Air conditioning during warm weather typically draws 1.0 kW to 2.0 kW, resulting in a modest range impact. In cold weather, heating the cabin requires warming ambient air, where resistive PTC heaters draw 4.0 kW to 6.0 kW, while heat pump systems operate with a Coefficient of Performance (COP) of 2.0 to 3.0 to reduce heating power draw to approximately 1.5 kW to 2.5 kW.",
  },
  {
    question: "How do you convert EV driving range and miles driven into home charging time?",
    answer: "Divide the energy consumed (Distance in miles × Consumption in Wh/mi ÷ 1,000) by your home charger's effective delivery rate, factoring in an illustrative planning assumption for onboard AC-to-DC conversion efficiency: Charging Time (hours) = Energy Needed (kWh) ÷ (EVSE Power kW × 0.90). For example, a 40-mile daily commute consuming 300 Wh/mi uses 12.0 kWh DC from the battery. On a 7.7 kW (32A @ 240V) Level 2 home charger delivering ~6.93 kW net to the battery at an illustrative 90% efficiency, replenishment requires: 12.0 kWh ÷ 6.93 kW ≈ 1.73 hours (about 1 hour 44 minutes). Actual wall-to-battery charging losses vary by vehicle, charging rate, and temperature.",
  },
];

export default function HowToCalculateEvRangeGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "How to Calculate EV Driving Range & Efficiency (Formula, Speed Drag & Seasonal Losses)",
    description: "Automotive engineering guide: estimate electric vehicle driving range from usable battery capacity, aerodynamic drag kinetics, temperature factors, and battery health.",
    route: "/guides/how-to-calculate-ev-driving-range-and-efficiency-guide",
    datePublished: "2026-09-05",
    dateModified: "2026-09-30",
    categoryName: "Electric Vehicles",
    categoryRoute: "/ev",
    standards: [
      "SAE J1634 Reference (Electric Vehicle Energy Consumption and Range Test Procedure)",
      "EPA 40 CFR Part 600 Reference (Fuel Economy and Greenhouse Gas Exhaust Emissions)",
      "WLTP Reference (Worldwide Harmonised Light Vehicles Test Procedure - UNECE GTR No. 15)",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page reading-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/guides">Guides</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">How to Calculate EV Driving Range</span>
      </nav>

      <header className="calculator-header" style={{ border: "1px solid var(--line)", borderRadius: "0.85rem", background: "rgb(255 253 249 / 0.85)", padding: "1.5rem", marginBottom: "0.5rem" }}>
        <p className="eyebrow">Automotive Aerodynamics &amp; Energy Planning</p>
        <h1 style={{ margin: "0.25rem 0 0.75rem", fontSize: "1.85rem", color: "var(--brand-strong)" }}>
          How to Calculate EV Driving Range &amp; Efficiency (Formula, Speed Drag &amp; Seasonal Losses)
        </h1>
        <p className="intro" style={{ margin: 0, color: "var(--muted)", fontSize: "1.02rem", lineHeight: 1.6 }}>
          Understand the physical factors behind electric vehicle range. Estimate real-world highway range from usable battery kilowatt-hours (kWh), aerodynamic drag force (<em>F</em><sub>d</sub> ∝ <em>v</em>²), rolling resistance, seasonal heating and cooling loads, and battery State of Health.
        </p>
      </header>

      <DirectAnswerCard
        keyword="how to calculate EV driving range"
        answer="Electric Vehicle Driving Range (miles) = Usable Battery Capacity at 100% SoH (kWh) × Available State of Charge (%) × Battery State of Health (SoH%) × Driving Efficiency (mi/kWh). Real-world range deviates from window-sticker EPA ratings because aerodynamic drag scales quadratically with velocity (at the same Cd and frontal area, aero power demand is proportional to v³, requiring ~86% more aero power at 75 mph than 55 mph, all else equal), rolling resistance varies with tires/surface, and cold winter weather increases air density and cabin heating loads."
        formula="Range (mi) = [ Usable_kWh_100SoH × (SOC_start - SOC_reserve) × SoH ] × Efficiency (mi/kWh)"
        standardExample="Illustrative 77.4 kWh usable-battery example starting at 90% SOC with a 10% emergency arrival buffer at 95% SoH driving at 72 mph highway efficiency (3.0 mi/kWh): [77.4 × (0.90 - 0.10) × 0.95] × 3.0 = 58.82 kWh × 3.0 mi/kWh = 176.5 Miles."
        sourceAuthority="SAE J1634 Electric Vehicle Range Test Procedure Reference"
      />

      <PageJumpNav />

      {/* Embedded Interactive Calculator */}
      <section id="interactive-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>
            Interactive EV Driving Range &amp; Consumption Engine
          </h2>
          <p style={{ color: "var(--muted)", margin: "0 0 0.75rem", fontSize: "0.95rem" }}>
            Adjust usable battery pack capacity (at 100% SoH), SOC window, battery health, and driving efficiency to estimate your trip range:
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", background: "var(--surface)", border: "1px solid var(--line)", padding: "0.65rem 0.85rem", borderRadius: "0.5rem", margin: 0 }}>
            <em>Methodology Note:</em> The interactive calculator uses battery energy, SOC window, battery health and a selected consumption rate. The road-load and thermal equations below explain why real-world consumption changes, but they are not independently solved by the calculator unless explicitly stated.
          </p>
        </div>
        <EvRangeCalculator />
      </section>

      {/* Section 1: The Physics of EV Driving Range */}
      <section id="physics-of-range" style={{ marginTop: "2.5rem" }}>
        <h2>1. The Physics of EV Driving Range: EPA Ratings vs. Real-World Highway Driving</h2>
        <p>
          Every new electric vehicle sold in North America displays an official <strong>EPA Estimated Range</strong> (e.g., 300 miles). However, drivers frequently observe that cruising at 75 mph on interstate highways yields lower range than the window sticker.
        </p>
        <p>
          This divergence occurs because the U.S. Environmental Protection Agency (EPA) determines window-sticker range using standardized dynamometer laboratory test cycles under <strong>SAE J1634</strong>:
        </p>

        <ul style={{ lineHeight: 1.65, color: "var(--ink)", paddingLeft: "1.25rem" }}>
          <li><strong>UDDS (Urban Dynamometer Driving Schedule / City Cycle):</strong> Simulates stop-and-go city traffic with an average speed of only <strong>19.6 mph (31.5 km/h)</strong> and frequent regenerative braking deceleration phases.</li>
          <li><strong>HWFET (Highway Fuel Economy Driving Schedule):</strong> Simulates mild highway cruising with an average speed of <strong>48.3 mph (77.7 km/h)</strong> and a top speed of 60 mph—without high-speed interstate aerodynamic drag.</li>
          <li><strong>Standardized Test Cycles &amp; Adjustment Factors:</strong> Multi-cycle dynamometer testing results are adjusted using standardized EPA calculation procedures to produce the composite window-sticker rating.</li>
        </ul>

        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1.25rem", margin: "1.25rem 0" }}>
          <h3 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)", fontSize: "1.1rem" }}>The Road-Load Forces That Consume EV Battery Kilowatt-Hours:</h3>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
            Total tractive power demanded from the battery pack at any instant is governed by vehicle road load resistance:
          </p>
          <MathDisplay
            title="Total Vehicle Road Load Tractive Power"
            copyText="P_total = 0.5 * rho * C_d * A * v^3 + C_rr * m * g * v + m * g * v * sin(theta) + P_HVAC"
            benchmark="Sum of aerodynamic drag (cubic with speed), rolling resistance, gravitational grade, and cabin HVAC"
          >
            P_total = ½ · ρ · C_d · A · v³ + C_rr · m · g · v + m · g · v · sin(θ) + P_HVAC
          </MathDisplay>
        </div>
      </section>

      {/* Section 2: Aerodynamic Drag & High Speed Loss */}
      <section id="aerodynamic-drag" style={{ marginTop: "2.5rem" }}>
        <h2>2. Aerodynamic Drag (F_d = 0.5 &times; &rho; &times; C_d &times; A &times; v&sup2;) and Highway Speed</h2>
        <p>
          Electric vehicle drivetrains operate at high wire-to-wheel efficiency. Because internal drivetrain losses are relatively small, external physics—primarily aerodynamic air resistance—dominates high-speed highway consumption.
        </p>

        <p>
          At the same vehicle Cd, frontal area and air density, aerodynamic power is proportional to v³; increasing speed from 55 to 75 mph therefore requires approximately 86% more aerodynamic power, all else equal.
        </p>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 1: Illustrative Cruising Speed vs. Aerodynamic Power Demand and Driving Efficiency (Model Scenario: C_d = 0.24, Frontal Area A = 2.4 m²)</caption>
            <thead>
              <tr>
                <th scope="col">Cruising Speed</th>
                <th scope="col">Aero Drag Force (F_d)</th>
                <th scope="col">Aero Power Demand (P_aero)</th>
                <th scope="col">Illustrative Efficiency</th>
                <th scope="col">Estimated Range (75 kWh Pack)</th>
                <th scope="col">Range Delta vs 55 mph</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>55 mph</strong> (88 km/h)</td>
                <td>345 N</td>
                <td>8.5 kW</td>
                <td><strong>4.0 mi/kWh</strong> (155 Wh/mi)</td>
                <td><strong>300 Miles</strong></td>
                <td>Baseline (100%)</td>
              </tr>
              <tr>
                <td><strong>65 mph</strong> (105 km/h)</td>
                <td>483 N</td>
                <td>14.0 kW</td>
                <td><strong>3.4 mi/kWh</strong> (184 Wh/mi)</td>
                <td><strong>255 Miles</strong></td>
                <td><span style={{ color: "#ea580c", fontWeight: 700 }}>−15.0% Range</span></td>
              </tr>
              <tr>
                <td><strong>75 mph</strong> (120 km/h)</td>
                <td>643 N</td>
                <td>21.5 kW</td>
                <td><strong>2.9 mi/kWh</strong> (215 Wh/mi)</td>
                <td><strong>217 Miles</strong></td>
                <td><span style={{ color: "#dc2626", fontWeight: 700 }}>−27.6% Range</span></td>
              </tr>
              <tr>
                <td><strong>85 mph</strong> (137 km/h)</td>
                <td>826 N</td>
                <td>31.4 kW</td>
                <td><strong>2.4 mi/kWh</strong> (260 Wh/mi)</td>
                <td><strong>180 Miles</strong></td>
                <td><span style={{ color: "#991b1b", fontWeight: 700 }}>−40.0% Range</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: "1rem" }}>
          <strong>Takeaway:</strong> Aerodynamic power demand increases steeply at higher speeds, which directly reduces vehicle efficiency per mile traveled.
        </p>
      </section>

      {/* Section 3: Cold-Weather Range Loss */}
      <section id="winter-range-loss" style={{ marginTop: "2.5rem" }}>
        <h2>3. Cold-Weather Thermodynamics: Seasonal Range Impacts</h2>
        <p>
          Winter driving introduces multiple thermodynamic and electrochemical factors that influence energy consumption:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "125rem", margin: "1.25rem 0" }}>
          <article style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "#0284c7", fontSize: "1.1rem" }}>1. Cabin HVAC Heating Energy</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--ink)", margin: 0 }}>
              Because electric motors generate minimal waste heat, warming the cabin draws energy from the battery pack. Resistive PTC heaters can draw <strong>4.0 kW to 6.0 kW</strong>, while heat pumps operate with a COP of 2.0 to 3.0 to reduce heating power draw to approximately <strong>1.5 kW to 2.5 kW</strong>.
            </p>
          </article>

          <article style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "#0284c7", fontSize: "1.1rem" }}>2. Electrochemical Internal Resistance (R_int)</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--ink)", margin: 0 }}>
              At cold temperatures, electrolyte viscosity increases and ion diffusion kinetics slow down. This elevates internal cell resistance, temporarily reducing usable battery energy until the thermal management system conditions the pack.
            </p>
          </article>

          <article style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "#0284c7", fontSize: "1.1rem" }}>3. Increased Air Density &amp; Tire Drag</h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "var(--ink)", margin: 0 }}>
              Cold air is denser than warm air, which increases aerodynamic drag force at all speeds. Cold pavement and winter tire compounds also elevate rolling resistance.
            </p>
          </article>
        </div>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 2: Illustrative Seasonal Range Scenarios (77.4 kWh Battery Pack @ 70 mph)</caption>
            <thead>
              <tr>
                <th scope="col">Ambient Temperature</th>
                <th scope="col">HVAC Cabin Draw</th>
                <th scope="col">Air Density Effect</th>
                <th scope="col">Effective Efficiency</th>
                <th scope="col">Achievable Highway Range</th>
                <th scope="col">Relative Retention</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>75°F (24°C)</strong> — Mild Spring/Fall</td>
                <td>0.0 kW (Off / Vent)</td>
                <td>Baseline (1.18 kg/m³)</td>
                <td><strong>3.5 mi/kWh</strong></td>
                <td><strong>270 Miles</strong></td>
                <td><strong>100%</strong></td>
              </tr>
              <tr>
                <td><strong>95°F (35°C)</strong> — Summer AC</td>
                <td>1.5 kW (AC Cooling)</td>
                <td>Lower density</td>
                <td><strong>3.2 mi/kWh</strong></td>
                <td><strong>248 Miles</strong></td>
                <td>91.8%</td>
              </tr>
              <tr>
                <td><strong>32°F (0°C)</strong> — Freezing Weather</td>
                <td>3.0 kW (Heat Pump)</td>
                <td>Higher density</td>
                <td><strong>2.7 mi/kWh</strong></td>
                <td><strong>209 Miles</strong></td>
                <td>77.4%</td>
              </tr>
              <tr>
                <td><strong>10°F (−12°C)</strong> — Severe Winter</td>
                <td>5.5 kW (Aux Heating)</td>
                <td>Dense winter air</td>
                <td><strong>2.2 mi/kWh</strong></td>
                <td><strong>170 Miles</strong></td>
                <td><span style={{ color: "#dc2626", fontWeight: 700 }}>63.0%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.5rem" }}>
          <em>Note:</em> Actual winter range varies with vehicle efficiency, cabin heating demand, battery temperature, speed, wind, precipitation, tires, road conditions and preconditioning.
        </p>
      </section>

      {/* Section 4: Battery Degradation & State of Health */}
      <section id="battery-health" style={{ marginTop: "2.5rem" }}>
        <h2>4. Battery Degradation &amp; State of Health (SoH) Sizing</h2>
        <p>
          Over years of operation, lithium-ion battery cells undergo chemical and physical aging that gradually reduces usable capacity.
        </p>

        <p>
          <strong>State of Health (SoH)</strong> is the ratio of current maximum usable capacity relative to the original factory usable capacity:
        </p>

        <MathDisplay
          title="Battery State of Health (SoH)"
          copyText="SoH = (Capacity_usable_current / Capacity_usable_original_100SoH) * 100%"
          benchmark="State of Health represents remaining usable battery capacity relative to original factory rating"
        >
          SoH = (Capacity_usable_current / Capacity_usable_original_100SoH) × 100%
        </MathDisplay>

        <ul style={{ lineHeight: 1.65, color: "var(--ink)", paddingLeft: "1.25rem" }}>
          <li><strong>Degradation Variables:</strong> Capacity degradation varies with cell chemistry, ambient and operating temperatures, state of charge exposure, cycling frequency, charging power, and thermal management.</li>
          <li><strong>Capacity Retention:</strong> Well-managed thermal liquid battery systems generally maintain substantial usable capacity over years of normal driving.</li>
          <li><strong>Cell Chemistry Differences:</strong> LFP cell cycle life can be high, but actual vehicle battery life depends on cell design, depth of discharge, temperature, charging conditions, operating limits and the manufacturer&apos;s end-of-life criterion.</li>
        </ul>
      </section>

      {/* Section 5: Step-by-Step Worked Example */}
      <section id="worked-example" style={{ marginTop: "2.5rem" }}>
        <h2>5. Step-by-Step Worked Calculation Example: Highway Road Trip Scenario</h2>
        <p>
          Let&apos;s calculate an illustrative highway driving range estimate for a real-world road trip scenario:
        </p>

        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1.5rem", margin: "1rem 0" }}>
          <h3 style={{ margin: "0 0 0.75rem", color: "var(--brand-strong)", fontSize: "1.15rem" }}>Vehicle &amp; Trip Parameters:</h3>
          <ul style={{ lineHeight: 1.6, margin: "0 0 1rem", paddingLeft: "1.25rem" }}>
            <li><strong>Vehicle Example:</strong> Illustrative 77.4 kWh usable-battery example</li>
            <li><strong>Nominal Usable Battery Pack at 100% SoH:</strong> <code>77.4 kWh</code></li>
            <li><strong>Current Battery State of Health (SoH):</strong> <code>95.0%</code></li>
            <li><strong>Initial Departure Charge (SOC_start):</strong> <code>90%</code></li>
            <li><strong>Safe Arrival Buffer (SOC_reserve):</strong> <code>10%</code></li>
            <li><strong>Ambient Conditions:</strong> <code>25°F (−4°C)</code> winter weather with cabin heating</li>
            <li><strong>Highway Cruising Speed:</strong> <code>72 mph (116 km/h)</code></li>
          </ul>

          <h4 style={{ margin: "1rem 0 0.5rem", color: "var(--brand-strong)", fontSize: "1.05rem" }}>Step-by-Step Solution:</h4>
          <ol style={{ paddingLeft: "1.25rem", lineHeight: 1.65 }}>
            <li>
              <strong>Step 1: Calculate Net Usable Energy Window (kWh):</strong><br />
              <code>Available Energy = Original Usable (77.4 kWh) × (SOC_start 0.90 − SOC_reserve 0.10) × SoH (0.95)</code><br />
              <code>Available Energy = 77.4 × 0.80 × 0.95 = 58.82 kWh</code> available for driving.
            </li>
            <li>
              <strong>Step 2: Determine Cold-Weather Highway Efficiency (mi/kWh):</strong><br />
              At 72 mph in 25°F weather, an illustrative cold-weather highway efficiency might be <strong>2.65 mi/kWh (377 Wh/mi)</strong>.
            </li>
            <li>
              <strong>Step 3: Calculate Illustrative Highway Range:</strong><br />
              <code>Estimated Range = 58.82 kWh × 2.65 mi/kWh = 155.87 Miles (250.8 km)</code>.
            </li>
          </ol>

          <p style={{ marginTop: "1rem", padding: "0.85rem 1.1rem", borderRadius: "0.5rem", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.25)", color: "#065f46", margin: "1rem 0 0" }}>
            <strong>Planning Note:</strong> Under high-speed winter road conditions, charging stops should be planned according to actual consumption and desired reserve margins.
          </p>
        </div>
      </section>

      {/* Section 6: Connecting Driving Range to Home Charging Replenishment */}
      <section id="range-to-charging" style={{ marginTop: "2.5rem" }}>
        <h2>6. Connecting EV Driving Range to Home Charging: Energy Replenishment &amp; EVSE Sizing</h2>
        <p>
          Once you determine how much battery energy your trip consumes, you can translate that energy demand into home charging hours and electrical branch-circuit infrastructure.
        </p>

        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1.5rem", margin: "1.25rem 0" }}>
          <h3 style={{ margin: "0 0 0.75rem", color: "var(--brand-strong)", fontSize: "1.1rem" }}>
            The Mathematical Bridge: Driving Consumption to Charging Duration
          </h3>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.6, margin: "0 0 0.75rem" }}>
            The net electrical energy required from your vehicle&apos;s battery pack to complete a trip is calculated by multiplying distance by your vehicle&apos;s consumption rate:
          </p>
          <MathDisplay
            title="Driving Energy to Level 2 Charging Duration"
            copyText="t_charge = (Distance * Consumption_Wh_mi) / (1000 * P_evse * eta_rectifier)"
            benchmark="Converts road mileage and vehicle consumption into wall-side AC charging hours"
          >
            t_charge = (Distance × Consumption_Wh_mi) / (1000 × P_evse × η_rectifier)
          </MathDisplay>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
            <em>Charging Efficiency Basis:</em> 90% is an illustrative planning assumption. Actual wall-to-battery charging losses vary by vehicle, charging power, temperature and charging conditions. Battery-side energy discharged while driving and wall-side energy drawn from the utility grid remain distinct quantities.
          </p>
        </div>

        <div className="scenario-table" role="region" aria-label="EV driving consumption and charging replenishment matrix">
          <table>
            <caption>Table 3: Illustrative EV driving consumption scenarios to Level 2 home charging replenishment durations (Modeled baselines)</caption>
            <thead>
              <tr>
                <th scope="col">Vehicle Category &amp; Representative Models</th>
                <th scope="col">Modeled Consumption Rate (Wh/mi)*</th>
                <th scope="col">40-Mile Commute (kWh)</th>
                <th scope="col">150-Mile Trip (kWh)</th>
                <th scope="col">32A Level 2 Charge Time (7.7 kW)*</th>
                <th scope="col">48A Level 2 Charge Time (11.5 kW)*</th>
                <th scope="col">Dedicated Breaker (NEC 125%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Aerodynamic Sedan</strong> (e.g., Model 3 RWD, Ioniq 6)</td>
                <td>~250 Wh/mi (4.0 mi/kWh)</td>
                <td>10.0 kWh</td>
                <td>37.5 kWh</td>
                <td>~1.4 hrs (commute) / ~5.4 hrs (trip)</td>
                <td>~1.0 hr (commute) / ~3.6 hrs (trip)</td>
                <td>40A Breaker (32A) or 60A Breaker (48A)</td>
              </tr>
              <tr>
                <td><strong>Compact Crossover / SUV</strong> (e.g., Model Y, ID.4, EV6)</td>
                <td>~300 Wh/mi (3.3 mi/kWh)</td>
                <td>12.0 kWh</td>
                <td>45.0 kWh</td>
                <td>~1.7 hrs (commute) / ~6.5 hrs (trip)</td>
                <td>~1.2 hrs (commute) / ~4.3 hrs (trip)</td>
                <td>40A Breaker (32A) or 60A Breaker (48A)</td>
              </tr>
              <tr>
                <td><strong>Dual-Motor Performance SUV</strong> (e.g., Mach-E AWD, Q8 e-tron)</td>
                <td>~370 Wh/mi (2.7 mi/kWh)</td>
                <td>14.8 kWh</td>
                <td>55.5 kWh</td>
                <td>~2.1 hrs (commute) / ~8.0 hrs (trip)</td>
                <td>~1.4 hrs (commute) / ~5.3 hrs (trip)</td>
                <td>40A Breaker (32A) or 60A Breaker (48A)</td>
              </tr>
              <tr>
                <td><strong>Full-Size Electric Truck</strong> (e.g., F-150 Lightning, Rivian R1T)</td>
                <td>~480 Wh/mi (2.1 mi/kWh)</td>
                <td>19.2 kWh</td>
                <td>72.0 kWh</td>
                <td>~2.8 hrs (commute) / ~10.4 hrs (trip)</td>
                <td>~1.8 hrs (commute) / ~6.9 hrs (trip)</td>
                <td>40A Breaker (32A) or 60A Breaker (48A)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.75rem", lineHeight: 1.6 }}>
          <em>*Data Classification &amp; Sourcing: Baseline consumption rates reflect illustrative modeled engineering scenarios across vehicle classes; they do not represent universal constants. Daily 40-mile commutes and 150-mile trip segments are modeled examples. Charge times assume nominal 240V single-phase supply with an illustrative 90% onboard rectifier efficiency. Actual vehicle consumption varies with cruising speed, temperature, topography, and tire inflation.</em>
        </p>

        {/* Contextual Planning Pathways */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1rem", margin: "1.5rem 0" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "1rem", color: "var(--brand-strong)" }}>⏱️ Estimate Recharge Hours</h3>
            <p style={{ fontSize: "0.84rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Model custom battery capacities (50 to 130+ kWh), charge taper profiles, and starting-to-target State of Charge windows.
            </p>
            <Link href="/ev/ev-charging-time-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.85rem" }}>
              EV Charging Time Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "1rem", color: "var(--brand-strong)" }}>⚡ Size Breaker &amp; Conductor Gauge</h3>
            <p style={{ fontSize: "0.84rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Determine NEC Article 625 (Section 625.41) 125% continuous duty overcurrent breaker ratings and 60°C Romex vs 75°C THHN copper wire gauges.
            </p>
            <Link href="/ev/ev-charger-breaker-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.85rem" }}>
              EV Breaker Size Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "1rem", color: "var(--brand-strong)" }}>📊 Empirical EVSE Thermal Benchmark</h3>
            <p style={{ fontSize: "0.84rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Review open research dataset (PL-DS-EVSE-04) evaluating continuous-duty thermal rise across NEMA 14-50 receptacles vs hardwired terminals.
            </p>
            <Link href="/datasets/continuous-duty-evse-terminal-temperature-benchmark" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "0.85rem" }}>
              View Thermal Benchmark Dataset →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: Rules of Thumb */}
      <section id="rules-of-thumb" style={{ marginTop: "2.5rem" }}>
        <h2>7. Engineering Guidelines for Real-World EV Range Planning</h2>
        <ul style={{ lineHeight: 1.65, color: "var(--ink)", paddingLeft: "1.25rem" }}>
          <li><strong>Precondition While Connected to EVSE:</strong> Preconditioning while connected to Level 2 power can supply some cabin and battery heating energy from the grid instead of the traction battery, potentially reducing battery energy used after departure. (See our <Link href="/guides/level-2-ev-charging-speed-and-breaker-sizing-guide">Level 2 EV Charging Speed Guide</Link>).</li>
          <li><strong>Cruising Speed Management:</strong> Moderating highway speeds from 75 mph to around 65–68 mph significantly reduces aerodynamic drag power demand with modest trip time differences.</li>
          <li><strong>Use Heated Seats and Steering Wheel Over Cabin Air:</strong> Heated seats consume direct conduction heat (typically 40 to 60 Watts), compared to higher power draws for forced-air resistive cabin blowers.</li>
          <li><strong>Maintain Correct Tire Cold Inflation Pressure:</strong> Ambient temperature drops reduce tire pressure, increasing rolling resistance and energy consumption per mile.</li>
          <li><strong>Aerodynamic Considerations:</strong> Smooth wheel inserts and minimizing roof-mounted accessories reduce turbulent airflow, improving high-speed efficiency.</li>
        </ul>

        <StandardsBadge category="ev" />
      </section>

      {/* Section 8: FAQs */}
      <section id="faqs" style={{ marginTop: "3rem" }}>
        <h2>8. Frequently Asked Questions About EV Driving Range &amp; Efficiency</h2>
        <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
          {FAQS.map((faq, idx) => (
            <details key={idx} style={{ padding: "1rem", borderRadius: "0.65rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
              <summary style={{ fontWeight: 700, cursor: "pointer", color: "var(--brand-strong)", fontSize: "1.02rem" }}>
                {faq.question}
              </summary>
              <p style={{ margin: "0.75rem 0 0", lineHeight: 1.6, color: "var(--ink)", fontSize: "0.95rem" }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Section 9: Connected Calculators & Planning Tools */}
      <section id="related-tools" style={{ marginTop: "3rem", padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.35rem", color: "var(--brand-strong)" }}>9. Connected Electric Vehicle Planning &amp; Charging Calculators</h2>
        <p style={{ marginBottom: "1.25rem", color: "var(--muted)", lineHeight: 1.55 }}>
          Integrate range calculations with home charging infrastructure and energy storage planning:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>⏱️ EV Charging Time Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Model charge duration across 120V Level 1, 240V Level 2, and DC Fast Chargers with taper curves.
            </p>
            <Link href="/ev/ev-charging-time-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              EV Charging Time Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>⚡ EV Charger Breaker Sizing</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Size electrical circuit breakers and conductor AWG gauge under NEC Article 625 125% continuous duty rules.
            </p>
            <Link href="/ev/ev-charger-breaker-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              EV Breaker Size Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>🔌 Vehicle-to-Load (V2L) Runtime</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Calculate how many days your EV traction battery can power household emergency blackout loads.
            </p>
            <Link href="/ev/v2l-runtime-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              V2L Runtime Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", background: "var(--surface-subtle, #fafafa)", border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", color: "var(--brand-strong)" }}>💵 EV vs. Gas Savings Calculator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Compare cents-per-mile electricity rates against gasoline costs to estimate annual fuel savings.
            </p>
            <Link href="/ev/ev-savings-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              EV Savings Calculator →
            </Link>
          </div>
        </div>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Link href="/ev/ev-charging-cost-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>EV Charging Cost Calculator</Link>
          <Link href="/battery/portable-power-station-calculator" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Portable Power Station Calculator</Link>
          <Link href="/guides/level-2-ev-charging-speed-and-breaker-sizing-guide" className="button secondary-button" style={{ fontSize: "0.85rem" }}>Level 2 EV Sizing Guide</Link>
        </div>
      </section>

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          This guide combines simplified energy-balance calculations with technical reference material. Values presented as assumptions or examples should be treated as planning estimates, not vehicle-specific specifications or certification criteria. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <AcademicCitationModal
          title="How to Calculate EV Driving Range &amp; Efficiency Guide"
          urlPath="/guides/how-to-calculate-ev-driving-range-and-efficiency-guide"
        />
      </div>
    </article>
  );
}

