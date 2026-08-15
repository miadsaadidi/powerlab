# Solar Panel Size Calculator — Build Specification

## Route

`/solar/solar-panel-size-calculator`

## Release phase

**Phase 2.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Estimate the solar array kW and panel count needed to meet a target energy use at a location using modeled specific solar yield.

## User intent

> How large a solar system, and how many panels, do I need for my energy target?

## SEO target

- **Primary:** `solar panel size calculator`
- **Planner volume:** ~5,000/month
- **Planner advertiser competition:** Low (index 19)
- **Organic competition (2026-08-10 SERP review):** Medium
- **Validated secondary keywords:** none separately reported in the current Planner master.
- **Supporting same-intent phrases (no independent volume claim):**
  - `solar system size calculator`
  - `how many solar panels do i need`
  - `solar array size calculator`
  - `solar panel number calculator`
  - `PV sizing calculator`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `Solar Panel Size Calculator — System kW & Panel Count`
- **Meta description:** `Estimate solar system size and panel count from your energy target, location, panel wattage, tilt and modeled solar yield.`
- **H1:** `Solar Panel Size Calculator`
- **Canonical:** self-canonical to `/solar/solar-panel-size-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Instead of asking users to know peak sun hours, make location-aware PVWatts specific yield the default. The visitor supplies the energy target and panel wattage; we return required array kW and whole-panel count. Keep battery, inverter and installation sizing out of this tool.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Energy target: **300 kWh/month**.
- Location: `Use my location`; no production result until location or manual yield mode is supplied.
- Panel wattage: **400 W**.
- Design margin: **10%**.
- Tilt: latitude-derived.
- Azimuth: equator-facing.
- PVWatts losses: **14%**.

## Quick Mode UX

- Energy target unit selector: `kWh/day | kWh/month | kWh/year`.
- `Use my location` + manual lat/lon.
- Panel wattage preset/editable.
- Use a normalized **1 kW PVWatts run** to derive site-specific yield, then scale.
- Show required kW and whole-panel count immediately after model response.

## Advanced settings — collapsed by default

- tilt/azimuth;
- PVWatts module/array type;
- losses;
- design margin;
- explicit `Manual yield` fallback (`kWh/kW-year`) for users who already know a yield.

Peak-sun-hours can be an explicit manual fallback only, not a hidden universal constant.

## Calculation model

```text
annualTargetKWh = normalize user target to annual
specificYield = PVWatts annualAcKWh for normalized 1 kW system
baseRequiredKw = annualTargetKWh / specificYield
recommendedKw = baseRequiredKw × (1 + designMargin)
panelCount = ceil(recommendedKw × 1000 / panelWatts)
installedKw = panelCount × panelWatts / 1000
coveragePercent = installedKw × specificYield / annualTargetKWh × 100
```

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Base required array kW.
- Recommended array kW with margin.
- Whole panel count and installed kW after rounding up.
- Modeled annual/monthly production for the rounded system.
- Estimated percentage of the entered energy target covered under the model assumptions.

## High-value comparison — no extra required input

Automatically show panel count for **350 W / 400 W / 450 W** modules using the same required array target, highlighting the selected wattage.

## Required static data and defaults

PVWatts defaults; panel watt presets `250–600 W`, default `400 W`; design margin `10%`. No panel model database.

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

- **See monthly production** → Solar Panel Output.
- **Check/compare my panel angle** → Solar Panel Tilt.
- If battery storage is needed, link to Solar Battery Bank rather than adding battery fields here.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

Using a mocked normalized specific yield of `1500 kWh/kW-year`: target `300 kWh/month` = `3600 kWh/year`; base required = `2.4 kW`; with 10% margin = `2.64 kW`; at 400 W/panel → **7 panels = 2.8 kW**. API/model failure must not silently substitute a universal yield.

## Supporting article structure

1. Solar panel size calculator
2. How many solar panels do I need?
3. Solar system size formula
4. Using your electricity usage
5. Panel wattage and panel count
6. Location and solar yield
7. Solar sizing examples
8. Limitations
9. Related solar calculators

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

- Roof area, shading, electrical design and permitting are not sized here
- Panel wattage is user-entered/generic, not a product catalog
- Modeled yield is not a guarantee

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
