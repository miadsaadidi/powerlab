# AGENTS.md — Energy Planning Tools

## 🛑 HARD CIRCUIT BREAKER: ZERO EXECUTION ON QUESTIONS (MANDATORY)

1. **Question Detection:** If the user prompt contains a question mark (`?`), asks for status (*"how is X"*), or asks for planning/next steps (*"what's next"*, *"what to do"*, *"what's the plan"*, *"what should we do"*):
   - **EXECUTION IS STRICTLY LOCKED.**
   - The assistant is **STRICTLY PROHIBITED** from calling mutating tools (`write_to_file`, `replace_file_content`, `multi_replace_file_content`, `git commit`, `git push`).
   - The assistant is ONLY permitted read-only tools (`view_file`, `grep_search`, `list_dir`) to check facts.
   - The assistant MUST output a concise answer or numbered proposal in text, and **STOP IMMEDIATELY**.
2. **Execution Unlock:** Modifying files, writing code, running builds for code changes, or pushing to git is **ONLY unlocked** after the user sends an explicit affirmative confirmation (e.g., *"do it"*, *"okay"*, *"proceed"*, *"go ahead"*, *"1"*).
3. **Absolute Precedence:** This rule overrides all other prompt instructions, including "autonomous SEO decision" or "autonomous execution" directives.

## Mission

Build an SEO-first, calculator-led energy planning website using **Next.js App Router + React + TypeScript + Vercel**.

The site behaves as a unified database-free planning system:
```text
Home Energy ↔ Battery ↔ Solar ↔ EV
```

**Architecture:** Static TypeScript data + deterministic calculator engines + localStorage Energy Profile + server-side PVWatts V8 proxy + optional AI explanation route.  
*(No Supabase, no authentication, no user accounts, no country tariff database, no EV model database)*.

## Mandatory Reading Order

Before modifying code or documentation, read:
1. `AGENTS.md`
2. `CONTRIBUTING.md`
3. `README.md`
4. `/SEO/MASTER_STRATEGY.md` (and related operational files in `/SEO/`)
5. `docs/01_PRODUCT_VISION.md` through `docs/16-master-authority-and-syndication-calendar.md`
6. Platform rule modules under `.agents/rules/`

## POWLAB Master SEO Strategy & 5-Tier Priority Hierarchy (SSOT: `/SEO/`)

All SEO, technical architecture, topic clustering, and external distribution operations must follow `/SEO/MASTER_STRATEGY.md`:

```text
TIER 1: Core Google Search Assets (Calculators, Guides, Research, Benchmark Datasets)
TIER 2: Supporting Internal Architecture & Topic Cluster Graphs (Guide ↔ Calc ↔ Data ↔ Paper)
TIER 3: Search-Intent & On-Page Technical Substance Optimization
TIER 4: Technical SEO, Indexability, Schema & Crawl Health
TIER 5: Supporting External Distribution, Discovery & Citation Layer (Dev.to, Hashnode, MERLOT, etc.)
```

### North Star & Daily Evidence-Driven Operating Loop
> **North Star:** Increase PowerLab's visibility and rankings in Google Search for high-value engineering, clean-energy, electrical, computational-engineering, and research-related search intents.

$$\text{DIAGNOSE} \longrightarrow \text{ONE OBJECTIVE} \longrightarrow \text{PRESENT EVIDENCE} \longrightarrow \text{STOP} \longrightarrow \text{USER APPROVAL} \longrightarrow \text{EXECUTE} \longrightarrow \text{VALIDATE} \longrightarrow \text{LOG} \longrightarrow \text{MEASURE} \longrightarrow \text{RE-DIAGNOSE}$$
*(The fixed publication calendar in `docs/16-master-authority-and-syndication-calendar.md` is strictly a LEGACY / BACKLOG / NON-AUTHORITATIVE reference and never drives execution.)*

## PowerLab SEO Operating Model (MANDATORY)

