import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { enrichedDemographics } from "../data/demographics";
import { calculateCumulativeNaturalChange } from "../lib/calculations";
import { formatNumber, statusLabel } from "../lib/formatters";
import { useMediaQuery } from "../lib/useMediaQuery";
import { ChartChrome } from "./ChartChrome";
import { CustomTooltip } from "./CustomTooltip";

export function NaturalChangeChart() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const isMobile = useMediaQuery("(max-width: 620px)");
  const selectedRows = enrichedDemographics.filter((row) => row.year >= 2021 && row.year <= selectedYear);
  const cumulative = calculateCumulativeNaturalChange(selectedRows);
  const selected = enrichedDemographics.find((row) => row.year === selectedYear)!;

  return (
    <ChartChrome footer={`From 2021 to ${selectedYear}, registered deaths exceeded births by roughly ${formatNumber(Math.abs(cumulative))} people. Registration-based; ${statusLabel(selected.status)}.`}>
      <ResponsiveContainer width="100%" height={isMobile ? 314 : 340}>
        <BarChart
          data={enrichedDemographics}
          margin={isMobile ? { top: 20, right: 12, left: 0, bottom: 8 } : { top: 24, right: 24, left: 12, bottom: 8 }}
        >
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
            label={!isMobile ? { value: "Natural change (annual)", angle: -90, position: "insideLeft", offset: 10, style: { fontSize: 11, fill: "#65758b", textAnchor: "middle" } } : undefined}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(201, 193, 178, 0.15)" }} />
          <ReferenceLine y={0} stroke="#475569" />
          <Bar dataKey="natural_change" name="Natural change" onClick={(row) => setSelectedYear(row.year)}>
            {enrichedDemographics.map((row) => (
              <Cell key={row.year} fill={row.natural_change < 0 ? "#b44745" : "#6c8f68"} opacity={row.year === selectedYear ? 1 : 0.82} />
            ))}
            <LabelList
              dataKey="natural_change"
              position="top"
              formatter={(v: number) => `${v >= 0 ? "+" : ""}${Math.round(v / 1000)}k`}
              fontSize={isMobile ? 9 : 11}
              fill="#475569"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mobile-data-panel" aria-live="polite">
        <span>{selectedYear}</span>
        <strong>Natural change {formatNumber(selected.natural_change)}</strong>
        <small>2021 to {selectedYear}: {formatNumber(cumulative)}</small>
      </div>
    </ChartChrome>
  );
}
