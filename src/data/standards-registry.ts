export type StandardAuthority =
  | "IEEE"
  | "NEC"
  | "NREL"
  | "SAE"
  | "UL"
  | "NEMA"
  | "ISO"
  | "AHRI"
  | "ASHRAE"
  | "DOE"
  | "IEC"
  | "NFPA";

export interface StandardRef {
  code: string;
  authority: StandardAuthority;
  title: string;
  clauseId?: string;
  clauseSummary?: string;
}

export type StandardCategory =
  | "Adopted Code"
  | "Standard"
  | "Recommended Practice"
  | "Modeling Tool"
  | "Technical Reference";

export interface GoverningClause {
  clauseNumber: string;
  title: string;
  description: string;
  latexFormula: string;
  enforcingCalculators: {
    id: string;
    name: string;
    route: string;
  }[];
}

export interface StandardDefinition {
  id: string;
  code: string;
  authority: StandardAuthority;
  category: StandardCategory;
  edition: string;
  title: string;
  scope: string;
  context: string;
  color: string;
  clauses: GoverningClause[];
}

/**
 * Verified standards mapped to each calculator in PowerLab.
 */
export const CALCULATOR_STANDARDS_MAP: Record<string, StandardRef[]> = {
  "battery-runtime": [
    { code: "IEEE 485", authority: "IEEE", title: "Stationary Battery Sizing & Capacity Derating", clauseId: "ieee-485" },
    { code: "Peukert's Law", authority: "IEEE", title: "Non-Linear High C-Rate Electrochemical Discharge", clauseId: "peukert-law" },
    { code: "UL 9540", authority: "UL", title: "Energy Storage Systems and Equipment Safety", clauseId: "ul-9540" },
  ],
  "battery-size": [
    { code: "IEEE 485", authority: "IEEE", title: "Recommended Practice for Sizing Stationary Batteries", clauseId: "ieee-485" },
    { code: "NFPA 70 NEC 706", authority: "NEC", title: "Energy Storage Systems (ESS) Sizing & Disconnects", clauseId: "nec-706" },
  ],
  "battery-capacity": [
    { code: "IEEE 485", authority: "IEEE", title: "Nominal Voltage & Ah to Usable kWh Conversion", clauseId: "ieee-485" },
    { code: "IEC 62619", authority: "IEC", title: "Secondary Lithium Cells & Batteries Industrial Safety", clauseId: "iec-62619" },
  ],
  "battery-charging-time": [
    { code: "IEEE 2030.2.1", authority: "IEEE", title: "Design & Integration of Battery Energy Storage Systems", clauseId: "ieee-2030" },
    { code: "CC/CV Protocol", authority: "IEEE", title: "Constant Current / Constant Voltage Charging Curves", clauseId: "cc-cv" },
  ],
  "home-battery-size": [
    { code: "NFPA 855", authority: "NFPA", title: "Standard for the Installation of Stationary ESS", clauseId: "nfpa-855" },
    { code: "NEC Article 706", authority: "NEC", title: "Residential Energy Storage Sizing & Backup Scope", clauseId: "nec-706" },
    { code: "IEEE 2030.2.1", authority: "IEEE", title: "Grid-Connected Residential ESS Architecture", clauseId: "ieee-2030" },
  ],
  "portable-power-station": [
    { code: "UL 2743", authority: "UL", title: "Standard for Portable Power Packs & Inverter Units", clauseId: "ul-2743" },
    { code: "UN 38.3", authority: "UL", title: "Lithium Iron Phosphate Transport & Discharge Testing", clauseId: "un-38-3" },
  ],
  "ups-runtime": [
    { code: "IEEE 1184", authority: "IEEE", title: "Guide for Batteries for Uninterruptible Power Supply Systems", clauseId: "ieee-1184" },
    { code: "NEMA PE 1", authority: "NEMA", title: "Uninterruptible Power Systems Specification & Testing", clauseId: "nema-pe1" },
  ],
  "ups-battery-size": [
    { code: "IEEE 1184", authority: "IEEE", title: "UPS Battery Bank Energy & Reserve Time Determination", clauseId: "ieee-1184" },
    { code: "UL 1778", authority: "UL", title: "Standard for Uninterruptible Power Systems Equipment", clauseId: "ul-1778" },
  ],
  "solar-panel-output": [
    { code: "NREL PVWatts® V8", authority: "NREL", title: "Meteorological Insolation & Physical System Loss Model", clauseId: "nrel-pvwatts" },
    { code: "IEC 61215", authority: "IEC", title: "Terrestrial Photovoltaic (PV) Module Design Qualification", clauseId: "iec-61215" },
    { code: "IEEE 1547", authority: "IEEE", title: "Standard for Interconnection of Distributed Energy Resources", clauseId: "ieee-1547" },
  ],
  "solar-panel-tilt": [
    { code: "NREL PVWatts® V8", authority: "NREL", title: "Solar Position Algorithm & Optimum Tilt Geometry", clauseId: "nrel-pvwatts" },
    { code: "Perez Anisotropic Model", authority: "NREL", title: "Diffuse Sky & Ground-Reflected Snow Albedo Transposition", clauseId: "perez-model" },
  ],
  "solar-panel-size": [
    { code: "NREL SAM", authority: "NREL", title: "System Advisor Model Solar Sizing Methodology", clauseId: "nrel-sam" },
    { code: "NEC Article 690", authority: "NEC", title: "Solar Photovoltaic Systems Array Sizing & Conductors", clauseId: "nec-690" },
  ],
  "solar-charge-controller": [
    { code: "NEC 690.7", authority: "NEC", title: "Sub-Zero Open-Circuit Voltage (Voc) Expansion Correction", clauseId: "nec-690-7" },
    { code: "NEC 690.8", authority: "NEC", title: "Circuit Sizing & Continuous 125% Current Multipliers", clauseId: "nec-690-8" },
    { code: "IEC 62109-1", authority: "IEC", title: "Safety of Power Converters for Use in Photovoltaic Systems", clauseId: "iec-62109" },
  ],
  "solar-battery-bank-size": [
    { code: "IEEE 485", authority: "IEEE", title: "Stationary Storage Sizing for Autonomous Off-Grid Systems", clauseId: "ieee-485" },
    { code: "NEC Article 706", authority: "NEC", title: "Energy Storage Systems Overcurrent Protection", clauseId: "nec-706" },
  ],
  "solar-load": [
    { code: "US EIA RECS", authority: "DOE", title: "Residential Energy Consumption Survey Benchmark Intervals", clauseId: "eia-recs" },
    { code: "NEC Article 220", authority: "NEC", title: "Branch-Circuit, Feeder, and Service Load Calculations", clauseId: "nec-220" },
  ],
  "solar-payback": [
    { code: "NREL SAM Cost Engine", authority: "NREL", title: "LCOE Levelized Cost of Energy & Solar Cash Flow Model", clauseId: "nrel-sam" },
    { code: "DSIRE / ITC", authority: "DOE", title: "Federal Investment Tax Credit Financial Depreciation", clauseId: "dsire-itc" },
  ],
  "ev-charging-time": [
    { code: "SAE J1772", authority: "SAE", title: "Electric Vehicle Conductive Charge Coupler AC Standards", clauseId: "sae-j1772" },
    { code: "SAE J3400 (NACS)", authority: "SAE", title: "North American Charging Standard Coupler & Protocol", clauseId: "sae-j3400" },
    { code: "US DOE AFDC", authority: "DOE", title: "Alternative Fuels Data Center Power Delivery Benchmarks", clauseId: "doe-afdc" },
  ],
  "ev-charging-cost": [
    { code: "US EIA Electric Power", authority: "DOE", title: "Residential & Commercial Volumetric Tariff Benchmarks", clauseId: "eia-power" },
    { code: "OBC Thermal Loss Model", authority: "SAE", title: "Onboard AC-to-DC Charger Dissipation & Pumping Overhead", clauseId: "obc-losses" },
  ],
  "ev-range": [
    { code: "SAE J1634", authority: "SAE", title: "Electric Vehicle Energy Consumption & Range Test Procedure", clauseId: "sae-j1634" },
    { code: "EPA MCT Multi-Cycle", authority: "DOE", title: "Dynamometer Highway High-Speed & Cold Ambient Adjustment", clauseId: "epa-mct" },
  ],
  "ev-savings": [
    { code: "EPA Fuel Economy Metric", authority: "DOE", title: "Gallon Gas Equivalent (GGE) & MPGe Direct Equivalency", clauseId: "epa-fuel" },
    { code: "US EIA Petroleum Data", authority: "DOE", title: "National Gasoline Price Benchmarking & Cost Comparison", clauseId: "eia-gas" },
  ],
  "ev-breaker-size": [
    { code: "NEC 625.42", authority: "NEC", title: "EVSE Continuous Duty Rating (125% Ampacity Multiplier)", clauseId: "nec-625-42" },
    { code: "NEC 110.14(C)", authority: "NEC", title: "Conductor Terminal Temperature Limitations (60°C vs 75°C)", clauseId: "nec-110-14" },
    { code: "NEC Table 310.16", authority: "NEC", title: "Allowable Ampacities of Insulated Copper & Aluminum Conductors", clauseId: "nec-310-16" },
  ],
  "v2l-runtime": [
    { code: "ISO 15118-20", authority: "ISO", title: "Vehicle-to-Grid (V2G) & Bidirectional Power Transfer", clauseId: "iso-15118" },
    { code: "UL 9741", authority: "UL", title: "Standard for Bidirectional Electric Vehicle Power Equipment", clauseId: "ul-9741" },
    { code: "NEC Article 702", authority: "NEC", title: "Optional Standby Systems Isolation & Transfer Switching", clauseId: "nec-702" },
  ],
  "electricity-usage": [
    { code: "US EIA RECS", authority: "DOE", title: "Household Daily Appliance Duty Cycle Profile Standards", clauseId: "eia-recs" },
    { code: "ENERGY STAR® Database", authority: "DOE", title: "Nameplate Baseline Wattages & Annual Operating Hours", clauseId: "energy-star" },
  ],
  "energy-bill": [
    { code: "US EIA Form 861", authority: "DOE", title: "Utility Retail Sales, Fixed Charges & TOU Rate Schedules", clauseId: "eia-861" },
    { code: "FERC Tariff Data", authority: "DOE", title: "Federal Energy Regulatory Commission Volumetric Delivery Rules", clauseId: "ferc-tariff" },
  ],
  "appliance-wattage": [
    { code: "ENERGY STAR® Testing", authority: "DOE", title: "Standardized Measurement of Standby & Running Power Draw", clauseId: "energy-star" },
    { code: "IEC 62301", authority: "IEC", title: "Household Electrical Appliances Measurement of Standby Power", clauseId: "iec-62301" },
  ],
  "voltage-drop": [
    { code: "NEC 210.19", authority: "NEC", title: "Informational Note No. 4: 3% Branch Circuit Voltage Drop Guidance", clauseId: "nec-210-19" },
    { code: "NEC Ch. 9 Table 8", authority: "NEC", title: "Conductor Properties (DC Resistance in Ω/kFT at 75°C)", clauseId: "nec-table-8" },
    { code: "IEEE 141 (Red Book)", authority: "IEEE", title: "Recommended Practice for Electric Power Distribution", clauseId: "ieee-141" },
  ],
  "generator-size": [
    { code: "NEMA MG-1 Part 10", authority: "NEMA", title: "Electric Motors & Generators Locked Rotor Amps (Code A–V)", clauseId: "nema-mg1" },
    { code: "ISO 8528-5", authority: "ISO", title: "Reciprocating Generating Sets Transient Load Acceptance", clauseId: "iso-8528" },
    { code: "NEC Article 702", authority: "NEC", title: "Optional Standby Systems Non-Coincident Load Stacking", clauseId: "nec-702" },
  ],
  "ac-cost": [
    { code: "AHRI 210/240-2023", authority: "AHRI", title: "Unitary Air-Conditioner SEER2 & EER2 Testing Standard", clauseId: "ahri-210-240" },
    { code: "ASHRAE Standard 90.1", authority: "ASHRAE", title: "Energy Standard for Cooling Equipment Efficiency Baselines", clauseId: "ashrae-90-1" },
  ],
  "heat-pump-cost": [
    { code: "AHRI 210/240-2023", authority: "AHRI", title: "Heat Pump Heating Seasonal Performance Factor (HSPF2)", clauseId: "ahri-210-240" },
    { code: "NEEP ccASHP", authority: "ASHRAE", title: "Cold-Climate Air-Source Heat Pump COP Derating at 5°F/-15°C", clauseId: "neep-ccashp" },
  ],
  "space-heater-cost": [
    { code: "Joule's First Law", authority: "IEEE", title: "Resistive Thermal Dissipation (P = I^2 * R = 100% Thermal)", clauseId: "joules-law" },
    { code: "UL 1278", authority: "UL", title: "Standard for Movable and Wall-Hung Electric Room Heaters", clauseId: "ul-1278" },
  ],
  "inverter-size": [
    { code: "UL 1741", authority: "UL", title: "Inverters, Converters, and Controllers for Distributed Energy", clauseId: "ul-1741" },
    { code: "NEC Article 690.8", authority: "NEC", title: "Continuous Output Current Rating & Inrush Surge Multipliers", clauseId: "nec-690-8" },
    { code: "IEEE 1547", authority: "IEEE", title: "Pure Sine Wave Harmonic Distortion (THD < 5%) Standards", clauseId: "ieee-1547" },
  ],
};

