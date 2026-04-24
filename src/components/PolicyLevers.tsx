import { policyLevers } from "../data/policyLevers";

export function PolicyLevers() {
  return (
    <div className="policy-grid">
      {policyLevers.map((lever) => (
        <article className="policy-card" key={lever.title}>
          <h3>{lever.title}</h3>
          <p><b>Target:</b> {lever.target.join(", ")}</p>
          <p><b>Horizon:</b> {lever.horizon}</p>
          <p><b>Fiscal intensity:</b> {lever.fiscalIntensity.replace("_", " ")}</p>
          <p><b>Evidence confidence:</b> {lever.evidenceConfidence.replace("_", " ")}</p>
          <p className="warning">{lever.caveat}</p>
        </article>
      ))}
    </div>
  );
}
