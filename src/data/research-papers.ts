export interface ResearchPaperEquation {
  name: string;
  latex: string;
  description: string;
}

export interface RelatedLink {
  name: string;
  route: string;
}

export interface ResearchPaper {
  id: string;
  slug: string;
  reportNumber: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  abstract: string;
  authors: string[];
  institution: string;
  datePublished: string;
  dateModified: string;
  doi?: string;
  pdfUrl: string;
  htmlUrl?: string;
  dataverseUrl?: string;
  academiaUrl?: string;
  datasetStatus?: "published" | "accession_pending" | "none";
  datasetRepository?: string;
  category: "Electric Vehicles" | "Home Energy" | "Solar Photovoltaics" | "Battery Storage";
  categorySlug: "ev" | "home-energy" | "solar" | "battery";
  keywords: string[];
  standards: string[];
  keyFindings: string[];
  equations: ResearchPaperEquation[];
  relatedCalculators: RelatedLink[];
  relatedGuides: RelatedLink[];
  bibtex: string;
  apaCitation: string;
  ieeeCitation: string;
}

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "PL-TR-2026-EVSE01",
    slug: "continuous-duty-thermal-sizing-evse-ampacity",
    reportNumber: "PL-TR-2026-EVSE01",
    title: "Continuous-Duty Thermal Sizing, Conductor Terminal Limits, and Branch Circuit Ampacity Requirements for Residential Level 2 EVSE",
    shortTitle: "Level 2 EVSE Thermal Sizing & Ampacity",
    metaDescription: "Mathematical and code analysis of continuous-load thermal mechanics and conductor terminal ampacity derating for residential Level 2 EVSE under NEC 625.",
    abstract: "A rigorous mathematical and code-compliance analysis of continuous-load thermal mechanics in residential Level 2 Electric Vehicle Supply Equipment (EVSE). Evaluates the 125% continuous duty multiplier under NFPA 70 (NEC Article 625.42), terminal temperature ratings under NEC 110.14(C) (60°C vs 75°C limits), conductor ampacity derating adjustments under NEC Table 310.16, and Joule heating dynamics (I²R) in residential enclosures.",
    authors: ["PowerLab Clean Energy Engineering Group"],
    institution: "PowerLab Open Energy Research",
    datePublished: "2026-08-26",
    dateModified: "2026-09-06",
    doi: "10.6084/m9.figshare.33321774",
    pdfUrl: "/whitepapers/evse-continuous-duty-thermal-sizing.pdf",
    academiaUrl: "https://www.academia.edu/173621969/Continuous_Duty_Thermal_Sizing_Conductor_Terminal_Limits_and_Branch_Circuit_Ampacity_Requirements_for_Residential_Level_2_Electric_Vehicle_Supply_Equipment_EVSE_",
    datasetStatus: "published",
    datasetRepository: "Figshare",
    category: "Electric Vehicles",
    categorySlug: "ev",
    keywords: [
      "Level 2 EVSE",
      "NEC Article 625",
      "continuous load sizing",
      "conductor ampacity",
      "NEC 110.14(C) terminal limits",
      "EV charger breaker sizing",
      "thermal dissipation"
    ],
    standards: [
      "NFPA 70 / NEC Article 625 (Electric Vehicle Power Transfer Systems)",
      "NFPA 70 / NEC Section 110.14(C) (Temperature Limitations of Terminations)",
      "NFPA 70 / NEC Table 310.16 (Allowable Ampacities of Insulated Conductors)",
      "SAE J1772 / SAE J3400 (NACS Charging Standard)",
      "UL 2594 (Electric Vehicle Supply Equipment)",
    ],
    keyFindings: [
      "Operating a 48A continuous EVSE requires a minimum 60A breaker and 6 AWG copper (rated 65A at 75°C) to satisfy NEC 625.42 125% continuous rule.",
      "Romex NM-B cable is strictly limited to 60°C column ampacity (NEC 334.80), capping 6 AWG NM-B at 55A—making it code-illegal for 48A charging. THHN in conduit (75°C terminal rating) must be used instead.",
      "Terminal connection torque deficiency increases contact resistance Rc, elevating local terminal operating temperature past the 75°C thermal destruction boundary.",
    ],
    equations: [
      {
        name: "NEC Continuous Load Sizing Rule",
        latex: "I_{\\text{breaker}} \\ge I_{\\text{continuous}} \\times 1.25",
        description: "Requires minimum overcurrent protective device rating to equal 125% of maximum continuous nameplate charging current.",
      },
      {
        name: "Conductor Terminal Resistive Power Dissipation",
        latex: "P_{\\text{loss}} = I^2 \\times R_{\\text{conductor}} = I^2 \\times \\left( \\frac{2 \\cdot K \\cdot L}{\\text{Cmil}} \\right)",
        description: "Calculates total thermal watts dissipated as heat along the conductor run and terminal lugs under steady-state continuous draw.",
      },
    ],
    relatedCalculators: [
      { name: "EV Charger Breaker Size Calculator", route: "/ev/ev-charger-breaker-size-calculator" },
      { name: "EV Charging Time Calculator", route: "/ev/ev-charging-time-calculator" },
      { name: "Voltage Drop & Wire Size Calculator", route: "/battery/voltage-drop-calculator" },
    ],
    relatedGuides: [
      { name: "Level 2 EV Charging Speed & Breaker Sizing Guide", route: "/guides/level-2-ev-charging-speed-and-breaker-sizing-guide" },
      { name: "Voltage Drop & Wire Size Calculation Guide", route: "/guides/voltage-drop-and-wire-size-calculation-guide" },
    ],
    bibtex: `@techreport{powerlab_2026_evse_thermal,
  author      = {{PowerLab Clean Energy Engineering Group}},
  title       = {Continuous-Duty Thermal Sizing, Conductor Terminal Limits, and Branch Circuit Ampacity Requirements for Residential Level 2 EVSE},
  institution = {PowerLab Open Energy Research},
  year        = {2026},
  number      = {PL-TR-2026-EVSE01},
  url         = {https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity}
}`,
    apaCitation: "PowerLab Clean Energy Engineering Group. (2026). Continuous-Duty Thermal Sizing, Conductor Terminal Limits, and Branch Circuit Ampacity Requirements for Residential Level 2 EVSE (Technical Report No. PL-TR-2026-EVSE01). PowerLab Open Energy Research. https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity",
    ieeeCitation: "PowerLab Clean Energy Engineering Group, \"Continuous-Duty Thermal Sizing, Conductor Terminal Limits, and Branch Circuit Ampacity Requirements for Residential Level 2 EVSE,\" PowerLab Open Energy Research, Tech. Rep. PL-TR-2026-EVSE01, 2026.",
  },
  {
    id: "PL-TR-2026-HVAC01",
    slug: "heat-pump-cop-degradation-and-auxiliary-heat-kinetics",
    reportNumber: "PL-TR-2026-HVAC01",
    title: "Thermal Degradation Kinetics, Auxiliary Electric Resistance Staging, and Seasonal HSPF2/COP Derating in Cold-Climate Air-Source Heat Pumps",
    shortTitle: "Heat Pump COP Degradation & Aux Heat",
    metaDescription: "Thermodynamic evaluation of air-source heat pump COP derating across sub-freezing spectra and electric resistance auxiliary strip heat staging kinetics.",
    abstract: "A thermodynamic evaluation of air-source heat pump (ASHP) performance across sub-freezing ambient temperature spectra (-20°C to +10°C). Models vapor-compression Carnot limits, refrigeration enthalpy drops, coefficient of performance (COP) nonlinear decline, defrost cycle parasitic consumption, and the financial impact of staging auxiliary electric resistance elements (strip heat) versus dual-fuel natural gas systems.",
    authors: ["PowerLab Clean Energy Engineering Group"],
    institution: "PowerLab Open Energy Research",
    datePublished: "2026-08-28",
    dateModified: "2026-09-06",
    pdfUrl: "/whitepapers/heat-pump-cop-degradation-auxiliary-heat.pdf",
    htmlUrl: "/whitepapers/heat-pump-cop-degradation-auxiliary-heat.html",
    doi: "10.6084/m9.figshare.33470950",
    academiaUrl: "https://www.academia.edu/172873251/Non_Linear_Coefficient_of_Performance_COP_Degradation_Defrost_Entropy_Losses_and_Auxiliary_Resistive_Staging_Dynamics_in_Cold_Climate_Air_Source_Heat_Pumps_ccASHP_",
    datasetStatus: "published",
    datasetRepository: "Figshare",
    category: "Home Energy",
    categorySlug: "home-energy",
    keywords: [
      "air-source heat pump",
      "COP degradation",
      "HSPF2 test standard M1",
      "auxiliary resistance heat",
      "balance point temperature",
      "AHRI 210/240",
      "Carnot refrigeration cycle"
    ],
    standards: [
      "AHRI Standard 210/240-2023 (Performance Rating of Unitary Air-Conditioning & Heat Pumps)",
      "ASHRAE Standard 90.1 (Energy Standard for Buildings)",
      "U.S. Department of Energy 10 CFR Part 430 Appendix M1",
      "ISO 5151 (Non-Ducted Air Conditioners and Heat Pumps)",
    ],
    keyFindings: [
      "At 47°F (8.3°C), modern inverter cold-climate heat pumps operate at COP 3.4 to 4.1. At -5°F (-20.5°C), COP derates to 1.7 to 2.1 while capacity drops by 35% to 45%.",
      "Engaging 10 kW auxiliary strip heat (COP 1.0) below the thermal balance point increases electrical power demand by 300% to 400%, multiplying hourly heating costs.",
      "Variable-speed flash-injection vapor scroll compressors maintain 78% of rated thermal capacity down to 5°F without engaging resistance backup.",
    ],
    equations: [
      {
        name: "Theoretical Carnot COP Maximum",
        latex: "\\text{COP}_{\\text{Carnot}} = \\frac{T_{\\text{indoor}}}{T_{\\text{indoor}} - T_{\\text{outdoor}}}",
        description: "Upper theoretical limit of heat pump coefficient of performance based on absolute Kelvin temperatures.",
      },
      {
        name: "Electric Strip Heat Blended Operating Cost",
        latex: "\\text{Cost}_{\\text{hr}} = \\left[ \\left(\\frac{Q_{\\text{HP}}}{\\text{COP}_{T} \\times 3412}\\right) + P_{\\text{aux}} \\right] \\times R_{\\text{kWh}}",
        description: "Calculates total hourly operating expense when heat pump compressor and auxiliary electric resistance coils run simultaneously.",
      },
    ],
    relatedCalculators: [
      { name: "Heat Pump Running Cost Calculator", route: "/home-energy/heat-pump-cost-calculator" },
      { name: "Air Conditioner Running Cost Calculator", route: "/home-energy/air-conditioner-cost-calculator" },
      { name: "Electricity Usage Calculator", route: "/home-energy/electricity-usage-calculator" },
    ],
    relatedGuides: [
      { name: "Central AC & Heat Pump Electricity Cost Guide", route: "/guides/central-ac-and-heat-pump-electricity-cost-guide" },
      { name: "How Many kWh Does a House Use Per Day?", route: "/guides/how-many-kwh-does-a-house-use-per-day" },
    ],
    bibtex: `@techreport{powerlab_2026_heatpump_cop,
  author      = {{PowerLab Clean Energy Engineering Group}},
  title       = {Thermal Degradation Kinetics, Auxiliary Electric Resistance Staging, and Seasonal HSPF2/COP Derating in Cold-Climate Air-Source Heat Pumps},
  institution = {PowerLab Open Energy Research},
  year        = {2026},
  number      = {PL-TR-2026-HVAC01},
  url         = {https://www.powelab.org/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics}
}`,
    apaCitation: "PowerLab Clean Energy Engineering Group. (2026). Thermal Degradation Kinetics, Auxiliary Electric Resistance Staging, and Seasonal HSPF2/COP Derating in Cold-Climate Air-Source Heat Pumps (Technical Report No. PL-TR-2026-HVAC01). PowerLab Open Energy Research. https://www.powelab.org/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics",
    ieeeCitation: "PowerLab Clean Energy Engineering Group, \"Thermal Degradation Kinetics, Auxiliary Electric Resistance Staging, and Seasonal HSPF2/COP Derating in Cold-Climate Air-Source Heat Pumps,\" PowerLab Open Energy Research, Tech. Rep. PL-TR-2026-HVAC01, 2026.",
  },
  {
    id: "PL-TR-2026-GEN02",
    slug: "deterministic-inrush-load-stacking-generator-sizing",
    reportNumber: "PL-TR-2026-GEN02",
    title: "Deterministic Modeling of Inductive Motor Inrush Currents and Non-Coincident Load Stacking for Residential Backup Power Systems",
    shortTitle: "Motor Inrush Surge & Generator Sizing",
    metaDescription: "Deterministic load sizing framework for residential standby generators modeling inductive motor starting LRA surges, voltage dips, and fuel derating.",
    abstract: "Presents a deterministic load sizing framework for emergency residential generators under NEC Article 702 and ISO 8528-5. Investigates transient sub-transient reactance (X''d), Locked Rotor Amperage (LRA) voltage dip envelopes during inductive motor starts (compressors, well pumps, sump pumps), sequential soft-starting step curves, and fuel-type derating factors (Gasoline vs Propane vs Natural Gas).",
    authors: ["PowerLab Clean Energy Engineering Group"],
    institution: "PowerLab Open Energy Research",
    datePublished: "2026-08-27",
    dateModified: "2026-08-27",
    pdfUrl: "/whitepapers/deterministic-inrush-load-stacking-generator-sizing.pdf",
    academiaUrl: "https://www.academia.edu/172416009/Deterministic_Modeling_of_Inductive_Motor_Inrush_Currents_and_Non_Coincident_Load_Stacking_for_Residential_Backup_Power_Systems",
    datasetStatus: "accession_pending",
    datasetRepository: "Harvard Dataverse",
    category: "Home Energy",
    categorySlug: "home-energy",
    keywords: [
      "generator sizing",
      "Locked Rotor Amperage (LRA)",
      "motor inrush current",
      "NEC 702 optional standby",
      "voltage dip envelope",
      "fuel derating factor",
      "NEMA MG-1"
    ],
    standards: [
      "NFPA 70 / NEC Article 702 (Optional Standby Systems)",
      "NEMA MG-1 (Motors and Generators - Locked Rotor KVA/HP Codes)",
      "ISO 8528-5 (Reciprocating Internal Combustion Engine Driven Alternators)",
      "IEEE Standard 446 (Orange Book - Emergency & Standby Power)",
    ],
    keyFindings: [
      "Single-phase induction motor compressors demand 4.5× to 7.0× Full Load Amperage (FLA) during across-the-line starting (0.1s to 0.4s), requiring generator alternator sub-transient kVA headroom to avoid under-frequency collapse.",
      "Installing micro-controller soft starters reduces LRA surge current by 65% to 70%, allowing a 4-ton AC (LRA 82A) to start smoothly on an 8.5 kW generator instead of requiring a 16 kW unit.",
      "Derating for fuel type (LPG: 10% loss, Natural Gas: 20% loss vs Gasoline) and altitude (3.5% per 1,000 ft) must be compounding factors in baseline sizing.",
    ],
    equations: [
      {
        name: "Locked Rotor Inrush Apparent Power",
        latex: "S_{\\text{inrush}} = V_{\\text{line}} \\times I_{\\text{LRA}} = V_{\\text{line}} \\times (\\text{FLA} \\times k_{\\text{code}})",
        description: "Calculates instantaneous peak apparent volt-amperes required to break motor rotor inertia during initial energization.",
      },
      {
        name: "Non-Coincident Load Stacking Sizing Requirement",
        latex: "P_{\\text{gen}} \\ge \\left( \\sum P_{\\text{running}} + \\max(P_{\\text{starting}} - P_{\\text{running}}) \\right) \\times f_{\\text{fuel}} \\times f_{\\text{alt}}",
        description: "Deterministic formula sizing total generator wattage for steady-state continuous loads plus the single largest simultaneous motor starting surge.",
      },
    ],
    relatedCalculators: [
      { name: "Emergency Generator Sizing Calculator", route: "/home-energy/generator-size-calculator" },
      { name: "Inverter Size Calculator", route: "/battery/inverter-size-calculator" },
      { name: "Appliance Wattage Calculator", route: "/home-energy/appliance-wattage-calculator" },
    ],
    relatedGuides: [
      { name: "Emergency Generator Sizing & Inrush Load Guide", route: "/guides/emergency-generator-sizing-and-inrush-load-guide" },
      { name: "Voltage Drop & Wire Size Calculation Guide", route: "/guides/voltage-drop-and-wire-size-calculation-guide" },
    ],
    bibtex: `@techreport{powerlab_2026_generator_inrush,
  author      = {{PowerLab Clean Energy Engineering Group}},
  title       = {Deterministic Modeling of Inductive Motor Inrush Currents and Non-Coincident Load Stacking for Residential Backup Power Systems},
  institution = {PowerLab Open Energy Research},
  year        = {2026},
  number      = {PL-TR-2026-GEN02},
  url         = {https://www.powelab.org/research/deterministic-inrush-load-stacking-generator-sizing}
}`,
    apaCitation: "PowerLab Clean Energy Engineering Group. (2026). Deterministic Modeling of Inductive Motor Inrush Currents and Non-Coincident Load Stacking for Residential Backup Power Systems (Technical Report No. PL-TR-2026-GEN02). PowerLab Open Energy Research. https://www.powelab.org/research/deterministic-inrush-load-stacking-generator-sizing",
    ieeeCitation: "PowerLab Clean Energy Engineering Group, \"Deterministic Modeling of Inductive Motor Inrush Currents and Non-Coincident Load Stacking for Residential Backup Power Systems,\" PowerLab Open Energy Research, Tech. Rep. PL-TR-2026-GEN02, 2026.",
  },
  {
    id: "PL-TR-2026-SOL03",
    slug: "ground-view-factor-snow-albedo-pv-tilt",
    reportNumber: "PL-TR-2026-SOL03",
    title: "Ground View Factor Transposition, Snow Albedo Dynamics, and Sub-Zero Open-Circuit Voltage Expansion in Photovoltaic Arrays",
    shortTitle: "PV Ground Albedo & Cold-Weather Voc",
    metaDescription: "Transposition modeling of ground-reflected snow albedo and sub-zero open-circuit voltage (Voc) expansion in photovoltaic arrays under NEC 690.7.",
    abstract: "Examines anisotropic sky diffuse and ground-reflected albedo transposition models (Perez & Hay-Davies) across seasonal solar panel tilt configurations. Quantifies high-latitude snow albedo capture enhancements (+25% to +40% diffuse boost), sub-zero temperature coefficient open-circuit voltage expansion (NEC 690.7), and string inverter maximum DC input voltage limits.",
    authors: ["PowerLab Clean Energy Engineering Group"],
    institution: "PowerLab Open Energy Research",
    datePublished: "2026-08-30",
    dateModified: "2026-08-30",
    pdfUrl: "/whitepapers/ground-view-factor-snow-albedo-pv-tilt.pdf",
    htmlUrl: "/whitepapers/ground-view-factor-snow-albedo-pv-tilt.html",
    academiaUrl: "https://www.academia.edu/175217881/Ground_View_Factor_Transposition_Snow_Albedo_Dynamics_and_Sub_Zero_Open_Circuit_Voltage_Expansion_in_Photovoltaic_Arrays",
    datasetStatus: "accession_pending",
    datasetRepository: "Harvard Dataverse",
    category: "Solar Photovoltaics",
    categorySlug: "solar",
    keywords: [
      "solar panel tilt",
      "snow albedo transposition",
      "Perez anisotropic model",
      "sub-zero Voc expansion",
      "NEC 690.7 cold temperature voltage",
      "MPPT charge controller sizing"
    ],
    standards: [
      "NFPA 70 / NEC Article 690.7 (Maximum Voltage Calculation)",
      "IEC 61724-1 (Photovoltaic System Performance Monitoring)",
      "NREL PVWatts V8 (Solar Resource Physical Algorithm)",
      "ASHRAE Climatic Design Conditions (Extreme Minimum Dry Bulb)",
    ],
    keyFindings: [
      "Steep winter panel tilt angles (Latitude + 15°) increase the ground view factor (1 - cos β)/2, capturing up to 40% additional reflected diffuse energy when ground is snow-covered (albedo ρ = 0.65–0.80).",
      "Open-circuit voltage expands linearly at colder temperatures (typical -0.26%/°C to -0.30%/°C). At -20°C ambient, a 48V array Voc rises by +12.5%, destroying MPPT charge controllers lacking adequate voltage headroom.",
      "Optimal annual energy yield occurs at Tilt = Latitude × 0.87, whereas optimal winter self-reliance requires Tilt = Latitude + 15° to prevent snow accumulation and maximize low-angle solar incidence.",
    ],
    equations: [
      {
        name: "NEC 690.7 Sub-Zero Maximum Voc Calculation",
        latex: "V_{\\text{max}} = V_{\\text{oc,STC}} \\times \\left[ 1 + \\alpha_{\\text{Voc}} \\times (T_{\\text{min}} - 25^\\circ\\text{C}) \\right] \\times N_{\\text{series}}",
        description: "Determines the absolute peak DC string voltage at lowest historical ambient temperature under NEC 690.7.",
      },
      {
        name: "Ground-Reflected Irradiance Transposition",
        latex: "I_{\\text{ground}} = I_{\\text{global,horiz}} \\times \\rho_{\\text{albedo}} \\times \\left( \\frac{1 - \\cos \\beta}{2} \\right)",
        description: "Calculates reflected diffuse radiation arriving at tilted panel surface as a function of ground albedo and tilt angle β.",
      },
    ],
    relatedCalculators: [
      { name: "Solar Panel Tilt Calculator", route: "/solar/solar-panel-tilt-calculator" },
      { name: "Solar Panel Output Calculator", route: "/solar/solar-panel-output-calculator" },
      { name: "Solar Charge Controller Calculator", route: "/solar/solar-charge-controller-calculator" },
      { name: "Solar Payback Calculator", route: "/solar/solar-payback-calculator" },
    ],
    relatedGuides: [
      { name: "Solar Panel Tilt Angle by Latitude & Season Guide", route: "/guides/solar-panel-tilt-angle-by-latitude-and-season-guide" },
      { name: "MPPT vs PWM Solar Charge Controller Sizing Guide", route: "/guides/mppt-solar-charge-controller-sizing-guide" },
      { name: "Solar Payback Period & ROI Calculation Guide", route: "/guides/solar-payback-and-roi-calculation-guide" },
    ],
    bibtex: `@techreport{powerlab_2026_pv_albedo_tilt,
  author      = {{PowerLab Clean Energy Engineering Group}},
  title       = {Ground View Factor Transposition, Snow Albedo Dynamics, and Sub-Zero Open-Circuit Voltage Expansion in Photovoltaic Arrays},
  institution = {PowerLab Open Energy Research},
  year        = {2026},
  number      = {PL-TR-2026-SOL03},
  url         = {https://www.powelab.org/research/ground-view-factor-snow-albedo-pv-tilt}
}`,
    apaCitation: "PowerLab Clean Energy Engineering Group. (2026). Ground View Factor Transposition, Snow Albedo Dynamics, and Sub-Zero Open-Circuit Voltage Expansion in Photovoltaic Arrays (Technical Report No. PL-TR-2026-SOL03). PowerLab Open Energy Research. https://www.powelab.org/research/ground-view-factor-snow-albedo-pv-tilt",
    ieeeCitation: "PowerLab Clean Energy Engineering Group, \"Ground View Factor Transposition, Snow Albedo Dynamics, and Sub-Zero Open-Circuit Voltage Expansion in Photovoltaic Arrays,\" PowerLab Open Energy Research, Tech. Rep. PL-TR-2026-SOL03, 2026.",
  },
  {
    id: "PL-TR-2026-BESS01",
    slug: "electrochemical-peukert-derating-bess",
    reportNumber: "PL-TR-2026-BESS01",
    title: "Electrochemical Peukert Capacity Derating, Depth of Discharge Boundaries, and Parasitic Inverter Tare Losses in Stationary Battery Energy Storage Systems",
    shortTitle: "BESS Peukert Derating & Tare Losses",
    metaDescription: "Electrochemical and power electronics modeling of Peukert capacity derating across discharge C-rates and continuous inverter tare losses under IEEE 485.",
    abstract: "A deterministic mathematical and thermodynamic framework evaluating non-linear electrochemical rate kinetics and power electronics losses in stationary battery storage. Formulates Peukert capacity derating across varying C-rates (comparing lead-acid k=1.15–1.30 vs. LiFePO4 k=1.05), usable depth of discharge (DoD) operational boundaries, and continuous quiescent inverter tare power consumption (Ptare=15W–65W) during extended emergency backup scenarios.",
    authors: ["PowerLab Clean Energy Engineering Group"],
    institution: "PowerLab Open Energy Research",
    datePublished: "2026-09-11",
    dateModified: "2026-09-11",
    pdfUrl: "/whitepapers/electrochemical-peukert-derating-bess.pdf",
    htmlUrl: "/whitepapers/electrochemical-peukert-derating-bess.html",
    academiaUrl: "https://www.academia.edu/175384576/Electrochemical_Peukert_Capacity_Derating_Depth_of_Discharge_Boundaries_and_Parasitic_Inverter_Tare_Losses_in_Stationary_Battery_Energy_Storage_Systems",
    datasetStatus: "none",
    category: "Battery Storage",
    categorySlug: "battery",
    keywords: [
      "battery energy storage",
      "Peukert's law",
      "inverter tare losses",
      "LiFePO4 battery sizing",
      "depth of discharge",
      "IEEE 485",
      "NEC Article 706",
      "battery runtime calculation"
    ],
    standards: [
      "IEEE Std 485-2020 (Sizing Lead-Acid Batteries for Stationary Applications)",
      "NFPA 70 / NEC Article 706 (Energy Storage Systems)",
      "UL 1973 (Batteries for Stationary & Microgrid Applications)",
      "IEC 62619 (Secondary Lithium Cells & Batteries for Industrial Use)",
    ],
    keyFindings: [
      "Ignoring Peukert exponent derating in lead-acid and AGM chemistry overestimates emergency runtime by up to 42.6% under 0.5C to 1.0C continuous discharge.",
      "Lithium iron phosphate (LiFePO4) exhibits near-ideal Peukert performance (k ≈ 1.02 to 1.05), maintaining over 97% of rated capacity under high discharge rates.",
      "Inverter quiescent tare draw (15W to 65W constant) reduces battery autonomy by more than 50% during light continuous loads (e.g., 40W medical or networking equipment).",
    ],
    equations: [
      {
        name: "Generalized Peukert Effective Capacity Equation",
        latex: "C_{\\text{eff}} = C_{\\text{nom}} \\times \\left( \\frac{I_{\\text{ref}}}{I_{\\text{dc}}} \\right)^{k - 1}",
        description: "Derates nominal battery capacity as discharge current increases relative to rated reference current I_ref = C_nom / H.",
      },
      {
        name: "Inverter Total DC Demand with Quiescent Tare Draw",
        latex: "P_{\\text{dc}} = \\frac{P_{\\text{ac}}}{\\eta_{\\text{inv}}(P_{\\text{ac}})} + P_{\\text{tare}}",
        description: "Calculates total DC power drawn from battery terminals including baseline quiescent standby loss.",
      },
      {
        name: "Deterministic Usable Operational Runtime",
        latex: "t_{\\text{run}} = \\frac{C_{\\text{eff}} \\times V_{\\text{nom}} \\times \\text{DoD}_{\\text{max}}}{P_{\\text{dc}}}",
        description: "Computes exact operational runtime taking into account usable depth of discharge, effective capacity, and DC load.",
      },
    ],
    relatedCalculators: [
      { name: "Battery Runtime Calculator", route: "/battery/battery-runtime-calculator" },
      { name: "Battery Size Calculator", route: "/battery/battery-size-calculator" },
      { name: "Battery Capacity Calculator", route: "/battery/battery-capacity-calculator" },
      { name: "Inverter Size Calculator", route: "/battery/inverter-size-calculator" },
    ],
    relatedGuides: [
      { name: "How to Calculate Battery Runtime & Backup Hours", route: "/guides/how-to-calculate-battery-runtime-and-backup-hours" },
      { name: "Battery Capacity Ah to kWh Conversion Guide", route: "/guides/battery-capacity-ah-to-kwh-conversion-guide" },
    ],
    bibtex: `@techreport{powerlab_2026_bess_peukert,
  author      = {{PowerLab Clean Energy Engineering Group}},
  title       = {Electrochemical Peukert Capacity Derating, Depth of Discharge Boundaries, and Parasitic Inverter Tare Losses in Stationary Battery Energy Storage Systems},
  institution = {PowerLab Open Energy Research},
  year        = {2026},
  number      = {PL-TR-2026-BESS01},
  url         = {https://www.powelab.org/research/electrochemical-peukert-derating-bess}
}`,
    apaCitation: "PowerLab Clean Energy Engineering Group. (2026). Electrochemical Peukert Capacity Derating, Depth of Discharge Boundaries, and Parasitic Inverter Tare Losses in Stationary Battery Energy Storage Systems (Technical Report No. PL-TR-2026-BESS01). PowerLab Open Energy Research. https://www.powelab.org/research/electrochemical-peukert-derating-bess",
    ieeeCitation: "PowerLab Clean Energy Engineering Group, \"Electrochemical Peukert Capacity Derating, Depth of Discharge Boundaries, and Parasitic Inverter Tare Losses in Stationary Battery Energy Storage Systems,\" PowerLab Open Energy Research, Tech. Rep. PL-TR-2026-BESS01, 2026.",
  },
];

