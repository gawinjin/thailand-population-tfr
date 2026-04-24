import type { ReactNode } from "react";

export function ChartChrome({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="chart-card">
      {children}
      {footer ? <div className="chart-footer">{footer}</div> : null}
    </div>
  );
}
