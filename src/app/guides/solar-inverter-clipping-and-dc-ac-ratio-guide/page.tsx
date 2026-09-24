import type { Metadata } from "next";
import Link from "next/link";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { SolarPanelOutputCalculator } from "@/components/calculator/solar-panel-output-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Inverter Clipping & DC-to-AC Ratio Guide (ILR Sizing)",
  description:
    "Master solar inverter clipping, DC-to-AC Inverter Loading Ratio (ILR), Sandia inverter saturation curves, clipping loss economics, and NEC 705.12 busbar rules.",
  canonicalPath: "/guides/solar-inverter-clipping-and-dc-ac-ratio-guide",
  category: "solar",
  isArticle: true,
});

const FAQS = [
  {
    question: "What is solar inverter clipping and why does it occur?",
    answer:
      "Solar inverter clipping occurs when a solar panel array generates more direct-current (DC) power than its connected inverter is rated to convert into alternating current (AC). When DC power multiplied by inverter conversion efficiency exceeds the inverter's maximum continuous AC output rating (Pac,max), the inverter caps AC output at its rated limit. To prevent internal electrical or thermal damage, the inverter's Maximum Power Point Tracker (MPPT) shifts its operating voltage along the module I-V curve toward open-circuit voltage (Voc), reducing current draw and flattening peak output.",
  },
  {
    question: "Is inverter clipping bad or damaging for solar equipment?",
    answer:
      "No. Inverter clipping is a normal, intentional engineering design choice and does not harm solar panels, microinverters, or string inverters. Inverters do not burn off excess clipped power as internal heat; rather, the MPPT electronics throttle input current draw at the silicon level. Modern inverters from manufacturers like Enphase, SolarEdge, SMA, and Tesla are engineered and warrantied to operate at Inverter Loading Ratios of 1.20 to 1.50+ for their entire 10-to-25-year design lifetimes.",
  },
  {
    question: "What is the optimal DC-to-AC ratio (Inverter Loading Ratio / ILR)?",
    answer:
      "For most grid-tied residential solar installations, the optimal DC-to-AC ratio (Inverter Loading Ratio or ILR) ranges between 1.15 and 1.30 (a 15% to 30% DC oversize). For East/West split roof arrays, high latitudes, or cloud-prone regions, an ILR of 1.30 to 1.40 delivers superior Levelized Cost of Energy (LCOE). DC-coupled hybrid battery systems can economically support ILRs up to 1.50 to 1.70 by routing excess DC energy directly into battery storage before AC inversion.",
  },
  {
    question: "How much annual energy is actually lost to solar inverter clipping?",
    answer:
      "For a properly sized residential system with a DC-to-AC ratio between 1.20 and 1.28, annual clipping energy loss is typically only 0.5% to 1.5% of total annual kWh production. Meanwhile, oversizing the DC array increases total annual energy generation by 15% to 25% by boosting harvest during shoulder hours (mornings, late afternoons, overcast days, and winter months) when the inverter would otherwise operate below peak efficiency.",
  },
  {
    question: "How does ambient temperature affect solar inverter clipping?",
    answer:
      "High ambient temperatures reduce inverter clipping in two ways: First, photovoltaic silicon panels experience negative temperature coefficients (-0.30% to -0.38% per °C above 25°C), meaning on hot summer days with cell temperatures reaching 55°C–65°C, panel power drops by 10%–15%, often falling below the clipping threshold. Second, if ambient air around the inverter exceeds 45°C–50°C, the inverter may initiate thermal derating, temporarily lowering its AC output ceiling to protect internal power electronics.",
  },
  {
    question: "What is the difference between string inverter clipping and microinverter clipping?",
    answer:
      "In a string inverter system (e.g., SolarEdge or SMA), clipping occurs centrally at the single main inverter when the aggregate string DC power exceeds the central AC rating. In a microinverter system (e.g., Enphase IQ8 series), clipping occurs at each individual panel because each panel has its own dedicated 240V AC microinverter (such as an Enphase IQ8+ rated at 290W AC paired with a 400W DC panel, yielding an ILR of 1.38). Microinverter clipping is localized, so shading on one panel does not affect clipping on adjacent panels.",
  },
  {
    question: "Can DC-coupled battery storage capture clipped solar power?",
    answer:
      "Yes. In DC-coupled storage architectures (such as Tesla Powerwall 3 or SolarEdge Home Hub), solar panels feed a shared high-voltage DC bus before power passes through the AC inverter. When solar DC generation exceeds the inverter's maximum AC grid-export rating (e.g., 7.6 kW or 11.5 kW), the energy management system diverts the surplus DC power directly into charging the battery storage bank, achieving 0% clipping loss even at extreme ILRs of 1.40 to 1.70.",
  },
];