/**
 * Detailed Regulatory Codes & Standards for the /standards Matrix Page.
 */
export const COMPREHENSIVE_STANDARDS_LIST: StandardDefinition[] = [
  {
    id: "nrel-pvwatts",
    code: "NREL PVWatts® V8",
    authority: "NREL",
    category: "Modeling Tool",
    edition: "Version 8 (2024–2026 Engine)",
    title: "Photovoltaic System Performance & Physical Loss Modeling",
    scope: "Defines solar insolation transposition, plane-of-array irradiance, cell temperature NOCT adjustment, and comprehensive 14.08% default system loss derating.",
    context: "Computational modeling tool and solar resource technical reference developed by the National Renewable Energy Laboratory (NREL).",
    color: "#f59e0b",
    clauses: [
      {
        clauseNumber: "POA Transposition Model",
        title: "Plane-of-Array (POA) Beam & Diffuse Irradiance Transposition",
        description: "Models incident radiation on tilted surfaces combining direct normal irradiance (DNI), diffuse horizontal irradiance (DHI), and ground albedo reflection.",
        latexFormula: "I_{\\text{poa}} = I_{\\text{beam}} \\cos(\\theta) + I_{\\text{sky diffuse}} + I_{\\text{ground diffuse}} \\times \\left(\\frac{1 - \\cos(\\beta)}{2}\\right) \\times \\rho_{\\text{albedo}}",
        enforcingCalculators: [
          { id: "solar-panel-output", name: "Solar Panel Output Calculator", route: "/solar/solar-panel-output-calculator" },
          { id: "solar-panel-tilt", name: "Solar Panel Tilt Calculator", route: "/solar/solar-panel-tilt-calculator" },
        ],
      },
      {
        clauseNumber: "NOCT Cell Model",
        title: "Cell Temperature NOCT Thermal Voltage Degradation",
        description: "Calculates instantaneous solar cell operating temperature based on ambient temperature, wind velocity, and Nominal Operating Cell Temperature (NOCT).",
        latexFormula: "T_{\\text{cell}} = T_{\\text{amb}} + \\left(\\frac{\\text{NOCT} - 20}{800}\\right) \\times I_{\\text{poa}} \\times \\left(1 - \\frac{\\eta_{\\text{STC}}}{0.9}\\right)",
        enforcingCalculators: [
          { id: "solar-panel-output", name: "Solar Panel Output Calculator", route: "/solar/solar-panel-output-calculator" },
          { id: "solar-charge-controller", name: "Solar Charge Controller Calculator", route: "/solar/solar-charge-controller-calculator" },
        ],
      },
    ],
  },
  {
    id: "nec-690",
    code: "NFPA 70 (NEC) Article 690",
    authority: "NEC",
    category: "Adopted Code",
    edition: "2023 National Electrical Code",
    title: "Solar Photovoltaic (PV) Systems Sizing & Safety Provisions",
    scope: "Prescribes requirements for maximum DC voltage calculation, continuous current multipliers, overcurrent protection, and conductor sizing in PV systems.",
    context: "Model electrical code adopted into law across state and municipal building authorities in the United States.",
    color: "#d97706",
    clauses: [
      {
        clauseNumber: "NEC 690.7(A)",
        title: "Sub-Zero Open-Circuit Voltage (Voc) Temperature Correction Model",
        description: "Adjusts module manufacturer rated Voc using lowest historical ambient temperature to prevent voltage overages on inverters and charge controllers.",
        latexFormula: "V_{\\text{max}} = N_{\\text{series}} \\times V_{\\text{oc}} \\times \\left[1 + \\left(\\frac{\\alpha_{\\text{Voc}}}{100}\\right) \\times (T_{\\text{min}} - 25^\\circ\\text{C})\\right]",
        enforcingCalculators: [
          { id: "solar-charge-controller", name: "Solar Charge Controller Calculator", route: "/solar/solar-charge-controller-calculator" },
          { id: "solar-panel-size", name: "Solar Panel Size Calculator", route: "/solar/solar-panel-size-calculator" },
        ],
      },
      {
        clauseNumber: "NEC 690.8(A) & (B)",
        title: "Maximum Circuit Current & Continuous Sizing Factor",
        description: "NEC 690.8(A)(1) defines maximum circuit current as 125% of rated short-circuit current (I_max = 1.25 × I_sc). NEC 690.8(B)(1) applies a continuous-load factor (1.25 × I_max = 1.56 × I_sc) for conductor ampacity before temperature or conduit adjustment.",
        latexFormula: "I_{\\text{max}} = 1.25 \\times I_{\\text{sc}}, \\quad I_{\\text{conductor, min}} \\ge 1.25 \\times I_{\\text{max}} = 1.56 \\times I_{\\text{sc}}",
        enforcingCalculators: [
          { id: "solar-charge-controller", name: "Solar Charge Controller Calculator", route: "/solar/solar-charge-controller-calculator" },
          { id: "voltage-drop", name: "Wire Voltage Drop Calculator", route: "/battery/voltage-drop-calculator" },
        ],
      },
    ],
  },
  {
    id: "ieee-485",
    code: "IEEE Standard 485",
    authority: "IEEE",
    category: "Recommended Practice",
    edition: "IEEE 485-2020",
    title: "Recommended Practice for Sizing Lead-Acid & Stationary Storage Batteries",
    scope: "Provides recommended sizing methodology for stationary batteries, duty cycles, design margins, aging factors, temperature derating, and minimum voltage criteria.",
    context: "Voluntary electrical engineering recommended practice published by the Institute of Electrical and Electronics Engineers (IEEE).",
    color: "#10b981",
    clauses: [
      {
        clauseNumber: "Battery Sizing Framework",
        title: "Battery Usable Energy & Depth of Discharge Sizing Model",
        description: "Calculates net delivered energy from nominal amp-hour capacity factoring in allowable cycle depth, cell temperature, and end-of-life aging reserve based on stationary storage practice.",
        latexFormula: "E_{\\text{usable}} = V_{\\text{nominal}} \\times C_{\\text{Ah}} \\times \\text{DoD}_{\\text{max}} \\times \\eta_{\\text{Coulombic}} \\times K_{\\text{aging}}",
        enforcingCalculators: [
          { id: "battery-size", name: "Battery Size Calculator", route: "/battery/battery-size-calculator" },
          { id: "battery-runtime", name: "Battery Backup Runtime Calculator", route: "/battery/battery-runtime-calculator" },
          { id: "home-battery-size", name: "Home Battery Size Calculator", route: "/home-energy/home-battery-size-calculator" },
        ],
      },
      {
        clauseNumber: "Peukert Rate Kinetics",
        title: "Electrochemical High-Rate Discharge Derating (Peukert Reference)",
        description: "Empirical model describing capacity reduction when discharge current exceeds reference benchmark rates. Maintained as a separate electrochemical discharge reference.",
        latexFormula: "t = H \\times \\left(\\frac{C}{I \\times H}\\right)^k, \\quad C_{\\text{eff}} = I \\times t",
        enforcingCalculators: [
          { id: "battery-runtime", name: "Battery Backup Runtime Calculator", route: "/battery/battery-runtime-calculator" },
          { id: "battery-capacity", name: "Battery Capacity (Ah/kWh) Calculator", route: "/battery/battery-capacity-calculator" },
        ],
      },
    ],
  },
  {
    id: "nec-625",
    code: "NFPA 70 (NEC) Article 625 & Article 110",
    authority: "NEC",
    category: "Adopted Code",
    edition: "2023 National Electrical Code",
    title: "Electric Vehicle Power Transfer Systems (EVSE) & Terminal Ratings",
    scope: "Covers branch circuits, continuous load overcurrent protection, and conductor terminal limitations for EV charging equipment.",
    context: "Model electrical code adopted into law across state and municipal building jurisdictions.",
    color: "#8b5cf6",
    clauses: [
      {
        clauseNumber: "NEC 625.42",
        title: "Continuous Duty 125% Overcurrent Protection Sizing",
        description: "Classifies EV charging loads as continuous (operating for 3 hours or more), requiring branch circuit conductors and breakers to be sized at 125% of rated charger amperage.",
        latexFormula: "\\text{Breaker Ampacity} \\ge I_{\\text{continuous}} \\times 1.25",
        enforcingCalculators: [
          { id: "ev-breaker-size", name: "EV Charger Breaker Size Calculator", route: "/ev/ev-charger-breaker-size-calculator" },
          { id: "ev-charging-time", name: "EV Charging Time Calculator", route: "/ev/ev-charging-time-calculator" },
        ],
      },
      {
        clauseNumber: "NEC 110.14(C)",
        title: "Terminal Temperature Limitation & Conductor Derating",
        description: "Governs conductor temperature column selection based on equipment terminal ratings (60°C or 75°C per listing and conductor size) and applicable operating conditions.",
        latexFormula: "I_{\\text{allowable}} = I_{\\text{Table 310.16}} \\times K_{\\text{temp}} \\times K_{\\text{fill}}",
        enforcingCalculators: [
          { id: "ev-breaker-size", name: "EV Charger Breaker Size Calculator", route: "/ev/ev-charger-breaker-size-calculator" },
          { id: "voltage-drop", name: "Wire Voltage Drop Calculator", route: "/battery/voltage-drop-calculator" },
        ],
      },
    ],
  },
  {
    id: "nec-210-19",
    code: "NFPA 70 (NEC) Section 210.19",
    authority: "NEC",
    category: "Technical Reference",
    edition: "2023 National Electrical Code",
    title: "Conductor Sizing & Voltage Drop Guidance",
    scope: "Provides informational recommendations for branch-circuit and feeder voltage drop to promote operating efficiency and equipment performance.",
    context: "Informational Note No. 4 in NEC 210.19 provides engineering recommendations (not mandatory universal statutory limits).",
    color: "#0284c7",
    clauses: [
      {
        clauseNumber: "NEC 210.19 Informational Note 4",
        title: "Branch Circuit Voltage Drop Recommendation (3% / 5% Guidance)",
        description: "Informational Note recommending that branch-circuit voltage drop not exceed 3%, and total combined feeder plus branch drop not exceed 5% for reasonable operating efficiency.",
        latexFormula: "\\text{VD}\\% = \\frac{2 \\times K \\times I \\times L}{A_{\\text{cmil}} \\times V_{\\text{source}}} \\times 100 \\le 3.0\\% \\text{ (recommended)}",
        enforcingCalculators: [
          { id: "voltage-drop", name: "Wire Voltage Drop Calculator", route: "/battery/voltage-drop-calculator" },
          { id: "ev-breaker-size", name: "EV Charger Breaker Size Calculator", route: "/ev/ev-charger-breaker-size-calculator" },
        ],
      },
    ],
  },
  {
    id: "nema-mg1",
    code: "NEMA MG-1 & ISO 8528-5",
    authority: "NEMA",
    category: "Standard",
    edition: "NEMA MG-1-2021 / ISO 8528-5:2018",
    title: "Motor Inrush Starting Codes & Generator Transient Load Acceptance",
    scope: "NEMA MG-1 establishes Locked Rotor Amps (LRA) code letters for induction motor starting apparent power; ISO 8528-5 defines transient voltage dip recovery classes for generator sets.",
    context: "Voluntary engineering standards defining motor starting characteristics (NEMA) and reciprocating generator set performance (ISO).",
    color: "#059669",
    clauses: [
      {
        clauseNumber: "NEMA MG-1 Part 10.37",
        title: "Motor Locked Rotor Current Inrush Apparent Power & Starting Watts",
        description: "Calculates instantaneous starting apparent power (kVA) based on NEMA code letters (Code G: 5.6–6.29 kVA/HP). PowerLab converts apparent kVA to estimated starting watts using estimated power factor.",
        latexFormula: "S_{\\text{start}} = \\text{HP} \\times \\text{kVA/HP}_{\\text{code}}, \\quad P_{\\text{start, watts}} = S_{\\text{start}} \\times 1000 \\times \\text{PF}",
        enforcingCalculators: [
          { id: "generator-size", name: "Emergency Generator Sizing Calculator", route: "/home-energy/generator-size-calculator" },
          { id: "inverter-size", name: "Inverter Sizing Calculator", route: "/battery/inverter-size-calculator" },
        ],
      },
    ],
  },
  {
    id: "ahri-210-240",
    code: "AHRI Standard 210/240 & ASHRAE 90.1",
    authority: "AHRI",
    category: "Standard",
    edition: "2023 Performance Rating Standard",
    title: "Unitary Air-Conditioning & Air-Source Heat Pump Performance Ratings",
    scope: "Establishes laboratory test procedures and seasonal efficiency metrics (SEER2, EER2, HSPF2) under DOE Appendix M1 external static pressure baselines.",
    context: "Industry rating standards referenced by the US Department of Energy (10 CFR Part 430) for equipment efficiency compliance.",
    color: "#0ea5e9",
    clauses: [
      {
        clauseNumber: "Seasonal Energy Consumption Model",
        title: "Seasonal Efficiency & Average Energy Consumption Estimation",
        description: "SEER2 measures seasonal cooling efficiency over standard temperature bins. PowerLab uses SEER2 as an engineering index to estimate average seasonal electrical consumption and operating costs, not instantaneous compressor draw.",
        latexFormula: "P_{\\text{avg, watts}} \\approx \\frac{\\text{Cooling Capacity (BTU/h)}}{\\text{SEER2}}, \\quad \\text{Daily kWh} \\approx \\frac{P_{\\text{avg}} \\times \\text{DutyCycle} \\times \\text{Hours}}{1000}",
        enforcingCalculators: [
          { id: "ac-cost", name: "Air Conditioner Cost Calculator", route: "/home-energy/air-conditioner-cost-calculator" },
          { id: "heat-pump-cost", name: "Heat Pump Cost Calculator", route: "/home-energy/heat-pump-cost-calculator" },
        ],
      },
    ],
  },
];
