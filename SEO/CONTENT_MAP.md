# POWLAB SEO — Content Ecosystem Map

**Domain:** `https://www.powelab.org/`  
**Purpose:** Comprehensive architectural map connecting POWLAB canonical research, datasets, calculators, educational guides, distribution platforms, and authority outreach targets.

---

## 1. Battery Energy Storage System (BESS) Ecosystem

```text
BESS RESEARCH CLUSTER
│
├── Canonical Whitepaper
│   └── URL: /research/electrochemical-peukert-derating-bess
│   └── Report ID: PL-TR-2026-BESS01
│   └── Title: Electrochemical Peukert Capacity Derating, Depth of Discharge Boundaries, and Parasitic Inverter Tare Losses
│
├── Benchmark Dataset
│   └── Title: Stationary BESS Peukert Capacity Derating & Tare Loss Matrix
│   └── Repository: Figshare (Accession in progress) / Hugging Face
│   └── Data Types: C-rate (0.05C–2.0C), Ah capacity derating curves, quiescent inverter tare watts (15W–65W)
│
├── Canonical Calculators
│   ├── /battery/battery-runtime-calculator (Flagship Engine)
│   ├── /battery/battery-size-calculator
│   ├── /battery/battery-capacity-calculator
│   ├── /battery/inverter-size-calculator
│   └── /solar/solar-battery-bank-size-calculator
│
├── Educational & Technical Guides
│   ├── /guides/how-to-calculate-battery-runtime-and-backup-hours
│   └── /guides/battery-capacity-ah-to-kwh-conversion-guide
│
├── Layer 1 Distribution
│   ├── Academia.edu: ACAD-06 (Preprint PL-TR-2026-BESS01)
│   ├── Archive.org: details/powerlab-pl-tr-2026-bess01-peukert-derating_202609
│   ├── MERLOT: MER-02 (BESS Runtime & Peukert Workbench)
│   ├── DEV.to: DEV-05 (Why Battery Storage Calculations Fail: Peukert & Tare Losses in TS)
│   ├── Hashnode: HASH-01 (Peukert's Law & Inverter Tare Losses in Battery Storage)
│   └── Medium: "The Hidden Inverter Tare Loss That Drains Emergency Batteries" (Planned)
│
├── Layer 2 Authority / Editorial Targets
│   ├── Energy Storage News (Pitch: LiFePO4 vs Lead-Acid Peukert kinetics in stationary microgrids)
│   ├── Energy Central (Pitch: Grid-tied battery tare loss oversights in residential backup)
│   ├── Battery Power Online (Pitch: Battery autonomy modeling under dynamic C-rates)
│   └── IEEE Power & Energy Magazine (Pitch: Sizing standards revision under IEEE 485)
│
└── Layer 3 Research & Citation Targets
    ├── IEEE Working Group on Stationary Batteries (IEEE 485 committee)
    ├── National Renewable Energy Laboratory (NREL Storage Futures Study)
    └── Academic Journals: Journal of Energy Storage (Elsevier), Applied Energy
```

---

## 2. Solar Photovoltaics (PV) Ecosystem

```text
SOLAR PV RESEARCH CLUSTER
│
├── Canonical Whitepaper
│   └── URL: /research/ground-view-factor-snow-albedo-pv-tilt
│   └── Report ID: PL-TR-2026-SOL03
│   └── Title: Ground View Factor Transposition, Snow Albedo Dynamics, and Sub-Zero Voc Expansion in PV Arrays
│
├── Benchmark Dataset
│   └── Title: 50-State Solar Insolation, PSH, ASHRAE Design Temperatures & Grid Rates
│   └── DOI: 10.6084/m9.figshare.33618778 (FIG-03)
│   └── Records: 58 State/Territory meteorological & tariff matrices
│
├── Canonical Calculators
│   ├── /solar/solar-panel-tilt-calculator (Flagship Engine)
│   ├── /solar/solar-panel-output-calculator
│   ├── /solar/solar-panel-size-calculator
│   ├── /solar/solar-charge-controller-calculator
│   └── /solar/solar-payback-calculator
│
├── Educational & Technical Guides
│   ├── /guides/solar-panel-tilt-angle-by-latitude-and-season-guide
│   ├── /guides/mppt-solar-charge-controller-sizing-guide
│   └── /guides/solar-payback-and-roi-calculation-guide
│
├── Layer 1 Distribution
│   ├── Academia.edu: ACAD-04 (Preprint PL-TR-2026-SOL03) & ACAD-05 (Student Lab Manual)
│   ├── Figshare: FIG-03 (DOI: 10.6084/m9.figshare.33618778)
│   ├── DEV.to: DEV-04 (Cold-Weather Photovoltaic Arrays & Voc Expansion in TS)
│   ├── Hashnode: HASH-02 (Sub-Zero Solar Voc Expansion & Charge Controller Breakdown)
│   └── Medium: "Why Cold Winter Days Can Destroy Your Solar Charge Controller" (Planned)
│
├── Layer 2 Authority / Editorial Targets
│   ├── PV Magazine International (Pitch: Winter Voc expansion risk in utility and C&I solar)
│   ├── Solar Power World (Pitch: Snow albedo ground reflection gains in high-latitude PV)
│   └── IEEE Spectrum (Pitch: High-voltage MPPT dielectric stress during polar vortex events)
│
└── Layer 3 Research & Citation Targets
    ├── NREL PVWatts & SAM development teams
    ├── International Solar Energy Society (ISES) / Solar Energy Journal
    └── Academic Repositories: Zenodo, Harvard Dataverse
```

