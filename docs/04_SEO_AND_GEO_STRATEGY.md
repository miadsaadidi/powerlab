# 04 — SEO and Generative Search (GEO/AEO) Strategy

## Core model

This is a **calculator-led utility site**.

```text
Homepage
→ Category hub
→ Distinct calculator intent
```

No traditional blog at launch. The calculator pages themselves contain the supporting explanatory content.

## Canonical intent rule

One materially distinct user task = one canonical page.

Do not create separate URLs for:

```text
12V version
LiFePO4 version
watts version
Ah version
“how long” phrasing
“calculator” vs “estimator” phrasing
```

when the same calculator can satisfy them cleanly.

## Keyword roles

Use:

- `PRIMARY` — main canonical task;
- `SECONDARY` — same intent, merged on canonical;
- `SUPPORTING` — question/example/semantic wording;
- `SEPARATE PAGE` — materially different task;
- `RESERVED` — research interest, no route yet;
- `EXCLUDED` — wrong/misleading intent.

## Google Keyword Planner warning

Always display separately:

```text
Planner competition = advertiser competition
Organic competition = manual SERP assessment
```

A Planner competition index of `0` does **not** mean easy organic SEO.

## Calculator SEO template

Every published calculator page:

```text
Breadcrumb
H1
1–2 sentence direct answer / what the tool does
Calculator UI
Primary result + breakdown
Worked example or scenario comparison
H2 How to use ...
H2 How the calculation works
H2 Inputs / assumptions
H2 Interpretation
H2 Examples
H2 Limitations
H2 Related calculators
H2 Methodology and sources
```

Do not force all headings when a section adds no value. The calculator-specific spec is authoritative.

## Title / H1

- Primary keyword normally appears naturally in title and H1.
- H1 should be human-readable, not stuffed with secondary variants.
- Titles should distinguish the task/result, not append a list of synonyms.

## Meta descriptions

- Describe the utility and key inputs/outputs.
- Avoid rankings/accuracy guarantees.
- No keyword list.
- No fabricated “free forever”, “#1”, or “most accurate” claims.

## Supporting content quality

Every page needs non-commodity value:

- actual working calculator;
- formulas/models;
- transparent assumptions;
- editable presets;
- examples generated from the same engine;
- scenario comparison where useful;
- limitations;
- source/methodology provenance;
- connected next-step tools.

## Server rendering

The core explanatory content and crawlable internal links must be present in server-rendered HTML. Do not require Google to interact with the calculator to understand the page.

## Internal linking

### Vertical

```text
Homepage → category → calculator
Calculator → category
```

### Workflow

```text
Electricity Usage → Battery Size → Battery Runtime
Electricity Usage → Home Battery Size
Solar Load → Solar Panel Size → Solar Output
Solar Tilt → Solar Output
EV Charging Time → EV Charging Cost
EV Range → EV Savings
```

Use descriptive anchors. Avoid sitewide exact-match anchor spam.

## Category hubs

Indexable hubs:

```text
/solar/
/battery/
/home-energy/
/ev/
```

Hubs should explain tool selection and workflows. Broad mixed-intent terms can be supported here when the keyword research says they are not suitable for a duplicate calculator.

## Sitemap / indexing

- sitemap at site root;
- absolute canonical URLs only;
- only `published` routes;
- planned/draft routes excluded;
- `lastmod` changes only on meaningful content/tool updates;
- do not use fake daily `lastmod` changes;
- no reliance on `<priority>` or `<changefreq>` for Google;
- submit sitemap in Search Console after launch.

## Canonicalization

- self-canonical each clean page;
- URL state/query variants canonicalize to clean route;
- no duplicate unit-specific paths;
- redirects required if a canonical route ever changes.

## Structured data

Use only markup that accurately represents visible content.

Baseline:

- `Organization` / site entity where appropriate;
- `WebSite` on homepage where appropriate;
- `BreadcrumbList` on inner pages.

Potential application markup can be evaluated later, but never add schema solely because it exists. Do not add fake FAQ/HowTo markup or content not visible to users.

## Core Web Vitals

Targets:

```text
LCP <= 2.5s
INP <= 200ms
CLS <= 0.1
```

Prioritize actual mobile field performance.

## GEO / AEO position

For Google Search, “GEO/AEO” does not require a separate optimization system. Current Google guidance treats generative-search visibility as grounded in normal Search indexing/ranking systems.

Therefore:

### Do

- make pages crawlable/indexable;
- write unique, useful, people-first content;
- expose clear formulas, units, assumptions and definitions;
- answer the calculator’s main question directly;
- use descriptive headings;
- give worked examples;
- cite primary technical/model sources;
- maintain clear entity/site/category structure;
- use semantic HTML for users/accessibility;
- keep meaningful content available without interaction;
- make internal links crawlable;
- use relevant images/diagrams only when they add understanding;
- keep methodology and review dates explicit.

### Do not

- create pages for every fan-out/long-tail phrasing;
- rewrite content into unnatural “AI snippets”;
- create `llms.txt` as a Google ranking requirement;
- add special unsupported “AI schema”;
- chase inauthentic mentions/links;
- mass-produce thin pages with generative AI;
- hide the answer behind an account or interaction wall.

## Answer-friendly content pattern

Use concise answer blocks where they genuinely help readers:

```text
Question/problem
→ direct answer
→ formula/model
→ input definitions
→ example
→ limitation
```

This is a reader-comprehension pattern, not a special AI-search hack.

## Citability / trust

Calculator pages should make it easy to verify claims:

- formula shown;
- model provider named;
- source links in methodology;
- preset assumptions identified as generic;
- source-backed provider defaults identified separately;
- methodology review date;
- no unsupported superlatives.

## Search Console loop

After publishing:

```text
query appears
→ classify intent
→ inspect live SERP
→ improve existing page
OR
→ approve a new distinct route
```

Track:

- impressions;
- clicks;
- CTR;
- position;
- indexation;
- query variants;
- cannibalization;
- category → calculator clicks;
- calculator → related-calculator clicks.

## Expansion gate

Before splitting a secondary keyword into a new page:

1. prove distinct user task;
2. review live SERP overlap;
3. assess current organic competition;
4. define genuinely different calculator/content functionality;
5. define internal-link/canonical impact;
6. update keyword and route registry docs.

## Official guidance references

See `12_SOURCES_AND_METHODOLOGY.md` for the Google Search Central and Web Vitals references that ground these rules.
