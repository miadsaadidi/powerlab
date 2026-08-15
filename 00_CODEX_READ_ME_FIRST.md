# 00 — Codex: Read Me First

This documentation bundle is the authoritative implementation contract for the Energy Planning Tools project.

## What changed from the older bundle

- Architecture is now fully **database-free**.
- Remove Supabase/auth/account concepts from implementation.
- All settings/presets are static TypeScript arrays/config.
- User preferences and the Energy Profile use `localStorage` only.
- No country tariff/fuel-price database.
- No EV make/model database.
- Solar production modeling remains external through **PVWatts V8** behind a server-only adapter.
- Optional AI may explain deterministic results but must not calculate them.
- The site architecture now covers **20 calculators** across Solar, Battery, Home Energy and EV.
- Full specifications now exist for all 20 calculators.
- Final solar-battery canonical is `/solar/solar-battery-bank-size-calculator`.
- SEO docs contain primary + validated secondary keywords, volumes, advertiser competition, organic competition, title/meta and canonical mapping.
- SEO/GEO rules were consolidated against current Google guidance.

## Build scope now

Implement **Phase 1** first:

1. Battery Runtime Calculator
2. Solar Panel Tilt Calculator
3. Electricity Usage Calculator
4. Battery Size Calculator
5. EV Charging Time Calculator

Also implement the shared foundation required by these pages:

- homepage;
- four category hubs;
- calculator registry;
- design system/shared calculator components;
- unit/validation libraries;
- static data modules;
- local Energy Profile;
- PVWatts V8 server adapter;
- SEO metadata/canonicals/breadcrumbs;
- sitemap/robots;
- methodology/sources;
- analytics adapter;
- tests and CI gates.

Do not build public placeholder pages for Phase 2–4.

## Read order

1. `AGENTS.md`
2. `README.md`
3. `docs/01_PRODUCT_VISION.md`
4. `docs/02_WEBSITE_ARCHITECTURE_AND_DESIGN.md`
5. `docs/03_TECHNICAL_ARCHITECTURE.md`
6. `docs/04_SEO_AND_GEO_STRATEGY.md`
7. `docs/05_KEYWORD_AND_SERP_ANALYSIS.md`
8. `docs/06_ENERGY_PROFILE_AND_DATA_MODEL.md`
9. `docs/07_INITIAL_DATA_AND_DEFAULTS.md`
10. `docs/08_CONTENT_AND_PAGE_TEMPLATE.md`
11. `docs/09_IMPLEMENTATION_ROADMAP.md`
12. `docs/10_TESTING_AND_ACCEPTANCE.md`
13. `docs/11_ANALYTICS_AND_EVENTS.md`
14. `docs/12_SOURCES_AND_METHODOLOGY.md`
15. `docs/13_CALCULATOR_REGISTRY_AND_ROUTES.md`
16. the relevant calculator specification(s)

## Conflict rule

If old project code/docs conflict with this bundle, use this priority:

```text
current user decision
→ AGENTS.md
→ 00_CODEX_READ_ME_FIRST.md
→ numbered v2 docs
→ calculator spec
→ older repository documentation
```

If two files inside this v2 bundle appear inconsistent, do not guess silently: use the more specific calculator spec for formula/UI behavior and the central registry/SEO files for canonical routes and keyword mapping.

## Do not reintroduce

```text
Supabase
SQL migrations
RLS
authentication
user accounts
cloud profile sync
tariff database
fuel-price database
EV model catalog
scraped product data
```

## Completion expectation

Implement in small reviewable steps, preserve deterministic engines, run tests/typecheck/lint/build, and only mark routes `published` when their release gate passes.
