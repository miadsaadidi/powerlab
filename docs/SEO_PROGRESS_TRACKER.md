# SEO Execution & Progress Tracker - PowerLab

**Domain:** `https://www.powelab.org`  
**Last Updated:** August 22, 2026
**Status:** Technical SEO baseline complete; 5 flagship educational link magnets published; 47 canonical sitemap URLs active

---

## 1. Completed Milestones (Do Not Repeat)

| Task Area | Action Completed | Date / Status | Notes & Verification |
| :--- | :--- | :--- | :--- |
| **GSC & Webmaster** | Google Search Console verification | Completed | Domain property and URL prefix verified |
| **GSC & Webmaster** | Bing Webmaster Tools setup | Completed | Search console imported/verified |
| **Sitemap Submission** | `sitemap.xml` updated | Completed | Dynamic route `/sitemap.xml`; route inventory exposes **47 canonical URLs**: 30 calculators, 4 category hubs, 5 comprehensive technical guides and 8 root/utility/legal pages |
| **Flagship Educational Guides** | In-depth technical guides & link magnets | Completed | Published: (1) Battery Backup Runtime Formula Guide, (2) Level 2 EV Charging Speed & Breaker Guide, (3) Solar Panel Tilt by Latitude Guide, (4) MPPT vs PWM Sizing Guide, (5) Daily Household kWh Usage Guide |
| **URL Inspection** | Priority URL Indexing Requests | Completed | Top 5 flagship tools requested for immediate crawl |
| **Community Seeding** | Day 1 Community Value Drops | Completed | Shared in target Reddit (r/Solar, r/EVcharging, r/VanLife) and tech communities |
| **Directory Submissions** | Free tool aggregators and Show HN | Completed | Submitted to directory catalogs and tech showcases |
| **FAQ Schema Markup** | `FAQPage` JSON-LD on all 30 calculators & 5 guides | Completed | Pass verified `faqs: FAQS` into `buildCalculatorStructuredData` and `buildGuideStructuredData` |
| **WebApplication & Article Schema** | `WebApplication`, `TechArticle`, `BreadcrumbList` | Completed | Validated in Google Rich Results Test; all 30 calculators pass verified engineering standards citations (`isBasedOn` & `citation`) for IEEE, NEC, UL, IEC, and NREL |
| **Root OpenGraph Card** | Root `opengraph-image.tsx` | Completed | 1200x630 dynamic Next.js OG preview |
| **Category OG Cards** | Category-specific `opengraph-image.tsx` | Completed | Dedicated cards created for `/solar`, `/battery`, `/home-energy`, and `/ev` |
| **Internal Linking Graph** | Guides-to-tools & tools-to-guides reciprocal workflow links | Completed | Bidirectional links between guides and corresponding calculators (`battery-runtime`, `ev-charging-time`, `solar-panel-tilt`, `solar-charge-controller`, etc.) |
| **Phase 5 SERP and Keyword Research** | Keyword Planner and SERP Analysis | Completed | 10 high-impact expansion specs and canonical maps added |
| **Community & Academic Outreach Kit** | Technical distribution templates (`docs/outreach/`) | Completed | Turnkey worked examples for Reddit (`r/Solar`, `r/evcharging`, `r/VanLife`), DIY Solar Forum, Tesla Motors Club, and university/vocational OER syllabus pitches |
| **High-DA Academic Paper Syndication** | Working Paper 1 (Live) & Paper 2 (Live on Figshare) | Completed (August 24, 2026) | Paper 1 published on Academia.edu and Figshare. **Paper 2 Published on Figshare with live citable DOI**: `10.6084/m9.figshare.33321774` (*Continuous-Duty Thermal Sizing for Level 2 EVSE under NEC 625/310*) |
| **Forum & Community Q&A Seeding** | DIY Solar Power Forum & EV Community Drops | August 23, 2026 | Technical solutions for Inverter DC wire sizing, NEC 80% continuous breaker sizing, and Hacker News Show HN |
| **Daily 5 High-Impact Outreach Sprint** | 30 Turnkey Email Pitches (`docs/outreach/04_*`) | In Progress (Day 1 Complete) | **Day 1 Sent (5/5)**: Dr. Ram Rajagopal (Stanford), Dr. Christiana Honsberg (ASU QESST), Dr. Stephen Zubrick (Appalachian State), Dr. Chien-Fei Chen (NSF CURENT / UTK), Dr. Joshua Pearce (Western Univ / FAST) |
| **Ground Albedo & Snow Shedding Model** | Added to Solar Tilt Calculator & Formula Card | August 23, 2026 | Implemented Perez ground view factor and snow backscatter reflectance gain in engine, UI card, and tests |

