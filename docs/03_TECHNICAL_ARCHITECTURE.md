# 03 — Technical Architecture

## Stack

```text
Next.js App Router
React
TypeScript (strict)
Vercel
Vitest
Playwright
```

No database/auth layer.

## System architecture

```text
                         Browser
                           │
                  Next.js / React UI
                           │
        ┌──────────────────┼───────────────────┐
        │                  │                   │
 Pure calculator       Static data         localStorage
 engines               / config            Energy Profile
        │
        ├────────────────────────────┐
        │                            │
        ▼                            ▼
/api/solar-production          /api/ai/explain
        │                       optional only
        ▼                            │
PVWatts V8                         AI provider
```

## Hard architectural decisions

Removed:

```text
Supabase
SQL/database
Auth
user accounts
cloud Energy Profile
country tariff store
fuel-price store
EV make/model database
product SKU catalogs
server-side saved scenarios
```

## Project structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── solar/
│   ├── battery/
│   ├── home-energy/
│   ├── ev/
│   ├── methodology/
│   ├── sources/
│   ├── about/
│   ├── privacy/
│   ├── terms/
│   ├── sitemap.ts
│   ├── robots.ts
│   └── api/
│       ├── solar-production/route.ts
│       └── ai/explain/route.ts
│
├── components/
├── data/
├── lib/
│   ├── calculators/
│   ├── providers/
│   ├── energy-profile/
│   ├── storage/
│   ├── validation/
│   ├── units/
│   ├── seo/
│   └── analytics/
└── types/
```

## Calculator engine architecture

Recommended per-engine layout:

```text
src/lib/calculators/battery-runtime/
├── schema.ts
├── engine.ts
├── formula-version.ts
├── quality.ts
└── engine.test.ts
```

Engines accept normalized typed input and return typed output. Engines must not call `fetch`, read environment variables, touch browser storage or import React.

## Unit normalization

Pick canonical internal units:

```text
power        W
energy       Wh (or kWh when domain-specific, consistently converted)
voltage      V
capacity     Ah where explicitly capacity-in-charge
current      A
time          hours
SOC          decimal 0–1
percent       decimal internally; percent only UI
angle         degrees
EV distance   km internally
```

Conversion functions are centralized and unit-tested.

Never mix display-unit conversion with formula logic.

## Static data

`src/data/` is the data layer.

It contains:

- appliance presets;
- battery chemistries;
- voltage/capacity presets;
- inverter/UPS efficiency presets;
- EV charger powers and generic consumption presets;
- solar defaults;
- units/currencies;
- validation and warning bounds.

Full values/rules live in `07_INITIAL_DATA_AND_DEFAULTS.md`.

All presets are editable and provenance-aware.

## Energy Profile / localStorage

Use versioned browser storage, for example:

```text
energy-tools:profile:v1
```

The server-rendered page must not depend on localStorage to render SEO content or the blank/default calculator UI.

Hydration pattern:

1. render deterministic defaults;
2. mount client calculator;
3. read valid stored profile;
4. merge compatible local preferences;
5. never block initial rendering on storage.

See `06_ENERGY_PROFILE_AND_DATA_MODEL.md`.

## Solar API

### Provider

Use PVWatts V8 through a server route.

```text
Browser
→ POST /api/solar-production
→ validate/normalize
→ build PVWatts request server-side
→ fetch provider
→ normalize provider response
→ return stable internal response
```

### Secrets

```text
PVWATTS_API_KEY
```

Server-only. Never expose through `NEXT_PUBLIC_*`, rendered HTML, logs or client bundle.

### Internal provider contract

The UI/calculators must consume our internal shape rather than raw provider JSON.

```ts
interface SolarProductionRequest {
  latitude: number;
  longitude: number;
  systemCapacityKw: number;
  tiltDeg: number;
  azimuthDeg: number;
  moduleType: 0 | 1 | 2;
  arrayType: 0 | 1 | 2 | 3 | 4;
  lossesPercent: number;
  dcAcRatio?: number;
  inverterEfficiencyPercent?: number;
}

