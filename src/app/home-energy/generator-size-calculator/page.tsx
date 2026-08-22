import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isCalculatorPublished } from "@/lib/calculator-registry";
import { buildCalculatorStructuredData } from "@/lib/seo/structured-data";
import { GeneratorSizeCalculator } from "@/components/calculator/generator-size-calculator";
import { FormulaCard } from "@/components/seo/formula-card";
import { StandardsBadge } from "@/components/seo/standards-badge";
import { PageJumpNav } from "@/components/seo/page-jump-nav";
import { DirectAnswerCard } from "@/components/seo/direct-answer-card";

const isPublished = isCalculatorPublished("generator-size");

export const metadata: Metadata = {
  title: "Generator Size Calculator — Running & Starting Watts",
  description: "Calculate the exact generator size (running and starting watts) needed for your home, RV, or jobsite appliances. Find the right portable or standby generator capacity.",
  alternates: { canonical: "/home-energy/generator-size-calculator" },
  robots: { index: isPublished, follow: true },
  openGraph: {
    title: "Generator Size Calculator — PowerLab",
    description: "Calculate required generator running and starting surge watts for emergency blackout home backup.",
    url: `${siteConfig.url}/home-energy/generator-size-calculator`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

const FAQS = [
  {
    question: "What is the difference between running watts and starting (surge) watts?",
    answer: "Running (continuous) watts are the continuous electrical power required to keep an appliance operating. Starting (surge) watts are the momentary extra power required for 2 to 3 seconds to start electric motors found in refrigerators, well pumps, air compressors, and air conditioners. Starting watts can be 2 to 4 times higher than running watts.",
  },
  {
    question: "How do you calculate total generator starting watts accurately?",
    answer: "In real-world use, multiple motorized appliances rarely start at the exact same fraction of a second. The industry-standard sequential startup method sums the running watts of all connected devices, then adds only the single largest motor starting surge delta. This avoids massively oversizing the generator.",
  },
  {
    question: "Can a 7,500W generator run an entire house?",
    answer: "A 7,500W running / 9,500W surge generator can power essential household loads including a refrigerator, 1/2 HP well pump or sump pump, gas furnace blower, microwave, lights, and entertainment electronics. However, it cannot run heavy 240V whole-house electric heat, electric water heaters, or 4-ton central AC simultaneously.",
  },
  {
    question: "What size generator cord and breaker do I need for a 7,500W generator?",
    answer: "A typical 7,500W generator produces up to 31.25 Amps at 240V. This requires a 4-prong NEMA L14-30 generator cord (10 AWG 4-conductor wire) connected to a 30-Amp double-pole manual transfer switch or interlock kit on your main breaker panel.",
  },
];

export default function GeneratorSizePage() {
  const structuredData = buildCalculatorStructuredData({
    name: "Generator Size & Wattage Calculator",
    description: "Calculate generator running and starting wattage requirements for storm outages and emergency home backup.",
    route: "/home-energy/generator-size-calculator",
    categoryName: "Home Energy",
    categoryRoute: "/home-energy",
    features: [
      "Sequential motor starting surge calculation preventing generator oversizing",
      "Comprehensive interactive appliance catalog with accurate LRA surge profiles",
      "NEMA plug specification matching (NEMA 5-20, L14-30, 14-50)",
      "Multi-fuel consumption estimations for gasoline, propane, and natural gas",
    ],
    standards: [
      "NFPA 70 / NEC Article 702 (Optional Standby Systems)",
      "NFPA 110 (Standard for Emergency and Standby Power Systems)",
      "IEEE Std 446 (Recommended Practice for Emergency and Standby Power Systems)",
      "NEMA MG-1 (Motors and Generators)",
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
        <span aria-current="page">Generator Size Calculator</span>
      </nav>

      <div className="calculator-header">
        <p className="eyebrow">Outage Preparedness &amp; Power Sizing</p>
        <h1>Generator Size &amp; Wattage Calculator</h1>
        <p className="intro">
          Calculate the exact running watts, motor starting surge watts, and recommended generator class needed to keep your home, well pump, refrigerator, and essentials running during a blackout.
        </p>
      </div>

      <DirectAnswerCard
        keyword="generator sizing calculation"
        answer="A 7,500W running / 9,500W surge portable generator is the standard sweet spot for emergency home backup. Sizing is calculated by summing the continuous running watts of all simultaneous devices (with a 20% safety margin), then adding only the single largest motor starting surge delta (sequential motor starting method) to prevent costly oversizing."
        formula="Generator Sizing: Running Watts = (Total Running Load × 1.20) · Peak Surge = Running Watts + Max(Motor Inrush Surge − Running Watts)"
        standardExample="Essentials (Fridge 150W/1200W + Well Pump 1000W/3000W + Lights/TV 300W): ~1,740W Running / ~3,740W Surge → 4,000W to 5,000W Generator"
        sourceAuthority="NEC Article 702 (Optional Standby Systems) & IEEE Std 446"
      />

      <PageJumpNav />

      <div id="calculator-tool">
        <GeneratorSizeCalculator />
      </div>

      <section id="how-to-guide" style={{ marginTop: "3rem" }}>
        <h2>How to Size a Backup Generator</h2>
        <ol>
          <li><strong>Identify Essential vs Convenience Loads:</strong> Select critical life-support, refrigeration, well pumps, and heating/cooling appliances needed during a storm.</li>
          <li><strong>Account for Motor Startup Inrush:</strong> Compressors and induction motors (pumps, AC units, fridges) require 2x to 3x running watts to start.</li>
          <li><strong>Apply Sequential Startup Logic:</strong> Modern sizing algorithms sum running watts and add only the single largest motor surge delta.</li>
          <li><strong>Add 20% Safety Headroom:</strong> Never run a generator at 100% capacity continuously; sizing with 20% buffer extends engine life and prevents voltage sag.</li>
        </ol>
      </section>

      <section id="sizing-matrix">
        <h2>Generator Sizing &amp; Emergency Load Reference Matrix</h2>
        <p>Representative generator classes, running capacities, surge limits, and typical loads supported:</p>
        <div className="scenario-table" role="region" aria-label="Generator sizing and load matrix">
          <table>
            <caption>Generator size brackets, power ratings, and supported storm outage appliances</caption>
            <thead>
              <tr>
                <th scope="col">Generator Class</th>
                <th scope="col">Running Watts</th>
                <th scope="col">Starting Surge</th>
                <th scope="col">Outlet Type</th>
                <th scope="col">Appliances Powered (Blackout Essentials)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Compact Inverter</strong></td>
                <td>2,000 W</td>
                <td>2,400 W</td>
                <td>120V 20A Duplex</td>
                <td>Fridge (150W), WiFi, phone chargers, LED lights, CPAP machine</td>
              </tr>
              <tr>
                <td><strong>Medium Inverter</strong></td>
                <td>3,500 W</td>
                <td>4,500 W</td>
                <td>120V 30A (TT-30)</td>
                <td>Fridge, microwave (1,000W), TV, laptop, portable space heater or window AC</td>
              </tr>
              <tr>
                <td><strong>Heavy Portable / Dual-Fuel</strong></td>
                <td>7,500 W</td>
                <td>9,500 W</td>
                <td>120/240V 30A (L14-30)</td>
                <td>Fridge, freezer, 1/2 HP well pump (1,050W run / 2,200W surge), gas furnace blower, lights</td>
              </tr>
              <tr>
                <td><strong>Whole-Home Portable</strong></td>
                <td>10,000 W</td>
                <td>12,500 W</td>
                <td>120/240V 50A (14-50)</td>
                <td>Well pump, furnace, water heater (partial), microwave, multiple refrigerators, 3-ton AC (with soft start)</td>
              </tr>
              <tr>
                <td><strong>Whole-Home Standby (ATS)</strong></td>
                <td>18,000 W+</td>
                <td>22,000 W+</td>
                <td>200A Service ATS</td>
                <td>100% Whole home power: 4-5 ton central AC, electric dryer, electric range, EV charging</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="formula-math">
        <FormulaCard
          title="Sequential Motor Startup Formula"
          formula="Peak_Surge = Total_Running_Watts + Max(Motor_Starting_Watts - Motor_Running_Watts)"
          formulaDescription="Industry-standard sequential starting surge algorithm that prevents unnecessary generator oversizing while ensuring reliable motor starting."
          variables={[
            { symbol: "Total_Running_Watts", label: "Continuous Running Load", description: "Sum of continuous watts for all connected appliances running simultaneously", unit: "Watts" },
            { symbol: "Max_Surge_Delta", label: "Largest Motor Inrush Delta", description: "Difference between starting and running watts of the largest motorized load", unit: "Watts" },
            { symbol: "Peak_Surge", label: "Peak Surge Rating Required", description: "Minimum generator surge/starting rating needed to start the heaviest load", unit: "Watts" },
            { symbol: "Headroom_Factor", label: "Continuous Safety Margin", description: "Standard 20% buffer above running watts for engine longevity and cooler operation", unit: "dimensionless" },
          ]}
          notes={[
            "Sequential starting assumes motorized loads (refrigerator, sump pump, AC) do not switch on at the exact same millisecond.",
            "Generators should ideally operate at 50% to 80% continuous rated load for maximum fuel efficiency and lowest harmonic distortion.",
          ]}
        />
      </div>

      <section>
        <h2>Portable vs. Whole-House Standby Generators</h2>
        <p>
          Depending on your total wattage requirements and budget, generators fall into distinct classes:
        </p>
        <ul>
          <li><strong>Portable Inverters (2,000W – 4,500W):</strong> Extremely quiet and fuel efficient; ideal for running refrigerators, lights, and electronics via extension cords.</li>
          <li><strong>Heavy Portable / Dual-Fuel (7,500W – 12,000W):</strong> The most popular storm backup choice. Capable of running well pumps, sump pumps, and partial house circuits through a 30A/50A transfer switch.</li>
          <li><strong>Automatic Standby Generators (14 kW – 24 kW):</strong> Permanently installed outside, connected to natural gas or propane, with an automatic transfer switch (ATS) that restores power in 10 seconds.</li>
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
          Comparing generator backup with whole-home batteries? Use our <Link href="/home-energy/home-battery-size-calculator">Home Battery Size Calculator</Link> to size storage, estimate individual device wattage with the <Link href="/home-energy/appliance-wattage-calculator">Appliance Wattage Calculator</Link>, or calculate monthly household energy with the <Link href="/home-energy/electricity-usage-calculator">Electricity Usage Calculator</Link>.
        </p>
      </section>

      <section>
        <h2>Methodology and Standards</h2>
        <p>
          Generator running and motor surge starting calculations use sequential motor starting principles and standard NEMA appliance benchmarks. See our <Link href="/methodology">methodology</Link> and <Link href="/sources">sources</Link>.
        </p>
      </section>

      <StandardsBadge category="home-energy" />
    </article>
  );
}
