import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { SolarPanelOutputCalculator } from "@/components/calculator/solar-panel-output-calculator";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { siteConfig } from "@/lib/site-config";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { FormulaCard } from "@/components/seo/formula-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { SystemFlowDiagram } from "@/components/seo/system-flow-diagram";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("solar-panel-output");

export const metadata: Metadata = buildPageMetadata({
  title: "Solar Panel Output Calculator — kWh Yield (NREL)",
  description: "Calculate monthly and annual solar panel electricity output (kWh yield) from array wattage, tilt, azimuth, and NREL PVWatts V8 solar irradiance modeling.",
  canonicalPath: "/solar/solar-panel-output-calculator",
  category: "solar",
});

const FAQS = [
  {
    question: "How much electricity does a 400-Watt solar panel produce per day?",
    answer: "In a region receiving 4.5 peak sun hours (PSH) per day, a 400W panel produces approximately 1.45 to 1.55 kilowatt-hours (kWh) of usable AC electricity per day after accounting for standard DC system losses (~14%) and inverter conversion efficiency (~96%). Over a full year, one 400W panel generates approximately 520 to 620 kWh depending on local climate and tilt orientation.",
  },
  {
    question: "How many solar panels do I need to power an average home?",
    answer: "The average US household consumes approximately 880 to 900 kWh per month (~10,500 kWh annually). In an average solar resource zone (4.0 to 4.5 PSH), offsetting 100% of this annual consumption requires a 7.5 kW to 8.5 kW DC solar array, which corresponds to 19 to 22 modern 400-Watt solar panels.",
  },
  {
    question: "Why does solar production drop in winter?",
    answer: "Winter solar production decreases primarily because of shorter daylight durations, lower solar elevation angles (which increases atmospheric air mass and reduces plane-of-array irradiance), higher cloud frequency, and potential snow cover. In northern US latitudes, December solar yield can be 50% to 70% lower than peak June generation.",
  },
  {
    question: "What is included in the NREL PVWatts default 14% system loss factor?",
    answer: "NREL PVWatts V8 defines the default ~14% system losses as a multiplicative product of individual DC subsystem derates: soiling (2.0%), shading (3.0%), module mismatch (2.0%), DC wiring resistance (2.0%), connections/diodes (0.5%), light-induced degradation (1.5%), nameplate tolerance (1.0%), and system availability/outages (3.0%). Inverter efficiency (~96%) and cell temperature dynamics are modeled separately in the simulation engine.",
  },
  {
    question: "How does temperature affect solar panel efficiency?",
    answer: "Photovoltaic cells lose efficiency as operating cell temperature rises above the standard test condition (STC) baseline of 25°C (77°F). Standard monocrystalline silicon modules have a temperature coefficient of power (Pmax) of approximately -0.35% to -0.40% per °C. On a hot summer afternoon where dark cell temperatures reach 55°C to 65°C, panel power output drops by 10% to 16% relative to STC rating.",
  },
];

