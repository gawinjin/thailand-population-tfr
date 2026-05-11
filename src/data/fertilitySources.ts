import type { FertilitySource } from "../types";

export const fertilitySources: FertilitySource[] = [
  { year: 2023, source: "World Bank / WDI", tfr: 1.2, type: "international_harmonized_estimate", confidence: "medium", status: "lagged_external_benchmark", cutoff: "reviewed 2026-04-24", note: "Useful for international comparison, but not the most current Thai domestic signal." },
  { year: 2024, source: "NSO / MOPH / Mahidol-linked official Thai compilation", tfr: 1.00, type: "thai_official_compilation", confidence: "high", status: "official_compiled", cutoff: "publication year 2025", note: "Thai official compilation indicates TFR around 1.00 in 2024." },
  { year: 2026, source: "Mahidol IPSR Population Gazette 2026", tfr: 0.86, type: "expert_estimate_projection", confidence: "high_for_current_benchmark", status: "estimated", cutoff: "January 2026", note: "Best-supported current expert benchmark found. Gazette values are annual estimates and should not be chained mechanically as a trend series." },
  { year: 2026, source: "Social media / World of Statistics-style claim", tfr: 0.78, type: "unverified_claim_or_low_side_scenario", confidence: "low", status: "unverified", cutoff: "reviewed 2026-05-11", note: "Unverified social-media extrapolation. Not found in Mahidol IPSR, DOPA, NSO, MOPH, UN, or World Bank sources." }
];
