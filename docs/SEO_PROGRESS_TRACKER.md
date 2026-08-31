# SEO Execution & Progress Tracker - PowerLab

**Domain:** `https://www.powelab.org`  
**Last Updated:** August 29, 2026  
**Status:** Technical SEO baseline complete; 8 flagship educational link magnets published; 62 canonical URLs active & live on Vercel production; GSC live impressions surged to 7.69k across 1,000+ distinct queries.

---

## 1. Completed Milestones (Do Not Repeat)

| Task Area | Action Completed | Date / Status | Notes & Verification |
| :--- | :--- | :--- | :--- |
| **GSC & Webmaster** | Google Search Console verification | Completed | Domain property and URL prefix verified |
| **GSC & Webmaster** | Bing Webmaster Tools setup | Completed | Search console imported/verified |
| **Sitemap Submission** | `sitemap.xml` updated | Completed | Dynamic route `/sitemap.xml`; inventory exposes **62 canonical URLs**: 30 calculators, 4 category hubs, 8 comprehensive technical guides and root/utility/legal pages |
| **Flagship Educational Guides** | In-depth technical guides & link magnets | Completed | Published: (1) Battery Backup Runtime Formula Guide, (2) Level 2 EV Charging Speed & Breaker Guide, (3) Solar Panel Tilt by Latitude Guide, (4) MPPT vs PWM Sizing Guide, (5) Daily Household kWh Usage Guide, (6) Voltage Drop & Wire Size Guide, (7) Emergency Generator Sizing & Motor Inrush Guide, (8) **Central AC & Heat Pump Electricity Cost Guide (Aug 29 — Live with embedded `<AcCostCalculator />`)** |
| **URL Inspection** | Priority URL Indexing Requests | Completed (Aug 27) | Priority inspection submitted for: `/guides/emergency-generator-sizing-and-inrush-load-guide`, `/guides/voltage-drop-and-wire-size-calculation-guide`, `/guides/central-ac-and-heat-pump-electricity-cost-guide`, `/sitemap.xml` |
| **Community Policy** | Reddit policy update | August 26, 2026 | Removed Reddit outreach in favor of high-authority academic syndication and direct peer engineering pitches |
| **Directory Submissions** | Free tool aggregators and Show HN | Completed | Submitted to directory catalogs and tech showcases |
| **FAQ & Speakable Schema** | `FAQPage` & `SpeakableSpecification` JSON-LD | Completed (Aug 27) | Added Schema.org `speakable` selectors (`.direct-answer-card`, `h1`) and professional audience metadata across all calculators and guides for Google AI Overviews and GEO |
| **WebApplication & Article Schema** | `WebApplication`, `TechArticle`, `BreadcrumbList` | Completed | Validated in Google Rich Results Test; all 30 calculators pass verified engineering standards citations (`isBasedOn` & `citation`) for IEEE, NEC, UL, IEC, and NREL |
| **Root OpenGraph Card** | Root `opengraph-image.tsx` | Completed | 1200x630 dynamic Next.js OG preview |
| **Category OG Cards** | Category-specific `opengraph-image.tsx` | Completed | Dedicated cards created for `/solar`, `/battery`, `/home-energy`, and `/ev` |
| **Internal Linking Graph** | Guides-to-tools & tools-to-guides reciprocal workflow links | Completed | Bidirectional links reinforced between all 8 guides and corresponding calculators (`battery-runtime`, `generator-size`, `ac-cost`, `voltage-drop`, `ev-charging-time`, `solar-panel-tilt`, `how-many-kwh`) |
| **Phase 5 SERP and Keyword Research** | Keyword Planner and SERP Analysis | Completed | 10 high-impact expansion specs and canonical maps added |
| **Community & Academic Outreach Kit** | Technical distribution templates (`docs/outreach/`) | Completed | Turnkey worked examples for DIY Solar Forum, Tesla Motors Club, and university/vocational OER syllabus pitches |
| **High-DA Academic Paper Syndication** | Working Papers 1, 2 & 3 (Live on Academia.edu & Figshare) | Completed (August 26, 2026) | Paper 1 (Academia/Figshare/Archive). Paper 2 (DOI: 10.6084/m9.figshare.33321774). **Paper 3 Published on Academia.edu** (*Deterministic Modeling of Inductive Motor Inrush Currents and Non-Coincident Load Stacking for Residential Backup Power Systems*) |
| **AlternativeTo Directory Submission** | Listing submitted with PVWatts & HOMER alternatives | Completed (August 24, 2026) | PoweLab profile submitted to AlternativeTo.net (DA 84) linked to PVWatts, HOMER Pro, and PVsyst |
| **Daily 5 High-Impact Outreach Sprint** | 30 Turnkey Email Pitches (`docs/outreach/04_*`) | In Progress (Batch 4 Completed) | **Batch 1 (Aug 24)**: Stanford, NREL (`pvwatts@nrel.gov`), AppState, UTK, NC State.<br>**Batch 2 (Aug 26)**: NJATC, IBEW 134, NECA NorCal, NABCEP, Lincoln Tech.<br>**Batch 3 (Aug 27)**: Trade Media Editors (*Solar Power World*, *InsideEVs*, *EC&M*, *Canary Media*, *PV Magazine*).<br>**Batch 4 (Aug 29 — Today)**: State Clean Energy Centers & Extensions (*FSEC/UCF*, *UT Austin*, *CU Boulder*, *NCCETC*, *UC Davis*). |
| **Ahrefs Audit Remediation** | 100% resolution of Ahrefs August 27 Crawl Issues | August 27, 2026 | Resolved: (1) Orphan page `/terms` eliminated; (2) Incomplete OG tags resolved across all 49 pages via `buildPageMetadata` with 1200x630 category cards; (3) 19 title length issues fixed (all final rendered titles <= 60 chars); (4) 18 meta descriptions trimmed to 140–155 chars; (5) Short descriptions expanded; (6) 6 single-link pages reinforced with 2–3+ contextual reciprocal links; (7) IndexNow integrated & 49 URLs submitted (HTTP 202 Accepted). |
| **IndexNow Protocol** | Native key verification & instant submission API | August 27, 2026 | Route `/c94b7e8d1a2f43b68019e34a75d28b12.txt` active; `/api/indexnow/submit` and `scripts/submit-indexnow.ts` tested & submitted all 49 URLs with HTTP 202. |
| **Google Publisher Center & Preferred Sources** | Google Publisher Center verified & configured | August 29, 2026 | Publication ID `CAowrJPNDA` verified via GSC; primary language English (`en-US`), 1000x1000 square logo uploaded; on-site interactive "Pin to Google" banner deployed in calculator result panel. |
| **Ground Albedo & Snow Shedding Model** | Added to Solar Tilt Calculator & Formula Card | August 23, 2026 | Implemented Perez ground view factor and snow backscatter reflectance gain in engine, UI card, and tests |

