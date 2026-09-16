# POWLAB — MASTER SEO STRATEGY & DAILY EXECUTION PLAN

**Domain:** `https://www.powelab.org/`  
**Status:** Authoritative Single Source of Truth (SSOT) for all POWLAB SEO, content, distribution, authority outreach, and research citation workflows.

---

## 1. CRITICAL INSTRUCTION TO THE AI/SEO AGENT

Before doing ANY SEO work, content work, publishing work, backlink work, technical changes, or strategy changes:
**ALWAYS MAKE A PLAN FIRST. NEVER IMMEDIATELY JUMP TO EXECUTION.**

For every task:
1. Review this master strategy (`/SEO/MASTER_STRATEGY.md`).
2. Review the current POWLAB SEO state/files in `/SEO/`.
3. Identify the relevant existing assets.
4. Identify what the task is trying to accomplish.
5. Produce a concise implementation plan.
6. Check the plan against the permanent rules in this document.
7. Only then execute.
8. After execution, record what was changed in `/SEO/CHANGELOG.md` and `/SEO/DAILY_LOG.md`.
9. Update the relevant SEO tracking files so future sessions retain complete context.

If an instruction conflicts with this master strategy, stop and identify the conflict before executing. Do not silently replace or weaken an established SEO rule.

---

## 2. POWLAB SEO PHILOSOPHY

POWLAB is not a generic content or affiliate website. POWLAB produces:
* Original technical research & whitepapers
* Open benchmark datasets
* Peer-grade engineering articles & lab manuals
* Deterministic computational calculators & engines
* Educational/laboratory open resources
* Reproducible engineering methodologies

Therefore, the SEO strategy exploits POWLAB's strongest asset: **ORIGINAL TECHNICAL KNOWLEDGE**.

### The Permanent Growth Model
```text
Original research → Authoritative POWLAB page → Dataset / Tool / Resource 
   → Multi-Layer External Distribution & Outreach → Citations & Editorial References 
   → Relevant Verified Backlinks → Topical Authority → Google Rankings 
   → High-Intent Organic Traffic → Secondary Citations → Sustained Compounding Growth
```

Do NOT reduce the strategy to: *publish article → get backlink → repeat*.

---

## 3. WHAT SEO SUCCESS MEANS

Track distinct outcome categories separately:

### Primary SEO Outcomes
* Google organic impressions
* Google organic clicks
* Non-branded organic search traffic
* Number of ranking keywords (Positions 1–3, 4–10, 11–20)
* Organic traffic to research whitepapers (`/research/*`)
* Organic traffic to calculators/tools (`/battery/*`, `/solar/*`, `/home-energy/*`, `/ev/*`)
* Organic traffic to datasets

### Authority Outcomes
* Relevant referring domains in engineering, energy, and academia
* High-authority referring domains (IEEE, CSU/MERLOT, DOE, Universities)
* Dofollow referring domains (verified via HTML inspection)
* Editorial backlinks and research citations
* Brand and technical entity mentions
* Moz DA / Ahrefs DR (used as secondary benchmark metrics, not primary targets)

> [!IMPORTANT]
> DA and DR are measurement metrics, not Google ranking factors. Never optimize solely for DA. A highly relevant engineering domain with moderate DA is infinitely more valuable than a generic high-DA aggregator.

---

## 4. CORE TOPICAL CLUSTERS

POWLAB concentrates strictly around its core engineering research areas:

### A. Battery Energy Storage / BESS
* BESS runtime modeling & Peukert capacity derating
* Depth of discharge (DoD) boundaries & cycling kinetics
* Inverter quiescent tare losses & standby dissipation
* Battery degradation modeling & C-rate thermal effects
* LiFePO4 vs. Lead-Acid / AGM comparative kinetics

### B. Solar / Photovoltaics
* Solar PV string sizing & MPPT voltage matching
* Sub-zero open-circuit voltage ($V_{oc}$) expansion (NEC 690.7)
* Perez anisotropic sky diffuse & snow albedo ground transposition
* State-by-state solar insolation & peak sun hour (PSH) modeling

