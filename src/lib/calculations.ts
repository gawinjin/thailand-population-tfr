import type { DemographicRow, EnrichedDemographicRow, ProjectionRow } from "../types";

export function calculateNaturalChange(births: number, deaths: number) {
  return births - deaths;
}

export function calculateYoY(current: number, previous: number) {
  if (!Number.isFinite(current) || !Number.isFinite(previous) || previous === 0) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function calculateIndex(value: number, base: number) {
  if (!Number.isFinite(value) || !Number.isFinite(base) || base <= 0) throw new RangeError("Index base must be positive.");
  return (value / base) * 100;
}

export function calculateApproxCrudeRate(events: number, population: number) {
  if (!Number.isFinite(events) || events < 0 || !Number.isFinite(population) || population <= 0) throw new RangeError("Events must be nonnegative and population positive.");
  return (events / population) * 1000;
}

export function projectBirthsCompound(
  startBirths: number,
  annualChangeRate: number,
  startYear: number,
  endYear: number
): ProjectionRow[] {
  validateProjection(startBirths, annualChangeRate, startYear, endYear);
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
  validateProjection(startDeaths, annualChangeRate, startYear, endYear);
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
  if (![benchmarkBirths, targetTfr, benchmarkTfr].every(value => Number.isFinite(value) && value > 0)) throw new RangeError("Births and TFR inputs must be positive.");
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
  if (!rows.length) return [];
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
  endYear: number,
  method: "compound" | "linear" = "compound",
  firstYearBirths?: number
) {
  validateProjection(startBirths, birthChangeRate, startYear, endYear);
  if (firstYearBirths !== undefined && (!Number.isFinite(firstYearBirths) || firstYearBirths < 0)) throw new RangeError("First-year births must be nonnegative.");
  const births = Array.from({ length: endYear - startYear + 1 }, (_, index) => {
    const base = firstYearBirths ?? startBirths;
    const elapsed = firstYearBirths === undefined ? index : index - 1;
    const value = method === "linear" ? base * (1 + birthChangeRate * elapsed) : base * (1 + birthChangeRate) ** elapsed;
    return { year: startYear + index, births: index === 0 ? startBirths : Math.max(0, Math.round(value)) };
  });
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

function validateProjection(start: number, rate: number, startYear: number, endYear: number) {
  if (!Number.isFinite(start) || start < 0 || !Number.isFinite(rate) || rate < -1 ||
    !Number.isInteger(startYear) || !Number.isInteger(endYear) || endYear < startYear || endYear - startYear > 100) {
    throw new RangeError("Invalid projection inputs.");
  }
}
