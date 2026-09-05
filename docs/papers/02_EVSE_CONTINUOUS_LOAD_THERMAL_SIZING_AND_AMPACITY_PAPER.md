# Continuous-Duty Thermal Sizing, Conductor Terminal Limits, and Branch Circuit Ampacity Requirements for Residential Level 2 Electric Vehicle Supply Equipment (EVSE)

**A Technical Report and Mathematical Framework on NEC Articles 625, 310, and 110.14(C)**

**Authors:** Miad S., PowerLab Engineering & Applied Energy Modeling Group  
**Affiliation:** PowerLab Research Initiative (`https://www.powelab.org`)  
**Publication Date:** August 2026  
**Document Identifier:** PL-WP-2026-02  
**Target Subject Classification:** Electrical Power Systems, Building Electrification, Thermal Analysis, Electrical Safety & Standards (NFPA 70 / NEC, IEEE, UL, SAE)

---

## Abstract

The accelerated transition toward residential transportation electrification has made continuous, high-amperage alternating-current (AC) loads standard in residential electrical distributions. Electric Vehicle Supply Equipment (EVSE) operating at Level 2 (208V/240V, 16A to 80A) represents the single largest continuous electrical load in modern dwellings. Unlike conventional cyclic appliances (such as compressors or water heaters), EV charging draws maximum rated nameplate amperage continuously for 4 to 12 consecutive hours. Under these duty cycles, enclosed branch circuit conductors, overcurrent protection devices (OCPDs), and termination lugs reach steady-state thermal saturation. 

This paper develops a deterministic mathematical framework analyzing the multi-variable thermal dynamics of EVSE branch circuits under NFPA 70 (National Electrical Code - NEC) Articles 625, 310, and 110.14(C). We isolate four critical failure modes frequently observed in residential installations: (1) bi-metallic trip fatigue from violating the 125% continuous duty multiplier ($I_{\text{continuous}} \times 1.25$); (2) premature terminal insulation breakdown caused by disregarding 75°C breaker lug temperature ratings when applying 90°C conductor ampacity tables; (3) illegal deployment of 6 AWG Non-Metallic Sheathed Cable (NM-B Romex) on 48A continuous charging circuits; and (4) contact resistance ($R_{\text{contact}}$) degradation in consumer-grade NEMA 14-50 receptacles under thermal cycling. We provide closed-form thermodynamic equations, ampacity derating matrices, and open computational models implemented at `https://www.powelab.org/ev/ev-charger-breaker-size-calculator`.

**Keywords:** Level 2 EVSE, Continuous Electrical Load, NEC Article 625, Conductor Ampacity, Joule Heating, Terminal Temperature Derating, Bi-metallic Breaker Deflection, NEMA 14-50 Contact Degradation.

---

## 1. Introduction & Problem Formulation

In conventional residential electrical design, standard branch circuits are sized under the empirical assumption of non-coincident, intermittent duty cycles. Standard household appliances (refrigerators, microwaves, dishwashers, air conditioners) cycle on and off based on thermostatic or user controls, rarely maintaining peak nameplate power draw for more than 20 to 45 continuous minutes. Consequently, branch conductors and electrical panels operate well below their thermal saturation thresholds, allowing passive thermal dissipation to ambient surroundings.

Electric Vehicle Supply Equipment (EVSE) completely alters this thermodynamic equilibrium. A typical Level 2 charging session delivers 7.68 kW (32A @ 240V) to 19.2 kW (80A @ 240V) uninterrupted for 6 to 10 hours overnight. 

```text
┌────────────────────────────────────────────────────────────────────────┐
│               RESIDENTIAL ELECTRICAL THERMAL REGIMES                   │
├──────────────────────────────────┬─────────────────────────────────────┤
│ Intermittent Load (HVAC/Dryer)   │ Continuous Load (Level 2 EVSE)      │
│ • Peak draw: 15–45 minutes       │ • Peak draw: 4–12 hours uninterrupted│
│ • Conductor cools between cycles │ • Steady-state thermal saturation   │
│ • Operates at transient thermal  │ • Operates at terminal equilibrium  │
│   state ($T(t) \ll T_{\infty}$)  │   state ($T(t) \approx T_{\max}$)   │
└──────────────────────────────────┴─────────────────────────────────────┘
```

Under Article 100 of the National Electrical Code (NEC), a **Continuous Load** is defined as:
> *"A load where the maximum current is expected to continue for 3 hours or more."*

