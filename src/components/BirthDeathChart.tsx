import { useState } from "react";
import { Area, CartesianGrid, ComposedChart, Legend, Line, ReferenceDot, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { enrichedDemographics } from "../data/demographics";
import { formatNumber, formatPercent } from "../lib/formatters";
import { useMediaQuery } from "../lib/useMediaQuery";
import { ChartChrome } from "./ChartChrome";
import { CustomTooltip } from "./CustomTooltip";

type Mode = "absolute" | "index" | "yoy";

export function BirthDeathChart() {
  const [mode, setMode] = useState<Mode>("absolute");
  const [selectedYear, setSelectedYear] = useState(2025);
  const isMobile = useMediaQuery("(max-width: 620px)");
  const data = enrichedDemographics.map((row) => ({
    ...row,
    births: mode === "absolute" ? row.registered_births : mode === "index" ? row.birth_index_2016 : row.birth_change_yoy,
    deaths: mode === "absolute" ? row.registered_deaths : mode === "index" ? row.death_index_2016 : row.death_change_yoy
  }));
  const selected = data.find((row) => row.year === selectedYear) ?? data.at(-1)!;
  const metricFormatter = mode === "yoy" ? formatPercent : formatNumber;
  const showArea = mode !== "yoy";
  const crossover = data.find((row) => row.year === 2021);

  return (
    <ChartChrome footer="Hover or tap for source note, status, cutoff and natural change. Approximate rates are available in the source table below.">
      <div className="control-row">
        {(["absolute", "index", "yoy"] as Mode[]).map((item) => (
          <button className={mode === item ? "active" : ""} onClick={() => setMode(item)} key={item}>
            {item === "absolute" ? "Counts" : item === "index" ? "Index 2016 = 100" : "YoY change %"}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={isMobile ? 324 : 380}>
        <ComposedChart
          data={data}
          margin={isMobile ? { top: 12, right: 12, left: 0, bottom: 8 } : { top: 18, right: 24, left: 12, bottom: 8 }}
          onClick={(event) => event?.activePayload?.[0]?.payload?.year && setSelectedYear(event.activePayload[0].payload.year)}
        >
          <defs>
            <linearGradient id="birthsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2f6f73" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#2f6f73" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="deathsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8a5a44" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#8a5a44" stopOpacity={0} />
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
            tick={{ fontSize: isMobile ? 10 : 12, fill: "#475569" }}
            label={!isMobile ? { value: mode === "yoy" ? "YoY change %" : mode === "index" ? "Index (2016 = 100)" : "Annual count", angle: -90, position: "insideLeft", offset: 10, style: { fontSize: 11, fill: "#65758b", textAnchor: "middle" } } : undefined}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#c9c1b2", strokeDasharray: "3 3" }} />
          {!isMobile ? <Legend wrapperStyle={{ paddingTop: 8 }} /> : null}
          <ReferenceLine x={2021} stroke="#b44745" strokeDasharray="4 4" label={isMobile ? undefined : { value: "Deaths exceed births", position: "top", fill: "#b44745", fontSize: 11 }} />
          {showArea ? (
            <Area type="monotone" dataKey="births" stroke="none" fill="url(#birthsFill)" legendType="none" isAnimationActive={false} />
          ) : null}
          {showArea ? (
            <Area type="monotone" dataKey="deaths" stroke="none" fill="url(#deathsFill)" legendType="none" isAnimationActive={false} />
          ) : null}
          <Line
            type="monotone"
            dataKey="births"
            name="Registered births"
            stroke="#2f6f73"
            strokeWidth={3}
            dot={{ r: isMobile ? 5 : 4, fill: "#2f6f73", stroke: "#fff", strokeWidth: 1.5 }}
            activeDot={{ r: 7, strokeWidth: 2, fill: "#2f6f73", stroke: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="deaths"
            name="Registered deaths"
            stroke="#8a5a44"
            strokeWidth={3}
            dot={{ r: isMobile ? 5 : 4, fill: "#8a5a44", stroke: "#fff", strokeWidth: 1.5 }}
            activeDot={{ r: 7, strokeWidth: 2, fill: "#8a5a44", stroke: "#fff" }}
          />
          {mode === "absolute" && crossover?.births != null && crossover.deaths != null ? (
            <>
              <ReferenceDot x={2021} y={crossover.births} r={5} fill="#b44745" stroke="#fff" strokeWidth={2} ifOverflow="extendDomain" />
              <ReferenceDot x={2021} y={crossover.deaths} r={5} fill="#b44745" stroke="#fff" strokeWidth={2} ifOverflow="extendDomain" />
            </>
          ) : null}
        </ComposedChart>
      </ResponsiveContainer>
      <div className="mobile-data-panel" aria-live="polite">
        <span>{selected.year}</span>
        <strong>Births {metricFormatter(selected.births)} / deaths {metricFormatter(selected.deaths)}</strong>
        <small>Natural change {formatNumber(selected.natural_change)}</small>
      </div>
    </ChartChrome>
  );
}
