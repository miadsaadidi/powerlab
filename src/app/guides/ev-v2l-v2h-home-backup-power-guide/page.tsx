import type { Metadata } from "next";
import Link from "next/link";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { V2lRuntimeCalculator } from "@/components/calculator/v2l-runtime-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = buildPageMetadata({
  title: "EV V2L & V2H Home Backup Power Guide: Wiring, Inverters & Sizing",
  description:
    "Engineering guide to powering home circuits with an EV: Vehicle-to-Load (V2L) vs V2H, 120V/240V transfer switch wiring, neutral-ground bonding under NEC 250, and backup runtime calculations.",
  canonicalPath: "/guides/ev-v2l-v2h-home-backup-power-guide",
  category: "ev",
  isArticle: true,
});

const FAQS = [
  {
    question: "What is the difference between V2L, V2H, and V2G bidirectional EV power?",
    answer:
      "Vehicle-to-Load (V2L) delivers alternating current (AC) directly from the EV's onboard inverter via 120V or 240V outlets (typically 1.5 kW to 9.6 kW depending on vehicle platform) to power specific appliances or a manual transfer switch subpanel. Vehicle-to-Home (V2H) integrates the EV with dedicated bidirectional supply equipment (EVSE) and an automated microgrid gateway (typically 7.6 kW to 19.2 kW) to isolate the home from the grid and power service panel circuits during an outage. Vehicle-to-Grid (V2G) allows the vehicle to export power synchronously onto the utility distribution grid for demand response or peak shaving under utility interconnection agreements (IEEE 1547).",
  },
  {
    question: "How long can an electric vehicle power critical home loads during a blackout?",
    answer:
      "A typical EV battery pack (58 kWh to 131+ kWh usable) stores substantial electrical energy compared to standard stationary home storage units. When supplying critical emergency loads (such as a refrigerator, lighting, Wi-Fi router, and furnace blower drawing an average of 300W to 450W), a 77 kWh EV can provide approximately 4 to 6 days of continuous power while preserving a 20% emergency driving reserve and accounting for inverter and background tare losses. Larger truck battery packs (such as a 131 kWh pack) can sustain similar critical loads for 7 to 10 days.",
  },
  {
    question: "Why do some EVs trip onboard GFCI protection when connected to a home transfer switch?",
    answer:
      "Nuisance tripping is commonly caused by neutral-ground bonding arrangements governed by NEC Article 250. Some vehicles (such as the Ford F-150 Lightning with Pro Power Onboard) feature a bonded neutral where the onboard inverter bonds the AC neutral to vehicle equipment ground. If connected to a standard transfer panel where the neutral remains solidly connected to the main service panel's neutral-to-ground bond, dual return paths are established, causing the vehicle's onboard GFCI sensing electronics to detect a current imbalance and trip. Bonded-neutral vehicles operating as a Separately Derived System typically require transfer equipment that switches both ungrounded conductors and the neutral conductor.",
  },
  {
    question: "What hardware is required to connect a V2L-capable EV to a home electrical panel?",
    answer:
      "A standard residential installation under adopted NEC Article 702 guidelines typically includes: (1) A listed power inlet box mounted on the exterior wall (e.g., NEMA L14-30P male flanged inlet for 120/240V 30A systems), (2) A listed manual transfer switch or mechanical interlock panel that prevents simultaneous connection to the utility grid, (3) A properly rated, heavy-duty generator cord with compatible connector genders (e.g., female NEMA L14-30R connector to house inlet, male NEMA L14-30P plug to vehicle bed outlet), and (4) An appropriately configured neutral switching arrangement matching the vehicle's grounding design.",
  },
  {
    question: "Can an EV with V2L power a central air conditioner or heat pump?",
    answer:
      "Standard 120V / 1.5 kW to 1.9 kW V2L outlets cannot power 240V split-phase central HVAC systems. Vehicles equipped with 240V / 7.2 kW to 9.6 kW bidirectional inverters may power smaller central heat pumps or air conditioners provided the starting inrush current (Locked Rotor Amps / LRA) does not exceed the inverter's instantaneous surge capacity. Installing a compressor electronic soft starter can reduce starting inrush current by an illustrative 50% to 70%, but total running load (RLA) plus simultaneous household loads must remain strictly within the inverter's continuous rating.",
  },
  {
    question: "How much parasitic or tare power does an EV consume while in V2L mode?",
    answer:
      "When V2L or utility power export mode is active, the vehicle's high-voltage contactors, battery management system (BMS), DC-DC converter (powering 12V vehicle electronics), and thermal management pumps remain energized. This continuous tare draw typically consumes 30W to 80W of background power (~0.7 kWh to 1.9 kWh per 24 hours), which should be included in total energy consumption calculations alongside connected household loads.",
  },
];

