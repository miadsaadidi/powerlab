# Medium Publishing, Interlinking & Performance Tracker

**Domain:** `https://www.powelab.org`  
**Publication Channel:** Medium (`medium.com` — Domain Authority 96)  
**Publishing Cadence:** 1 article every 2 days starting **September 1, 2026** (15 articles in 30 days)  
**Strategy:** High-curiosity engineering teardowns, first-principles physics explainers, and bidirectional interlinking to drive domain authority, AI overview citations, and direct calculator referral traffic.

---

## 1. Strict Link Budget & Anti-Spam Architecture (Saved Editorial Rule)

**CRITICAL EDITORIAL RULE (MANDATORY FOR ALL FUTURE ARTICLES):**
* **Inline Narrative Integration ONLY:** All links MUST be woven naturally into the body paragraphs and narrative sentences where the concepts, standards, or calculations are introduced.
* **NO Separate Link Sections:** NEVER create a standalone "Useful Tools", "Link Summary", or separate link collection section at the bottom.
* **Link Budget per Article:**
  1. **1 to 2 `powelab.org` Tool Links:** Inserted contextually inside calculation or scenario paragraphs (e.g., *"using an open [deterministic savings model](https://www.powelab.org/ev/ev-savings-calculator)..."*).
  2. **1 to 3 High-Authority External Links:** Linked directly to authoritative standards, federal labs, or peer-reviewed papers (e.g., DOE, NREL, IEEE, NFPA 70/NEC, AHRI, ASHRAE, INL).
  3. **1 Sister Medium Article (Optional):** Contextually referenced within the narrative when connecting related engineering concepts.

| Link Type | Allowance | Placement Requirement | Example |
| :--- | :---: | :--- | :--- |
| **1. Primary PowerLab Tool** | **1–2x** | **Inline within body narrative** (e.g., problem or math explanation) | `[interactive EV savings model](https://powelab.org/ev/ev-savings-calculator)` |
| **2. High-Authority Standard** | **1–3x** | **Inline within citation/standard mention** (NREL, DOE, IEEE, NEC, AHRI) | `[Idaho National Laboratory EVSE study](https://avt.inl.gov)` |
| **3. Sister Medium Story** | **0–1x** | **Inline within cross-topic reference** | `[previous teardown on locked rotor amps](...)` |

---

## 2. Full 30-Day Medium Publishing Calendar (September 2026: 15 Topics)

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                            30-DAY MEDIUM EDITORIAL SCHEDULE MATRIX                               │
├───────────────┬─────────────────────────────────────────────────┬────────────────────────────────┤
│ Date          │ Article Title & Theme                           │ Primary Anchor Tool            │
├───────────────┼─────────────────────────────────────────────────┼────────────────────────────────┤
│ Sep 1 (Day 1) │ 1. The Level 1 EV Charging Penalty              │ /ev/ev-savings-calculator      │
│ Sep 3 (Day 3) │ 2. The Locked Rotor Amps (LRA) Ambush           │ /home-energy/generator-size    │
│ Sep 5 (Day 5) │ 3. The $20 vs. $200 Space Heater Lie            │ /home-energy/space-heater-cost │
│ Sep 7 (Day 7) │ 4. The Sub-Zero Solar Voltage Spike             │ /solar/solar-charge-controller │
│ Sep 9 (Day 9) │ 5. The 75°C Terminal Trap (Romex)               │ /ev/ev-charger-breaker-size    │
│ Sep 11 (D 11) │ 6. The Peukert Effect (Lead vs LFP)             │ /battery/battery-runtime       │
│ Sep 13 (D 13) │ 7. The Defrost Cycle Deficit (Heat Pump COP)    │ /home-energy/heat-pump-cost    │
│ Sep 15 (D 15) │ 8. The Winter Snow Albedo Paradox               │ /solar/solar-panel-tilt        │
│ Sep 17 (D 17) │ 9. The Voltage Drop Vampire (DC Solar)          │ /battery/voltage-drop          │
│ Sep 19 (D 19) │ 10. V2L in a Winter Blackout Realities          │ /ev/v2l-runtime-calculator     │
│ Sep 21 (D 21) │ 11. The Daily 30 kWh Vampire Audit              │ /home-energy/electricity-usage │
│ Sep 23 (D 23) │ 12. MPPT vs. PWM Temperature Clipping           │ /solar/solar-load-calculator   │
│ Sep 25 (D 25) │ 13. The Inverter Tare Loss Trap                 │ /battery/inverter-size         │
│ Sep 27 (D 27) │ 14. The Aerodynamic Drag Square ($v^2$) in EVs  │ /ev/ev-range-calculator        │
│ Sep 29 (D 29) │ 15. UPS VA vs. Watts & Active PFC               │ /battery/ups-runtime           │
└───────────────┴─────────────────────────────────────────────────┴────────────────────────────────┘
```

---

## 3. Detailed Topic Specifications, Summary & Link Registry

### Post 1 — September 1, 2026 (Cluster 1: EV & Electrical)
* **Title:** The Level 1 EV Charging Penalty: Why 120V Outlets Waste 15%–25% More Electricity as Pure Heat
* **Target Keyword:** `ev charging cost`, `level 1 vs level 2 ev charging`
* **Summary:** Explains the parasitic baseline draw (~250W–400W) of an EV’s onboard BMS, thermal management pumps, and AC-DC rectifier while awake. At 1.4 kW trickle charging, up to ~25% of grid power is wasted as heat compared to 83%–90% efficiency at 240V Level 2.
* **Primary PowerLab Link:** [`/ev/ev-savings-calculator`](https://www.powelab.org/ev/ev-savings-calculator)
* **Secondary PowerLab Link:** [`/ev/ev-charging-time-calculator`](https://www.powelab.org/ev/ev-charging-time-calculator)
* **External High-Authority Citation:** *Idaho National Laboratory (INL) EVSE Field Studies & Archsmith, Kendall, & Rapson (2015)*
* **Live Medium URL:** [`https://medium.com/@miadpower/level-1-ev-charging-penalty-120v-efficiency-losses-bf8f874626ce`](https://medium.com/@miadpower/level-1-ev-charging-penalty-120v-efficiency-losses-bf8f874626ce) (Published September 2, 2026)

