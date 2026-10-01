import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { GeneratorSizeCalculator } from "@/components/calculator/generator-size-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("generator-size");

export const metadata: Metadata = buildPageMetadata({
  title: "Generator Size Calculator — Running & Surge Watts",
  description:
    "Estimate generator running and starting wattage requirements for home, RV, or emergency loads. Size portable or whole-home standby capacity.",
  canonicalPath: "/home-energy/generator-size-calculator",
  category: "home-energy",
});

const FAQS = [
  {
    question: "What is the difference between running watts and starting (surge) watts?",
    answer: "Running (continuous) watts are the continuous electrical power required to keep an appliance operating. Starting (surge) watts are the momentary extra power required for 2 to 3 seconds to start electric motors found in refrigerators, well pumps, air compressors, and air conditioners. Starting watts can be 2 to 4 times higher than running watts.",
  },
  {
    question: "How do you estimate total generator starting surge requirements?",
    answer: "In real-world residential use, multiple motorized appliances rarely start at the exact same millisecond. The simplified sequential-start planning model sums the running watts of all connected devices, then adds only the single largest motor starting surge delta. If multiple large motors may cycle on simultaneously, actual requirements can be higher.",
  },
  {
    question: "Can a 7,500W generator run an entire house?",
    answer: "A 7,500W running / 9,500W surge generator can power essential household circuits including a refrigerator, sump pump, gas furnace blower, microwave, lighting, and electronics. However, it cannot run large whole-house electric resistance heat, electric water heaters, and large central air conditioners simultaneously without active load management.",
  },
  {
    question: "What size generator is needed to run a sump pump?",
    answer: "A typical 1/3 HP residential sump pump requires approximately 600 to 800 running watts and 1,800 to 2,400 starting surge watts. A heavier 1/2 HP sump pump requires about 800 to 1,050 running watts and 2,400 to 3,200 starting surge watts. Sizing should account for both running and surge requirements alongside any other concurrent loads.",
  },
  {
    question: "What size generator do I need for a 150-Amp or 200-Amp electrical service?",
    answer: "A 150A or 200A service rating does not by itself determine generator size. Generator capacity depends on the loads that will be backed up, including HVAC, pumps, electric heating, water heating, cooking and EV charging, plus any load-management strategy. A qualified installer can size the generator and transfer equipment from the actual load requirements.",
  },
  {
    question: "What size generator cord and breaker do I need for a 7,500W generator?",
    answer: "The correct cord, receptacle, breaker and transfer equipment depend on the generator's rated output, receptacle configuration, voltage, equipment listing, conductor requirements and local electrical code. Match the cord to the actual generator receptacle and rating and use listed transfer equipment installed according to applicable requirements. At 240V, 7,500W produces 7,500W ÷ 240V = 31.25A as a theoretical current calculation, but overcurrent protection and conductor sizing must follow equipment ratings and applicable electrical codes.",
  },
];

