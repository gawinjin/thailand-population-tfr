import { useMemo, useState } from "react";
import { CartesianGrid, Cell, ComposedChart, Legend, Line, ReferenceLine, ResponsiveContainer, Scatter, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import { fertilitySources } from "../data/fertilitySources";
import { useMediaQuery } from "../lib/useMediaQuery";
import type { FertilitySource } from "../types";
import { ChartChrome } from "./ChartChrome";

const colors: Record<string, string> = {
  thai_official_compilation: "#245d63",
  expert_estimate_projection: "#6f6b9f",
  international_harmonized_estimate: "#7a6a43",
  unverified_claim_or_low_side_scenario: "#b44745"
};

const benchmark =
  fertilitySources.find((item) => item.source.startsWith("Mahidol IPSR")) ??
  fertilitySources[0];

function TfrTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload as FertilitySource;
  return (
    <div className="tooltip">
      <strong>{row.source}</strong>
      <p>TFR: {row.tfr} in {row.year}</p>
      <p>Status: {row.status.replaceAll("_", " ")}</p>
      <p>Confidence: {row.confidence.replaceAll("_", " ")}</p>
      <p>Cutoff: {row.cutoff}</p>
      <p>{row.note}</p>
    </div>
  );
}

export function FertilitySourceComparison() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<FertilitySource>(benchmark);
  const isMobile = useMediaQuery("(max-width: 620px)");
  const types = useMemo(() => ["all", ...Array.from(new Set(fertilitySources.map((item) => item.type)))], []);
  const data = filter === "all" ? fertilitySources : fertilitySources.filter((item) => item.type === filter);
  const trajectory = useMemo(
    () => fertilitySources
      .filter((item) => item.status !== "unverified")
      .sort((a, b) => a.year - b.year),
    []
  );

  function applyFilter(type: string) {
    setFilter(type);
    setSelected(type === "all" ? benchmark : fertilitySources.find((item) => item.type === type) ?? benchmark);
  }

  return (
    <div className="split">
      <ChartChrome footer="Registered births are counts. TFR is a synthetic rate calculated from age-specific fertility rates. These are not the same object.">
        <div className="control-row wrap">
          {types.map((type) => (
            <button key={type} className={filter === type ? "active" : ""} onClick={() => applyFilter(type)}>
              {type.replaceAll("_", " ")}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={isMobile ? 320 : 380}>
          <ComposedChart data={data} margin={isMobile ? { top: 12, right: 12, bottom: 8, left: 0 } : { top: 18, right: 24, bottom: 12, left: 12 }}>
            <CartesianGrid strokeDasharray="2 4" stroke="#ebe6d9" />
            <XAxis
              dataKey="year"
              type="number"
              domain={[2014, 2027]}
              allowDecimals={false}
              ticks={[2015, 2017, 2019, 2021, 2023, 2025, 2027]}
              tick={{ fontSize: isMobile ? 10 : 12, fill: "#475569" }}
              height={isMobile ? 34 : 30}
            />
            <YAxis
              dataKey="tfr"
              type="number"
              domain={[0.7, 2.2]}
              tick={{ fontSize: isMobile ? 10 : 12, fill: "#475569" }}
              label={!isMobile ? { value: "TFR (births per woman)", angle: -90, position: "insideLeft", offset: 10, style: { fontSize: 11, fill: "#65758b", textAnchor: "middle" } } : undefined}
            />
            <ZAxis range={[140, 220]} />
            <Tooltip content={<TfrTooltip />} cursor={{ stroke: "#c9c1b2", strokeDasharray: "3 3" }} />
            <ReferenceLine
              y={2.1}
              stroke="#b44745"
              strokeDasharray="2 4"
              label={!isMobile ? { value: "Replacement (2.1)", position: "insideTopRight", fontSize: 11, fill: "#b44745" } : undefined}
            />
            <Line
              type="monotone"
              data={trajectory}
              dataKey="tfr"
              stroke="#245d63"
              strokeWidth={2}
              dot={false}
              legendType="none"
              isAnimationActive={false}
            />
            {!isMobile ? <Legend wrapperStyle={{ paddingTop: 8 }} /> : null}
            <Scatter data={data} name="Source-discontinuous TFR estimates" onClick={(row) => setSelected(row)}>
              {data.map((entry) => (
                <Cell
                  key={`${entry.source}-${entry.year}-${entry.tfr}`}
                  fill={colors[entry.type]}
                  stroke={entry.status === "unverified" ? "#111827" : "#fff"}
                  strokeWidth={entry.status === "unverified" ? 1.5 : 1.5}
                  strokeDasharray={entry.status === "unverified" ? "3 3" : undefined}
                />
              ))}
            </Scatter>
          </ComposedChart>
        </ResponsiveContainer>
        <div className="mobile-data-panel" aria-live="polite">
          <span>{selected.year}</span>
          <strong>{selected.source}: TFR {selected.tfr}</strong>
          <small>{selected.confidence.replaceAll("_", " ")}</small>
        </div>
      </ChartChrome>
      <aside className="inspector">
        <p className="eyebrow">Source reconciliation</p>
        <h3>{selected.source}</h3>
        <dl>
          <dt>TFR</dt><dd>{selected.tfr}</dd>
          <dt>Status</dt><dd>{selected.status.replaceAll("_", " ")}</dd>
          <dt>Cutoff</dt><dd>{selected.cutoff}</dd>
          <dt>Confidence</dt><dd>{selected.confidence.replaceAll("_", " ")}</dd>
        </dl>
        <p>{selected.note}</p>
        <div className="verdict">
          <strong>Best-supported current benchmark: 0.86, Mahidol IPSR Population Gazette 2026.</strong>
          <span>0.78: unverified social-media extrapolation. Keep it out of official charts except as a clearly labeled stress test.</span>
        </div>
      </aside>
    </div>
  );
}
