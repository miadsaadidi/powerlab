import type { Metadata } from "next";
import Link from "next/link";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { V2lRuntimeCalculator } from "@/components/calculator/v2l-runtime-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "EV V2L & V2H Home Backup Power Guide: Wiring, Inverters & Sizing",
  description:
    "Master powering your home with an EV: Vehicle-to-Load (V2L) vs V2H vs V2G, 120V/240V transfer switch wiring, neutral-ground bonding (NEC 250), and blackout runtime math.",
  canonicalPath: "/guides/ev-v2l-v2h-home-backup-power-guide",
  category: "ev",
  isArticle: true,
});

const FAQS = [
  {
    question: "What is the difference between V2L, V2H, and V2G bidirectional EV power?",
    answer:
      "Vehicle-to-Load (V2L) delivers alternating current (AC) directly from the EV's onboard inverter via 120V or 240V outlets (typically 1.8 kW to 9.6 kW) to power specific appliances or a manual transfer subpanel. Vehicle-to-Home (V2H) integrates the EV with a dedicated home bi-directional gateway or DC wallbox (up to 11.5 kW to 19.2 kW) to automatically isolate from the utility grid and power the entire electrical service panel during a blackout. Vehicle-to-Grid (V2G) enables the EV to export power back onto the commercial electric utility grid for demand response and peak-shaving revenue.",
  },
  {
    question: "How long can an electric vehicle power a house during a power outage?",
    answer:
      "A typical modern EV battery (60 kWh to 131 kWh) contains 4 to 10 times more electrical energy than a standard stationary home battery (e.g. 13.5 kWh Tesla Powerwall). When powering essential blackout circuits (refrigerator, LED lighting, Wi-Fi router, furnace blower, phone/laptop charging: ~300W to 500W average), a 77 kWh EV provides 5 to 8 continuous days of backup power while maintaining a 20% emergency driving reserve. A large 131 kWh truck pack (e.g. Ford F-150 Lightning) can sustain essential loads for 10 to 16 days.",
  },
  {
    question: "Why does an EV trip GFCI breakers or generator interlock switches during home backup?",
    answer:
      "This is caused by neutral-ground bonding conflicts governed by NEC 250. Some EVs (such as the Ford F-150 Lightning with Pro Power Onboard) have a bonded neutral (neutral and equipment ground are bonded inside the vehicle). When plugged into a standard home generator interlock where the main service panel also bonds neutral to ground, a parallel neutral-ground return path is formed, causing the vehicle's onboard GFCI sensing electronics to instantly trip. To solve this, bonded neutral EVs require a 3-pole transfer switch that switches both hot conductors and the neutral conductor (Separately Derived System). EVs with floating neutral inverters (like Hyundai/Kia E-GMP) work seamlessly with standard 2-pole interlocks.",
  },
  {
    question: "What equipment is needed to connect a V2L vehicle to a home electrical panel?",
    answer:
      "To safely power home circuits without extension cords, you need: (1) A heavy-duty generator inlet box (e.g. NEMA L14-30P or TT-30P), (2) A mechanical interlock kit or manual transfer switch panel (NEC Article 702 compliant) to physically prevent backfeeding the utility grid, (3) The correct 10 AWG to 8 AWG rubber-jacketed extension cable (NEMA L14-30R / TT-30R to EV outlet/adapter), and (4) Proper neutral configuration (switched neutral transfer switch for bonded EVs, standard interlock for floating neutral EVs).",
  },
  {
    question: "Can an EV with V2L power a central air conditioner or heat pump?",
    answer:
      "A 120V / 1.8 kW to 2.4 kW V2L vehicle cannot start or run a 240V central HVAC compressor. However, vehicles with 240V / 7.2 kW to 9.6 kW bidirectional inverters (like the Ford F-150 Lightning, Chevy Silverado EV, or Tesla Cybertruck) can easily run whole-house central air conditioners or cold-climate heat pumps up to 3 to 4 tons, especially when paired with an electronic soft-start kit (such as Micro-Air EasyStart) that cuts inrush locked-rotor amps (LRA) by 60%–70%.",
  },
  {
    question: "How much parasitic or tare power does an EV consume while in V2L mode?",
    answer:
      "When V2L or utility mode is active, the vehicle's primary high-voltage battery contactors, DC-DC converter (powering 12V electronics), battery management system (BMS), and thermal management pumps remain energized. This continuous tare loss draws approximately 30W to 80W of background power (~0.7 kWh to 1.9 kWh per 24-hour day), which should be factored into runtime projections alongside household appliance consumption.",
  },
];