export default function GeneratorSizePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Generator Size & Wattage Calculator",
    description: "Estimate generator running and starting wattage requirements for storm outages and emergency home backup planning.",
    route: "/home-energy/generator-size-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    features: [
      "Simplified sequential-start planning model for estimating motor starting surge capacity",
      "Interactive appliance load catalog with editable running and starting watt values",
      "Generator capacity bracket matching satisfying both continuous and surge requirements",
      "Multi-fuel derate considerations for gasoline, propane, and natural gas",
    ],
    standards: [
      "IEEE Std 446 (Emergency and Standby Power Systems)",
      "NEMA MG-1 (Motors and Generators)",
      "NFPA 70 / NEC Article 702 (Optional Standby Systems)",
      "NFPA 110 (Emergency and Standby Power Systems)",
    ],
    companionDatasetUrl: "https://doi.org/10.6084/m9.figshare.33821934",
    companionPaperUrl: "https://www.powelab.org/research/generator-motor-starting-lra-surge-kinetics",
    faqs: FAQS,
  });

  return (
    <article className="page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/home-energy">Home Energy</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Generator Size Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Outage Preparedness &amp; Power Sizing</p>
        <h1>Generator Size &amp; Wattage Calculator</h1>
        <p className="intro">
          Estimate generator running and starting wattage requirements, account for motor startup surges, and determine the appropriate generator capacity range needed during an outage.
        </p>
      </div>

      <div id="calculator-tool">
        <GeneratorSizeCalculator />
      </div>

      <DirectAnswerCard
        keyword="generator sizing calculation"
        answer="Generator sizing requires planning for both continuous running loads and peak motor startup surges. Under a simplified sequential-start planning model, continuous capacity is calculated by summing all running loads (with a recommended 20% planning headroom), while peak starting capacity is determined by adding the single largest motor startup surge delta to the continuous running total. A generator class must satisfy both continuous and surge requirements."
        formula="Target_Continuous_W = Total_Running_W × (1 + Planning_Margin) · Calculated_Peak_W = Total_Running_W + Max(Motor_Starting_W − Motor_Running_W) · Target_Peak_W = Calculated_Peak_W × (1 + Planning_Margin)"
        formulaTitle="Calculation Formulas"
        standardExample="Essentials (Fridge 150W/1200W + Sump Pump 800W/2400W + Microwave 1000W/1000W + Lights/Wi-Fi 125W): Running = 2,075W → Target Continuous (20% margin) = 2,490W; Calculated Peak = 3,675W → Target Peak (20% margin) = 4,410W → 3,500W–4,500W Portable Generator class"
        sourceAuthority="IEEE Std 446 & NFPA 70 Article 702 (Optional Standby Systems)"
        sourceAuthorityLabel="Technical References & Model Basis:"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Estimate Generator Size</h2>
        <ol>
          <li><strong>Identify Essential vs Convenience Loads:</strong> Select critical life-support, refrigeration, well pumps, and heating/cooling appliances needed during an outage.</li>
          <li><strong>Account for Motor Startup Inrush:</strong> Compressors and induction motors (pumps, AC units, refrigerators) require additional momentary power above running watts to start.</li>
          <li><strong>Apply Simplified Sequential-Start Planning Logic:</strong> The simplified model sums running loads and adds only the largest single motor surge delta, assuming motors do not all start at the exact same instant.</li>
          <li><strong>Add Planning Headroom:</strong> Sizing with 20% planning headroom provides an operating buffer above continuous load to prevent engine bogging under load step changes.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Generator Sizing &amp; Emergency Load Reference Matrix</h2>
        <p>Representative generator classes, planning capacities, surge ratings, and illustrative load combinations (examples only, not guaranteed compatibility):</p>
        <div className="scenario-table" role="region" aria-label="Generator sizing and load matrix">
          <table>
            <caption>Illustrative generator size brackets, estimated capacities, and representative outage load combinations</caption>
            <thead>
              <tr>
                <th scope="col">Generator Class</th>
                <th scope="col">Running Watts</th>
                <th scope="col">Starting Surge</th>
                <th scope="col">Typical Outlet / Connection</th>
                <th scope="col">Illustrative Load Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Compact Inverter</strong></td>
                <td>2,000 W</td>
                <td>2,400 W</td>
                <td>120V 20A Duplex (NEMA 5-20R)</td>
                <td>Fridge (150W), WiFi, phone chargers, LED lights, small electronics</td>
              </tr>
              <tr>
                <td><strong>Medium Inverter</strong></td>
                <td>3,500 W</td>
                <td>4,500 W</td>
                <td>120V 30A (NEMA L5-30R or TT-30R)</td>
                <td>Fridge, microwave (1,000W), TV, laptop, portable space heater or small window AC</td>
              </tr>
              <tr>
                <td><strong>Heavy Portable / Dual-Fuel</strong></td>
                <td>7,500 W</td>
                <td>9,500 W</td>
                <td>120/240V 30A (NEMA L14-30R)</td>
                <td>Fridge, freezer, 1/2 HP well pump, gas furnace blower, microwave, select home circuits</td>
              </tr>
              <tr>
                <td><strong>Whole-Home Portable</strong></td>
                <td>10,000 W</td>
                <td>12,500 W</td>
                <td>120/240V 50A (NEMA 14-50R)</td>
                <td>Well pump, furnace, water heater (partial), microwave, multiple refrigerators, managed central AC circuits</td>
              </tr>
              <tr>
                <td><strong>Whole-Home Standby (ATS)</strong></td>
                <td>18,000 W+</td>
                <td>22,000 W+</td>
                <td>Hardwired Automatic Transfer Switch</td>
                <td>Whole-home standby — actual sizing requires a load calculation and transfer-system assessment.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Calculation Formulas"
          formula="Target_Continuous_W = Total_Running_W * (1 + Planning_Margin) ; Target_Peak_W = (Total_Running_W + Max_Surge_Delta) * (1 + Planning_Margin)"
          formulaDescription="Simplified sequential-start planning model for estimating generator continuous and peak starting capacity requirements."
          variables={[
            { symbol: "Total_Running_W", label: "Continuous Running Load", description: "Sum of continuous running watts for all connected appliances operating concurrently", unit: "Watts" },
            { symbol: "Max_Surge_Delta", label: "Largest Motor Surge Delta", description: "Difference between starting and running watts of the largest motorized load: Max(Motor_Starting_W - Motor_Running_W)", unit: "Watts" },
            { symbol: "Planning_Margin", label: "Planning Headroom Fraction", description: "Operational headroom buffer (typically 0.20 or 20%) applied to continuous and peak requirements", unit: "dimensionless" },
            { symbol: "Target_Continuous_W", label: "Target Continuous Capacity", description: "Continuous generator rating needed to sustain steady-state loads with planning headroom", unit: "Watts" },
            { symbol: "Target_Peak_W", label: "Target Peak Starting Surge", description: "Surge capacity needed to start the heaviest motor while other loads run, with planning headroom", unit: "Watts" },
          ]}
          notes={[
            "This simplified model assumes the largest motor startup surge occurs while the other selected loads continue running. If multiple large motors can start simultaneously or overlap, actual generator requirements may be higher.",
            "Catalog values are planning estimates. Actual running and starting watts vary by model. Check the appliance nameplate or manufacturer specifications for final sizing.",
            "Planning headroom provides an operational buffer above estimated running load to accommodate load variations and maintain stable generator operation.",
          ]}
        />
      </div>

      <section>
        <h2>Portable vs. Standby Generators</h2>
        <p>
          Depending on your total wattage requirements and backup strategy, generators fall into distinct categories:
        </p>
        <ul>
          <li><strong>Portable Inverters (2,000W – 4,500W):</strong> Compact and fuel-efficient units typically used with extension cords or small transfer switches for essential electronics and refrigeration.</li>
          <li><strong>Heavy Portable / Dual-Fuel (7,500W – 12,000W):</strong> Versatile units capable of backing up critical subpanels or multi-circuit manual transfer switches during storm outages.</li>
          <li><strong>Automatic Standby Generators (14 kW – 26 kW):</strong> Permanently installed units connected to utility natural gas or liquid propane with an automatic transfer switch (ATS) to restore power automatically.</li>
        </ul>
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
        <h2>Related Outage Backup &amp; Home Energy Planning</h2>
        <p>
          Need a deep technical breakdown of motor inrush physics and fuel derating? Read our full <Link href="/guides/emergency-generator-sizing-and-inrush-load-guide">Emergency Generator Sizing &amp; Motor Inrush Guide</Link>. Connecting a generator or solar/battery backfeed to your main electrical panel? Check your busbar ampacity limits with our <Link href="/guides/nec-705-12-120-percent-rule-solar-busbar-sizing-guide">NEC 705.12 120% Busbar Sizing Guide</Link>. You can also size generator power cords with our <Link href="/battery/voltage-drop-calculator">Voltage Drop Calculator</Link>, calculate battery storage runtime with the <Link href="/battery/battery-runtime-calculator">Battery Runtime Calculator</Link>, compare whole-home batteries using our <Link href="/home-energy/home-battery-size-calculator">Home Battery Size Calculator</Link>, explore AC compressor power draw in our <Link href="/guides/central-ac-and-heat-pump-electricity-cost-guide">Central AC &amp; Heat Pump Cost Guide</Link>, or model monthly household consumption with the <Link href="/home-energy/electricity-usage-calculator">Electricity Usage Calculator</Link>.
        </p>
      </section>

      <section>
        <h2>Technical References &amp; Model Basis</h2>
        <p>
          The generator sizing calculator employs a simplified sequential-start planning model and reference appliance load estimates. References are organized by role below:
        </p>
        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>1. Methodology &amp; Engineering Basis</h3>
            <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.9rem" }}>
              <li><strong>IEEE Std 446:</strong> Recommended Practice for Emergency and Standby Power Systems (sequential motor startup modeling and capacity margin principles).</li>
              <li><strong>NEMA MG-1:</strong> Motors and Generators (motor locked-rotor starting current codes and inrush characteristics).</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>2. Contextual Electrical &amp; Installation Standards</h3>
            <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.9rem" }}>
              <li><strong>NFPA 70 / NEC Article 702:</strong> Optional Standby Systems (wiring methods, transfer switch safety, and interlock requirements).</li>
              <li><strong>NFPA 110:</strong> Standard for Emergency and Standby Power Systems (energy converter sizing and operational criteria).</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>3. PowerLab Research</h3>
            <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.9rem" }}>
              <li>
                <Link href="/research/generator-motor-starting-lra-surge-kinetics">
                  PowerLab Research: Generator Motor Starting Inrush &amp; Surge Kinetics
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <StandardsBadge category="home-energy" />
    </article>
  );
}

