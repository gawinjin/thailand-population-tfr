import { useMemo, useState } from "react";
import { CartesianGrid, Cell, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
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
  const [selected, setSelected] = useState<FertilitySource>(fertilitySources[2]);
  const isMobile = useMediaQuery("(max-width: 620px)");
  const types = useMemo(() => ["all", ...Array.from(new Set(fertilitySources.map((item) => item.type)))], []);
  const data = filter === "all" ? fertilitySources : fertilitySources.filter((item) => item.type === filter);

  function applyFilter(type: string) {
    setFilter(type);
    setSelected(type === "all" ? fertilitySources[2] : fertilitySources.find((item) => item.type === type) ?? fertilitySources[2]);
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
        <ResponsiveContainer width="100%" height={isMobile ? 300 : 360}>
          <ScatterChart margin={isMobile ? { top: 12, right: 4, bottom: 0, left: -18 } : { top: 18, right: 18, bottom: 12, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e1ded5" />
            <XAxis dataKey="year" type="number" domain={[2022, 2027]} allowDecimals={false} tick={{ fontSize: isMobile ? 11 : 12 }} />
            <YAxis dataKey="tfr" type="number" domain={[0.65, 1.3]} />
            <ZAxis range={[140, 220]} />
            <Tooltip content={<TfrTooltip />} />
            {!isMobile ? <Legend /> : null}
            <Scatter data={data} name="Source-discontinuous TFR estimates" onClick={(row) => setSelected(row)}>
              {data.map((entry) => (
                <Cell key={`${entry.source}-${entry.tfr}`} fill={colors[entry.type]} stroke={entry.status === "unverified" ? "#111827" : colors[entry.type]} strokeDasharray={entry.status === "unverified" ? "3 3" : undefined} />
              ))}
            </Scatter>
          </ScatterChart>
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
          <strong>Best-supported current benchmark: 0.86, Mahidol IPSR 2026.</strong>
          <span>0.78: plausible downside scenario, not validated as official consensus.</span>
        </div>
      </aside>
    </div>
  );
}
