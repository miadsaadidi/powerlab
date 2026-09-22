# POWLAB SEO — Internal Linking Architecture & Topic Hub Map

**Domain:** `https://www.powelab.org/`  
**Rule:** No page exists as an isolated orphan. Every major research paper, calculator, dataset, and guide must participate in bidirectional cluster linking.

---

## 1. Master Internal Link Graph

```text
                               ┌─────────────────────────┐
                               │     HOMEPAGE (/)        │
                               └────────────┬────────────┘
                                            │
         ┌───────────────────┬──────────────┴──────────────┬───────────────────┐
         ▼                   ▼                             ▼                   ▼
┌─────────────────┐ ┌─────────────────┐           ┌─────────────────┐ ┌─────────────────┐
│  /battery HUB   │ │   /solar HUB    │           │/home-energy HUB │ │     /ev HUB     │
└────────┬────────┘ └────────┬────────┘           └────────┬────────┘ └────────┬────────┘
         │                   │                             │                   │
         ├───────────────────┼─────────────────────────────┼───────────────────┤
         ▼                   ▼                             ▼                   ▼
┌───────────────────────────────────────────────────────────────────────────────────────┐
│                             /research (MASTER REPOSITORY)                             │
│  • /research/electrochemical-peukert-derating-bess                                    │
│  • /research/ground-view-factor-snow-albedo-pv-tilt                                   │
│  • /research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics                   │
│  • /research/deterministic-inrush-load-stacking-generator-sizing                      │
│  • /research/continuous-duty-thermal-sizing-evse-ampacity                             │
└───────────────────────────────────────────────────────────────────────────────────────┘
         │                   │                             │                   │
         ▼                   ▼                             ▼                   ▼
┌─────────────────┐ ┌─────────────────┐           ┌─────────────────┐ ┌─────────────────┐
│ CALCULATOR ENGINES│ CALCULATOR ENGINES│         │CALCULATOR ENGINES││CALCULATOR ENGINES│
│ • Runtime       │ │ • Tilt          │           │ • Heat Pump     │ │ • Breaker Size  │
│ • Capacity      │ │ • Output        │           │ • AC Running    │ │ • Charging Time │
│ • Sizing        │ │ • Sizing        │           │ • Generator     │ │ • EV Range      │
│ • Inverter      │ │ • Controller    │           │ • Bill Calc     │ │ • Voltage Drop  │
└─────────────────┘ └─────────────────┘           └─────────────────┘ └─────────────────┘
         │                   │                             │                   │
         ▼                   ▼                             ▼                   ▼
┌─────────────────┐ ┌─────────────────┐           ┌─────────────────┐ ┌─────────────────┐
│TECHNICAL GUIDES │ │TECHNICAL GUIDES │           │TECHNICAL GUIDES │ │TECHNICAL GUIDES │
│ • Battery Ah/kWh│ │ • Tilt Angles   │           │ • Daily kWh     │ │ • Level 2 Sizing│
│ • Runtime Math  │ │ • MPPT vs PWM   │           │ • AC vs HP Cost │ │ • Wire Sizing   │
└─────────────────┘ └─────────────────┘           └─────────────────┘ └─────────────────┘
```

---

## 2. Topic Hub Connection Matrix

### A. Battery Cluster (`/battery`)
* **Hub Page:** `/battery`
* **Governing Whitepaper:** `/research/electrochemical-peukert-derating-bess`
* **Benchmark Datasets:**
  * `/datasets/bess-peukert-capacity-derating-tare-loss-benchmark` (`PL-DS-BESS-05`)
  * `/datasets/residential-battery-storage-degradation-and-thermal-loss-benchmark` (`PL-DS-BESS-06`)
* **Calculators:**
  * `/battery/battery-runtime-calculator`
  * `/battery/battery-size-calculator`
  * `/battery/battery-capacity-calculator`
  * `/battery/inverter-size-calculator`
  * `/battery/voltage-drop-calculator`
* **Technical Guides:**
  * `/guides/how-to-calculate-battery-runtime-and-backup-hours`
  * `/guides/battery-capacity-ah-to-kwh-conversion-guide`
* **Cross-Cluster Link:** Connects to `/solar/solar-battery-bank-size-calculator` and `/home-energy/home-battery-size-calculator`.

