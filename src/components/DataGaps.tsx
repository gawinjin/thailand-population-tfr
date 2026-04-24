import { useState } from "react";

const gaps = [
  ["Full official 2026 TFR is not available yet", "Prevents declaring any 2026 value official.", "Final births by mother age and exposure denominators."],
  ["0.78 origin is not verified as official", "It may be a scenario or social-media estimate.", "Original method, source table, publication status."],
  ["TFR requires age-specific fertility rates", "Birth counts alone cannot produce a valid TFR.", "Births by mother age and female population by age."],
  ["DOPA dashboards may not expose full TFR inputs", "Administrative counts and TFR are different objects.", "Downloadable age-specific birth tables."],
  ["NSO/MOPH publications lag", "Official compilations may be behind current public claims.", "Latest official yearbook and health statistics."],
  ["2024/2025 births by mother age are needed", "Would allow a stronger reconstruction.", "Mother age distribution and female exposure."],
  ["Official monthly 2026 births by province and mother age", "Would sharpen estimates and regional divergence.", "Monthly age/province administrative tables."]
];

export function DataGaps() {
  const [open, setOpen] = useState<number[]>([0, 1, 2]);
  return (
    <div className="gap-list">
      {gaps.map(([title, why, data], index) => (
        <div className="gap" key={title}>
          <label><input type="checkbox" checked={open.includes(index)} onChange={() => setOpen(open.includes(index) ? open.filter((item) => item !== index) : [...open, index])} />{title}</label>
          {open.includes(index) ? <div><p><b>Why this matters:</b> {why}</p><p><b>Data needed:</b> {data}</p></div> : null}
        </div>
      ))}
    </div>
  );
}
