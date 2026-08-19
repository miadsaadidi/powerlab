interface StandardItem {
  code: string;
  name: string;
  organization: string;
  description: string;
}

interface StandardsBadgeProps {
  category: "solar" | "battery" | "home-energy" | "ev";
}

const STANDARDS_DATA: Record<"solar" | "battery" | "home-energy" | "ev", StandardItem[]> = {
  solar: [
    {
      code: "NREL PVWatts V8",
      name: "PV Performance Model Algorithm",
      organization: "National Renewable Energy Laboratory (NREL)",
      description: "Standardized location-aware solar irradiance, temperature derate, and inverter AC output modeling.",
    },
    {
      code: "NEC Article 690",
      name: "Solar Photovoltaic (PV) Systems",
      organization: "National Electrical Code (NFPA 70)",
      description: "Standards governing PV array circuit sizing, overcurrent protection, and rapid shutdown requirements.",
    },
    {
      code: "IEC 61215 / 61730",
      name: "Terrestrial PV Module Reliability & Safety",
      organization: "International Electrotechnical Commission",
      description: "Design qualification and type approval for crystalline silicon photovoltaic modules.",
    },
  ],
  battery: [
    {
      code: "NEC Article 706",
      name: "Energy Storage Systems (ESS)",
      organization: "National Electrical Code (NFPA 70)",
      description: "Requirements for battery storage disconnects, circuit sizing, and ventilation in residential installations.",
    },
    {
      code: "IEC 62619 / UL 1973",
      name: "Secondary Lithium Cells & Batteries Safety",
      organization: "IEC / Underwriters Laboratories",
      description: "Safety requirements for industrial and residential lithium energy storage systems and BMS controls.",
    },
    {
      code: "IEEE 1547-2018",
      name: "Standard for Interconnection & Interoperability",
      organization: "Institute of Electrical and Electronics Engineers",
      description: "Grid-tie inverter synchronization, anti-islanding protection, and voltage/frequency ride-through.",
    },
  ],
  "home-energy": [
    {
      code: "NEC Article 220",
      name: "Branch-Circuit, Feeder, and Service Load Calculations",
      organization: "National Electrical Code (NFPA 70)",
      description: "Authoritative demand factors and continuous load ratings for residential electrical services.",
    },
    {
      code: "ANSI / ASHRAE 90.2",
      name: "Energy-Efficient Design of Low-Rise Residential Buildings",
      organization: "ASHRAE",
      description: "Baseline energy modeling standards for residential appliance loads, HVAC, and thermal envelopes.",
    },
    {
      code: "ENERGY STAR V8",
      name: "Appliance Energy Efficiency Criteria",
      organization: "U.S. Environmental Protection Agency (EPA)",
      description: "Standardized duty-cycle consumption benchmarks for residential refrigeration, laundry, and computing.",
    },
  ],
  ev: [
    {
      code: "EPA MPGe Standard",
      name: "Miles Per Gallon Gasoline Equivalent",
      organization: "U.S. Environmental Protection Agency",
      description: "Equivalency benchmark standardizing 1 gallon of gasoline as 33.70 kilowatt-hours of electrical energy.",
    },
    {
      code: "SAE J1772 / J3400 (NACS)",
      name: "Electric Vehicle Conductive Charge Coupler",
      organization: "SAE International",
      description: "North American AC Level 1, Level 2, and DC fast charging electrical interface specifications.",
    },
    {
      code: "ISO 15118",
      name: "Road Vehicles — V2G Communication Interface",
      organization: "International Organization for Standardization",
      description: "Standardized digital communication protocol between electric vehicles and EV charging stations.",
    },
  ],
};

export function StandardsBadge({ category }: StandardsBadgeProps) {
  const standards = STANDARDS_DATA[category];

  return (
    <section className="standards-section" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
      <div
        style={{
          border: "1px solid var(--border-color, #cbd5e1)",
          borderRadius: "0.75rem",
          padding: "1.25rem 1.5rem",
          background: "var(--card-bg, #ffffff)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "1.25rem" }}>📜</span>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>
            Engineering Standards & Technical Methodology References
          </h3>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted, #64748b)", marginBottom: "1rem" }}>
          Calculations, electrical losses, and design safety margins adhere to recognized engineering guidelines:
        </p>

        <div style={{ display: "grid", gap: "0.75rem" }}>
          {standards.map((std) => (
            <div
              key={std.code}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
                padding: "0.75rem",
                background: "var(--bg-secondary, #f8fafc)",
                borderRadius: "0.5rem",
                borderLeft: "3px solid #0284c7",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#0284c7",
                    background: "rgba(2, 132, 199, 0.1)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {std.code}
                </span>
                <strong style={{ fontSize: "0.875rem" }}>{std.name}</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>• {std.organization}</span>
              </div>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                {std.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
