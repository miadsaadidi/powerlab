# Battery Capacity Calculator — Build Specification

## Route

`/battery/battery-capacity-calculator`

## Release phase

**Phase 2.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Convert and interpret battery capacity between Ah, Wh and kWh and estimate usable energy from voltage, SOC, reserve and health.

## User intent

> What is this battery capacity in Ah/Wh/kWh, and how much usable energy does it contain?

## SEO target

- **Primary:** `battery capacity calculator`
- **Planner volume:** ~5,000/month
- **Planner advertiser competition:** Low (index 0)
- **Organic competition (2026-08-10 SERP review):** Medium
- **Validated secondary keywords:** none separately reported in the current Planner master.
- **Supporting same-intent phrases (no independent volume claim):**
  - `Ah to Wh battery calculator`
  - `Wh to Ah battery calculator`
  - `battery amp hour calculator`
  - `battery kWh calculator`
  - `battery capacity conversion calculator`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `Battery Capacity Calculator — Convert Ah, Wh & kWh`
- **Meta description:** `Convert battery capacity between amp-hours, watt-hours and kWh using voltage, and estimate usable energy from state of charge, reserve and battery health.`
- **H1:** `Battery Capacity Calculator`
- **Canonical:** self-canonical to `/battery/battery-capacity-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Keep this tool focused on capacity conversion and usable energy; do not let it become a duplicate Battery Size calculator. Competitor value comes from tabs for what the user knows. Our extra value is instant equivalent units plus usable capacity and common-voltage Ah references.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Mode: **I know Ah**.
- Capacity: **100 Ah**.
- Voltage: **12 V**.
- Chemistry: **LiFePO4 / LFP**.
- Starting SOC: **100%**.
- Minimum SOC: **20%**.
- Battery health: **100%**.

## Quick Mode UX

Mode selector:
- `I know Ah / mAh`
- `I know Wh / kWh`
- `Find voltage`

Only ask for the variables needed by the selected formula. Show all equivalent units immediately in the result.

## Advanced settings — collapsed by default

- chemistry;
- starting SOC;
- minimum SOC;
- battery health.

Do not add load/runtime to Quick Mode; link to Battery Runtime/Size instead.

## Calculation model

```text
Ah = mAh / 1000
Wh = V × Ah
kWh = Wh / 1000
Ah = Wh / V
V = Wh / Ah

usableWh = nominalWh × batteryHealth × max(0, startingSoc - minimumSoc)
```

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Ah and mAh where applicable.
- Wh and kWh.
- Voltage.
- Nominal energy.
- Usable energy when chemistry/SOC assumptions are active.
- Formula card showing the relationship used.

## High-value comparison — no extra required input

When Wh/kWh is the known input, automatically show **Ah equivalents at 12 V / 24 V / 48 V** so the visitor can understand how voltage changes Ah without changing energy.

## Required static data and defaults

Add `mAh` to shared capacity units. Reuse voltage presets and chemistry reserve defaults. No product catalog.

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

- **How long will this battery run my load?** → Battery Runtime.
- **What battery capacity do I need?** → Battery Size.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

1. `100 Ah × 12 V` → **1200 Wh = 1.2 kWh**. With 80% usable SOC and health100 → **960 Wh usable**.
2. `100,000 mAh` → `100 Ah`.
3. `1200 Wh` → 100 Ah at 12 V, 50 Ah at 24 V, 25 Ah at 48 V.
4. `1200 Wh / 100 Ah` → **12 V**.

## Supporting article structure

1. Battery capacity calculator
2. Ah to Wh calculation
3. Wh to Ah calculation
4. Battery kWh calculation
5. Nominal vs usable battery capacity
6. Battery capacity examples
7. Related battery calculators

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

- Ah cannot be converted to energy without voltage
- Capacity conversion is separate from sizing for a target runtime

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