export default function EvV2lV2hHomeBackupGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "EV V2L & V2H Home Backup Power Guide: Wiring, Inverters & Sizing",
    description:
      "Definitive engineering guide to powering a home with EV bidirectional energy: V2L vs V2H vs V2G architectures, transfer switch wiring, neutral-ground bonding under NEC 250, and load sizing calculations.",
    route: "/guides/ev-v2l-v2h-home-backup-power-guide",
    datePublished: "2026-09-25",
    dateModified: "2026-09-25",
    categoryName: "Electric Vehicles",
    categoryRoute: "/ev",
    standards: [
      "SAE J3072 / SAE J3068 (Interoperability of Electric Vehicle Power Export)",
      "ISO 15118-20 (Road vehicles - Vehicle to grid communication interface)",
      "NFPA 70 / NEC Article 702 (Optional Standby Systems)",
      "NFPA 70 / NEC Article 250.30 & 250.34 (Grounding and Bonding of Separately Derived Systems)",
      "UL 9741 (Standard for Bidirectional Electric Vehicle Charging System Equipment)",
      "UL 1741 SB / IEEE 1547 (Grid Interconnection & Islanding Protection)",
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
          A modern electric vehicle battery (60 to 131 kWh) holds enough stored electrochemical energy
          to power critical household loads for 5 to 15 days during an electrical grid failure.
          Learn how to engineer, size, and safely wire Vehicle-to-Load (V2L) and Vehicle-to-Home (V2H)
          systems—including 120V vs. 240V split-phase distribution, neutral-ground bonding under NEC 250,
          manual transfer switches, and continuous inverter duty limits.
        </p>
      </div>

      <DirectAnswerCard
        keyword="How to power a home with an EV (V2L / V2H)"
        answer="To power a home during a blackout using an EV: (1) Connect the vehicle's onboard AC inverter (120V or 240V) to a manual transfer switch subpanel or interlock-protected inlet box; (2) Verify neutral-ground bonding compatibility (use a 3-pole switched-neutral transfer switch for bonded-neutral EVs like the Ford F-150 Lightning to prevent GFCI tripping, or a standard 2-pole interlock for floating-neutral EVs like Hyundai E-GMP); (3) Limit total electrical load to 80% of the EV's continuous AC inverter rating; and (4) Protect a 20% to 30% state-of-charge reserve for emergency driving."
        formula="V2L Backup Runtime (Hours) = {[Usable Pack Capacity (kWh) × (Current SoC − Reserve SoC)] × Inverter Efficiency (0.88–0.93)} ÷ [Average Load (kW) + Parasitic Vehicle Tare (0.05 kW)]"
        standardExample="77.4 kWh EV pack at 90% SoC with 20% driving reserve (54.18 kWh usable) running 450W essential home load: [54.18 × 0.90] ÷ (0.45 + 0.05) = 48.76 ÷ 0.50 = 97.5 Hours (4.06 Days of continuous backup power)"
        sourceAuthority="SAE J3072 / NFPA 70 (NEC Articles 702 & 250) / UL 9741"
      />

      <PageJumpNav />

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
      <section id="bidirectional-architectures" style={{ marginTop: "3rem" }}>
        <h2>1. Bidirectional EV Power Architectures: V2L vs. V2H vs. V2G</h2>
        <p>
          The term &quot;bidirectional charging&quot; spans three distinct electrical architectures
          governed by different safety standards, hardware requirements, and grid interconnection rules:
        </p>

        <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Architecture</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Power Output &amp; Voltage</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Interconnection Hardware</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Core Standards</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Typical Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>V2L (Vehicle-to-Load)</strong></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>1.8 kW to 9.6 kW (120V / 240V AC)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Charge-port adapter plug or onboard AC outlets $\rightarrow$ extension cords or manual transfer switch</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>SAE J3072, NEC 702</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Essential blackout circuits, power tools, camping, job sites.</td>
              </tr>
              <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>V2H (Vehicle-to-Home)</strong></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>7.6 kW to 19.2 kW (240V Split-Phase AC or high-voltage DC)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Bi-directional EVSE + Automatic Transfer Switch (ATS) + Microgrid Integration Gateway</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>ISO 15118-20, UL 9741, UL 1741 SB</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Automated whole-house islanding, HVAC, and solar-plus-storage integration.</td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>V2G (Vehicle-to-Grid)</strong></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>7.2 kW to 50+ kW (Synchronous AC Grid Export)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Certified utility-interconnected bi-directional inverter + smart revenue meter</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>IEEE 1547-2018, Rule 21, ISO 15118-20</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Grid peak shaving, virtual power plant (VPP) revenue, frequency regulation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: OEM Vehicle Power Specs Table */}
      <section id="oem-vehicle-matrix" style={{ marginTop: "3rem" }}>
        <h2>2. Production EV Bidirectional Specifications Matrix</h2>
        <p>
          EV manufacturers utilize differing inverter architectures, voltages, and grounding
          configurations. Understanding your vehicle&apos;s specific output capabilities is
          essential for proper electrical sizing:
        </p>

        <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Vehicle Platform / Model</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Battery Pack (Usable kWh)</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Max Continuous AC Output</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Output Voltage &amp; Receptacle</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Neutral Grounding</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Ideal Transfer Method</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Hyundai / Kia E-GMP</strong><br /><small>Ioniq 5, Ioniq 6, Kia EV6, EV9, Genesis GV60</small></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>58.0 – 99.8 kWh</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>1.9 kW (16A Continuous)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>120V (J1772/NACS V2L Adapter + Cabin Outlet)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Floating Neutral</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Standard 2-Pole Interlock or Extension Cords</td>
              </tr>
              <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Ford F-150 Lightning</strong><br /><small>Pro Power Onboard (9.6 kW Option)</small></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>98.0 – 131.0 kWh</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>9.6 kW (7.2 kW 240V Bed + 2.4 kW 120V Frunk)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>120V / 240V (NEMA L14-30R Twist-Lock + 120V Outlets)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Bonded Neutral (Bonded at Inverter)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>3-Pole Switched-Neutral Transfer Switch</td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Tesla Cybertruck</strong><br /><small>Powershare Bidirectional System</small></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>123.0 kWh</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>11.5 kW (V2H Gateway) / 9.6 kW (Bed Outlets)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>240V NEMA 14-50 &amp; L14-30R (Bed) / Universal Wall Connector</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Bonded (Bed) / Isolated (Gateway)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Powershare Gateway or Switched-Neutral Panel</td>
              </tr>
              <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>GM Ultium Platform</strong><br /><small>Chevy Silverado EV, GMC Sierra EV, Blazer EV</small></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>85.0 – 205.0 kWh</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>10.2 kW (PowerBase Bed) / 19.2 kW (GM Energy V2H)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>120V / 240V NEMA 14-50 (Bed) / PowerShift Charger</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Bonded (Bed) / Isolated (V2H Home Hub)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>GM Energy Home System or 3-Pole Panel</td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Rivian R1T / R1S</strong></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>105.0 – 141.0 kWh</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>1.5 kW (12A Total across all outlets)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>120V (4 standard 120V cabin &amp; bed receptacles)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Floating Neutral</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Direct Extension Cords to Essential Loads</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Essential Blackout Sizing & Runtimes */}
      <section id="blackout-load-profiles" style={{ marginTop: "3rem" }}>
        <h2>3. Blackout Load Profiles &amp; EV Runtime Benchmarks</h2>
        <p>
          Unlike fossil fuel generators that consume fuel constantly regardless of load, an EV battery
          discharges proportionally to real-time power draw. The table below illustrates actual
          backup duration across common household emergency tiers:
        </p>

        <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Blackout Load Tier</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Included Household Appliances</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Average Continuous Power</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Daily Energy Consumed</th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Runtime on 77 kWh Pack<br /><small>(20% Reserve = 54 kWh Net)</small></th>
                <th style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)", textAlign: "left" }}>Runtime on 131 kWh Pack<br /><small>(20% Reserve = 92 kWh Net)</small></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Tier 1: Survival &amp; Comms</strong></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Wi-Fi router, cable modem, smartphone charging, LED desk lamp, CPAP machine.</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>120 W (0.12 kW)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>3.8 kWh / day (incl. tare)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>14.2 Days</strong> (340 Hours)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>24.2 Days</strong> (580 Hours)</td>
              </tr>
              <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Tier 2: Essential Food &amp; Heat</strong></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Tier 1 + Refrigerator/Freezer cycle (150W avg), Gas Furnace Blower (250W during cycle), Room LED lighting.</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>420 W (0.42 kW)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>11.3 kWh / day (incl. tare)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>4.8 Days</strong> (115 Hours)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>8.1 Days</strong> (195 Hours)</td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Tier 3: Moderate Comfort</strong></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Tier 2 + Microwave / portable induction cooking (15 min/day), Laptop, TV, 8,000 BTU Window Inverter AC / Heat Pump.</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>1,100 W (1.10 kW)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>27.6 kWh / day (incl. tare)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>2.0 Days</strong> (47 Hours)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>3.3 Days</strong> (80 Hours)</td>
              </tr>
              <tr style={{ background: "var(--color-bg-subtle, #f8fafc)" }}>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>Tier 4: Whole-House Heavy</strong></td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>Central 3-Ton Heat Pump / AC, Electric Water Heater, Sump Pump, Well Pump, Full Kitchen Lighting.</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>3,800 W (3.80 kW)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}>92.4 kWh / day (incl. tare)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>0.6 Days</strong> (14 Hours)</td>
                <td style={{ padding: "0.75rem", border: "1px solid var(--color-border, #e2e8f0)" }}><strong>1.0 Days</strong> (24 Hours)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Neutral-Ground Bonding & NEC 250 */}
      <section id="neutral-ground-bonding" style={{ marginTop: "3rem" }}>
        <h2>4. Neutral-Ground Bonding &amp; Transfer Switch Electrical Code (NEC 250 &amp; 702)</h2>
        <p>
          The most frequent failure mode when integrating an EV into home electrical wiring is
          nuisance tripping of the vehicle&apos;s onboard GFCI sensing electronics. Understanding
          the National Electrical Code requirements for <strong>Separately Derived Systems</strong> versus
          <strong>Non-Separately Derived Systems</strong> prevents equipment lockouts and electrical hazards:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.5rem 0" }}>
          <div style={{ padding: "1.25rem", border: "1px solid var(--color-border, #e2e8f0)", borderRadius: "8px", background: "var(--color-bg-surface, #ffffff)" }}>
            <h3 style={{ marginTop: 0, color: "var(--color-primary, #0f766e)" }}>Bonded Neutral Inverters (e.g. Ford F-150)</h3>
            <p style={{ fontSize: "0.925rem" }}>
              <strong>The Problem:</strong> The vehicle bonds the AC Neutral to Equipment Ground inside the truck inverter.
              If connected to a standard 2-pole generator interlock (where the main house panel also has a neutral-ground bond),
              neutral current splits between the neutral wire and the ground conductor. The vehicle&apos;s onboard GFCI sees
              an unequal current on hot and neutral (I_hot &ne; I_neutral) and trips in milliseconds.
            </p>
            <p style={{ fontSize: "0.925rem", fontWeight: "bold" }}>
              <strong>NEC 250.30 Solution:</strong> Must be wired as a <em>Separately Derived System</em> using a 3-Pole
              Manual Transfer Switch (such as Reliance Controls X-Series or Generac 6852) that switches both Hot conductors AND the Neutral conductor simultaneously, breaking the house neutral bond.
            </p>
          </div>

          <div style={{ padding: "1.25rem", border: "1px solid var(--color-border, #e2e8f0)", borderRadius: "8px", background: "var(--color-bg-surface, #ffffff)" }}>
            <h3 style={{ marginTop: 0, color: "var(--color-primary, #0f766e)" }}>Floating Neutral Inverters (e.g. Hyundai/Kia)</h3>
            <p style={{ fontSize: "0.925rem" }}>
              <strong>The Architecture:</strong> The vehicle does not bond neutral to ground at the V2L port.
              The neutral conductor remains ungrounded until connected to the home panel.
            </p>
            <p style={{ fontSize: "0.925rem", fontWeight: "bold" }}>
              <strong>NEC 250.34 Solution:</strong> Classified as a <em>Non-Separately Derived System</em>. Can be safely
              connected to a standard, low-cost mechanical generator interlock kit or 2-pole transfer switch because the single neutral-ground bond in the main service panel serves as the solitary grounding path without creating a ground loop.
            </p>
          </div>
        </div>

        <FormulaCard
          title="Inverter Runtime &amp; Inrush Sizing Equation"
          formula="P_{\text{continuous}} \le 0.80 \times P_{\text{inverter, rated}} \quad \text{and} \quad I_{\text{LRA, compressor}} \le I_{\text{surge, inverter}}"
          variables={[
            { symbol: "P_continuous", label: "Continuous Load", description: "Aggregate continuous operating load across active circuits", unit: "W" },
            { symbol: "P_inverter, rated", label: "Inverter Rating", description: "Nameplate continuous AC output rating of the EV inverter (e.g. 1,900W for E-GMP; 7,200W for Pro Power 240V)", unit: "W" },
            { symbol: "I_LRA, compressor", label: "Compressor LRA", description: "Locked Rotor Amps (starting surge) of motor/compressor loads (reduced by 65% with a soft starter)", unit: "A" },
            { symbol: "I_surge, inverter", label: "Inverter Surge Peak", description: "Peak instantaneous surge ampacity supported by the EV onboard inverter", unit: "A" },
          ]}
          notes={[
            "NEC 210.19 mandates derating branch circuits to 80% for continuous loads operating 3 hours or longer.",
            "Maintain a minimum 20% power headroom on the EV inverter to absorb refrigerator and furnace blower startup spikes.",
          ]}
        />
      </section>

      {/* Section 5: Step-by-Step Wiring & Setup Procedure */}
      <section id="wiring-procedure" style={{ marginTop: "3rem" }}>
        <h2>5. Step-by-Step V2L Home Backup Installation Protocol</h2>
        <ol style={{ paddingLeft: "1.25rem", lineHeight: "1.75" }}>
          <li>
            <strong>Determine EV Inverter Specs &amp; Voltage:</strong> Check whether your vehicle outputs 120V single-phase (1.8–2.4 kW) or 120V/240V split-phase (7.2–9.6 kW).
          </li>
          <li>
            <strong>Install Generator Power Inlet Box:</strong> Mount a NEMA L14-30P (for 240V/30A systems) or TT-30P (for 120V/30A systems) on the exterior of the house near your driveway or garage parking stall.
          </li>
          <li>
            <strong>Install Interlock Kit or Switched-Neutral Transfer Subpanel:</strong>
            <ul>
              <li>If using a floating-neutral EV (Hyundai/Kia): Install a UL-listed mechanical slider interlock on your main service panel over a dedicated 30A double-pole breaker.</li>
              <li>If using a bonded-neutral EV (Ford F-150 Lightning): Install a 3-pole manual transfer switch that switches the neutral wire to prevent ground-fault loop trips.</li>
            </ul>
          </li>
          <li>
            <strong>Blackout Activation Sequence:</strong>
            <ol type="a">
              <li>Turn OFF the main utility service disconnect breaker in your panel.</li>
              <li>Slide the mechanical interlock upward to unlock the generator/EV breaker.</li>
              <li>Connect the heavy-duty generator cord from the exterior inlet box to the vehicle&apos;s 240V L14-30R outlet or V2L adapter.</li>
              <li>Turn ON the EV&apos;s V2L / Generator Mode in the vehicle dashboard screen.</li>
              <li>Turn ON the generator/EV inlet breaker in the panel.</li>
              <li>Sequentially toggle on essential circuit breakers (refrigeration, lighting, internet, furnace blower), keeping total wattage within the EV inverter&apos;s continuous limit.</li>
            </ol>
          </li>
        </ol>
      </section>

      {/* Responsive Cluster Mesh Links */}
      <section id="cluster-mesh" style={{ marginTop: "3.5rem", borderTop: "2px solid var(--color-border, #e2e8f0)", paddingTop: "2rem" }}>
        <h2>Explore Connected Energy &amp; Battery Planning Tools</h2>
        <p>
          Integrate your vehicle&apos;s energy reserves with household load audits, battery storage sizing,
          and charging circuit calculations:
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
            <span style={{ fontSize: "0.85rem", fontWeight: "bold", color: "var(--color-primary, #0f766e)", textTransform: "uppercase" }}>Primary Tool</span>
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
              Model Peukert battery discharge, inverter efficiency losses, and Ah/kWh stationary battery runtime.
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
              Compare EV backup capacity directly against dedicated stationary home storage (e.g. Powerwall, Enphase).
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
              Size continuous-duty charging circuits (16A to 80A) under NEC 625 with copper AWG conductor sizing.
            </span>
          </Link>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section id="faq" style={{ marginTop: "3.5rem" }}>
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
      </section>
    </article>
  );
}
