# DEV.to Publishing Rules, Post Types & Output Delivery Standard

Whenever the user or task requests a DEV.to post or preparation, you MUST adhere strictly to the following rules:

---

## 1. Single-Zone Output Standard (MANDATORY)

To prevent breaking code into multiple split/uncopyable UI boxes:
1. **Title:** Output in its own standalone ` ```text ` block.
2. **Tags:** Output in its own standalone ` ```text ` block (Max 4 comma-separated tags).
3. **Description:** Output in its own standalone ` ```text ` block (1 high-density sentence).
4. **Image Prompt:** Output in its own standalone ` ```text ` block (16:9 dark-mode developer aesthetic).
5. **Full Article Body:** MUST ALWAYS be wrapped in **4 backticks (` ````text `)** so that internal code blocks (like ```typescript) do NOT break the markdown parser into multiple zones. The entire article must be copyable in **ONE single click**.

---

## 2. DEV.to Content Post Types & Angles

Every DEV.to post MUST follow one of these 3 approved developer-first formats:

### **Type A: Zero-Database Deterministic Architecture (Primary)**
* **Core Theme:** Eliminating databases, ORMs, and backend state in favor of pure, deterministic TypeScript math engines.
* **Key Artifacts:** `CalculationResult<T>` envelope, input provenance tracking (`user-entered`, `preset`, `derived`).

### **Type B: Translating Physical & Electrical Laws to Code**
* **Core Theme:** Modeling 100-year-old physical and electrochemical equations (Peukert's Law, Stefan-Boltzmann, Motor Inrush LRA, Perez Anisotropic Sky).
* **Key Artifacts:** Typed input/output interfaces, closed-form equations, and Vitest monotonic invariant unit tests.

### **Type C: Open API & Developer Tooling**
* **Core Theme:** Exposing OpenAPI 3.1 / Swagger endpoints, client-side SDK patterns, and iframe/widget embeds.
* **Key Artifacts:** Typed JSON contracts, Next.js App Router edge routes, zero-auth open endpoints.

---

## 3. Mandatory Frontmatter & Canonical Rules

Every DEV.to article must declare an explicit `canonical_url` pointing to `powelab.org`:

```yaml
---
title: "Exact Title"
published: true
description: "1-sentence summary"
tags: tag1, tag2, tag3, tag4
canonical_url: "https://www.powelab.org/developers" # or specific canonical guide/calculator
series: "Open Energy Modeling in TypeScript"
---
```

---

## 4. Visual Asset Standard

1. Generate a 16:9 dark-mode developer banner using `generate_image`.
2. Save copy to `d:\powerlab\public\images\devto-[slug]-cover.jpg`.
3. Provide the exact text prompt in a clean ` ```text ` box.
