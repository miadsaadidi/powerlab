# EV Charging Cost Calculator — Build Specification

## Route

`/ev/ev-charging-cost-calculator`

## Release phase

**Phase 3.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Estimate the cost of an EV charging session from battery/SOC energy need, charging efficiency and the user’s own electricity price.

## User intent

> How much will it cost to charge my EV for this session?

## SEO target

- **Primary:** `ev charging cost calculator`
- **Planner volume:** ~5,000/month
- **Planner advertiser competition:** Low (index 11)
- **Organic competition (2026-08-10 SERP review):** High
- **Validated secondary keywords:**
  - `electric car charging cost calculator` — ~5,000/month
  - `calculate ev charging cost` — ~5,000/month
  - `tesla supercharger cost calculator` — ~500/month
- **Supporting same-intent phrases (no independent volume claim):**
  - `electric car charging cost calculator`
  - `calculate EV charging cost`
  - `cost to charge electric car calculator`
  - `EV cost per charge`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `EV Charging Cost Calculator — Cost per Charge`
- **Meta description:** `Estimate EV charging cost from battery size, start and target charge, charging efficiency and your electricity price per kWh.`
- **H1:** `EV Charging Cost Calculator`
- **Canonical:** self-canonical to `/ev/ev-charging-cost-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Avoid competitor dependence on vehicle and regional-rate databases. Give two clear jobs: **What will this charging session cost?** and **What does my EV cost to drive?**. Charging losses are visible and editable; price remains user-entered.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

Session mode:
- Battery: **60 kWh**.
- Start SOC: **20%**.
- Target SOC: **80%**.
- Charging efficiency: **90%**.
- Electricity price: saved local value if available, else **0.20/kWh** labeled Example.

Driving-cost mode defaults when selected:
- Consumption: **18 kWh/100 km**.
- Distance: **40 km/day**.

## Quick Mode UX

Two tabs:
- `Charging session` (default)
- `Driving cost`

Session asks battery capacity, start/target SOC and price. Charger power is not required to calculate energy cost. Driving asks consumption, distance and price. Support km/mi units.

## Advanced settings — collapsed by default

- charging efficiency;
- currency;
- custom period for driving distance.

Do not add regional tariff lookup, vehicle catalog, subscription/public-charger fee models or demand charges.

## Calculation model

```text
session:
  batteryEnergyAdded = batteryKWh × (targetSoc - startSoc)
  sourceEnergy = batteryEnergyAdded / chargingEfficiency
  sessionCost = sourceEnergy × pricePerKWh

driving:
  batteryEnergy = distanceKm × consumptionKWhPer100Km / 100
  sourceEnergy = batteryEnergy / chargingEfficiency
  cost = sourceEnergy × pricePerKWh
```

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Session cost or driving cost as primary.
- Battery energy vs source/grid energy.
- Cost per 100 km / 100 mi in driving mode.
- Daily/monthly/annualized driving cost when the user provides a daily distance.

## High-value comparison — no extra required input

Show cost at **75% / 100% / 125%** of the user's electricity rate, clearly as scenarios—not live tariff alternatives.

## Required static data and defaults

EV charging efficiency default `90%` for AC planning. Consumption default `18 kWh/100km`. Electricity-rate example `0.20` is not a tariff and must be labeled accordingly.

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

- **How long will this session take?** → EV Charging Time.
- **Compare EV vs fuel cost** → EV Savings, carrying price and EV consumption.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

1. `60 kWh`, 20→80% → 36 kWh to battery. At 90% efficiency → `40 kWh` source energy. At example `0.20/kWh` → **8.00**.
2. Driving: `18 kWh/100km`, `100 km`, 90% → 20 kWh source; at 0.20 → **4.00/100 km**.

## Supporting article structure

1. EV charging cost calculator
2. How much does it cost to charge an EV?
3. EV charging cost formula
4. Home vs public electricity price
5. Charging losses
6. EV charging cost examples
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

- No live charger pricing or tariff database
- Public charger session/time fees must be entered manually
- No vehicle-specific charging-loss database

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
