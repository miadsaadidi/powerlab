# Academia.edu Working Papers, Archival Pipeline & Publishing Tracker

**Domain:** `https://www.powelab.org`  
**Publication Channel:** Academia.edu (`https://independent.academia.edu/PowerLab` — Domain Authority 93)  
**Publishing Cadence:** **2 Working Papers / Technical Discussion Updates per Week** (8–10 papers/updates in Month 1)  
**Strategy:** Publish peer-reviewed style working papers, engineering discussion threads, and mathematical models to establish deep academic authority, capture `.edu` citations, and feed the **Academic Triad Pipeline** (Academia.edu ➔ Internet Archive ➔ Harvard Dataverse).

---

## 1. The Academic Triad Pipeline (Academia ➔ Archive ➔ Harvard Dataverse)

The three research platforms work in an explicit hierarchical pipeline:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        THE ACADEMIC TRIAD PIPELINE                     │
├────────────────────────────────────────────────────────────────────────┤
│ 1. ACADEMIA.EDU (2x / week - DA 93)                                    │
│    Publish Working Papers, Technical Reports & Discussion Updates.     │
│    Connect with university faculty, engineers, and researchers.        │
│                                  │                                     │
│                                  ▼                                     │
│ 2. INTERNET ARCHIVE (1:1 Companion - DA 99)                            │
│    Every paper, specification & methodology PDF is archived            │
│    permanently on archive.org for immutable Wayback & Scholar indexing.│
│                                  │                                     │
│                                  ▼                                     │
│ 3. HARVARD DATAVERSE (1 Flagship / week - DA 93)                       │
│    Select 1 flagship benchmark dataset/paper per week to deposit       │
│    on Harvard Dataverse to mint a permanent Harvard DOI.               │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Step 1 — Academia.edu (Primary Working Paper & Discussion Layer):**
   * Publish working papers (e.g. `PL-WP-2026-04`) and engage in technical discussions with academic followers.
   * Embed contextual backlinks to canonical PowerLab calculators and interactive derivation guides.
2. **Step 2 — Internet Archive (Universal Immutable Archival Layer):**
   * Every working paper and engineering methodology released on Academia.edu is archived on **Internet Archive** (`archive.org`) to guarantee permanent preservation and citation metadata.
3. **Step 3 — Harvard Dataverse (Weekly Flagship DOI Minting Layer):**
   * **Selection Rule:** Not every paper is deposited to Harvard Dataverse. We curate and deposit **exactly 1 flagship benchmark dataset / calculation model per week** to mint a permanent Harvard DataCite DOI (`doi:10.7910/DVN/...`) and secure highest-tier institutional domain equity.

---

## 2. Academia.edu Standard Metadata Schema

