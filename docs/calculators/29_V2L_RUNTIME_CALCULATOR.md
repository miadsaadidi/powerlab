# Vehicle-to-Load (V2L / V2H) Runtime Calculator — Build Specification

## Route

`/ev/v2l-runtime-calculator`

## Release phase

**Phase 5 (Expansion).** Planned route.

## Product job

Calculate how many hours and days an Electric Vehicle's battery can power household emergency appliances or off-grid gear via Vehicle-to-Load (V2L) or Vehicle-to-Home (V2H) bi-directional power, preserving a user-defined minimum driving range buffer.

## User intent

> How long can my electric car power my house and appliances during an electrical blackout?

## SEO target

- **Primary:** `v2l calculator`
- **Planner volume:** ~2,400/month (**Rapidly Rising Trend**)
- **Planner advertiser competition:** Low (index 0)
- **Organic competition:** Low (**First Mover Advantage**)
- **Validated secondary keywords:**
  - `vehicle to load calculator` (~1,600/mo)
  - `vehicle to load runtime calculator` (~1,000/mo)
  - `ev backup power calculator` (~1,000/mo)
  - `how long can an ev power a house calculator` (~500/mo)
  - `v2h calculator` (~500/mo)

### Search metadata

- **SEO title:** `Vehicle-to-Load (V2L) Runtime Calculator — EV Emergency Power Duration`
- **Meta description:** `Calculate how many days your EV battery can power your home and appliances using Vehicle-to-Load (V2L) or V2H. Includes driving range reserve and continuous AC power limits.`
- **H1:** `Vehicle-to-Load (V2L) Runtime Calculator`
- **Canonical:** self-canonical to `/ev/v2l-runtime-calculator`

---

## 🥊 Competitor Analysis & UX Value Advantage

### Identified SERP Competitors
1. **Hyundai / Kia Official V2L Marketing Guides:** Text marketing articles highlighting the 3.6 kW V2L feature, but provide zero interactive sizing calculations.
2. **Electrek / CleanTechnica Articles:** General news coverage of Ford F-150 Lightning powering homes during blizzards, with no customizable load calculators.
3. **Reddit DIY Solar & EV Forums (r/Ioniq5, r/F150Lightning):** Disjointed user spreadsheets that require manual formulas to account for vehicle driving reserves.

### How PowerLab Beats Competitors
- **First-Mover Interactive Tool on Google SERP:** Fills a massive content void with a purpose-built, responsive calculator.
- **Protected Driving Range Safeguard:** Allows the user to reserve 15%–30% of battery capacity so they can still drive to an active DC fast charger once the storm clears.
- **Port Output Limit Warnings:** Instantly alerts the user if continuous AC load exceeds vehicle socket capacity (e.g. 1.9 kW for standard 120V V2L or 3.6 kW for 240V V2L).
- **⚡ 1-Click Top 5 EV Outage Presets:** Instant benchmarks for Ioniq 5, EV6, F-150 Lightning, Cybertruck, and EX90.

---

## ⚡ Default First-Load State & Top 5 Presets

### Starter Values (Instant On Mount)
- EV Usable Battery Capacity: **77.4 kWh** (e.g. Hyundai Ioniq 5 / Kia EV6)
- Current Charge (SOC): **90%**
- Driving Reserve Buffer: **20%** (Preserves ~50 miles of driving range)
- Average Connected Load: **350 W** (Refrigerator, Wi-Fi, LED lights, Laptop, TV)
- Inverter Efficiency: **92%**
- Max V2L Output Limit: **3.6 kW (16A 230V / 30A 120V)**

### ⚡ 1-Click Top 5 Presets
1. ⚡ *Critical Wi-Fi & Fridge (200W · 77.4 kWh EV · 20% Reserve)* $\rightarrow$ **10.4 Days Runtime · 51 mi Preserved**
2. 🍲 *Comfort Essentials + Microwave (450W · 77.4 kWh EV · 20% Reserve)* $\rightarrow$ **4.6 Days Runtime · 51 mi Preserved**
3. ❄️ *Winter Storm + Furnace Blower (750W · 77.4 kWh EV · 25% Reserve)* $\rightarrow$ **2.6 Days Runtime · 63 mi Preserved**
4. 🏡 *Heavy Whole-Home Backup (1,800W · 131 kWh F-150 Lightning · 20% Reserve)* $\rightarrow$ **2.1 Days Runtime · 68 mi Preserved**
5. ⛺ *Camping / Tailgate Power (300W · 58 kWh Standard EV · 30% Reserve)* $\rightarrow$ **4.7 Days Runtime · 58 mi Preserved**

---

## 📊 Visual Graphs & Data Representations

- **Multi-Day Outage Discharge Simulation Line:**
  - Plots battery energy depletion day-by-day (e.g. Day 1: 75% $\rightarrow$ Day 2: 60% $\rightarrow$ Day 3: 45% $\rightarrow$ Day 4: 30% $\rightarrow$ Day 5: 20% cutoff).
  - Red dashed line shows the protected driving buffer zone.
- **Driving Range Protection Badge:**
  - Highlights `🚗 Protected Driving Buffer: ~51 Miles (15.5 kWh)` to prevent running out of power.

---

## Calculation model

```text
StartingEnergyWh = BatteryCapacityKWh × 1,000 × (StartingSocPercent / 100)
ReserveEnergyWh = BatteryCapacityKWh × 1,000 × (DrivingReservePercent / 100)
AvailableEnergyWh = Max(0, StartingEnergyWh - ReserveEnergyWh)

DeliveredAcEnergyWh = AvailableEnergyWh × (InverterEfficiencyPercent / 100)
RuntimeHours = DeliveredAcEnergyWh / AverageLoadWatts
RuntimeDays = RuntimeHours / 24

PreservedMiles = (ReserveEnergyWh / 1000) × 3.3 // average 3.3 mi/kWh vehicle efficiency

// Power Overload Warning
If AverageLoadWatts > MaxV2LOutputWatts:
  ShowWarning("Continuous load exceeds your vehicle's maximum V2L port capacity.")
```

## Required outputs

- **Primary:** Total Outage Runtime (Days & Hours).
- **Driving Range Safeguard:** Protected vehicle driving range (miles / km).
- **Interactive Visual:** Multi-day battery discharge curve.
- **Handoffs:** Link to `/battery/home-battery-size-calculator` and `/ev/ev-range-calculator`.
