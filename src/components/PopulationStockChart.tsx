import { useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { enrichedDemographics } from "../data/demographics";
import { formatNumber } from "../lib/formatters";
import { ChartChrome } from "./ChartChrome";
import { CustomTooltip } from "./CustomTooltip";

export function PopulationStockChart() {
  const [showAnnotations, setShowAnnotations] = useState(true);
  const peak = enrichedDemographics.reduce((max, row) => row.year_end_population > max.year_end_population ? row : max);
  const latest = enrichedDemographics.at(-1)!;
  const decline = peak.year_end_population - latest.year_end_population;
  return (
    <ChartChrome footer={`Peak registered stock: ${formatNumber(peak.year_end_population)} in ${peak.year}. Decline to 2025: ${formatNumber(decline)}.`}>
      <div className="control-row">
        <button className={showAnnotations ? "active" : ""} onClick={() => setShowAnnotations(!showAnnotations)}>Toggle annotations</button>
      </div>
      <ResponsiveContainer width="100%" height={330}>
        <LineChart data={enrichedDemographics}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e1ded5" />
          <XAxis dataKey="year" />
          <YAxis domain={["dataMin - 120000", "dataMax + 80000"]} tickFormatter={(v) => `${(Number(v) / 1000000).toFixed(1)}m`} />
          <Tooltip content={<CustomTooltip />} />
          {showAnnotations ? <ReferenceLine x={2019} stroke="#2f6f73" label="Peak stock" /> : null}
          {showAnnotations ? <ReferenceLine x={2021} stroke="#b44745" label="Natural decrease period" /> : null}
          <Line type="monotone" dataKey="year_end_population" name="Year-end population stock" stroke="#334155" strokeWidth={3} dot />
        </LineChart>
      </ResponsiveContainer>
    </ChartChrome>
  );
}
