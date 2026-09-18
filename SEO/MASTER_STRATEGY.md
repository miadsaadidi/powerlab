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
2. **One Active Objective = One Coherent SEO Outcome:** Select exactly ONE evidence-backed objective at a time (governed by Section 10).
3. **Approval Gate:** Present the diagnosis, plan, and files affected, then **STOP IMMEDIATELY**.
4. **Targeted Execution:** Execute only the approved objective.
5. **Validate:** Test code, build, and verify actual search/page improvements.
6. **Log:** Record changes in `SEO/DAILY_LOG.md` and `SEO/CHANGELOG.md`.
7. **Measure & Re-Diagnose:** Measure real data and re-evaluate before proposing the next objective.

---

## 10. OBJECTIVE SIZING & CLASSIFICATION STANDARD

> **CORE RULE: ONE ACTIVE OBJECTIVE = ONE COHERENT SEO OUTCOME.**  
> *"Exactly ONE Active Objective"* means **exactly one coherent outcome — NOT exactly one URL**.

An objective is NOT limited to one URL. It may cover one page, several related pages, a topic cluster, a new core publication, or a systemic technical issue.

### A. Objective Classes
Every active objective must be explicitly classified into one of:
1. **`SINGLE ASSET`** — one page/calculator/guide
2. **`CLUSTER UPGRADE`** — multiple closely related existing pages
3. **`CORE PUBLICATION`** — one new Layer 1 asset
4. **`CLUSTER PUBLICATION`** — multiple tightly related new assets
5. **`SYSTEMIC TECHNICAL REMEDIATION`** — one site-wide technical problem
6. **`DIAGNOSTIC / MEASUREMENT`** — investigation only, no implementation

### B. Objective Sizing Rules
The size of an objective is determined by 5 coherence invariants:
1. **Search Problem Coherence:** All affected URLs must address the same search-intent/topic problem.
2. **Implementation-Pattern Coherence:** The work should use a repeatable or clearly related implementation pattern.
3. **Validation Coherence:** The affected scope must be testable and validated as one controlled unit.
4. **Measurement Coherence:** The objective must have one primary SEO hypothesis and measurable evidence.
5. **Execution Controllability:** The scope must be large enough to create meaningful progress but small enough to establish what changed and validate it reliably.

### C. Examples of Valid vs. Invalid Sizing
* **Valid:** *Optimize 1 calculator for a high-confidence strike-distance query cluster.* (`SINGLE ASSET`)
* **Valid:** *Upgrade 6 related battery calculators using the same Ah/kWh, DoD, formula, and internal-link framework.* (`CLUSTER UPGRADE`)
* **Valid:** *Upgrade 10 HVAC calculators affected by the same missing methodology section.* (`CLUSTER UPGRADE`)
* **Valid:** *Create one new Layer 1 guide for a clearly identified search-intent gap.* (`CORE PUBLICATION`)
* **Invalid:** *Optimize 2 battery calculators + 2 solar calculators + publish 3 articles + fix redirects.* (Multiple unrelated objectives).

### D. Required Pre-Execution Objective Metadata
Before execution, every objective must state:
* **Objective Class**
* **Scope / affected URLs**
* **Search problem**
* **Evidence**
* **Expected outcome**
* **Validation method**
* **Measurement method**

Do not artificially shrink a coherent cluster objective to one URL merely to satisfy the one-objective rule. Do not artificially combine unrelated work into one objective merely to increase scope. Sizing must always reflect the smallest scope capable of producing a meaningful, measurable SEO outcome.

---

## 11. RESEARCH-DRIVEN, EVIDENCE-DRIVEN SEO PRODUCTION SYSTEM

