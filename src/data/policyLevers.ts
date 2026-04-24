import type { PolicyLever } from "../types";

export const policyLevers: PolicyLever[] = [
  { title: "Childcare 0-3", target: ["weak_childcare", "work_care_conflict"], horizon: "near to medium term", fiscalIntensity: "high", evidenceConfidence: "high", caveat: "Must be accessible, affordable, and trusted." },
  { title: "Parental leave", target: ["work_care_conflict", "gendered_care"], horizon: "near term", fiscalIntensity: "medium", evidenceConfidence: "medium_high", caveat: "Design must avoid reinforcing employer bias against women." },
  { title: "Paternity leave", target: ["gendered_care"], horizon: "near term", fiscalIntensity: "medium", evidenceConfidence: "medium", caveat: "Needs high take-up and workplace protection." },
  { title: "Flexible work", target: ["work_care_conflict"], horizon: "near term", fiscalIntensity: "low_medium", evidenceConfidence: "medium", caveat: "Least useful for workers without bargaining power." },
  { title: "Young-family housing", target: ["cost_of_living", "delayed_marriage"], horizon: "medium term", fiscalIntensity: "high", evidenceConfidence: "medium", caveat: "Housing support must reach family-formation ages." },
  { title: "Debt relief / financial stability", target: ["debt", "cost_of_living"], horizon: "near term", fiscalIntensity: "medium_high", evidenceConfidence: "medium", caveat: "May ease constraints but does not solve care infrastructure." },
  { title: "Eldercare support", target: ["eldercare_pressure", "aging_feedback"], horizon: "medium term", fiscalIntensity: "high", evidenceConfidence: "medium_high", caveat: "Reduces household care load and future anxiety." },
  { title: "Fertility treatment access", target: ["delayed_marriage"], horizon: "near term", fiscalIntensity: "medium", evidenceConfidence: "medium", caveat: "Helps some delayed births but cannot offset broad structural decline alone." },
  { title: "Migration strategy", target: ["aging_feedback"], horizon: "medium term", fiscalIntensity: "medium", evidenceConfidence: "medium", caveat: "Adaptation lever, not a fertility restoration policy." },
  { title: "Productivity and automation", target: ["aging_feedback", "institutional_confidence"], horizon: "long term", fiscalIntensity: "high", evidenceConfidence: "medium", caveat: "Necessary for adaptation to a smaller workforce." }
];