export default function SolarOutputPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Solar Panel Output Calculator",
    description: "Estimate monthly and annual solar panel output using system size, panel details, orientation, and NREL PVWatts V8 modeling.",
    route: "/solar/solar-panel-output-calculator",
    categoryName: "Solar",
    categoryRoute: "/solar",
    features: [
      "Location-aware AC kilowatt-hour production modeling via NREL PVWatts V8",
      "Automatic coordinates lookup or manual latitude/longitude input",
      "Monthly and annual solar generation breakdowns with seasonal variation",
      "Customizable system losses, module type, and DC-to-AC ratio",
    ],
    standards: [
      "NREL PVWatts V8 Photovoltaic Performance Model",
      "IEC 61724 (Photovoltaic System Performance Monitoring)",
      "IEEE 1547 (Interconnection and Interoperability of Distributed Energy Resources)",
      "NFPA 70 / NEC Article 690 (Solar Photovoltaic Systems)",
    ],
    companionDatasetUrl: "https://doi.org/10.6084/m9.figshare.33821937",
    companionPaperUrl: "https://www.powelab.org/research/photovoltaic-inverter-clipping-efficiency-loss",
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/solar">Solar</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Solar Panel Output Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Solar planning</p>
        <h1>Solar Panel Output Calculator</h1>
        <p className="intro">
          Estimate monthly and annual solar panel electricity output (AC kWh yield) for your location using DC array capacity, roof pitch tilt, compass azimuth, and location-aware NREL PVWatts V8 solar irradiance modeling.
        </p>
      </div>

      <div id="calculator-tool">
        <SolarPanelOutputCalculator />
      </div>

      <DirectAnswerCard
        keyword="solar panel output calculator"
        answer="To estimate daily solar AC output, multiply your DC array rating (kW) by your local daily Peak Sun Hours (PSH), then apply DC subsystem derate (~86%) and inverter AC conversion efficiency (~96%). For location-precise annual yield, an hourly simulation model (NREL PVWatts V8) accounts for dynamic solar geometry, diffuse irradiance, and cell temperature kinetics."
        formula="Daily AC Output (kWh) ≈ DC Capacity (kW) × Peak Sun Hours × (1 - DC Losses) × Inverter Efficiency"
        standardExample="A 400W (0.40 kW) solar panel receiving 4.5 peak sun hours per day produces approximately 1.48 kWh/day (~542 kWh/year) under standard 14% DC losses and 96% inverter efficiency."
        sourceAuthority="NREL PVWatts V8 Photovoltaic Performance Model"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Your Solar Panel Output</h2>
        <p>
          Determining expected solar generation involves matching your array&apos;s physical DC nameplate rating to the empirical solar resource available at your geographical coordinates:
        </p>
        <ol>
          <li><strong>Specify Location:</strong> Provide city or latitude/longitude coordinates to retrieve NSRDB/TMY3 historical solar irradiance records.</li>
          <li><strong>Set DC System Capacity (kW):</strong> Enter total array size in kilowatts or calculate from module count and individual panel wattage (e.g., 20 panels × 400W = 8.0 kW DC).</li>
          <li><strong>Configure Array Tilt &amp; Azimuth:</strong> Set roof pitch angle (degrees from horizontal) and compass orientation (180° true South is optimal in the Northern Hemisphere).</li>
          <li><strong>Account for Subsystem Derates:</strong> Configure DC losses (soiling, mismatch, DC wiring resistance) and inverter efficiency characteristics.</li>
          <li><strong>Evaluate Seasonal Curves:</strong> Analyze month-by-month generation profiles to balance summer peak generation against winter heating or grid import requirements.</li>
        </ol>

        <SystemFlowDiagram category="solar" title="Solar PV DC Power Path, Loss Derates & AC Grid Conversion Architecture" />
      </section>

      <section id="seasonal-benchmarks">
        <h2>Regional Solar Insolation &amp; Seasonal Yield Benchmarks</h2>
        <p>
          Solar generation varies substantially across seasons and regional climate zones due to differences in solar zenith angle, atmospheric path length, and cloud cover. The table below outlines typical solar irradiance and specific yields derived from NREL NSRDB meteorological baselines:
        </p>
        <div className="scenario-table" role="region" aria-label="Regional solar insolation and seasonal yield benchmarks">
          <table>
            <caption>Regional Daily Peak Sun Hours (PSH) and Annual Specific Yield Benchmarks (Fixed Tilt = Latitude)</caption>
            <thead>
              <tr>
                <th scope="col">Regional Climate Zone</th>
                <th scope="col">Representative Metro</th>
                <th scope="col">Winter PSH (Dec/Jan)</th>
                <th scope="col">Summer PSH (Jun/Jul)</th>
                <th scope="col">Annual Average PSH</th>
                <th scope="col">Specific Yield (kWh/kWp-yr)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Southwest Arid (Zone 2B)</strong></td>
                <td>Phoenix, AZ / Las Vegas, NV</td>
                <td>4.2 – 4.8 PSH</td>
                <td>7.0 – 7.5 PSH</td>
                <td>5.85 PSH</td>
                <td>1,750 – 1,850 kWh/kW-yr</td>
              </tr>
              <tr>
                <td><strong>Sunbelt / Southeast (Zone 3A)</strong></td>
                <td>Atlanta, GA / Dallas, TX</td>
                <td>3.0 – 3.5 PSH</td>
                <td>5.4 – 5.8 PSH</td>
                <td>4.75 PSH</td>
                <td>1,400 – 1,500 kWh/kW-yr</td>
              </tr>
              <tr>
                <td><strong>Mid-Atlantic / Central (Zone 4A)</strong></td>
                <td>Philadelphia, PA / St. Louis, MO</td>
                <td>2.3 – 2.8 PSH</td>
                <td>5.2 – 5.6 PSH</td>
                <td>4.20 PSH</td>
                <td>1,250 – 1,350 kWh/kW-yr</td>
              </tr>
              <tr>
                <td><strong>Northern / Great Lakes (Zone 5A/6A)</strong></td>
                <td>Chicago, IL / Minneapolis, MN</td>
                <td>1.8 – 2.4 PSH</td>
                <td>5.3 – 5.7 PSH</td>
                <td>3.90 PSH</td>
                <td>1,150 – 1,250 kWh/kW-yr</td>
              </tr>
              <tr>
                <td><strong>Pacific Northwest (Zone 4C/5B)</strong></td>
                <td>Seattle, WA / Portland, OR</td>
                <td>1.2 – 1.6 PSH</td>
                <td>5.1 – 5.5 PSH</td>
                <td>3.65 PSH</td>
                <td>1,050 – 1,150 kWh/kW-yr</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="table-caption" style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
          *Note: Peak Sun Hours (PSH) represent daily equivalent hours of standard 1,000 W/m² solar irradiance (1 PSH = 1 kWh/m²/day). Specific Yield reflects total annual AC kilowatt-hours produced per kilowatt of installed DC capacity under standard 14% DC losses.
        </p>
      </section>

      <section id="system-losses">
        <h2>NREL PVWatts Default System Losses (Derate Factors) Breakdown</h2>
        <p>
          In the NREL PVWatts performance model, the default <strong>14.08% aggregate DC system loss</strong> is not a single generic estimate; it is calculated as the multiplicative product of multiple discrete physical loss mechanisms:
        </p>
        <div className="scenario-table" role="region" aria-label="NREL PVWatts system losses breakdown">
          <table>
            <caption>NREL PVWatts V8 Multiplicative DC Loss Categories &amp; Typical Engineering Ranges</caption>
            <thead>
              <tr>
                <th scope="col">Loss Category</th>
                <th scope="col">PVWatts Default</th>
                <th scope="col">Typical Field Range</th>
                <th scope="col">Engineering Physical Mechanism</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Soiling</strong></td>
                <td>2.0%</td>
                <td>1.0% – 5.0%</td>
                <td>Accumulation of dust, dirt, pollen, and airborne particulates on front glass surfaces.</td>
              </tr>
              <tr>
                <td><strong>Shading</strong></td>
                <td>3.0%</td>
                <td>0.0% – 10.0%+</td>
                <td>Near-field obstruction from roof dormers, chimneys, utility poles, and nearby vegetation.</td>
              </tr>
              <tr>
                <td><strong>Snow Cover</strong></td>
                <td>0.0%</td>
                <td>0.0% – 15.0%+</td>
                <td>Complete optical obstruction during winter snowfall periods in northern climates.</td>
              </tr>
              <tr>
                <td><strong>Module Mismatch</strong></td>
                <td>2.0%</td>
                <td>1.0% – 3.0%</td>
                <td>Minor electrical property deviations between series-connected photovoltaic modules.</td>
              </tr>
              <tr>
                <td><strong>DC Wiring Resistance</strong></td>
                <td>2.0%</td>
                <td>1.0% – 3.0%</td>
                <td>Ohmic ($I^2R$) voltage drop across DC string homeruns and module interconnect cables.</td>
              </tr>
              <tr>
                <td><strong>Connections &amp; Diodes</strong></td>
                <td>0.5%</td>
                <td>0.2% – 1.0%</td>
                <td>Contact resistance in MC4 connectors and forward voltage drop across bypass diodes.</td>
              </tr>
              <tr>
                <td><strong>Light-Induced Degradation (LID)</strong></td>
                <td>1.5%</td>
                <td>0.5% – 2.0%</td>
                <td>Initial crystal lattice recombination defect stabilization occurring during first sun exposure.</td>
              </tr>
              <tr>
                <td><strong>Nameplate Rating Tolerance</strong></td>
                <td>1.0%</td>
                <td>-1.0% – +2.0%</td>
                <td>Factory power binning tolerance variance relative to published STC nameplate rating.</td>
              </tr>
              <tr>
                <td><strong>System Availability / Outages</strong></td>
                <td>3.0%</td>
                <td>1.0% – 5.0%</td>
                <td>Utility grid outages, inverter maintenance, tripping events, and routine system downtime.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="table-caption" style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
          *Mathematical Formulation: In PVWatts, individual loss percentages (L_i) are combined multiplicatively rather than simply added: Total DC Losses = 1 - ∏(1 - L_i) = 1 - (0.98 × 0.97 × 1.00 × 0.98 × 0.98 × 0.995 × 0.985 × 0.99 × 0.97) ≈ 14.08%.
        </p>
        <p style={{ marginTop: "1rem" }}>
          <strong>Separate Modeling of Inverter &amp; Temperature:</strong> In addition to the 14% DC system loss factor, PVWatts models <em>Inverter Conversion Efficiency</em> separately (~96% nominal baseline with part-load Sandia/CEC efficiency curves and DC-to-AC ratio clipping) and evaluates <em>Operating Cell Temperature</em> dynamically for every hour using ambient temperature, wind speed, plane-of-array irradiance, and module temperature coefficients (&gamma; &approx; -0.35%/&deg;C to -0.40%/&deg;C).
        </p>
      </section>

      <section id="sizing-matrix">
        <h2>Solar Array Production Reference Matrix</h2>
        <p>Estimated annual and monthly electricity generation across standard residential system capacities and regional solar resource tiers:</p>
        <div className="scenario-table" role="region" aria-label="Solar output reference matrix">
          <table>
            <caption>Estimated annual &amp; monthly AC generation across standard residential system sizes</caption>
            <thead>
              <tr>
                <th scope="col">System Size (kW DC)</th>
                <th scope="col">Panel Count (400W)</th>
                <th scope="col">Moderate Sun (~1,200 kWh/kW-yr)</th>
                <th scope="col">Average Sun (~1,450 kWh/kW-yr)</th>
                <th scope="col">High Sun (~1,750 kWh/kW-yr)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>4.0 kW DC</strong></td>
                <td>10 panels (~200 sq ft)</td>
                <td>~4,800 kWh/yr (400 kWh/mo)</td>
                <td>~5,800 kWh/yr (483 kWh/mo)</td>
                <td>~7,000 kWh/yr (583 kWh/mo)</td>
              </tr>
              <tr>
                <td><strong>6.0 kW DC</strong></td>
                <td>15 panels (~300 sq ft)</td>
                <td>~7,200 kWh/yr (600 kWh/mo)</td>
                <td>~8,700 kWh/yr (725 kWh/mo)</td>
                <td>~10,500 kWh/yr (875 kWh/mo)</td>
              </tr>
              <tr>
                <td><strong>8.0 kW DC</strong></td>
                <td>20 panels (~400 sq ft)</td>
                <td>~9,600 kWh/yr (800 kWh/mo)</td>
                <td>~11,600 kWh/yr (967 kWh/mo)</td>
                <td>~14,000 kWh/yr (1,167 kWh/mo)</td>
              </tr>
              <tr>
                <td><strong>10.0 kW DC</strong></td>
                <td>25 panels (~500 sq ft)</td>
                <td>~12,000 kWh/yr (1,000 kWh/mo)</td>
                <td>~14,500 kWh/yr (1,208 kWh/mo)</td>
                <td>~17,500 kWh/yr (1,458 kWh/mo)</td>
              </tr>
              <tr>
                <td><strong>12.0 kW DC</strong></td>
                <td>30 panels (~600 sq ft)</td>
                <td>~14,400 kWh/yr (1,200 kWh/mo)</td>
                <td>~17,400 kWh/yr (1,450 kWh/mo)</td>
                <td>~21,000 kWh/yr (1,750 kWh/mo)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="manual-derivation">
        <h2>Step-by-Step Manual Calculation &amp; Engineering Math</h2>
        <p>
          For first-order estimations and educational sizing, solar engineers use a simplified steady-state formula. Below is the step-by-step procedure:
        </p>
        <div className="calculation-steps">
          <div className="step-card" style={{ padding: "1.25rem", borderRadius: "8px", border: "1px solid var(--border-color)", marginBottom: "1rem" }}>
            <h3>Step 1: Calculate Total DC Array Nameplate Capacity</h3>
            <p>Sum the Standard Test Condition (STC) nameplate wattage of all installed photovoltaic modules:</p>
            <code>P_DC (kW) = (Number of Panels × Panel Wattage) ÷ 1,000</code>
            <p style={{ marginTop: "0.5rem" }}><em>Example: 20 panels rated at 400W = 8,000W = 8.0 kW DC.</em></p>
          </div>

          <div className="step-card" style={{ padding: "1.25rem", borderRadius: "8px", border: "1px solid var(--border-color)", marginBottom: "1rem" }}>
            <h3>Step 2: Determine Daily Peak Sun Hours (PSH)</h3>
            <p>Identify the average daily solar insolation in kWh/m²/day for your location at the specific array tilt angle:</p>
            <code>Daily Solar Resource = PSH (hours/day at 1,000 W/m²)</code>
            <p style={{ marginTop: "0.5rem" }}><em>Example: An annual regional average of 4.5 PSH/day.</em></p>
          </div>

          <div className="step-card" style={{ padding: "1.25rem", borderRadius: "8px", border: "1px solid var(--border-color)", marginBottom: "1rem" }}>
            <h3>Step 3: Apply Subsystem DC Losses and Inverter Conversion Efficiency</h3>
            <p>Apply the multiplicative DC derate factor (~14% losses &rarr; 0.86) and nominal inverter efficiency (~96% &rarr; 0.96):</p>
            <code>Daily AC kWh ≈ P_DC (kW) × PSH × (1 - DC_Losses) × Inverter_Efficiency</code>
            <p style={{ marginTop: "0.5rem" }}>
              <em>Example: 8.0 kW × 4.5 PSH × 0.86 × 0.96 ≈ 29.72 kWh/day (≈ 10,848 kWh/year).</em>
            </p>
          </div>

          <div className="step-card" style={{ padding: "1.25rem", borderRadius: "8px", border: "1px solid var(--border-color)", marginBottom: "1rem" }}>
            <h3>Step 4: Hourly Physics Simulation (PVWatts V8 Engine)</h3>
            <p>
              While the manual equation provides a reliable first-order estimate, our live calculator utilizes NREL PVWatts V8 to execute an hourly simulation across all 8,760 hours of the meteorological year. PVWatts dynamically models:
            </p>
            <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
              <li><strong>Solar Position &amp; Air Mass:</strong> Solar zenith and azimuth angles to decompose global horizontal irradiance (GHI) into direct normal (DNI) and diffuse horizontal (DHI) components.</li>
              <li><strong>Plane-of-Array (POA) Irradiance:</strong> Hay-Davies transposition model for diffuse ground reflectance and sky diffuse radiation on tilted surfaces.</li>
              <li><strong>Dynamic Cell Temperature:</strong> Heat transfer balance accounting for ambient temperature, wind speed, mounting standoff, and irradiance.</li>
              <li><strong>Inverter Part-Load &amp; Clipping:</strong> Non-linear efficiency curve under light load and power clipping when DC power exceeds maximum AC inverter capacity (P_ac0).</li>
            </ul>
          </div>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Solar AC Energy Yield &amp; Sizing Formulas"
          formula="E_AC_daily (kWh) ≈ P_DC (kW) × Peak_Sun_Hours × (1 - DC_Losses) × Inverter_Efficiency"
          formulaDescription="First-order engineering approximation for daily AC electricity generation from DC nameplate rating, regional solar insolation, and aggregate system derates."
          variables={[
            { symbol: "P_DC", label: "DC Nameplate Capacity", description: "Sum of all solar panel STC power ratings in kilowatts (e.g. 20 × 400W = 8.0 kW).", unit: "kW" },
            { symbol: "Peak_Sun_Hours", label: "Solar Insolation (PSH)", description: "Daily solar irradiance equivalent to hours at 1,000 W/m² (typically 3.5 to 6.0 hours/day).", unit: "hours/day" },
            { symbol: "DC_Losses", label: "Multiplicative DC Derate", description: "Combined losses for soiling, shading, DC wiring, mismatch, LID, and availability (~14% default).", unit: "fraction" },
            { symbol: "Inverter_Efficiency", label: "Inverter AC Efficiency", description: "Nominal DC-to-AC conversion efficiency across operating load profile (~96% default).", unit: "fraction" },
          ]}
          notes={[
            "Simplified manual equation is for educational first-order estimation; the interactive calculator executes full NREL PVWatts V8 hourly simulations.",
            "Specific Yield (kWh/kWp/year) quantifies annual generation normalized per kilowatt of installed solar capacity.",
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
        <h2>Connected Solar Planning &amp; Engineering Cluster</h2>
        <p>
          Accurate solar PV generation modeling requires integrating mounting geometry, climatic insolation baselines, and energy storage engineering:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginTop: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>📐 Optimize Tilt &amp; Azimuth</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Calculate precise year-round, steep winter, and shallow summer angles for your latitude to minimize cosine optical losses before locking in racking pitch.
            </p>
            <Link href="/solar/solar-panel-tilt-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Solar Panel Tilt Calculator →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>🗺️ 50-State Solar &amp; Climate Matrix</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Access standardized NREL NSRDB peak sun hours, ASHRAE climatic design temperatures, and EIA residential electricity rates across all 50 U.S. states.
            </p>
            <Link href="/datasets/50-state-solar-insolation-climatic-benchmark" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              50-State Insolation Benchmark Dataset →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>📖 Solar Tilt &amp; Season Guide</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Explore mathematical models, 23.45° axial declination, global latitude matrices, and Perez snow albedo transposition boosts (+15% winter diffuse gain).
            </p>
            <Link href="/guides/solar-panel-tilt-angle-by-latitude-and-season-guide" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Solar Panel Tilt Angle Guide →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color, #e2e8f0)", background: "var(--card-bg, #ffffff)" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>🔋 Storage Sizing &amp; Payback</h3>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", lineHeight: 1.5, color: "var(--text-muted)" }}>
              Convert modeled daily AC generation into battery bank capacity for critical backup, or evaluate project payback and ROI with local utility pricing.
            </p>
            <Link href="/solar/solar-battery-bank-size-calculator" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.9rem" }}>
              Battery Bank Sizing Calculator →
            </Link>
          </div>
        </div>

        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Also explore our deep-dive <Link href="/guides/solar-inverter-clipping-and-dc-ac-ratio-guide" style={{ fontWeight: 600, color: "var(--accent)" }}>Solar Inverter Clipping &amp; DC-to-AC Ratio Sizing Guide</Link>, consult regional meteorological tables in our <Link href="/solar/regional-climate-data" style={{ fontWeight: 600, color: "var(--accent)" }}>U.S. Regional Solar Insolation &amp; Climate Database</Link>, evaluate economics with our <Link href="/solar/solar-payback-calculator" style={{ fontWeight: 600, color: "var(--accent)" }}>Solar Payback Calculator</Link>, or inspect sub-zero voltage expansion under NEC 690.7 in research paper <Link href="/research/ground-view-factor-snow-albedo-pv-tilt" style={{ fontWeight: 600, color: "var(--accent)" }}>PL-TR-2026-SOL03</Link>.
        </p>
      </section>
    </article>
  );
}