---

## 2. Active Outreach & 7-Day Follow-Up Schedule

| Batch # | Target Group | Sent Date | 7-Day Follow-up Due Date | Status |
| :--- | :--- | :---: | :---: | :--- |
| **Batch 1** | University Faculty & Energy Labs (Stanford, NREL, AppState, UTK, NC State) | August 24, 2026 | **August 31, 2026** | Sent — Awaiting reply / Follow-up pending (Note: re-send to `chris.deline@nrel.gov` without space) |
| **Batch 2** | Electrical Apprenticeship & Vocational Directors (NJATC, IBEW 134, NECA, NABCEP, Lincoln Tech) | August 26, 2026 | **September 2, 2026** | Sent — Awaiting reply (`training@ualocal602.org` queued 45h; `smartin@ejatt.com` hard bounced) |
| **Batch 3** | Clean Energy Trade Media Editors (Solar Power World, InsideEVs, EC&M, Canary, PV Mag) | **August 27, 2026** | **September 3, 2026** | **Sent** (Emails 11, 12, 15 delivered; 13 routed to `eparson@endeavorb2b.com`; 14 routed to `editors@canarymedia.com`) |
| **Batch 4** | State Clean Energy Centers & Extensions (FSEC, UT Austin, CU Boulder, NCCETC, UC Davis) | **August 29, 2026** | **September 5, 2026** | **Sent** (Emails 16, 17, 18, 19, 20 delivered).<br>🔥 **HIGH-VALUE CONVERSATION — Dr. David Rapson (UC Davis):** Replied on Aug 30 praising point on AC rectification dissipation and asking about the 10%–14% variance and model specificity. Responded on **Aug 31** with thorough engineering explanation, added live operational presets (Level 1, Level 2, Cold Climate) to `/ev/ev-savings-calculator`, and formally cited *Archsmith, Kendall, & Rapson (2015)* in `/methodology` and `/sources`.<br>⚠️ **DO NOT SEND GENERIC BATCH FOLLOW-UP TO DR. RAPSON.** Scheduled for **tailored follow-up on September 7, 2026** (checking if he/students found the new presets & citations helpful). |
| **Batch 5** | Advocacy Non-Profits & EV Coalitions (Plug In America, SEIA, Energy Innovation, Electrek, ILSR) | August 30, 2026 | September 6, 2026 | Queued for tomorrow |
| **Batch 6** | Open Educational Resources & STEM Libraries (LibreTexts, MIT OCW, OER Commons, MERLOT, CC) | August 31, 2026 | September 7, 2026 | Queued |

