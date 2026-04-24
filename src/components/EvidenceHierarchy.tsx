import { useState } from "react";

const tiers = [
  { title: "Official administrative data", source: "DOPA / BORA", confidence: "High confidence for registration counts", not: "Not direct TFR" },
  { title: "Official statistical compilations", source: "NSO / MOPH", confidence: "High confidence but lagged", not: "Can differ from civil registration counts" },
  { title: "Expert demographic estimates", source: "Mahidol IPSR", confidence: "Strong current signal", not: "Estimate/projection, not raw registration" },
  { title: "International harmonized series", source: "World Bank / UN", confidence: "Comparable across countries", not: "Lagged, not necessarily current Thai signal" },
  { title: "Media and social media", source: "News / circulating claims", confidence: "Useful for narrative", not: "Not primary statistics" }
];

export function EvidenceHierarchy() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="evidence-grid">
      {tiers.map((tier, index) => (
        <button key={tier.title} className={`tier ${selected === index ? "active" : ""}`} onClick={() => setSelected(index)}>
          <span>Tier {index + 1}</span>
          <strong>{tier.title}</strong>
          <small>{tier.source}</small>
        </button>
      ))}
      <div className="inspector evidence-detail">
        <h3>{tiers[selected].title}</h3>
        <p><b>Good for:</b> {tiers[selected].confidence}</p>
        <p><b>Not good for:</b> {tiers[selected].not}</p>
        <p><b>Related sources:</b> see source registry below.</p>
      </div>
    </div>
  );
}
