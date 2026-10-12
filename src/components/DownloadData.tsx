import { causeEdges, causeNodes } from "../data/causeNetwork";
import { demographicRows, enrichedDemographics } from "../data/demographics";
import { fertilitySources } from "../data/fertilitySources";
import { policyLevers } from "../data/policyLevers";
import { sourceRegistry } from "../data/sourceRegistry";
import { maternalAgeRows, regionalRows, researchReview } from "../data/research";
import { downloadText, rowsToCsv } from "../lib/exportCsv";

export function DownloadData() {
  const bundle = { researchReview, demographicRows, enrichedDemographics, fertilitySources, regionalRows, maternalAgeRows, causeNodes, causeEdges, sourceRegistry, policyLevers };
  return (
    <div className="download-row">
      <button onClick={() => downloadText("thailand-fertility-data.json", JSON.stringify(bundle, null, 2), "application/json")}>Download JSON</button>
      <button onClick={() => downloadText("thailand-demographics.csv", rowsToCsv(enrichedDemographics), "text/csv")}>Download CSV</button>
      <button onClick={() => downloadText("thailand-tfr-sources.csv", rowsToCsv(fertilitySources), "text/csv")}>TFR sources CSV</button>
      <button onClick={() => downloadText("thailand-regions-2025.csv", rowsToCsv(regionalRows), "text/csv")}>Regions CSV</button>
    </div>
  );
}