---

## 3. Technical SEO Baseline Status

* **Robots.txt**: Cleanly permits all canonical pages and references `https://www.powelab.org/sitemap.xml`.
* **Canonical URLs**: All 62 pages define explicit canonical URLs.
* **Sitemap inventory**: 62 canonical URLs: 30 calculators, 4 category hubs, 8 guide routes, the homepage and root/utility/legal pages.
* **Sitemap freshness**: Timestamps omitted to preserve honest indexing crawl frequency.
* **Semantic hierarchy**: Calculator and content pages use a single `<h1>` with semantic `<article>`, `<section>` and breadcrumb navigation.
* **Structured data graph**:
  * Root: `Organization` and `WebSite` with `SearchAction`.
  * Category hubs: `CollectionPage`, `ItemList` and `BreadcrumbList`.
  * Calculators: `WebApplication` (free/0 USD), `BreadcrumbList`, `SpeakableSpecification`, and visible-content `FAQPage` across all 30 routes.
  * Guides: `TechArticle`, `BreadcrumbList`, `SpeakableSpecification`, standard citations (`IEEE`, `NEC`, `IEC`, `SAE`, `NREL`, `NEMA`, `ISO`, `AHRI`, `ASHRAE`) and `FAQPage` across all 8 guides.
* **Internal linking**: Guides, category hubs, and calculators expose bidirectional next-step links across Home Energy, Solar, Battery, and EV planning paths.

---

## 3. Daily 5-Pillar Actionable SEO & Outreach Plan

To systematically outperform legacy aggregators (OmniCalculator, EnergySage, SolarReviews), execute this structured **20-minute daily operational checklist** every morning:

### 3.1 The Daily 5-Pillar Morning Checklist (20 Minutes Total)

