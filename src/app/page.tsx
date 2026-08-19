import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { publishedCalculators } from "@/lib/calculator-registry";
import { HeroGoalSelector } from "@/components/home/hero-goal-selector";
import { HeroQuickEstimator } from "@/components/home/hero-quick-estimator";
import { ConnectedSystemFlow } from "@/components/home/connected-system-flow";
import { HomeSearchFilter } from "@/components/home/home-search-filter";
import { TrustBadges } from "@/components/home/trust-badges";

const calculatorCardContent: Record<string, { description: string; action: string }> = {
  "battery-runtime": { description: "Estimate how long a battery can power a device or group of appliances.", action: "Calculate Battery Runtime" },
  "solar-panel-tilt": { description: "Find a practical starting panel angle from your latitude, with optional roof-orientation comparison.", action: "Calculate Solar Panel Tilt" },
  "solar-panel-output": { description: "Estimate monthly and annual solar production for your location using system size and PVWatts assumptions.", action: "Calculate Solar Output" },
  "solar-battery-bank-size": { description: "Estimate stored-energy capacity for a solar battery bank from daily load, autonomy and editable planning assumptions.", action: "Calculate Battery Size" },
  "solar-load": { description: "Estimate daily appliance energy from watts, schedules, duty-cycle assumptions and essential-load planning.", action: "Calculate Solar Load" },
  "solar-panel-size": { description: "Estimate solar system size and panel count from your energy target, panel wattage and modeled solar yield.", action: "Calculate Solar Panel Size" },
  "electricity-usage": { description: "Estimate daily, monthly and annual electricity use from appliance power, schedules or energy-label values.", action: "Calculate Electricity Usage" },
  "energy-bill": { description: "Estimate an electricity bill from your usage, electricity price and optional fixed or standing charges.", action: "Calculate Energy Bill" },
  "battery-size": { description: "Estimate the battery capacity needed for a load and backup time, with reserve, efficiency and planning assumptions.", action: "Calculate Battery Size" },
  "battery-capacity": { description: "Convert Ah, mAh, Wh and kWh using voltage, then estimate usable battery energy.", action: "Calculate Battery Capacity" },
  "ups-runtime": { description: "Estimate how long a UPS can support your equipment from battery energy and load watts.", action: "Calculate UPS Runtime" },
  "ups-battery-size": { description: "Calculate the nominal UPS battery energy and Ah needed for a load and backup time.", action: "Calculate UPS Battery Size" },
  "battery-charging-time": { description: "Estimate charging time from battery capacity, state of charge and charger output.", action: "Calculate Charging Time" },
  "home-battery-size": { description: "Estimate home battery capacity from household energy, backup scope and outage duration.", action: "Calculate Battery Size" },
  "portable-power-station": { description: "Estimate portable power station runtime or the capacity needed for a target runtime, with continuous and surge checks.", action: "Calculate Station Runtime" },
  "ev-charging-time": { description: "Estimate EV charging time from battery capacity, charge level and charger power.", action: "Calculate Charging Time" },
  "ev-charging-cost": { description: "Estimate EV charging cost from usable battery energy, driving consumption and your electricity price.", action: "Calculate EV Charging Cost" },
  "ev-range": { description: "Estimate planned EV range from usable battery capacity, charge level, reserve and energy consumption.", action: "Calculate EV Range" },
  "ev-savings": { description: "Compare EV electricity cost with combustion-vehicle fuel cost for the same annual distance.", action: "Calculate EV Savings" },
  "appliance-wattage": { description: "Estimate running watts from an appliance preset or label, then calculate energy use for a selected runtime.", action: "Calculate Appliance Watts" },
  "voltage-drop": { description: "Calculate DC and AC wire gauge sizing, voltage drop percentage, and power loss in watts under NEC standards.", action: "Calculate Voltage Drop" },
  "generator-size": { description: "Calculate generator running and starting wattage requirements for storm outages and emergency backup.", action: "Calculate Generator Size" },
  "solar-payback": { description: "Calculate solar break-even timeline in years, 25-year net profit, and return on investment without lead-gen forms.", action: "Calculate Solar Payback" },
  "ac-cost": { description: "Calculate hourly, monthly, and seasonal electricity costs for window AC, mini-splits, and central cooling.", action: "Calculate AC Cost" },
  "space-heater-cost": { description: "Calculate electricity costs per hour, per 8-hour night, and per winter month for electric space heaters.", action: "Calculate Heater Cost" },
  "heat-pump-cost": { description: "Compare annual operating costs between heat pumps, natural gas, propane, and fuel oil furnaces.", action: "Compare Heating Cost" },
  "solar-charge-controller": { description: "Size MPPT and PWM charge controllers by amperage and cold-weather array voltage (Voc).", action: "Calculate Controller Size" },
  "inverter-size": { description: "Calculate continuous and surge inverter wattage, DC battery amperage, fuse rating, and cable gauge.", action: "Calculate Inverter Size" },
  "v2l-runtime": { description: "Calculate how many days your EV can power essential home appliances during an electrical blackout.", action: "Calculate V2L Runtime" },
  "ev-breaker-size": { description: "Find the exact circuit breaker size, wire gauge (AWG), and charging speed for your Level 2 EV charger.", action: "Calculate Breaker Size" },
};

