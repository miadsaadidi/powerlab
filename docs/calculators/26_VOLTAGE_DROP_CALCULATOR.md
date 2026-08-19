# DC & AC Voltage Drop / Wire Size Calculator — Build Specification

## Route

`/battery/voltage-drop-calculator`

## Release phase

**Phase 5 (Expansion).** Planned route.

## Product job

Calculate electrical voltage drop (volts and percentage), power loss in watts, and recommended minimum conductor gauge (AWG / $\text{mm}^2$) for DC (12V, 24V, 48V) and AC (120V, 240V) wiring circuits based on current, distance, conductor material, and NEC $3\%$ safety standards.

## User intent

> What wire gauge do I need to keep voltage drop below 3% over a given distance and current?

## SEO target

- **Primary:** `voltage drop calculator`
- **Planner volume:** ~74,000/month
- **Planner advertiser competition:** Low (index 0)
- **Organic competition:** Medium–High
- **Validated secondary keywords:**
  - `dc voltage drop calculator` (~9,900/mo)
  - `12v wire size calculator` (~6,600/mo)
  - `solar wire size calculator` (~5,000/mo)
  - `battery cable size calculator` (~2,400/mo)

### Search metadata

- **SEO title:** `Voltage Drop Calculator — DC & AC Wire Size Sizing`
- **Meta description:** `Calculate DC & AC voltage drop percentage, power loss in watts, and recommended wire gauge (AWG / mm²) for 12V, 24V, 48V, 120V, and 240V circuits to meet NEC 3% limits.`
- **H1:** `Voltage Drop & Wire Size Calculator`
- **Canonical:** self-canonical to `/battery/voltage-drop-calculator`

---

## 🥊 Competitor Analysis & UX Value Advantage

### Identified SERP Competitors
1. **Southwire Voltage Drop Calculator:** Standard electrical industry tool, but geared strictly toward licensed commercial electricians with complex conduit fill and ambient temperature correction inputs that overwhelm DIYers.
2. **Calculator.net (Voltage Drop Calculator):** Desktop-oriented interface with tiny text inputs, difficult to manipulate on a mobile device under a vehicle hood or inside a battery compartment.
3. **12 Volt Planet (Cable Size Calculator):** Excellent UK DC tool, but restricted to metric mm² wire sizes with no automatic AWG conversion or AC support.

### How PowerLab Beats Competitors
- **Dual Imperial (AWG / Feet) and Metric ($\text{mm}^2$ / Meters) Sizing:** Seamlessly translates American Wire Gauge (AWG) to European metric cable cross-sections.
- **Color-Coded NEC 3% Safety Meter:** Instant visual confirmation: Green ($<3\%$ optimal), Yellow ($3\%\text{--}5\%$ acceptable for non-critical), Red ($>5\%$ critical power loss & fire risk).
- **Physical Conductor Cross-Section Visual:** Interactive graphic demonstrating the relative physical thickness of the chosen cable (e.g. 14 AWG thin wire vs 2/0 heavy battery cable).
- **⚡ 1-Click Top 5 Wiring Setups:** Vanlife 12V lines, solar array cables, 48V battery banks, and workshop extensions.

---

## ⚡ Default First-Load State & Top 5 Presets

### Starter Values (Instant On Mount)
- Circuit Type: **DC (Direct Current · 2-Wire Round-Trip)**
- System Voltage: **12 V**
- Current: **20 A** (e.g. 250W load)
- One-Way Distance: **15 Feet (4.57 m)**
- Conductor Material: **Copper (75°C)**
- Max Allowable Drop: **3.0% (NEC Standard)**

### ⚡ 1-Click Top 5 Presets
1. 🚐 *Vanlife 12V Fridge Line (12V · 6A · 15 ft · 12 AWG)* $\rightarrow$ **1.9% Drop (Pass)**
2. 🔋 *12V 2000W Inverter Battery Cable (12V · 175A · 4 ft · 2/0 AWG)* $\rightarrow$ **1.2% Drop (Pass)**
3. ☀️ *Solar Rooftop Array to MPPT (60V DC · 25A · 30 ft · 10 AWG)* $\rightarrow$ **1.3% Drop (Pass)**
4. 🔌 *48V Server Rack Battery Bank (48V · 100A · 6 ft · 2 AWG)* $\rightarrow$ **0.8% Drop (Pass)**
5. ⚡ *120V Heavy Workshop Extension (120V AC · 15A · 50 ft · 12 AWG)* $\rightarrow$ **2.4% Drop (Pass)**

---

## 📊 Visual Graphs & Data Representations

- **NEC 3% Safety Scale:**
  - Progress bar with clear color thresholds:
    - `0.0% – 3.0%`: 🟢 **NEC Compliant (Optimal for Sensitive Electronics & Solar)**
    - `3.1% – 5.0%`: 🟡 **Marginal (Acceptable for General Lighting)**
    - `> 5.0%`: 🔴 **Excessive Drop (Overheating Risk & Inverter Low-Voltage Shutdown)**
- **Wire Gauge Physical Thickness Preview:**
  - Scaled circle showing the physical copper cross-section diameter.

---

## Calculation model

```text
// Conductor Resistivity K (ohms-cmil/ft at 75°C)
K_Copper = 12.9
K_Aluminum = 21.2

If CircuitType == "dc" or CircuitType == "ac_single_phase":
  CircuitMultiplier = 2 // Round-trip conductor length
Else (ac_three_phase):
  CircuitMultiplier = 1.732 // sqrt(3)

K = ConductorMaterial == "aluminum" ? K_Aluminum : K_Copper
VoltageDropVolts = (CircuitMultiplier × K × CurrentAmps × OneWayLengthFeet) / ConductorCircularMils
VoltageDropPercent = (VoltageDropVolts / NominalVoltage) × 100
PowerLostWatts = VoltageDropVolts × CurrentAmps
EndVoltage = NominalVoltage - VoltageDropVolts

// Sizing Formula for Minimum AWG
RequiredCircularMils = (CircuitMultiplier × K × CurrentAmps × OneWayLengthFeet) / (NominalVoltage × (TargetMaxDropPercent / 100))
RecommendedAWG = Smallest Standard AWG Gauge where CircularMils >= RequiredCircularMils
```

## Required outputs

- **Primary:** Voltage Drop Percentage (e.g. `1.9% — Pass`).
- **Electrical Specs:** Voltage at Load End (e.g. `11.77 V`), Power Loss (e.g. `4.56 W`), Minimum Safe Conductor Gauge (AWG / $\text{mm}^2$).
- **Safety Indicator:** Color-coded NEC compliance badge.
- **Handoffs:** Link to `/battery/battery-size-calculator` and `/solar/solar-charge-controller-calculator`.
