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

## 3. Live Search Console Baseline (28-Day Performance & Indexation Watch)

### Performance Baseline (Last 28 Days)
* **Total Search Impressions:** 18,595
* **Total Clicks:** 19
* **Average CTR:** ~0.10%
* **United States Segment:** 12 clicks / 7,182 impressions
* **Device Aggregates (Site-Wide):**
  * Mobile: 4,209 impressions / average position 13.77
  * Desktop: 14,300 impressions / average position 64.56

### Verified High-Opportunity Pages & Position Benchmarks
* `/home-energy/air-conditioner-cost-calculator` — 2,000 impressions, average position 16.45
* `/battery/battery-capacity-calculator` — 1,686 impressions, average position 61.38
* `/guides/how-many-kwh-does-a-house-use-per-day` — 1,470 impressions, average position 48.42
* `/solar/solar-panel-output-calculator` — 1,351 impressions, average position 56.75
* `/ev/ev-range-calculator` — 1,309 impressions, average position 16.53

### Verified GSC Query Observations
* `how to calculate ev range` — position 15.50
* `ev range calculation formula` — position 20.00
* `ac cost calculator` — position 31.48
* `central ac energy cost` — position 42.05
* `battery capacity in kwh` — position 44.00

### Indexation Watch Track (Separate Diagnostic Candidate)
* **Indexed URLs:** 17
* **Non-Indexed URLs:** 55
  * **Crawled — currently not indexed:** 34 pages
  * **Discovered — currently not indexed:** 13 pages
  * **Redirect-related errors:** 5 pages (monitored as a distinct diagnostic candidate)
  * **Page with redirect:** 3 pages
* **Policy:** No automatic bulk indexation remediation. Indexation status is monitored on a separate diagnostic track while optimization focuses sequentially on high-intent search assets.