When a load draws continuous current, two distinct thermal mechanisms must be mathematically resolved:
1. **Conductor Steady-State Joule Heating:** $P_{\text{loss}} = I^2 R(T)$, where conductor resistance increases with temperature according to copper's positive temperature coefficient of resistance ($\alpha_{\text{Cu}} \approx 0.00393 / ^\circ\text{C}$).
2. **OCPD Bi-Metallic Thermal Deflection:** Standard thermal-magnetic circuit breakers utilize a calibrated bi-metallic element that deflects in proportion to internal ambient heat plus $I^2 R$ terminal dissipation. Continuous operation above 80% nameplate rating causes nuisance tripping, terminal fatigue, and catastrophic lug annealing.

A widespread, dangerous misconception among non-specialist installers is treating a 48A EV charger as compatible with a 50A branch circuit and NEMA 14-50 receptacle. This paper details the exact mathematical and physical reasons why such configurations violate fundamental thermodynamic safety boundaries and code mandates.

---

## 2. Governing Thermodynamic & Electrical Principles

### 2.1 Conductor Joule Heating and Thermal Equilibrium

For an electrical conductor carrying current $I$ (Amperes) with linear resistance $R_{\text{ac}}$ ($\Omega/\text{m}$), internal volumetric heat generation rate per unit length is expressed by Joule's First Law:

$$\dot{q}_{\text{gen}} = I^2 \cdot R_{\text{ac}}(T) \quad [\text{W/m}]$$

Where conductor resistance at operating temperature $T$ is governed by:

$$R(T) = R_{\text{ref}} \left[ 1 + \alpha_{\text{ref}} (T - T_{\text{ref}}) \right]$$

For pure annealed copper, $T_{\text{ref}} = 20^\circ\text{C}$ and $\alpha_{20} \approx 0.00393\text{ }^\circ\text{C}^{-1}$. As current flows through an enclosed conduit or raceway, heat dissipates to the surrounding ambient environment through multi-stage heat transfer (conduction through the insulation sleeve, convection to raceway air, conduction through the conduit wall, and natural convection + radiation to room air):

$$\dot{q}_{\text{loss}} = h_{\text{eff}} A_s (T_s - T_{\text{amb}}) + \epsilon \sigma A_s \left( T_s^4 - T_{\text{amb}}^4 \right)$$

Under transient charging conditions ($t < 3\text{ hours}$), conductor temperature follows the lumped-capacitance thermal differential equation:

$$m c_p \frac{dT}{dt} = I^2 R(T) - \frac{T - T_{\text{amb}}}{R_{\text{thermal}}}$$

Solving for temperature rise as a function of time:

$$\Delta T(t) = \Delta T_{\text{ss}} \left( 1 - e^{-t / \tau_{\text{th}}} \right)$$

Where $\tau_{\text{th}} = m c_p R_{\text{thermal}}$ is the thermal time constant of the cable-raceway assembly (typically 45 to 90 minutes). 

**Key Finding:** Because EV charging persists for $t \gg 3\tau_{\text{th}}$, the system invariably achieves steady-state thermal saturation ($\Delta T(t) \to \Delta T_{\text{ss}}$). Conductor temperature cannot be evaluated using intermittent duty assumptions.

```text
Conductor Temp (°C)
  ▲
90│                                     ┌─────────────────────────────
  │                                ┌────┘ Steady-State Saturation
75│                           ┌────┘ (Continuous EVSE: 6-10 Hours)
  │                      ┌────┘
60│                 ┌────┘
  │            ┌────┘
  │       ┌────┘ ◄── Intermittent Appliance Duty (Cools before saturation)
30│───────┴────────────────────────────────────────────────────────► Time (Hours)
  0       1       2       3       4       5       6       7       8
```

---

### 2.2 Thermal-Magnetic Overcurrent Protection Physics

Standard molded-case circuit breakers (MCCBs) provide dual overcurrent protection:
1. **Magnetic Trip Element:** Provides instantaneous tripping ($t < 16\text{ ms}$) during high fault currents ($I > 5\text{–}10 \times I_{\text{rated}}$).
2. **Bi-Metallic Thermal Trip Element:** Consists of two bonded metals with differing thermal expansion coefficients ($\Delta \alpha = \alpha_1 - \alpha_2$).

Internal breaker temperature rise is driven by both load current passing through the internal heater and conductive heat transferred from the termination lugs:

$$\theta_{\text{breaker}} = \theta_{\text{ambient}} + k_1 I^2 R_{\text{internal}} + k_2 (T_{\text{conductor}} - T_{\text{ambient}})$$

