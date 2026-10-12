import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { CustomTooltip } from "../components/CustomTooltip";
import { demographicRows, enrichedDemographics } from "../data/demographics";
import { regionalRows, maternalAgeRows } from "../data/research";
import { fertilitySources } from "../data/fertilitySources";
import { sourceRegistry } from "../data/sourceRegistry";
import { buildProjection, calculateCumulativeNaturalChange, calculateYoY, estimateBirthsFromTfrRatio, findThresholdYear, classifyScenarioDecline } from "./calculations";

describe("published data consistency", () => {
  it("reconciles every annual count and the five-year deficit", () => {
    for (const row of demographicRows) expect(row.natural_change).toBe(row.registered_births - row.registered_deaths);
    expect(calculateCumulativeNaturalChange(demographicRows.filter(row => row.year >= 2021))).toBe(-413512);
    expect(enrichedDemographics[0].birth_index_2016).toBe(100);
  });
  it("reconciles seven non-overlapping regions to national totals", () => {
    expect(regionalRows.reduce((sum, row) => sum + row.births, 0)).toBe(416574);
    expect(regionalRows.reduce((sum, row) => sum + row.deaths, 0)).toBe(559684);
  });
  it("keeps health-statistics births distinct from registration", () => {
    expect(maternalAgeRows.reduce((sum, row) => sum + row.births, 0)).toBe(441631);
    expect(demographicRows.find(row => row.year === 2024)!.registered_births).toBe(462240);
  });
  it("resolves every source reference and keeps the claim unverified", () => {
    const ids = new Set(sourceRegistry.map(source => source.id));
    for (const row of demographicRows) for (const id of row.source_ids) expect(ids.has(id)).toBe(true);
    for (const row of fertilitySources) if (row.source_id) expect(ids.has(row.source_id)).toBe(true);
    expect(fertilitySources.find(row => row.tfr === 0.78)?.status).toBe("unverified");
  });
});

describe("scenario regressions", () => {
  it("applies a first-year stress only once, followed by the chosen rate", () => {
    const rows = buildProjection(416574, 559684, -0.04, 0, 2025, 2027, "compound", 338302);
    expect(rows.map(row => row.births)).toEqual([416574, 338302, 324770]);
    expect(calculateCumulativeNaturalChange(rows.slice(1))).toBe(-456296);
    expect(findThresholdYear(rows, 350000)).toBe(2026);
  });
  it("supports linear change and floors births at zero", () => {
    const rows = buildProjection(100, 100, -0.12, 0, 2025, 2040, "linear");
    expect(rows[2].births).toBe(76);
    expect(rows.at(-1)!.births).toBe(0);
    expect(findThresholdYear([{ year: 2025, births: 400000 }], 400000)).toBeNull();
  });
  it("validates ratios, dates, and zero-denominator changes", () => {
    expect(estimateBirthsFromTfrRatio(373000, 0.78, 0.86)).toBeCloseTo(338302.3256);
    expect(() => estimateBirthsFromTfrRatio(373000, 0.78, 0)).toThrow(RangeError);
    expect(() => buildProjection(100, 100, -0.04, 0, 2040, 2035)).toThrow(RangeError);
    expect(() => buildProjection(NaN, 100, -0.04, 0, 2025, 2035)).toThrow(RangeError);
    expect(calculateYoY(100, 0)).toBeNull();
    expect([4.9, 5, 12, 12.1, 20, 20.1].map(classifyScenarioDecline)).toEqual(["mild", "plausible_current_decline", "plausible_current_decline", "severe_downside", "severe_downside", "extreme"]);
  });
});

it("formats natural change as people and YoY as percentages", () => {
  const payload = [{ dataKey: "natural_change", name: "Natural change", value: -143110, payload: { year: 2025 } }];
  const counts = renderToStaticMarkup(createElement(CustomTooltip, { active: true, payload }));
  expect(counts).toContain("-143,110");
  expect(counts).not.toContain("%");
  const percentages = renderToStaticMarkup(createElement(CustomTooltip, { active: true, mode: "yoy", payload: [{ ...payload[0], dataKey: "births", value: -9.879 }] }));
  expect(percentages).toContain("-9.9%");
});