When uploading a new working paper to Academia.edu (`https://www.academia.edu/upload`):

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   ACADEMIA.EDU UPLOAD METADATA SCHEMA                  │
├──────────────────────────┬─────────────────────────────────────────────┤
│ Field                    │ Standard Format                             │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 1. Paper Title           │ Full Technical Descriptive Title            │
│ 2. Abstract              │ Structured 3-paragraph physical abstract    │
│ 3. Publication Name      │ PowerLab Applied Energy Research Series     │
│ 4. Year                  │ 2026                                        │
│ 5. DOI Number            │ Harvard Dataverse DOI (if flagship minted)  │
│ 6. Authors               │ PowerLab Engineering Group & Research Leads │
│ 7. Research Interests    │ 8–15 targeted taxonomy tags (max 20)        │
│ 8. Section               │ Papers / Drafts                             │
└──────────────────────────┴─────────────────────────────────────────────┘
```

---

## 3. Month 1 30-Day Master Editorial Calendar (September 2026: 8 Releases)

| Release # | Scheduled Date | Paper Identifier | Paper Title & Subject Focus | Triad Companion Actions | Canonical PowerLab Anchor Tool |
| :---: | :---: | :--- | :--- | :--- | :--- |
| **01** | **Sep 01, 2026** | `PL-WP-2026-01` | *Level 1 vs Level 2 EVSE Rectification Efficiency Losses & Parasitic Thermal Management* | • Upload to Internet Archive (`TR-2026-07`) | [`/ev/ev-savings-calculator`](https://www.powelab.org/ev/ev-savings-calculator) |
| **02** | **Sep 04, 2026** | `PL-WP-2026-04` | *Non-Linear COP Degradation, Defrost Entropy Losses, and Auxiliary Resistive Staging Dynamics in ccASHPs* | • Upload to Internet Archive (`TR-2026-03`)<br>• **Weekly Harvard Dataverse Flagship (Dataset 1 / Week 1)** | [`/home-energy/heat-pump-cost-calculator`](https://www.powelab.org/home-energy/heat-pump-cost-calculator) |
| **03** | **Sep 08, 2026** | `PL-TR-2026-02` | *Continuous-Duty Thermal Sizing, Conductor Terminal Limits, and Branch Circuit Ampacity for Level 2 EVSE* | • Upload to Internet Archive (`TR-2026-02`) | [`/ev/ev-charger-breaker-size-calculator`](https://www.powelab.org/ev/ev-charger-breaker-size-calculator) |
| **04** | **Sep 11, 2026** | `PL-WP-2026-02` | *Deterministic Inrush Load Stacking, Locked Rotor Amps (LRA) & Transient Reactance in Generator Sizing* | • Upload to Internet Archive (`TR-2026-04`)<br>• **Weekly Harvard Dataverse Flagship (Dataset 2 / Week 2)** | [`/home-energy/generator-size-calculator`](https://www.powelab.org/home-energy/generator-size-calculator) |
| **05** | **Sep 15, 2026** | `PL-WP-2026-03` | *Ground View Factor Transposition, Snow Albedo Dynamics & Sub-Zero Voc Expansion in Photovoltaic Arrays* | • Upload to Internet Archive (`TR-2026-05`) | [`/solar/solar-panel-tilt-calculator`](https://www.powelab.org/solar/solar-panel-tilt-calculator) |
| **06** | **Sep 18, 2026** | `PL-WP-2026-05` | *Electrochemical Peukert Capacity Derating, Depth of Discharge & Inverter Standby Tare Losses in BESS* | • Upload to Internet Archive (`TR-2026-06`)<br>• **Weekly Harvard Dataverse Flagship (Dataset 3 / Week 3)** | [`/battery/battery-runtime-calculator`](https://www.powelab.org/battery/battery-runtime-calculator) |
| **07** | **Sep 22, 2026** | `PL-TR-2026-03` | *Conductor Voltage Drop Kinetics, Terminal Temperature Derating & Feeder Sizing (IEEE 141)* | • Upload to Internet Archive (`TR-2026-09`) | [`/battery/voltage-drop-calculator`](https://www.powelab.org/battery/voltage-drop-calculator) |
| **08** | **Sep 25, 2026** | `PL-WP-2026-06` | *Vehicle-to-Load (V2L) Off-Grid Inversion Efficiency & Emergency Household Microgrid Simulation* | • Upload to Internet Archive (`TR-2026-12`)<br>• **Weekly Harvard Dataverse Flagship (Dataset 4 / Week 4)** | [`/ev/v2l-runtime-calculator`](https://www.powelab.org/ev/v2l-runtime-calculator) |

---

## 4. Active Live Paper Registry & Copy-Paste Metadata

### Active Paper: PL-WP-2026-04 (Air-Source Heat Pump Thermodynamic Degradation)

* **Live Academia.edu URL:** [`https://www.academia.edu/172873251/...`](https://www.academia.edu/172873251/Non_Linear_Coefficient_of_Performance_COP_Degradation_Defrost_Entropy_Losses_and_Auxiliary_Resistive_Staging_Dynamics_in_Cold_Climate_Air_Source_Heat_Pumps_ccASHP_)
* **Paper Title:** Non-Linear Coefficient of Performance (COP) Degradation, Defrost Entropy Losses, and Auxiliary Resistive Staging Dynamics in Cold-Climate Air-Source Heat Pumps (ccASHP)
* **Abstract:**
  > The rapid global transition toward residential building decarbonization has positioned Air-Source Heat Pumps (ASHPs) and Cold-Climate Air-Source Heat Pumps (ccASHPs) as primary heating systems. While heat pumps exhibit outstanding nominal efficiency under standard test conditions (COP ≥ 3.5 at 47°F / 8.3°C), real-world cold-weather performance exhibits severe, non-linear degradation. This divergence creates widespread consumer "bill shock" and extreme winter peak grid stress.
  >
  > This paper formulates a deterministic, coupled thermodynamic and building physics framework to analyze heat pump performance across extreme sub-zero temperature regimes. We mathematically resolve four interlinked physical mechanisms: (1) Carnot lift and refrigerant suction vapor density rarefaction at low evaporating pressures; (2) parasitic reverse-cycle defrost entropy penalties during frost accretion regimes (28°F ≤ T_amb ≤ 43°F); (3) the thermal balance point (T_balance) envelope inversion; and (4) the auxiliary resistive "strip heat cliff," where 10 kW to 20 kW open-coil elements (COP ≡ 1.0) engage to satisfy thermal deficits.
  >
  > We provide closed-form governing equations, ASHRAE hourly temperature-bin energy integrations, levelized cost of heat (LCOH) comparisons, and open computational models deployed at https://www.powelab.org/home-energy/heat-pump-cost-calculator.
* **Publication Name:** PowerLab Applied Energy & Building Decarbonization Working Paper Series
* **Year:** 2026
* **Research Interests:** Electrification, Applied thermodynamics, HVAC Systems, Heat Pumps, Cold climate, Energy Efficiency Buildings, Energy Modeling, ASHRAE, Building Electrification, Air-Source Heat Pumps, Demand Response, AHRI.
* **Section:** Papers
