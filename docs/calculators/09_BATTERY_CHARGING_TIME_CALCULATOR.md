# Battery Charging Time Calculator — Build Specification

## Route

`/battery/battery-charging-time-calculator`

## Release phase

**Phase 2.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Estimate ideal and adjusted battery charging time from capacity, SOC change, charger current/power, voltage, efficiency and chemistry.

## User intent

> How long will this charger take to charge my battery from one SOC to another?

## SEO target

- **Primary:** `battery charging time calculator`
- **Planner volume:** ~5,000/month
- **Planner advertiser competition:** Low (index 0)
- **Organic competition (2026-08-10 SERP review):** Medium–High
- **Validated secondary keywords:** none separately reported in the current Planner master.
- **Supporting same-intent phrases (no independent volume claim):**
  - `battery charge time calculator`
  - `battery recharge time calculator`
  - `Ah charging time calculator`
  - `battery charger time calculator`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `Battery Charging Time Calculator — Estimate Charge Time`
- **Meta description:** `Estimate battery charging time from Ah or Wh, voltage, charger current or power, start/target charge and charging efficiency, with transparent chemistry assumptions.`
- **H1:** `Battery Charging Time Calculator`
- **Canonical:** self-canonical to `/battery/battery-charging-time-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Competitors work best when they let the user choose capacity/current or energy/power. We should support both paths and show ideal vs adjusted planning time, rather than burying the visitor in chemistry-specific charge curves. A charger-current comparison answers the natural “what if I use a bigger charger?” question.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Mode: **Ah + charger amps**.
- Battery: **100 Ah**.
- Voltage: **12.8 V**.
- Chemistry: **LiFePO4 / LFP**.
- Start SOC: **20%**.
- Target SOC: **100%**.
- Charger current: **20 A**.
- Charge efficiency: **99%**.
- Simple planning overhead: **1.05×** for lithium, clearly labeled heuristic.

## Quick Mode UX

Two input modes:
- `Ah + charger amps` (default)
- `Wh/kWh + charger watts`

Target SOC shortcut chips: `80% | 90% | 100%`. Show the selected chemistry but hide efficiency/taper details until Advanced.

## Advanced settings — collapsed by default

- voltage (when needed);
- charge efficiency;
- editable/disable simple taper-overhead factor;
- battery max charge current/power if known;
- charger max/current limits.

Do not fake a precise CC/CV or absorption curve.

## Calculation model

```text
Ah mode:
  chargeAh = capacityAh × (targetSoc - startSoc)
  effectiveCurrent = minKnown(chargerCurrentA, batteryMaxChargeA)
  idealHours = chargeAh / effectiveCurrent
  adjustedHours = idealHours / chargeEfficiency × overheadFactor

Wh mode:
  energyToAddWh = capacityWh × (targetSoc - startSoc)
  effectivePower = minKnown(chargerPowerW, batteryMaxChargePowerW)
  idealHours = energyToAddWh / effectivePower
  adjustedHours = idealHours / chargeEfficiency × overheadFactor
```

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Adjusted estimated charge time as primary.
- Ideal constant-current/power time.
- Ah or Wh/kWh to add.
- Effective charger current/power after known caps.
- Assumptions/heuristic factor shown explicitly.

## High-value comparison — no extra required input

In Ah mode compare **10 A / 20 A / 40 A** (or sensible values around the user input). In power mode compare approximately **50% / 100% / 200%** current charger power, respecting known battery limits.

## Required static data and defaults

Shared charging defaults: LFP charge efficiency `99%`; generic optional planning overhead `1.05` lithium and `1.15` lead-acid. These overheads are application heuristics and must be editable/disableable.

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

- **Convert/check my battery capacity** → Battery Capacity.
- **Estimate runtime after charging** → Battery Runtime.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

1. `100 Ah`, 20→100% = `80 Ah` to add. At `20 A`, ideal `4 h`; at 99% efficiency and 1.05 overhead → about **4.24 h**.
2. Target <= start is invalid.
3. If battery max charge current is 10 A and charger is 20 A, calculate with 10 A and show the limiting factor.

## Supporting article structure

1. Battery charging time calculator
2. Battery charging time formula
3. Charging a battery from Ah and amps
4. Charging efficiency
5. Why charging slows near full
6. Lead-acid vs lithium charging estimates
7. Battery charging examples
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

- Real chargers reduce current during later charging stages
- BMS and manufacturer charge-current limits override generic calculation
- No charging-procedure or wiring instructions

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