export interface BenchmarkDataset {
  id: string;
  repository: "Figshare" | "Zenodo";
  doi?: string;
  status: "published" | "accession_pending";
  title: string;
  subtitle: string;
  description: string;
  recordCount: string;
  format: string;
  downloadUrl?: string;
  repositoryUrl: string;
  paperSlug: string;
}

export const BENCHMARK_DATASETS: BenchmarkDataset[] = [
  {
    id: "PL-DS-EVSE-01",
    repository: "Figshare",
    doi: "10.6084/m9.figshare.33321774",
    status: "published",
    title: "Level 2 EVSE Continuous-Duty Conductor & Terminal Temperature Benchmark Dataset",
    subtitle: "Continuous-duty Joule heating (I²R), conductor temperature rise, and 60°C vs 75°C terminal temperature envelopes under NEC 625.42.",
    description: "Benchmark matrix tabulating 120 continuous load runs (16A to 80A), wire gauge thermal limits (14 AWG to 2 AWG Cu/Al), conduit fill ampacity derating, and contact resistance thermal runaway thresholds.",
    recordCount: "120 Records",
    format: "CSV / Replication Package",
    downloadUrl: "https://doi.org/10.6084/m9.figshare.33321774",
    repositoryUrl: "https://doi.org/10.6084/m9.figshare.33321774",
    paperSlug: "continuous-duty-thermal-sizing-evse-ampacity",
  },
  {
    id: "PL-DS-HP-02",
    repository: "Figshare",
    doi: "10.6084/m9.figshare.33470950",
    status: "published",
    title: "Cold-Climate Air-Source Heat Pump COP Degradation & Balance Point Dataset",
    subtitle: "Sub-freezing ambient temperature spectra (-20°C to +10°C) COP degradation, flash-injection capacity curves, and auxiliary resistive staging economics under AHRI 210/240.",
    description: "Empirical thermodynamic performance matrix for variable-speed inverter vapor scroll heat pumps across outdoor temperatures, evaluating sensible heating capacity, electrical power draw, and balance point transition curves.",
    recordCount: "240 Records",
    format: "CSV / Tabular Matrix",
    downloadUrl: "https://doi.org/10.6084/m9.figshare.33470950",
    repositoryUrl: "https://doi.org/10.6084/m9.figshare.33470950",
    paperSlug: "heat-pump-cop-degradation-and-auxiliary-heat-kinetics",
  },
  {
    id: "PL-DS-SOL-03",
    repository: "Figshare",
    doi: "10.6084/m9.figshare.33618778",
    status: "published",
    title: "50-State Solar Insolation, Peak Sun Hours, ASHRAE Climatic Design Temperatures, and Grid Electricity Rates Matrix",
    subtitle: "Harmonized state-by-state meteorological, solar resource, and residential electricity tariff database across all 50 US states.",
    description: "Benchmark empirical matrix tabulating NREL NSRDB peak sun hours, optimal tilt angles, ASHRAE 99% winter / 1% summer design dry-bulb temperatures, and EIA electricity rates.",
    recordCount: "58 Records",
    format: "CSV / Tabular Matrix",
    downloadUrl: "https://doi.org/10.6084/m9.figshare.33618778",
    repositoryUrl: "https://doi.org/10.6084/m9.figshare.33618778",
    paperSlug: "ground-view-factor-snow-albedo-pv-tilt",
  },
  {
    id: "PL-DS-GEN-04",
    repository: "Figshare",
    status: "accession_pending",
    title: "Residential Standby Generator Motor Inrush & Sub-Transient Voltage Dip Matrix",
    subtitle: "Locked Rotor Amperage (LRA) sub-transient reactance (X''d) voltage dip envelopes and fuel derating factors (Gasoline vs Propane vs Natural Gas) under ISO 8528-5.",
    description: "Transient response benchmark tracking 0.1s to 0.5s instantaneous voltage sag and frequency recovery curves across single-phase induction motor compressor starts with and without solid-state soft starters.",
    recordCount: "180 Records",
    format: "Tabular Matrix",
    repositoryUrl: "/research/deterministic-inrush-load-stacking-generator-sizing",
    paperSlug: "deterministic-inrush-load-stacking-generator-sizing",
  },
];

