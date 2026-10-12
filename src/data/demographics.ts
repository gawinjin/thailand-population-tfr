import { calculateNaturalChange, enrichDemographics } from "../lib/calculations";
import type { DemographicRow } from "../types";

// Events: NSO 2025 figure 1.1 (2016-24), NSO 2026 figure 1.1 (2025).
// Stocks: NSO 2026 table 1.3. Keep registration events separate from MOPH live births.
const registrationSeries = [
  [2016, 704058, 480434, 65931550],
  [2017, 703003, 468911, 66188503],
  [2018, 666366, 473541, 66413979],
  [2019, 618205, 506211, 66558935],
  [2020, 587368, 501438, 66186727],
  [2021, 544570, 563650, 66171439],
  [2022, 502107, 595965, 66090475],
  [2023, 517934, 565992, 66052615],
  [2024, 462240, 571646, 65951210],
  [2025, 416574, 559684, 65809011]
];

export const demographicRows: DemographicRow[] = registrationSeries.map(([year, births, deaths, population]) => ({
  year, registered_births: births, registered_deaths: deaths,
  natural_change: calculateNaturalChange(births, deaths),
  year_end_population: population, status: "official_compiled",
  cutoff: `${year}-12-31`,
  source_ids: year === 2025 ? ["nso_yearbook_2026"] : ["nso_registration_2025", "nso_yearbook_2026"],
  source_note: `NSO ${year === 2025 ? "2026" : "2025"} yearbook figure 1.1, DOPA registration events; stock: NSO 2026 table 1.3. Reviewed 2026-10-12.${year === 2020 ? " Stock includes administrative record corrections; the drop is not solely natural change." : ""}`
}));

export const enrichedDemographics = enrichDemographics(demographicRows);
export const latestDemographics = demographicRows.at(-1)!;
