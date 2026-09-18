# POWLAB SEO — Tactical Roadmap & Planning System

**Document Role:** Adaptive Tactical Roadmap & Evidence-Driven Prioritization System  
**SSOT Reference:** [SEO/MASTER_STRATEGY.md](file:///D:/powerlab/SEO/MASTER_STRATEGY.md)  
**Hub Target:** `https://www.powelab.org/`

---

## 1. Core Operating Principles

```text
WEEKLY ROADMAP = DYNAMIC MULTI-OBJECTIVE PIPELINE
ACTIVE EXECUTION = ONE OBJECTIVE AT A TIME
AFTER EACH OBJECTIVE = RE-DIAGNOSE AND RE-PLAN
```

1. **Evidence-Driven Dynamic Roadmap:** The weekly plan is an adaptive roadmap of candidate opportunities, NOT a rigid publishing calendar or a queue that must all be completed.
2. **Zero Quotas:** No mandatory quotas for external articles, backlinks, datasets, or outreach.
3. **One Active Objective at a Time:** Only ONE objective is active at a time, executed through its complete lifecycle:
   $$\text{DIAGNOSE} \longrightarrow \text{ONE OBJECTIVE} \longrightarrow \text{PLAN} \longrightarrow \text{APPROVAL} \longrightarrow \text{EXECUTE} \longrightarrow \text{VALIDATE} \longrightarrow \text{LOG} \longrightarrow \text{MEASURE} \longrightarrow \text{RE-DIAGNOSE}$$
4. **On-Site First Focus:** The primary optimization unit is the **individual PowerLab page and its surrounding topical cluster**. External distribution is a supporting layer.
5. **No Outcome Guarantees:** Treat indexing, citations, backlinks, rankings, and traffic strictly as potential outcomes, never guarantees.
6. **Adaptive Re-Planning:** Upon completion of an objective, re-diagnose live evidence (Search Console, crawl health, indexation) to select the next highest-value objective.

---

---

## 2. Weekly & Daily Planning Output Protocol

When prompted with *"SEO plan this week"* or *"SEO plan today"*, return strictly the 4-part standard format:

```markdown
### CURRENT STATE
(3–5 concise bullets)

### PLAN
(Maximum 5–6 short steps)

### ACTIVE OBJECTIVE
(One line)

### APPROVAL
(One line)
```

### Evidentiary Guardrails & Reporting Standards
1. **Device Aggregate vs. Page Position:** Never claim site-wide device positions (e.g. Mobile 13.77, Desktop 64.56) belong to individual pages.
2. **Query→Page Verifications:** Never claim a query maps to a specific URL unless verified directly in GSC exports.
3. **Zero Ranking Guarantees:** Never claim an optimization will reach Top 5, guarantee a ranking increase, or guarantee CTR improvements.
4. **Indexation Watch Track:** Maintain indexation issues (17 indexed, 55 non-indexed, 34 crawled-not-indexed, 13 discovered-not-indexed, 5 redirect errors, 3 redirected) in a separate diagnostic track; do not launch bulk indexation remediation automatically.
5. **Measurement Mode:** Keep recently optimized pages in measurement mode without auto-activating the next backlog item.
6. **Technical Integrity:** Only add physics, temperature, aerodynamic, or electrical tables supported by deterministic calculation engines or authoritative engineering standards. Always preserve calculation engine, canonical URL, robots, and sitemap.

---

## 3. Qualified Strategic Backlog (Ranked by GSC Empirical Search Evidence)

Candidate opportunities from this backlog are activated ONLY when justified by empirical diagnosis:

### Tier 1 & 3: Core Search Asset & Search-Intent Upgrades (GSC Strike-Distance Priorities)
* **Candidate T1-01 — EV Range Calculator Search-Intent & Aerodynamic Physics Upgrade:**  
  *Evidence:* **1,309 GSC Impressions** at **Position 16.53** (Page 2 strike distance on queries `how to calculate ev range` Pos 15.5, `ev range calculation formula` Pos 20.0).  
  *Action:* Upgrade `/ev/ev-range-calculator` with speed drag table ($F_d = \frac{1}{2}\rho C_d A v^2$ at 55/65/75/80 mph), sub-zero cold temperature penalty matrix, and 4-step manual math walkthrough.
* **Candidate T1-02 — Household Daily kWh Benchmark Guide Intent Expansion:**  
  *Evidence:* **1,470 GSC Impressions** (queries `how many kwh does a house use per day` Pos 30.7, `9 kwh per day` Pos 15.0, `12 kwh per day` Pos 23.7).  
  *Action:* Upgrade `/guides/how-many-kwh-does-a-house-use-per-day` with appliance breakdown tables, square footage benchmarks, and bidirectional links to `/home-energy/electricity-usage-calculator`.
* **Candidate T1-03 — Battery Capacity & Ah/kWh Formula Workbench Upgrade:**  
  *Evidence:* **1,686 GSC Impressions** (queries `battery capacity in kwh` Pos 44.0, `battery capacity formula` Pos 47.0, `mah to kwh` Pos 58.3).  
  *Action:* Enhance `/battery/battery-capacity-calculator` with full chemistry DoD bounds, cycle health degradation, and conversion formula cards.
* **Candidate T1-04 — Central AC Cost Calculator Monitoring & Evaluation:**  
  *Evidence:* **2,000 GSC Impressions** at **Position 16.45** (queries `ac cost calculator` Pos 31.5, `central ac energy cost` Pos 42.0).  
  *Action:* Monitor organic rankings post-deployment of Session 22 search-intent upgrades (in PR #12).
* **Candidate T1-05 — Solar Panel Output Calculator High-Volume Tuning:**  
  *Evidence:* **1,351 GSC Impressions** (queries `solar panel output calculator`, `solar production calculator`).  
  *Action:* Add seasonal PVWatts V8 insolation yield comparison table to `/solar/solar-panel-output-calculator`.

### Tier 2: Topic Cluster Internal Linking Architecture
* **Candidate T2-01 — EV Topic Cluster Mesh:** Build bidirectional contextual links: `/guides/how-to-calculate-ev-driving-range-and-efficiency-guide` $\longleftrightarrow$ `/ev/ev-range-calculator` $\longleftrightarrow$ `/ev/ev-charging-time-calculator` $\longleftrightarrow$ `/datasets/continuous-duty-evse-terminal-temperature-benchmark`.
* **Candidate T2-02 — Home Electrification & Daily Load Cluster Mesh:** Connect `/guides/how-many-kwh-does-a-house-use-per-day` $\longleftrightarrow$ `/home-energy/electricity-usage-calculator` $\longleftrightarrow$ `/home-energy/energy-bill-calculator` $\longleftrightarrow$ `/home-energy/home-battery-size-calculator`.
* **Candidate T2-03 — Solar PV & Climate Cluster Mesh:** Connect `/guides/solar-panel-tilt-angle-by-latitude-and-season-guide` $\longleftrightarrow$ `/solar/solar-panel-tilt-calculator` $\longleftrightarrow$ `/datasets/50-state-solar-insolation-climatic-benchmark` $\longleftrightarrow$ `/solar/solar-charge-controller-calculator`.

### Tier 4: Technical SEO, Indexation & Crawl Health
* **Candidate T4-01 — Ahrefs Site Audit Remediation (COMPLETED in PR #12):** Remediated 14 broken 404 links, calibrated 9 SERP titles, trimmed 8 meta descriptions, and upgraded Dataset JSON-LD schema.
* **Candidate T4-02 — Vercel Preview Deployment Purge Automation (COMPLETED in PR #12):** Automated Vercel preview retirement via REST API and added `npm run vercel:clean`.

### Tier 5: Supporting External Distribution & Scientific Citation (Secondary)
* **Candidate T5-01 — MERLOT Higher-Ed Courseware Submissions:** Catalog calculation engines in California State University MERLOT OER system (DA 75) for verified academic citations.
* **Candidate T5-02 — Open Energy Data Initiative (OEDI / NREL / DOE):** Deposit benchmark dataset packages to government open data portals.
* **Candidate T5-03 — Editorial Technical Pitching:** Pitch non-promotional engineering case studies citing PowerLab open datasets to industry journals (`Power Engineering`, `EEP`, `Energy Central`).

---

## 4. Legacy Calendar Archive (NON-AUTHORITATIVE REFERENCE)

> [!NOTE]
> The fixed 7-day schedule below is preserved strictly as a **historical reference and candidate pool**. It does **NOT** govern daily operations and imposes no mandatory publication schedule.

```text
LEGACY / BACKLOG / NON-AUTHORITATIVE SCHEDULE:
Day 1: DEV.to Technical Post (EVSE Sizing in TypeScript)
Day 2: Harvard Dataverse / Zenodo Dataset Deposit (BESS Peukert Matrix)
Day 3: IEEE TechRxiv Preprint (Continuous-Duty EVSE Sizing)
Day 4: University Faculty Outreach (Battery Lab Unit 01)
Day 5: Hashnode Technical Post (Solar MPPT vs PWM Sizing)
Day 6: AlternativeTo Tool Profile (PowerLab Workbench)
Day 7: BibSonomy / ORCID Indexing Sweep (5 Technical Reports)
```