export const metadata: Metadata = {
  title: "Energy Calculators for Solar, Batteries, Home Energy & EVs",
  description: "Free, deterministic energy calculators with transparent assumptions. Calculate battery runtime, solar panel output, wire voltage drop, generator sizing, EV charging speeds, and electricity usage.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PowerLab — Energy Calculators for Solar, Batteries, Home Energy & EVs",
    description: "Free, deterministic energy calculators with transparent assumptions. Calculate battery runtime, solar panel output, wire voltage drop, generator sizing, EV charging speeds, and electricity usage.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PowerLab Energy Planning Calculators",
    description: "30 free, deterministic energy calculators for solar, battery storage, home energy, and EVs.",
  },
};

export default function HomePage() {
  const availableCalculators = publishedCalculators().filter((calculator) => calculatorCardContent[calculator.id]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ItemList",
        name: "PowerLab Energy Planning Calculators",
        numberOfItems: availableCalculators.length,
        itemListElement: availableCalculators.map((c, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: c.name,
          url: new URL(c.route, siteConfig.url).toString(),
          description: calculatorCardContent[c.id]?.description,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Hero Header */}
      <section
        className="hero"
        style={{
          textAlign: "center",
          padding: "1.75rem 1rem 0.25rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <p className="eyebrow" style={{ textAlign: "center", margin: "0 auto 0.35rem" }}>
          Connected Energy Planning &amp; Engineering
        </p>
        <h1
          style={{
            fontSize: "clamp(2.1rem, 5vw, 3.4rem)",
            lineHeight: 1.15,
            fontWeight: 800,
            margin: "0.4rem auto 0.6rem",
            textAlign: "center",
            maxWidth: "960px",
            width: "100%",
          }}
        >
          Deterministic Energy Calculators for Solar, Storage, Homes &amp; EVs
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--text-muted)",
            maxWidth: "660px",
            margin: "0 auto 0.5rem",
            lineHeight: 1.45,
            textAlign: "center",
          }}
        >
          Transparent physical loss models with zero database tracking.
        </p>
      </section>



      {/* Instant Micro-Estimator */}
      <HeroQuickEstimator />

      {/* Goal Fast-Track Selector */}
      <HeroGoalSelector />

      {/* Connected Architecture Flow */}
      <ConnectedSystemFlow />

      {/* Search & All 30 Calculators */}
      <div style={{ textAlign: "center", marginTop: "3rem", marginBottom: "1rem" }}>
        <p className="eyebrow">Complete Engineering Suite</p>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0.25rem 0" }}>
          All 30 Energy Planning Calculators
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Select a category or search below to launch any calculator with prefilled engineering presets:
        </p>
      </div>

      <HomeSearchFilter
        calculators={availableCalculators}
        cardContent={calculatorCardContent}
      />

      {/* Trust & Engineering Transparency */}
      <TrustBadges />

      {/* Supporting Links Footer Section */}
      <section className="section trust" style={{ borderTop: "1px solid var(--border-color, #cbd5e1)", paddingTop: "2rem" }}>
        <p className="supporting-links" style={{ textAlign: "center" }}>
          <Link href="/methodology">Engineering Calculation Methodology</Link>
          <span aria-hidden="true" style={{ margin: "0 0.5rem" }}>·</span>
          <Link href="/sources">Laboratory Sources &amp; Standards</Link>
          <span aria-hidden="true" style={{ margin: "0 0.5rem" }}>·</span>
          <Link href="/about">About PowerLab</Link>
        </p>
      </section>
    </>
  );
}
