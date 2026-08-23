# 04 — Daily 5 Technical Outreach Targets & Engineering Pitch Repository

This document contains 30 curated, highly targeted email pitches organized in batches of **5 emails per day across 6 operational focus areas**.

### Editorial & Outreach Guidelines
- **Intellectual & Scientific Curiosity First:** Every pitch centers on a specific, non-trivial engineering challenge, thermodynamic phase boundary, electrochemical loss mechanism, or mathematical divergence between textbook formulas and field measurements.
- **Zero Promotional / Spam Language:** Never use marketing clichés (e.g. avoid *"100% free"*, *"ad-free"*, *"no signup required"*, *"check out our site"*, *"please link to us"*).
- **Peer-to-Peer Engineering Tone:** Maintain the rigorous, collegial tone of a computational modeling group offering transparent mathematical datasets, deterministic models, or technical discussion points.

---

## Daily Schedule Overview

```text
┌────────────────────────────────────────────────────────────────────────┐
│ DAILY CADENCE: 5 Highly Tailored Technical Pitches Sent Every Morning  │
├────────────────────────────────────────────────────────────────────────┤
│ Day 1: University Engineering Faculty & Clean Energy Labs (.edu)       │
│ Day 2: Vocational Training Directors & Apprenticeship Centers (IBEW)   │
│ Day 3: Clean Energy Trade Media Editorial Directors & Senior Analysts  │
│ Day 4: State Clean Energy Centers & University Extension Institutes    │
│ Day 5: Clean Energy Advocacy Non-Profits & EV Infrastructure Alliances │
│ Day 6: Open Educational Resources (OER) & Digital STEM Repositories    │
└────────────────────────────────────────────────────────────────────────┘
```

---

# Day 1: University Engineering Faculty & Clean Energy Labs (.edu)

### Email #1: Dr. Ram Rajagopal (Associate Professor & Director of Stanford Sustainable Systems Lab)
**Target Profile:** Stanford S3L researches distributed energy resources (DERs), battery storage degradation modeling, and grid-scale EV integration.

**Recipient:**
```text
ramr@stanford.edu
```

**Subject:**
```text
The inverter tare loss gap: reconciling IEEE 485 with real-world residential BESS standby curves
```

**Email Body:**
```text
Hi Dr. Rajagopal,

I’ve been following the Stanford Sustainable Systems Lab’s ongoing research on distributed battery storage integration and localized grid load modeling.

An overlooked technical discrepancy often arising in student and installer battery sizing models is the treatment of inverter conversion efficiency as a static coefficient (e.g., 90%). When intermittent or fractional loads—such as a 50W refrigerator cycle—are modeled under constant-efficiency assumptions, the omission of the inverter's static 15W–30W tare (idle standby) dissipation creates a 25% to 40% overestimation of deliverable backup runtime.

To help visualize this multi-stage physical loss mechanism, we engineered a deterministic battery runtime simulation model (https://www.powelab.org/battery/battery-runtime-calculator) and accompanying mathematical derivation guide (https://www.powelab.org/guides/battery-backup-runtime-calculation-guide) that dynamically isolates usable Depth of Discharge (DoD), Peukert capacity derating, conversion efficiency curves, and continuous tare draw.

If this would provide a useful interactive visual reference or discussion point for your lab’s work on distributed storage modeling, I would be happy to share the underlying mathematical formulas and loss datasets.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #2: Dr. Dirk Jordan (Senior PV Reliability Engineer at NREL / Photovoltaic Modeling)
**Target Profile:** Leads PV reliability and degradation research at the National Renewable Energy Laboratory (NREL), specializing in thermal coefficients and open irradiance algorithms.

**Recipient:**
```text
dirk.jordan@nrel.gov
```

**Subject:**
```text
Open client implementation of PVWatts V8: dynamic cosine tilt & thermal Voc derating for education
```

**Email Body:**
```text
Hi Dirk,

I’ve long followed your extensive publications on photovoltaic degradation kinetics and thermal loss factors at NREL.

While system-level solar modeling software relies on comprehensive meteorological datasets, students and field engineers frequently struggle to isolate how seasonal plane-of-array (POA) cosine angles and temperature coefficients interact at high vs low latitudes.

To make these geometric and thermodynamic relationships directly interactive, we implemented an open-access client interface powered by NREL's PVWatts V8 algorithms:
https://www.powelab.org/solar/solar-panel-tilt-calculator

