import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { SpaceHeaterCostCalculator } from "@/components/calculator/space-heater-cost-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";
import { Disclaimer } from "@/components/shared/Disclaimer";

const isPublished = isCalculatorPublished("space-heater-cost");

export const metadata: Metadata = buildPageMetadata({
  title: "Space Heater Cost Calculator — Power & Operating Cost",
  description:
    "Estimate electricity use and operating cost for electric space heaters using rated power, scheduled hours, thermostat duty cycle, and electricity rate.",
  canonicalPath: "/home-energy/space-heater-cost-calculator",
  category: "home-energy",
});

const FAQS = [
  {
    question: "How much electricity does a 1,500 Watt space heater use, and what does it cost per hour?",
    answer:
      "A 1,500 Watt space heater draws 1.5 kW of power while energized. At an illustrative reference rate of $0.18/kWh, running continuously costs $0.27 per hour (1.5 kW × $0.18). Under an illustrative 70% thermostat duty cycle, average power is 1.05 kW (1,050 W), resulting in an estimated cost of $0.19 per hour ($0.189/hr).",
  },
  {
    question: "How much does a space heater cost to run for an 8-hour period?",
    answer:
      "At $0.18/kWh, running a 1,500W heater with an assumed 70% thermostat duty cycle for 8 scheduled hours costs approximately $1.51 per 8-hour period (8.4 kWh × $0.18), or about $45.36 per 30-day month. Running a 750W heater at a 70% duty cycle for 8 hours costs approximately $0.76 per period (about $22.68 per 30-day month).",
  },
  {
    question: "Is it cheaper to use a space heater or central heating?",
    answer:
      "Whether a space heater costs less depends on the central system's fuel or electricity price, efficiency/COP, the area being heated, and how much of the home is conditioned. A space heater can reduce total energy use when it allows a smaller occupied zone to be heated instead of the whole home, but the actual savings require comparing both systems' inputs and operating conditions.",
  },
  {
    question: "Are ceramic space heaters more energy efficient than oil-filled radiators?",
    answer:
      "Electric resistance heating converts essentially all electrical input into heat at the point of use (1 W = 3.412 BTU/h). Ceramic fan heaters blow heated air quickly for rapid directional warming, while oil-filled radiators use thermal mass to provide steadier heat output and may cycle differently. Their electrical energy consumption is still determined by rated power and the fraction of time the heating element operates.",
  },
];

