# Thailand Fertility Research Dashboard

An interactive React dashboard for exploring Thailand's births, deaths, registered population, fertility estimates and demographic scenarios. Built with AI-assisted research and implementation; original publishers remain the statistical authorities.

## Current data review

Reviewed **12 October 2026**. Annual registration coverage is **2016-2025**. This is a local dataset, not a live feed.

| Measure | Current value | Evidence and status |
| --- | ---: | --- |
| Registered births, 2025 | 416,574 | NSO 2026 / DOPA; official compiled |
| Registered deaths, 2025 | 559,684 | NSO 2026 / DOPA; official compiled |
| Natural change, 2025 | -143,110 | Births minus deaths |
| Natural change, 2021-2025 | -413,512 | Sum of annual registration balances |
| Registered population, 31 Dec 2025 | 65,809,011 | NSO 2026 table 1.3 |
| TFR, 2024, WDI | 1.204 | International harmonized estimate; API updated 8 Oct 2026 |
| TFR, 2025, NSO compilation | 0.9 | Rounded Mahidol estimate republished by NSO |
| TFR, 2026, Mahidol | 0.86 | Expert estimate; retained with access limitation |
| Circulating TFR claim, 2026 | 0.78 | Unverified; stress assumption only |

### What changed

- Confirmed 2025 registration counts and population in NSO's 2026 yearbook; upgraded their status from provisional reporting to official compiled.
- Corrected 2017, 2018 and 2019 births to **703,003**, **666,366** and **618,205**, respectively, following NSO 2025 figure 1.1. The previous values were 702,755, 666,109 and 618,193.
- Updated the WDI benchmark to its latest non-null observation: 2024. The retrieved API returned null for 2025.
- Added seven non-overlapping regional registration totals for 2025.
- Added 2024 health-statistics live births by mother's age: **441,631** in total. This differs from **462,240 registration events** and is kept separate.
- Fixed count/percentage tooltip formatting, pre-2021 cumulative wording, calculator validation and scenario accounting.

### Sources checked

- [NSO Statistical Yearbook 2026, full PDF](https://www.nso.go.th/public/e-book/Statistical-Yearbook/SYB-2026_webPage/File_SYB/2026/Full/Statistical_Yearbook_Thailand_2026.pdf): PDF page 55 (rounded TFR indicators and their Mahidol attribution), page 66 (2025 national and regional registration counts), page 75 (table 1.3, population stocks and record-correction footnote), page 88 (table 1.10, maternal-age live births from MOPH). The PDF is about 50 MB.
- [NSO 2025 figure 1.1](https://www.nso.go.th/public/e-book/Statistical-Yearbook/SYB-2025/66/): 2016-2024 registration events and historical corrections.
- [World Bank WDI API](https://api.worldbank.org/v2/country/THA/indicator/SP.DYN.TFRT.IN?format=json&date=2023:2025): retrieved 12 Oct 2026; 2023 = 1.212, 2024 = 1.204, 2025 = null. API metadata last updated 8 Oct 2026.
- [Mahidol 2026 Gazette, Thai PDF](https://ipsr.mahidol.ac.th/wp-content/uploads/2026/01/Gazette2026TH.pdf): indexed primary-source text corroborates 0.86; direct retrieval returned HTTP 403. The existing estimate is retained, with this limitation shown in the app.

The full registry includes earlier contextual sources. Their existing cutoff dates do **not** imply that every source was reverified in October.

## Interpretation and limits

Registered births and deaths are administrative counts. Natural change is their difference. Registered population changes also reflect migration and administrative adjustments. NSO specifically flags record corrections in 2020; the stock drop must not be attributed entirely to deaths exceeding births.

Health-statistics live births and registration events have different coverage. Crude rates in this app use year-end population and are **approximate**, not official mid-year-denominator rates.

TFR is a synthetic rate based on age-specific fertility rates and female exposure. NSO's rounded TFR indicators are attributed to Mahidol, so official publication does not make them independent measured estimates. The source points are deliberately not connected as one time series.

No independently verified 2026 monthly registration series was extracted in this review. Partial-year figures on secondary sites have not been added to the annual chart. Full-year 2026 observations cannot yet be complete as of the review date.

The primary origin and calculation method of 0.78 remain unverified. A ratio-based stress calculation cannot establish whether that claim is true or probable. Causal links, evidence-strength labels and policy confidence are editorial assessments; they do not quantify causal effects. No single policy is assumed to restore replacement fertility.

## Scenario assumptions

- The default baseline is 416,574 births and 559,684 deaths in 2025.
- Births can follow compound or linear annual change. Linear births are floored at zero.
- Deaths are fixed, increase by 1% annually, or decrease by 0.5% annually.
- The 0.86-like preset sets only the first projected year's births to 373,000. This is a heuristic model anchor.
- The 0.78 preset uses the same ratio as the calculator: 373,000 × 0.78 / 0.86, rounded to 338,302.
- After a first-year override, the selected annual change applies to subsequent years; the initial shock is not repeated automatically.
- Cumulative scenario natural change excludes the baseline year. Threshold years include the baseline if it is already below the threshold.
- If users change the starting year, the death baseline remains explicitly anchored to the 2025 count.
- Scenario exports include inputs and assumptions. These are arithmetic scenarios, not official cohort-component projections; migration and changing age structure are not modeled.

## Run and verify

Requires Node.js **24.x**, matching CI and the Vercel build runtime.

Production builds force a fresh TypeScript check and use bundler module resolution for Vite's package exports. Cached TypeScript metadata cannot skip the configuration check.

```bash
npm ci
npm run dev
```

Open the URL printed by Vite, normally [localhost:5173](http://localhost:5173). If occupied, Vite selects another port.

```bash
npm run build
npm test
npm run test:e2e
npm audit
```

Browser tests use installed Google Chrome and start a temporary server at port 5178. They exercise desktop and mobile layouts, evidence views, input validation, presets and JSON download. Test screenshots are written to the ignored `test-results/` folder.

Stack: React 18, TypeScript, Vite 7, Tailwind CSS 4, Recharts and React Flow. No backend or credentials are required.

## Repository guide

- `src/data/demographics.ts`: registration series and source IDs.
- `src/data/fertilitySources.ts`: source-specific TFR points and verification notes.
- `src/data/research.ts`: review metadata, revisions, regions and maternal-age births.
- `src/data/sourceRegistry.ts`: publisher links, cutoffs and limitations.
- `src/lib/calculations.ts`: derived measures and scenario math.
- `src/components/`: interactive charts, tables, calculators and source panels.
- `src/lib/calculations.test.ts`: reconciliation and calculation regression tests.
- `tests/dashboard.spec.ts`: browser workflow tests.

JSON exports include all datasets and review metadata. CSV exports cover annual registration data, TFR sources, regions and the current scenario.

## Updating the data

Add figures only after identifying the original table, reference period, coverage and status. Record source IDs, review date and limitations. Preserve corrections in `research.ts` and explain methodology breaks. Recalculate natural change from births and deaths; never copy a stale derived total.

Keep monthly or partial-year observations separate from full years. Do not replace registration events with health-statistics counts. Use compatible maternal-age births and female exposure denominators before attempting a TFR reconstruction. Run the data reconciliation tests, build and browser checks after changes.

## Attribution

Cite original data providers where possible. This repository is a research companion, not an official statistical release. No project license has been selected; source-provider terms continue to apply.