Standard commercial and residential circuit breakers are factory calibrated to carry **100% of rated nameplate current only in free air at 40°C (104°F)**. When mounted inside an enclosed distribution load center alongside adjacent energized breakers, heat dissipation is constrained.

To prevent the bi-metallic element from drifting into its trip deflection zone under continuous steady-state heat, the National Electrical Code mandates an 80% maximum continuous utilization limit:

$$I_{\text{continuous, max}} \le 0.80 \times I_{\text{OCPD\_rating}}$$

Reciprocally, the required Overcurrent Protection Device rating is:

$$I_{\text{OCPD\_required}} \ge I_{\text{continuous}} \times 1.25$$

---

## 3. Code Harmonization & Terminal Temperature Constraints

### 3.1 NEC Article 625.41 & 625.42 Continuous Load Mandate

Under NEC Article 625.41 (Overcurrent Protection):
> *"Overcurrent protection for electric vehicle supply equipment shall be sized for continuous duty and shall have a rating of not less than 125 percent of the maximum load of the equipment."*

For standard Level 2 continuous charging currents, the minimum required branch circuit breaker rating is computed as:

$$I_{\text{Breaker}} = \lceil I_{\text{EVSE}} \times 1.25 \rceil_{\text{standard}}$$

```text
Table 1: Level 2 Charging Amperages and Mandatory OCPD / Conductor Sizing
┌──────────────────┬─────────────────┬──────────────────┬──────────────────┐
│ Continuous EVSE  │ Minimum OCPD    │ Continuous Power │ Installation     │
│ Charging Current │ Rating (125%)   │ at 240V Nominal  │ Method           │
├──────────────────┼─────────────────┼──────────────────┼──────────────────┤
│ 16 Amps          │ 20 Amp Breaker  │ 3.84 kW          │ Plug or Hardwire │
│ 24 Amps          │ 30 Amp Breaker  │ 5.76 kW          │ Plug or Hardwire │
│ 32 Amps          │ 40 Amp Breaker  │ 7.68 kW          │ Plug (14-50/6-50)│
│ 40 Amps          │ 50 Amp Breaker  │ 9.60 kW          │ Plug (Max Legal) │
│ 48 Amps          │ 60 Amp Breaker  │ 11.52 kW         │ Hardwire ONLY    │
│ 64 Amps          │ 80 Amp Breaker  │ 15.36 kW         │ Hardwire ONLY    │
│ 80 Amps          │ 100 Amp Breaker │ 19.20 kW         │ Hardwire ONLY    │
└──────────────────┴─────────────────┴──────────────────┴──────────────────┘
```

---

### 3.2 NEC Article 110.14(C) Terminal Temperature Rating Mismatch

A pervasive engineering trap in branch circuit design is selecting conductor gauge solely from the 90°C column of NEC Table 310.16 without verifying equipment terminal ratings under NEC 110.14(C).

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   NEC 110.14(C) TEMPERATURE RULE                       │
│                                                                        │
│  [90°C Conductor: THHN] ──► [75°C Breaker Lug] ──► [60°C NM-B Cable]   │
│                                                                        │
│  RULE: Circuit ampacity is strictly governed by the LOWEST rated       │
│  temperature element in the entire termination chain.                  │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Circuits Rated 100A or Less (NEC 110.14(C)(1)(a)):** Conductor ampacity must be based on the **60°C column**, unless the equipment terminals are explicitly listed and marked for 75°C.
2. **Modern Residential Distribution Equipment:** Nearly all modern circuit breakers, load center busbars, and hardwired EVSE terminals are rated for **75°C max**.
3. **90°C Insulation (THHN / XHHW-2):** Although THHN copper wire possesses a 90°C insulation rating, it **cannot be loaded to its 90°C ampacity value at the termination point**. The 90°C rating serves exclusively as a starting benchmark for ambient temperature derating ($k_{\text{temp}}$) and conduit fill adjustment factors ($k_{\text{fill}}$).

---

### 3.3 The 6 AWG Romex (NM-B) 48A Circuit Violation

One of the most dangerous and frequent electrical code violations in residential EVSE installation is utilizing **6 AWG Non-Metallic Sheathed Cable (NM-B / Romex)** to feed a 48A EV charger on a 60A circuit breaker.

Under NEC Article 334.80 (NM-B Ampacity):
> *"The ampacity of Types NM, NMC, and NMS cable shall be determined in accordance with Table 310.16, 60°C (140°F) conductor temperature rating."*

Examining NEC Table 310.16 copper ampacities:
- **6 AWG Copper @ 60°C (NM-B Romex limit):** **55 Amperes**
- **6 AWG Copper @ 75°C (THHN in Conduit limit):** **65 Amperes**
- **6 AWG Copper @ 90°C (Derating Benchmark):** **75 Amperes**

