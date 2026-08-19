# Heat Pump vs. Gas Heating Cost Calculator — Build Specification

## Route

`/home-energy/heat-pump-cost-calculator`

## Release phase

**Phase 5 (Expansion).** Planned route.

## Product job

Compare the annual and monthly running costs of an electric heat pump against natural gas, propane, or oil heating systems based on seasonal COP/HSPF2 efficiency, furnace AFUE, and local fuel rates.

## User intent

> Is a heat pump cheaper to run than a gas furnace in my climate, and how much will I save per year?

## SEO target

- **Primary:** `heat pump running cost calculator`
- **Planner volume:** ~12,100/month
- **Planner advertiser competition:** Low (index 12)
- **Organic competition:** Medium–High
- **Validated secondary keywords:**
  - `heat pump vs gas furnace calculator` (~5,000/mo)
  - `heat pump savings calculator` (~3,600/mo)
  - `heat pump operating cost calculator` (~2,400/mo)
  - `is a heat pump cheaper than gas calculator` (~1,000/mo)

### Search metadata

- **SEO title:** `Heat Pump Running Cost Calculator — Heat Pump vs Gas Comparison`
- **Meta description:** `Compare heat pump operating costs vs natural gas, propane, or oil furnaces. Calculate annual heating bill savings based on COP/HSPF2, AFUE, and local fuel prices.`
- **H1:** `Heat Pump Running Cost Calculator`
- **Canonical:** self-canonical to `/home-energy/heat-pump-cost-calculator`

---

## 🥊 Competitor Analysis & UX Value Advantage

### Identified SERP Competitors
1. **Heat Geek (Heat Pump Savings Calculator):** Excellent UK-focused hydronic tool, but heavily focused on UK gas boiler specs and imperial units not suited for US/global forced-air systems.
2. **Efficiency Maine (Heating Fuel Comparison Tool):** Comprehensive governmental tool, but presents massive intimidating tables with zero modern visual feedback.
3. **SWEEP (Heat Pump Calculator):** Focuses on carbon reductions rather than transparent monthly dollar breakdowns for everyday homeowners.

### How PowerLab Beats Competitors
- **Universal Fuel Matrix:** Supports Natural Gas ($/Therm or $/ccf), Propane ($/gal), Heating Oil ($/gal), and Baseboard Electric vs. Inverter Heat Pumps.
- **Climate-Adjusted COP / HSPF2:** Models seasonal coefficient of performance (SCOP 2.5 to 4.0) with cold-climate inverter derating.
- **Break-Even Fuel Price Line:** Tells the user the exact electricity price at which a heat pump matches their existing gas furnace cost.
- **⚡ 1-Click Top 5 Regional Presets:** Instant benchmarks for mild, moderate, cold, and sub-zero regions.

---

## ⚡ Default First-Load State & Top 5 Presets

### Starter Values (Instant On Mount)
- Annual Heating Demand: **50 MMBTU (50,000,000 BTU / ~500 Therms heat delivered)**
- Electric Heat Pump SCOP: **3.2 (9.0 HSPF2)**
- Electricity Rate: **$0.18 / kWh**
- Existing Fuel Type: **Natural Gas**
- Existing Furnace Efficiency: **80% AFUE**
- Natural Gas Price: **$1.40 / Therm** ($0.014 / ccf)

### ⚡ 1-Click Top 5 Presets
1. 🏠 *Mild Sunbelt Home (30 MMBTU · 3.5 COP Heat Pump vs 80% Gas @ $1.50/therm)* $\rightarrow$ **Save $124/yr**
2. 🏡 *Midwest Standard Home (60 MMBTU · 3.0 COP Heat Pump vs 80% Gas @ $1.35/therm)* $\rightarrow$ **+$45/yr (Near Parity)**
3. ❄️ *Cold Climate Northern Home (80 MMBTU · 2.8 COP Cold Climate HP vs 96% Gas)* $\rightarrow$ **+$110/yr**
4. 🪵 *Rural Propane Replacement (50 MMBTU · 3.2 COP Heat Pump vs Propane @ $3.20/gal)* $\rightarrow$ **Save $870/yr (Major Savings)**
5. 🛢️ *Northeast Heating Oil Replacement (65 MMBTU · 3.0 COP Heat Pump vs Oil @ $4.10/gal)* $\rightarrow$ **Save $1,140/yr (Major Savings)**

---

## 📊 Visual Graphs & Data Representations

- **Side-by-Side Annual Heating Bill Comparison:**
  - Bar A (Blue): Heat Pump Annual Electricity Cost ($).
  - Bar B (Orange): Existing Gas / Propane / Oil Annual Fuel Cost ($).
  - Net Delta Badge (Green if savings, Amber if slight cost increase).
- **Delivered Heat Efficiency Diagram:**
  - Shows that 1 kWh of electricity produces **3.2 kWh of heat** (320% efficiency) vs. gas furnace losing 20% of fuel energy out the flue vent.

---

## Calculation model

```text
DeliveredHeatBTU = AnnualHeatingDemandMMBTU × 1,000,000

// Heat Pump Electric Calculation (1 kWh = 3,412.14 BTU)
HeatPumpDeliveredBTUPerKWh = 3412.142 × HeatPumpCOP
HeatPumpTotalKWh = DeliveredHeatBTU / HeatPumpDeliveredBTUPerKWh
HeatPumpAnnualCost = HeatPumpTotalKWh × ElectricityRatePerKWh

// Fuel Furnace Calculation
If FuelType == "natural_gas":
  FuelDeliveredBTUPerUnit = 100,000 × (FurnaceAFUE / 100) // per Therm
  UnitsNeeded = DeliveredHeatBTU / FuelDeliveredBTUPerUnit
  FurnaceAnnualCost = UnitsNeeded × GasPricePerTherm
Else If FuelType == "propane":
  FuelDeliveredBTUPerUnit = 91,500 × (FurnaceAFUE / 100) // per Gallon
  UnitsNeeded = DeliveredHeatBTU / FuelDeliveredBTUPerUnit
  FurnaceAnnualCost = UnitsNeeded × PropanePricePerGallon
Else If FuelType == "heating_oil":
  FuelDeliveredBTUPerUnit = 138,500 × (FurnaceAFUE / 100) // per Gallon
  UnitsNeeded = DeliveredHeatBTU / FuelDeliveredBTUPerUnit
  FurnaceAnnualCost = UnitsNeeded × OilPricePerGallon

AnnualSavings = FurnaceAnnualCost - HeatPumpAnnualCost
```

## Required outputs

- **Primary:** Annual Cost Difference ($/year saved or added).
- **Side-by-Side Cost Summary:** Heat pump annual cost vs. gas/oil/propane annual cost.
- **Energy Conversion Breakdown:** Delivered heat (MMBTU), total electrical kWh, and equivalent fuel volume consumed.
- **Handoffs:** Link to `/home-energy/electricity-usage-calculator` and `/home-energy/energy-bill-calculator`.
