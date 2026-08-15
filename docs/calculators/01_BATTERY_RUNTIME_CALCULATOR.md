# Battery Runtime Calculator — Build Specification

## Route

`/battery/battery-runtime-calculator`

## Release phase

**Phase 1.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Estimate how long a battery can power a known load or a set of appliances, while exposing usable energy, reserve, health and conversion assumptions.

## User intent

> I have a battery and a load. How long will the battery run it?

## SEO target

- **Primary:** `battery runtime calculator`
- **Planner volume:** ~5,000/month
- **Planner advertiser competition:** Low (index 0)
- **Organic competition (2026-08-10 SERP review):** Medium
- **Validated secondary keywords:**
  - `battery backup time calculator` — ~500/month
  - `12v battery run time calculator` — ~500/month
  - `battery runtime calculator watts` — ~500/month
- **Supporting same-intent phrases (no independent volume claim):**
  - `battery run time calculator`
  - `battery backup runtime calculator`
  - `how long will my battery last`
  - `battery runtime by watts`
  - `100Ah battery runtime`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `Battery Runtime Calculator — Estimate Backup Time`
- **Meta description:** `Estimate battery runtime from Wh or Ah, voltage, load, state of charge, reserve and inverter efficiency. See usable energy, assumptions and runtime scenarios.`
- **H1:** `Battery Runtime Calculator`
- **Canonical:** self-canonical to `/battery/battery-runtime-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Benchmark principle: a visitor who only knows battery energy and appliance watts must get a useful answer immediately, while chemistry/SOC/efficiency controls remain available through progressive disclosure. The value advantage is dynamic appliance entry, transparent energy flow, and a no-extra-input runtime sensitivity comparison.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Capacity: **1000 Wh**
- Capacity unit: **Wh**
- Chemistry: **LiFePO4 / LFP**
- Load mode: **Total load**
- Load: **100 W**
- Load type: **AC**
- Starting SOC: **100%**
- Minimum SOC / reserve: **20%**
- Battery health: **100%**
- AC inverter efficiency: **90%**
- DC direct efficiency: **100%**
- Duty cycle: **100%**
- Peukert: **Off**

## Quick Mode UX

- Capacity input with inline unit selector: `Wh | kWh | Ah`.
- Reveal voltage only when Ah is selected.
- Chemistry selector: LFP, generic Li-ion, AGM, Gel, Flooded, Custom.
- Load entry mode: `Total load` (default) or `Add appliances`.
- Total-load mode: watts/kW + AC/DC selector.
- Appliance mode: dynamic searchable appliance rows with editable watts, quantity and AC/DC; duty cycle remains row-advanced.
- Calculate button stays in the first viewport on common mobile sizes.

## Advanced settings — collapsed by default

- starting SOC;
- minimum remaining SOC;
- battery health;
- AC inverter efficiency;
- DC conversion efficiency;
- duty cycle;
- optional Peukert correction.

Peukert stays off by default. Do not fake a precise Peukert correction when required battery rating/discharge-rate information is unavailable.

## Calculation model

```text
if capacity unit = Ah:
  nominalWh = Ah × voltage
else:
  nominalWh = normalize capacity to Wh

usableBatteryWh = nominalWh × batteryHealth × max(0, startingSoc - minimumSoc)

AC battery-side watts = AC device watts / inverterEfficiency
DC battery-side watts = DC device watts / dcEfficiency

appliance average watts = runningWatts × quantity × dutyCycle

runtimeHours = usableBatteryWh / totalBatterySideWatts
```

Do not apply both an 80% DoD and a 20% reserve as separate deductions; they represent the same usable SOC window.

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Estimated runtime formatted as minutes / hours / days.
- Nominal battery energy.
- Usable battery energy after SOC/reserve/health.
- Device load and battery-side load.
- Connected peak running watts separately from duty-cycle average watts in appliance mode.
- Assumptions used.

## High-value comparison — no extra required input

Automatically show runtime at approximately **75% / 100% / 125%** of the user's current load, with the current row highlighted.

## Required static data and defaults

Reuse the shared battery chemistry, voltage, inverter-efficiency and appliance arrays in `docs/07_INITIAL_DATA_AND_DEFAULTS.md`. Minimum convenient appliance presets: Wi-Fi router 12 W, modem 10 W, laptop 65 W, TV 100 W, LED bulb 10 W, ceiling fan 50 W, refrigerator 150 W at 35% duty, freezer 120 W at 40%, microwave 1200 W, kettle 1800 W, coffee maker 1000 W, air fryer 1500 W, space heater 1500 W.

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

- **Find the battery size you need** → Battery Size, carrying current load and relevant assumptions.
- Appliance mode may offer **Use these appliances in Electricity Usage** only through the existing explicit handoff mechanism.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

1. `1000 Wh`, LFP, SOC `100%→20%`, health `100%`, AC efficiency `90%`, `100 W` AC → usable `800 Wh`, battery-side load `111.11 W`, runtime `7.2 h` → **7 h 12 min**.
2. `100 Ah × 12 V` must become `1200 Wh` before reserve/losses.
3. `1000 Wh`, 80% usable, `100 W` direct DC at 100% efficiency → **8 h**.
4. Appliance mode: 100 W TV + 12 W router + 3×10 W bulbs = 142 W device load; at 90% AC efficiency and 800 Wh usable → about **5 h 04 min**.
5. Refrigerator 150 W at 35% duty → 52.5 W average but 150 W connected running load.

## Supporting article structure

1. How to use the battery runtime calculator
2. Battery runtime formula
3. Ah vs Wh: why voltage matters
4. How inverter efficiency changes runtime
5. Battery reserve and usable capacity
6. Battery runtime examples
7. Why real battery runtime can differ
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

- Generic chemistry presets are editable estimates
- Temperature, battery BMS limits and age can materially change real runtime
- No installation or high-current wiring instructions

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