### C. HVAC / Building Energy
* Cold-climate air-source heat pump (ccASHP) non-linear COP degradation
* Auxiliary electric resistance strip heat staging kinetics
* SEER2 vs. legacy SEER DOE M1 static pressure transitions
* Thermal envelope heat loss & cooling degree day (CDD) modeling

### D. Generator / Power Engineering
* Emergency generator sizing under NEC 702 & ISO 8528-5
* Inductive motor Locked Rotor Amperage (LRA) inrush surges
* Alternator sub-transient reactance ($X''_d$) and voltage dip recovery
* Non-coincident load stacking & multi-fuel derating factors

### E. EV Charging / EVSE
* Continuous-duty 125% ampacity rules under NEC 625.42
* Terminal temperature limits ($60^\circ\text{C}$ vs. $75^\circ\text{C}$ under NEC 110.14(C))
* Conductor Joule heating ($I^2R$) and voltage drop mitigation
* Level 1 vs. Level 2 efficiency penalties & onboard charger losses

### F. General Electrical / Energy Engineering
* Conductor sizing & allowable ampacity (NEC Table 310.16)
* Pure deterministic TypeScript calculation engines
* Open scientific datasets and reproducible computation

---

## 5. THE THREE-LAYER EXTERNAL ECOSYSTEM

POWLAB distributes and builds authority through three distinct, coordinated layers:

```text
                               ┌────────────────────────────────────────────────┐
                               │       CANONICAL POWLAB ASSET (SSOT)            │
                               │  Research Paper | Dataset | Calculator | Guide │
                               └───────────────────────┬────────────────────────┘
                                                       │
         ┌─────────────────────────────────────────────┼─────────────────────────────────────────────┐
         ▼                                             ▼                                             ▼
┌─────────────────────────────────┐   ┌─────────────────────────────────┐   ┌─────────────────────────────────┐
│     LAYER 1: DISTRIBUTION       │   │  LAYER 2: AUTHORITY / EDITORIAL │   │  LAYER 3: RESEARCH / CITATION   │
├─────────────────────────────────┤   ├─────────────────────────────────┤   ├─────────────────────────────────┤
│ • Academia.edu (Preprints)      │   │ • IEEE / IEEE Spectrum          │   │ • IEEE Xplore / Research Gate   │
│ • Figshare (DOIs / CSVs)        │   │ • Energy Central / Energy Stg   │   │ • Springer / Wiley / Elsevier   │
│ • MERLOT (Higher-Ed Labs)       │   │ • PV Magazine / EE Times        │   │ • University Repositories / OER │
│ • DEV.to (Code / Engineering)   │   │ • Engineering.com / Power Eng   │   │ • Zenodo / Dataverse / HuggingF │
│ • Hashnode (Journal Articles)   │   │ • The Electricity Forum         │   │ • Professional Societies        │
│ • Medium (Accessible Syntheses) │   │ • REGlobal / AZoM               │   │ • Peer Researchers & Professors │
├─────────────────────────────────┤   ├─────────────────────────────────┤   ├─────────────────────────────────┤
│ PURPOSE: Wide dissemination,    │   │ PURPOSE: Selective editorial    │   │ PURPOSE: Citations, academic    │
│ reproducible assets, student    │   │ pitches, expert contributions,  │   │ credibility, research datasets, │
│ labs, developer reach.          │   │ industry citations.             │   │ secondary scholarly backlinks.  │
│ CADENCE: Standard syndication.  │   │ CADENCE: Selective outreach.    │   │ CADENCE: Targeted academic PR.  │
└─────────────────────────────────┘   └─────────────────────────────────┘   └─────────────────────────────────┘
```

> [!WARNING]
> **CRITICAL RULE ON AUTHORITY TARGETS:**  
> Layer 2 targets (IEEE, PV Magazine, Energy Central, etc.) are **NEVER** treated as daily syndication queues. They are **strictly selective editorial pitching targets**. Never publish automated mass content to authority platforms.

---

## 6. CANONICAL & SYNDICATION GOVERNANCE MATRIX