---

## 3. HVAC & Building Energy Ecosystem

```text
HVAC & BUILDING ENERGY RESEARCH CLUSTER
│
├── Canonical Whitepaper
│   └── URL: /research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics
│   └── Report ID: PL-TR-2026-HVAC01
│   └── Title: Thermal Degradation Kinetics, Auxiliary Electric Resistance Staging, and Seasonal HSPF2/COP Derating
│
├── Benchmark Dataset
│   ├── Cold-Climate Heat Pump COP Degradation & Balance Point (DOI: 10.6084/m9.figshare.33470950 - FIG-02)
│   └── Central AC SEER2 vs SEER Energy Consumption Matrix (DOI: 10.6084/m9.figshare.33678514 - FIG-04)
│
├── Canonical Calculators
│   ├── /home-energy/heat-pump-cost-calculator (Flagship Engine)
│   ├── /home-energy/air-conditioner-cost-calculator
│   ├── /home-energy/electricity-usage-calculator
│   └── /home-energy/energy-bill-calculator
│
├── Educational & Technical Guides
│   ├── /guides/central-ac-and-heat-pump-electricity-cost-guide
│   └── /guides/how-many-kwh-does-a-house-use-per-day
│
├── Layer 1 Distribution
│   ├── Academia.edu: ACAD-02 (Preprint PL-TR-2026-HVAC01)
│   ├── Figshare: FIG-02 (COP Matrix) & FIG-04 (SEER2 Matrix)
│   ├── MERLOT: MER-01 (Heat Pump COP Degradation Simulation Tool)
│   ├── DEV.to: DEV-02 (Modeling Cold-Climate Heat Pump COP Degradation in TypeScript)
│   ├── Hashnode: HASH-04 (Heat Pump COP Degradation & Sub-Zero Aux Heat Modeling)
│   └── Medium: "The 17°F Heat Pump Cliff: When Strip Heat Destroys Efficiency" (Planned)
│
├── Layer 2 Authority / Editorial Targets
│   ├── ASHRAE Journal (Pitch: Auxiliary strip heat staging thresholds in cold climates)
│   ├── ACHR News (The Air Conditioning, Heating and Refrigeration NEWS)
│   └── Energy Central (Pitch: Grid peak winter demand driven by auxiliary resistance staging)
│
└── Layer 3 Research & Citation Targets
    ├── AHRI (Air-Conditioning, Heating, and Refrigeration Institute)
    ├── BuildingGreen / Building Science Corporation
    └── Academic Journals: Energy and Buildings (Elsevier), Building and Environment
```

---

## 4. Generator & Emergency Power Engineering Ecosystem

```text
GENERATOR POWER SYSTEMS CLUSTER
│
├── Canonical Whitepaper
│   └── URL: /research/deterministic-inrush-load-stacking-generator-sizing
│   └── Report ID: PL-TR-2026-GEN02
│   └── Title: Deterministic Modeling of Inductive Motor Inrush Currents and Non-Coincident Load Stacking
│
├── Benchmark Dataset
│   ├── Inductive Motor Locked Rotor Amperes & Generator Sizing Matrix (DOI: 10.6084/m9.figshare.33753856 - FIG-05)
│   └── Hugging Face: motor-inrush-lra-generator-benchmark-2026 (DOI: 10.57967/hf/10419 - HF-01)
│
├── Canonical Calculators
│   ├── /home-energy/generator-size-calculator (Flagship Engine)
│   ├── /battery/inverter-size-calculator
│   └── /home-energy/appliance-wattage-calculator
│
├── Educational & Technical Guides
│   └── /guides/emergency-generator-sizing-and-inrush-load-guide
│
├── Layer 1 Distribution
│   ├── Academia.edu: ACAD-03 (Preprint PL-TR-2026-GEN02)
│   ├── Figshare: FIG-05 (Motor Inrush Matrix) & Hugging Face: HF-01
│   ├── DEV.to: DEV-03 (Why Backup Generators Stall on Motor Startup: Simulating LRA in TS)
│   ├── Hashnode: HASH-03 (Generator Stalling on Motor Startup: LRA Inrush Dynamics)
│   └── Medium: "Why Your 10kW Generator Won't Start a 3-Ton Air Conditioner" (Planned)
│
├── Layer 2 Authority / Editorial Targets
│   ├── Power Engineering International (Pitch: Dynamic motor inrush modeling in microgrid standby generation)
│   ├── The Electricity Forum (Pitch: Sub-transient voltage dip envelopes during inductive starting)
│   ├── Electrical Contractor Magazine (Pitch: Soft-starter retrofits vs generator oversizing)
│   └── EC&M (Electrical Construction & Maintenance)
│
└── Layer 3 Research & Citation Targets
    ├── IEEE Industry Applications Society (IAS) / IEEE Orange Book (IEEE 446)
    ├── Electrical Generating Systems Association (EGSA)
    └── Academic Repositories: Harvard Dataverse, Zenodo
```

