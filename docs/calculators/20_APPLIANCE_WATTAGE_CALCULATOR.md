# Appliance Wattage Calculator — Build Specification

## Route

`/home-energy/appliance-wattage-calculator`

## Release phase

**Phase 4.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Provide editable generic appliance wattage estimates and translate them into energy use for a selected runtime.

## User intent

> Approximately how many watts does this appliance use, and what does that mean for energy calculations?

## SEO target

- **Primary:** `appliance wattage calculator`
- **Planner volume:** ~500/month
- **Planner advertiser competition:** Low (index 2)
- **Organic competition (2026-08-10 SERP review):** Medium–High / mixed
- **Validated secondary keywords:** none separately reported in the current Planner master.
- **Supporting same-intent phrases (no independent volume claim):**
  - `appliance watts calculator`
  - `home appliance wattage calculator`
  - `electrical appliance watt calculator`
  - `appliance power consumption calculator`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `Appliance Wattage Calculator — Estimate Watts & kWh`
- **Meta description:** `Estimate appliance running watts from editable presets or your device label, then calculate energy use for a selected runtime. Use the result in battery or solar tools.`
- **H1:** `Appliance Wattage Calculator`
- **Canonical:** self-canonical to `/home-energy/appliance-wattage-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

The strongest competitor pattern is “what information do you have?” plus editable appliance presets. Our tool should answer wattage quickly from a preset or an electrical label, then optionally translate that into energy for a selected runtime. Keep power factor, duty cycle and startup watts behind Advanced.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Mode: **Choose an appliance**.
- Appliance: **LED TV**.
- Running watts: **100 W** (editable preset).
- Runtime: **4 h/day**.
- Quantity: **1**.
- Cost: Off.

## Quick Mode UX

Two paths:
1. `Choose appliance` — searchable preset, editable watts and typical range.
2. `Read a label` — if label has watts, enter W; otherwise enter volts + amps to calculate apparent/simple watts.

Show runtime as optional so the same tool can produce daily energy without becoming the full Electricity Usage builder.

## Advanced settings — collapsed by default

- AC power factor when known; default `1.0` only for simple V×A estimate and label it assumption, not a universal PF;
- duty cycle;
- startup/surge watts or multiplier;
- optional electricity cost enabled by user.

Do not invent motor PF or surge data when no preset/user value exists.

## Calculation model

```text
known watts:
  runningW = watts

label volts/amps:
  apparentVA = volts × amps
  estimatedRealW = apparentVA × powerFactor

energyWh = runningW × quantity × runtimeHours × dutyCycle
energyKWh = energyWh / 1000
optionalCost = energyKWh × userPricePerKWh
```

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Estimated running watts and kW.
- Typical preset range when a preset is selected.
- V×A / PF breakdown in label mode.
- Wh/kWh for selected runtime.
- Optional startup/surge estimate only when supported by data.

## High-value comparison — no extra required input

For preset mode, show the selected **typical wattage range** and resulting energy at low/default/high preset watts. This communicates uncertainty without requiring more inputs.

## Required static data and defaults

Reuse shared appliance array. Default LED TV `100 W`, typical range `30–200 W`. Support label volts/amps; no separate appliance database. Optional price is user-entered/example only if cost mode is enabled.

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

- **Calculate monthly/yearly electricity use** → Electricity Usage.
- **Estimate battery runtime for this appliance** → Battery Runtime.
- **Add this appliance to a solar load** → Solar Load.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

1. `100 W × 4 h` → **400 Wh = 0.4 kWh/day**.
2. Label `230 V × 0.5 A`, PF 1.0 → `115 W`; PF 0.8 → `92 W`.
3. Preset watts must remain editable; changing to 120 W must update energy immediately.

## Supporting article structure

1. Appliance wattage calculator
2. How many watts do appliances use?
3. Running watts vs energy use
4. Watts to kWh
5. Appliance wattage examples
6. Motor/compressor surge
7. How to improve accuracy
8. Related home energy calculators

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

- Preset wattage varies widely by device and operating mode
- Nameplate/measured/energy-label data should override generic presets

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
