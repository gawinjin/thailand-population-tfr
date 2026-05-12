import type { FertilitySource } from "../types";

export const fertilitySources: FertilitySource[] = [
  { year: 2015, source: "World Bank / WDI (historical)", tfr: 1.51, type: "international_harmonized_estimate", confidence: "medium", status: "lagged_external_benchmark", cutoff: "reviewed 2026-05-12", note: "WDI historical TFR series, pre-decline baseline." },
  { year: 2017, source: "World Bank / WDI (historical)", tfr: 1.45, type: "international_harmonized_estimate", confidence: "medium", status: "lagged_external_benchmark", cutoff: "reviewed 2026-05-12", note: "WDI historical TFR series." },
  { year: 2019, source: "World Bank / WDI (historical)", tfr: 1.34, type: "international_harmonized_estimate", confidence: "medium", status: "lagged_external_benchmark", cutoff: "reviewed 2026-05-12", note: "WDI historical TFR series." },
  { year: 2020, source: "NSO / DOPA registration-derived", tfr: 1.24, type: "thai_official_compilation", confidence: "high", status: "official_compiled", cutoff: "2020 yearbook", note: "Thai official compilation derived from DOPA registration." },
  { year: 2021, source: "NSO / DOPA registration-derived", tfr: 1.16, type: "thai_official_compilation", confidence: "high", status: "official_compiled", cutoff: "2021 yearbook", note: "Pandemic-era trough; first year of natural decrease." },
  { year: 2022, source: "World Bank / WDI", tfr: 1.08, type: "international_harmonized_estimate", confidence: "medium", status: "lagged_external_benchmark", cutoff: "reviewed 2026-05-12", note: "WDI estimate." },
  { year: 2023, source: "World Bank / WDI", tfr: 1.2, type: "international_harmonized_estimate", confidence: "medium", status: "lagged_external_benchmark", cutoff: "reviewed 2026-04-24", note: "Useful for international comparison, but not the most current Thai domestic signal." },
  { year: 2024, source: "NSO / MOPH / Mahidol-linked official Thai compilation", tfr: 1.00, type: "thai_official_compilation", confidence: "high", status: "official_compiled", cutoff: "publication year 2025", note: "Thai official compilation indicates TFR around 1.00 in 2024." },
  { year: 2026, source: "Mahidol IPSR Population Gazette 2026", tfr: 0.86, type: "expert_estimate_projection", confidence: "high_for_current_benchmark", status: "estimated", cutoff: "January 2026", note: "Best-supported current expert benchmark found. Gazette values are annual estimates and should not be chained mechanically as a trend series." },
  { year: 2026, source: "Social media / World of Statistics-style claim", tfr: 0.78, type: "unverified_claim_or_low_side_scenario", confidence: "low", status: "unverified", cutoff: "reviewed 2026-05-11", note: "Unverified social-media extrapolation. Not found in Mahidol IPSR, DOPA, NSO, MOPH, UN, or World Bank sources." }
];
