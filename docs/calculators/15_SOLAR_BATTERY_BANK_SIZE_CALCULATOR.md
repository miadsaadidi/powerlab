# Solar Battery Bank Size Calculator — Build Specification

## Route

`/solar/solar-battery-bank-size-calculator`

## Release phase

**Phase 3.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Estimate a solar/off-grid battery bank from daily load energy, autonomy days, usable battery fraction, conversion efficiency, health and design margin.

## User intent

> How large should my battery bank be for my solar loads and desired autonomy?

## SEO target

- **Primary:** `solar battery calculator`
- **Planner volume:** ~5,000/month
- **Planner advertiser competition:** Low (index 23)
- **Organic competition (2026-08-10 SERP review):** High / mixed
- **Validated secondary keywords:**
  - `calculating solar battery bank size` — ~50/month
- **Supporting same-intent phrases (no independent volume claim):**
  - `solar battery bank size calculator`
  - `solar battery sizing calculator`
  - `solar battery capacity calculator`
  - `off grid battery bank calculator`
  - `calculate solar battery bank size`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `Solar Battery Calculator — Size a Battery Bank`
- **Meta description:** `Estimate solar battery bank size from daily energy use, autonomy days, battery chemistry, reserve and inverter efficiency. Get kWh and Ah planning capacity.`
- **H1:** `Solar Battery Bank Size Calculator`
- **Canonical:** self-canonical to `/solar/solar-battery-bank-size-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Competitors commonly expose daily energy, autonomy, voltage and DoD. Keep that simple core, but make kWh the primary answer and calculate Ah references automatically. The valuable cross-tool question is whether the solar array can refill the bank; answer that through an explicit handoff to Solar Output instead of adding irradiance complexity here.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Daily load: **5 kWh/day**.
- Autonomy: **1 day**.
- Chemistry: **LiFePO4 / LFP**.
- System voltage: **48 V**.
- Minimum SOC/reserve: **20%**.
- Inverter efficiency: **90%**.
- Battery health: **100%**.
- Design margin: **10%**.

## Quick Mode UX

- Daily energy use kWh/day.
- Autonomy chips: `1 | 2 | 3 days`, plus custom.
- Chemistry.
- System voltage (default 48 V) mainly for Ah display; kWh remains primary.
- Allow a direct handoff from Solar Load/Home Energy Profile so users do not need to retype daily use.

## Advanced settings — collapsed by default

- reserve/minimum SOC;
- inverter efficiency;
- battery health;
- design margin;
- optional battery-module voltage + Ah for whole-module planning.

Do not add sun hours, panel wattage, cable or charge-controller sizing.

## Calculation model

```text
loadEnergyKWh = dailyLoadKWh × autonomyDays
minimumNominalKWh = loadEnergyKWh / (inverterEfficiency × usableSocWindow × batteryHealth)
recommendedKWh = minimumNominalKWh × (1 + designMargin)
AhAtVoltage = recommendedKWh × 1000 / systemVoltage
```

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Required load energy for autonomy period.
- Minimum and recommended nominal kWh.
- Ah at selected voltage plus 12/24/48 V reference equivalents.
- Optional whole-module count only if module mode is enabled.

## High-value comparison — no extra required input

Show recommended bank size for **1 / 2 / 3 days** autonomy at current load/assumptions.

## Required static data and defaults

Daily load default `5 kWh`, autonomy `1 day`, LFP usable `80%`, inverter `90%`, health100, margin10, voltage48. Optional module presets are examples only, not a catalog.

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

- **Can my solar array refill this battery?** → Solar Panel Output, carrying daily recharge requirement.
- **Build my load profile** → Solar Load.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

`5 kWh/day × 1 day`, 90% inverter, 80% usable, health100 → minimum `6.944 kWh`; ×1.10 margin → **7.639 kWh**. At 48 V → **159.1 Ah**.

## Supporting article structure

1. Solar battery calculator
2. How to size a solar battery bank
3. Daily solar load and autonomy days
4. Battery bank kWh and Ah
5. Depth of discharge and reserve
6. Solar battery sizing example
7. Solar generation vs battery storage
8. Related solar calculators

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

- Does not perform full off-grid electrical/inverter/wiring design
- Solar generation variability is separate from stored-energy requirement unless modeled through connected solar tools
- Planning estimate only

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
