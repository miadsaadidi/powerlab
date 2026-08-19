interface SystemFlowDiagramProps {
  category: "solar" | "battery" | "home-energy" | "ev";
  title?: string;
}

interface FlowNode {
  icon: string;
  label: string;
  sublabel: string;
  badge?: string;
  color: string;
}

const FLOW_CONFIGS: Record<
  "solar" | "battery" | "home-energy" | "ev",
  {
    title: string;
    description: string;
    nodes: FlowNode[];
    efficiencyNote: string;
  }
> = {
  solar: {
    title: "Photovoltaic Energy Flow Architecture",
    description: "Solar irradiance converted to DC power, managed by MPPT, stored in battery reserves, and inverted to AC power.",
    nodes: [
      { icon: "☀️", label: "Solar PV Array", sublabel: "DC Generation (Vmp / Imp)", badge: "Source", color: "#f59e0b" },
      { icon: "⚡", label: "MPPT Controller", sublabel: "DC-to-DC Optimization (98% eff)", badge: "Regulation", color: "#eab308" },
      { icon: "🔋", label: "Battery Bank", sublabel: "LiFePO4 / AGM Storage (Wh / Ah)", badge: "Storage", color: "#10b981" },
      { icon: "🔄", label: "Inverter", sublabel: "DC to AC Conversion (90% eff)", badge: "Conversion", color: "#0ea5e9" },
      { icon: "🏠", label: "AC Household Loads", sublabel: "120V / 240V Appliances", badge: "Demand", color: "#6366f1" },
    ],
    efficiencyNote: "System round-trip efficiency typically ranges from 82% to 88% due to wiring, MPPT, and inverter conversion losses.",
  },
  battery: {
    title: "Battery Storage & Backup Power Topology",
    description: "Multi-source charging, chemical storage management, and pure sine wave inverted backup delivery.",
    nodes: [
      { icon: "🔌", label: "Grid / Solar Input", sublabel: "Primary Energy Input", badge: "Input", color: "#0ea5e9" },
      { icon: "⚡", label: "Smart BMS Charger", sublabel: "Multi-Stage CC/CV Charging", badge: "Protection", color: "#8b5cf6" },
      { icon: "🔋", label: "Battery Bank", sublabel: "12V / 24V / 48V Storage", badge: "Reserves", color: "#10b981" },
      { icon: "🔄", label: "Pure Sine Inverter", sublabel: "DC to 120V/240V AC (88–92%)", badge: "Inverter", color: "#f59e0b" },
      { icon: "💡", label: "Critical Subpanel", sublabel: "Refrigeration, Medical, Wi-Fi", badge: "Protected", color: "#ec4899" },
    ],
    efficiencyNote: "Continuous AC backup runtime is determined by usable Depth of Discharge (DOD) and inverter conversion efficiency.",
  },
  "home-energy": {
    title: "Residential Electrical Distribution & Load Hierarchy",
    description: "Grid utility supply and subpanel distribution across continuous, heavy-cycling, and essential circuits.",
    nodes: [
      { icon: "🏭", label: "Utility Grid / Solar", sublabel: "240V Split-Phase Service", badge: "Supply", color: "#0ea5e9" },
      { icon: "⚡", label: "Main Service Panel", sublabel: "100A / 200A Main Breaker", badge: "Distribution", color: "#f59e0b" },
      { icon: "🛡️", label: "Branch Breakers", sublabel: "NEC 80% Continuous Sizing", badge: "Protection", color: "#8b5cf6" },
      { icon: "❄️", label: "Major 240V Loads", sublabel: "HVAC, Water Heater, Range", badge: "High Draw", color: "#ef4444" },
      { icon: "💡", label: "General 120V Loads", sublabel: "Lighting, Refrigerator, Electronics", badge: "Base Draw", color: "#10b981" },
    ],
    efficiencyNote: "Heavy 240V heating and cooling appliances typically account for 55% to 65% of total monthly kilowatt-hour consumption.",
  },
  ev: {
    title: "Electric Vehicle Charging Power Path",
    description: "AC mains supply through EVSE equipment, vehicle onboard rectification, and traction battery storage.",
    nodes: [
      { icon: "⚡", label: "AC Grid Power", sublabel: "120V L1 / 240V L2 Supply", badge: "Source", color: "#0ea5e9" },
      { icon: "🔌", label: "EVSE Wallbox", sublabel: "J1772 / NACS Station", badge: "Control", color: "#38bdf8" },
      { icon: "🔄", label: "Onboard Charger", sublabel: "AC to DC Rectifier (88–92%)", badge: "Conversion", color: "#f59e0b" },
      { icon: "🧠", label: "Vehicle BMS", sublabel: "Thermal & Current Taper Control", badge: "Safety", color: "#8b5cf6" },
      { icon: "🚗", label: "Traction Battery", sublabel: "400V / 800V High-Voltage Pack", badge: "Propulsion", color: "#10b981" },
    ],
    efficiencyNote: "DC Fast Charging bypasses the onboard AC charger to feed high-power DC directly to the battery pack with automatic 80%+ taper.",
  },
};