```text
Mathematical Proof of Code Violation:
1. Continuous EVSE current: I_continuous = 48A
2. Required OCPD: I_breaker = 48A × 1.25 = 60A
3. Required minimum conductor ampacity: I_conductor ≥ 60A
4. Rated ampacity of 6 AWG NM-B Romex: I_NM-B = 55A

Conclusion:
I_NM-B (55A) < I_required (60A)  ==>  CODE VIOLATION (Fire Hazard)
```

Because 6 AWG Romex is restricted to 55A, protecting it with a 60A breaker violates NEC 240.4. If NM-B cable is chosen for a 48A charger, **4 AWG Copper NM-B (rated at 70A @ 60°C)** is legally required. Conversely, if **6 AWG THHN copper wire** is pulled through conduit (EMT, PVC, or FMC), its 75°C rating (65A) cleanly satisfies the 60A breaker requirement.

---

## 4. Contact Resistance Degradation in NEMA 14-50 Receptacles

When Level 2 EVSE is connected via plug-and-receptacle rather than hardwired, the physical junction between the receptacle brass contacts and the plug prongs introduces a series contact resistance ($R_{\text{contact}}$).

### 4.1 Contact Power Dissipation

Power dissipated at the plug-receptacle junction is governed by:

$$P_{\text{junction}} = 2 \cdot I^2 \cdot R_{\text{contact}}$$

Where the factor of 2 accounts for both current-carrying hot legs ($L_1$ and $L_2$).

```text
Table 2: Contact Dissipation vs Contact Resistance at 40A Continuous Load
┌───────────────────┬──────────────────┬─────────────────────────────────┐
│ Contact Condition │ R_contact (mΩ)   │ Power Dissipated as Heat (Watts)│
├───────────────────┼──────────────────┼─────────────────────────────────┤
│ Factory New       │ 1.5 mΩ           │ 4.8 W (Safe dissipation)        │
│ Moderate Wear     │ 10.0 mΩ          │ 32.0 W (Elevated housing temp)  │
│ Degraded / Loose  │ 35.0 mΩ          │ 112.0 W (Insulation melting)    │
│ Severe Relaxation │ 80.0 mΩ          │ 256.0 W (Arcing & Fire Runaway) │
└───────────────────┴──────────────────┴─────────────────────────────────┘
```

```text
Thermal Runaway Mechanism in Consumer Receptacles:
High Continuous Current (40A) ──► Steady-State Heat Dissipation
                                             │
Thermal Expansion & Contraction ◄────────────┘
         │
Screw / Blade Torque Relaxation
         │
Contact Surface Oxidation (R_contact Rises)
         │
Joule Heating Multiplies (P = I² R) ──► Catastrophic Housing Melting
```

Standard consumer-grade NEMA 14-50 receptacles (designed for electric ranges that cycle on for 20 minutes) utilize thin stamped-brass contacts. Under 40A continuous EV charging, thermal expansion and contraction causes screw torque relaxation, accelerating contact oxidation and resulting in catastrophic housing melting. 

**Engineering Mandate:** Any continuous charging installation exceeding 32A should eliminate plug interfaces and implement **permanent, hardwired conduit connections** with torque-verified mechanical lugs.

---

## 5. Comprehensive Conductor Sizing & Voltage Drop Matrix

To ensure electrical safety and system efficiency, total AC voltage drop between the main distribution panel and the EVSE terminals should be maintained **under 2.0% for dedicated EV circuits** (and strictly under 3.0% per NEC 210.19(A) Informational Note 4).

Single-phase 240V AC voltage drop is computed as:

$$V_{\text{drop}} = 2 \cdot I \cdot L \cdot \left( \frac{R_{\text{ac}} \cos\theta + X_L \sin\theta}{1000} \right)$$

For unity power factor ($\cos\theta \approx 0.99$ on modern EV onboard rectifiers), reactive impedance $X_L$ is negligible, simplifying to:

$$V_{\text{drop}} \approx \frac{2 \cdot I \cdot L \cdot R_{\text{conductor}}}{1000} \quad [\text{Volts}]$$

$$\% V_{\text{drop}} = \left( \frac{V_{\text{drop}}}{240\text{ V}} \right) \times 100$$