The PowerLab SEO operating system is a **research-driven, evidence-driven asset production engine**. The weekly workflow operates as an active intelligence and production cycle, not a passive monitoring schedule.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ DAY 1: FULL SEO INTELLIGENCE + OPPORTUNITY MAPPING                          │
│ • Owned-Site Evidence (GSC, GA4, Indexation, CWV, Graph Health)             │
│ • SERP Evidence (Competitor tools, missing data, intent gaps, query families)│
│ • External Research Radar (ASHRAE, ACCA, DOE, NREL, PNNL, LBNL, ORNL, NIST) │
│ ──► Output: Weekly Evidence-Backed Opportunity Map (Categories A–F)         │
├─────────────────────────────────────────────────────────────────────────────┤
│ DAY 2: CORE PRODUCTION + EXISTING ASSET EXECUTION                           │
│ • Initiate highest-value Core assets & execute immediate high-impact quick  │
│   wins and existing-page optimizations supported by empirical data          │
├─────────────────────────────────────────────────────────────────────────────┤
│ DAYS 3–6: CORE + LAYER 1 + CLUSTER + EXISTING ASSET EXECUTION               │
│ • Core publications & Layer 1 supporting pages                              │
│ • Calculator/tool optimizations & topic cluster mesh linking                │
│ • Continuous Research Radar running parallel across all execution days      │
│ • Technical distribution via Dev.to / Hashnode where appropriate            │
├─────────────────────────────────────────────────────────────────────────────┤
│ DAY 7: VALIDATION + MEASUREMENT + OPPORTUNITY HARVESTING                    │
│ • Typecheck, unit tests, static builds, schema/canonical verification       │
│ • Measure GSC/indexing progress & harvest new findings for next Day 1 loop  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Integrated 3-Tier Diagnostic on Day 1
1. **Owned-Site Evidence:** GSC pages/queries, impressions, clicks, CTR, average positions, query/page movement, emerging query families, high-impression / low-CTR opportunities, striking-distance rankings (Pos 8–40), existing calculators/tools, existing guides/research, internal linking graph, indexation status, and technical health.
2. **SERP Evidence:** Current ranking competitor pages, SERP snippet formats, competing calculators/tools, missing tables, datasets, formulas, references, or explanations, weak/fragmented search results, search-intent gaps, and industry terminology variants.
3. **External Research / Authority Radar:** Continuous inspection of authoritative technical sources, national laboratories, standards organizations, open datasets, and scientific repositories (e.g., ASHRAE, ACCA, DOE, NREL, PNNL, LBNL, ORNL, NIST, EIA, IEEE, NFPA, and open academic repositories).  
   *Goal:* Discover emerging search topics, empirical datasets, unsolved engineering questions, research gaps, calculation opportunities, and new Core asset candidates.

### Day 1 Output: Weekly Opportunity Map
Day 1 produces an actionable, evidence-backed Opportunity Map categorized into 6 distinct tracks:
* **A. Existing Asset Optimization:** Pages/calculators with existing search impressions that can be expanded or refined.
* **B. Cluster Upgrade:** Cohesive multi-asset upgrades solving a shared search problem.
* **C. Technical / Architecture Fixes:** Evidenced crawl, indexation, schema, canonical, or performance issues.
* **D. Core Publication Candidates:** Major new search assets (datasets, whitepapers, engineering research, technical references, major guides, calculator-backed research).
* **E. Layer 1 Candidates:** Specific supporting search intents designed to strengthen a Core asset.
* **F. External Technical Distribution:** Deep-dive technical explanations for Dev.to / Hashnode derived from original PowerLab work.

---

## 12. CORE ASSETS AS A PRIMARY SEO PRODUCTION PILLAR & TOPIC ARCHITECTURE

### Persistent Search-Asset Creation & Research Mining
Content production is strictly defined as **Persistent Search-Asset Creation & Research Mining**, not generic blog publishing.
* **Core Asset Archetypes:** Structured Datasets, Technical Whitepapers, Computational Engineering Research, Comprehensive Standards References (NEC/IEEE/ASHRAE), In-Depth Technical Guides, and Calculator-Backed Research.
* **Substance Standard:** Core assets must be substantial, original, useful, and technically defensible.
* **Planning Target vs. Mandatory Quota:** A target of 3–5 Core opportunities per week serves as a planning benchmark, **NOT** a mandatory production quota. If evidence justifies 5, produce 5; if evidence justifies 2, produce 2; if no genuine gap exists, do not manufacture filler content.

