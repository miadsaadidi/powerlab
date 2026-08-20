import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildGuideStructuredData } from "@/lib/seo/structured-data";
import { SolarChargeControllerCalculator } from "@/components/calculator/solar-charge-controller-calculator";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { FormulaCard } from "@/components/seo/formula-card";

export const metadata: Metadata = {
  title: "MPPT vs PWM Solar Charge Controller Sizing Guide & Formula — PowerLab",
  description: "Learn how to size an MPPT or PWM solar charge controller. Calculate required output amperage, cold-weather Voc voltage expansion limits, and compare efficiency gains.",
  alternates: { canonical: "/guides/mppt-solar-charge-controller-sizing-guide" },
  openGraph: {
    title: "MPPT vs PWM Solar Charge Controller Sizing Guide — PowerLab",
    description: "Complete engineering guide to sizing solar charge controllers. Calculate cold-temperature Voc expansion, battery charging current, and MPPT efficiency gains.",
    url: `${siteConfig.url}/guides/mppt-solar-charge-controller-sizing-guide`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "article",
  },
};

const FAQS = [
  {
    question: "How do you size an MPPT solar charge controller?",
    answer: "To size an MPPT controller, calculate two critical values: (1) Output Charging Amps = (Total Solar Array Watts ÷ Nominal Battery Voltage) × 1.25 safety factor. (2) Maximum Cold-Weather Input Voltage = String Voc × [1 + Temperature Coefficient × (Record Low Temp - 25°C)]. The controller must have an amperage rating greater than the calculated output amps and a maximum input voltage limit higher than the cold-weather Voc.",
  },
  {
    question: "What is the real efficiency difference between MPPT and PWM?",
    answer: "PWM controllers pull the solar panel voltage down to the battery bank voltage, throwing away 20% to 35% of potential energy as heat. MPPT controllers use high-frequency DC-to-DC conversion (96% to 98% efficiency) to convert surplus panel voltage into extra charging current, harvesting significantly more power during cold, cloudy, or winter conditions.",
  },
  {
    question: "Why do solar charge controllers get destroyed in freezing temperatures?",
    answer: "Photovoltaic silicon cells generate higher open-circuit voltage (Voc) as ambient temperatures drop (typically +0.28% to +0.35% per °C below 25°C). On a freezing sunny morning (e.g. -15°C / 5°F), a 3-panel series string can easily exceed a 100V or 150V MPPT input ceiling, destroying the input FETs if cold expansion was ignored.",
  },
  {
    question: "What size charge controller do I need for 800 watts of solar panels?",
    answer: "For an 800W solar array: On a 12V battery bank: (800W ÷ 12V) × 1.25 = 83.3A (requires a 80A–100A MPPT or two 40A units). On a 24V battery bank: (800W ÷ 24V) × 1.25 = 41.7A (requires a 45A–50A MPPT). On a 48V battery bank: (800W ÷ 48V) × 1.25 = 20.8A (requires a 25A–30A MPPT).",
  },
  {
    question: "Can I connect a 24V solar panel array to a 12V battery bank?",
    answer: "Yes, if you use an MPPT charge controller. The MPPT controller steps down the high array voltage (e.g. 36V–48V Vmp) to the 12V–14.4V battery charging profile while multiplying the output amperage. A PWM controller cannot do this and would waste more than 50% of the panel's rated power.",
  },
];