### B. Solar PV Cluster (`/solar`)
* **Hub Page:** `/solar`
* **Governing Whitepaper:** `/research/ground-view-factor-snow-albedo-pv-tilt`
* **Benchmark Dataset:** `/datasets/50-state-solar-insolation-climatic-benchmark`
* **Calculators:**
  * `/solar/solar-panel-tilt-calculator`
  * `/solar/solar-panel-output-calculator`
  * `/solar/solar-panel-size-calculator`
  * `/solar/solar-charge-controller-calculator`
  * `/solar/solar-payback-calculator`
  * `/solar/solar-battery-bank-size-calculator`
* **Technical Guides:**
  * `/guides/solar-panel-tilt-angle-by-latitude-and-season-guide`
  * `/guides/mppt-solar-charge-controller-sizing-guide`
  * `/guides/solar-payback-and-roi-calculation-guide`
* **Cross-Cluster Link:** Connects to `/battery/battery-size-calculator` and `/home-energy/electricity-usage-calculator`.

### C. Home Energy & HVAC Cluster (`/home-energy`)
* **Hub Page:** `/home-energy`
* **Governing Whitepapers:**
  * `/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics`
  * `/research/deterministic-inrush-load-stacking-generator-sizing`
* **Benchmark Datasets:**
  * `/datasets/cold-climate-heat-pump-cop-degradation-benchmark`
  * `/datasets/central-air-conditioner-seer2-cooling-degree-day-benchmark`
  * `/datasets/standby-generator-motor-inrush-voltage-sag-benchmark`
* **Calculators:**
  * `/home-energy/heat-pump-cost-calculator`
  * `/home-energy/air-conditioner-cost-calculator`
  * `/home-energy/generator-size-calculator`
  * `/home-energy/electricity-usage-calculator`
  * `/home-energy/energy-bill-calculator`
  * `/home-energy/home-battery-size-calculator`
  * `/home-energy/appliance-wattage-calculator`
* **Technical Guides:**
  * `/guides/central-ac-and-heat-pump-electricity-cost-guide`
  * `/guides/how-many-kwh-does-a-house-use-per-day`
  * `/guides/emergency-generator-sizing-and-inrush-load-guide`
* **Cluster Planning Mesh:** Direct bidirectional pathway connects `/guides/how-many-kwh-does-a-house-use-per-day` $\longleftrightarrow$ `/home-energy/electricity-usage-calculator` $\longleftrightarrow$ `/home-energy/energy-bill-calculator` $\longleftrightarrow$ `/home-energy/home-battery-size-calculator`.
* **Cross-Cluster Link:** Connects to `/battery/inverter-size-calculator` and `/ev/ev-charging-time-calculator`.

### D. EV Charging & Infrastructure Cluster (`/ev`)
* **Hub Page:** `/ev`
* **Governing Whitepaper:** `/research/continuous-duty-thermal-sizing-evse-ampacity`
* **Benchmark Dataset:** `/datasets/continuous-duty-evse-terminal-temperature-benchmark`
* **Calculators:**
  * `/ev/ev-charger-breaker-size-calculator`
  * `/ev/ev-charging-time-calculator`
  * `/ev/ev-range-calculator`
* **Technical Guides:**
  * `/guides/level-2-ev-charging-speed-and-breaker-sizing-guide`
  * `/guides/voltage-drop-and-wire-size-calculation-guide`
* **Cluster Planning Mesh:** Direct bidirectional pathway connects `/ev/ev-charger-breaker-size-calculator` $\longleftrightarrow$ `/guides/level-2-ev-charging-speed-and-breaker-sizing-guide` $\longleftrightarrow$ `/datasets/continuous-duty-evse-terminal-temperature-benchmark` (`PL-DS-EVSE-01`) $\longleftrightarrow$ `/ev/ev-charging-time-calculator` $\longleftrightarrow$ `/battery/voltage-drop-calculator`.
* **Cross-Cluster Link:** Connects to `/battery/voltage-drop-calculator` and `/home-energy/energy-bill-calculator`.

---

## 3. Anchor Text Rules & Best Practices

1. **Descriptive, Natural Anchors:** Use context-rich phrases describing the target technical concept.
   * *Good:* `review our BESS Peukert derating and inverter tare loss whitepaper`
   * *Good:* `calculate branch circuit breaker sizing with the Level 2 EVSE Calculator`
   * *Bad:* `click here`, `calculator`, `learn more`, `link`
2. **Avoid Mechanical Exact-Match Stuffing:** Rotate natural anchor variations for the same canonical URL across different contextual sections.
3. **Deep Citation Linking:** When mentioning specific standards (e.g., *NEC Article 625*, *IEEE 485*, *AHRI 210/240*), link directly to `/standards` or the relevant whitepaper methodology section.