### Core → Layer 1 Content Architecture
When a Core asset is created, map and produce supporting Layer 1 search intents:

```text
┌─────────────────────────────────────────────────────────────┐
│                         CORE ASSET                          │
│  Technical Engineering Reference / Dataset / Whitepaper     │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Bidirectional Topic Links)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 1 INTENT PAGES                     │
│        Narrow, Highly Specific Target Search Queries        │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Interactive Embeds & Links)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               CALCULATORS / TOOLS / DATASETS                │
│    Deterministic Interactive Engines & Structured Tables    │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Graph Equity Mesh)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   INTERNAL LINK GRAPH                       │
│    Crawlable, Contextual Navigation Across All Topic Hubs   │
└─────────────────────────────────────────────────────────────┘
```

Layer 1 pages exist exclusively because they satisfy distinct, identifiable search intents, never to fulfill an arbitrary article count.

### Continuous Research Radar (Days 2–7)
Research is not confined to Day 1. The **Continuous Research Radar** runs actively during Days 2–7. While implementing page upgrades or Core publications, continuously log new GSC query families, SERP gaps, lab datasets, and engineering questions directly into the backlog for prioritization.

### External Technical Distribution (Dev.to / Hashnode)
* Dev.to and Hashnode function as **technical distribution and research interpretation channels**.
* They do not substitute for on-site PowerLab assets.
* Acceptable formats: Implementation walkthroughs, engineering methodology explanations, dataset creation mechanics, and research findings.
* The authoritative, canonical Core asset remains permanently on PowerLab.

---

## 13. OBJECTIVE GOVERNANCE & SIZING DISCIPLINE

### Objective Governance Standards
* **Core Invariant:** `ONE ACTIVE OBJECTIVE = ONE COHERENT SEO OUTCOME`.
* **Execution Containers:**
  - **Objective:** The fundamental unit of SEO work.
  - **Session / Day:** The execution container (multiple independent objectives may execute in the same session post-approval).
  - **Week:** The dynamic planning, execution, validation, and measurement window.
* **Objective Sizing Scope:** Small objectives execute immediately; large cluster upgrades or Core publications may span multiple days. No artificial one-objective-per-week constraint.

### Objective Priority Hierarchy
1. **Existing page with clear GSC opportunity** (strike-distance queries, high-impression/low-CTR pages)
2. **Existing cluster with multiple related opportunities** (multi-page topical mesh)
3. **Evidence-backed technical issue** (proven crawl, indexation, schema, canonical, or performance flaws)
4. **Genuine search/content gap** (identifiable search demand unsatisfied by existing URLs)
5. **Core Publication** (major new search asset / reference dataset / whitepaper)
6. **Layer 1 supporting publication** (narrow supporting intent page)

*(Note: This is an evidence-weighted hierarchy, not an inflexible queue. A high-value Core dataset supported by strong external and SERP evidence may take precedence over a minor existing-page tweak).*

---

## 14. NORTH STAR & CONTENT QUALITY STANDARDS

### The North Star Decision Criterion
Every proposed objective must answer:
> **"What evidence shows that this change can improve Google's understanding, coverage, relevance, discoverability, or usefulness of the site's search assets?"**

$$\text{EVALUATE EVIDENCE} \longrightarrow \text{EXECUTE} \longrightarrow \text{VALIDATE} \longrightarrow \text{LOG} \longrightarrow \text{MEASURE} \longrightarrow \text{RE-DIAGNOSE}$$

### Content Quality Rules (Anti-Volume Mandate)
* The goal is the **continuous creation of valuable, differentiated, technically useful search assets** — not volume-based publishing.
* Strictly prohibited:
  - Keyword-volume quotas or arbitrary word-count targets
  - Thin supporting pages lacking calculation engines, empirical data, or engineering derivations
  - Duplicate or near-duplicate syndications
  - Content manufactured merely because an arbitrary calendar schedule suggests publishing


