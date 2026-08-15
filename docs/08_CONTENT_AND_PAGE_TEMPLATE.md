# 08 — Calculator Content and Page Template

## Purpose

Codex must build each calculator as both:

1. a useful interactive tool;
2. a complete crawlable explanation of the task, inputs, formulas, assumptions and limitations.

The supporting text is not a separate “blog article”. It belongs to the calculator page.

## Required page order

```text
Breadcrumb
H1
Direct 1–2 sentence explanation
Calculator UI
Result state
Scenario/example block
Supporting methodology/content
Related calculators
Sources / methodology review
```

## Intro pattern

Good:

> Use this battery runtime calculator to estimate how long a battery can power a known load. Enter battery energy (or Ah and voltage), load watts, and your usable-capacity assumptions; the result shows estimated runtime plus the energy losses behind it.

Bad:

> Batteries are an important part of modern life. Whether you are camping, working, or living at home, understanding batteries can be useful...

No generic filler.

## Supporting section rules

Each calculator spec lists its recommended headings. Typical sections:

- how to use the calculator;
- formula/model;
- explanation of units;
- important assumptions;
- worked example;
- interpretation;
- limitations;
- related calculators;
- sources.

Do not produce 2,000 words merely to hit a length target.

## Primary and secondary keywords

Use the mapping in `05_KEYWORD_AND_SERP_ANALYSIS.md`.

Rules:

- primary normally appears in title, H1 and intro;
- secondaries appear naturally where semantically useful;
- do not create repetitive exact-match headings;
- do not create a paragraph solely to mention a keyword;
- supporting semantic phrases have **no volume claim** unless validated.

## Formula presentation

For every deterministic calculator:

1. show human-readable explanation;
2. show the simplified formula;
3. define variables/units;
4. disclose losses/reserve/efficiency factors;
5. ensure page formula matches engine code/version.

## Worked examples

Worked examples should use the same engine in test fixtures where practical.

Requirements:

- realistic but clearly illustrative inputs;
- show intermediate values;
- no product recommendation;
- avoid false precision;
- if preset-assisted, say so.

## Assumptions box

Each result/article should make assumptions scannable:

```text
Assumption             Value       Source
Battery reserve        20%         Generic LFP preset — editable
Inverter efficiency    90%         Generic preset — editable
Load                    500 W       User-entered
Battery health          100%        User-entered/default
```

## Source policy

Prioritize:

1. official model/API documentation;
2. government/laboratory sources;
3. standards bodies;
4. manufacturer documentation for chemistry/device behavior;
5. carefully labeled application-maintained generic presets.

Do not cite low-quality SEO calculator sites as technical authority.

## Language and tone

- plain technical English;
- concise paragraphs;
- define jargon once;
- distinguish “estimate”, “modeled estimate”, “preset” and “user-entered”;
- never say “exact” unless mathematically exact for the stated inputs;
- never say “optimal” when the tool only evaluates a bounded candidate set—prefer “best modeled among compared angles”.

## GEO / answer retrieval

Make key information extractable because it helps humans:

- concise definitions;
- descriptive headings;
- visible equations;
- tables for assumptions/scenarios;
- direct answers to obvious user questions;
- source links;
- explicit units.

Do not create special AI-only content, hidden text, keyword blocks or `llms.txt` as a Google requirement.

## Related-tool CTA

Every calculator chooses 1–3 genuinely relevant next tools. Do not show the same generic CTA on all pages.

Examples:

```text
Battery Runtime → Battery Size
Solar Tilt → Solar Output
Electricity Usage → Home Battery Size / Battery Size
EV Charging Time → EV Charging Cost
```

## Static page metadata

Each route must have unique:

- title;
- description;
- H1;
- canonical;
- breadcrumb label;
- open-graph title/description;
- published/updated metadata only if the site visibly uses such dates.

## Last updated

If methodology changes, show a meaningful review/update date near methodology. Do not bump dates automatically on deploy.
