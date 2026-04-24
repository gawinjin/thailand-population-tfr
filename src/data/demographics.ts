import { enrichDemographics } from "../lib/calculations";
import type { DemographicRow } from "../types";

export const demographicRows: DemographicRow[] = [
  { year: 2016, registered_births: 704058, registered_deaths: 480434, natural_change: 223624, year_end_population: 65931550, status: "official_compiled", cutoff: "2016-12-31", source_note: "NSO Statistical Yearbook / DOPA registration" },
  { year: 2017, registered_births: 702755, registered_deaths: 468911, natural_change: 233844, year_end_population: 66188503, status: "official_compiled", cutoff: "2017-12-31", source_note: "NSO Statistical Yearbook / DOPA registration" },
  { year: 2018, registered_births: 666109, registered_deaths: 473541, natural_change: 192568, year_end_population: 66413979, status: "official_compiled", cutoff: "2018-12-31", source_note: "NSO Statistical Yearbook / DOPA registration" },
  { year: 2019, registered_births: 618193, registered_deaths: 506211, natural_change: 111982, year_end_population: 66558935, status: "official_compiled", cutoff: "2019-12-31", source_note: "NSO Statistical Yearbook / DOPA registration" },
  { year: 2020, registered_births: 587368, registered_deaths: 501438, natural_change: 85930, year_end_population: 66186727, status: "official_compiled", cutoff: "2020-12-31", source_note: "NSO Statistical Yearbook / DOPA registration" },
  { year: 2021, registered_births: 544570, registered_deaths: 563650, natural_change: -19080, year_end_population: 66171439, status: "official_compiled", cutoff: "2021-12-31", source_note: "NSO Statistical Yearbook / DOPA registration" },
  { year: 2022, registered_births: 502107, registered_deaths: 595965, natural_change: -93858, year_end_population: 66090475, status: "official_compiled", cutoff: "2022-12-31", source_note: "NSO Statistical Yearbook / DOPA registration" },
  { year: 2023, registered_births: 517934, registered_deaths: 565992, natural_change: -48058, year_end_population: 66052615, status: "official_compiled", cutoff: "2023-12-31", source_note: "NSO Statistical Yearbook / DOPA registration" },
  { year: 2024, registered_births: 462240, registered_deaths: 571646, natural_change: -109406, year_end_population: 65951210, status: "official_compiled", cutoff: "2024-12-31", source_note: "NSO Statistical Yearbook / DOPA registration" },
  { year: 2025, registered_births: 416514, registered_deaths: 559684, natural_change: -143170, year_end_population: 65809011, status: "current_dopa_cited_provisional", cutoff: "2025-12-31", source_note: "Thai reporting citing DOPA; treat as current/provisional until official yearbook publication" }
];

export const enrichedDemographics = enrichDemographics(demographicRows);
