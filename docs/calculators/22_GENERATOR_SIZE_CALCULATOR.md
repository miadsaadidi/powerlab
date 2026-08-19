# Generator Size & Wattage Calculator — Build Specification

## Route

`/home-energy/generator-size-calculator`

## Release phase

**Phase 5 (Expansion).** Planned route.

## Product job

Determine the continuous (running) watts, maximum startup (surge) watts, and recommended generator kW capacity class needed to safely power selected residential or jobsite loads during an electrical outage.

## User intent

> What size generator do I need to run my essential home appliances during a power outage?

## SEO target

- **Primary:** `generator size calculator`
- **Planner volume:** ~40,500/month
- **Planner advertiser competition:** Low (index 8)
- **Organic competition:** Medium–High
- **Validated secondary keywords:**
  - `whole house generator calculator` (~9,900/mo)
  - `what size generator do i need calculator` (~5,000/mo)
  - `generator wattage calculator` (~5,000/mo)
  - `portable generator size calculator` (~1,000/mo)

### Search metadata

- **SEO title:** `Generator Size Calculator — Running & Starting Watts`
- **Meta description:** `Calculate the exact generator size (running and starting watts) needed for your home, RV, or jobsite appliances. Find the right portable or standby generator capacity.`
- **H1:** `Generator Size Calculator`
- **Canonical:** self-canonical to `/home-energy/generator-size-calculator`

---

## 🥊 Competitor Analysis & UX Value Advantage

### Identified SERP Competitors
1. **Generac Home Standby Sizing Tool:** Focuses strictly on selling expensive permanent standby units ($12k–$25k), omitting portable generators entirely.
2. **Champion Power Equipment (Generator Selector):** Simple tabular checklist, but sums all appliance startup surges at once, resulting in absurdly oversized recommendations.
3. **Lowe’s Generator Wattage Calculator:** Good appliance presets, but outdated UI with no sequential motor starting calculation and no power cord / plug compatibility guidance.

### How PowerLab Beats Competitors
- **Sequential Inductive Motor Startup Algorithm:** Accurately sums continuous running watts while adding only the single largest inductive motor surge delta (reflecting real-world breaker behavior).
- **Dual Generator Class Recommendation:** Provides both the budget **Portable Inverter / Open-Frame Generator Class** (e.g. 7,500W / 9,500W surge) and the **Whole-Home Standby Class** (e.g. 14 kW / 22 kW).
- **Plug & Cord Electrical Matcher:** Displays the required NEMA outlet configuration (NEMA L14-30R 30A vs NEMA 14-50R 50A) and minimum generator extension cord gauge (10 AWG vs 6 AWG).
- **⚡ 1-Click Top 5 Storm Presets:** Pre-configured bundles for quick single-click calculations.

---

## ⚡ Default First-Load State & Top 5 Presets

### Starter Values (Instant On Mount)
- Running Load: **2,850 W**
- Peak Starting Surge: **5,500 W**
- Safety Margin: **20%**
- Fuel Selection: **Dual-Fuel (Gasoline / Propane)**

### ⚡ 1-Click Top 5 Presets
1. ⚡ *Storm Essentials (Fridge, Wi-Fi, LED Lights, Phone Chargers · 1,200W run / 2,400W surge)* $\rightarrow$ **3,500W Portable**
2. 🏠 *Suburban Outage + Sump Pump (Fridge, 1/2 HP Sump Pump, Microwave, TV · 2,850W run / 5,500W surge)* $\rightarrow$ **7,500W Portable**
3. ❄️ *Summer Emergency + Window AC (Fridge, 12,000 BTU AC, Lights, Fans · 3,600W run / 7,000W surge)* $\rightarrow$ **8,500W Portable**
4. 🏡 *Whole Home Partial (1 HP Well Pump, Refrigerator, Furnace Blower, Electronics · 5,500W run / 9,500W surge)* $\rightarrow$ **12,000W Generator**
5. 🌾 *Whole House Heavy (Central AC 3-Ton, Well Pump, Water Heater · 11,500W run / 19,000W surge)* $\rightarrow$ **18 kW Standby**

---

## 📊 Visual Graphs & Data Representations

- **Running Load vs. Inductive Surge Stacked Bar:**
  - Solid Blue: Continuous running wattage baseline.
  - Striped Amber: Startup surge delta from the heaviest motor load (compressor/well pump).
  - Green Line: Generator continuous nameplate rating with 20% safety headroom.
- **Generator Size Class Gauge:** Visual meter mapping total watts into standard commercial generator brackets (2 kW Inverter $\rightarrow$ 5 kW Portable $\rightarrow$ 8.5 kW Dual-Fuel $\rightarrow$ 14 kW Standby $\rightarrow$ 22 kW Whole-House).

---

## Calculation model

```text
TotalRunningWatts = Sum(Appliance.RunningWatts × Appliance.Quantity)
MaxMotorSurgeDelta = Max(0, Max(Appliance.SurgeWatts - Appliance.RunningWatts for all active appliances))

TotalPeakStartingWatts = TotalRunningWatts + MaxMotorSurgeDelta
TargetContinuousCapacity = TotalRunningWatts × (1 + SafetyMarginFraction)
TargetSurgeCapacity = TotalPeakStartingWatts × (1 + SafetyMarginFraction)

If TargetContinuousCapacity <= 3500:
  RecommendedClass = "3,500W – 4,500W Inverter Generator"
  RecommendedPlug = "NEMA TT-30 / L5-30 (30A 120V)"
Else If TargetContinuousCapacity <= 7500:
  RecommendedClass = "7,500W – 9,500W Heavy Portable Generator"
  RecommendedPlug = "NEMA L14-30R (30A 120/240V · 10 AWG Cord)"
Else If TargetContinuousCapacity <= 12000:
  RecommendedClass = "10,000W – 12,500W Tri-Fuel Portable"
  RecommendedPlug = "NEMA 14-50R (50A 120/240V · 6 AWG Cord)"
Else:
  RecommendedClass = "14 kW – 22 kW Whole-Home Automatic Standby Generator"
  RecommendedPlug = "Direct Automatic Transfer Switch (ATS 200A)"
```

## Required outputs

- **Primary:** Recommended Generator Class & Minimum Continuous / Surge Wattage.
- **Appliance Breakdown:** Itemized table with individual running watts, surge multipliers, and inductive load tags.
- **Electrical Plug Guidance:** NEMA outlet requirement and recommended cord gauge.
- **Handoffs:** Link to `/battery/battery-runtime-calculator` and `/home-energy/home-battery-size-calculator`.
