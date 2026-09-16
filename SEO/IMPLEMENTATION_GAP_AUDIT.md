# POWLAB SEO — Implementation Gap Audit

**Date:** 2026-09-16  
**Auditor:** AI/SEO Agent  
**Domain:** `https://www.powelab.org/`  
**Purpose:** Granular line-item audit of all POWLAB SEO requirements, current implementation status, exact gap identification, and corrective actions.

---

## 1. Summary Status Matrix

```text
Total Requirements Audited: 15
├─ IMPLEMENTED:             5
├─ PARTIALLY IMPLEMENTED:   6
├─ MISSING:                 3
├─ CONFLICTING:             1
└─ NEEDS VALIDATION:        0
```

---

## 2. Granular Gap Analysis & Remediation Plan

### GAP-01: Dedicated Dataset Landing Architecture (`/datasets/[slug]`)
* **Requirement:** Every benchmark dataset must have an authoritative, crawlable, and indexable POWLAB landing page with `Dataset` + `DataDownload` structured data, data dictionary, sample data, methodology, and bidirectional links.
* **Current Implementation:** Datasets are defined as sub-records in `src/data/research-papers.ts` and rendered as sub-components on `/research/[slug]`. No dedicated `/datasets` or `/datasets/[slug]` route exists.
* **Status:** `MISSING`
* **Exact Problem:** Google Dataset Search and web crawlers lack canonical `/datasets/*` landing pages to associate with DataCite DOIs.
* **Required Change:**
  1. Define enriched dataset models with `slug`, data dictionary, variables, sample records, and methodology.
  2. Implement `src/app/datasets/page.tsx` (Dataset Index / DataCatalog) and `src/app/datasets/[slug]/page.tsx` (Canonical Dataset Landing Page).
  3. Embed Schema.org `Dataset` + `DataDownload` + `BreadcrumbList` JSON-LD.
  4. Register routes in `src/app/sitemap.ts`.
