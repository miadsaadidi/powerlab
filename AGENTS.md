# AGENTS.md — Energy Planning Tools

## Mission

Build an SEO-first, calculator-led energy planning website using **Next.js App Router + React + TypeScript + Vercel**.

The site must behave like one connected planning system across:

```text
Home Energy ↔ Battery ↔ Solar ↔ EV
```

The architecture is intentionally **database-free**:

```text
Static TypeScript data
+ deterministic calculator engines
+ localStorage Energy Profile
+ server-side PVWatts V8 proxy
+ optional AI explanation route
```

There is **no Supabase, no authentication, no user-account system, no country tariff database, and no EV model database**.

## Mandatory reading order

Before changing implementation, read:

1. `AGENTS.md`
2. `CONTRIBUTING.md`
3. `README.md`
4. `docs/01_PRODUCT_VISION.md`
5. `docs/02_WEBSITE_ARCHITECTURE_AND_DESIGN.md`
6. `docs/03_TECHNICAL_ARCHITECTURE.md`
7. `docs/04_SEO_AND_GEO_STRATEGY.md`
8. `docs/05_KEYWORD_AND_SERP_ANALYSIS.md`
9. `docs/06_ENERGY_PROFILE_AND_DATA_MODEL.md`
10. `docs/07_INITIAL_DATA_AND_DEFAULTS.md`
11. `docs/08_CONTENT_AND_PAGE_TEMPLATE.md`
12. `docs/09_IMPLEMENTATION_ROADMAP.md`
13. `docs/10_TESTING_AND_ACCEPTANCE.md`
14. `docs/11_ANALYTICS_AND_EVENTS.md`
15. `docs/12_SOURCES_AND_METHODOLOGY.md`
16. `docs/13_CALCULATOR_REGISTRY_AND_ROUTES.md`
17. `docs/14_30_DAY_SEO_AND_BACKLINK_PLAN.md`
18. `docs/outreach/04_DAILY_5_OUTREACH_TARGETS_AND_PITCHES.md`
19. the relevant file under `docs/calculators/`

## Final public architecture

```text
/
├── /solar/
│   ├── solar-panel-tilt-calculator
│   ├── solar-panel-output-calculator
│   ├── solar-panel-size-calculator
│   ├── solar-battery-bank-size-calculator
│   └── solar-load-calculator
│
├── /battery/
│   ├── battery-runtime-calculator
│   ├── battery-size-calculator
│   ├── battery-capacity-calculator
│   ├── battery-charging-time-calculator
│   ├── ups-runtime-calculator
│   ├── ups-battery-size-calculator
│   ├── home-battery-size-calculator
│   └── portable-power-station-calculator
│
├── /home-energy/
│   ├── electricity-usage-calculator
│   ├── energy-bill-calculator
│   └── appliance-wattage-calculator
│
└── /ev/
    ├── ev-charging-time-calculator
    ├── ev-charging-cost-calculator
    ├── ev-range-calculator
    └── ev-savings-calculator
```

All 20 calculator intents have specifications. **Do not publish empty future routes.**

## Release phases

### Phase 1

1. Battery Runtime
2. Solar Panel Tilt
3. Electricity Usage
4. Battery Size
5. EV Charging Time

### Phase 2

6. Solar Panel Output
7. UPS Runtime
8. Battery Capacity
9. Battery Charging Time
10. Solar Panel Size
11. UPS Battery Size

### Phase 3

12. Energy Bill
13. EV Charging Cost
14. Home Battery Size
15. Solar Battery Bank Size
16. Solar Load

### Phase 4

17. Portable Power Station
18. EV Range
19. EV Savings
20. Appliance Wattage

## Non-negotiable engineering rules

1. Calculator engines are pure TypeScript and deterministic.
2. Engines do not depend on React, DOM, localStorage, analytics, AI or network calls.
3. External model calls are made by provider adapters and their results are passed into engines as explicit inputs.
4. No database or auth dependency may be introduced without explicit approval.
5. Static presets live under `src/data/` and remain user-editable.
6. `localStorage` is only for user preferences, local Energy Profile and local scenarios.
7. External secrets never use `NEXT_PUBLIC_*`.
8. `PVWATTS_API_KEY` is server-only.
9. Optional AI never performs authoritative calculation; it may only explain deterministic results.
10. Calculators remain useful when optional AI fails.
11. Solar Tilt quick guidance remains useful when PVWatts fails.
12. Never fabricate solar production if the external model is unavailable.
13. Do not scrape EV models/specifications.
14. Do not maintain electricity/fuel price databases; prices are user-entered where needed.
15. No one-page-per-keyword programmatic SEO.
16. One materially distinct user task = one canonical route.
17. Same-intent keyword variants merge into the canonical page.
18. Planned routes do not enter navigation/sitemap until their implementation is complete.
19. All important defaults are visible and editable.
20. Every result must expose the assumptions that materially affect it.
21. No fake precision, fake confidence score or unsupported claim of “optimal”.
22. Use semantic HTML and accessible form controls.
23. Supporting SEO content must be server-rendered.
24. Run unit tests, typecheck, lint, accessibility checks and production build before completion.
25. Do not change a canonical route or keyword mapping casually; update the SEO and registry docs together.

