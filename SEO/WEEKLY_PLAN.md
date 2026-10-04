# POWLAB SEO — Tactical Roadmap & 7-Day Operational Plan

**Document Role:** Research-Driven, Evidence-Driven Opportunity Roadmap & 7-Day Execution System  
**SSOT Reference:** [SEO/MASTER_STRATEGY.md](file:///D:/powerlab/SEO/MASTER_STRATEGY.md)  
**Hub Target:** `https://www.powelab.org/`  
**Audit Baseline:** 2026-09-30 (GA4: 570 Users / 2,929 Events; GSC: 4,601 Impressions / 13 Clicks / 89 SSG Routes)

---

## 1. Empirical Diagnostics & Multi-Engine Intelligence Baseline

```text
EMPIRICAL METRICS SUMMARY (2026-09-02 to 2026-09-29):
• GA4 Active Users: 570 | Page Views: 867 | Calculator Views: 265 | Tool Calculations: 66
• GSC Search Visibility: 4,601 Impressions | 13 Clicks | Mobile Pos: 11.72 | Desktop Pos: 41.65
• Top GSC Impression Assets: /ev/ev-range-calculator (503), /home-energy/air-conditioner-cost-calculator (501), /home-energy/electricity-usage-calculator (457), /solar/solar-panel-output-calculator (381), /guides/how-many-kwh-does-a-house-use-per-day (300), /battery/battery-capacity-calculator (292)
• Top Traffic Sources: Direct (432 users), Bing Organic (62 users), ChatGPT (23 users), DuckDuckGo (12 users), Yahoo (9 users), Google Organic (6 users), BibSonomy (10 sessions), OER Commons (9 sessions), Perplexity (6 sessions), MERLOT (4 sessions)
• Google Indexation Health: 16 Indexed, 36 Crawled-Currently-Not-Indexed, 19 Discovered-Currently-Not-Indexed
```

### Multi-Engine Search-Gap Findings

1. **Engine A (Owned-Site Search Gaps):**
   - Recurring high-intent search queries clustered around electrical service panels, breaker ratings, and generator backfeed: `what size breaker for 48 amp ev charger` (pos 38.0), `what size breaker for electric car charger` (pos 47.0), `what size generator for 200 amp service` (pos 81.0), `what size generator for 150 amp service` (pos 84.25), and `solar voltage rise calculator` (pos 84.5).
   - Top-10 striking-distance opportunities: `/battery/portable-power-station-calculator` (145 imp, pos 9.38), `/battery/ups-battery-size-calculator` (22 imp, pos 9.68), and `/ev/ev-savings-calculator` (100 imp, pos 10.80).
2. **Engine B (SERP Search-Intent Gaps):**
   - **NEC 705.12 120% Busbar Rule:** Live SERP results provide abstract text summaries without deterministic mathematical formulas, clear 100A to 400A busbar derating matrix lookup tables ($(I_{\text{bus}} \times 1.20) - I_{\text{main}} = I_{\text{pv\_max}}$), supply-side tap (NEC 705.11) vs load-side tap comparisons, center-fed panel rules, or NEC 705.13 EMS rules for solar + battery systems.
   - **Heat Pump Balance Point & Auxiliary Heat Strips:** Forum queries and searchers lack an interactive balance point curve matching home heat loss to heat pump heating capacity retention.
3. **Engine C (Research / Engineering Radar):**
   - **Stationary BESS Low-Load Efficiency (Sandia SAND2004-5601 / NREL):** Commercial calculators assume static 90%–95% round-trip efficiency; in reality, 30W–60W continuous inverter tare power reduces effective nighttime efficiency to 65%–75% for low baseline loads (150W–300W).
4. **Engine D (Site Architecture & Mesh Graph):**
   - Missing bridge between solar sizing (`/solar/solar-panel-output-calculator`), EV infrastructure (`/ev/ev-charger-breaker-size-calculator`), voltage drop (`/battery/voltage-drop-calculator`), and home electrical service panels.

---

## 2. 7-Day Operational Execution Roadmap

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ DAY 1: Multi-Engine Search-Gap Intelligence & Empirical Diagnostics Baseline (COMPLETED)                │
│ • Audit Search Console, GA4 engagement, Bing webmaster, and indexation queue logs.                      │
│ • Mine SERP & Research Radar gaps across electrical, solar, battery, and HVAC clusters.                │
│ • Populate Weekly Opportunity Map and calibrate Candidate Backlog.                                     │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DAY 2: Flagship Layer 1 Publication — NEC 705.12 120% Busbar Rule Guide (COMPLETED — Session 52)         │
│                                                                                                        │
│ • STEP 1 — INTERACTIVE CALCULATOR COMPONENT:                                                           │
│   Built src/components/calculator/nec-busbar-calculator.tsx with 8 presets, phase-aware power math    │
│   (240V Split / 208V 3-Phase / 120V), conservative OCPD selection, visual busbar breakdown, ESS topology│
│   selector, interactive single-line busbar panel schematic, and dynamic derating comparison simulator. │
│                                                                                                        │
│ • STEP 2 — FLAGSHIP LAYER 1 ENGINEERING GUIDE:                                                         │
│   Authored src/app/guides/nec-705-12-120-percent-rule-solar-busbar-sizing-guide/page.tsx with Code Basis│
│   Notice (NEC 2023), DirectAnswerCard, 3 reference lookup tables (100A–400A), center-fed specifics,    │
│   supply-side tap (705.11) and EMS (705.13) rules, and Schema.org TechArticle JSON-LD.                │
│                                                                                                        │
│ • STEP 3 — REMAINING INTEGRATION, VALIDATION & GOVERNANCE TASKS:                                       │
│   Deployed 4-way cluster planning mesh cards across Solar Output, EV Charger Breaker, & Voltage Drop.   │
│   Added featured directory card to /calculators hub; registered guide in sitemap.ts, /guides hub,     │
│   public/llms.txt; ran 59/59 Vitest & 76-route static SSG build; recorded Session 52 in governance.   │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DAY 3: Cluster Mesh Integration & Striking-Distance Quick-Wins (TRACKS B & A)                          │
│ • Deploy bidirectional 4-way planning mesh cards on Solar Output, EV Charger Breaker, & Voltage Drop. │
│ • Execute on-page metadata and CTR tuning for /battery/portable-power-station-calculator (Pos 9.38).   │
│ • Optimize introductory copy and schema for /battery/ups-battery-size-calculator (Pos 9.68).          │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DAY 4: Core Research Publication — Residential BESS Low-Load Efficiency Dataset (TRACK D)              │
│ • Codify benchmark dataset PL-DS-BESS-07 (Residential BESS Low-Load Efficiency & Tare Loss Benchmark). │
│ • Model Sandia SAND2004-5601 tare loss kinetics (30W–60W continuous draw vs low nighttime load).       │
│ • Deploy dataset landing page and wire companion links to Battery Capacity & Battery Runtime tools.    │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DAY 5: HVAC Heating Cluster Upgrade — Heat Pump Balance Point & Heat Strip Guide (TRACK E / A)         │
│ • Formulate building heat loss vs heat pump COP capacity decay balance point crossover formulas.       │
│ • Deploy Layer 1 guide /guides/heat-pump-balance-point-and-auxiliary-heat-strip-sizing-guide.          │
│ • Wire companion links to /home-energy/heat-pump-cost-calculator and /home-energy/air-conditioner-cost.│
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DAY 6: External Technical Syndication & Academic Distribution (TRACK F)                                 │
│ • DEV.to / Hashnode Engineering Walkthrough: "Formulating NEC 705.12 Busbar Limits in Solar + Storage".│
│ • Register peer-reviewed simulation entries on CSU MERLOT and scholarly bookmarks on BibSonomy.       │
│ • Log verified entries into SEO/BACKLINK_LOG.csv and SEO/EXTERNAL_DISTRIBUTION.md.                     │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DAY 7: Validation Suite Execution, Health Audits & Opportunity Harvesting (SYSTEM HEALTH)              │
│ • Execute full automated Vitest test suite (100% unit tests passing).                                  │
│ • Verify 0 TypeScript compilation errors (tsc --noEmit) and clean static SSG build (next build).       │
│ • Audit Google Search Console indexation progress, re-crawl queues, and harvest Day 1 next-cycle gaps. │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Weekly Opportunity Map (Candidate Backlog by Track)

### Track A: Existing Asset Optimization (GSC Strike-Distance Priorities)
* **Candidate T1-01 — EV Range Calculator Physics Upgrade:** COMPLETED (Session 26) $\rightarrow$ **Measurement Mode** *(503 imp, avg pos 8.23)*.
* **Candidate T1-02 — Household Daily kWh Benchmark Guide Expansion:** COMPLETED (Session 29) $\rightarrow$ **Measurement Mode** *(300 imp, avg pos 24.10)*.
* **Candidate T1-03 — Battery Capacity & Ah/kWh Formula Workbench:** COMPLETED (Session 32) $\rightarrow$ **Measurement Mode** *(292 imp, 1 click, avg pos 27.76)*.
* **Candidate T1-04 — Central AC Cost Calculator Monitoring:** COMPLETED (Session 22) $\rightarrow$ **Measurement Mode**.
* **Candidate T1-05 — Solar Panel Output Calculator PVWatts Loss Tuning:** COMPLETED (Session 33) $\rightarrow$ **Measurement Mode** *(381 imp, 2 clicks, avg pos 21.58)*.
* **Candidate T1-06 — Appliance Wattage Calculator Strike-Distance Tuning:** COMPLETED (Session 41) $\rightarrow$ **Measurement Mode** *(56 imp, avg pos 27.14)*.
* **Candidate T1-07 — Central AC Cost Calculator SEER2 & Cooling Load Upgrade:** COMPLETED (Session 43) $\rightarrow$ **Measurement Mode** *(501 imp, 1 click, avg pos 14.95)*.
* **Candidate T1-08 — Heat Pump Cost Calculator HSPF2, Cold-Climate COP & HVAC Cluster Upgrade:** COMPLETED (Session 48) $\rightarrow$ **Measurement Mode**.
* **Candidate T1-09 — Portable Power Station & UPS Runtime Top-10 Quick-Win Tuning:** COMPLETED (Session 54) $\rightarrow$ **Measurement Mode** *(145 imp, avg pos 9.38 / 22 imp, avg pos 9.68)*.

### Track B: Cluster Upgrades (Multi-Asset Mesh Enhancements)
* **Candidate T2-01 — EV Driving Range, Charging Speed & Infrastructure Cluster Mesh:** COMPLETED (Session 42) $\rightarrow$ **Measurement Mode**.
* **Candidate T2-02 — Home Electrification & Daily Load Cluster Mesh:** COMPLETED (Session 40) $\rightarrow$ **Measurement Mode**.
* **Candidate T2-03 — Solar PV Yield, Tilt & Climate Cluster Mesh:** COMPLETED (Session 44) $\rightarrow$ **Measurement Mode**.
* **Candidate T2-04 / L1-01 — EV Infrastructure Breaker Sizing & Continuous-Duty Thermal Cluster Mesh:** COMPLETED (Session 45) $\rightarrow$ **Measurement Mode**.
* **Candidate T2-05 / AG-01 — Appliance Audit to Battery Storage & Backup Sizing Cluster Mesh:** COMPLETED (Session 50) $\rightarrow$ **Measurement Mode**.
* **Candidate T2-06 — Service Panel Electrical Sizing & Backfeed Cluster Mesh:** `SCHEDULED (Day 3)`  
  *Goal:* Interconnect `/solar/solar-panel-output-calculator` $\longleftrightarrow$ `/ev/ev-charger-breaker-size-calculator` $\longleftrightarrow$ `/battery/voltage-drop-calculator` $\longleftrightarrow$ `/home-energy/generator-size-calculator` $\longleftrightarrow$ `/guides/nec-705-12-120-percent-rule-solar-busbar-sizing-guide`.

### Track C: Technical & Architecture Fixes
* **Candidate T4-01 — Ahrefs Crawl & Link Remediation:** COMPLETED (PR #12).
* **Candidate T4-02 — Vercel Preview Deployment Purge:** COMPLETED (PR #12).
* **Candidate T4-03 — Indexation Diagnostic Watch:** 36 crawled-not-indexed + 19 discovered-not-indexed URLs observed in GSC. Status: **MONITOR** (Healthy crawl distribution; allow normal search engine processing queues).

### Track D: Core Publication Candidates (Research Radar — Provenance Gates)
* **Candidate CD-01 — Residential Battery Storage Degradation & Thermal Loss Dataset (PL-DS-BESS-06):** COMPLETED (Session 46) $\rightarrow$ **Measurement Mode**.
* **Candidate CD-02 — Heat Pump Sub-Zero Heating Performance Factor (HSPF2) Benchmark (PL-DS-HVAC-04):** COMPLETED (Session 51) $\rightarrow$ **Measurement Mode**.
* **Candidate CD-03 / RG-01 — Residential BESS Low-Load Efficiency & Standby Inverter Tare Loss Benchmark (PL-DS-BESS-07):** COMPLETED (Session 55) $\rightarrow$ **Measurement Mode**  
  *Evidence:* Empirically modeled 30W–60W inverter standby tare loads and low-load efficiency decay (200W night load @ 68.8%–74.3% effective RTE vs 95% nominal). Exact 48-row benchmark dataset deployed.

### Track E: Layer 1 Supporting Intent Candidates
* **Candidate L1-01 — Level 2 EVSE Continuous Duty 125% Ampacity Sizing Guide:** COMPLETED (Session 45) $\rightarrow$ **Measurement Mode**.
* **Candidate L1-02 — Solar Inverter DC-to-AC Ratio & Clipping Loss Guide:** COMPLETED (Session 47) $\rightarrow$ **Measurement Mode**.
* **Candidate L1-03 / AG-02 — EV V2L & V2H Home Backup Power Guide:** COMPLETED (Session 49) $\rightarrow$ **Measurement Mode**.
* **Candidate L1-04 / RG-02 — NEC 705.12 120% Rule Solar & Battery Busbar Backfeed Sizing Guide:** COMPLETED (Session 52) $\rightarrow$ **Measurement Mode**  
  *Evidence:* Sourced from GSC queries (`what size breaker for 48 amp ev charger`, `what size generator for 200 amp service`, `solar voltage rise calculator`) and SERP gap around residential electrical panel backfeed derates under NFPA 70-2026 NEC 705.12(B), NEC 705.11, and NEC 705.13 EMS systems.
* **Candidate L1-05 / SG-06 — Heat Pump Balance Point & Auxiliary Heat Strip Sizing Guide:** `SCHEDULED (Day 5)`  
  *Evidence:* Sourced from high-demand heating queries and SERP absence of thermal vs economic balance point models and exact auxiliary heat strip sizing formulas.

### Track F: External Technical Distribution (Dev.to / Hashnode)
* **Candidate F-01 — DEV.to Engineering Post:** *"Deterministic Solar PV AC Yield Modeling in Pure TypeScript via NREL PVWatts V8"*: `QUEUED`.
* **Candidate F-02 — DEV.to Engineering Post:** *"Continuous-Duty Thermal Ampacity in Residential EVSE Systems"*: COMPLETED (Session 45, `DEV-06`).
* **Candidate F-03 — DEV.to / Hashnode Engineering Post:** *"Formulating NEC 705.12 Busbar Ampacity Limits in Residential Solar + Storage Systems"*: `SCHEDULED (Day 6 Post-Merge)`.

---

## 4. Additive Search-Gap Backlog (Discovered Candidates)

| Candidate | Gap Type | Query / Topic | Evidence Type | Missing SERP / Site Component | Proposed PowerLab Solution | Objective Class | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RG-02 / L1-04** | Freshness Gap / Implementation | `nec 705.12 120 percent rule`, `busbar solar backfeed`, `generator 200 amp service` | GSC Demand + NFPA 70-2026 | Complex electrical panel backfeed rule (120% busbar limit) explained poorly; lacks interactive main breaker derate matrix. | NEC 705.12 Solar & Battery Panel Busbar Sizing Guide | `LAYER 1 SUPPORTING` | `COMPLETED (Session 52)` |
| **SG-05** | Tool Gap / Technical Depth | `solar inverter clipping loss`, `solar dc ac ratio` | SERP Evidence + Hypothesis | SERP articles offer generic 1%–2% clipping rules of thumb without an interactive model factoring in DC/AC ratio and orientation. | Solar Inverter Clipping Loss & DC/AC Overbuild Ratio Calculator feature | `NEW FEATURE` | `DISCOVERED` |
| **SG-06 / L1-05** | Workflow / Tool Gap | `heat pump balance point calculation`, `heat strip kw size` | GSC + Research Evidence | Forums state generic "10 kW strip" rules; SERP lacks balance point cross-over curve matching home heat loss to heat pump capacity. | Heat Pump Balance Point & Auxiliary Heat Strip Guide | `LAYER 1 SUPPORTING` | `SCHEDULED (Day 5)` |
| **RG-01 / CD-03** | Data Gap / Evidence Gap | BESS Standby Tare Loss & Low-Load Efficiency | Research Radar (Sandia/NREL) | Competitors assume flat 90%–95% round-trip efficiency; miss that 40W inverter tare drops 200W nighttime efficiency to ~70%. | Core Dataset `PL-DS-BESS-07` (*Residential BESS Low-Load Efficiency Benchmark*) | `CORE PUBLICATION` | `SCHEDULED (Day 4)` |
| **AG-01** | Workflow / Handoff Gap | Appliance Audit $\rightarrow$ Battery Storage Handoff | GSC + Site Architecture | Disconnected handoff between `/home-energy/electricity-usage-calculator` and `/home-energy/home-battery-size-calculator`. | localStorage Energy Profile critical circuit handoff card & 4-way cluster planning mesh | `CLUSTER UPGRADE` | `COMPLETED (Session 50)` |
| **AG-02** | Core $\rightarrow$ Layer 1 Gap | `ev v2l home backup`, `transfer switch v2l` | Site Architecture Evidence | Tool `/ev/v2l-runtime-calculator` lacks Layer 1 engineering guide on 120V/240V continuous limits, neutral bonding & transfer switches. | Layer 1 Guide: *How to Power a Home with EV Bidirectional V2L/V2H* | `LAYER 1 SUPPORTING` | `COMPLETED (Session 49)` |

---

## 5. Priority Hierarchy & North Star Decision Criterion

### Priority Hierarchy
1. Existing page with clear GSC opportunity
2. Existing cluster with multiple related opportunities
3. Evidence-backed technical issue
4. Genuine search/content gap
5. Core Publication
6. Layer 1 supporting publication

### North Star Decision Criterion
> **"What evidence shows that this change can improve Google's understanding, coverage, relevance, discoverability, or usefulness of the site's search assets?"**

