# POWLAB SEO — Implementation Roadmap

**Domain:** `https://www.powelab.org/`  
**Execution Cycle:** 6-Phase Systematic Implementation & Authority Scaling.

---

## Phase 1 — Fix (Technical, Structural & Crawl Integrity)

- [x] **Zero-Scroll Calculator Layouts:** Refactor all 24 calculator pages to present inputs and results above the fold without forced scrolling.
- [x] **Mobile Keyboard & Touch Targets:** Implement `inputMode="decimal"` and 44px+ minimum tap targets across all interactive forms.
- [x] **Canonical Tag Enforcement:** Ensure every page explicitly declares self-referencing `rel="canonical"` URL matching production HTTPS protocol.
- [x] **Sitemap Optimization:** Generate real-time dynamic sitemap in `src/app/sitemap.ts` covering all tools, research papers, and guides.
- [ ] **Dedicated Dataset Landing Pages:** Establish canonical `/datasets/[slug]` landing routes matching existing Figshare and Hugging Face assets.
- [ ] **404 & Redirect Audit:** Verify clean server-side resolution for all legacy URL paths.

---

## Phase 2 — Rebuild (Internal Linking, Topic Hubs & Schema)

- [ ] **Topic Hub Consolidation:** Structure clear categorical index hubs:
  - `/battery` (Battery Storage & BESS Hub)
  - `/solar` (Photovoltaic & Solar Resource Hub)
  - `/home-energy` (HVAC, Generator & Residential Power Hub)
  - `/ev` (EV Charging, Breaker & EVSE Hub)
  - `/research` (Master Research & Preprint Repository)
- [ ] **Bidirectional Hub-to-Paper Linking:** Ensure every calculator explicitly links to its governing research paper, dataset, and guide, and vice-versa.
- [ ] **Schema Standardization:** Implement structured JSON-LD across all pages:
  - `Article` / `ScholarlyArticle` on `/research/*`
  - `Dataset` & `DataDownload` on dataset landing pages
  - `SoftwareApplication` / `WebApplication` on calculators
  - `BreadcrumbList` & `Organization` globally

---

## Phase 3 — Expand (Original Research, Datasets & Tools)

- [ ] **BESS Degradation & Thermal Loss Research:** Publish formal technical whitepaper on LiFePO4 thermal derating and cycle life kinetics.
- [ ] **EVSE Temperature Rise Benchmark:** Release open CSV dataset tabulating continuous 48A/80A terminal lug heat dissipation across 100+ simulated charging hours.
- [ ] **Cold-Climate Heat Pump Balance Point Tool:** Enhance calculator engine with dual-fuel economic switching thresholds.
- [ ] **Generator Fuel Derating Matrix:** Expand multi-fuel (gas vs LPG vs NG) altitude compensation data in generator tools.

---

## Phase 4 — Distribute (Multi-Platform Syndication Layer 1)

- [x] **Academia.edu & Internet Archive:** Deploy preprint working papers (`ACAD-01` through `ACAD-06`) with verified canonical links.
- [x] **Figshare & Hugging Face:** Register Open DOI benchmark datasets (`FIG-01` through `FIG-05`, `HF-01`).
- [x] **MERLOT (CSU System):** Deploy higher-ed interactive simulation modules (`MER-01`, `MER-02`).
- [x] **DEV.to & Hashnode:** Publish deep-dive TypeScript engineering articles (`DEV-01` through `DEV-05`, `HASH-01` through `HASH-04`).
- [ ] **Medium Engineering Publication:** Syndicate accessible industry summaries linking back to canonical research assets.

---

## Phase 5 — Outreach (High-Authority Editorial & Citation Layers 2 & 3)

- [ ] **Authority Editorial Pitches (Layer 2):**
  - Pitch BESS Peukert & Inverter Tare findings to *Energy Storage News* and *Energy Central*.
  - Submit cold-weather PV $V_{oc}$ expansion safety brief to *PV Magazine* and *IEEE Spectrum*.
  - Submit generator motor inrush & LRA soft-starting analysis to *Power Engineering International* and *Electrical Contractor Magazine*.
- [ ] **Academic & Citation Outreach (Layer 3):**
  - Connect with university clean energy labs and IEEE working groups evaluating stationary storage standards (IEEE 485 / IEEE 1547).
  - Submit dataset metadata to institutional repositories and scientific data indexes (Zenodo, Dataverse).

---

## Phase 6 — Measure & Iterate (Continuous Intelligence)

- [ ] **Search Console Weekly Diagnostics:** Audit query impressions, CTR, strike-distance keywords (positions 4–20), and crawl stats.
- [ ] **Backlink & Referring Domain Monitoring:** Inspect HTML of new backlinks, verify dofollow/anchor status, and log in `/SEO/BACKLINK_LOG.csv`.
- [ ] **Monthly Authority Target Review:** Refresh `/SEO/AUTHORITY_TARGETS.csv`, add qualified publications, and evaluate pitch conversion rates.
