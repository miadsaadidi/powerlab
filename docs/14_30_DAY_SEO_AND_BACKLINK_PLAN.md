# 14 — 30-Day SEO, Publishing & Backlink Execution Plan

## 1. 30-Day Growth Objectives

| Objective | Target (Day 30) | Measurement Tool |
| :--- | :---: | :--- |
| **Indexation Rate** | **100%** (38/38 canonical routes indexed) | Google Search Console (GSC) |
| **Search Impressions** | **25,000+ monthly impressions** | GSC Performance Report |
| **Organic Clicks** | **1,000+ organic visits/month** | GSC / Privacy-first Analytics |
| **Referring Domains** | **15–25 unique clean backlink domains** | Ahrefs / Moz / GSC Links |
| **AI Answer Citations** | Cited in Google AI Overviews & Perplexity for at least 3 Tier-1 queries | Manual SERP audits |

---

## 2. Weekly Execution Blueprint

```text
┌────────────────────────────────────────────────────────────────────────┐
│ WEEK 1 (Days 1–7)   : Technical Launch, Indexing & Seed Academic Core  │
├────────────────────────────────────────────────────────────────────────┤
│ WEEK 2 (Days 8–14)  : Daily 5 Outreach Batch 1 (Academia & Trade Media)│
├────────────────────────────────────────────────────────────────────────┤
│ WEEK 3 (Days 15–21) : Daily 5 Outreach Batch 2 (Vocational & Non-Profit│
├────────────────────────────────────────────────────────────────────────┤
│ WEEK 4 (Days 22–30) : Daily 5 Follow-ups, OER Indexing & PR Citations  │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Week 1 (Days 1–7): Technical Baseline & Accelerated Indexing

* [x] **Day 1 — Search Console & Webmaster Setup**:
  * Submit XML sitemap (`https://www.powelab.org/sitemap.xml`) to **Google Search Console** and **Bing Webmaster Tools**.
  * Confirm `robots.txt` cleanly permits all canonical routes and references the sitemap.
* [x] **Day 2 — Priority URL Inspection & Crawl Requests**:
  * Use GSC "URL Inspection" to manually request indexing on top priority canonical routes:
    1. `/battery/battery-runtime-calculator`
    2. `/solar/solar-panel-tilt-calculator`
    3. `/home-energy/electricity-usage-calculator`
    4. `/ev/ev-charging-time-calculator`
    5. `/battery/ups-runtime-calculator`
    6. `/battery/battery-capacity-calculator`
* [x] **Day 3 — Core Web Vitals & Mobile Usability Verification**:
  * Run Google PageSpeed Insights on mobile and desktop. Verify LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.05.
* [x] **Day 4 — Schema Rich Results Test & FAQ Markup**:
  * Test calculator URLs in Google's **Rich Results Test** tool to confirm valid `BreadcrumbList`, `WebApplication`, and `FAQPage` markup on all 30 calculator pages and 5 guides.
* [x] **Day 5–7 — Social & Entity Foundation & Dynamic Category OG Cards**:
  * Category-specific OpenGraph social cards for `/solar`, `/battery`, `/home-energy`, and `/ev`.
  * Set up clean brand profiles on GitHub, X (Twitter), LinkedIn, and Reddit to establish consistent entity authorship.

---

### Week 2 (Days 8–14): Daily 5 Outreach Sprints & Community Discovery

Target communities and authoritative institutions where educators, editors, and engineers actively seek transparent, ad-free calculations:

