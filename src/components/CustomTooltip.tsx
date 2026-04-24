import { formatNumber, formatPercent, statusLabel } from "../lib/formatters";

export function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="tooltip">
      <strong>{label ?? row.year}</strong>
      {payload.map((item: any) => (
        <div key={item.dataKey} className="tooltip-row">
          <span style={{ color: item.color }}>{item.name}</span>
          <b>{String(item.dataKey).includes("change") ? formatPercent(item.value) : formatNumber(item.value)}</b>
        </div>
      ))}
      {row.natural_change !== undefined ? <p>Natural change: {formatNumber(row.natural_change)}</p> : null}
      {row.status ? <p>Status: {statusLabel(row.status)}</p> : null}
      {row.cutoff ? <p>Cutoff: {row.cutoff}</p> : null}
      {row.source_note ? <p>{row.source_note}</p> : null}
    </div>
  );
}