export default function SpaceHeaterCostPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Space Heater Running Cost Calculator",
    description: "Estimate electricity use and operating cost for electric space heaters using rated power, scheduled hours, thermostat duty cycle, and electricity rate.",
    route: "/home-energy/space-heater-cost-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    applicationCategory: "UtilitiesApplication",
    features: [
      "Estimated electricity consumption and average power modeling",
      "Hourly, 8-hour scheduled, 30-day monthly, and winter season cost projections",
      "Adjustable thermostat duty-cycle assumptions (50% to 100%)",
      "User-entered electricity tariff ($/kWh) and power ratings",
      "Zone heating operating cost comparison framework",
    ],
    standards: [
      "UL 1278 (Standard for Movable and Wall- or Ceiling-Hung Electric Room Heaters)",
      "DOE 10 CFR Part 430 Energy Standards for Electric Heating",
      "NFPA 70 / NEC Article 424 (Fixed Electric Space-Heating Equipment)",
    ],
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
        <span aria-current="page">Space Heater Cost Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Winter Heating &amp; Electricity Usage</p>
        <h1>Space Heater Electricity Cost Calculator</h1>
        <p className="intro">
          Estimate electricity use and operating cost for electric space heaters using rated power, scheduled hours, thermostat duty cycle, and electricity rate.
        </p>
      </div>

      <div id="calculator-tool">
        <SpaceHeaterCostCalculator />
      </div>

      <Disclaimer variant="calculator" />

      <DirectAnswerCard
        keyword="space heater electricity cost calculation"
        answer="Running a standard 1,500 Watt electric space heater continuously costs $0.27 per hour at an illustrative electricity rate of $0.18/kWh. With an assumed moderate thermostat duty cycle of 70%, the average power draw is 1.05 kW, resulting in an estimated operating cost of $0.19 per hour ($0.189/hr), $1.51 for an 8-hour scheduled period ($1.512), $45.36 per 30-day month, and $136.08 for a 3-month winter season."
        formula="Hourly Cost ($/hr) = (Rated Watts ÷ 1,000) × Duty Cycle × Electricity Rate ($/kWh)"
        standardExample="1,500W heater @ 70% duty cycle, $0.18/kWh: (1.5 kW × 0.70) × $0.18 = $0.189/hr · $1.512 per 8-hour period · $45.36 per 30-day month"
        sourceAuthority="Technical reference: Joulean resistance heating conversion & user-entered utility tariff"
      />

      <PageJumpNav />

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Space Heater Electricity Cost</h2>
        <ol>
          <li><strong>Identify Heater Rated Power:</strong> Standard North American plug-in heaters draw 1,500 Watts on high, 1,000 Watts on medium, or 500 to 750 Watts on low.</li>
          <li><strong>Define Scheduled Operating Hours:</strong> Enter total daily scheduled usage hours (e.g. 8 hours overnight or during a work shift).</li>
          <li><strong>Select Thermostat Duty-Cycle Assumption:</strong> Units with adjustable thermostats automatically cycle on and off once ambient room temperature is reached (e.g. 50%, 70%, or 85% duty cycle).</li>
          <li><strong>Evaluate Operating Costs:</strong> Review projected hourly, scheduled, monthly (30-day), and full seasonal electricity costs based on your local utility tariff ($/kWh).</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Comparison of Space Heater Wattages &amp; Operating Costs</h2>
        <p>Representative running costs across space heater power settings at an illustrative $0.18/kWh utility rate and 8 hours/day (30-day month):</p>
        <div className="scenario-table" role="region" aria-label="Comparison of space heater power settings and electricity costs">
          <table>
            <caption>Electric space heater power ratings, hourly costs, and monthly electric bill impact</caption>
            <thead>
              <tr>
                <th scope="col">Heater Type / Setting</th>
                <th scope="col">Power (Watts) &amp; Duty</th>
                <th scope="col">Cost / Hour (@ $0.18)</th>
                <th scope="col">Scheduled 8h Period</th>
                <th scope="col">Monthly Cost (8h/day, 30 days)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Low / Eco Mode (Under-Desk)</strong></td>
                <td>500 W (100% continuous)</td>
                <td>$0.09 / hr</td>
                <td>$0.72 / 8h</td>
                <td>$21.60 / mo</td>
              </tr>
              <tr>
                <td><strong>Medium Ceramic Fan Heater</strong></td>
                <td>1,000 W (70% duty)</td>
                <td>$0.13 / hr</td>
                <td>$1.01 / 8h</td>
                <td>$30.24 / mo</td>
              </tr>
              <tr>
                <td><strong>High Setting (With Thermostat Cycling)</strong></td>
                <td>1,500 W (70% duty)</td>
                <td>$0.19 / hr</td>
                <td>$1.51 / 8h</td>
                <td>$45.36 / mo</td>
              </tr>
              <tr>
                <td><strong>High Setting (Continuous Max Run)</strong></td>
                <td>1,500 W (100% continuous)</td>
                <td>$0.27 / hr</td>
                <td>$2.16 / 8h</td>
                <td>$64.80 / mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Space Heater Power &amp; Operating Cost Formulas"
          formula="Average_Power = Rated_Power × Duty_Cycle | Cost = Average_Power × Operating_Hours × Electricity_Rate"
          formulaDescription="Deterministic electrical energy and cost estimation modeling rated wattage, assumed duty cycle, and scheduled operating hours."
          variables={[
            { symbol: "Rated_Power", label: "Rated Heating Element Power", description: "Nominal wattage rating on high, medium, or eco heat settings", unit: "Watts" },
            { symbol: "Duty_Cycle", label: "Thermostat Duty Cycle", description: "Fraction of the scheduled period during which the heating element is energized at rated power", unit: "%" },
            { symbol: "Operating_Hours", label: "Scheduled Operating Hours", description: "Total scheduled usage period (e.g. 8 hours daily/overnight)", unit: "Hours" },
            { symbol: "Electricity_Rate", label: "Electricity Tariff", description: "User-entered cost per kilowatt-hour of electric grid energy", unit: "$/kWh" },
          ]}
          notes={[
            "Electric resistance heating converts essentially all electrical input into heat at the point of use. The unit conversion is 1 W = 3.412 BTU/h.",
            "Oil-filled radiators use thermal mass to provide steadier heat output and may cycle differently than fan heaters. Their electrical energy consumption is still determined by rated power and the fraction of time the heating element operates.",
            "Actual thermostat duty cycles depend on room insulation, outdoor temperature, thermostat setpoint, heater control logic, room size, heat loss, and ventilation.",
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
        <h2>Related Heating &amp; Energy Planning</h2>
        <p>
          Considering a whole-home heat pump upgrade? Use our <Link href="/home-energy/heat-pump-cost-calculator">Heat Pump Cost Calculator</Link> to compare heating efficiencies, calculate cooling season electricity with the <Link href="/home-energy/air-conditioner-cost-calculator">Air Conditioner Cost Calculator</Link>, or audit household plug loads with the <Link href="/home-energy/electricity-usage-calculator">Electricity Usage Calculator</Link>.
        </p>
      </section>

      <section id="methodology">
        <h2>Technical References &amp; Model Basis</h2>
        <p>
          Space heater energy estimations use deterministic Joulean thermal conversions (3,412.14 BTU per kWh), rated electrical power, and user-entered duty cycle and tariff inputs. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="home-energy" />
    </article>
  );
}