interface SolarProductionResult {
  provider: "pvwatts-v8";
  annualAcKwh: number;
  monthlyAcKwh: number[];
  monthlyDcKwh?: number[];
  monthlyPoaKwhM2?: number[];
  monthlySolarRadiationKwhM2Day?: number[];
  annualSolarRadiationKwhM2Day?: number;
  capacityFactorPercent?: number;
  assumptions: Record<string, number | string>;
  warnings: string[];
}
```

### Call discipline

- never call per keystroke;
- debounce/explicitly submit;
- validate before external call;
- bound tilt-optimization candidate requests;
- cache identical requests using framework/server fetch caching where appropriate;
- treat provider quota errors as recoverable;
- do not fabricate output when provider fails.

### Failure behavior

Solar Tilt keeps its local latitude-based starting estimate.

Solar Output/Size must show a clear unavailable state or allow an explicit user-entered manual yield in Advanced mode. Do not silently replace location-aware output with a hidden “peak sun hours” constant.

## Optional AI explanation

AI is **not required to launch**.

If enabled:

```text
deterministic result
→ sanitized compact result/assumption summary
→ /api/ai/explain
→ explanation
```

Rules:

- calculator result exists before AI;
- AI response cannot change the numeric result;
- send minimum necessary fields;
- no private account data exists;
- timeout/failure does not break calculator;
- label AI narrative appropriately if used;
- never use AI to supply a missing technical constant silently.

Environment:

```text
AI_EXPLANATIONS_ENABLED=false
AI_PROVIDER_API_KEY=<server only, if enabled>
```

## Location

Solar tools can use:

- browser Geolocation API after explicit permission;
- manual latitude/longitude.

No geocoding database is required for Phase 1.

Do not persist precise coordinates by default. Only save locally if the user explicitly chooses to reuse the location.

## State management

Prefer local component/reducer state plus a small Energy Profile store. Do not introduce a global state library unless complexity proves it necessary.

State categories:

```text
transient form state
calculation result state
local preferences/Energy Profile
URL-share state (optional)
```

## URL state

If shareable calculator state is added:

- use compact query parameters or fragment;
- never expose secrets;
- canonical remains the clean calculator route;
- state variants do not enter sitemap;
- validate all URL-provided input before use.

## Registry-driven SEO/navigation

Maintain a typed central calculator registry with:

```ts
id
name
category
route
phase
status: "planned" | "building" | "published"
primaryKeyword
seoTitle
metaDescription
relatedCalculatorIds
requiresSolarApi
acceptsPriceInput
```

Use it to drive:

- published calculator lists;
- category cards;
- related-tool links;
- sitemap;
- metadata validation/tests.

Do not use registry status to render an empty planned public page.

## Server rendering

Server-render:

- H1;
- direct introductory answer;
- explanatory sections;
- methodology;
- sources;
- related-tool crawlable links.

Interactive calculator components may be client components nested inside a server-rendered page.

## Performance

Targets follow current Core Web Vitals guidance:

```text
LCP <= 2.5 s
INP <= 200 ms
CLS <= 0.1
```

Evaluate at the 75th percentile in field data when available.

Engineering:

- minimize client JS;
- lazy-load noncritical charts;
- do not ship all appliance/route content if a smaller split is sensible;
- reserve result/chart layout space to avoid CLS;
- avoid external API calls on initial page render;
- cache static assets aggressively.

## Validation

Use shared schemas/helpers. Requirements:

- reject NaN/Infinity;
- enforce hard sane bounds;
- distinguish warning from error;
- allow unusual but physically possible values with warnings where appropriate;
- avoid silently clamping user input unless the UI explicitly explains it.

## Security

- validate server API body and limit payload size;
- allow only expected provider parameters;
- never proxy arbitrary URLs;
- do not reflect provider error bodies verbatim to the client;
- sanitize AI inputs/outputs for rendering;
- security headers via Next/Vercel configuration as appropriate;
- dependencies kept current and audited;
- no secret logging.

## Environment variables

Required for solar modeling:

```text
PVWATTS_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

Optional:

```text
AI_EXPLANATIONS_ENABLED=false
AI_PROVIDER_API_KEY=
```

Do not put secret keys in public variables.

## CI / release checks

At minimum:

```text
install
lint
typecheck
unit tests
Playwright smoke/happy path
production build
```

Add Lighthouse/automated accessibility checks if already supported by the repo.

## GitHub Pull Request & Academic Audit Protocol

For any **substantial or architectural updates** (e.g., new calculator engines, technical whitepapers, guides, schema overhauls, or API integrations — excluding minor one-off UI tweaks):

1. **Semantic Feature Branching:** Always branch off `main` to a semantic feature branch (e.g. `git checkout -b feat/whitepaper-bess-kinetics`).
2. **Pre-PR Verification:** Run unit tests (`npm test`), TypeScript verification (`npm run typecheck`), and static build (`npm run build`) before pushing.
3. **Push & Create GitHub PR:** Push to `origin <branch-name>` and provide the direct GitHub PR creation link.
4. **Structured PR Documentation:** Document:
   - **Summary of Architectural Changes**
   - **Governing Mathematical Models & Standards Cited** (IEEE, NEC, NREL, ASHRAE)
   - **Verification Suite Proofs** (test counts, 0 type errors, static route generation)
5. **Merge Traceability:** Merge into `main` to maintain a permanent, verifiable PR history on GitHub for institutional research lab submissions, syllabus citations, and accreditation audits.