| Step & Pillar | Daily Actionable Task | Tool / Location | Expected Output / KPI |
| :--- | :--- | :--- | :--- |
| **Step 1: Pillar 3 (Preferred Sources)** | **Google Preferred Sources Verification (1 min)**<br>Open Google Search Preferences and search `PowerLab` or `powelab.org`. Track when Publication `CAowrJPNDA` becomes searchable. Once active, test adding it. | [google.com/preferences/source](https://www.google.com/preferences/source) | Detect exact day `powelab.org` goes live with `[+ Add]` |
| **Step 2: Pillar 2 (Mathematical Rigor)** | **GSC Coverage & Query Audit (3 mins)**<br>Check newly indexed URLs, crawl errors, and trending technical queries (e.g. *peukert formula*, *inrush current*, *voltage drop*). Note queries ranking in positions 4–15 for CTR optimization. | [Google Search Console](https://search.google.com/search-console) | Catch indexing anomalies and identify high-CTR candidate pages |
| **Step 3: Pillar 4 (AI Overviews / GEO)** | **Generative Search Citation Spot-Check (3 mins)**<br>Run 2 target queries in Google AI Overviews, Perplexity AI, and ChatGPT Search (e.g. *"battery backup runtime formula"*, *"generator size for central ac"*). Verify if PowerLab's direct answer block or schema is cited. | Google Search / Perplexity | Ensure Direct Answer cards stay optimized for LLM extraction |
| **Step 4: Pillar 1 (Zero-Spam Trust Moat)** | **Community Value Drop / Forum Response (4 mins)**<br>Scan 1 technical thread on DIY Solar Forum, Reddit (`r/solar`, `r/electricians`), or Tesla Motors Club where users complain about lead-gen sales calls or inaccurate rough estimates. Provide the exact math using PowerLab (highlighting *100% private, no signup*). | DIY Solar / TMC / Reddit | 1 authentic community referral link; reinforces anti-lead-gen reputation |
| **Step 5: Pillar 5 (Institutional Outreach)** | **Execute Daily 5 Outreach Pitches (7 mins)**<br>Send 5 personalized technical pitches from [`docs/outreach/04_*`](file:///d:/powerlab/docs/outreach/04_DAILY_5_OUTREACH_TARGETS_AND_PITCHES.md) to university engineering faculty (.edu), apprenticeship directors, or trade media editors. | Email Client / Workspace | 5 clean, hyper-targeted institutional emails sent per day |
| **Step 6: Pillar 5 (Authority & Backlinks)** | **72-Hour Follow-Up, Medium Post & Academic Papers (3 mins)**<br>Check outreach replies. Send polite 2-sentence follow-ups for threads sent 72 hours ago. Publish/schedule daily Medium (DA 96) engineering post or discussion update on Academia.edu (DA 93) and Figshare (DOI: `10.6084/m9.figshare.33321774`) with reciprocal links to `powelab.org`. | Medium / Academia.edu / Figshare | >15% institutional response rate and permanent high-DA backlinks |

---

### 3.2 Daily 5 Outreach Schedule & Rotation (Batches 1–6)

* **Batch 1 (Day 1):** University Engineering Faculty (.edu) — *Stanford, NREL, AppState, UTK, NC State* (Sent Aug 24; Follow-up: Aug 31)
* **Batch 2 (Day 2):** Electrical Apprenticeship & Vocational Directors — *NJATC, IBEW 134, NECA NorCal, NABCEP, Lincoln Tech* (Sent Aug 26; Follow-up: Sep 2)
* **Batch 3 (Day 3):** Clean Energy Trade Media Editors — *Solar Power World, InsideEVs, EC&M, Canary Media, PV Magazine* (Sent Aug 27; Follow-up: Sep 3)
* **Batch 4 (Day 4):** State Clean Energy Centers & Extensions — *FSEC UCF, UT Austin Energy Institute, CU Boulder, NCCETC, UC Davis* (Queued Batch 4)
* **Batch 5 (Day 5):** Clean Energy Advocacy Non-Profits & EV Coalitions — *Plug In America, SEIA, Energy Innovation, Electrek, ILSR*
* **Batch 6 (Day 6):** Open Educational Resources (OER) & Digital STEM Libraries — *LibreTexts Engineering, MIT OCW, OER Commons, MERLOT, Creative Commons*

---

### 3.3 High-DA Publishing, Paper & Backlink Platforms (Core 4 Authority Network)

To establish unbreakable domain authority and AI trust signals, maintain active publications across the Core 4 verified platforms:
1. **Medium (DA 96):** Primary daily technical publishing and syndication hub (`medium.com`). Post 1 daily focused engineering teardown or canonical guide import with direct links to `powelab.org`. Yields instant Google indexation and heavy citation in LLMs (Perplexity, ChatGPT, Claude).
2. **Academia.edu (DA 93):** Profile active. Post 2×/week technical discussion updates linking to new interactive guides.
3. **Figshare (DA 90):** Working Paper #2 live with citable DOI (`10.6084/m9.figshare.33321774`). Paper 3 scheduled for upload.
4. **Internet Archive (DA 99):** Permanent open-access PDF archive with live canonical source links.

---

## 4. Google Search Console Live Snapshot (August 29, 2026 — 7-Day Window Aug 18–26)

### 4.1 Macro Performance Metrics

| Metric | Baseline (Aug 20, 2026) | Snapshot (Aug 25, 2026) | Current Live (Aug 29, 2026) | Delta / Trend |
| :--- | :---: | :---: | :---: | :---: |
| **Total Impressions** | 195 | 4,450 (4.45k) | **7,690 (7.69k)** | **+72.8%** (vs Aug 25) / **+3,843%** 🚀 |
| **Total Clicks** | 0 | 2 | **4** | **+100%** (Doubled organic clicks) |
| **Average Position** | 64.0 | 56.8 | **56.8** | Stable while ranking pool expanded by hundreds |
| **Average CTR** | 0.0% | 0.05% | **0.1%** | Upward inflection |
| **Total Query Terms Ranking** | ~25 | 793 distinct queries | **1,000+ distinct queries** | +207+ new ranking queries (hitting GSC 1,000 cap) |
| **Discovered, Not Yet Indexed** | 5 | 11 pages | **11 pages** | In crawl queue (`/about`, `/battery`, `/battery/battery-size-calculator`, `/battery/ups-battery-size-calculator`, `/battery/ups-runtime-calculator`, `/battery/voltage-drop-calculator`, `/ev/ev-charging-time-calculator`, `/privacy`, `/solar`, `/solar/solar-payback-calculator`) |
| **Pages with 301 Redirect** | 3 | 3 pages | **3 pages** | `http://powelab.org`, `https://powelab.org`, `http://www.powelab.org` (Proper canonical 301s) |

---

### 4.2 Top Performing Queries in Search Console (Aug 29, 2026)

| Query Term | Impressions | Clicks | Strategic Intent / Target Route |
| :--- | ---:| ---:| :--- |
| `electricity usage calculator` | **25** | 0 | `/home-energy/electricity-usage-calculator` |
| `solar panel angle calculator` | **25** | 0 | `/solar/solar-panel-tilt-calculator` |
| `solar panel output calculator` | **22** | 0 | `/solar/solar-panel-output-calculator` |
| `solar panel size calculator` | **22** | 0 | `/solar/solar-panel-size-calculator` |
| `solar power battery calculator` | **18** | 0 | `/solar/solar-battery-bank-size-calculator` |
| `solar yield calculation` | **18** | 0 | `/solar/solar-panel-output-calculator` |
| `central ac energy cost` | **17** | 0 | `/home-energy/air-conditioner-cost-calculator` |
| `home battery backup calculator` | **17** | 0 | `/home-energy/home-battery-size-calculator` |
| `ac cost calculator` | **15** | 0 | `/home-energy/air-conditioner-cost-calculator` |
| `how much kwh does a house use per day` | **15** | 0 | `/guides/how-many-kwh-does-a-house-use-per-day` |
| `solar production calculator` | **15** | 0 | `/solar/solar-panel-output-calculator` |
| `ev charging time calculator` | **14** | 0 | `/ev/ev-charging-time-calculator` |
| `mah berekenen` (NL/BE) | **14** | 0 | `/battery/battery-capacity-calculator` *(International reach)* |
| `battery backup calculator` | **14** | 0 | `/battery/battery-runtime-calculator` |
| `solar battery size calculator` | **12** | 0 | `/solar/solar-battery-bank-size-calculator` |
| `generator wattage calculator` | **12** | 0 | `/home-energy/generator-size-calculator` *(Surging)* |
| `charger calculator` | **12** | 0 | `/battery/battery-charging-time-calculator` |
| `generator size calculator` | **12** | 0 | `/home-energy/generator-size-calculator` *(Surging)* |
| `electricity calculator` | **11** | 0 | `/home-energy/electricity-usage-calculator` |
| `solar panel kilowatt hour calculator` | **11** | 0 | `/solar/solar-panel-output-calculator` |
| `how much power does a house use a day` | **10** | 0 | `/guides/how-many-kwh-does-a-house-use-per-day` |
| `solar battery storage calculator` | **10** | 0 | `/solar/solar-battery-bank-size-calculator` |
| `how to calculate solar panel output` | **10** | 0 | `/solar/solar-panel-output-calculator` |
| `what size generator for 150 amp service` | **10** | 0 | `/guides/emergency-generator-sizing-and-inrush-load-guide` |
| `zonnepanelen kwh calculator` (NL/BE) | **10** | 0 | `/solar/solar-panel-output-calculator` *(International reach)* |
| `backup generator size calculator` | **9** | 0 | `/home-energy/generator-size-calculator` |
| `portable generator wattage calculator` | **9** | 0 | `/battery/portable-power-station-calculator` |
| `standby generator sizing calculator` | **9** | 0 | `/home-energy/generator-size-calculator` |
| `solar panel kw calculator` | **9** | 0 | `/solar/solar-panel-size-calculator` |
| `calculate backup power requirements` | **9** | 0 | `/guides/battery-backup-runtime-calculation-guide` |
| `ev charging cost calculator` | **8** | 0 | `/ev/ev-charging-cost-calculator` |
| `12v battery run time calculator` | **8** | 0 | `/battery/battery-runtime-calculator` |
| `air conditioning energy savings calculator` | **8** | 0 | `/home-energy/air-conditioner-cost-calculator` |
| `standby generator size calculator` | **8** | 0 | `/home-energy/generator-size-calculator` |
| `peak shaving calculator` | **8** | 0 | `/solar/solar-battery-bank-size-calculator` |
| `pvwatts` / `pvwatts calculator` | **11** | 0 | `/solar/solar-panel-tilt-calculator` |
| `generac generator size calculator` | **7** | 0 | `/home-energy/generator-size-calculator` |
| `what size generator needed to run sump pump` | **6** | 0 | `/guides/emergency-generator-sizing-and-inrush-load-guide` |
| `comment calculer la capacité d'une batterie en ah` (FR) | **4** | 0 | `/battery/battery-capacity-calculator` *(International reach)* |
| `comment calculer la capacité d'une batterie en kwh` (FR) | **4** | 0 | `/battery/battery-capacity-calculator` *(International reach)* |

---

### 4.3 High-Value Query Clusters Momentum & Acceleration

```text
Cluster 1: Generator & Emergency Inrush Surge (Surging rapidly — 70+ impressions across 10 query variants)
• generator wattage calculator (12 imp)
• generator size calculator (12 imp)
• what size generator for 150 amp service (10 imp)
• backup generator size calculator (9 imp)
• standby generator sizing calculator (9 imp)
• portable generator wattage calculator (9 imp)
• calculate size of generator for home (8 imp)
• generac generator size calculator (7 imp)
• what size generator needed to run sump pump (6 imp)
• whole house generator sizing calculator (5 imp)
-> Target: Published Guide 7 (Emergency Generator Sizing & Motor Inrush Guide) is capturing this exact cluster.

Cluster 2: Solar Tilt, Output & Geometry (95+ impressions across variants)
• solar panel angle calculator (25 imp)
• solar panel output calculator (22 imp)
• solar panel size calculator (22 imp)
• solar yield calculation (18 imp)
• solar production calculator (15 imp)
• pvwatts / pvwatts calculator (11 imp)
• solar panel kilowatt hour calculator (11 imp)
-> Target: PVWatts V8 engine and Solar Tilt Latitude Guide driving authoritative organic discovery.

Cluster 3: Home Cooling & Heating Costs (48+ impressions)
• central ac energy cost (17 imp)
• ac cost calculator (15 imp)
• air conditioning energy savings calculator (8 imp)
• 1500 watts cost per hour (3 imp)
-> Target: Upcoming Guide 3 (Central AC & Heat Pump Electricity Cost Guide) scheduled to monopolize this intent.

Cluster 4: Battery Capacity, Runtime & International Ingestion
• solar power battery calculator (18 imp)
• home battery backup calculator (17 imp)
• battery backup calculator (14 imp)
• mah berekenen (14 imp - NL/BE)
• solar battery size calculator (12 imp)
• 12v battery run time calculator (8 imp)
• comment calculer la capacité d'une batterie en ah / kwh (8 imp - FR)
-> Target: Universal engineering formulas bridging multilingual European technical queries without ad tracking.
```

---

## 5. Verification Evidence

* Internal-link audit: 0 orphan pages, 0 single incoming link pages across all canonical routes.
* Meta tag audit: 0 titles > 60 chars (with `%s | PowerLab` template), 0 meta descriptions > 160 chars, 0 meta descriptions < 70 chars.
* OpenGraph audit: 100% complete OG metadata with dedicated 1200x630 category cards and Twitter cards across all 49 pages.
* IndexNow: Key verification route `/c94b7e8d1a2f43b68019e34a75d28b12.txt` active, all 49 URLs submitted with HTTP 202 Accepted.
* Production build: Clean Next.js 15 App Router static generation (63 static pages).
* Test suite: 54 test files, 248 Vitest tests passing.
* TypeScript typecheck: 0 errors (`tsc --noEmit`).

