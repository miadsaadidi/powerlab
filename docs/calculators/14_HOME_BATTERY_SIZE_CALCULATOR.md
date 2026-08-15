# Home Battery Size Calculator — Build Specification

## Route

`/battery/home-battery-size-calculator`

## Release phase

**Phase 3.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Estimate home backup battery capacity from essential household energy and desired backup duration.

## User intent

> How much home battery storage do I need for my essential loads and desired outage duration?

## SEO target

- **Primary:** `home battery size calculator`
- **Planner volume:** ~500/month
- **Planner advertiser competition:** Medium (index 66)
- **Organic competition (2026-08-10 SERP review):** Medium–High
- **Validated secondary keywords:** none separately reported in the current Planner master.
- **Supporting same-intent phrases (no independent volume claim):**
  - `home backup battery calculator`
  - `battery storage size calculator for home`
  - `house battery size calculator`
  - `whole home battery sizing calculator`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `Home Battery Size Calculator — Backup kWh Estimate`
- **Meta description:** `Estimate home battery size from essential household energy, backup hours, reserve, inverter efficiency and planning margin. Get kWh and scenario comparisons.`
- **H1:** `Home Battery Size Calculator`
- **Canonical:** self-canonical to `/battery/home-battery-size-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

The clearest competitor UX asks what portion of the home must stay powered. Use **Critical / Partial / Whole home** scope chips rather than making users manually multiply loads. Keep detailed appliance selection in Electricity Usage; this page should size from daily/monthly energy + backup hours.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Source: **Monthly household usage**.
- Usage: **300 kWh/month**.
- Backup scope: **Partial home — 50%**.
- Backup duration: **12 h**.
- Chemistry: **LiFePO4 / LFP**.
- Minimum SOC/reserve: **20%**.
- Inverter efficiency: **90%**.
- Battery health: **100%**.
- Design margin: **10%**.

## Quick Mode UX

- Usage input: `kWh/month` (default) or `kWh/day`.
- Backup scope chips:
  - **Critical loads — 25%**
  - **Partial home — 50%**
  - **Whole home — 100%**
- Backup hours preset chips: `4 | 8 | 12 | 24 | 48`, plus custom.
- Chemistry.

Scope percentages are application planning assumptions and must be editable after selection.

## Advanced settings — collapsed by default

- custom scope percentage;
- minimum SOC/reserve;
- inverter efficiency;
- battery health;
- design margin.

Do not assume solar recharge during an outage. Do not add battery product/module counts by default.

## Calculation model

```text
dailyKWh = monthlyKWh / (365.25/12)  // when monthly input
backupLoadEnergy = dailyKWh × scopeFraction × backupHours / 24
minimumNominalKWh = backupLoadEnergy / (inverterEfficiency × usableSocWindow × batteryHealth)
recommendedKWh = minimumNominalKWh × (1 + designMargin)
```

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Energy needed for selected backup window.
- Minimum nominal battery kWh.
- Recommended kWh with margin.
- Scope assumption shown prominently.
- Equivalent daily energy used in the calculation.

## High-value comparison — no extra required input

Automatically show recommended capacity for **Critical 25% / Partial 50% / Whole home 100%** at the current backup hours, highlighting the selected scope.

## Required static data and defaults

New shared convenience scope presets: `{critical:0.25, partial:0.50, whole:1.00}`; explicitly generic planning assumptions. Backup hours presets `4/8/12/24/48`. Chemistry/inverter/reserve defaults from shared data.

## Result UX requirements

Every successful result must:

1. lead with one human-readable primary answer;
2. show the important intermediate values so the answer is explainable;
3. list assumptions actually used, with `user-entered`, `preset`, `derived`, or `external-model` provenance;
4. include one useful what-if comparison that requires no extra input when practical;
5. keep Advanced assumptions collapsed by default;
6. provide a contextually correct next-tool action;
7. remain useful on mobile without horizontal scrolling;
8. avoid fake confidence scores and false precision.

Do not add a charting dependency only for decoration. A compact comparison table is sufficient when chart infrastructure is not already present.

## Cross-calculator handoffs

- **Build a more accurate appliance profile** → Electricity Usage.
- **Size an off-grid/solar battery bank** → Solar Battery Bank when solar/autonomy intent is explicit.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

`300 kWh/month` → about `9.856 kWh/day`. Partial 50% for 12 h → `2.464 kWh` load energy. At 90% inverter, 80% usable SOC, health100 → minimum ≈ `3.422 kWh`; with 10% margin → **3.765 kWh** recommended.

## Supporting article structure

1. Home battery size calculator
2. How much home battery storage do I need?
3. Essential loads vs whole-home backup
4. Home battery kWh formula
5. Backup hours and battery reserve
6. Home battery sizing example
7. Limitations
8. Related battery calculators

The first paragraph under the H1 should answer the calculator’s job directly in plain language. Do not write filler introductions.

## GEO / answer-engine requirements

- State the formula/model in readable text near the calculator methodology.
- Define every unit and important assumption.
- Provide at least one worked example using the deterministic engine.
- Keep the core explanation server-rendered and crawlable.
- Use concise descriptive headings, but do not create a section for every keyword variation.
- Cite primary technical sources where the model/default depends on an external standard or provider.
- Do not add special “AI markup” or an `llms.txt` requirement for Google visibility.

## Limitations / safety

- Does not size service-panel, inverter, transfer equipment or installation
- Whole-home loads with large motors/heating may require separate peak-power engineering

## Validation and tests

At minimum:

- reject negative/zero values where mathematically invalid;
- reject percentages outside their valid domain;
- reject impossible state relationships (for example target SOC <= start SOC where relevant);
- test unit conversion independently;
- test monotonic invariants that should always hold;
- test known hand-calculated fixtures;
- test mobile and keyboard operation;
- test canonical, title, meta, breadcrumb and sitemap status;
- test that the page still renders a useful state when optional external/AI services fail.

## Shared implementation baseline (mandatory)

Apply the non-negotiable calculator rules in `AGENTS.md` in addition to this specification. Build a prefilled Quick Mode first, keep technical assumptions collapsed and editable, attach units to every numeric input, and provide inline recovery-oriented validation. Keep the supporting explanation server-rendered and formula-matched; use the mapped primary term naturally in title, H1 and direct introduction, and use merged secondary phrases only where they help an explanation or example. Keep visible breadcrumbs, canonical, metadata, registry and accurate `BreadcrumbList` JSON-LD aligned. Do not add fake FAQ/HowTo/application markup, hidden keyword text, AI-only SEO files, empty routes or a separate page for a same-intent keyword.

## Definition of done

- calculator engine implemented and unit-tested;
- Quick Mode complete;
- Advanced Mode complete where specified;
- supporting article written for the documented intent;
- all material assumptions visible/editable;
- methodology and sources present;
- related-tool handoff works;
- metadata/canonical/breadcrumb correct;
- accessibility and mobile QA pass;
- no console errors;
- production build passes;
- route enters sitemap only after status becomes `published`.
