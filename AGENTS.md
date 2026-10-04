# AGENTS.md — Energy Planning Tools (PowerLab)

## 🛑 HARD CIRCUIT BREAKER: ZERO EXECUTION ON QUESTIONS (MANDATORY)

1. **Question Detection:** If user prompt contains `?`, asks for status (*"how is X"*), or asks for planning/next steps (*"what's next"*, *"what to do"*, *"what's the plan"*, *"what should we do"*):
   - **EXECUTION IS STRICTLY LOCKED.**
   - **STRICTLY PROHIBITED** from calling mutating tools (`write_to_file`, `replace_file_content`, `multi_replace_file_content`, `git commit`, `git push`).
   - ONLY permitted read-only tools (`view_file`, `grep_search`, `list_dir`).
   - Assistant MUST output a concise answer or numbered proposal in text, and **STOP IMMEDIATELY**.
2. **Execution Unlock:** Mutating files, writing code, running builds for code changes, or pushing to git is **ONLY unlocked** after explicit affirmative user confirmation (e.g., *"do it"*, *"proceed"*, *"go ahead"*, *"1"*).
3. **Absolute Precedence:** Overrides all other prompt instructions, including autonomous execution directives.

---

## 1. System Architecture & Core Stack

- **Stack:** Next.js App Router + React + TypeScript + Vanilla CSS / TailwindCSS + Vercel.
- **Topology:** Deterministic client-side TypeScript calculation engines + static data (`src/data/`) + localStorage Energy Profile + server-side PVWatts V8 proxy route.
- **Strict Invariant:** Zero database (no Supabase/Prisma), zero user auth/accounts, zero server state.
- **Calculators Contract:** Pure TypeScript functions under `src/lib/calculators/` with zero DOM, network, or framework dependencies.

```ts
type InputProvenance = "user-entered" | "measured" | "device-label" | "preset" | "derived" | "external-model";

interface CalculationResult<T> {
  formulaVersion: string;
  result: T; // Data payload is strictly on .result (NOT .data)
  assumptions: AssumptionUsed[];
  warnings: CalculationWarning[];
  qualityLabel: "specific-inputs" | "preset-assisted" | "external-model";
}
```

---

## 2. Master SEO Hierarchy & Operating Model (SSOT: `/SEO/`)

```text
TIER 1: Core Search Assets (Calculators, Guides, Research Reports, Benchmark Datasets)
TIER 2: Topic Cluster Graphs & Bidirectional Mesh Linking
TIER 3: Search-Intent Substance, Formulas & Benchmark Data Tables
TIER 4: Technical SEO, Schema.org JSON-LD, Sitemap & Indexability Health
TIER 5: External Distribution & Research Citations (MERLOT, DEV.to, Hashnode, BibSonomy, Figshare)
```

### Daily Evidence-Driven Loop
$$\text{DIAGNOSE} \longrightarrow \text{ONE OBJECTIVE} \longrightarrow \text{STOP FOR APPROVAL} \longrightarrow \text{EXECUTE} \longrightarrow \text{VALIDATE} \longrightarrow \text{LOG} \longrightarrow \text{MEASURE}$$

### Operating Invariants
1. **Code & Documentation First:** Technical health, mathematical rigor, schema, and on-site substance always precede external distribution.
2. **Exactly ONE Active Objective:** Focus on one coherent SEO outcome (single asset, cluster upgrade, or systemic technical remediation). Sizing must match empirical evidence.
3. **Weekly Plan is Adaptive:** Roadmap items are candidate opportunities, not a rigid completion queue. Always re-diagnose with fresh evidence.
4. **Plan Mode vs Execution Mode:** In plan mode, present `WHAT → WHY → WHERE → IN WHAT ORDER → WHAT "DONE" MEANS` and **STOP for approval**.

---

## 3. External Publishing & Distribution Protocols (MANDATORY)

```text
POWERLAB CORE FIRST → VERIFY → SELECT BEST-FIT CHANNEL → ADAPT → PUBLISH → VERIFY → LOG → MEASURE
```

### Strict Sequential Execution Invariants
1. **Single-Task Output:** Never dump, batch, or output multiple external distribution packages simultaneously.
2. **Live Production URL Invariant:** External distribution MUST strictly target live canonical URLs from merged PRs already deployed to `main`.
3. **Zero-Guessing of DOIs/IDs:** NEVER fabricate external DOIs, article IDs, or repository URLs. Mark as `pending-deposit` until minted by the platform.
4. **Immediate Governance Logging & Git Push:** The moment a live URL or material ID is provided by the user, immediately append to `SEO/EXTERNAL_DISTRIBUTION.md` and `SEO/BACKLINK_LOG.csv`, commit, and push before proceeding.
5. **Mandatory Visual Asset Generation:** Automatically generate required 16:9 images via `generate_image`, copy to `public/images/`, and output the exact local file path.
6. **Zero Raw LaTeX Math:** Never output raw LaTeX dollar syntax (`$...$`). Use Liquid `{% katex %}` on DEV.to, plain text ASCII/Unicode operators on Hashnode, and clean HTML/Markdown typography (`*I*<sub>hot</sub>`, `*P*<sub>continuous</sub>`, `*I*<sup>2</sup>*R*`).

