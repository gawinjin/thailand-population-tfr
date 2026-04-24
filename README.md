# Thailand Fertility Decline Research Dashboard

An interactive data-research web app exploring Thailand's fertility decline, falling births, natural population decrease, and long-term demographic contraction.

This project is built as a source-aware research dashboard, not a simple infographic. The goal is to help users inspect the data, compare source families, understand uncertainty, and test basic demographic scenarios.

## Research Focus

Thailand has moved beyond ordinary low fertility into sustained natural population decrease. Registered births have declined sharply over the last decade, while deaths have exceeded births every year from 2021 onward.

The app explores:

- Birth and death trends in Thailand
- Natural population change
- Registered population decline
- Differences between birth counts, crude birth rates, and total fertility rate
- Conflicting fertility-rate estimates across sources
- The unverified claim that Thailand's fertility rate may reach 0.78 in 2026
- Structural causes behind fertility decline
- Forward scenarios for births and natural decrease
- Data gaps and uncertainty

## Core Thesis

Thailand's fertility decline is not simply a cultural shift or a temporary post-pandemic effect. It reflects a structural failure in the conditions required for family formation.

The surface explanation is usually "children are too expensive."

The deeper system includes:

- High cost of living
- Household debt
- Delayed marriage and childbirth
- Weak childcare infrastructure
- Work-care incompatibility
- Gendered unpaid care burden
- Eldercare pressure
- Low confidence in long-term economic and institutional support
- Aging before achieving high-income resilience

The app treats fertility decline as a system-level outcome rather than a single-variable problem.

## Important Disclaimer

This project is for research, education, and data exploration. It is not an official demographic forecast and should not be treated as an official statistical release.

The dataset was manually gathered and compiled from public sources, including Thai official databases, institutional reports, expert demographic publications, and Thai news reporting. Where official raw data was not directly available in clean machine-readable form, secondary reporting and institutional summaries were used with explicit labels.

All data points should be treated according to their status:

- `official_administrative`: administrative registration data from government systems
- `official_compiled`: official statistical compilation, often with publication lag
- `expert_estimate`: estimate or projection from a recognized demographic institution
- `international_benchmark`: harmonized international dataset
- `secondary_reporting`: news reporting citing official or expert sources
- `provisional`: current-year or recently reported data not yet fully finalized
- `unverified`: circulating claim without confirmed primary source

The project deliberately exposes uncertainty instead of hiding it.

## Data Cutoff

Research review cutoff:

```text
24 April 2026
```

Latest demographic cutoff used where available:

```text
31 December 2025
```

Key cutoff rules:

- Population stock is treated as year-end population where the source indicates 31 December.
- 2025 birth and death figures are treated as current/provisional unless confirmed in a finalized official yearbook or equivalent publication.
- 2026 fertility-rate claims are treated as projections or unverified current estimates unless confirmed by an official source.
- International datasets may lag behind Thai domestic reporting.

## Main Data Sources

The project uses a source hierarchy.

### Tier 1: Thai Official Administrative Data

Primary use:

- Registered births
- Registered deaths
- Registered population stock
- Natural increase/decrease

Source family:

- Department of Provincial Administration (DOPA)
- Bureau of Registration Administration (BORA)

Example source:

```text
https://stat.bora.dopa.go.th/new_stat/webPage/statByYear.php
```

Limitation:

DOPA registration data is useful for counts, but it is not the same as total fertility rate. TFR requires age-specific fertility rates and female population exposure by age.

### Tier 2: Thai Official Statistical Compilations

Primary use:

- Annual births and deaths
- Population tables
- Health and demographic indicators
- Possible maternal-age birth tables

Source family:

- National Statistical Office (NSO)
- Ministry of Public Health (MOPH)

Example sources:

```text
https://www.nso.go.th/
https://spd.moph.go.th/
```

Limitation:

Official statistical publications often lag by one or more years.

### Tier 3: Thai Expert Demographic Estimates

Primary use:

- Current demographic interpretation
- Fertility-rate estimates
- Population aging analysis
- Short-term demographic warnings

Source family:

- Institute for Population and Social Research (IPSR), Mahidol University

Example source:

