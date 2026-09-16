# POWLAB SEO — Google Search Console Operating Playbook & Query Optimization Engine

**Domain:** `https://www.powelab.org/`  
**Purpose:** Actionable weekly Search Console optimization loop. Never create duplicate pages for minor keyword variants. Optimize, expand, and consolidate existing assets first.

---

## 1. Weekly Search Console Diagnostic Loop

```text
[1. QUERY AUDIT]       Filter GSC: Last 28 Days vs Previous Period
       │
[2. TRIAGE BUCKETS]    Categorize into 4 Strategic Action Buckets:
       │               ├─ Bucket A: Strike Distance (Positions 4.0 – 20.0)
       │               ├─ Bucket B: High Impressions / Low CTR (< 0.5%)
       │               ├─ Bucket C: Declining Queries & Pages (> 20% drop)
       │               └─ Bucket D: Emerging Queries & Cannibalization
       │
[3. REMEDIATION]       Apply Targeted On-Page / Technical / Linking Optimization
       │
[4. TRACK & MEASURE]   Log actions in /SEO/DAILY_LOG.md and re-evaluate in 14 days
```

---

## 2. Strategic Action Playbooks

### Bucket A: Strike Distance Optimization (Positions 4.0 – 20.0)
* **Objective:** Push high-intent queries from Page 2 to Page 1 (Top 3 positions).
* **Current Top Strike Assets on POWLAB:**
  * [`/home-energy/air-conditioner-cost-calculator`](https://www.powelab.org/home-energy/air-conditioner-cost-calculator) (Avg Pos: 16.95, 1.5k impressions)
  * [`/ev/ev-range-calculator`](https://www.powelab.org/ev/ev-range-calculator) (Avg Pos: 21.88, 828 impressions)
  * [`/home-energy/home-battery-size-calculator`](https://www.powelab.org/home-energy/home-battery-size-calculator) (Avg Pos: 55.91 climbing)
* **Optimization Playbook:**
  1. **Add Secondary Keyword Headings:** Ensure secondary query variants appear naturally in `<h2>` and `<h3>` subheadings.
  2. **Enrich Input Presets:** Add real-world appliance/vehicle presets matching the query intent.
  3. **Internal Contextual Inlinks:** Add 2–3 contextual links from top-performing educational guides and whitepapers.
  4. **Dataset Cross-Links:** Embed direct links to the relevant canonical `/datasets/*` landing page.

---

### Bucket B: High Impression / Low CTR Optimization (< 0.5% CTR)
* **Objective:** Capture click share by improving SERP snippet appeal, title tag clarity, and rich structured data.
* **Current High Impression Targets:**
  * [`/home-energy/electricity-usage-calculator`](https://www.powelab.org/home-energy/electricity-usage-calculator) (1,446 impressions, 0 clicks)
  * [`/battery/battery-capacity-calculator`](https://www.powelab.org/battery/battery-capacity-calculator) (1,429 impressions, 0 clicks)
  * [`/solar/solar-panel-output-calculator`](https://www.powelab.org/solar/solar-panel-output-calculator) (1,000 impressions, 1 click)
* **Optimization Playbook:**
  1. **Title Tag Refinement:** Front-load the primary benefit and calculational power (e.g., *"Free & Instant"*, *"NEC 2026 Standards"*, *"Deterministic kWh Math"*).
  2. **Meta Description CTA:** Add clear actionable summaries with explicit numbers and output metrics.
  3. **Rich Snippet Schema:** Ensure `WebApplication` and `FAQPage` JSON-LD schemas are valid and rendered in head.

---

### Bucket C: Keyword Cannibalization Detection & Remediation
* **Rule:** If two POWLAB URLs receive impressions for the exact same search query:
  1. Determine the canonical destination that best satisfies the search intent (Tool vs. Research vs. Guide).
  2. Add a direct cross-link with descriptive anchor text from the secondary page pointing to the primary canonical URL.
  3. Differentiate page titles and `<h1>` tags so Google cleanly distinguishes theoretical research from interactive calculational tools.
  4. Never create a new page if an existing URL already covers the intent.

---

### Bucket D: Emerging Queries & Topical Hub Expansion
* **Rule:** When GSC discovers recurring queries with $> 100$ impressions that lack a dedicated calculation input:
  1. First evaluate whether adding an input slider/preset to an existing calculator satisfies the demand.
  2. If the user task is materially distinct (see `docs/13_CALCULATOR_REGISTRY_AND_ROUTES.md`), register a new canonical route in the implementation roadmap.
  3. Link the new asset to its parent topic hub and companion whitepapers.

---

## 3. Live Search Console Indexation Baseline (Export Date: 2026-09-16)

### Status Summary
* **Indexed Pages:** 17
* **Non-Indexed Pages:** 55
* **Peak Impressions:** 2,074/day (2026-08-29)
* **Current Impressions:** 3–9/day (2026-09-05 to 2026-09-14)

### Error & Non-Indexed Breakdown
1. **Crawled - Currently Not Indexed (34 pages):** Status `Échec / Failed`. Remediated by upgrading dynamic sitemap priority signals, updating `lastModified` to `2026-09-16`, and deploying rich `WebApplication` + `Offer` + `Dataset` schemas across all 24 calculators.
2. **Redirect Errors (5 pages):** Status `Non commencé`. Verified clean single-hop 308 redirects in `next.config.mjs` with 0 circular loops.
3. **Page with Redirect (3 pages):** Status `Non commencé`. Verified zero redirected paths in `src/app/sitemap.ts`.
4. **Discovered - Currently Not Indexed (13 pages):** Status `Non commencé`. Provided direct crawl paths from topic hubs and footer navigation.

### User Action Required in GSC
1. Navigate to **Google Search Console $\rightarrow$ Indexation $\rightarrow$ Pages**.
2. Click on **"Explorée, actuellement non indexée"** and click the blue **"Valider la correction" (Validate Fix)** button.
3. Click on **"Erreur liée à des redirections"** and click **"Valider la correction"**.
4. Re-submit sitemap: `https://www.powelab.org/sitemap.xml`.