---

## 2. Technical SEO Baseline Status

* **Robots.txt**: Cleanly permits all canonical pages and references `https://www.powelab.org/sitemap.xml`.
* **Canonical URLs**: All 47 pages define explicit canonical URLs.
* **Sitemap inventory**: 47 canonical URLs: 30 calculators, 4 category hubs, 5 guide routes, the homepage and 7 utility/legal pages.
* **Sitemap freshness**: Timestamps omitted to preserve honest indexing crawl frequency.
* **Semantic hierarchy**: Calculator and content pages use a single `<h1>` with semantic `<article>`, `<section>` and breadcrumb navigation.
* **Structured data graph**:
  * Root: `Organization` and `WebSite` with `SearchAction`.
  * Category hubs: `CollectionPage`, `ItemList` and `BreadcrumbList`.
  * Calculators: `WebApplication` (free/0 USD), `BreadcrumbList` and visible-content `FAQPage` across all 30 routes.
  * Guides: `TechArticle`, `BreadcrumbList`, standard citations (`IEEE`, `NEC`, `IEC`, `SAE`, `NREL`) and `FAQPage` across all 5 guides.
* **Internal linking**: Guides, category hubs, and calculators expose bidirectional next-step links across Home Energy, Solar, Battery, and EV planning paths.

---

## 3. Next Steps (Upcoming Roadmap)

1. **Daily 5 Outreach Execution (Days 1–6):**
   * Execute 5 daily pitches every morning using the pre-compiled templates in [`docs/outreach/04_DAILY_5_OUTREACH_TARGETS_AND_PITCHES.md`](file:///d:/powerlab/docs/outreach/04_DAILY_5_OUTREACH_TARGETS_AND_PITCHES.md).
   * Day 1: University Engineering Faculty (.edu)
   * Day 2: Electrical Apprentice & IBEW/NECA Training Directors
   * Day 3: Clean Energy Trade Media Editorial Directors
   * Day 4: State Clean Energy Centers & University Extensions
   * Day 5: Clean Energy Advocacy Non-Profits & EV Coalitions
   * Day 6: Open Educational Resources (OER) & Digital STEM Libraries
   * Log positive responses and links in referring domains tracker.

2. **Search performance loop:**
   * Monitor GSC Coverage for indexed URL count.
   * Check Core Web Vitals field data in Search Console.
   * Mine queries ranking in positions 4-15 with low CTR once Search Console provides a usable query set; current evidence is only 195 impressions at average position 64.
   * Do not change titles or meta descriptions from the current low-volume sample.
   * Improve the strongest existing page before creating new keyword pages.

3. **Authority and distribution:**
   * Direct forum Q&A answer links on specialized DIY, solar and EV forums.
   * Target university or technical-school educational outreach for clean backlinks.
   * Pursue high-authority energy blogger outreach.

## 4. Verification Evidence

* Internal-link audit: 41 source-defined internal paths checked against the live 44-URL sitemap; 0 unknown paths found.
* Focused SEO tests: 9 passed.
* Browser smoke/accessibility-oriented tests: 6 passed after updating stale homepage expectations to the current category-filter and menu-drawer UI.
* Typecheck: passed.
* Touched-file lint: passed.
* Production build: passed; 56 static pages generated.
* Production deployment: Ready on August 20, 2026 at `https://www.powelab.org`.
* Post-deploy live audit: 44 sitemap URLs return successfully; robots, canonicals, indexability and JSON-LD pass. The homepage is the intentional breadcrumb exception. Sitemap entries no longer emit `lastmod` values.
* Diff check: passed.
