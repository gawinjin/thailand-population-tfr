import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { enrichedDemographics } from "../data/demographics";
import { maternalAgeRows, regionalRows, researchReview } from "../data/research";
import { sourceRegistry } from "../data/sourceRegistry";
import { formatNumber } from "../lib/formatters";
import { CustomTooltip } from "./CustomTooltip";
import { ChartChrome } from "./ChartChrome";

export function ResearchUpdate() {
  const [view, setView] = useState("regions");
  const source = sourceRegistry.find(source => source.id === "nso_yearbook_2026")!;
  const liveBirthTotal = maternalAgeRows.reduce((sum, row) => sum + row.births, 0);
  return (
    <>
      <div className="review-note">
        <p><b>Review date: {researchReview.reviewed_on}.</b> {researchReview.summary}</p>
        <details><summary>Revisions and verification limits</summary>
          <ul>{researchReview.revisions.map(note => <li key={note}>{note}</li>)}</ul>
          <ul>{researchReview.limitations.map(note => <li key={note}>{note}</li>)}</ul>
        </details>
      </div>
      <div className="control-row wrap" aria-label="Evidence view">
        {[["regions", "2025 regions"], ["ages", "2024 maternal age"], ["data", "Annual data table"]].map(([id, label]) => <button key={id} aria-pressed={view === id} className={view === id ? "active" : ""} onClick={() => setView(id)}>{label}</button>)}
      </div>
      {view === "regions" && <ChartChrome footer="Official compiled registration data, 2025-12-31. NSO 2026 figure 1.1 / DOPA. Bangkok is included in Bangkok and Vicinities, avoiding double counting.">
        <h3>Where did deaths exceed births in 2025?</h3>
        <ResponsiveContainer width="100%" height={370}>
          <BarChart data={regionalRows} layout="vertical" margin={{ left: 0, right: 12, top: 16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={value => `${value / 1000}k`} />
            <YAxis dataKey="region" type="category" width={112} tick={{ fontSize: 11 }} />
            <ReferenceLine x={0} stroke="#555" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="natural_change" name="Natural change (people)">{regionalRows.map(row => <Cell key={row.region} fill={row.natural_change < 0 ? "#b44745" : "#2f6f73"} />)}</Bar>
          </BarChart>
        </ResponsiveContainer>
        <p>Six of these seven regions had natural decrease; the Southern region retained natural increase.</p>
        <div className="table-scroll"><table><caption>2025 regional registration counts</caption><thead><tr><th>Region</th><th>Births</th><th>Deaths</th><th>Natural change</th></tr></thead><tbody>{regionalRows.map(row => <tr key={row.region}><th scope="row">{row.region}</th><td>{formatNumber(row.births)}</td><td>{formatNumber(row.deaths)}</td><td>{formatNumber(row.natural_change)}</td></tr>)}</tbody></table></div>
      </ChartChrome>}
      {view === "ages" && <>
        <h3>What age-specific birth data is already available?</h3>
        <p>NSO table 1.10 publishes {formatNumber(liveBirthTotal)} health-statistics live births in 2024. The registration series reports {formatNumber(enrichedDemographics.find(row => row.year === 2024)!.registered_births)}. These totals have different statistical coverage and must not be substituted for one another. Matching female exposure denominators are still needed to reconstruct TFR.</p>
        <div className="table-scroll"><table><caption>Official compiled live births by mother's age, 2024-12-31; NSO 2026 table 1.10</caption><thead><tr><th>Mother's age</th><th>Live births</th></tr></thead><tbody>{maternalAgeRows.map(row => <tr key={row.age}><th scope="row">{row.age}</th><td>{formatNumber(row.births)}</td></tr>)}</tbody></table></div>
      </>}
      {view === "data" && <div className="table-scroll"><table><caption>Official compiled registration data; approximate crude rates per 1,000 use year-end population</caption>
        <thead><tr><th>Year / cutoff</th><th>Births</th><th>Deaths</th><th>Natural change</th><th>Population</th><th>Approx. birth rate</th><th>Approx. death rate</th><th>Source</th></tr></thead>
        <tbody>{enrichedDemographics.map(row => <tr key={row.year}><th scope="row">{row.cutoff}</th><td>{formatNumber(row.registered_births)}</td><td>{formatNumber(row.registered_deaths)}</td><td>{formatNumber(row.natural_change)}</td><td>{formatNumber(row.year_end_population)}</td><td>{row.approximate_crude_birth_rate.toFixed(2)}</td><td>{row.approximate_crude_death_rate.toFixed(2)}</td><td>{row.source_ids.map(id => { const entry = sourceRegistry.find(source => source.id === id)!; return <a key={id} href={entry.url} target="_blank" rel="noreferrer">{entry.name}<br /></a>; })}</td></tr>)}</tbody>
      </table></div>}
      <p className="source-line"><a href={source.url} target="_blank" rel="noreferrer">NSO Statistical Yearbook 2026</a> | PDF pages 55, 66, 75 and 88. Official publication; underlying sources and observation periods differ by table.</p>
    </>
  );
}
