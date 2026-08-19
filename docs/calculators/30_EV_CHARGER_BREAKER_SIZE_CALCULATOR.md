# EV Charger Breaker & Wire Sizing Calculator — Build Specification

## Route

`/ev/ev-charger-breaker-size-calculator`

## Release phase

**Phase 5 (Expansion).** Planned route.

## Product job

Calculate the required circuit breaker amperage, minimum copper conductor wire gauge (AWG / $\text{mm}^2$), conduit size, and maximum continuous charging power (kW) for residential Level 2 EV charging stations according to the National Electrical Code (NEC Article 625) $80\%$ continuous load rule.

## User intent

> What size circuit breaker and wire gauge do I need to install a 32A, 40A, or 48A home Level 2 EV charger?

## SEO target

- **Primary:** `ev charger breaker size calculator`
- **Planner volume:** ~3,600/month
- **Planner advertiser competition:** Low (index 7)
- **Organic competition:** Low–Medium
- **Validated secondary keywords:**
  - `level 2 charger breaker size` (~2,400/mo)
  - `ev charger wire size calculator` (~1,600/mo)
  - `what size breaker for ev charger` (~1,600/mo)
  - `48a ev charger breaker size` (~1,000/mo)
  - `40a ev charger breaker size` (~1,000/mo)

### Search metadata

- **SEO title:** `EV Charger Breaker & Wire Size Calculator — Level 2 Sizing`
- **Meta description:** `Find the exact circuit breaker size, wire gauge (AWG), and charging speed (kW) for your home Level 2 EV charger following the NEC 125% continuous load rule.`
- **H1:** `EV Charger Breaker & Wire Sizing Calculator`
- **Canonical:** self-canonical to `/ev/ev-charger-breaker-size-calculator`

---

## 🥊 Competitor Analysis & UX Value Advantage

### Identified SERP Competitors
1. **ChargePoint Home Flex Sizing Chart:** Simple PDF installation manual table, but lacks dynamic distance-based voltage drop calculations or wire type selection.
2. **Qmerit Electrical EV Sizing Guide:** Commercial installation lead-gen article designed to capture electrical quote leads without providing an interactive sizing tool.
3. **ClipperCreek / Enphase Sizing FAQ:** Static FAQ pages that fail to distinguish between NM-B (Romex 60°C) and THHN (75°C conduit) ampacity limits.

### How PowerLab Beats Competitors
- **NEC 125% Continuous Rule Automation:** Clear visual explanation preventing the #1 beginner mistake: confusing charging rate (e.g. 48A) with circuit breaker capacity (60A).
- **Conductor Insulation Type Selection:** Accurately differentiates Romex (NM-B 60°C rating requiring 4 AWG for 60A) from THHN in conduit (75°C rating allowing 6 AWG for 60A).
- **Miles-per-Hour Speed Estimate:** Displays real-world charging speed added (e.g. `+44 mph @ 11.5 kW`).
- **⚡ 1-Click Top 5 Charger Presets:** Instant benchmarks for 16A, 24A, 32A, 40A, 48A, and 80A hardware.

---

## ⚡ Default First-Load State & Top 5 Presets

### Starter Values (Instant On Mount)
- Charger Continuous Output: **48 A (Hardwired 11.5 kW)**
- Electrical Supply Voltage: **240 V AC (Split-Phase)**
- Conductor Material: **Copper**
- Conductor Type: **THHN in Conduit (75°C Rating)**
- One-Way Cable Run: **25 Feet (7.6 m)**

### ⚡ 1-Click Top 5 Presets
1. 🔌 *Standard 32A NEMA 14-50 Plug (32A Charge · 40A Breaker · 8 AWG · 7.7 kW)* $\rightarrow$ **+30 mph added**
2. ⚡ *Fast 40A NEMA 14-50 Plug (40A Charge · 50A Breaker · 6 AWG · 9.6 kW)* $\rightarrow$ **+37 mph added**
3. 🏎️ *Maximum 48A Hardwire (48A Charge · 60A Breaker · 6 AWG THHN · 11.5 kW)* $\rightarrow$ **+44 mph added**
4. 🔋 *Budget 16A Dedicated Circuit (16A Charge · 20A Breaker · 12 AWG · 3.8 kW)* $\rightarrow$ **+15 mph added**
5. 🚚 *Commercial 80A Hardwire (80A Charge · 100A Breaker · 3 AWG · 19.2 kW)* $\rightarrow$ **+75 mph added**

---

## 📊 Visual Graphs & Data Representations

- **NEC 80% / 125% Continuous Circuit Matching Diagram:**
  - Visual electrical circuit card showing:
    `[48A Continuous Load]` ──($\times 1.25$ NEC Continuous Rule)──> `[60A Double-Pole Breaker]` ──> `[6 AWG THHN Wire]`
- **Charging Speed Added Badge:**
  - Real-world miles/hour charging rate indicator (e.g. `⚡ +44 miles per hour added overnight`).

---

## Calculation model

```text
// NEC 625.41 / 210.20 Continuous Duty Sizing (125% Rule)
RequiredBreakerAmps = ChargerContinuousAmps × 1.25
StandardBreakerAmps = NextStandardBreaker(15, 20, 25, 30, 40, 50, 60, 70, 80, 100) >= RequiredBreakerAmps

ChargingPowerKw = (SupplyVoltage × ChargerContinuousAmps) / 1000
MilesPerHourAdded = ChargingPowerKw × 3.8 // average vehicle efficiency

// Wire Gauge Ampacity Lookup (NEC 310.16 Copper)
If ConductorType == "thhn_conduit": // 75°C Column
  If StandardBreakerAmps <= 20: MinimumAWG = "12 AWG"
  Else If StandardBreakerAmps <= 30: MinimumAWG = "10 AWG"
  Else If StandardBreakerAmps <= 50: MinimumAWG = "8 AWG"
  Else If StandardBreakerAmps <= 65: MinimumAWG = "6 AWG"
  Else If StandardBreakerAmps <= 85: MinimumAWG = "4 AWG"
  Else: MinimumAWG = "2 AWG"
Else (romex_nmb): // 60°C Column
  If StandardBreakerAmps <= 20: MinimumAWG = "12 AWG"
  Else If StandardBreakerAmps <= 30: MinimumAWG = "10 AWG"
  Else If StandardBreakerAmps <= 40: MinimumAWG = "8 AWG"
  Else If StandardBreakerAmps <= 55: MinimumAWG = "6 AWG"
  Else If StandardBreakerAmps <= 70: MinimumAWG = "4 AWG"
  Else: MinimumAWG = "2 AWG"
```

## Required outputs

- **Primary:** Required Circuit Breaker Size (e.g. `60 Amp Double-Pole 240V Breaker`).
- **Wiring Specifications:** Minimum Copper Wire Gauge (AWG), Maximum Charging Power (kW), and Miles Added per Hour.
- **NEC Safety Check:** Visual validation showing the circuit does not exceed 80% continuous rating.
- **Handoffs:** Link to `/ev/ev-charging-time-calculator` and `/battery/voltage-drop-calculator`.