* **Files to Change:** `src/data/research-papers.ts`, `src/app/datasets/page.tsx`, `src/app/datasets/[slug]/page.tsx`, `src/app/sitemap.ts`.
* **Validation Method:** Next.js build compilation, route rendering, Schema Validator test.
* **Priority:** **P1 (Critical / Priority #1)**

---

### GAP-02: Comprehensive Authority Outreach Database Expansion
* **Requirement:** Maintain a robust prospect database with 20–30 A+/A editorial targets, 30–50 B-level targets, and 20+ research/citation targets.
* **Current Implementation:** `SEO/AUTHORITY_TARGETS.csv` had an initial seed list of 11 targets.
* **Status:** `PARTIALLY IMPLEMENTED`
* **Exact Problem:** Prospect pipeline lacks scale and full representation across all POWLAB research domains (BESS, Solar, HVAC, Generator, EVSE, Power Electronics).
* **Required Change:** Expand `SEO/AUTHORITY_TARGETS.csv` to 75+ verified targets categorized into Layer 2 (Editorial) and Layer 3 (Research/Citation) with qualification statuses, pitch angles, and contact endpoints.
* **Files to Change:** `SEO/AUTHORITY_TARGETS.csv`, `SEO/IMPLEMENTATION_ROADMAP.md`.
* **Validation Method:** CSV schema validation, URL and relevance verification.
* **Priority:** **P1 (Critical / Priority #2)**

---

### GAP-03: Operational Authority Outreach Pipeline & Lifecycle
* **Requirement:** Operationalize a full 7-stage outreach lifecycle: `RESEARCH → QUALIFY → PITCH → FOLLOW-UP → PUBLISH → VERIFY → LOG`.
* **Current Implementation:** Targets had static pitch ideas without explicit lifecycle stages or pipeline rules in operational files.
* **Status:** `PARTIALLY IMPLEMENTED`
* **Exact Problem:** Agents could get confused between rapid syndication (Layer 1) and personalized editorial pitching (Layer 2).
* **Required Change:** Formalize outreach stages and operational rules across `AGENTS.md`, `.agents/rules/email-outreach-rules.md`, and `SEO/AUTHORITY_TARGETS.csv`.
* **Files to Change:** `AGENTS.md`, `.agents/rules/email-outreach-rules.md`, `SEO/AUTHORITY_TARGETS.csv`.
* **Validation Method:** Inspection of workflow definitions.
* **Priority:** **P1 (Critical / Priority #3)**

---

### GAP-04: Daily Execution Rule Granularity Conflict
* **Requirement:** Assistants must execute one planned SEO objective per session, utilizing as many multi-step file/code changes as necessary.
* **Current Implementation:** `AGENTS.md` and prompt protocols stated "execute exactly one deliverable/task at a time", which previously caused tools to stop mid-objective (e.g. after writing one file instead of finishing the full route).
* **Status:** `CONFLICTING`
* **Exact Problem:** Rule artificially interrupted coherent multi-step tasks (e.g., creating a page + updating types + updating sitemap + logging).
* **Required Change:** Refine rule in `AGENTS.md` and `.agents/rules/universal-interaction-rules.md` to: *"Execute one planned SEO objective per session, using as many implementation steps and file/code/content changes as necessary to complete that objective."*
* **Files to Change:** `AGENTS.md`, `.agents/rules/universal-interaction-rules.md`.
* **Validation Method:** File content inspection.
* **Priority:** **P1 (Critical)**

---

### GAP-05: Strict Backlink Classification & HTML Inspection Protocol
* **Requirement:** Backlinks must be classified into `DOFOLLOW VERIFIED`, `NOFOLLOW VERIFIED`, `SPONSORED`, `UGC`, `REDIRECT`, `NOT A LINK`, `UNKNOWN` after checking DOM `<a href>` and `rel`.
* **Current Implementation:** `SEO/BACKLINK_LOG.csv` initialized with 10 records.
* **Status:** `PARTIALLY IMPLEMENTED`
* **Exact Problem:** Additional verification details (crawl DOM attributes, redirect chains) need explicit standards in `SEO/MASTER_STRATEGY.md`.
* **Required Change:** Document backlink inspection standards in `SEO/MASTER_STRATEGY.md` and update `SEO/BACKLINK_LOG.csv`.
* **Files to Change:** `SEO/MASTER_STRATEGY.md`, `SEO/BACKLINK_LOG.csv`.
* **Validation Method:** CSV format audit.
* **Priority:** **P2 (High)**

---

### GAP-06: Differentiated Canonical & Syndication Rules by Platform Purpose
* **Requirement:** External copies must not be treated with a one-size-fits-all canonical rule. Differentiate preprints, datasets, code tutorials, and journal articles.
* **Current Implementation:** General rule existed, but lacked platform-by-platform canonical matrix.
* **Status:** `PARTIALLY IMPLEMENTED`
* **Exact Problem:** Potential confusion on whether preprints (Academia.edu), datasets (Figshare DOIs), and tutorials (DEV.to) take self-canonicals, cross-domain canonicals, or DOI references.
* **Required Change:** Add detailed platform-specific canonical matrix to `SEO/EXTERNAL_DISTRIBUTION.md` and `SEO/MASTER_STRATEGY.md`.
* **Files to Change:** `SEO/EXTERNAL_DISTRIBUTION.md`, `SEO/MASTER_STRATEGY.md`.
* **Validation Method:** Documentation audit.
* **Priority:** **P2 (High)**

---

### GAP-07: Bidirectional Internal Linking to Dataset Landing Pages
* **Requirement:** Whitepapers, calculators, guides, and topic hubs must link directly to corresponding dataset landing pages.
* **Current Implementation:** Research pages link to Figshare external DOIs directly rather than first routing through canonical `/datasets/[slug]` landing pages.
* **Status:** `PARTIALLY IMPLEMENTED`
* **Exact Problem:** Internal equity was passing externally to Figshare rather than consolidating on POWLAB's canonical dataset URLs.
* **Required Change:** Update `src/data/research-papers.ts` and research page templates to link to internal `/datasets/[slug]` with fallback to external repository.
* **Files to Change:** `src/data/research-papers.ts`, `src/app/research/[slug]/page.tsx`, `SEO/INTERNAL_LINK_MAP.md`.
* **Validation Method:** Link verification in tests and page rendering.
* **Priority:** **P1 (Critical)**

---

## 3. Implementation Order & Immediate Action

1. **Step 1:** Enhance Dataset data structures and implement `/datasets` & `/datasets/[slug]` pages with complete `Dataset` schema and interactive download UI.
2. **Step 2:** Expand `SEO/AUTHORITY_TARGETS.csv` to 75+ verified prospects across Layer 2 and Layer 3.
3. **Step 3:** Update `AGENTS.md` and `.agents/rules/` to correct the single-objective execution rule and enforce the authority outreach lifecycle.
4. **Step 4:** Update internal linking maps and cross-links across the site.
5. **Step 5:** Run automated tests, typechecks, and Next.js build validation.
6. **Step 6:** Log all completed work in `SEO/DAILY_LOG.md` and `SEO/CHANGELOG.md`.
