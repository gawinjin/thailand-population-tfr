import { useMemo, useState } from "react";
import ReactFlow, { Background, Controls, Edge, Node } from "reactflow";
import { causeEdges, causeNodes } from "../data/causeNetwork";
import type { CauseNode } from "../types";

const layerX: Record<CauseNode["layer"], number> = { surface: 40, structural: 310, deep: 310, outcome: 600, feedback: 820 };
const layerY: Record<string, number> = {
  cost_of_living: 40,
  debt: 150,
  delayed_marriage: 260,
  weak_childcare: 35,
  work_care_conflict: 145,
  gendered_care: 255,
  eldercare_pressure: 365,
  institutional_confidence: 475,
  low_fertility: 175,
  aging_feedback: 225
};

const modes = {
  surface: ["cost_of_living", "debt", "delayed_marriage", "low_fertility"],
  structural: ["weak_childcare", "work_care_conflict", "gendered_care", "eldercare_pressure", "low_fertility"],
  feedback: ["low_fertility", "aging_feedback", "eldercare_pressure", "institutional_confidence"],
  policy: causeNodes.map((node) => node.id)
};

export function CauseNetwork() {
  const [mode, setMode] = useState<keyof typeof modes>("structural");
  const [selected, setSelected] = useState<CauseNode>(causeNodes[3]);
  const visibleIds = new Set(modes[mode]);
  const nodes: Node[] = useMemo(() => causeNodes.map((node) => ({
    id: node.id,
    position: { x: layerX[node.layer], y: layerY[node.id] },
    data: { label: `${node.label}\n${node.evidence_strength.replace("_", " ")}` },
    className: `cause-node ${node.layer} ${visibleIds.has(node.id) ? "" : "dimmed"}`,
    style: { width: 190 }
  })), [mode]);
  const edges: Edge[] = useMemo(() => causeEdges.map((edge) => ({
    id: `${edge.from}-${edge.to}`,
    source: edge.from,
    target: edge.to,
    label: edge.mechanism,
    animated: false,
    className: visibleIds.has(edge.from) && visibleIds.has(edge.to) ? "" : "dimmed-edge"
  })), [mode]);

  return (
    <div className="cause-layout">
      <div className="control-row wrap">
        {Object.keys(modes).map((item) => <button key={item} className={mode === item ? "active" : ""} onClick={() => setMode(item as keyof typeof modes)}>{item.replace("_", " ")} view</button>)}
      </div>
      <div className="flow-shell">
        <ReactFlow nodes={nodes} edges={edges} fitView onNodeClick={(_, node) => setSelected(causeNodes.find((item) => item.id === node.id)!)} nodesDraggable={false} panOnScroll zoomOnScroll={false}>
          <Background color="#ddd7c8" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      <aside className="inspector">
        <p className="eyebrow">{selected.layer} cause</p>
        <h3>{selected.label}</h3>
        <dl>
          <dt>Evidence strength</dt><dd>{selected.evidence_strength.replace("_", " ")}</dd>
          <dt>Source family</dt><dd>Policy research, official statistics context, demographic interpretation</dd>
          <dt>Uncertainty</dt><dd>Causal strength varies by household, region, class, gender and cohort.</dd>
          <dt>Policy levers</dt><dd>See policy lever section; no single lever is expected to restore replacement fertility.</dd>
        </dl>
        <p>{selected.description}</p>
      </aside>
    </div>
  );
}
