# Portable Power Station Calculator — Build Specification

## Route

`/battery/portable-power-station-calculator`

## Release phase

**Phase 4.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Estimate portable power-station runtime for appliances or the station capacity needed for a desired runtime.

## User intent

> Can this portable power station run my devices, and for how long?

## SEO target

- **Primary:** `portable power station calculator`
- **Planner volume:** ~500/month
- **Planner advertiser competition:** Low (index 18)
- **Organic competition (2026-08-10 SERP review):** Medium
- **Validated secondary keywords:** none separately reported in the current Planner master.
- **Supporting same-intent phrases (no independent volume claim):**
  - `portable power station runtime calculator`
  - `power station battery calculator`
  - `portable battery runtime calculator`
  - `power station size calculator`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `Portable Power Station Calculator — Runtime & Capacity`
- **Meta description:** `Estimate portable power station runtime from Wh capacity and appliance load, or calculate the capacity needed for a target runtime. Check AC output limits.`
- **H1:** `Portable Power Station Calculator`
- **Canonical:** self-canonical to `/battery/portable-power-station-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Competitors often become product finders. Stay brand-neutral and answer two jobs with the same deterministic engine: **How long will mine last?** and **What capacity do I need?**. Appliance presets, output-limit warnings and runtime sensitivity create strong value without a model database.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

Default mode: **How long will mine last?**
- Capacity: **1024 Wh**.
- Continuous AC output: **1800 W**.
- Load: **100 W AC**.
- AC efficiency: **90%**.
- Reserve: **5%**.
- Battery health: **100%**.

## Quick Mode UX

Mode selector:
- `Runtime from my power station` (default)
- `Capacity needed for my runtime`

Runtime mode asks capacity Wh and load W; continuous output is optional but recommended. Capacity mode asks load and desired runtime. Both can switch to dynamic appliance mode.

## Advanced settings — collapsed by default

- continuous output limit;
- optional surge output limit;
- AC/DC efficiency;
- reserve;
- battery health;
- appliance duty/surge details.

Do not add brand/model selection, shopping recommendations or solar recharge on this page.

## Calculation model

```text
usableWh = capacityWh × (1 - reserveFraction) × batteryHealth
runtimeHours = usableWh × outputEfficiency / averageLoadW

capacityNeededWh = loadW × desiredRuntimeHours / outputEfficiency / ((1-reserve)×health)

if continuousOutputKnown and connectedRunningW > continuousOutput:
  show output-limit warning
```

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Runtime or required capacity as primary.
- Usable/delivered energy breakdown.
- Connected load vs continuous output capability.
- Optional surge check when enough data exists.

## High-value comparison — no extra required input

Runtime mode: show runtime at **50% / 100% / 150%** current load. Capacity mode: show required Wh for **half / current / double** desired runtime.

## Required static data and defaults

Power-station generic presets: capacity `1024 Wh`, AC output `1800 W`, AC efficiency `90%`, reserve `5%`, health100. Reuse appliance library. No product catalog.

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

- **Build an appliance energy profile** → Electricity Usage.
- **Plan off-grid solar loads** → Solar Load.
- Link to Battery Runtime only as a related battery concept, not as a required workflow.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

`1024 Wh × 95% reserve window × 100% health × 90% AC efficiency = 875.52 Wh` delivered. At `100 W` → **8.755 h ≈ 8 h 45 min**. If continuous output is 800 W and connected load is 1000 W, warn before presenting a normal runtime.

## Supporting article structure

1. Portable power station calculator
2. How long will a power station run an appliance?
3. Wh capacity and usable energy
4. AC inverter losses
5. Power station size for a desired runtime
6. Portable power station examples
7. Related battery calculators

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

- No product catalog
- Manufacturer inverter behavior and surge limits vary
- Generic capacity/output presets are editable

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