export default function SolarInverterClippingGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "Solar Inverter Clipping & DC-to-AC Ratio Sizing Guide (ILR, Saturation & Economics)",
    description:
      "Definitive engineering guide to solar inverter clipping, DC-to-AC Inverter Loading Ratio (ILR), Sandia inverter saturation curves, and clipping loss economics under NEC 690 and NEC 705.",
    route: "/guides/solar-inverter-clipping-and-dc-ac-ratio-guide",
    datePublished: "2026-09-23",
    dateModified: "2026-09-23",
    categoryName: "Solar Photovoltaics",
    categoryRoute: "/solar",
    standards: [
      "NREL System Advisor Model (SAM) Inverter Performance Modeling",
      "Sandia National Laboratories Inverter Model (SAND2004-5601)",
      "IEC 61724 (Photovoltaic System Performance Monitoring)",
      "NFPA 70 / NEC Article 705.12(B) (120% Busbar Interconnection Rule)",
      "IEEE 1547 (Interconnection and Interoperability of Distributed Energy Resources)",
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
        <span aria-current="page">Solar Inverter Clipping Guide</span>
      </nav>

      <header className="calculator-header">
        <p className="eyebrow">Solar PV Engineering &amp; Sizing Guide</p>
        <h1>Solar Inverter Clipping &amp; DC-to-AC Ratio Sizing Guide</h1>
        <p className="intro">
          An authoritative electrical engineering explainer on solar inverter clipping, the DC-to-AC
          Inverter Loading Ratio (ILR), Maximum Power Point Tracking (MPPT) voltage shifting, and
          the Levelized Cost of Energy (LCOE) trade-offs between array oversizing and electrical
          interconnection limits under NEC 705.12(B).
        </p>
      </header>

      <DirectAnswerCard
        keyword="solar inverter clipping and dc to ac ratio formula"
        answer="The Inverter Loading Ratio (ILR / DC-to-AC ratio) is defined as: ILR = Total DC Array Rating (STC Watts) ÷ Inverter Maximum Continuous AC Output (Watts). An optimal residential ILR ranges from 1.15 to 1.30 (up to 1.35 for East/West split arrays). Inverter clipping caps instantaneous mid-day power at the inverter's maximum AC ceiling, but annual energy lost to clipping is typically only 0.5% to 1.5% of total generation, while increasing morning, late afternoon, and cloudy day energy harvest by 15% to 25%."
        formula="ILR = P_dc_STC ÷ P_ac_rated   |   P_clipped(t) = max(0, P_dc(t) × η_inv(P_dc) - P_ac_max)"
        standardExample="A 9.6 kW DC Array connected to a 7.6 kW AC Inverter has an ILR of 1.263. Over a typical year in Climate Zone 4, clipping loss is ~1.1% (~165 kWh/year out of 14,800 kWh total generation), while capturing ~2,900 kWh more annual energy than a 1.0 ratio system with zero additional inverter or electrical panel upgrade costs."
        sourceAuthority="NREL System Advisor Model (SAM) / Sandia National Laboratories Report SAND2004-5601"
      />

      <PageJumpNav />

      {/* Interactive Live Calculator Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>
            Interactive Solar Array &amp; Annual AC Production Engine
          </h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Model your solar DC capacity, tilt angle, azimuth orientation, and subsystem conversion
            efficiency to simulate realistic monthly and annual AC kilowatt-hour production curves.
          </p>
        </div>
        <SolarPanelOutputCalculator />
      </section>

      {/* Section 1: Inverter Clipping Physics */}
      <section id="clipping-physics" style={{ marginTop: "2.5rem" }}>
        <h2>1. Inverter Clipping Physics &amp; MPPT Voltage Shifting</h2>
        <p>
          In a photovoltaic system, <strong>clipping</strong> (also referred to as inverter saturation
          or power limiting) occurs when instantaneous DC power generated by the solar modules exceeds
          the maximum continuous AC power rating (<code>P<sub>ac,max</sub></code>) of the inverter.
        </p>
        <p>
          Homeowners frequently observe their solar production monitoring curves plateauing into a flat
          tabletop shape during mid-day clear sky conditions. A common misconception is that this
          plateau damages the inverter or wastes massive quantities of clean energy. In reality,
          clipping is governed by precise solid-state control algorithms:
        </p>

        <FormulaCard
          title="Inverter Loading Ratio (ILR) & Clipping Threshold Formulas"
          formula="ILR = \frac{P_{dc,STC}}{P_{ac,rated}} \qquad P_{ac}(t) = \min\left(P_{ac,max},\; P_{dc}(t) \times \eta_{inv}(P_{dc})\right)"
          variables={[
            { symbol: "P_dc,STC", label: "DC Array Nameplate Rating", description: "Total nameplate DC array power under Standard Test Conditions", unit: "kW" },
            { symbol: "P_ac,rated", label: "Inverter AC Continuous Rating", description: "Inverter maximum continuous AC power output rating at unity power factor", unit: "kW" },
            { symbol: "ILR", label: "Inverter Loading Ratio", description: "Inverter Loading Ratio (DC-to-AC ratio, typically 1.15 to 1.35)", unit: "dimensionless" },
            { symbol: "η_inv(P_dc)", label: "Dynamic Inverter Efficiency", description: "Inverter conversion efficiency as modeled by Sandia/CEC saturation curves", unit: "decimal" },
            { symbol: "P_ac,max", label: "Inverter Power Ceiling", description: "Inverter hardware continuous power ceiling governed by internal thermal and magnetic limits", unit: "kW" },
          ]}
          notes={[
            "When P_dc(t) × η_inv > P_ac,max, the surplus instantaneous power is not absorbed or dissipated as heat; the inverter shifts operating voltage to throttle current draw.",
            "CEC weighted efficiency averages inverter performance across 10%, 20%, 30%, 50%, 75%, and 100% load steps.",
          ]}
        />

        <h3>How MPPT Detuning Protects Inverter Hardware</h3>
        <p>
          Solar panels operate along a non-linear Current-Voltage (I-V) curve. Under normal sunlight,
          the inverter&apos;s Maximum Power Point Tracker (MPPT) dynamically adjusts its DC input
          impedance so that panel voltage sits exactly at <code>V<sub>mp</sub></code> (voltage at maximum
          power), harvesting the maximum possible wattage (<code>P<sub>mp</sub> = V<sub>mp</sub> &times; I<sub>mp</sub></code>).
        </p>
        <p>
          When available solar power exceeds <code>P<sub>ac,max</sub> &divide; &eta;<sub>inv</sub></code>,
          the MPPT controller intentionally increases DC input voltage upward along the curve toward
          open-circuit voltage (<code>V<sub>oc</sub></code>). Because the solar cell I-V curve drops
          sharply toward zero current as voltage approaches <code>V<sub>oc</sub></code>, shifting
          voltage higher causes current (<code>I<sub>dc</sub></code>) to plummet. By modulating this
          duty cycle, the inverter safely throttles DC input power to match its exact AC rating.
          No excess electricity is &quot;dumped,&quot; and no excess internal thermal load is created.
        </p>
      </section>

      {/* Section 2: Why Installers Oversize Arrays */}
      <section id="why-oversize" style={{ marginTop: "3rem" }}>
        <h2>2. Why Engineers Intentionally Oversize DC Arrays (The Economics of ILR)</h2>
        <p>
          Designing a solar system with a 1.0 DC-to-AC ratio (e.g., 7.6 kW DC on a 7.6 kW AC inverter)
          results in an underutilized, economically inefficient system. In solar engineering,
          intentional array oversizing (ILR between 1.15 and 1.30) is standard practice for three
          primary engineering reasons:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.5rem 0" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>🌡️ Real-World Thermal Derating</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
              Panels are rated at Standard Test Conditions (STC: 1,000 W/m&sup2; irradiance, 25&deg;C cell temperature).
              In actual summer operation, solar cells operate at 45&deg;C to 65&deg;C (NMOT). With a negative temperature
              coefficient of -0.35%/&deg;C, a 400W panel generates only 345W to 365W in mid-day summer heat. An oversized
              DC array compensates for this natural thermal power drop.
            </p>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>📈 Inverter Efficiency Sweet Spot</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
              Inverters exhibit non-linear efficiency curves. At low loading (&lt;15% of capacity), tare power
              losses drop conversion efficiency to 88%–92%. Between 30% and 80% loading, efficiency peaks at 97%–98.5%.
              An oversized DC array pushes the inverter into its high-efficiency window earlier at sunrise and keeps it
              there later at sunset.
            </p>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>💰 Lower LCOE per Watt Harvested</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
              Photovoltaic solar modules have become extremely inexpensive (~$0.25 to $0.40/W wholesale), while
              larger inverters, conduit sizing, and utility interconnection permits carry substantial fixed costs.
              Oversizing DC modules extracts significantly more total kWh per inverter dollar invested, lowering the
              Levelized Cost of Energy.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Empirical Benchmark Table */}
      <section id="benchmark-table" style={{ marginTop: "3rem" }}>
        <h2>3. Empirical Benchmark: Inverter Loading Ratio vs. Annual Clipping Loss</h2>
        <p>
          The table below illustrates empirical annual clipping loss percentages and net annual generation gains
          modeled via the NREL System Advisor Model (SAM) across representative U.S. solar climate zones for a
          fixed-tilt south-facing residential array:
        </p>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 1: DC-to-AC Ratio (ILR) vs. Clipping Loss &amp; Net Energy Harvest by Climate Zone</caption>
            <thead>
              <tr>
                <th scope="col">Inverter Loading Ratio (ILR)</th>
                <th scope="col">Example Sizing (DC kW / AC kW)</th>
                <th scope="col">SW Arid (Zone 2B - Phoenix) Clipping Loss %</th>
                <th scope="col">Mid-Atlantic (Zone 4A - Richmond) Clipping Loss %</th>
                <th scope="col">PNW Marine (Zone 4C - Seattle) Clipping Loss %</th>
                <th scope="col">Net Annual kWh Gain vs. 1.0 ILR</th>
                <th scope="col">Engineering Recommendation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1.00</strong> (1:1 Match)</td>
                <td>7.6 kW DC / 7.6 kW AC</td>
                <td>0.00%</td>
                <td>0.00%</td>
                <td>0.00%</td>
                <td>Baseline (0%)</td>
                <td><span style={{ color: "var(--muted)" }}>Suboptimal: Inverter underutilized 95% of year</span></td>
              </tr>
              <tr>
                <td><strong>1.15</strong> (Conservative)</td>
                <td>8.7 kW DC / 7.6 kW AC</td>
                <td>0.18%</td>
                <td>0.08%</td>
                <td>0.02%</td>
                <td>+14.8%</td>
                <td><strong>Safe Conservative: Zero noticeable clipping</strong></td>
              </tr>
              <tr>
                <td><strong>1.25</strong> (Industry Standard)</td>
                <td>9.5 kW DC / 7.6 kW AC</td>
                <td>1.15%</td>
                <td>0.62%</td>
                <td>0.25%</td>
                <td>+23.9%</td>
                <td><strong>Recommended Optimal: Best residential LCOE balance</strong></td>
              </tr>
              <tr>
                <td><strong>1.30</strong> (Moderate Overbuild)</td>
                <td>9.9 kW DC / 7.6 kW AC</td>
                <td>2.10%</td>
                <td>1.25%</td>
                <td>0.58%</td>
                <td>+27.8%</td>
                <td><strong>Optimal for East/West roofs &amp; high-cloud regions</strong></td>
              </tr>
              <tr>
                <td><strong>1.38</strong> (High Microinverter)</td>
                <td>10.5 kW DC / 7.6 kW AC</td>
                <td>3.95%</td>
                <td>2.60%</td>
                <td>1.35%</td>
                <td>+33.2%</td>
                <td>Common with Enphase IQ8+ paired with 400W modules</td>
              </tr>
              <tr>
                <td><strong>1.50</strong> (DC-Coupled Battery)</td>
                <td>11.4 kW DC / 7.6 kW AC</td>
                <td>7.80% (or 0% with storage)</td>
                <td>5.10% (or 0%)</td>
                <td>2.90% (or 0%)</td>
                <td>+42.5%</td>
                <td><strong>Ideal for DC-coupled hybrid storage (divert clip to battery)</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
          *Data derived from NREL SAM hourly simulations using TMY3 meteorological weather files. Net energy harvest reflects
          gross annual AC production accounting for thermal loss, wiring resistance, inverter efficiency curves, and clipping.
        </p>
      </section>

      {/* Section 4: String vs Microinverter vs Storage */}
      <section id="inverter-architectures" style={{ marginTop: "3rem" }}>
        <h2>4. Inverter Architectures: String Inverters vs. Microinverters vs. DC Storage</h2>
        <p>
          How clipping impacts your solar system depends substantially on the electrical conversion topology:
        </p>

        <h3>Microinverters (Enphase IQ8 Series)</h3>
        <p>
          In a microinverter architecture, each individual solar module connects directly to a miniature grid-interactive
          inverter mounted under the panel racking. Because microinverters are standardized at fixed AC wattage steps
          (e.g., IQ8+ at 290W AC, IQ8M at 325W AC, IQ8A at 349W AC), pairing them with modern 400W–440W solar modules
          inherently yields higher DC-to-AC ratios (often 1.25 to 1.38):
        </p>
        <ul style={{ lineHeight: 1.7, fontSize: "0.95rem" }}>
          <li>
            <strong>400W Module + Enphase IQ8+ (290W AC):</strong> ILR = 400 &divide; 290 = <strong>1.379</strong>.
            Clipping occurs around noon on cool, clear spring days, but early morning and winter generation is maximized.
          </li>
          <li>
            <strong>400W Module + Enphase IQ8M (325W AC):</strong> ILR = 400 &divide; 325 = <strong>1.231</strong>.
            Optimal balanced pairing for moderate-to-high insolation climates.
          </li>
          <li>
            <strong>430W Module + Enphase IQ8A (349W AC):</strong> ILR = 430 &divide; 349 = <strong>1.232</strong>.
            Recommended for premium high-wattage residential modules.
          </li>
        </ul>

        <h3>DC-Coupled Battery Storage: &quot;Zero-Loss Clipping Recapture&quot;</h3>
        <p>
          Modern DC-coupled hybrid inverters (such as the <strong>Tesla Powerwall 3</strong>, <strong>SolarEdge Home Hub</strong>,
          or <strong>Enphase IQ Battery 5P</strong> DC systems) introduce a transformative efficiency advantage:
        </p>
        <p>
          Solar DC power connects to an internal high-voltage DC bus before conversion to AC. If an 11.5 kW DC solar array
          produces 10 kW DC during mid-day, and the home&apos;s grid interconnection limit allows only 7.6 kW AC export, the
          hybrid controller does not clip the remaining 2.4 kW. Instead, it routes the excess 2.4 kW DC power directly into the
          battery storage cells. This eliminates clipping loss entirely while supporting extreme DC oversizing ratios of 1.40 to 1.60+.
        </p>
      </section>

      {/* Section 5: Electrical Code & NEC 705.12 Busbar Rule */}
      <section id="nec-busbar-rules" style={{ marginTop: "3rem" }}>
        <h2>5. Electrical Code &amp; Interconnection: NEC 705.12(B) 120% Busbar Rule</h2>
        <p>
          One of the most compelling engineering reasons to oversize solar arrays is compliance with the
          <strong> National Electrical Code (NEC Article 705.12)</strong>. Electric utility interconnection rules
          and building safety codes regulate solar systems based strictly on the <strong>inverter&apos;s maximum
          continuous AC output amperage</strong>, not the size of the DC roof array:
        </p>

        <FormulaCard
          title="NEC 705.12(B) 120% Busbar Calculation Formula"
          formula="I_{bus} \times 1.20 \ge I_{main} + \left(I_{ac,inv\_max} \times 1.25\right)"
          variables={[
            { symbol: "I_bus", label: "Panel Busbar Ampacity", description: "Main electrical service panel busbar ampacity rating", unit: "Amps" },
            { symbol: "I_main", label: "Main Disconnect Rating", description: "Main service disconnect circuit breaker rating", unit: "Amps" },
            { symbol: "I_ac,inv_max", label: "Inverter Continuous Current", description: "Inverter continuous rated AC output current (e.g., 32A for 7.6 kW at 240V)", unit: "Amps" },
            { symbol: "1.25", label: "Continuous Duty Factor", description: "Continuous duty safety factor mandated by NEC 705.12 and NEC 690.8", unit: "multiplier" },
          ]}
          notes={[
            "On a standard 200A panel with a 200A main breaker: Allowed solar backfeed = (200A × 1.20) - 200A = 40A.",
            "A 40A dedicated solar breaker accommodates a maximum continuous inverter current of 40A ÷ 1.25 = 32A.",
            "32A at 240V AC equals exactly 7,680W (7.6 kW) of continuous AC inverter output.",
          ]}
        />

        <h3>How an Oversized DC Array Saves $2,500–$4,500 in Panel Upgrades</h3>
        <p>
          If a homeowner requires 10 kW of solar capacity to cover their annual electrical usage:
        </p>
        <ul>
          <li>
            <strong>Approach A (1.0 Ratio):</strong> Installing a 10 kW AC inverter produces 41.7A continuous, requiring a
            60A backfeed breaker (41.7A &times; 1.25 = 52.1A &rarr; 60A breaker). On a standard 200A service panel, this
            violates the 120% busbar rule (200A &times; 1.20 = 240A limit; 200A main + 60A solar = 260A &gt; 240A).
            The homeowner must spend $2,500 to $4,500 on a 400A service panel upgrade or utility supply-side tap.
          </li>
          <li>
            <strong>Approach B (1.316 Ratio):</strong> Installing a 10 kW DC array on a 7.6 kW AC inverter fits perfectly
            within the standard 40A breaker limit (32A continuous &times; 1.25 = 40A). The homeowner avoids the costly panel
            upgrade, passes electrical inspection effortlessly, and still captures 98.8% of theoretical annual solar generation!
          </li>
        </ul>
      </section>

      {/* Section 6: Planning Mesh Section */}
      <section id="planning-pathways" style={{ marginTop: "3rem" }}>
        <h2>6. Connected Solar &amp; Inverter Planning Mesh</h2>
        <p>
          Complete your solar electrical system design with our integrated engineering calculators and reference guides:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginTop: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>☀️ Solar Panel AC Yield</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Simulate monthly and annual kilowatt-hour energy production factoring local peak sun hours and DC derates.
            </p>
            <Link href="/solar/solar-panel-output-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Solar Output Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>🔌 Charge Controller Sizing</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Size MPPT and PWM solar charge controllers with cold-weather sub-zero Voc voltage expansion calculations.
            </p>
            <Link href="/solar/solar-charge-controller-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Charge Controller Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>📐 Solar Tilt &amp; Azimuth</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Calculate optimum summer, winter, and year-round panel angles to maximize cosine irradiance collection.
            </p>
            <Link href="/solar/solar-panel-tilt-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Solar Panel Tilt Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "var(--surface)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>⚡ Battery Inverter Sizing</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
              Size pure sine wave inverters for inductive motor starting surge loads, continuous running watts, and DC fuses.
            </p>
            <Link href="/battery/inverter-size-calculator" className="button secondary-button" style={{ width: "100%", textAlign: "center", display: "block" }}>
              Inverter Size Calculator →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: Standards & Citations */}
      <section id="standards-citations" style={{ marginTop: "3rem" }}>
        <h2>7. Standards, Research Citations &amp; Testing Authorities</h2>
        <p>
          The electrical formulas, saturation models, and clipping loss baselines presented in this guide comply
          with authoritative photovoltaic engineering literature and electrical codes:
        </p>
        <ul style={{ lineHeight: 1.7, fontSize: "0.92rem", color: "var(--muted)" }}>
          <li>
            <strong>NREL System Advisor Model (SAM):</strong> <em>Photovoltaic Inverter Performance and Clipping Modeling Reference Manual</em> (Gilman, P., Dobos, A., DiOrio, N., National Renewable Energy Laboratory).
          </li>
          <li>
            <strong>Sandia National Laboratories:</strong> <em>Performance Model for Grid-Connected Photovoltaic Inverters</em>, Report SAND2004-5601 (King, D., Gonzalez, S., Galbraith, G., Boyson, W.).
          </li>
          <li>
            <strong>NFPA 70 / National Electrical Code (NEC):</strong> Article 690 (Solar Photovoltaic Systems) &amp; Article 705.12(B) (Load-Side Source Connections and Busbar Rating Rules).
          </li>
          <li>
            <strong>IEC 61724-1:</strong> <em>Photovoltaic system performance - Part 1: Monitoring</em> (Standardized definitions for array yield, final system yield, and inverter saturation loss metrics).
          </li>
          <li>
            <strong>IEEE Std 1547:</strong> <em>Standard for Interconnection and Interoperability of Distributed Energy Resources with Associated Electric Power Systems Interfaces</em>.
          </li>
        </ul>
      </section>

      {/* Section 8: FAQ Accordion */}
      <section id="faq-section" className="faq-section" style={{ marginTop: "3.5rem" }}>
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
    </article>
  );
}
