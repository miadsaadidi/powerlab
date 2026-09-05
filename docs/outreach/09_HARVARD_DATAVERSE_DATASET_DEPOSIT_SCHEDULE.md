# Harvard Dataverse Dataset Deposit Schedule & Repository Standard Schema

**Domain:** `https://www.powelab.org`  
**Repository Platform:** Harvard Dataverse (`https://dataverse.harvard.edu/` — Domain Authority 93, Harvard University / IQSS)  
**Publishing Cadence:** 1 verified open research dataset & simulation matrix deposited **every week** starting **September 4, 2026** (4 flagship datasets in Month 1)  
**Strategy:** Publish peer-reviewed open benchmark datasets, hourly solar/climatic tables, EV charging efficiency matrices, and thermodynamic simulation files with permanent Harvard University DataCite DOIs (`doi:10.7910/DVN/...`) to build highest-tier academic domain authority, Google Scholar citations, and institutional syllabus references.

---

## 1. Harvard Dataverse Metadata Standard Schema

When depositing a new dataset into the **PowerLab Applied Energy & Building Decarbonization Dataverse**, complete the metadata fields in this exact order:

```text
┌────────────────────────────────────────────────────────────────────────┐
│               HARVARD DATAVERSE DEPOSIT METADATA SCHEMA                │
├──────────────────────────┬─────────────────────────────────────────────┤
│ Field                    │ Required Standard Format                    │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 1. Title                 │ Replication Data for: [Dataset Name]        │
│ 2. Author(s)             │ Sami, miad (PowerLab Applied Energy)        │
│ 3. Contact Email         │ miad@powelab.org (or support@powelab.org)   │
│ 4. Description           │ Structured abstract + physical methodology  │
│ 5. Subject               │ Engineering; Earth & Environmental Sciences │
│ 6. Keywords              │ 5–8 standardized taxonomy tags              │
│ 7. Related Publications  │ Canonical URL + DOI (Research hub / Zenodo) │
│ 8. Related Material      │ Interactive computational model URL         │
│ 9. License / Rights      │ CC0 1.0 Universal / CC-BY 4.0               │
│ 10. Geographic Coverage  │ United States (50 States & Global Latitudes)│
│ 11. Time Period Covered  │ 1991–2026 (NREL NSRDB & ASHRAE Cycles)      │
│ 12. Deposit Files        │ `.csv`, `.json`, `.ts`, `README.md`         │
└──────────────────────────┴─────────────────────────────────────────────┘
```

---

