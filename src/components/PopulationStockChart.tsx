import { useState } from "react";
import { Area, CartesianGrid, ComposedChart, Line, ReferenceDot, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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
      <ResponsiveContainer width="100%" height={isMobile ? 304 : 340}>
        <ComposedChart
          data={enrichedDemographics}
          margin={isMobile ? { top: 12, right: 12, left: 0, bottom: 8 } : { top: 18, right: 24, left: 12, bottom: 8 }}
          onClick={(event) => event?.activePayload?.[0]?.payload?.year && setSelectedYear(event.activePayload[0].payload.year)}
        >
          <defs>
            <linearGradient id="populationFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#334155" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="2 4" stroke="#e1ded5" vertical={false} />
          <XAxis
            dataKey="year"
            interval={0}
            angle={isMobile ? -45 : 0}
            textAnchor={isMobile ? "end" : "middle"}
            height={isMobile ? 44 : 30}
            tick={{ fontSize: isMobile ? 10 : 12, fill: "#475569" }}
          />
          <YAxis
            domain={["dataMin - 120000", "dataMax + 80000"]}
            tickFormatter={(v) => `${(Number(v) / 1000000).toFixed(1)}m`}
            tick={{ fontSize: isMobile ? 10 : 12, fill: "#475569" }}
            label={!isMobile ? { value: "Year-end population (millions)", angle: -90, position: "insideLeft", offset: 10, style: { fontSize: 11, fill: "#65758b", textAnchor: "middle" } } : undefined}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#c9c1b2", strokeDasharray: "3 3" }} />
          {showAnnotations ? <ReferenceLine x={2019} stroke="#2f6f73" strokeDasharray="4 4" label={isMobile ? undefined : { value: "Peak stock", position: "top", fill: "#2f6f73", fontSize: 11 }} /> : null}
          {showAnnotations ? <ReferenceLine x={2021} stroke="#b44745" strokeDasharray="4 4" label={isMobile ? undefined : { value: "Natural decrease period", position: "top", fill: "#b44745", fontSize: 11 }} /> : null}
          <Area type="monotone" dataKey="year_end_population" stroke="none" fill="url(#populationFill)" legendType="none" isAnimationActive={false} />
          <Line
            type="monotone"
            dataKey="year_end_population"
            name="Year-end population stock"
            stroke="#334155"
            strokeWidth={3}
            dot={{ r: isMobile ? 5 : 4, fill: "#334155", stroke: "#fff", strokeWidth: 1.5 }}
            activeDot={{ r: 7, strokeWidth: 2, fill: "#334155", stroke: "#fff" }}
          />
          {showAnnotations ? (
            <>
              <ReferenceDot x={peak.year} y={peak.year_end_population} r={6} fill="#2f6f73" stroke="#fff" strokeWidth={2} />
              <ReferenceDot x={latest.year} y={latest.year_end_population} r={6} fill="#b44745" stroke="#fff" strokeWidth={2} />
            </>
          ) : null}
        </ComposedChart>
      </ResponsiveContainer>
      <div className="mobile-data-panel" aria-live="polite">
        <span>{selected.year}</span>
        <strong>{formatNumber(selected.year_end_population)} registered population</strong>
        <small>{selected.year === peak.year ? "Peak year" : `Change from peak ${formatNumber(selected.year_end_population - peak.year_end_population)}`}</small>
      </div>
    </ChartChrome>
  );
}
