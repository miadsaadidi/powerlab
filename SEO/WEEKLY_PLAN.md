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

## 2. Weekly Planning Output Protocol (Trigger: *"What is Week 1 plan?"*)

When the user asks for the weekly plan:
1. **Audit Live Evidence:** GSC performance, technical crawlability/indexation, pure engines, whitepapers, datasets, internal links, authority records.
2. **Rank Proposed Objectives Dynamically:** Evaluate candidate opportunities against live search evidence across the 5-Tier Hierarchy.
3. **Return Standard Weekly Plan Layout:**
   - `## WEEK 1 CURRENT STATE`
   - `## WEEK 1 EVIDENCE`
   - `## WEEK 1 ROADMAP` (Table with Priority 1 ACTIVE, Priority 2..N PROPOSED)
   - `## ACTIVE OBJECTIVE` (Exactly ONE)
   - `## ACTIVE OBJECTIVE FLOW`
   - `## ACTION-BY-ACTION PLAN` (Active objective only)
   - `## DEPENDENCIES`
   - `## MEASUREMENT`
   - `## APPROVAL REQUIRED` $\rightarrow$ STOP.

---

## 3. Qualified Strategic Backlog (Categorized by 5-Tier Hierarchy)

Candidate opportunities from this backlog are activated ONLY when justified by empirical diagnosis:

### Tier 1 & 3: Core Search Asset & Search-Intent Upgrades (P1/P2 Pages)
* **Candidate T1-01 — Heat Pump Cost & COP Sizing Hub Upgrade:** Enhance `/home-energy/heat-pump-cost-calculator` and `/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics` with dual-fuel heating balance point tables, cold-climate derating curves, and worked sizing examples.
* **Candidate T1-02 — EVSE Branch Circuit & Breaker Sizing Upgrade:** Expand `/ev/ev-charger-breaker-size-calculator` with NEC Table 310.16 copper/aluminum ampacity tables, continuous-duty 125% derivations, and direct link to companion SSRN preprint #7446361.
* **Candidate T1-03 — BESS Peukert & Runtime Workbench Upgrade:** Integrate empirical tare loss curves and Peukert exponent definitions into `/battery/battery-runtime-calculator` and `/battery/battery-capacity-calculator`.
* **Candidate T1-04 — 50-State Solar Climate & Insolation Search Landing:** Optimize `/datasets/50-state-solar-insolation-climatic-benchmark` with state-by-state peak sun hour search tables and sub-zero Voc expansion factors.

### Tier 2: Topic Cluster Internal Linking Architecture
* **Candidate T2-01 — Solar Topic Cluster Mesh:** Build bidirectional contextual links: `/guides/solar-panel-angle-and-tilt-guide` $\longleftrightarrow$ `/solar/solar-panel-tilt-calculator` $\longleftrightarrow$ `/datasets/50-state-solar-insolation-climatic-benchmark` $\longleftrightarrow$ `/solar/solar-charge-controller-calculator`.
* **Candidate T2-02 — HVAC & Home Electrification Cluster Mesh:** Connect `/guides/heat-pump-operating-cost-guide` $\longleftrightarrow$ `/home-energy/heat-pump-cost-calculator` $\longleftrightarrow$ `/datasets/cold-climate-heat-pump-cop-degradation-benchmark` $\longleftrightarrow$ `/home-energy/air-conditioner-cost-calculator`.
* **Candidate T2-03 — BESS & Inverter Storage Cluster Mesh:** Connect `/guides/battery-storage-sizing-guide` $\longleftrightarrow$ `/battery/battery-capacity-calculator` $\longleftrightarrow$ `/battery/inverter-size-calculator` $\longleftrightarrow$ `/datasets/bess-peukert-capacity-derating-tare-loss-benchmark`.

### Tier 4: Technical SEO, Indexation & Crawl Health
* **Candidate T4-01 — Google Search Console Crawled-Not-Indexed Remediation:** Diagnose 34 URLs marked crawled-not-indexed; verify internal link depth, canonical fidelity, and substantive on-page content.
* **Candidate T4-02 — Schema.org Rich Result & Validation Audit:** Validate `WebApplication`, `ScholarlyArticle`, and `Dataset` JSON-LD schemas across all 84 routes for 100% Google Rich Results compliance.

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
