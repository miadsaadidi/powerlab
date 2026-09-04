# Energy Planning Tools — Complete Codex Documentation

This is the implementation contract for the Energy Tools website.

It covers:

- final 20-calculator website architecture;
- design system and calculator UX;
- database-free technical architecture;
- PVWatts V8 integration;
- local Energy Profile and static data;
- primary/secondary keyword mapping and SERP competition;
- SEO + generative-search (GEO/AEO) rules;
- page-content templates;
- implementation phases;
- testing, analytics, methodology and route registry;
- detailed build specifications for all calculators.

## Final technical decisions

```text
Next.js App Router + React + TypeScript + Vercel
Static TypeScript arrays/config
Pure deterministic calculator engines
localStorage Energy Profile
Server-side PVWatts V8 proxy
Optional AI explanation route

NO DATABASE
NO AUTH
NO USER ACCOUNTS
NO TARIFF DATABASE
NO EV MODEL DATABASE
```

## Read first

Start with `AGENTS.md`, then read `docs/01_...` through `docs/13_...` in numeric order. Before implementing a calculator, read its specific file in `docs/calculators/`.

## Public categories

- `/solar/`
- `/battery/`
- `/home-energy/`
- `/ev/`

## Release discipline

The architecture and docs cover all 20 tools, but the site publishes them by phase. Planned routes must not exist as thin/indexable placeholders.

## Deployment & Git Workflow

- **Auto Vercel Deployments:** Connected directly to the GitHub repository. Deployments trigger automatically on push / merge to `main`.
- **Small Tweaks (Direct to `main`):** Minor UI adjustments, text/copy corrections, meta tweaks, or single-file bug fixes are committed directly to `main` without requiring a Pull Request.
- **Medium & Large Updates (MANDATORY PR):** Adding new calculators, pages, whitepapers, schema overhauls, or multi-feature updates require a dedicated feature branch (`feat/<slug>`), pre-PR test/typecheck verification, and an immediate formal GitHub Pull Request.
- **Full Contribution Guide:** Refer to [CONTRIBUTING.md](file:///d:/powerlab/CONTRIBUTING.md) and [AGENTS.md](file:///d:/powerlab/AGENTS.md) for full branch lifecycle, review window (2-24h), and merge/branch cleanup procedures.

## Research provenance

Keyword volumes and Google Ads competition come from the supplied Google Keyword Planner exports, reporting approximately July 2025–June 2026. Organic competition values come from the manual SERP review recorded 2026-08-10. External technical assumptions are documented in `docs/12_SOURCES_AND_METHODOLOGY.md` and the static-data specification.
