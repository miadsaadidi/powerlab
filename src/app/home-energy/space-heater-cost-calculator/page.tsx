import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { SpaceHeaterCostCalculator } from "@/components/calculator/space-heater-cost-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("space-heater-cost");

export const metadata: Metadata = buildPageMetadata({
  title: "Space Heater Electricity Cost Calculator: $/Hr",
  description: "Calculate exact space heater electricity costs per hour, night & month for 500W, 1000W & 1500W heaters. Model thermostat duty cycle vs central heating.",
  canonicalPath: "/home-energy/space-heater-cost-calculator",
  category: "home-energy",
});

const FAQS = [
  {
    question: "How much does it cost to run a 1,500 Watt space heater for 1 hour?",
    answer: "At the average US residential electricity rate of $0.18 per kWh, running a 1,500W electric heater at continuous full power costs exactly $0.27 per hour. If the heater has a thermostat cycling at 70% duty cycle, the effective cost drops to approximately $0.19 per hour.",
  },
  {
    question: "How much does a space heater cost to run all night (8 hours)?",
    answer: "Running a 1,500W heater on high with a 70% thermostat cycle overnight for 8 hours costs approximately $1.51 per night (or about $45.36 per month). Running a 750W heater on low costs approximately $0.76 per night (or about $22.68 per month).",
  },
  {
    question: "Is it cheaper to use a space heater or central heating?",
    answer: "It is cheaper to use a space heater only if you practice 'zone heating'—turning down your central thermostat for the whole house (e.g. to 62°F) and heating only the single room you are occupying. If you run multiple space heaters in different rooms, it is usually far more expensive than modern natural gas central heating or an inverter heat pump.",
  },
  {
    question: "Are ceramic space heaters more energy efficient than oil-filled radiators?",
    answer: "All electric resistance space heaters are 100% thermally efficient—converting 1 Watt of electricity into exactly 3.412 BTUs of heat. Ceramic heaters blow hot air immediately for fast personal warming, while oil-filled radiators take longer to heat up but provide steady, silent radiant heat that lingers after the thermostat turns off.",
  },
];

export default function SpaceHeaterCostPage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Space Heater Running Cost Calculator",
    description: "Calculate operating costs per hour, per 8-hour night, and per winter month for electric space heaters and radiators.",
    route: "/home-energy/space-heater-cost-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    features: [
      "Exact Watt-to-kWh resistance heating thermodynamic conversion",
      "Overnight 8-hour sleep duration cost calculations",
      "Thermostatic active cycling model (50% to 100% element duty)",
      "Multi-horizon cost modeling: hourly, overnight, 30-day month, and full winter season",
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
          Calculate the exact cost per hour, per 8-hour night, and per winter month to run electric space heaters, ceramic heaters, and oil-filled radiators.
        </p>
      </div>

      <DirectAnswerCard
        keyword="space heater electricity cost calculation"
        answer="Running a standard 1,500 Watt electric space heater continuously costs $0.27 per hour at the US average electricity rate of $0.18/kWh. With a thermostatic cycling duty cycle of 70%, operating cost is approximately $0.19 per hour, $1.51 for an 8-hour night, and about $45.30 per winter month."
        formula="Hourly Cost ($/hr) = (Heater Watts ÷ 1,000) × Thermostat Duty Cycle × Electricity Rate ($/kWh)"
        standardExample="1,500W heater @ 70% duty cycle, $0.18/kWh: (1.5 kW × 0.70) × $0.18 = $0.189/hr · $1.51 per 8-hour night"
        sourceAuthority="US Department of Energy (Energy Saver) & EIA Average Residential Rates"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <SpaceHeaterCostCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Calculate Space Heater Electricity Cost</h2>
        <ol>
          <li><strong>Check Heater Wattage Rating:</strong> Standard North American plug-in heaters draw 1,500 Watts on high, 1,000 Watts on medium, or 500 to 750 Watts on low.</li>
          <li><strong>Set Daily &amp; Overnight Usage:</strong> Enter how many hours the unit runs per day or during typical 8-hour sleeping periods.</li>
          <li><strong>Adjust Thermostat Duty Cycle:</strong> Units with adjustable thermostats automatically cycle on and off once ambient room temperature is reached (typically 60% to 75% on-time).</li>
          <li><strong>Calculate Cost vs Central Heating:</strong> Compare targeted single-room zone heating against whole-house central furnace costs.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Comparison of Space Heater Wattages &amp; Running Costs</h2>
        <p>Representative running costs across space heater power settings at $0.18/kWh utility rate:</p>
        <div className="scenario-table" role="region" aria-label="Comparison of space heater power settings and electricity costs">
          <table>
            <caption>Electric space heater power ratings, hourly costs, and monthly electric bill impact</caption>
            <thead>
              <tr>
                <th scope="col">Heater Type / Setting</th>
                <th scope="col">Power (Watts)</th>
                <th scope="col">Cost / Hour (@ $0.18)</th>
                <th scope="col">Overnight (8h Sleep)</th>
                <th scope="col">Monthly (8h/day)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Low / Eco Mode (Under-Desk)</strong></td>
                <td>500 W</td>
                <td>$0.06 / hr</td>
                <td>$0.50 / night</td>
                <td>$15.12 / mo</td>
              </tr>
              <tr>
                <td><strong>Medium Ceramic Fan Heater</strong></td>
                <td>1,000 W</td>
                <td>$0.13 / hr</td>
                <td>$1.01 / night</td>
                <td>$30.24 / mo</td>
              </tr>
              <tr>
                <td><strong>High Setting (With Thermostat Cycling)</strong></td>
                <td>1,500 W (70% duty)</td>
                <td>$0.19 / hr</td>
                <td>$1.51 / night</td>
                <td>$45.36 / mo</td>
              </tr>
              <tr>
                <td><strong>High Setting (Continuous Max Run)</strong></td>
                <td>1,500 W (100% duty)</td>
                <td>$0.27 / hr</td>
                <td>$2.16 / night</td>
                <td>$64.80 / mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Space Heater Power &amp; Operating Cost Formulas"
          formula="Hourly_Cost = (Heater_Watts / 1000) × Thermostat_Duty_Cycle × Electricity_Rate"
          formulaDescription="Joulean electric resistance thermal conversion modeling active thermostat cycling duration."
          variables={[
            { symbol: "Heater_Watts", label: "Rated Heating Element Power", description: "Nominal wattage rating on high, medium, or eco heat settings", unit: "Watts" },
            { symbol: "Thermostat_Duty_Cycle", label: "Active Thermostat Cycling", description: "Percentage of time heater elements actively glow (typically 60%–75%)", unit: "%" },
            { symbol: "Overnight_Hours", label: "Nightly Sleep Duration", description: "Number of continuous heating hours overnight (standard 8 hours)", unit: "Hours" },
            { symbol: "Electricity_Rate", label: "Utility Electricity Tariff", description: "Marginal cost per kilowatt-hour of electric grid power", unit: "$/kWh" },
          ]}
          notes={[
            "All electric resistance heaters operate at 100% thermal efficiency (1 Watt = 3.412 BTU/hr of heat).",
            "Oil-filled radiant heaters retain heat longer between cycles, providing steadier temperature control with fewer power spikes.",
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
        <h2>Methodology and Standards</h2>
        <p>
          Space heater energy calculations use pure Joulean thermal conversions (3,412.14 BTU per kWh) and typical thermostatic duty cycles. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="home-energy" />
    </article>
  );
}
