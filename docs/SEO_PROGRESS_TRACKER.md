# SEO Execution & Progress Tracker - PowerLab

**Domain:** `https://www.powelab.org`  
**Last Updated:** August 27, 2026  
**Status:** Technical SEO baseline complete; 7 flagship educational link magnets published; 61 canonical URLs active & live on Vercel production

---

## 1. Completed Milestones (Do Not Repeat)

| Task Area | Action Completed | Date / Status | Notes & Verification |
| :--- | :--- | :--- | :--- |
| **GSC & Webmaster** | Google Search Console verification | Completed | Domain property and URL prefix verified |
| **GSC & Webmaster** | Bing Webmaster Tools setup | Completed | Search console imported/verified |
| **Sitemap Submission** | `sitemap.xml` updated | Completed | Dynamic route `/sitemap.xml`; inventory exposes **61 canonical URLs**: 30 calculators, 4 category hubs, 7 comprehensive technical guides and root/utility/legal pages |
| **Flagship Educational Guides** | In-depth technical guides & link magnets | Completed | Published: (1) Battery Backup Runtime Formula Guide, (2) Level 2 EV Charging Speed & Breaker Guide, (3) Solar Panel Tilt by Latitude Guide, (4) MPPT vs PWM Sizing Guide, (5) Daily Household kWh Usage Guide, (6) Voltage Drop & Wire Size Guide, (7) **Emergency Generator Sizing & Motor Inrush Guide (Aug 27 — Live with embedded `<GeneratorSizeCalculator />`)** |
| **URL Inspection** | Priority URL Indexing Requests | Completed (Aug 27) | Priority inspection submitted for: `/guides/emergency-generator-sizing-and-inrush-load-guide`, `/guides/voltage-drop-and-wire-size-calculation-guide`, `/sitemap.xml` |
| **Community Policy** | Reddit policy update | August 26, 2026 | Removed Reddit outreach in favor of high-authority academic syndication and direct peer engineering pitches |
| **Directory Submissions** | Free tool aggregators and Show HN | Completed | Submitted to directory catalogs and tech showcases |
| **FAQ & Speakable Schema** | `FAQPage` & `SpeakableSpecification` JSON-LD | Completed (Aug 27) | Added Schema.org `speakable` selectors (`.direct-answer-card`, `h1`) and professional audience metadata across all calculators and guides for Google AI Overviews and GEO |
| **WebApplication & Article Schema** | `WebApplication`, `TechArticle`, `BreadcrumbList` | Completed | Validated in Google Rich Results Test; all 30 calculators pass verified engineering standards citations (`isBasedOn` & `citation`) for IEEE, NEC, UL, IEC, and NREL |
| **Root OpenGraph Card** | Root `opengraph-image.tsx` | Completed | 1200x630 dynamic Next.js OG preview |
| **Category OG Cards** | Category-specific `opengraph-image.tsx` | Completed | Dedicated cards created for `/solar`, `/battery`, `/home-energy`, and `/ev` |
| **Internal Linking Graph** | Guides-to-tools & tools-to-guides reciprocal workflow links | Completed | Bidirectional links between guides and corresponding calculators (`battery-runtime`, `ev-charging-time`, `solar-panel-tilt`, `generator-size`, `voltage-drop`, etc.) |
| **Phase 5 SERP and Keyword Research** | Keyword Planner and SERP Analysis | Completed | 10 high-impact expansion specs and canonical maps added |
| **Community & Academic Outreach Kit** | Technical distribution templates (`docs/outreach/`) | Completed | Turnkey worked examples for DIY Solar Forum, Tesla Motors Club, and university/vocational OER syllabus pitches |
| **High-DA Academic Paper Syndication** | Working Papers 1, 2 & 3 (Live on Academia.edu & Figshare) | Completed (August 26, 2026) | Paper 1 (Academia/Figshare/Archive). Paper 2 (DOI: 10.6084/m9.figshare.33321774). **Paper 3 Published on Academia.edu** (*Deterministic Modeling of Inductive Motor Inrush Currents and Non-Coincident Load Stacking for Residential Backup Power Systems*) |
| **AlternativeTo Directory Submission** | Listing submitted with PVWatts & HOMER alternatives | Completed (August 24, 2026) | PoweLab profile submitted to AlternativeTo.net (DA 84) linked to PVWatts, HOMER Pro, and PVsyst |
| **Daily 5 High-Impact Outreach Sprint** | 30 Turnkey Email Pitches (`docs/outreach/04_*`) | In Progress (Batch 3 Active) | **Batch 1 (Aug 24)**: Stanford, NREL (`pvwatts@nrel.gov`), AppState, UTK, NC State.<br>**Batch 2 (Aug 26)**: NJATC, IBEW 134, NECA NorCal, NABCEP, Lincoln Tech.<br>**Batch 3 (Aug 27 — Today)**: Trade Media Editors (*Solar Power World*, *InsideEVs*, *EC&M*, *Canary Media*, *PV Magazine*). |
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
| **Batch 4** | State Clean Energy Centers & Extensions (FSEC, UT Austin, CU Boulder, NCCETC, UC Davis) | August 28, 2026 | September 4, 2026 | Queued for tomorrow |
| **Batch 5** | Advocacy Non-Profits & EV Coalitions (Plug In America, SEIA, Energy Innovation, Electrek, ILSR) | August 29, 2026 | September 5, 2026 | Queued |
| **Batch 6** | Open Educational Resources & STEM Libraries (LibreTexts, MIT OCW, OER Commons, MERLOT, CC) | August 30, 2026 | September 6, 2026 | Queued |

