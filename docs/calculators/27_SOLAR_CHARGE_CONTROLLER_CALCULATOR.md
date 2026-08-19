# Solar Charge Controller / MPPT Sizing Calculator — Build Specification

## Route

`/solar/solar-charge-controller-calculator`

## Release phase

**Phase 5 (Expansion).** Planned route.

## Product job

Size MPPT (Maximum Power Point Tracking) and PWM charge controllers by calculating required output amperage, maximum PV array open-circuit voltage ($V_{oc}$) with cold-weather temperature correction, and minimum system safety ratings.

## User intent

> What size MPPT solar charge controller (Amps and Volts) do I need for my solar panel array and battery bank?

## SEO target

- **Primary:** `solar charge controller calculator`
- **Planner volume:** ~6,600/month
- **Planner advertiser competition:** Low (index 5)
- **Organic competition:** Low–Medium
- **Validated secondary keywords:**
  - `mppt calculator` (~5,000/mo)
  - `mppt charge controller sizing calculator` (~1,000/mo)
  - `what size solar charge controller do i need` (~1,000/mo)
  - `solar regulator calculator` (~500/mo)

### Search metadata

- **SEO title:** `Solar Charge Controller Calculator — MPPT & PWM Sizing`
- **Meta description:** `Size the right MPPT or PWM solar charge controller for your panels and battery bank. Calculate required output current (Amps) and cold-weather array voltage (Voc).`
- **H1:** `Solar Charge Controller Calculator`
- **Canonical:** self-canonical to `/solar/solar-charge-controller-calculator`

---

## 🥊 Competitor Analysis & UX Value Advantage

### Identified SERP Competitors
1. **Victron Energy (MPPT Calculator):** Powerful tool, but strictly proprietary to Victron model numbers and requires extensive technical data sheets.
2. **Explorist.life (Solar Charge Controller Calculator):** Good camper van focus, but only filters Victron affiliate links rather than providing universal generic specifications.
3. **FarOutRide (MPPT Solar Sizing Calculator):** High technical accuracy on temperature coefficients, but presents a long dense article with a complex form.

### How PowerLab Beats Competitors
- **Brand-Neutral Generic & Commercial Sizing:** Provides both universal electrical specs (e.g. `100V / 30A MPPT Controller`) and maps to standard hardware classes across all brands (Victron, Renogy, Epever, MidNite Solar).
- **Sub-Zero Cold Weather $V_{oc}$ Protection:** Automatically calculates the voltage rise coefficient when temperatures drop to $-10^\circ\text{C}$ / $-20^\circ\text{C}$ to prevent destroying controller transistors.
- **Series vs. Parallel Array Comparison:** Compares 2S vs 2P wiring advantages (higher voltage = thinner wire and lower voltage drop).
- **⚡ 1-Click Top 5 Array Presets:** Instant autofill for vanlife, cabins, homesteads, and boats.

---

## ⚡ Default First-Load State & Top 5 Presets

### Starter Values (Instant On Mount)
- Total Solar Array Power: **800 W** (4× 200W Panels)
- Battery Bank Nominal Voltage: **12 V**
- Controller Technology: **MPPT (Maximum Power Point Tracking)**
- Panel Open-Circuit Voltage ($V_{oc}$): **24.3 V** (Standard 12V class panel)
- Array Wiring: **2 in Series × 2 in Parallel (2S2P)**
- Lowest Ambient Winter Temp: **-10 °C (14 °F)**
- Temperature Coefficient: **-0.33% / °C**

### ⚡ 1-Click Top 5 Presets
1. 🚐 *Vanlife 400W Array (400W · 12V Battery · 2S · 48.6V Voc · -10°C)* $\rightarrow$ **MPPT 75V / 35A**
2. 🏕️ *Cabin 800W Array (800W · 24V Battery · 2S2P · 48.6V Voc · -10°C)* $\rightarrow$ **MPPT 100V / 35A**
3. 🏡 *Off-Grid Homestead 1600W (1600W · 48V Battery · 4S2P · 105V Voc · -20°C)* $\rightarrow$ **MPPT 150V / 35A**
4. ⛵ *Sailboat 200W PWM Setup (200W · 12V Battery · 1S2P · PWM 20A)* $\rightarrow$ **PWM 30V / 20A**
5. 🔋 *Large Ground Mount 3200W (3200W · 48V Battery · 4S4P · 195V Voc · -20°C)* $\rightarrow$ **MPPT 250V / 70A**

---

## 📊 Visual Graphs & Data Representations

- **Cold-Weather $V_{oc}$ Voltage Rise Line Chart:**
  - Shows nominal $25^\circ\text{C}$ panel voltage ($48.6\text{V}$) rising as temperature drops down to $-20^\circ\text{C}$ ($55.8\text{V}$).
  - Displays standard controller maximum voltage ceiling lines ($75\text{V}$, $100\text{V}$, $150\text{V}$) to clearly show safety margins.
- **Series vs. Parallel Wiring Indicator:**
  - Displays Total String Voltage vs. Total Array Amps based on panel configuration.

---

## Calculation model

```text
// 1. Output Charging Current (Amps into Battery)
ArrayWatts = PanelWatts × TotalPanels
NominalBatteryVoltage = SelectedVoltage (12V, 24V, 48V)

If Technology == "mppt":
  EstimatedCurrentAmps = (ArrayWatts / NominalBatteryVoltage) × 1.25 // 25% NEC safety margin
Else (pwm):
  EstimatedCurrentAmps = (Panel_Isc × ParallelStrings) × 1.25

// 2. Cold-Weather Maximum Input Voltage (Voc Rise)
TempDelta = 25 - LowestExpectedTempCelsius
TempCoeffPercent = 0.33 // standard silicon panel
ColdVoltageMultiplier = 1 + (TempDelta × (TempCoeffPercent / 100))
WorstCaseArrayVoc = (Panel_Voc × SeriesPanels) × ColdVoltageMultiplier

// Standard Hardware Selection
RecommendedMaxVolts = WorstCaseArrayVoc <= 65 ? 75 : WorstCaseArrayVoc <= 90 ? 100 : WorstCaseArrayVoc <= 135 ? 150 : 250
RecommendedAmps = Ceil(EstimatedCurrentAmps / 10) * 10
```

## Required outputs

- **Primary:** Recommended Controller Specification (e.g. `MPPT 100V / 40A Controller`).
- **Safety Breakdown:** Max Cold-Weather Open-Circuit Voltage ($V_{oc}$) and Maximum Continuous Charging Current.
- **Voltage Headroom Callout:** Safety margin between array worst-case $V_{oc}$ and controller ceiling.
- **Handoffs:** Link to `/solar/solar-battery-bank-size-calculator` and `/battery/voltage-drop-calculator`.
