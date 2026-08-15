# EV Range Calculator — Build Specification

## Route

`/ev/ev-range-calculator`

## Release phase

**Phase 4.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Estimate driving range from usable battery energy, current SOC, reserve and user-entered or generic energy consumption.

## User intent

> How far can this EV travel with the available battery energy and expected consumption?

## SEO target

- **Primary:** `ev range calculator`
- **Planner volume:** ~500/month
- **Planner advertiser competition:** Low (index 4)
- **Organic competition (2026-08-10 SERP review):** High
- **Validated secondary keywords:** none separately reported in the current Planner master.
- **Supporting same-intent phrases (no independent volume claim):**
  - `electric car range calculator`
  - `EV mileage calculator`
  - `battery range calculator EV`
  - `electric vehicle range estimator`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `EV Range Calculator — Estimate Miles or Kilometers`
- **Meta description:** `Estimate EV driving range from usable battery capacity, state of charge, reserve and energy consumption in kWh/100 km or mi/kWh.`
- **H1:** `EV Range Calculator`
- **Canonical:** self-canonical to `/ev/ev-range-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Model-specific competitors can simulate weather and climate, but we intentionally avoid a vehicle DB and fake hard-coded weather penalties. The user enters battery + consumption; our added value is unit flexibility, transparent reserve/health and automatic efficiency-sensitivity scenarios that approximate real-world variation without pretending to know the cause.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Usable battery capacity: **60 kWh**.
- Current SOC: **80%**.
- Reserve SOC: **10%**.
- Battery health: **100%**.
- Consumption: **18 kWh/100 km** (`Typical`).
- Distance output: km, with saved locale/unit preference if available.

## Quick Mode UX

- Battery capacity kWh.
- Current SOC.
- Consumption input with units: `kWh/100 km | Wh/km | mi/kWh | kWh/100 mi`.
- Consumption quick presets: `Efficient 15`, `Typical 18`, `Higher 22 kWh/100km`, editable.
- Reserve remains prefilled but can stay in Advanced if space is tight.

## Advanced settings — collapsed by default

- reserve SOC;
- battery health;
- exact custom consumption units.

Do not add model-specific weather/terrain/climate penalties without an evidence-backed model.

## Calculation model

```text
energyAvailableKWh = batteryCapacityKWh × batteryHealth × max(0, currentSoc - reserveSoc)
consumptionKWhPerKm = normalize consumption
rangeKm = energyAvailableKWh / consumptionKWhPerKm
rangeMiles = rangeKm × 0.6213711922
```

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Estimated remaining range km/mi.
- Energy available above reserve.
- Normalized consumption.
- Assumptions summary.

## High-value comparison — no extra required input

Show range at approximately **15 / 18 / 22 kWh/100km** (or ±15% around a custom current value) and a second compact `Charge to 80% / 90% / 100%` scenario when it does not create clutter.

## Required static data and defaults

EV consumption presets already in shared data: 13/15/18/22/27 kWh/100km. Quick UI highlights 15/18/22. Distance conversions are fixed constants; no EV model catalog.

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

- **How long to charge to 80/90/100%?** → EV Charging Time.
- **What will that charge cost?** → EV Charging Cost.
- **Compare EV vs fuel running cost** → EV Savings.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

`60 kWh`, SOC80%, reserve10%, health100 → `42 kWh` available. At `18 kWh/100km` (`0.18 kWh/km`) → **233.3 km ≈ 145 mi**.

## Supporting article structure

1. EV range calculator
2. How to calculate EV range
3. Battery kWh and state of charge
4. EV efficiency units
5. Why real EV range changes
6. EV range example
7. Related EV calculators

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

- No model-specific range database
- Weather, speed, terrain, HVAC and driving style can materially change real range
- Sensitivity is scenario variation, not a confidence interval

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
