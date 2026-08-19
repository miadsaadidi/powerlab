# Inverter Size Calculator — Build Specification

## Route

`/battery/inverter-size-calculator`

## Release phase

**Phase 5 (Expansion).** Planned route.

## Product job

Size DC-to-AC pure sine wave inverters by calculating the combined continuous AC wattage, motor/inductive startup surge demand, and DC battery bank current draw.

## User intent

> What size inverter (Watts) do I need to run my appliances from a 12V, 24V, or 48V battery bank?

## SEO target

- **Primary:** `inverter size calculator`
- **Planner volume:** ~8,100/month
- **Planner advertiser competition:** Low (index 9)
- **Organic competition:** Medium
- **Validated secondary keywords:**
  - `solar inverter size calculator` (~3,600/mo)
  - `what size inverter do i need calculator` (~2,400/mo)
  - `power inverter calculator` (~1,600/mo)
  - `inverter wattage calculator` (~1,000/mo)

### Search metadata

- **SEO title:** `Inverter Size Calculator — Continuous & Surge Watts Sizing`
- **Meta description:** `Calculate the exact inverter size in continuous and surge watts needed to run your appliances from a battery. Find the right 12V, 24V, or 48V inverter capacity.`
- **H1:** `Inverter Size Calculator`
- **Canonical:** self-canonical to `/battery/inverter-size-calculator`

---

## 🥊 Competitor Analysis & UX Value Advantage

### Identified SERP Competitors
1. **Inverters R Us (Sizing Calculator):** Good commercial selection, but requires manual calculation of appliance surges and pushes specific retail products.
2. **Renogy (Inverter Sizing Guide):** Basic text guide with a simple static table, lacking dynamic multi-appliance builders.
3. **CalcPanel (Inverter Load Calculator):** Technical tool, but ignores the DC battery-side current draw (Amps), which is critical for wire and fuse safety sizing.

### How PowerLab Beats Competitors
- **Comprehensive AC & DC Side Sizing:** Calculates both the **AC continuous & surge wattage** and the **DC battery current draw (Amps)**, recommending the correct **ANL / Class-T DC fuse size** and battery cable gauge.
- **Motor Inductive Surge Multipliers:** Automatically applies 2× to 3× startup surge multipliers for refrigerators, power tools, and air conditioners.
- **Pure Sine Wave vs. Modified Sine Wave Guidance:** Clear advisory explaining when sensitive electronics (laptops, CPAP, modern fridges) require pure sine wave.
- **⚡ 1-Click Top 5 System Presets:** Instant autofill from 300W road trip setups to 5000W+ whole-home off-grid inverters.

---

## ⚡ Default First-Load State & Top 5 Presets

### Starter Values (Instant On Mount)
- Combined Running Load: **1,250 W**
- Peak Simultaneous Surge: **2,800 W**
- Battery Bank Voltage: **12 V**
- Inverter Efficiency: **90%**
- Safety Headroom Margin: **20%**
- Waveform Type: **Pure Sine Wave (Recommended)**

### ⚡ 1-Click Top 5 Presets
1. 💻 *Road Trip / Laptop Workstation (150W run / 300W surge · 12V)* $\rightarrow$ **300W Pure Sine Wave · 35A Fuse**
2. 🚐 *Camper Van Essentials (600W run / 1,500W surge · 12V)* $\rightarrow$ **1,000W Pure Sine Wave · 125A Fuse**
3. ☕ *Off-Grid Kitchen (1,800W run / 3,200W surge · 12V/24V)* $\rightarrow$ **2,000W Pure Sine Wave · 200A Fuse**
4. 🏡 *Cabin / Tiny House (2,500W run / 5,000W surge · 24V)* $\rightarrow$ **3,000W Pure Sine Wave · 150A Fuse**
5. ⚡ *Whole-House Off-Grid (4,800W run / 9,600W surge · 48V)* $\rightarrow$ **5,000W+ Inverter/Charger · 150A Fuse**

---

## 📊 Visual Graphs & Data Representations

- **Inverter Capacity & Surge Headroom Radial Gauge:**
  - Shows continuous load percentage (e.g. 62% of 2,000W rating) with green/yellow safety zones.
- **DC Battery-Side Current & Cable Sizing Callout:**
  - Displays primary DC current draw (e.g. `115.7 Amps DC at 12V`) $\rightarrow$ Recommends `150A Class-T Fuse` + `1/0 AWG Cable`.

---

## Calculation model

```text
TotalRunningWatts = Sum(Appliance.Watts × Appliance.Quantity)
MaxSingleSurgeDelta = Max(0, Max(Appliance.SurgeWatts - Appliance.Watts for all appliances))
TotalSurgeWatts = TotalRunningWatts + MaxSingleSurgeDelta

MinimumContinuousInverterRating = TotalRunningWatts × (1 + HeadroomMarginFraction)
MinimumSurgeInverterRating = TotalSurgeWatts × (1 + HeadroomMarginFraction)

// Standard Inverter Brackets
RecommendedContinuousWatts = NextStandardInverter(300, 600, 1000, 1500, 2000, 3000, 5000, 8000) >= MinimumContinuousInverterRating

// DC Current & Fuse Sizing
MaxContinuousDC_Amps = TotalRunningWatts / (BatteryVoltage × (InverterEfficiencyPercent / 100))
RecommendedDCFuseAmps = NextStandardFuse(30, 50, 80, 100, 125, 150, 200, 250, 300, 400) >= (MaxContinuousDC_Amps × 1.25)
```

## Required outputs

- **Primary:** Recommended Inverter Continuous & Surge Rating (e.g. `2,000 W Pure Sine Wave (4,000 W Surge)`).
- **DC Safety Specs:** Maximum DC Current Draw (Amps), Recommended DC Fuse Rating, and Minimum Battery Cable Gauge.
- **Waveform Advisory:** Specific warnings on pure sine wave requirements for motors and electronics.
- **Handoffs:** Link to `/battery/battery-size-calculator` and `/battery/voltage-drop-calculator`.
