# Internet Archive (archive.org) Publishing & Description Rules

Whenever preparing or uploading items to the Internet Archive (`archive.org`), you MUST strictly adhere to the following rules:

---

## 1. Description Formatting Standard (NO RAW HTML TAGS)

* **NEVER use HTML tags** (`<p>`, `<a>`, `<pre>`, `<strong>`) in Archive.org description boxes. Archive.org escapes/strips HTML tags during standard uploads, causing raw markup to be displayed.
* **Use Clean Plain Text with Explicit URLs:** Internet Archive automatically autolinks raw `https://` URLs in descriptions.
* **Standard Structure:**
  ```text
  Technical Report: [Report ID]
  Title: [Full Title]
  
  Abstract:
  [2-3 paragraph plain text abstract without HTML]

  Primary Canonical Research URL:
  https://www.powelab.org/research/[slug]

  Interactive Computational Model:
  https://www.powelab.org/[tool-slug]

  Academic Preprint (Academia.edu):
  https://www.academia.edu/[paper-id]/...

  BibTeX Citation:
  @techreport{powerlab2026[slug],
    title={[Full Title]},
    author={{PowerLab Research Initiative}},
    year={2026},
    institution={PowerLab Applied Energy Modeling Research Initiative},
    url={https://www.powelab.org/research/[slug]}
  }
  ```

---

## 2. Archival Metadata Standard

1. **Title:** `[Report ID] - [Full Descriptive Title]`
2. **Creator / Author:** `PowerLab Applied Energy Modeling Research Initiative`
3. **Date:** `YYYY-MM-DD`
4. **Collection:** `Open Source Books` / `Community Texts` / `Community Data`
5. **License:** `Creative Commons: Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0)`
6. **Subject Tags:** Comma-separated domain taxonomy tags.
