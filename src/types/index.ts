export type DataStatus =
  | "official_compiled"
  | "current_dopa_cited_provisional"
  | "estimated"
  | "unverified"
  | "lagged_external_benchmark";

export type DemographicRow = {
  year: number;
  registered_births: number;
  registered_deaths: number;
  natural_change: number;
  year_end_population: number;
  status: DataStatus;
  cutoff: string;
  source_note: string;
};

export type EnrichedDemographicRow = DemographicRow & {
  birth_change_yoy: number | null;
  death_change_yoy: number | null;
  natural_change_yoy: number | null;
  birth_index_2016: number;
  death_index_2016: number;
  approximate_crude_birth_rate: number;
  approximate_crude_death_rate: number;
};

export type FertilitySource = {
  year: number;
  source: string;
  tfr: number;
  type:
    | "international_harmonized_estimate"
    | "thai_official_compilation"
    | "expert_estimate_projection"
    | "unverified_claim_or_low_side_scenario";
  confidence: string;
  status: DataStatus;
  cutoff: string;
  note: string;
};

export type CauseNode = {
  id: string;
  label: string;
  layer: "surface" | "structural" | "deep" | "outcome" | "feedback";
  evidence_strength: string;
  description: string;
};

export type CauseEdge = {
  from: string;
  to: string;
  mechanism: string;
};

export type SourceRecord = {
  id: string;
  name: string;
  organization: string;
  source_type: string;
  official_status: string;
  url: string;
  latest_cutoff: string;
  measures_used: string[];
  limitations: string;
};

export type PolicyLever = {
  title: string;
  target: string[];
  horizon: string;
  fiscalIntensity: string;
  evidenceConfidence: string;
  caveat: string;
};

export type ProjectionRow = {
  year: number;
  births: number;
  deaths?: number;
  natural_change?: number;
};
