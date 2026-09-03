import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata-helper";

export const metadata = buildPageMetadata({
  title: "Laboratory Sources & Engineering Standards",
  description: "Scientific and industry standards informing PowerLab calculators: NREL PVWatts V8, NEC 2023, Victron Energy, US DOE, EPA, and IEEE standards.",
  canonicalPath: "/sources",
});

const reviewDate = "August 17, 2026";

export default function SourcesPage() {
  return (
    <article className="page reading-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>Data Sources &amp; Standards</span>
      </nav>

      <p className="eyebrow">Engineering Standards &amp; Citations</p>
      <h1>Laboratory Sources &amp; Standards</h1>
      <p className="intro">
        PowerLab mathematical models, physical derating coefficients, and editable presets are maintained against verified peer-reviewed publications, government research laboratories, and electrical safety standards.
      </p>

      {/* Solar Section */}
      <section>
        <h2>☀️ Solar Photovoltaic &amp; Insolation Standards</h2>
        <div className="source-list">
          <article>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
              <h3 style={{ margin: 0 }}>NREL PVWatts® Version 8</h3>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#f59e0b", background: "rgba(245, 158, 11, 0.1)", padding: "0.2rem 0.5rem", borderRadius: "0.35rem" }}>Solar Yield</span>
            </div>
            <p>
              National Renewable Energy Laboratory (NREL) meteorological irradiance models, solar position algorithms, and system loss derating factor methodology (covering soiling, shading, wiring, and inverter clipping).
            </p>
            <a href="https://developer.nrel.gov/docs/solar/pvwatts/v8/" target="_blank" rel="noopener noreferrer">
              NREL PVWatts V8 Technical Documentation ↗
            </a>
          </article>

          <article>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
              <h3 style={{ margin: 0 }}>NEC 2023 / NFPA 70 Article 690</h3>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#f59e0b", background: "rgba(245, 158, 11, 0.1)", padding: "0.2rem 0.5rem", borderRadius: "0.35rem" }}>Code &amp; Safety</span>
            </div>
            <p>
              National Electrical Code safety factors for conductor ampacity sizing (125% continuous duty multiplier), string voltage temperature corrections, and disconnect requirements for PV arrays.
            </p>
            <a href="https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=70" target="_blank" rel="noopener noreferrer">
              NFPA 70 Code Reference ↗
            </a>
          </article>
        </div>
      </section>

      {/* Battery Section */}
      <section>
        <h2>🔋 Battery Storage &amp; Electrochemical Systems</h2>
        <div className="source-list">
          <article>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
              <h3 style={{ margin: 0 }}>Victron Energy B.V.</h3>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "0.2rem 0.5rem", borderRadius: "0.35rem" }}>Peukert &amp; CEF</span>
            </div>
            <p>
              Battery Chemistry &amp; Monitoring Whitepapers: Peukert exponent values (1.02–1.30), charge efficiency factors (CEF), State of Charge (SoC) voltage-discharge mapping, and inverter idle tare power loss profiles.
            </p>
            <a href="https://www.victronenergy.com/media/pg/SmartShunt/en/configuration.html" target="_blank" rel="noopener noreferrer">
              Victron Energy Configuration Standards ↗
            </a>
          </article>

          <article>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
              <h3 style={{ margin: 0 }}>Trojan Battery Company</h3>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "0.2rem 0.5rem", borderRadius: "0.35rem" }}>Deep Cycle</span>
            </div>
            <p>
              Deep-Cycle Technology Guides: Lead-acid depth-of-discharge curves, cycle-life degradation under deep cycling (50% vs 80% DoD), and temperature compensation coefficients (-5 mV/°C/cell).
            </p>
            <a href="https://www.trojanbattery.com/resources/battery-maintenance" target="_blank" rel="noopener noreferrer">
              Trojan Deep Cycle Engineering Guide ↗
            </a>
          </article>
        </div>
      </section>

      {/* EV Section */}
      <section>
        <h2>🚗 Electric Vehicle &amp; Charging Infrastructure</h2>
        <div className="source-list">
          <article>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
              <h3 style={{ margin: 0 }}>U.S. Department of Energy (DOE) — AFDC</h3>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#8b5cf6", background: "rgba(139, 92, 246, 0.1)", padding: "0.2rem 0.5rem", borderRadius: "0.35rem" }}>EV Charging</span>
            </div>
            <p>
              Alternative Fuels Data Center: Power delivery ratings for Level 1 (120V AC), Level 2 (240V AC J1772 / NACS), and DC Fast Charging (CCS / Supercharger), alongside national average electric utility benchmark rates.
            </p>
            <a href="https://afdc.energy.gov/fuels/electricity-stations" target="_blank" rel="noopener noreferrer">
              DOE Alternative Fuels Data Center ↗
            </a>
          </article>

          <article>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
              <h3 style={{ margin: 0 }}>Archsmith, Kendall, &amp; Rapson (2015)</h3>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#8b5cf6", background: "rgba(139, 92, 246, 0.1)", padding: "0.2rem 0.5rem", borderRadius: "0.35rem" }}>AC Loss &amp; Climate</span>
            </div>
            <p>
              <em>Research in Transportation Economics</em>, Vol. 52 (&ldquo;From Cradle to Junkyard: Assessing the Life Cycle Greenhouse Gas Benefits of Electric Vehicles&rdquo;): Empirical methodology establishing the necessity of accounting for AC recharge energy (wall draw) rather than nominal DC battery discharge, quantifying charging efficiency dissipation factors across ambient temperatures and regional grid marginal emissions.
            </p>
            <a href="https://doi.org/10.1016/j.retrec.2015.10.007" target="_blank" rel="noopener noreferrer">
              Research in Transportation Economics (DOI: 10.1016/j.retrec.2015.10.007) ↗
            </a>
          </article>
        </div>
      </section>

      {/* Home Energy Section */}
      <section>
        <h2>⚡ Household Electrical &amp; Energy Auditing</h2>
        <div className="source-list">
          <article>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
              <h3 style={{ margin: 0 }}>U.S. Energy Information Administration</h3>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0284c7", background: "rgba(2, 132, 199, 0.1)", padding: "0.2rem 0.5rem", borderRadius: "0.35rem" }}>RECS Data</span>
            </div>
            <p>
              Residential Energy Consumption Survey (RECS): Baseline household daily consumption figures, heating/cooling split ratios, and electric utility volumetric billing components.
            </p>
            <a href="https://www.eia.gov/energyexplained/use-of-energy/electricity-use-in-homes.php" target="_blank" rel="noopener noreferrer">
              EIA Residential Consumption Reports ↗
            </a>
          </article>

          <article>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
              <h3 style={{ margin: 0 }}>ENERGY STAR® Product Database</h3>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0284c7", background: "rgba(2, 132, 199, 0.1)", padding: "0.2rem 0.5rem", borderRadius: "0.35rem" }}>Appliance Watts</span>
            </div>
            <p>
              Household Appliance Nameplate Specifications: Typical running wattage, compressor duty cycles, and annual kWh ratings for refrigerators, heat pump dryers, and HVAC systems.
            </p>
            <a href="https://www.energystar.gov/productfinder/" target="_blank" rel="noopener noreferrer">
              ENERGY STAR Product Finder ↗
            </a>
          </article>
        </div>
      </section>

      {/* Technical Research & Working Papers Section */}
      <section>
        <h2>🔬 PowerLab Original Technical Research &amp; Preprints</h2>
        <p>
          To establish mathematical transparency and rigorous derivations for physical variables used across our tools, PowerLab publishes open-access engineering technical reports:
        </p>
        <div className="source-list">
          <article>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
              <h3 style={{ margin: 0 }}>
                <Link href="/research/continuous-duty-thermal-sizing-evse-ampacity" style={{ color: "inherit", textDecoration: "underline" }}>
                  Level 2 EVSE Continuous-Duty Thermal Sizing &amp; Ampacity (PL-TR-2026-EVSE01)
                </Link>
              </h3>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#8b5cf6", background: "rgba(139, 92, 246, 0.1)", padding: "0.2rem 0.5rem", borderRadius: "0.35rem" }}>DOI: 10.6084</span>
            </div>
            <p>
              Investigates continuous load Joule heating ($I^2Rt$), terminal temperature derating (60°C vs 75°C), and 125% ampacity rules under NEC Article 625.42.
            </p>
            <Link href="/research/continuous-duty-thermal-sizing-evse-ampacity">
              View Technical Report &amp; Derivations →
            </Link>
          </article>

          <article>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
              <h3 style={{ margin: 0 }}>
                <Link href="/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics" style={{ color: "inherit", textDecoration: "underline" }}>
                  Cold-Climate Heat Pump COP Degradation &amp; Strip Heat Staging (PL-TR-2026-HVAC01)
                </Link>
              </h3>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0284c7", background: "rgba(2, 132, 199, 0.1)", padding: "0.2rem 0.5rem", borderRadius: "0.35rem" }}>AHRI 210/240</span>
            </div>
            <p>
              Thermodynamic evaluation of sub-freezing vapor compression efficiency, defrost parasitic draw, and electric resistance backup staging economics.
            </p>
            <Link href="/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics">
              View Technical Report &amp; Derivations →
            </Link>
          </article>

          <article>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
              <h3 style={{ margin: 0 }}>
                <Link href="/research/deterministic-inrush-load-stacking-generator-sizing" style={{ color: "inherit", textDecoration: "underline" }}>
                  Inductive Motor Inrush Currents &amp; Generator Load Stacking (PL-TR-2026-GEN02)
                </Link>
              </h3>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "0.2rem 0.5rem", borderRadius: "0.35rem" }}>ISO 8528-5</span>
            </div>
            <p>
              Locked Rotor Amperage (LRA) sub-transient reactance modeling, voltage dip envelopes, and non-coincident peak load stacking for backup generators.
            </p>
            <Link href="/research/deterministic-inrush-load-stacking-generator-sizing">
              View Technical Report &amp; Derivations →
            </Link>
          </article>

          <article>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
              <h3 style={{ margin: 0 }}>
                <Link href="/research/ground-view-factor-snow-albedo-pv-tilt" style={{ color: "inherit", textDecoration: "underline" }}>
                  Snow Albedo Transposition &amp; Cold-Weather Voc Expansion (PL-TR-2026-SOL03)
                </Link>
              </h3>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#f59e0b", background: "rgba(245, 158, 11, 0.1)", padding: "0.2rem 0.5rem", borderRadius: "0.35rem" }}>NEC 690.7</span>
            </div>
            <p>
              Anisotropic Perez ground-reflected diffuse gain models and sub-zero open-circuit voltage string sizing for MPPT charge controllers.
            </p>
            <Link href="/research/ground-view-factor-snow-albedo-pv-tilt">
              View Technical Report &amp; Derivations →
            </Link>
          </article>
        </div>
      </section>

      {/* Review Footer */}
      <section>
        <h2>Citation &amp; Methodology Governance</h2>
        <p>
          Standards and manufacturer data sheets last reviewed: <time dateTime="2026-08-17">{reviewDate}</time>.
        </p>
        <p>
          For a detailed breakdown of the mathematical equations and loss formulas derived from these sources, explore our <Link href="/research">Research &amp; Working Papers</Link>, inspect our <Link href="/methodology">Engineering Methodology</Link>, search the <Link href="/glossary">Engineering Glossary</Link>, learn more <Link href="/about">About PowerLab</Link>, or review our <Link href="/privacy">Zero-Database Privacy Policy</Link>.
        </p>
      </section>
    </article>
  );
}
