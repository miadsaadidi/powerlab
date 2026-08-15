# UPS Battery Size Calculator — Build Specification

## Route

`/battery/ups-battery-size-calculator`

## Release phase

**Phase 2.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Estimate UPS battery energy and Ah required for a load and target backup duration.

## User intent

> What battery capacity does my UPS need to support this load for the desired time?

## SEO target

- **Primary:** `ups battery size calculator`
- **Planner volume:** ~500/month
- **Planner advertiser competition:** Low (index 2)
- **Organic competition (2026-08-10 SERP review):** Low–Medium
- **Validated secondary keywords:** none separately reported in the current Planner master.
- **Supporting same-intent phrases (no independent volume claim):**
  - `UPS battery sizing calculator`
  - `UPS battery capacity calculator`
  - `UPS backup battery calculator`
  - `UPS Ah calculator`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `UPS Battery Size Calculator — Wh & Ah for Backup Time`
- **Meta description:** `Calculate UPS battery size from load watts and required backup time, including UPS efficiency, usable battery fraction, health and planning margin.`
- **H1:** `UPS Battery Size Calculator`
- **Canonical:** self-canonical to `/battery/ups-battery-size-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Industrial UPS sizing competitors expose kVA, strings, cells, cutoff voltage and temperature. Our consumer/business utility should start with just watts + target runtime + chemistry, then return Wh/kWh and Ah. Module/string planning is optional Advanced, not the main experience.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Load: **300 W**.
- Target runtime: **30 min**.
- Chemistry: **AGM**.
- DC bus voltage: **24 V**.
- UPS efficiency: **90%**.
- Usable fraction: **50%**.
- Battery health: **100%**.
- Design margin: **10%**.

## Quick Mode UX

- Load watts.
- Target runtime with preset chips `15 min | 30 min | 60 min` plus custom.
- Chemistry.
- Optional system/bus voltage selector, but kWh result remains primary.
- Do not require kVA/PF if watts are known.

## Advanced settings — collapsed by default

- UPS efficiency;
- usable fraction/reserve;
- battery health;
- design margin;
- VA + power factor when watts are unavailable (PF default `0.80`, clearly estimated);
- optional battery-module planning: module voltage + Ah → modules/string and parallel strings.

Do not introduce temperature/cutoff/cabinet engineering fields.

## Calculation model

```text
loadEnergyWh = loadW × runtimeHours
batteryEnergyBeforeReserve = loadEnergyWh / upsEfficiency
minimumNominalWh = batteryEnergyBeforeReserve / (usableFraction × batteryHealth)
recommendedWh = minimumNominalWh × (1 + designMargin)
AhAtBus = recommendedWh / busVoltage
```

Optional module planning must round whole modules and show resulting installed energy.

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Required load energy Wh.
- Minimum nominal battery Wh/kWh.
- Recommended Wh/kWh with margin.
- Ah at selected bus voltage.
- Optional whole-module/string result only when the user requests it.

## High-value comparison — no extra required input

Automatically show recommended battery size for **15 / 30 / 60 minutes** at the current load.

## Required static data and defaults

Default AGM usable fraction `50%`, UPS efficiency `90%`, PF fallback `0.80`, bus voltage `24 V`, margin `10%`. Optional module example can be `12 V / 9 Ah`, explicitly labeled example rather than a product.

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

- **Check estimated runtime with this battery** → UPS Runtime, carrying load and recommended battery energy.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

`300 W × 0.5 h = 150 Wh` load energy. `/0.90 = 166.67 Wh`; `/0.50 = 333.33 Wh`; `×1.10 = 366.67 Wh` recommended. At 24 V → **15.28 Ah**.

## Supporting article structure

1. UPS battery size calculator
2. How to size a UPS battery
3. UPS battery Wh and Ah
4. UPS efficiency and runtime
5. UPS sizing example
6. Related UPS calculators

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

- UPS internal topology and manufacturer battery limits may constrain replacement/expansion
- Planning calculator, not modification instructions

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