export default function EvV2lV2hHomeBackupGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "EV V2L & V2H Home Backup Power Guide",
    description:
      "Engineering guide to powering home circuits with an EV: Vehicle-to-Load (V2L) vs V2H, 120V/240V transfer switch wiring, neutral-ground bonding under NEC 250, and backup runtime calculations.",
    route: "/guides/ev-v2l-v2h-home-backup-power-guide",
    datePublished: "2026-09-25",
    dateModified: "2026-09-30",
    categoryName: "Electric Vehicles",
    categoryRoute: "/ev",
    standards: [
      "SAE J3072 (Interoperability of Electric Vehicle Power Export)",
      "ISO 15118-20 (Bidirectional Power Transfer Communication Protocols)",
      "NFPA 70 / NEC Article 702 (Optional Standby Systems)",
      "NFPA 70 / NEC Article 250.30 & 250.34 (Grounding and Bonding of Separately Derived Systems)",
      "UL 9741 (Standard for Bidirectional Electric Vehicle Charging System Equipment)",
      "UL 1741 SB / IEEE 1547 (Interconnection & Anti-Islanding Protection)",
    ],
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/guides">Guides</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">EV V2L &amp; V2H Home Backup Guide</span>
      </nav>

      <div className="calculator-header">
        <div style={{ marginBottom: "0.75rem" }}>
          <StandardsBadge category="ev" />
        </div>
        <p className="eyebrow">Bidirectional EV Architecture &amp; Microgrids</p>
        <h1>EV V2L &amp; V2H Home Backup Power Guide</h1>
        <p className="intro">
          Electric vehicle battery packs (typically 58 to 131+ kWh) store substantial electrical energy
          that can be deployed for emergency home backup during power outages.
          This guide examines the engineering principles of Vehicle-to-Load (V2L) and Vehicle-to-Home (V2H)
          systems—including 120V vs. 240V split-phase distribution, neutral-ground bonding evaluation under NEC 250,
          manual transfer switch selection, and continuous inverter loading considerations.
        </p>
      </div>

      <DirectAnswerCard
        keyword="How to power a home with an EV (V2L / V2H)"
        answer="To utilize an EV for home backup during an outage: (1) Connect the vehicle's onboard AC inverter (120V single-phase or 240V split-phase) to a listed manual transfer switch or interlock-protected inlet box; (2) Evaluate neutral-ground bonding (bonded-neutral vehicles with onboard GFCI generally require a 3-pole switched-neutral transfer switch to avoid false trips, while floating-neutral sources may operate with 2-pole transfer equipment where permitted); (3) Maintain connected continuous loads within the EV inverter's continuous power rating; and (4) Preserve an intentional state-of-charge reserve (typically 20% to 30%) for driving needs."
        formula="t_backup = (E_usable * (SoC_start - SoC_reserve) * η_inv) / (P_load + P_tare)"
        condition="P_continuous ≤ P_inverter_continuous_rated"
        standardExample="A 77.4 kWh EV pack at 90% starting SoC with a 20% driving reserve provides 54.18 kWh DC. Factoring in 90% inverter efficiency (48.76 kWh AC) and supplying a 450W household load with 50W vehicle tare power (500W total draw): 48.76 kWh ÷ 0.50 kW = 97.5 Hours (~4.06 Days of continuous backup power)."
        sourceAuthority="SAE J3072 / NFPA 70 (NEC Articles 702 & 250) / UL 9741"
      />

      <PageJumpNav
        hasHowTo={true}
        hasMatrix={true}
        hasFormula={true}
        hasWorkedExample={true}
        hasFaqs={true}
        hasRelated={true}
      />

      {/* Interactive Tool Section */}
      <section id="interactive-calculator" style={{ marginTop: "2.5rem" }}>
        <h2>Interactive V2L Home Backup Runtime Calculator</h2>
        <p>
          Simulate your vehicle&apos;s usable battery pack, starting state of charge, emergency
          driving reserve, and appliance wattage mix in real time:
        </p>
        <div id="calculator-tool" style={{ marginTop: "1rem" }}>
          <V2lRuntimeCalculator />
        </div>
      </section>

      {/* Section 1: Architecture Comparison */}
      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <div id="bidirectional-architectures">
          <h2>1. Bidirectional EV Power Architectures: V2L vs. V2H vs. V2G</h2>
          <p>
            Bidirectional electric vehicle power encompasses three primary electrical architectures
            governed by distinct standards, hardware interfaces, and utility interconnection rules:
          </p>

          <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
            <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                  <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Architecture</th>
                  <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Power Output &amp; Voltage</th>
                  <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Interconnection Hardware</th>
                  <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Applicable Standards</th>
                  <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Primary Application</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>V2L (Vehicle-to-Load)</strong></td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>1.5 kW to 9.6 kW (120V single-phase or 120V/240V split-phase AC)</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Charge-port adapter or vehicle AC outlets &rarr; extension cords or listed manual transfer switch</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>SAE J3072, NEC 702</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Essential emergency circuits, worksite tools, and portable power needs.</td>
                </tr>
                <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>V2H (Vehicle-to-Home)</strong></td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>7.6 kW to 19.2 kW (240V split-phase AC or high-voltage DC interface)</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Dedicated bidirectional EVSE + Automatic Transfer Switch (ATS) + Microgrid Isolation Gateway</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>ISO 15118-20, UL 9741, UL 1741 SB</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Automated whole-home islanding, HVAC backup, and integrated solar-plus-storage management.</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>V2G (Vehicle-to-Grid)</strong></td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>7.2 kW to 50+ kW (Grid-Synchronous AC Export)</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Utility-certified bidirectional inverter + smart revenue meter + utility interconnection agreement</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>IEEE 1547, UL 1741 SB, ISO 15118-20</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Grid demand response, virtual power plants (VPPs), and peak load management.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 2: OEM Vehicle Power Specs Table */}
      <section id="oem-vehicle-matrix" style={{ marginTop: "3rem" }}>
        <h2>2. Production EV Bidirectional Specifications Matrix</h2>
        <p>
          Vehicle manufacturers utilize differing onboard inverter topologies, output voltages, receptacle formats,
          and grounding arrangements. Specifications vary by model year, market region, and equipment trim:
        </p>

        <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Vehicle Platform / Model</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Pack Options (Usable kWh)</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Continuous AC Output Rating</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Output Voltage &amp; Receptacle</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Neutral Grounding Topology</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Transfer Interface Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Hyundai / Kia E-GMP</strong><br /><small>Ioniq 5, Ioniq 6, EV6, EV9, Genesis GV60</small></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>~54.0 – 96.0 kWh (usable)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>1.9 kW (120V 16A North America) / ~3.6 kW (230V 16A Int.)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>120V single-phase (J1772/NACS V2L adapter / cabin outlet)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Unbonded / Floating Neutral at V2L port (North America)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Manual transfer switch subpanel or direct extension cords</td>
              </tr>
              <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Ford F-150 Lightning</strong><br /><small>Pro Power Onboard (9.6 kW package)</small></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>98.0 – 131.0 kWh (usable)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>9.6 kW aggregate (7.2 kW 240V 30A bed outlet + 2.4 kW 120V outlets)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>120V / 240V split-phase (NEMA L14-30R twist-lock &amp; 5-20R)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Bonded Neutral (at onboard inverter with internal GFCI)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>3-pole switched-neutral transfer switch (V2L) or Ford HIS (V2H)</td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Tesla Cybertruck</strong><br /><small>Powershare Bidirectional System</small></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>~123.0 kWh (usable)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>9.6 kW continuous (bed outlets) / up to 11.5 kW (Powershare V2H)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>240V NEMA 14-50 &amp; L14-30R (bed) / Universal Wall Connector</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Bonded at bed outlets; isolated via Powershare Gateway</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Tesla Powershare Gateway (V2H) or switched-neutral subpanel (V2L)</td>
              </tr>
              <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>GM Ultium Platform</strong><br /><small>Chevy Silverado EV, GMC Sierra EV</small></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>~85.0 – 205.0 kWh (usable options)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Up to 10.2 kW (PowerBase bed inverter) / up to 19.2 kW (GM Energy V2H)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>120V / 240V NEMA 14-50R &amp; 5-20R / GM PowerShift bidirectional EVSE</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Bonded at bed outlets; managed via GM Energy home gateway</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>GM Energy Home System (V2H) or switched-neutral subpanel (V2L)</td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Rivian R1T / R1S</strong></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>~105.0 – 141.0 kWh (usable options)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>1.5 kW (aggregate across all 120V outlets)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>120V single-phase (NEMA 5-15R cabin and cargo outlets)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Floating Neutral at 120V outlets</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Direct extension cords for dedicated essential loads</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted, #64748b)" }}>
          *Note: Capacities, continuous power ratings, and receptacle configurations represent manufacturer specifications for specified trims and options. Verify exact ratings in vehicle documentation.
        </p>
      </section>

      {/* Section 3: Essential Blackout Sizing & Runtimes */}
      <section id="sizing-matrix" style={{ marginTop: "3rem" }}>
        <div id="blackout-load-profiles">
          <h2>3. Blackout Load Profiles &amp; EV Runtime Benchmarks</h2>
          <p>
            An electric vehicle battery discharges in direct proportion to real-time aggregate household consumption.
            The benchmark table below models estimated backup duration across four standardized residential outage tiers,
            factoring in 90% inverter conversion efficiency, 20% preserved driving reserve, and 40W continuous vehicle tare loss:
          </p>

          <div className="scenario-table" style={{ overflowX: "auto", margin: "1.5rem 0" }}>
            <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <caption>Table 1: Modeled Outage Runtimes Across Standard Load Tiers (90% Eff, 40W Tare, 20% Reserve)</caption>
              <thead>
                <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                  <th scope="col" style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Blackout Load Tier</th>
                  <th scope="col" style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Included Household Appliances</th>
                  <th scope="col" style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Average Continuous Load</th>
                  <th scope="col" style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Total Daily Consumption (incl. Tare)</th>
                  <th scope="col" style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Runtime on 77.4 kWh Pack<br /><small>(48.76 kWh AC Available)</small></th>
                  <th scope="col" style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Runtime on 131 kWh Pack<br /><small>(82.53 kWh AC Available)</small></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Tier 1: Basic Communications</strong></td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Wi-Fi router, cable modem, smartphone/laptop charging, LED desk lamp, CPAP device.</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>120 W (0.12 kW)</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>3.84 kWh / day</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>12.7 Days</strong> (305 Hours)</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>21.5 Days</strong> (516 Hours)</td>
                </tr>
                <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Tier 2: Essential Refrigeration &amp; Heat</strong></td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Tier 1 + Refrigerator/Freezer cycle (~150W avg), Gas Furnace Blower (~250W cycle), LED room lighting.</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>420 W (0.42 kW)</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>11.04 kWh / day</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>4.4 Days</strong> (106 Hours)</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>7.5 Days</strong> (179 Hours)</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Tier 3: Moderate Comfort</strong></td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Tier 2 + Microwave / portable induction cooking (15 min/day), television, small inverter window AC / room heat pump.</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>1,100 W (1.10 kW)</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>27.36 kWh / day</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>1.8 Days</strong> (43 Hours)</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>3.0 Days</strong> (72 Hours)</td>
                </tr>
                <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Tier 4: Heavy Backup Load</strong></td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Tier 3 + Central 240V Heat Pump / AC (with soft start), Sump Pump, Well Pump, Water Heater cycle.</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>3,800 W (3.80 kW)</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>92.16 kWh / day</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>0.5 Days</strong> (13 Hours)</td>
                  <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>0.9 Days</strong> (21 Hours)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted, #64748b)" }}>
            *Benchmark calculations: t_backup = [E_usable × (SoC_start − SoC_reserve) × η_inv] / (P_load + P_tare).
            Modeled with 90% starting SOC, 20% reserve, η_inv = 90%, and P_tare = 40W.
            Available AC energy: 77.4 kWh pack → 77.4 × 0.70 × 0.90 = 48.76 kWh AC; 131 kWh pack → 131 × 0.70 × 0.90 = 82.53 kWh AC.
          </p>
        </div>
      </section>

      {/* Section 4: Neutral-Ground Bonding & NEC 250 */}
      <section id="neutral-ground-bonding" style={{ marginTop: "3rem" }}>
        <h2>4. Neutral-Ground Bonding &amp; Transfer Switch Decision Framework (NEC 250 &amp; 702)</h2>
        <p>
          A central engineering consideration when connecting an EV to building wiring is the management of the
          neutral-to-ground bond. Improper bonding can create parallel neutral return paths or trigger vehicle onboard
          ground-fault protection (GFCI) disconnects:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.5rem 0" }}>
          <div style={{ padding: "1.25rem", border: "1px solid var(--color-border, #e2e8f0)", borderRadius: "8px", background: "var(--color-bg-surface, #ffffff)" }}>
            <h3 style={{ marginTop: 0, color: "var(--color-primary, #0f766e)" }}>Bonded-Neutral Inverters</h3>
            <p style={{ fontSize: "0.925rem" }}>
              <strong>Configuration:</strong> The vehicle inverter contains an internal bond between the AC neutral and the vehicle chassis/equipment ground, frequently paired with internal GFCI sensing.
            </p>
            <p style={{ fontSize: "0.925rem" }}>
              <strong>Electrical Consideration:</strong> If connected to a standard transfer panel where the neutral conductor remains solidly tied to the main service neutral-ground bond, current returning on the neutral divides between the neutral conductor and the equipment grounding conductor. This current imbalance causes onboard GFCI electronics to trip.
            </p>
            <p style={{ fontSize: "0.925rem", fontWeight: 600 }}>
              <strong>Transfer Approach:</strong> Typically configured as a <em>Separately Derived System</em> using a transfer switch that simultaneously switches the neutral conductor (3-pole for 120/240V split-phase systems), isolating the vehicle neutral from the service neutral bond.
            </p>
          </div>

          <div style={{ padding: "1.25rem", border: "1px solid var(--color-border, #e2e8f0)", borderRadius: "8px", background: "var(--color-bg-surface, #ffffff)" }}>
            <h3 style={{ marginTop: 0, color: "var(--color-primary, #0f766e)" }}>Floating-Neutral Inverters</h3>
            <p style={{ fontSize: "0.925rem" }}>
              <strong>Configuration:</strong> The vehicle&apos;s AC output does not bond neutral to equipment ground at the outlet; the neutral conductor remains isolated until grounded at the building service equipment.
            </p>
            <p style={{ fontSize: "0.925rem" }}>
              <strong>Electrical Consideration:</strong> When connected to a home service panel, the solitary neutral-to-ground bond in the main electrical panel establishes the system grounding reference without creating a ground loop.
            </p>
            <p style={{ fontSize: "0.925rem", fontWeight: 600 }}>
              <strong>Transfer Approach:</strong> Can operate as a <em>Non-Separately Derived System</em> using standard 2-pole transfer equipment or listed mechanical interlocks where permitted by the vehicle manufacturer and local AHJ.
            </p>
          </div>
        </div>

        <div id="formula-math">
          <FormulaCard
            title="Inverter Sizing, Loading Margin &amp; Inrush Sizing Equation"
            formula="P_continuous <= P_inverter_rated  and  I_LRA_reduced <= I_surge_inverter"
            latexFormula="P_{\text{continuous}} \le P_{\text{inverter, rated}} \qquad I_{\text{LRA, start}} \le I_{\text{surge, inverter}}"
            variables={[
              { symbol: "P_continuous", label: "Continuous Connected Load", description: "Sum of active continuous loads across powered backup circuits", unit: "W" },
              { symbol: "P_inverter, rated", label: "Inverter Continuous Rating", description: "Manufacturer continuous AC power rating of the EV inverter", unit: "W" },
              { symbol: "I_LRA, start", label: "Motor Starting Inrush", description: "Compressor Locked Rotor Amps (LRA) at startup (reducible via electronic soft starter)", unit: "A" },
              { symbol: "I_surge, inverter", label: "Inverter Peak Surge Rating", description: "Manufacturer momentary surge current capacity supported by the onboard inverter", unit: "A" },
            ]}
            notes={[
              "Planning headroom: Operating aggregate continuous load at or below ~80% of inverter continuous rating provides headroom to absorb cyclic appliance startup spikes (refrigerators, pumps).",
              "NEC continuous load sizing: Under NEC 210.19 and 215.2, branch circuit conductors and overcurrent protection devices supplying continuous loads (3 hours or more) must be sized at 125% of the continuous load.",
              "HVAC inrush: Central air conditioners and heat pumps have high Locked Rotor Amps (LRA). Electronic soft starters can reduce inrush by an illustrative 50%–70%, but compatibility must be verified against the inverter's specific surge curve.",
            ]}
          />
        </div>
      </section>

      {/* Section 5: Step-by-Step Wiring & Setup Procedure */}
      <section id="worked-example" style={{ marginTop: "3rem" }}>
        <div id="wiring-procedure">
          <h2>5. Step-by-Step V2L Home Backup Planning &amp; Integration Considerations</h2>
          <p>
            Safe integration of vehicle power into home wiring requires systematic planning, proper hardware selection,
            and professional installation:
          </p>

          <ol style={{ paddingLeft: "1.25rem", lineHeight: "1.8" }}>
            <li>
              <strong>Audit Vehicle Inverter Capabilities:</strong> Determine whether the vehicle outputs 120V single-phase (1.5–2.4 kW) or 120V/240V split-phase (7.2–9.6 kW), its maximum continuous ampacity, and whether its neutral is bonded or floating.
            </li>
            <li>
              <strong>Select and Install Listed Power Inlet Box:</strong>
              Install an exterior-mounted flanged power inlet box with appropriate male pins (e.g., NEMA L14-30P for 120/240V 30A split-phase or NEMA TT-30P / L5-30P for 120V 30A systems) located near the vehicle parking position.
            </li>
            <li>
              <strong>Select Code-Aligned Transfer Equipment (NEC Article 702):</strong>
              <ul>
                <li><strong>Bonded-Neutral Systems:</strong> Utilize a listed 3-pole manual transfer switch (such as Reliance Controls X-Series) that switches the neutral conductor to isolate the vehicle&apos;s bonded neutral from the utility neutral bus.</li>
                <li><strong>Floating-Neutral Systems:</strong> Utilize a listed manual transfer switch or mechanical interlock kit on the main service panel, maintaining the single main service bonding point.</li>
              </ul>
            </li>
            <li>
              <strong>Prepare Compatible Heavy-Duty Interconnect Cord:</strong>
              Ensure the cord has physically and electrically compatible connector genders:
              a female connector (e.g., NEMA L14-30R) to engage the house inlet box (NEMA L14-30P), and a male plug (e.g., NEMA L14-30P or NEMA 14-50P) to insert into the vehicle&apos;s bed receptacle or V2L adapter. Use minimum 10 AWG (for 30A) or 8 AWG (for 40A/50A) copper conductors.
            </li>
            <li>
              <strong>Outage Activation Protocol:</strong>
              <ol type="a" style={{ marginTop: "0.25rem" }}>
                <li>Open (turn OFF) the main utility service disconnect breaker.</li>
                <li>Verify main disconnect is open and engage the mechanical interlock or transfer switch to the generator/EV position.</li>
                <li>Connect the heavy-duty cord between the vehicle outlet and the house inlet box.</li>
                <li>Enable the vehicle&apos;s V2L / Generator Mode on the center dashboard display.</li>
                <li>Turn ON the generator/EV breaker on the transfer panel.</li>
                <li>Sequentially energize required essential circuit breakers, verifying aggregate load remains within the inverter&apos;s continuous rating.</li>
              </ol>
            </li>
          </ol>

          <div style={{ marginTop: "1.5rem", padding: "1rem 1.25rem", borderRadius: "8px", border: "1px solid var(--color-border, #e2e8f0)", background: "var(--color-bg-subtle, #f8fafc)" }}>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--color-text-muted, #64748b)", lineHeight: 1.5 }}>
              ⚠️ <strong>Engineering Safety &amp; Code Notice:</strong> Electrical integration of an EV into residential service wiring involves lethal voltages and strict National Electrical Code (NEC) rules. All transfer equipment, power inlets, and grounding topologies must be installed by a licensed electrical contractor under local building permits and AHJ inspection.
            </p>
          </div>
        </div>
      </section>

      {/* Responsive Cluster Mesh Links */}
      <section id="related-tools" style={{ marginTop: "3.5rem", borderTop: "2px solid var(--color-border, #e2e8f0)", paddingTop: "2rem" }}>
        <div id="cluster-mesh">
          <h2>Explore Connected Energy &amp; Battery Planning Tools</h2>
          <p>
            Integrate vehicle backup modeling with appliance load audits, stationary battery sizing,
            and electrical service calculations:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem", marginTop: "1.5rem" }}>
            <Link
              href="/ev/v2l-runtime-calculator"
              style={{
                padding: "1.25rem",
                border: "1px solid var(--color-border, #e2e8f0)",
                borderRadius: "8px",
                background: "var(--color-bg-subtle, #f8fafc)",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "0.85rem", fontWeight: "bold", color: "var(--color-primary, #0f766e)", textTransform: "uppercase" }}>Interactive Calculator</span>
              <strong style={{ fontSize: "1.05rem" }}>V2L Runtime Calculator</strong>
              <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted, #64748b)" }}>
                Calculate precise backup hours, appliance duty cycles, and emergency driving reserve thresholds.
              </span>
            </Link>

            <Link
              href="/battery/battery-runtime-calculator"
              style={{
                padding: "1.25rem",
                border: "1px solid var(--color-border, #e2e8f0)",
                borderRadius: "8px",
                background: "var(--color-bg-subtle, #f8fafc)",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "0.85rem", fontWeight: "bold", color: "var(--color-primary, #0f766e)", textTransform: "uppercase" }}>Battery Storage</span>
              <strong style={{ fontSize: "1.05rem" }}>Battery Runtime Calculator</strong>
              <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted, #64748b)" }}>
                Model battery discharge, inverter conversion efficiency, and stationary battery runtime curves.
              </span>
            </Link>

            <Link
              href="/home-energy/home-battery-size-calculator"
              style={{
                padding: "1.25rem",
                border: "1px solid var(--color-border, #e2e8f0)",
                borderRadius: "8px",
                background: "var(--color-bg-subtle, #f8fafc)",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "0.85rem", fontWeight: "bold", color: "var(--color-primary, #0f766e)", textTransform: "uppercase" }}>Home Electrification</span>
              <strong style={{ fontSize: "1.05rem" }}>Home Battery Size Calculator</strong>
              <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted, #64748b)" }}>
                Compare EV backup capacity directly against dedicated stationary home storage systems.
              </span>
            </Link>

            <Link
              href="/ev/ev-charger-breaker-size-calculator"
              style={{
                padding: "1.25rem",
                border: "1px solid var(--color-border, #e2e8f0)",
                borderRadius: "8px",
                background: "var(--color-bg-subtle, #f8fafc)",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "0.85rem", fontWeight: "bold", color: "var(--color-primary, #0f766e)", textTransform: "uppercase" }}>Electrical Infrastructure</span>
              <strong style={{ fontSize: "1.05rem" }}>EV Charger Breaker Size Calculator</strong>
              <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted, #64748b)" }}>
                Size continuous-duty charging circuits (16A to 80A) under NEC 625 with copper conductor sizing.
              </span>
            </Link>

            <Link
              href="/guides/nec-705-12-120-percent-rule-solar-busbar-sizing-guide"
              style={{
                padding: "1.25rem",
                border: "1px solid var(--color-border, #e2e8f0)",
                borderRadius: "8px",
                background: "var(--color-bg-subtle, #f8fafc)",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "0.85rem", fontWeight: "bold", color: "var(--color-primary, #0f766e)", textTransform: "uppercase" }}>Service Panel Rules</span>
              <strong style={{ fontSize: "1.05rem" }}>NEC 705.12 120% Busbar Guide</strong>
              <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted, #64748b)" }}>
                Calculate panel busbar ampacity limits and backfeed breaker calculations under the 120% rule.
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: Applicable Standards */}
      <section id="standards-citations" style={{ marginTop: "3.5rem" }}>
        <h2>Applicable Codes, Standards &amp; Technical References</h2>
        <p>
          Bidirectional EV power integration, transfer equipment, and grounding methodologies are informed by:
        </p>
        <ul style={{ lineHeight: 1.7, fontSize: "0.92rem", color: "var(--color-text-muted, #64748b)" }}>
          <li>
            <strong>NFPA 70 / National Electrical Code (NEC):</strong> Article 702 (Optional Standby Systems), Article 250 (Grounding &amp; Bonding), Article 625 (Electric Vehicle Power Transfer Systems), and Article 705 (Interconnected Electric Power Production Sources).
          </li>
          <li>
            <strong>SAE J3072 / SAE J3068:</strong> <em>Interoperability of Electric Vehicle Power Export</em> — establishes technical requirements for onboard AC inverters discharging to external electrical loads.
          </li>
          <li>
            <strong>ISO 15118-20:</strong> <em>Road vehicles - Vehicle to grid communication interface - Part 20: 2nd generation network and application protocol requirements</em> — defines digital communication for bidirectional DC and AC energy transfer.
          </li>
          <li>
            <strong>UL 9741:</strong> <em>Standard for Bidirectional Electric Vehicle Charging System Equipment</em> — product safety standard covering bidirectional EVSE and power export interfaces.
          </li>
          <li>
            <strong>UL 1741 SB / IEEE Std 1547:</strong> <em>Standard for Inverters, Converters, Controllers and Interconnection System Equipment for Use With Distributed Energy Resources</em> — grid interconnection and anti-islanding safety protocols.
          </li>
        </ul>
      </section>

      {/* Frequently Asked Questions Section */}
      <section id="faq-section" style={{ marginTop: "3.5rem" }}>
        <div id="faq">
          <h2>Frequently Asked Questions: EV Home Backup Power</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1.25rem" }}>
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1.25rem",
                  border: "1px solid var(--color-border, #e2e8f0)",
                  borderRadius: "8px",
                  background: "var(--color-bg-surface, #ffffff)",
                }}
              >
                <h3 style={{ marginTop: 0, fontSize: "1.05rem", color: "var(--color-heading, #0f172a)" }}>{faq.question}</h3>
                <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6", color: "var(--color-text, #334155)" }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Disclaimer variant="safety" />
    </article>
  );
}

