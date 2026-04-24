import type { DemographicRow, EnrichedDemographicRow, ProjectionRow } from "../types";

export function calculateNaturalChange(births: number, deaths: number) {
  return births - deaths;
}

export function calculateYoY(current: number, previous: number) {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function calculateIndex(value: number, base: number) {
  return (value / base) * 100;
}

export function calculateApproxCrudeRate(events: number, population: number) {
  return (events / population) * 1000;
}

export function projectBirthsCompound(
  startBirths: number,
  annualChangeRate: number,
  startYear: number,
  endYear: number
): ProjectionRow[] {
  return Array.from({ length: endYear - startYear + 1 }, (_, index) => ({
    year: startYear + index,
    births: Math.round(startBirths * Math.pow(1 + annualChangeRate, index))
  }));
}

export function projectDeathsCompound(
  startDeaths: number,
  annualChangeRate: number,
  startYear: number,
  endYear: number
): ProjectionRow[] {
  return Array.from({ length: endYear - startYear + 1 }, (_, index) => ({
    year: startYear + index,
    births: 0,
    deaths: Math.round(startDeaths * Math.pow(1 + annualChangeRate, index))
  }));
}

export function calculateCumulativeNaturalChange(rows: Array<{ natural_change: number }>) {
  return rows.reduce((sum, row) => sum + row.natural_change, 0);
}

export function estimateBirthsFromTfrRatio(
  benchmarkBirths: number,
  targetTfr: number,
  benchmarkTfr: number
) {
  return benchmarkBirths * targetTfr / benchmarkTfr;
}

export function classifyScenarioDecline(percentDecline: number) {
  if (percentDecline < 5) return "mild";
  if (percentDecline <= 12) return "plausible_current_decline";
  if (percentDecline <= 20) return "severe_downside";
  return "extreme";
}

export function findThresholdYear(series: Array<{ year: number; births: number }>, threshold: number) {
  return series.find((row) => row.births < threshold)?.year ?? null;
}

export function enrichDemographics(rows: DemographicRow[]): EnrichedDemographicRow[] {
  const baseBirths = rows[0].registered_births;
  const baseDeaths = rows[0].registered_deaths;
  return rows.map((row, index) => {
    const previous = rows[index - 1];
    return {
      ...row,
      birth_change_yoy: previous ? calculateYoY(row.registered_births, previous.registered_births) : null,
      death_change_yoy: previous ? calculateYoY(row.registered_deaths, previous.registered_deaths) : null,
      natural_change_yoy: previous ? calculateYoY(row.natural_change, previous.natural_change) : null,
      birth_index_2016: calculateIndex(row.registered_births, baseBirths),
      death_index_2016: calculateIndex(row.registered_deaths, baseDeaths),
      approximate_crude_birth_rate: calculateApproxCrudeRate(row.registered_births, row.year_end_population),
      approximate_crude_death_rate: calculateApproxCrudeRate(row.registered_deaths, row.year_end_population)
    };
  });
}

export function buildProjection(
  startBirths: number,
  startDeaths: number,
  birthChangeRate: number,
  deathChangeRate: number,
  startYear: number,
  endYear: number
) {
  const births = projectBirthsCompound(startBirths, birthChangeRate, startYear, endYear);
  const deaths = projectDeathsCompound(startDeaths, deathChangeRate, startYear, endYear);
  return births.map((row, index) => {
    const deathCount = deaths[index].deaths ?? startDeaths;
    return {
      year: row.year,
      births: row.births,
      deaths: deathCount,
      natural_change: calculateNaturalChange(row.births, deathCount)
    };
  });
}