```text
Table 3: Master Conductor Sizing Matrix for Level 2 EVSE (240V AC)
┌───────┬─────────┬──────────────┬──────────────┬────────────────────────┐
│ EVSE  │ Minimum │ Conduit THHN │ NM-B Romex   │ Max One-Way Run Length │
│ Amps  │ Breaker │ Copper Gauge │ Copper Gauge │ for <2.0% Voltage Drop │
├───────┼─────────┼──────────────┼──────────────┼────────────────────────┤
│ 16A   │ 20A     │ 12 AWG       │ 12 AWG       │ 85 Feet (26 m)         │
│ 24A   │ 30A     │ 10 AWG       │ 10 AWG       │ 90 Feet (27 m)         │
│ 32A   │ 40A     │ 8 AWG        │ 8 AWG        │ 95 Feet (29 m)         │
│ 40A   │ 50A     │ 8 AWG*       │ 6 AWG        │ 80 Feet (24 m)         │
│ 48A   │ 60A     │ 6 AWG        │ 4 AWG (Req!) │ 100 Feet (30 m)        │
│ 64A   │ 80A     │ 4 AWG        │ 2 AWG        │ 115 Feet (35 m)        │
│ 80A   │ 100A    │ 2 AWG        │ 1/0 AWG      │ 130 Feet (40 m)        │
└───────┴─────────┴──────────────┴──────────────┴────────────────────────┘
*Note: 8 AWG THHN copper in conduit is rated for 50A @ 75°C, but 6 AWG is recommended for runs >50 ft to mitigate voltage drop.
```

---

## 6. Implementation & Open Calculation Engine

To enable electricians, electrical engineering students, and inspectors to execute these deterministic derivations without calculation errors, PowerLab has published an open-access calculation engine:

$$\text{Interactive Engine: } \text{\url{https://www.powelab.org/ev/ev-charger-breaker-size-calculator}}$$

$$\text{Companion Technical Guide: } \text{\url{https://www.powelab.org/guides/level-2-ev-charging-speed-and-breaker-sizing-guide}}$$

The engine algorithmically resolves:
1. Continuous duty safety scaling ($I \times 1.25$).
2. NEC Table 310.16 conductor ampacity selection matching 60°C, 75°C, and 90°C termination boundaries.
3. Conductor resistance lookup using NEC Chapter 9 Table 8 Circular Mil properties.
4. Terminal power dissipation and charging speed delivery ($\text{kW} = \frac{V \times I}{1000}$).

---

## 7. Conclusion & Summary of Engineering Recommendations

1. **Strict 125% Continuous Duty Enforcement:** EV charging is legally and physically a continuous load. Overcurrent devices and branch conductors must never be sized below $1.25 \times I_{\text{nameplate}}$.
2. **Eliminate 6 AWG Romex on 48A Circuits:** 6 AWG NM-B Romex is restricted to 55A under NEC 334.80. A 48A continuous charging load requires a 60A OCPD, demanding **6 AWG THHN in conduit** or **4 AWG NM-B Romex**.
3. **Hardwire Above 32A Continuous Load:** To eliminate terminal degradation, contact oxidation, and fire risks inherent in consumer-grade NEMA 14-50 receptacles, all EVSE delivering 40A or 48A continuous current should be permanently hardwired using conduit and torque-calibrated terminal lugs.
4. **Terminal Temperature Adherence:** In accordance with NEC 110.14(C), conductor ampacities must never exceed the 75°C rating of the circuit breaker lugs, regardless of 90°C conductor insulation ratings.

---

## References

1. **National Fire Protection Association (NFPA).** *NFPA 70: National Electrical Code (NEC)*, 2023 & 2026 Editions. Articles 100, 110.14(C), 210.19, 220, 240, 310, 334.80, and 625.
2. **IEEE Industry Applications Society.** *IEEE Std 141-1993: Recommended Practice for Electric Power Distribution for Industrial Plants (Red Book)*. IEEE, 1993.
3. **Underwriters Laboratories (UL).** *UL 2594: Standard for Electric Vehicle Supply Equipment*. UL Standards & Engagement, 2022.
4. **Society of Automotive Engineers (SAE).** *SAE J1772: Electric Vehicle and Plug in Hybrid Electric Vehicle Conductive Charge Coupler*. SAE International, 2017.
5. **National Electrical Manufacturers Association (NEMA).** *NEMA WD 6: Wiring Devices — Dimensional Specifications*. NEMA, 2021.
6. **PowerLab Engineering Group.** *Continuous-Duty Thermal Sizing, Conductor Terminal Limits, and Branch Circuit Ampacity Requirements for Residential Level 2 EVSE*. Technical Report PL-TR-2026-EVSE01, PowerLab Open Energy Research, August 2026. [Online: https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity]
