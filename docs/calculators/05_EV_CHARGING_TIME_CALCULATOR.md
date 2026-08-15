# EV Charging Time Calculator — Build Specification

## Route

`/ev/ev-charging-time-calculator`

## Release phase

**Phase 1.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Estimate EV charging duration from usable battery capacity, start/target SOC, charger power, vehicle charge-power limit and charging efficiency.

## User intent

> How long will my EV take to charge from the current SOC to the target SOC using this charger?

## SEO target

- **Primary:** `ev charging time calculator`
- **Planner volume:** ~5,000/month
- **Planner advertiser competition:** Low (index 4)
- **Organic competition (2026-08-10 SERP review):** Medium–High
- **Validated secondary keywords:** none separately reported in the current Planner master.
- **Supporting same-intent phrases (no independent volume claim):**
  - `electric car charging time calculator`
  - `ev charge time calculator`
  - `electric vehicle charging time calculator`
  - `how long does an ev take to charge`
  - `car charging time calculator`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `EV Charging Time Calculator — AC & DC Charge Time`
- **Meta description:** `Estimate EV charging time from battery capacity, start and target charge, charger power and vehicle limit. Compare AC and DC charging scenarios.`
- **H1:** `EV Charging Time Calculator`
- **Canonical:** self-canonical to `/ev/ev-charging-time-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

The best competitor pattern is prominent charger-power buttons plus a simple battery/SOC form. Our advantage is to show energy added, grid energy and a charger comparison automatically, while treating DC taper transparently rather than pretending nameplate power remains constant to 100%. No vehicle database is needed.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Battery capacity: **60 kWh**.
- Start SOC: **20%**.
- Target SOC: **80%**.
- Charger: **7.2 kW Level 2 AC**.
- AC charging efficiency: **90%**.
- Vehicle max charge power: blank / unknown.
- DC taper: generic model automatically available when a DC charger is selected.

## Quick Mode UX

- Battery usable capacity kWh.
- Start and target SOC sliders/inputs.
- Charger chips: **1.9 kW**, **7.2 kW**, **11 kW**, **50 kW**, **150 kW**, **350 kW**, plus Custom.
- Label charger family (`AC` / `DC Fast`).
- Do not require vehicle make/model or maximum charge power.

## Advanced settings — collapsed by default

- vehicle maximum charge power;
- charging efficiency;
- `Simple constant-power` vs `Generic DC taper` mode for DC;
- exact custom charger power.

Effective power is always capped by `min(charger power, vehicle max)` when vehicle max is known.

## Calculation model

```text
batteryEnergyAddedKWh = batteryCapacityKWh × (targetSoc - startSoc)

AC/simple:
  effectivePower = minKnown(chargerPower, vehicleMaxChargePower)
  timeHours = batteryEnergyAddedKWh / (effectivePower × efficiency)
  gridEnergyKWh = batteryEnergyAddedKWh / efficiency

DC taper:
  split requested SOC interval across documented generic taper segments
  segmentPower = effectivePower × segmentPowerFactor
  segmentTime = segmentBatteryEnergy / (segmentPower × dcEfficiency)
  totalTime = sum(segmentTime)
```

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Human-readable estimated charging time.
- Battery energy added.
- Estimated grid/source energy including charging losses.
- Effective charge power / limiting factor if vehicle max is supplied.
- For DC: explicit note that generic taper is a heuristic, not a vehicle-specific curve.

## High-value comparison — no extra required input

Automatically compare estimated time on **1.9 / 7.2 / 11 / 50 / 150 kW** representative chargers, applying vehicle-max cap if known. Highlight the selected charger. Optionally show **Finish around HH:MM** from browser local time.

## Required static data and defaults

Shared EV charger presets and efficiencies: Level 1 `85%`, Level 2 `90%`, DC Fast `93%`; generic DC taper `0–50:100%`, `50–80:80%`, `80–90:55%`, `90–100:30%`. These are editable planning assumptions.

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

- **What will this charging session cost?** → EV Charging Cost, carrying battery/SOC/energy data.
- **How much range will this add?** → EV Range when consumption data is available.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

1. `60 kWh`, `20→80%` = `36 kWh` battery energy. At `7.2 kW` and `90%` efficiency → `5.56 h` ≈ **5 h 33 min**, grid energy `40 kWh`.
2. A 150 kW charger with a 50 kW vehicle max must calculate at no more than 50 kW before taper.
3. Target SOC <= start SOC must be invalid.

## Supporting article structure

1. EV charging time calculator
2. How long does an EV take to charge?
3. EV charging time formula
4. AC vs DC charging time
5. Why vehicle maximum charging power matters
6. Why DC charging slows at high SOC
7. Charging from 20% to 80%
8. EV charging examples
9. Related EV calculators

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

- No EV model database
- Generic DC taper is not a vehicle-specific charging curve
- Temperature and battery conditioning can change real charging speed

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
