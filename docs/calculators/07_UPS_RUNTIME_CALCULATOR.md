# UPS Runtime Calculator — Build Specification

## Route

`/battery/ups-runtime-calculator`

## Release phase

**Phase 2.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Estimate how long a UPS can support a known watt load from battery energy, usable fraction, battery health and UPS efficiency.

## User intent

> How long will this UPS run my equipment at this load?

## SEO target

- **Primary:** `ups runtime calculator`
- **Planner volume:** ~5,000/month
- **Planner advertiser competition:** Low (index 3)
- **Organic competition (2026-08-10 SERP review):** Medium
- **Validated secondary keywords:**
  - `ups backup time calculator` — ~500/month
  - `ups battery backup time calculator` — ~500/month
- **Supporting same-intent phrases (no independent volume claim):**
  - `UPS backup time calculator`
  - `UPS battery runtime calculator`
  - `UPS run time calculator`
  - `how long will my UPS last`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `UPS Runtime Calculator — Estimate Backup Time`
- **Meta description:** `Estimate UPS backup runtime from load watts, battery capacity, usable battery fraction, health and UPS efficiency. Check load against UPS watt capability.`
- **H1:** `UPS Runtime Calculator`
- **Canonical:** self-canonical to `/battery/ups-runtime-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Vendor calculators often depend on a model catalog; industrial tools expose battery-string details immediately. Our calculator should stay vendor-neutral: Wh (or V/Ah/count) + load gives runtime immediately, while UPS watt limit, VA/PF and battery details remain optional. A load-sensitivity table adds immediate planning value.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Battery energy: **216 Wh** (explicitly an example equivalent to a 24 V × 9 Ah bank, not a product).
- Chemistry: **AGM**.
- Load: **100 W**.
- UPS efficiency: **90%**.
- Usable battery fraction: **50%**.
- Battery health: **100%**.
- UPS max watts: blank / unknown.

## Quick Mode UX

- Battery capacity input defaults to Wh.
- Load in watts.
- Chemistry selector.
- Optional **Add equipment** mode with router, modem, desktop, monitor, NAS/custom presets.
- Display runtime in minutes/hours.
- If UPS max watts is supplied, validate load against it before showing a normal runtime.

## Advanced settings — collapsed by default

- switch capacity entry to voltage × Ah × battery count;
- battery health;
- UPS efficiency;
- usable fraction/reserve;
- UPS max watts;
- if only VA is known: VA + assumed PF (default `0.80`) clearly labeled estimate;
- optional Peukert where valid.

## Calculation model

```text
nominalWh = directWh OR voltage × Ah × batteryCount
usableWh = nominalWh × usableFraction × batteryHealth
batterySideLoadW = loadW / upsEfficiency
runtimeHours = usableWh / batterySideLoadW

if maxWatts known and loadW > maxWatts:
  overload warning; do not present normal runtime as valid

if only VA known:
  estimatedMaxWatts = VA × assumedPowerFactor
```

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Runtime in minutes and human-readable hours/minutes.
- Nominal vs usable battery Wh.
- Battery-side load.
- Load as % of known UPS watt capability.
- Generic-planning disclaimer because OEM runtime curves can differ materially.

## High-value comparison — no extra required input

Show runtime at approximately **50% / 100% / 150%** of current load, subject to known UPS watt limit.

## Required static data and defaults

UPS defaults: efficiency `90%`, PF `0.80` only when VA must be converted, AGM usable fraction `50%`, battery health `100%`. Reuse appliance/equipment presets; no UPS model DB.

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

- **Size the UPS battery for a target runtime** → UPS Battery Size, carrying load and assumptions.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

1. `216 Wh`, AGM 50% usable, health100, efficiency90, load100 W → usable `108 Wh`, battery-side load `111.11 W`, runtime `0.972 h` ≈ **58 min**.
2. If max UPS watts is `80 W` and load is `100 W`, show overload rather than a normal runtime.
3. `1000 VA × 0.8 PF` → estimated 800 W capability only when watts are unavailable.

## Supporting article structure

1. UPS runtime calculator
2. How long will a UPS run?
3. UPS VA vs watts
4. UPS battery runtime formula
5. How battery age affects runtime
6. UPS efficiency
7. UPS runtime examples
8. Related UPS calculators

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

- UPS manufacturers may use proprietary runtime curves
- Battery age and high discharge rate can reduce runtime
- Do not equate VA directly with watts

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