Our implementation pairs the PVWatts irradiance model with an explicit mathematical derivation of seasonal cosine tilt angles by latitude (https://www.powelab.org/guides/solar-panel-tilt-angle-by-latitude-and-season-guide) alongside cold-temperature open-circuit voltage expansion under NEC 690.7.

If your team maintains an index of educational tools utilizing PVWatts or would find value in examining our client implementation, I would be delighted to share our technical notes.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #3: Dr. Stephen Zubrick (Renewable Energy Technology Faculty at Appalachian State University)
**Target Profile:** Appalachian State’s Sustainable Technology & Built Environment Department trains students in off-grid solar, battery storage, and NABCEP electrical design.

**Recipient:**
```text
zubricksc@appstate.edu
```

**Subject:**
```text
Cold-temperature bandgap expansion in PV strings: why sub-zero Voc coefficients exceed MPPT input limits
```

**Email Body:**
```text
Hi Dr. Zubrick,

I am reaching out after reviewing Appalachian State's curriculum in sustainable technology and applied photovoltaic design.

A frequent point of confusion for students sizing off-grid and grid-tied solar strings is calculating temperature-corrected open-circuit voltage ($V_{oc\_max}$) under extreme winter lows (NEC 690.7). Sizing solely to Standard Test Conditions (25°C) neglects semiconductor bandgap expansion, leading to unrecoverable MPPT over-voltage clamp events when sub-zero ambient temperatures combine with early morning edge-of-cloud irradiance spikes.

To assist instructors and students with visualizing these boundary conditions, we developed a deterministic sizing engine and study guide:
• MPPT Sizing Engine: https://www.powelab.org/solar/solar-charge-controller-calculator
• Cold-Temperature Voc Derivation Guide: https://www.powelab.org/guides/mppt-solar-charge-controller-sizing-guide

The model explicitly displays temperature coefficient percentage adjustments, minimum design temperature multipliers, and maximum continuous current sizing ($I_{sc} \times 1.25$).

If this would provide a useful interactive computational aid for your photovoltaic design lab courseware, I would be pleased to share the underlying equations.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #4: Dr. Chien-Fei Chen (Director of Education at NSF CURENT / UT Knoxville)
**Target Profile:** CURENT (Center for Ultra-wide-area Resilient Electric Energy Transmission Networks) focuses on grid modernization, EV charging integration, and power engineering education.

**Recipient:**
```text
cchen26@utk.edu
```

**Subject:**
```text
Continuous thermal saturation in branch circuits: modeling NEC 625 125% ampacity derating during Level 2 EV charging
```

**Email Body:**
```text
Hi Dr. Chen,

I’ve been following CURENT’s work in modernizing electric power engineering education and addressing the localized distribution challenges of residential EV charging adoption.

A core concept for students studying building electrification is continuous electrical load dynamics under NEC Article 625—specifically why prolonged 3+ hour charging cycles generate steady-state conductor heating ($I^2 R t$) requiring a 125% ampacity multiplier, and how terminal temperature ratings (60°C vs 75°C) limit residential panel headroom.

To help bridge textbook electrical principles with applied circuit design, we built an interactive EV infrastructure modeling module:
• Level 2 Charging Speed & Breaker Sizing Guide: https://www.powelab.org/guides/level-2-ev-charging-speed-and-breaker-sizing-guide
• Interactive EV Charger Breaker Sizer: https://www.powelab.org/ev/ev-charger-breaker-size-calculator
• EV Charging Speed & Battery Sizing Engine: https://www.powelab.org/ev/ev-charging-time-calculator

The tools explicitly compute conductor ampacities, kilowatt delivery rates, and battery charging acceptance curves.

If this would serve as an engaging interactive simulation for your power engineering students or educational modules, I would be delighted to share our computational model.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #5: NC State Clean Energy Technology Center (NCCETC / DSIRE Technical Team)
**Target Profile:** NCCETC manages the DSIRE database and conducts technical training for clean energy engineers, commercial installers, and state policymakers.

**Recipient:**
```text
nccetc@ncsu.edu
```

**Subject:**
```text
Peukert exponent divergence: modeling electrochemical capacity derating in LiFePO4 vs Lead-Acid BESS
```

**Email Body:**
```text
Hi NCCETC Technical Team,

I have long followed the NC Clean Energy Technology Center’s technical training programs and policy analyses through DSIRE.

When clean energy professionals transition from theoretical storage concepts to real-world battery sizing, a frequent challenge is modeling the compound loss waterfall between nominal nameplate energy and deliverable AC work:
`Nominal Wh → Usable Depth of Discharge (DoD) → Peukert Capacity Derating → Inverter Conversion Loss → Delivered Load`

To assist with transparent modeling, we engineered an open calculation engine and technical reference implementing IEEE Std 485 and NEC 706 standards:
• Battery Capacity & Chemistry Derating Calculator: https://www.powelab.org/battery/battery-capacity-calculator
• Battery Runtime Mathematical Derivation Guide: https://www.powelab.org/guides/battery-backup-runtime-calculation-guide

The model demonstrates the substantial divergence between LiFePO4 ($k \approx 1.02$) and Lead-Acid ($k \approx 1.25$) capacity under dynamic discharge C-rates.

If your technical instructors would find value in using this interactive model for renewable energy certificate coursework, I would be glad to share the dataset.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

# Day 2: Vocational Training Directors & Electrical Apprenticeship Programs

### Email #6: Michael Callanan (Executive Director at Electrical Training ALLIANCE / NJATC)
**Target Profile:** Sets the curriculum and training standards for over 300 IBEW/NECA Joint Apprenticeship and Training Committees (JATCs) across North America.

**Recipient:**
```text
mcallanan@electricaltrainingalliance.org
```

**Subject:**
```text
The 80% continuous duty rating trap: why 48A EVSE on 50A circuits causes thermal breaker fatigue under NEC 625.41
```

**Email Body:**
```text
Hi Michael,

I’ve been following the Electrical Training ALLIANCE’s leadership in preparing electrical apprentices for high-voltage EVSE and renewable infrastructure deployments.

A persistent compliance issue appearing on residential installations is technicians attempting to connect 48A Level 2 EVSE to a standard 50A receptacle or circuit. Because EVSE operates at full nameplate amperage for 3+ consecutive hours, thermal-magnetic circuit breaker bi-metallic strips experience continuous thermal saturation. Under NEC 625.41, a 125% continuous duty multiplier ($48\text{A} \times 1.25 = 60\text{A}$) is mandatory, requiring dedicated 60A overcurrent protection and hardwired conductors.

To assist apprentice instructors with demonstrating these load dynamics, we engineered a deterministic calculation engine and companion technical guide:
• EV Charger Breaker Sizer: https://www.powelab.org/ev/ev-charger-breaker-size-calculator
• Terminal Temperature & Ampacity Guide: https://www.powelab.org/guides/level-2-ev-charging-speed-and-breaker-sizing-guide

The engine details Romex 60°C vs THHN 75°C terminal temperature limitations and conductor ampacities.

If this would provide a useful interactive visual aid for your apprentice training portal or code seminars, I would be honored to share the framework.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #7: Shawn Martin (Director of Training at IBEW Local 134 Technical Institute, Chicago)
**Target Profile:** IBEW Local 134 runs one of the largest union apprentice training centers in the nation, with specialized labs for renewable power, motor controls, and high-amperage commercial wiring.

**Recipient:**
```text
smartin@ejatt.com
```

**Subject:**
```text
Circular mil resistance and DC voltage sag: modeling low-voltage battery feeder runs under NEC Chapter 9 Table 8
```

**Email Body:**
```text
Hi Shawn,

I am reaching out to share a computational electrical model engineered to assist apprentices studying conductor ampacity and DC/AC voltage drop.

When calculating DC voltage drop on low-voltage, high-current battery bank runs (e.g. 200A at 12V vs 50A at 48V), manual calculations using NEC Chapter 9 Table 8 often result in rounding errors that overlook severe terminal voltage sag, triggering premature inverter low-voltage cutoffs:
$V_{drop} = \frac{2 \times K \times I \times L}{CM}$

To streamline this calculation for apprentices and instructors, we created an interactive modeling engine:
https://www.powelab.org/battery/voltage-drop-calculator

The tool dynamically displays Circular Mil area, DC and AC conductor resistances, and percentage voltage drop under NEC 210.19(A) guidelines.

If your electrical instructors would find this a useful calculation reference for apprentice workshops, please feel free to share it.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #8: Eric Hall (Director of Training at NECA Northern California Chapter)
**Target Profile:** Directs electrical contractor training for Northern California, with high focus on Title 24 compliance, EVSE installations, and residential energy storage systems (NEC 706).

**Recipient:**
```text
ehall@norcalneca.org
```

**Subject:**
```text
Sub-millisecond short-circuit fault current: why Class-T AIC ratings are essential on stationary LiFePO4 banks
```

**Email Body:**
```text
Hi Eric,

With California contractors deploying increasing numbers of residential and commercial battery storage systems under Title 24, high-amperage low-voltage lithium battery banks (e.g., 48V 200Ah–600Ah LiFePO4) are becoming commonplace.

A critical safety nuance that is frequently misunderstood in the field is overcurrent protection Ampere Interrupting Capacity (AIC). Because modern lithium cells exhibit extremely low internal impedance ($<1\text{ m}\Omega$), a dead short across a 48V bank can produce fault currents exceeding 20,000A. Standard automotive ANL or MIDI fuses rated at 2,000A AIC risk catastrophic vaporizing or arc-welding closed, necessitating fast-acting Class-T current-limiting fuses (20,000A AIC).

To help contractors and apprentices size inverters, DC ampacity, and overcurrent protection under NEC Article 706, we engineered an open sizing engine:
https://www.powelab.org/battery/inverter-size-calculator

We also published an accompanying technical guide on inverter tare loss and DC cable sizing:
https://www.powelab.org/guides/battery-backup-runtime-calculation-guide

If this would serve as a valuable technical discussion point or reference for your member contractors, I would be happy to provide the underlying documentation.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #9: John Kelly (Senior Director of Certification at NABCEP)
**Target Profile:** NABCEP (North American Board of Certified Energy Practitioners) sets the benchmark for Solar PV Installation Professional (PVIP) and PV System Inspector (PVSI) certifications.

**Recipient:**
```text
jkelly@nabcep.org
```

**Subject:**
```text
Dual-boundary MPPT thermal windowing: resolving winter Voc_max against summer minimum Vmpp under NEC 690.7
```

**Email Body:**
```text
Hi John,

I am writing to commend NABCEP for maintaining rigorous technical standards across the Photovoltaic Installation Professional (PVIP) credentialing programs.

When candidates prepare for PVIP system design examinations, mastering the temperature-corrected string voltage boundaries under NEC 690.7 is a core competency:
1. Winter Maximum Voltage: $V_{oc\_max} = V_{oc\_stc} \times [ 1 + (\gamma_{Voc} / 100) \times (T_{min} - 25^\circ\text{C}) ] \times N_{panels}$
2. Summer Minimum Voltage: High ambient cell temperatures ($T_{cell} \approx 65^\circ\text{C}$) dropping $V_{mpp}$ below inverter MPPT minimum tracking thresholds.

To assist candidates and training providers with an interactive mathematical visualizer, we developed a deterministic solar charge controller sizing engine:
• Sizing Engine: https://www.powelab.org/solar/solar-charge-controller-calculator
• Technical Reference Guide: https://www.powelab.org/guides/mppt-solar-charge-controller-sizing-guide

The tool dynamically computes array cold $V_{oc}$, MPPT minimum $V_{mpp}$ thermal limits, and maximum continuous current sizing ($I_{sc} \times 1.25$).

If this would provide a useful interactive study aid for your candidate resource directory, I would be pleased to share our calculation methodology.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #10: Larry F. Moore (Renewable Energy Program Lead at Lincoln Tech / UTI)
**Target Profile:** Lincoln Tech and Universal Technical Institute lead technical programs in electrical systems, clean energy installation, and electronics.

**Recipient:**
```text
lmoore@lincolntech.edu
```

**Subject:**
```text
Multi-variable energy loss modeling in off-grid systems: linking component thermodynamics with kWh yields
```

**Email Body:**
```text
Hi Larry,

I am reaching out after reviewing Lincoln Tech’s electrical and renewable energy training programs, which do a phenomenal job bridging electrical theory with hands-on diagnostic tools.

When students transition from textbook circuit formulas to field installations, grasping how individual component losses compound across an entire off-grid or solar-plus-storage topology is often challenging.

We developed PowerLab (https://www.powelab.org) as a deterministic engineering portal consisting of 30 computational models covering:
1. Photovoltaic Systems: Cold $V_{oc}$ expansion, MPPT sizing, PVWatts V8 tilt optimization, and payback modeling.
2. Battery Storage: Usable DoD, Peukert electrochemical derating, and continuous inverter tare loss curves.
3. EV Infrastructure: NEC continuous load multipliers, conductor ampacities, and Level 2 charging speeds.
4. Home Energy: Appliance wattage profiling and daily kilowatt-hour load distribution.

Every model explicitly derives each variable and step in the calculation.

If your vocational instructors would find this a helpful interactive visual reference for lab boards or course syllabi, please feel free to share it.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

# Day 3: Clean Energy Trade Media Editorial Directors & Senior Analysts

### Email #11: Kelsey Misbrener (Managing Editor at Solar Power World)
**Target Profile:** *Solar Power World* is the leading US trade publication for residential and commercial solar contractors, installers, and developers.

**Recipient:**
```text
kmisbrener@wtwhmedia.com
```

**Subject:**
```text
The sub-zero MPPT breakdown phenomenon: why standard STC nameplate ratings cause winter inverter failures
```

**Email Body:**
```text
Hi Kelsey,

I’ve been following *Solar Power World’s* ongoing coverage of installation best practices and equipment reliability trends during seasonal weather extremes.

A common installation error that causes equipment failures every winter is stringing PV panels based strictly on their 25°C Standard Test Condition (STC) Open-Circuit Voltage ($V_{oc}$). In sub-zero weather, silicon semiconductor physics dictates that voltage increases by +0.28% to +0.35% per °C drop, easily pushing a nominal 130V string past a 150V MPPT controller’s absolute maximum rating on a sunny freezing morning.

To help contractors visualize and avoid this failure mode, we developed an open-access MPPT sizing engine and technical guide:
• Calculator: https://www.powelab.org/solar/solar-charge-controller-calculator
• Field Guide: https://www.powelab.org/guides/mppt-solar-charge-controller-sizing-guide

If this would provide a useful interactive visual reference or technical discussion point for an upcoming editorial on winter array commissioning or inverter protection, I would be delighted to provide the mathematical models or commentary.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #12: Mark Kane (Senior Technical Editor at InsideEVs / Motorsport Network)
**Target Profile:** *InsideEVs* is the premier technical publication tracking EV charging performance, battery degradation, and charging infrastructure benchmarks.

**Recipient:**
```text
mark.kane@insideevs.com
```

**Subject:**
```text
The hidden AC charging efficiency penalty: why 11.5kW Level 2 charging loses 10-12% at the onboard OBC
```

**Email Body:**
```text
Hi Mark,

I always enjoy your in-depth charging curve analyses and technical breakdowns on *InsideEVs*.

While most EV owners understand DC fast charging taper curves, many are surprised by the 10% to 15% energy loss that occurs during Level 2 AC home charging due to onboard charger (OBC) rectification, thermal cooling pumps, and BMS parasitic draw. A 75 kWh battery replenishment often draws 83 to 86 kWh at the utility meter.

To help EV drivers accurately calculate real-world charging speeds, grid energy draw, and monthly electricity costs, we built an open deterministic model:
• EV Charging Speed & Taper Engine: https://www.powelab.org/ev/ev-charging-time-calculator
• EV Home Charging & Breaker Sizing Guide: https://www.powelab.org/guides/level-2-ev-charging-speed-and-breaker-sizing-guide

The tool explicitly factors in OBC rectification efficiency and ambient temperature derating.

If you ever need an interactive calculation widget or dataset for an upcoming guide on home charging economics, I’d be glad to share our technical framework.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #13: John DeDad (Editorial Director at EC&M Magazine)
**Target Profile:** *EC&M* (Electrical Construction & Maintenance) provides technical electrical code and design articles for 130,000+ electrical engineers, contractors, and inspectors.

**Recipient:**
```text
jdedad@endeavorb2b.com
```

**Subject:**
```text
The 125% continuous duty trap on EV branch circuits: code compliance and wire sizing under NEC 625
```

**Email Body:**
```text
Hi John,

I have been a dedicated reader of *EC&M’s* NEC Code Changes and Practical Engineering articles for years.

With residential EVSE installations accelerating, one of the most common field inspection failures is improper breaker and conductor sizing for continuous loads under NEC 625.41. Because EVSE operates at full nameplate current for over 3 hours, branch circuit conductors and overcurrent devices must be sized at 125% of continuous load, preventing 48A chargers from operating on standard 50A circuits.

To support electrical professionals and inspectors with instant verification, we created an open calculation tool and companion guide:
• EV Charger Breaker Sizer: https://www.powelab.org/ev/ev-charger-breaker-size-calculator
• Conductor Ampacity & Terminal Rating Guide: https://www.powelab.org/guides/level-2-ev-charging-speed-and-breaker-sizing-guide

All underlying formulas (including temperature derating and conduit fill adjustments) are completely open and mathematically transparent.

If this would provide a useful interactive computational reference for an upcoming *EC&M* column on EV infrastructure design, please feel free to use or reference it.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #14: Christian Roselund (Senior Policy & Technology Contributor at Canary Media / RMI)
**Target Profile:** *Canary Media* and *Rocky Mountain Institute (RMI)* report extensively on residential electrification, heat pumps, distributed solar, and electrical panel upgrades.

**Recipient:**
```text
croselund@canarymedia.com
```

**Subject:**
```text
Heat pump COP temperature-derating curves vs resistive backup: identifying the thermal balance point
```

**Email Body:**
```text
Hi Christian,

I follow your reporting on building decarbonization and the challenges homeowners face when electrifying space heating and transportation on constrained 100A or 200A service panels.

When evaluating cold-climate heat pump performance against supplemental electric resistance strips, determining the thermal balance point where compressor Coefficient of Performance (COP) drops toward 1.0 is essential for avoiding extreme winter peak coincident demand.

To help visualize whole-home energy load profiles and dynamic appliance duty cycles, we engineered a deterministic load breakdown model:
• Daily Household kWh Usage Guide: https://www.powelab.org/guides/daily-household-electricity-usage-and-kwh-guide
• Electricity Usage & Load Profiler: https://www.powelab.org/home-energy/electricity-usage-calculator
• Heat Pump Running Cost Calculator: https://www.powelab.org/home-energy/heat-pump-cost-calculator

The model dynamically computes heating, cooling, and parasitic standby draws across regional tariff structures.

If this interactive modeling tool would provide useful empirical context for an upcoming piece on residential electrification economics, I would be glad to share our underlying dataset.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #15: Jonathan Gifford (Executive Editor at PV Magazine Global)
**Target Profile:** *PV Magazine* is the international trade authority on solar PV and energy storage technologies, testing standards, and field performance.

**Recipient:**
```text
jonathan.gifford@pv-magazine.com
```

**Subject:**
```text
Re-evaluating seasonal tilt optimization vs flat roof azimuth deviation using PVWatts V8 open modeling
```

**Email Body:**
```text
Hi Jonathan,

I’ve followed *PV Magazine's* technical coverage of residential module architectures, bifacial gain, and seasonal yield optimization.

With residential solar racking often constrained to fixed roof pitches, many consumers and entry-level installers overestimate the production penalty of off-optimal tilt angles versus azimuth deviations and seasonal cosine irradiance shifts.

To help clarify these geometric irradiance relationships, we developed an open calculation engine and technical guide:
• Solar Panel Tilt Angle Guide: https://www.powelab.org/guides/solar-panel-tilt-angle-by-latitude-and-season-guide
• Solar Panel Tilt & Output Simulation: https://www.powelab.org/solar/solar-panel-tilt-calculator

Our simulation links directly with NREL's PVWatts V8 API to demonstrate why winter latitude-plus-15° tilt adjustments yield diminishing returns compared to annual plane-of-array (POA) optimization in high-albedo environments.

If this would serve as a helpful interactive reference for an upcoming piece on rooftop solar optimization, I would be happy to share our underlying dataset.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

# Day 4: State Clean Energy Centers & University Energy Extensions

### Email #16: Colleen Kettles (Director of Workforce Development at Florida Solar Energy Center - FSEC / UCF)
**Target Profile:** FSEC is Florida’s premier state energy research institute at the University of Central Florida, testing solar systems and certifying workforce training curricula.

**Recipient:**
```text
ckettles@fsec.ucf.edu
```

**Subject:**
```text
Subtropical PV cell junction thermal derating: modeling NOCT voltage sag in high ambient environments
```

**Email Body:**
```text
Hi Colleen,

I’ve been following FSEC's leadership in workforce education and technical standards for Florida’s solar and energy storage contractors.

In subtropical climates like Florida, solar cell operating temperatures regularly exceed 65°C on summer afternoons ($T_{cell} = T_{amb} + \frac{\text{NOCT}-20}{800} \cdot G$). When maximum power point voltage ($V_{mpp}$) sags significantly due to negative voltage temperature coefficients, strings sized with insufficient module counts can drop below inverter MPPT minimum tracking windows, leading to severe thermal clipping.

To help students and installers visualize these thermal dynamics alongside geometric cosine tilt angles, we engineered an educational simulation suite:
• Solar Panel Tilt & Irradiance Guide: https://www.powelab.org/guides/solar-panel-tilt-angle-by-latitude-and-season-guide
• MPPT / Cold Voc Array Sizer: https://www.powelab.org/solar/solar-charge-controller-calculator
• NREL PVWatts V8 Solar Tilt Engine: https://www.powelab.org/solar/solar-panel-tilt-calculator

All formulas, NOCT adjustments, and temperature constants are fully derived.

If your training coordinators would find this a useful reference for FSEC workforce modules or solar design syllabi, please feel free to share it.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #17: Dr. Michael Webber (Josey Centennial Professor in Energy Resources at UT Austin)
**Target Profile:** Global energy scholar, author of *Energy 101*, and leading educator on energy literacy, thermodynamics, and the clean energy transition.

**Recipient:**
```text
webber@mail.utexas.edu
```

**Subject:**
```text
First-law vs Second-law exergy analysis in residential electrification: open deterministic simulation models
```

**Email Body:**
```text
Hi Dr. Webber,

I have long followed your books and lectures on energy literacy, thermodynamics, and the systemic challenges of the energy transition.

When teaching energy fundamentals, having transparent, mathematically rigorous tools where students can experiment with real physical parameters—such as Peukert capacity loss in batteries, inverter conversion heat dissipation, and EV charging continuous load factors—is essential for building intuitive number sense.

We engineered PowerLab (https://www.powelab.org) as a suite of 30 deterministic engineering calculators and peer-referenced technical guides:
• Battery Loss Waterfall Modeling: https://www.powelab.org/guides/battery-backup-runtime-calculation-guide
• Solar Cosine & Tilt Modeling: https://www.powelab.org/guides/solar-panel-tilt-angle-by-latitude-and-season-guide
• Continuous Duty EVSE Sizing: https://www.powelab.org/guides/level-2-ev-charging-speed-and-breaker-sizing-guide

Every tool exposes its exact underlying equations without commercial intermediaries.

If this would provide a convenient interactive reference for your students or teaching assistants in energy resources courses, we would be honored to share it.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #18: Dr. Peter Lilienthal (CEO of HOMER Energy / Adjunct Faculty at CU Boulder)
**Target Profile:** Microgrid pioneer, founder of HOMER Energy, and adjunct faculty member specializing in distributed hybrid renewable energy systems.

**Recipient:**
```text
energy@colorado.edu
```

**Subject:**
```text
Kinetic battery capacity derating: comparing two-well diffusion models with Peukert formulations in BESS
```

**Email Body:**
```text
Hi Dr. Lilienthal,

Your pioneering work with HOMER Energy essentially defined hybrid renewable energy modeling for the microgrid industry.

While macro-scale microgrid simulations utilize sophisticated dispatch algorithms, students and field installers working on small-scale off-grid and backup battery systems frequently neglect the compound impact of Peukert exponent derating on lead-acid chemistries and inverter tare loads during low-duty-cycle operation.

We developed an open educational simulation tool and whitepaper isolating these loss mechanisms:
• Battery Runtime Simulation Engine: https://www.powelab.org/battery/battery-runtime-calculator
• Battery Capacity & Inverter Loss Guide: https://www.powelab.org/guides/battery-backup-runtime-calculation-guide

The models explicitly calculate the divergence between LiFePO4 ($k=1.02$) and AGM/Lead-Acid ($k=1.20$) capacity under high C-rates.

If this would serve as an interesting open educational reference for students studying distributed energy storage, I would be delighted to hear your thoughts.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #19: Autumn Proudlove (Associate Director of Policy & Markets at NCCETC)
**Target Profile:** Leads policy tracking for clean energy programs, solar net metering, and utility tariff rate design across the United States.

**Recipient:**
```text
afproudl@ncsu.edu
```

**Subject:**
```text
The net billing self-consumption tipping point: modeling 25-year LCOS pairing under avoided-cost tariffs
```

**Email Body:**
```text
Hi Autumn,

I regularly read NCCETC’s *50 States of Solar* reports to stay abreast of net metering tariff reforms (NEM 3.0) and avoided-cost utility rate restructuring.

As net billing policies shift solar value toward behind-the-meter self-consumption and battery pairing, modeling 25-year cash flows requires transparent separation of gross PV generation from time-of-use (TOU) battery arbitrage and calendar/cycle capacity degradation.

To provide consumers and extension educators with a vendor-neutral resource, we developed a deterministic solar economics suite:
• Solar Payback & Cashflow Calculator: https://www.powelab.org/solar/solar-payback-calculator
• Household kWh Usage Profiler: https://www.powelab.org/guides/daily-household-electricity-usage-and-kwh-guide

The tool dynamically models annual module degradation ($0.5\%/\text{yr}$), battery round-trip efficiency, and localized tariff escalation rates.

If this would provide a helpful computational reference for your policy seminars or consumer education guides, please feel free to use it.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #20: Dr. David Rapson (Co-Director of UC Davis Energy and Efficiency Institute)
**Target Profile:** Researches energy economics, electric vehicle charging behaviors, electricity rate design, and consumer technology adoption at UC Davis.

**Recipient:**
```text
dsrapson@ucdavis.edu
```

**Subject:**
```text
Quantifying efficiency-adjusted EV operating costs: factoring OBC rectification dissipation into $/mi economics
```

**Email Body:**
```text
Hi Dr. Rapson,

I’ve followed your empirical research at UC Davis on transportation electrification economics and how electricity pricing structures impact consumer EV adoption.

When consumers and economists compare EV operating costs against internal combustion vehicles, nominal vehicle efficiency metrics ($\text{mi/kWh}$) frequently omit the 10% to 14% energy dissipation from onboard charger rectification and battery thermal conditioning. At utility rates of $\$0.35/\text{kWh}$, this conversion penalty materially impacts operating cost parity.

To help model true operating economics across varied tariff structures, we developed an open calculation engine:
• EV vs Gasoline Savings Calculator: https://www.powelab.org/ev/ev-savings-calculator
• EV Charging Cost & Rate Sizer: https://www.powelab.org/ev/ev-charging-cost-calculator

The model incorporates vehicle efficiency, charging efficiency factors, local fuel benchmarks, and tiered utility rates.

If this would provide a useful interactive computational reference for your students or research portal, please feel free to share it.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

# Day 5: Clean Energy Advocacy Non-Profits & EV Alliances

### Email #21: Katherine Stainken (VP of Policy at Plug In America)
**Target Profile:** *Plug In America* is the leading national consumer advocacy group for electric vehicle drivers, publishing consumer guides and EVSE best practice manuals.

**Recipient:**
```text
kstainken@pluginamerica.org
```

**Subject:**
```text
Winter EV energy consumption inflection: decomposing cabin PTC heating load vs electrolyte viscosity drag
```

**Email Body:**
```text
Hi Katherine,

I’ve long admired Plug In America’s tireless advocacy for EV drivers and your work promoting accessible home and public charging infrastructure.

A common challenge new EV drivers encounter is understanding why winter driving range drops 20% to 30% below EPA ratings. This is driven by two distinct physical mechanisms: 3kW–6kW continuous resistive cabin heating loads, and increased battery internal resistance ($R_{int}(T)$) from electrolyte viscosity at sub-freezing temperatures.

To provide prospective and current EV drivers with transparent engineering models, we developed an open-access EV calculation suite:
• EV Range & Auxiliary Loss Calculator: https://www.powelab.org/ev/ev-range-calculator
• Level 2 Charging Speed & Breaker Sizing Guide: https://www.powelab.org/guides/level-2-ev-charging-speed-and-breaker-sizing-guide
• EV Charging Time Calculator: https://www.powelab.org/ev/ev-charging-time-calculator

All equations for continuous load factors and charging taper curves are explicitly exposed.

If this would serve as a helpful calculation resource for your consumer advisory guides, we would be thrilled to share our dataset.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #22: Shawn Rumery (Senior Director of Research at SEIA - Solar Energy Industries Association)
**Target Profile:** SEIA represents the national solar and solar-plus-storage industry, establishing consumer protection guidelines and market research.

**Recipient:**
```text
srumery@seia.org
```

**Subject:**
```text
Deterministic multi-stage battery degradation modeling: establishing transparent RTE baselines for residential BESS
```

**Email Body:**
```text
Hi Shawn,

I’ve followed SEIA’s consumer protection initiatives and research on transparent disclosure standards in residential solar and energy storage sales.

A recurring issue in the residential market is commercial lead-generation calculators that obscure degradation rates, battery inverter losses, and realistic seasonal solar yield to inflate savings projections. In reality, round-trip efficiency ($\text{RTE} = \eta_{charge} \times \eta_{coulombic} \times \eta_{discharge} \times \eta_{inverter}$) rarely exceeds 82–86% in real-world AC-coupled systems.

To provide an open, vendor-neutral computational benchmark, we engineered PowerLab (https://www.powelab.org):
• Solar Battery Bank Sizer: https://www.powelab.org/solar/solar-battery-bank-size-calculator
• Solar Tilt & Output (PVWatts V8): https://www.powelab.org/solar/solar-panel-tilt-calculator
• Battery Runtime Guide: https://www.powelab.org/guides/battery-backup-runtime-calculation-guide

Every mathematical derivation is exposed with zero commercial bias.

If SEIA would find value in referencing our deterministic tools as an open computational benchmark in consumer resources, we would be honored.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #23: Sara Baldwin (Senior Director of Electrification at Energy Innovation)
**Target Profile:** Energy Innovation provides non-partisan energy and climate policy research, with high focus on building electrification and panel capacity constraints.

**Recipient:**
```text
sara@energyinnovation.org
```

**Subject:**
```text
Coincident peak diversified demand: modeling 100A/200A service panel limits under simultaneous HP and EVSE loads
```

**Email Body:**
```text
Hi Sara,

I’ve been following Energy Innovation’s research on whole-building electrification, heat pump adoption, and overcoming residential electrical panel bottlenecks.

When homeowners plan full electrification, calculating coincident peak demand—specifically when variable-speed heat pump compressor spikes align with continuous 48A EV charging—often creates confusion regarding NEC Article 220 service load calculation requirements.

To help policy advocates, educators, and homeowners model these electrical dynamics, we developed an open load breakdown engine:
• Heat Pump Running Cost Calculator: https://www.powelab.org/home-energy/heat-pump-cost-calculator
• Daily Household Load Profiler: https://www.powelab.org/guides/daily-household-electricity-usage-and-kwh-guide
• EV Charger Breaker Sizer: https://www.powelab.org/ev/ev-charger-breaker-size-calculator

The platform dynamically models appliance duty cycles, continuous duty multipliers, and seasonal COP variations.

If this would be a useful reference for your electrification resource hub, please feel free to share it.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #24: Michelle Lewis (Lead Clean Energy Writer at Electrek)
**Target Profile:** *Electrek* reports on home energy storage, solar panel tech, micro-inverters, portable power stations, and EV home charging.

**Recipient:**
```text
michelle@electrek.co
```

**Subject:**
```text
Inrush surge current dynamics and power factor in portable power stations: why inductive loads trip inverters
```

**Email Body:**
```text
Hi Michelle,

I enjoy your coverage of portable power stations, DIY solar generators, and off-grid emergency backup systems on *Electrek*.

When consumers purchase portable power stations (LiFePO4/NMC) for emergency backup, they often assume a 1,000 Wh unit will power a 100W appliance for 10 hours. In reality, DC-to-AC inverter conversion losses (15%) and idle tare dissipation reduce deliverable energy to 750–820 Wh. Furthermore, inductive compressor motor surge currents (LRA = 5x–7x FLA) frequently trip inverters despite nameplate running wattage appearing sufficient.

To give readers an accurate calculation model, we built an open portable power station sizing engine:
https://www.powelab.org/battery/portable-power-station-calculator

We also published a companion technical breakdown on battery chemistries and inverter loss factors:
https://www.powelab.org/guides/battery-backup-runtime-calculation-guide

If you’re working on an upcoming guide to portable power stations or home emergency backup, feel free to use our calculator as an interactive reference for your readers.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #25: John Farrell (Director of Energy Democracy Initiative at Institute for Local Self-Reliance - ILSR)
**Target Profile:** ILSR focuses on distributed clean energy, energy democracy, community solar, and empowering local communities with transparent clean energy tools.

**Recipient:**
```text
jfarrell@ilsr.org
```

**Subject:**
```text
Decentralized solar capacity factor modeling: analyzing localized load profile matching and peak shaving
```

**Email Body:**
```text
Hi John,

I have followed your *Local Energy Rules* podcast and ILSR’s advocacy for energy democracy and decentralized clean power for years.

A major barrier to household energy self-reliance is that most online solar, battery, and EV calculators are owned by commercial lead-generation brokers that monetize user data and obscure the underlying mathematics.

To support transparent local energy planning, we built PowerLab (https://www.powelab.org) as an open-access computational suite:
• Daily Household Electricity Usage Guide: https://www.powelab.org/guides/daily-household-electricity-usage-and-kwh-guide
• Battery Backup Runtime Engine: https://www.powelab.org/battery/battery-runtime-calculator
• Solar Panel Output & Payback Sizer: https://www.powelab.org/solar/solar-payback-calculator

Every formula and variable is exposed to allow community members to model local generation, storage, and consumption independently.

If ILSR maintains an open resource library for citizens and community organizers seeking independent energy tools, we would be honored to be included.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

# Day 6: Open Educational Resources (OER), Engineering Courseware & Digital Libraries

### Email #26: Dr. Delmar Larsen (Founder & Executive Director of LibreTexts Engineering / UC Davis)
**Target Profile:** *LibreTexts* is the world’s most visited open-access textbook and OER platform, providing peer-reviewed STEM textbooks to millions of university students.

**Recipient:**
```text
dlarsen@ucdavis.edu
```

**Subject:**
```text
Interactive open computational widgets for LibreTexts Engineering: electrical sizing & solar thermodynamics
```

**Email Body:**
```text
Hi Dr. Larsen,

I am writing to express my immense appreciation for what you and the LibreTexts team have built for open-access STEM education worldwide.

In reviewing the LibreTexts Electrical Engineering and Alternative Energy libraries, we noticed students frequently encounter theoretical derivations for conductor voltage drop, photovoltaic angle of incidence, and battery Peukert derating, but often lack clean interactive widgets to test real-world parameters.

We built PowerLab (https://www.powelab.org) as a deterministic engineering calculation platform:
• Conductor Voltage Drop & Ampacity (NEC Ch. 9): https://www.powelab.org/battery/voltage-drop-calculator
• Solar Panel Tilt & Cosine Loss Modeling: https://www.powelab.org/guides/solar-panel-tilt-angle-by-latitude-and-season-guide
• Battery Discharge & Peukert Derating Engine: https://www.powelab.org/guides/battery-backup-runtime-calculation-guide

All underlying mathematical equations are fully derived and accessible without commercial barriers.

If your editorial team would find value in embedding or linking these interactive calculation tools within relevant LibreTexts open textbook chapters, we would be thrilled to support your open educational mission.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #27: Curt Newton (Director of MIT OpenCourseWare - OCW)
**Target Profile:** MIT OpenCourseWare publishes open course materials for thousands of MIT courses, including electrical engineering, power systems, and thermodynamics.

**Recipient:**
```text
cnewton@mit.edu
```

**Subject:**
```text
Deterministic mathematical models for electrical engineering & renewable power systems courseware
```

**Email Body:**
```text
Hi Curt,

I have long admired MIT OpenCourseWare’s pioneering mission to make high-caliber educational resources accessible to learners everywhere.

For students exploring power engineering and renewable systems (such as MIT's *Introduction to Electric Power Systems* and *Energy Systems* courses), having transparent calculation engines that explicitly step through physical formulas is a valuable supplement to lecture notes.

We developed PowerLab (https://www.powelab.org) as a deterministic engineering portal covering:
1. IEEE Std 485 Battery Storage Sizing & Peukert Derating: https://www.powelab.org/guides/battery-backup-runtime-calculation-guide
2. NREL PVWatts Photovoltaic Tilt & Output: https://www.powelab.org/guides/solar-panel-tilt-angle-by-latitude-and-season-guide
3. NEC Continuous Load & Level 2 EV Branch Circuit Ampacities: https://www.powelab.org/guides/level-2-ev-charging-speed-and-breaker-sizing-guide

Every tool exposes its full mathematical derivations and physical variables.

If MIT OCW curates external supplementary interactive tools for students, we would be delighted to have PowerLab considered.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #28: Barbara Soots (OER Program Manager at OSPI / OER Commons)
**Target Profile:** *OER Commons* curates open educational resources for Career & Technical Education (CTE) programs, high school physics, and vocational trade schools.

**Recipient:**
```text
barbara.soots@k12.wa.us
```

**Subject:**
```text
Interactive energy & solar calculation modules for CTE electrical and renewable energy courses
```

**Email Body:**
```text
Hi Barbara,

I’ve been following your work promoting Open Educational Resources (OER) to expand equitable access to high-quality learning materials in Career and Technical Education (CTE).

Many vocational electrical and renewable energy instructors struggle to find clean, student-accessible calculation tools for high school and trade school students learning circuit math, solar PV sizing, and household electrical consumption.

We built PowerLab (https://www.powelab.org) to provide an open, student-safe suite of engineering tools:
• Daily Household Electricity & Appliance Wattage Guide: https://www.powelab.org/guides/daily-household-electricity-usage-and-kwh-guide
• Solar PV Charge Controller & MPPT Sizing: https://www.powelab.org/solar/solar-charge-controller-calculator
• EV Home Charging & Circuit Breaker Sizer: https://www.powelab.org/ev/ev-charger-breaker-size-calculator

All tools display the step-by-step physical equations without advertisements or commercial barriers.

If you believe this would be a helpful resource to index in the OER Commons Career & Technical Education collection, please feel free to share it with your educator network.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #29: Dr. S. 'Ganesh' Shanmuganathan (Editor-in-Chief at MERLOT Engineering / CSU)
**Target Profile:** *MERLOT* (Multimedia Educational Resource for Learning and Online Teaching) by California State University curates peer-reviewed online learning resources for higher education.

**Recipient:**
```text
merlot@calstate.edu
```

**Subject:**
```text
Submission of peer-referenced engineering calculators for MERLOT Electrical Engineering & Green Technology collection
```

**Email Body:**
```text
Hi Dr. Shanmuganathan,

I am writing to share an open educational web resource that may be suitable for inclusion in MERLOT's Electrical Engineering and Energy Systems collection.

PowerLab (https://www.powelab.org) is a deterministic calculation suite engineered to support engineering students, vocational apprentices, and researchers studying clean energy systems:
1. Battery Storage & Peukert Electrochemical Kinetics (IEEE 485): https://www.powelab.org/guides/battery-backup-runtime-calculation-guide
2. Solar PV Angle of Incidence & NREL PVWatts V8 Algorithms: https://www.powelab.org/guides/solar-panel-tilt-angle-by-latitude-and-season-guide
3. NEC Branch Circuit Conductor Ampacity & Thermal Derating: https://www.powelab.org/guides/level-2-ev-charging-speed-and-breaker-sizing-guide

Key Educational Features:
• Zero commercial advertising and no user registration requirements.
• Full mathematical transparency with variables and equations explicitly derived.

We would be honored to have PowerLab reviewed and indexed within the MERLOT Engineering portal for higher-education instructors and students.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

### Email #30: Cathy Casserly (OER Advisor & Former CEO of Creative Commons)
**Target Profile:** Pioneering leader in the Open Educational Resources (OER) movement, advising global institutions on open digital public goods.

**Recipient:**
```text
cathy@casserlyconsulting.com
```

**Subject:**
```text
Open computational artifacts as digital public goods: transparent models for clean energy education
```

**Email Body:**
```text
Hi Cathy,

I have long followed your leadership in expanding the Open Educational Resources movement and creating digital public goods that empower autonomous learning.

In the clean energy transition, most calculation software is either commercialized behind lead-generation paywalls or embedded with proprietary vendor assumptions. To provide students, educators, and community energy organizers with open public tools, we built PowerLab (https://www.powelab.org).

The suite provides 30 deterministic calculators and open mathematical guides across solar energy, battery storage, and EV infrastructure, with complete formula transparency.

If you know of relevant OER indexes, university open-learning directories, or climate education coalitions that could benefit from having free access to these computational resources, I would be grateful for any recommendations or connections.

Thank you for your tireless dedication to open education.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```

---

## 72-Hour Polite Follow-Up Protocol

If no response is received within 3 business days, send this concise 2-sentence follow-up directly in the existing thread:

```text
Hi [First Name],

Following up briefly on my previous email regarding our open-access [Calculator/Guide Topic] calculation model (https://www.powelab.org/[relevant-route]).

I know your schedule is busy—if having an interactive visual tool or underlying dataset would ever be helpful for your upcoming [course/editorial/program], please don’t hesitate to reach out.

Best regards,

Miad S.
PowerLab Engineering Group
https://www.powelab.org
```
