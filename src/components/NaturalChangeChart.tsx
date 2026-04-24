import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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
      <ResponsiveContainer width="100%" height={isMobile ? 290 : 340}>
        <BarChart data={enrichedDemographics} margin={isMobile ? { top: 12, right: 4, left: -20, bottom: 0 } : undefined}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e1ded5" />
          <XAxis dataKey="year" interval={isMobile ? 1 : 0} tick={{ fontSize: isMobile ? 11 : 12 }} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0} stroke="#475569" />
          <Bar dataKey="natural_change" name="Natural change" onClick={(row) => setSelectedYear(row.year)}>
            {enrichedDemographics.map((row) => (
              <Cell key={row.year} fill={row.natural_change < 0 ? "#b44745" : "#6c8f68"} opacity={row.year === selectedYear ? 1 : 0.82} />
            ))}
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