---

## 5. EV Charging & EVSE Infrastructure Ecosystem

```text
EVSE INFRASTRUCTURE CLUSTER
│
├── Canonical Whitepaper
│   └── URL: /research/continuous-duty-thermal-sizing-evse-ampacity
│   └── Report ID: PL-TR-2026-EVSE01
│   └── Title: Continuous-Duty Thermal Sizing, Conductor Terminal Limits, and Branch Circuit Ampacity Requirements
│
├── Benchmark Dataset
│   └── Level 2 EVSE Continuous-Duty Conductor & Terminal Temperature Benchmark (DOI: 10.6084/m9.figshare.33321774 - FIG-01)
│
├── Canonical Calculators
│   ├── /ev/ev-charger-breaker-size-calculator (Flagship Engine)
│   ├── /ev/ev-charging-time-calculator
│   ├── /ev/ev-range-calculator
│   └── /battery/voltage-drop-calculator
│
├── Educational & Technical Guides
│   ├── /guides/level-2-ev-charging-speed-and-breaker-sizing-guide
│   └── /guides/voltage-drop-and-wire-size-calculation-guide
│
├── Layer 1 Distribution
│   ├── Academia.edu: ACAD-01 (Preprint PL-TR-2026-EVSE01) & Archive.org
│   ├── Figshare: FIG-01 (Continuous-Duty Ampacity Matrix)
│   ├── DEV.to: DEV-01 (Deterministic Energy Planning Engines in TypeScript)
│   └── Medium: "The 125% Continuous-Duty EV Sizing Trap That Catches Homeowners" (Planned)
│
├── Layer 2 Authority / Editorial Targets
│   ├── EE Times (Pitch: Terminal thermal limits (60°C vs 75°C) in high-power Level 2 EVSE)
│   ├── Charged EVs (Pitch: Conductor I²R dissipation in residential 48A charging circuits)
│   └── IAEI Magazine (International Association of Electrical Inspectors)
│
└── Layer 3 Research & Citation Targets
    ├── NFPA 70 / NEC Code-Making Panel 12 (NEC Article 625)
    ├── SAE International (SAE J1772 & SAE J3400 NACS standards groups)
    └── Academic Journals: IEEE Transactions on Transportation Electrification
```

---

## 6. General Electrical & Computational Engineering Ecosystem

```text
COMPUTATIONAL ENGINEERING CLUSTER
│
├── Core Methodologies
│   ├── /methodology (Scientific Calculation Philosophy & Error Propagation)
│   ├── /standards (Master Standards Registry: NEC, IEEE, AHRI, ISO, IEC, SAE)
│   └── /glossary (Engineering Glossary with Rigorous Dimensional Units)
│
├── Core Tools
│   ├── /battery/voltage-drop-calculator (NEC Table 310.16 + Chapter 9 Tables)
│   ├── /home-energy/electricity-usage-calculator
│   └── /home-energy/energy-bill-calculator
│
├── Layer 1 Distribution
│   ├── DEV.to: DEV-01 (Building Pure Deterministic Energy Planning Engines in TypeScript)
│   └── Internet Archive: IA-01 (Deterministic TypeScript Calculation Framework)
│
├── Layer 2 Authority / Editorial Targets
│   ├── Engineering.com (Pitch: Deterministic browser-based calculation engines vs black-box software)
│   └── IEEE Spectrum (Pitch: Open reproducible standards-based web engineering)
│
└── Layer 3 Research & Citation Targets
    ├── Open Educational Resources (OER Commons)
    └── National Science Teaching Association (NSTA)
```