## Calculator implementation defaults (non-negotiable)

These rules apply to every new calculator unless its specification explicitly says otherwise:

1. Inspect the relevant calculator spec, route, engine, shared components, static data, metadata and tests before changing an existing tool. Improve incrementally; do not replace working architecture without a concrete need.
2. Start with a useful, prefilled Quick Mode. A first-time visitor must be able to calculate immediately; never begin with an empty or technical-heavy form.
3. Keep technical inputs in a collapsed Advanced section. Defaults must be visible when used, editable, accurately labeled as estimates or presets, and never described as universal standards.
4. Attach units to numeric inputs, normalize units before formulas, preserve user-entered precision in state, and validate impossible values inline with a recovery-oriented message.
5. Make the primary answer human-readable, then show a transparent result breakdown, material assumptions/provenance, limitations, and at least one decision-helpful comparison or next step.
6. Use shared static datasets and shared calculator patterns where they exist. Appliance flows must keep average energy load separate from peak connected load when both matter.
7. Design mobile first: real labels, numeric keyboards, 44px-or-larger controls, no horizontal scrolling, and a result reachable without a long SEO wall. Use two columns only where the width remains comfortable.
8. For SEO/GEO, use the mapped primary keyword naturally in title, H1 and direct introduction; use merged secondary terms only where they improve an explanation or example. Keep supporting content server-rendered, people-first, concise, formula-matched and source-linked.
9. Keep canonical, metadata, registry, sitemap status, visible breadcrumbs and accurate `BreadcrumbList` structured data aligned. Never add fake FAQ/HowTo/application markup, hidden text, keyword variants as routes, or AI-only SEO files.
10. Cross-calculator transfer must be explicit, browser-local and non-destructive. Never link to an unpublished calculator route; if the target is not published, use a clear category-level fallback instead.
11. Before completion, add or update known-value, unit-conversion, validation and monotonic-invariant tests; run typecheck, lint, accessibility checks and production build. Do not run browser E2E when the user has explicitly asked to test manually.

## Required source layout

```text
src/
├── app/
│   ├── solar/
│   ├── battery/
│   ├── home-energy/
│   ├── ev/
│   └── api/
│       ├── solar-production/route.ts
│       └── ai/explain/route.ts       # optional / feature-flagged
│
├── components/
│   ├── calculator/
│   ├── inputs/
│   ├── results/
│   ├── charts/
│   └── seo/
│
├── data/
│   ├── appliances.ts
│   ├── battery-chemistries.ts
│   ├── battery-voltages.ts
│   ├── ev-chargers.ts
│   ├── ev-defaults.ts
│   ├── solar-defaults.ts
│   ├── units.ts
│   ├── currencies.ts
│   └── calculator-defaults.ts
│
├── lib/
│   ├── calculators/
│   ├── energy-profile/
│   ├── providers/
│   ├── seo/
│   ├── analytics/
│   ├── storage/
│   ├── validation/
│   └── units/
│
└── types/
```

## Engine contract

Prefer a shared result envelope:

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

## SEO / GEO rules

The final canonical keyword map is in `docs/05_KEYWORD_AND_SERP_ANALYSIS.md`.

- Keyword Planner competition is advertiser competition, **not** organic difficulty.
- Organic competition values are manual SERP assessments from the research date and may change.
- Use primary terms naturally in title/H1/introduction.
- Use secondaries naturally in sections and examples.
- Do not create duplicate URLs for secondary variants.
- For Google generative search, follow normal technical SEO and people-first content rules; do not add special `llms.txt`/AI markup as a ranking requirement.
- Every calculator must provide unique non-commodity value: actual computation, transparent assumptions, examples, comparisons and connected next steps.

## Mandatory Email Outreach & Communication Protocol

Before writing, drafting, generating, or reviewing ANY outreach pitch, educational email, or editorial inquiry, you MUST strictly adhere to:

1. **Peer-to-Peer Engineering Tone:** Represent PowerLab as a computational modeling research group sharing deterministic models, equations, and reproducible data.
2. **Scientific Curiosity & Counter-Intuitive Trigger:** Every pitch must follow the 4-step framework:
   - *The Status Quo / Intuitive Assumption*
   - *The Counter-Intuitive Physical Anomaly* (e.g. inverter tare losses, Peukert electrochemical derating, cold $V_{oc}$ expansion)
   - *The Material Quantitative Impact* (grounded in concrete numbers/losses)
   - *The Deterministic Artifact* (open mathematical model with transparent derivations)
3. **Zero Marketing / Promotional Clichés:** Prohibited terms: *"100% free"*, *"ad-free"*, *"no signup required"*, *"cutting-edge"*, *"game-changing"*, *"check out our site"*, *"please link to us"*.
4. **No AI Stylistic Artifacts:** No em dashes (`—`), generic fluff, or template cheerleading.
5. **Strict Follow-Up Discipline:** Exactly 1 polite follow-up after 7 days (72+ hours). Never send a third unprompted message.
6. **Required Reference Documents:** Read `.agents/rules/email-outreach-rules.md`, `docs/outreach/04_DAILY_5_OUTREACH_TARGETS_AND_PITCHES.md`, and `docs/14_30_DAY_SEO_AND_BACKLINK_PLAN.md`.

