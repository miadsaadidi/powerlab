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
  ssrnUrl?: string;
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
    ssrnUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7446361",
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
    doi: "10.6084/m9.figshare.33753856",
    academiaUrl: "https://www.academia.edu/172416009/Deterministic_Modeling_of_Inductive_Motor_Inrush_Currents_and_Non_Coincident_Load_Stacking_for_Residential_Backup_Power_Systems",
    datasetStatus: "published",
    datasetRepository: "Figshare",
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
    doi: "10.6084/m9.figshare.33618778",
    academiaUrl: "https://www.academia.edu/175217881/Ground_View_Factor_Transposition_Snow_Albedo_Dynamics_and_Sub_Zero_Open_Circuit_Voltage_Expansion_in_Photovoltaic_Arrays",
    datasetStatus: "published",
    datasetRepository: "Figshare",
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
    doi: "10.6084/m9.figshare.33821940",
    academiaUrl: "https://www.academia.edu/175550496/Electrochemical_Peukert_Capacity_Derating_Depth_of_Discharge_Boundaries_and_Parasitic_Inverter_Tare_Losses_in_Stationary_Battery_Energy_Storage_Systems",
    datasetStatus: "published",
    datasetRepository: "Figshare",
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
      { name: "Battery Backup Runtime Formula & Calculation Guide", route: "/guides/battery-backup-runtime-calculation-guide" },
      { name: "Voltage Drop & Wire Size Calculation Guide", route: "/guides/voltage-drop-and-wire-size-calculation-guide" },
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

export interface DatasetVariable {
  name: string;
  symbol: string;
  unit: string;
  type: string;
  description: string;
  example: string | number;
}

export interface BenchmarkDataset {
  id: string;
  slug: string;
  repository: "Figshare" | "Hugging Face";
  doi?: string;
  huggingFaceUrl?: string;
  huggingFaceDoi?: string;
  status: "published" | "accession_pending";
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  metaDescription: string;
  abstract: string;
  version: string;
  datePublished: string;
  dateModified: string;
  creator: string;
  license: string;
  category: "Electric Vehicles" | "Home Energy" | "Solar Photovoltaics" | "Battery Storage";
  categorySlug: "ev" | "home-energy" | "solar" | "battery";
  keywords: string[];
  recordCount: string;
  fileSize: string;
  format: string;
  downloadUrl?: string;
  repositoryUrl: string;
  paperSlug: string;
  methodology: string;
  variables: DatasetVariable[];
  sampleData: Array<Record<string, string | number>>;
  relatedWhitepaper: {
    title: string;
    route: string;
    reportNumber: string;
  };
  relatedCalculators: RelatedLink[];
  relatedGuides?: RelatedLink[];
  bibtex: string;
  apaCitation: string;
  ieeeCitation: string;
}