---

## 3. Technical SEO Baseline Status

* **Robots.txt**: Cleanly permits all canonical pages and references `https://www.powelab.org/sitemap.xml`.
* **Canonical URLs**: All 61 pages define explicit canonical URLs.
* **Sitemap inventory**: 61 canonical URLs: 30 calculators, 4 category hubs, 7 guide routes, the homepage and root/utility/legal pages.
* **Sitemap freshness**: Timestamps omitted to preserve honest indexing crawl frequency.
* **Semantic hierarchy**: Calculator and content pages use a single `<h1>` with semantic `<article>`, `<section>` and breadcrumb navigation.
* **Structured data graph**:
  * Root: `Organization` and `WebSite` with `SearchAction`.
  * Category hubs: `CollectionPage`, `ItemList` and `BreadcrumbList`.
  * Calculators: `WebApplication` (free/0 USD), `BreadcrumbList`, `SpeakableSpecification`, and visible-content `FAQPage` across all 30 routes.
  * Guides: `TechArticle`, `BreadcrumbList`, `SpeakableSpecification`, standard citations (`IEEE`, `NEC`, `IEC`, `SAE`, `NREL`, `NEMA`, `ISO`) and `FAQPage` across all 7 guides.
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
| **Step 6: Pillar 5 (Follow-Up & Papers)** | **72-Hour Follow-Up & Academic Paper Syndication (2 mins)**<br>Check outreach replies. Send polite 2-sentence follow-ups for threads sent 72 hours ago. On scheduled days, update paper discussions on Academia.edu and Figshare (DOI: `10.6084/m9.figshare.33321774`). | Academia.edu / Figshare | >15% institutional response rate and permanent high-DA backlinks |

---

### 3.2 Daily 5 Outreach Schedule & Rotation (Batches 1–6)

* **Batch 1 (Day 1):** University Engineering Faculty (.edu) — *Stanford, NREL, AppState, UTK, NC State* (Sent Aug 24; Follow-up: Aug 31)
* **Batch 2 (Day 2):** Electrical Apprenticeship & Vocational Directors — *NJATC, IBEW 134, NECA NorCal, NABCEP, Lincoln Tech* (Sent Aug 26; Follow-up: Sep 2)
* **Batch 3 (Day 3):** Clean Energy Trade Media Editors — *Solar Power World, InsideEVs, EC&M, Canary Media, PV Magazine* (Sent Aug 27; Follow-up: Sep 3)
* **Batch 4 (Day 4):** State Clean Energy Centers & Extensions — *FSEC UCF, UT Austin Energy Institute, CU Boulder, NCCETC, UC Davis* (Queued Batch 4)
* **Batch 5 (Day 5):** Clean Energy Advocacy Non-Profits & EV Coalitions — *Plug In America, SEIA, Energy Innovation, Electrek, ILSR*
* **Batch 6 (Day 6):** Open Educational Resources (OER) & Digital STEM Libraries — *LibreTexts Engineering, MIT OCW, OER Commons, MERLOT, Creative Commons*

---

### 3.3 High-DA Academic Paper & Backlink Platforms (Core Trio)

To establish unbreakable domain authority and AI trust signals, maintain active publications across the Core 3 verified platforms:
1. **Academia.edu (DA 93):** Profile active. Post 2×/week technical discussion updates linking to new interactive guides.
2. **Figshare (DA 90):** Working Paper #2 live with citable DOI (`10.6084/m9.figshare.33321774`). Paper 3 scheduled for upload.
3. **Internet Archive (DA 99):** Permanent open-access PDF archive with live canonical source links.

---

## 4. Google Search Console Baseline Snapshot (August 25, 2026)

### 4.1 Macro Performance Metrics

| Metric | Previous Baseline (Aug 20, 2026) | Current Baseline (Aug 25, 2026) | Delta / Trend |
| :--- | :---: | :---: | :---: |
| **Total Impressions** | 195 | **4,450 (4.45k)** | **+2,182%** 🚀 |
| **Total Clicks** | 0 | **2** | +2 clicks (Solar Panel Size & Methodology) |
| **Average Position** | 64.0 | **56.8** | +7.2 positions improvement |
| **Total Query Terms Ranking** | ~25 | **793 distinct queries** | +768 new ranking keywords |
| **Pages in Active Index** | 18 | **32 pages** | +14 newly indexed canonical URLs |
| **Discovered, Not Yet Indexed** | 5 | **11 pages** | In queue for crawl budget allocation |
| **Pages with 301 Redirect** | 3 | **3 pages** | `http://powelab.org`, `https://powelab.org`, `http://www.powelab.org` (Healthy) |

