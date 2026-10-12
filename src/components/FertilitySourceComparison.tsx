import { useMemo, useState } from "react";
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import { fertilitySources } from "../data/fertilitySources";
import { sourceRegistry } from "../data/sourceRegistry";
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
            <Tooltip content={<TfrTooltip />} trigger="click" />
            {data.map(entry => <Scatter key={`${entry.source}-${entry.year}`} data={[entry]} name={`${entry.source} (${entry.year})`} fill={entry.status === "unverified" ? "#fff" : colors[entry.type]} stroke={colors[entry.type]} shape={entry.status === "official_compiled" ? "square" : entry.status === "estimated" ? "diamond" : entry.status === "unverified" ? "cross" : "circle"} onClick={() => setSelected(entry)} />)}
          </ScatterChart>
        </ResponsiveContainer>
        <p className="source-line">Square: official compilation; diamond: estimate; circle: international benchmark; outlined cross: unverified.</p>
        <label>Inspect TFR source<select value={`${selected.source}|${selected.year}`} onChange={event => setSelected(data.find(row => `${row.source}|${row.year}` === event.target.value)!)}>
          {data.map(row => <option key={`${row.source}|${row.year}`} value={`${row.source}|${row.year}`}>{row.year} | {row.source} | {row.tfr}</option>)}
        </select></label>
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
        <p><b>Verification:</b> {selected.verification}</p>
        {selected.source_id ? <a href={sourceRegistry.find(source => source.id === selected.source_id)?.url} target="_blank" rel="noreferrer">Open original source</a> : <p>No verified primary source.</p>}
        <div className="verdict">
          <strong>Current expert benchmark retained: 0.86, Mahidol IPSR Population Gazette 2026.</strong>
          <span>0.78: unverified social-media extrapolation. Keep it out of official charts except as a clearly labeled stress test.</span>
        </div>
      </aside>
    </div>
  );
}
