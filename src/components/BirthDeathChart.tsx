import { useState } from "react";
import { Line, LineChart, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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

  return (
    <ChartChrome footer="Hover or tap for source note, status, cutoff and natural change. Approximate rates are available in the source table below.">
      <div className="control-row">
        {(["absolute", "index", "yoy"] as Mode[]).map((item) => (
          <button className={mode === item ? "active" : ""} onClick={() => setMode(item)} key={item}>
            {item === "absolute" ? "Counts" : item === "index" ? "Index 2016 = 100" : "YoY change %"}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={isMobile ? 300 : 380}>
        <LineChart data={data} margin={isMobile ? { top: 12, right: 4, left: -20, bottom: 0 } : { top: 18, right: 18, left: 12, bottom: 8 }} onClick={(event) => event?.activePayload?.[0]?.payload?.year && setSelectedYear(event.activePayload[0].payload.year)}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e1ded5" />
          <XAxis dataKey="year" interval={isMobile ? 1 : 0} tick={{ fontSize: isMobile ? 11 : 12 }} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          {!isMobile ? <Legend /> : null}
          <ReferenceLine x={2021} stroke="#b44745" label={isMobile ? undefined : { value: "Deaths exceed births", position: "top" }} />
          <Line type="monotone" dataKey="births" name="Registered births" stroke="#2f6f73" strokeWidth={3} dot={{ r: isMobile ? 4 : 3 }} />
          <Line type="monotone" dataKey="deaths" name="Registered deaths" stroke="#8a5a44" strokeWidth={3} dot={{ r: isMobile ? 4 : 3 }} />
        </LineChart>
      </ResponsiveContainer>
      <div className="mobile-data-panel" aria-live="polite">
        <span>{selected.year}</span>
        <strong>Births {metricFormatter(selected.births)} / deaths {metricFormatter(selected.deaths)}</strong>
        <small>Natural change {formatNumber(selected.natural_change)}</small>
      </div>
    </ChartChrome>
  );
}
