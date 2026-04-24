import { useMemo, useState } from "react";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { buildProjection, calculateCumulativeNaturalChange, findThresholdYear } from "../lib/calculations";
import { formatNumber } from "../lib/formatters";
import { useMediaQuery } from "../lib/useMediaQuery";
import { ChartChrome } from "./ChartChrome";
import { CustomTooltip } from "./CustomTooltip";

const presets = [
  { label: "Mild decline", rate: -0.02, births2026: null },
  { label: "Status quo decline", rate: -0.04, births2026: null },
  { label: "Accelerated decline", rate: -0.08, births2026: null },
  { label: "0.86 benchmark", rate: null, births2026: 373000 },
  { label: "0.78 stress", rate: null, births2026: 339000 }
];

export function ScenarioExplorer() {
  const [startBirths, setStartBirths] = useState(416514);
  const [birthRate, setBirthRate] = useState(-4);
  const [deathMode, setDeathMode] = useState(0);
  const [endYear, setEndYear] = useState(2040);
  const [selectedYear, setSelectedYear] = useState(2030);
  const isMobile = useMediaQuery("(max-width: 620px)");
  const projection = useMemo(() => buildProjection(startBirths, 559684, birthRate / 100, deathMode / 100, 2025, endYear), [startBirths, birthRate, deathMode, endYear]);
  const thresholds = [400000, 350000, 300000].map((threshold) => [threshold, findThresholdYear(projection, threshold)] as const);
  const cumulative = calculateCumulativeNaturalChange(projection);
  const selected = projection.find((row) => row.year === selectedYear) ?? projection.at(-1)!;

  function applyPreset(preset: (typeof presets)[number]) {
    if (preset.rate !== null) setBirthRate(preset.rate * 100);
    if (preset.births2026) setBirthRate(((preset.births2026 / startBirths) - 1) * 100);
  }

  return (
    <div className="scenario">
      <div className="scenario-controls">
        <label>Starting births<input type="number" value={startBirths} onChange={(e) => setStartBirths(Number(e.target.value))} /></label>
        <label>Annual birth change {birthRate.toFixed(1)}%<input type="range" min="-12" max="2" step="0.1" value={birthRate} onChange={(e) => setBirthRate(Number(e.target.value))} /></label>
        <label>Deaths assumption<select value={deathMode} onChange={(e) => setDeathMode(Number(e.target.value))}><option value={0}>fixed at 559,684</option><option value={1}>increase 1% annually</option><option value={-0.5}>decrease 0.5% annually</option></select></label>
        <label>End year<select value={endYear} onChange={(e) => setEndYear(Number(e.target.value))}><option value={2035}>2035</option><option value={2040}>2040</option></select></label>
        <div className="preset-row">{presets.map((preset) => <button key={preset.label} onClick={() => applyPreset(preset)}>{preset.label}</button>)}</div>
      </div>
      <ChartChrome footer="Arithmetic scenario, not official projection. Birth and death paths are simple compound arithmetic assumptions.">
        <ResponsiveContainer width="100%" height={isMobile ? 310 : 390}>
          <ComposedChart data={projection} margin={isMobile ? { top: 12, right: 4, left: -20, bottom: 0 } : undefined} onClick={(event) => event?.activePayload?.[0]?.payload?.year && setSelectedYear(event.activePayload[0].payload.year)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e1ded5" />
            <XAxis dataKey="year" interval={isMobile ? 1 : 0} tick={{ fontSize: isMobile ? 11 : 12 }} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            {!isMobile ? <Legend /> : null}
            <Bar dataKey="natural_change" name="Natural change" fill="#b44745" opacity={0.34} />
            <Line dataKey="births" name="Projected births" stroke="#2f6f73" strokeWidth={3} dot={false} />
            <Line dataKey="deaths" name="Projected deaths" stroke="#8a5a44" strokeWidth={3} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="mobile-data-panel" aria-live="polite">
          <span>{selected.year}</span>
          <strong>Births {formatNumber(selected.births)} / deaths {formatNumber(selected.deaths)}</strong>
          <small>Natural change {formatNumber(selected.natural_change)}</small>
        </div>
      </ChartChrome>
      <div className="thresholds">
        {thresholds.map(([threshold, year]) => <div key={threshold}><span>Below {formatNumber(threshold)}</span><strong>{year ?? "not by end"}</strong></div>)}
        <div><span>Cumulative natural change</span><strong>{formatNumber(cumulative)}</strong></div>
      </div>
    </div>
  );
}