export interface StudentLabExercise {
  id: string;
  labNumber: string;
  title: string;
  subtitle: string;
  targetCourse: string;
  level: string;
  description: string;
  learningObjectives: string[];
  standards: string[];
  calculatorRoute: string;
  calculatorLabel: string;
  academiaCategory: "Teaching Documents";
}

export const STUDENT_LAB_EXERCISES: StudentLabExercise[] = [
  {
    id: "PL-LAB-01",
    labNumber: "Lab Unit 01",
    title: "Battery Electrochemical Peukert Capacity Derating, C-Rate Kinetics, and Quiescent Inverter Tare Losses",
    subtitle: "Quantitative analysis of non-linear lead-acid vs. LiFePO4 discharge envelopes, Peukert exponent derating, and continuous standby parasitic load under IEEE 485.",
    targetCourse: "EE 301 / Energy Systems Engineering & CTE Apprenticeships",
    level: "Undergraduate / Advanced Vocational",
    description: "Students model real-world battery bank autonomy across varying discharge rates (0.05C to 1.0C). The exercise contrasts empirical Peukert derating across lead-acid (k = 1.15–1.30) vs. LiFePO4 (k = 1.02–1.05) chemistries, revealing how low-load inverter tare dissipation can reduce autonomy by over 50%.",
    learningObjectives: [
      "Calculate effective amp-hour and watt-hour capacity using the generalized Peukert equation normalized to rated discharge period H.",
      "Evaluate depth-of-discharge (DoD) cycling life tradeoffs under IEEE 485 stationary storage guidelines.",
      "Quantify continuous inverter tare power dissipation (Ptare) impact on autonomy during low-power emergency medical or telecommunication loads.",
    ],
    standards: [
      "IEEE 485 (Sizing Lead-Acid Batteries for Stationary Systems)",
      "UL 1973 (Batteries for Stationary & Microgrid Applications)",
      "IEC 62619 (Secondary Lithium Cells & Batteries)",
    ],
    calculatorRoute: "/battery/battery-runtime-calculator",
    calculatorLabel: "Open Battery Runtime & Peukert Engine →",
    academiaCategory: "Teaching Documents",
  },
  {
    id: "PL-LAB-02",
    labNumber: "Lab Unit 02",
    title: "Photovoltaic Ground View Factor Transposition, Snow Albedo Dynamics, and Sub-Zero Voc Expansion",
    subtitle: "Mathematical modeling of anisotropic sky diffuse transposition, high-latitude snow albedo reflection gains, and cold-temperature open-circuit voltage expansion under NEC 690.7.",
    targetCourse: "Solar PV Engineering / Applied Physics / Microgrid Design",
    level: "Undergraduate / Clean Energy Certificate",
    description: "Investigates the ground view factor (1 - cos β)/2 in tilted photovoltaic arrays. Students quantify diffuse irradiance amplification across high-albedo winter ground cover and calculate temperature-adjusted string Voc peaks to protect MPPT power electronics from cold-weather destruction.",
    learningObjectives: [
      "Model plane-of-array (POA) irradiance using Perez anisotropic transposition and ground-reflected albedo components.",
      "Determine maximum historical DC string voltage under NEC 690.7 using ASHRAE extreme dry-bulb design temperatures.",
      "Optimize seasonal fixed-tilt vs. latitude-based tilt angles for winter self-reliance versus annual generation maximization.",
    ],
    standards: [
      "NFPA 70 / NEC Article 690.7 (Maximum Voltage Calculation)",
      "IEC 61724-1 (Photovoltaic Performance Monitoring)",
      "NREL SAM / PVWatts V8 Model Guidelines",
    ],
    calculatorRoute: "/solar/solar-panel-tilt-calculator",
    calculatorLabel: "Open Solar Panel Tilt & Transposition Engine →",
    academiaCategory: "Teaching Documents",
  },
  {
    id: "PL-LAB-03",
    labNumber: "Lab Unit 03",
    title: "Continuous-Duty Thermal Sizing, Conductor Terminal Limits, and Branch Circuit Ampacity for Level 2 EVSE",
    subtitle: "Rigorous electrical design applying the 125% continuous duty multiplier under NEC 625.42 and terminal temperature termination derating under NEC 110.14(C).",
    targetCourse: "Power Distribution / Commercial Electrification / IBEW Apprenticeships",
    level: "Technical Apprenticeship / Upper Division EE",
    description: "Students evaluate continuous-load thermal mechanics in electric vehicle branch circuits. Focuses on terminal lug heating (I²R), 60°C vs. 75°C conductor termination limits, and the code hazard of using 6 AWG Romex (NM-B) for 48A charging.",
    learningObjectives: [
      "Apply the mandatory 125% continuous duty overcurrent protective device multiplier under NFPA 70 / NEC 625.42.",
      "Identify terminal temperature column limitations (NEC 110.14(C)) and distinguish between NM-B (60°C capped) vs. THHN conduit systems.",
      "Calculate steady-state conductor resistive power dissipation and voltage drop over extended branch circuit runs.",
    ],
    standards: [
      "NFPA 70 / NEC Article 625 (Electric Vehicle Power Transfer Systems)",
      "NFPA 70 / NEC Section 110.14(C) (Termination Limitations)",
      "UL 2594 (Electric Vehicle Supply Equipment)",
    ],
    calculatorRoute: "/ev/ev-charger-breaker-size-calculator",
    calculatorLabel: "Open EVSE Breaker & Thermal Sizing Engine →",
    academiaCategory: "Teaching Documents",
  },
];
