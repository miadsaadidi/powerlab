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
  | "DOE";

export interface StandardRef {
  code: string;
  authority: StandardAuthority;
  title: string;
  clauseId?: string;
  clauseSummary?: string;
}

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
  edition: string;
  title: string;
  scope: string;
  regulatoryAuthority: string;
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
    { code: "IEC 62619", authority: "UL", title: "Secondary Lithium Cells & Batteries Industrial Safety", clauseId: "iec-62619" },
  ],
  "battery-charging-time": [
    { code: "IEEE 2030.2.1", authority: "IEEE", title: "Design & Integration of Battery Energy Storage Systems", clauseId: "ieee-2030" },
    { code: "CC/CV Protocol", authority: "IEEE", title: "Constant Current / Constant Voltage Charging Curves", clauseId: "cc-cv" },
  ],
  "home-battery-size": [
    { code: "NFPA 855", authority: "UL", title: "Standard for the Installation of Stationary ESS", clauseId: "nfpa-855" },
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
    { code: "IEC 61215", authority: "UL", title: "Terrestrial Photovoltaic (PV) Module Design Qualification", clauseId: "iec-61215" },
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
    { code: "IEC 62109-1", authority: "UL", title: "Safety of Power Converters for Use in Photovoltaic Systems", clauseId: "iec-62109" },
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
    { code: "IEC 62301", authority: "UL", title: "Household Electrical Appliances Measurement of Standby Power", clauseId: "iec-62301" },
  ],
  "voltage-drop": [
    { code: "NEC 210.19", authority: "NEC", title: "Informational Note No. 4: 3% Branch Circuit Voltage Drop", clauseId: "nec-210-19" },
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
    edition: "Version 8 (2024–2026 Engine)",
    title: "Photovoltaic System Performance & Physical Loss Modeling",
    scope: "Defines empirical solar insolation transposition, plane-of-array irradiance, cell temperature NOCT adjustment, and comprehensive 14.08% default system loss derating.",
    regulatoryAuthority: "National Renewable Energy Laboratory (NREL) and US Department of Energy (DOE) benchmark for solar production estimates.",
    color: "#f59e0b",
    clauses: [
      {
        clauseNumber: "Section 2.1",
        title: "Plane-of-Array (POA) Beam & Diffuse Irradiance Transposition",
        description: "Models incident radiation on tilted surfaces combining direct normal irradiance (DNI), diffuse horizontal irradiance (DHI), and ground albedo reflection.",
        latexFormula: "I_{\\text{poa}} = I_{\\text{beam}} \\cos(\\theta) + I_{\\text{sky diffuse}} + I_{\\text{ground diffuse}} \\times \\left(\\frac{1 - \\cos(\\beta)}{2}\\right) \\times \\rho_{\\text{albedo}}",
        enforcingCalculators: [
          { id: "solar-panel-output", name: "Solar Panel Output Calculator", route: "/solar/solar-panel-output-calculator" },
          { id: "solar-panel-tilt", name: "Solar Panel Tilt Calculator", route: "/solar/solar-panel-tilt-calculator" },
        ],
      },
      {
        clauseNumber: "Section 3.4",
        title: "Cell Temperature NOCT Thermal Voltage Degradation",
        description: "Calculates instantaneous solar cell temperature based on ambient temperature, wind velocity, and Nominal Operating Cell Temperature (NOCT).",
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
    edition: "2023 National Electrical Code",
    title: "Solar Photovoltaic (PV) Systems Safety & Sizing",
    scope: "Prescribes mandatory safety factors for conductor ampacity, string maximum voltage calculations, overcurrent protection, and rapid shutdown requirements for PV systems.",
    regulatoryAuthority: "Enacted into law across state and municipal building codes in the United States and international jurisdictions.",
    color: "#d97706",
    clauses: [
      {
        clauseNumber: "Section 690.7(A)",
        title: "Sub-Zero Open-Circuit Voltage (Voc) Temperature Correction",
        description: "Mandates adjusting the module manufacturer's rated Voc using lowest expected ambient temperature to prevent destroying inverters and charge controllers.",
        latexFormula: "V_{\\text{max}} = N_{\\text{series}} \\times V_{oc} \\times \\left[1 + \\left(\\frac{\\gamma_{Voc}}{100}\\right) \\times (T_{\\text{min}} - 25^\\circ\\text{C})\\right]",
        enforcingCalculators: [
          { id: "solar-charge-controller", name: "Solar Charge Controller Calculator", route: "/solar/solar-charge-controller-calculator" },
          { id: "solar-panel-size", name: "Solar Panel Size Calculator", route: "/solar/solar-panel-size-calculator" },
        ],
      },
      {
        clauseNumber: "Section 690.8(B)",
        title: "Continuous Duty Current Multipliers for PV Circuits",
        description: "Requires sizing circuit conductors and overcurrent protective devices (OCPD) to carry a minimum of 125% of the continuous rated solar maximum power amperage.",
        latexFormula: "I_{\\text{design}} = I_{\\text{sc}} \\times 1.25 \\times 1.25 = 1.56 \\times I_{\\text{sc}}",
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
    edition: "IEEE 485-2020",
    title: "Recommended Practice for Sizing Lead-Acid & Stationary Storage Batteries",
    scope: "Provides standard engineering formulations for defining battery capacity, design margins, aging factors, temperature derating, and minimum voltage limits under dynamic load cycles.",
    regulatoryAuthority: "The global electrical engineering benchmark cited by utilities, data centers, and off-grid microgrid installations.",
    color: "#10b981",
    clauses: [
      {
        clauseNumber: "Clause 6.2",
        title: "Battery Usable Energy & Depth of Discharge (DoD) Derating",
        description: "Calculates net delivered energy from nominal amp-hour capacity factoring in allowable cycle depth, cell temperature, and end-of-life aging reserve.",
        latexFormula: "E_{\\text{usable}} = V_{\\text{nominal}} \\times C_{\\text{Ah}} \\times \\text{DoD}_{\\text{max}} \\times \\eta_{\\text{Coulombic}} \\times K_{\\text{aging}}",
        enforcingCalculators: [
          { id: "battery-size", name: "Battery Size Calculator", route: "/battery/battery-size-calculator" },
          { id: "battery-runtime", name: "Battery Backup Runtime Calculator", route: "/battery/battery-runtime-calculator" },
          { id: "home-battery-size", name: "Home Battery Size Calculator", route: "/home-energy/home-battery-size-calculator" },
        ],
      },
      {
        clauseNumber: "Clause 7.1",
        title: "Peukert Electrochemical Capacity Derating Kinetics",
        description: "Adjusts available battery capacity when discharge rates exceed the standard 20-hour (C/20) manufacturer benchmark rating.",
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
    code: "NFPA 70 (NEC) Article 625",
    authority: "NEC",
    edition: "2023 National Electrical Code",
    title: "Electric Vehicle Power Transfer Systems (EVSE)",
    scope: "Covers electrical branch circuits, feeder conductors, breaker sizing, and disconnect requirements for Level 1, Level 2, and DC fast-charging installations.",
    regulatoryAuthority: "Mandatory statutory compliance required by local electrical inspectors (AHJ) for residential and commercial EV charger installations.",
    color: "#8b5cf6",
    clauses: [
      {
        clauseNumber: "Section 625.42",
        title: "Continuous Duty 125% Overcurrent Protection Sizing",
        description: "Classifies EV charging loads as continuous (operating for 3 hours or more), requiring branch circuit conductors and breakers to be sized at 125% of rated charger amperage.",
        latexFormula: "\\text{Breaker Ampacity} \\ge I_{\\text{charger}} \\times 1.25",
        enforcingCalculators: [
          { id: "ev-breaker-size", name: "EV Charger Breaker Size Calculator", route: "/ev/ev-charger-breaker-size-calculator" },
          { id: "ev-charging-time", name: "EV Charging Time Calculator", route: "/ev/ev-charging-time-calculator" },
        ],
      },
      {
        clauseNumber: "Section 110.14(C)",
        title: "Terminal Temperature Limitation & Conductor Derating",
        description: "Restricts allowable wire ampacity based on terminal ratings (60°C for circuits under 100A vs 75°C standard equipment terminals).",
        latexFormula: "I_{\\text{allowable}} = I_{\\text{Table 310.16}} \\times K_{\\text{ambient}} \\times K_{\\text{conduit fill}}",
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
    edition: "2023 National Electrical Code",
    title: "Conductor Sizing & Permissible Voltage Drop",
    scope: "Recommends maximum voltage drop limits across branch circuits and feeders to ensure electrical equipment efficiency, thermal safety, and proper motor operation.",
    regulatoryAuthority: "Industry standard referenced in NEC Informational Note No. 4 and enforced in many jurisdictional commercial building energy codes.",
    color: "#0284c7",
    clauses: [
      {
        clauseNumber: "Informational Note 4",
        title: "3% Maximum Branch Circuit Voltage Drop Criterion",
        description: "Recommends that total voltage drop on branch-circuit conductors not exceed 3%, and total combined feeder + branch drop not exceed 5%.",
        latexFormula: "\\text{VD}\\% = \\frac{2 \\times K \\times I \\times L}{A_{\\text{cmil}} \\times V_{\\text{source}}} \\times 100 \\le 3.0\\%",
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
    edition: "NEMA MG-1-2021 / ISO 8528-5:2018",
    title: "Motors, Generators, and Standby Generating Sets Load Acceptance",
    scope: "Establishes Locked Rotor Amps (LRA) code letter multipliers (A through V) for inductive electric motor startup inrush, and engine-generator transient voltage dip recovery.",
    regulatoryAuthority: "The international benchmark for emergency electrical sizing, transfer switch ratings, and generator capacity verification.",
    color: "#059669",
    clauses: [
      {
        clauseNumber: "Part 10.37",
        title: "Motor Locked Rotor Current Inrush (LRA Multipliers)",
        description: "Calculates instantaneous starting kVA based on NEMA code letters (Code G: 5.6–6.29 kVA/HP) for compressors, heat pumps, and well pumps.",
        latexFormula: "\\text{Starting Watts} = \\text{HP} \\times \\text{kVA/HP}_{\\text{code}} \\times 1000 \\times \\text{PF}",
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
    edition: "2023 Standard (SEER2 / HSPF2 / EER2)",
    title: "Unitary Air-Conditioning & Air-Source Heat Pump Equipment Performance",
    scope: "Prescribes seasonal energy efficiency rating metrics under M1 test procedures (with elevated 0.50 in. w.g. external static pressure) to calculate hourly kWh cooling costs.",
    regulatoryAuthority: "Mandated by the US Department of Energy (10 CFR Part 430) for all residential cooling and heat pump equipment sold in the United States.",
    color: "#0ea5e9",
    clauses: [
      {
        clauseNumber: "Section 6.1",
        title: "SEER2 to Running Electrical Wattage Conversion",
        description: "Calculates hourly electrical consumption by dividing cooling capacity (BTU/h) by the seasonal efficiency rating under typical operating temperature bins.",
        latexFormula: "P_{\\text{watts}} = \\frac{\\text{Cooling Capacity (BTU/h)}}{\\text{SEER2}}, \\quad \\text{Daily kWh} = \\frac{P_{\\text{watts}} \\times \\text{DutyCycle} \\times \\text{Hours}}{1000}",
        enforcingCalculators: [
          { id: "ac-cost", name: "Air Conditioner Cost Calculator", route: "/home-energy/air-conditioner-cost-calculator" },
          { id: "heat-pump-cost", name: "Heat Pump Cost Calculator", route: "/home-energy/heat-pump-cost-calculator" },
        ],
      },
    ],
  },
];
