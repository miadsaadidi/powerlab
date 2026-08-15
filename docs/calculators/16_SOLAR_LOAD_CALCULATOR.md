# Solar Load Calculator — Build Specification

## Route

`/solar/solar-load-calculator`

## Release phase

**Phase 3.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Build a daily appliance/load profile for solar sizing, including daily kWh, essential energy, estimated simultaneous watts and optional surge awareness.

## User intent

> What daily energy and peak load should my solar system be planned around?

## SEO target

- **Primary:** `solar load calculator`
- **Planner volume:** ~5,000/month
- **Planner advertiser competition:** Low (index 3)
- **Organic competition (2026-08-10 SERP review):** Medium
- **Validated secondary keywords:** none separately reported in the current Planner master.
- **Supporting same-intent phrases (no independent volume claim):**
  - `solar system load calculator`
  - `solar appliance load calculator`
  - `off grid load calculator`
  - `daily load calculator for solar`
  - `solar energy load calculation`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `Solar Load Calculator — Daily kWh & Appliance Loads`
- **Meta description:** `Calculate solar loads from appliances, watts and runtime. Estimate daily kWh, essential loads and peak watts for solar and battery planning.`
- **H1:** `Solar Load Calculator`
- **Canonical:** self-canonical to `/solar/solar-load-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Appliance-builder competitors are useful, but many immediately jump to recommending entire systems. Keep this page focused on the load profile: daily kWh, connected watts, essential load and top contributors. Then hand the clean result to Solar Panel Size and Solar Battery Bank.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

Starter household bundle (all editable):
- Refrigerator: **150 W**, qty 1, 24 h clock, **35% duty**, Essential.
- Wi-Fi router: **12 W**, qty 1, **24 h/day**, Essential.
- LED bulbs: **10 W**, qty **4**, **5 h/day**, Essential.
- LED TV: **100 W**, qty 1, **4 h/day**, Non-essential.

## Quick Mode UX

- Dynamic searchable appliance rows.
- Each row: preset/custom label, watts, quantity, hours/day, Essential toggle.
- Duty cycle is auto-filled for cycling presets and editable under row details.
- Show running totals as rows change; no separate Calculate click is required if existing architecture handles reactive calculation reliably.

## Advanced settings — collapsed by default

- duty cycle;
- surge multiplier/starting watts where a generic preset exists;
- custom appliance;
- optional alternative saved local scenario (e.g. Summer/Winter) only as P2 if it fits existing local scenario infrastructure.

Do not add a 24-hour half-hour scheduling grid.

## Calculation model

```text
rowDailyWh = watts × quantity × hoursPerDay × dutyCycle
rowConnectedW = watts × quantity
totalDailyKWh = sum(rowDailyWh) / 1000
connectedRunningW = sum(rowConnectedW)
essentialDailyKWh = sum(rowDailyWh where essential) / 1000
```

Peak/surge is a separate optional planning figure; do not substitute it for daily energy.

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Total daily kWh.
- Connected running watts.
- Essential vs non-essential daily kWh.
- Top energy contributors.
- Optional estimated surge requirement when preset/user surge data exists, clearly labeled.

## High-value comparison — no extra required input

Show **All loads vs Essential-only** energy and connected watts automatically. This is more actionable than adding another form input.

## Required static data and defaults

Reuse shared appliance presets. Starter bundle above must be codified as a convenience profile. Refrigerator uses 35% duty; router 12 W; LED 10 W each; TV 100 W. All values editable.

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

- **Size solar panels for this load** → Solar Panel Size.
- **Size battery storage for this load** → Solar Battery Bank.
- **Review household electricity use** → Electricity Usage.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

Starter bundle: refrigerator `150×24×0.35 = 1260 Wh`; router `12×24 = 288 Wh`; 4 LEDs `10×4×5 = 200 Wh`; TV `100×4 = 400 Wh`; total = **2148 Wh/day = 2.148 kWh/day**. Connected running watts = **302 W**. Essential energy = **1.748 kWh/day**.

## Supporting article structure

1. Solar load calculator
2. How to calculate solar loads
3. Appliance watts and runtime
4. Daily kWh for solar sizing
5. Essential loads
6. Peak watts vs daily energy
7. Solar load example
8. Related solar calculators

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

- Peak/surge output is a planning scenario, not electrical installation sizing
- Usage patterns vary; all presets remain editable

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
