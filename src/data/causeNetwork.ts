import type { CauseEdge, CauseNode } from "../types";

export const causeNodes: CauseNode[] = [
  { id: "cost_of_living", label: "High cost of living", layer: "surface", evidence_strength: "high", description: "Households perceive children as expensive relative to income, housing, education, and care costs." },
  { id: "debt", label: "Household debt", layer: "surface", evidence_strength: "medium_high", description: "Debt reduces household capacity to absorb child-related fixed costs." },
  { id: "delayed_marriage", label: "Delayed marriage and partnership", layer: "surface", evidence_strength: "high", description: "Later partnership formation compresses the fertility window." },
  { id: "weak_childcare", label: "Weak childcare infrastructure", layer: "structural", evidence_strength: "high", description: "Limited affordable childcare makes work and family harder to combine." },
  { id: "work_care_conflict", label: "Work-care incompatibility", layer: "structural", evidence_strength: "high", description: "Long or inflexible work conditions increase the opportunity cost of children." },
  { id: "gendered_care", label: "Gendered unpaid care burden", layer: "structural", evidence_strength: "medium_high", description: "Women face higher career and domestic tradeoffs after childbirth." },
  { id: "eldercare_pressure", label: "Eldercare pressure", layer: "structural", evidence_strength: "medium_high", description: "Working-age adults support aging parents while also being expected to raise children." },
  { id: "institutional_confidence", label: "Low confidence in future support", layer: "deep", evidence_strength: "medium", description: "Weak confidence in economic and political future lowers willingness to make irreversible family commitments." },
  { id: "low_fertility", label: "Lower intended and realized fertility", layer: "outcome", evidence_strength: "high", description: "The combined result is fewer births, smaller families, and more childlessness." },
  { id: "aging_feedback", label: "Aging feedback loop", layer: "feedback", evidence_strength: "high", description: "Low fertility reduces future workforce size, increasing pressure on working-age adults." }
];

export const causeEdges: CauseEdge[] = [
  { from: "cost_of_living", to: "low_fertility", mechanism: "children become financially risky" },
  { from: "debt", to: "low_fertility", mechanism: "less household balance-sheet room" },
  { from: "delayed_marriage", to: "low_fertility", mechanism: "shorter fertility window" },
  { from: "weak_childcare", to: "work_care_conflict", mechanism: "care stays private and expensive" },
  { from: "work_care_conflict", to: "low_fertility", mechanism: "children reduce income and career stability" },
  { from: "gendered_care", to: "low_fertility", mechanism: "motherhood penalty and unequal domestic burden" },
  { from: "eldercare_pressure", to: "low_fertility", mechanism: "sandwich-generation stress" },
  { from: "institutional_confidence", to: "low_fertility", mechanism: "lower confidence in long-term family project" },
  { from: "low_fertility", to: "aging_feedback", mechanism: "smaller future workforce" },
  { from: "aging_feedback", to: "eldercare_pressure", mechanism: "more elderly dependents per worker" },
  { from: "aging_feedback", to: "institutional_confidence", mechanism: "higher fiscal and social stress" }
];