---

### 4.2 Top Performing URLs by Organic Search Impressions (Aug 25, 2026)

| Rank | Canonical URL / Page | Impressions | Clicks | Primary Ranking Query Theme |
| :---: | :--- | ---:| ---:| :--- |
| 1 | `/home-energy/air-conditioner-cost-calculator` | **580** | 0 | `ac cost calculator`, `central ac energy cost`, `air conditioning cost per month` |
| 2 | `/battery/battery-capacity-calculator` | **568** | 0 | `battery backup calculator`, `home battery backup calculator`, `mah to kwh`, `ah to kwh` |
| 3 | `/home-energy/energy-bill-calculator` | **359** | 0 | `electricity usage calculator`, `energy bill calculator`, `calculate utility bills` |
| 4 | `/solar/solar-panel-output-calculator` | **357** | 0 | `solar panel output calculator`, `how to calculate solar panel output`, `solar yield calculation` |
| 5 | `/ev/ev-range-calculator` | **320** | 0 | `electric vehicle range calculator`, `ev range calculator`, `ev calculate` |
| 6 | `/guides/how-many-kwh-does-a-house-use-per-day` | **275** | 0 | `how many kwh does a house use per day`, `average household electricity consumption` |
| 7 | `/home-energy/electricity-usage-calculator` | **266** | 0 | `electricity usage calculator`, `electric consumption calculator` |
| 8 | `/battery/battery-charging-time-calculator` | **251** | 0 | `battery charge time calculator`, `calculate charge time`, `charging speed calculator` |
| 9 | `/home-energy/generator-size-calculator` | **192** | 0 | `generator wattage calculator`, `calculate size of generator for home`, `standby generator size` |
| 10 | `/battery/battery-runtime-calculator` | **191** | 0 | `battery runtime calculator`, `calculate runtime of battery`, `inverter runtime calculator` |
| 11 | `/` (Homepage Hub) | **155** | 0 | Brand and broad energy planning terms |
| 12 | `/solar/solar-panel-size-calculator` | **153** | 1 | `solar panel size calculator`, `solar power size calculator` |
| 13 | `/solar/solar-battery-bank-size-calculator` | **95** | 0 | `solar battery storage calculator`, `solar panel battery bank calculator` |
| 14 | `/home-energy/space-heater-cost-calculator` | **85** | 0 | `space heater cost calculator`, `1500 watt heater cost per hour` |
| 15 | `/solar/solar-panel-tilt-calculator` | **84** | 0 | `solar panel angle calculator`, `tilt angle solar panel calculator` |
| 16 | `/battery/portable-power-station-calculator` | **76** | 0 | `portable power station calculator`, `solar charger calculator` |
| 17 | `/home-energy/home-battery-size-calculator` | **75** | 0 | `home battery backup calculator`, `home battery capacity calculator` |
| 18 | `/home-energy/appliance-wattage-calculator` | **66** | 0 | `appliance wattage`, `household appliance wattage calculator` |
| 19 | `/methodology` | **59** | 1 | Citations, formula transparency, NREL model methodology |
| 20 | `/ev/ev-savings-calculator` | **49** | 0 | `ev vs gas savings calculator`, `electric car savings calculator` |
| 21 | `/solar/solar-charge-controller-calculator` | **47** | 0 | `sizing solar charge controller`, `mppt charge controller calculator` |

---

### 4.3 High-Value Query Clusters Tracked for Position Acceleration

```text
Cluster 1: Generator & Emergency Power (192+ impressions)
• generator wattage calculator (7 imp)
• standby generator sizing calculator (6 imp)
• calculate size of generator for home (6 imp)
• what size generator needed to run sump pump (4 imp)
• what size generator for 150 amp service (4 imp)
-> Target: Release Guide 2 (Aug 27) to capture Top 10 positions.

Cluster 2: HVAC & Cooling/Heating Costs (665+ impressions)
• ac cost calculator (10 imp)
• central ac energy cost (10 imp)
• air conditioning energy savings calculator (5 imp)
• 1500 watt heater cost per hour (2 imp)
-> Target: Release Guide 3 & Guide 5 to capture high seasonal volume.

Cluster 3: Battery Capacity & Conversions (759+ impressions)
• solar power battery calculator (10 imp)
• home battery backup calculator (9 imp)
• mah berekenen / mah to kwh (8 imp)
• 12v battery run time calculator (5 imp)
-> Target: Expand technical guides with interactive SVG calculators.
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

