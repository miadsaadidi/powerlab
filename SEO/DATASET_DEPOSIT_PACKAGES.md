# POWLAB SEO — Dataset Repository Deposit Records (Layer 3)

**Domain:** `https://www.powelab.org/`  
**Purpose:** Canonical repository metadata, DataCite DOIs, and variable codebooks for PowerLab open benchmark datasets deposited across **Figshare** (DOIs `FIG-01` through `FIG-06`) and **Hugging Face** (`HF-01`).

---

## 1. Package A: Standby Generator Motor Inrush & Sub-Transient Voltage Sag Benchmark

* **Dataset ID:** `PL-DS-GEN-04`
* **Canonical POWLAB URL:** [`https://www.powelab.org/datasets/standby-generator-motor-inrush-voltage-sag-benchmark`](https://www.powelab.org/datasets/standby-generator-motor-inrush-voltage-sag-benchmark)
* **Companion Research Paper:** [`PL-TR-2026-GEN02`](https://www.powelab.org/research/deterministic-inrush-load-stacking-generator-sizing)
* **Active Published Repositories:**
  * Figshare DOI: [`10.6084/m9.figshare.33753856`](https://doi.org/10.6084/m9.figshare.33753856)
  * Hugging Face DOI: [`10.57967/hf/10419`](https://doi.org/10.57967/hf/10419)
* **Status:** `PUBLISHED`

### A. Metadata Schema

```yaml
Title: "Residential Standby Generator Motor Inrush & Sub-Transient Voltage Dip Benchmark Matrix"
Creator / Author: "PowerLab Clean Energy Engineering Group"
Affiliation: "PowerLab Open Energy Research (powelab.org)"
Publication Date: "2026-09-05"
Version: "1.2.0"
Language: "eng"
Resource Type: "Dataset"
License: "Creative Commons Attribution 4.0 International (CC-BY-4.0)"
Keywords:
  - "generator sizing"
  - "locked rotor amps"
  - "motor inrush current"
  - "sub-transient reactance"
  - "ISO 8528-5"
  - "NEMA MG-1"
  - "soft starters"
  - "voltage sag envelope"
Related Identifiers:
  - Relation: "IsSupplementTo"
    Scheme: "URL"
    Identifier: "https://www.powelab.org/research/deterministic-inrush-load-stacking-generator-sizing"
  - Relation: "IsIdenticalTo"
    Scheme: "DOI"
    Identifier: "10.6084/m9.figshare.33753856"
  - Relation: "IsIdenticalTo"
    Scheme: "DOI"
    Identifier: "10.57967/hf/10419"
```

### B. Abstract

```text
A standardized empirical and deterministic transient performance dataset recording starting surge apparent power, peak instantaneous locked-rotor amperes (LRA), alternator sub-transient voltage dips (X''d = 0.12–0.18 p.u.), and engine governor recovery times during residential motor starting events (air conditioners, heat pumps, well pumps) under ISO 8528-5 and NEMA MG-1. Tabulates 180 load runs comparing across-the-line starting vs. solid-state soft starters, resolving fuel deratings for Gasoline, Propane (LPG), and Natural Gas.
```

### C. Variable Codebook / Schema

| Field Name | Variable Label | Unit | Storage Type | Description |
| :--- | :--- | :--- | :--- | :--- |
| `load_name` | Inductive Load Description | Nominal Label | Text | Name and nominal capacity of inductive motor load |
| `running_w` | Steady-State Power | Watts (W) | Float | Steady-state running active power at 240V AC |
| `raw_lra_a` | Raw Locked Rotor Amps | Amperes (A) | Float | Peak starting inrush current without soft starter |
| `raw_surge_w` | Raw Starting Surge Power | Watts (W) | Float | Apparent starting surge power demand (V × LRA) |
| `soft_lra_a` | Soft-Start Locked Rotor Amps | Amperes (A) | Float | Peak starting inrush with solid-state ramp controller |
| `soft_surge_w` | Soft-Start Surge Power | Watts (W) | Float | Starting surge power demand with soft starter |
| `min_gen_kw` | Minimum Generator Required | Kilowatts (kW) | Float | Minimum continuous generator rating to prevent engine stall |

---

## 2. Package B: 50-State Solar Insolation, Peak Sun Hours & Climatic Benchmark

* **Dataset ID:** `PL-DS-SOL-03`
* **Canonical POWLAB URL:** [`https://www.powelab.org/datasets/50-state-solar-insolation-climatic-benchmark`](https://www.powelab.org/datasets/50-state-solar-insolation-climatic-benchmark)
* **Companion Research Paper:** [`PL-TR-2026-SOL03`](https://www.powelab.org/research/ground-view-factor-snow-albedo-pv-tilt)
* **Active Published Repositories:**
  * Figshare DOI: [`10.6084/m9.figshare.33618778`](https://doi.org/10.6084/m9.figshare.33618778)
* **Status:** `PUBLISHED`

### A. Metadata Schema

```yaml
Title: "50-State Solar Insolation, Peak Sun Hours, ASHRAE Climatic Design Temperatures, and Grid Electricity Rates Matrix"
Creator / Author: "PowerLab Clean Energy Engineering Group"
Affiliation: "PowerLab Open Energy Research (powelab.org)"
Publication Date: "2026-08-30"
Version: "2.0.0"
Language: "eng"
Resource Type: "Dataset"
License: "Creative Commons Attribution 4.0 International (CC-BY-4.0)"
Keywords:
  - "solar insolation"
  - "peak sun hours"
  - "50-state solar data"
  - "ASHRAE design temperatures"
  - "EIA electricity rates"
  - "Perez transposition model"
  - "photovoltaic yield"
Related Identifiers:
  - Relation: "IsSupplementTo"
    Scheme: "URL"
    Identifier: "https://www.powelab.org/research/ground-view-factor-snow-albedo-pv-tilt"
  - Relation: "IsIdenticalTo"
    Scheme: "DOI"
    Identifier: "10.6084/m9.figshare.33618778"
```

### B. Abstract

```text
A harmonized multi-dimensional empirical matrix combining state-by-state solar meteorological resources from NREL NSRDB physical solar models (daily average peak sun hours, optimal annual and seasonal panel tilt angles), ASHRAE Climatic Design Conditions (99.6% extreme winter minimum and 1% summer maximum design dry-bulb temperatures for NEC 690.7 Voc expansion calculations), and weighted residential retail electricity tariffs published by the U.S. Energy Information Administration (EIA Form 861M) across all 50 US states and territories.
```

### C. Variable Codebook / Schema

| Field Name | Variable Label | Unit | Storage Type | Description |
| :--- | :--- | :--- | :--- | :--- |
| `state` | State Abbreviation | ISO 3166-2:US | Text | Two-letter US state or territory code |
| `psh_daily` | Average Daily Peak Sun Hours | kWh/m²/day | Float | Daily annual average solar insolation on horizontal plane |
| `optimal_tilt_deg` | Optimal Annual Panel Tilt | Degrees (°) | Float | Fixed tilt angle maximizing annual generation |
| `winter_min_f` | ASHRAE 99.6% Winter Design Temp | °F | Float | Extreme historical low dry-bulb temperature for Voc sizing |
| `summer_max_f` | ASHRAE 1% Summer Design Temp | °F | Float | High design dry-bulb temperature for Vmp derating |
| `rate_per_kwh` | Residential Electricity Rate | USD ($/kWh) | Float | State-average residential retail electricity price (EIA) |

---

## 3. Package C: Residential BESS Cycle-Life Degradation & Thermal Derating Benchmark

* **Dataset ID:** `PL-DS-BESS-06`
* **Canonical POWLAB URL:** [`https://www.powelab.org/datasets/residential-battery-storage-degradation-and-thermal-loss-benchmark`](https://www.powelab.org/datasets/residential-battery-storage-degradation-and-thermal-loss-benchmark)
* **Companion Research Paper:** [`PL-TR-2026-BESS01`](https://www.powelab.org/research/electrochemical-peukert-derating-bess)
* **Companion Layer 1 Guide:** [`/guides/residential-battery-storage-lifespan-and-degradation-guide`](https://www.powelab.org/guides/residential-battery-storage-lifespan-and-degradation-guide)
* **Active Published Repositories:**
  * Figshare DOI: [`10.6084/m9.figshare.33968602`](https://doi.org/10.6084/m9.figshare.33968602)
* **Status:** `PUBLISHED`

### A. Metadata Schema

```yaml
Title: "Benchmark Matrix: Residential BESS Cycle-Life Degradation, Calendar Aging, and Ambient Temperature Derating"
Creator / Author: "Miad Saadidi; PowerLab Clean Energy Engineering Group"
Affiliation: "PowerLab Open Energy Research (powelab.org)"
Publication Date: "2026-09-22"
Version: "1.0.0"
Language: "eng"
Resource Type: "Dataset"
License: "Creative Commons Attribution 4.0 International (CC-BY-4.0)"
Keywords:
  - "Energy Storage"
  - "Lithium-Ion Battery"
  - "Battery Storage"
Related Identifiers:
  - Relation: "IsSupplementTo"
    Scheme: "URL"
    Identifier: "https://www.powelab.org/guides/residential-battery-storage-lifespan-and-degradation-guide"
  - Relation: "IsIdenticalTo"
    Scheme: "DOI"
    Identifier: "10.6084/m9.figshare.33968602"
```

### B. Abstract

```text
This benchmark dataset provides empirical and deterministic degradation matrices for stationary residential Battery Energy Storage Systems (BESS), evaluating electrochemical capacity retention (%), internal resistance growth ratio (R_growth), and calendar fade across lithium iron phosphate (LiFePO4) and nickel manganese cobalt (NMC) chemistries. Tabulates 160 operational configurations across equivalent full cycles (500 to 6,000 EFC), depth-of-discharge boundaries (50%, 80%, 100% DoD), and extreme ambient thermal ranges (-10°C to +45°C / 14°F to 113°F) under IEEE Std 1561, UL 1973, and IEC 62619.
```

### C. Variable Codebook / Schema

| Field Name | Variable Label | Unit | Storage Type | Description |
| :--- | :--- | :--- | :--- | :--- |
| `chemistry` | Battery Cell Chemistry | Nominal Label | Text | Chemistry type (`LiFePO4` vs `NMC`) |
| `cycles_efc` | Equivalent Full Cycles | Cycles | Integer | Cumulative throughput full cycles completed |
| `dod_pct` | Operating Depth of Discharge | % | Float | Operational DoD swing percentage |
| `ambient_temp_c` | Ambient Operating Temperature | °C | Float | Dry-bulb ambient cell temperature |
| `ambient_temp_f` | Ambient Operating Temperature | °F | Float | Dry-bulb ambient cell temperature |
| `capacity_retention_pct` | Usable Capacity Retention | % | Float | Usable capacity remaining relative to nameplate |
| `internal_resistance_growth_ratio` | Impedance Multiplier | Ratio | Float | Internal ohmic resistance ratio (R_actual / R_nominal) |
| `annual_calendar_fade_pct` | Annual Calendar Fade | %/Year | Float | Baseline non-cycling calendar aging rate |
| `operational_status` | Operating Health State | Nominal Label | Text | Status classification (`Active`, `Sub-80% EOL`, `Cold Derated`) |