## Deployment & Execution Rules (Vercel Git Integration)

Vercel is connected directly to Git. Production deployments are **fully automated** upon push/merge to `main`.

- **Direct Questions First:** When the user asks a question (e.g., 'did you push to vercel? yes/no'), answer the question directly without autonomously executing unrequested scripts or builds.
- **Markdown & SEO Plans Are Not Code:** Markdown documents (`.md` files, outreach plans, SEO strategies, documentation) are not executable code. Never run unit tests (`npm test`), typechecks, or production builds (`npm run build`) for documentation, markdown, or SEO plan updates.
- **No Unrequested Builds / Deployments:** Never trigger production builds or manual deployment runs unless explicitly requested by the user.
- **Automated Deployments:** Deployments trigger automatically via Git integration upon push/merge. Manual deployment scripts are deprecated/fallback only.
- **Never Expose Secrets:** Never print, copy, commit, or expose token values, API keys, or private environment variables in source code, logs, or chat messages.

## Git & GitHub Pull Request Protocol (Production-Grade Branch Lifecycle)

All code modifications and contributions must strictly follow this production-grade GitHub Pull Request (PR) and branch lifecycle protocol (also codified in `CONTRIBUTING.md`):

### 1. Scale Thresholds
- **Small Tweaks (No PR Required):** Direct commits to `main` for simple text/copy corrections, minor CSS refinements, small metadata tweaks, or isolated single-file bug fixes. Vercel automatically deploys `main` to Production.
- **Medium & Large Updates (MANDATORY PR):** Dedicated feature branch (`feat/<slug>`, `refactor/<slug>`, `docs/<slug>`, `fix/<slug>`) and a formal GitHub Pull Request for multi-feature additions, new routes/pages, major mathematical refactors, or schema architectures. Direct commits to `main` for these scopes are strictly forbidden.

### 2. Pre-PR Verification Gate (For Code Changes Only)
For executable code modifications (TypeScript, TSX, API routes, engines, state stores), run and pass before pushing or creating a PR:
1. **Unit tests:** `npm test` (100% passing across all suites).
2. **Typecheck:** `npm run typecheck` / `tsc --noEmit` (0 compilation errors).
3. **Static build (recommended):** `npm run build` (Clean static route generation).
*(Note: Markdown documents, outreach templates, and SEO plan files do NOT require tests or builds).*

### 3. Immediate Formal PR Creation on Push (NEVER STOP AT RAW PUSH)
Whenever you create and push a feature branch (`git push -u origin feat/<slug>`):
- **You MUST IMMEDIATELY open the formal Pull Request on GitHub** (via GitHub API / CLI / GitHub web interface).
- **Never stop at simply pushing the branch.** The PR must appear as **OPEN** in the repository's GitHub Pull Requests tab immediately.
- The PR description must adhere to `.github/pull_request_template.md` and include:
  - **Overview & Domain Motivation**
  - **Governing Mathematical Models & Standards Cited** (IEEE, NFPA/NEC, NREL SAM, ASHRAE, IEC)
  - **Key Technical Changes Breakdown** (Engines, UI, Datasets, SEO Schema)
  - **Validation & Test Matrix Evidence** (Exact test counts, 0 type errors, clean static build)
  - **Institutional & Academic Relevance** (Syllabus integration, laboratory reproducibility)

### 4. Review Window & Vercel Preview
- Leave PRs open for a realistic review window (**2 to 24 hours**) for thorough peer inspection, UX testing, and mobile responsiveness validation.
- Vercel automatically generates and maintains an isolated Preview Deployment with a dedicated preview URL for the open PR.

### 5. Clean Merge & Branch Deletion
When authorized to merge:
1. **Merge through GitHub:** Merge the PR so that it is permanently marked as **Closed / Merged** in GitHub PR history.
2. **Delete Remote Branch:** Delete the remote feature branch (`origin/feat/<slug>`) from GitHub.
3. **Clean Local Git:** Checkout `main`, pull the merged changes, delete the local branch (`git branch -d feat/<slug>`), and prune remote tracking (`git fetch --prune`).
4. **Active Branch & Production Verification:** Vercel automatically removes the preview branch from "Active Branches" and deploys `main` to Production.

---

A page or calculator feature is not done because the formula runs. It is done when:

- engine and tests pass;
- UI is usable on mobile and keyboard;
- Quick/Advanced behavior matches spec;
- assumptions and limitations are visible;
- result is decision-oriented;
- supporting article is complete;
- title/meta/H1/canonical/breadcrumb are correct;
- structured data is accurate and not spammy;
- related-tool links work;
- analytics events are wired without storing sensitive calculation payloads;
- no secrets leak;
- production build passes;
- route status is updated to `published` only at release.