Do not use a simplistic one-size-fits-all rule such as *"All external copies must canonicalize to POWLAB."* Canonicalization and syndication treatments are strictly governed by content type and platform purpose:

| Category # | Content / Publication Type | Primary Host / Format | Target Platform | Canonical Treatment | Link & Attribution Rule |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | **Original POWLAB Research** | POWLAB `/research/[slug]` | POWLAB | **Canonical: Self-referencing POWLAB URL** | Intellectual SSOT. Embeds full metadata & DOI. |
| **2** | **Adapted Technical Article** | Implementation/Code deep dives | DEV.to, Hashnode | **Cross-domain `canonical_url` in frontmatter pointing to POWLAB** | In-body contextual link to companion calculator/paper. |
| **3** | **Research Paper / Preprint** | PDF/Preprint Working Papers | Academia.edu, TechRxiv, Archive.org | **Preprint metadata cites POWLAB technical report URL** | Paper header references POWLAB institution & report ID. |
| **4** | **Benchmark Dataset Record** | CSV / Open Matrices | Figshare, Hugging Face, Zenodo | **DataCite DOI as identifier; `sameAs` array on POWLAB dataset landing page** | Repository cites canonical `/datasets/[slug]` landing page. |
| **5** | **Educational / OER Resource** | Student Lab Exercises | MERLOT, OER Commons | **Self-referencing OER record pointing to POWLAB `/datasets/*` or `/battery/*`** | Dofollow direct material URL to POWLAB tool/lab. |
| **6** | **Accessible Industry Synthesis** | High-level summary / "What the data means" | Medium | **Cross-domain canonical to POWLAB research paper OR self-canonical if rewritten** | In-text citation linking to canonical study & data. |
| **7** | **Scholarly Citation / Index Record** | BibTeX / Reference Entries | ORCID, BibSonomy, Google Scholar | **Persistent DOI / Crossref URL pointing to POWLAB** | Standard scholarly metadata attribution. |
| **8** | **Independent Editorial Contribution** | Exclusive guest column / invited commentary | IEEE Spectrum, PV Magazine, Energy Central | **Publication's self-canonical (their original URL)** | Author bio & contextual editorial links pointing to POWLAB research/tools. |

### Canonical Conflict Prevention Rules
1. **Never create identical duplicates:** Always adapt the tone, depth, and angle to match the platform audience (e.g., TypeScript code on DEV.to vs. industry policy implications on Energy Central).
2. **Never syndicate before POWLAB publication:** Always publish the canonical POWLAB asset first and ensure it is live and indexed before distributing downstream adaptations.
3. **Inspect platform canonical support:** For platforms that ignore cross-domain canonicals, provide substantially differentiated content rather than syndicated copy.

---

## 7. BACKLINK VERIFICATION STANDARD

Never claim a backlink is dofollow without verifying the live HTML:
1. Inspect the published DOM element (`<a href="...">`).
2. Verify `rel` attributes (ensure absence of `nofollow`, `ugc`, `sponsored` if claiming dofollow).
3. Confirm link is indexable by crawlers (not hidden in JS modals or non-rendered iframes).
4. Record strictly under standard statuses: `DOFOLLOW VERIFIED`, `NOFOLLOW VERIFIED`, `SPONSORED`, `UGC`, `NOT A LINK`, or `UNKNOWN`.

---

## 8. PERMANENT OPERATING LOOP

Every SEO session must execute this 5-step loop:

```text
[1. REVIEW]   Check /SEO/MASTER_STRATEGY.md, CONTENT_MAP.md, KEYWORDS.md, DAILY_LOG.md
     │
[2. PLAN]     Select single highest-value task, draft plan, confirm against rules
     │
[3. EXECUTE]  Implement original asset, update, distribution piece, or outreach pitch
     │
[4. VALIDATE] Verify HTML, links, canonicals, schema, and mobile responsiveness
     │
[5. RECORD]   Log all actions in /SEO/DAILY_LOG.md and /SEO/CHANGELOG.md
```
