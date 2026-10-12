import { enrichedDemographics } from "../data/demographics";
import { calculateYoY } from "../lib/calculations";
import { formatNumber, formatPercent } from "../lib/formatters";
import { researchReview } from "../data/research";

export function HeroStats() {
  const first = enrichedDemographics[0];
  const latest = enrichedDemographics.at(-1)!;
  const decline = calculateYoY(latest.registered_births, first.registered_births);
  const crossover = enrichedDemographics.find((row) => row.natural_change < 0)?.year;

  const stats = [
    ["Births in 2016", formatNumber(first.registered_births), "official compiled"],
    ["Births in 2025", formatNumber(latest.registered_births), "NSO 2026 / DOPA; official compiled"],
    ["Birth decline", formatPercent(decline), "2016 to 2025"],
    ["First deaths > births", String(crossover), "registration-based"],
    ["2025 natural change", formatNumber(latest.natural_change), latest.status.replaceAll("_", " ")],
    ["Mahidol 2026 TFR", "0.86", "expert estimate"],
    ["0.78 claim", "unverified", "primary origin unresolved"]
  ];

  return (
    <header className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Interactive research report</p>
        <h1>Thailand's fertility collapse</h1>
        <p className="subtitle">From low births to natural population decline</p>
        <p className="lede">Registered deaths exceeded births in every year from 2021 through {latest.year}. Births fell from {formatNumber(first.registered_births)} in {first.year} to {formatNumber(latest.registered_births)} in {latest.year}.</p>
      </div>
      <div className="stat-grid">
        {stats.map(([label, value, meta]) => (
          <div className="stat" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{meta}</small>
          </div>
        ))}
      </div>
      <p className="source-line">Reviewed {researchReview.reviewed_on} | Annual registration cutoff: {researchReview.annual_cutoff}. {researchReview.summary}</p>
    </header>
  );
}
