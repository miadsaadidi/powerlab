# Solar Panel Output Calculator — Build Specification

## Route

`/solar/solar-panel-output-calculator`

## Release phase

**Phase 2.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Estimate monthly and annual AC solar production for a system using location-aware PVWatts V8 modeling.

## User intent

> How much electricity will my solar panel system produce at this location and orientation?

## SEO target

- **Primary:** `solar panel output calculator`
- **Planner volume:** ~5,000/month
- **Planner advertiser competition:** Low (index 9)
- **Organic competition (2026-08-10 SERP review):** Medium
- **Validated secondary keywords:**
  - `solar production calculator` — ~5,000/month
  - `solar panel wattage calculator` — ~5,000/month
  - `solar panel production calculator` — ~500/month
- **Supporting same-intent phrases (no independent volume claim):**
  - `solar output calculator`
  - `solar energy production calculator`
  - `PV production calculator`
  - `solar panel kWh calculator`
  - `solar system output calculator`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `Solar Panel Output Calculator — Estimate kWh Production`
- **Meta description:** `Estimate monthly and annual solar panel output from system size, location, tilt, azimuth and losses using a location-aware solar production model.`
- **H1:** `Solar Panel Output Calculator`
- **Canonical:** self-canonical to `/solar/solar-panel-output-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Simple competitors multiply panel watts by sun hours; our defensible advantage is location-aware PVWatts production with a fast system-size input. The user should not have to know peak-sun-hours. Show the monthly shape, specific yield and best/worst month, while keeping tilt optimization on the dedicated Tilt tool.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- System input mode: **System size**.
- System size: **5 kW**.
- Location: `Use my location`; before location is supplied, keep the API result pending rather than inventing production.
- Tilt: derive latitude starting point.
- Azimuth: equator-facing.
- Module: Standard.
- Array: Fixed Roof Mounted.
- Losses: **14%**.
- DC/AC ratio: `1.2`; inverter efficiency `96%`.

## Quick Mode UX

- `Use my location` + manual lat/lon fallback.
- Choose input mode: `System size kW` (default) or `Panels × watts`.
- Panel mode defaults to editable **10 × 400 W** only when selected.
- Tilt/orientation are prefilled from location and editable compactly.
- No peak-sun-hours input in the primary path.

## Advanced settings — collapsed by default

- PVWatts module type;
- array type;
- losses;
- DC/AC ratio;
- inverter efficiency;
- exact tilt/azimuth.

Do not duplicate the bounded angle optimizer from Solar Panel Tilt.

## Calculation model

```text
if panel mode:
  systemCapacityKw = panelCount × panelWatts / 1000

PVWatts V8 returns normalized monthly/annual AC model outputs.

specificYieldKWhPerKwYear = annualAcKWh / systemCapacityKw
averageDailyKWh = annualAcKWh / 365
bestMonth = max(monthlyAcKWh)
worstMonth = min(monthlyAcKWh)
```

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Annual AC production kWh.
- Average daily production.
- Monthly kWh table/chart using existing chart infra only.
- Best and lowest production month.
- Specific yield `kWh/kW-year`.
- Capacity factor if provided/derived consistently from PVWatts.
- External-model assumptions and station/weather-data metadata where useful.

## High-value comparison — no extra required input

If the local Energy Profile contains consumption, show **Your modeled solar production vs your saved electricity use** as a coverage percentage. Never make consumption a required field.

## Required static data and defaults

PVWatts defaults from shared data. System presets `0.5–20 kW`; panel watt presets `250–600 W`, default `400 W` in panel mode. No solar-panel model catalog.

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

- **Improve/compare the panel angle** → Solar Panel Tilt.
- **How large a system do I need?** → Solar Panel Size, carrying location and yield context.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

1. Mock PVWatts annual AC `7500 kWh` for `5 kW` → specific yield **1500 kWh/kW-year**, daily average ≈ **20.55 kWh/day**.
2. `10 × 400 W` panel mode → system capacity **4.0 kW**.
3. API failure must not fabricate a kWh production value; show retry/manual-simple-estimate path only if explicitly implemented.

## Supporting article structure

1. Solar panel output calculator
2. How much electricity do solar panels produce?
3. Solar production by month
4. How tilt and azimuth affect output
5. Solar system losses
6. kW vs kWh
7. How the PVWatts estimate works
8. Solar output examples
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

- Historical/model weather estimate, not a production guarantee
- Shading is not fully modeled unless represented in the supplied losses/model inputs
- No financial savings unless user separately enters price

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