```text
https://ipsr.mahidol.ac.th/en/population-gazette/
```

Limitation:

Expert estimates are highly useful for current interpretation, but should be clearly distinguished from finalized official administrative tables.

### Tier 4: International Benchmarks

Primary use:

- Cross-country comparison
- Harmonized fertility-rate series
- Long-run international comparability

Source family:

- World Bank
- United Nations Population Division
- FRED mirror of World Bank data

Example source:

```text
https://data.worldbank.org/indicator/SP.DYN.TFRT.IN?locations=TH
```

Limitation:

International datasets can lag behind domestic administrative and expert reporting.

### Tier 5: Thai News and Policy Reporting

Primary use:

- Current public debate
- Policy framing
- Explanations of social and economic causes
- Reporting of recent official or expert figures

Source family includes:

- Thai PBS
- Bangkok Post
- Thai policy/news reporting cited in the app source registry

Limitation:

News sources are treated as secondary unless they directly cite an official dataset or expert report. Media interpretation is not treated as primary data.

## Measurement Notes

This project distinguishes several concepts that are often mixed together in public discussion.

### Registered Births

The number of births recorded in the civil registration system.

This is a count.

### Registered Deaths

The number of deaths recorded in the civil registration system.

This is a count.

### Natural Change

Calculated as:

```text
natural_change = registered_births - registered_deaths
```

If the number is negative, deaths exceeded births.

### Crude Birth Rate

Approximate calculation:

```text
crude_birth_rate = registered_births / population * 1,000
```

This project may calculate approximate crude birth rates using year-end population. These should not be treated as official crude birth rates unless the denominator matches the official method.

### Total Fertility Rate

TFR is not a birth count.

It is a synthetic demographic measure estimating how many children a woman would have over her lifetime if current age-specific fertility rates continued.

A proper TFR calculation requires:

```text
births by age group of mother
female population by age group
age-specific fertility rates
summation across reproductive age groups
```

Because this project does not fully reconstruct TFR from raw maternal-age data, TFR values are presented as source-specific estimates or benchmarks.

## Treatment of the 0.78 Fertility-Rate Claim

Some media and online discussions claim that Thailand's fertility rate may fall to 0.78 in 2026.

This project does not treat 0.78 as an official confirmed value.

Current classification:

```text
0.78 = unverified low-side scenario / circulating claim
```

Why:

- No confirmed primary official source has been identified in the compiled research.
- It is not presented here as a finalized DOPA, NSO, MOPH, Mahidol, World Bank, or UN figure.
- It may be plausible as a stress-case projection if births continue falling sharply.
- It should not be used as the central factual anchor without further source validation.

Preferred wording:

```text
The 0.78 figure is plausible as a downside scenario, but not validated as Thailand's official 2026 total fertility rate.
```

## Data Compilation Method

The dataset was compiled manually through the following process:

1. Gather publicly available official Thai demographic data.
2. Record source family, cutoff date, and status for each figure.
3. Compare Thai domestic data with international fertility-rate benchmarks.
4. Review Thai news and policy reporting to identify current narratives and cited figures.
5. Separate official statistics from estimates, projections, and media interpretation.
6. Label uncertain or provisional figures explicitly.
7. Build local structured data files for use in the interactive app.
8. Use derived calculations only where the formula is transparent.

The project follows a validation-first approach: submitted claims, charts, and figures should be checked through math verification, logic consistency, and source reality checks rather than merely summarized.

## Data Integrity Rules

The app should enforce the following rules:

1. Never present 0.78 as official unless a primary official source is found.
2. Never present DOPA registration counts as TFR.
3. Always distinguish counts, crude rates, and fertility rates.
4. Always show source family and data status.
5. Always show cutoff dates where available.
6. Label 2025 and 2026 figures carefully if provisional or estimated.
7. Label scenario outputs as arithmetic scenarios, not official forecasts.
8. Show disagreement between sources instead of smoothing it away.

## Project Boundary

This project is self-contained. Research inputs, notes, files, and app data should be treated as project-specific and should not be mixed with unrelated external context unless explicitly added to this repository.

Missing context should be marked as missing rather than silently filled from unrelated prior work.

## Main App Features

The dashboard includes:

