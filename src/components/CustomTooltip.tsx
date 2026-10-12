import { formatNumber, formatPercent, oneDecimalFormatter, statusLabel } from "../lib/formatters";

type TooltipRow = { year?: number; natural_change?: number; status?: string; cutoff?: string; source_note?: string };
type TooltipEntry = { dataKey: string | number; name?: string; color?: string; value?: number; payload: TooltipRow };

export function CustomTooltip({ active, payload, label, mode = "absolute" }: {
  active?: boolean; payload?: readonly TooltipEntry[]; label?: string | number; mode?: "absolute" | "index" | "yoy";
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="tooltip">
      <strong>{label ?? row.year}</strong>
      {payload.map(item => (
        <div key={item.dataKey} className="tooltip-row">
          <span style={{ color: item.color }}>{item.name}</span>
          <b>{mode === "yoy" ? formatPercent(item.value) : mode === "index" && item.value != null ? oneDecimalFormatter.format(item.value) : formatNumber(item.value)}</b>
        </div>
      ))}
      {row.natural_change !== undefined && !payload.some(item => item.dataKey === "natural_change") ? <p>Natural change: {formatNumber(row.natural_change)} people</p> : null}
      {row.status ? <p>Status: {statusLabel(row.status)}</p> : null}
      {row.cutoff ? <p>Cutoff: {row.cutoff}</p> : null}
      {row.source_note ? <p>{row.source_note}</p> : null}
    </div>
  );
}
