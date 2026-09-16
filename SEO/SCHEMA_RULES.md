# POWLAB SEO — Structured Data & Schema Implementation Rules

**Domain:** `https://www.powelab.org/`  
**Standard:** Schema.org JSON-LD structured data strictly representing visible on-page content. Never manufacture unverified schema.

---

## 1. Schema Types & URL Mapping

| Schema Type | Target URL Pattern | Key Required Properties |
| :--- | :--- | :--- |
| **`ScholarlyArticle` / `Article`** | `/research/[slug]` | `headline`, `description`, `author`, `publisher`, `datePublished`, `dateModified`, `identifier` (DOI), `mainEntityOfPage` |
| **`Dataset` & `DataDownload`** | `/datasets/[slug]` (or dedicated dataset landing components) | `name`, `description`, `creator`, `datePublished`, `license`, `distribution` (`DataDownload`), `sameAs` |
| **`SoftwareApplication` / `WebApplication`** | `/[category]/[calculator-slug]` | `name`, `operatingSystem`, `applicationCategory`, `description`, `url`, `offers` (Free), `featureList` |
| **`BreadcrumbList`** | All Sub-Pages | `itemListElement` (Position, Name, Item URL) |
| **`Organization`** | Global (Layout / Homepage) | `name`, `url`, `logo`, `description`, `sameAs` (Official Profiles) |
| **`FAQPage`** | Calculators & Guides with Q&A | `mainEntity` (`Question`, `acceptedAnswer`) |

---

## 2. Dataset Schema Standard (JSON-LD Example)

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Level 2 EVSE Continuous-Duty Conductor & Terminal Temperature Benchmark Dataset",
  "description": "Benchmark matrix tabulating 120 continuous load runs (16A to 80A), wire gauge thermal limits, and 60°C vs 75°C terminal temperature envelopes under NEC 625.42.",
  "url": "https://www.powelab.org/research/continuous-duty-thermal-sizing-evse-ampacity",
  "identifier": "https://doi.org/10.6084/m9.figshare.33321774",
  "creator": {
    "@type": "Organization",
    "name": "PowerLab Clean Energy Engineering Group",
    "url": "https://www.powelab.org"
  },
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "distribution": [
    {
      "@type": "DataDownload",
      "encodingFormat": "text/csv",
      "contentUrl": "https://doi.org/10.6084/m9.figshare.33321774"
    }
  ],
  "sameAs": [
    "https://doi.org/10.6084/m9.figshare.33321774",
    "https://archive.org/details/evse-continuous-duty-thermal-sizing"
  ]
}
```

---

## 3. Calculator / WebApplication Schema Standard

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebApplication", "SoftwareApplication", "MathSolver", "LearningResource"],
      "@id": "https://www.powelab.org/battery/battery-runtime-calculator#webapp",
      "name": "Battery Runtime Calculator",
      "url": "https://www.powelab.org/battery/battery-runtime-calculator",
      "applicationCategory": "UtilitiesApplication",
      "applicationSubCategory": "Energy & Electrical Planning",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas/SVG.",
      "isAccessibleForFree": true,
      "description": "Calculates battery backup runtime hours accounting for Peukert capacity derating, discharge rates, and inverter tare losses.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "publisher": {
        "@type": "Organization",
        "name": "PowerLab Engineering & Energy Modeling Team",
        "url": "https://www.powelab.org"
      },
      "isBasedOn": [
        "IEEE Std 485 (Recommended Practice for Sizing Lead-Acid Batteries)",
        "https://doi.org/10.6084/m9.figshare.33821940",
        "https://www.powelab.org/research/stationary-bess-peukert-derating-inverter-tare-loss"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.powelab.org/battery/battery-runtime-calculator#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.powelab.org" },
        { "@type": "ListItem", "position": 2, "name": "Battery", "item": "https://www.powelab.org/battery" },
        { "@type": "ListItem", "position": 3, "name": "Battery Runtime Calculator", "item": "https://www.powelab.org/battery/battery-runtime-calculator" }
      ]
    }
  ]
}
```

---

## 4. Structured Data Validation Rules

1. **Strict Fidelity & Zero Synthetic Ratings:** Schema properties must exactly mirror visible text on the page. Never manufacture `aggregateRating` or fake reviews; omit `aggregateRating` and provide valid `offers: { price: 0, priceCurrency: USD }`.
2. **Google-Compliant `applicationCategory`:** Use `"UtilitiesApplication"` for sizing and electrical physics tools, and `"FinanceApplication"` for economic ROI, payback, cost, and utility bill modeling tools.
3. **Circular Linked Data (`isBasedOn`):** Link tools directly to governing engineering standards (e.g., IEEE, NEC, ASHRAE), companion open datasets (Figshare DOIs), and technical preprints.
4. **DOI & Citation Persistence:** Research articles and datasets must include authoritative `identifier` fields containing valid DOIs where registered.
5. **Google Rich Results Compliance:** Test all schema implementations with Google Rich Results Test / Schema Validator before production deployment.

