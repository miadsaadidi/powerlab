# Space Heater Running Cost Calculator — Build Specification

## Route

`/home-energy/space-heater-cost-calculator`

## Release phase

**Phase 5 (Expansion).** Planned route.

## Product job

Calculate the exact hourly, nightly (8 hours), and monthly electric bill cost of operating electric space heaters, ceramic heaters, oil-filled radiators, and infrared heaters based on power wattage, thermostat cycling, and local electricity rates.

## User intent

> How much does it cost per hour and per night to run an electric space heater in my room?

## SEO target

- **Primary:** `space heater electricity cost calculator`
- **Planner volume:** ~18,100/month (spikes to 65k+ in November–January)
- **Planner advertiser competition:** Low (index 1)
- **Organic competition:** Medium
- **Validated secondary keywords:**
  - `space heater cost calculator` (~9,900/mo)
  - `how much does a space heater cost to run` (~8,100/mo)
  - `1500 watt space heater cost calculator` (~5,000/mo)
  - `electric heater running cost calculator` (~5,000/mo)

### Search metadata

- **SEO title:** `Space Heater Electricity Cost Calculator — Hourly & Nightly Running Cost`
- **Meta description:** `Calculate how much your electric space heater costs to run per hour, 8-hour night, and month. See exact electricity costs for 500W, 1000W, and 1500W heaters.`
- **H1:** `Space Heater Electricity Cost Calculator`
- **Canonical:** self-canonical to `/home-energy/space-heater-cost-calculator`

---

## 🥊 Competitor Analysis & UX Value Advantage

### Identified SERP Competitors
1. **EnergyUseCalculator (Space Heater Calculator):** Ad-heavy, outdated desktop tool with rigid text inputs and no thermostat duty-cycle modeling.
2. **RunningCostCalculator.com:** Basic UK-focused tool with static rate assumptions and no overnight sleep cost breakdown.
3. **Calculator.net (Electricity Calculator):** General multi-appliance page with no space-heater-specific wattage presets or zone heating tips.

### How PowerLab Beats Competitors
- **Immediate Overnight Sleep Breakdown:** Provides the #1 answer visitors look for: *"How much does running this overnight (8 hours) add to my bill?"* (e.g. `$1.51 / night`).
- **Thermostat vs. Full-Blast Toggle:** Shows the dramatic cost difference between 100% continuous full-blast operation ($2.16/night) vs. 70% thermostat cycling ($1.51/night).
- **⚡ 1-Click Top 5 Heater Presets:** Pre-configured settings for under-desk 500W heaters, ceramic 1500W heaters, oil radiators, and infrared heaters.

---

## ⚡ Default First-Load State & Top 5 Presets

### Starter Values (Instant On Mount)
- Heater Wattage: **1,500 W** (Standard maximum household plug-in heater)
- Daily Usage: **8 Hours / Day** (Standard overnight sleep period)
- Thermostat Duty Cycle: **70%** (Thermostat actively cycling element on/off)
- Electricity Rate: **$0.18 / kWh** (or inherited from Energy Profile)

### ⚡ 1-Click Top 5 Presets
1. 🪑 *Under-Desk Personal Heater (500W · 100% duty · 8h work day)* $\rightarrow$ **$0.09/hr · $0.72/day · $21.90/mo**
2. 🛏️ *Ceramic Bedroom Heater (1,500W · 60% thermostat cycle · 8h sleep)* $\rightarrow$ **$0.16/hr · $1.30/night · $39.50/mo**
3. 🧱 *Oil-Filled Radiator (1,500W High / 900W Medium · 50% cycle · 12h)* $\rightarrow$ **$0.08/hr · $0.97/day · $29.60/mo**
4. ☀️ *Infrared Patio / Garage Heater (1,500W · 100% continuous · 4h evening)* $\rightarrow$ **$0.27/hr · $1.08/day · $32.90/mo**
5. 👶 *Low-Watt Nursery Heater (750W · 70% thermostat cycle · 10h)* $\rightarrow$ **$0.09/hr · $0.95/night · $28.80/mo**

---

## 📊 Visual Graphs & Data Representations

- **Thermostat Cycling Savings Visual Card:**
  - Displays the cost reduction of using an automatic thermostat ($-30\%$ to $-50\%$ bill reduction) vs running the heating element continuously.
- **Hourly vs. Nightly vs. Monthly Cost Cards:**
  - Distinct highlighted badges: `Cost per Hour`, `Cost per 8h Night`, `Cost per Winter Month (30 Days)`.

---

## Calculation model

```text
ActiveKW = HeaterWatts / 1000
EffectiveHourlyKWh = ActiveKW × (ThermostatDutyCyclePercent / 100)

CostPerHour = EffectiveHourlyKWh × ElectricityPricePerKWh
CostPerNight8h = CostPerHour × 8
CostPerDay = CostPerHour × DailyOperatingHours
CostPerMonth = CostPerDay × 30.4375

// Comparison vs 100% Continuous
ContinuousDailyCost = ActiveKW × DailyOperatingHours × ElectricityPricePerKWh
ThermostatSavingsPerMonth = (ContinuousDailyCost - CostPerDay) × 30.4375
```

## Required outputs

- **Primary:** Cost per Hour ($/hr) and Cost per 8-Hour Night ($/night).
- **Monthly Summary:** Estimated monthly heating electricity bill.
- **Thermostat Savings Indicator:** Dollar savings from thermostat cycling vs continuous full load.
- **Handoffs:** Link to `/home-energy/electricity-usage-calculator` and `/home-energy/energy-bill-calculator`.