- Births vs deaths chart
- Natural change chart
- Registered population trend
- Fertility-rate source reconciliation panel
- 0.78 claim stress-test calculator
- Birth projection scenario explorer
- Cause-system map
- Evidence hierarchy
- Data gaps checklist
- Policy lever cards
- Source registry
- Data export as JSON and CSV

## Scenario Disclaimer

Scenario outputs are not official forecasts.

They are arithmetic simulations based on user-selected assumptions.

Example scenario assumptions may include:

- Annual birth decline rate
- Fixed or changing death count
- Target fertility-rate stress case
- Starting birth count
- Projection end year

These scenarios are useful for understanding sensitivity, not predicting the future with precision.

## Known Limitations

Current limitations:

- Full TFR reconstruction from age-specific fertility data has not yet been completed.
- 2025 figures may remain provisional until confirmed in a finalized official release.
- The origin of the 0.78 claim remains unresolved.
- Some Thai official data may exist only in PDF, dashboard, or non-machine-readable form.
- News sources may cite official figures without linking directly to the underlying table.
- International TFR benchmarks may lag behind Thai domestic reporting.
- Crude birth and death rates calculated inside the app may be approximate if using year-end population instead of official mid-year population.

## Future Research Improvements

Priority improvements:

1. Retrieve official births by mother's age for 2024 and 2025.
2. Retrieve matching female population by age group.
3. Reconstruct TFR directly from age-specific fertility rates.
4. Verify 2025 figures against finalized DOPA/NSO/MOPH publications.
5. Trace the first source of the 0.78 fertility-rate claim.
6. Add province-level birth and fertility data.
7. Add marriage, divorce, and age-at-first-birth trends.
8. Add household debt and income data.
9. Add childcare availability and cost data.
10. Add labor-market and unpaid-care indicators.
11. Add migration assumptions to scenario modeling.
12. Add Thai-language version of the dashboard.

## Repository Structure

```text
src/
  App.tsx
  main.tsx
  styles.css

src/components/
  HeroStats.tsx
  BirthDeathChart.tsx
  NaturalChangeChart.tsx
  PopulationStockChart.tsx
  FertilitySourceComparison.tsx
  ClaimStressTester.tsx
  ScenarioExplorer.tsx
  CauseNetwork.tsx
  EvidenceHierarchy.tsx
  DataGaps.tsx
  PolicyLevers.tsx
  SourceRegistry.tsx
  DownloadData.tsx

src/data/
  demographics.ts
  fertilitySources.ts
  causeNetwork.ts
  sourceRegistry.ts
  policyLevers.ts

src/lib/
  calculations.ts
  formatters.ts
  exportCsv.ts

src/types/
  index.ts
```

## How to Run

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

Build:

```bash
npm run build
```

## How to Update Data

When updating the dataset:

1. Add the new value to the relevant data file.
2. Add or update the source in `sourceRegistry.ts`.
3. Include the cutoff date.
4. Include the data status.
5. Add a note if the value is provisional, estimated, or revised.
6. Do not overwrite historical values without recording the reason.
7. If a source changes methodology, document the break.

Recommended fields:

```ts
{
  year: 2026,
  value: 0,
  source_id: "",
  source_family: "",
  status: "",
  cutoff: "",
  method_note: "",
  limitation: ""
}
```

## License

Use a permissive license if the repository is intended for public learning and reuse.

Suggested:

```text
MIT License
```

If using official data, always respect the terms of the original data providers.

## Citation and Attribution

If citing this project, describe it as:

```text
Thailand Fertility Decline Research Dashboard, compiled from public Thai administrative data, official statistical publications, expert demographic estimates, international benchmarks, and Thai policy/news reporting. Research cutoff: 24 April 2026.
```

This project should not be cited as an official source. Cite the original data providers whenever possible.

## Short Summary

Thailand's fertility decline is real, but the exact current fertility-rate number depends on source and method. The dashboard separates verified registration trends from estimated fertility rates, unverified claims, and future scenarios.

The strongest factual signal is not the viral 0.78 claim.

The strongest factual signal is that births have collapsed, deaths have exceeded births since 2021, and Thailand is already operating inside a demographic contraction regime.