## 2. 4-Week Harvard Dataverse Deposit Schedule (Month 1: September 2026)

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           MONTH 1 HARVARD DATAVERSE DEPOSIT SCHEDULE                             │
├───────────────┬─────────────────────────────────────────────────┬────────────────────────────────┤
│ Week / Date   │ Dataset Title & Subject Scope                   │ Canonical Tool & Research URL  │
├───────────────┼─────────────────────────────────────────────────┼────────────────────────────────┤
│ Week 1 (Sep 4)│ 1. 50-State Solar Irradiance & ASHRAE Climate   │ /solar/regional-climate-data   │
│ Week 2 (Sep 11│ 2. EVSE Continuous-Duty Ampacity & De-rating    │ /research/continuous-duty-evse │
│ Week 3 (Sep 18│ 3. Cold-Climate Heat Pump COP Bin Simulation    │ /research/heat-pump-cop-kineti │
│ Week 4 (Sep 25│ 4. Motor Inrush (LRA) & Generator Transient DB  │ /research/deterministic-inrush │
└───────────────┴─────────────────────────────────────────────────┴────────────────────────────────┘
```

---

## 3. Detailed Weekly Dataset Specifications

### Week 1 — September 4, 2026 (Today)
* **Dataset Title:** *Replication Data for: 50-State NREL Photovoltaic Solar Irradiance, Optimal Seasonal Tilt Angles, and ASHRAE Climatic Design Conditions (1991–2020)*
* **Persistent Identifier:** Harvard Dataverse Handle / DOI (`doi:10.7910/DVN/POWERLAB-SOLAR-CLIMATE-50STATE`)
* **Abstract / Description:** This dataset compiles state-by-state solar resource parameters and climatic design standards across all 50 U.S. states. Variables include Global Horizontal Irradiance (GHI, $\text{kWh/m}^2/\text{day}$), Direct Normal Irradiance (DNI), annual peak sun hours, optimal fixed-tilt angle, seasonal winter/summer tilt adjustments ($\Delta\beta$), ASHRAE 99.6% design cold temperatures ($T_{cold}$), ASHRAE 1.0% design dry-bulb temperatures, and ground snow albedo reflectance gain factors.
* **Primary PowerLab Canonical URL:** [`https://www.powelab.org/solar/regional-climate-data`](https://www.powelab.org/solar/regional-climate-data)
* **Interactive Tool Anchor:** [`https://www.powelab.org/solar/solar-panel-output-calculator`](https://www.powelab.org/solar/solar-panel-output-calculator)
* **Included Data Files:**
  1. `50_state_solar_ashrae_climatic_matrix.csv` (Full 50-state matrix with units)
  2. `50_state_solar_ashrae_climatic_matrix.json` (Structured JSON for web engines)
  3. `regional-climate-engine.ts` (Deterministic TypeScript interpolation script)
  4. `README.md` (Variable dictionary, source attribution to NREL NSRDB & ASHRAE 2021)
* **Template File:** [`docs/outreach/11_HARVARD_DATAVERSE_DATASET_01_50_STATE_CLIMATE_MATRIX.md`](file:///d:/powerlab/docs/outreach/11_HARVARD_DATAVERSE_DATASET_01_50_STATE_CLIMATE_MATRIX.md)

---

### Week 2 — September 11, 2026
* **Dataset Title:** *Replication Data for: Residential Level 2 EVSE Continuous-Duty Thermal Ampacity Sizing, Conductor Terminal Temperature De-rating, and Voltage Drop Benchmark Matrix*
* **Persistent Identifier:** Harvard Dataverse Handle / DOI (`doi:10.7910/DVN/POWERLAB-EVSE-THERMAL-SIZING`)
* **Abstract / Description:** Standardized empirical and numerical matrices for electric vehicle supply equipment (EVSE) circuit sizing under NEC Articles 625, 310, and 110.14(C). Provides conductor ampacity tables for Copper (Cu) and Aluminum (Al) across 60°C, 75°C, and 90°C insulation ratings, ambient temperature correction factors, conduit fill de-ratings, continuous 125% breaker sizing benchmarks (16A to 80A continuous EVSE), and onboard charger conversion efficiency curves (120V Level 1 vs. 240V Level 2).
* **Primary PowerLab Canonical URL:** [`https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity`](https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity)
* **Interactive Tool Anchor:** [`https://www.powelab.org/ev/ev-charger-breaker-size-calculator`](https://www.powelab.org/ev/ev-charger-breaker-size-calculator)
* **Included Data Files:**
  1. `evse_conductor_ampacity_and_derating_table.csv`
  2. `level1_vs_level2_efficiency_losses_matrix.csv`
  3. `evse-thermal-sizing-model.ts`
  4. `README.md`

---

### Week 3 — September 18, 2026
* **Dataset Title:** *Replication Data for: Cold-Climate Air-Source Heat Pump (ccASHP) Non-Linear COP Degradation, Reverse-Cycle Defrost Entropy Penalties, and Auxiliary Heat Staging Simulation Matrix*
* **Persistent Identifier:** Harvard Dataverse Handle / DOI (`doi:10.7910/DVN/POWERLAB-CCASHP-COP-SIMULATION`)
* **Abstract / Description:** Thermodynamic simulation dataset of variable-speed inverter air-source heat pumps operating across extreme cold temperature ranges (-20°F to 60°F / -29°C to 15.5°C). Models vapor compression COP degradation, frost accretion entropy penalties during reverse-cycle defrost (28°F–43°F), building heat loss balance points ($T_{balance}$), and electric resistance strip heat staging dynamics across 15 ASHRAE climate zones.
* **Primary PowerLab Canonical URL:** [`https://www.powelab.org/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics`](https://www.powelab.org/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics)
* **Interactive Tool Anchor:** [`https://www.powelab.org/home-energy/heat-pump-cost-calculator`](https://www.powelab.org/home-energy/heat-pump-cost-calculator)
* **Included Data Files:**
  1. `ashrae_temperature_bin_cop_degradation_matrix.csv`
  2. `auxiliary_strip_heat_demand_staging_curves.json`
  3. `heat-pump-thermodynamics-engine.ts`
  4. `README.md`

---

### Week 4 — September 25, 2026
* **Dataset Title:** *Replication Data for: Inductive Motor Inrush Currents, Locked Rotor Amps (LRA) Code Letters, and Generator Transient Reactance Loading Matrix*
* **Persistent Identifier:** Harvard Dataverse Handle / DOI (`doi:10.7910/DVN/POWERLAB-MOTOR-INRUSH-GENERATOR`)
* **Abstract / Description:** Transient load dataset for residential and light-commercial inductive motor starts under NEMA MG-1 and NEC Article 702. Contains starting kVA/HP coefficients for NEMA code letters A through V, locked rotor amp multiples (5.0x to 7.2x FLA), sub-transient reactance ($X''_d$) voltage dip thresholds, soft-starter SCR ramp profiles, and non-coincident peak load stacking simulations.
* **Primary PowerLab Canonical URL:** [`https://www.powelab.org/research/deterministic-inrush-load-stacking-generator-sizing`](https://www.powelab.org/research/deterministic-inrush-load-stacking-generator-sizing)
* **Interactive Tool Anchor:** [`https://www.powelab.org/home-energy/generator-size-calculator`](https://www.powelab.org/home-energy/generator-size-calculator)
* **Included Data Files:**
  1. `nema_mg1_motor_inrush_lra_code_table.csv`
  2. `generator_voltage_dip_transient_matrix.json`
  3. `motor-inrush-stacking-engine.ts`
  4. `README.md`