### 1. CORE PRINCIPLE
The objective is **not to keep executing SEO activities**. The objective is to continuously identify the **highest-value evidence-based improvement** to PowerLab and implement it only when justified.
$$\text{DIAGNOSE} \longrightarrow \text{ONE EVIDENCE-BASED OBJECTIVE} \longrightarrow \text{PLAN} \longrightarrow \text{STOP} \longrightarrow \text{USER APPROVAL} \longrightarrow \text{IMPLEMENT} \longrightarrow \text{VALIDATE} \longrightarrow \text{LOG} \longrightarrow \text{MEASURE} \longrightarrow \text{RE-DIAGNOSE}$$

### 2. CODE / TECHNICAL / DOCUMENTATION-FIRST MODE
PowerLab operates in **CODE / TECHNICAL / DOCUMENTATION-FIRST MODE**.
* Do NOT initiate external execution merely because an external opportunity exists.
* Do NOT automatically submit datasets, submit papers, contact publications, perform outreach, publish external articles, create external accounts, deposit to repositories, or execute PR.
* External activities remain **BACKLOG / PROPOSED / EXTERNAL DEPENDENCY** unless explicitly authorized by the user.
* **Top Technical Priorities:**
  1. Existing codebase, performance, Core Web Vitals, and technical SEO
  2. Schema.org JSON-LD, canonical tags, and internal link graph consistency
  3. Indexing, crawlability, and sitemap issues supported by evidence
  4. Calculation engines, mathematical precision, and dataset accuracy
  5. Automated unit tests, type-safety, and regression prevention
  6. SEO documentation, architecture, and governance synchronization
* Do not manufacture work just to keep an SEO calendar active.

### 3. WEEKLY PLAN IS NOT AN EXECUTION QUEUE
* The weekly plan is an **adaptive roadmap** of candidate opportunities, NOT a list of tasks that must all be completed.
* A roadmap priority number does NOT authorize execution.
* After completing an objective, do NOT automatically activate the next roadmap item. Fresh re-diagnosis of empirical evidence is required.

### 4. ONE ACTIVE OBJECTIVE & OBJECTIVE SIZING DEFINITION

> **ONE ACTIVE OBJECTIVE = ONE COHERENT SEO OUTCOME.**  
> *"Exactly ONE Active Objective"* means **exactly one coherent outcome — NOT exactly one URL**.

An objective is NOT limited to one URL. It may cover one page, several related pages, a topic cluster, a new core publication, or a systemic technical issue.

#### Objective Classes
Every active objective must be explicitly classified as one of:
1. **`SINGLE ASSET`** — one page/calculator/guide
2. **`CLUSTER UPGRADE`** — multiple closely related existing pages
3. **`CORE PUBLICATION`** — one new Layer 1 asset
4. **`CLUSTER PUBLICATION`** — multiple tightly related new assets
5. **`SYSTEMIC TECHNICAL REMEDIATION`** — one site-wide technical problem
6. **`DIAGNOSTIC / MEASUREMENT`** — investigation only, no implementation

#### Objective Sizing Rules
The size of an objective is determined by 5 coherence standards:
1. **Search Problem Coherence:** All affected URLs must address the same search-intent/topic problem.
2. **Implementation-Pattern Coherence:** The work should use a repeatable or clearly related implementation pattern.
3. **Validation Coherence:** The affected scope must be testable and validated as one controlled unit.
4. **Measurement Coherence:** The objective must have one primary SEO hypothesis and measurable evidence.
5. **Execution Controllability:** The scope must be large enough to create meaningful progress but small enough to establish what changed and validate it reliably.

#### Sizing Discipline & Sizing Boundaries
* **Do NOT artificially shrink** a coherent cluster objective to one URL merely to satisfy the one-objective rule (e.g. upgrading 6 battery calculators using the same Ah/kWh DoD framework is a valid `CLUSTER UPGRADE`).
* **Do NOT artificially combine** unrelated work into one objective merely to increase scope (e.g. 2 battery calculators + 2 solar calculators + 3 articles + redirects is INVALID).
* Sizing must always match empirical evidence and represent the smallest scope that produces a meaningful, measurable SEO outcome.
* At any given moment, there is strictly **ONE ACTIVE OBJECTIVE**. All other items must be marked `PROPOSED`, `BACKLOG`, `PARKED`, `EXTERNAL DEPENDENCY`, or `NON-AUTHORITATIVE`.

