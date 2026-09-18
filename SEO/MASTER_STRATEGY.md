# POWLAB — MASTER SEO STRATEGY & OPERATING SYSTEM

**Domain:** `https://www.powelab.org/`  
**Status:** Authoritative Single Source of Truth (SSOT) for all PowerLab SEO, on-site architecture, topic clustering, content optimization, technical SEO, and external distribution.

---

## 1. THE SEO NORTH STAR

> **Increase PowerLab's visibility and rankings in Google Search for high-value engineering, clean-energy, electrical, computational-engineering, and research-related search intents.**

PowerLab is a database-free, deterministic energy planning and computational engineering platform. The strategic center of gravity is:

$$\text{PowerLab's Own Pages} \longrightarrow \text{Indexability} \longrightarrow \text{Search Intent} \longrightarrow \text{Topical Coverage} \longrightarrow \text{Original Technical Value} \longrightarrow \text{Internal Linking} \longrightarrow \text{Technical SEO} \longrightarrow \text{Search Console Measurement} \longrightarrow \text{Iterative Improvement}$$

External publishing on platforms like Dev.to, Hashnode, Medium, Academia.edu, Figshare, MERLOT, and BibSonomy is a **supporting distribution, audience discovery, entity reinforcement, and reputation layer**, NOT the primary foundation of the ranking strategy.

Success is defined as:
> **Building, improving, indexing, connecting, and measuring high-value PowerLab pages that satisfy identifiable Google search intents.**

---

## 2. THE 5-TIER SEO PRIORITY HIERARCHY

Adopt this priority hierarchy across all strategy files, roadmaps, rules, and operations:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ TIER 1: Core Google Search Assets (Calculators, Guides, Research, Data) │
├─────────────────────────────────────────────────────────────────────────┤
│ TIER 2: Supporting Internal Architecture & Topic Cluster Graphs         │
├─────────────────────────────────────────────────────────────────────────┤
│ TIER 3: Search-Intent & On-Page Technical Substance Optimization        │
├─────────────────────────────────────────────────────────────────────────┤
│ TIER 4: Technical SEO, Indexability, Schema & Crawl Health              │
├─────────────────────────────────────────────────────────────────────────┤
│ TIER 5: Supporting External Distribution, Discovery & Citation Layer    │
└─────────────────────────────────────────────────────────────────────────┘
```

### Tier 1 — Core Google Search Assets (Highest Priority)
* **Calculators & Computational Engines:** Interactive tools acting as high-intent functional search landing pages.
* **Technical Engineering Guides:** In-depth, practical guides explaining calculation methodology, NEC/IEEE/ASHRAE code compliance, and real-world trade-offs.
* **Research Whitepapers:** Rigorous technical reports solving concrete industry and physics problems.
* **Benchmark Datasets:** Structured empirical datasets providing transparent variables, formulas, and baseline values.
* **Methodology & Documentation Pages:** Transparent derivation of mathematical formulations and physical constants.
* **Category & Topic Hub Landing Pages:** Structured hubs organizing cluster relationships.

### Tier 2 — Supporting Internal Architecture
Build crawlable, bidirectional internal links with descriptive anchor text across every topic cluster:
$$\text{Technical Guide} \longleftrightarrow \text{Interactive Calculator} \longleftrightarrow \text{Benchmark Dataset} \longleftrightarrow \text{Research Paper} \longleftrightarrow \text{Methodology}$$
Help search engine crawlers and users recognize that related pages form coherent, authoritative engineering topic clusters.

### Tier 3 — Search-Intent Optimization
Every primary PowerLab page must satisfy a distinct, identifiable user problem:
* **Primary Topic & Intent:** What specific calculation, code requirement, or sizing decision is the searcher solving?
* **Query Family:** What terms, synonyms, and engineering terminology do practitioners search for?
* **Page Type & Technical Substance:** Does the page provide working formulas, input definitions, default assumptions, worked examples, and standards citations?
* **Internal Graph Placement:** What pages link into it, and what related resources does it link out to?

### Tier 4 — Technical SEO & Crawlability
Maintain high technical integrity:
* HTTP status correctness (200 OK, zero broken internal links, zero redirect chains).
* Canonical tag consistency (`https://www.powelab.org/...`).
* Dynamic XML sitemap freshness with accurate `lastmod` and priority.
* Robots.txt correctness and clean crawl paths.
* Valid Schema.org structured data (`WebApplication`, `ScholarlyArticle`, `Dataset`, `BreadcrumbList`) matching actual content.
* Fast Core Web Vitals (LCP, INP, CLS) and responsive mobile usability.

### Tier 5 — Supporting External Distribution
External platforms (Dev.to, Hashnode, Medium, Academia, Figshare, Hugging Face, MERLOT, BibSonomy) serve as:
* Content distribution and audience reach.
* Engineering community discovery.
* Author entity reinforcement (Knowledge Graph).
* Referral traffic sources.
* Natural scholarly citation channels.

**Rules for Tier 5:**
* External publishing volume is NEVER an SEO KPI.
* External articles are NEVER described as guaranteed ranking signals.
* Nofollow links are valuable for discovery and brand traffic; dofollow links are not guaranteed ranking boosts.

---

## 3. THE CORE OPERATING ARCHITECTURE

```text
       ┌───────────────────────────────┐
       │     IDENTIFIED SEARCH INTENT  │
       └───────────────┬───────────────┘
                       ▼
       ┌───────────────────────────────┐
       │     POWERLAB PRIMARY PAGE     │
       └───────────────┬───────────────┘
                       ▼
       ┌───────────────────────────────┐
       │ SUPPORTING TECHNICAL CONTENT  │
       │ Calculator / Data / Research  │
       └───────────────┬───────────────┘
                       ▼
       ┌───────────────────────────────┐
       │   TOPIC CLUSTER INTERNAL LINKS│
       └───────────────┬───────────────┘
                       ▼
       ┌───────────────────────────────┐
       │    GOOGLE CRAWL & INDEXING    │
       └───────────────┬───────────────┘
                       ▼
       ┌───────────────────────────────┐
       │   SEARCH CONSOLE IMPRESSIONS  │
       └───────────────┬───────────────┘
                       ▼
       ┌───────────────────────────────┐
       │    QUERY / CTR / POS DATA     │
       └───────────────┬───────────────┘
                       ▼
       ┌───────────────────────────────┐
       │    ON-PAGE IMPROVEMENT LOOP   │
       └───────────────┬───────────────┘
                       ▼
       ┌───────────────────────────────┐
       │ RANKING & ORGANIC GROWTH      │
       └───────────────────────────────┘
```

**Parallel Supporting External Distribution:**
$$\text{PowerLab Core Asset} \longrightarrow \text{Distinct Technical Angle} \longrightarrow \text{External Channel (Dev.to / Hashnode / etc.)} \longrightarrow \text{Audience Discovery \& Citation}$$

Never reverse this hierarchy. PowerLab is always the primary, canonical source.

---

## 4. TOPIC CLUSTERS & ASSET ARCHITECTURE

PowerLab organizes its core search assets around coherent engineering topic clusters:

```text
1. Battery Energy Storage Systems (BESS)
   ├── Primary Hub: /battery
   ├── Core Calculators: /battery/battery-capacity-calculator, /battery/battery-runtime-calculator, /battery/inverter-size-calculator, /battery/voltage-drop-calculator
   ├── Datasets: /datasets/bess-peukert-capacity-derating-tare-loss-benchmark
   ├── Research: /research/electrochemical-peukert-derating-bess
   └── Guides: /guides/battery-storage-sizing-guide, /guides/voltage-drop-and-wire-size-calculation-guide

2. Solar Photovoltaics (PV)
   ├── Primary Hub: /solar
   ├── Core Calculators: /solar/solar-panel-output-calculator, /solar/solar-panel-tilt-calculator, /solar/solar-charge-controller-calculator, /solar/solar-angle-calculator
   ├── Datasets: /datasets/50-state-solar-insolation-climatic-benchmark
   ├── Research: /solar/regional-climate-data
   └── Guides: /guides/solar-panel-angle-and-tilt-guide

3. Electric Vehicle Supply Equipment (EVSE)
   ├── Primary Hub: /ev
   ├── Core Calculators: /ev/ev-charging-time-calculator, /ev/ev-charger-breaker-size-calculator, /ev/ev-range-calculator, /ev/ev-charging-cost-calculator
   ├── Datasets: /datasets/continuous-duty-evse-terminal-temperature-benchmark
   ├── Research: /research/continuous-duty-thermal-sizing-evse-ampacity (SSRN #7446361)
   └── Guides: /guides/ev-charger-circuit-sizing-guide

4. Home Electrification & HVAC Engineering
   ├── Primary Hub: /home-energy
   ├── Core Calculators: /home-energy/heat-pump-cost-calculator, /home-energy/air-conditioner-cost-calculator, /home-energy/electricity-usage-calculator, /home-energy/space-heater-cost-calculator
   ├── Datasets: /datasets/cold-climate-heat-pump-cop-degradation-benchmark, /datasets/central-air-conditioner-seer2-cooling-degree-day-benchmark
   ├── Research: /research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics
   └── Guides: /guides/heat-pump-operating-cost-guide

5. Power Systems & Emergency Generation
   ├── Primary Hub: /home-energy
   ├── Core Calculators: /home-energy/generator-size-calculator, /home-energy/home-battery-size-calculator
   ├── Datasets: /datasets/standby-generator-motor-inrush-voltage-sag-benchmark
   └── Research: PL-TR-2026-GEN02 (Locked Rotor Amperes & Inrush Transients)
```

---

## 5. CONTENT OPTIMIZATION STANDARDS

### A. Existing Asset Upgrade Rule
Before proposing or creating new content, ask:
> **"Is there already an existing PowerLab page that could satisfy this search intent if improved?"**

If yes, **upgrade the existing page first**. Optimize headings, technical substance, equations, worked examples, and internal links before creating new URLs.

### B. Calculators as Search Assets
Every calculator page must provide:
1. Interactive calculation engine with transparent inputs, editable defaults, and input provenance.
2. Clear explanation of what the tool calculates and who it is for.
3. Mathematical formulas, physical models, and derivation.
4. Input definitions, unit specifications, and default assumptions.
5. Concrete worked engineering example.
6. Governing standards (NEC, IEEE, NEMA, ASHRAE, AHRI, DOE).
7. Limitations and boundary conditions.
8. Contextual links to related calculators, datasets, research papers, and guides.

### C. Datasets as First-Class Search Assets
Dataset landing pages must never be download-only stubs. They must document:
1. What physical phenomenon the dataset measures and why it exists.
2. Methodology, test conditions, and simulation parameters.
3. Field-by-field variable dictionary with units and data types.
4. Summary table preview of benchmark values.
5. Engineering use cases and application examples.
6. DataCite DOI citation block and BibTeX export.
7. Contextual links to companion calculators, research papers, and technical guides.

### D. Research Pages Bridging Search Intent
Academic research pages must bridge scientific rigor and real search queries:
1. Retain formal research title and report number.
2. Search-optimized metadata title and H1.
3. Executive summary explaining the practical engineering problem solved.
4. Methodological formulation and numerical findings.
5. Links to interactive calculator tools implementing the formulas.
6. External preprint / DOI citations (SSRN, Academia, Figshare).

---

## 6. PAGE PRIORITY MODEL (P1 TO P4)

* **P1 — Strategic Search Assets:** Flagship calculators, primary research papers, high-volume search intent landing pages (e.g., `/battery/battery-runtime-calculator`, `/ev/ev-charger-breaker-size-calculator`, `/solar/solar-panel-output-calculator`, `/home-energy/heat-pump-cost-calculator`).
* **P2 — Supporting Topic Assets:** Topic hubs, specialized calculators, benchmark dataset landing pages, technical guides.
* **P3 — Reference & Methodology Assets:** Underlying equation reference pages, dataset download manifests, secondary whitepapers.
* **P4 — Maintenance Pages:** Legal, privacy, about, contact, and structural utility routes.

---

## 7. SEARCH CONSOLE AS THE PRIMARY FEEDBACK LOOP

Search Console data is the authoritative signal for on-page optimization:
* **High Impressions, Low CTR:** Refine meta titles, descriptions, and intro copy to match search intent.
* **Strike-Distance Queries (Positions 8–20):** Deepen technical substance, add worked examples, expand internal link anchor text.
* **Unexpected Query Associations:** Add dedicated sections or FAQs answering emerging user search intents.
* **Zero-Impression Pages:** Diagnose indexation, sitemap status, internal link depth, and keyword relevance.

> [!IMPORTANT]
> Never fabricate Search Console impressions, clicks, rankings, or crawl stats. When live GSC data is unavailable, state the audit as a technical inspection or research hypothesis.

---

## 8. REVISED KPI FRAMEWORK

```text
PRIMARY SEARCH KPIS (Authoritative):
├── Valid Indexed URLs in Google Search
├── Total Google Search Impressions & Growth
├── Total Google Search Clicks & Organic Traffic
├── Query Coverage (Number of distinct engineering queries ranking)
├── Average Position across Strategic Target Keywords
├── Impression & Click Growth within Target Topic Clusters
└── Number of Unique Landing Pages Generating Search Traffic

SECONDARY TECHNICAL KPIS (Supporting Health):
├── Internal Link Coverage & Zero Orphan Pages
├── XML Sitemap Freshness & Status Code Correctness (100% 200 OK)
├── Schema.org Structured Data Validity (Zero Search Console warnings)
├── Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1)
└── Legitimate Referral Traffic from External Platforms

DIAGNOSTIC-ONLY METRICS (Never Primary KPIs):
├── Ahrefs / Moz Domain Rating (DR/DA)
├── Raw Backlink Count
├── Volume of External Articles Published
└── Social Media Mentions
```

---

## 9. GOVERNANCE & OPERATING LOOP

Every SEO cycle strictly follows the 9-step governance loop:

$$\text{DIAGNOSE} \longrightarrow \text{ONE OBJECTIVE} \longrightarrow \text{PLAN} \longrightarrow \text{STOP} \longrightarrow \text{USER APPROVAL} \longrightarrow \text{EXECUTE} \longrightarrow \text{VALIDATE} \longrightarrow \text{LOG} \longrightarrow \text{MEASURE} \longrightarrow \text{RE-DIAGNOSE}$$

1. **Diagnose First:** Inspect on-site pages, Search Console data, indexability, topical coverage, and internal links.
2. **One Active Objective:** Select exactly ONE evidence-backed objective at a time.
3. **Approval Gate:** Present the diagnosis, plan, and files affected, then **STOP IMMEDIATELY**.
4. **Targeted Execution:** Execute only the approved objective.
5. **Validate:** Test code, build, and verify actual search/page improvements.
6. **Log:** Record changes in `SEO/DAILY_LOG.md` and `SEO/CHANGELOG.md`.
7. **Measure & Re-Diagnose:** Measure real data and re-evaluate before proposing the next objective.