---

### Post 2 — September 3, 2026 (Cluster 2: Battery & Inrush)
* **Title:** The Locked Rotor Amps (LRA) Ambush: Why a 3.5-Ton AC Stalls a 10,000W Generator
* **Target Keyword:** `generator size calculator`, `central ac electricity cost`
* **Summary:** Details inductive motor starting physics. When an AC compressor starts, it draws 5x–7x running wattage (LRA) for ~100ms. Explains generator sub-transient reactance and how soft starters reduce starting spikes by 65% to run on small inverter generators.
* **Primary PowerLab Link:** [`/home-energy/generator-size-calculator`](https://www.powelab.org/home-energy/generator-size-calculator)
* **Secondary PowerLab Link:** [`/home-energy/air-conditioner-cost-calculator`](https://www.powelab.org/home-energy/air-conditioner-cost-calculator)
* **External High-Authority Citation:** *NEMA MG-1 Standard (Motors and Generators) & IEEE Standard 399*
* **Live Medium URL:** *(Pending publication)*

---

### Post 3 — September 5, 2026 (Cluster 3: HVAC & Thermodynamics)
* **Title:** The $20 vs. $200 Space Heater Lie: Why All Electric Heaters Are Exactly 100% Efficient
* **Target Keyword:** `space heater electricity cost`, `electricity usage calculator`
* **Summary:** Breaks down Joule heating and the 1st Law of Thermodynamics ($1\text{ kW} = 3,412\text{ BTU/hr}$). Proves that expensive quartz/infrared heaters produce the exact same BTUs per dollar as a cheap ceramic box, contrasting resistance heating with heat pump vapor compression (COP 3.5 = 350% efficiency).
* **Primary PowerLab Link:** [`/home-energy/space-heater-cost-calculator`](https://www.powelab.org/home-energy/space-heater-cost-calculator)
* **Secondary PowerLab Link:** [`/home-energy/heat-pump-cost-calculator`](https://www.powelab.org/home-energy/heat-pump-cost-calculator)
* **External High-Authority Citation:** *U.S. Department of Energy (DOE) Office of Energy Efficiency & Renewable Energy (EERE)*
* **Live Medium URL:** *(Pending publication)*

---

### Post 4 — September 7, 2026 (Cluster 4: Solar Photovoltaics)
* **Title:** The Sub-Zero Voltage Spike: Why Cold Winter Mornings Destroy Solar Charge Controllers
* **Target Keyword:** `solar charge controller calculator`, `solar panel size calculator`
* **Summary:** Solar panels increase voltage output as temperatures drop due to negative temperature coefficients ($\gamma_{Voc} \approx -0.28\%/^\circ\text{C}$). Demonstrates how a series string within limits at 25°C spikes past dielectric breakdown at -15°C (5°F) under NEC 690.7.
* **Primary PowerLab Link:** [`/solar/solar-charge-controller-calculator`](https://www.powelab.org/solar/solar-charge-controller-calculator)
* **Secondary PowerLab Link:** [`/solar/solar-panel-size-calculator`](https://www.powelab.org/solar/solar-panel-size-calculator)
* **External High-Authority Citation:** *NFPA 70 (NEC) Section 690.7(A) & IEC 61215 PV Standards*
* **Live Medium URL:** *(Pending publication)*

---

### Post 5 — September 9, 2026 (Cluster 1: EV & Electrical)
* **Title:** The 75°C Terminal Trap: Why 6 AWG Romex Can Melt on a 48A EV Charger
* **Target Keyword:** `ev charger breaker size`, `wire size for ev charger`
* **Summary:** Explains the continuous duty 125% rule for EVSE under NEC 625. Shows why 6 AWG NM-B (Romex) rated at 60°C (55A) fails on a 48A charger requiring a 60A breaker, whereas 6 AWG THHN copper in conduit (rated 75°C = 65A) passes safely.
* **Primary PowerLab Link:** [`/ev/ev-charger-breaker-size-calculator`](https://www.powelab.org/ev/ev-charger-breaker-size-calculator)
* **Secondary PowerLab Link:** [`/battery/voltage-drop-calculator`](https://www.powelab.org/battery/voltage-drop-calculator)
* **External High-Authority Citation:** *NFPA 70 National Electrical Code (NEC) Table 310.16 & Section 625.42*
* **Live Medium URL:** *(Pending publication)*

---

### Post 6 — September 11, 2026 (Cluster 2: Battery & Inrush)
* **Title:** The Peukert Effect: Why Your "100Ah" Lead-Acid Battery Dies in 45 Minutes Under Load
* **Target Keyword:** `battery runtime calculator`, `battery capacity calculator`
* **Summary:** Explores Peukert’s Law ($I^k t = C$). Demonstrates why drawing 50A from a 100Ah lead-acid battery ($k=1.25$) yields less than 45 minutes of run time, while LiFePO4 ($k=1.03$) delivers nearly 100% of nominal capacity.
* **Primary PowerLab Link:** [`/battery/battery-runtime-calculator`](https://www.powelab.org/battery/battery-runtime-calculator)
* **Secondary PowerLab Link:** [`/battery/battery-capacity-calculator`](https://www.powelab.org/battery/battery-capacity-calculator)
* **External High-Authority Citation:** *IEEE Standard 485 (Recommended Practice for Sizing Lead-Acid Batteries)*
* **Live Medium URL:** *(Pending publication)*

---

### Post 7 — September 13, 2026 (Cluster 3: HVAC & Thermodynamics)
* **Title:** The Defrost Cycle Deficit: Why a "16 SEER" Heat Pump Drops to 100% Efficiency at 15°F
* **Target Keyword:** `heat pump running cost`, `air conditioner cost calculator`
* **Summary:** Unpacks Carnot cycle efficiency drop in sub-freezing air. Shows the thermodynamic tipping point where heat pump COP drops below 2.0 and triggers 10 kW auxiliary electric resistance heat strips, causing winter utility bill spikes.
* **Primary PowerLab Link:** [`/home-energy/heat-pump-cost-calculator`](https://www.powelab.org/home-energy/heat-pump-cost-calculator)
* **Secondary PowerLab Link:** [`/guides/central-ac-and-heat-pump-electricity-cost-guide`](https://www.powelab.org/guides/central-ac-and-heat-pump-electricity-cost-guide)
* **External High-Authority Citation:** *AHRI Standard 210/240 & ASHRAE Standard 90.1*
* **Live Medium URL:** *(Pending publication)*

---

### Post 8 — September 15, 2026 (Cluster 4: Solar Photovoltaics)
* **Title:** The Winter Snow Albedo Paradox: Why Tilting Solar Panels at 60° Beats Flat Roofs in December
* **Target Keyword:** `solar panel tilt calculator`, `solar panel output calculator`
* **Summary:** Demonstrates how steepening panel tilt to Latitude + 15° sheds heavy snow quickly and captures diffuse backscatter reflection from snow (albedo $\rho \approx 0.80$), yielding higher winter solar kWh than suboptimal low-slope roofs.
* **Primary PowerLab Link:** [`/solar/solar-panel-tilt-calculator`](https://www.powelab.org/solar/solar-panel-tilt-calculator)
* **Secondary PowerLab Link:** [`/solar/solar-panel-output-calculator`](https://www.powelab.org/solar/solar-panel-output-calculator)
* **External High-Authority Citation:** *NREL PVWatts V8 Model Technical Report & Perez Transposition Model*
* **Live Medium URL:** *(Pending publication)*

---

### Post 9 — September 17, 2026 (Cluster 2: Battery & Inrush)
* **Title:** The Voltage Drop Vampire: How Undersized DC Solar Cables Steal 8% of Daily Battery Wattage
* **Target Keyword:** `voltage drop calculator`, `solar wire size calculator`
* **Summary:** Mathematical analysis of low-voltage DC $I^2R$ resistive heating. Shows why running 30A through 10 AWG wire produces an unacceptable drop that causes MPPT charge controllers to exit bulk charge mode prematurely.
* **Primary PowerLab Link:** [`/battery/voltage-drop-calculator`](https://www.powelab.org/battery/voltage-drop-calculator)
* **Secondary PowerLab Link:** [`/guides/voltage-drop-and-wire-size-calculation-guide`](https://www.powelab.org/guides/voltage-drop-and-wire-size-calculation-guide)
* **External High-Authority Citation:** *IEEE Standard 141 (Red Book) & NEC Chapter 9 Table 8*
* **Live Medium URL:** *(Pending publication)*

---

### Post 10 — September 19, 2026 (Cluster 1: EV & Electrical)
* **Title:** Vehicle-to-Load (V2L) in a Winter Blackout: How Long Can an EV Actually Power Your Home?
* **Target Keyword:** `v2l runtime calculator`, `portable power station calculator`
* **Summary:** Real-world modeling of running essential home circuits (fridge, furnace blower, lighting, Wi-Fi) off a 1.9kW to 3.6kW V2L port during a winter grid outage, taking into account inverter tare overhead (80W–150W) and cold lithium derating.
* **Primary PowerLab Link:** [`/ev/v2l-runtime-calculator`](https://www.powelab.org/ev/ev-savings-calculator)
* **Secondary PowerLab Link:** [`/battery/portable-power-station-calculator`](https://www.powelab.org/battery/portable-power-station-calculator)
* **External High-Authority Citation:** *SAE J3072 Interoperability Standard & NREL Energy Storage Integration Studies*
* **Live Medium URL:** *(Pending publication)*

---

### Post 11 — September 21, 2026 (Cluster 3: HVAC & Home Energy)
* **Title:** The Daily 30 kWh Illusion: The 3 "Vampire" Loads Quietly Eating 30% of Your Electric Bill
* **Target Keyword:** `how many kwh does a house use per day`, `electricity usage calculator`
* **Summary:** Separates trivial standby power (phone chargers @ 0.5W) from true continuous energy drains: recirculating domestic hot water pumps (80W continuous = $105/yr), poorly configured pool pumps, and uninsulated HVAC crawlspace ducts.
* **Primary PowerLab Link:** [`/home-energy/electricity-usage-calculator`](https://www.powelab.org/home-energy/electricity-usage-calculator)
* **Secondary PowerLab Link:** [`/guides/how-many-kwh-does-a-house-use-per-day`](https://www.powelab.org/guides/how-many-kwh-does-a-house-use-per-day)
* **External High-Authority Citation:** *U.S. Energy Information Administration (EIA) RECS Data*
* **Live Medium URL:** *(Pending publication)*

---

### Post 12 — September 23, 2026 (Cluster 4: Solar Photovoltaics)
* **Title:** MPPT vs. PWM Temperature Clipping: The Exact Heat Threshold Where Cheap Controllers Lose 30%
* **Target Keyword:** `solar charge controller calculator`, `solar load calculator`
* **Summary:** Analyzes $I$-$V$ and $P$-$V$ curves across module operating temperatures. Explains when MPPT step-down tracking delivers 30%+ more energy and when high roof temperatures (45°C) narrow the gap against PWM controllers.
* **Primary PowerLab Link:** [`/solar/solar-charge-controller-calculator`](https://www.powelab.org/solar/solar-charge-controller-calculator)
* **Secondary PowerLab Link:** [`/solar/solar-load-calculator`](https://www.powelab.org/solar/solar-load-calculator)
* **External High-Authority Citation:** *Sandia National Laboratories Photovoltaic System Performance Data*
* **Live Medium URL:** *(Pending publication)*

---

### Post 13 — September 25, 2026 (Cluster 2: Battery & Storage)
* **Title:** The Inverter Tare Loss Trap: Why Running a 3,000W Inverter for a 15W CPAP Kills Your Battery Overnight
* **Target Keyword:** `inverter size calculator`, `battery size calculator`
* **Summary:** Explains no-load idle consumption (tare loss). An oversized 3,000W low-frequency inverter burns 35W–50W continuously just to keep its internal magnetic core energized, draining 600Wh overnight even if the load is tiny.
* **Primary PowerLab Link:** [`/battery/inverter-size-calculator`](https://www.powelab.org/battery/inverter-size-calculator)
* **Secondary PowerLab Link:** [`/battery/battery-size-calculator`](https://www.powelab.org/battery/battery-size-calculator)
* **External High-Authority Citation:** *IEEE Standard 1547 & UL 1741 Standard for Inverters and Controllers*
* **Live Medium URL:** *(Pending publication)*

---

### Post 14 — September 27, 2026 (Cluster 1: EV & Physics)
* **Title:** The Aerodynamic Drag Square ($v^2$): Why Driving 80 mph Instead of 65 mph Destroys 25% of EV Range
* **Target Keyword:** `ev range calculator`, `ev savings calculator`
* **Summary:** Applies aerodynamic drag equations ($F_D = \frac{1}{2} \rho v^2 C_d A$) to highway EV consumption. Demonstrates why cruising at 80 mph versus 65 mph increases aerodynamic resistance by over 50%, resulting in 20%–25% range loss in real-world driving.
* **Primary PowerLab Link:** [`/ev/ev-range-calculator`](https://www.powelab.org/ev/ev-range-calculator)
* **Secondary PowerLab Link:** [`/ev/ev-savings-calculator`](https://www.powelab.org/ev/ev-savings-calculator)
* **External High-Authority Citation:** *EPA Fuel Economy / Automotive Engineering Drag Coefficient Studies*
* **Live Medium URL:** *(Pending publication)*

---

### Post 15 — September 29, 2026 (Cluster 2: Battery & UPS)
* **Title:** UPS VA vs. Watts: Why a "1500VA" UPS Shuts Down on a 900W Gaming PC with Active PFC
* **Target Keyword:** `ups runtime calculator`, `ups battery size calculator`
* **Summary:** Explains apparent power (Volt-Amps) versus real power (Watts), power factor ($\text{PF}$), and simulated stepped sine-wave distortion with modern active Power Factor Correction (APFC) power supplies.
* **Primary PowerLab Link:** [`/battery/ups-runtime-calculator`](https://www.powelab.org/battery/ups-runtime-calculator)
* **Secondary PowerLab Link:** [`/battery/ups-battery-size-calculator`](https://www.powelab.org/battery/ups-battery-size-calculator)
* **External High-Authority Citation:** *IEC 62040-3 Uninterruptible Power Systems Performance Standard*
* **Live Medium URL:** *(Pending publication)*

---

## 4. Live URL & Metric Tracking Log

| Post # | Published Date | Live Medium Story URL | Views | Reads | Read Ratio | Claps | PowerLab Clicks | Key Observation |
| :-: | :---: | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **1** | Sep 1, 2026 | *(Pending)* | — | — | — | — | — | Launch day baseline |
| **2** | Sep 3, 2026 | *(Pending)* | — | — | — | — | — | |
| **3** | Sep 5, 2026 | *(Pending)* | — | — | — | — | — | |
| **4** | Sep 7, 2026 | *(Pending)* | — | — | — | — | — | |
| **5** | Sep 9, 2026 | *(Pending)* | — | — | — | — | — | |
| **6** | Sep 11, 2026 | *(Pending)* | — | — | — | — | — | |
| **7** | Sep 13, 2026 | *(Pending)* | — | — | — | — | — | |
| **8** | Sep 15, 2026 | *(Pending)* | — | — | — | — | — | |
| **9** | Sep 17, 2026 | *(Pending)* | — | — | — | — | — | |
| **10**| Sep 19, 2026 | *(Pending)* | — | — | — | — | — | |
| **11**| Sep 21, 2026 | *(Pending)* | — | — | — | — | — | |
| **12**| Sep 23, 2026 | *(Pending)* | — | — | — | — | — | |
| **13**| Sep 25, 2026 | *(Pending)* | — | — | — | — | — | |
| **14**| Sep 27, 2026 | *(Pending)* | — | — | — | — | — | |
| **15**| Sep 29, 2026 | *(Pending)* | — | — | — | — | — | |
