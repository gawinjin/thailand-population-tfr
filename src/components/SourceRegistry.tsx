import { useState } from "react";
import { sourceRegistry } from "../data/sourceRegistry";
import type { SourceRecord } from "../types";

export function SourceRegistry() {
  const [selected, setSelected] = useState<SourceRecord>(sourceRegistry[0]);
  return (
    <div className="source-registry">
      <div className="source-list">
        {sourceRegistry.map((source) => (
          <button key={source.id} className={selected.id === source.id ? "active" : ""} onClick={() => setSelected(source)}>
            <strong>{source.name}</strong>
            <span>{source.official_status.replaceAll("_", " ")}</span>
          </button>
        ))}
      </div>
      <aside className="inspector">
        <p className="eyebrow">{selected.source_type.replaceAll("_", " ")}</p>
        <h3>{selected.name}</h3>
        <p>{selected.organization}</p>
        <dl>
          <dt>Status</dt><dd>{selected.official_status.replaceAll("_", " ")}</dd>
          <dt>Latest cutoff</dt><dd>{selected.latest_cutoff}</dd>
          <dt>Measures used</dt><dd>{selected.measures_used.join(", ")}</dd>
          <dt>Limitations</dt><dd>{selected.limitations}</dd>
        </dl>
        <a href={selected.url} target="_blank" rel="noreferrer">Open source</a>
      </aside>
    </div>
  );
}