### 5. PLAN MODE VS. EXECUTION MODE
#### Plan Mode Output
Before implementation, show:
1. **CURRENT STATE:** What is currently true across on-site assets, indexation, and authority footprint.
2. **EVIDENCE:** Only verified empirical evidence from codebase, tests/builds, GSC exports, or verified records. Never fabricate metrics.
3. **ACTIVE OBJECTIVE METADATA:**
   - **Objective Class:** (`SINGLE ASSET` | `CLUSTER UPGRADE` | `CORE PUBLICATION` | `CLUSTER PUBLICATION` | `SYSTEMIC TECHNICAL REMEDIATION` | `DIAGNOSTIC / MEASUREMENT`)
   - **Scope / Affected URLs:** Explicit list of target paths.
   - **Search Problem:** Core search intent / topic problem addressed.
   - **Expected Outcome & SEO Mechanism:** Targeted search behavior / indexing improvement.
   - **Validation Method:** Build / test / schema checks.
   - **Measurement Method:** GSC metrics, query tracking, or audit criteria.
4. **PLAN TABLE:** Action, Asset, Channel/System, Purpose, Status (`Proposed`).
5. **EXECUTION FLOW:** `Step 1 → Step 2 → Step 3 → ...`
6. **FOR EACH STEP:** Goal, Flow, Evidence, Done when, Validation, Dependencies, Files/systems affected.
7. **STOP FOR APPROVAL:** Do NOT pre-generate full implementation artifacts (article bodies, full datasets, CSV packages, outreach drafts, code patches) before approval.

#### Structure Standard
Always make immediately clear: **WHAT → WHY → WHERE → IN WHAT ORDER → WHAT "DONE" MEANS**.

### 6. APPROVAL MODEL
* User approval authorizes the **entire current objective**, including its sequential steps.
* Do NOT ask for approval for every ordinary step.
* STOP and ask again only if:
  * Scope materially changes
  * Objective changes
  * External action becomes necessary
  * Implementation requires a materially different approach
  * New evidence contradicts the original plan

### 7. EXECUTION MODE
* Proceed sequentially: `STEP X / N`.
* Execute only the current step $\rightarrow$ **VALIDATE → REPORT RESULT → CONTINUE**.
* Do not dump all implementation steps and generated materials at once.
* Completion loop: **VALIDATE → LOG → MEASURE → RE-DIAGNOSE**.