export const BENCHMARK_DATASETS: BenchmarkDataset[] = [
  {
    id: "PL-DS-EVSE-01",
    slug: "continuous-duty-evse-terminal-temperature-benchmark",
    repository: "Figshare",
    doi: "10.6084/m9.figshare.33321774",
    status: "published",
    title: "Level 2 EVSE Continuous-Duty Conductor & Terminal Temperature Benchmark Dataset",
    shortTitle: "EVSE Continuous-Duty Terminal Benchmark",
    subtitle: "Continuous-duty Joule heating (I²R), conductor temperature rise, and 60°C vs 75°C terminal temperature envelopes under NEC 625.42.",
    description: "Benchmark matrix tabulating 120 continuous load runs (16A to 80A), wire gauge thermal limits (14 AWG to 2 AWG Cu/Al), conduit fill ampacity derating, and contact resistance thermal runaway thresholds.",
    metaDescription: "Empirical benchmark dataset of Level 2 EVSE continuous-duty terminal temperatures, conductor Joule heating (I²R), and 60°C vs 75°C limits under NEC 625.",
    abstract: "This dataset provides experimental and deterministic simulation records measuring conductor temperature rise, terminal lug heating, and contact resistance degradation across continuous-duty residential and commercial EVSE branch circuits. Evaluates compliance with NEC Article 625.42 and terminal temperature limitations under NEC 110.14(C).",
    version: "1.2.0",
    datePublished: "2026-08-26",
    dateModified: "2026-09-06",
    creator: "PowerLab Clean Energy Engineering Group",
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    category: "Electric Vehicles",
    categorySlug: "ev",
    keywords: ["Level 2 EVSE", "conductor temperature", "NEC 625.42", "Joule heating", "terminal thermal limit", "breaker ampacity"],
    recordCount: "120 Records",
    fileSize: "148 KB",
    format: "CSV / Tabular Matrix",
    downloadUrl: "/datasets/level-2-evse-continuous-duty-thermal-matrix.csv",
    repositoryUrl: "https://doi.org/10.6084/m9.figshare.33321774",
    paperSlug: "continuous-duty-thermal-sizing-evse-ampacity",
    methodology: "Data generated through steady-state thermal finite-difference modeling combined with calibrated laboratory test runs measuring thermocouple temperatures at termination lugs under steady continuous current (100% duty cycle for 8+ hours).",
    variables: [
      { name: "Continuous Current", symbol: "I_cont", unit: "Amperes (A)", type: "Float", description: "Steady-state charging current drawn by EV onboard charger", example: 48.0 },
      { name: "Breaker Rating Required", symbol: "I_ocpd", unit: "Amperes (A)", type: "Integer", description: "Minimum allowable overcurrent protective device rating (125% rule)", example: 60 },
      { name: "Conductor Gauge", symbol: "AWG", unit: "AWG / kcmil", type: "String", description: "Insulated copper conductor size", example: "6 AWG" },
      { name: "Conductor Resistance", symbol: "R_cond", unit: "Ω/1000ft", type: "Float", description: "Direct-current conductor resistance at 75°C per NEC Ch 9 Table 8", example: 0.491 },
      { name: "Terminal Temperature", symbol: "T_term", unit: "°C", type: "Float", description: "Steady-state temperature measured at circuit breaker termination lug", example: 68.4 },
      { name: "Total Power Dissipation", symbol: "P_loss", unit: "Watts (W)", type: "Float", description: "Total Joule heating power dissipated along 50ft circuit run", example: 113.1 },
    ],
    sampleData: [
      { current_a: 16, breaker_a: 20, wire_gauge: "12 AWG Cu", terminal_temp_c: 41.2, power_loss_w: 24.8, nec_compliant: "YES" },
      { current_a: 24, breaker_a: 30, wire_gauge: "10 AWG Cu", terminal_temp_c: 48.6, power_loss_w: 39.5, nec_compliant: "YES" },
      { current_a: 32, breaker_a: 40, wire_gauge: "8 AWG Cu", terminal_temp_c: 56.1, power_loss_w: 62.4, nec_compliant: "YES" },
      { current_a: 40, breaker_a: 50, wire_gauge: "8 AWG Cu", terminal_temp_c: 67.8, power_loss_w: 97.5, nec_compliant: "YES" },
      { current_a: 48, breaker_a: 60, wire_gauge: "6 AWG Cu", terminal_temp_c: 68.4, power_loss_w: 113.1, nec_compliant: "YES" },
      { current_a: 80, breaker_a: 100, wire_gauge: "3 AWG Cu", terminal_temp_c: 72.1, power_loss_w: 198.6, nec_compliant: "YES" },
    ],
    relatedWhitepaper: {
      title: "Continuous-Duty Thermal Sizing, Conductor Terminal Limits, and Branch Circuit Ampacity Requirements for Residential Level 2 EVSE",
      route: "/research/continuous-duty-thermal-sizing-evse-ampacity",
      reportNumber: "PL-TR-2026-EVSE01",
    },
    relatedCalculators: [
      { name: "EV Charger Breaker Size Calculator", route: "/ev/ev-charger-breaker-size-calculator" },
      { name: "EV Charging Time Calculator", route: "/ev/ev-charging-time-calculator" },
      { name: "Voltage Drop & Wire Size Calculator", route: "/battery/voltage-drop-calculator" },
    ],
    relatedGuides: [
      { name: "Level 2 EV Charging Speed & Breaker Sizing Guide", route: "/guides/level-2-ev-charging-speed-and-breaker-sizing-guide" },
      { name: "How to Calculate EV Driving Range & Efficiency Guide", route: "/guides/how-to-calculate-ev-driving-range-and-efficiency-guide" },
      { name: "Voltage Drop & Wire Size Calculation Guide", route: "/guides/voltage-drop-and-wire-size-calculation-guide" },
    ],
    bibtex: `@dataset{powerlab_2026_evse_dataset,
  author       = {{PowerLab Clean Energy Engineering Group}},
  title        = {Level 2 EVSE Continuous-Duty Conductor & Terminal Temperature Benchmark Dataset},
  year         = {2026},
  publisher    = {Figshare},
  version      = {1.2.0},
  doi          = {10.6084/m9.figshare.33321774},
  url          = {https://www.powelab.org/datasets/continuous-duty-evse-terminal-temperature-benchmark}
}`,
    apaCitation: "PowerLab Clean Energy Engineering Group. (2026). Level 2 EVSE Continuous-Duty Conductor & Terminal Temperature Benchmark Dataset (Version 1.2.0) [Data set]. Figshare. https://doi.org/10.6084/m9.figshare.33321774",
    ieeeCitation: "PowerLab Clean Energy Engineering Group, \"Level 2 EVSE Continuous-Duty Conductor & Terminal Temperature Benchmark Dataset,\" Figshare, 2026, doi: 10.6084/m9.figshare.33321774.",
  },
  {
    id: "PL-DS-HP-02",
    slug: "cold-climate-heat-pump-cop-degradation-benchmark",
    repository: "Figshare",
    doi: "10.6084/m9.figshare.33470950",
    status: "published",
    title: "Cold-Climate Air-Source Heat Pump COP Degradation & Balance Point Dataset",
    shortTitle: "Heat Pump COP Degradation Benchmark",
    subtitle: "Sub-freezing ambient temperature spectra (-20°C to +10°C) COP degradation, flash-injection capacity curves, and auxiliary resistive staging economics under AHRI 210/240.",
    description: "Empirical thermodynamic performance matrix for variable-speed inverter vapor scroll heat pumps across outdoor temperatures, evaluating sensible heating capacity, electrical power draw, and balance point transition curves.",
    metaDescription: "Empirical dataset tabulating cold-climate heat pump COP collapse, sensible capacity retention, and electric strip heat staging costs from -20°C to +10°C.",
    abstract: "Provides empirical thermodynamic matrices measuring Coefficient of Performance (COP), delivered thermal capacity (BTU/hr and kW), and electrical input power across 240 ambient temperature and compressor modulation bins under AHRI 210/240-2023 and DOE Appendix M1 test conditions.",
    version: "1.1.0",
    datePublished: "2026-08-28",
    dateModified: "2026-09-06",
    creator: "PowerLab Clean Energy Engineering Group",
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    category: "Home Energy",
    categorySlug: "home-energy",
    keywords: ["heat pump COP", "cold-climate ASHP", "AHRI 210/240", "auxiliary strip heat", "Carnot efficiency", "balance point"],
    recordCount: "240 Records",
    fileSize: "215 KB",
    format: "CSV / Tabular Matrix",
    downloadUrl: "/datasets/heat-pump-cop-degradation-bin-matrix.csv",
    repositoryUrl: "https://doi.org/10.6084/m9.figshare.33470950",
    paperSlug: "heat-pump-cop-degradation-and-auxiliary-heat-kinetics",
    methodology: "Calculated via thermodynamic vapor compression cycle modeling integrating empirical AHRI laboratory test points, defrost penalty multipliers, and variable-speed inverter vapor injection modulation curves.",
    variables: [
      { name: "Outdoor Ambient Temperature", symbol: "T_amb", unit: "°F / °C", type: "Float", description: "Dry-bulb outdoor ambient temperature", example: 5.0 },
      { name: "Coefficient of Performance", symbol: "COP", unit: "Dimensionless", type: "Float", description: "Ratio of delivered thermal heat energy to electrical power input", example: 2.15 },
      { name: "Thermal Capacity Ratio", symbol: "Cap_ratio", unit: "% of Rated", type: "Float", description: "Percentage of nominal 47°F rated heating capacity maintained", example: 78.4 },
      { name: "Electrical Power Input", symbol: "P_elec", unit: "kW", type: "Float", description: "Compressor and outdoor fan electrical demand", example: 3.42 },
      { name: "Auxiliary Strip Heat Active", symbol: "Aux_state", unit: "Boolean", type: "String", description: "Status of secondary electric resistance elements", example: "FALSE" },
      { name: "Operating Cost Rate", symbol: "Cost_hr", unit: "$/Hour", type: "Float", description: "Estimated hourly running cost at $0.18/kWh baseline tariff", example: 0.62 },
    ],
    sampleData: [
      { temp_f: 47, temp_c: 8.3, cop: 3.85, capacity_pct: 100.0, power_kw: 2.74, aux_engaged: "NO", cost_per_hr: "$0.49" },
      { temp_f: 35, temp_c: 1.7, cop: 3.12, capacity_pct: 91.5, power_kw: 2.88, aux_engaged: "NO", cost_per_hr: "$0.52" },
      { temp_f: 17, temp_c: -8.3, cop: 2.45, capacity_pct: 82.0, power_kw: 3.28, aux_engaged: "NO", cost_per_hr: "$0.59" },
      { temp_f: 5, temp_c: -15.0, cop: 2.05, capacity_pct: 74.5, power_kw: 3.56, aux_engaged: "NO", cost_per_hr: "$0.64" },
      { temp_f: -5, temp_c: -20.5, cop: 1.72, capacity_pct: 61.2, power_kw: 3.48, aux_engaged: "YES (5kW)", cost_per_hr: "$1.53" },
      { temp_f: -15, temp_c: -26.1, cop: 1.35, capacity_pct: 48.0, power_kw: 3.50, aux_engaged: "YES (10kW)", cost_per_hr: "$2.43" },
    ],
    relatedWhitepaper: {
      title: "Thermal Degradation Kinetics, Auxiliary Electric Resistance Staging, and Seasonal HSPF2/COP Derating in Cold-Climate Air-Source Heat Pumps",
      route: "/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics",
      reportNumber: "PL-TR-2026-HVAC01",
    },
    relatedCalculators: [
      { name: "Heat Pump Running Cost Calculator", route: "/home-energy/heat-pump-cost-calculator" },
      { name: "Air Conditioner Running Cost Calculator", route: "/home-energy/air-conditioner-cost-calculator" },
      { name: "Electricity Usage Calculator", route: "/home-energy/electricity-usage-calculator" },
    ],
    relatedGuides: [
      { name: "Central AC & Heat Pump Electricity Cost Guide", route: "/guides/central-ac-and-heat-pump-electricity-cost-guide" },
      { name: "Daily Household Electricity Consumption Guide", route: "/guides/how-many-kwh-does-a-house-use-per-day" },
    ],
    bibtex: `@dataset{powerlab_2026_heatpump_dataset,
  author       = {{PowerLab Clean Energy Engineering Group}},
  title        = {Cold-Climate Air-Source Heat Pump COP Degradation & Balance Point Dataset},
  year         = {2026},
  publisher    = {Figshare},
  version      = {1.1.0},
  doi          = {10.6084/m9.figshare.33470950},
  url          = {https://www.powelab.org/datasets/cold-climate-heat-pump-cop-degradation-benchmark}
}`,
    apaCitation: "PowerLab Clean Energy Engineering Group. (2026). Cold-Climate Air-Source Heat Pump COP Degradation & Balance Point Dataset (Version 1.1.0) [Data set]. Figshare. https://doi.org/10.6084/m9.figshare.33470950",
    ieeeCitation: "PowerLab Clean Energy Engineering Group, \"Cold-Climate Air-Source Heat Pump COP Degradation & Balance Point Dataset,\" Figshare, 2026, doi: 10.6084/m9.figshare.33470950.",
  },
  {
    id: "PL-DS-SOL-03",
    slug: "50-state-solar-insolation-climatic-benchmark",
    repository: "Figshare",
    doi: "10.6084/m9.figshare.33618778",
    status: "published",
    title: "50-State Solar Insolation, Peak Sun Hours, ASHRAE Climatic Design Temperatures, and Grid Electricity Rates Matrix",
    shortTitle: "50-State Solar Insolation & Climate Matrix",
    subtitle: "Harmonized state-by-state meteorological, solar resource, and residential electricity tariff database across all 50 US states.",
    description: "Benchmark empirical matrix tabulating NREL NSRDB peak sun hours, optimal tilt angles, ASHRAE 99% winter / 1% summer design dry-bulb temperatures, and EIA electricity rates.",
    metaDescription: "50-state solar dataset combining NREL NSRDB peak sun hours, optimal tilt angles, ASHRAE design temperatures, and EIA residential electricity rates.",
    abstract: "A standardized multi-dimensional dataset unifying state-level solar irradiance metrics from NREL NSRDB, ASHRAE Climatic Design Conditions (extreme minimum and maximum design dry-bulb temperatures), seasonal ground albedo constants, and residential electricity rates published by the U.S. Energy Information Administration (EIA).",
    version: "2.0.0",
    datePublished: "2026-08-30",
    dateModified: "2026-09-06",
    creator: "PowerLab Clean Energy Engineering Group",
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    category: "Solar Photovoltaics",
    categorySlug: "solar",
    keywords: ["solar insolation", "peak sun hours", "50-state solar", "ASHRAE design temp", "EIA electricity rates", "Perez transposition"],
    recordCount: "58 Records",
    fileSize: "84 KB",
    format: "CSV / Tabular Matrix",
    downloadUrl: "/datasets/50-state-solar-insolation-climate-matrix.csv",
    repositoryUrl: "https://doi.org/10.6084/m9.figshare.33618778",
    paperSlug: "ground-view-factor-snow-albedo-pv-tilt",
    methodology: "Data synthesized from NREL NSRDB 1998-2022 physical solar models, ASHRAE Fundamentals Chapter 14 design conditions, and state-weighted average retail electricity pricing from EIA Form 861M.",
    variables: [
      { name: "State Code", symbol: "State", unit: "ISO 3166-2:US", type: "String", description: "Two-letter US state or territory abbreviation", example: "CO" },
      { name: "Annual Average Peak Sun Hours", symbol: "PSH_avg", unit: "Hours/Day (kWh/m²/day)", type: "Float", description: "Daily solar insolation arriving at horizontal surface", example: 5.25 },
      { name: "Optimal Fixed Tilt Angle", symbol: "Tilt_opt", unit: "Degrees (°)", type: "Float", description: "Angle maximizing annual photovoltaic kilowatt-hour generation", example: 34.0 },
      { name: "ASHRAE 99.6% Winter Design Temp", symbol: "T_min_ashrae", unit: "°F / °C", type: "Float", description: "Extreme historical minimum dry-bulb temperature for Voc sizing", example: -14.0 },
      { name: "Average Residential Tariff", symbol: "Tariff_res", unit: "$/kWh", type: "Float", description: "Blended retail electricity rate per EIA monthly report", example: 0.148 },
    ],
    sampleData: [
      { state: "AZ", psh_daily: 6.52, optimal_tilt_deg: 28.5, winter_min_f: 28.0, summer_max_f: 110.0, rate_per_kwh: "$0.142" },
      { state: "CA", psh_daily: 5.68, optimal_tilt_deg: 32.0, winter_min_f: 34.0, summer_max_f: 98.0, rate_per_kwh: "$0.315" },
      { state: "CO", psh_daily: 5.45, optimal_tilt_deg: 35.0, winter_min_f: -10.0, summer_max_f: 92.0, rate_per_kwh: "$0.152" },
      { state: "FL", psh_daily: 5.22, optimal_tilt_deg: 25.0, winter_min_f: 38.0, summer_max_f: 93.0, rate_per_kwh: "$0.158" },
      { state: "NY", psh_daily: 4.15, optimal_tilt_deg: 38.0, winter_min_f: 2.0, summer_max_f: 89.0, rate_per_kwh: "$0.234" },
      { state: "TX", psh_daily: 5.10, optimal_tilt_deg: 30.0, winter_min_f: 22.0, summer_max_f: 102.0, rate_per_kwh: "$0.149" },
    ],
    relatedWhitepaper: {
      title: "Ground View Factor Transposition, Snow Albedo Dynamics, and Sub-Zero Open-Circuit Voltage Expansion in Photovoltaic Arrays",
      route: "/research/ground-view-factor-snow-albedo-pv-tilt",
      reportNumber: "PL-TR-2026-SOL03",
    },
    relatedCalculators: [
      { name: "Solar Panel Tilt Calculator", route: "/solar/solar-panel-tilt-calculator" },
      { name: "Solar Panel Output Calculator", route: "/solar/solar-panel-output-calculator" },
      { name: "Solar Payback Calculator", route: "/solar/solar-payback-calculator" },
    ],
    relatedGuides: [
      { name: "Solar Panel Tilt Angle by Latitude & Season Guide", route: "/guides/solar-panel-tilt-angle-by-latitude-and-season-guide" },
      { name: "Solar Payback Period & ROI Calculation Guide", route: "/guides/solar-payback-and-roi-calculation-guide" },
    ],
    bibtex: `@dataset{powerlab_2026_solar_50state,
  author       = {{PowerLab Clean Energy Engineering Group}},
  title        = {50-State Solar Insolation, Peak Sun Hours, ASHRAE Climatic Design Temperatures, and Grid Electricity Rates Matrix},
  year         = {2026},
  publisher    = {Figshare},
  version      = {2.0.0},
  doi          = {10.6084/m9.figshare.33618778},
  url          = {https://www.powelab.org/datasets/50-state-solar-insolation-climatic-benchmark}
}`,
    apaCitation: "PowerLab Clean Energy Engineering Group. (2026). 50-State Solar Insolation, Peak Sun Hours, ASHRAE Climatic Design Temperatures, and Grid Electricity Rates Matrix (Version 2.0.0) [Data set]. Figshare. https://doi.org/10.6084/m9.figshare.33618778",
    ieeeCitation: "PowerLab Clean Energy Engineering Group, \"50-State Solar Insolation, Peak Sun Hours, ASHRAE Climatic Design Temperatures, and Grid Electricity Rates Matrix,\" Figshare, 2026, doi: 10.6084/m9.figshare.33618778.",
  },
  {
    id: "PL-DS-AC-04",
    slug: "central-air-conditioner-seer2-cooling-degree-day-benchmark",
    repository: "Figshare",
    doi: "10.6084/m9.figshare.33678514",
    status: "published",
    title: "Central Air Conditioner SEER2 vs SEER Energy Consumption & Cooling Degree Day (CDD) Benchmark Matrix",
    shortTitle: "Central AC SEER2 Energy Benchmark",
    subtitle: "Steady-state electrical power draw (Watts at 95°F), annual kilowatt-hour operational demands, and DOE M1 static pressure metrics across 1.5 to 5.0 nominal cooling tons under AHRI 210/240.",
    description: "Benchmark empirical matrix resolving the 2023 DOE Appendix M1 transition from legacy SEER (0.10–0.20 in. w.g.) to modern SEER2 (0.50 in. w.g.), evaluating sensible cooling capacities, hourly full-load energy draw, and regional cooling degree day operational expense.",
    metaDescription: "Benchmark dataset comparing SEER vs SEER2 energy metrics, static pressure losses, and annual cooling kWh across 1.5 to 5.0 tons under AHRI 210/240.",
    abstract: "Provides empirical energy consumption and electrical demand profiles across 1.5-ton to 5.0-ton residential central air conditioning split systems. Resolves static pressure deratings between legacy SEER (0.10–0.20 in. w.g.) and modern SEER2 (0.50 in. w.g. under DOE Appendix M1).",
    version: "1.0.0",
    datePublished: "2026-09-02",
    dateModified: "2026-09-06",
    creator: "PowerLab Clean Energy Engineering Group",
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    category: "Home Energy",
    categorySlug: "home-energy",
    keywords: ["SEER2 vs SEER", "central air conditioner", "cooling degree days", "DOE Appendix M1", "AHRI 210/240", "HVAC power draw"],
    recordCount: "26 Records",
    fileSize: "62 KB",
    format: "CSV / Tabular Matrix",
    downloadUrl: "/datasets/central-ac-cooling-seer2-energy-matrix.csv",
    repositoryUrl: "https://doi.org/10.6084/m9.figshare.33678514",
    paperSlug: "heat-pump-cop-degradation-and-auxiliary-heat-kinetics",
    methodology: "Calculated using DOE 10 CFR Part 430 Appendix M1 testing standards, accounting for blower fan watt penalties at 0.50 inches water column static pressure.",
    variables: [
      { name: "Nominal Cooling Tonnage", symbol: "Tons", unit: "Tons (12,000 BTU/hr)", type: "Float", description: "Nominal cooling capacity rating", example: 3.0 },
      { name: "SEER2 Rating", symbol: "SEER2", unit: "BTU/Wh", type: "Float", description: "Seasonal Energy Efficiency Ratio 2 per DOE M1 standard", example: 15.2 },
      { name: "Electrical Power Draw at 95°F", symbol: "P_draw_95", unit: "Watts (W)", type: "Integer", description: "Steady-state power draw at 95°F ambient outdoor temperature", example: 2580 },
      { name: "Annual Energy Consumption (1000 CDD)", symbol: "E_annual", unit: "kWh/Year", type: "Integer", description: "Estimated yearly cooling kilowatt-hours for standard cooling zone", example: 2180 },
      { name: "Annual Operating Cost ($0.18/kWh)", symbol: "Cost_annual", unit: "$/Year", type: "Float", description: "Estimated yearly electricity operating cost", example: 392.40 },
    ],
    sampleData: [
      { tonnage: 1.5, btu_hr: 18000, seer: 14.0, seer2: 13.4, watts_95f: 1380, annual_kwh: 1240, annual_cost: "$223.20" },
      { tonnage: 2.0, btu_hr: 24000, seer: 14.5, seer2: 13.8, watts_95f: 1790, annual_kwh: 1610, annual_cost: "$289.80" },
      { tonnage: 2.5, btu_hr: 30000, seer: 15.0, seer2: 14.3, watts_95f: 2180, annual_kwh: 1960, annual_cost: "$352.80" },
      { tonnage: 3.0, btu_hr: 36000, seer: 16.0, seer2: 15.2, watts_95f: 2480, annual_kwh: 2230, annual_cost: "$401.40" },
      { tonnage: 4.0, btu_hr: 48000, seer: 16.0, seer2: 15.2, watts_95f: 3310, annual_kwh: 2980, annual_cost: "$536.40" },
      { tonnage: 5.0, btu_hr: 60000, seer: 16.5, seer2: 15.7, watts_95f: 4020, annual_kwh: 3620, annual_cost: "$651.60" },
    ],
    relatedWhitepaper: {
      title: "Thermal Degradation Kinetics, Auxiliary Electric Resistance Staging, and Seasonal HSPF2/COP Derating in Cold-Climate Air-Source Heat Pumps",
      route: "/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics",
      reportNumber: "PL-TR-2026-HVAC01",
    },
    relatedCalculators: [
      { name: "Air Conditioner Running Cost Calculator", route: "/home-energy/air-conditioner-cost-calculator" },
      { name: "Heat Pump Running Cost Calculator", route: "/home-energy/heat-pump-cost-calculator" },
      { name: "Electricity Usage Calculator", route: "/home-energy/electricity-usage-calculator" },
    ],
    bibtex: `@dataset{powerlab_2026_seer2_dataset,
  author       = {{PowerLab Clean Energy Engineering Group}},
  title        = {Central Air Conditioner SEER2 vs SEER Energy Consumption & Cooling Degree Day (CDD) Benchmark Matrix},
  year         = {2026},
  publisher    = {Figshare},
  version      = {1.0.0},
  doi          = {10.6084/m9.figshare.33678514},
  url          = {https://www.powelab.org/datasets/central-air-conditioner-seer2-cooling-degree-day-benchmark}
}`,
    apaCitation: "PowerLab Clean Energy Engineering Group. (2026). Central Air Conditioner SEER2 vs SEER Energy Consumption & Cooling Degree Day (CDD) Benchmark Matrix (Version 1.0.0) [Data set]. Figshare. https://doi.org/10.6084/m9.figshare.33678514",
    ieeeCitation: "PowerLab Clean Energy Engineering Group, \"Central Air Conditioner SEER2 vs SEER Energy Consumption & Cooling Degree Day (CDD) Benchmark Matrix,\" Figshare, 2026, doi: 10.6084/m9.figshare.33678514.",
  },
  {
    id: "PL-DS-GEN-04",
    slug: "standby-generator-motor-inrush-voltage-sag-benchmark",
    repository: "Figshare",
    doi: "10.6084/m9.figshare.33753856",
    huggingFaceUrl: "https://huggingface.co/datasets/miadinside/motor-inrush-lra-generator-benchmark-2026",
    huggingFaceDoi: "10.57967/hf/10419",
    status: "published",
    title: "Residential Standby Generator Motor Inrush & Sub-Transient Voltage Dip Matrix",
    shortTitle: "Generator Motor Inrush & Voltage Sag Benchmark",
    subtitle: "Locked Rotor Amperage (LRA) sub-transient reactance (X''d) voltage dip envelopes and fuel derating factors (Gasoline vs Propane vs Natural Gas) under ISO 8528-5.",
    description: "Transient response benchmark tracking 0.1s to 0.5s instantaneous voltage sag and frequency recovery curves across single-phase induction motor compressor starts with and without solid-state soft starters.",
    metaDescription: "Empirical dataset measuring motor locked rotor amperage (LRA), alternator sub-transient voltage sag (X''d), and soft-starter surge drop under ISO 8528-5.",
    abstract: "A high-resolution transient performance dataset recording starting surge apparent power, peak instantaneous locked-rotor amperes, alternator sub-transient voltage dips, and engine governor recovery times during residential motor starting events (air conditioners, heat pumps, well pumps) under ISO 8528-5 and NEMA MG-1.",
    version: "1.2.0",
    datePublished: "2026-09-05",
    dateModified: "2026-09-06",
    creator: "PowerLab Clean Energy Engineering Group",
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    category: "Home Energy",
    categorySlug: "home-energy",
    keywords: ["generator sizing", "locked rotor amps", "motor inrush", "sub-transient reactance", "ISO 8528-5", "voltage sag envelope"],
    recordCount: "180 Records",
    fileSize: "192 KB",
    format: "CSV / Tabular Matrix",
    downloadUrl: "/datasets/motor-inrush-lra-generator-sizing-matrix.csv",
    repositoryUrl: "https://doi.org/10.6084/m9.figshare.33753856",
    paperSlug: "deterministic-inrush-load-stacking-generator-sizing",
    methodology: "Data gathered via dynamometer load-bank testing and numerical synchronous alternator modeling simulating inductive transient reactance X''d = 0.12–0.18 per unit during 0.1–0.4 second motor inrush intervals.",
    variables: [
      { name: "Motor Horsepower / Rating", symbol: "HP", unit: "Horsepower (HP) / Cooling Tons", type: "String", description: "Nominal induction motor rating", example: "3.0 Ton AC (3.5 HP)" },
      { name: "Running Full Load Amps", symbol: "FLA", unit: "Amperes (A)", type: "Float", description: "Steady-state continuous running current at 240V", example: 16.2 },
      { name: "Locked Rotor Amps (Across-The-Line)", symbol: "LRA_raw", unit: "Amperes (A)", type: "Float", description: "Instantaneous starting inrush current without soft start", example: 82.0 },
      { name: "Locked Rotor Amps (With Soft Starter)", symbol: "LRA_soft", unit: "Amperes (A)", type: "Float", description: "Peak starting current with solid-state ramp controller", example: 28.5 },
      { name: "Generator Voltage Sag (Standard Sizing)", symbol: "V_sag_pct", unit: "% Sag", type: "Float", description: "Peak transient voltage drop on 10 kW alternator", example: 18.4 },
      { name: "Minimum Generator Required", symbol: "kW_min", unit: "Kilowatts (kW)", type: "Float", description: "Minimum generator continuous rating to prevent engine stall", example: 8.5 },
    ],
    sampleData: [
      { load_name: "1.5 Ton AC", running_w: 1800, raw_lra_a: 48.0, raw_surge_w: 11520, soft_lra_a: 16.5, soft_surge_w: 3960, min_gen_kw: 6.5 },
      { load_name: "2.5 Ton AC", running_w: 2600, raw_lra_a: 68.0, raw_surge_w: 16320, soft_lra_a: 23.5, soft_surge_w: 5640, min_gen_kw: 8.0 },
      { load_name: "3.0 Ton AC", running_w: 3200, raw_lra_a: 82.0, raw_surge_w: 19680, soft_lra_a: 28.5, soft_surge_w: 6840, min_gen_kw: 9.5 },
      { load_name: "4.0 Ton AC", running_w: 4200, raw_lra_a: 108.0, raw_surge_w: 25920, soft_lra_a: 37.0, soft_surge_w: 8880, min_gen_kw: 12.0 },
      { load_name: "5.0 Ton AC", running_w: 5200, raw_lra_a: 134.0, raw_surge_w: 32160, soft_lra_a: 46.0, soft_surge_w: 11040, min_gen_kw: 15.0 },
      { load_name: "0.75 HP Well Pump", running_w: 1200, raw_lra_a: 35.0, raw_surge_w: 8400, soft_lra_a: 14.0, soft_surge_w: 3360, min_gen_kw: 5.0 },
    ],
    relatedWhitepaper: {
      title: "Deterministic Modeling of Inductive Motor Inrush Currents and Non-Coincident Load Stacking for Residential Backup Power Systems",
      route: "/research/deterministic-inrush-load-stacking-generator-sizing",
      reportNumber: "PL-TR-2026-GEN02",
    },
    relatedCalculators: [
      { name: "Emergency Generator Sizing Calculator", route: "/home-energy/generator-size-calculator" },
      { name: "Inverter Size Calculator", route: "/battery/inverter-size-calculator" },
      { name: "Appliance Wattage Calculator", route: "/home-energy/appliance-wattage-calculator" },
    ],
    bibtex: `@dataset{powerlab_2026_generator_dataset,
  author       = {{PowerLab Clean Energy Engineering Group}},
  title        = {Residential Standby Generator Motor Inrush & Sub-Transient Voltage Dip Matrix},
  year         = {2026},
  publisher    = {Figshare & Hugging Face},
  version      = {1.2.0},
  doi          = {10.6084/m9.figshare.33753856},
  url          = {https://www.powelab.org/datasets/standby-generator-motor-inrush-voltage-sag-benchmark}
}`,
    apaCitation: "PowerLab Clean Energy Engineering Group. (2026). Residential Standby Generator Motor Inrush & Sub-Transient Voltage Dip Matrix (Version 1.2.0) [Data set]. Figshare. https://doi.org/10.6084/m9.figshare.33753856",
    ieeeCitation: "PowerLab Clean Energy Engineering Group, \"Residential Standby Generator Motor Inrush & Sub-Transient Voltage Dip Matrix,\" Figshare, 2026, doi: 10.6084/m9.figshare.33753856.",
  },
  {
    id: "PL-DS-BESS-05",
    slug: "bess-peukert-capacity-derating-tare-loss-benchmark",
    repository: "Figshare",
    doi: "10.6084/m9.figshare.33821940",
    status: "published",
    title: "Stationary BESS Peukert Capacity Derating, C-Rate Kinetics, and Inverter Tare Loss Benchmark Matrix",
    shortTitle: "BESS Peukert Derating & Tare Loss Benchmark",
    subtitle: "Electrochemical capacity retention curves across 0.05C to 2.0C discharge rates and continuous 15W–65W inverter quiescent tare dissipation under IEEE 485.",
    description: "Benchmark empirical matrix modeling effective battery capacity degradation under varying discharge rates (comparing lead-acid k=1.15–1.30 vs LiFePO4 k=1.02–1.05) and quantifying inverter standby losses during extended autonomy runs.",
    metaDescription: "Benchmark dataset measuring stationary battery storage Peukert capacity derating across C-rates and continuous inverter tare loss impacts under IEEE 485.",
    abstract: "Provides empirical and mathematical benchmark matrices evaluating battery usable capacity (Ah and kWh) as a function of continuous discharge rate, depth of discharge operational limits (50% vs 80% vs 95%), and inverter standby tare power dissipation (Ptare = 15W–65W) in residential stationary storage systems under IEEE Std 485 and UL 1973.",
    version: "1.0.0",
    datePublished: "2026-09-11",
    dateModified: "2026-09-11",
    creator: "PowerLab Clean Energy Engineering Group",
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    category: "Battery Storage",
    categorySlug: "battery",
    keywords: ["BESS benchmark", "Peukert derating", "LiFePO4 C-rate", "inverter tare losses", "battery runtime matrix", "IEEE 485"],
    recordCount: "160 Records",
    fileSize: "175 KB",
    format: "CSV / Tabular Matrix",
    downloadUrl: "/datasets/bess-peukert-capacity-derating-tare-loss-matrix.csv",
    repositoryUrl: "https://doi.org/10.6084/m9.figshare.33821940",
    paperSlug: "electrochemical-peukert-derating-bess",
    methodology: "Simulated and experimentally validated using multi-cell LiFePO4 and flooded/AGM lead-acid discharge test beds under controlled 25°C ambient conditions across normalized discharge rates from C/20 to 2C.",
    variables: [
      { name: "Chemistry Type", symbol: "Chem", unit: "Chemical Formula", type: "String", description: "Battery cell chemistry category", example: "LiFePO4" },
      { name: "Continuous Discharge Rate", symbol: "C_rate", unit: "C-Rate (1/h)", type: "Float", description: "Discharge current normalized to nominal capacity", example: 0.50 },
      { name: "Peukert Exponent", symbol: "k", unit: "Dimensionless", type: "Float", description: "Empirical rate capacity derating constant", example: 1.04 },
      { name: "Effective Usable Capacity Ratio", symbol: "Cap_eff_pct", unit: "% of Nominal", type: "Float", description: "Effective usable capacity delivered at specified C-rate", example: 96.8 },
      { name: "Inverter Tare Loss", symbol: "P_tare", unit: "Watts (W)", type: "Float", description: "Continuous quiescent standby power consumption", example: 35.0 },
      { name: "Autonomy Reduction at 50W Load", symbol: "Autonomy_loss_pct", unit: "% Loss", type: "Float", description: "Percentage runtime lost due to tare drain relative to ideal battery", example: 41.2 },
    ],
    sampleData: [
      { chemistry: "Lead-Acid AGM", c_rate: 0.05, peukert_k: 1.25, effective_cap_pct: 100.0, tare_w: 35, autonomy_hours_50w: 18.2 },
      { chemistry: "Lead-Acid AGM", c_rate: 0.20, peukert_k: 1.25, effective_cap_pct: 82.4, tare_w: 35, autonomy_hours_50w: 14.9 },
      { chemistry: "Lead-Acid AGM", c_rate: 0.50, peukert_k: 1.25, effective_cap_pct: 68.1, tare_w: 35, autonomy_hours_50w: 12.3 },
      { chemistry: "Lead-Acid AGM", c_rate: 1.00, peukert_k: 1.25, effective_cap_pct: 57.4, tare_w: 35, autonomy_hours_50w: 10.4 },
      { chemistry: "LiFePO4", c_rate: 0.20, peukert_k: 1.04, effective_cap_pct: 99.2, tare_w: 35, autonomy_hours_50w: 26.8 },
      { chemistry: "LiFePO4", c_rate: 1.00, peukert_k: 1.04, effective_cap_pct: 95.8, tare_w: 35, autonomy_hours_50w: 25.9 },
    ],
    relatedWhitepaper: {
      title: "Electrochemical Peukert Capacity Derating, Depth of Discharge Boundaries, and Parasitic Inverter Tare Losses in Stationary Battery Energy Storage Systems",
      route: "/research/electrochemical-peukert-derating-bess",
      reportNumber: "PL-TR-2026-BESS01",
    },
    relatedCalculators: [
      { name: "Battery Runtime Calculator", route: "/battery/battery-runtime-calculator" },
      { name: "Battery Size Calculator", route: "/battery/battery-size-calculator" },
      { name: "Battery Capacity Calculator", route: "/battery/battery-capacity-calculator" },
      { name: "Inverter Size Calculator", route: "/battery/inverter-size-calculator" },
    ],
    bibtex: `@dataset{powerlab_2026_bess_peukert_dataset,
  author       = {{PowerLab Clean Energy Engineering Group}},
  title        = {Stationary BESS Peukert Capacity Derating, C-Rate Kinetics, and Inverter Tare Loss Benchmark Matrix},
  year         = {2026},
  publisher    = {Figshare},
  version      = {1.0.0},
  doi          = {10.6084/m9.figshare.33821940},
  url          = {https://www.powelab.org/datasets/bess-peukert-capacity-derating-tare-loss-benchmark}
}`,
    apaCitation: "PowerLab Clean Energy Engineering Group. (2026). Stationary BESS Peukert Capacity Derating, C-Rate Kinetics, and Inverter Tare Loss Benchmark Matrix (Version 1.0.0) [Data set]. Figshare. https://doi.org/10.6084/m9.figshare.33821940",
    ieeeCitation: "PowerLab Clean Energy Engineering Group, \"Stationary BESS Peukert Capacity Derating, C-Rate Kinetics, and Inverter Tare Loss Benchmark Matrix,\" Figshare, 2026, doi: 10.6084/m9.figshare.33821940.",
  },
  {
    id: "PL-DS-BESS-06",
    slug: "residential-battery-storage-degradation-and-thermal-loss-benchmark",
    repository: "Figshare",
    doi: "10.6084/m9.figshare.33968602",
    status: "published",
    title: "Residential BESS Cycle-Life Degradation, Calendar Aging, and Ambient Temperature Derating Benchmark Matrix",
    shortTitle: "Residential BESS Degradation & Thermal Loss Benchmark",
    subtitle: "Empirical capacity fade kinetics across 1,000–6,000 equivalent full cycles (EFC) and -10°C to 45°C ambient thermal derating for residential LiFePO4 and NMC storage under IEEE 485.",
    description: "Benchmark empirical matrix compiling cycle-life capacity retention curves, calendar fade rates, and ambient operating temperature derating factors for residential lithium iron phosphate (LiFePO4) and nickel-manganese-cobalt (NMC) battery energy storage systems (BESS).",
    metaDescription: "Empirical benchmark dataset of residential battery storage cycle life degradation (LiFePO4 vs NMC), calendar fade kinetics, and ambient temperature derating under IEEE 485.",
    abstract: "Provides empirical and deterministic benchmark matrices modeling capacity retention (Q/Q0) and internal resistance growth (R/R0) in residential stationary battery storage systems as a function of equivalent full cycles (1,000 to 6,000 EFC), depth of discharge (50%, 80%, 100% DoD), and ambient operating temperature (-10°C to 45°C). Contrasts robust LiFePO4 cycling longevity against higher-energy-density NMC chemistries, incorporating Arrhenius thermal acceleration modeling and sub-zero charge-transfer limitations under IEEE Std 485 and UL 1973.",
    version: "1.0.0",
    datePublished: "2026-09-22",
    dateModified: "2026-09-22",
    creator: "PowerLab Clean Energy Engineering Group",
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    category: "Battery Storage",
    categorySlug: "battery",
    keywords: [
      "battery degradation",
      "BESS cycle life",
      "LiFePO4 vs NMC degradation",
      "battery thermal loss",
      "capacity retention",
      "calendar aging",
      "IEEE 485",
      "stationary storage longevity",
    ],
    recordCount: "180 Records",
    fileSize: "162 KB",
    format: "CSV / Tabular Matrix",
    downloadUrl: "/datasets/residential-bess-degradation-thermal-loss-matrix.csv",
    repositoryUrl: "https://doi.org/10.6084/m9.figshare.33968602",
    paperSlug: "electrochemical-peukert-derating-bess",
    methodology: "Synthesized from published NREL BLAST (Battery Lifetime Analysis and Simulation Tool) and Sandia National Laboratories stationary storage cycling test datasets, cross-validated with manufacturer warranty degradation curves (IEC 62619 / UL 1973) under controlled 0.5C charge/discharge cycling across 100% to 50% DoD windows and -10°C to 45°C ambient thermal profiles.",
    variables: [
      { name: "Battery Chemistry", symbol: "Chem", unit: "Chemical Formula", type: "String", description: "Cathode chemistry classification (LiFePO4 vs NMC)", example: "LiFePO4" },
      { name: "Equivalent Full Cycles", symbol: "EFC", unit: "Cycles", type: "Integer", description: "Cumulative full throughput cycles (throughput kWh ÷ nameplate kWh)", example: 3000 },
      { name: "Operating Depth of Discharge", symbol: "DoD", unit: "% of Nominal", type: "Float", description: "Routine operational discharge swing percentage", example: 80.0 },
      { name: "Ambient Cell Temperature", symbol: "T_amb", unit: "°C", type: "Float", description: "Surrounding ambient operating temperature", example: 25.0 },
      { name: "Capacity Retention", symbol: "Q_retention", unit: "% of Initial", type: "Float", description: "Available usable capacity relative to factory nameplate rating", example: 88.5 },
      { name: "Internal Resistance Growth", symbol: "R_growth", unit: "Ratio (R/R0)", type: "Float", description: "Ohmic and charge-transfer impedance rise relative to initial baseline", example: 1.22 },
      { name: "Calendar Fade Rate", symbol: "Fade_cal", unit: "% / Year", type: "Float", description: "Non-cycling calendar capacity degradation at 25°C and 50% SoC", example: 1.2 },
    ],
    sampleData: [
      { chemistry: "LiFePO4", cycles_efc: 1000, dod_pct: 80, temp_c: 25, capacity_retention_pct: 96.2, r_internal_growth: 1.06, status: "Active" },
      { chemistry: "LiFePO4", cycles_efc: 3000, dod_pct: 80, temp_c: 25, capacity_retention_pct: 88.5, r_internal_growth: 1.22, status: "Active" },
      { chemistry: "LiFePO4", cycles_efc: 5000, dod_pct: 80, temp_c: 25, capacity_retention_pct: 81.4, r_internal_growth: 1.38, status: "Active" },
      { chemistry: "LiFePO4", cycles_efc: 3000, dod_pct: 80, temp_c: 0, capacity_retention_pct: 80.2, r_internal_growth: 1.55, status: "Derated" },
      { chemistry: "LiFePO4", cycles_efc: 3000, dod_pct: 80, temp_c: 45, capacity_retention_pct: 82.1, r_internal_growth: 1.34, status: "Thermal Stress" },
      { chemistry: "NMC", cycles_efc: 1000, dod_pct: 80, temp_c: 25, capacity_retention_pct: 91.8, r_internal_growth: 1.15, status: "Active" },
      { chemistry: "NMC", cycles_efc: 2000, dod_pct: 80, temp_c: 25, capacity_retention_pct: 82.4, r_internal_growth: 1.36, status: "Active" },
      { chemistry: "NMC", cycles_efc: 3000, dod_pct: 80, temp_c: 25, capacity_retention_pct: 73.1, r_internal_growth: 1.62, status: "Sub-80% EOL" },
    ],
    relatedWhitepaper: {
      title: "Electrochemical Peukert Capacity Derating, Depth of Discharge Boundaries, and Parasitic Inverter Tare Losses in Stationary Battery Energy Storage Systems",
      route: "/research/electrochemical-peukert-derating-bess",
      reportNumber: "PL-TR-2026-BESS01",
    },
    relatedCalculators: [
      { name: "Battery Capacity Calculator", route: "/battery/battery-capacity-calculator" },
      { name: "Home Battery Size Calculator", route: "/home-energy/home-battery-size-calculator" },
      { name: "Battery Runtime Calculator", route: "/battery/battery-runtime-calculator" },
      { name: "Solar Battery Bank Size Calculator", route: "/solar/solar-battery-bank-size-calculator" },
    ],
    relatedGuides: [
      { name: "Residential Battery Storage Lifespan & Degradation Guide", route: "/guides/residential-battery-storage-lifespan-and-degradation-guide" },
      { name: "Battery Capacity & Ah/kWh Conversion Guide", route: "/guides/battery-capacity-ah-to-kwh-conversion-guide" },
      { name: "Household Daily kWh Consumption Guide", route: "/guides/how-many-kwh-does-a-house-use-per-day" },
    ],
    bibtex: `@dataset{powerlab_2026_bess_degradation_dataset,
  author       = {{PowerLab Clean Energy Engineering Group}},
  title        = {Residential BESS Cycle-Life Degradation, Calendar Aging, and Ambient Temperature Derating Benchmark Matrix},
  year         = {2026},
  publisher    = {Figshare},
  version      = {1.0.0},
  doi          = {10.6084/m9.figshare.33968602},
  url          = {https://www.powelab.org/datasets/residential-battery-storage-degradation-and-thermal-loss-benchmark}
}`,
    apaCitation: "PowerLab Clean Energy Engineering Group. (2026). Residential BESS Cycle-Life Degradation, Calendar Aging, and Ambient Temperature Derating Benchmark Matrix (Version 1.0.0) [Data set]. Figshare. https://doi.org/10.6084/m9.figshare.33968602",
    ieeeCitation: "PowerLab Clean Energy Engineering Group, \"Residential BESS Cycle-Life Degradation, Calendar Aging, and Ambient Temperature Derating Benchmark Matrix,\" Figshare, 2026, doi: 10.6084/m9.figshare.33968602.",
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
  academiaUrl?: string;
  archiveUrl?: string;
  pdfUrl?: string;
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
    academiaUrl: "https://www.academia.edu/175550496/Electrochemical_Peukert_Capacity_Derating_Depth_of_Discharge_Boundaries_and_Parasitic_Inverter_Tare_Losses_in_Stationary_Battery_Energy_Storage_Systems",
    archiveUrl: "https://archive.org/details/powerlab-pl-tr-2026-bess01-peukert-derating_202609",
    pdfUrl: "/whitepapers/electrochemical-peukert-derating-bess.pdf",
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
    academiaUrl: "https://www.academia.edu/175443529/Applied_Photovoltaic_Engineering_Laboratory_Solar_PV_Array_Tilt_Optimization_Perez_Anisotropic_Transposition_and_Peak_Sun_Hour_PSH_Simulation",
    archiveUrl: "https://archive.org/details/powerlab-pl-lab-2026-sol02-pv-tilt-psh-lab",
    pdfUrl: "/whitepapers/student-lab-02-solar-pv-tilt-psh.pdf",
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
    academiaUrl: "https://www.academia.edu/173621969/Continuous_Duty_Thermal_Sizing_Conductor_Terminal_Limits_and_Branch_Circuit_Ampacity_Requirements_for_Residential_Level_2_Electric_Vehicle_Supply_Equipment_EVSE_",
    archiveUrl: "https://archive.org/details/evse-continuous-duty-thermal-sizing",
    pdfUrl: "/whitepapers/evse-continuous-duty-thermal-sizing.pdf",
  },
];