* [ ] **Daily 25-Minute Actionable Routine (Pillars 1–5 & Outreach)**:
  1. **Pillar 3 (Preferred Sources):** Check [google.com/preferences/source](https://www.google.com/preferences/source) for `PowerLab` / `powelab.org` to detect when Publication ID `CAowrJPNDA` is live in search preferences.
  2. **Pillar 2 (Mathematical Rigor):** GSC coverage & query inspection (monitor top impression queries like *ac cost*, *battery capacity*, *peukert*).
  3. **Pillar 4 (AI Overviews / GEO):** Spot-check 2 target keywords in Google AI Overviews and Perplexity to verify PowerLab direct answer citation.
  4. **Pillar 1 (Zero-Spam Trust Moat):** Scan 1 technical forum thread (DIY Solar, TMC, Reddit) complaining about solar lead-broker spam; share PowerLab with emphasis on *no email / 100% private*.
  5. **Pillar 5 (Institutional Outreach):** Send 5 targeted emails from `docs/outreach/04_*`.
  6. **Core 1 (Medium — DA 96):** 1 engineering teardown every 2 days (started Sep 1, 2026; tracker in [`docs/outreach/05_MEDIUM_PUBLISHING_AND_INTERLINKING_TRACKER.md`](file:///d:/powerlab/docs/outreach/05_MEDIUM_PUBLISHING_AND_INTERLINKING_TRACKER.md)).
  7. **Core 2 (DEV.to — DA 91):** 1 developer/TypeScript energy post every 2 days (started Sep 4, 2026; schedule in [`docs/outreach/08_DEV_TO_PUBLISHING_SCHEDULE_AND_TEMPLATES.md`](file:///d:/powerlab/docs/outreach/08_DEV_TO_PUBLISHING_SCHEDULE_AND_TEMPLATES.md)).
  8. **Core 3 (Harvard Dataverse — DA 93):** Deposit 1 flagship benchmark dataset/paper **every week** to mint permanent Harvard DOIs (`doi:10.7910/DVN/...`) (schedule in [`docs/outreach/09_HARVARD_DATAVERSE_DATASET_DEPOSIT_SCHEDULE.md`](file:///d:/powerlab/docs/outreach/09_HARVARD_DATAVERSE_DATASET_DEPOSIT_SCHEDULE.md)).
  9. **Core 4 (Academia.edu — DA 93):** Publish 2 working papers / discussion updates **per week** (schedule & tracker in [`docs/outreach/06_ACADEMIA_EDU_PUBLISHING_TEMPLATE.md`](file:///d:/powerlab/docs/outreach/06_ACADEMIA_EDU_PUBLISHING_TEMPLATE.md)).
  10. **Core 5 (Internet Archive — DA 99):** Permanent archival upload of every whitepaper, specification, and methodology document every 2 days (schedule in [`docs/outreach/12_INTERNET_ARCHIVE_PUBLISHING_SCHEDULE.md`](file:///d:/powerlab/docs/outreach/12_INTERNET_ARCHIVE_PUBLISHING_SCHEDULE.md)).
  11. **Academic Triad Integration:** Execute pipeline: *Academia.edu Working Paper (2x/wk) ➔ Internet Archive Preservation (1:1) ➔ Harvard Dataverse Flagship Selection (1x/wk DOI)*.

* [x] **Day 8 — AlternativeTo Submission & Indexing (DA 84)**:
  * Submit PowerLab to **AlternativeTo.net** as an open-access, ad-free alternative to *PVWatts*, *Victron MPPT Calculator*, *HOMER Energy*, and *SolarEdge Designer*.
* [x] **Day 9 — Hacker News Launch (Show HN - DA 91)**:
  * Post to Hacker News: *"Show HN: PowerLab – Open-access, deterministic energy planning calculators for solar, battery & EV"*.
* [x] **Day 10 — High-Authority Engineering Forums (DIY Solar Forum & Tesla Motors Club)**:
  * Share the battery runtime and EV breaker calculators in dedicated software/tools sub-forums (*DIY Solar Power Forum by Will Prowse*, *Tesla Motors Club Energy*).
* [x] **Day 11 — Product Directory Submissions & Show HN**:
  * Submit to curated software directories: AlternativeTo, Product Hunt, and Hacker News Show HN.
* [x] **Day 12 — Daily 5 Outreach (Batch 1: University Engineering Faculty .edu)**:
  * Sent 5 personalized technical pitches to top academic energy programs (Stanford S3L, NREL PV reliability, Appalachian State, UT Knoxville CURENT, NC State NCCETC).
  * **Working Papers Live on Academia.edu & Internet Archive**.
* [x] **Day 13 — Daily 5 Outreach (Batch 2: Electrical Apprentice Training Directors)**:
  * Sent 5 technical pitches to national apprenticeship leadership (NJATC, IBEW Local 134, NECA NorCal, NABCEP, Lincoln Tech) on **August 26, 2026**.
  * **7-Day Follow-Up Scheduled**: **September 2, 2026**.
  * Reference: `docs/outreach/04_DAILY_5_OUTREACH_TARGETS_AND_PITCHES.md` (#6 to #10).
* [x] **Day 14 — Daily 5 Outreach (Batch 3: Clean Energy Trade Media Editorial Directors)**:
  * Sent 5 technical pitches to senior editors and directors (*Solar Power World, InsideEVs, EC&M Magazine, Canary Media, PV Magazine*) on **September 4, 2026**.
  * **7-Day Follow-Up Scheduled**: **September 11, 2026** (72h check: **September 7, 2026**).
  * Reference: `docs/outreach/04_DAILY_5_OUTREACH_TARGETS_AND_PITCHES.md` (#11 to #15).

---

### Week 3 (Days 15–21): Daily 5 Outreach (Batch 4–5) & Search Console Query Mining

* **Day 15 — Daily 5 Outreach (Batch 4: State Clean Energy Centers & Extension Offices)**:
  * Send 5 pitches to university energy extension offices (FSEC UCF, UT Austin Energy Institute, CU Boulder / HOMER, NCCETC Policy, UC Davis EEI).
  * See templates: `docs/outreach/04_DAILY_5_OUTREACH_TARGETS_AND_PITCHES.md` (#16 to #20).
* **Day 16 — Daily 5 Outreach (Batch 5: Clean Energy Advocacy & Consumer Coalitions)**:
  * Send 5 pitches to non-profits and industry associations (Plug In America, SEIA, Energy Innovation, Electrek, ILSR).
  * See templates: `docs/outreach/04_DAILY_5_OUTREACH_TARGETS_AND_PITCHES.md` (#21 to #25).
* **Day 17 — Daily 5 Outreach (Batch 6: Open Educational Resources & STEM Libraries)**:
  * **OER Commons (DA 76+) Live Listing:** [`https://oercommons.org/courses/powerlab-deterministic-energy-systems-battery-storage-modeling-suite`](https://oercommons.org/courses/powerlab-deterministic-energy-systems-battery-storage-modeling-suite) *(Completed & indexed across university OER catalogs)*.
  * Send pitches to remaining STEM repositories (LibreTexts Engineering, MERLOT Engineering, Creative Commons).
  * See templates: `docs/outreach/04_DAILY_5_OUTREACH_TARGETS_AND_PITCHES.md` (#26 to #30).
* **Day 18 — 72-Hour Polite Follow-Up Cadence**:
  * Execute standard 2-sentence follow-up on Batches 1–3 threads that haven't replied.
* **Day 19 — GSC Search Impression & Snippet CTR Audit**:
  * In GSC, filter by `Pages` and sort by `Impressions`. Identify queries ranking in positions **4–15** with low CTR and refine title/snippet tags.
* **Day 20–21 — Generative Engine (GEO) Audit & Internal Link Strengthening**:
  * Query ChatGPT Search, Perplexity AI, and Google AI Overviews for primary calculator intents. Ensure direct answer blocks match extractable LLM formatting.

---

### Week 4 (Days 22–30): High-DA PR Linkage & Institutional Syllabus Inclusion

* **Day 22–24 — Educational Courseware & Syllabus Follow-up**:
  * Confirm links and syllabus citations from vocational and university outreach.
  * Offer customized embed codes or markdown equation snippets for course portals.
* **Day 25–27 — Energy Blogger & Clean Tech Guest Contribution**:
  * Contact clean energy bloggers (CleanTechnica, Electrek contributors, Solar Reviewers). Offer custom worked examples for their battery/solar buying guides.
* **Day 28–29 — Working Paper Syndication Update**:
  * Post discussion updates on Academia.edu and Internet Archive linking to the latest interactive guides.
* **Day 30 — Month 1 Review & Month 2 Keyword Target Setting**:
  * Review rankings across all 30 primary keywords.
  * Set Phase 2 expansion targets for competitive Tier-2 head terms (`energy bill calculator`, `electricity usage calculator`).

---

## 3. Verified High-DA Publishing, Academic & Research Platforms (Core 5 Authority Network)

To build unbreakable domain authority, authoritative academic citation signals, and Google Scholar / AI overview references, syndicate technical papers, developer teardowns, and calculation models across these **5 verified high-DA publishing platforms (no approval delays, direct editorial control)**:

| Priority | Platform | Domain Authority (DA) | Best Use & Content Format | Cadence & Launch Date | Verification / Speed |
| :---: | :--- | :---: | :--- | :---: | :--- |
| **🥇 Core 1** | **Medium** (`medium.com`) | **96** | 1 engineering teardown or physical principles explainer with dual citations & links to `powelab.org` | **Every 2 days**<br>(Started Sept 1, 2026) | Free account, **instant live publication & indexation** |
| **🥈 Core 2** | **DEV.to** (`dev.to`) | **91** | 1 developer-first computational engineering article (TypeScript math engines, client-side simulation, zero-storage architecture) | **Every 2 days**<br>(Starts Sept 4, 2026) | Free account, **instant live indexing & RSS dev syndication** |
| **🥉 Core 3** | **Harvard Dataverse** (`dataverse.harvard.edu`) | **93** | 1 open benchmark research dataset & simulation matrix deposit with citable Harvard DOI (`doi:10.7910/DVN/...`) | **Every week**<br>(Starts Sept 4, 2026) | Harvard IQSS account, **instant DOI minting & .edu link equity** |
| **4th Core** | **Academia.edu** (`academia.edu`) | **93** | Upload Working Papers, Technical Reports, and post 2×/week technical discussion updates | **2× / week** | Free account, **instant live profile & backlink** |
| **5th Core** | **Internet Archive** (`archive.org`) | **99** | 1 permanent open-access PDF, technical report, engineering methodology specification, or benchmark data archive upload | **Every 2 days**<br>(Starts Sept 4, 2026) | Free account, **instant worldwide publication & permanent Wayback indexing** |
| *Secondary* | **OSF / ECSarXiv** (`osf.io`) | **88** | Open Science Framework preprint server | As needed | Free, subject to 24–48h community moderation queue |
| *Secondary* | **SSRN / Zenodo / ResearchGate** | **91–93** | Institutional preprints & CERN Open Science | As needed | Subject to network/institutional email requirements |

### Open Benchmark Dataset & Paper Publication Roster:
- **Dataset 1 (Harvard Dataverse — Week 1):** *50-State NREL PV Solar Irradiance, Peak Sun Hours, and ASHRAE Climatic Design Conditions Dataset (1991–2020)* — [`/solar/regional-climate-data`](https://www.powelab.org/solar/regional-climate-data) &bull; Harvard Dataverse DOI
- **Dataset 2 (Harvard Dataverse — Week 2):** *Residential Level 2 EVSE Continuous-Duty Thermal Sizing, Terminal Temperature De-rating, and Voltage Drop Benchmark Dataset* — [`/research/continuous-duty-thermal-sizing-evse-ampacity`](https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity)
- **Dataset 3 (Harvard Dataverse — Week 3):** *Cold-Climate Air-Source Heat Pump (ccASHP) Non-Linear COP Degradation, Reverse-Cycle Defrost Penalties, and Auxiliary Heat Staging Simulation Dataset* — [`/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics`](https://www.powelab.org/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics)
- **Dataset 4 (Harvard Dataverse — Week 4):** *Inductive Motor Inrush Currents, Locked Rotor Amps (LRA) Code Letters, and Generator Transient Reactance Loading Matrix* — [`/research/deterministic-inrush-load-stacking-generator-sizing`](https://www.powelab.org/research/deterministic-inrush-load-stacking-generator-sizing)
- **Paper 1 (Live):** *Continuous-Duty Thermal Sizing, Conductor Terminal Limits, and Branch Circuit Ampacity Requirements for Residential Level 2 EVSE (NEC 625, 310 & 110.14(C))* — [`/research/continuous-duty-thermal-sizing-evse-ampacity`](https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity)
- **Paper 2 (Live):** *Thermal Degradation Kinetics, Auxiliary Electric Resistance Staging, and Seasonal HSPF2/COP Derating in Cold-Climate Air-Source Heat Pumps* — [`/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics`](https://www.powelab.org/research/heat-pump-cop-degradation-and-auxiliary-heat-kinetics)
- **Paper 3 (Live):** *Deterministic Modeling of Inductive Motor Inrush Currents and Non-Coincident Load Stacking for Residential Backup Power Systems (NEC 702 & NEMA MG-1)* — [`/research/deterministic-inrush-load-stacking-generator-sizing`](https://www.powelab.org/research/deterministic-inrush-load-stacking-generator-sizing)
- **Paper 4 (Live):** *Ground View Factor Transposition, Snow Albedo Dynamics, and Sub-Zero Open-Circuit Voltage Expansion in Photovoltaic Arrays (NEC 690 & Perez Anisotropic Models)* — [`/research/ground-view-factor-snow-albedo-pv-tilt`](https://www.powelab.org/research/ground-view-factor-snow-albedo-pv-tilt)

---

### Academic Preprint & Whitepaper Publishing SOP (Sync with `/research` Hub):

Whenever a new research paper or technical report is published, execute this 6-step synchronization protocol:

```text
Draft in docs/papers/
  └── Generate PDF to public/whitepapers/
        └── Register in src/data/research-papers.ts
              └── Auto-sync: /research, /sitemap.xml, /llms.txt, Google Scholar Highwire tags
                    └── Upload to Academia.edu / Internet Archive / Harvard Dataverse
                          └── Send Daily 5 Academic Outreach Batch
```

1. **Step 1 (Source Files):** Place the markdown working paper in `docs/papers/` and compile the formatted PDF to `public/whitepapers/[paper-slug].pdf`.
2. **Step 2 (Digital Identifier):** Mint a citable DOI via **Harvard Dataverse** or **Zenodo** (CERN).
3. **Step 3 (Registry Ingestion):** Add the paper object to [`src/data/research-papers.ts`](file:///d:/powerlab/src/data/research-papers.ts) (`id`, `slug`, `reportNumber`, `title`, `abstract`, `doi`, `pdfUrl`, `standards`, `keyFindings`, `equations`, `bibtex`, `apaCitation`).
4. **Step 4 (Automated Site Cascade):**
   - The [`/research`](https://www.powelab.org/research) hub renders the new paper card with 1-click PDF download & citation export.
   - The canonical reader route [`/research/[slug]`](https://www.powelab.org/research) renders with Highwire Press metadata (`citation_title`, `citation_author`, `citation_doi`, `citation_pdf_url`) for instant **Google Scholar** and **Semantic Scholar** indexing.
   - [`/sitemap.xml`](https://www.powelab.org/sitemap.xml) automatically includes the new route via dynamic `getSitemapPaths()`.
   - [`/llms.txt`](https://www.powelab.org/llms.txt) references the paper for AI grounding.
5. **Step 5 (Academic Triad Syndication):**
   - Upload working paper and discussion points to **Academia.edu** (DA 93).
   - Universal archival upload of the PDF / technical report to **Internet Archive** (DA 99).
   - If selected as the weekly flagship benchmark dataset/paper, deposit to **Harvard Dataverse** (DA 93) to mint a permanent Harvard DOI (`doi:10.7910/DVN/...`).
6. **Step 6 (Outreach Trigger):** Reference the preprint URL and DOI in the next Daily 5 academic email sprint (`docs/outreach/04_*`).

---

## 4. Daily 5 Institutional Outreach Execution System

To guarantee high conversion and prevent spam flags, every outreach email MUST follow these 4 non-negotiable rules:

1. **Hyper-Personalized Engineering Context:** Open with direct reference to the target's recent paper, course syllabus, editorial focus, or code cycle challenge (e.g. NEC 625 continuous load, Peukert derating, cold $V_{oc}$ expansion).
2. **Deterministic Value-First Offer:** Never ask for a link directly in the first line. Offer the open mathematical dataset, step-by-step formula breakdown, or interactive visual tool for their course/editorial.
3. **No Commercial Trap:** Explicitly state that PowerLab is 100% free, ad-free, and requires zero student/user registration.
4. **Follow-Up Discipline:** Exactly one polite 2-sentence follow-up after 72 business hours. Never send a third unprompted message.

Full roster of 30 ready-to-send daily email templates: [`docs/outreach/04_DAILY_5_OUTREACH_TARGETS_AND_PITCHES.md`](file:///d:/powerlab/docs/outreach/04_DAILY_5_OUTREACH_TARGETS_AND_PITCHES.md)

---

## 5. Key Performance Indicators (KPI Tracker)

| KPI Metric | Baseline (Day 1) | Target (Day 15) | Target (Day 30) |
| :--- | :---: | :---: | :---: |
| **Indexed Pages** | ~0 | 35+ | 47 (100%) |
| **Outreach Emails Sent** | 0 | 40 | 150 (5/day) |
| **Outreach Positive Response Rate** | — | >15% | >20% |
| **GSC Average Position (Tier 1)** | — | <25 | Top 10 |
| **Daily Organic Impressions** | 0 | 500+ | 1,500+ |
| **Referring Domains (Ahrefs)** | 0 | 5+ | 15–25 |
| **Brand Searches ("PowerLab energy")** | 0 | 50+ | 200+ |
