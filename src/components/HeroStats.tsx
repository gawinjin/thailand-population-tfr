import { enrichedDemographics } from "../data/demographics";
import { calculateYoY } from "../lib/calculations";
import { formatNumber, formatPercent } from "../lib/formatters";

export function HeroStats() {
  const first = enrichedDemographics[0];
  const latest = enrichedDemographics.at(-1)!;
  const decline = calculateYoY(latest.registered_births, first.registered_births);
  const crossover = enrichedDemographics.find((row) => row.natural_change < 0)?.year;

  const stats = [
    ["Births in 2016", formatNumber(first.registered_births), "official compiled"],
    ["Births in 2025", formatNumber(latest.registered_births), "DOPA-cited provisional"],
    ["Birth decline", formatPercent(decline), "2016 to 2025"],
    ["First deaths > births", String(crossover), "registration-based"],
    ["2025 natural change", formatNumber(latest.natural_change), latest.status.replaceAll("_", " ")],
    ["Mahidol 2026 TFR", "0.86", "expert estimate"],
    ["0.78 claim", "unverified", "low-side scenario"]
  ];

  return (
    <header className="hero">
      <nav className="topnav" aria-label="Section navigation">
        {["Trends", "TFR", "Stress test", "Causes", "Scenarios", "Sources"].map((item) => (
          <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}>{item}</a>
        ))}
      </nav>
      <div className="hero-copy">
        <p className="eyebrow">Interactive research report</p>
        <h1>Thailand's fertility collapse</h1>
        <p className="subtitle">From low births to natural population decline</p>
        <p className="lede">Thailand's demographic shift is no longer only about fewer children. Since 2021, registered deaths have exceeded registered births every year. Births fell from 704,058 in 2016 to 416,514 in 2025.</p>
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
      <p className="source-line">Data cutoff: official registration data through 31 Dec 2025 where available; research reviewed through 24 Apr 2026.</p>
    </header>
  );
}
