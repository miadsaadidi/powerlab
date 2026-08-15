# Solar Panel Tilt Calculator — Build Specification

## Route

`/solar/solar-panel-tilt-calculator`

## Release phase

**Phase 1.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Give an instant latitude-based tilt starting point and, when requested, compare roof tilt/orientation scenarios with location-aware PVWatts production estimates.

## User intent

> What tilt/angle should I use for solar panels at my location, and is changing my current roof angle worth it?

## SEO target

- **Primary:** `solar panel tilt calculator`
- **Planner volume:** ~5,000/month
- **Planner advertiser competition:** Low (index 0)
- **Organic competition (2026-08-10 SERP review):** Medium
- **Validated secondary keywords:**
  - `solar panel angle calculator` — ~5,000/month
- **Supporting same-intent phrases (no independent volume claim):**
  - `solar tilt angle calculator`
  - `optimal solar panel angle calculator`
  - `best solar panel angle calculator`
  - `solar panel inclination calculator`
  - `solar angle calculator`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `Solar Panel Tilt Calculator — Find the Best Angle`
- **Meta description:** `Calculate a solar panel tilt starting point from your location, then compare roof angles with modeled annual and monthly solar production.`
- **H1:** `Solar Panel Tilt Calculator`
- **Canonical:** self-canonical to `/solar/solar-panel-tilt-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Competitors commonly stop at a latitude-derived angle or monthly angle table. Our higher-value path is: instant local starting angle first, then an optional **Compare my roof** production comparison using PVWatts so the user can judge whether changing tilt/orientation materially changes modeled annual output. Do not turn this into installation or ROI advice.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Location: offer **Use my location** first; no permission request until clicked.
- If no location yet, show an editable **34° latitude example** explicitly labeled `Example`.
- Suggested annual tilt: derived from latitude.
- Compare-my-roof: **Off** initially.
- Example roof tilt when comparison is enabled: **30°**.
- Orientation: equator-facing derived from hemisphere.
- Normalized comparison system: **1 kW**.
- PVWatts losses: **14%**; Standard module; Fixed Roof Mounted; DC/AC `1.2`; inverter `96%`.

## Quick Mode UX

- `Use my location` button using browser geolocation.
- Manual latitude/longitude fallback.
- Show instant **year-round starting tilt** locally without waiting for API.
- Show three simple angle cards: `Summer`, `Year-round`, `Winter` as explicitly labeled heuristic starting points. Keep the annual value primary.
- Optional **Compare my roof** toggle reveals current roof tilt and orientation; orientation can be N/E/S/W buttons with exact degrees under Advanced.
- Production comparison uses a normalized 1 kW system so the user does not need to know their system size.

## Advanced settings — collapsed by default

- exact azimuth degrees;
- actual system size if the user wants total kWh rather than kWh/kW;
- PVWatts module type, array type, losses, DC/AC ratio, inverter efficiency;
- bounded candidate-search controls only if needed for debugging/advanced use.

## Calculation model

```text
annualStartingTilt = clamp(abs(latitude), 0, 90)
equatorFacingAzimuth = latitude >= 0 ? 180 : 0

seasonal heuristic cards (clearly labeled):
  summer = clamp(abs(latitude) - 15, 0, 90)
  yearRound = annualStartingTilt
  winter = clamp(abs(latitude) + 15, 0, 90)

PVWatts comparison:
  current = annual AC kWh for current tilt/azimuth on normalized 1 kW
  candidate = annual AC kWh for selected/recommended scenario
  deltaPercent = (candidate - current) / current × 100
```

The ±15° seasonal values are convenience heuristics, not universal optima. The model comparison is the stronger result.

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Primary annual starting tilt in degrees.
- Equator-facing orientation suggestion.
- Summer / annual / winter heuristic cards.
- If Compare my roof is enabled: current vs recommended modeled `kWh/kW-year`, absolute delta, percentage delta and monthly comparison.
- Plain-language impact label derived only from modeled delta (e.g. small/moderate/larger difference), with thresholds documented in code rather than presented as certainty.

## High-value comparison — no extra required input

When roof comparison is enabled, show **Current roof vs recommended** without any extra required field. Use normalized 1 kW output; if actual system size is entered, also show total annual kWh.

## Required static data and defaults

Use PVWatts V8 constants from shared data: Standard module `0`, Fixed Roof Mounted `1`, losses `14%`, DC/AC `1.2`, inverter `96%`, GCR `0.4`. Angle limits `0–90°`, azimuth `0–<360°`. No city-angle database is required.

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

- **Estimate production at this angle** → Solar Panel Output, carrying location/tilt/azimuth.
- **Size a system for my usage** → Solar Panel Size, carrying location and modeled yield context.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

1. Latitude `34°` → local annual starting tilt **34°** and north-hemisphere equator-facing azimuth **180°**.
2. Latitude `-33°` → annual starting tilt **33°**, azimuth **0°**.
3. Mock PVWatts current output `7200 kWh` and candidate `7500 kWh` → delta **+4.17%**.
4. PVWatts failure must not remove the local tilt result; only modeled production comparison becomes unavailable.

## Supporting article structure

1. Solar panel tilt calculator
2. What solar panel angle should I use?
3. How latitude affects solar panel tilt
4. Tilt vs azimuth
5. Is changing your roof angle worth it?
6. How the production comparison works
7. Seasonal vs year-round angle
8. Limitations of solar tilt estimates
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

- Production modeling is an estimate based on historical/model weather data
- Do not present structural or installation advice
- Do not claim the simple latitude rule is exact optimization

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