export function SystemFlowDiagram({ category, title }: SystemFlowDiagramProps) {
  const config = FLOW_CONFIGS[category];
  const displayTitle = title || config.title;

  return (
    <div
      className="system-flow-card"
      style={{
        margin: "2rem 0",
        padding: "1.25rem 1.5rem",
        background: "var(--surface, #ffffff)",
        border: "1px solid var(--line, #e2e8f0)",
        borderRadius: "0.75rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
        <span style={{ fontSize: "1.1rem" }}>⚡</span>
        <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--ink, #1e293b)" }}>
          {displayTitle}
        </h3>
      </div>
      <p style={{ margin: "0 0 1.25rem", fontSize: "0.82rem", color: "var(--muted, #64748b)", lineHeight: 1.45 }}>
        {config.description}
      </p>

      {/* Responsive Horizontal Flow Grid */}
      <div
        className="flow-nodes-container"
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
          gap: "0.5rem",
          overflowX: "auto",
          paddingBottom: "0.5rem",
        }}
      >
        {config.nodes.map((node, index) => (
          <div
            key={node.label}
            style={{
              display: "flex",
              alignItems: "center",
              flex: "1 1 0",
              minWidth: "140px",
            }}
          >
            {/* Node Card */}
            <div
              className="flow-node-box"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "0.85rem 0.65rem",
                background: "var(--soft, #f8fafc)",
                border: `1px solid var(--line, #e2e8f0)`,
                borderTop: `3px solid ${node.color}`,
                borderRadius: "0.5rem",
                transition: "all 150ms ease",
              }}
            >
              <span style={{ fontSize: "1.4rem", marginBottom: "0.35rem" }}>{node.icon}</span>
              {node.badge && (
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: node.color,
                    background: "rgba(0, 0, 0, 0.04)",
                    padding: "1px 6px",
                    borderRadius: "9999px",
                    marginBottom: "0.3rem",
                  }}
                >
                  {node.badge}
                </span>
              )}
              <strong style={{ fontSize: "0.82rem", color: "var(--ink, #1e293b)", lineHeight: 1.25, marginBottom: "0.2rem" }}>
                {node.label}
              </strong>
              <span style={{ fontSize: "0.72rem", color: "var(--muted, #64748b)", lineHeight: 1.3 }}>
                {node.sublabel}
              </span>
            </div>

            {/* Connecting Arrow */}
            {index < config.nodes.length - 1 && (
              <div
                className="flow-arrow"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 0.25rem",
                  color: "var(--muted, #94a3b8)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                ➔
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footnote Note */}
      <div
        style={{
          marginTop: "1rem",
          padding: "0.5rem 0.75rem",
          background: "rgba(2, 132, 199, 0.06)",
          borderRadius: "0.4rem",
          borderLeft: "3px solid #0284c7",
          fontSize: "0.75rem",
          color: "var(--ink, #1e293b)",
          lineHeight: 1.4,
        }}
      >
        <strong>Engineering Principle:</strong> {config.efficiencyNote}
      </div>
    </div>
  );
}
