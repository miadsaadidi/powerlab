# 09 — Implementation Roadmap

## Phase 0 — Foundation

### Repository

- Next.js App Router;
- TypeScript strict;
- lint/format;
- Vitest;
- Playwright;
- CI;
- Vercel preview/production;
- environment validation.

### Shared UI

Build:

- site header/footer;
- homepage shell;
- category hub shell;
- CalculatorShell;
- Quick/Advanced toggle;
- numeric/unit inputs;
- appliance builder;
- result components;
- assumptions/provenance;
- warnings;
- scenario table/chart;
- related-calculator CTA;
- methodology/sources components.

### Shared domain infrastructure

Build:

- unit conversion library;
- validation library;
- static data modules from `07_INITIAL_DATA_AND_DEFAULTS.md`;
- Energy Profile v1 local store;
- calculator registry;
- metadata helper;
- sitemap/robots;
- analytics adapter.

### Solar provider

Build `/api/solar-production` and PVWatts V8 provider adapter before Solar Tilt modeled comparison is released.

## Phase 1 — Launch calculators

### 1. Battery Runtime

Establish:

- battery domain units/presets;
- load builder reuse;
- result/assumption framework;
- runtime sensitivity;
- Battery Size handoff.

### 2. Solar Panel Tilt

Build:

- geolocation/manual lat/lon;
- instant latitude-based starting estimate;
- roof tilt/azimuth;
- PVWatts comparison;
- bounded candidate search;
- graceful model failure.

### 3. Electricity Usage

Build:

- watts/time;
- kWh/cycle;
- label kWh/month/year;
- appliance builder;
- essential tags;
- Energy Profile;
- optional user-entered flat-rate cost toggle;
- Battery/Home/Solar handoffs.

### 4. Battery Size

Reuse battery/load infrastructure. Build nominal/recommended capacity, Ah conversion, module scenario, Runtime handoff.

### 5. EV Charging Time

Build manual/generic inputs only. Include AC and transparent generic DC taper estimate. No vehicle database.

## Phase 1 site launch gate

Publish:

- homepage;
- four category hubs;
- five calculators;
- methodology;
- sources;
- about/privacy/terms;
- sitemap/robots.

Then:

- verify Search Console;
- submit sitemap;
- inspect individual URLs;
- monitor indexation and Core Web Vitals.

## Phase 2

Revalidate live SERPs immediately before publication, then build:

6. Solar Panel Output
7. UPS Runtime
8. Battery Capacity
9. Battery Charging Time
10. Solar Panel Size
11. UPS Battery Size

Use existing shared engines/data rather than duplicating formulas/components.

## Phase 3

12. Energy Bill
13. EV Charging Cost
14. Home Battery Size
15. Solar Battery Bank Size
16. Solar Load

Price rule remains user-input only. No tariff database.

## Phase 4

17. Portable Power Station
18. EV Range
19. EV Savings
20. Appliance Wattage

## SEO observation/research loop

After every phase:

```text
Search Console data
+ live SERP review
+ user behavior
→ improve existing page first
→ split intent only when justified
```

## Phase 5 — High-Impact Expansion Calculators

Planned expansion tools based on Keyword Planner and SERP research:

### 21. Solar Payback & ROI Calculator
- Calculate break-even years, 25-year net savings, and cash flow timeline without email/phone lead-walls.

### 22. Generator Size Calculator
- Calculate running and starting (surge) watts with sequential inductive motor startup logic for home backup.

### 23. Air Conditioner Running Cost Calculator
- Calculate hourly and monthly cooling costs across window AC, mini-splits, and central systems using SEER2 and compressor duty cycles.

### 24. Heat Pump vs. Gas Cost Calculator
- Compare operating heating bills between electric heat pumps (SCOP/HSPF) and natural gas/propane/oil furnaces (AFUE).

### 25. Space Heater Running Cost Calculator
- Calculate hourly, 8-hour overnight, and monthly electricity costs for 500W–1500W heaters with thermostat duty cycling.

### 26. DC & AC Voltage Drop / Wire Size Calculator
- Size wire gauge (AWG / mm²) for 12V, 24V, 48V, 120V, and 240V circuits to enforce the NEC 3% voltage drop limit.

### 27. Solar Charge Controller / MPPT Sizing Calculator
- Size MPPT/PWM output current and verify cold-weather open-circuit voltage ($V_{oc}$) array limits.

### 28. Inverter Size Calculator
- Calculate required continuous and surge wattage inverter class and DC battery cable ampacity.

### 29. Vehicle-to-Load (V2L / V2H) Runtime Calculator
- Calculate outage duration using EV battery capacity with driving range protection buffers.

### 30. EV Charger Breaker & Wire Sizing Calculator
- Size breaker amperage (20A–100A) and copper wire gauge under the NEC 125% continuous load rule.

## Phase 5.1 — High-Authority Educational Guides & SVG Visualizers (1 Every 2 Days)

Editorial rollout paired with live calculators and interactive SVG circuit diagrams:

- [x] **Day 0 (Aug 25, 2026):** `/guides/voltage-drop-and-wire-size-calculation-guide` (Target: `voltage drop calculation formula` — **74,000/mo**). Includes `<VoltageDropVisualizer />` SVG gradient diagram & NEC Table 8 matrix.
- [ ] **Day 2 (Aug 27, 2026):** `/guides/generator-sizing-and-starting-watts-guide` (Target: `generator sizing guide` — **40,500/mo**). Includes `<GeneratorInrushVisualizer />` SVG surge curve, working paper release on Academia.edu/Zenodo (Ref: `PL-TR-2026-GEN02`), and Academic Outreach Batch #2 (5 emails).
- [ ] **Day 4 (Aug 29, 2026):** `/guides/central-ac-and-heat-pump-electricity-cost-guide` (Target: `air conditioner running cost guide` — **34,300/mo**).
- [ ] **Day 6 (Aug 31, 2026):** `/guides/solar-payback-and-roi-calculation-guide` (Target: `solar payback period formula` — **18,100/mo**).
- [ ] **Day 8 (Sep 2, 2026):** `/guides/space-heater-electricity-cost-and-wattage-guide` (Target: `space heater electricity cost formula` — **18,100/mo**).

## Optional AI phase

AI explanations are not on the critical path.

Only enable after:

- deterministic calculators are stable;
- explanation input schema is minimized;
- failure behavior tested;
- provider cost/latency acceptable.

Do not delay launch for AI.

## Release gate per calculator

- implementation matches calculator spec;
- formulas independently reviewed;
- static defaults reviewed;
- unit/edge tests pass;
- calculator E2E passes;
- mobile/keyboard/accessibility QA;
- metadata/canonical/breadcrumb correct;
- supporting content complete;
- methodology/source links complete;
- related-tool handoff works;
- analytics wired;
- no secret leak;
- production build passes;
- live SERP revalidated for Phase 2–4 primary intent;
- registry status changed to `published`;
- sitemap includes route only after status change.

## No placeholder rule

Documentation may exist for future calculators, but public route/page does not exist until build quality is sufficient. Do not publish “coming soon” calculator pages for SEO.
