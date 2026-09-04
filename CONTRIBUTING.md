# Contributing to PowerLab — Engineering & Pull Request Lifecycle Guide

Welcome to the **PowerLab** computational modeling and clean energy planning platform.

To maintain research-grade mathematical accuracy, academic provenance, and seamless automated deployment through Vercel, all contributors, maintainers, and AI agents must adhere to this strict, production-grade GitHub Pull Request (PR) and branch lifecycle protocol.

---

## 1. Scale Thresholds & Branching Strategy

Development workflow is partitioned strictly by the scope and impact of changes:

| Scale Tier | Scope / Description | Workflow Action |
| :--- | :--- | :--- |
| **Small Tweaks (No PR Required)** | Simple text/copy corrections, typo fixes, isolated CSS micro-adjustments, small metadata tweaks, or single-file non-breaking bug fixes. | Direct commit and push to `main`. Vercel automatically deploys the update to Production. |
| **Medium & Large Updates (MANDATORY PR)** | Adding new calculator engines, interactive pages, whitepapers, multi-feature updates, architectural refactoring, schema migrations, or external API integrations. | **Mandatory Feature Branch & Formal GitHub PR**. Direct push to `main` is strictly prohibited. |

### Semantic Branch Naming Convention
When creating a branch, always branch off the latest `main`:
- `feat/<feature-slug>` (e.g., `feat/bess-degradation-model`, `feat/ieee-1547-interconnection`)
- `refactor/<refactor-slug>` (e.g., `refactor/pvwatts-client-resilience`)
- `docs/<doc-slug>` (e.g., `docs/battery-chemistry-methodology`)
- `fix/<fix-slug>` (e.g., `fix/inverter-tare-loss-boundary`)

---

## 2. Pre-PR Verification Gate (MANDATORY)

Before pushing any feature branch to `origin` or opening a PR, you **must run and pass all pre-flight verification checks locally**:

1. **Unit & Invariant Test Suite:**
   ```bash
   npm test
   ```
   *Requirement:* **100% passing** (all test files and assertion suites green).
2. **Strict TypeScript Compilation:**
   ```bash
   npm run typecheck
   ```
   *Requirement:* **0 compilation / type errors** (`tsc --noEmit`).
3. **Production Static Build (Recommended / Milestone gate):**
   ```bash
   npm run build
   ```
   *Requirement:* Clean static route generation with zero bundle or lint failures.

---

## 3. Immediate Formal PR Creation on Push (NEVER STOP AT RAW PUSH)

Whenever a feature branch is created and pushed to GitHub (`git push -u origin <branch-name>`):

> [!IMPORTANT]
> **Never stop at pushing the raw branch.**
> You MUST IMMEDIATELY open the formal Pull Request on GitHub. The PR must appear as **OPEN** in the repository's GitHub Pull Requests tab immediately after pushing.

### Mandatory PR Metadata & Template
Every Pull Request must use `.github/pull_request_template.md` and contain:
1. **Overview & Domain Motivation:** Executive summary of the change, scientific/engineering rationale, and practical utility.
2. **Governing Mathematical Models & Standards:** Explicitly cite physical laws, governing IEEE/NEC/NREL/ASHRAE/IEC standards, and boundary condition formulas.
3. **Key Technical Changes Breakdown:** Clear bulleted summary of deterministic calculation engines, UI components, datasets, and metadata/schema updates.
4. **Validation & Test Matrix Evidence:** Concrete test results (exact test counts, typecheck status, and static build outputs).
5. **Institutional & Academic Relevance:** Research reproducibility, syllabus integration, or lab audit utility.

---

## 4. Review Window & Vercel Preview Deployments

1. **Inspection Window:**
   - Leave PRs open for a realistic review window (**2 to 24 hours**) to allow thorough visual, technical, and mathematical peer review.
2. **Isolated Preview Deployments:**
   - Vercel automatically generates and maintains an isolated, branch-specific Preview Deployment URL for every open PR.
   - Test UI responsiveness, cross-calculator data handoff, and mobile viewport usability against the live Preview Deployment.

---

## 5. Clean Merge & Branch Deletion Protocol

When a Pull Request has satisfied all review criteria and is authorized for merge:

1. **Merge via GitHub:**
   - Execute the merge on GitHub (Merge Commit or Squash & Merge as appropriate).
   - The PR is permanently recorded as **Closed / Merged** in GitHub's public audit history.
2. **Delete Remote Feature Branch:**
   - Delete the remote feature branch (`origin/feat/<slug>`) from GitHub immediately upon merge.
   - Vercel automatically unlinks the preview branch from "Active Branches".
3. **Clean Local Repository:**
   ```bash
   git checkout main
   git pull origin main
   git branch -d feat/<slug>
   git fetch --prune
   ```
4. **Production Verification:**
   - Vercel automatically triggers a zero-downtime deployment of `main` to Production.
   - Verify that the production build is live and healthy.

---

## 6. Core Engineering & Mathematical Principles

1. **Pure Deterministic Engines:** All calculation engines must remain pure TypeScript with zero React, DOM, database, or network side-effects.
2. **Transparent Provenance:** Every computed metric must expose its underlying assumptions, constants, derating factors, and provenance.
3. **Mobile-First & Accessible:** 44px+ touch targets, semantic HTML elements, full keyboard navigability, and responsive layouts.
4. **Zero Vanity / Fake Confidence:** Never output fabricated confidence percentages or unsubstantiated claims of "optimal". Ground all outputs in verified physics.
