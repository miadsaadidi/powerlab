# Battery Size Calculator — Build Specification

## Route

`/battery/battery-size-calculator`

## Release phase

**Phase 1.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Size nominal battery energy and Ah capacity for a known load and desired runtime with reserve, health, conversion losses and planning margin.

## User intent

> What battery capacity do I need to power this load for this amount of time?

## SEO target

- **Primary:** `battery size calculator`
- **Planner volume:** ~500/month
- **Planner advertiser competition:** Low (index 21)
- **Organic competition (2026-08-10 SERP review):** Medium
- **Validated secondary keywords:**
  - `backup battery calculator` — ~5,000/month
  - `battery capacity calculation for inverter` — ~500/month
  - `lithium battery size calculator` — ~50/month
- **Supporting same-intent phrases (no independent volume claim):**
  - `battery sizing calculator`
  - `how big a battery do i need`
  - `backup battery size calculator`
  - `battery capacity for inverter`
  - `battery kWh size calculator`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `Battery Size Calculator — kWh & Ah for Backup Power`
- **Meta description:** `Calculate the battery size needed for a load and backup time. Estimate minimum and recommended kWh and Ah with reserve, efficiency and battery-health assumptions.`
- **H1:** `Battery Size Calculator`
- **Canonical:** self-canonical to `/battery/battery-size-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Competitor tools often require voltage before the visitor knows why. Our Quick Mode asks only the actual job: **load watts + desired runtime + battery type**. We return kWh first and show Ah equivalents at common voltages automatically, reducing required knowledge while preserving technical depth under Advanced.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Load: **500 W** AC.
- Desired runtime: **4 h**.
- Chemistry: **LiFePO4 / LFP**.
- Starting SOC: **100%**.
- Minimum SOC: **20%**.
- Inverter efficiency: **90%**.
- Battery health: **100%**.
- Design margin: **10%**.
- Voltage: not required in Quick Mode.

## Quick Mode UX

- Load watts/kW.
- Desired runtime with `minutes | hours`.
- Battery chemistry.
- Optional `Use appliances instead` using the same dynamic appliance picker as Battery Runtime.
- Return required kWh before asking for voltage.
- Show automatic Ah equivalents at **12 V / 24 V / 48 V**, and allow custom voltage if the user wants one highlighted.

## Advanced settings — collapsed by default

- starting SOC and minimum SOC;
- inverter/DC conversion efficiency;
- battery health;
- design margin;
- selected system voltage;
- custom chemistry assumptions.

Do not introduce C-rate, temperature or cabling into the main sizing path.

## Calculation model

```text
loadEnergyWh = averageLoadW × runtimeHours
conversionAdjustedWh = loadEnergyWh / conversionEfficiency
usableSocWindow = max(0, startingSoc - minimumSoc)
minimumNominalWh = conversionAdjustedWh / (usableSocWindow × batteryHealth)
recommendedNominalWh = minimumNominalWh × (1 + designMargin)
AhAtVoltage = recommendedNominalWh / voltage
```

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Required load energy.
- Minimum nominal battery kWh.
- Recommended battery kWh including margin.
- Ah equivalents at 12/24/48 V.
- Assumptions summary.
- If appliance mode is used: average vs connected load distinction.

## High-value comparison — no extra required input

Show recommended battery capacity for approximately **2 h / 4 h / 8 h** runtimes, centering on the user's current runtime when practical.

## Required static data and defaults

Chemistry defaults from shared data; common voltage reference table `12/24/48 V`; design margin default `10%`; inverter efficiency `90%`. Do not maintain product/module catalog.

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

- **Verify this battery's runtime** → Battery Runtime, carrying recommended capacity, load and assumptions.
- Appliance mode can reuse the local Energy Profile.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

1. `500 W × 4 h` = `2000 Wh` load energy. At 90% inverter, 80% usable SOC and 100% health → minimum nominal ≈ `2777.8 Wh`; with 10% margin → **3055.6 Wh ≈ 3.06 kWh**.
2. At 12 V that recommendation ≈ **254.6 Ah**; at 24 V ≈ 127.3 Ah; at 48 V ≈ 63.7 Ah.
3. Doubling runtime at identical assumptions must double required energy.

## Supporting article structure

1. Battery size calculator
2. How to size a battery for backup power
3. Battery kWh vs Ah
4. Battery size formula
5. How reserve and depth of discharge affect sizing
6. Battery size for an inverter
7. LiFePO4 vs lead-acid sizing assumptions
8. Battery sizing examples
9. Related battery calculators

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

- Planning estimate, not battery/inverter installation design
- Do not double-count reserve and depth of discharge
- Module count requires user-entered module specifications for product-level accuracy

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
