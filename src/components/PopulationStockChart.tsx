import { useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { enrichedDemographics } from "../data/demographics";
import { formatNumber } from "../lib/formatters";
import { useMediaQuery } from "../lib/useMediaQuery";
import { ChartChrome } from "./ChartChrome";
import { CustomTooltip } from "./CustomTooltip";

export function PopulationStockChart() {
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2025);
  const isMobile = useMediaQuery("(max-width: 620px)");
  const peak = enrichedDemographics.reduce((max, row) => row.year_end_population > max.year_end_population ? row : max);
  const latest = enrichedDemographics.at(-1)!;
  const decline = peak.year_end_population - latest.year_end_population;
  const selected = enrichedDemographics.find((row) => row.year === selectedYear) ?? latest;

  return (
    <ChartChrome footer={`Peak registered stock: ${formatNumber(peak.year_end_population)} in ${peak.year}. Decline to 2025: ${formatNumber(decline)}.`}>
      <div className="control-row">
        <button className={showAnnotations ? "active" : ""} onClick={() => setShowAnnotations(!showAnnotations)}>Toggle annotations</button>
      </div>
      <ResponsiveContainer width="100%" height={isMobile ? 280 : 330}>
        <LineChart data={enrichedDemographics} margin={isMobile ? { top: 12, right: 4, left: -14, bottom: 0 } : undefined} onClick={(event) => event?.activePayload?.[0]?.payload?.year && setSelectedYear(event.activePayload[0].payload.year)}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e1ded5" />
          <XAxis dataKey="year" interval={isMobile ? 1 : 0} tick={{ fontSize: isMobile ? 11 : 12 }} />
          <YAxis domain={["dataMin - 120000", "dataMax + 80000"]} tickFormatter={(v) => `${(Number(v) / 1000000).toFixed(1)}m`} />
          <Tooltip content={<CustomTooltip />} />
          {showAnnotations ? <ReferenceLine x={2019} stroke="#2f6f73" label={isMobile ? undefined : "Peak stock"} /> : null}
          {showAnnotations ? <ReferenceLine x={2021} stroke="#b44745" label={isMobile ? undefined : "Natural decrease period"} /> : null}
          <Line type="monotone" dataKey="year_end_population" name="Year-end population stock" stroke="#334155" strokeWidth={3} dot={{ r: isMobile ? 4 : 3 }} />
        </LineChart>
      </ResponsiveContainer>
      <div className="mobile-data-panel" aria-live="polite">
        <span>{selected.year}</span>
        <strong>{formatNumber(selected.year_end_population)} registered population</strong>
        <small>{selected.year === peak.year ? "Peak year" : `Change from peak ${formatNumber(selected.year_end_population - peak.year_end_population)}`}</small>
      </div>
    </ChartChrome>
  );
}
