# Air Conditioner Running Cost Calculator — Build Specification

## Route

`/home-energy/air-conditioner-cost-calculator`

## Release phase

**Phase 5 (Expansion).** Planned route.

## Product job

Estimate hourly, daily, monthly, and full-season electricity costs to run air conditioners (window AC, portable AC, ductless mini-split, and central AC systems) based on cooling capacity, SEER2 efficiency, thermostat duty cycle, and local utility rates.

## User intent

> How much money does it cost per hour and per month to run my air conditioner?

## SEO target

- **Primary:** `air conditioner electricity cost calculator`
- **Planner volume:** ~22,200/month (spikes to 60k+ in June–August)
- **Planner advertiser competition:** Low (index 2)
- **Organic competition:** Medium
- **Validated secondary keywords:**
  - `ac electricity cost calculator` (~5,000/mo)
  - `ac running cost calculator` (~5,000/mo)
  - `how much does it cost to run an air conditioner calculator` (~2,400/mo)
  - `window ac electricity cost calculator` (~1,000/mo)

### Search metadata

- **SEO title:** `Air Conditioner Electricity Cost Calculator — Hourly & Monthly AC Cost`
- **Meta description:** `Calculate how much your air conditioner costs to run per hour, day, and month. Estimate electricity costs for window units, mini-splits, and central AC by SEER2 rating.`
- **H1:** `Air Conditioner Electricity Cost Calculator`
- **Canonical:** self-canonical to `/home-energy/air-conditioner-cost-calculator`

---

## 🥊 Competitor Analysis & UX Value Advantage

### Identified SERP Competitors
1. **Omni Calculator (Electricity Cost Calculator):** General physics tool that requires users to know raw electric kW, failing to translate HVAC BTU capacity or SEER2 ratings.
2. **Calculator.net (Electricity Calculator):** Features basic window AC presets, but assumes the compressor runs 100% full blast without thermostat cycling, resulting in double the real-world cost.
3. **PickHVAC (HVAC Cost Estimators):** Good sizing tables, but clunky UI cluttered with third-party contractor quote popups and no interactive monthly projection.

### How PowerLab Beats Competitors
- **Dual Input Modes (BTU/SEER2 or Nameplate Watts):** Allows everyday users to enter standard BTU cooling capacity (e.g. 12,000 BTU) and SEER2 ratings, or enter direct wattage.
- **Thermostat Duty Cycle Modeling:** Realistically accounts for compressor cycling (default 60% active run time in hot weather) vs. continuous blower fan power.
- **SEER2 Upgrade Savings Card:** Demonstrates exact dollar savings from upgrading older 10 SEER equipment to modern 14.3–20 SEER2 inverter heat pumps.
- **⚡ 1-Click Top 5 AC Presets:** Instant autofill for bedroom window units, portable units, mini-splits, and central systems.

---

## ⚡ Default First-Load State & Top 5 Presets

### Starter Values (Instant On Mount)
- AC System Type: **Central AC (3.0 Ton / 36,000 BTU)**
- Efficiency Rating: **14.3 SEER2** (Modern standard)
- Daily Usage: **8 hours / day**
- Compressor Duty Cycle: **60%** (Cycling thermostat)
- Local Electricity Price: **$0.18 / kWh**
- Cooling Season: **4 Months** (June – September)

### ⚡ 1-Click Top 5 Presets
1. 🪟 *Small Bedroom Window AC (5,000 BTU · 450W · 11 CEER · 8h/day)* $\rightarrow$ **$0.05/hr · $11.70/mo**
2. 🚪 *Living Room Window AC (10,000 BTU · 900W · 12 CEER · 8h/day)* $\rightarrow$ **$0.10/hr · $23.40/mo**
3. 📦 *Portable AC Unit (12,000 BTU · 1,200W · 9.5 SACC · 8h/day)* $\rightarrow$ **$0.13/hr · $31.20/mo**
4. 🌬️ *Ductless Mini-Split (18,000 BTU / 1.5 Ton · 20 SEER2 · Inverter)* $\rightarrow$ **$0.10/hr · $23.80/mo**
5. 🏡 *Suburban Central AC (36,000 BTU / 3 Ton · 14.3 SEER2 · 8h/day)* $\rightarrow$ **$0.27/hr · $66.10/mo**

---

## 📊 Visual Graphs & Data Representations

- **Monthly Summer Cooling Cost Projection:**
  - Bar chart showing estimated cooling costs across May ($30), June ($66), July ($85), August ($85), and September ($40) based on regional summer heat intensity.
- **SEER2 Efficiency Upgrade Savings Card:**
  - Visual comparison bar showing the annual cost reduction of 10 SEER ($420/yr) vs 14.3 SEER2 ($293/yr) vs 20 SEER2 ($210/yr).

---

## Calculation model

```text
If InputMode == "btu_seer":
  ElectricalPowerWatts = CoolingCapacityBTU / SEER2
Else:
  ElectricalPowerWatts = NameplateWatts

EffectiveHourlyKWh = (ElectricalPowerWatts / 1000) × (CompressorDutyCyclePercent / 100)

CostPerHour = EffectiveHourlyKWh × ElectricityPricePerKWh
CostPerDay = CostPerHour × DailyOperatingHours
CostPerMonth = CostPerDay × 30.4375
CostPerSeason = CostPerMonth × CoolingSeasonMonths

// Upgrade Savings Comparison
BaselineCost10Seer = (CoolingCapacityBTU / 10 / 1000) × (DutyCycle / 100) × OperatingHours × 30.4375 × SeasonMonths × ElectricityRate
ModernCostSeer2 = CostPerSeason
SeasonalSavings = Max(0, BaselineCost10Seer - ModernCostSeer2)
```

## Required outputs

- **Primary:** Cost per Hour, Daily Cost, and Monthly Summer Electric Bill Impact.
- **Full Season Projection:** 4-Month Total Cooling Expense ($).
- **Efficiency Comparison:** Dollar savings from upgrading to higher SEER2 equipment.
- **Handoffs:** Link to `/home-energy/electricity-usage-calculator` and `/home-energy/energy-bill-calculator`.
