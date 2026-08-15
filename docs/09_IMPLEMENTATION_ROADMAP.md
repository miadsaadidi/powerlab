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
