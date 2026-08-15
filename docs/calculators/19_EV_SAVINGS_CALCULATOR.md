# EV Savings Calculator — Build Specification

## Route

`/ev/ev-savings-calculator`

## Release phase

**Phase 4.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Compare user-entered EV electricity cost with a combustion vehicle fuel cost for the same annual distance.

## User intent

> How much could I save on energy/fuel costs by driving an EV instead of a gasoline/diesel vehicle?

## SEO target

- **Primary:** `ev savings calculator`
- **Planner volume:** ~500/month
- **Planner advertiser competition:** Low (index 6)
- **Organic competition (2026-08-10 SERP review):** High
- **Validated secondary keywords:** none separately reported in the current Planner master.
- **Supporting same-intent phrases (no independent volume claim):**
  - `electric car savings calculator`
  - `EV vs gas savings calculator`
  - `electric vehicle cost savings calculator`
  - `EV fuel savings calculator`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `EV Savings Calculator — Compare Electricity vs Fuel Cost`
- **Meta description:** `Compare EV electricity cost with gasoline or diesel cost using your annual distance, EV consumption, electricity price, fuel economy and fuel price.`
- **H1:** `EV Savings Calculator`
- **Canonical:** self-canonical to `/ev/ev-savings-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

High-value competitors sometimes drift into total-cost-of-ownership. Keep ours precise: compare **energy/fuel operating cost**, with optional maintenance only when the user supplies it. This avoids hidden depreciation/insurance assumptions and keeps the result explainable.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Annual distance: **15,000 km/year**.
- EV consumption: **18 kWh/100 km**.
- Charging efficiency: **90%**.
- Electricity price: saved local rate if available, else **0.20/kWh** labeled Example.
- Fuel vehicle consumption: **7.0 L/100 km**.
- Fuel price: saved local value if available, else **1.50/L** labeled Example.
- Optional maintenance costs: blank.

## Quick Mode UX

- Annual distance with km/mi support.
- EV consumption.
- Electricity price.
- Fuel consumption with `L/100km | km/L | US mpg`.
- Fuel price per liter/gallon.
- Currency selector/preference.

Keep purchase price, tax, insurance and depreciation out of Quick Mode.

## Advanced settings — collapsed by default

- charging efficiency;
- optional annual EV maintenance cost;
- optional annual ICE maintenance cost.

Only include maintenance difference if both relevant values are supplied. Do not infer maintenance savings.

## Calculation model

```text
evBatteryEnergy = annualKm × evKWhPer100Km / 100
evGridEnergy = evBatteryEnergy / chargingEfficiency
evEnergyCost = evGridEnergy × electricityPrice

fuelLiters = annualKm × litersPer100Km / 100
fuelCost = fuelLiters × fuelPricePerLiter

operatingSavings = fuelCost - evEnergyCost
if both maintenance values entered:
  totalComparedSavings = operatingSavings + iceMaintenance - evMaintenance
```

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Annual EV energy cost.
- Annual fuel cost.
- Annual and monthly difference/savings.
- Cost per 100 km / 100 mi for each.
- Energy and fuel quantities used.
- Clear scope label: `Energy/fuel operating-cost comparison` unless optional maintenance is entered.

## High-value comparison — no extra required input

Show EV result at **75% / 100% / 125% electricity price** OR a compact fuel-price sensitivity; choose one to avoid clutter. Prefer electricity-rate scenarios because home charging price is often the user's most editable unknown.

## Required static data and defaults

Default EV consumption `18 kWh/100km`, ICE fuel consumption example `7 L/100km`, efficiency90. Example prices `0.20/kWh` and `1.50/L` are demo inputs only, never current-rate claims.

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

- **Calculate a charging session** → EV Charging Cost.
- **Estimate EV range** → EV Range.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

At `15,000 km/year`: EV battery energy `2700 kWh`; at 90% efficiency grid energy `3000 kWh`; at example `0.20` → **600/year**. Fuel at `7 L/100km` → `1050 L`; at example `1.50` → **1575/year**. Difference → **975/year** in the selected currency example.

## Supporting article structure

1. EV savings calculator
2. EV vs gas fuel cost
3. EV electricity cost per year
4. Fuel cost calculation
5. Cost per 100 km or mile
6. EV savings example
7. What this calculator does not include
8. Related EV calculators

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

- No live electricity/fuel prices
- Does not claim total ownership cost unless all relevant costs are entered
- No automatic depreciation, insurance, tax or maintenance assumptions

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
