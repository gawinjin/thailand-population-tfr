import type { FertilitySource } from "../types";

const WDI_NOTE = "World Bank WDI series SP.DYN.TFRT.IN (UN WPP-based, harmonized, lagged). FRED mirror last updated 2026-04-14.";

export const fertilitySources: FertilitySource[] = [
  { year: 2018, source: "World Bank / WDI", tfr: 1.32, type: "international_harmonized_estimate", confidence: "medium", status: "lagged_external_benchmark", cutoff: "reviewed 2026-11-10", note: WDI_NOTE },
  { year: 2020, source: "World Bank / WDI", tfr: 1.26, type: "international_harmonized_estimate", confidence: "medium", status: "lagged_external_benchmark", cutoff: "reviewed 2026-11-10", note: WDI_NOTE },
  { year: 2021, source: "World Bank / WDI", tfr: 1.23, type: "international_harmonized_estimate", confidence: "medium", status: "lagged_external_benchmark", cutoff: "reviewed 2026-11-10", note: WDI_NOTE },
  { year: 2022, source: "World Bank / WDI", tfr: 1.22, type: "international_harmonized_estimate", confidence: "medium", status: "lagged_external_benchmark", cutoff: "reviewed 2026-11-10", note: WDI_NOTE },
  { year: 2023, source: "World Bank / WDI", tfr: 1.21, type: "international_harmonized_estimate", confidence: "medium", status: "lagged_external_benchmark", cutoff: "reviewed 2026-11-10", note: `${WDI_NOTE} Useful for international comparison, but not the most current Thai domestic signal.` },
  { year: 2024, source: "World Bank / WDI", tfr: 1.20, type: "international_harmonized_estimate", confidence: "medium", status: "lagged_external_benchmark", cutoff: "reviewed 2026-11-10", note: `${WDI_NOTE} Latest WDI value; sits well above Thai domestic estimates for the same year.` },
  { year: 2024, source: "NSO / MOPH / Mahidol-linked official Thai compilation", tfr: 1.00, type: "thai_official_compilation", confidence: "high", status: "official_compiled", cutoff: "publication year 2025", note: "Thai official compilation indicates TFR around 1.00 in 2024." },
  { year: 2025, source: "Mahidol IPSR Population Gazette 2025", tfr: 0.93, type: "expert_estimate_projection", confidence: "high", status: "estimated", cutoff: "January 2025", note: "Gazette Vol. 34 annual estimate (midyear 2025 population 65.70m, CDR 9.3, natural growth −0.3%). Gazette editions should not be chained mechanically as a trend series." },
  { year: 2026, source: "Mahidol IPSR Population Gazette 2026", tfr: 0.86, type: "expert_estimate_projection", confidence: "high_for_current_benchmark", status: "estimated", cutoff: "January 2026", note: "Gazette Vol. 35 annual estimate (midyear 2026 population 65.48m, CDR 9.6, natural growth −0.4%). Best-supported current expert benchmark. Gazette values should not be chained mechanically as a trend series." },
  { year: 2026, source: "Social media / World of Statistics-style claim", tfr: 0.78, type: "unverified_claim_or_low_side_scenario", confidence: "low", status: "unverified", cutoff: "reviewed 2026-05-11", note: "Unverified social-media extrapolation. Not found in Mahidol IPSR, DOPA, NSO, MOPH, UN, or World Bank sources." }
];
