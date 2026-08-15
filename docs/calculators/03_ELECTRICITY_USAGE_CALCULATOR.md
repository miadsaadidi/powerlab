# Electricity Usage Calculator — Build Specification

## Route

`/home-energy/electricity-usage-calculator`

## Release phase

**Phase 1.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Calculate household or appliance electricity consumption using watts/time, kWh/cycle or energy-label consumption, and build the shared Energy Profile.

## User intent

> How much electricity do my appliances or my home use?

## SEO target

- **Primary:** `electricity usage calculator`
- **Planner volume:** ~50,000/month
- **Planner advertiser competition:** Low (index 4)
- **Organic competition (2026-08-10 SERP review):** Medium
- **Validated secondary keywords:**
  - `energy consumption calculator` — ~50,000/month
  - `power consumption calculator` — ~5,000/month
  - `electricity cost calculator` — ~5,000/month
  - `appliance energy calculator` — ~500/month
  - `appliance running cost calculator` — ~500/month
- **Supporting same-intent phrases (no independent volume claim):**
  - `electricity consumption calculator`
  - `home electricity usage calculator`
  - `appliance electricity usage calculator`
  - `kWh usage calculator`
  - `power usage calculator`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `Electricity Usage Calculator — kWh by Appliance & Home`
- **Meta description:** `Calculate daily, monthly and yearly electricity usage from appliance watts, runtime, kWh per cycle or energy-label data. Compare appliances and essential loads.`
- **H1:** `Electricity Usage Calculator`
- **Canonical:** self-canonical to `/home-energy/electricity-usage-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Many competitors make users know watts and hours first. Our value is to accept the information they actually have: a common appliance preset, kWh-per-cycle, or an energy-label kWh period. A dynamic home builder plus top-contributor and what-if views creates more value without national-average or tariff databases.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Input mode: **Appliance preset / watts + time**.
- Appliance: **LED TV**.
- Running power: **100 W**.
- Quantity: **1**.
- Runtime: **4 h/day**.
- Days/week: **7**.
- Cost: optional; if no saved rate exists, show **0.20 / kWh** only after cost is enabled and label it `Example — replace with your rate`.

## Quick Mode UX

Provide two top-level choices:

1. **Single appliance** — fastest path.
2. **Build my home** — dynamic list reusing the shared appliance picker.

For each entry support three source modes:
- watts × runtime;
- kWh per cycle × cycles;
- label energy (`kWh/year` or `kWh/month`).

Preset watts fill automatically but stay editable. Cycling appliances should prefer label kWh if the user has it.

## Advanced settings — collapsed by default

- duty cycle;
- days/week;
- uses/day / cycles/week;
- optional electricity price;
- custom billing days.

Do not add country averages, live tariffs or carbon factors.

## Calculation model

```text
watts/time mode:
  dailyKWh = watts × quantity × hoursPerDay × dutyCycle / 1000
  annualKWh = dailyKWh × daysPerWeek / 7 × 365

kWh/cycle mode:
  annualKWh = kWhPerCycle × cyclesPerWeek × 52

label mode:
  normalize supplied kWh/month or kWh/year directly

monthlyKWh = annualKWh / 12
optionalCost = energyKWh × userPricePerKWh
```

Keep the user's supplied label-energy value authoritative over generic watt presets.

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Daily, monthly and annual kWh.
- Optional daily/monthly/annual cost.
- In Build-my-home mode: total kWh and contribution share by appliance/category.
- Top 3 energy contributors based only on the user's entries.
- Data-source badge per row: preset, user-entered watts, cycle energy, or label energy.

## High-value comparison — no extra required input

For the largest adjustable load, show a **What if I use it 1 hour less per day?** result when that mode is mathematically applicable. Also show current total vs `-10% usage` as a simple whole-profile comparison.

## Required static data and defaults

Reuse the exhaustive shared appliance array. Starter single-appliance preset: LED TV `100 W`, `4 h/day`. `AVERAGE_DAYS_PER_MONTH = 365.25/12` may be used for display normalization. Prices are user-entered; example `0.20` is demo state only.

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

- **Size a home backup battery** → Home Battery Size, carrying calculated daily/monthly energy.
- **Build a solar load profile** → Solar Load, carrying selected appliances.
- **See what these appliances need from a battery** → Battery Runtime when appropriate.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

1. `100 W` TV × `4 h/day` → `0.4 kWh/day`, about `12.17 kWh/month`, `146 kWh/year`.
2. At example price `0.20/kWh`, monthly cost ≈ `2.44`.
3. A label input of `365 kWh/year` must remain `365 kWh/year` regardless of preset watts.
4. Build-my-home contributor percentages must sum to approximately 100% after display rounding.

## Supporting article structure

1. Electricity usage calculator
2. How to calculate electricity usage
3. Watts to kWh
4. Appliance energy per cycle
5. Using annual energy-label data
6. Which appliances use the most electricity?
7. Essential loads for backup power
8. Electricity usage examples
9. Related home energy calculators

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

- Generic appliance wattages are editable starting estimates
- Cycling appliances are better represented by label kWh when available
- This page is not a full utility-bill model

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