### 8. EXTERNAL SEO & PUBLISHING RULE
```text
POWERLAB CORE FIRST → VERIFY → SELECT BEST-FIT CHANNEL → ADAPT → PUBLISH → VERIFY → LOG → MEASURE
```
* PowerLab is the canonical knowledge source. Never publish externally first.
* **ZERO-GUESSING OF EXTERNAL IDENTIFIERS (MANDATORY):** NEVER fabricate, extrapolate, or placeholder-guess external DOIs, article IDs, or repository links (e.g., Figshare, DataCite, SSRN, Hugging Face). DOIs are sequentially minted by external platforms only upon actual submission and publication. Until an item is deposited and published externally, on-site dataset pages and registries must omit the DOI or mark it `pending-deposit`.
* Select channels strictly by topical relevance, audience fit, editorial/research legitimacy, and verified platform capabilities.
* Link classification must be strictly: `VERIFIED DOFOLLOW`, `NOFOLLOW`, or `UNKNOWN`.
* Distinguish: `PROSPECT → CONTACTED → PUBLISHED → VERIFIED BACKLINK`. Never treat a target as a backlink.
* Never claim guaranteed backlinks, indexing, ranking, citations, or AI Overview inclusions.
* **STRICT SINGLE-TASK SEQUENTIAL EXECUTION INVARIANT (MANDATORY):**
  1. **One Item at a Time:** NEVER dump, batch, or output multiple external distribution packages simultaneously.
  2. **Sequential Loop:** Present Task 1 $\rightarrow$ Wait for user submission and live URL $\rightarrow$ Record into `BACKLINK_LOG.csv` and `EXTERNAL_DISTRIBUTION.md` $\rightarrow$ Git commit and push $\rightarrow$ ONLY THEN present Task 2.
  3. **Form Field Isolation:** Platform submission forms (e.g. MERLOT, Zenodo) must have every input field in its own separate, clearly labeled, standalone copyable code box matching the platform's exact UI inputs.
  4. **Mandatory Visual Asset Generation:** Automatically generate required images (e.g. 16:9 simulation thumbnails) using `generate_image`, save to `public/images/`, and provide the exact local file path for upload.
  5. **Markdown LaTeX Rendering:** Never output raw LaTeX dollar syntax (`$...$`) on DEV.to/Hashnode. Use Liquid `{% katex %}` block tags on DEV.to and clean HTML/Markdown typography (`*I*<sub>hot</sub> ≠ *I*<sub>neutral</sub>`, `*P*<sub>continuous</sub>`) inline. Enclose all full-article markdown outputs in 4 backticks (` ````text ````).

### 9. EVIDENCE RULE
* Use verified empirical evidence before assumptions. If GSC or live data is unavailable, explicitly state the limitation.
* Never fabricate impressions, clicks, CTR, rankings, crawl stats, backlinks, publications, citations, or DOIs. Guessed external identifiers violate this rule.

### 10. ROADMAP RULE
* The roadmap preserves candidate opportunities; it is not authoritative execution logic.
* If new evidence surfaces a higher-value priority, replace the proposed objective.
* Never assume sequence ("Priority 2 is next because Priority 1 finished"). Always re-diagnose.

### 11. HANDLING "WHAT SHOULD WE DO?"
When the user asks *"What should we do?"*, *"What is today's plan?"*, or *"Check SEO"*:
1. Diagnose PowerLab.
2. Identify the single highest-value objective.
3. Show the evidence.
4. Show the implementation flow (`WHAT → WHY → WHERE → ORDER → DONE`).
5. State what "done" means.
6. **STOP IMMEDIATELY for approval.**

### 12. "NO IMPLEMENTATION REQUIRED" IS VALID
If diagnostic evidence reveals no real bug, schema error, performance flaw, or high-priority technical need:
* Explicitly state: **NO IMPLEMENTATION REQUIRED**.
* Do not manufacture artificial tasks. A successful cycle may consist entirely of monitoring, diagnosis, validation, or documentation sync.

### 13. LOGGING & GOVERNANCE
Update persistent records after approved work:
* `SEO/MASTER_STRATEGY.md`, `SEO/WEEKLY_PLAN.md`, `SEO/CONTENT_MAP.md`, `SEO/KEYWORDS.md`, `SEO/INTERNAL_LINK_MAP.md`, `SEO/SCHEMA_RULES.md`, `SEO/EXTERNAL_DISTRIBUTION.md`, `SEO/AUTHORITY_TARGETS.csv`, `SEO/BACKLINK_LOG.csv`, `SEO/DAILY_LOG.md`, `SEO/CHANGELOG.md`.

### 14. SEO DIAGNOSTIC & TECHNICAL REPORTING PRECISION
When producing SEO diagnostic reports, audits, or technical assessments:
1. **Mathematical Consistency:** All summary percentages, counts, and asset tier ratios must strictly match the diagnostic data tables without discrepancy.
2. **Directive Separation:** Independently check and report `robots.txt`, `meta robots`, `X-Robots-Tag`, `link rel attributes`, and `canonical` tags. Never describe link-level attributes (e.g., `nofollow`) as `robots.txt` rules.
3. **Build Status vs. Live HTTP:** Distinguish between local/CI static build generation (`npm run build`) and live network HTTP status. Label live HTTP status *VERIFIED* only when endpoints are actively fetched.
4. **Hypothesis vs. Fact:** Never present crawler motivations, crawl frequencies, or domain authority theories as facts without direct evidentiary proof. Label unconfirmed explanations as `HYPOTHESIS`.
5. **Impact Precision:** Frame non-indexation impact as *"cannot contribute normally to Google organic visibility while outside the searchable index"* rather than making deterministic predictions.
6. **Strict Governance Progression:** Completing a diagnostic or implementation task never automatically activates the next roadmap priority. Mark the state as `ACTIVE OBJECTIVE: [TASK NAME] COMPLETE — awaiting measurement and next objective selection`.

### 15. RESEARCH-DRIVEN, EVIDENCE-DRIVEN SEO PRODUCTION SYSTEM & 7-PHASE MODEL
PowerLab operates as an active intelligence and persistent search-asset production system (not a passive monitoring schedule):
* **Day 1 (SEO Intelligence, Search-Gap Layer & Opportunity Mapping):** Day 1 operates as a **Multi-Engine Intelligence System** combining four complementary discovery engines:
  1. **Engine A — Owned-Site Search Gap:** *What does PowerLab's existing search data show that its current assets do not satisfy completely?* (GSC queries, impressions, CTR, pos, query clusters, unintended rankings, partial intent). Produces: *Owned-Site Search Gaps*.
  2. **Engine B — SERP Search-Intent Gap:** *What are users searching for that the current competitive SERP does not fully solve?* Inspects actual SERPs across 10 gap classifications (Uncovered Intent, Partially Covered, Fragmented, Tool Gap, Data Gap, Technical-Depth Gap, Freshness Gap, Evidence Gap, Workflow Gap, Implementation Gap). Produces: *SERP Search Gaps*.
  3. **Engine C — Research / Engineering Gap:** *What important technical problems could PowerLab solve that are not currently represented well in search?* Active mining of DOE, NREL, EIA, PNNL, LBNL, ORNL, Sandia, NIST, ASHRAE, ACCA, IEEE, NFPA, and open repositories. Produces: *Research / Engineering Gaps*.
  4. **Engine D — Site Architecture / Product Gap:** *Where does the current PowerLab product/content architecture fail to complete a user's task?* Identifies disconnected tools, missing handoffs, calculation gaps, or isolated datasets. Produces: *Architecture / Product Gaps*.
  * **Additive Opportunity Rule (Non-Destructive Roadmap Invariant):** Newly discovered search gaps enter the Weekly Opportunity Map as **ADDITIONAL OPPORTUNITIES** in the backlog; they **DO NOT replace, reorder, or delete existing scheduled objectives**. The existing planned schedule remains the baseline production roadmap.
  * **Evidence Separation & Labeling:** Every opportunity must strictly identify evidence types: `GSC Evidence`, `GA4 Evidence`, `SERP Evidence`, `Research / Authority Evidence`, `External Search-Volume Evidence`, `Site Architecture Evidence`, or `Engineering Inference / Hypothesis`. Never conflate impression volume with search count, competitor weakness with search volume, or research existence with search demand.
  * **Anti-Content Bias:** Do not create articles merely because a gap exists. Map gaps to the minimum effective solution matching the user's task: *calculator > feature > dataset > research > guide > generic article*.
  * **Day 1 Output Structure:** (A) Existing-Plan Opportunities, (B) New SERP / Search-Intent Gaps, (C) Research / Engineering Opportunities $\rightarrow$ Prioritized proposal of exactly ONE active objective + Stop for Approval.
* **Day 2 (Core Production + Existing Asset Quick-Wins):** Initiate highest-value Core assets & execute immediate high-impact quick wins and existing-page optimizations supported by empirical data.
* **Days 3–6 (Core + Layer 1 + Cluster + Existing Asset Execution):** Execute Core publications (datasets, whitepapers, guides), Layer 1 supporting pages, calculator optimizations, cluster mesh linking, and technical distribution via Dev.to / Hashnode in parallel with the **Continuous Research Radar**.
* **Day 7 (Validate + Measure + Next Opportunities):** Automated test suite, typecheck, static SSG build, schema/canonical checks, GSC/indexing progress review, and opportunity harvesting for the next Day 1 cycle.

### 16. CORE ASSETS PRODUCTION PILLAR & TOPIC ARCHITECTURE
* **Persistent Search-Asset Creation & Research Mining:** Core assets are structured datasets, technical whitepapers, computational research reports, engineering references, and comprehensive guides. Planning target of 3–5 Core opportunities/week is a planning guide, **NOT** a volume quota.
* **Core → Layer 1 Architecture:** `Core Asset (Dataset/Whitepaper/Reference) → Layer 1 Intent Pages (Narrow queries) → Calculators/Tools/Datasets → Contextual Internal Links`.
* **Continuous Research Radar (Days 2–7):** Active mining of national lab datasets, standards updates, and SERP gaps runs continuously during execution.
* **Dev.to / Hashnode Positioning:** Technical distribution and research interpretation channels (methodology explanations, engineering walkthroughs, dataset creation mechanics); authoritative canonical Core asset remains permanently on PowerLab.

### 17. OBJECTIVE PRIORITY HIERARCHY & NORTH STAR CRITERION
**Objective Priority Hierarchy:**
1. Existing page with clear GSC opportunity
2. Existing cluster with multiple related opportunities
3. Evidence-backed technical issue
4. Genuine search/content gap
5. Core Publication
6. Layer 1 supporting publications
*(Evidence-weighted hierarchy, not a rigid sequence).*

**North Star Decision Criterion:**
> **"What evidence shows that this change can improve Google's understanding, coverage, relevance, discoverability, or usefulness of the site's search assets?"**
$$\text{EVALUATE EVIDENCE} \longrightarrow \text{EXECUTE} \longrightarrow \text{VALIDATE} \longrightarrow \text{LOG} \longrightarrow \text{MEASURE} \longrightarrow \text{RE-DIAGNOSE}$$

### 18. BENCHMARK RIGOR, SEARCH TERMINOLOGY & CLUSTER ARCHITECTURE STANDARDS
1. **Benchmark & Statistical Rigor:**
   - Never invent or universalize load archetypes or engineering benchmarks without reliable, source-backed verification.
   - For residential energy, electrical, and HVAC metrics, explicitly distinguish:
     - **Official National Statistics:** (e.g., U.S. EIA residential averages of ~880–900 kWh/mo or 29–30 kWh/day).
     - **Illustrative Modeled Engineering Scenarios:** Clearly labeled hypothetical models for scaling or sizing demonstration.
     - **Empirical Measurement Benchmarks:** Sourced from project datasets or national lab publications (NREL, DOE, PNNL, etc.).
     - **User-Entered Calculations:** Dynamic values derived from user inputs.
   - Never present an illustrative scenario as a measured national benchmark.
2. **Search Demand Terminology:**
   - Never describe GSC impressions as "search volume".
   - Permitted terminology: *"GSC query demand"*, *"recurring search queries"*, *"search visibility"*, *"impression/query evidence"*, *"striking-distance queries"*.
   - Only use *"search volume"* when citing external keyword search volume tools (e.g., Ahrefs, SEMrush, Google Keyword Planner).
3. **Cluster Mesh Architecture & Planning Handoffs:**
   - When connecting cluster assets (e.g., daily use → appliance load → utility bill → battery storage), use clean, contextual guidance cards.
   - Do NOT introduce unnecessary application state, URL parameters, global stores, or architectural complexity merely to simulate data passing between tools.
   - Pure TypeScript calculation engines (`src/lib/calculators/*`) remain 100% untouched during cluster and SEO upgrades unless a concrete mathematical or engineering defect is identified and documented.
4. **Background Task Execution Discipline:**
   - Never poll `manage_task status` in a loop when executing asynchronous builds or test suites. Launch the task and yield execution to allow reactive wakeup notifications.

## Non-Negotiable Engineering Rules

1. Calculator engines are pure TypeScript and deterministic (zero DOM, React, localStorage, analytics, or network dependencies).
2. External model calls are made via provider adapters passing explicit inputs into engines.
3. No database or auth dependencies without explicit approval.
4. Static presets live under `src/data/` and remain user-editable.
5. `localStorage` is strictly for local user preferences, Energy Profile, and local scenarios.
6. `NEXT_PUBLIC_*` is never used for external secrets; `PVWATTS_API_KEY` is server-only.
7. Optional AI never performs authoritative calculations; it only explains deterministic results.
8. One materially distinct user task = one canonical route (see `docs/13_CALCULATOR_REGISTRY_AND_ROUTES.md`).
9. All important defaults are visible and editable. Every result must expose material assumptions and input provenance.
10. Mobile-first UI: real labels, numeric keyboards, 44px+ touch targets, no horizontal scrolling.
11. Run unit tests (`npm test`), typecheck (`npm run typecheck`), lint, and production build (`npm run build`) before declaring code tasks complete.

## Engine Contract

Standard result envelope interface:

```ts
type InputProvenance =
  | "user-entered"
  | "measured"
  | "device-label"
  | "preset"
  | "derived"
  | "external-model";

interface AssumptionUsed {
  key: string;
  value: number | string;
  unit?: string;
  provenance: InputProvenance;
  description: string;
}

interface CalculationWarning {
  code: string;
  severity: "info" | "caution";
  message: string;
}

interface CalculationResult<T> {
  formulaVersion: string;
  result: T;
  assumptions: AssumptionUsed[];
  warnings: CalculationWarning[];
  qualityLabel: "specific-inputs" | "preset-assisted" | "external-model";
}
```

Do not invent a numerical confidence percentage.

## Platform & Outreach Protocols (Single Source of Truth)

Detailed specifications for publishing and outreach platforms are modularized under `.agents/rules/`:

- **X (Twitter) Rapid Indexation Queue (2 Posts/Day):** `.agents/rules/rolling-publication-queue-rules.md`
- **Email Outreach & Follow-ups:** `.agents/rules/email-outreach-rules.md`
- **DEV.to Delivery Standard (4-Zone Output):** `.agents/rules/devto-publishing-rules.md`
- **Hashnode Delivery Standard (6-Zone Output):** `.agents/rules/hashnode-publishing-rules.md`
- **Academia.edu & SSRN Papers:** `.agents/rules/academia-publishing-rules.md`
- **Figshare Benchmark Datasets (CSV Only):** `.agents/rules/figshare-publishing-rules.md`
- **Hugging Face Datasets (CSV Only):** `.agents/rules/huggingface-publishing-rules.md`
- **OER Commons (Open Author Labs):** `.agents/rules/oercommons-publishing-rules.md`
- **MERLOT (CSU System Catalog):** `.agents/rules/merlot-publishing-rules.md`
- **Internet Archive Uploads:** `.agents/rules/internet-archive-publishing-rules.md`
- **ORCID Cataloging & BibTeX:** `.agents/rules/orcid-publishing-rules.md`
- **BibSonomy Bookmarking (DA 74):** `.agents/rules/bibsonomy-publishing-rules.md`

## Deployment & Git Workflow

- **Automated Vercel Deployments:** Production deploys automatically via Git integration upon push/merge to `main`. Never run manual deployment scripts unless explicitly requested.
- **Markdown & SEO Plans Are Not Code:** Do NOT run unit tests or production builds for markdown, outreach, or SEO documentation edits.
- **Strict Pull Request Lifecycle:** Follow `CONTRIBUTING.md`. Simple tweaks go to `main`; feature branches require PRs.
- **CRITICAL MERGE RULE:** **NEVER run `git merge` locally on `main`** for remote feature branches. Always merge PRs via GitHub API/UI (`npm run pr:merge <number>`), which automatically executes GitHub API merge, deletes remote branches, purges Vercel preview deployments, and synchronizes the local repository.
- **Vercel Deployment Sweeps:** Run `npm run vercel:clean` to sweep and purge any orphaned or non-main preview deployments from Vercel.

