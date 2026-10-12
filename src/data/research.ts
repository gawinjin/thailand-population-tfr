export const researchReview = {
  reviewed_on: "2026-10-12",
  annual_cutoff: "2025-12-31",
  summary: "2025 registration totals are now published in NSO's 2026 yearbook. Annual coverage remains through 2025; no verified 2026 monthly series is included.",
  revisions: [
    "2017 births corrected from 702,755 to 703,003; 2018 from 666,109 to 666,366; 2019 from 618,193 to 618,205, following NSO 2025 figure 1.1.",
    "2025 births 416,574, deaths 559,684 and population 65,809,011 confirmed in NSO 2026. Status upgraded to official compiled. The earlier 416,514 figure was superseded before this review.",
    "WDI updated from a rounded 2023 benchmark to 1.204 in 2024. NSO's 2025 TFR indicator is 0.9, rounded and sourced to Mahidol.",
    "2024 maternal-age data is available in NSO table 1.10, but matching exposure denominators are still required for TFR reconstruction."
  ],
  limitations: [
    "DOPA's interactive current-year tables were not independently extracted. Partial-year figures from secondary sites have not been added to the annual series.",
    "Mahidol direct PDF access returned 403. The indexed Thai Gazette corroborates 0.86; the estimate has been retained with this access limitation.",
    "Cause strengths and policy confidence are editorial assessments, not causal effect estimates. No new causal validation was performed."
  ]
};

// NSO 2026 PDF page 66. Bangkok is already included in Bangkok and Vicinities.
export const regionalRows = [
  { region: "Bangkok and Vicinities", births: 80682, deaths: 92043 },
  { region: "Central", births: 15754, deaths: 28666 },
  { region: "Eastern", births: 44484, deaths: 45330 },
  { region: "Western", births: 22095, deaths: 33130 },
  { region: "Northern", births: 69998, deaths: 111132 },
  { region: "Northeastern", births: 106477, deaths: 182175 },
  { region: "Southern", births: 77084, deaths: 67208 }
].map(row => ({ ...row, year: 2025, natural_change: row.births - row.deaths, status: "official_compiled", cutoff: "2025-12-31", source_note: "NSO 2026 figure 1.1 / DOPA; seven non-overlapping regions", source_id: "nso_yearbook_2026" }));

// NSO 2026 table 1.10, PDF page 88. Health-statistics live births, not registration events.
export const maternalAgeRows = [
  ["Under 15", 1658], ["15-19", 35981], ["20-24", 84257], ["25-29", 122251],
  ["30-34", 114165], ["35-39", 64458], ["40-44", 17558], ["45-49", 1062],
  ["50+", 65], ["Unknown", 176]
].map(([age, births]) => ({ age: String(age), births: Number(births), year: 2024, status: "official_compiled", cutoff: "2024-12-31", source_id: "nso_yearbook_2026" }));
