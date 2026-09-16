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
  "@type": "WebApplication",
  "name": "BESS Runtime & Peukert Derating Calculator",
  "applicationCategory": "EngineeringApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "url": "https://www.powelab.org/battery/battery-runtime-calculator",
  "description": "Deterministic engineering engine calculating stationary battery backup hours incorporating Peukert law rate capacity derating and continuous inverter tare losses.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PowerLab Open Energy Research",
    "url": "https://www.powelab.org"
  }
}
```

---

## 4. Structured Data Validation Rules

1. **Strict Fidelity:** Schema properties must exactly mirror visible text on the page. Do not include phantom ratings, fake aggregate reviews, or inflated statistics.
2. **DOI & Citation Persistence:** Research articles must include authoritative `identifier` fields containing valid DOIs where registered.
3. **Google Rich Results Compliance:** Test all new schema implementations with Google Rich Results Test / Schema Validator before production deployment.
