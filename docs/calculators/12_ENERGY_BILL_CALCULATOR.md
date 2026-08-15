# Energy Bill Calculator — Build Specification

## Route

`/home-energy/energy-bill-calculator`

## Release phase

**Phase 3.** The specification is complete now so implementation is predictable. The route must not be exposed as an indexable empty/placeholder page before its release gate passes.

## Product job

Estimate an electricity bill from user-entered energy use and user-entered price components without maintaining a tariff database.

## User intent

> Given my kWh usage and my electricity price, what might my bill be?

## SEO target

- **Primary:** `energy bill calculator`
- **Planner volume:** ~50,000/month
- **Planner advertiser competition:** Low (index 1)
- **Organic competition (2026-08-10 SERP review):** High
- **Validated secondary keywords:**
  - `electric bill estimator` — ~5,000/month
- **Supporting same-intent phrases (no independent volume claim):**
  - `electric bill estimator`
  - `electricity bill estimator`
  - `power bill calculator`
  - `monthly electricity cost calculator`
- **Rule:** secondary/supporting variants stay on this canonical route unless a later live SERP review proves a distinct task.

### Search metadata

- **SEO title:** `Energy Bill Calculator — Estimate Electricity Cost`
- **Meta description:** `Estimate an electricity bill from kWh usage and your own electricity price. Add optional fixed charges and tax without relying on an outdated tariff database.`
- **H1:** `Energy Bill Calculator`
- **Canonical:** self-canonical to `/home-energy/energy-bill-calculator`

## Page type

Calculator-first utility page with server-rendered supporting content. The calculator is the main value; the explanatory article supports comprehension, trust, SEO and generative-search retrieval.

## UX value strategy — competitor-informed

Competitors split between kWh×rate and meter-reading calculators. We should support both with one simple mode switch. The differentiator is a transparent bill breakdown and savings what-if, without a tariff database, national averages, or unrelated carbon calculations.

### Autofill rule

Never ship a blank first-load calculator. Use the starter state below so a visitor can press **Calculate** immediately. Presets are editable convenience values, not claims about the visitor's equipment. If a value can be reused from the local Energy Profile, prefer the user's saved value over the generic starter value.

## Default first-load state

- Mode: **Monthly usage**.
- Usage: **300 kWh/month**.
- Electricity price: use saved local rate if available; otherwise **0.20 / kWh** labeled `Example — replace with your rate`.
- Fixed charge: **0**.
- Tax: **0%**.
- Currency: local saved/locale preference if available, otherwise USD display only; never infer a tariff from currency.

## Quick Mode UX

Mode selector:
1. `Monthly usage` — kWh + price/kWh.
2. `Meter readings` — previous reading, current reading, billing period, price/kWh.

Show optional fixed charge inline but keep standing-charge/tax details under Advanced unless already used.

## Advanced settings — collapsed by default

- fixed monthly charge;
- daily standing charge;
- tax percentage;
- optional manually entered peak/off-peak split only if explicitly enabled.

Do not store live tariffs or implement tiered/TOU plans by country in Phase 1.

## Calculation model

```text
usageMode:
  energyCharge = monthlyKWh × pricePerKWh

meterMode:
  periodKWh = currentReading - previousReading
  energyCharge = periodKWh × pricePerKWh

standingCharge = dailyStandingCharge × billingDays
subtotal = energyCharge + fixedCharge + standingCharge
tax = subtotal × taxPercent
total = subtotal + tax
```

Calculation code belongs in a pure TypeScript engine, not React components. Normalize units internally and round only for display.

## Required outputs

- Estimated bill for selected period.
- Energy charge vs fixed/standing/tax breakdown.
- Daily average kWh and cost where period is known.
- Annualized estimate only when the supplied period supports a reasonable normalization, clearly labeled estimate.

## High-value comparison — no extra required input

Show estimated bill at **current usage / 10% less / 20% less**, without claiming these reductions are recommendations.

## Required static data and defaults

No tariff dataset. Price default is `null` in shared data; UI may use demo `0.20` only as an explicitly marked example if no local user rate exists. Fixed charge `0`, tax `0`.

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

- **Find which appliances are driving usage** → Electricity Usage, carrying monthly kWh/rate when useful.

Handoffs require explicit user action such as **Use this result in …**. Do not silently mutate another calculator's stored inputs.

## Concrete acceptance fixtures

1. `300 kWh × 0.20` with no fixed charge/tax → **60.00**.
2. Meter readings `12,000 → 12,300` → `300 kWh`.
3. Current reading lower than previous must be rejected unless a future meter-rollover mode is intentionally added.

## Supporting article structure

1. Energy bill calculator
2. How to calculate an electricity bill
3. kWh and price per kWh
4. Fixed charges and taxes
5. Electric bill estimate example
6. Why your utility bill may differ
7. Related home energy calculators

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

- No country/provider tariff database
- No automatic tier/time-of-use model in initial version
- Taxes/fees vary; user-entered values control the estimate

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
