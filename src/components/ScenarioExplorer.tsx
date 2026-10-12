import { useState } from "react";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { buildProjection, calculateCumulativeNaturalChange, estimateBirthsFromTfrRatio, findThresholdYear } from "../lib/calculations";
import { latestDemographics } from "../data/demographics";
import { formatNumber } from "../lib/formatters";
import { useMediaQuery } from "../lib/useMediaQuery";
import { downloadText, rowsToCsv } from "../lib/exportCsv";
import { ChartChrome } from "./ChartChrome";
import { CustomTooltip } from "./CustomTooltip";

export function ScenarioExplorer() {
  const [startBirths, setStartBirths] = useState(latestDemographics.registered_births);
  const [startYear, setStartYear] = useState(2025);
  const [birthRate, setBirthRate] = useState(-4);
  const [deathMode, setDeathMode] = useState(0);
  const [endYear, setEndYear] = useState(2040);
  const [method, setMethod] = useState<"compound" | "linear">("compound");
  const [firstYearBirths, setFirstYearBirths] = useState<number>();
  const [selectedYear, setSelectedYear] = useState(2030);
  const isMobile = useMediaQuery("(max-width: 620px)");
  const valid = Number.isFinite(startBirths) && startBirths > 0 && Number.isInteger(startYear) && startYear >= 2025 && startYear < endYear;
  const projection = valid ? buildProjection(startBirths, latestDemographics.registered_deaths, birthRate / 100, deathMode / 100, startYear, endYear, method, firstYearBirths).map(row => ({
    ...row, status: row.year === startYear ? "scenario_baseline" : "arithmetic_scenario",
    cutoff: `Baseline reference: 2025-12-31; scenario to ${endYear}`,
    source_note: `User assumptions; ${method} births, ${birthRate}% annual change after any first-year override; deaths ${deathMode}% annually. Arithmetic scenario, not official projection.`
  })) : [];
  const future = projection.filter(row => row.year > startYear);
  const selected = projection.find(row => row.year === selectedYear) ?? projection.at(-1);
  const cumulative = calculateCumulativeNaturalChange(future);

  function applyRate(rate: number) { setBirthRate(rate); setFirstYearBirths(undefined); }

  return (
    <div className="scenario">
      <div className="scenario-controls">
        <label>Starting births<input type="number" min="1" value={startBirths} onChange={e => setStartBirths(Number(e.target.value))} /></label>
        <label>Starting year<input type="number" min="2025" max={endYear - 1} value={startYear} onChange={e => setStartYear(Number(e.target.value))} /></label>
        <div>
          <label htmlFor="birth-change-rate">Annual birth change {birthRate.toFixed(1)}%</label>
          <div className="slider-with-stepper">
            <button type="button" className="stepper" aria-label="Decrease annual birth change" onClick={() => setBirthRate(value => Math.max(-12, Number((value - 0.1).toFixed(1))))}>-</button>
            <input id="birth-change-rate" type="range" min="-12" max="2" step="0.1" value={birthRate} onChange={e => setBirthRate(Number(e.target.value))} />
            <button type="button" className="stepper" aria-label="Increase annual birth change" onClick={() => setBirthRate(value => Math.min(2, Number((value + 0.1).toFixed(1))))}>+</button>
          </div>
        </div>
        <label>Birth calculation<select value={method} onChange={e => setMethod(e.target.value as typeof method)}><option value="compound">Compound</option><option value="linear">Linear, floored at zero</option></select></label>
        <label>Deaths assumption<select value={deathMode} onChange={e => setDeathMode(Number(e.target.value))}><option value={0}>Fixed at {formatNumber(latestDemographics.registered_deaths)}</option><option value={1}>Increase 1% annually</option><option value={-0.5}>Decrease 0.5% annually</option></select></label>
        <label>End year<select value={endYear} onChange={e => setEndYear(Number(e.target.value))}><option value={2035}>2035</option><option value={2040}>2040</option></select></label>
        <div className="preset-row">
          <button onClick={() => applyRate(-2)}>Mild: -2%</button>
          <button onClick={() => applyRate(-4)}>Steady: -4%</button>
          <button onClick={() => applyRate(-8)}>Accelerated: -8%</button>
          <button onClick={() => { setStartYear(2025); setFirstYearBirths(373000); }}>0.86-like first year</button>
          <button onClick={() => { setStartYear(2025); setFirstYearBirths(Math.round(estimateBirthsFromTfrRatio(373000, 0.78, 0.86))); }}>0.78 unverified first year</button>
        </div>
        <p>Death baseline is the 2025 registration count, including when the starting year is changed.</p>
        {firstYearBirths !== undefined && <p role="status">First projected year: {formatNumber(firstYearBirths)} births; then {birthRate}% annually. The first-year value is a heuristic assumption.<button onClick={() => setFirstYearBirths(undefined)}>Clear first-year override</button></p>}
      </div>
      {!valid ? <p role="alert">Enter positive starting births and a whole starting year from 2025 before the end year.</p> : <ChartChrome footer={`Arithmetic scenario, not official projection. Births use ${method} change; deaths compound. Cumulative change covers ${startYear + 1}-${endYear}, excluding the baseline.`}>
        <ResponsiveContainer width="100%" height={isMobile ? 310 : 390}>
          <ComposedChart data={projection} margin={{ top: 12, right: 8, left: isMobile ? -12 : 12, bottom: 0 }} onClick={event => event?.activePayload?.[0]?.payload?.year && setSelectedYear(event.activePayload[0].payload.year)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" interval={isMobile ? 2 : 1} />
            <YAxis tickFormatter={v => `${v / 1000}k`} />
            <Tooltip content={<CustomTooltip />} trigger="click" />
            <Legend />
            <ReferenceLine y={0} stroke="#555" />
            <Bar dataKey="natural_change" name="Natural change (people)" fill="#b44745" opacity={0.34} isAnimationActive={false} />
            <Line dataKey="births" name="Scenario births" stroke="#2f6f73" strokeWidth={3} strokeDasharray="6 3" dot={false} isAnimationActive={false} />
            <Line dataKey="deaths" name="Scenario deaths" stroke="#8a5a44" strokeWidth={3} strokeDasharray="3 3" dot={false} isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
        <label>Selected scenario year<select value={selected?.year} onChange={e => setSelectedYear(Number(e.target.value))}>{projection.map(row => <option key={row.year}>{row.year}</option>)}</select></label>
        {selected && <p aria-live="polite">{selected.year}: births {formatNumber(selected.births)} / deaths {formatNumber(selected.deaths)} / natural change {formatNumber(selected.natural_change)}.</p>}
        <button onClick={() => downloadText("thailand-scenario.csv", rowsToCsv(projection.map(row => ({ ...row, start_year: startYear, start_births: startBirths, annual_birth_change_percent: birthRate, annual_death_change_percent: deathMode, method, first_year_births: firstYearBirths ?? "" }))), "text/csv")}>Download scenario CSV</button>
      </ChartChrome>}
      {valid && <div className="thresholds">
        {[400000, 350000, 300000].map(threshold => <div key={threshold}><span>Below {formatNumber(threshold)}</span><strong>{findThresholdYear(projection, threshold) ?? "Not by end"}</strong></div>)}
        <div><span>Cumulative natural change ({startYear + 1}-{endYear})</span><strong>{formatNumber(cumulative)}</strong></div>
      </div>}
    </div>
  );
}
