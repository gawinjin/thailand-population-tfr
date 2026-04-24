export const numberFormatter = new Intl.NumberFormat("en-US");
export const oneDecimalFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1
});
export const rateFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2
});

export function formatNumber(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) return "n/a";
  return numberFormatter.format(Math.round(value));
}

export function formatPercent(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) return "n/a";
  return `${value > 0 ? "+" : ""}${oneDecimalFormatter.format(value)}%`;
}

export function statusLabel(value: string) {
  return value.replaceAll("_", " ");
}
