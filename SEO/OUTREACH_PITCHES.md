# POWLAB SEO — Top 10 High-Authority Editorial Outreach Packages (Layer 2)

**Domain:** `https://www.powelab.org/`  
**Protocol:** Strictly value-first editorial pitches tailored to specific publication audiences. No mass automated copy. Prepared for human review and execution.

---

## 1. Energy Storage News (Solar Media)

* **Target Publication:** *Energy Storage News* (`energy-storage.news`)
* **Authority Tier:** A+ (DA 62 / DR 71)
* **Audience:** Utility-scale and commercial BESS developers, grid storage engineers, asset managers, and power system integrators.
* **Topic:** Electrochemical Peukert capacity derating kinetics and continuous parasitic inverter tare losses in stationary battery storage.
* **Target POWLAB Assets:**
  * Canonical Whitepaper: [`PL-TR-2026-BESS01`](https://www.powelab.org/research/electrochemical-peukert-derating-bess)
  * Canonical Dataset: [`PL-DS-BESS-05`](https://www.powelab.org/datasets/bess-peukert-capacity-derating-tare-loss-benchmark)
  * Computational Engine: [BESS Runtime Calculator](https://www.powelab.org/battery/battery-runtime-calculator)
* **What is Genuinely New/Useful:** Empirical test matrices and mathematical modeling showing that low-load continuous inverter tare draw (15W–65W) reduces effective backup autonomy by over 40% during extended light-load emergency scenarios, while LiFePO4 maintains a near-ideal Peukert exponent ($k \approx 1.02–1.05$) compared to flooded/AGM lead-acid ($k \approx 1.15–1.30$).
* **Editorial Pitch Package:**
  * **Subject Line:** Technical Contributor / Data: Why inverter tare losses drain BESS autonomy faster than nameplate ratings suggest
  * **Pitch Body:**
    > Hi [Editor Name / Editorial Team],
    >
    > I've been following Energy Storage News' coverage of stationary storage performance and microgrid reliability.
    >
    > The engineering team at PowerLab has just published an open technical report and benchmark dataset evaluating a frequent oversight in stationary BESS sizing: the combined effect of electrochemical Peukert derating across discharge C-rates and continuous quiescent inverter tare losses.
    >
    > While high C-rate derating is well-documented in lead-acid and lithium systems under IEEE 485, our empirical benchmark (tabulating 160 discharge cycles from 0.05C to 2.0C) demonstrates that during low-load emergency backup (e.g., 40W–100W critical communication/monitoring loads), continuous inverter tare dissipation ($P_{\text{tare}} = 15\text{W}–65\text{W}$) can diminish usable battery autonomy by 41.2% to 52.8% compared to standard nameplate calculations.
    >
    > We would be delighted to provide an exclusive technical guest analysis or commentary piece for Energy Storage News breaking down these loss mechanics and providing practical sizing equations for microgrid engineers.
    >
    > The open research paper and peer dataset are accessible here:
    > - Technical Paper: https://www.powelab.org/research/electrochemical-peukert-derating-bess
    > - Benchmark Dataset (DOI 10.6084/m9.figshare.33821940): https://www.powelab.org/datasets/bess-peukert-capacity-derating-tare-loss-benchmark
    >
    > Would this analysis be of interest to your readers?
    >
    > Best regards,  
    > [Your Name / PowerLab Clean Energy Engineering Group]  
    > https://www.powelab.org

---

## 2. PV Magazine International

* **Target Publication:** *PV Magazine International* (`pv-magazine.com`)
* **Authority Tier:** A+ (DA 75 / DR 79)
* **Audience:** Global solar PV manufacturers, EPC contractors, system designers, and utility solar operators.
* **Topic:** Sub-zero photovoltaic string $V_{oc}$ expansion, Perez anisotropic snow albedo transposition, and MPPT dielectric safety under NEC 690.7.
* **Target POWLAB Assets:**
  * Canonical Whitepaper: [`PL-TR-2026-SOL03`](https://www.powelab.org/research/ground-view-factor-snow-albedo-pv-tilt)
  * Canonical Dataset: [`PL-DS-SOL-03`](https://www.powelab.org/datasets/50-state-solar-insolation-climatic-benchmark)
  * Computational Engine: [Solar Panel Tilt & Output Calculator](https://www.powelab.org/solar/solar-panel-tilt-calculator)
* **What is Genuinely New/Useful:** Mathematical quantification of sub-zero open-circuit voltage spikes ($\beta_{Voc}$ expansion up to $+14.2\%$ at $-20^\circ\text{C}$) compounded by ground snow albedo reflections ($\rho_{\text{albedo}} = 0.65–0.80$), creating over-voltage breakdown hazards on charge controllers and string inverters.
* **Editorial Pitch Package:**
  * **Subject Line:** Technical Analysis: Cold-weather PV array Voc expansion and winter snow albedo dielectric risks
  * **Pitch Body:**
    > Hi [Editor Name / PV Magazine Editorial Desk],
    >
    > With winter approaching in the northern hemisphere, cold-climate PV array reliability and sub-zero voltage spikes are critical considerations for commercial and residential solar designers.
    >
    > PowerLab has released a comprehensive technical study and 50-state meteorological benchmark analyzing the dual impact of ground view factor snow albedo gains and sub-zero open-circuit voltage ($V_{oc}$) expansion under NEC Article 690.7 and IEC 61724-1.
    >
    > Key findings from the research:
    > 1. Steep winter panel tilts (Latitude $+ 15^\circ$) increase the ground view factor $(1 - \cos\beta)/2$, boosting diffuse capture by up to 40% across snow cover ($\rho = 0.70$).
    > 2. Ambient temperatures dropping to $-20^\circ\text{C}$ expand string $V_{oc}$ by $+12.5\%$ to $+14.2\%$, causing widespread inverter startup lockout and destructive MPPT dielectric failure if string sizing relies solely on Standard Test Conditions ($25^\circ\text{C}$).
    >
    > We have structured this into a technical brief explaining how system designers can calculate temperature-corrected string limits using ASHRAE extreme minimum design dry-bulb data.
    >
    > Full research and open data:
    > - Technical Paper: https://www.powelab.org/research/ground-view-factor-snow-albedo-pv-tilt
    > - 50-State Dataset: https://www.powelab.org/datasets/50-state-solar-insolation-climatic-benchmark
    >
    > Let me know if you would like us to adapt this into a contributed technical article for PV Magazine.
    >
    > Best regards,  
    > [Your Name / PowerLab Clean Energy Engineering Group]

---

## 3. Energy Central

* **Target Publication:** *Energy Central* (`energycentral.com`)
* **Authority Tier:** A (DA 68 / DR 74)
* **Audience:** Electric utility executives, grid planners, transmission operators, and energy policy analysts.
* **Topic:** Cold-climate heat pump non-linear COP collapse and electric resistance strip heat staging kinetics driving winter grid peak spikes.
* **Target POWLAB Assets:**
  * Canonical Whitepaper: [`PL-TR-2026-HVAC01`](https://www.powelab.org/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics)
  * Canonical Dataset: [`PL-DS-HP-02`](https://www.powelab.org/datasets/cold-climate-heat-pump-cop-degradation-benchmark)
  * Computational Engine: [Heat Pump Running Cost Calculator](https://www.powelab.org/home-energy/heat-pump-cost-calculator)
* **What is Genuinely New/Useful:** Empirical thermodynamic evaluation illustrating how staging 10 kW auxiliary electric resistance strip elements below the thermal balance point ($17^\circ\text{F} / -8.3^\circ\text{C}$) quadruples household peak electric demand ($300\%–400\%$ surge), transforming distributed heating electrification into an aggressive coincident winter peak challenge for distribution utilities.
* **Editorial Pitch Package:**
  * **Subject Line:** Contributor Submission: The 17°F Heat Pump Balance Point — How auxiliary strip heat impacts winter grid peaks
  * **Pitch Body:**
    > Hi [Energy Central Community Team / Editor],
    >
    > As utilities across the US and Europe model rapid residential heating electrification, the thermodynamic behavior of air-source heat pumps below freezing is emerging as a critical grid peak driver.
    >
    > PowerLab's clean energy engineering team has developed a thermodynamic benchmark model tracking Coefficient of Performance (COP) degradation, reverse-cycle defrost latent losses, and auxiliary electric strip heat staging kinetics from $+10^\circ\text{C}$ down to $-25^\circ\text{C}$ under AHRI 210/240-2023.
    >
    > Our dataset reveals that while inverter flash-injection compressors maintain COP $> 2.0$ down to $5^\circ\text{F}$, conventional systems engaging 10 kW auxiliary resistance elements create a simultaneous $4\times$ electrical demand surge at the exact moment of distribution peak strain.
    >
    > We would love to publish a technical thought leadership article on Energy Central detailing the operational balance points and dual-fuel switching economics for utility demand response planners.
    >
    > Research reference:
    > - Research Report: https://www.powelab.org/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics
    > - Open Dataset (DOI 10.6084/m9.figshare.33470950): https://www.powelab.org/datasets/cold-climate-heat-pump-cop-degradation-benchmark
    >
    > Best regards,  
    > [Your Name / PowerLab Clean Energy Engineering Group]

---

## 4. IEEE Spectrum

* **Target Publication:** *IEEE Spectrum* (`spectrum.ieee.org`)
* **Authority Tier:** A+ (DA 89 / DR 88)
* **Audience:** Professional electrical and electronics engineers, researchers, computer scientists, and technology innovators worldwide.
* **Topic:** Deterministic web-based computational engines replacing proprietary black-box modeling in distributed energy resource planning.
* **Target POWLAB Assets:**
  * Canonical Methodology: [`/methodology`](https://www.powelab.org/methodology)
  * Master Standards Registry: [`/standards`](https://www.powelab.org/standards)
  * Computational Engine Suite: [PowerLab Engineering Engines](https://www.powelab.org/calculators)
* **What is Genuinely New/Useful:** Demonstration of pure, zero-database deterministic TypeScript simulation engines executing standards-based calculations (IEEE 485, NEC 625/690/702, AHRI 210/240, NREL PVWatts V8) entirely client-side in the browser, eliminating telemetry friction and enabling verifiable, reproducible engineering results.
* **Editorial Pitch Package:**
  * **Subject Line:** Story Pitch: Bringing reproducible deterministic engineering calculations to the browser
  * **Pitch Body:**
    > Hi [IEEE Spectrum Editorial Team],
    >
    > I am writing to propose a technical feature on an emerging shift in engineering computational tools: moving energy planning from heavyweight, closed-source desktop packages to verifiable, deterministic browser-based calculation engines.
    >
    > Modern web runtimes and TypeScript now allow pure mathematical modeling of complex power systems—such as non-linear motor inrush starting envelopes (ISO 8528-5), BESS Peukert capacity derating (IEEE 485), and Perez solar sky diffuse transposition—with sub-millisecond execution times and zero backend database dependencies.
    >
    > PowerLab has deployed 24 of these open deterministic engines alongside peer-referenced technical whitepapers and DataCite DOIs. We can provide an inside look at how client-side engineering architectures ensure mathematical reproducibility, eliminate user tracking, and adhere strictly to international electrical engineering standards.
    >
    > Methodology: https://www.powelab.org/methodology  
    > Standards Registry: https://www.powelab.org/standards
    >
    > Would this topic fit Spectrum's coverage of software and computational engineering?
    >
    > Sincerely,  
    > [Your Name / PowerLab Clean Energy Engineering Group]

---

## 5. EE Times (Electronic Engineering Times)

* **Target Publication:** *EE Times* (`eetimes.com`)
* **Authority Tier:** A+ (DA 82 / DR 81)
* **Audience:** Power electronics design engineers, semiconductor specialists, electrical system architects, and component engineers.
* **Topic:** Continuous-duty thermal dissipation ($I^2R$), conductor terminal temperature ratings ($60^\circ\text{C}$ vs $75^\circ\text{C}$), and terminal contact resistance breakdown in Level 2 EVSE.
* **Target POWLAB Assets:**
  * Canonical Whitepaper: [`PL-TR-2026-EVSE01`](https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity)
  * Canonical Dataset: [`PL-DS-EVSE-01`](https://www.powelab.org/datasets/continuous-duty-evse-terminal-temperature-benchmark)
  * Computational Tool: [EV Charger Breaker Size Calculator](https://www.powelab.org/ev/ev-charger-breaker-size-calculator)
* **What is Genuinely New/Useful:** Thermal finite-difference modeling and empirical testing of high-current (48A/80A) continuous charging runs proving why Romex NM-B (capped at $60^\circ\text{C}$ under NEC 334.80) causes destructive thermal runaway at terminal lugs, requiring THHN in conduit rated at $75^\circ\text{C}$ terminations under NEC 110.14(C).
* **Editorial Pitch Package:**
  * **Subject Line:** Technical Article: Why 48A continuous EVSE branch circuits fail terminal thermal limits
  * **Pitch Body:**
    > Hi [Editor Name / EE Times Editorial Team],
    >
    > As residential and commercial Level 2 EV chargers push charging currents to 48A and 80A continuous duty, electrical termination failures and contact overheating have become a major field reliability issue.
    >
    > PowerLab has completed an extensive thermal study and 120-run benchmark dataset investigating Joule heating ($I^2R$) and terminal temperature rise in EVSE branch circuits under NFPA 70 / NEC 625.42 and NEC 110.14(C).
    >
    > The data highlights a severe hazard: utilizing 6 AWG NM-B (Romex) for 48A charging violates the 60°C termination limit (rated 55A vs. required 60A breaker), elevating termination temperatures beyond the 75°C safety boundary when contact torque drops by even 15%.
    >
    > We would like to write an engineering article for EE Times covering the thermal mechanics, wire ampacity deratings, and termination design practices required for high-power EVSE circuits.
    >
    > Research: https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity  
    > Dataset (DOI 10.6084/m9.figshare.33321774): https://www.powelab.org/datasets/continuous-duty-evse-terminal-temperature-benchmark
    >
    > Best regards,  
    > [Your Name / PowerLab Clean Energy Engineering Group]

---

## 6. Power Engineering International

* **Target Publication:** *Power Engineering International* (`power-eng.com`)
* **Authority Tier:** A (DA 61 / DR 68)
* **Audience:** Power generation engineers, standby generator operators, decentralized energy managers, and rotating machine specialists.
* **Topic:** Deterministic modeling of inductive motor locked rotor amperage (LRA) inrush surges, alternator sub-transient reactance ($X''_d$), and non-coincident load stacking under ISO 8528-5.
* **Target POWLAB Assets:**
  * Canonical Whitepaper: [`PL-TR-2026-GEN02`](https://www.powelab.org/research/deterministic-inrush-load-stacking-generator-sizing)
  * Canonical Dataset: [`PL-DS-GEN-04`](https://www.powelab.org/datasets/standby-generator-motor-inrush-voltage-sag-benchmark)
  * Computational Engine: [Emergency Generator Sizing Calculator](https://www.powelab.org/home-energy/generator-size-calculator)
* **What is Genuinely New/Useful:** Empirical transient matrices quantifying instantaneous voltage sag recovery curves across single-phase motor compressor starts, proving that solid-state soft starters reduce starting kVA by $65\%–70\%$, allowing generator capacity to be downsized by up to $45\%$ without risking under-frequency stall.
* **Editorial Pitch Package:**
  * **Subject Line:** Technical Feature: Generator sizing for inductive motor starting — Modeling sub-transient voltage sag under ISO 8528-5
  * **Pitch Body:**
    > Hi [Editor Name / Power Engineering Team],
    >
    > Sizing emergency standby generators for inductive compressor and pump loads remains one of the most common causes of generator stalling during utility outages.
    >
    > PowerLab has published a research report and open transient dataset (180 motor test runs) detailing deterministic inrush current dynamics, NEMA MG-1 locked-rotor codes, and alternator sub-transient reactance ($X''_d$) voltage sag recovery under ISO 8528-5.
    >
    > Our data demonstrates how non-coincident load stacking and solid-state ramp starters allow a 4-ton AC (LRA 82A) to start reliably on an 8.5 kW generator instead of requiring a 16 kW unit, while factoring in multi-fuel derates (10% LPG, 20% Natural Gas).
    >
    > We propose contributing a technical article for Power Engineering International discussing these transient calculations and generator sizing rules.
    >
    > Whitepaper: https://www.powelab.org/research/deterministic-inrush-load-stacking-generator-sizing  
    > Dataset (DOI 10.6084/m9.figshare.33753856): https://www.powelab.org/datasets/standby-generator-motor-inrush-voltage-sag-benchmark
    >
    > Best regards,  
    > [Your Name / PowerLab Clean Energy Engineering Group]

---

## 7. EC&M (Electrical Construction & Maintenance)

* **Target Publication:** *EC&M Magazine* (`ecmweb.com`)
* **Authority Tier:** A+ (DA 67 / DR 73)
* **Audience:** Electrical contractors, master electricians, consulting engineers, and electrical inspectors.
* **Topic:** Practical NEC Code compliance for conductor terminal limits (NEC 110.14(C)), continuous duty (NEC 625 / 690), and voltage drop optimization.
* **Target POWLAB Assets:**
  * Master Standards Registry: [`/standards`](https://www.powelab.org/standards)
  * Computational Engine: [Voltage Drop & Wire Size Calculator](https://www.powelab.org/battery/voltage-drop-calculator)
  * Technical Guide: [Voltage Drop Calculation Guide](https://www.powelab.org/guides/voltage-drop-and-wire-size-calculation-guide)
* **What is Genuinely New/Useful:** Direct mathematical reconciliation of NEC Table 310.16 conductor ampacities with Chapter 9 Table 8 DC resistances and AC reactances, providing step-by-step guidance for calculating voltage drop on long branch feeder runs.
* **Editorial Pitch Package:**
  * **Subject Line:** Code & Practice: Resolving conductor terminal ratings (60°C vs 75°C) and voltage drop on continuous EVSE & solar runs
  * **Pitch Body:**
    > Hi [EC&M Editorial Team],
    >
    > Misunderstanding conductor terminal temperature ratings under NEC 110.14(C) remains a leading cause of inspection failure on residential solar and EV charging installations.
    >
    > PowerLab has created an open standards reference and deterministic calculation framework resolving how conductor ampacity deratings (ambient temperature, conduit fill) interact with 60°C vs 75°C terminal column caps under NEC Table 310.16.
    >
    > We would love to prepare a practical "Codes & Standards in Practice" article for EC&M illustrating step-by-step sizing examples for 48A EV chargers, sub-panel feeders, and solar string conductors.
    >
    > Standards Guide: https://www.powelab.org/guides/voltage-drop-and-wire-size-calculation-guide  
    > Interactive Engine: https://www.powelab.org/battery/voltage-drop-calculator
    >
    > Best regards,  
    > [Your Name / PowerLab Clean Energy Engineering Group]

---

## 8. Charged EVs (Electric Vehicles Magazine)

* **Target Publication:** *Charged EVs* (`chargedevs.com`)
* **Authority Tier:** A (DA 58 / DR 66)
* **Audience:** EV infrastructure installers, fleet operators, automotive electrical engineers, and charging network operators.
* **Topic:** The 125% continuous-duty multiplier, Level 1 vs Level 2 charging efficiency penalties, and residential breaker sizing.
* **Target POWLAB Assets:**
  * Canonical Whitepaper: [`PL-TR-2026-EVSE01`](https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity)
  * Computational Tool: [Level 2 EV Charger Sizing Engine](https://www.powelab.org/ev/ev-charger-breaker-size-calculator)
  * Technical Guide: [EV Charging Speed & Breaker Guide](https://www.powelab.org/guides/level-2-ev-charging-speed-and-breaker-sizing-guide)
* **What is Genuinely New/Useful:** Quantifying onboard charger efficiency curves and continuous thermal loads, explaining why Level 1 charging suffers a $15\%–25\%$ parasitic power penalty (thermal management overhead) compared to Level 2, and detailing the mandatory 125% breaker sizing rule under NEC 625.42.
* **Editorial Pitch Package:**
  * **Subject Line:** Contributor Pitch: The Level 1 charging efficiency penalty and continuous-duty EVSE sizing
  * **Pitch Body:**
    > Hi [Editor Name / Charged EVs Editorial Team],
    >
    > While charging speed is widely discussed, the parasitic energy efficiency penalty of Level 1 (120V) charging versus Level 2 (240V) is often overlooked by fleet managers and consumers.
    >
    > PowerLab's engineering group has analyzed EV onboard charger AC-to-DC conversion efficiencies and branch circuit continuous-duty thermal dissipation. Our modeling shows that continuous baseline vehicle computer and battery thermal management overhead (200W–350W constant draw) consumes up to 25% of total grid energy on Level 1 (1.4 kW), whereas on 9.6 kW Level 2, overhead represents less than 4%.
    >
    > We propose contributing a data-driven technical article for Charged EVs breaking down these efficiency metrics and providing sizing guidelines for 32A, 40A, and 48A home and commercial installations.
    >
    > Technical Report: https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity  
    > Sizing Guide: https://www.powelab.org/guides/level-2-ev-charging-speed-and-breaker-sizing-guide
    >
    > Best regards,  
    > [Your Name / PowerLab Clean Energy Engineering Group]

---

## 9. Consulting-Specifying Engineer (CSE)

* **Target Publication:** *Consulting-Specifying Engineer* (`csemag.com`)
* **Authority Tier:** A (DA 63 / DR 69)
* **Audience:** Commercial MEP engineers, facility electrical designers, and commercial electrification specifying engineers.
* **Topic:** High-capacity Level 2 EVSE feeder sizing, demand diversity factors, and branch circuit continuous duty in commercial parking facilities.
* **Target POWLAB Assets:**
  * Canonical Whitepaper: [`PL-TR-2026-EVSE01`](https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity)
  * Canonical Dataset: [`PL-DS-EVSE-01`](https://www.powelab.org/datasets/continuous-duty-evse-terminal-temperature-benchmark)
  * Computational Engine: [EV Charger Breaker Size Calculator](https://www.powelab.org/ev/ev-charger-breaker-size-calculator)
* **What is Genuinely New/Useful:** Analysis of multi-charger feeder sizing under NEC Article 625 and NEC 220, addressing continuous duty thermal loading and automatic load management system (ALMS) diversity factors in commercial facilities.
* **Editorial Pitch Package:**
  * **Subject Line:** Engineering Article: Specifying commercial EVSE feeders — Terminal thermal limits and continuous-duty deratings
  * **Pitch Body:**
    > Hi [CSE Editorial Team],
    >
    > As commercial facilities deploy high-density Level 2 charging banks, specifying engineers must balance 125% continuous-load requirements with feeder thermal capacity and transformer limits.
    >
    > PowerLab has published an open engineering technical report evaluating terminal temperature limitations under NEC 110.14(C), continuous duty multipliers under NEC 625.42, and conductor Joule heating across multi-run conduits.
    >
    > We would like to write a technical feature for Consulting-Specifying Engineer outlining key specification checkpoints for commercial EVSE branch circuits and switchgear terminations.
    >
    > Technical Paper: https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity  
    > Dataset: https://www.powelab.org/datasets/continuous-duty-evse-terminal-temperature-benchmark
    >
    > Sincerely,  
    > [Your Name / PowerLab Clean Energy Engineering Group]

---

## 10. Electrical Contractor Magazine (NECA)

* **Target Publication:** *Electrical Contractor Magazine* (`ecmag.com`)
* **Authority Tier:** A (DA 59 / DR 67)
* **Audience:** NECA electrical contractors, estimators, project managers, and journeymen electricians.
* **Topic:** Code-compliant residential EV charger breaker and wire sizing: Why 6 AWG Romex NM-B is capped at 55A.
* **Target POWLAB Assets:**
  * Technical Guide: [Level 2 EV Charging Speed & Breaker Sizing Guide](https://www.powelab.org/guides/level-2-ev-charging-speed-and-breaker-sizing-guide)
  * Canonical Whitepaper: [`PL-TR-2026-EVSE01`](https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity)
  * Computational Tool: [EV Charger Breaker Sizing Calculator](https://www.powelab.org/ev/ev-charger-breaker-size-calculator)
* **What is Genuinely New/Useful:** Clear, practical contractor guidance on the interaction between NEC 334.80 ($60^\circ\text{C}$ cap for NM-B cable) and NEC 625.42 (125% continuous load rule), providing field-ready charts showing when conduit with 6 AWG THHN copper must be specified instead of NM-B.
* **Editorial Pitch Package:**
  * **Subject Line:** Field Practice: Why 6 AWG Romex fails code for 48A EV chargers and what to install instead
  * **Pitch Body:**
    > Hi [Editor Name / Electrical Contractor Magazine],
    >
    > Installers across the country are frequently getting red-tagged on 48A EV charger installs because of a common wire sizing misconception involving Romex (NM-B) cable.
    >
    > Under NEC 625.42, a 48A continuous charger requires a 60A breaker ($48\text{A} \times 1.25 = 60\text{A}$). However, NEC 334.80 strictly caps NM-B at the 60°C column of Table 310.16—which rates 6 AWG copper at only 55A, making it illegal for 60A overcurrent protection.
    >
    > PowerLab has developed a comprehensive installation guide and thermal dataset detailing why THHN in conduit (rated 65A at 75°C) or 4 AWG NM-B must be used to comply with code and prevent terminal thermal damage.
    >
    > We would love to adapt this into a contractor-focused technical article for Electrical Contractor Magazine.
    >
    > Guide: https://www.powelab.org/guides/level-2-ev-charging-speed-and-breaker-sizing-guide  
    > Research: https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity
    >
    > Best regards,  
    > [Your Name / PowerLab Clean Energy Engineering Group]