export default function MpptChargeControllerGuidePage() {
  const structuredData = buildGuideStructuredData({
    title: "MPPT vs PWM Solar Charge Controller Sizing Guide & Formula",
    description: "Engineering guide for sizing MPPT and PWM solar charge controllers with cold-weather Voc voltage expansion modeling and NEC 690 safety factors.",
    route: "/guides/mppt-solar-charge-controller-sizing-guide",
    datePublished: "2026-08-19",
    dateModified: "2026-08-19",
    standards: [
      "NFPA 70 / NEC Article 690 (Solar Photovoltaic Systems)",
      "IEC 62548 (Design Requirements for Photovoltaic Arrays)",
      "IEEE 1547 Distributed Energy Standards",
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
        <span aria-current="page">MPPT Charge Controller Sizing Guide</span>
      </nav>

      <header className="calculator-header">
        <p className="eyebrow">Solar PV Engineering &amp; Sizing Guide</p>
        <h1>MPPT vs PWM Solar Charge Controller Sizing Guide</h1>
        <p className="intro">
          A comprehensive engineering guide to sizing Maximum Power Point Tracking (MPPT) and Pulse Width Modulation (PWM) solar charge controllers. Learn how to calculate continuous charging current and prevent cold-weather overvoltage failures.
        </p>
      </header>

      <DirectAnswerCard
        keyword="MPPT solar charge controller sizing formula"
        answer="To size a solar charge controller, calculate required output current: Amps = (Total PV Watts ÷ Battery Voltage) × 1.25. Then calculate maximum cold-weather string voltage: Voc_max = Voc_STC × [1 + (γ_Voc ÷ 100) × (T_min - 25°C)] × Number of Panels in Series. Choose an MPPT controller whose continuous current rating and maximum PV input voltage both exceed these values."
        formula="I_controller ≥ (P_array ÷ V_battery) × 1.25   |   V_input_max ≥ V_oc_STC × [1 + γ_Voc × (T_min - 25°C)] × N_series"
        standardExample="800W Array on 24V LiFePO4: (800 ÷ 24) × 1.25 = 41.7A (requires a 45A to 50A MPPT with ≥100V Voc rating)"
        sourceAuthority="NEC Article 690.8 / IEC 62548 Photovoltaic Design Standards"
      />

      <PageJumpNav />

      {/* Interactive Tool Section */}
      <section id="calculator-tool" className="calculator-wrapper" style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.5rem" }}>Live Solar Charge Controller Sizing Calculator</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Enter your panel wattage, string configuration, battery voltage, and local winter record low temperature to calculate your exact MPPT and PWM controller specifications.
          </p>
        </div>
        <SolarChargeControllerCalculator />
      </section>

      {/* Section 1: MPPT vs PWM Comparison */}
      <section id="mppt-vs-pwm" style={{ marginTop: "2.5rem" }}>
        <h2>MPPT vs. PWM: Technical &amp; Financial Comparison</h2>
        <p>
          Choosing between MPPT and PWM depends on your total solar array wattage, system voltage, and local climate conditions:
        </p>

        <div className="scenario-table" style={{ overflowX: "auto", margin: "1.25rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <caption>Table 1: Technical Comparison of MPPT vs. PWM Solar Charge Controllers</caption>
            <thead>
              <tr>
                <th scope="col">Specification / Feature</th>
                <th scope="col">PWM (Pulse Width Modulation)</th>
                <th scope="col">MPPT (Maximum Power Point Tracking)</th>
                <th scope="col">Recommended Choice</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Operating Principle</strong></td>
                <td>Direct electrical switch (drags PV voltage down to battery voltage)</td>
                <td>DC-to-DC converter (transforms excess voltage into charging current)</td>
                <td><strong>MPPT</strong> for modern systems</td>
              </tr>
              <tr>
                <td><strong>Conversion Efficiency</strong></td>
                <td>65% – 75%</td>
                <td><strong>96% – 98.5%</strong></td>
                <td><strong>MPPT (+25% to 35% more power)</strong></td>
              </tr>
              <tr>
                <td><strong>Winter &amp; Cold Performance</strong></td>
                <td>Poor (wastes increased cold-weather voltage)</td>
                <td><strong>Exceptional</strong> (converts high cold voltage into max amps)</td>
                <td><strong>MPPT</strong> in freezing climates</td>
              </tr>
              <tr>
                <td><strong>Array vs. Battery Voltage Matching</strong></td>
                <td>Must match closely (e.g. 18V panel for 12V battery)</td>
                <td>Flexible (e.g. 100V–250V array can charge 12V, 24V, or 48V bank)</td>
                <td><strong>MPPT</strong> for high-voltage strings</td>
              </tr>
              <tr>
                <td><strong>Ideal System Size</strong></td>
                <td>Small portable setups (&lt;200W, RV trickle charging)</td>
                <td>Any system ≥200W, off-grid cabins, residential battery storage</td>
                <td><strong>MPPT</strong> for setups &gt;200W</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Cold Weather Voc Expansion */}
      <section id="cold-weather-voc" style={{ marginTop: "2.5rem" }}>
        <h2>The Cold-Weather Voc Trap: Why Solar Controllers Fry in Winter</h2>
        <p>
          Solar panels are tested at <strong>Standard Test Conditions (STC: 25°C / 77°F)</strong>. However, silicon semiconductor physics dictates that <strong>as ambient temperature drops, open-circuit voltage (Voc) increases</strong>.
        </p>
        <div style={{ padding: "1.25rem", borderRadius: "0.85rem", background: "rgba(198, 93, 36, 0.06)", border: "1px solid rgba(198, 93, 36, 0.2)", margin: "1.25rem 0" }}>
          <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>⚠️ The Common Beginner Mistake:</h3>
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.95rem", lineHeight: 1.6 }}>
            A user pairs 3 panels in series with a rated Voc of 40V each (3 × 40V = 120V) on a 150V MPPT charge controller, assuming they have 30V of headroom.
          </p>
          <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>
            On a freezing winter morning at <strong>-20°C (-4°F)</strong>, the Voc expansion coefficient (+0.30%/°C over 45°C temperature differential) pushes string voltage to <strong>136.2V nominal</strong>, with crisp cloud-edge irradiance spikes hitting <strong>152V+</strong>. This instantly destroys the controller&apos;s internal power MOSFETs.
          </p>
        </div>
      </section>

      {/* Section 3: Mathematical Formulas */}
      <section id="formula-breakdown" style={{ marginTop: "2.5rem" }}>
        <h2>Mathematical Sizing Formulas &amp; Methodology</h2>

        <FormulaCard
          title="Charge Controller Amperage & Voltage Expansion Model"
          formula="I_controller = (P_array ÷ V_battery) × 1.25   |   V_oc_cold = V_oc_STC × [ 1 + (γ_Voc ÷ 100) × (T_min - 25) ] × N_series"
          formulaDescription="Deterministic engineering formulation calculating maximum continuous output charging current and sub-zero temperature array voltage limits."
          variables={[
            { symbol: "I_controller", label: "Controller Rating", description: "Minimum continuous output charging current rating", unit: "Amps (A)" },
            { symbol: "P_array", label: "Solar Array Power", description: "Total combined nameplate DC power of all solar modules", unit: "Watts (W)" },
            { symbol: "V_battery", label: "Battery Nominal Voltage", description: "Nominal battery bank operating voltage (12V, 24V, or 48V)", unit: "Volts (V)" },
            { symbol: "1.25", label: "NEC Continuous Load Factor", description: "Mandatory 125% safety headroom under NEC Article 690.8", unit: "Multiplier" },
            { symbol: "V_oc_cold", label: "Maximum Cold String Voc", description: "Peak open-circuit voltage at record low ambient temperature", unit: "Volts (V)" },
            { symbol: "γ_Voc", label: "Temperature Coefficient of Voc", description: "Manufacturer temperature coefficient (typically -0.28% to -0.35%/°C)", unit: "%/°C" },
            { symbol: "T_min", label: "Record Low Temperature", description: "Historical minimum winter ambient temperature at installation site", unit: "°C" },
            { symbol: "N_series", label: "Series String Count", description: "Number of solar panels wired in series per string", unit: "Integer" },
          ]}
          notes={[
            "Conforms to NFPA 70 / NEC Article 690.8(A)(1) & 690.7(A) calculation standards.",
            "Always round up to the nearest standard manufacturer rating (e.g. 30A, 45A, 60A, 80A, 100A).",
          ]}
        />
      </section>

      {/* Section 4: Worked Problem by Battery Voltage */}
      <section id="worked-sizing" style={{ marginTop: "2.5rem" }}>
        <h2>Worked Sizing Example: 800W Solar Array on 12V vs. 24V vs. 48V</h2>
        <p>
          Notice how increasing battery bank voltage drastically reduces required charge controller size and wiring thickness for an 800-watt solar array:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "1.25rem 0" }}>
          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>12V Battery System</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--muted)", margin: "0 0 0.5rem" }}>
              <strong>Current Calculation:</strong> (800W ÷ 12V) × 1.25 = <strong>83.3 Amps</strong><br />
              <strong>Required Controller:</strong> 80A–100A MPPT (or two 40A units)<br />
              <strong>Required Wire:</strong> 2 AWG to 1/0 AWG copper
            </p>
            <Link href="/battery/voltage-drop-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Calculate DC Wire Gauge →
            </Link>
            <br />
            <Link href="/solar/solar-charge-controller-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Size a Solar Charge Controller →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>24V Battery System</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--muted)", margin: "0 0 0.5rem" }}>
              <strong>Current Calculation:</strong> (800W ÷ 24V) × 1.25 = <strong>41.7 Amps</strong><br />
              <strong>Required Controller:</strong> Single 45A–50A MPPT<br />
              <strong>Required Wire:</strong> 6 AWG to 4 AWG copper
            </p>
            <Link href="/solar/solar-battery-bank-size-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Size 24V Battery Bank →
            </Link>
          </div>

          <div style={{ padding: "1.25rem", borderRadius: "0.85rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <h3 style={{ marginTop: 0, color: "var(--brand-strong)", fontSize: "1.1rem" }}>48V Battery System</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--muted)", margin: "0 0 0.5rem" }}>
              <strong>Current Calculation:</strong> (800W ÷ 48V) × 1.25 = <strong>20.8 Amps</strong><br />
              <strong>Required Controller:</strong> Compact 25A–30A MPPT<br />
              <strong>Required Wire:</strong> 10 AWG to 8 AWG copper
            </p>
            <Link href="/home-energy/home-battery-size-calculator" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
              Size 48V Storage System →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: FAQs */}
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

      {/* Section 6: Standards & Sources */}
      <section id="sources-methodology" style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--line)" }}>
        <h2 style={{ marginTop: 0 }}>Methodology &amp; Standards Citations</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--muted)" }}>
          Calculations adhere to <strong>NFPA 70 / NEC Article 690</strong> (Solar Photovoltaic Systems Sizing), <strong>IEC 62548</strong> array design parameters, and <strong>IEEE 1547</strong> distributed power interface requirements.
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