### Platform-Specific Output Sequences (Exact UI Order)

#### A. DEV.to Sequence
1. **Title:** Exact title in standalone code block.
2. **Tags:** Comma-separated list (up to 4 tags) in standalone code block.
3. **Image Prompt:** Prompt text + local file path in `public/images/`.
4. **Body:** Full article in ONE block wrapped in 4 backticks (` ````markdown ````), zero frontmatter inside body block, with in-body PowerLab links.
5. **Canonical URL:** Target canonical URL in standalone code block.

#### B. Hashnode Sequence
1. **Title:** Exact title in standalone code block.
2. **Subtitle:** 1–2 sentence summary in standalone code block.
3. **Image:** Exact local file path to the 16:9 image in `public/images/`.
4. **Body:** Full article in ONE block wrapped in 4 backticks (` ````markdown ````) with plain-text math and in-body links.
5. **Slug:** Hyphenated URL slug in standalone code block.
6. **Tags:** Standalone code blocks for each topic tag (up to 5).
7. **SEO:** Standalone blocks for Meta Title ($\le 60$ chars) and Meta Description ($\le 150$ chars).
8. **Canonical URL:** Target canonical URL in standalone code block.

#### C. MERLOT Sequence
1. **URL & Title:** Standalone code blocks.
2. **Description & Material Types:** Standalone code blocks.
3. **Keywords:** Maximum 5 high-relevance keywords, each in its own separate standalone code block.
4. **Author, License & Technical Requirements:** Standalone code blocks.
5. **Thumbnail Path:** Local file path in `public/images/`.
*(Note: If MERLOT shows "Duplicate Materials Found" warning, bypass by selecting "Submit Material Anyway" / "Continue".)*

---

## 4. Evidence Rigor & Language Standards

1. **Strict Prohibition of Unverified Absolutes:**
   Unless backed by documented repository benchmarks, NEVER use absolute claims:
   - ❌ `"verified"` / `"expert verified"` / `"NREL verified"`
   - ❌ `"100% accurate"` / `"100% client-side"` / `"100% compliant"`
   - ❌ `"zero tracking"` / `"zero cloud dependencies"`
   - ❌ `"NEC compliant"` / `"code compliant"` (as a universal certification)
   - ❌ `"exact breaker size"` / `"authoritative calculation"`
2. **Mandatory Qualified Engineering Framing:**
   - Use: *"Calculator engines execute locally in the browser."*
   - Use: *"Relevant circuit-sizing tools reference applicable NEC provisions and IEEE guidance."*
   - Use: *"Given the same inputs, engines produce reproducible results."*
   - Cite voltage drop as: *"NEC 210.19(A) Informational Note 4 guidance."*
3. **Benchmark vs Modeled Scenarios:**
   - Explicitly distinguish between official national statistics (e.g. EIA ~900 kWh/mo), empirical laboratory datasets (e.g. NREL/DOE), user inputs, and illustrative modeled scenarios.
4. **Search Demand Terminology:**
   - Never describe GSC impressions as "search volume". Use *"GSC query demand"*, *"impressions"*, or *"striking-distance queries"*.

---

## 5. TypeScript Contract & Code Quality Invariants

1. **Zero Typecheck Errors:** Always run `npm run typecheck` (`tsc --noEmit`) after modifying `.ts`/`.tsx` files.
2. **InputProvenance SSOT:** Strictly `"user-entered" | "measured" | "device-label" | "preset" | "derived" | "external-model"`.
3. **Calculation Payload:** Always access calculation output via `result.result`, never `result.data`.
4. **Mobile-First UI:** 44px+ touch targets, numeric keyboards (`inputMode="decimal"`), zero horizontal overflow.
5. **Fast Iterative Validation:** Verify code changes via:
   1. `npm run typecheck`
   2. `npm test` (targeted unit tests)
   3. `npm run lint`
   *(Do NOT run full production builds for intermediate edits or markdown changes).*

---

## 6. Git Workflow & PR Lifecycle

- **Feature Branch Deployment:** Work on `feat/*` branches; merge to `main` via GitHub PR API.
- **CRITICAL MERGE RULE:** **NEVER run `git merge` locally on `main`**. Always merge PRs via GitHub API/script:
  ```bash
  npm run pr:merge <PR_NUMBER>
  ```
- **Vercel Cleanup:** Purge orphaned preview deployments using `npm run vercel:clean`.
- **Markdown Edits:** Documentation and SEO log updates do not require running unit tests or production builds.

---

## 7. Modular Rules Reference (`.agents/rules/`)

- **DEV.to Delivery:** `.agents/rules/devto-publishing-rules.md`
- **Hashnode Delivery:** `.agents/rules/hashnode-publishing-rules.md`
- **MERLOT OER:** `.agents/rules/merlot-publishing-rules.md`
- **BibSonomy:** `.agents/rules/bibsonomy-publishing-rules.md`
- **Figshare Datasets:** `.agents/rules/figshare-publishing-rules.md`
- **Hugging Face:** `.agents/rules/huggingface-publishing-rules.md`
- **Academia / SSRN:** `.agents/rules/academia-publishing-rules.md`
- **Interaction Rules:** `.agents/rules/universal-interaction-rules.md`

